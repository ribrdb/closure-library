/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Protocol Buffer 2 Serializer which serializes messages
 *  into PB-Lite ("JsPbLite") format.
 *
 * PB-Lite format is an array where each index corresponds to the associated tag
 * number. For example, a message like so:
 *
 * message Foo {
 *   optional int bar = 1;
 *   optional int baz = 2;
 *   optional int bop = 4;
 * }
 *
 * would be represented as such:
 *
 * [, (bar data), (baz data), (nothing), (bop data)]
 *
 * Note that since the array index is used to represent the tag number, sparsely
 * populated messages with tag numbers that are not continuous (and/or are very
 * large) will have many (empty) spots and thus, are inefficient.
 *
 */

import * as asserts from '../asserts/asserts.js';

import { FieldDescriptor } from './fielddescriptor.js';
import { LazyDeserializer } from './lazydeserializer.js';
import { Serializer } from './serializer.js';
const { Message } = goog.requireType('goog.proto2.message');



/**
 * PB-Lite serializer.
 *
 * @constructor
 * @extends {LazyDeserializer}
 */
export function PbLiteSerializer() {}
goog.inherits(PbLiteSerializer, LazyDeserializer);


/**
 * If true, fields will be serialized with 0-indexed tags (i.e., the proto
 * field with tag id 1 will have index 0 in the array).
 * @type {boolean}
 * @private
 */
PbLiteSerializer.prototype.zeroIndexing_ = false;


/**
 * By default, the proto tag with id 1 will have index 1 in the serialized
 * array.
 *
 * If the serializer is set to use zero-indexing, the tag with id 1 will have
 * index 0.
 *
 * @param {boolean} zeroIndexing Whether this serializer should deal with
 *     0-indexed protos.
 */
PbLiteSerializer.prototype.setZeroIndexed = function(zeroIndexing) {
  this.zeroIndexing_ = zeroIndexing;
};


/**
 * Serializes a message to a PB-Lite object.
 *
 * @param {Message} message The message to be serialized.
 * @return {!Array<?>} The serialized form of the message.
 * @override
 */
PbLiteSerializer.prototype.serialize = function(message) {
  var descriptor = message.getDescriptor();
  var fields = descriptor.getFields();

  var serialized = [];
  var zeroIndexing = this.zeroIndexing_;

  // Add the known fields.
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];

    if (!message.has(field)) {
      continue;
    }

    var tag = field.getTag();
    var index = zeroIndexing ? tag - 1 : tag;

    if (field.isRepeated()) {
      serialized[index] = [];

      for (var j = 0; j < message.countOf(field); j++) {
        serialized[index][j] =
            this.getSerializedValue(field, message.get(field, j));
      }
    } else {
      serialized[index] = this.getSerializedValue(field, message.get(field));
    }
  }

  // Add any unknown fields.
  message.forEachUnknown(function(tag, value) {
    var index = zeroIndexing ? tag - 1 : tag;
    serialized[index] = value;
  });

  return serialized;
};


/** @override */
PbLiteSerializer.prototype.deserializeField = function(
    message, field, value) {
  if (value == null) {
    // Since value double-equals null, it may be either null or undefined.
    // Ensure we return the same one, since they have different meanings.
    // TODO(user): If the field is repeated, this method should probably
    // return [] instead of null.
    return value;
  }

  if (field.isRepeated()) {
    var data = [];

    asserts.assert(Array.isArray(value), 'Value must be array: %s', value);

    for (var i = 0; i < value.length; i++) {
      data[i] = this.getDeserializedValue(field, value[i]);
    }

    return data;
  } else {
    return this.getDeserializedValue(field, value);
  }
};


/** @override */
PbLiteSerializer.prototype.getSerializedValue = function(
    field, value) {
  if (field.getFieldType() == FieldDescriptor.FieldType.BOOL) {
    // Booleans are serialized in numeric form.
    return value ? 1 : 0;
  }

  return Serializer.prototype.getSerializedValue.apply(
      this, arguments);
};


/** @override */
PbLiteSerializer.prototype.getDeserializedValue = function(
    field, value) {
  if (field.getFieldType() == FieldDescriptor.FieldType.BOOL) {
    asserts.assert(
        typeof value === 'number' || typeof value === 'boolean',
        'Value is expected to be a number or boolean');
    return !!value;
  }

  return Serializer.prototype.getDeserializedValue.apply(
      this, arguments);
};


/** @override */
PbLiteSerializer.prototype.deserialize = function(
    descriptor, data) {
  var toConvert = data;
  if (this.zeroIndexing_) {
    // Make the data align with tag-IDs (1-indexed) by shifting everything
    // up one.
    toConvert = [];
    for (var key in data) {
      toConvert[parseInt(key, 10) + 1] = data[key];
    }
  }
  return PbLiteSerializer.base(
      this, 'deserialize', descriptor, toConvert);
};
