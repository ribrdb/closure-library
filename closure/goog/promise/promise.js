/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.declareModuleId('goog.promise.promise');

import { Thenable } from './thenable.js';
import * as asserts from '../asserts/asserts.js';
import { FreeList } from '../async/freelist.js';
import { run } from '../async/run.js';
import { throwException } from '../async/throwexception.js';
import { DebugError } from '../debug/error.js';
import asyncStackTag from '../debug/asyncstacktag.js';
import * as functions from '../functions/functions.js';
import { Resolver } from './resolver.js';



/**
 * NOTE: This class was created in anticipation of the built-in Promise type
 * being standardized and implemented across browsers. Now that Promise is
 * available in modern browsers, and is automatically polyfilled by the Closure
 * Compiler, by default, most new code should use native `Promise`
 * instead of `Promise`. However, `Promise` has the
 * concept of cancellation which native Promises do not yet have. So code
 * needing cancellation may still want to use `Promise`.
 *
 * Promises provide a result that may be resolved asynchronously. A Promise may
 * be resolved by being fulfilled with a fulfillment value, rejected with a
 * rejection reason, or blocked by another Promise. A Promise is said to be
 * settled if it is either fulfilled or rejected. Once settled, the Promise
 * result is immutable.
 *
 * Promises may represent results of any type, including undefined. Rejection
 * reasons are typically Errors, but may also be of any type. Closure Promises
 * allow for optional type annotations that enforce that fulfillment values are
 * of the appropriate types at compile time.
 *
 * The result of a Promise is accessible by calling `then` and registering
 * `onFulfilled` and `onRejected` callbacks. Once the Promise
 * is settled, the relevant callbacks are invoked with the fulfillment value or
 * rejection reason as argument. Callbacks are always invoked in the order they
 * were registered, even when additional `then` calls are made from inside
 * another callback. A callback is always run asynchronously sometime after the
 * scope containing the registering `then` invocation has returned.
 *
 * If a Promise is resolved with another Promise, the first Promise will block
 * until the second is settled, and then assumes the same result as the second
 * Promise. This allows Promises to depend on the results of other Promises,
 * linking together multiple asynchronous operations.
 *
 * This implementation is compatible with the Promises/A+ specification and
 * passes that specification's conformance test suite. A Closure Promise may be
 * resolved with a Promise instance (or sufficiently compatible Promise-like
 * object) created by other Promise implementations. From the specification,
 * Promise-like objects are known as "Thenables".
 *
 * @see http://promisesaplus.com/
 *
 * @param {function(
 *             this:RESOLVER_CONTEXT,
 *             function((TYPE|IThenable<TYPE>|Thenable)=),
 *             function(*=)): void} resolver
 *     Initialization function that is invoked immediately with `resolve`
 *     and `reject` functions as arguments. The Promise is resolved or
 *     rejected with the first argument passed to either function.
 * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
 *     resolver function. If unspecified, the resolver function will be executed
 *     in the default scope.
 * @constructor
 * @struct
 * @final
 * @implements {Thenable<TYPE>}
 * @template TYPE,RESOLVER_CONTEXT
 */
export function Promise(resolver, opt_context) {
  /**
     * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
     * BLOCKED.
     * @private {Promise.State_}
     */
  this.state_ = Promise.State_.PENDING;

  /**
   * The settled result of the Promise. Immutable once set with either a
   * fulfillment value or rejection reason.
   * @private {*}
   */
  this.result_ = undefined;

  /**
     * For Promises created by calling `then()`, the originating parent.
     * @private {?Promise}
     */
  this.parent_ = null;

  /**
     * The linked list of `onFulfilled` and `onRejected` callbacks
     * added to this Promise by calls to `then()`.
     * @private {?Promise.CallbackEntry_}
     */
  this.callbackEntries_ = null;

  /**
     * The tail of the linked list of `onFulfilled` and `onRejected`
     * callbacks added to this Promise by calls to `then()`.
     * @private {?Promise.CallbackEntry_}
     */
  this.callbackEntriesTail_ = null;

  /**
   * Whether the Promise is in the queue of Promises to execute.
   * @private {boolean}
   */
  this.executing_ = false;

  if (Promise.UNHANDLED_REJECTION_DELAY > 0) {
    /**
     * A timeout ID used when the `UNHANDLED_REJECTION_DELAY` is greater
     * than 0 milliseconds. The ID is set when the Promise is rejected, and
     * cleared only if an `onRejected` callback is invoked for the
     * Promise (or one of its descendants) before the delay is exceeded.
     *
     * If the rejection is not handled before the timeout completes, the
     * rejection reason is passed to the unhandled rejection handler.
     * @private {number}
     */
    this.unhandledRejectionId_ = 0;
  } else if (Promise.UNHANDLED_REJECTION_DELAY == 0) {
    /**
     * When the `UNHANDLED_REJECTION_DELAY` is set to 0 milliseconds, a
     * boolean that is set if the Promise is rejected, and reset to false if an
     * `onRejected` callback is invoked for the Promise (or one of its
     * descendants). If the rejection is not handled before the next timestep,
     * the rejection reason is passed to the unhandled rejection handler.
     * @private {boolean}
     */
    this.hadUnhandledRejection_ = false;
  }

  if (Promise.LONG_STACK_TRACES) {
    /**
     * A list of stack trace frames pointing to the locations where this Promise
     * was created or had callbacks added to it. Saved to add additional context
     * to stack traces when an exception is thrown.
     * @private {!Array<string>}
     */
    this.stack_ = [];
    this.addStackTrace_(new Error('created'));

    /**
     * Index of the most recently executed stack frame entry.
     * @private {number}
     */
    this.currentStep_ = 0;
  }

  // As an optimization, we can skip this if resolver is
  // goog.functions.UNDEFINED. This value is passed internally when creating a
  // promise which will be resolved through a more optimized path.
  if (resolver != functions.UNDEFINED) {
    try {
      var self = this;
      resolver.call(
          opt_context,
          function(value) {
            self.resolve_(Promise.State_.FULFILLED, value);
          },
          function(reason) {
            if (goog.DEBUG &&
                !(reason instanceof Promise.CancellationError)) {
              try {
                // Promise was rejected. Step up one call frame to see why.
                if (reason instanceof Error) {
                  throw reason;
                } else {
                  throw new Error('Promise rejected.');
                }
              } catch (e) {
                // Only thrown so browser dev tools can catch rejections of
                // promises when the option to break on caught exceptions is
                // activated.
              }
            }
            self.resolve_(Promise.State_.REJECTED, reason);
          });
    } catch (e) {
      this.resolve_(Promise.State_.REJECTED, e);
    }
  }
}

/** @type {!Promise<?>} */
var fakePromise;

/**
 * @define {boolean} Whether traces of `then` calls should be included in
 * exceptions thrown
 */
Promise.LONG_STACK_TRACES =
    goog.define('goog.Promise.LONG_STACK_TRACES', false);


/**
 * @define {number} The delay in milliseconds before a rejected Promise's reason
 * is passed to the rejection handler. By default, the rejection handler
 * rethrows the rejection reason so that it appears in the developer console or
 * `window.onerror` handler.
 *
 * Rejections are rethrown as quickly as possible by default. A negative value
 * disables rejection handling entirely.
 */
Promise.UNHANDLED_REJECTION_DELAY =
    goog.define('goog.Promise.UNHANDLED_REJECTION_DELAY', 0);


/**
 * The possible internal states for a Promise. These states are not directly
 * observable to external callers.
 * @enum {number}
 * @private
 */
Promise.State_ = {
  /** The Promise is waiting for resolution. */
  PENDING: 0,

  /** The Promise is blocked waiting for the result of another Thenable. */
  BLOCKED: 1,

  /** The Promise has been resolved with a fulfillment value. */
  FULFILLED: 2,

  /** The Promise has been resolved with a rejection reason. */
  REJECTED: 3
};



/**
 * Entries in the callback chain. Each call to `then`,
 * `thenCatch`, or `thenAlways` creates an entry containing the
 * functions that may be invoked once the Promise is settled.
 *
 * @private @final @struct @constructor
 */
Promise.CallbackEntry_ = function() {
  /** @type {?Promise} */
  this.child = null;
  /** @type {?Function} */
  this.onFulfilled = null;
  /** @type {?Function} */
  this.onRejected = null;
  /** @type {?} */
  this.context = null;
  /** @type {?Promise.CallbackEntry_} */
  this.next = null;

  /**
   * A boolean value to indicate this is a "thenAlways" callback entry.
   * Unlike a normal "then/thenVoid" a "thenAlways doesn't participate
   * in "cancel" considerations but is simply an observer and requires
   * special handling.
   * @type {boolean}
   */
  this.always = false;
};


/** clear the object prior to reuse */
Promise.CallbackEntry_.prototype.reset = function() {
  this.child = null;
  this.onFulfilled = null;
  this.onRejected = null;
  this.context = null;
  this.always = false;
};


/**
 * @define {number} The number of currently unused objects to keep around for
 *    reuse.
 */
Promise.DEFAULT_MAX_UNUSED =
    goog.define('goog.Promise.DEFAULT_MAX_UNUSED', 100);


/** @const @private {FreeList<!Promise.CallbackEntry_>} */
Promise.freelist_ = new FreeList(
    function() {
      return new Promise.CallbackEntry_();
    },
    function(item) {
      item.reset();
    },
    Promise.DEFAULT_MAX_UNUSED);


/**
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 * @param {?} context
 * @return {!Promise.CallbackEntry_}
 * @private
 */
Promise.getCallbackEntry_ = function(onFulfilled, onRejected, context) {
  var entry = Promise.freelist_.get();
  entry.onFulfilled = onFulfilled;
  entry.onRejected = onRejected;
  entry.context = context;
  return entry;
};


/**
 * @param {!Promise.CallbackEntry_} entry
 * @private
 */
Promise.returnEntry_ = function(entry) {
  Promise.freelist_.put(entry);
};


// NOTE: this is the same template expression as is used for
// goog.IThenable.prototype.then


/**
 * @param {VALUE=} opt_value
 * @return {RESULT} A new Promise that is immediately resolved
 *     with the given value. If the input value is already a Promise, it
 *     will be returned immediately without creating a new instance.
 * @template VALUE
 * @template RESULT := type('goog.Promise',
 *     cond(isUnknown(VALUE), unknown(),
 *       mapunion(VALUE, (V) =>
 *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
 *           templateTypeOf(V, 0),
 *           cond(sub(V, 'Thenable'),
 *              unknown(),
 *              V)))))
 * =:
 */
Promise.resolve = function(opt_value) {
  if (opt_value instanceof Promise) {
    // Avoid creating a new object if we already have a promise object
    // of the correct type.
    return opt_value;
  }

  // Passing goog.functions.UNDEFINED will cause the constructor to take an
  // optimized path that skips calling the resolver function.
  var promise = new Promise(functions.UNDEFINED);
  promise.resolve_(Promise.State_.FULFILLED, opt_value);
  return promise;
};


/**
 * @param {*=} opt_reason
 * @return {!Promise} A new Promise that is immediately rejected with the
 *     given reason.
 */
Promise.reject = function(opt_reason) {
  return new Promise(function(resolve, reject) {
    reject(opt_reason);
  });
};


/**
 * This is identical to
 * {@code Promise.resolve(value).then(onFulfilled, onRejected)}, but it
 * avoids creating an unnecessary wrapper Promise when `value` is already
 * thenable.
 *
 * @param {?(Thenable<TYPE>|Thenable|TYPE)} value
 * @param {function(TYPE): ?} onFulfilled
 * @param {function(*): *} onRejected
 * @template TYPE
 * @private
 */
Promise.resolveThen_ = function(value, onFulfilled, onRejected) {
  var isThenable =
      Promise.maybeThen_(value, onFulfilled, onRejected, null);
  if (!isThenable) {
    run(goog.partial(onFulfilled, value));
  }
};


/**
 * @param {!Array<?(Promise<TYPE>|Thenable<TYPE>|Thenable|*)>}
 *     promises
 * @return {!Promise<TYPE>} A Promise that receives the result of the
 *     first Promise (or Promise-like) input to settle immediately after it
 *     settles.
 * @template TYPE
 */
Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    if (!promises.length) {
      resolve(undefined);
    }
    for (var i = 0, promise; i < promises.length; i++) {
      promise = promises[i];
      Promise.resolveThen_(promise, resolve, reject);
    }
  });
};


/**
 * @param {!Array<?(Promise<TYPE>|Thenable<TYPE>|Thenable|*)>}
 *     promises
 * @return {!Promise<!Array<TYPE>>} A Promise that receives a list of
 *     every fulfilled value once every input Promise (or Promise-like) is
 *     successfully fulfilled, or is rejected with the first rejection reason
 *     immediately after it is rejected.
 * @template TYPE
 */
Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    var toFulfill = promises.length;
    var values = [];

    if (!toFulfill) {
      resolve(values);
      return;
    }

    var onFulfill = function(index, value) {
      toFulfill--;
      values[index] = value;
      if (toFulfill == 0) {
        resolve(values);
      }
    };

    var onReject = function(reason) {
      reject(reason);
    };

    for (var i = 0, promise; i < promises.length; i++) {
      promise = promises[i];
      Promise.resolveThen_(promise, goog.partial(onFulfill, i), onReject);
    }
  });
};


/**
 * @param {!Array<?(Promise<TYPE>|Thenable<TYPE>|Thenable|*)>}
 *     promises
 * @return {!Promise<!Array<{
 *     fulfilled: boolean,
 *     value: (TYPE|undefined),
 *     reason: (*|undefined)}>>} A Promise that resolves with a list of
 *         result objects once all input Promises (or Promise-like) have
 *         settled. Each result object contains a 'fulfilled' boolean indicating
 *         whether an input Promise was fulfilled or rejected. For fulfilled
 *         Promises, the resulting value is stored in the 'value' field. For
 *         rejected Promises, the rejection reason is stored in the 'reason'
 *         field.
 * @template TYPE
 */
Promise.allSettled = function(promises) {
  return new Promise(function(resolve, reject) {
    var toSettle = promises.length;
    var results = [];

    if (!toSettle) {
      resolve(results);
      return;
    }

    var onSettled = function(index, fulfilled, result) {
      toSettle--;
      results[index] = fulfilled ? {fulfilled: true, value: result} :
                                   {fulfilled: false, reason: result};
      if (toSettle == 0) {
        resolve(results);
      }
    };

    for (var i = 0, promise; i < promises.length; i++) {
      promise = promises[i];
      Promise.resolveThen_(
          promise, goog.partial(onSettled, i, true /* fulfilled */),
          goog.partial(onSettled, i, false /* fulfilled */));
    }
  });
};


/**
 * @param {!Array<?(Promise<TYPE>|Thenable<TYPE>|Thenable|*)>}
 *     promises
 * @return {!Promise<TYPE>} A Promise that receives the value of the first
 *     input to be fulfilled, or is rejected with a list of every rejection
 *     reason if all inputs are rejected.
 * @template TYPE
 */
Promise.firstFulfilled = function(promises) {
  return new Promise(function(resolve, reject) {
    var toReject = promises.length;
    var reasons = [];

    if (!toReject) {
      resolve(undefined);
      return;
    }

    var onFulfill = function(value) {
      resolve(value);
    };

    var onReject = function(index, reason) {
      toReject--;
      reasons[index] = reason;
      if (toReject == 0) {
        reject(reasons);
      }
    };

    for (var i = 0, promise; i < promises.length; i++) {
      promise = promises[i];
      Promise.resolveThen_(promise, onFulfill, goog.partial(onReject, i));
    }
  });
};

/** @typedef {!Promise} */
goog.Promise = Promise;


/**
 * @return {!Resolver<TYPE>} Resolver wrapping the promise and its
 *     resolve / reject functions. Resolving or rejecting the resolver
 *     resolves or rejects the promise.
 * @template TYPE
 * @see {@link goog.promise.NativeResolver} for native Promises
 */
Promise.withResolver = function() {
  var resolve, reject;
  var promise = new Promise(function(rs, rj) {
    resolve = rs;
    reject = rj;
  });
  return new Promise.Resolver_(promise, resolve, reject);
};


/**
 * Adds callbacks that will operate on the result of the Promise, returning a
 * new child Promise.
 *
 * If the Promise is fulfilled, the `onFulfilled` callback will be invoked
 * with the fulfillment value as argument, and the child Promise will be
 * fulfilled with the return value of the callback. If the callback throws an
 * exception, the child Promise will be rejected with the thrown value instead.
 *
 * If the Promise is rejected, the `onRejected` callback will be invoked
 * with the rejection reason as argument, and the child Promise will be resolved
 * with the return value or rejected with the thrown value of the callback.
 *
 * @param {?(function(this:THIS, TYPE): VALUE)=} opt_onFulfilled A
 *     function that will be invoked with the fulfillment value if the Promise
 *     is fulfilled.
 * @param {?(function(this:THIS, *): *)=} opt_onRejected A function that will
 *     be invoked with the rejection reason if the Promise is rejected.
 * @param {THIS=} opt_context An optional context object that will be the
 *     execution context for the callbacks. By default, functions are executed
 *     with the default this.
 *
 * @return {RESULT} A new Promise that will receive the result
 *     of the fulfillment or rejection callback.
 * @template VALUE
 * @template THIS
 *
 * When a Promise (or thenable) is returned from the fulfilled callback,
 * the result is the payload of that promise, not the promise itself.
 *
 * @template RESULT := type('goog.Promise',
 *     cond(isUnknown(VALUE), unknown(),
 *       mapunion(VALUE, (V) =>
 *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
 *           templateTypeOf(V, 0),
 *           cond(sub(V, 'Thenable'),
 *              unknown(),
 *              V)))))
 *  =:
 * @override
 */
Promise.prototype.then = function(
    opt_onFulfilled, opt_onRejected, opt_context) {
  if (opt_onFulfilled != null) {
    asserts.assertFunction(
        opt_onFulfilled, 'opt_onFulfilled should be a function.');
  }
  if (opt_onRejected != null) {
    asserts.assertFunction(
        opt_onRejected,
        'opt_onRejected should be a function. Did you pass opt_context ' +
            'as the second argument instead of the third?');
  }

  if (Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error('then'));
  }

  return this.addChildPromise_(
      typeof opt_onFulfilled === 'function' ? opt_onFulfilled : null,
      typeof opt_onRejected === 'function' ? opt_onRejected : null,
      opt_context);
};
Thenable.addImplementation(Promise);


/**
 * Adds callbacks that will operate on the result of the Promise without
 * returning a child Promise (unlike "then").
 *
 * If the Promise is fulfilled, the `onFulfilled` callback will be invoked
 * with the fulfillment value as argument.
 *
 * If the Promise is rejected, the `onRejected` callback will be invoked
 * with the rejection reason as argument.
 *
 * @param {?(function(this:THIS, TYPE):?)=} opt_onFulfilled A
 *     function that will be invoked with the fulfillment value if the Promise
 *     is fulfilled.
 * @param {?(function(this:THIS, *): *)=} opt_onRejected A function that will
 *     be invoked with the rejection reason if the Promise is rejected.
 * @param {THIS=} opt_context An optional context object that will be the
 *     execution context for the callbacks. By default, functions are executed
 *     with the default this.
 * @package
 * @template THIS
 */
Promise.prototype.thenVoid = function(
    opt_onFulfilled, opt_onRejected, opt_context) {
  if (opt_onFulfilled != null) {
    asserts.assertFunction(
        opt_onFulfilled, 'opt_onFulfilled should be a function.');
  }
  if (opt_onRejected != null) {
    asserts.assertFunction(
        opt_onRejected,
        'opt_onRejected should be a function. Did you pass opt_context ' +
            'as the second argument instead of the third?');
  }

  if (Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error('then'));
  }

  // Note: no default rejection handler is provided here as we need to
  // distinguish unhandled rejections.
  this.addCallbackEntry_(Promise.getCallbackEntry_(
      opt_onFulfilled || (functions.UNDEFINED), opt_onRejected || null,
      opt_context));
};


/**
 * Adds a callback that will be invoked when the Promise is settled (fulfilled
 * or rejected). The callback receives no argument, and no new child Promise is
 * created. This is useful for ensuring that cleanup takes place after certain
 * asynchronous operations. Callbacks added with `thenAlways` will be
 * executed in the same order with other calls to `then`,
 * `thenAlways`, or `thenCatch`.
 *
 * Since it does not produce a new child Promise, cancellation propagation is
 * not prevented by adding callbacks with `thenAlways`. A Promise that has
 * a cleanup handler added with `thenAlways` will be canceled if all of
 * its children created by `then` (or `thenCatch`) are canceled.
 * Additionally, since any rejections are not passed to the callback, it does
 * not stop the unhandled rejection handler from running.
 *
 * @param {function(this:THIS): void} onSettled A function that will be invoked
 *     when the Promise is settled (fulfilled or rejected).
 * @param {THIS=} opt_context An optional context object that will be the
 *     execution context for the callbacks. By default, functions are executed
 *     in the global scope.
 * @return {!Promise<TYPE>} This Promise, for chaining additional calls.
 * @template THIS
 */
Promise.prototype.thenAlways = function(onSettled, opt_context) {
  if (Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error('thenAlways'));
  }

  var entry = Promise.getCallbackEntry_(onSettled, onSettled, opt_context);
  entry.always = true;
  this.addCallbackEntry_(entry);
  return this;
};

/**
 * Adds a callback that will be invoked only if the Promise is rejected. This
 * is equivalent to `then(null, onRejected)`.
 *
 * Note: Prefer using `catch` which is interoperable with native browser
 * Promises.
 *
 * @param {function(this:THIS, *): *} onRejected A function that will be
 *     invoked with the rejection reason if this Promise is rejected.
 * @param {THIS=} opt_context An optional context object that will be the
 *     execution context for the callbacks. By default, functions are executed
 *     in the global scope.
 * @return {!Promise} A new Promise that will resolve either to the
 *     value of this promise, or if this promise is rejected, the result of
 *     `onRejected`. The returned Promise will reject if `onRejected` throws.
 * @template THIS
 */
Promise.prototype.thenCatch = function(onRejected, opt_context) {
  if (Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error('thenCatch'));
  }
  return this.addChildPromise_(null, onRejected, opt_context);
};

/**
 * Adds a callback that will be invoked only if the Promise is rejected. This
 * is equivalent to `then(null, onRejected)`.
 *
 * @param {function(this:THIS, *): *} onRejected A function that will be
 *     invoked with the rejection reason if this Promise is rejected.
 * @param {THIS=} opt_context An optional context object that will be the
 *     execution context for the callbacks. By default, functions are executed
 *     in the global scope.
 * @return {!Promise} A new Promise that will resolve either to the
 *     value of this promise, or if this promise is rejected, the result of
 *     `onRejected`. The returned Promise will reject if `onRejected` throws.
 * @template THIS
 */
Promise.prototype.catch = Promise.prototype.thenCatch;


/**
 * Cancels the Promise if it is still pending by rejecting it with a cancel
 * Error. No action is performed if the Promise is already resolved.
 *
 * All child Promises of the canceled Promise will be rejected with the same
 * cancel error, as with normal Promise rejection. If the Promise to be canceled
 * is the only child of a pending Promise, the parent Promise will also be
 * canceled. Cancellation may propagate upward through multiple generations.
 *
 * @param {string=} opt_message An optional debugging message for describing the
 *     cancellation reason.
 */
Promise.prototype.cancel = function(opt_message) {
  if (this.state_ == Promise.State_.PENDING) {
    // Instantiate Error object synchronously. This ensures Error::stack points
    // to the cancel() callsite.
    var err = new Promise.CancellationError(opt_message);
    run(function() {
      this.cancelInternal_(err);
    }, this);
  }
};


/**
 * Cancels this Promise with the given error.
 *
 * @param {!Error} err The cancellation error.
 * @private
 */
Promise.prototype.cancelInternal_ = function(err) {
  if (this.state_ == Promise.State_.PENDING) {
    if (this.parent_) {
      // Cancel the Promise and remove it from the parent's child list.
      this.parent_.cancelChild_(this, err);
      this.parent_ = null;
    } else {
      this.resolve_(Promise.State_.REJECTED, err);
    }
  }
};


/**
 * Cancels a child Promise from the list of callback entries. If the Promise has
 * not already been resolved, reject it with a cancel error. If there are no
 * other children in the list of callback entries, propagate the cancellation
 * by canceling this Promise as well.
 *
 * @param {!Promise} childPromise The Promise to cancel.
 * @param {!Error} err The cancel error to use for rejecting the Promise.
 * @private
 */
Promise.prototype.cancelChild_ = function(childPromise, err) {
  if (!this.callbackEntries_) {
    return;
  }
  var childCount = 0;
  var childEntry = null;
  var beforeChildEntry = null;

  // Find the callback entry for the childPromise, and count whether there are
  // additional child Promises.
  for (var entry = this.callbackEntries_; entry; entry = entry.next) {
    if (!entry.always) {
      childCount++;
      if (entry.child == childPromise) {
        childEntry = entry;
      }
      if (childEntry && childCount > 1) {
        break;
      }
    }
    if (!childEntry) {
      beforeChildEntry = entry;
    }
  }

  // Can a child entry be missing?

  // If the child Promise was the only child, cancel this Promise as well.
  // Otherwise, reject only the child Promise with the cancel error.
  if (childEntry) {
    if (this.state_ == Promise.State_.PENDING && childCount == 1) {
      this.cancelInternal_(err);
    } else {
      if (beforeChildEntry) {
        this.removeEntryAfter_(beforeChildEntry);
      } else {
        this.popEntry_();
      }

      this.executeCallback_(childEntry, Promise.State_.REJECTED, err);
    }
  }
};


/**
 * Adds a callback entry to the current Promise, and schedules callback
 * execution if the Promise has already been settled.
 *
 * @param {Promise.CallbackEntry_} callbackEntry Record containing
 *     `onFulfilled` and `onRejected` callbacks to execute after
 *     the Promise is settled.
 * @private
 */
Promise.prototype.addCallbackEntry_ = function(callbackEntry) {
  if (!this.hasEntry_() &&
      (this.state_ == Promise.State_.FULFILLED ||
       this.state_ == Promise.State_.REJECTED)) {
    this.scheduleCallbacks_();
  }
  this.queueEntry_(callbackEntry);
};


/**
 * Creates a child Promise and adds it to the callback entry list. The result of
 * the child Promise is determined by the state of the parent Promise and the
 * result of the `onFulfilled` or `onRejected` callbacks as
 * specified in the Promise resolution procedure.
 *
 * @see http://promisesaplus.com/#the__method
 *
 * @param {?function(this:THIS, TYPE):
 *          (RESULT|Promise<RESULT>|Thenable)} onFulfilled A callback that
 *     will be invoked if the Promise is fulfilled, or null.
 * @param {?function(this:THIS, *): *} onRejected A callback that will be
 *     invoked if the Promise is rejected, or null.
 * @param {THIS=} opt_context An optional execution context for the callbacks.
 *     in the default calling context.
 * @return {!Promise} The child Promise.
 * @template RESULT,THIS
 * @private
 */
Promise.prototype.addChildPromise_ = function(
    onFulfilled, onRejected, opt_context) {
  if (onFulfilled) {
    onFulfilled =
        asyncStackTag.wrap(onFulfilled, 'goog.Promise.then');
  }
  if (onRejected) {
    onRejected = asyncStackTag.wrap(onRejected, 'goog.Promise.then');
  }

  /** @type {Promise.CallbackEntry_} */
  var callbackEntry = Promise.getCallbackEntry_(null, null, null);

  callbackEntry.child = new Promise(function(resolve, reject) {
    // Invoke onFulfilled, or resolve with the parent's value if absent.
    callbackEntry.onFulfilled = onFulfilled ? function(value) {
      try {
        var result = onFulfilled.call(opt_context, value);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    } : resolve;

    // Invoke onRejected, or reject with the parent's reason if absent.
    callbackEntry.onRejected = onRejected ? function(reason) {
      try {
        var result = onRejected.call(opt_context, reason);
        if (result === undefined &&
            reason instanceof Promise.CancellationError) {
          // Propagate cancellation to children if no other result is returned.
          reject(reason);
        } else {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    } : reject;
  });

  callbackEntry.child.parent_ = this;
  this.addCallbackEntry_(callbackEntry);
  return callbackEntry.child;
};


/**
 * Unblocks the Promise and fulfills it with the given value.
 *
 * @param {TYPE} value
 * @private
 */
Promise.prototype.unblockAndFulfill_ = function(value) {
  asserts.assert(this.state_ == Promise.State_.BLOCKED);
  this.state_ = Promise.State_.PENDING;
  this.resolve_(Promise.State_.FULFILLED, value);
};


/**
 * Unblocks the Promise and rejects it with the given rejection reason.
 *
 * @param {*} reason
 * @private
 */
Promise.prototype.unblockAndReject_ = function(reason) {
  asserts.assert(this.state_ == Promise.State_.BLOCKED);
  this.state_ = Promise.State_.PENDING;
  this.resolve_(Promise.State_.REJECTED, reason);
};


/**
 * Attempts to resolve a Promise with a given resolution state and value. This
 * is a no-op if the given Promise has already been resolved.
 *
 * If the given result is a Thenable (such as another Promise), the Promise will
 * be settled with the same state and result as the Thenable once it is itself
 * settled.
 *
 * If the given result is not a Thenable, the Promise will be settled (fulfilled
 * or rejected) with that result based on the given state.
 *
 * @see http://promisesaplus.com/#the_promise_resolution_procedure
 *
 * @param {Promise.State_} state
 * @param {*} x The result to apply to the Promise.
 * @private
 */
Promise.prototype.resolve_ = function(state, x) {
  if (this.state_ != Promise.State_.PENDING) {
    return;
  }

  if (this === x) {
    state = Promise.State_.REJECTED;
    x = new TypeError('Promise cannot resolve to itself');
  }

  this.state_ = Promise.State_.BLOCKED;
  var isThenable = Promise.maybeThen_(
      x, this.unblockAndFulfill_, this.unblockAndReject_, this);
  if (isThenable) {
    return;
  }

  this.result_ = x;
  this.state_ = state;
  // Since we can no longer be canceled, remove link to parent, so that the
  // child promise does not keep the parent promise alive.
  this.parent_ = null;
  this.scheduleCallbacks_();

  if (state == Promise.State_.REJECTED &&
      !(x instanceof Promise.CancellationError)) {
    Promise.addUnhandledRejection_(this, x);
  }
};


/**
 * Invokes the "then" method of an input value if that value is a Thenable. This
 * is a no-op if the value is not thenable.
 *
 * @param {?} value A potentially thenable value.
 * @param {!Function} onFulfilled
 * @param {!Function} onRejected
 * @param {?} context
 * @return {boolean} Whether the input value was thenable.
 * @private
 */
Promise.maybeThen_ = function(value, onFulfilled, onRejected, context) {
  if (value instanceof Promise) {
    value.thenVoid(onFulfilled, onRejected, context);
    return true;
  } else if (Thenable.isImplementedBy(value)) {
    value = /** @type {!Thenable} */ (value);
    value.then(onFulfilled, onRejected, context);
    return true;
  } else if (goog.isObject(value)) {
    const thenable = /** @type {!Thenable} */ (value);
    try {
      var then = thenable.then;
      if (typeof then === 'function') {
        Promise.tryThen_(thenable, then, onFulfilled, onRejected, context);
        return true;
      }
    } catch (e) {
      onRejected.call(context, e);
      return true;
    }
  }

  return false;
};


/**
 * Attempts to call the `then` method on an object in the hopes that it is
 * a Promise-compatible instance. This allows interoperation between different
 * Promise implementations, however a non-compliant object may cause a Promise
 * to hang indefinitely. If the `then` method throws an exception, the
 * dependent Promise will be rejected with the thrown value.
 *
 * @see http://promisesaplus.com/#point-70
 *
 * @param {Thenable} thenable An object with a `then` method that may be
 *     compatible with the Promise/A+ specification.
 * @param {!Function} then The `then` method of the Thenable object.
 * @param {!Function} onFulfilled
 * @param {!Function} onRejected
 * @param {*} context
 * @private
 */
Promise.tryThen_ = function(
    thenable, then, onFulfilled, onRejected, context) {
  var called = false;
  var resolve = function(value) {
    if (!called) {
      called = true;
      onFulfilled.call(context, value);
    }
  };

  var reject = function(reason) {
    if (!called) {
      called = true;
      onRejected.call(context, reason);
    }
  };

  try {
    then.call(thenable, resolve, reject);
  } catch (e) {
    reject(e);
  }
};


/**
 * Executes the pending callbacks of a settled Promise after a timeout.
 *
 * Section 2.2.4 of the Promises/A+ specification requires that Promise
 * callbacks must only be invoked from a call stack that only contains Promise
 * implementation code, which we accomplish by invoking callback execution after
 * a timeout. If `startExecution_` is called multiple times for the same
 * Promise, the callback chain will be evaluated only once. Additional callbacks
 * may be added during the evaluation phase, and will be executed in the same
 * event loop.
 *
 * All Promises added to the waiting list during the same browser event loop
 * will be executed in one batch to avoid using a separate timeout per Promise.
 *
 * @private
 */
Promise.prototype.scheduleCallbacks_ = function() {
  if (!this.executing_) {
    this.executing_ = true;
    run(this.executeCallbacks_, this);
  }
};


/**
 * @return {boolean} Whether there are any pending callbacks queued.
 * @private
 */
Promise.prototype.hasEntry_ = function() {
  return !!this.callbackEntries_;
};


/**
 * @param {Promise.CallbackEntry_} entry
 * @private
 */
Promise.prototype.queueEntry_ = function(entry) {
  asserts.assert(entry.onFulfilled != null);

  if (this.callbackEntriesTail_) {
    this.callbackEntriesTail_.next = entry;
    this.callbackEntriesTail_ = entry;
  } else {
    // It the work queue was empty set the head too.
    this.callbackEntries_ = entry;
    this.callbackEntriesTail_ = entry;
  }
};


/**
 * @return {Promise.CallbackEntry_} entry
 * @private
 */
Promise.prototype.popEntry_ = function() {
  var entry = null;
  if (this.callbackEntries_) {
    entry = this.callbackEntries_;
    this.callbackEntries_ = entry.next;
    entry.next = null;
  }
  // It the work queue is empty clear the tail too.
  if (!this.callbackEntries_) {
    this.callbackEntriesTail_ = null;
  }

  if (entry != null) {
    asserts.assert(entry.onFulfilled != null);
  }
  return entry;
};


/**
 * @param {Promise.CallbackEntry_} previous
 * @private
 */
Promise.prototype.removeEntryAfter_ = function(previous) {
  asserts.assert(this.callbackEntries_);
  asserts.assert(previous != null);
  // If the last entry is being removed, update the tail
  if (previous.next == this.callbackEntriesTail_) {
    this.callbackEntriesTail_ = previous;
  }

  previous.next = previous.next.next;
};


/**
 * Executes all pending callbacks for this Promise.
 *
 * @private
 */
Promise.prototype.executeCallbacks_ = function() {
  var entry = null;
  while (entry = this.popEntry_()) {
    if (Promise.LONG_STACK_TRACES) {
      this.currentStep_++;
    }
    this.executeCallback_(entry, this.state_, this.result_);
  }
  this.executing_ = false;
};


/**
 * Executes a pending callback for this Promise. Invokes an `onFulfilled`
 * or `onRejected` callback based on the settled state of the Promise.
 *
 * @param {!Promise.CallbackEntry_} callbackEntry An entry containing the
 *     onFulfilled and/or onRejected callbacks for this step.
 * @param {Promise.State_} state The resolution status of the Promise,
 *     either FULFILLED or REJECTED.
 * @param {*} result The settled result of the Promise.
 * @private
 */
Promise.prototype.executeCallback_ = function(
    callbackEntry, state, result) {
  // Cancel an unhandled rejection if the then/thenVoid call had an onRejected.
  if (state == Promise.State_.REJECTED && callbackEntry.onRejected &&
      !callbackEntry.always) {
    this.removeUnhandledRejection_();
  }

  if (callbackEntry.child) {
    // When the parent is settled, the child no longer needs to hold on to it,
    // as the parent can no longer be canceled.
    callbackEntry.child.parent_ = null;
    Promise.invokeCallback_(callbackEntry, state, result);
  } else {
    // Callbacks created with thenAlways or thenVoid do not have the rejection
    // handling code normally set up in the child Promise.
    try {
      callbackEntry.always ?
          callbackEntry.onFulfilled.call(callbackEntry.context) :
          Promise.invokeCallback_(callbackEntry, state, result);
    } catch (err) {
      Promise.handleRejection_.call(null, err);
    }
  }
  Promise.returnEntry_(callbackEntry);
};


/**
 * Executes the onFulfilled or onRejected callback for a callbackEntry.
 *
 * @param {!Promise.CallbackEntry_} callbackEntry
 * @param {Promise.State_} state
 * @param {*} result
 * @private
 */
Promise.invokeCallback_ = function(callbackEntry, state, result) {
  if (state == Promise.State_.FULFILLED) {
    callbackEntry.onFulfilled.call(callbackEntry.context, result);
  } else if (callbackEntry.onRejected) {
    callbackEntry.onRejected.call(callbackEntry.context, result);
  }
};


/**
 * Records a stack trace entry for functions that call `then` or the
 * Promise constructor. May be disabled by unsetting `LONG_STACK_TRACES`.
 *
 * @param {!Error} err An Error object created by the calling function for
 *     providing a stack trace.
 * @private
 */
Promise.prototype.addStackTrace_ = function(err) {
  if (Promise.LONG_STACK_TRACES && typeof err.stack === 'string') {
    // Extract the third line of the stack trace, which is the entry for the
    // user function that called into Promise code.
    var trace = err.stack.split('\n', 4)[3];
    var message = err.message;

    // Pad the message to align the traces.
    message += Array(11 - message.length).join(' ');
    this.stack_.push(message + trace);
  }
};


/**
 * Adds extra stack trace information to an exception for the list of
 * asynchronous `then` calls that have been run for this Promise. Stack
 * trace information is recorded in {@see #addStackTrace_}, and appended to
 * rethrown errors when `LONG_STACK_TRACES` is enabled.
 *
 * @param {?} err An unhandled exception captured during callback execution.
 * @private
 */
Promise.prototype.appendLongStack_ = function(err) {
  if (Promise.LONG_STACK_TRACES && err && typeof err.stack === 'string' &&
      this.stack_.length) {
    var longTrace = ['Promise trace:'];

    for (var promise = this; promise; promise = promise.parent_) {
      for (var i = this.currentStep_; i >= 0; i--) {
        longTrace.push(promise.stack_[i]);
      }
      longTrace.push(
          'Value: ' +
          '[' + (promise.state_ == Promise.State_.REJECTED ? 'REJECTED' :
                                                                  'FULFILLED') +
          '] ' +
          '<' + String(promise.result_) + '>');
    }
    err.stack += '\n\n' + longTrace.join('\n');
  }
};


/**
 * Marks this rejected Promise as having being handled. Also marks any parent
 * Promises in the rejected state as handled. The rejection handler will no
 * longer be invoked for this Promise (if it has not been called already).
 *
 * @private
 */
Promise.prototype.removeUnhandledRejection_ = function() {
  if (Promise.UNHANDLED_REJECTION_DELAY > 0) {
    for (var p = this; p && p.unhandledRejectionId_; p = p.parent_) {
      goog.global.clearTimeout(p.unhandledRejectionId_);
      p.unhandledRejectionId_ = 0;
    }
  } else if (Promise.UNHANDLED_REJECTION_DELAY == 0) {
    for (var p = this; p && p.hadUnhandledRejection_; p = p.parent_) {
      p.hadUnhandledRejection_ = false;
    }
  }
};


/**
 * Marks this rejected Promise as unhandled. If no `onRejected` callback
 * is called for this Promise before the `UNHANDLED_REJECTION_DELAY`
 * expires, the reason will be passed to the unhandled rejection handler. The
 * handler typically rethrows the rejection reason so that it becomes visible in
 * the developer console.
 *
 * @param {!Promise} promise The rejected Promise.
 * @param {*} reason The Promise rejection reason.
 * @private
 */
Promise.addUnhandledRejection_ = function(promise, reason) {
  if (Promise.UNHANDLED_REJECTION_DELAY > 0) {
    promise.unhandledRejectionId_ = goog.global.setTimeout(function() {
      promise.appendLongStack_(reason);
      Promise.handleRejection_.call(null, reason);
    }, Promise.UNHANDLED_REJECTION_DELAY);

  } else if (Promise.UNHANDLED_REJECTION_DELAY == 0) {
    promise.hadUnhandledRejection_ = true;
    run(function() {
      if (promise.hadUnhandledRejection_) {
        promise.appendLongStack_(reason);
        Promise.handleRejection_.call(null, reason);
      }
    });
  }
};


/**
 * A method that is invoked with the rejection reasons for Promises that are
 * rejected but have no `onRejected` callbacks registered yet.
 * @type {function(*)}
 * @private
 */
Promise.handleRejection_ = throwException;


/**
 * Sets a handler that will be called with reasons from unhandled rejected
 * Promises. If the rejected Promise (or one of its descendants) has an
 * `onRejected` callback registered, the rejection will be considered
 * handled, and the rejection handler will not be called.
 *
 * By default, unhandled rejections are rethrown so that the error may be
 * captured by the developer console or a `window.onerror` handler.
 *
 * @param {function(*)} handler A function that will be called with reasons from
 *     rejected Promises. Defaults to `throwException`.
 */
Promise.setUnhandledRejectionHandler = function(handler) {
  Promise.handleRejection_ = handler;
};



/**
 * Error used as a rejection reason for canceled Promises.  This will still be
 * a rejection, but should generally be ignored by other error handlers (because
 * cancellation should not be a reportable error).
 *
 * @param {string=} opt_message
 * @constructor
 * @extends {DebugError}
 * @final
 */
Promise.CancellationError = function(opt_message) {
  Promise.CancellationError.base(this, 'constructor', opt_message);
  this.reportErrorToServer = false;
};
goog.inherits(Promise.CancellationError, DebugError);


/** @override */
Promise.CancellationError.prototype.name = 'cancel';



/**
 * Internal implementation of the resolver interface.
 *
 * @param {!Promise<TYPE>} promise
 * @param {function((TYPE|Promise<TYPE>|Thenable)=)} resolve
 * @param {function(*=): void} reject
 * @implements {Resolver<TYPE>}
 * @final @struct
 * @constructor
 * @private
 * @template TYPE
 */
Promise.Resolver_ = function(promise, resolve, reject) {
  /** @const */
  this.promise = promise;

  /** @const */
  this.resolve = resolve;

  /** @const */
  this.reject = reject;
};
