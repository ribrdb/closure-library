/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Protocol Buffer Field Descriptor class.
 */

goog.declareModuleId('goog.proto2.fielddescriptor');

import * as asserts from '../asserts/asserts.js';
import * as googString from '../string/string.js';
const { Descriptor } = goog.requireType('goog.proto2.descriptor');
const { Message } = goog.requireType('goog.proto2.message');



/**
 * A class which describes a field in a Protocol Buffer 2 Message.
 *
 * @param {function(new:Message)} messageType Constructor for the
 *     message class to which the field described by this class belongs.
 * @param {number|string} tag The field's tag index.
 * @param {{
 *       name: string,
 *       fieldType: !FieldDescriptor.FieldType,
 *       type: !Function,
 *       repeated: (*|undefined),
 *       required: (*|undefined),
 *       packed: (*|undefined),
 *       defaultValue: (*|undefined)
 *     }} metadata The metadata about this field
 *     that will be used to construct this descriptor.
 *
 * @constructor
 * @final
 */
export function FieldDescriptor(messageType, tag, metadata) {
 /**
  * The message type that contains the field that this
  * descriptor describes.
  * @private {function(new:Message)}
  */
 this.parent_ = messageType;

 // Ensure that the tag is numeric.
 asserts.assert(googString.isNumeric(tag));

 /**
  * The field's tag number.
  * @private {number}
  */
 this.tag_ = /** @type {number} */ (tag);

 /**
  * The field's name.
  * @private {string}
  */
 this.name_ = metadata.name;

 /**
  * If true, this field is a packed field.
  * @private {boolean}
  */
 this.isPacked_ = !!metadata.packed;

 /**
  * If true, this field is a repeating field.
  * @private {boolean}
  */
 this.isRepeated_ = !!metadata.repeated;

 /**
  * If true, this field is required.
  * @private {boolean}
  */
 this.isRequired_ = !!metadata.required;

 /**
    * The field type of this field.
    * @private {FieldDescriptor.FieldType}
    */
 this.fieldType_ = metadata.fieldType;

 /**
  * If this field is a primitive: The native (ECMAScript) type of this field.
  * If an enumeration: The enumeration object.
  * If a message or group field: The Message function.
  * @private {Function}
  */
 this.nativeType_ = metadata.type;

 /**
  * Is it permissible on deserialization to convert between numbers and
  * well-formed strings?  Is true for 64-bit integral field types and float and
  * double types, false for all other field types.
  * @private {boolean}
  */
 this.deserializationConversionPermitted_ = false;

 switch (this.fieldType_) {
   case FieldDescriptor.FieldType.INT64:
   case FieldDescriptor.FieldType.UINT64:
   case FieldDescriptor.FieldType.FIXED64:
   case FieldDescriptor.FieldType.SFIXED64:
   case FieldDescriptor.FieldType.SINT64:
   case FieldDescriptor.FieldType.FLOAT:
   case FieldDescriptor.FieldType.DOUBLE:
     this.deserializationConversionPermitted_ = true;
     break;
 }

 /**
  * The default value of this field, if different from the default, default
  * value.
  * @private {*}
  */
 this.defaultValue_ = metadata.defaultValue;
}


/**
 * An enumeration defining the possible field types.
 * Should be a mirror of that defined in descriptor.h.
 *
 * @enum {number}
 */
FieldDescriptor.FieldType = {
  DOUBLE: 1,
  FLOAT: 2,
  INT64: 3,
  UINT64: 4,
  INT32: 5,
  FIXED64: 6,
  FIXED32: 7,
  BOOL: 8,
  STRING: 9,
  GROUP: 10,
  MESSAGE: 11,
  BYTES: 12,
  UINT32: 13,
  ENUM: 14,
  SFIXED32: 15,
  SFIXED64: 16,
  SINT32: 17,
  SINT64: 18
};


/**
 * Returns the tag of the field that this descriptor represents.
 *
 * @return {number} The tag number.
 */
FieldDescriptor.prototype.getTag = function() {
 return this.tag_;
};


/**
 * Returns the descriptor describing the message that defined this field.
 * @return {!Descriptor} The descriptor.
 */
FieldDescriptor.prototype.getContainingType = function() {
 // Generated JS proto_library messages have getDescriptor() method which can
 // be called with or without an instance.
 return this.parent_.prototype.getDescriptor();
};


/**
 * Returns the name of the field that this descriptor represents.
 * @return {string} The name.
 */
FieldDescriptor.prototype.getName = function() {
 return this.name_;
};


/**
 * Returns the default value of this field.
 * @return {*} The default value.
 */
FieldDescriptor.prototype.getDefaultValue = function() {
 if (this.defaultValue_ === undefined) {
   // Set the default value based on a new instance of the native type.
   // This will be (0, false, "") for (number, boolean, string) and will
   // be a new instance of a group/message if the field is a message type.
   var nativeType = this.nativeType_;
   if (nativeType === Boolean) {
     this.defaultValue_ = false;
   } else if (nativeType === Number) {
     this.defaultValue_ = 0;
   } else if (nativeType === String) {
     if (this.deserializationConversionPermitted_) {
       // This field is a 64 bit integer represented as a string.
       this.defaultValue_ = '0';
     } else {
       this.defaultValue_ = '';
     }
   } else {
     return new nativeType;
   }
 }

 return this.defaultValue_;
};


/**
 * Returns the field type of the field described by this descriptor.
 * @return {FieldDescriptor.FieldType} The field type.
 */
FieldDescriptor.prototype.getFieldType = function() {
 return this.fieldType_;
};


/**
 * Returns the native (i.e. ECMAScript) type of the field described by this
 * descriptor.
 *
 * @return {Object} The native type.
 */
FieldDescriptor.prototype.getNativeType = function() {
 return this.nativeType_;
};


/**
 * Returns true if simple conversions between numbers and strings are permitted
 * during deserialization for this field.
 *
 * @return {boolean} Whether conversion is permitted.
 */
FieldDescriptor.prototype.deserializationConversionPermitted =
    function() {
     return this.deserializationConversionPermitted_;
    };


/**
 * Returns the descriptor of the message type of this field. Only valid
 * for fields of type GROUP and MESSAGE.
 *
 * @return {!Descriptor} The message descriptor.
 */
FieldDescriptor.prototype.getFieldMessageType = function() {
 // Generated JS proto_library messages have getDescriptor() method which can
 // be called with or without an instance.
 var messageClass =
     /** @type {function(new:Message)} */ (this.nativeType_);
 return messageClass.prototype.getDescriptor();
};


/**
 * @return {boolean} True if the field stores composite data or repeated
 *     composite data (message or group).
 */
FieldDescriptor.prototype.isCompositeType = function() {
 return this.fieldType_ == FieldDescriptor.FieldType.MESSAGE ||
     this.fieldType_ == FieldDescriptor.FieldType.GROUP;
};


/**
 * Returns whether the field described by this descriptor is packed.
 * @return {boolean} Whether the field is packed.
 */
FieldDescriptor.prototype.isPacked = function() {
 return this.isPacked_;
};


/**
 * Returns whether the field described by this descriptor is repeating.
 * @return {boolean} Whether the field is repeated.
 */
FieldDescriptor.prototype.isRepeated = function() {
 return this.isRepeated_;
};


/**
 * Returns whether the field described by this descriptor is required.
 * @return {boolean} Whether the field is required.
 */
FieldDescriptor.prototype.isRequired = function() {
 return this.isRequired_;
};


/**
 * Returns whether the field described by this descriptor is optional.
 * @return {boolean} Whether the field is optional.
 */
FieldDescriptor.prototype.isOptional = function() {
 return !this.isRepeated_ && !this.isRequired_;
};
