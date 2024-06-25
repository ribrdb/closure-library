/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview DHTML prompt to replace javascript's prompt().
 *
 * @see ../demos/prompt.html
 */


import { Timer } from '../timer/timer.js';

import * as dom from '../dom/dom.js';
import { InputType } from '../dom/inputtype.js';
import { TagName } from '../dom/tagname.js';
import * as events from '../events/events.js';
import { EventType } from '../events/eventtype.js';
import * as functions from '../functions/functions.js';
import { SafeHtml } from '../html/safehtml.js';
import { Component } from './component.js';
import { Dialog } from './dialog.js';



/**
 * Creates an object that represents a prompt (used in place of javascript's
 * prompt). The html structure of the prompt is the same as the layout for
 * dialog.js except for the addition of a text box which is placed inside the
 * "Content area" and has the default class-name 'modal-dialog-userInput'
 *
 * @param {string} promptTitle The title of the prompt.
 * @param {string|!SafeHtml} promptBody The body of the prompt.
 *     String is treated as plain text and it will be HTML-escaped.
 * @param {Function} callback The function to call when the user selects Ok or
 *     Cancel. The function should expect a single argument which represents
 *     what the user entered into the prompt. If the user presses cancel, the
 *     value of the argument will be null.
 * @param {string=} opt_defaultValue Optional default value that should be in
 *     the text box when the prompt appears.
 * @param {string=} opt_class Optional prefix for the classes.
 * @param {boolean=} opt_useIframeForIE For IE, workaround windowed controls
 *     z-index issue by using a an iframe instead of a div for bg element.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *    Component} for semantics.
 * @constructor
 * @extends {Dialog}
 */
export function Prompt(
  promptTitle,
  promptBody,
  callback,
  opt_defaultValue,
  opt_class,
  opt_useIframeForIE,
  opt_domHelper
) {
  Prompt.base(
      this, 'constructor', opt_class, opt_useIframeForIE, opt_domHelper);

  /**
   * The id of the input element.
   * @type {string}
   * @private
   */
  this.inputElementId_ = this.makeId('ie');

  this.setTitle(promptTitle);

  var label = SafeHtml.create(
      'label', {'for': this.inputElementId_},
      SafeHtml.htmlEscapePreservingNewlines(promptBody));
  var br = SafeHtml.BR;
  this.setSafeHtmlContent(SafeHtml.concat(label, br, br));

  this.callback_ = callback;
  this.defaultValue_ = (opt_defaultValue !== undefined) ? opt_defaultValue : '';

  /** @desc label for a dialog button. */
  var MSG_PROMPT_OK = goog.getMsg('OK');
  /** @desc label for a dialog button. */
  var MSG_PROMPT_CANCEL = goog.getMsg('Cancel');
  var buttonSet = new Dialog.ButtonSet(opt_domHelper);
  buttonSet.set(Dialog.DefaultButtonKeys.OK, MSG_PROMPT_OK, true);
  buttonSet.set(
      Dialog.DefaultButtonKeys.CANCEL, MSG_PROMPT_CANCEL, false, true);
  this.setButtonSet(buttonSet);
}
goog.inherits(Prompt, Dialog);


/**
 * Callback function which is invoked with the response to the prompt
 * @type {Function}
 * @private
 */
Prompt.prototype.callback_ = functions.UNDEFINED;


/**
 * Default value to display in prompt window
 * @type {string}
 * @private
 */
Prompt.prototype.defaultValue_ = '';


/**
 * Element in which user enters response (HTML <input> text box)
 * @type {?HTMLInputElement|?HTMLTextAreaElement}
 * @private
 */
Prompt.prototype.userInputEl_ = null;


/**
 * Tracks whether the prompt is in the process of closing to prevent multiple
 * calls to the callback when the user presses enter.
 * @type {boolean}
 * @private
 */
Prompt.prototype.isClosing_ = false;


/**
 * Number of rows in the user input element.
 * The default is 1 which means use an <input> element.
 * @type {number}
 * @private
 */
Prompt.prototype.rows_ = 1;


/**
 * Number of cols in the user input element.
 * The default is 0 which means use browser default.
 * @type {number}
 * @private
 */
Prompt.prototype.cols_ = 0;


/**
 * The input decorator function.
 * @type {?function(?Element)}
 * @private
 */
Prompt.prototype.inputDecoratorFn_ = null;


/**
 * A validation function that takes a string and returns true if the string is
 * accepted, false otherwise.
 * @type {function(string):boolean}
 * @private
 */
Prompt.prototype.validationFn_ = functions.TRUE;


/**
 * Sets the validation function that takes a string and returns true if the
 * string is accepted, false otherwise.
 * @param {function(string): boolean} fn The validation function to use on user
 *     input.
 */
Prompt.prototype.setValidationFunction = function(fn) {
  this.validationFn_ = fn;
};


/** @override */
Prompt.prototype.enterDocument = function() {
  if (this.inputDecoratorFn_) {
    this.inputDecoratorFn_(this.userInputEl_);
  }
  Prompt.superClass_.enterDocument.call(this);
  this.getHandler().listen(
      this, Dialog.EventType.SELECT, this.onPromptExit_);

  this.getHandler().listen(
      this.userInputEl_,
      [EventType.KEYUP, EventType.CHANGE],
      this.handleInputChanged_);
};


/**
 * @return {?HTMLInputElement|?HTMLTextAreaElement} The user input element. May
 *     be null if the Prompt has not been rendered.
 */
Prompt.prototype.getInputElement = function() {
  return this.userInputEl_;
};


/**
 * Sets an input decorator function.  This function will be called in
 * #enterDocument and will be passed the input element.  This is useful for
 * attaching handlers to the input element for specific change events,
 * for example.
 * @param {function(Element)} inputDecoratorFn A function to call on the input
 *     element on #enterDocument.
 */
Prompt.prototype.setInputDecoratorFn = function(inputDecoratorFn) {
  this.inputDecoratorFn_ = inputDecoratorFn;
};


/**
 * Set the number of rows in the user input element.
 * A values of 1 means use an `<input>` element.  If the prompt is already
 * rendered then you cannot change from `<input>` to `<textarea>` or vice versa.
 * @param {number} rows Number of rows for user input element.
 * @throws {Component.Error.ALREADY_RENDERED} If the component is
 *    already rendered and an attempt to change between `<input>` and
 *    `<textarea>` is made.
 */
Prompt.prototype.setRows = function(rows) {
  if (this.isInDocument()) {
    if (this.userInputEl_.tagName == TagName.INPUT) {
      if (rows > 1) {
        throw new Error(Component.Error.ALREADY_RENDERED);
      }
    } else {
      if (rows <= 1) {
        throw new Error(Component.Error.ALREADY_RENDERED);
      }
      /** @type {!HTMLTextAreaElement} */ (this.userInputEl_).rows = rows;
    }
  }
  this.rows_ = rows;
};


/**
 * @return {number} The number of rows in the user input element.
 */
Prompt.prototype.getRows = function() {
  return this.rows_;
};


/**
 * Set the number of cols in the user input element.
 * @param {number} cols Number of cols for user input element.
 */
Prompt.prototype.setCols = function(cols) {
  this.cols_ = cols;
  if (this.userInputEl_) {
    if (this.userInputEl_.tagName == TagName.INPUT) {
      /** @type {!HTMLInputElement} */ (this.userInputEl_).size = cols;
    } else {
      /** @type {!HTMLTextAreaElement} */ (this.userInputEl_).cols = cols;
    }
  }
};


/**
 * @return {number} The number of cols in the user input element.
 */
Prompt.prototype.getCols = function() {
  return this.cols_;
};


/**
 * Create the initial DOM representation for the prompt.
 * @override
 */
Prompt.prototype.createDom = function() {
  Prompt.superClass_.createDom.call(this);

  var cls = this.getClass();

  // add input box to the content
  if (this.rows_ == 1) {
    // If rows == 1 then use an input element.
    this.userInputEl_ = this.getDomHelper().createDom(TagName.INPUT, {
      'className': goog.getCssName(cls, 'userInput'),
      'value': this.defaultValue_
    });
    this.userInputEl_.type = InputType.TEXT;
    if (this.cols_) {
      this.userInputEl_.size = this.cols_;
    }
  } else {
    // If rows > 1 then use a textarea.
    this.userInputEl_ =
        this.getDomHelper().createDom(TagName.TEXTAREA, {
          'className': goog.getCssName(cls, 'userInput'),
          'value': this.defaultValue_
        });
    this.userInputEl_.rows = this.rows_;
    if (this.cols_) {
      this.userInputEl_.cols = this.cols_;
    }
  }

  this.userInputEl_.id = this.inputElementId_;
  var contentEl = this.getContentElement();
  contentEl.appendChild(
      this.getDomHelper().createDom(
          TagName.DIV, {'style': 'overflow: auto'},
          this.userInputEl_));
};


/**
 * Handles input change events on the input field.  Disables the OK button if
 * validation fails on the new input value.
 * @private
 */
Prompt.prototype.handleInputChanged_ = function() {
  this.updateOkButtonState_();
};


/**
 * Set OK button enabled/disabled state based on input.
 * @private
 */
Prompt.prototype.updateOkButtonState_ = function() {
  var enableOkButton = this.validationFn_(this.userInputEl_.value);
  var buttonSet = this.getButtonSet();
  buttonSet.setButtonEnabled(
      Dialog.DefaultButtonKeys.OK, enableOkButton);
};


/**
 * Causes the prompt to appear, centered on the screen, gives focus
 * to the text box, and selects the text
 * @param {boolean} visible Whether the dialog should be visible.
 * @override
 */
Prompt.prototype.setVisible = function(visible) {
  Prompt.base(this, 'setVisible', visible);

  if (visible) {
    this.isClosing_ = false;
    this.userInputEl_.value = this.defaultValue_;
    this.focus();
    this.updateOkButtonState_();
  }
};


/**
 * Overrides setFocus to put focus on the input element.
 * @override
 */
Prompt.prototype.focus = function() {
  Prompt.base(this, 'focus');

  this.userInputEl_.select();
};


/**
 * Sets the default value of the prompt when it is displayed.
 * @param {string} defaultValue The default value to display.
 */
Prompt.prototype.setDefaultValue = function(defaultValue) {
  this.defaultValue_ = defaultValue;
};


/**
 * Handles the closing of the prompt, invoking the callback function that was
 * registered to handle the value returned by the prompt.
 * @param {Dialog.Event} e The dialog's selection event.
 * @private
 */
Prompt.prototype.onPromptExit_ = function(e) {
  /*
   * The timeouts below are required for one edge case. If after the dialog
   * hides, suppose validation of the input fails which displays an alert. If
   * the user pressed the Enter key to dismiss the alert that was displayed it
   * can trigger the event handler a second time. This timeout ensures that the
   * alert is displayed only after the prompt is able to clean itself up.
   */
  if (!this.isClosing_) {
    this.isClosing_ = true;
    if (e.key == 'ok') {
      Timer.callOnce(
          goog.bind(this.callback_, this, this.userInputEl_.value), 1);
    } else {
      Timer.callOnce(goog.bind(this.callback_, this, null), 1);
    }
  }
};


/** @override */
Prompt.prototype.disposeInternal = function() {
  dom.removeNode(this.userInputEl_);

  events.unlisten(
      this, Dialog.EventType.SELECT, this.onPromptExit_, true, this);

  Prompt.superClass_.disposeInternal.call(this);

  this.userInputEl_ = null;
};
