/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A wrapper for MockControl that provides mocks and assertions
 * for testing asynchronous code. All assertions will only be verified when
 * $verifyAll is called on the wrapped MockControl.
 *
 * This class is meant primarily for testing code that exposes asynchronous APIs
 * without being truly asynchronous (using asynchronous primitives like browser
 * events or timeouts). This is often the case when true asynchronous
 * depedencies have been mocked out. This means that it doesn't rely on
 * AsyncTestCase or DeferredTestCase, although it can be used with those as
 * well.
 *
 * Example usage:
 *
 * <pre>
 * var mockControl = new testingMockControl();
 * var asyncMockControl = new MockControl(mockControl);
 *
 * myAsyncObject.onSuccess(asyncMockControl.asyncAssertEquals(
 *     'callback should run and pass the correct value',
 *     'http://someurl.com');
 * asyncMockControl.assertDeferredEquals(
 *     'deferred object should be resolved with the correct value',
 *     'http://someurl.com',
 *     myAsyncObject.getDeferredUrl());
 * asyncMockControl.run();
 * mockControl.$verifyAll();
 * </pre>
 */


goog.setTestOnly('goog.testing.async.MockControl');

import * as asserts from '../../asserts/asserts.js';
import { Deferred } from '../../../../third_party/closure/goog/mochikit/async/deferred.js';
import * as debug from '../../debug/debug.js';
import { MockControl as testingMockControl } from '../mockcontrol.js';
import * as testingAsserts from '../asserts.js';
import { IgnoreArgument } from '../mockmatchers.js';

/**
 * Provides asynchronous mocks and assertions controlled by a parent
 * MockControl.
 *
 * @param {testingMockControl} mockControl The parent MockControl.
 * @constructor
 * @final
 */
export function MockControl(mockControl) {
  /**
     * The parent MockControl.
     * @type {testingMockControl}
     * @private
     */
  this.mockControl_ = mockControl;
}


/**
 * Returns a function that will assert that it will be called, and run the given
 * callback when it is.
 *
 * @template THIS
 * @param {string} name The name of the callback mock.
 * @param {function(this:THIS, ...*) : *} callback The wrapped callback. This will be
 *     called when the returned function is called.
 * @param {THIS=} opt_selfObj The object which this should point to when the
 *     callback is run.
 * @return {!Function} The mock callback.
 * @suppress {missingProperties} Mocks do not fit in the type system well.
 */
MockControl.prototype.createCallbackMock = function(
    name, callback, opt_selfObj) {
  asserts.assert(
      typeof name === 'string',
      'name parameter ' + debug.deepExpose(name) + ' should be a string');

  const ignored = new IgnoreArgument();

  // Use everyone's favorite "double-cast" trick to subvert the type system.
  const mock = this.mockControl_.createFunctionMock(name);
  const mockAsFn = /** @type {Function} */ (/** @type {*} */ (mock));

  mockAsFn(ignored).$does(function(args) {
    return callback.apply(opt_selfObj || /** @type {?} */ (this), args);
  });
  mock.$replay();
  return function() {
    return mockAsFn(arguments);
  };
};


/**
 * Returns a function that will assert that its arguments are equal to the
 * arguments given to asyncAssertEquals. In addition, the function also asserts
 * that it will be called.
 *
 * @param {string} message A message to print if the arguments are wrong.
 * @param {...*} var_args The arguments to assert.
 * @return {function(...*) : void} The mock callback.
 */
MockControl.prototype.asyncAssertEquals = function(
    message, var_args) {
  const expectedArgs = Array.prototype.slice.call(arguments, 1);
  return this.createCallbackMock('asyncAssertEquals', function() {
    assertObjectEquals(
        message, expectedArgs, Array.prototype.slice.call(arguments));
  });
};


/**
 * Asserts that a deferred object will have an error and call its errback
 * function.
 * @param {Deferred} deferred The deferred object.
 * @param {function() : void} fn A function wrapping the code in which the error
 *     will occur.
 */
MockControl.prototype.assertDeferredError = function(
    deferred, fn) {
  deferred.addErrback(
      this.createCallbackMock('assertDeferredError', function() {}));
  fn();
};


/**
 * Asserts that a deferred object will call its callback with the given value.
 *
 * @param {string} message A message to print if the arguments are wrong.
 * @param {Deferred|*} expected The expected value. If this is a
 *     deferred object, then the expected value is the deferred value.
 * @param {Deferred|*} actual The actual value. If this is a deferred
 *     object, then the actual value is the deferred value. Either this or
 *     'expected' must be deferred.
 */
MockControl.prototype.assertDeferredEquals = function(
    message, expected, actual) {
  if (expected instanceof Deferred) {
    // Assert that the first deferred is resolved.
    expected.addCallback(
        this.createCallbackMock('assertDeferredEquals', function(exp) {
          // Assert that the second deferred is resolved, and that the value is
          // as expected.
          if (actual instanceof Deferred) {
            actual.addCallback(this.asyncAssertEquals(message, exp));
          } else {
            assertObjectEquals(message, exp, actual);
          }
        }, this));
  } else if (actual instanceof Deferred) {
    actual.addCallback(this.asyncAssertEquals(message, expected));
  } else {
    throw new Error('Either expected or actual must be deferred');
  }
};
