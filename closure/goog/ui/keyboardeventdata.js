/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asserts from '../asserts/asserts.js';

import { BrowserEvent } from '../events/browserevent.js';



/**
 * Data object that contains all the necessary information from a keyboard event
 * that is required to process it in `KeyboardShortcutHandler`.
 *
 * Prefer using `KeyboardEventData.Builder` over using this constructor.
 * @param {number} keyCode
 * @param {string} key
 * @param {boolean} shiftKey
 * @param {boolean} altKey
 * @param {boolean} ctrlKey
 * @param {boolean} metaKey
 * @param {!Node} target
 * @param {!EventTarget} rootTarget
 * @param {function(): void} preventDefaultFn
 * @param {function(): void} stopPropagationFn
 * @constructor @struct @final
 * @package
 */
export function KeyboardEventData(
  keyCode,
  key,
  shiftKey,
  altKey,
  ctrlKey,
  metaKey,
  target,
  rootTarget,
  preventDefaultFn,
  stopPropagationFn
) {
  /** @private @const {number} */
  this.keyCode_ = keyCode;

  /** @private @const {string} */
  this.key_ = key;

  /** @private @const {boolean} */
  this.shiftKey_ = shiftKey;

  /** @private @const {boolean} */
  this.altKey_ = altKey;

  /** @private @const {boolean} */
  this.ctrlKey_ = ctrlKey;

  /** @private @const {boolean} */
  this.metaKey_ = metaKey;

  /** @private @const {!Node} */
  this.target_ = target;

  /**
   * For events fired from inside `open` Shadow DOM elements, the root event
   * target (i.e. the first `EventTarget` in the composed path). For all other
   * events, the original target.
   * @private @const {!EventTarget}
   */
  this.rootTarget_ = rootTarget;

  /** @private @const {function(): void} */
  this.preventDefaultFn_ = preventDefaultFn;

  /** @private @const {function(): void} */
  this.stopPropagationFn_ = stopPropagationFn;
}


/** @return {number} The keyCode of the event. */
KeyboardEventData.prototype.getKeyCode = function() {
  return this.keyCode_;
};


/** @return {string} The key of the event, or `''` if not one. */
KeyboardEventData.prototype.getKey = function() {
  return this.key_;
};


/** @return {boolean} If the shift key was pressed. */
KeyboardEventData.prototype.getShiftKey = function() {
  return this.shiftKey_;
};


/** @return {boolean} If the alt key was pressed. */
KeyboardEventData.prototype.getAltKey = function() {
  return this.altKey_;
};


/** @return {boolean} If the ctrl key was pressed. */
KeyboardEventData.prototype.getCtrlKey = function() {
  return this.ctrlKey_;
};


/** @return {boolean} If the meta key was pressed. */
KeyboardEventData.prototype.getMetaKey = function() {
  return this.metaKey_;
};


/** @return {!Node} The target of the event. */
KeyboardEventData.prototype.getTarget = function() {
  return this.target_;
};


/** @return {!EventTarget} The rootTarget of the event. */
KeyboardEventData.prototype.getRootTarget = function() {
  return this.rootTarget_;
};


/** @return {function(): void} Callback to prevent default. */
KeyboardEventData.prototype.getPreventDefaultFn = function() {
  return this.preventDefaultFn_;
};


/** @return {function(): void} Callback to stop propagation. */
KeyboardEventData.prototype.getStopPropagationFn = function() {
  return this.stopPropagationFn_;
};


/**
 * @param {!BrowserEvent} event
 * @return {!KeyboardEventData}
 * @suppress {strictMissingProperties} path is a union type
 */
KeyboardEventData.fromBrowserEvent = function(event) {
  var e = event.getBrowserEvent();
  // Check existence to prevent classic FF reference error in strict mode.
  var hasComposed = e && 'composed' in e;
  var hasComposedPath = e && 'composedPath' in e;
  // EventTarget is updated, when browser supports shadow dom and event is
  // triggered inside `open` shadow root.
  var path = hasComposed && hasComposedPath && e.composed && e.composedPath();
  var rootTarget = (path && path.length > 0) ? path[0] : event.target;

  return new KeyboardEventData.Builder()
      .keyCode(event.keyCode || 0)
      .key(event.key || '')
      .shiftKey(!!event.shiftKey)
      .altKey(!!event.altKey)
      .ctrlKey(!!event.ctrlKey)
      .metaKey(!!event.metaKey)
      .target(event.target)
      .rootTarget(rootTarget)
      .preventDefaultFn(() => event.preventDefault())
      .stopPropagationFn(() => event.stopPropagation())
      .build();
};



/**
 * Builder for `KeyboardEventData`. All fields are required except `key`, which
 * defaults to `''`.
 * @constructor @struct @final
 */
KeyboardEventData.Builder = function() {
  /** @private {?number} */
  this.keyCode_ = null;

  /** @private {string} */
  this.key_ = '';

  /** @private {?boolean} */
  this.shiftKey_ = null;

  /** @private {?boolean} */
  this.altKey_ = null;

  /** @private {?boolean} */
  this.ctrlKey_ = null;

  /** @private {?boolean} */
  this.metaKey_ = null;

  /** @private {?Node} */
  this.target_ = null;

  /** @private {?EventTarget} */
  this.rootTarget_ = null;

  /** @private {?function(): void} */
  this.preventDefaultFn_ = null;

  /** @private {?function(): void} */
  this.stopPropagationFn_ = null;
};


/**
 * @param {number} keyCode
 * @return {!KeyboardEventData.Builder}
 */
KeyboardEventData.Builder.prototype.keyCode = function(keyCode) {
  this.keyCode_ = keyCode;
  return this;
};


/**
 * @param {string} key
 * @return {!KeyboardEventData.Builder}
 */
KeyboardEventData.Builder.prototype.key = function(key) {
  this.key_ = key;
  return this;
};


/**
 * @param {boolean} shiftKey
 * @return {!KeyboardEventData.Builder}
 */
KeyboardEventData.Builder.prototype.shiftKey = function(shiftKey) {
  this.shiftKey_ = shiftKey;
  return this;
};


/**
 * @param {boolean} altKey
 * @return {!KeyboardEventData.Builder}
 */
KeyboardEventData.Builder.prototype.altKey = function(altKey) {
  this.altKey_ = altKey;
  return this;
};


/**
 * @param {boolean} ctrlKey
 * @return {!KeyboardEventData.Builder}
 */
KeyboardEventData.Builder.prototype.ctrlKey = function(ctrlKey) {
  this.ctrlKey_ = ctrlKey;
  return this;
};


/**
 * @param {boolean} metaKey
 * @return {!KeyboardEventData.Builder}
 */
KeyboardEventData.Builder.prototype.metaKey = function(metaKey) {
  this.metaKey_ = metaKey;
  return this;
};


/**
 * @param {?Node} target
 * @return {!KeyboardEventData.Builder}
 */
KeyboardEventData.Builder.prototype.target = function(target) {
  this.target_ = target;
  return this;
};


/**
 * @param {?EventTarget} rootTarget
 * @return {!KeyboardEventData.Builder}
 */
KeyboardEventData.Builder.prototype.rootTarget = function(rootTarget) {
  this.rootTarget_ = rootTarget;
  return this;
};


/**
 * @param {function(): void} preventDefaultFn
 * @return {!KeyboardEventData.Builder}
 */
KeyboardEventData.Builder.prototype.preventDefaultFn = function(
    preventDefaultFn) {
  this.preventDefaultFn_ = preventDefaultFn;
  return this;
};


/**
 * @param {function(): void} stopPropagationFn
 * @return {!KeyboardEventData.Builder}
 */
KeyboardEventData.Builder.prototype.stopPropagationFn = function(
    stopPropagationFn) {
  this.stopPropagationFn_ = stopPropagationFn;
  return this;
};


/** @return {!KeyboardEventData} */
KeyboardEventData.Builder.prototype.build = function() {
  return new KeyboardEventData(
      asserts.assertNumber(this.keyCode_), this.key_,
      asserts.assertBoolean(this.shiftKey_),
      asserts.assertBoolean(this.altKey_),
      asserts.assertBoolean(this.ctrlKey_),
      asserts.assertBoolean(this.metaKey_),
      asserts.assert(this.target_), asserts.assert(this.rootTarget_),
      asserts.assertFunction(this.preventDefaultFn_),
      asserts.assertFunction(this.stopPropagationFn_));
};
