/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Detection of JScript version.
 */


import * as googString from '../string/string.js';


/**
 * @define {boolean} True if it is known at compile time that the runtime
 *     environment will not be using JScript.
 */
export var ASSUME_NO_JSCRIPT = goog.define('goog.userAgent.jscript.ASSUME_NO_JSCRIPT', false);


/**
 * Whether we detect that the user agent is using Microsoft JScript.
 * @type {boolean}
 */
export var HAS_JSCRIPT = false;


/**
 * The installed version of JScript.
 * @type {string}
 */
export var VERSION = '0';


/**
 * Initializer for   Detects if the user agent is using
 * Microsoft JScript and which version of it.
 *
 * This is a named function so that it can be stripped via the jscompiler
 * option for stripping types.
 * @package
 */
export function init() {
 var hasScriptEngine = 'ScriptEngine' in goog.global;
 HAS_JSCRIPT =
     hasScriptEngine && goog.global['ScriptEngine']() == 'JScript';
 if (HAS_JSCRIPT) {
   VERSION = goog.global['ScriptEngineMajorVersion']() +
       '.' + goog.global['ScriptEngineMinorVersion']() + '.' +
       goog.global['ScriptEngineBuildVersion']();
 }
}

if (!ASSUME_NO_JSCRIPT) {
  init();
}

/**
 * Whether the installed version of JScript is as new or newer than a given
 * version.
 * @param {string} version The version to check.
 * @return {boolean} Whether the installed version of JScript is as new or
 *     newer than the given version.
 */
export function isVersion(version) {
 return googString.compareVersions(VERSION, version) >=
     0;
}
