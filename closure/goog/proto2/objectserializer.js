/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Protocol Buffer 2 Serializer which serializes messages
 *  into anonymous, simplified JSON objects.
 */

import * as asserts from '../asserts/asserts.js';

import { FieldDescriptor } from './fielddescriptor.js';
import { Serializer } from './serializer.js';
import * as googString from '../string/string.js';
const { Message } = goog.requireType('goog.proto2.message');



/**
 * ObjectSerializer, a serializer which turns Messages into simplified
 * ECMAScript objects.
 *
 * @param {ObjectSerializer.KeyOption=} opt_keyOption If specified,
 *     which key option to use when serializing/deserializing.
 * @param {boolean=} opt_serializeBooleanAsNumber If specified and true, the
 *     serializer will convert boolean values to 0/1 representation.
 * @param {boolean=} opt_ignoreUnknownFields If specified and true, the
 *     serializer will ignore unknown fields in the JSON payload instead of
 *     returning an error.
 * @constructor
 * @extends {Serializer}
 */
export function ObjectSerializer(opt_keyOption, opt_serializeBooleanAsNumber, opt_ignoreUnknownFields) {
  /** @const */
  this.keyOption_ = opt_keyOption;
  /** @const */
  this.serializeBooleanAsNumber_ = opt_serializeBooleanAsNumber;
  /** @const */
  this.ignoreUnknownFields_ = opt_ignoreUnknownFields;
}
goog.inherits(ObjectSerializer, Serializer);


/**
 * An enumeration of the options for how to emit the keys in
 * the generated simplified object.
 *
 * For serialization, the option specifies the keys to use in the serialized
 * object.
 *
 * For deserialization, the option specifies which keys are allowed; an object
 * serialized by TAG may be deserialized by TAG or by NAME or by
 * CAMEL_CASE_NAME, but an object serialized by NAME cannot be deserialized by
 * TAG.  An object serialized with any option can be deserialized by
 * CAMEL_CASE_NAME.
 *
 * @enum {number}
 */
ObjectSerializer.KeyOption = {
  /**
   * Use the tag of the field as the key (default)
   */
  TAG: 0,

  /**
   * Use the name of the field as the key. Unknown fields
   * will still use their tags as keys.
   */
  NAME: 1,

  /**
   * Use the camel cased name of the field as the key.
   * Unknown fields will still use their tags as keys.
   */
  CAMEL_CASE_NAME: 2
};


/**
 * Serializes a message to an object.
 *
 * @param {Message} message The message to be serialized.
 * @return {!Object} The serialized form of the message.
 * @override
 */
ObjectSerializer.prototype.serialize = function(message) {
  var descriptor = message.getDescriptor();
  var fields = descriptor.getFields();

  var objectValue = {};

  // Add the defined fields, recursively.
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];

    var key = field.getTag();
    switch (this.keyOption_) {
      case ObjectSerializer.KeyOption.TAG:
        // no action necessary, key already has the correct value.
        break;
      case ObjectSerializer.KeyOption.NAME:
        key = field.getName();
        break;
      case ObjectSerializer.KeyOption.CAMEL_CASE_NAME:
        key = googString.toCamelCase(
            field
                .getName()
                // goog.string.toCamelCase expects a hyphen delimited string but
                // proto fields are usually underscore delimited
                // (go/proto-style-guide); the following regex converts from
                // underscore delimited form to hyphen delimited form.
                .replace(/_/g, '-'));
        break;
      default:
        // Default should never be reached unless keyOption is outside the valid
        // domain.
        asserts.assert(
            this.keyOption_ !== ObjectSerializer.KeyOption.TAG &&
                this.keyOption_ !==
                    ObjectSerializer.KeyOption.NAME &&
                this.keyOption_ !==
                    ObjectSerializer.KeyOption.CAMEL_CASE_NAME,
            'keyOption should be one of TAG, NAME, or CAMEL_CASE_NAME');
    }

    if (message.has(field)) {
      if (field.isRepeated()) {
        var array = [];
        objectValue[key] = array;

        for (var j = 0; j < message.countOf(field); j++) {
          array.push(this.getSerializedValue(field, message.get(field, j)));
        }

      } else {
        objectValue[key] = this.getSerializedValue(field, message.get(field));
      }
    }
  }

  // Add the unknown fields, if any.
  message.forEachUnknown(function(tag, value) {
    // Do not set null values. This is possible when using pbliteserializer to
    // convert jsbp to closure object and then passed to this method.
    if (value !== null) {
      objectValue[tag] = value;
    }
  });

  return objectValue;
};


/** @override */
ObjectSerializer.prototype.getSerializedValue = function(
    field, value) {
  // Handle the case where a boolean should be serialized as 0/1.
  // Some deserialization libraries, such as GWT, can use this notation.
  if (this.serializeBooleanAsNumber_ &&
      field.getFieldType() == FieldDescriptor.FieldType.BOOL &&
      typeof value === 'boolean') {
    return value ? 1 : 0;
  }

  return ObjectSerializer.base(
      this, 'getSerializedValue', field, value);
};


/** @override */
ObjectSerializer.prototype.getDeserializedValue = function(
    field, value) {
  // Gracefully handle the case where a boolean is represented by 0/1.
  // Some serialization libraries, such as GWT, can use this notation.
  if (field.getFieldType() == FieldDescriptor.FieldType.BOOL &&
      typeof value === 'number') {
    return Boolean(value);
  }

  return ObjectSerializer.base(
      this, 'getDeserializedValue', field, value);
};


/**
 * Deserializes a message from an object and places the
 * data in the message.
 *
 * @param {Message} message The message in which to
 *     place the information.
 * @param {*} data The data of the message.
 * @override
 */
ObjectSerializer.prototype.deserializeTo = function(message, data) {
  var descriptor = message.getDescriptor();

  for (var key in data) {
    var field;
    var value = data[key];

    var isNumeric = googString.isNumeric(key);

    if (isNumeric) {
      field = descriptor.findFieldByTag(key);
    } else {
      // We must not be in Key == TAG mode to lookup by name.
      asserts.assert(
          this.keyOption_ == ObjectSerializer.KeyOption.NAME ||
              this.keyOption_ ==
                  ObjectSerializer.KeyOption.CAMEL_CASE_NAME,
          'Key mode ' + this.keyOption_ + 'for key ' + key + ' is not ' +
              ObjectSerializer.KeyOption.NAME + ' nor ' +
              ObjectSerializer.KeyOption.CAMEL_CASE_NAME);

      if (this.keyOption_ ==
          ObjectSerializer.KeyOption.CAMEL_CASE_NAME) {
        key = googString
                  .toSelectorCase(key)
                  // goog.string.toSelectorCase returns a hyphen delimited form
                  // of the name but protos usually use an underscore delimited
                  // form (go/proto-style-guide); the following regex converts
                  // from hyphens to underscores.
                  .replace(/\-/g, '_');
      }
      field = descriptor.findFieldByName(key);
    }

    if (field) {
      if (field.isRepeated()) {
        asserts.assert(
            Array.isArray(value),
            'Value for repeated field ' + field + ' must be an array.');

        for (var j = 0; j < value.length; j++) {
          message.add(field, this.getDeserializedValue(field, value[j]));
        }
      } else {
        asserts.assert(
            !Array.isArray(value),
            'Value for non-repeated field ' + field + ' must not be an array.');
        message.set(field, this.getDeserializedValue(field, value));
      }
    } else {
      if (isNumeric) {
        // We have an unknown field (with a numeric tag).
        message.setUnknown(Number(key), value);
      } else {
        // Handle unknown non-numeric tag.
        if (!this.ignoreUnknownFields_) {
          // Named fields must be present.
          asserts.fail('Failed to find field: ' + key);
        }
      }
    }
  }
};
