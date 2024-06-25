/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Interface definition of a block cipher. A block cipher is a
 * pair of algorithms that implement encryption and decryption of input bytes.
 *
 * @see http://en.wikipedia.org/wiki/Block_cipher
 */

goog.declareModuleId('goog.crypt.blockcipher');



/**
 * Interface definition for a block cipher.
 * @interface
 */
export function BlockCipher() {}

/**
 * Block size, in bytes.
 * @type {number}
 * @const
 * @public
 */
BlockCipher.prototype.BLOCK_SIZE;

/**
 * Encrypt a plaintext block.  The implementation may expect (and assert)
 * a particular block length.
 * @param {!Array<number>|!Uint8Array} input Plaintext array of input bytes.
 * @return {!Array<number>} Encrypted ciphertext array of bytes.  Should be the
 *     same length as input.
 */
BlockCipher.prototype.encrypt;


/**
 * Decrypt a plaintext block.  The implementation may expect (and assert)
 * a particular block length.
 * @param {!Array<number>|!Uint8Array} input Ciphertext. Array of input bytes.
 * @return {!Array<number>} Decrypted plaintext array of bytes.  Should be the
 *     same length as input.
 */
BlockCipher.prototype.decrypt;
