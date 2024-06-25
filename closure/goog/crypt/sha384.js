/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview SHA-384  cryptographic hash.
 *
 * Usage:
 *   var sha384 = new Sha384();
 *   sha384.update(bytes);
 *   var hash = sha384.digest();
 */

import { Sha2_64bit } from './sha2_64bit.js';



/**
 * Constructs a SHA-384 cryptographic hash.
 *
 * @constructor
 * @extends {Sha2_64bit}
 * @final
 * @struct
 */
export function Sha384() {
 Sha384.base(
     this, 'constructor', 6 /* numHashBlocks */,
     Sha384.INIT_HASH_BLOCK_);
}
goog.inherits(Sha384, Sha2_64bit);


/** @private {!Array<number>} */
Sha384.INIT_HASH_BLOCK_ = [
  // Section 5.3.4 of
  // csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf
  0xcbbb9d5d, 0xc1059ed8,  // H0
  0x629a292a, 0x367cd507,  // H1
  0x9159015a, 0x3070dd17,  // H2
  0x152fecd8, 0xf70e5939,  // H3
  0x67332667, 0xffc00b31,  // H4
  0x8eb44a87, 0x68581511,  // H5
  0xdb0c2e0d, 0x64f98fa7,  // H6
  0x47b5481d, 0xbefa4fa4   // H7
];
