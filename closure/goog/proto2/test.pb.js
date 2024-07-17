/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generated Protocol Buffer code for file
 * closure/goog/proto2/test.proto.
 */

goog.setTestOnly('proto2.TestAllTypes');

import { Message } from './message.js';
const { Descriptor } = goog.requireType('goog.proto2.descriptor');



/**
 * Message TestAllTypes.
 * @constructor
 * @extends {Message}
 * @final
 */
export function TestAllTypes() {
  Message.call(this);
}
goog.inherits(TestAllTypes, Message);


/**
 * Descriptor for this message, deserialized lazily in getDescriptor().
 * @private {?Descriptor}
 */
TestAllTypes.descriptor_ = null;


/**
 * Overrides {@link Message#clone} to specify its exact return type.
 * @return {!TestAllTypes} The cloned message.
 * @override
 */
TestAllTypes.prototype.clone;


/**
 * Gets the value of the optional_int32 field.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getOptionalInt32 = function() {
  return /** @type {?number} */ (this.get$Value(1));
};


/**
 * Gets the value of the optional_int32 field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.prototype.getOptionalInt32OrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(1));
};


/**
 * Sets the value of the optional_int32 field.
 * @param {number} value The value.
 */
TestAllTypes.prototype.setOptionalInt32 = function(value) {
  this.set$Value(1, value);
};


/**
 * @return {boolean} Whether the optional_int32 field has a value.
 */
TestAllTypes.prototype.hasOptionalInt32 = function() {
  return this.has$Value(1);
};


/**
 * @return {number} The number of values in the optional_int32 field.
 */
TestAllTypes.prototype.optionalInt32Count = function() {
  return this.count$Values(1);
};


/**
 * Clears the values in the optional_int32 field.
 */
TestAllTypes.prototype.clearOptionalInt32 = function() {
  this.clear$Field(1);
};


/**
 * Gets the value of the optional_int64 field.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getOptionalInt64 = function() {
  return /** @type {?string} */ (this.get$Value(2));
};


/**
 * Gets the value of the optional_int64 field or the default value if not set.
 * @return {string} The value.
 */
TestAllTypes.prototype.getOptionalInt64OrDefault = function() {
  return /** @type {string} */ (this.get$ValueOrDefault(2));
};


/**
 * Sets the value of the optional_int64 field.
 * @param {string} value The value.
 */
TestAllTypes.prototype.setOptionalInt64 = function(value) {
  this.set$Value(2, value);
};


/**
 * @return {boolean} Whether the optional_int64 field has a value.
 */
TestAllTypes.prototype.hasOptionalInt64 = function() {
  return this.has$Value(2);
};


/**
 * @return {number} The number of values in the optional_int64 field.
 */
TestAllTypes.prototype.optionalInt64Count = function() {
  return this.count$Values(2);
};


/**
 * Clears the values in the optional_int64 field.
 */
TestAllTypes.prototype.clearOptionalInt64 = function() {
  this.clear$Field(2);
};


/**
 * Gets the value of the optional_uint32 field.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getOptionalUint32 = function() {
  return /** @type {?number} */ (this.get$Value(3));
};


/**
 * Gets the value of the optional_uint32 field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.prototype.getOptionalUint32OrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(3));
};


/**
 * Sets the value of the optional_uint32 field.
 * @param {number} value The value.
 */
TestAllTypes.prototype.setOptionalUint32 = function(value) {
  this.set$Value(3, value);
};


/**
 * @return {boolean} Whether the optional_uint32 field has a value.
 */
TestAllTypes.prototype.hasOptionalUint32 = function() {
  return this.has$Value(3);
};


/**
 * @return {number} The number of values in the optional_uint32 field.
 */
TestAllTypes.prototype.optionalUint32Count = function() {
  return this.count$Values(3);
};


/**
 * Clears the values in the optional_uint32 field.
 */
TestAllTypes.prototype.clearOptionalUint32 = function() {
  this.clear$Field(3);
};


/**
 * Gets the value of the optional_uint64 field.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getOptionalUint64 = function() {
  return /** @type {?string} */ (this.get$Value(4));
};


/**
 * Gets the value of the optional_uint64 field or the default value if not set.
 * @return {string} The value.
 */
TestAllTypes.prototype.getOptionalUint64OrDefault = function() {
  return /** @type {string} */ (this.get$ValueOrDefault(4));
};


/**
 * Sets the value of the optional_uint64 field.
 * @param {string} value The value.
 */
TestAllTypes.prototype.setOptionalUint64 = function(value) {
  this.set$Value(4, value);
};


/**
 * @return {boolean} Whether the optional_uint64 field has a value.
 */
TestAllTypes.prototype.hasOptionalUint64 = function() {
  return this.has$Value(4);
};


/**
 * @return {number} The number of values in the optional_uint64 field.
 */
TestAllTypes.prototype.optionalUint64Count = function() {
  return this.count$Values(4);
};


/**
 * Clears the values in the optional_uint64 field.
 */
TestAllTypes.prototype.clearOptionalUint64 = function() {
  this.clear$Field(4);
};


/**
 * Gets the value of the optional_sint32 field.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getOptionalSint32 = function() {
  return /** @type {?number} */ (this.get$Value(5));
};


/**
 * Gets the value of the optional_sint32 field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.prototype.getOptionalSint32OrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(5));
};


/**
 * Sets the value of the optional_sint32 field.
 * @param {number} value The value.
 */
TestAllTypes.prototype.setOptionalSint32 = function(value) {
  this.set$Value(5, value);
};


/**
 * @return {boolean} Whether the optional_sint32 field has a value.
 */
TestAllTypes.prototype.hasOptionalSint32 = function() {
  return this.has$Value(5);
};


/**
 * @return {number} The number of values in the optional_sint32 field.
 */
TestAllTypes.prototype.optionalSint32Count = function() {
  return this.count$Values(5);
};


/**
 * Clears the values in the optional_sint32 field.
 */
TestAllTypes.prototype.clearOptionalSint32 = function() {
  this.clear$Field(5);
};


/**
 * Gets the value of the optional_sint64 field.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getOptionalSint64 = function() {
  return /** @type {?string} */ (this.get$Value(6));
};


/**
 * Gets the value of the optional_sint64 field or the default value if not set.
 * @return {string} The value.
 */
TestAllTypes.prototype.getOptionalSint64OrDefault = function() {
  return /** @type {string} */ (this.get$ValueOrDefault(6));
};


/**
 * Sets the value of the optional_sint64 field.
 * @param {string} value The value.
 */
TestAllTypes.prototype.setOptionalSint64 = function(value) {
  this.set$Value(6, value);
};


/**
 * @return {boolean} Whether the optional_sint64 field has a value.
 */
TestAllTypes.prototype.hasOptionalSint64 = function() {
  return this.has$Value(6);
};


/**
 * @return {number} The number of values in the optional_sint64 field.
 */
TestAllTypes.prototype.optionalSint64Count = function() {
  return this.count$Values(6);
};


/**
 * Clears the values in the optional_sint64 field.
 */
TestAllTypes.prototype.clearOptionalSint64 = function() {
  this.clear$Field(6);
};


/**
 * Gets the value of the optional_fixed32 field.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getOptionalFixed32 = function() {
  return /** @type {?number} */ (this.get$Value(7));
};


/**
 * Gets the value of the optional_fixed32 field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.prototype.getOptionalFixed32OrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(7));
};


/**
 * Sets the value of the optional_fixed32 field.
 * @param {number} value The value.
 */
TestAllTypes.prototype.setOptionalFixed32 = function(value) {
  this.set$Value(7, value);
};


/**
 * @return {boolean} Whether the optional_fixed32 field has a value.
 */
TestAllTypes.prototype.hasOptionalFixed32 = function() {
  return this.has$Value(7);
};


/**
 * @return {number} The number of values in the optional_fixed32 field.
 */
TestAllTypes.prototype.optionalFixed32Count = function() {
  return this.count$Values(7);
};


/**
 * Clears the values in the optional_fixed32 field.
 */
TestAllTypes.prototype.clearOptionalFixed32 = function() {
  this.clear$Field(7);
};


/**
 * Gets the value of the optional_fixed64 field.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getOptionalFixed64 = function() {
  return /** @type {?string} */ (this.get$Value(8));
};


/**
 * Gets the value of the optional_fixed64 field or the default value if not set.
 * @return {string} The value.
 */
TestAllTypes.prototype.getOptionalFixed64OrDefault = function() {
  return /** @type {string} */ (this.get$ValueOrDefault(8));
};


/**
 * Sets the value of the optional_fixed64 field.
 * @param {string} value The value.
 */
TestAllTypes.prototype.setOptionalFixed64 = function(value) {
  this.set$Value(8, value);
};


/**
 * @return {boolean} Whether the optional_fixed64 field has a value.
 */
TestAllTypes.prototype.hasOptionalFixed64 = function() {
  return this.has$Value(8);
};


/**
 * @return {number} The number of values in the optional_fixed64 field.
 */
TestAllTypes.prototype.optionalFixed64Count = function() {
  return this.count$Values(8);
};


/**
 * Clears the values in the optional_fixed64 field.
 */
TestAllTypes.prototype.clearOptionalFixed64 = function() {
  this.clear$Field(8);
};


/**
 * Gets the value of the optional_sfixed32 field.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getOptionalSfixed32 = function() {
  return /** @type {?number} */ (this.get$Value(9));
};


/**
 * Gets the value of the optional_sfixed32 field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.prototype.getOptionalSfixed32OrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(9));
};


/**
 * Sets the value of the optional_sfixed32 field.
 * @param {number} value The value.
 */
TestAllTypes.prototype.setOptionalSfixed32 = function(value) {
  this.set$Value(9, value);
};


/**
 * @return {boolean} Whether the optional_sfixed32 field has a value.
 */
TestAllTypes.prototype.hasOptionalSfixed32 = function() {
  return this.has$Value(9);
};


/**
 * @return {number} The number of values in the optional_sfixed32 field.
 */
TestAllTypes.prototype.optionalSfixed32Count = function() {
  return this.count$Values(9);
};


/**
 * Clears the values in the optional_sfixed32 field.
 */
TestAllTypes.prototype.clearOptionalSfixed32 = function() {
  this.clear$Field(9);
};


/**
 * Gets the value of the optional_sfixed64 field.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getOptionalSfixed64 = function() {
  return /** @type {?string} */ (this.get$Value(10));
};


/**
 * Gets the value of the optional_sfixed64 field or the default value if not set.
 * @return {string} The value.
 */
TestAllTypes.prototype.getOptionalSfixed64OrDefault = function() {
  return /** @type {string} */ (this.get$ValueOrDefault(10));
};


/**
 * Sets the value of the optional_sfixed64 field.
 * @param {string} value The value.
 */
TestAllTypes.prototype.setOptionalSfixed64 = function(value) {
  this.set$Value(10, value);
};


/**
 * @return {boolean} Whether the optional_sfixed64 field has a value.
 */
TestAllTypes.prototype.hasOptionalSfixed64 = function() {
  return this.has$Value(10);
};


/**
 * @return {number} The number of values in the optional_sfixed64 field.
 */
TestAllTypes.prototype.optionalSfixed64Count = function() {
  return this.count$Values(10);
};


/**
 * Clears the values in the optional_sfixed64 field.
 */
TestAllTypes.prototype.clearOptionalSfixed64 = function() {
  this.clear$Field(10);
};


/**
 * Gets the value of the optional_float field.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getOptionalFloat = function() {
  return /** @type {?number} */ (this.get$Value(11));
};


/**
 * Gets the value of the optional_float field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.prototype.getOptionalFloatOrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(11));
};


/**
 * Sets the value of the optional_float field.
 * @param {number} value The value.
 */
TestAllTypes.prototype.setOptionalFloat = function(value) {
  this.set$Value(11, value);
};


/**
 * @return {boolean} Whether the optional_float field has a value.
 */
TestAllTypes.prototype.hasOptionalFloat = function() {
  return this.has$Value(11);
};


/**
 * @return {number} The number of values in the optional_float field.
 */
TestAllTypes.prototype.optionalFloatCount = function() {
  return this.count$Values(11);
};


/**
 * Clears the values in the optional_float field.
 */
TestAllTypes.prototype.clearOptionalFloat = function() {
  this.clear$Field(11);
};


/**
 * Gets the value of the optional_double field.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getOptionalDouble = function() {
  return /** @type {?number} */ (this.get$Value(12));
};


/**
 * Gets the value of the optional_double field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.prototype.getOptionalDoubleOrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(12));
};


/**
 * Sets the value of the optional_double field.
 * @param {number} value The value.
 */
TestAllTypes.prototype.setOptionalDouble = function(value) {
  this.set$Value(12, value);
};


/**
 * @return {boolean} Whether the optional_double field has a value.
 */
TestAllTypes.prototype.hasOptionalDouble = function() {
  return this.has$Value(12);
};


/**
 * @return {number} The number of values in the optional_double field.
 */
TestAllTypes.prototype.optionalDoubleCount = function() {
  return this.count$Values(12);
};


/**
 * Clears the values in the optional_double field.
 */
TestAllTypes.prototype.clearOptionalDouble = function() {
  this.clear$Field(12);
};


/**
 * Gets the value of the optional_bool field.
 * @return {?boolean} The value.
 */
TestAllTypes.prototype.getOptionalBool = function() {
  return /** @type {?boolean} */ (this.get$Value(13));
};


/**
 * Gets the value of the optional_bool field or the default value if not set.
 * @return {boolean} The value.
 */
TestAllTypes.prototype.getOptionalBoolOrDefault = function() {
  return /** @type {boolean} */ (this.get$ValueOrDefault(13));
};


/**
 * Sets the value of the optional_bool field.
 * @param {boolean} value The value.
 */
TestAllTypes.prototype.setOptionalBool = function(value) {
  this.set$Value(13, value);
};


/**
 * @return {boolean} Whether the optional_bool field has a value.
 */
TestAllTypes.prototype.hasOptionalBool = function() {
  return this.has$Value(13);
};


/**
 * @return {number} The number of values in the optional_bool field.
 */
TestAllTypes.prototype.optionalBoolCount = function() {
  return this.count$Values(13);
};


/**
 * Clears the values in the optional_bool field.
 */
TestAllTypes.prototype.clearOptionalBool = function() {
  this.clear$Field(13);
};


/**
 * Gets the value of the optional_string field.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getOptionalString = function() {
  return /** @type {?string} */ (this.get$Value(14));
};


/**
 * Gets the value of the optional_string field or the default value if not set.
 * @return {string} The value.
 */
TestAllTypes.prototype.getOptionalStringOrDefault = function() {
  return /** @type {string} */ (this.get$ValueOrDefault(14));
};


/**
 * Sets the value of the optional_string field.
 * @param {string} value The value.
 */
TestAllTypes.prototype.setOptionalString = function(value) {
  this.set$Value(14, value);
};


/**
 * @return {boolean} Whether the optional_string field has a value.
 */
TestAllTypes.prototype.hasOptionalString = function() {
  return this.has$Value(14);
};


/**
 * @return {number} The number of values in the optional_string field.
 */
TestAllTypes.prototype.optionalStringCount = function() {
  return this.count$Values(14);
};


/**
 * Clears the values in the optional_string field.
 */
TestAllTypes.prototype.clearOptionalString = function() {
  this.clear$Field(14);
};


/**
 * Gets the value of the optional_bytes field.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getOptionalBytes = function() {
  return /** @type {?string} */ (this.get$Value(15));
};


/**
 * Gets the value of the optional_bytes field or the default value if not set.
 * @return {string} The value.
 */
TestAllTypes.prototype.getOptionalBytesOrDefault = function() {
  return /** @type {string} */ (this.get$ValueOrDefault(15));
};


/**
 * Sets the value of the optional_bytes field.
 * @param {string} value The value.
 */
TestAllTypes.prototype.setOptionalBytes = function(value) {
  this.set$Value(15, value);
};


/**
 * @return {boolean} Whether the optional_bytes field has a value.
 */
TestAllTypes.prototype.hasOptionalBytes = function() {
  return this.has$Value(15);
};


/**
 * @return {number} The number of values in the optional_bytes field.
 */
TestAllTypes.prototype.optionalBytesCount = function() {
  return this.count$Values(15);
};


/**
 * Clears the values in the optional_bytes field.
 */
TestAllTypes.prototype.clearOptionalBytes = function() {
  this.clear$Field(15);
};


/**
 * Gets the value of the optionalgroup field.
 * @return {?TestAllTypes.OptionalGroup} The value.
 */
TestAllTypes.prototype.getOptionalgroup = function() {
  return /** @type {?TestAllTypes.OptionalGroup} */ (this.get$Value(16));
};


/**
 * Gets the value of the optionalgroup field or the default value if not set.
 * @return {!TestAllTypes.OptionalGroup} The value.
 */
TestAllTypes.prototype.getOptionalgroupOrDefault = function() {
  return /** @type {!TestAllTypes.OptionalGroup} */ (this.get$ValueOrDefault(16));
};


/**
 * Sets the value of the optionalgroup field.
 * @param {!TestAllTypes.OptionalGroup} value The value.
 */
TestAllTypes.prototype.setOptionalgroup = function(value) {
  this.set$Value(16, value);
};


/**
 * @return {boolean} Whether the optionalgroup field has a value.
 */
TestAllTypes.prototype.hasOptionalgroup = function() {
  return this.has$Value(16);
};


/**
 * @return {number} The number of values in the optionalgroup field.
 */
TestAllTypes.prototype.optionalgroupCount = function() {
  return this.count$Values(16);
};


/**
 * Clears the values in the optionalgroup field.
 */
TestAllTypes.prototype.clearOptionalgroup = function() {
  this.clear$Field(16);
};


/**
 * Gets the value of the optional_nested_message field.
 * @return {?TestAllTypes.NestedMessage} The value.
 */
TestAllTypes.prototype.getOptionalNestedMessage = function() {
  return /** @type {?TestAllTypes.NestedMessage} */ (this.get$Value(18));
};


/**
 * Gets the value of the optional_nested_message field or the default value if not set.
 * @return {!TestAllTypes.NestedMessage} The value.
 */
TestAllTypes.prototype.getOptionalNestedMessageOrDefault = function() {
  return /** @type {!TestAllTypes.NestedMessage} */ (this.get$ValueOrDefault(18));
};


/**
 * Sets the value of the optional_nested_message field.
 * @param {!TestAllTypes.NestedMessage} value The value.
 */
TestAllTypes.prototype.setOptionalNestedMessage = function(value) {
  this.set$Value(18, value);
};


/**
 * @return {boolean} Whether the optional_nested_message field has a value.
 */
TestAllTypes.prototype.hasOptionalNestedMessage = function() {
  return this.has$Value(18);
};


/**
 * @return {number} The number of values in the optional_nested_message field.
 */
TestAllTypes.prototype.optionalNestedMessageCount = function() {
  return this.count$Values(18);
};


/**
 * Clears the values in the optional_nested_message field.
 */
TestAllTypes.prototype.clearOptionalNestedMessage = function() {
  this.clear$Field(18);
};


/**
 * Gets the value of the optional_nested_enum field.
 * @return {?TestAllTypes.NestedEnum} The value.
 */
TestAllTypes.prototype.getOptionalNestedEnum = function() {
  return /** @type {?TestAllTypes.NestedEnum} */ (this.get$Value(21));
};


/**
 * Gets the value of the optional_nested_enum field or the default value if not set.
 * @return {!TestAllTypes.NestedEnum} The value.
 */
TestAllTypes.prototype.getOptionalNestedEnumOrDefault = function() {
  return /** @type {!TestAllTypes.NestedEnum} */ (this.get$ValueOrDefault(21));
};


/**
 * Sets the value of the optional_nested_enum field.
 * @param {!TestAllTypes.NestedEnum} value The value.
 */
TestAllTypes.prototype.setOptionalNestedEnum = function(value) {
  this.set$Value(21, value);
};


/**
 * @return {boolean} Whether the optional_nested_enum field has a value.
 */
TestAllTypes.prototype.hasOptionalNestedEnum = function() {
  return this.has$Value(21);
};


/**
 * @return {number} The number of values in the optional_nested_enum field.
 */
TestAllTypes.prototype.optionalNestedEnumCount = function() {
  return this.count$Values(21);
};


/**
 * Clears the values in the optional_nested_enum field.
 */
TestAllTypes.prototype.clearOptionalNestedEnum = function() {
  this.clear$Field(21);
};


/**
 * Gets the value of the optional_int64_number field.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getOptionalInt64Number = function() {
  return /** @type {?number} */ (this.get$Value(50));
};


/**
 * Gets the value of the optional_int64_number field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.prototype.getOptionalInt64NumberOrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(50));
};


/**
 * Sets the value of the optional_int64_number field.
 * @param {number} value The value.
 */
TestAllTypes.prototype.setOptionalInt64Number = function(value) {
  this.set$Value(50, value);
};


/**
 * @return {boolean} Whether the optional_int64_number field has a value.
 */
TestAllTypes.prototype.hasOptionalInt64Number = function() {
  return this.has$Value(50);
};


/**
 * @return {number} The number of values in the optional_int64_number field.
 */
TestAllTypes.prototype.optionalInt64NumberCount = function() {
  return this.count$Values(50);
};


/**
 * Clears the values in the optional_int64_number field.
 */
TestAllTypes.prototype.clearOptionalInt64Number = function() {
  this.clear$Field(50);
};


/**
 * Gets the value of the optional_int64_string field.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getOptionalInt64String = function() {
  return /** @type {?string} */ (this.get$Value(51));
};


/**
 * Gets the value of the optional_int64_string field or the default value if not set.
 * @return {string} The value.
 */
TestAllTypes.prototype.getOptionalInt64StringOrDefault = function() {
  return /** @type {string} */ (this.get$ValueOrDefault(51));
};


/**
 * Sets the value of the optional_int64_string field.
 * @param {string} value The value.
 */
TestAllTypes.prototype.setOptionalInt64String = function(value) {
  this.set$Value(51, value);
};


/**
 * @return {boolean} Whether the optional_int64_string field has a value.
 */
TestAllTypes.prototype.hasOptionalInt64String = function() {
  return this.has$Value(51);
};


/**
 * @return {number} The number of values in the optional_int64_string field.
 */
TestAllTypes.prototype.optionalInt64StringCount = function() {
  return this.count$Values(51);
};


/**
 * Clears the values in the optional_int64_string field.
 */
TestAllTypes.prototype.clearOptionalInt64String = function() {
  this.clear$Field(51);
};


/**
 * Gets the value of the repeated_int32 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getRepeatedInt32 = function(index) {
  return /** @type {?number} */ (this.get$Value(31, index));
};


/**
 * Gets the value of the repeated_int32 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getRepeatedInt32OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(31, index));
};


/**
 * Adds a value to the repeated_int32 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addRepeatedInt32 = function(value) {
  this.add$Value(31, value);
};


/**
 * Returns the array of values in the repeated_int32 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.repeatedInt32Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(31));
};


/**
 * @return {boolean} Whether the repeated_int32 field has a value.
 */
TestAllTypes.prototype.hasRepeatedInt32 = function() {
  return this.has$Value(31);
};


/**
 * @return {number} The number of values in the repeated_int32 field.
 */
TestAllTypes.prototype.repeatedInt32Count = function() {
  return this.count$Values(31);
};


/**
 * Clears the values in the repeated_int32 field.
 */
TestAllTypes.prototype.clearRepeatedInt32 = function() {
  this.clear$Field(31);
};


/**
 * Gets the value of the repeated_int64 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getRepeatedInt64 = function(index) {
  return /** @type {?string} */ (this.get$Value(32, index));
};


/**
 * Gets the value of the repeated_int64 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {string} The value.
 */
TestAllTypes.prototype.getRepeatedInt64OrDefault = function(index) {
  return /** @type {string} */ (this.get$ValueOrDefault(32, index));
};


/**
 * Adds a value to the repeated_int64 field.
 * @param {string} value The value to add.
 */
TestAllTypes.prototype.addRepeatedInt64 = function(value) {
  this.add$Value(32, value);
};


/**
 * Returns the array of values in the repeated_int64 field.
 * @return {!Array<string>} The values in the field.
 */
TestAllTypes.prototype.repeatedInt64Array = function() {
  return /** @type {!Array<string>} */ (this.array$Values(32));
};


/**
 * @return {boolean} Whether the repeated_int64 field has a value.
 */
TestAllTypes.prototype.hasRepeatedInt64 = function() {
  return this.has$Value(32);
};


/**
 * @return {number} The number of values in the repeated_int64 field.
 */
TestAllTypes.prototype.repeatedInt64Count = function() {
  return this.count$Values(32);
};


/**
 * Clears the values in the repeated_int64 field.
 */
TestAllTypes.prototype.clearRepeatedInt64 = function() {
  this.clear$Field(32);
};


/**
 * Gets the value of the repeated_uint32 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getRepeatedUint32 = function(index) {
  return /** @type {?number} */ (this.get$Value(33, index));
};


/**
 * Gets the value of the repeated_uint32 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getRepeatedUint32OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(33, index));
};


/**
 * Adds a value to the repeated_uint32 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addRepeatedUint32 = function(value) {
  this.add$Value(33, value);
};


/**
 * Returns the array of values in the repeated_uint32 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.repeatedUint32Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(33));
};


/**
 * @return {boolean} Whether the repeated_uint32 field has a value.
 */
TestAllTypes.prototype.hasRepeatedUint32 = function() {
  return this.has$Value(33);
};


/**
 * @return {number} The number of values in the repeated_uint32 field.
 */
TestAllTypes.prototype.repeatedUint32Count = function() {
  return this.count$Values(33);
};


/**
 * Clears the values in the repeated_uint32 field.
 */
TestAllTypes.prototype.clearRepeatedUint32 = function() {
  this.clear$Field(33);
};


/**
 * Gets the value of the repeated_uint64 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getRepeatedUint64 = function(index) {
  return /** @type {?string} */ (this.get$Value(34, index));
};


/**
 * Gets the value of the repeated_uint64 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {string} The value.
 */
TestAllTypes.prototype.getRepeatedUint64OrDefault = function(index) {
  return /** @type {string} */ (this.get$ValueOrDefault(34, index));
};


/**
 * Adds a value to the repeated_uint64 field.
 * @param {string} value The value to add.
 */
TestAllTypes.prototype.addRepeatedUint64 = function(value) {
  this.add$Value(34, value);
};


/**
 * Returns the array of values in the repeated_uint64 field.
 * @return {!Array<string>} The values in the field.
 */
TestAllTypes.prototype.repeatedUint64Array = function() {
  return /** @type {!Array<string>} */ (this.array$Values(34));
};


/**
 * @return {boolean} Whether the repeated_uint64 field has a value.
 */
TestAllTypes.prototype.hasRepeatedUint64 = function() {
  return this.has$Value(34);
};


/**
 * @return {number} The number of values in the repeated_uint64 field.
 */
TestAllTypes.prototype.repeatedUint64Count = function() {
  return this.count$Values(34);
};


/**
 * Clears the values in the repeated_uint64 field.
 */
TestAllTypes.prototype.clearRepeatedUint64 = function() {
  this.clear$Field(34);
};


/**
 * Gets the value of the repeated_sint32 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getRepeatedSint32 = function(index) {
  return /** @type {?number} */ (this.get$Value(35, index));
};


/**
 * Gets the value of the repeated_sint32 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getRepeatedSint32OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(35, index));
};


/**
 * Adds a value to the repeated_sint32 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addRepeatedSint32 = function(value) {
  this.add$Value(35, value);
};


/**
 * Returns the array of values in the repeated_sint32 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.repeatedSint32Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(35));
};


/**
 * @return {boolean} Whether the repeated_sint32 field has a value.
 */
TestAllTypes.prototype.hasRepeatedSint32 = function() {
  return this.has$Value(35);
};


/**
 * @return {number} The number of values in the repeated_sint32 field.
 */
TestAllTypes.prototype.repeatedSint32Count = function() {
  return this.count$Values(35);
};


/**
 * Clears the values in the repeated_sint32 field.
 */
TestAllTypes.prototype.clearRepeatedSint32 = function() {
  this.clear$Field(35);
};


/**
 * Gets the value of the repeated_sint64 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getRepeatedSint64 = function(index) {
  return /** @type {?string} */ (this.get$Value(36, index));
};


/**
 * Gets the value of the repeated_sint64 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {string} The value.
 */
TestAllTypes.prototype.getRepeatedSint64OrDefault = function(index) {
  return /** @type {string} */ (this.get$ValueOrDefault(36, index));
};


/**
 * Adds a value to the repeated_sint64 field.
 * @param {string} value The value to add.
 */
TestAllTypes.prototype.addRepeatedSint64 = function(value) {
  this.add$Value(36, value);
};


/**
 * Returns the array of values in the repeated_sint64 field.
 * @return {!Array<string>} The values in the field.
 */
TestAllTypes.prototype.repeatedSint64Array = function() {
  return /** @type {!Array<string>} */ (this.array$Values(36));
};


/**
 * @return {boolean} Whether the repeated_sint64 field has a value.
 */
TestAllTypes.prototype.hasRepeatedSint64 = function() {
  return this.has$Value(36);
};


/**
 * @return {number} The number of values in the repeated_sint64 field.
 */
TestAllTypes.prototype.repeatedSint64Count = function() {
  return this.count$Values(36);
};


/**
 * Clears the values in the repeated_sint64 field.
 */
TestAllTypes.prototype.clearRepeatedSint64 = function() {
  this.clear$Field(36);
};


/**
 * Gets the value of the repeated_fixed32 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getRepeatedFixed32 = function(index) {
  return /** @type {?number} */ (this.get$Value(37, index));
};


/**
 * Gets the value of the repeated_fixed32 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getRepeatedFixed32OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(37, index));
};


/**
 * Adds a value to the repeated_fixed32 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addRepeatedFixed32 = function(value) {
  this.add$Value(37, value);
};


/**
 * Returns the array of values in the repeated_fixed32 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.repeatedFixed32Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(37));
};


/**
 * @return {boolean} Whether the repeated_fixed32 field has a value.
 */
TestAllTypes.prototype.hasRepeatedFixed32 = function() {
  return this.has$Value(37);
};


/**
 * @return {number} The number of values in the repeated_fixed32 field.
 */
TestAllTypes.prototype.repeatedFixed32Count = function() {
  return this.count$Values(37);
};


/**
 * Clears the values in the repeated_fixed32 field.
 */
TestAllTypes.prototype.clearRepeatedFixed32 = function() {
  this.clear$Field(37);
};


/**
 * Gets the value of the repeated_fixed64 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getRepeatedFixed64 = function(index) {
  return /** @type {?string} */ (this.get$Value(38, index));
};


/**
 * Gets the value of the repeated_fixed64 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {string} The value.
 */
TestAllTypes.prototype.getRepeatedFixed64OrDefault = function(index) {
  return /** @type {string} */ (this.get$ValueOrDefault(38, index));
};


/**
 * Adds a value to the repeated_fixed64 field.
 * @param {string} value The value to add.
 */
TestAllTypes.prototype.addRepeatedFixed64 = function(value) {
  this.add$Value(38, value);
};


/**
 * Returns the array of values in the repeated_fixed64 field.
 * @return {!Array<string>} The values in the field.
 */
TestAllTypes.prototype.repeatedFixed64Array = function() {
  return /** @type {!Array<string>} */ (this.array$Values(38));
};


/**
 * @return {boolean} Whether the repeated_fixed64 field has a value.
 */
TestAllTypes.prototype.hasRepeatedFixed64 = function() {
  return this.has$Value(38);
};


/**
 * @return {number} The number of values in the repeated_fixed64 field.
 */
TestAllTypes.prototype.repeatedFixed64Count = function() {
  return this.count$Values(38);
};


/**
 * Clears the values in the repeated_fixed64 field.
 */
TestAllTypes.prototype.clearRepeatedFixed64 = function() {
  this.clear$Field(38);
};


/**
 * Gets the value of the repeated_sfixed32 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getRepeatedSfixed32 = function(index) {
  return /** @type {?number} */ (this.get$Value(39, index));
};


/**
 * Gets the value of the repeated_sfixed32 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getRepeatedSfixed32OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(39, index));
};


/**
 * Adds a value to the repeated_sfixed32 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addRepeatedSfixed32 = function(value) {
  this.add$Value(39, value);
};


/**
 * Returns the array of values in the repeated_sfixed32 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.repeatedSfixed32Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(39));
};


/**
 * @return {boolean} Whether the repeated_sfixed32 field has a value.
 */
TestAllTypes.prototype.hasRepeatedSfixed32 = function() {
  return this.has$Value(39);
};


/**
 * @return {number} The number of values in the repeated_sfixed32 field.
 */
TestAllTypes.prototype.repeatedSfixed32Count = function() {
  return this.count$Values(39);
};


/**
 * Clears the values in the repeated_sfixed32 field.
 */
TestAllTypes.prototype.clearRepeatedSfixed32 = function() {
  this.clear$Field(39);
};


/**
 * Gets the value of the repeated_sfixed64 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getRepeatedSfixed64 = function(index) {
  return /** @type {?string} */ (this.get$Value(40, index));
};


/**
 * Gets the value of the repeated_sfixed64 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {string} The value.
 */
TestAllTypes.prototype.getRepeatedSfixed64OrDefault = function(index) {
  return /** @type {string} */ (this.get$ValueOrDefault(40, index));
};


/**
 * Adds a value to the repeated_sfixed64 field.
 * @param {string} value The value to add.
 */
TestAllTypes.prototype.addRepeatedSfixed64 = function(value) {
  this.add$Value(40, value);
};


/**
 * Returns the array of values in the repeated_sfixed64 field.
 * @return {!Array<string>} The values in the field.
 */
TestAllTypes.prototype.repeatedSfixed64Array = function() {
  return /** @type {!Array<string>} */ (this.array$Values(40));
};


/**
 * @return {boolean} Whether the repeated_sfixed64 field has a value.
 */
TestAllTypes.prototype.hasRepeatedSfixed64 = function() {
  return this.has$Value(40);
};


/**
 * @return {number} The number of values in the repeated_sfixed64 field.
 */
TestAllTypes.prototype.repeatedSfixed64Count = function() {
  return this.count$Values(40);
};


/**
 * Clears the values in the repeated_sfixed64 field.
 */
TestAllTypes.prototype.clearRepeatedSfixed64 = function() {
  this.clear$Field(40);
};


/**
 * Gets the value of the repeated_float field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getRepeatedFloat = function(index) {
  return /** @type {?number} */ (this.get$Value(41, index));
};


/**
 * Gets the value of the repeated_float field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getRepeatedFloatOrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(41, index));
};


/**
 * Adds a value to the repeated_float field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addRepeatedFloat = function(value) {
  this.add$Value(41, value);
};


/**
 * Returns the array of values in the repeated_float field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.repeatedFloatArray = function() {
  return /** @type {!Array<number>} */ (this.array$Values(41));
};


/**
 * @return {boolean} Whether the repeated_float field has a value.
 */
TestAllTypes.prototype.hasRepeatedFloat = function() {
  return this.has$Value(41);
};


/**
 * @return {number} The number of values in the repeated_float field.
 */
TestAllTypes.prototype.repeatedFloatCount = function() {
  return this.count$Values(41);
};


/**
 * Clears the values in the repeated_float field.
 */
TestAllTypes.prototype.clearRepeatedFloat = function() {
  this.clear$Field(41);
};


/**
 * Gets the value of the repeated_double field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getRepeatedDouble = function(index) {
  return /** @type {?number} */ (this.get$Value(42, index));
};


/**
 * Gets the value of the repeated_double field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getRepeatedDoubleOrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(42, index));
};


/**
 * Adds a value to the repeated_double field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addRepeatedDouble = function(value) {
  this.add$Value(42, value);
};


/**
 * Returns the array of values in the repeated_double field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.repeatedDoubleArray = function() {
  return /** @type {!Array<number>} */ (this.array$Values(42));
};


/**
 * @return {boolean} Whether the repeated_double field has a value.
 */
TestAllTypes.prototype.hasRepeatedDouble = function() {
  return this.has$Value(42);
};


/**
 * @return {number} The number of values in the repeated_double field.
 */
TestAllTypes.prototype.repeatedDoubleCount = function() {
  return this.count$Values(42);
};


/**
 * Clears the values in the repeated_double field.
 */
TestAllTypes.prototype.clearRepeatedDouble = function() {
  this.clear$Field(42);
};


/**
 * Gets the value of the repeated_bool field at the index given.
 * @param {number} index The index to lookup.
 * @return {?boolean} The value.
 */
TestAllTypes.prototype.getRepeatedBool = function(index) {
  return /** @type {?boolean} */ (this.get$Value(43, index));
};


/**
 * Gets the value of the repeated_bool field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {boolean} The value.
 */
TestAllTypes.prototype.getRepeatedBoolOrDefault = function(index) {
  return /** @type {boolean} */ (this.get$ValueOrDefault(43, index));
};


/**
 * Adds a value to the repeated_bool field.
 * @param {boolean} value The value to add.
 */
TestAllTypes.prototype.addRepeatedBool = function(value) {
  this.add$Value(43, value);
};


/**
 * Returns the array of values in the repeated_bool field.
 * @return {!Array<boolean>} The values in the field.
 */
TestAllTypes.prototype.repeatedBoolArray = function() {
  return /** @type {!Array<boolean>} */ (this.array$Values(43));
};


/**
 * @return {boolean} Whether the repeated_bool field has a value.
 */
TestAllTypes.prototype.hasRepeatedBool = function() {
  return this.has$Value(43);
};


/**
 * @return {number} The number of values in the repeated_bool field.
 */
TestAllTypes.prototype.repeatedBoolCount = function() {
  return this.count$Values(43);
};


/**
 * Clears the values in the repeated_bool field.
 */
TestAllTypes.prototype.clearRepeatedBool = function() {
  this.clear$Field(43);
};


/**
 * Gets the value of the repeated_string field at the index given.
 * @param {number} index The index to lookup.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getRepeatedString = function(index) {
  return /** @type {?string} */ (this.get$Value(44, index));
};


/**
 * Gets the value of the repeated_string field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {string} The value.
 */
TestAllTypes.prototype.getRepeatedStringOrDefault = function(index) {
  return /** @type {string} */ (this.get$ValueOrDefault(44, index));
};


/**
 * Adds a value to the repeated_string field.
 * @param {string} value The value to add.
 */
TestAllTypes.prototype.addRepeatedString = function(value) {
  this.add$Value(44, value);
};


/**
 * Returns the array of values in the repeated_string field.
 * @return {!Array<string>} The values in the field.
 */
TestAllTypes.prototype.repeatedStringArray = function() {
  return /** @type {!Array<string>} */ (this.array$Values(44));
};


/**
 * @return {boolean} Whether the repeated_string field has a value.
 */
TestAllTypes.prototype.hasRepeatedString = function() {
  return this.has$Value(44);
};


/**
 * @return {number} The number of values in the repeated_string field.
 */
TestAllTypes.prototype.repeatedStringCount = function() {
  return this.count$Values(44);
};


/**
 * Clears the values in the repeated_string field.
 */
TestAllTypes.prototype.clearRepeatedString = function() {
  this.clear$Field(44);
};


/**
 * Gets the value of the repeated_bytes field at the index given.
 * @param {number} index The index to lookup.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getRepeatedBytes = function(index) {
  return /** @type {?string} */ (this.get$Value(45, index));
};


/**
 * Gets the value of the repeated_bytes field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {string} The value.
 */
TestAllTypes.prototype.getRepeatedBytesOrDefault = function(index) {
  return /** @type {string} */ (this.get$ValueOrDefault(45, index));
};


/**
 * Adds a value to the repeated_bytes field.
 * @param {string} value The value to add.
 */
TestAllTypes.prototype.addRepeatedBytes = function(value) {
  this.add$Value(45, value);
};


/**
 * Returns the array of values in the repeated_bytes field.
 * @return {!Array<string>} The values in the field.
 */
TestAllTypes.prototype.repeatedBytesArray = function() {
  return /** @type {!Array<string>} */ (this.array$Values(45));
};


/**
 * @return {boolean} Whether the repeated_bytes field has a value.
 */
TestAllTypes.prototype.hasRepeatedBytes = function() {
  return this.has$Value(45);
};


/**
 * @return {number} The number of values in the repeated_bytes field.
 */
TestAllTypes.prototype.repeatedBytesCount = function() {
  return this.count$Values(45);
};


/**
 * Clears the values in the repeated_bytes field.
 */
TestAllTypes.prototype.clearRepeatedBytes = function() {
  this.clear$Field(45);
};


/**
 * Gets the value of the repeatedgroup field at the index given.
 * @param {number} index The index to lookup.
 * @return {?TestAllTypes.RepeatedGroup} The value.
 */
TestAllTypes.prototype.getRepeatedgroup = function(index) {
  return /** @type {?TestAllTypes.RepeatedGroup} */ (this.get$Value(46, index));
};


/**
 * Gets the value of the repeatedgroup field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {!TestAllTypes.RepeatedGroup} The value.
 */
TestAllTypes.prototype.getRepeatedgroupOrDefault = function(index) {
  return /** @type {!TestAllTypes.RepeatedGroup} */ (this.get$ValueOrDefault(46, index));
};


/**
 * Adds a value to the repeatedgroup field.
 * @param {!TestAllTypes.RepeatedGroup} value The value to add.
 */
TestAllTypes.prototype.addRepeatedgroup = function(value) {
  this.add$Value(46, value);
};


/**
 * Returns the array of values in the repeatedgroup field.
 * @return {!Array<!TestAllTypes.RepeatedGroup>} The values in the field.
 */
TestAllTypes.prototype.repeatedgroupArray = function() {
  return /** @type {!Array<!TestAllTypes.RepeatedGroup>} */ (this.array$Values(46));
};


/**
 * @return {boolean} Whether the repeatedgroup field has a value.
 */
TestAllTypes.prototype.hasRepeatedgroup = function() {
  return this.has$Value(46);
};


/**
 * @return {number} The number of values in the repeatedgroup field.
 */
TestAllTypes.prototype.repeatedgroupCount = function() {
  return this.count$Values(46);
};


/**
 * Clears the values in the repeatedgroup field.
 */
TestAllTypes.prototype.clearRepeatedgroup = function() {
  this.clear$Field(46);
};


/**
 * Gets the value of the repeated_nested_message field at the index given.
 * @param {number} index The index to lookup.
 * @return {?TestAllTypes.NestedMessage} The value.
 */
TestAllTypes.prototype.getRepeatedNestedMessage = function(index) {
  return /** @type {?TestAllTypes.NestedMessage} */ (this.get$Value(48, index));
};


/**
 * Gets the value of the repeated_nested_message field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {!TestAllTypes.NestedMessage} The value.
 */
TestAllTypes.prototype.getRepeatedNestedMessageOrDefault = function(
    index) {
  return /** @type {!TestAllTypes.NestedMessage} */ (this.get$ValueOrDefault(48, index));
};


/**
 * Adds a value to the repeated_nested_message field.
 * @param {!TestAllTypes.NestedMessage} value The value to add.
 */
TestAllTypes.prototype.addRepeatedNestedMessage = function(value) {
  this.add$Value(48, value);
};


/**
 * Returns the array of values in the repeated_nested_message field.
 * @return {!Array<!TestAllTypes.NestedMessage>} The values in the field.
 */
TestAllTypes.prototype.repeatedNestedMessageArray = function() {
  return /** @type {!Array<!TestAllTypes.NestedMessage>} */ (this.array$Values(48));
};


/**
 * @return {boolean} Whether the repeated_nested_message field has a value.
 */
TestAllTypes.prototype.hasRepeatedNestedMessage = function() {
  return this.has$Value(48);
};


/**
 * @return {number} The number of values in the repeated_nested_message field.
 */
TestAllTypes.prototype.repeatedNestedMessageCount = function() {
  return this.count$Values(48);
};


/**
 * Clears the values in the repeated_nested_message field.
 */
TestAllTypes.prototype.clearRepeatedNestedMessage = function() {
  this.clear$Field(48);
};


/**
 * Gets the value of the repeated_nested_enum field at the index given.
 * @param {number} index The index to lookup.
 * @return {?TestAllTypes.NestedEnum} The value.
 */
TestAllTypes.prototype.getRepeatedNestedEnum = function(index) {
  return /** @type {?TestAllTypes.NestedEnum} */ (this.get$Value(49, index));
};


/**
 * Gets the value of the repeated_nested_enum field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {!TestAllTypes.NestedEnum} The value.
 */
TestAllTypes.prototype.getRepeatedNestedEnumOrDefault = function(index) {
  return /** @type {!TestAllTypes.NestedEnum} */ (this.get$ValueOrDefault(49, index));
};


/**
 * Adds a value to the repeated_nested_enum field.
 * @param {!TestAllTypes.NestedEnum} value The value to add.
 */
TestAllTypes.prototype.addRepeatedNestedEnum = function(value) {
  this.add$Value(49, value);
};


/**
 * Returns the array of values in the repeated_nested_enum field.
 * @return {!Array<!TestAllTypes.NestedEnum>} The values in the field.
 */
TestAllTypes.prototype.repeatedNestedEnumArray = function() {
  return /** @type {!Array<!TestAllTypes.NestedEnum>} */ (this.array$Values(49));
};


/**
 * @return {boolean} Whether the repeated_nested_enum field has a value.
 */
TestAllTypes.prototype.hasRepeatedNestedEnum = function() {
  return this.has$Value(49);
};


/**
 * @return {number} The number of values in the repeated_nested_enum field.
 */
TestAllTypes.prototype.repeatedNestedEnumCount = function() {
  return this.count$Values(49);
};


/**
 * Clears the values in the repeated_nested_enum field.
 */
TestAllTypes.prototype.clearRepeatedNestedEnum = function() {
  this.clear$Field(49);
};


/**
 * Gets the value of the repeated_int64_number field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getRepeatedInt64Number = function(index) {
  return /** @type {?number} */ (this.get$Value(52, index));
};


/**
 * Gets the value of the repeated_int64_number field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getRepeatedInt64NumberOrDefault = function(
    index) {
  return /** @type {number} */ (this.get$ValueOrDefault(52, index));
};


/**
 * Adds a value to the repeated_int64_number field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addRepeatedInt64Number = function(value) {
  this.add$Value(52, value);
};


/**
 * Returns the array of values in the repeated_int64_number field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.repeatedInt64NumberArray = function() {
  return /** @type {!Array<number>} */ (this.array$Values(52));
};


/**
 * @return {boolean} Whether the repeated_int64_number field has a value.
 */
TestAllTypes.prototype.hasRepeatedInt64Number = function() {
  return this.has$Value(52);
};


/**
 * @return {number} The number of values in the repeated_int64_number field.
 */
TestAllTypes.prototype.repeatedInt64NumberCount = function() {
  return this.count$Values(52);
};


/**
 * Clears the values in the repeated_int64_number field.
 */
TestAllTypes.prototype.clearRepeatedInt64Number = function() {
  this.clear$Field(52);
};


/**
 * Gets the value of the repeated_int64_string field at the index given.
 * @param {number} index The index to lookup.
 * @return {?string} The value.
 */
TestAllTypes.prototype.getRepeatedInt64String = function(index) {
  return /** @type {?string} */ (this.get$Value(53, index));
};


/**
 * Gets the value of the repeated_int64_string field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {string} The value.
 */
TestAllTypes.prototype.getRepeatedInt64StringOrDefault = function(
    index) {
  return /** @type {string} */ (this.get$ValueOrDefault(53, index));
};


/**
 * Adds a value to the repeated_int64_string field.
 * @param {string} value The value to add.
 */
TestAllTypes.prototype.addRepeatedInt64String = function(value) {
  this.add$Value(53, value);
};


/**
 * Returns the array of values in the repeated_int64_string field.
 * @return {!Array<string>} The values in the field.
 */
TestAllTypes.prototype.repeatedInt64StringArray = function() {
  return /** @type {!Array<string>} */ (this.array$Values(53));
};


/**
 * @return {boolean} Whether the repeated_int64_string field has a value.
 */
TestAllTypes.prototype.hasRepeatedInt64String = function() {
  return this.has$Value(53);
};


/**
 * @return {number} The number of values in the repeated_int64_string field.
 */
TestAllTypes.prototype.repeatedInt64StringCount = function() {
  return this.count$Values(53);
};


/**
 * Clears the values in the repeated_int64_string field.
 */
TestAllTypes.prototype.clearRepeatedInt64String = function() {
  this.clear$Field(53);
};


/**
 * Gets the value of the packed_int32 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedInt32 = function(index) {
  return /** @type {?number} */ (this.get$Value(54, index));
};


/**
 * Gets the value of the packed_int32 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedInt32OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(54, index));
};


/**
 * Adds a value to the packed_int32 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedInt32 = function(value) {
  this.add$Value(54, value);
};


/**
 * Returns the array of values in the packed_int32 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedInt32Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(54));
};


/**
 * @return {boolean} Whether the packed_int32 field has a value.
 */
TestAllTypes.prototype.hasPackedInt32 = function() {
  return this.has$Value(54);
};


/**
 * @return {number} The number of values in the packed_int32 field.
 */
TestAllTypes.prototype.packedInt32Count = function() {
  return this.count$Values(54);
};


/**
 * Clears the values in the packed_int32 field.
 */
TestAllTypes.prototype.clearPackedInt32 = function() {
  this.clear$Field(54);
};


/**
 * Gets the value of the packed_int64 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedInt64 = function(index) {
  return /** @type {?number} */ (this.get$Value(55, index));
};


/**
 * Gets the value of the packed_int64 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedInt64OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(55, index));
};


/**
 * Adds a value to the packed_int64 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedInt64 = function(value) {
  this.add$Value(55, value);
};


/**
 * Returns the array of values in the packed_int64 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedInt64Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(55));
};


/**
 * @return {boolean} Whether the packed_int64 field has a value.
 */
TestAllTypes.prototype.hasPackedInt64 = function() {
  return this.has$Value(55);
};


/**
 * @return {number} The number of values in the packed_int64 field.
 */
TestAllTypes.prototype.packedInt64Count = function() {
  return this.count$Values(55);
};


/**
 * Clears the values in the packed_int64 field.
 */
TestAllTypes.prototype.clearPackedInt64 = function() {
  this.clear$Field(55);
};


/**
 * Gets the value of the packed_uint32 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedUint32 = function(index) {
  return /** @type {?number} */ (this.get$Value(56, index));
};


/**
 * Gets the value of the packed_uint32 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedUint32OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(56, index));
};


/**
 * Adds a value to the packed_uint32 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedUint32 = function(value) {
  this.add$Value(56, value);
};


/**
 * Returns the array of values in the packed_uint32 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedUint32Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(56));
};


/**
 * @return {boolean} Whether the packed_uint32 field has a value.
 */
TestAllTypes.prototype.hasPackedUint32 = function() {
  return this.has$Value(56);
};


/**
 * @return {number} The number of values in the packed_uint32 field.
 */
TestAllTypes.prototype.packedUint32Count = function() {
  return this.count$Values(56);
};


/**
 * Clears the values in the packed_uint32 field.
 */
TestAllTypes.prototype.clearPackedUint32 = function() {
  this.clear$Field(56);
};


/**
 * Gets the value of the packed_uint64 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedUint64 = function(index) {
  return /** @type {?number} */ (this.get$Value(57, index));
};


/**
 * Gets the value of the packed_uint64 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedUint64OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(57, index));
};


/**
 * Adds a value to the packed_uint64 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedUint64 = function(value) {
  this.add$Value(57, value);
};


/**
 * Returns the array of values in the packed_uint64 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedUint64Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(57));
};


/**
 * @return {boolean} Whether the packed_uint64 field has a value.
 */
TestAllTypes.prototype.hasPackedUint64 = function() {
  return this.has$Value(57);
};


/**
 * @return {number} The number of values in the packed_uint64 field.
 */
TestAllTypes.prototype.packedUint64Count = function() {
  return this.count$Values(57);
};


/**
 * Clears the values in the packed_uint64 field.
 */
TestAllTypes.prototype.clearPackedUint64 = function() {
  this.clear$Field(57);
};


/**
 * Gets the value of the packed_sint32 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedSint32 = function(index) {
  return /** @type {?number} */ (this.get$Value(58, index));
};


/**
 * Gets the value of the packed_sint32 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedSint32OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(58, index));
};


/**
 * Adds a value to the packed_sint32 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedSint32 = function(value) {
  this.add$Value(58, value);
};


/**
 * Returns the array of values in the packed_sint32 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedSint32Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(58));
};


/**
 * @return {boolean} Whether the packed_sint32 field has a value.
 */
TestAllTypes.prototype.hasPackedSint32 = function() {
  return this.has$Value(58);
};


/**
 * @return {number} The number of values in the packed_sint32 field.
 */
TestAllTypes.prototype.packedSint32Count = function() {
  return this.count$Values(58);
};


/**
 * Clears the values in the packed_sint32 field.
 */
TestAllTypes.prototype.clearPackedSint32 = function() {
  this.clear$Field(58);
};


/**
 * Gets the value of the packed_sint64 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedSint64 = function(index) {
  return /** @type {?number} */ (this.get$Value(59, index));
};


/**
 * Gets the value of the packed_sint64 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedSint64OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(59, index));
};


/**
 * Adds a value to the packed_sint64 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedSint64 = function(value) {
  this.add$Value(59, value);
};


/**
 * Returns the array of values in the packed_sint64 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedSint64Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(59));
};


/**
 * @return {boolean} Whether the packed_sint64 field has a value.
 */
TestAllTypes.prototype.hasPackedSint64 = function() {
  return this.has$Value(59);
};


/**
 * @return {number} The number of values in the packed_sint64 field.
 */
TestAllTypes.prototype.packedSint64Count = function() {
  return this.count$Values(59);
};


/**
 * Clears the values in the packed_sint64 field.
 */
TestAllTypes.prototype.clearPackedSint64 = function() {
  this.clear$Field(59);
};


/**
 * Gets the value of the packed_fixed32 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedFixed32 = function(index) {
  return /** @type {?number} */ (this.get$Value(60, index));
};


/**
 * Gets the value of the packed_fixed32 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedFixed32OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(60, index));
};


/**
 * Adds a value to the packed_fixed32 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedFixed32 = function(value) {
  this.add$Value(60, value);
};


/**
 * Returns the array of values in the packed_fixed32 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedFixed32Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(60));
};


/**
 * @return {boolean} Whether the packed_fixed32 field has a value.
 */
TestAllTypes.prototype.hasPackedFixed32 = function() {
  return this.has$Value(60);
};


/**
 * @return {number} The number of values in the packed_fixed32 field.
 */
TestAllTypes.prototype.packedFixed32Count = function() {
  return this.count$Values(60);
};


/**
 * Clears the values in the packed_fixed32 field.
 */
TestAllTypes.prototype.clearPackedFixed32 = function() {
  this.clear$Field(60);
};


/**
 * Gets the value of the packed_fixed64 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedFixed64 = function(index) {
  return /** @type {?number} */ (this.get$Value(61, index));
};


/**
 * Gets the value of the packed_fixed64 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedFixed64OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(61, index));
};


/**
 * Adds a value to the packed_fixed64 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedFixed64 = function(value) {
  this.add$Value(61, value);
};


/**
 * Returns the array of values in the packed_fixed64 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedFixed64Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(61));
};


/**
 * @return {boolean} Whether the packed_fixed64 field has a value.
 */
TestAllTypes.prototype.hasPackedFixed64 = function() {
  return this.has$Value(61);
};


/**
 * @return {number} The number of values in the packed_fixed64 field.
 */
TestAllTypes.prototype.packedFixed64Count = function() {
  return this.count$Values(61);
};


/**
 * Clears the values in the packed_fixed64 field.
 */
TestAllTypes.prototype.clearPackedFixed64 = function() {
  this.clear$Field(61);
};


/**
 * Gets the value of the packed_sfixed32 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedSfixed32 = function(index) {
  return /** @type {?number} */ (this.get$Value(62, index));
};


/**
 * Gets the value of the packed_sfixed32 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedSfixed32OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(62, index));
};


/**
 * Adds a value to the packed_sfixed32 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedSfixed32 = function(value) {
  this.add$Value(62, value);
};


/**
 * Returns the array of values in the packed_sfixed32 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedSfixed32Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(62));
};


/**
 * @return {boolean} Whether the packed_sfixed32 field has a value.
 */
TestAllTypes.prototype.hasPackedSfixed32 = function() {
  return this.has$Value(62);
};


/**
 * @return {number} The number of values in the packed_sfixed32 field.
 */
TestAllTypes.prototype.packedSfixed32Count = function() {
  return this.count$Values(62);
};


/**
 * Clears the values in the packed_sfixed32 field.
 */
TestAllTypes.prototype.clearPackedSfixed32 = function() {
  this.clear$Field(62);
};


/**
 * Gets the value of the packed_sfixed64 field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedSfixed64 = function(index) {
  return /** @type {?number} */ (this.get$Value(63, index));
};


/**
 * Gets the value of the packed_sfixed64 field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedSfixed64OrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(63, index));
};


/**
 * Adds a value to the packed_sfixed64 field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedSfixed64 = function(value) {
  this.add$Value(63, value);
};


/**
 * Returns the array of values in the packed_sfixed64 field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedSfixed64Array = function() {
  return /** @type {!Array<number>} */ (this.array$Values(63));
};


/**
 * @return {boolean} Whether the packed_sfixed64 field has a value.
 */
TestAllTypes.prototype.hasPackedSfixed64 = function() {
  return this.has$Value(63);
};


/**
 * @return {number} The number of values in the packed_sfixed64 field.
 */
TestAllTypes.prototype.packedSfixed64Count = function() {
  return this.count$Values(63);
};


/**
 * Clears the values in the packed_sfixed64 field.
 */
TestAllTypes.prototype.clearPackedSfixed64 = function() {
  this.clear$Field(63);
};


/**
 * Gets the value of the packed_float field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedFloat = function(index) {
  return /** @type {?number} */ (this.get$Value(64, index));
};


/**
 * Gets the value of the packed_float field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedFloatOrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(64, index));
};


/**
 * Adds a value to the packed_float field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedFloat = function(value) {
  this.add$Value(64, value);
};


/**
 * Returns the array of values in the packed_float field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedFloatArray = function() {
  return /** @type {!Array<number>} */ (this.array$Values(64));
};


/**
 * @return {boolean} Whether the packed_float field has a value.
 */
TestAllTypes.prototype.hasPackedFloat = function() {
  return this.has$Value(64);
};


/**
 * @return {number} The number of values in the packed_float field.
 */
TestAllTypes.prototype.packedFloatCount = function() {
  return this.count$Values(64);
};


/**
 * Clears the values in the packed_float field.
 */
TestAllTypes.prototype.clearPackedFloat = function() {
  this.clear$Field(64);
};


/**
 * Gets the value of the packed_double field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.prototype.getPackedDouble = function(index) {
  return /** @type {?number} */ (this.get$Value(65, index));
};


/**
 * Gets the value of the packed_double field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.prototype.getPackedDoubleOrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(65, index));
};


/**
 * Adds a value to the packed_double field.
 * @param {number} value The value to add.
 */
TestAllTypes.prototype.addPackedDouble = function(value) {
  this.add$Value(65, value);
};


/**
 * Returns the array of values in the packed_double field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.prototype.packedDoubleArray = function() {
  return /** @type {!Array<number>} */ (this.array$Values(65));
};


/**
 * @return {boolean} Whether the packed_double field has a value.
 */
TestAllTypes.prototype.hasPackedDouble = function() {
  return this.has$Value(65);
};


/**
 * @return {number} The number of values in the packed_double field.
 */
TestAllTypes.prototype.packedDoubleCount = function() {
  return this.count$Values(65);
};


/**
 * Clears the values in the packed_double field.
 */
TestAllTypes.prototype.clearPackedDouble = function() {
  this.clear$Field(65);
};


/**
 * Gets the value of the packed_bool field at the index given.
 * @param {number} index The index to lookup.
 * @return {?boolean} The value.
 */
TestAllTypes.prototype.getPackedBool = function(index) {
  return /** @type {?boolean} */ (this.get$Value(66, index));
};


/**
 * Gets the value of the packed_bool field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {boolean} The value.
 */
TestAllTypes.prototype.getPackedBoolOrDefault = function(index) {
  return /** @type {boolean} */ (this.get$ValueOrDefault(66, index));
};


/**
 * Adds a value to the packed_bool field.
 * @param {boolean} value The value to add.
 */
TestAllTypes.prototype.addPackedBool = function(value) {
  this.add$Value(66, value);
};


/**
 * Returns the array of values in the packed_bool field.
 * @return {!Array<boolean>} The values in the field.
 */
TestAllTypes.prototype.packedBoolArray = function() {
  return /** @type {!Array<boolean>} */ (this.array$Values(66));
};


/**
 * @return {boolean} Whether the packed_bool field has a value.
 */
TestAllTypes.prototype.hasPackedBool = function() {
  return this.has$Value(66);
};


/**
 * @return {number} The number of values in the packed_bool field.
 */
TestAllTypes.prototype.packedBoolCount = function() {
  return this.count$Values(66);
};


/**
 * Clears the values in the packed_bool field.
 */
TestAllTypes.prototype.clearPackedBool = function() {
  this.clear$Field(66);
};


/**
 * Enumeration NestedEnum.
 * @enum {number}
 */
TestAllTypes.NestedEnum = {
  FOO: 0,
  OOF: 1,
  BAR: 2,
  BAZ: 3
};



/**
 * Message NestedMessage.
 * @constructor
 * @extends {Message}
 * @final
 */
TestAllTypes.NestedMessage = function() {
  Message.call(this);
};
goog.inherits(TestAllTypes.NestedMessage, Message);


/**
 * Descriptor for this message, deserialized lazily in getDescriptor().
 * @private {?Descriptor}
 */
TestAllTypes.NestedMessage.descriptor_ = null;


/**
 * Overrides {@link Message#clone} to specify its exact return type.
 * @return {!TestAllTypes.NestedMessage} The cloned message.
 * @override
 */
TestAllTypes.NestedMessage.prototype.clone;


/**
 * Gets the value of the b field.
 * @return {?number} The value.
 */
TestAllTypes.NestedMessage.prototype.getB = function() {
  return /** @type {?number} */ (this.get$Value(1));
};


/**
 * Gets the value of the b field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.NestedMessage.prototype.getBOrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(1));
};


/**
 * Sets the value of the b field.
 * @param {number} value The value.
 */
TestAllTypes.NestedMessage.prototype.setB = function(value) {
  this.set$Value(1, value);
};


/**
 * @return {boolean} Whether the b field has a value.
 */
TestAllTypes.NestedMessage.prototype.hasB = function() {
  return this.has$Value(1);
};


/**
 * @return {number} The number of values in the b field.
 */
TestAllTypes.NestedMessage.prototype.bCount = function() {
  return this.count$Values(1);
};


/**
 * Clears the values in the b field.
 */
TestAllTypes.NestedMessage.prototype.clearB = function() {
  this.clear$Field(1);
};


/**
 * Gets the value of the c field.
 * @return {?number} The value.
 */
TestAllTypes.NestedMessage.prototype.getC = function() {
  return /** @type {?number} */ (this.get$Value(2));
};


/**
 * Gets the value of the c field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.NestedMessage.prototype.getCOrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(2));
};


/**
 * Sets the value of the c field.
 * @param {number} value The value.
 */
TestAllTypes.NestedMessage.prototype.setC = function(value) {
  this.set$Value(2, value);
};


/**
 * @return {boolean} Whether the c field has a value.
 */
TestAllTypes.NestedMessage.prototype.hasC = function() {
  return this.has$Value(2);
};


/**
 * @return {number} The number of values in the c field.
 */
TestAllTypes.NestedMessage.prototype.cCount = function() {
  return this.count$Values(2);
};


/**
 * Clears the values in the c field.
 */
TestAllTypes.NestedMessage.prototype.clearC = function() {
  this.clear$Field(2);
};



/**
 * Message OptionalGroup.
 * @constructor
 * @extends {Message}
 * @final
 */
TestAllTypes.OptionalGroup = function() {
  Message.call(this);
};
goog.inherits(TestAllTypes.OptionalGroup, Message);


/**
 * Descriptor for this message, deserialized lazily in getDescriptor().
 * @private {?Descriptor}
 */
TestAllTypes.OptionalGroup.descriptor_ = null;


/**
 * Overrides {@link Message#clone} to specify its exact return type.
 * @return {!TestAllTypes.OptionalGroup} The cloned message.
 * @override
 */
TestAllTypes.OptionalGroup.prototype.clone;


/**
 * Gets the value of the a field.
 * @return {?number} The value.
 */
TestAllTypes.OptionalGroup.prototype.getA = function() {
  return /** @type {?number} */ (this.get$Value(17));
};


/**
 * Gets the value of the a field or the default value if not set.
 * @return {number} The value.
 */
TestAllTypes.OptionalGroup.prototype.getAOrDefault = function() {
  return /** @type {number} */ (this.get$ValueOrDefault(17));
};


/**
 * Sets the value of the a field.
 * @param {number} value The value.
 */
TestAllTypes.OptionalGroup.prototype.setA = function(value) {
  this.set$Value(17, value);
};


/**
 * @return {boolean} Whether the a field has a value.
 */
TestAllTypes.OptionalGroup.prototype.hasA = function() {
  return this.has$Value(17);
};


/**
 * @return {number} The number of values in the a field.
 */
TestAllTypes.OptionalGroup.prototype.aCount = function() {
  return this.count$Values(17);
};


/**
 * Clears the values in the a field.
 */
TestAllTypes.OptionalGroup.prototype.clearA = function() {
  this.clear$Field(17);
};



/**
 * Message RepeatedGroup.
 * @constructor
 * @extends {Message}
 * @final
 */
TestAllTypes.RepeatedGroup = function() {
  Message.call(this);
};
goog.inherits(TestAllTypes.RepeatedGroup, Message);


/**
 * Descriptor for this message, deserialized lazily in getDescriptor().
 * @private {?Descriptor}
 */
TestAllTypes.RepeatedGroup.descriptor_ = null;


/**
 * Overrides {@link Message#clone} to specify its exact return type.
 * @return {!TestAllTypes.RepeatedGroup} The cloned message.
 * @override
 */
TestAllTypes.RepeatedGroup.prototype.clone;


/**
 * Gets the value of the a field at the index given.
 * @param {number} index The index to lookup.
 * @return {?number} The value.
 */
TestAllTypes.RepeatedGroup.prototype.getA = function(index) {
  return /** @type {?number} */ (this.get$Value(47, index));
};


/**
 * Gets the value of the a field at the index given or the default value if not set.
 * @param {number} index The index to lookup.
 * @return {number} The value.
 */
TestAllTypes.RepeatedGroup.prototype.getAOrDefault = function(index) {
  return /** @type {number} */ (this.get$ValueOrDefault(47, index));
};


/**
 * Adds a value to the a field.
 * @param {number} value The value to add.
 */
TestAllTypes.RepeatedGroup.prototype.addA = function(value) {
  this.add$Value(47, value);
};


/**
 * Returns the array of values in the a field.
 * @return {!Array<number>} The values in the field.
 */
TestAllTypes.RepeatedGroup.prototype.aArray = function() {
  return /** @type {!Array<number>} */ (this.array$Values(47));
};


/**
 * @return {boolean} Whether the a field has a value.
 */
TestAllTypes.RepeatedGroup.prototype.hasA = function() {
  return this.has$Value(47);
};


/**
 * @return {number} The number of values in the a field.
 */
TestAllTypes.RepeatedGroup.prototype.aCount = function() {
  return this.count$Values(47);
};


/**
 * Clears the values in the a field.
 */
TestAllTypes.RepeatedGroup.prototype.clearA = function() {
  this.clear$Field(47);
};



/**
 * Message TestDefaultParent.
 * @constructor
 * @extends {Message}
 * @final
 */
export function TestDefaultParent() {
  Message.call(this);
}
goog.inherits(TestDefaultParent, Message);


/**
 * Descriptor for this message, deserialized lazily in getDescriptor().
 * @private {?Descriptor}
 */
TestDefaultParent.descriptor_ = null;


/**
 * Overrides {@link Message#clone} to specify its exact return type.
 * @return {!TestDefaultParent} The cloned message.
 * @override
 */
TestDefaultParent.prototype.clone;


/**
 * Gets the value of the child field.
 * @return {?TestDefaultChild} The value.
 */
TestDefaultParent.prototype.getChild = function() {
  return /** @type {?TestDefaultChild} */ (this.get$Value(1));
};


/**
 * Gets the value of the child field or the default value if not set.
 * @return {!TestDefaultChild} The value.
 */
TestDefaultParent.prototype.getChildOrDefault = function() {
  return /** @type {!TestDefaultChild} */ (this.get$ValueOrDefault(1));
};


/**
 * Sets the value of the child field.
 * @param {!TestDefaultChild} value The value.
 */
TestDefaultParent.prototype.setChild = function(value) {
  this.set$Value(1, value);
};


/**
 * @return {boolean} Whether the child field has a value.
 */
TestDefaultParent.prototype.hasChild = function() {
  return this.has$Value(1);
};


/**
 * @return {number} The number of values in the child field.
 */
TestDefaultParent.prototype.childCount = function() {
  return this.count$Values(1);
};


/**
 * Clears the values in the child field.
 */
TestDefaultParent.prototype.clearChild = function() {
  this.clear$Field(1);
};



/**
 * Message TestDefaultChild.
 * @constructor
 * @extends {Message}
 * @final
 */
export function TestDefaultChild() {
  Message.call(this);
}
goog.inherits(TestDefaultChild, Message);


/**
 * Descriptor for this message, deserialized lazily in getDescriptor().
 * @private {?Descriptor}
 */
TestDefaultChild.descriptor_ = null;


/**
 * Overrides {@link Message#clone} to specify its exact return type.
 * @return {!TestDefaultChild} The cloned message.
 * @override
 */
TestDefaultChild.prototype.clone;


/**
 * Gets the value of the foo field.
 * @return {?boolean} The value.
 */
TestDefaultChild.prototype.getFoo = function() {
  return /** @type {?boolean} */ (this.get$Value(1));
};


/**
 * Gets the value of the foo field or the default value if not set.
 * @return {boolean} The value.
 */
TestDefaultChild.prototype.getFooOrDefault = function() {
  return /** @type {boolean} */ (this.get$ValueOrDefault(1));
};


/**
 * Sets the value of the foo field.
 * @param {boolean} value The value.
 */
TestDefaultChild.prototype.setFoo = function(value) {
  this.set$Value(1, value);
};


/**
 * @return {boolean} Whether the foo field has a value.
 */
TestDefaultChild.prototype.hasFoo = function() {
  return this.has$Value(1);
};


/**
 * @return {number} The number of values in the foo field.
 */
TestDefaultChild.prototype.fooCount = function() {
  return this.count$Values(1);
};


/**
 * Clears the values in the foo field.
 */
TestDefaultChild.prototype.clearFoo = function() {
  this.clear$Field(1);
};


/** @override */
TestAllTypes.prototype.getDescriptor = function() {
  var descriptor = TestAllTypes.descriptor_;
  if (!descriptor) {
    // The descriptor is created lazily when we instantiate a new instance.
    var descriptorObj = {
      0: {
        name: 'TestAllTypes',
        fullName: 'TestAllTypes'
      },
      1: {
        name: 'optional_int32',
        fieldType: Message.FieldType.INT32,
        type: Number
      },
      2: {
        name: 'optional_int64',
        fieldType: Message.FieldType.INT64,
        defaultValue: '1',
        type: String
      },
      3: {
        name: 'optional_uint32',
        fieldType: Message.FieldType.UINT32,
        type: Number
      },
      4: {
        name: 'optional_uint64',
        fieldType: Message.FieldType.UINT64,
        type: String
      },
      5: {
        name: 'optional_sint32',
        fieldType: Message.FieldType.SINT32,
        type: Number
      },
      6: {
        name: 'optional_sint64',
        fieldType: Message.FieldType.SINT64,
        type: String
      },
      7: {
        name: 'optional_fixed32',
        fieldType: Message.FieldType.FIXED32,
        type: Number
      },
      8: {
        name: 'optional_fixed64',
        fieldType: Message.FieldType.FIXED64,
        type: String
      },
      9: {
        name: 'optional_sfixed32',
        fieldType: Message.FieldType.SFIXED32,
        type: Number
      },
      10: {
        name: 'optional_sfixed64',
        fieldType: Message.FieldType.SFIXED64,
        type: String
      },
      11: {
        name: 'optional_float',
        fieldType: Message.FieldType.FLOAT,
        defaultValue: 1.5,
        type: Number
      },
      12: {
        name: 'optional_double',
        fieldType: Message.FieldType.DOUBLE,
        type: Number
      },
      13: {
        name: 'optional_bool',
        fieldType: Message.FieldType.BOOL,
        type: Boolean
      },
      14: {
        name: 'optional_string',
        fieldType: Message.FieldType.STRING,
        type: String
      },
      15: {
        name: 'optional_bytes',
        fieldType: Message.FieldType.BYTES,
        defaultValue: 'moo',
        type: String
      },
      16: {
        name: 'optionalgroup',
        fieldType: Message.FieldType.GROUP,
        type: TestAllTypes.OptionalGroup
      },
      18: {
        name: 'optional_nested_message',
        fieldType: Message.FieldType.MESSAGE,
        type: TestAllTypes.NestedMessage
      },
      21: {
        name: 'optional_nested_enum',
        fieldType: Message.FieldType.ENUM,
        defaultValue: TestAllTypes.NestedEnum.FOO,
        type: TestAllTypes.NestedEnum
      },
      50: {
        name: 'optional_int64_number',
        fieldType: Message.FieldType.INT64,
        defaultValue: 1000000000000000001,
        type: Number
      },
      51: {
        name: 'optional_int64_string',
        fieldType: Message.FieldType.INT64,
        defaultValue: '1000000000000000001',
        type: String
      },
      31: {
        name: 'repeated_int32',
        repeated: true,
        fieldType: Message.FieldType.INT32,
        type: Number
      },
      32: {
        name: 'repeated_int64',
        repeated: true,
        fieldType: Message.FieldType.INT64,
        type: String
      },
      33: {
        name: 'repeated_uint32',
        repeated: true,
        fieldType: Message.FieldType.UINT32,
        type: Number
      },
      34: {
        name: 'repeated_uint64',
        repeated: true,
        fieldType: Message.FieldType.UINT64,
        type: String
      },
      35: {
        name: 'repeated_sint32',
        repeated: true,
        fieldType: Message.FieldType.SINT32,
        type: Number
      },
      36: {
        name: 'repeated_sint64',
        repeated: true,
        fieldType: Message.FieldType.SINT64,
        type: String
      },
      37: {
        name: 'repeated_fixed32',
        repeated: true,
        fieldType: Message.FieldType.FIXED32,
        type: Number
      },
      38: {
        name: 'repeated_fixed64',
        repeated: true,
        fieldType: Message.FieldType.FIXED64,
        type: String
      },
      39: {
        name: 'repeated_sfixed32',
        repeated: true,
        fieldType: Message.FieldType.SFIXED32,
        type: Number
      },
      40: {
        name: 'repeated_sfixed64',
        repeated: true,
        fieldType: Message.FieldType.SFIXED64,
        type: String
      },
      41: {
        name: 'repeated_float',
        repeated: true,
        fieldType: Message.FieldType.FLOAT,
        type: Number
      },
      42: {
        name: 'repeated_double',
        repeated: true,
        fieldType: Message.FieldType.DOUBLE,
        type: Number
      },
      43: {
        name: 'repeated_bool',
        repeated: true,
        fieldType: Message.FieldType.BOOL,
        type: Boolean
      },
      44: {
        name: 'repeated_string',
        repeated: true,
        fieldType: Message.FieldType.STRING,
        type: String
      },
      45: {
        name: 'repeated_bytes',
        repeated: true,
        fieldType: Message.FieldType.BYTES,
        type: String
      },
      46: {
        name: 'repeatedgroup',
        repeated: true,
        fieldType: Message.FieldType.GROUP,
        type: TestAllTypes.RepeatedGroup
      },
      48: {
        name: 'repeated_nested_message',
        repeated: true,
        fieldType: Message.FieldType.MESSAGE,
        type: TestAllTypes.NestedMessage
      },
      49: {
        name: 'repeated_nested_enum',
        repeated: true,
        fieldType: Message.FieldType.ENUM,
        defaultValue: TestAllTypes.NestedEnum.FOO,
        type: TestAllTypes.NestedEnum
      },
      52: {
        name: 'repeated_int64_number',
        repeated: true,
        fieldType: Message.FieldType.INT64,
        type: Number
      },
      53: {
        name: 'repeated_int64_string',
        repeated: true,
        fieldType: Message.FieldType.INT64,
        type: String
      },
      54: {
        name: 'packed_int32',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.INT32,
        type: Number
      },
      55: {
        name: 'packed_int64',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.INT64,
        type: Number
      },
      56: {
        name: 'packed_uint32',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.UINT32,
        type: Number
      },
      57: {
        name: 'packed_uint64',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.UINT64,
        type: Number
      },
      58: {
        name: 'packed_sint32',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.SINT32,
        type: Number
      },
      59: {
        name: 'packed_sint64',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.SINT64,
        type: Number
      },
      60: {
        name: 'packed_fixed32',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.FIXED32,
        type: Number
      },
      61: {
        name: 'packed_fixed64',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.FIXED64,
        type: Number
      },
      62: {
        name: 'packed_sfixed32',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.SFIXED32,
        type: Number
      },
      63: {
        name: 'packed_sfixed64',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.SFIXED64,
        type: Number
      },
      64: {
        name: 'packed_float',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.FLOAT,
        type: Number
      },
      65: {
        name: 'packed_double',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.DOUBLE,
        type: Number
      },
      66: {
        name: 'packed_bool',
        repeated: true,
        packed: true,
        fieldType: Message.FieldType.BOOL,
        type: Boolean
      }
    };
    TestAllTypes.descriptor_ = descriptor =
        Message.createDescriptor(
             TestAllTypes, descriptorObj);
  }
  return descriptor;
};


/** @nocollapse */
TestAllTypes.getDescriptor =
    TestAllTypes.prototype.getDescriptor;


/** @override */
TestAllTypes.NestedMessage.prototype.getDescriptor = function() {
  var descriptor = TestAllTypes.NestedMessage.descriptor_;
  if (!descriptor) {
    // The descriptor is created lazily when we instantiate a new instance.
    var descriptorObj = {
      0: {
        name: 'NestedMessage',
        containingType: TestAllTypes,
        fullName: 'TestAllTypes.NestedMessage'
      },
      1: {
        name: 'b',
        fieldType: Message.FieldType.INT32,
        type: Number
      },
      2: {
        name: 'c',
        fieldType: Message.FieldType.INT32,
        type: Number
      }
    };
    TestAllTypes.NestedMessage.descriptor_ = descriptor =
        Message.createDescriptor(
             TestAllTypes.NestedMessage, descriptorObj);
  }
  return descriptor;
};


/** @nocollapse */
TestAllTypes.NestedMessage.getDescriptor =
    TestAllTypes.NestedMessage.prototype.getDescriptor;


/** @override */
TestAllTypes.OptionalGroup.prototype.getDescriptor = function() {
  var descriptor = TestAllTypes.OptionalGroup.descriptor_;
  if (!descriptor) {
    // The descriptor is created lazily when we instantiate a new instance.
    var descriptorObj = {
      0: {
        name: 'OptionalGroup',
        containingType: TestAllTypes,
        fullName: 'TestAllTypes.OptionalGroup'
      },
      17: {
        name: 'a',
        fieldType: Message.FieldType.INT32,
        type: Number
      }
    };
    TestAllTypes.OptionalGroup.descriptor_ = descriptor =
        Message.createDescriptor(
             TestAllTypes.OptionalGroup, descriptorObj);
  }
  return descriptor;
};


/** @nocollapse */
TestAllTypes.OptionalGroup.getDescriptor =
    TestAllTypes.OptionalGroup.prototype.getDescriptor;


/** @override */
TestAllTypes.RepeatedGroup.prototype.getDescriptor = function() {
  var descriptor = TestAllTypes.RepeatedGroup.descriptor_;
  if (!descriptor) {
    // The descriptor is created lazily when we instantiate a new instance.
    var descriptorObj = {
      0: {
        name: 'RepeatedGroup',
        containingType: TestAllTypes,
        fullName: 'TestAllTypes.RepeatedGroup'
      },
      47: {
        name: 'a',
        repeated: true,
        fieldType: Message.FieldType.INT32,
        type: Number
      }
    };
    TestAllTypes.RepeatedGroup.descriptor_ = descriptor =
        Message.createDescriptor(
             TestAllTypes.RepeatedGroup, descriptorObj);
  }
  return descriptor;
};


/** @nocollapse */
TestAllTypes.RepeatedGroup.getDescriptor =
    TestAllTypes.RepeatedGroup.prototype.getDescriptor;


/** @override */
TestDefaultParent.prototype.getDescriptor = function() {
  var descriptor = TestDefaultParent.descriptor_;
  if (!descriptor) {
    // The descriptor is created lazily when we instantiate a new instance.
    var descriptorObj = {
      0: {
        name: 'TestDefaultParent',
        fullName: 'TestDefaultParent'
      },
      1: {
        name: 'child',
        fieldType: Message.FieldType.MESSAGE,
        type: TestDefaultChild
      }
    };
    TestDefaultParent.descriptor_ = descriptor =
        Message.createDescriptor(
             TestDefaultParent, descriptorObj);
  }
  return descriptor;
};


/** @nocollapse */
TestDefaultParent.getDescriptor =
    TestDefaultParent.prototype.getDescriptor;


/** @override */
TestDefaultChild.prototype.getDescriptor = function() {
  var descriptor = TestDefaultChild.descriptor_;
  if (!descriptor) {
    // The descriptor is created lazily when we instantiate a new instance.
    var descriptorObj = {
      0: {
        name: 'TestDefaultChild',
        fullName: 'TestDefaultChild'
      },
      1: {
        name: 'foo',
        fieldType: Message.FieldType.BOOL,
        defaultValue: true,
        type: Boolean
      }
    };
    TestDefaultChild.descriptor_ = descriptor =
        Message.createDescriptor(
             TestDefaultChild, descriptorObj);
  }
  return descriptor;
};


/** @nocollapse */
TestDefaultChild.getDescriptor =
    TestDefaultChild.prototype.getDescriptor;
