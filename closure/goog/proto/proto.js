/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Protocol buffer serializer.
 */

import { Serializer } from './serializer.js';


/**
 * Instance of the serializer object.
 * @type {Serializer}
 * @private
 */
var serializer_ = null;


/**
 * Serializes an object or a value to a protocol buffer string.
 * @param {Object} object The object to serialize.
 * @return {string} The serialized protocol buffer string.
 */
export function serialize(object) {
 if (!serializer_) {
   serializer_ = new Serializer;
 }
 return serializer_.serialize(object);
}
