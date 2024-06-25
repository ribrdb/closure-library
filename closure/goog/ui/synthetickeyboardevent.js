/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Event } from '../events/event.js';

import { KeyboardEventData } from './keyboardeventdata.js';



/**
 * Synthetic keyboard event that can be handled by `KeyboardShortcutHandler`.
 *
 * Prefer using the available `createKeyUp`, `createKeyDown`, `createKeyPress`
 * helpers over using this constructor.
 * @param {!SyntheticKeyboardEvent.Type} type
 * @param {number} keyCode
 * @param {boolean} shiftKey
 * @param {boolean} altKey
 * @param {boolean} ctrlKey
 * @param {boolean} metaKey
 * @param {!Node} target
 * @param {function(): void} preventDefaultFn
 * @param {function(): void} stopPropagationFn
 * @extends {Event}
 * @constructor @struct @final
 */
export function SyntheticKeyboardEvent(
 type,
 keyCode,
 shiftKey,
 altKey,
 ctrlKey,
 metaKey,
 target,
 preventDefaultFn,
 stopPropagationFn
) {
 SyntheticKeyboardEvent.base(this, 'constructor', type);

 /** @private @const {!KeyboardEventData} */
 this.data_ = new KeyboardEventData.Builder()
                  .keyCode(keyCode)
                  .shiftKey(shiftKey)
                  .altKey(altKey)
                  .ctrlKey(ctrlKey)
                  .metaKey(metaKey)
                  .target(target)
                  .rootTarget(target)
                  .preventDefaultFn(preventDefaultFn)
                  .stopPropagationFn(stopPropagationFn)
                  .build();
}
goog.inherits(SyntheticKeyboardEvent, Event);


/**
 * @return {!KeyboardEventData}
 * @package
 */
SyntheticKeyboardEvent.prototype.getData = function() {
 return this.data_;
};


/**
 * Creates a synthetic keydown event.
 * @param {number} keyCode
 * @param {boolean} shiftKey
 * @param {boolean} altKey
 * @param {boolean} ctrlKey
 * @param {boolean} metaKey
 * @param {!Node} target
 * @param {function(): void} preventDefaultFn
 * @param {function(): void} stopPropagationFn
 * @return {!SyntheticKeyboardEvent}
 */
SyntheticKeyboardEvent.createKeyDown = function(
    keyCode, shiftKey, altKey, ctrlKey, metaKey, target, preventDefaultFn,
    stopPropagationFn) {
 return new SyntheticKeyboardEvent(
     SyntheticKeyboardEvent.Type.KEYDOWN, keyCode, shiftKey, altKey,
     ctrlKey, metaKey, target, preventDefaultFn, stopPropagationFn);
};


/**
 * Creates a synthetic keyup event.
 * @param {number} keyCode
 * @param {boolean} shiftKey
 * @param {boolean} altKey
 * @param {boolean} ctrlKey
 * @param {boolean} metaKey
 * @param {!Node} target
 * @param {function(): void} preventDefaultFn
 * @param {function(): void} stopPropagationFn
 * @return {!SyntheticKeyboardEvent}
 */
SyntheticKeyboardEvent.createKeyUp = function(
    keyCode, shiftKey, altKey, ctrlKey, metaKey, target, preventDefaultFn,
    stopPropagationFn) {
 return new SyntheticKeyboardEvent(
     SyntheticKeyboardEvent.Type.KEYUP, keyCode, shiftKey, altKey,
     ctrlKey, metaKey, target, preventDefaultFn, stopPropagationFn);
};


/**
 * Creates a synthetic keypress event.
 * @param {number} keyCode
 * @param {boolean} shiftKey
 * @param {boolean} altKey
 * @param {boolean} ctrlKey
 * @param {boolean} metaKey
 * @param {!Node} target
 * @param {function(): void} preventDefaultFn
 * @param {function(): void} stopPropagationFn
 * @return {!SyntheticKeyboardEvent}
 */
SyntheticKeyboardEvent.createKeyPress = function(
    keyCode, shiftKey, altKey, ctrlKey, metaKey, target, preventDefaultFn,
    stopPropagationFn) {
 return new SyntheticKeyboardEvent(
     SyntheticKeyboardEvent.Type.KEYPRESS, keyCode, shiftKey, altKey,
     ctrlKey, metaKey, target, preventDefaultFn, stopPropagationFn);
};


/**
 * Synthetic event types.
 * @enum {string}
 */
SyntheticKeyboardEvent.Type = {
  KEYDOWN: 'synthetic-keydown',
  KEYUP: 'synthetic-keyup',
  KEYPRESS: 'synthetic-keypress'
};
