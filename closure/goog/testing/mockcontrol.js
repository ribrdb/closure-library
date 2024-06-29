goog.declareModuleId('goog.testing.mockcontrol');
/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A MockControl holds a set of mocks for a particular test.
 * It consolidates calls to $replay, $verify, and $tearDown, which simplifies
 * the test and helps avoid omissions.
 *
 * You can create and control a mock:
 *   var mockFoo = mockControl.addMock(new MyMock(Foo));
 *
 * MockControl also exposes some convenience functions that create
 * controlled mocks for common mocks: StrictMock, LooseMock,
 * FunctionMock, MethodMock, and GlobalFunctionMock.
 */


goog.setTestOnly('goog.testing.MockControl');

import { Promise } from '../promise/promise.js';
import * as testing from './functionmock.js';
import { LooseMock } from './loosemock.js';
import { StrictMock } from './strictmock.js';
const { MockInterface } = goog.requireType('goog.testing.mockinterface');



/**
 * Controls a set of mocks.  Controlled mocks are replayed, verified, and
 * cleaned-up at the same time.
 * @constructor
 */
export function MockControl() {
  /**
     * The list of mocks being controlled.
     * @type {Array<MockInterface>}
     * @private
     */
  this.mocks_ = [];
}


/**
 * Takes control of this mock.
 * @param {MockInterface} mock Mock to be controlled.
 * @return {MockInterface} The same mock passed in,
 *     for convenience.
 */
MockControl.prototype.addMock = function(mock) {
  this.mocks_.push(mock);
  return mock;
};


/**
 * Calls replay on each controlled mock.
 */
MockControl.prototype.$replayAll = function() {
  this.mocks_.forEach(function(m) {
    m.$replay();
  });
};


/**
 * Calls reset on each controlled mock.
 */
MockControl.prototype.$resetAll = function() {
  this.mocks_.forEach(function(m) {
    m.$reset();
  });
};


/**
 * Returns a Promise that resolves when all of the controlled mocks have
 * finished and verified.
 * @return {!Promise<!Array<undefined>>}
 */
MockControl.prototype.$waitAndVerifyAll = function() {
  return Promise.all(this.mocks_.map(function(m) {
    return m.$waitAndVerify();
  }));
};


/**
 * Calls verify on each controlled mock.
 */
MockControl.prototype.$verifyAll = function() {
  this.mocks_.forEach(function(m) {
    m.$verify();
  });
};


/**
 * Calls tearDown on each controlled mock, if necesssary.
 */
MockControl.prototype.$tearDown = function() {
  this.mocks_.forEach(function(m) {
    if (!m) {
      return;
    }
    m = /** @type {?} */ (m);
    // $tearDown if defined.
    if (m.$tearDown) {
      m.$tearDown();
    }
  });
};


/**
 * Creates a controlled StrictMock.  Passes its arguments through to the
 * StrictMock constructor.
 * @param {Object|Function} objectToMock The object that should be mocked, or
 *    the constructor of an object to mock.
 * @param {boolean=} opt_mockStaticMethods An optional argument denoting that
 *     a mock should be constructed from the static functions of a class.
 * @param {boolean=} opt_createProxy An optional argument denoting that
 *     a proxy for the target mock should be created.
 * @return {!StrictMock} The mock object.
 */
MockControl.prototype.createStrictMock = function(
    objectToMock, opt_mockStaticMethods, opt_createProxy) {
  var m = new StrictMock(
      objectToMock, opt_mockStaticMethods, opt_createProxy);
  this.addMock(m);
  return m;
};


/**
 * Creates a controlled LooseMock.  Passes its arguments through to the
 * LooseMock constructor.
 * @param {Object|Function} objectToMock The object that should be mocked, or
 *    the constructor of an object to mock.
 * @param {boolean=} opt_ignoreUnexpectedCalls Whether to ignore unexpected
 *     calls.
 * @param {boolean=} opt_mockStaticMethods An optional argument denoting that
 *     a mock should be constructed from the static functions of a class.
 * @param {boolean=} opt_createProxy An optional argument denoting that
 *     a proxy for the target mock should be created.
 * @return {!LooseMock} The mock object.
 */
MockControl.prototype.createLooseMock = function(
    objectToMock, opt_ignoreUnexpectedCalls, opt_mockStaticMethods,
    opt_createProxy) {
  var m = new LooseMock(
      objectToMock, opt_ignoreUnexpectedCalls, opt_mockStaticMethods,
      opt_createProxy);
  this.addMock(m);
  return m;
};


/**
 * Creates a controlled FunctionMock.  Passes its arguments through to the
 * FunctionMock constructor.
 * @param {string=} opt_functionName The optional name of the function to mock
 *     set to '[anonymous mocked function]' if not passed in.
 * @param {number=} opt_strictness One of testing.Mock.LOOSE or
 *     testing.Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked function.
 */
MockControl.prototype.createFunctionMock = function(
    opt_functionName, opt_strictness) {
  var m = testing.createFunctionMock(opt_functionName, opt_strictness);
  this.addMock(m);
  return m;
};


/**
 * Creates a controlled MethodMock.  Passes its arguments through to the
 * MethodMock constructor.
 * @param {Object} scope The scope of the method to be mocked out.
 * @param {string} functionName The name of the function we're going to mock.
 * @param {number=} opt_strictness One of testing.Mock.LOOSE or
 *     testing.Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked method.
 */
MockControl.prototype.createMethodMock = function(
    scope, functionName, opt_strictness) {
  var m = testing.createMethodMock(scope, functionName, opt_strictness);
  this.addMock(m);
  return m;
};


/**
 * Creates a controlled MethodMock for a constructor.  Passes its arguments
 * through to the MethodMock constructor. See
 * {@link testing.createConstructorMock} for details.
 * @param {Object} scope The scope of the constructor to be mocked out.
 * @param {string} constructorName The name of the function we're going to mock.
 * @param {number=} opt_strictness One of testing.Mock.LOOSE or
 *     testing.Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked method.
 */
MockControl.prototype.createConstructorMock = function(
    scope, constructorName, opt_strictness) {
  var m = testing.createConstructorMock(
      scope, constructorName, opt_strictness);
  this.addMock(m);
  return m;
};


/**
 * Creates a controlled GlobalFunctionMock.  Passes its arguments through to the
 * GlobalFunctionMock constructor.
 * @param {string} functionName The name of the function we're going to mock.
 * @param {number=} opt_strictness One of testing.Mock.LOOSE or
 *     testing.Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked function.
 */
MockControl.prototype.createGlobalFunctionMock = function(
    functionName, opt_strictness) {
  var m = testing.createGlobalFunctionMock(functionName, opt_strictness);
  this.addMock(m);
  return m;
};
