/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Implementation of PBKDF2 in JavaScript.
 * @see http://en.wikipedia.org/wiki/PBKDF2
 *
 * Currently we only support HMAC-SHA1 as the underlying hash function. To add a
 * new hash function, add a static method similar to deriveKeyFromPasswordSha1()
 * and implement the specific computeBlockCallback() using the hash function.
 *
 * Usage:
 *   var key = pbkdf2.deriveKeySha1(
 *       stringToByteArray('password'), stringToByteArray('salt'), 1000, 128);
 */

import * as asserts from '../asserts/asserts.js';

import * as crypt from './crypt.js';
import { Hmac } from './hmac.js';
import { Sha1 } from './sha1.js';


/**
 * Derives key from password using PBKDF2-SHA1
 * @param {!Array<number>} password Byte array representation of the password
 *     from which the key is derived.
 * @param {!Array<number>} initialSalt Byte array representation of the salt.
 * @param {number} iterations Number of interations when computing the key.
 * @param {number} keyLength Length of the output key in bits.
 *     Must be multiple of 8.
 * @return {!Array<number>} Byte array representation of the output key.
 */
export function deriveKeySha1(password, initialSalt, iterations, keyLength) {
  // Length of the HMAC-SHA1 output in bits.
  var HASH_LENGTH = 160;

  /**
   * Compute each block of the key using HMAC-SHA1.
   * @param {!Array<number>} index Byte array representation of the index of
   *     the block to be computed.
   * @return {!Array<number>} Byte array representation of the output block.
   */
  var computeBlock = function(index) {
    // Initialize the result to be array of 0 such that its xor with the first
    // block would be the first block.
    var result = (new Array(HASH_LENGTH / 8)).fill(0);
    // Initialize the salt of the first iteration to initialSalt || i.
    var salt = initialSalt.concat(index);
    var hmac = new Hmac(new Sha1(), password, 64);
    // Compute and XOR each iteration.
    for (var i = 0; i < iterations; i++) {
      // The salt of the next iteration is the result of the current iteration.
      salt = hmac.getHmac(salt);
      result = crypt.xorByteArray(result, salt);
    }
    return result;
  };

  return deriveKeyFromPassword_(
      computeBlock, HASH_LENGTH, keyLength);
}


/**
 * Compute each block of the key using PBKDF2.
 * @param {Function} computeBlock Function to compute each block of the output
 *     key.
 * @param {number} hashLength Length of each block in bits. This is determined
 *     by the specific hash function used. Must be multiple of 8.
 * @param {number} keyLength Length of the output key in bits.
 *     Must be multiple of 8.
 * @return {!Array<number>} Byte array representation of the output key.
 * @private
 */
function deriveKeyFromPassword_(computeBlock, hashLength, keyLength) {
  asserts.assert(keyLength % 8 == 0, 'invalid output key length');

  // Compute and concactate each block of the output key.
  var numBlocks = Math.ceil(keyLength / hashLength);
  asserts.assert(numBlocks >= 1, 'invalid number of blocks');
  var result = [];
  for (var i = 1; i <= numBlocks; i++) {
    var indexBytes = integerToByteArray_(i);
    result = result.concat(computeBlock(indexBytes));
  }

  // Trim the last block if needed.
  var lastBlockSize = keyLength % hashLength;
  if (lastBlockSize != 0) {
    var desiredBytes = ((numBlocks - 1) * hashLength + lastBlockSize) / 8;
    result.splice(desiredBytes, (hashLength - lastBlockSize) / 8);
  }
  return result;
}


/**
 * Converts an integer number to a 32-bit big endian byte array.
 * @param {number} n Integer number to be converted.
 * @return {!Array<number>} Byte Array representation of the 32-bit big endian
 *     encoding of n.
 * @private
 */
function integerToByteArray_(n) {
  var result = new Array(4);
  result[0] = n >> 24 & 0xFF;
  result[1] = n >> 16 & 0xFF;
  result[2] = n >> 8 & 0xFF;
  result[3] = n & 0xFF;
  return result;
}
