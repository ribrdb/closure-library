/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Defines DeferredTestCase class. By calling waitForDeferred(),
 * tests in DeferredTestCase can wait for a Deferred object to complete its
 * callbacks before continuing to the next test.
 *
 * Example Usage:
 *
 *   var deferredTestCase = DeferredTestCase.createAndInstall();
 *   // Optionally, set a longer-than-usual step timeout.
 *   deferredTestCase.stepTimeout = 15 * 1000; // 15 seconds
 *
 *   function testDeferredCallbacks() {
 *     var callbackTime = goog.now();
 *     var callbacks = new Deferred();
 *     deferredTestCase.addWaitForAsync('Waiting for 1st callback', callbacks);
 *     callbacks.addCallback(
 *         function() {
 *           assertTrue(
 *               'We\'re going back in time!', goog.now() >= callbackTime);
 *           callbackTime = goog.now();
 *         });
 *     deferredTestCase.addWaitForAsync('Waiting for 2nd callback', callbacks);
 *     callbacks.addCallback(
 *         function() {
 *           assertTrue(
 *               'We\'re going back in time!', goog.now() >= callbackTime);
 *           callbackTime = goog.now();
 *         });
 *     deferredTestCase.addWaitForAsync('Waiting for last callback', callbacks);
 *     callbacks.addCallback(
 *         function() {
 *           assertTrue(
 *               'We\'re going back in time!', goog.now() >= callbackTime);
 *           callbackTime = goog.now();
 *         });
 *
 *     deferredTestCase.waitForDeferred(callbacks);
 *   }
 *
 * Note that DeferredTestCase still preserves the functionality of
 * AsyncTestCase.
 *
 * @see.Deferred
 * @see AsyncTestCase
 */

goog.setTestOnly('goog.testing.DeferredTestCase');

import { Deferred } from '../../../third_party/closure/goog/mochikit/async/deferred.js';
import { AsyncTestCase } from './asynctestcase.js';
import { TestCase } from './testcase.js';



/**
 * A test case that can asynchronously wait on a Deferred object.
 * @param {string=} opt_name A descriptive name for the test case.
 * @constructor
 * @extends {AsyncTestCase}
 * @deprecated Use TestCase instead. TestCase now
 *    supports async testing using promises.
 */
export function DeferredTestCase(opt_name) {
  AsyncTestCase.call(this, opt_name);
}
goog.inherits(DeferredTestCase, AsyncTestCase);


/**
 * Preferred way of creating a DeferredTestCase. Creates one and initializes it
 * with the G_testRunner.
 * @param {string=} opt_name A descriptive name for the test case.
 * @return {!DeferredTestCase} The created DeferredTestCase.
 */
DeferredTestCase.createAndInstall = function(opt_name) {
  var deferredTestCase = new DeferredTestCase(opt_name);
  TestCase.initializeTestRunner(deferredTestCase);
  return deferredTestCase;
};


/**
 * Handler for when the test produces an error.
 * @param {Error|string} err The error object.
 * @protected
 * @throws Always throws a ControlBreakingException.
 */
DeferredTestCase.prototype.onError = function(err) {
  this.doAsyncError(err);
};


/**
 * Handler for when the test succeeds.
 * @protected
 */
DeferredTestCase.prototype.onSuccess = function() {
  this.continueTesting();
};


/**
 * Adds a callback to update the wait message of this async test case. Using
 * this method generously also helps to document the test flow.
 * @param {string} msg The update wait status message.
 * @param {Deferred} d The deferred object to add the waitForAsync
 *     callback to.
 * @see AsyncTestCase#waitForAsync
 */
DeferredTestCase.prototype.addWaitForAsync = function(msg, d) {
  d.addCallback(goog.bind(this.waitForAsync, this, msg));
};


/**
 * Wires up given Deferred object to the test case, then starts the
 * Deferred object's callback.
 * @param {string|!Deferred} a The wait status message or the
 *     deferred object to wait for.
 * @param {Deferred=} opt_b The deferred object to wait for.
 */
DeferredTestCase.prototype.waitForDeferred = function(a, opt_b) {
  var waitMsg;
  var deferred;
  switch (arguments.length) {
    case 1:
      deferred = /** @type {!Deferred} */ (a);
      waitMsg = null;
      break;
    case 2:
      deferred = /** @type {!Deferred} */ (opt_b);
      waitMsg = a;
      break;
    default:  // Shouldn't be here in compiled mode
      throw new Error('Invalid number of arguments');
  }
  deferred.addCallbacks(this.onSuccess, this.onError, this);
  if (!waitMsg) {
    waitMsg = 'Waiting for deferred in ' + this.getCurrentStepName();
  }
  this.waitForAsync(/** @type {string} */ (waitMsg));
  deferred.callback(true);
};
