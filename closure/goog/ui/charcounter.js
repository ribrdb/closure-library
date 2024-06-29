/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Character counter widget implementation.
 *
 * @see ../demos/charcounter.html
 */

import * as dom from '../dom/dom.js';

import * as events from '../events/events.js';
import { EventTarget } from '../events/eventtarget.js';
import { InputHandler } from '../events/inputhandler.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * CharCounter widget. Counts the number of characters in a input field or a
 * text box and displays the number of additional characters that may be
 * entered before the maximum length is reached.
 *
 * @extends {EventTarget}
 * @param {HTMLInputElement|HTMLTextAreaElement} elInput Input or text area
 *     element to count the number of characters in.
 * @param {Element} elCount HTML element to display the remaining number of
 *     characters in. You can pass in null for this if you don't want to expose
 *     the number of chars remaining.
 * @param {number} maxLength The maximum length.
 * @param {CharCounter.Display=} opt_displayMode Display mode for this
 *     char counter. Defaults to {@link CharCounter.Display.REMAINING}.
 * @constructor
 * @final
 */
export function CharCounter(elInput, elCount, maxLength, opt_displayMode) {
 EventTarget.call(this);

 /**
  * Input or text area element to count the number of characters in.
  * @type {HTMLInputElement|HTMLTextAreaElement}
  * @private
  */
 this.elInput_ = elInput;

 /**
  * HTML element to display the remaining number of characters in.
  * @type {Element}
  * @private
  */
 this.elCount_ = elCount;

 /**
  * The maximum length.
  * @type {number}
  * @private
  */
 this.maxLength_ = maxLength;

 /**
    * The display mode for this char counter.
    * @type {!CharCounter.Display}
    * @private
    */
 this.display_ = opt_displayMode || CharCounter.Display.REMAINING;

 elInput.removeAttribute('maxlength');

 /**
   * The input handler that provides the input event.
   * @type {InputHandler}
   * @private
   */
 this.inputHandler_ = new InputHandler(elInput);

 events.listen(
     this.inputHandler_, InputHandler.EventType.INPUT,
     this.onChange_, false, this);

 this.checkLength();
}
goog.inherits(CharCounter, EventTarget);


/**
 * Display mode for the char counter.
 * @enum {number}
 */
CharCounter.Display = {
  /** Widget displays the number of characters remaining (the default). */
  REMAINING: 0,
  /** Widget displays the number of characters entered. */
  INCREMENTAL: 1
};


/**
 * Sets the maximum length.
 *
 * @param {number} maxLength The maximum length.
 */
CharCounter.prototype.setMaxLength = function(maxLength) {
 this.maxLength_ = maxLength;
 this.checkLength();
};


/**
 * Returns the maximum length.
 *
 * @return {number} The maximum length.
 */
CharCounter.prototype.getMaxLength = function() {
 return this.maxLength_;
};


/**
 * Sets the display mode.
 *
 * @param {!CharCounter.Display} displayMode The display mode.
 */
CharCounter.prototype.setDisplayMode = function(displayMode) {
 this.display_ = displayMode;
 this.checkLength();
};


/**
 * Returns the display mode.
 *
 * @return {!CharCounter.Display} The display mode.
 */
CharCounter.prototype.getDisplayMode = function() {
 return this.display_;
};


/**
 * Change event handler for input field.
 *
 * @param {BrowserEvent} event Change event.
 * @private
 */
CharCounter.prototype.onChange_ = function(event) {
 this.checkLength();
};


/**
 * Checks length of text in input field and updates the counter. Truncates text
 * if the maximum lengths is exceeded.
 */
CharCounter.prototype.checkLength = function() {
 var count = this.elInput_.value.length;

 // There's no maxlength property for textareas so instead we truncate the
 // text if it gets too long. It's also used to truncate the text in a input
 // field if the maximum length is changed.
 if (count > this.maxLength_) {
   var scrollTop = this.elInput_.scrollTop;
   var scrollLeft = this.elInput_.scrollLeft;

   this.elInput_.value = this.elInput_.value.substring(0, this.maxLength_);
   count = this.maxLength_;

   this.elInput_.scrollTop = scrollTop;
   this.elInput_.scrollLeft = scrollLeft;
 }

 if (this.elCount_) {
   var incremental = this.display_ == CharCounter.Display.INCREMENTAL;
   dom.setTextContent(
       this.elCount_, String(incremental ? count : this.maxLength_ - count));
 }
};


/** @override */
CharCounter.prototype.disposeInternal = function() {
 CharCounter.superClass_.disposeInternal.call(this);
 delete this.elInput_;
 this.inputHandler_.dispose();
 this.inputHandler_ = null;
};
