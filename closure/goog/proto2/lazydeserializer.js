/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Base class for all PB2 lazy deserializer. A lazy deserializer
 *   is a serializer whose deserialization occurs on the fly as data is
 *   requested. In order to use a lazy deserializer, the serialized form
 *   of the data must be an object or array that can be indexed by the tag
 *   number.
 */

goog.declareModuleId('goog.proto2.lazydeserializer');

import * as asserts from '../asserts/asserts.js';
import { Message } from './message.js';
import { Serializer } from './serializer.js';
const { FieldDescriptor } = goog.requireType('goog.proto2.fielddescriptor');



/**
 * Base class for all lazy deserializers.
 *
 * @constructor
 * @extends {Serializer}
 */
export function LazyDeserializer() {}
goog.inherits(LazyDeserializer, Serializer);


/** @override */
LazyDeserializer.prototype.deserialize = function(
    descriptor, data) {
 var message = descriptor.createMessageInstance();
 message.initializeForLazyDeserializer(this, data);
 asserts.assert(message instanceof Message);
 return message;
};


/** @override */
LazyDeserializer.prototype.deserializeTo = function(message, data) {
 throw new Error('Unimplemented');
};


/**
 * Deserializes a message field from the expected format and places the
 * data in the given message
 *
 * @param {Message} message The message in which to
 *     place the information.
 * @param {FieldDescriptor} field The field for which to set the
 *     message value.
 * @param {*} data The serialized data for the field.
 *
 * @return {*} The deserialized data or null for no value found.
 */
LazyDeserializer.prototype.deserializeField = goog.abstractMethod;
