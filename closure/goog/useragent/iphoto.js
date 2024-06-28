/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Newer versions of iPhoto include a Safari plugin which allows
 * the browser to detect if iPhoto is installed. Adapted from detection code
 * built into the Mac.com Gallery RSS feeds.
 * @see ../demos/useragent.html
 */


import * as googString from '../string/string.js';

import * as userAgent from './useragent.js';

/**
 * Whether we can detect that the user has iPhoto installed.
 * @type {boolean}
 */
export var HAS_IPHOTO;


/**
 * The version of iPhoto installed if found.
 * @type {string}
 */
export var VERSION;


(function() {
 var hasIphoto = false;
 var version = '';

 /**
   * The plugin description string contains the version number as in the form
   * 'iPhoto 700'. This returns just the version number as a dotted string,
   * e.g., '7.0.0', compatible with `string.compareVersions`.
   * @param {string} desc The version string.
   * @return {string} The dotted version.
   */
 function getIphotoVersion(desc) {
   var matches = desc.match(/\d/g);
   return matches.join('.');
 }

 if (userAgent.WEBKIT && navigator.mimeTypes &&
     navigator.mimeTypes.length > 0) {
   var iphoto = navigator.mimeTypes['application/photo'];

   if (iphoto) {
     hasIphoto = true;
     var description = iphoto['description'];

     if (description) {
       version = getIphotoVersion(description);
     }
   }
 }

 HAS_IPHOTO = hasIphoto;


 VERSION = version;
})();


/**
 * Whether the installed version of iPhoto is as new or newer than a given
 * version.
 * @param {string} version The version to check.
 * @return {boolean} Whether the installed version of iPhoto is as new or newer
 *     than a given version.
 */
export function isVersion(version) {
 return googString.compareVersions(VERSION, version) >=
     0;
}
