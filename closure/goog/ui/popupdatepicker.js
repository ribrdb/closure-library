/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Popup Date Picker implementation.  Pairs a DatePicker
 * with a Popup allowing the DatePicker to be attached to elements.
 *
 * @see ../demos/popupdatepicker.html
 */

import { EventType } from '../events/eventtype.js';

import { AnchoredViewportPosition } from '../positioning/anchoredviewportposition.js';
import { Corner } from '../positioning/positioning.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
import { DatePicker } from './datepicker.js';
import { Popup } from './popup.js';
import { PopupBase } from './popupbase.js';
const { Date } = goog.requireType('goog.date.date');
const { DomHelper } = goog.requireType('goog.dom.dom');
const { Event } = goog.requireType('goog.events.event');



/**
 * Popup date picker widget. Fires PopupBase.EventType.SHOW or HIDE
 * events when its visibility changes.
 *
 * @param {DatePicker=} opt_datePicker Optional DatePicker.  This
 *     enables the use of a custom date-picker instance.
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {Component}
 * @constructor
 */
export function PopupDatePicker(opt_datePicker, opt_domHelper) {
 Component.call(this, opt_domHelper);

 this.datePicker_ = opt_datePicker || new DatePicker();

 /**
  * Whether to reposition the popup when the date picker size changes (due to
  * going to a different month with more weeks) so that all weeks are visible
  * in the viewport.
  * @private {boolean}
  */
 this.keepAllWeeksInViewport_ = false;
}
goog.inherits(PopupDatePicker, Component);


/**
 * Instance of a date picker control.
 * @type {DatePicker?}
 * @private
 */
PopupDatePicker.prototype.datePicker_ = null;


/**
 * Instance of Popup used to manage the behavior of the date picker.
 * @type {Popup?}
 * @private
 */
PopupDatePicker.prototype.popup_ = null;


/**
 * Reference to the element that triggered the last popup.
 * @type {?Element}
 * @private
 */
PopupDatePicker.prototype.lastTarget_ = null;


/**
 * Whether the date picker can move the focus to its key event target when it
 * is shown.  The default is true.  Setting to false can break keyboard
 * navigation, but this is needed for certain scenarios, for example the
 * toolbar menu in trogedit which can't have the selection changed.
 * @type {boolean}
 * @private
 */
PopupDatePicker.prototype.allowAutoFocus_ = true;


/** @override */
PopupDatePicker.prototype.createDom = function() {
 PopupDatePicker.superClass_.createDom.call(this);
 this.getElement().className = goog.getCssName('goog-popupdatepicker');
 this.popup_ = new Popup(this.getElement());
 this.popup_.setParentEventTarget(this);
};


/**
 * @return {boolean} Whether the date picker is visible.
 */
PopupDatePicker.prototype.isVisible = function() {
 return this.popup_ ? this.popup_.isVisible() : false;
};


/** @override */
PopupDatePicker.prototype.enterDocument = function() {
 PopupDatePicker.superClass_.enterDocument.call(this);
 // Create the DatePicker, if it isn't already.
 // Done here as DatePicker assumes that the element passed to it is attached
 // to a document.
 if (!this.datePicker_.isInDocument()) {
   var el = this.getElement();
   // Make it initially invisible
   el.style.visibility = 'hidden';
   style.setElementShown(el, false);
   this.datePicker_.decorate(el);
 }
 this.getHandler()
     .listen(
         this.datePicker_, DatePicker.Events.CHANGE,
         this.onDateChanged_)
     .listen(
         this.datePicker_, DatePicker.Events.SELECT,
         this.onDateSelected_);
};


/** @override */
PopupDatePicker.prototype.disposeInternal = function() {
 PopupDatePicker.superClass_.disposeInternal.call(this);
 if (this.popup_) {
   this.popup_.dispose();
   this.popup_ = null;
 }
 this.datePicker_.dispose();
 this.datePicker_ = null;
 this.lastTarget_ = null;
};


/**
 * DatePicker cannot be used to decorate pre-existing html, since they're
 * not based on Components.
 * @param {Element} element Element to decorate.
 * @return {boolean} Returns always false.
 * @override
 */
PopupDatePicker.prototype.canDecorate = function(element) {
 return false;
};


/**
 * @return {DatePicker} The date picker instance.
 */
PopupDatePicker.prototype.getDatePicker = function() {
 return this.datePicker_;
};

/**
 * @return {?Popup} The popup instance.
 */
PopupDatePicker.prototype.getPopup = function() {
 return this.popup_;
};


/**
 * @return {Date?} The selected date, if any.  See
 *     DatePicker.getDate().
 */
PopupDatePicker.prototype.getDate = function() {
 return this.datePicker_.getDate();
};


/**
 * Sets the selected date.  See DatePicker.setDate().
 * @param {Date?} date The date to select.
 */
PopupDatePicker.prototype.setDate = function(date) {
 this.datePicker_.setDate(date);
};


/**
 * @return {Element} The last element that triggered the popup.
 */
PopupDatePicker.prototype.getLastTarget = function() {
 return this.lastTarget_;
};


/**
 * Attaches the popup date picker to an element.
 * @param {Element} element The element to attach to.
 */
PopupDatePicker.prototype.attach = function(element) {
 this.getHandler().listen(
     element, EventType.MOUSEDOWN, this.showPopup_);
};


/**
 * Detatches the popup date picker from an element.
 * @param {Element} element The element to detach from.
 */
PopupDatePicker.prototype.detach = function(element) {
 this.getHandler().unlisten(
     element, EventType.MOUSEDOWN, this.showPopup_);
};


/**
 * Sets whether the date picker can automatically move focus to its key event
 * target when it is set to visible.
 * @param {boolean} allow Whether to allow auto focus.
 */
PopupDatePicker.prototype.setAllowAutoFocus = function(allow) {
 this.allowAutoFocus_ = allow;
};


/**
 * @return {boolean} Whether the date picker can automatically move focus to
 * its key event target when it is set to visible.
 */
PopupDatePicker.prototype.getAllowAutoFocus = function() {
 return this.allowAutoFocus_;
};


/**
 * Sets whether to reposition the popup when the date picker size changes so
 * that all weeks are visible in the viewport.
 * @param {boolean} keepAllWeeksInViewport
 */
PopupDatePicker.prototype.setKeepAllWeeksInViewport = function(
    keepAllWeeksInViewport) {
 this.keepAllWeeksInViewport_ = keepAllWeeksInViewport;
};


/**
 * @return {boolean} Whether to reposition the popup when the date picker size
 *     changes so that all weeks are visible in the viewport.
 */
PopupDatePicker.prototype.getKeepAllWeeksInViewport = function() {
 return this.keepAllWeeksInViewport_;
};


/**
 * Show the popup at the bottom-left corner of the specified element.
 * @param {Element} element Reference element for displaying the popup -- popup
 *     will appear at the bottom-left corner of this element.
 * @param {boolean=} opt_keepDate Whether to keep the date picker's current
 *     date. If false, the date is set to null. Defaults to false.
 */
PopupDatePicker.prototype.showPopup = function(element, opt_keepDate) {
 this.lastTarget_ = element;
 this.popup_.setPosition(new AnchoredViewportPosition(
     element, Corner.BOTTOM_START, true));

 // Don't listen to date changes while we're setting up the popup so we don't
 // have to worry about change events when we call setDate(). Don't listen to
 // grid size changes since the popup will position itself when we call
 // setVisible().
 this.getHandler()
     .unlisten(
         this.datePicker_, DatePicker.Events.CHANGE,
         this.onDateChanged_)
     .unlisten(
         this.datePicker_, DatePicker.Events.SELECT,
         this.onDateSelected_)
     .unlisten(
         this.datePicker_, DatePicker.Events.GRID_SIZE_INCREASE,
         this.onGridSizeIncrease_);

 var keepDate = !!opt_keepDate;
 if (!keepDate) {
   this.datePicker_.setDate(null);
 }

 // Forward the change event onto our listeners.  Done before we start
 // listening to date changes again, so that listeners can change the date
 // without firing more events.
 this.dispatchEvent(PopupBase.EventType.SHOW);

 this.popup_.setVisible(true);
 if (this.allowAutoFocus_) {
   this.getElement().focus();  // Our element contains the date picker.
 }

 this.getHandler()
     .listen(
         this.datePicker_, DatePicker.Events.CHANGE,
         this.onDateChanged_)
     .listen(
         this.datePicker_, DatePicker.Events.SELECT,
         this.onDateSelected_);

 if (this.keepAllWeeksInViewport_) {
   this.getHandler().listen(
       this.datePicker_, DatePicker.Events.GRID_SIZE_INCREASE,
       this.onGridSizeIncrease_);
 }
};


/**
 * Handles click events on the targets and shows the date picker.
 * @param {Event} event The click event.
 * @private
 */
PopupDatePicker.prototype.showPopup_ = function(event) {
 this.showPopup(/** @type {Element} */ (event.currentTarget));
};


/**
 * Hides this popup.
 */
PopupDatePicker.prototype.hidePopup = function() {
 this.popup_.setVisible(false);
 if (this.allowAutoFocus_ && this.lastTarget_) {
   this.lastTarget_.focus();
 }
};


/**
 * Called when date selection is made.
 *
 * @param {!Event} event The date change event.
 * @private
 */
PopupDatePicker.prototype.onDateSelected_ = function(event) {
 this.hidePopup();

 // Forward the change event onto our listeners.
 this.dispatchEvent(event);
};


/**
 * Called when the date is changed.
 *
 * @param {!Event} event The date change event.
 * @private
 */
PopupDatePicker.prototype.onDateChanged_ = function(event) {
 // Forward the change event onto our listeners.
 this.dispatchEvent(event);
};


/**
 * Called when the container DatePicker's size increases.
 * @private
 */
PopupDatePicker.prototype.onGridSizeIncrease_ = function() {
 this.popup_ && this.popup_.reposition();
};
