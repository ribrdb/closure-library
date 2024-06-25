goog.declareModuleId('goog.testing.mockinterface');
/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An interface that all mocks should share.
 */

goog.setTestOnly('goog.testing.MockInterface');

import { Promise } from '../promise/promise.js';



/** @interface */
export function MockInterface() {}


/**
 * Write down all the expected functions that have been called on the
 * mock so far. From here on out, future function calls will be
 * compared against this list.
 */
MockInterface.prototype.$replay = function() {};


/**
 * Reset the mock.
 */
MockInterface.prototype.$reset = function() {};


/**
 * Waits for the Mock to gather expectations and then performs verify.
 * @return {!Promise<undefined>}
 */
MockInterface.prototype.$waitAndVerify = function() {};


/**
 * Assert that the expected function calls match the actual calls.
 */
MockInterface.prototype.$verify = function() {};
