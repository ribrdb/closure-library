/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview SHA-256 cryptographic hash.
 *
 * Usage:
 *   var sha256 = new Sha256();
 *   sha256.update(bytes);
 *   var hash = sha256.digest();
 */

import { Sha2 } from './sha2.js';



/**
 * SHA-256 cryptographic hash constructor.
 *
 * @constructor
 * @extends {Sha2}
 * @final
 * @struct
 */
export function Sha256() {
 Sha256.base(
     this, 'constructor', 8, Sha256.INIT_HASH_BLOCK_);
}
goog.inherits(Sha256, Sha2);


/** @private {!Array<number>} */
Sha256.INIT_HASH_BLOCK_ = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
  0x1f83d9ab, 0x5be0cd19
];
