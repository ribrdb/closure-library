/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Test adapter for testing Closure Promises against the
 * Promises/A+ Compliance Test Suite, which is implemented as a Node.js module.
 *
 * This test suite adapter may not be run in Node.js directly, but must first be
 * compiled with the Closure Compiler to pull in the required dependencies.
 *
 * @see https://npmjs.org/package/promises-aplus-tests
 * @suppress {undefinedVars} Node.js's process and require
 */

import { Promise } from './promise.js';

goog.setTestOnly('goog.promise.testSuiteAdapter');


var promisesAplusTests = /** @type {function(!Object, function(*))} */ (
    require('promises-aplus-tests'));


/**
 * Adapter for specifying Promise-creating functions to the Promises test suite.
 * @const
 */
export var testSuiteAdapter = {
  /** @type {function(*): !Promise} */
  'resolved': Promise.resolve,

  /** @type {function(*): !Promise} */
  'rejected': Promise.reject,

  /** @return {!Object} */
  'deferred': function() {
    var promiseObj = {};
    promiseObj['promise'] = new Promise(function(resolve, reject) {
      promiseObj['resolve'] = resolve;
      promiseObj['reject'] = reject;
    });
    return promiseObj;
  }
};


// Node.js defines setTimeout globally, but Closure relies on finding it
// defined on goog.global.
goog.exportSymbol('setTimeout', setTimeout);


// Rethrowing an error to the global scope kills Node immediately. Suppress
// error rethrowing for running this test suite.
Promise.setUnhandledRejectionHandler(() => {});


// Run the tests, exiting with a failure code if any of the tests fail.
promisesAplusTests(
    testSuiteAdapter,
    /**
     * @suppress {missingProperties}
     * @param {?} err
     */
    function(err) {
      if (err) {
        process.exit(1);
      }
    });
