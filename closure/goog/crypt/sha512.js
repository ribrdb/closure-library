/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview SHA-512 cryptographic hash.
 *
 * Usage:
 *   var sha512 = new Sha512();
 *   sha512.update(bytes);
 *   var hash = sha512.digest();
 */

import { Sha2_64bit } from './sha2_64bit.js';



/**
 * Constructs a SHA-512 cryptographic hash.
 *
 * @constructor
 * @extends {Sha2_64bit}
 * @final
 * @struct
 */
export function Sha512() {
 Sha512.base(
     this, 'constructor', 8 /* numHashBlocks */,
     Sha512.INIT_HASH_BLOCK_);
}
goog.inherits(Sha512, Sha2_64bit);


/** @private {!Array<number>} */
Sha512.INIT_HASH_BLOCK_ = [
  // Section 5.3.5 of
  // csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf
  0x6a09e667, 0xf3bcc908,  // H0
  0xbb67ae85, 0x84caa73b,  // H1
  0x3c6ef372, 0xfe94f82b,  // H2
  0xa54ff53a, 0x5f1d36f1,  // H3
  0x510e527f, 0xade682d1,  // H4
  0x9b05688c, 0x2b3e6c1f,  // H5
  0x1f83d9ab, 0xfb41bd6b,  // H6
  0x5be0cd19, 0x137e2179   // H7
];
