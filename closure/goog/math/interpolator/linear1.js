/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A one dimensional linear interpolator.
 */

import * as array from '../../array/array.js';

import * as asserts from '../../asserts/asserts.js';
import * as math from '../math.js';
import { Interpolator1 } from './interpolator1.js';



/**
 * A one dimensional linear interpolator.
 * @implements {Interpolator1}
 * @constructor
 * @final
 */
export function Linear1() {
  /**
   * The abscissa of the data points.
   * @type {!Array<number>}
   * @private
   */
  this.x_ = [];

  /**
   * The ordinate of the data points.
   * @type {!Array<number>}
   * @private
   */
  this.y_ = [];
}


/** @override */
Linear1.prototype.setData = function(x, y) {
  asserts.assert(
      x.length == y.length,
      'input arrays to setData should have the same length');
  if (x.length == 1) {
    this.x_ = [x[0], x[0] + 1];
    this.y_ = [y[0], y[0]];
  } else {
    this.x_ = x.slice();
    this.y_ = y.slice();
  }
};


/** @override */
Linear1.prototype.interpolate = function(x) {
  let pos = array.binarySearch(this.x_, x);
  if (pos < 0) {
    pos = -pos - 2;
  }
  pos = math.clamp(pos, 0, this.x_.length - 2);

  const progress = (x - this.x_[pos]) / (this.x_[pos + 1] - this.x_[pos]);
  return math.lerp(this.y_[pos], this.y_[pos + 1], progress);
};


/** @override */
Linear1.prototype.getInverse = function() {
  const interpolator = new Linear1();
  interpolator.setData(this.y_, this.x_);
  return interpolator;
};
