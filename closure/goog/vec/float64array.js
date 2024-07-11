/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Supplies a Float64Array implementation that implements
 * most of the Float64Array spec and that can be used when a built-in
 * implementation is not available.
 *
 * Note that if no existing Float64Array implementation is found then this
 * class and all its public properties are exported as Float64Array.
 *
 * Adding support for the other TypedArray classes here does not make sense
 * since this vector math library only needs Float32Array and Float64Array.
 */


/**
 * Constructs a new Float64Array. The new array is initialized to all zeros.
 *
 * @param {Float64Array_|Array|ArrayBuffer|number} p0
 *     The length of the array, or an array to initialize the contents of the
 *     new Float64Array.
 * @constructor
 * @implements {IArrayLike<number>}
 * @final
 */
function Float64Array_(p0) {
 /** @type {number} */
 this.length = /** @type {number} */ (/** @type {?} */ ((p0).length || p0));
 for (let i = 0; i < this.length; i++) {
   this[i] = p0[i] || 0;
 }
};


/**
 * The number of bytes in an element (as defined by the Typed Array
 * specification).
 *
 * @type {number}
 */
Float64Array_.BYTES_PER_ELEMENT = 8;


/**
 * The number of bytes in an element (as defined by the Typed Array
 * specification).
 *
 * @type {number}
 */
Float64Array_.prototype.BYTES_PER_ELEMENT = 8;


/**
 * Sets elements of the array.
 * @param {Array<number>|Float64Array} values The array of values.
 * @param {number=} opt_offset The offset in this array to start.
 */
Float64Array_.prototype.set = function(values, opt_offset) {
 opt_offset = opt_offset || 0;
 for (let i = 0; i < values.length && opt_offset + i < this.length; i++) {
   this[opt_offset + i] = values[i];
 }
};


/**
 * Creates a string representation of this array.
 * @return {string} The string version of this array.
 * @override
 */
Float64Array_.prototype.toString = Array.prototype.join;


/**
 * Note that we cannot implement the subarray() or (deprecated) slice()
 * methods properly since doing so would require being able to overload
 * the [] operator which is not possible in javascript.  So we leave
 * them unimplemented.  Any attempt to call these methods will just result
 * in a javascript error since we leave them undefined.
 */


/**
 * If no existing Float64Array implementation is found then we export
 * Float64Array_ as Float64Array.
 */
if (typeof Float64Array == 'undefined') {
  try {
    goog.exportProperty(
        Float64Array_, 'BYTES_PER_ELEMENT',
        Float64Array_.BYTES_PER_ELEMENT);
  } catch (float64ArrayError) {
    // Do nothing.  This code is in place to fix b/7225850, in which an error
    // is incorrectly thrown for Google TV on an old Chrome.
    // TODO(user): remove after that version is retired.
  }

  goog.exportProperty(
      Float64Array_.prototype, 'BYTES_PER_ELEMENT',
      Float64Array_.prototype.BYTES_PER_ELEMENT);
  goog.exportProperty(
      Float64Array_.prototype, 'set',
      Float64Array_.prototype.set);
  goog.exportProperty(
      Float64Array_.prototype, 'toString',
      Float64Array_.prototype.toString);
  goog.exportSymbol('Float64Array', Float64Array_);
}
export { Float64Array_ as Float64Array };
