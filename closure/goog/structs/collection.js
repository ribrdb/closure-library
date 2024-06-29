/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Defines the collection interface.
 */

/**
 * An interface for a collection of values.
 * @interface
 * @template T
 */
export function Collection() {};


/**
 * @param {T} value Value to add to the collection.
 */
Collection.prototype.add;


/**
 * @param {T} value Value to remove from the collection.
 */
Collection.prototype.remove;


/**
 * @param {T} value Value to find in the collection.
 * @return {boolean} Whether the collection contains the specified value.
 */
Collection.prototype.contains;


/**
 * @return {number} The number of values stored in the collection.
 */
Collection.prototype.getCount;
