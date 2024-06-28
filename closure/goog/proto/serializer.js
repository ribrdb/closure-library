/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Protocol buffer serializer.
 */


// TODO(arv): Serialize booleans as 0 and 1


import { Serializer as jsonSerializer } from '../json/json.js';

import * as googString from '../string/string.js';



/**
 * Object that can serialize objects or values to a protocol buffer string.
 * @constructor
 * @extends {jsonSerializer}
 * @final
 */
export function Serializer() {
  jsonSerializer.call(this);
}
goog.inherits(Serializer, jsonSerializer);


/**
 * Serializes an array to a protocol buffer string. This overrides the JSON
 * method to don't output trailing null or undefined.
 * @param {Array<*>} arr The array to serialize.
 * @param {Array<string>} sb Array used as a string builder.
 * @override
 */
Serializer.prototype.serializeArray = function(arr, sb) {
  const l = arr.length;
  sb.push('[');
  let emptySlots = 0;
  let sep = '';
  for (let i = 0; i < l; i++) {
    if (arr[i] == null) {  // catches undefined as well
      emptySlots++;
    } else {
      sb.push(sep);
      if (emptySlots > 0) {
        sb.push(googString.repeat('null,', emptySlots));
        emptySlots = 0;
      }
      this.serializeInternal(arr[i], sb);
      sep = ',';
    }
  }
  sb.push(']');
};
