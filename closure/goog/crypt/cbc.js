/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Implementation of CBC mode for block ciphers.  See
 *     http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation
 *     #Cipher-block_chaining_.28CBC.29. for description.
 */

import * as array from '../array/array.js';

import * as asserts from '../asserts/asserts.js';
import * as crypt from './crypt.js';
import { BlockCipher } from './blockcipher.js';



/**
 * Implements the CBC mode for block ciphers. See
 * http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation
 * #Cipher-block_chaining_.28CBC.29
 *
 * @param {!BlockCipher} cipher The block cipher to use.
 * @constructor
 * @final
 * @struct
 */
export function Cbc(cipher) {
 /**
   * Block cipher.
   * @type {!BlockCipher}
   * @private
   */
 this.cipher_ = cipher;
}


/**
 * Encrypt a message.
 *
 * @param {!Array<number>|!Uint8Array} plainText Message to encrypt. An array of
 *     bytes. The length should be a multiple of the block size.
 * @param {!Array<number>|!Uint8Array} initialVector Initial vector for the CBC
 *     mode. An array of bytes with the same length as the block size.
 * @return {!Array<number>} Encrypted message.
 */
Cbc.prototype.encrypt = function(plainText, initialVector) {
 asserts.assert(
     plainText.length % this.cipher_.BLOCK_SIZE == 0,
     'Data\'s length must be multiple of block size.');

 asserts.assert(
     initialVector.length == this.cipher_.BLOCK_SIZE,
     'Initial vector must be size of one block.');

 // Implementation of
 // http://en.wikipedia.org/wiki/File:Cbc_encryption.png

 var cipherText = [];
 var vector = initialVector;

 // Generate each block of the encrypted cypher text.
 for (var blockStartIndex = 0; blockStartIndex < plainText.length;
      blockStartIndex += this.cipher_.BLOCK_SIZE) {
   // Takes one block from the input message.
   var plainTextBlock = Array.prototype.slice.call(
       plainText, blockStartIndex, blockStartIndex + this.cipher_.BLOCK_SIZE);

   var input = crypt.xorByteArray(plainTextBlock, vector);
   var resultBlock = this.cipher_.encrypt(input);

   array.extend(cipherText, resultBlock);
   vector = resultBlock;
 }

 return cipherText;
};


/**
 * Decrypt a message.
 *
 * @param {!Array<number>|!Uint8Array} cipherText Message to decrypt. An array
 *     of bytes. The length should be a multiple of the block size.
 * @param {!Array<number>|!Uint8Array} initialVector Initial vector for the CBC
 *     mode. An array of bytes with the same length as the block size.
 * @return {!Array<number>} Decrypted message.
 */
Cbc.prototype.decrypt = function(cipherText, initialVector) {
 asserts.assert(
     cipherText.length % this.cipher_.BLOCK_SIZE == 0,
     'Data\'s length must be multiple of block size.');

 asserts.assert(
     initialVector.length == this.cipher_.BLOCK_SIZE,
     'Initial vector must be size of one block.');

 // Implementation of
 // http://en.wikipedia.org/wiki/File:Cbc_decryption.png

 var plainText = [];
 var blockStartIndex = 0;
 var vector = initialVector;

 // Generate each block of the decrypted plain text.
 while (blockStartIndex < cipherText.length) {
   // Takes one block.
   var cipherTextBlock = Array.prototype.slice.call(
       cipherText, blockStartIndex, blockStartIndex + this.cipher_.BLOCK_SIZE);

   var resultBlock = this.cipher_.decrypt(cipherTextBlock);
   var plainTextBlock = crypt.xorByteArray(vector, resultBlock);

   array.extend(plainText, plainTextBlock);
   vector = cipherTextBlock;

   blockStartIndex += this.cipher_.BLOCK_SIZE;
 }

 return plainText;
};
