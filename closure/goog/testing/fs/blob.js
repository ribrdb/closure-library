/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock blob object.
 */

goog.setTestOnly('goog.testing.fs.Blob');

import * as crypt from '../../crypt/crypt.js';
import * as base64 from '../../crypt/base64.js';



/**
 * A mock Blob object. The data is stored as an Array of bytes, a "byte" being a
 * JS number in the range 0-255.
 *
 * This blob simplifies writing test code because it has the toString() method
 * that returns immediately, while the File API only provides asynchronous
 * reads.
 * @see https://www.w3.org/TR/FileAPI/#constructorBlob
 *
 * @param {(string|Array<(string|number|!Uint8Array)>)=} opt_data The data
 *     encapsulated by the blob.
 * @param {string=} opt_type The mime type of the blob.
 * @constructor
 */
export function Blob(opt_data, opt_type) {
  /**
   * @see http://www.w3.org/TR/FileAPI/#dfn-type
   * @type {string}
   */
  this.type = opt_type || '';

  /**
   * The data encapsulated by the blob as an Array of bytes, a "byte" being a
   * JS number in the range 0-255.
   * @private {!Array<number>}
   */
  this.data_ = [];

  /**
   * @see http://www.w3.org/TR/FileAPI/#dfn-size
   * @type {number}
   */
  this.size = 0;

  this.setDataInternal(opt_data || '');
}


/**
 * Creates a blob with bytes of a blob ranging from the optional start
 * parameter up to but not including the optional end parameter, and with a type
 * attribute that is the value of the optional contentType parameter.
 * @see http://www.w3.org/TR/FileAPI/#dfn-slice
 * @param {number=} opt_start The start byte offset.
 * @param {number=} opt_end The end point of a slice.
 * @param {string=} opt_contentType The type of the resulting Blob.
 * @return {!Blob} The result blob of the slice operation.
 */
Blob.prototype.slice = function(
    opt_start, opt_end, opt_contentType) {
  let relativeStart;
  if (typeof opt_start === 'number') {
    relativeStart = (opt_start < 0) ? Math.max(this.size + opt_start, 0) :
                                      Math.min(opt_start, this.size);
  } else {
    relativeStart = 0;
  }
  let relativeEnd;
  if (typeof opt_end === 'number') {
    relativeEnd = (opt_end < 0) ? Math.max(this.size + opt_end, 0) :
                                  Math.min(opt_end, this.size);
  } else {
    relativeEnd = this.size;
  }
  const span = Math.max(relativeEnd - relativeStart, 0);
  const blob = new Blob(
      this.data_.slice(relativeStart, relativeStart + span), opt_contentType);
  return blob;
};


/**
 * @return {string} The data encapsulated by the blob as an UTF-8 string.
 * @override
 */
Blob.prototype.toString = function() {
  return crypt.utf8ByteArrayToString(this.data_);
};


/**
 * @return {!ArrayBuffer} The data encapsulated by the blob as an
 *     ArrayBuffer.
 */
Blob.prototype.toArrayBuffer = function() {
  const buf = new ArrayBuffer(this.data_.length);
  const arr = new Uint8Array(buf);
  for (let i = 0; i < this.data_.length; i++) {
    arr[i] = this.data_[i];
  }
  return buf;
};


/**
 * @return {string} The string data encapsulated by the blob as a data: URI.
 */
Blob.prototype.toDataUrl = function() {
  return 'data:' + this.type + ';base64,' +
      base64.encodeByteArray(this.data_);
};


/**
 * Sets the internal contents of the blob to an Array of bytes. This should
 *     only be called by other functions inside the `goog.testing.fs`
 *     namespace.
 * @param {string|Array<string|number|!Uint8Array>} data The data to write
 *     into the blob.
 * @package
 */
Blob.prototype.setDataInternal = function(data) {
  this.data_ = [];
  if (typeof data === 'string') {
    this.appendString_(data);
  } else if (data instanceof Array) {
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      if (typeof value === 'string') {
        this.appendString_(value);
      } else if (typeof value === 'number') {  // Assume Bytes array.
        this.appendByte_(value);
      } else if (value instanceof Uint8Array) {
        this.appendUint8_(value);
      }
    }
  }
  this.size = this.data_.length;
};


/**
 * Converts the data from string to Array of bytes and appends to the blob
 *     content.
 * @param {string} data The string to append to the blob content.
 * @private
 */
Blob.prototype.appendString_ = function(data) {
  Array.prototype.push.apply(
      this.data_, crypt.stringToUtf8ByteArray(data));
};


/**
 * Appends a byte (as a number between 0 to 255) to the blob content.
 * @param {number} data The byte to append.
 * @private
 */
Blob.prototype.appendByte_ = function(data) {
  this.data_.push(data);
};


/**
 * Converts the data from Uint8Array to Array of bytes and appends it to the
 *     blob content.
 * @param {!Uint8Array} data The array to append to the blob content.
 * @private
 */
Blob.prototype.appendUint8_ = function(data) {
  for (let i = 0; i < data.length; i++) {
    this.data_.push(data[i]);
  }
};
