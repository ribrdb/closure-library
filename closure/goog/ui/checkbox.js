/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Tristate checkbox widget.
 *
 * @see ../demos/checkbox.html
 */

goog.declareModuleId('goog.ui.checkbox');

import * as aria from '../a11y/aria/aria.js';
import { State } from '../a11y/aria/attributes.js';
import { EventType } from '../events/eventtype.js';
import { KeyCodes } from '../events/keycodes.js';
import * as googString from '../string/string.js';
import { CheckboxRenderer } from './checkboxrenderer.js';
import { Component } from './component.js';
import { Control } from './control.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * 3-state checkbox widget. Fires CHECK or UNCHECK events before toggled and
 * CHANGE event after toggled by user.
 * The checkbox can also be enabled/disabled and get focused and highlighted.
 *
 * @param {Checkbox.State=} opt_checked Checked state to set.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {CheckboxRenderer=} opt_renderer Renderer used to render or
 *     decorate the checkbox; defaults to {@link CheckboxRenderer}.
 * @constructor
 * @extends {Control}
 */
export function Checkbox(opt_checked, opt_domHelper, opt_renderer) {
  var renderer = opt_renderer || CheckboxRenderer.getInstance();
  Control.call(this, null, renderer, opt_domHelper);
  // The checkbox maintains its own tri-state CHECKED state.
  // The control class maintains DISABLED, ACTIVE, and FOCUSED (which enable tab
  // navigation, and keyHandling with SPACE).

  /**
     * Checked state of the checkbox.
     * @type {Checkbox.State}
     * @private
     */
  this.checked_ = (opt_checked !== undefined) ?
      opt_checked :
      Checkbox.State.UNCHECKED;
}
goog.inherits(Checkbox, Control);


/**
 * Possible checkbox states.
 * @enum {?boolean}
 */
Checkbox.State = {
  CHECKED: true,
  UNCHECKED: false,
  UNDETERMINED: null
};


/**
 * Label element bound to the checkbox.
 * @type {?Element}
 * @private
 */
Checkbox.prototype.label_ = null;


/**
 * @return {Checkbox.State} Checked state of the checkbox.
 */
Checkbox.prototype.getChecked = function() {
  return this.checked_;
};


/**
 * @return {boolean} Whether the checkbox is checked.
 * @override
 */
Checkbox.prototype.isChecked = function() {
  return this.checked_ == Checkbox.State.CHECKED;
};


/**
 * @return {boolean} Whether the checkbox is not checked.
 */
Checkbox.prototype.isUnchecked = function() {
  return this.checked_ == Checkbox.State.UNCHECKED;
};


/**
 * @return {boolean} Whether the checkbox is in partially checked state.
 */
Checkbox.prototype.isUndetermined = function() {
  return this.checked_ == Checkbox.State.UNDETERMINED;
};


/**
 * Sets the checked state of the checkbox.
 * @param {?boolean} checked The checked state to set.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Checkbox.prototype.setChecked = function(checked) {
  if (checked != this.checked_) {
    this.checked_ = /** @type {Checkbox.State} */ (checked);
    this.getRenderer().setCheckboxState(this.getElement(), this.checked_);
  }
};


/**
 * Sets the checked state for the checkbox.  Unlike {@link #setChecked},
 * doesn't update the checkbox's DOM.  Considered protected; to be called
 * only by renderer code during element decoration.
 * @param {Checkbox.State} checked New checkbox state.
 */
Checkbox.prototype.setCheckedInternal = function(checked) {
  this.checked_ = checked;
};


/**
 * Binds an HTML element to the checkbox which if clicked toggles the checkbox.
 * Behaves the same way as the 'label' HTML tag. The label element has to be the
 * direct or non-direct ancestor of the checkbox element because it will get the
 * focus when keyboard support is implemented.
 * Note: Control#enterDocument also sets aria-label on the element but
 * Checkbox#enterDocument sets aria-labeledby on the same element which
 * overrides the aria-label in all modern screen readers.
 *
 * @param {?Element} label The label control to set. If null, only the checkbox
 *     reacts to clicks.
 */
Checkbox.prototype.setLabel = function(label) {
  if (this.isInDocument()) {
    var wasFocused = this.isFocused();
    this.exitDocument();
    this.label_ = label;
    this.enterDocument();
    if (wasFocused) {
      this.getElementStrict().focus();
    }
  } else {
    this.label_ = label;
  }
};


/**
 * Toggles the checkbox. State transitions:
 * <ul>
 *   <li>unchecked -> checked
 *   <li>undetermined -> checked
 *   <li>checked -> unchecked
 * </ul>
 */
Checkbox.prototype.toggle = function() {
  this.setChecked(
      this.checked_ ? Checkbox.State.UNCHECKED :
                      Checkbox.State.CHECKED);
};


/** @override */
Checkbox.prototype.enterDocument = function() {
  Checkbox.base(this, 'enterDocument');
  if (this.isHandleMouseEvents()) {
    var handler = this.getHandler();
    // Listen to the label, if it was set.
    if (this.label_) {
      // Any mouse events that happen to the associated label should have the
      // same effect on the checkbox as if they were happening to the checkbox
      // itself.
      handler
          .listen(
              this.label_, EventType.CLICK,
              this.handleClickOrSpace_)
          .listen(
              this.label_, EventType.MOUSEOVER,
              this.handleMouseOver)
          .listen(
              this.label_, EventType.MOUSEOUT, this.handleMouseOut)
          .listen(
              this.label_, EventType.MOUSEDOWN,
              this.handleMouseDown)
          .listen(
              this.label_, EventType.MOUSEUP, this.handleMouseUp);
    }
    // Checkbox needs to explicitly listen for click event.
    handler.listen(
        this.getElement(), EventType.CLICK,
        this.handleClickOrSpace_);
  }

  // Set aria label.
  var checkboxElement = this.getElementStrict();
  if (this.label_ && checkboxElement != this.label_ &&
      googString.isEmptyOrWhitespace(
          aria.getLabel(checkboxElement))) {
    if (!this.label_.id) {
      this.label_.id = this.makeId('lbl');
    }
    aria.setState(
        checkboxElement, State.LABELLEDBY, this.label_.id);
  }
};


/**
 * Handles the click event.
 * @param {!BrowserEvent} e The event.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Checkbox.prototype.handleClickOrSpace_ = function(e) {
  e.stopPropagation();
  var eventType = this.checked_ ? Component.ComponentEventType.UNCHECK :
                                  Component.ComponentEventType.CHECK;
  if (this.isEnabled() && !e.target.href && this.dispatchEvent(eventType)) {
    e.preventDefault();  // Prevent scrolling in Chrome if SPACE is pressed.
    this.toggle();
    this.dispatchEvent(Component.ComponentEventType.CHANGE);
  }
};


/** @override */
Checkbox.prototype.handleKeyEventInternal = function(e) {
  if (e.keyCode == KeyCodes.SPACE) {
    this.performActionInternal(e);
    this.handleClickOrSpace_(e);
  }
  return false;
};


/**
 * Register this control so it can be created from markup.
 */
registry.setDecoratorByClassName(
    CheckboxRenderer.CSS_CLASS, function() {
  return new Checkbox();
});
