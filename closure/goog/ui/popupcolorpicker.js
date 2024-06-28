/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Popup Color Picker implementation.  This is intended to be
 * less general than ColorPicker and presents a default set of colors
 * that CCC apps currently use in their color pickers.
 *
 * @see ../demos/popupcolorpicker.html
 */

import * as asserts from '../asserts/asserts.js';

import * as classlist from '../dom/classlist.js';
import { EventType } from '../events/eventtype.js';
import { AnchoredPosition } from '../positioning/anchoredposition.js';
import { Corner } from '../positioning/positioning.js';
import { ColorPicker } from './colorpicker.js';
import { Component } from './component.js';
import { Popup } from './popup.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { Event } = goog.requireType('goog.events.event');
const { PopupBase } = goog.requireType('goog.ui.popupbase');



/**
 * Popup color picker widget.
 *
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @param {ColorPicker=} opt_colorPicker Optional color picker to use
 *     for this popup.
 * @extends {Component}
 * @constructor
 */
export function PopupColorPicker(opt_domHelper, opt_colorPicker) {
  Component.call(this, opt_domHelper);

  if (opt_colorPicker) {
    this.colorPicker_ = opt_colorPicker;
  }
}
goog.inherits(PopupColorPicker, Component);


/**
 * Whether the color picker is initialized.
 * @type {boolean}
 * @private
 */
PopupColorPicker.prototype.initialized_ = false;


/**
 * Instance of a color picker control.
 * @type {?ColorPicker}
 * @private
 */
PopupColorPicker.prototype.colorPicker_ = null;


/**
 * Instance of Popup used to manage the behavior of the color picker.
 * @type {?Popup}
 * @private
 */
PopupColorPicker.prototype.popup_ = null;


/**
 * Corner of the popup which is pinned to the attaching element.
 * @type {Corner}
 * @private
 */
PopupColorPicker.prototype.pinnedCorner_ =
    Corner.TOP_START;


/**
 * Corner of the attaching element where the popup shows.
 * @type {Corner}
 * @private
 */
PopupColorPicker.prototype.popupCorner_ =
    Corner.BOTTOM_START;


/**
 * Reference to the element that triggered the last popup.
 * @type {?Element}
 * @private
 */
PopupColorPicker.prototype.lastTarget_ = null;


/** @private {boolean} */
PopupColorPicker.prototype.rememberSelection_;


/**
 * Whether the color picker can move the focus to its key event target when it
 * is shown.  The default is true.  Setting to false can break keyboard
 * navigation, but this is needed for certain scenarios, for example the
 * toolbar menu in trogedit which can't have the selection changed.
 * @type {boolean}
 * @private
 */
PopupColorPicker.prototype.allowAutoFocus_ = true;


/**
 * Whether the color picker can accept focus.
 * @type {boolean}
 * @private
 */
PopupColorPicker.prototype.focusable_ = true;


/**
 * If true, then the colorpicker will toggle off if it is already visible.
 *
 * @type {boolean}
 * @private
 */
PopupColorPicker.prototype.toggleMode_ = true;


/**
 * If true, the colorpicker will appear on hover.
 * @type {boolean}
 * @private
 */
PopupColorPicker.prototype.showOnHover_ = false;


/** @override */
PopupColorPicker.prototype.createDom = function() {
  PopupColorPicker.superClass_.createDom.call(this);
  this.popup_ = new Popup(this.getElement());
  this.popup_.setPinnedCorner(this.pinnedCorner_);
  classlist.set(
      asserts.assert(this.getElement()),
      goog.getCssName('goog-popupcolorpicker'));
  this.getElement().unselectable = 'on';
};


/** @override */
PopupColorPicker.prototype.disposeInternal = function() {
  PopupColorPicker.superClass_.disposeInternal.call(this);
  this.colorPicker_ = null;
  this.lastTarget_ = null;
  this.initialized_ = false;
  if (this.popup_) {
    this.popup_.dispose();
    this.popup_ = null;
  }
};


/**
 * ColorPickers cannot be used to decorate pre-existing html, since the
 * structure they build is fairly complicated.
 * @param {Element} element Element to decorate.
 * @return {boolean} Returns always false.
 * @override
 */
PopupColorPicker.prototype.canDecorate = function(element) {
  return false;
};


/**
 * @return {ColorPicker} The color picker instance.
 */
PopupColorPicker.prototype.getColorPicker = function() {
  return this.colorPicker_;
};


/**
 * Returns whether the Popup dismisses itself when the user clicks outside of
 * it.
 * @return {boolean} Whether the Popup autohides on an external click.
 */
PopupColorPicker.prototype.getAutoHide = function() {
  return !!this.popup_ && this.popup_.getAutoHide();
};


/**
 * Sets whether the Popup dismisses itself when the user clicks outside of it -
 * must be called after the Popup has been created (in createDom()),
 * otherwise it does nothing.
 *
 * @param {boolean} autoHide Whether to autohide on an external click.
 */
PopupColorPicker.prototype.setAutoHide = function(autoHide) {
  if (this.popup_) {
    this.popup_.setAutoHide(autoHide);
  }
};


/**
 * Returns the region inside which the Popup dismisses itself when the user
 * clicks, or null if it was not set. Null indicates the entire document is
 * the autohide region.
 * @return {Element} The DOM element for autohide, or null if it hasn't been
 *     set.
 */
PopupColorPicker.prototype.getAutoHideRegion = function() {
  return this.popup_ && this.popup_.getAutoHideRegion();
};


/**
 * Sets the region inside which the Popup dismisses itself when the user
 * clicks - must be called after the Popup has been created (in createDom()),
 * otherwise it does nothing.
 *
 * @param {Element} element The DOM element for autohide.
 */
PopupColorPicker.prototype.setAutoHideRegion = function(element) {
  if (this.popup_) {
    this.popup_.setAutoHideRegion(element);
  }
};


/**
 * Returns the {@link PopupBase} from this picker. Returns null if the
 * popup has not yet been created.
 *
 * NOTE: This should *ONLY* be called from tests. If called before createDom(),
 * this should return null.
 *
 * @return {PopupBase?} The popup or null if it hasn't been created.
 */
PopupColorPicker.prototype.getPopup = function() {
  return this.popup_;
};


/**
 * @return {Element} The last element that triggered the popup.
 */
PopupColorPicker.prototype.getLastTarget = function() {
  return this.lastTarget_;
};


/**
 * Attaches the popup color picker to an element.
 * @param {Element} element The element to attach to.
 */
PopupColorPicker.prototype.attach = function(element) {
  if (this.showOnHover_) {
    this.getHandler().listen(
        element, EventType.MOUSEOVER, this.show_);
  } else {
    this.getHandler().listen(
        element, EventType.MOUSEDOWN, this.show_);
  }
};


/**
 * Detatches the popup color picker from an element.
 * @param {Element} element The element to detach from.
 */
PopupColorPicker.prototype.detach = function(element) {
  if (this.showOnHover_) {
    this.getHandler().unlisten(
        element, EventType.MOUSEOVER, this.show_);
  } else {
    this.getHandler().unlisten(
        element, EventType.MOUSEOVER, this.show_);
  }
};


/**
 * Gets the color that is currently selected in this color picker.
 * @return {?string} The hex string of the color selected, or null if no
 *     color is selected.
 */
PopupColorPicker.prototype.getSelectedColor = function() {
  return this.colorPicker_.getSelectedColor();
};


/**
 * Sets whether the color picker can accept focus.
 * @param {boolean} focusable True iff the color picker can accept focus.
 */
PopupColorPicker.prototype.setFocusable = function(focusable) {
  this.focusable_ = focusable;
  if (this.colorPicker_) {
    // TODO(user): In next revision sort the behavior of passing state to
    // children correctly
    this.colorPicker_.setFocusable(focusable);
  }
};


/**
 * Sets whether the color picker can automatically move focus to its key event
 * target when it is set to visible.
 * @param {boolean} allow Whether to allow auto focus.
 */
PopupColorPicker.prototype.setAllowAutoFocus = function(allow) {
  this.allowAutoFocus_ = allow;
};


/**
 * @return {boolean} Whether the color picker can automatically move focus to
 *     its key event target when it is set to visible.
 */
PopupColorPicker.prototype.getAllowAutoFocus = function() {
  return this.allowAutoFocus_;
};


/**
 * Sets whether the color picker should toggle off if it is already open.
 * @param {boolean} toggle The new toggle mode.
 */
PopupColorPicker.prototype.setToggleMode = function(toggle) {
  this.toggleMode_ = toggle;
};


/**
 * Gets whether the colorpicker is in toggle mode
 * @return {boolean} toggle.
 */
PopupColorPicker.prototype.getToggleMode = function() {
  return this.toggleMode_;
};


/**
 * Sets whether the picker remembers the last selected color between popups.
 *
 * @param {boolean} remember Whether to remember the selection.
 */
PopupColorPicker.prototype.setRememberSelection = function(remember) {
  this.rememberSelection_ = remember;
};


/**
 * @return {boolean} Whether the picker remembers the last selected color
 *     between popups.
 */
PopupColorPicker.prototype.getRememberSelection = function() {
  return this.rememberSelection_;
};


/**
 * Add an array of colors to the colors displayed by the color picker.
 * Does not add duplicated colors.
 * @param {Array<string>} colors The array of colors to be added.
 */
PopupColorPicker.prototype.addColors = function(colors) {

};


/**
 * Clear the colors displayed by the color picker.
 */
PopupColorPicker.prototype.clearColors = function() {

};


/**
 * Set the pinned corner of the popup.
 * @param {Corner} corner The corner of the popup which is
 *     pinned to the attaching element.
 */
PopupColorPicker.prototype.setPinnedCorner = function(corner) {
  this.pinnedCorner_ = corner;
  if (this.popup_) {
    this.popup_.setPinnedCorner(this.pinnedCorner_);
  }
};


/**
 * Sets which corner of the attaching element this popup shows up.
 * @param {Corner} corner The corner of the attaching element
 *     where to show the popup.
 */
PopupColorPicker.prototype.setPopupCorner = function(corner) {
  this.popupCorner_ = corner;
};


/**
 * Sets whether the popup shows up on hover. By default, appears on click.
 * @param {boolean} showOnHover True if popup should appear on hover.
 */
PopupColorPicker.prototype.setShowOnHover = function(showOnHover) {
  this.showOnHover_ = showOnHover;
};


/**
 * Handles click events on the targets and shows the color picker.
 * @param {BrowserEvent} e The browser event.
 * @private
 */
PopupColorPicker.prototype.show_ = function(e) {
  if (!this.initialized_) {
    this.colorPicker_ = this.colorPicker_ ||
        ColorPicker.createSimpleColorGrid(this.getDomHelper());
    this.colorPicker_.setFocusable(this.focusable_);
    this.addChild(this.colorPicker_, true);
    this.getHandler().listen(
        this.colorPicker_, ColorPicker.EventType.CHANGE,
        this.onColorPicked_);
    this.initialized_ = true;
  }

  if (this.popup_.isOrWasRecentlyVisible() && this.toggleMode_ &&
      this.lastTarget_ == e.currentTarget) {
    this.popup_.setVisible(false);
    return;
  }

  this.lastTarget_ = /** @type {Element} */ (e.currentTarget);
  this.popup_.setPosition(
      new AnchoredPosition(
          this.lastTarget_, this.popupCorner_));
  if (!this.rememberSelection_) {
    this.colorPicker_.setSelectedIndex(-1);
  }
  this.popup_.setVisible(true);
  if (this.allowAutoFocus_) {
    this.colorPicker_.focus();
  }
};


/**
 * Handles the color change event.
 * @param {Event} e The event.
 * @private
 */
PopupColorPicker.prototype.onColorPicked_ = function(e) {
  // When we show the color picker we reset the color, which triggers an event.
  // Here we block that event so that it doesn't dismiss the popup
  // TODO(user): Update the colorpicker to allow selection to be cleared
  if (this.colorPicker_.getSelectedIndex() == -1) {
    e.stopPropagation();
    return;
  }
  this.popup_.setVisible(false);
  if (this.allowAutoFocus_) {
    this.lastTarget_.focus();
  }
};
