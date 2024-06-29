/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Protocol Buffer (Message) Descriptor class.
 */

goog.declareModuleId('goog.proto2.descriptor');

import * as asserts from '../asserts/asserts.js';
import object from '../object/object.js';
import * as googString from '../string/string.js';
const { FieldDescriptor } = goog.requireType('goog.proto2.fielddescriptor');
const { Message } = goog.requireType('goog.proto2.message');


/**
 * @typedef {{name: (string|undefined),
 *            fullName: (string|undefined),
 *            containingType: (Message|undefined)}}
 */
export var Metadata;



/**
 * A class which describes a Protocol Buffer 2 Message.
 *
 * @param {function(new:Message)} messageType Constructor for
 *      the message class that this descriptor describes.
 * @param {!Metadata} metadata The metadata about the message that
 *      will be used to construct this descriptor.
 * @param {Array<!FieldDescriptor>} fields The fields of the
 *      message described by this descriptor.
 *
 * @constructor
 * @final
 */
export function Descriptor(messageType, metadata, fields) {
 /**
  * @type {function(new:Message)}
  * @private
  */
 this.messageType_ = messageType;

 /**
  * @type {?string}
  * @private
  */
 this.name_ = metadata.name || null;

 /**
  * @type {?string}
  * @private
  */
 this.fullName_ = metadata.fullName || null;

 /**
  * @type {Message|undefined}
  * @private
  */
 this.containingType_ = metadata.containingType;

 /**
  * The fields of the message described by this descriptor.
  * @type {!Object<number, !FieldDescriptor>}
  * @private
  */
 this.fields_ = {};

 for (var i = 0; i < fields.length; i++) {
   var field = fields[i];
   this.fields_[field.getTag()] = field;
 }
}


/**
 * Returns the name of the message, if any.
 *
 * @return {?string} The name.
 */
Descriptor.prototype.getName = function() {
 return this.name_;
};


/**
 * Returns the full name of the message, if any.
 *
 * @return {?string} The name.
 */
Descriptor.prototype.getFullName = function() {
 return this.fullName_;
};


/**
 * Returns the descriptor of the containing message type or null if none.
 *
 * @return {Descriptor} The descriptor.
 */
Descriptor.prototype.getContainingType = function() {
 if (!this.containingType_) {
   return null;
 }

 return this.containingType_.getDescriptor();
};


/**
 * Returns the fields in the message described by this descriptor ordered by
 * tag.
 *
 * @return {!Array<!FieldDescriptor>} The array of field
 *     descriptors.
 */
Descriptor.prototype.getFields = function() {
 /**
  * @param {!FieldDescriptor} fieldA First field.
  * @param {!FieldDescriptor} fieldB Second field.
  * @return {number} Negative if fieldA's tag number is smaller, positive
  *     if greater, zero if the same.
  */
 function tagComparator(fieldA, fieldB) {
   return fieldA.getTag() - fieldB.getTag();
 }

 var fields = object.getValues(this.fields_);
 fields.sort(tagComparator);

 return fields;
};


/**
 * Returns the fields in the message as a key/value map, where the key is
 * the tag number of the field. DO NOT MODIFY THE RETURNED OBJECT. We return
 * the actual, internal, fields map for performance reasons, and changing the
 * map can result in undefined behavior of this library.
 *
 * @return {!Object<number, !FieldDescriptor>} The field map.
 */
Descriptor.prototype.getFieldsMap = function() {
 return this.fields_;
};


/**
 * Returns the field matching the given name, if any. Note that
 * this method searches over the *original* name of the field,
 * not the camelCase version.
 *
 * @param {string} name The field name for which to search.
 *
 * @return {FieldDescriptor} The field found, if any.
 */
Descriptor.prototype.findFieldByName = function(name) {
 var valueFound =
     object.findValue(this.fields_, function(field, key, obj) {
      return field.getName() == name;
     });

 return /** @type {FieldDescriptor} */ (valueFound) || null;
};


/**
 * Returns the field matching the given tag number, if any.
 *
 * @param {number|string} tag The field tag number for which to search.
 *
 * @return {FieldDescriptor} The field found, if any.
 */
Descriptor.prototype.findFieldByTag = function(tag) {
 asserts.assert(googString.isNumeric(tag));
 return this.fields_[parseInt(tag, 10)] || null;
};


/**
 * Creates an instance of the message type that this descriptor
 * describes.
 *
 * @return {!Message} The instance of the message.
 */
Descriptor.prototype.createMessageInstance = function() {
 return new this.messageType_;
};
