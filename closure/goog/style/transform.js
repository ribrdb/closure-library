/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility methods to deal with CSS3 transforms programmatically.
 */

import * as functions from '../functions/functions.js';

import { Coordinate } from '../math/coordinate.js';
import { Coordinate3 } from '../math/coordinate3.js';
import * as style from './style.js';
import * as userAgent from '../useragent/useragent.js';



/**
 * Returns the x,y translation component of any CSS transforms applied to the
 * element, in pixels.
 *
 * @param {!Element} element The element to get the translation of.
 * @return {!Coordinate} The CSS translation of the element in px.
 */
export function getTranslation(element) {
  var transform = style.getComputedTransform(element);
  var matrixConstructor = matrixConstructor_();
  if (transform && matrixConstructor) {
    var matrix = new matrixConstructor(transform);
    if (matrix) {
      return new Coordinate(matrix.m41, matrix.m42);
    }
  }
  return new Coordinate(0, 0);
}


/**
 * Translates an element's position using the CSS3 transform property.
 * NOTE: This replaces all other transforms already defined on the element.
 * @param {Element} element The element to translate.
 * @param {number} x The horizontal translation.
 * @param {number} y The vertical translation.
 * @return {boolean} Whether the CSS translation was set.
 */
export function setTranslation(element, x, y) {
  // TODO(user): After http://crbug.com/324107 is fixed, it will be faster to
  // use something like: translation = new CSSMatrix().translate(x, y, 0);
  var translation = 'translate3d(' + x + 'px,' + y + 'px,' +
      '0px)';
  style.setStyle(
      element, getTransformProperty_(), translation);
  return true;
}


/**
 * Returns the scale of the x, y and z dimensions of CSS transforms applied to
 * the element.
 *
 * @param {!Element} element The element to get the scale of.
 * @return {!Coordinate3} The scale of the element.
 */
export function getScale(element) {
  var transform = style.getComputedTransform(element);
  var matrixConstructor = matrixConstructor_();
  if (transform && matrixConstructor) {
    var matrix = new matrixConstructor(transform);
    if (matrix) {
      return new Coordinate3(matrix.m11, matrix.m22, matrix.m33);
    }
  }
  return new Coordinate3(0, 0, 0);
}


/**
 * Scales an element using the CSS3 transform property.
 * NOTE: This replaces all other transforms already defined on the element.
 * @param {!Element} element The element to scale.
 * @param {number} x The horizontal scale.
 * @param {number} y The vertical scale.
 * @param {number} z The depth scale.
 * @return {boolean} Whether the CSS scale was set.
 */
export function setScale(element, x, y, z) {
  var scale = 'scale3d(' + x + ',' + y + ',' + z + ')';
  style.setStyle(
      element, getTransformProperty_(), scale);
  return true;
}


/**
 * Returns the rotation CSS transform applied to the element.
 * @param {!Element} element The element to get the rotation of.
 * @return {number} The rotation of the element in degrees.
 */
export function getRotation(element) {
  var transform = style.getComputedTransform(element);
  var matrixConstructor = matrixConstructor_();
  if (transform && matrixConstructor) {
    var matrix = new matrixConstructor(transform);
    if (matrix) {
      var x = matrix.m11 + matrix.m22;
      var y = matrix.m12 - matrix.m21;
      return Math.atan2(y, x) * (180 / Math.PI);
    }
  }
  return 0;
}


/**
 * Rotates an element using the CSS3 transform property.
 * NOTE: This replaces all other transforms already defined on the element.
 * @param {!Element} element The element to rotate.
 * @param {number} degrees The number of degrees to rotate by.
 * @return {boolean} Whether the CSS rotation was set.
 */
export function setRotation(element, degrees) {
  var rotation = 'rotate3d(0,0,1,' + degrees + 'deg)';
  style.setStyle(
      element, getTransformProperty_(), rotation);
  return true;
}


/**
 * A cached value of the transform property depending on whether the useragent
 * is IE9.
 * @return {string} The transform property depending on whether the useragent
 *     is IE9.
 * @private
 */
export var getTransformProperty_ = functions.cacheReturnValue(function() {
  return userAgent.IE && userAgent.DOCUMENT_MODE == 9 ?
      '-ms-transform' :
      'transform';
});


/**
 * Gets the constructor for a CSSMatrix object.
 * @return {function(new:CSSMatrix, string)?} A constructor for a CSSMatrix
 *     object (or null).
 * @private
 */
var matrixConstructor_ = functions.cacheReturnValue(function() {
  if (goog.global['WebKitCSSMatrix'] !== undefined) {
    return goog.global['WebKitCSSMatrix'];
  }
  if (goog.global['MSCSSMatrix'] !== undefined) {
    return goog.global['MSCSSMatrix'];
  }
  if (goog.global['CSSMatrix'] !== undefined) {
    return goog.global['CSSMatrix'];
  }
  return null;
});
