/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Supplies a Float32Array implementation that implements
 *     most of the Float32Array spec and that can be used when a built-in
 *     implementation is not available.
 *
 *     Note that if no existing Float32Array implementation is found then
 *     this class and all its public properties are exported as Float32Array.
 *
 *     Adding support for the other TypedArray classes here does not make sense
 *     since this vector math library only needs Float32Array.
 */


/**
 * Constructs a new Float32Array. The new array is initialized to all zeros.
 *
 * @param {Float32Array_|Array|ArrayBuffer|number} p0
 *     The length of the array, or an array to initialize the contents of the
 *     new Float32Array.
 * @constructor
 * @implements {IArrayLike<number>}
 * @final
 */
function Float32Array_(p0) {
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
Float32Array_.BYTES_PER_ELEMENT = 4;


/**
 * The number of bytes in an element (as defined by the Typed Array
 * specification).
 *
 * @type {number}
 */
Float32Array_.prototype.BYTES_PER_ELEMENT = 4;


/**
 * Sets elements of the array.
 * @param {Array<number>|Float32Array} values The array of values.
 * @param {number=} opt_offset The offset in this array to start.
 */
Float32Array_.prototype.set = function(values, opt_offset) {
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
Float32Array_.prototype.toString = Array.prototype.join;


/**
 * Note that we cannot implement the subarray() or (deprecated) slice()
 * methods properly since doing so would require being able to overload
 * the [] operator which is not possible in javascript.  So we leave
 * them unimplemented.  Any attempt to call these methods will just result
 * in a javascript error since we leave them undefined.
 */


/**
 * If no existing Float32Array implementation is found then we export
 * Float32Array_ as Float32Array.
 */
if (typeof Float32Array == 'undefined') {
  goog.exportProperty(
      Float32Array_, 'BYTES_PER_ELEMENT',
      Float32Array_.BYTES_PER_ELEMENT);
  goog.exportProperty(
      Float32Array_.prototype, 'BYTES_PER_ELEMENT',
      Float32Array_.prototype.BYTES_PER_ELEMENT);
  goog.exportProperty(
      Float32Array_.prototype, 'set',
      Float32Array_.prototype.set);
  goog.exportProperty(
      Float32Array_.prototype, 'toString',
      Float32Array_.prototype.toString);
  goog.exportSymbol('Float32Array', Float32Array_);
}
export { Float32Array_ as Float32Array };
