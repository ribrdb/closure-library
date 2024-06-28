/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Enable mocking of functions not attached to objects
 * whether they be global / top-level or anonymous methods / closures.
 *
 * See the unit tests for usage.
 */

goog.setTestOnly('goog.testing');

import object from '../object/object.js';
import { LooseMock } from './loosemock.js';
import { Mock } from './mock.js';
import { MockInterface } from './mockinterface.js';
import { PropertyReplacer } from './propertyreplacer.js';
import { StrictMock } from './strictmock.js';


/**
 * Class used to mock a function. Useful for mocking closures and anonymous
 * callbacks etc. Creates a function object that extends Mock.
 * @param {string=} opt_functionName The optional name of the function to mock.
 *     Set to '[anonymous mocked function]' if not passed in.
 * @param {number=} opt_strictness One of Mock.LOOSE or
 *     Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked function.
 * @suppress {missingProperties} Mocks do not fit in the type system well.
 */
export function FunctionMock(opt_functionName, opt_strictness) {
  var fn = function() {
    var args = Array.prototype.slice.call(arguments);
    args.splice(0, 0, opt_functionName || '[anonymous mocked function]');
    return fn.$mockMethod.apply(fn, args);
  };
  var base = opt_strictness === Mock.LOOSE ?
      LooseMock :
      StrictMock;
  object.extend(fn, new base({}));

  return /** @type {!MockInterface} */ (fn);
}


/**
 * Mocks an existing function. Creates a FunctionMock
 * and registers it in the given scope with the name specified by functionName.
 * @param {Object} scope The scope of the method to be mocked out.
 * @param {string} functionName The name of the function we're going to mock.
 * @param {number=} opt_strictness One of Mock.LOOSE or
 *     Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked method.
 * @suppress {strictMissingProperties} $propertyReplacer_ and $tearDown are
 *     not defined on MockInterface
 */
export function MethodMock(scope, functionName, opt_strictness) {
  if (!(functionName in scope)) {
    throw new Error(functionName + ' is not a property of the given scope.');
  }

  var fn = FunctionMock(functionName, opt_strictness);

  fn.$propertyReplacer_ = new PropertyReplacer();
  fn.$propertyReplacer_.set(scope, functionName, fn);
  fn.$tearDown = MethodMock.$tearDown;

  return fn;
}


/**
 * @private
 * @record @extends {MockInterface}
 */
MethodMock.MockInternalInterface_ = function() {};

/** @const {!PropertyReplacer} */
MethodMock.MockInternalInterface_.prototype.$propertyReplacer_;


/**
 * Resets the global function that we mocked back to its original state.
 * @this {MockInterface}
 */
MethodMock.$tearDown = function() {
  /** @type {!MethodMock.MockInternalInterface_} */ (this)
        .$propertyReplacer_.reset();
};


/**
 * Mocks a global / top-level function. Creates a MethodMock
 * in the global scope with the name specified by functionName.
 * @param {string} functionName The name of the function we're going to mock.
 * @param {number=} opt_strictness One of Mock.LOOSE or
 *     Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked global function.
 */
export function GlobalFunctionMock(functionName, opt_strictness) {
  return MethodMock(goog.global, functionName, opt_strictness);
}


/**
 * Convenience method for creating a mock for a function.
 * @param {string=} opt_functionName The optional name of the function to mock
 *     set to '[anonymous mocked function]' if not passed in.
 * @param {number=} opt_strictness One of Mock.LOOSE or
 *     Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked function.
 */
export function createFunctionMock(opt_functionName, opt_strictness) {
  return FunctionMock(opt_functionName, opt_strictness);
}


/**
 * Convenience method for creating a mock for a method.
 * @param {Object} scope The scope of the method to be mocked out.
 * @param {string} functionName The name of the function we're going to mock.
 * @param {number=} opt_strictness One of Mock.LOOSE or
 *     Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked global function.
 */
export function createMethodMock(scope, functionName, opt_strictness) {
  return MethodMock(scope, functionName, opt_strictness);
}


/**
 * Convenience method for creating a mock for a constructor. Copies class
 * members to the mock.
 *
 * <p>When mocking a constructor to return a mocked instance, remember to create
 * the instance mock before mocking the constructor. If you mock the constructor
 * first, then the mock framework will be unable to examine the prototype chain
 * when creating the mock instance.
 * @param {Object} scope The scope of the constructor to be mocked out.
 * @param {string} constructorName The name of the constructor we're going to
 *     mock.
 * @param {number=} opt_strictness One of Mock.LOOSE or
 *     Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked constructor.
 */
export function createConstructorMock(scope, constructorName, opt_strictness) {
  var realConstructor = scope[constructorName];
  var constructorMock =
      MethodMock(scope, constructorName, opt_strictness);

  // Copy class members from the real constructor to the mock. Do not copy
  // the closure superClass_ property (see goog.inherits), the built-in
  // prototype property, or properties added to Function.prototype
  // TODO(nickreid): Should this work for non-enumerable properties, like are
  // created by ES6 classes.
  for (var property in realConstructor) {
    if (property != 'superClass_' && property != 'prototype' &&
        realConstructor.hasOwnProperty(property)) {
      constructorMock[property] = realConstructor[property];
    }
  }
  return constructorMock;
}


/**
 * Convenience method for creating a mocks for a global / top-level function.
 * @param {string} functionName The name of the function we're going to mock.
 * @param {number=} opt_strictness One of Mock.LOOSE or
 *     Mock.STRICT. The default is STRICT.
 * @return {!MockInterface} The mocked global function.
 */
export function createGlobalFunctionMock(functionName, opt_strictness) {
  return GlobalFunctionMock(functionName, opt_strictness);
}
