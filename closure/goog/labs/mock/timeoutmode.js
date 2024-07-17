/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides an interface that defines how users can extend the
 * `goog.labs.mock` mocking framework with a TimeoutMode. This is used
 * with waitAndVerify to specify a max timeout.
 *
 * In addition it exports a factory method that allows users to easily obtain
 * a TimeoutMode instance.
 */

/**
 * Used to specify max timeout on waitAndVerify
 */
export class TimeoutMode {
  /**
   * @param {number} duration Timeout duration in milliseconds.
   */
  constructor(duration) {
    /**
     * @type {number} duration Timeout duration in milliseconds.
     * @public
     */
    this.duration = duration;
  }
}

/**
 * @param {number} duration Timeout duration in milliseconds.
 * @return {!TimeoutMode}
 */
export function timeout(duration) {
 return new TimeoutMode(duration);
}
