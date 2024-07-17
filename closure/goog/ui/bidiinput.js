/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Component for an input field with bidi direction automatic
 * detection. The input element directionality is automatically set according
 * to the contents (value) of the element.
 *
 * @see ../demos/bidiinput.html
 */


import * as dom from '../dom/dom.js';

import { InputType } from '../dom/inputtype.js';
import { TagName } from '../dom/tagname.js';
import * as events from '../events/events.js';
import { InputHandler } from '../events/inputhandler.js';
import * as bidi from '../i18n/bidi.js';
import { Component } from './component.js';



/**
 * Default implementation of BidiInput.
 *
 * @param {dom.DomHelper=} opt_domHelper  Optional DOM helper.
 * @constructor
 * @extends {Component}
 */
export function BidiInput(opt_domHelper) {
  Component.call(this, opt_domHelper);
}
goog.inherits(BidiInput, Component);


/**
 * The input handler that provides the input event.
 * @type {InputHandler?}
 * @private
 */
BidiInput.prototype.inputHandler_ = null;


/**
 * Decorates the given HTML element as a BidiInput. The HTML element can be an
 * input element with type='text', a textarea element, or any contenteditable.
 * Overrides {@link Component#decorateInternal}.  Considered protected.
 * @param {Element} element  Element to decorate.
 * @protected
 * @override
 */
BidiInput.prototype.decorateInternal = function(element) {
  BidiInput.superClass_.decorateInternal.call(this, element);
  this.init_();
};


/**
 * @return {?HTMLInputElement}
 * @override
 */
BidiInput.prototype.getElement = function() {
  return /** @type {?HTMLInputElement} */ (BidiInput.superClass_.getElement.call(this));
};


/**
 * Creates the element for the text input.
 * @protected
 * @override
 */
BidiInput.prototype.createDom = function() {
  this.setElementInternal(this.getDomHelper().createDom(
      TagName.INPUT, {'type': InputType.TEXT}));
  this.init_();
};


/**
 * Initializes the events and initial text direction.
 * Called from either decorate or createDom, after the input field has
 * been created.
 * @private
 */
BidiInput.prototype.init_ = function() {
  // Set initial direction by current text
  this.setDirection_();

  // Listen to value change events
  this.inputHandler_ = new InputHandler(this.getElement());
  events.listen(
      this.inputHandler_, InputHandler.EventType.INPUT,
      this.setDirection_, false, this);
};


/**
 * Set the direction of the input element based on the current value. If the
 * value does not have any strongly directional characters, remove the dir
 * attribute so that the direction is inherited instead.
 * This method is called when the user changes the input element value, or
 * when a program changes the value using
 * {@link BidiInput#setValue}
 * @private
 */
BidiInput.prototype.setDirection_ = function() {
  var element = this.getElement();
  if (element) {
    var text = this.getValue();
    bidi.setElementDirByTextDirectionality(element, text);
  }
};


/**
 * Returns the direction of the input element.
 * @return {?string} Return 'rtl' for right-to-left text,
 *     'ltr' for left-to-right text, or null if the value itself is not
 *     enough to determine directionality (e.g. an empty value), and the
 *     direction is inherited from a parent element (typically the body
 *     element).
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
BidiInput.prototype.getDirection = function() {
  var dir = this.getElement().dir;
  if (dir == '') {
    dir = null;
  }
  return dir;
};


/**
 * Sets the value of the underlying input field, and sets the direction
 * according to the given value.
 * @param {string} value  The Value to set in the underlying input field.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
BidiInput.prototype.setValue = function(value) {
  var element = this.getElement();
  if (element.value != null) {
    element.value = value;
  } else {
    dom.setTextContent(element, value);
  }
  this.setDirection_();
};


/**
 * Returns the value of the underlying input field.
 * @return {string} Value of the underlying input field.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
BidiInput.prototype.getValue = function() {
  var element = this.getElement();
  return element.value != null ? element.value :
                                 dom.getRawTextContent(element);
};


/** @override */
BidiInput.prototype.disposeInternal = function() {
  if (this.inputHandler_) {
    events.removeAll(this.inputHandler_);
    this.inputHandler_.dispose();
    this.inputHandler_ = null;
  }
  BidiInput.base(this, 'disposeInternal');
};
