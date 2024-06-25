/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility methods for Protocol Buffer 2 implementation.
 */

import * as asserts from '../asserts/asserts.js';


/**
 * @define {boolean} Defines a PBCHECK constant that can be turned off by
 * clients of PB2. This for is clients that do not want assertion/checking
 * running even in non-COMPILED builds.
 */
export var PBCHECK = goog.define('goog.proto2.Util.PBCHECK', !COMPILED);


/**
 * Asserts that the given condition is true, if and only if the PBCHECK
 * flag is on.
 *
 * @param {*} condition The condition to check.
 * @param {string=} opt_message Error message in case of failure.
 * @throws {Error} Assertion failed, the condition evaluates to false.
 */
export function assert(condition, opt_message) {
 if (PBCHECK) {
   asserts.assert(condition, opt_message);
 }
}


/**
 * Returns true if debug assertions (checks) are on.
 *
 * @return {boolean} The value of the PBCHECK constant.
 */
export function conductChecks() {
 return PBCHECK;
}
