/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generated Protocol Buffer code for file
 * closure/goog/proto2/package_test.proto.
 */

goog.setTestOnly('someprotopackage.TestPackageTypes');

import { Message } from './message.js';
import { TestAllTypes } from './test.pb.js';
const { Descriptor } = goog.requireType('goog.proto2.descriptor');



/**
 * Message TestPackageTypes.
 * @constructor
 * @extends {Message}
 * @final
 */
export function TestPackageTypes() {
  Message.call(this);
}
goog.inherits(TestPackageTypes, Message);


/**
 * Descriptor for this message, deserialized lazily in getDescriptor().
 * @private {?Descriptor}
 */
TestPackageTypes.descriptor_ = null;


/**
 * Overrides {@link Message#clone} to specify its exact return type.
 * @return {!TestPackageTypes} The cloned message.
 * @override
 */
TestPackageTypes.prototype.clone;


/**
 * Gets the value of the optional_int32 field.
 * @return {?number} The value.
 */
TestPackageTypes.prototype.getOptionalInt32 = function() {
  return /** @type {?number} */ (this.get$Value(1));
};


/**
 * Gets the value of the optional_int32 field or the default value if not set.
 * @return {number} The value.
 */
TestPackageTypes.prototype.getOptionalInt32OrDefault =
    function() {
      return /** @type {number} */ (this.get$ValueOrDefault(1));
    };


/**
 * Sets the value of the optional_int32 field.
 * @param {number} value The value.
 */
TestPackageTypes.prototype.setOptionalInt32 = function(value) {
  this.set$Value(1, value);
};


/**
 * @return {boolean} Whether the optional_int32 field has a value.
 */
TestPackageTypes.prototype.hasOptionalInt32 = function() {
  return this.has$Value(1);
};


/**
 * @return {number} The number of values in the optional_int32 field.
 */
TestPackageTypes.prototype.optionalInt32Count = function() {
  return this.count$Values(1);
};


/**
 * Clears the values in the optional_int32 field.
 */
TestPackageTypes.prototype.clearOptionalInt32 = function() {
  this.clear$Field(1);
};


/**
 * Gets the value of the other_all field.
 * @return {?TestAllTypes} The value.
 */
TestPackageTypes.prototype.getOtherAll = function() {
  return /** @type {?TestAllTypes} */ (this.get$Value(2));
};


/**
 * Gets the value of the other_all field or the default value if not set.
 * @return {!TestAllTypes} The value.
 */
TestPackageTypes.prototype.getOtherAllOrDefault = function() {
  return /** @type {!TestAllTypes} */ (this.get$ValueOrDefault(2));
};


/**
 * Sets the value of the other_all field.
 * @param {!TestAllTypes} value The value.
 */
TestPackageTypes.prototype.setOtherAll = function(value) {
  this.set$Value(2, value);
};


/**
 * @return {boolean} Whether the other_all field has a value.
 */
TestPackageTypes.prototype.hasOtherAll = function() {
  return this.has$Value(2);
};


/**
 * @return {number} The number of values in the other_all field.
 */
TestPackageTypes.prototype.otherAllCount = function() {
  return this.count$Values(2);
};


/**
 * Clears the values in the other_all field.
 */
TestPackageTypes.prototype.clearOtherAll = function() {
  this.clear$Field(2);
};


/** @override */
TestPackageTypes.prototype.getDescriptor = function() {
  let descriptor = TestPackageTypes.descriptor_;
  if (!descriptor) {
    // The descriptor is created lazily when we instantiate a new instance.
    const descriptorObj = {
      0: {
        name: 'TestPackageTypes',
        fullName: 'someprotopackage.TestPackageTypes'
      },
      1: {
        name: 'optional_int32',
        fieldType: Message.FieldType.INT32,
        type: Number
      },
      2: {
        name: 'other_all',
        fieldType: Message.FieldType.MESSAGE,
        type: TestAllTypes
      }
    };
    TestPackageTypes.descriptor_ = descriptor =
        Message.createDescriptor(
             TestPackageTypes, descriptorObj);
  }
  return descriptor;
};


/** @nocollapse */
TestPackageTypes.getDescriptor =
    TestPackageTypes.prototype.getDescriptor;
