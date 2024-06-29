/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A polyfill for window.requestAnimationFrame and
 * window.cancelAnimationFrame.
 * Code based on https://gist.github.com/paulirish/1579671
 */

/**
 * @define {boolean} If true, will install the requestAnimationFrame polyfill.
 */
export var ENABLED =
    goog.define('goog.dom.animationFrame.polyfill.ENABLED', true);


/**
 * Installs the requestAnimationFrame (and cancelAnimationFrame) polyfill.
 */
export function install() {
  if (ENABLED) {
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    let v;
    for (let i = 0; v = vendors[i] && !goog.global.requestAnimationFrame; ++i) {
      goog.global.requestAnimationFrame =
          goog.global[v + 'RequestAnimationFrame'];
      goog.global.cancelAnimationFrame =
          goog.global[v + 'CancelAnimationFrame'] ||
          goog.global[v + 'CancelRequestAnimationFrame'];
    }

    if (!goog.global.requestAnimationFrame) {
      let lastTime = 0;
      goog.global.requestAnimationFrame = function(callback) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        lastTime = currTime + timeToCall;
        return goog.global.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
      };

      if (!goog.global.cancelAnimationFrame) {
        goog.global.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
      }
    }
  }
};
