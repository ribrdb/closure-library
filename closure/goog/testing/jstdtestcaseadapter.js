/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Conditionally add "adapter" methods to allow JSTD test cases
 * to run under the Closure Test Runner.  The goal is to allow tests
 * to function regardless of the environment they are running under to allow
 * them to transition to the Closure test runner and allow JSTD runner to be
 * deprecated.
 */
goog.setTestOnly('goog.testing.JsTdTestCaseAdapter');

import { run } from '../async/run.js';
import * as functions from '../functions/functions.js';
import * as JsTdAsyncWrapper from './jstdasyncwrapper.js';
import { TestCase as testingTestCase } from './testcase.js';
import * as jsunit from './jsunit.js';


/**
 * @param {string} testCaseName The name of the test case.
 * @param {function(): boolean} condition A condition to determine whether to
 *     run the tests.
 * @param {?=} opt_proto An optional prototype object for the test case.
 * @param {boolean=} opt_isAsync Whether this test is an async test using the
 *     JSTD testing queue.
 * @return {!Function}
 * @private
 * @suppress {checkPrototypalTypes}
 */
function TestCaseFactory_(testCaseName, condition, opt_proto, opt_isAsync) {
    /** @constructor */
    var T = function() {};
    if (opt_proto) T.prototype = opt_proto;
    T.displayName = testCaseName;

    run(function() {
        var t = new T();
        if (opt_isAsync) {
          t = JsTdAsyncWrapper.convertToAsyncTestObj(t);
        }
        var testCase = new testingTestCase(testCaseName);
        testCase.shouldRunTests = condition;
        testCase.setTestObj(t);
        testCase.autoDiscoverTests();
        testingTestCase.initializeTestRunner(testCase, undefined);
    });

    return T;
}


/**
 * @param {string} testCaseName The name of the test case.
 * @param {?=} opt_proto An optional prototype object for the test case.
 * @return {!Function}
 * @private
 */
function TestCase_(testCaseName, opt_proto) {
    return TestCaseFactory_(
        testCaseName, functions.TRUE, opt_proto);
}


/**
 * @param {string} testCaseName The name of the test case.
 * @param {function(): boolean} condition A condition to determine whether to
 *     run the tests.
 * @param {?=} opt_proto An optional prototype object for the test case.
 * @return {!Function}
 * @private
 */
function ConditionalTestCase_(testCaseName, condition, opt_proto) {
    return TestCaseFactory_(
        testCaseName, condition, opt_proto);
}


/**
 * @param {string} testCaseName The name of the test case.
 * @param {?=} opt_proto An optional prototype object for the test case.
 * @return {!Function}
 * @private
 */
function AsyncTestCase_(testCaseName, opt_proto) {
    return TestCaseFactory_(
        testCaseName, functions.TRUE, opt_proto, true);
}


/**
 * @param {string} testCaseName The name of the test case.
 * @param {function(): boolean} condition A condition to determine whether to
 *     run the tests.
 * @param {?=} opt_proto An optional prototype object for the test case.
 * @return {!Function}
 * @private
 */
function AsyncConditionalTestCase_(testCaseName, condition, opt_proto) {
    return TestCaseFactory_(
        testCaseName, condition, opt_proto, true);
}


// --- conditionally add polyfills for the basic JSTD API ---


/** @suppress {duplicate} */
var TestCase = TestCase || TestCase_;


/** @suppress {duplicate} */
var ConditionalTestCase = ConditionalTestCase ||
    ConditionalTestCase_;


/** @suppress {duplicate} */
var AsyncTestCase =
    AsyncTestCase || AsyncTestCase_;


/** @suppress {duplicate} */
var AsyncConditionalTestCase = AsyncConditionalTestCase ||
    AsyncConditionalTestCase_;


/** @suppress {duplicate} */
var ConditionalAsyncTestCase = ConditionalAsyncTestCase ||
    AsyncConditionalTestCase_;


// The API is also available under the jstestdriver namespace.

/** @suppress {duplicate} */
var jstestdriver = jstestdriver || {};
if (!jstestdriver.testCaseManager) {
  /** A jstestdriver API polyfill. */
  jstestdriver.testCaseManager = {
    TestCase: TestCase,
    ConditionalTestCase: ConditionalTestCase,
    AsyncTestCase: AsyncTestCase,
    AsyncConditionalTestCase: AsyncConditionalTestCase,
    ConditionalAsyncTestCase: ConditionalAsyncTestCase
  };
}
