/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wrapper around {@link Dialog}, to provide
 * dialogs that are smarter about interacting with a rich text editor.
 */

import * as asserts from '../../asserts/asserts.js';

import * as dom from '../../dom/dom.js';
import * as classlist from '../../dom/classlist.js';
import { EventTarget } from '../../events/eventtarget.js';
import * as googString from '../../string/string.js';
import { Dialog } from '../dialog.js';
import { PopupBase } from '../popupbase.js';
const { Event } = goog.requireType('goog.events.event');


// *** Public interface ***************************************************** //



/**
 * Creates an object that represents a dialog box.
 * @param {dom.DomHelper} domHelper DomHelper to be used to create the
 * dialog's dom structure.
 * @constructor
 * @extends {EventTarget}
 */
export function AbstractDialog(domHelper) {
 AbstractDialog.base(this, 'constructor');
 this.dom = domHelper;

 /** @private {?Dialog} */
 this.dialogInternal_ = null;
}
goog.inherits(AbstractDialog, EventTarget);


/**
 * Causes the dialog box to appear, centered on the screen. Lazily creates the
 * dialog if needed.
 */
AbstractDialog.prototype.show = function() {
 // Lazily create the wrapped dialog to be shown.
 if (!this.dialogInternal_) {
   this.dialogInternal_ = this.createDialogControl();
   this.dialogInternal_.listen(
       PopupBase.EventType.HIDE, this.handleAfterHide_, false, this);
 }

 this.dialogInternal_.setVisible(true);
};


/**
 * Hides the dialog, causing AFTER_HIDE to fire.
 */
AbstractDialog.prototype.hide = function() {
 if (this.dialogInternal_) {
   // This eventually fires the wrapped dialog's AFTER_HIDE event, calling our
   // handleAfterHide_().
   this.dialogInternal_.setVisible(false);
 }
};


/**
 * @return {boolean} Whether the dialog is open.
 */
AbstractDialog.prototype.isOpen = function() {
 return !!this.dialogInternal_ && this.dialogInternal_.isVisible();
};


/**
 * Runs the handler registered on the OK button event and closes the dialog if
 * that handler succeeds.
 * This is useful in cases such as double-clicking an item in the dialog is
 * equivalent to selecting it and clicking the default button.
 * @protected
 */
AbstractDialog.prototype.processOkAndClose = function() {
 // Fake an OK event from the wrapped dialog control.
 const evt =
     new Dialog.Event(Dialog.DefaultButtonKeys.OK, null);
 if (this.handleOk(evt)) {
   // handleOk calls dispatchEvent, so if any listener calls preventDefault it
   // will return false and we won't hide the dialog.
   this.hide();
 }
};


// *** Dialog events ******************************************************** //


/**
 * Event type constants for events the dialog fires.
 * @enum {string}
 */
AbstractDialog.EventType = {
  // This event is fired after the dialog is hidden, no matter if it was closed
  // via OK or Cancel or is being disposed without being hidden first.
  AFTER_HIDE: 'afterhide',
  // Either the cancel or OK events can be canceled via preventDefault or by
  // returning false from their handlers to stop the dialog from closing.
  CANCEL: 'cancel',
  OK: 'ok'
};


// *** Inner helper class *************************************************** //



/**
 * A builder class for the dialog control. All methods except build return this.
 * @param {AbstractDialog} editorDialog Editor dialog object
 *     that will wrap the wrapped dialog object this builder will create.
 * @constructor
 */
AbstractDialog.Builder = function(editorDialog) {
 // We require the editor dialog to be passed in so that the builder can set up
 // ok/cancel listeners by default, making it easier for most dialogs.
 this.editorDialog_ = editorDialog;
 this.wrappedDialog_ = new Dialog('', true, this.editorDialog_.dom);
 this.buttonSet_ = new Dialog.ButtonSet(this.editorDialog_.dom);
 this.buttonHandlers_ = {};
 this.addClassName(goog.getCssName('tr-dialog'));
};


/**
 * Sets the title of the dialog.
 * @param {string} title Title HTML (escaped).
 * @return {!AbstractDialog.Builder} This.
 */
AbstractDialog.Builder.prototype.setTitle = function(title) {
 this.wrappedDialog_.setTitle(title);
 return this;
};


/**
 * Adds an OK button to the dialog. Clicking this button will cause {@link
 * handleOk} to run, subsequently dispatching an OK event.
 * @param {string=} opt_label The caption for the button, if not "OK".
 * @return {!AbstractDialog.Builder} This.
 */
AbstractDialog.Builder.prototype.addOkButton = function(
    opt_label) {
 const key = Dialog.DefaultButtonKeys.OK;
 /** @desc Label for an OK button in an editor dialog. */
 const MSG_TR_DIALOG_OK = goog.getMsg('OK');
 // True means this is the default/OK button.
 this.buttonSet_.set(key, opt_label || MSG_TR_DIALOG_OK, true);
 this.buttonHandlers_[key] =
     goog.bind(this.editorDialog_.handleOk, this.editorDialog_);
 return this;
};


/**
 * Adds a Cancel button to the dialog. Clicking this button will cause {@link
 * handleCancel} to run, subsequently dispatching a CANCEL event.
 * @param {string=} opt_label The caption for the button, if not "Cancel".
 * @return {!AbstractDialog.Builder} This.
 */
AbstractDialog.Builder.prototype.addCancelButton = function(
    opt_label) {
 const key = Dialog.DefaultButtonKeys.CANCEL;
 /** @desc Label for a cancel button in an editor dialog. */
 const MSG_TR_DIALOG_CANCEL = goog.getMsg('Cancel');
 // False means it's not the OK button, true means it's the Cancel button.
 this.buttonSet_.set(key, opt_label || MSG_TR_DIALOG_CANCEL, false, true);
 this.buttonHandlers_[key] =
     goog.bind(this.editorDialog_.handleCancel, this.editorDialog_);
 return this;
};


/**
 * Adds a custom button to the dialog.
 * @param {string} label The caption for the button.
 * @param {function(Dialog.EventType):*} handler Function called when
 *     the button is clicked. It is recommended that this function be a method
 *     in the concrete subclass of AbstractDialog using this Builder, and that
 *     it dispatch an event (see {@link handleOk}).
 * @param {string=} opt_buttonId Identifier to be used to access the button when
 *     calling AbstractDialog.getButtonElement().
 * @return {!AbstractDialog.Builder} This.
 */
AbstractDialog.Builder.prototype.addButton = function(
    label, handler, opt_buttonId) {
 // We don't care what the key is, just that we can match the button with the
 // handler function later.
 const key = opt_buttonId || googString.createUniqueString();
 this.buttonSet_.set(key, label);
 this.buttonHandlers_[key] = handler;
 return this;
};


/**
 * Puts a CSS class on the dialog's main element.
 * @param {string} className The class to add.
 * @return {!AbstractDialog.Builder} This.
 */
AbstractDialog.Builder.prototype.addClassName = function(
    className) {
 classlist.add(
     asserts.assert(this.wrappedDialog_.getDialogElement()), className);
 return this;
};


/**
 * Sets the content element of the dialog.
 * @param {Element} contentElem An element for the main body.
 * @return {!AbstractDialog.Builder} This.
 */
AbstractDialog.Builder.prototype.setContent = function(
    contentElem) {
 dom.appendChild(this.wrappedDialog_.getContentElement(), contentElem);
 return this;
};


/**
 * Builds the wrapped dialog control. May only be called once, after which
 * no more methods may be called on this builder.
 * @return {!Dialog} The wrapped dialog control.
 */
AbstractDialog.Builder.prototype.build = function() {
 if (this.buttonSet_.isEmpty()) {
   // If caller didn't set any buttons, add an OK and Cancel button by default.
   this.addOkButton();
   this.addCancelButton();
 }
 this.wrappedDialog_.setButtonSet(this.buttonSet_);

 const handlers = this.buttonHandlers_;
 this.buttonHandlers_ = null;
 this.wrappedDialog_.listen(
     Dialog.EventType.SELECT,
     // Listen for the SELECT event, which means a button was clicked, and
     // call the handler associated with that button via the key property.
     function(e) {
      if (handlers[e.key]) {
        return handlers[e.key](e);
      }
     });

 // All editor dialogs are modal.
 this.wrappedDialog_.setModal(true);

 const dialog = this.wrappedDialog_;
 this.wrappedDialog_ = null;
 return dialog;
};


/**
 * Editor dialog that will wrap the wrapped dialog this builder will create.
 * @type {AbstractDialog}
 * @private
 */
AbstractDialog.Builder.prototype.editorDialog_;


/**
 * wrapped dialog control being built by this builder.
 * @type {Dialog}
 * @private
 */
AbstractDialog.Builder.prototype.wrappedDialog_;


/**
 * Set of buttons to be added to the wrapped dialog control.
 * @type {Dialog.ButtonSet}
 * @private
 */
AbstractDialog.Builder.prototype.buttonSet_;


/**
 * Map from keys that will be returned in the wrapped dialog SELECT events to
 * handler functions to be called to handle those events.
 * @type {Object}
 * @private
 */
AbstractDialog.Builder.prototype.buttonHandlers_;


// *** Protected interface ************************************************** //


/**
 * The DOM helper for the parent document.
 * @type {dom.DomHelper}
 * @protected
 */
AbstractDialog.prototype.dom;


/**
 * Creates and returns the Dialog control that is being wrapped
 * by this object.
 * @return {!Dialog} Created Dialog control.
 * @protected
 */
AbstractDialog.prototype.createDialogControl =
    goog.abstractMethod;


/**
 * Returns the HTML Button element for the OK button in this dialog.
 * @return {Element} The button element if found, else null.
 * @protected
 */
AbstractDialog.prototype.getOkButtonElement = function() {
 return this.getButtonElement(Dialog.DefaultButtonKeys.OK);
};


/**
 * Returns the HTML Button element for the Cancel button in this dialog.
 * @return {Element} The button element if found, else null.
 * @protected
 */
AbstractDialog.prototype.getCancelButtonElement = function() {
 return this.getButtonElement(Dialog.DefaultButtonKeys.CANCEL);
};


/**
 * Returns the HTML Button element for the button added to this dialog with
 * the given button id.
 * @param {string} buttonId The id of the button to get.
 * @return {Element} The button element if found, else null.
 * @protected
 */
AbstractDialog.prototype.getButtonElement = function(buttonId) {
 return this.dialogInternal_.getButtonSet().getButton(buttonId);
};


/**
 * Creates and returns the event object to be used when dispatching the OK
 * event to listeners, or returns null to prevent the dialog from closing.
 * Subclasses should override this to return their own subclass of
 * Event that includes all data a plugin would need from the dialog.
 * @param {Event} e The event object dispatched by the wrapped
 *     dialog.
 * @return {Event} The event object to be used when dispatching the
 *     OK event to listeners.
 * @protected
 */
AbstractDialog.prototype.createOkEvent = goog.abstractMethod;


/**
 * Handles the event dispatched by the wrapped dialog control when the user
 * clicks the OK button. Attempts to create the OK event object and dispatches
 * it if successful.
 * @param {Dialog.Event} e wrapped dialog OK event object.
 * @return {boolean} Whether the default action (closing the dialog) should
 *     still be executed. This will be false if the OK event could not be
 *     created to be dispatched, or if any listener to that event returs false
 *     or calls preventDefault.
 * @protected
 */
AbstractDialog.prototype.handleOk = function(e) {
 const eventObj = this.createOkEvent(e);
 if (eventObj) {
   return this.dispatchEvent(eventObj);
 } else {
   return false;
 }
};


/**
 * Handles the event dispatched by the wrapped dialog control when the user
 * clicks the Cancel button. Simply dispatches a CANCEL event.
 * @return {boolean} Returns false if any of the handlers called prefentDefault
 *     on the event or returned false themselves.
 * @protected
 */
AbstractDialog.prototype.handleCancel = function() {
 return this.dispatchEvent(AbstractDialog.EventType.CANCEL);
};


/**
 * Disposes of the dialog. If the dialog is open, it will be hidden and
 * AFTER_HIDE will be dispatched.
 * @override
 * @protected
 */
AbstractDialog.prototype.disposeInternal = function() {
 if (this.dialogInternal_) {
   this.hide();

   this.dialogInternal_.dispose();
   this.dialogInternal_ = null;
 }

 AbstractDialog.superClass_.disposeInternal.call(this);
};


// *** Private implementation *********************************************** //


/**
 * Cleans up after the dialog is hidden and fires the AFTER_HIDE event. Should
 * be a listener for the wrapped dialog's AFTER_HIDE event.
 * @private
 */
AbstractDialog.prototype.handleAfterHide_ = function() {
 this.dispatchEvent(AbstractDialog.EventType.AFTER_HIDE);
};
