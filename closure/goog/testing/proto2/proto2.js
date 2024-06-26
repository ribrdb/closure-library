/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Test helpers to compare Messages.
 */

goog.setTestOnly('goog.testing.proto2');

import { Message } from '../../proto2/message.js';
import { ObjectSerializer } from '../../proto2/objectserializer.js';
import * as asserts from '../asserts.js';


/**
 * Compares two Message instances of the same type.
 * @param {!Message} expected First message.
 * @param {!Message} actual Second message.
 * @param {string} path Path to the messages.
 * @return {string} A string describing where they differ. Empty string if they
 *     are equal.
 * @private
 */
export function findDifferences_(expected, actual, path) {
  const fields = expected.getDescriptor().getFields();
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const newPath = (path ? path + '/' : '') + field.getName();

    if (expected.has(field) && !actual.has(field)) {
      return newPath + ' should be present';
    }
    if (!expected.has(field) && actual.has(field)) {
      return newPath + ' should not be present';
    }

    if (expected.has(field)) {
      const isComposite = field.isCompositeType();

      if (field.isRepeated()) {
        const expectedCount = expected.countOf(field);
        const actualCount = actual.countOf(field);
        if (expectedCount != actualCount) {
          return newPath + ' should have ' + expectedCount + ' items, ' +
              'but has ' + actualCount;
        }

        for (let j = 0; j < expectedCount; j++) {
          const expectedItem = expected.get(field, j);
          const actualItem = actual.get(field, j);
          if (isComposite) {
            const itemDiff = findDifferences_(
                /** @type {!Message} */ (expectedItem),
                /** @type {!Message} */ (actualItem),
                newPath + '[' + j + ']');
            if (itemDiff) {
              return itemDiff;
            }
          } else {
            if (expectedItem != actualItem) {
              return newPath + '[' + j + '] should be ' + expectedItem +
                  ', but was ' + actualItem;
            }
          }
        }
      } else {
        const expectedValue = expected.get(field);
        const actualValue = actual.get(field);
        if (isComposite) {
          const diff = findDifferences_(
              /** @type {!Message} */ (expectedValue),
              /** @type {!Message} */ (actualValue), newPath);
          if (diff) {
            return diff;
          }
        } else {
          if (expectedValue != actualValue) {
            return newPath + ' should be ' + expectedValue + ', but was ' +
                actualValue;
          }
        }
      }
    }
  }

  return '';
}


/**
 * Compares two Message objects. Gives more readable output than
 * assertObjectEquals on mismatch.
 * @param {!Message} expected Expected proto2 message.
 * @param {!Message} actual Actual proto2 message.
 * @param {string=} opt_failureMessage Failure message when the values don't
 *     match.
 */
export function assertEquals(expected, actual, opt_failureMessage) {
  const failureSummary = opt_failureMessage || '';
  if (!(expected instanceof Message) ||
      !(actual instanceof Message)) {
    asserts.raiseException(
        failureSummary,
        'Bad arguments were passed to goog.testing.proto2.assertEquals');
  }
  if (expected.constructor != actual.constructor) {
    asserts.raiseException(
        failureSummary, 'Message type mismatch: ' +
            expected.getDescriptor().getFullName() + ' != ' +
            actual.getDescriptor().getFullName());
  }
  const diff = findDifferences_(expected, actual, '');
  if (diff) {
    asserts.raiseException(failureSummary, diff);
  }
}


/**
 * Helper function to quickly build protocol buffer messages from JSON objects.
 * @param {function(new:MessageType)} messageCtor A constructor that
 *     creates a `Message` subclass instance.
 * @param {!Object} json JSON object which uses field names as keys.
 * @return {MessageType} The deserialized protocol buffer.
 * @template MessageType
 */
export function fromObject(messageCtor, json) {
  const serializer = new ObjectSerializer(
      ObjectSerializer.KeyOption.NAME);
  const message = new messageCtor;
  serializer.deserializeTo(message, json);
  return message;
}
