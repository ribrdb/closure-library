/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Implementation of a progress bar.
 *
 * @see ../demos/progressbar.html
 */


import * as aria from '../a11y/aria/aria.js';

import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import * as events from '../events/events.js';
import { EventType } from '../events/eventtype.js';
import { Component } from './component.js';
import { RangeModel } from './rangemodel.js';
import * as userAgent from '../useragent/useragent.js';
const {Event} = goog.requireType('goog.events.event');



/**
 * This creates a progress bar object.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {Component}
 */
export function ProgressBar(opt_domHelper) {
  Component.call(this, opt_domHelper);

  /** @type {?HTMLDivElement} */
  this.thumbElement_;

  /**
     * The underlying data model for the progress bar.
     * @type {RangeModel}
     * @private
     */
  this.rangeModel_ = new RangeModel;
  events.listen(
      this.rangeModel_, Component.ComponentEventType.CHANGE, this.handleChange_,
      false, this);
}
goog.inherits(ProgressBar, Component);


/**
 * Enum for representing the orientation of the progress bar.
 *
 * @enum {string}
 */
ProgressBar.Orientation = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};


/**
 * Map from progress bar orientation to CSS class names.
 * @type {!Object<string, string>}
 * @private
 */
ProgressBar.ORIENTATION_TO_CSS_NAME_ = {};
ProgressBar
    .ORIENTATION_TO_CSS_NAME_[ProgressBar.Orientation.VERTICAL] =
    goog.getCssName('progress-bar-vertical');
ProgressBar
    .ORIENTATION_TO_CSS_NAME_[ProgressBar.Orientation.HORIZONTAL] =
    goog.getCssName('progress-bar-horizontal');


/**
 * Creates the DOM nodes needed for the progress bar
 * @override
 */
ProgressBar.prototype.createDom = function() {
  this.thumbElement_ = this.createThumb_();
  this.setElementInternal(this.getDomHelper().createDom(
      TagName.DIV,
      ProgressBar.ORIENTATION_TO_CSS_NAME_[this.orientation_],
      this.thumbElement_));
  this.setValueState_();
  this.setMinimumState_();
  this.setMaximumState_();
};


/** @override */
ProgressBar.prototype.enterDocument = function() {
  ProgressBar.superClass_.enterDocument.call(this);
  this.attachEvents_();
  this.updateUi_();

  var element = this.getElement();
  asserts.assert(element, 'The progress bar DOM element cannot be null.');
  // state live = polite will notify the user of updates,
  // but will not interrupt ongoing feedback
  aria.setRole(element, 'progressbar');
  aria.setState(element, 'live', 'polite');
};


/** @override */
ProgressBar.prototype.exitDocument = function() {
  ProgressBar.superClass_.exitDocument.call(this);
  this.detachEvents_();
};


/**
 * This creates the thumb element.
 * @private
 * @return {!HTMLDivElement} The created thumb element.
 */
ProgressBar.prototype.createThumb_ = function() {
  return this.getDomHelper().createDom(
      TagName.DIV, goog.getCssName('progress-bar-thumb'));
};


/**
 * Adds the initial event listeners to the element.
 * @private
 * @suppress {strictPrimitiveOperators} Part of the go/strict_warnings_migration
 */
ProgressBar.prototype.attachEvents_ = function() {
  if (userAgent.IE && userAgent.VERSION < 7) {
    events.listen(
        this.getElement(), EventType.RESIZE, this.updateUi_, false,
        this);
  }
};


/**
 * Removes the event listeners added by attachEvents_.
 * @private
 * @suppress {strictPrimitiveOperators} Part of the go/strict_warnings_migration
 */
ProgressBar.prototype.detachEvents_ = function() {
  if (userAgent.IE && userAgent.VERSION < 7) {
    events.unlisten(
        this.getElement(), EventType.RESIZE, this.updateUi_, false,
        this);
  }
};


/**
 * Decorates an existing HTML DIV element as a progress bar input. If the
 * element contains a child with a class name of 'progress-bar-thumb' that will
 * be used as the thumb.
 * @param {Element} element  The HTML element to decorate.
 * @override
 */
ProgressBar.prototype.decorateInternal = function(element) {
  ProgressBar.superClass_.decorateInternal.call(this, element);
  classlist.add(
      asserts.assert(this.getElement()),
      ProgressBar.ORIENTATION_TO_CSS_NAME_[this.orientation_]);

  // find thumb
  var thumb = dom.getElementsByTagNameAndClass(
      null, goog.getCssName('progress-bar-thumb'), this.getElement())[0];
  if (!thumb) {
    thumb = this.createThumb_();
    this.getElement().appendChild(/** @type {!Node} */ (thumb));
  }
  this.thumbElement_ = /** @type {!HTMLDivElement} */ (thumb);
};


/**
 * @return {number} The value.
 */
ProgressBar.prototype.getValue = function() {
  return this.rangeModel_.getValue();
};


/**
 * Sets the value
 * @param {number} v The value.
 */
ProgressBar.prototype.setValue = function(v) {
  this.rangeModel_.setValue(v);
  if (this.getElement()) {
    this.setValueState_();
  }
};


/**
 * Sets the state for a11y of the current value.
 * @private
 */
ProgressBar.prototype.setValueState_ = function() {
  var element = this.getElement();
  asserts.assert(element, 'The progress bar DOM element cannot be null.');
  aria.setState(element, 'valuenow', this.getValue());
};


/**
 * @return {number} The minimum value.
 */
ProgressBar.prototype.getMinimum = function() {
  return this.rangeModel_.getMinimum();
};


/**
 * Sets the minimum number
 * @param {number} v The minimum value.
 */
ProgressBar.prototype.setMinimum = function(v) {
  this.rangeModel_.setMinimum(v);
  if (this.getElement()) {
    this.setMinimumState_();
  }
};


/**
 * Sets the state for a11y of the minimum value.
 * @private
 */
ProgressBar.prototype.setMinimumState_ = function() {
  var element = this.getElement();
  asserts.assert(element, 'The progress bar DOM element cannot be null.');
  aria.setState(element, 'valuemin', this.getMinimum());
};


/**
 * @return {number} The maximum value.
 */
ProgressBar.prototype.getMaximum = function() {
  return this.rangeModel_.getMaximum();
};


/**
 * Sets the maximum number
 * @param {number} v The maximum value.
 */
ProgressBar.prototype.setMaximum = function(v) {
  this.rangeModel_.setMaximum(v);
  if (this.getElement()) {
    this.setMaximumState_();
  }
};


/**
 * Sets the state for a11y of the maximum valiue.
 * @private
 */
ProgressBar.prototype.setMaximumState_ = function() {
  var element = this.getElement();
  asserts.assert(element, 'The progress bar DOM element cannot be null.');
  aria.setState(element, 'valuemax', this.getMaximum());
};


/**
 *
 * @type {ProgressBar.Orientation}
 * @private
 */
ProgressBar.prototype.orientation_ =
    ProgressBar.Orientation.HORIZONTAL;


/**
 * Call back when the internal range model changes
 * @param {Event} e The event object.
 * @private
 */
ProgressBar.prototype.handleChange_ = function(e) {
  this.updateUi_();
  this.dispatchEvent(Component.ComponentEventType.CHANGE);
};


/**
 * This is called when we need to update the size of the thumb. This happens
 * when first created as well as when the value and the orientation changes.
 * @private
 * @suppress {strictPrimitiveOperators} Part of the go/strict_warnings_migration
 */
ProgressBar.prototype.updateUi_ = function() {
  if (this.thumbElement_) {
    var min = this.getMinimum();
    var max = this.getMaximum();
    var val = this.getValue();
    var ratio = (val - min) / (max - min);
    var size = Math.round(ratio * 100);
    if (this.orientation_ == ProgressBar.Orientation.VERTICAL) {
      // Note(arv): IE up to version 6 has some serious computation bugs when
      // using percentages or bottom. We therefore first set the height to
      // 100% and measure that and base the top and height on that size instead.
      if (userAgent.IE && userAgent.VERSION < 7) {
        this.thumbElement_.style.top = '0';
        this.thumbElement_.style.height = '100%';
        var h = this.thumbElement_.offsetHeight;
        var bottom = Math.round(ratio * h);
        this.thumbElement_.style.top = h - bottom + 'px';
        this.thumbElement_.style.height = bottom + 'px';
      } else {
        this.thumbElement_.style.top = (100 - size) + '%';
        this.thumbElement_.style.height = size + '%';
      }
    } else {
      this.thumbElement_.style.width = size + '%';
    }
  }
};


/**
 * This is called when we need to setup the UI sizes and positions. This
 * happens when we create the element and when we change the orientation.
 * @private
 */
ProgressBar.prototype.initializeUi_ = function() {
  var tStyle = this.thumbElement_.style;
  if (this.orientation_ == ProgressBar.Orientation.VERTICAL) {
    tStyle.left = '0';
    tStyle.width = '100%';
  } else {
    tStyle.top = tStyle.left = '0';
    tStyle.height = '100%';
  }
};


/**
 * Changes the orientation
 * @param {ProgressBar.Orientation} orient The orientation.
 */
ProgressBar.prototype.setOrientation = function(orient) {
  if (this.orientation_ != orient) {
    var oldCss =
        ProgressBar.ORIENTATION_TO_CSS_NAME_[this.orientation_];
    var newCss = ProgressBar.ORIENTATION_TO_CSS_NAME_[orient];
    this.orientation_ = orient;

    // Update the DOM
    var element = this.getElement();
    if (element) {
      classlist.swap(element, oldCss, newCss);
      this.initializeUi_();
      this.updateUi_();
    }
  }
};


/**
 * @return {ProgressBar.Orientation} The orientation of the
 *     progress bar.
 */
ProgressBar.prototype.getOrientation = function() {
  return this.orientation_;
};


/** @override */
ProgressBar.prototype.disposeInternal = function() {
  this.detachEvents_();
  ProgressBar.superClass_.disposeInternal.call(this);
  this.thumbElement_ = null;
  this.rangeModel_.dispose();
};


/**
 * @return {?number} The step value used to determine how to round the value.
 */
ProgressBar.prototype.getStep = function() {
  return this.rangeModel_.getStep();
};


/**
 * Sets the step value. The step value is used to determine how to round the
 * value.
 * @param {?number} step  The step size.
 */
ProgressBar.prototype.setStep = function(step) {
  this.rangeModel_.setStep(step);
};
