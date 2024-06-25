/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview SHA-224 cryptographic hash.
 *
 * Usage:
 *   var sha224 = new Sha224();
 *   sha224.update(bytes);
 *   var hash = sha224.digest();
 */

import { Sha2 } from './sha2.js';



/**
 * SHA-224 cryptographic hash constructor.
 *
 * @constructor
 * @extends {Sha2}
 * @final
 * @struct
 */
export function Sha224() {
 Sha224.base(
     this, 'constructor', 7, Sha224.INIT_HASH_BLOCK_);
}
goog.inherits(Sha224, Sha2);


/** @private {!Array<number>} */
Sha224.INIT_HASH_BLOCK_ = [
  0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511,
  0x64f98fa7, 0xbefa4fa4
];
