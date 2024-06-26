/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Constants for determining keyboard support.
 */

import platform from '../labs/useragent/platform.js';


/**
 * @define {boolean} Whether the user agent is running with in an environment
 * that should use Mac-based keyboard shortcuts (Meta instead of Ctrl, etc.).
 */
export var ASSUME_MAC_KEYBOARD = goog.define('goog.userAgent.keyboard.ASSUME_MAC_KEYBOARD', false);


/**
 * Determines whether Mac-based keyboard shortcuts should be used.
 * @return {boolean}
 * @private
 */
export function determineMacKeyboard_() {
 return platform.isMacintosh() ||
     platform.isIos();
}


/**
 * Whether the user agent is running in an environment that uses Mac-based
 * keyboard shortcuts.
 * @type {boolean}
 */
export var MAC_KEYBOARD = ASSUME_MAC_KEYBOARD ||
determineMacKeyboard_();
