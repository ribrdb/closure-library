/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a convenient API for data persistence with key and
 * object encryption. Without a valid secret, the existence of a particular
 * key can't be verified and values can't be decrypted. The value encryption
 * is salted, so subsequent writes of the same cleartext result in different
 * ciphertext. The ciphertext is *not* authenticated, so there is no protection
 * against data manipulation.
 *
 * The metadata is *not* encrypted, so expired keys can be cleaned up without
 * decrypting them. If sensitive metadata is added in subclasses, it is up
 * to the subclass to protect this information, perhaps by embedding it in
 * the object.
 */

import * as crypt from '../crypt/crypt.js';

import { Arc4 } from '../crypt/arc4.js';
import { Sha1 } from '../crypt/sha1.js';
import * as base64 from '../crypt/base64.js';
import * as googJson from '../json/json.js';
import { Serializer } from '../json/json.js';
import { CollectableStorage } from './collectablestorage.js';
import { ErrorCode } from './errorcode.js';
import { RichStorage } from './richstorage.js';
const { IterableMechanism } = goog.requireType('goog.storage.mechanism.IterableMechanism');



/**
 * Provides an encrypted storage. The keys are hashed with a secret, so
 * their existence cannot be verified without the knowledge of the secret.
 * The values are encrypted using the key, a salt, and the secret, so
 * stream cipher initialization varies for each stored value.
 *
 * @param {!IterableMechanism} mechanism The underlying
 *     storage mechanism.
 * @param {string} secret The secret key used to encrypt the storage.
 * @constructor
 * @struct
 * @extends {CollectableStorage}
 * @final
 */
export function EncryptedStorage(mechanism, secret) {
  EncryptedStorage.base(this, 'constructor', mechanism);
  /**
   * The secret used to encrypt the storage.
   *
   * @private {!Array<number>}
   */
  this.secret_ = crypt.stringToByteArray(secret);

  /**
     * The JSON serializer used to serialize values before encryption. This can
     * be potentially different from serializing for the storage mechanism (see
     * goog.storage.Storage), so a separate serializer is kept here.
     *
     * @private {!Serializer}
     */
  this.cleartextSerializer_ = new Serializer();
}
goog.inherits(EncryptedStorage, CollectableStorage);


/**
 * Metadata key under which the salt is stored.
 *
 * @type {string}
 * @protected
 */
EncryptedStorage.SALT_KEY = 'salt';


/**
 * Hashes a key using the secret.
 *
 * @param {string} key The key.
 * @return {string} The hash.
 * @private
 */
EncryptedStorage.prototype.hashKeyWithSecret_ = function(key) {
  const sha1 = new Sha1();
  sha1.update(crypt.stringToByteArray(key));
  sha1.update(this.secret_);
  return base64.encodeByteArray(
      sha1.digest(), base64.Alphabet.WEBSAFE_DOT_PADDING);
};


/**
 * Encrypts a value using a key, a salt, and the secret.
 *
 * @param {!Array<number>} salt The salt.
 * @param {string} key The key.
 * @param {string} value The cleartext value.
 * @return {string} The encrypted value.
 * @private
 */
EncryptedStorage.prototype.encryptValue_ = function(
    salt, key, value) {
  if (!(salt.length > 0)) {
    throw new Error('Non-empty salt must be provided');
  }
  const sha1 = new Sha1();
  sha1.update(crypt.stringToByteArray(key));
  sha1.update(salt);
  sha1.update(this.secret_);
  const arc4 = new Arc4();
  arc4.setKey(sha1.digest());
  // Warm up the streamcypher state, see goog.crypt.Arc4 for details.
  arc4.discard(1536);
  const bytes = crypt.stringToByteArray(value);
  arc4.crypt(bytes);
  return crypt.byteArrayToString(bytes);
};


/**
 * Decrypts a value using a key, a salt, and the secret.
 *
 * @param {!Array<number>} salt The salt.
 * @param {string} key The key.
 * @param {string} value The encrypted value.
 * @return {string} The decrypted value.
 * @private
 */
EncryptedStorage.prototype.decryptValue_ = function(
    salt, key, value) {
  // ARC4 is symmetric.
  return this.encryptValue_(salt, key, value);
};


/** @override */
EncryptedStorage.prototype.set = function(
    key, value, opt_expiration) {
  if (value === undefined) {
    EncryptedStorage.prototype.remove.call(this, key);
    return;
  }
  const salt = [];
  // 64-bit random salt.
  for (let i = 0; i < 8; ++i) {
    salt[i] = Math.floor(Math.random() * 0x100);
  }
  const wrapper = new RichStorage.Wrapper(this.encryptValue_(
      salt, key, this.cleartextSerializer_.serialize(value)));
  wrapper[EncryptedStorage.SALT_KEY] = salt;
  EncryptedStorage.base(
      this, 'set', this.hashKeyWithSecret_(key), wrapper, opt_expiration);
};


/** @override */
EncryptedStorage.prototype.getWrapper = function(
    key, opt_expired) {
  const wrapper = EncryptedStorage.base(
      this, 'getWrapper', this.hashKeyWithSecret_(key), opt_expired);
  if (!wrapper) {
    return undefined;
  }
  const value = RichStorage.Wrapper.unwrap(wrapper);
  const salt = wrapper[EncryptedStorage.SALT_KEY];
  if (typeof value !== 'string' || !Array.isArray(salt) || !salt.length) {
    throw ErrorCode.INVALID_VALUE;
  }
  const json = this.decryptValue_(salt, key, value);

  try {
    wrapper[RichStorage.DATA_KEY] = JSON.parse(json);
  } catch (e) {
    throw ErrorCode.DECRYPTION_ERROR;
  }
  return wrapper;
};


/** @override */
EncryptedStorage.prototype.remove = function(key) {
  EncryptedStorage.base(
      this, 'remove', this.hashKeyWithSecret_(key));
};
