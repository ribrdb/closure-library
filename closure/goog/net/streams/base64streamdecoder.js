/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A base64 stream decoder.
 *
 * Base64 encoding bytes in the buffer will be decoded and delivered in a batch.
 * - Decodes input string in 4-character groups.
 * - Accepts both normal and websafe characters (see {@link base64}).
 * - Whitespaces are skipped.
 * - Further input after padding characters are decoded normally. Padding
 *   characters are simply treated as 6 input bits (like other characters),
 *   and has no more semantics meaning to the decoder.
 */

import * as asserts from '../../asserts/asserts.js';

import * as base64 from '../../crypt/base64.js';

/**
 * Base64 stream decoder.
 *
 * @constructor
 * @struct
 * @final
 * @package
 */
export function Base64StreamDecoder() {
 /**
  * If the input stream is still valid.
  * @private {boolean}
  */
 this.isInputValid_ = true;

 /**
  * The current position in the streamed data that has been processed, i.e.
  * the position right before `leftoverInput_`.
  * @private {number}
  */
 this.streamPos_ = 0;

 /**
  * The leftover characters when grouping input characters into four.
  * @private {string}
  */
 this.leftoverInput_ = '';
}


/**
 * Checks if the decoder has aborted due to invalid input.
 *
 * @return {boolean} true if the input is still valid.
 */
Base64StreamDecoder.prototype.isInputValid = function() {
 return this.isInputValid_;
};


/**
 * @param {string} input The current input string to be processed
 * @param {string} errorMsg Additional error message
 * @throws {!Error} Throws an error indicating where the stream is broken
 * @private
 */
Base64StreamDecoder.prototype.error_ = function(input, errorMsg) {
 this.isInputValid_ = false;
 throw new Error(
     'The stream is broken @' + this.streamPos_ + '. Error: ' + errorMsg +
     '. With input:\n' + input);
};


/**
 * Decodes the input stream.
 *
 * @param {string} input The next part of input stream
 * @return {?Array<number>} decoded bytes in an array, or null if needs more
 *     input data to decode any new bytes
 * @throws {!Error} Throws an error message if the input is invalid
 */
Base64StreamDecoder.prototype.decode = function(input) {
 asserts.assertString(input);

 if (!this.isInputValid_) {
   this.error_(input, 'stream already broken');
 }

 this.leftoverInput_ += input;

 const groups = Math.floor(this.leftoverInput_.length / 4);
 if (groups == 0) {
   return null;
 }

 let result;
 try {
   result = base64.decodeStringToByteArray(
       this.leftoverInput_.slice(0, groups * 4));
 } catch (e) {
   this.error_(this.leftoverInput_, e.message);
 }

 this.streamPos_ += groups * 4;
 this.leftoverInput_ = this.leftoverInput_.slice(groups * 4);
 return result;
};
