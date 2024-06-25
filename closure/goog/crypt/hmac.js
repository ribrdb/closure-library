/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Implementation of HMAC in JavaScript.
 *
 * Usage:
 *   var hmac = new Hmac(new goog.crypt.sha1(), key, 64);
 *   var digest = hmac.getHmac(bytes);
 */


import { Hash } from './hash.js';



/**
 * @constructor
 * @param {!Hash} hasher An object to serve as a hash function.
 * @param {Array<number>} key The secret key to use to calculate the hmac.
 *     Should be an array of not more than `blockSize` integers in
       {0, 255}.
 * @param {number=} opt_blockSize Optional. The block size `hasher` uses.
 *     If not specified, uses the block size from the hasher, or 16 if it is
 *     not specified.
 * @extends {Hash}
 * @final
 * @struct
 */
export function Hmac(hasher, key, opt_blockSize) {
 Hmac.base(this, 'constructor');

 /**
   * The underlying hasher to calculate hash.
   *
   * @type {!Hash}
   * @private
   */
 this.hasher_ = hasher;

 /** @const {number} */
 this.blockSize = opt_blockSize || hasher.blockSize || 16;

 /**
  * The outer padding array of hmac
  *
  * @type {!Array<number>}
  * @private
  */
 this.keyO_ = new Array(this.blockSize);

 /**
  * The inner padding array of hmac
  *
  * @type {!Array<number>}
  * @private
  */
 this.keyI_ = new Array(this.blockSize);

 this.initialize_(key);
}
goog.inherits(Hmac, Hash);


/**
 * Outer padding byte of HMAC algorith, per http://en.wikipedia.org/wiki/HMAC
 *
 * @type {number}
 * @private
 */
Hmac.OPAD_ = 0x5c;


/**
 * Inner padding byte of HMAC algorith, per http://en.wikipedia.org/wiki/HMAC
 *
 * @type {number}
 * @private
 */
Hmac.IPAD_ = 0x36;


/**
 * Initializes Hmac by precalculating the inner and outer paddings.
 *
 * @param {Array<number>} key The secret key to use to calculate the hmac.
 *     Should be an array of not more than `blockSize` integers in
       {0, 255}.
 * @private
 */
Hmac.prototype.initialize_ = function(key) {
 if (key.length > this.blockSize) {
   this.hasher_.update(key);
   key = this.hasher_.digest();
   this.hasher_.reset();
 }
 // Precalculate padded and xor'd keys.
 var keyByte;
 for (var i = 0; i < this.blockSize; i++) {
   if (i < key.length) {
     keyByte = key[i];
   } else {
     keyByte = 0;
   }
   this.keyO_[i] = keyByte ^ Hmac.OPAD_;
   this.keyI_[i] = keyByte ^ Hmac.IPAD_;
 }
 // Be ready for an immediate update.
 this.hasher_.update(this.keyI_);
};


/** @override */
Hmac.prototype.reset = function() {
 this.hasher_.reset();
 this.hasher_.update(this.keyI_);
};


/** @override */
Hmac.prototype.update = function(bytes, opt_length) {
 this.hasher_.update(bytes, opt_length);
};


/** @override */
Hmac.prototype.digest = function() {
 var temp = this.hasher_.digest();
 this.hasher_.reset();
 this.hasher_.update(this.keyO_);
 this.hasher_.update(temp);
 return this.hasher_.digest();
};


/**
 * Calculates an HMAC for a given message.
 *
 * @param {Array<number>|Uint8Array|string} message  Data to Hmac.
 * @return {!Array<number>} the digest of the given message.
 */
Hmac.prototype.getHmac = function(message) {
 this.reset();
 this.update(message);
 return this.digest();
};
