/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A wrapper around a Field
 * that listens to mouse events on the specified un-editable field, and makes
 * the field editable if the user clicks on it. Clients are still responsible
 * for determining when to make the field un-editable again.
 *
 * Clients can still determine when the field has loaded by listening to
 * field's load event.
 */

import { Disposable } from '../disposable/disposable.js';

import * as dom from '../dom/dom.js';
import * as Range from '../dom/range.js';
import { TagName } from '../dom/tagname.js';
import { BrowserFeature } from './browserfeature.js';
import { Command } from './command.js';
import { Field } from './field.js';
import * as editorRange from './range.js';
import { BrowserEvent } from '../events/browserevent.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventType } from '../events/eventtype.js';
const { AbstractRange } = goog.requireType('goog.dom.abstractrange');
const { SavedCaretRange } = goog.requireType('goog.dom.savedcaretrange');



/**
 * Initialize the wrapper, and begin listening to mouse events immediately.
 * @param {Field} fieldObj The editable field being wrapped.
 * @constructor
 * @extends {Disposable}
 */
export function ClickToEditWrapper(fieldObj) {
  Disposable.call(this);

  /**
     * The field this wrapper interacts with.
     * @type {Field}
     * @private
     */
  this.fieldObj_ = fieldObj;

  /**
     * DOM helper for the field's original element.
     * @type {dom.DomHelper}
     * @private
     */
  this.originalDomHelper_ =
      dom.getDomHelper(fieldObj.getOriginalElement());

  /**
     * @type {?SavedCaretRange}
     * @private
     */
  this.savedCaretRange_ = null;

  /**
       * Event handler for field related events.
       * @type {!EventHandler<!ClickToEditWrapper>}
       * @private
       */
  this.fieldEventHandler_ = new EventHandler(this);

  /**
   * Bound version of the finishMouseUp method.
   * @type {Function}
   * @private
   */
  this.finishMouseUpBound_ = goog.bind(this.finishMouseUp_, this);

  /**
       * Event handler for mouse events.
       * @type {!EventHandler<!ClickToEditWrapper>}
       * @private
       */
  this.mouseEventHandler_ = new EventHandler(this);

  // Start listening to mouse events immediately if necessary.
  if (!this.fieldObj_.isLoaded()) {
    this.enterDocument();
  }

  this.fieldEventHandler_
      .
      // Whenever the field is made editable, we need to check if there
      // are any carets in it, and if so, use them to render the selection.
      listen(
          this.fieldObj_, Field.EventType.LOAD,
          this.renderSelection_)
      .
      // Whenever the field is made uneditable, we need to set up
      // the click-to-edit listeners.
      listen(
          this.fieldObj_, Field.EventType.UNLOAD,
          this.enterDocument);
}
goog.inherits(ClickToEditWrapper, Disposable);



/** @return {Field} The field. */
ClickToEditWrapper.prototype.getFieldObject = function() {
  return this.fieldObj_;
};


/** @return {dom.DomHelper} The dom helper of the uneditable element. */
ClickToEditWrapper.prototype.getOriginalDomHelper = function() {
  return this.originalDomHelper_;
};


/** @override */
ClickToEditWrapper.prototype.disposeInternal = function() {
  ClickToEditWrapper.base(this, 'disposeInternal');
  this.exitDocument();

  if (this.savedCaretRange_) {
    this.savedCaretRange_.dispose();
  }

  this.fieldEventHandler_.dispose();
  this.mouseEventHandler_.dispose();
  this.savedCaretRange_ = null;
  delete this.fieldEventHandler_;
  delete this.mouseEventHandler_;
};


/**
 * Initialize listeners when the uneditable field is added to the document.
 * Also sets up lorem ipsum text.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ClickToEditWrapper.prototype.enterDocument = function() {
  if (this.isInDocument_) {
    return;
  }

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.isInDocument_ = true;

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.mouseEventTriggeredLoad_ = false;
  var field = this.fieldObj_.getOriginalElement();

  // To do artificial selection preservation, we have to listen to mouseup,
  // get the current selection, and re-select the same text in the iframe.
  //
  // NOTE(nicksantos): Artificial selection preservation is needed in all cases
  // where we set the field contents by setting innerHTML. There are a few
  // rare cases where we don't need it. But these cases are highly
  // implementation-specific, and computationally hard to detect (bidi
  // and ig modules both set innerHTML), so we just do it in all cases.
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.savedAnchorClicked_ = null;
  this.mouseEventHandler_
      .listen(field, EventType.MOUSEUP, this.handleMouseUp_)
      .listen(field, EventType.CLICK, this.handleClick_);

  // manage lorem ipsum text, if necessary
  this.fieldObj_.execCommand(Command.UPDATE_LOREM);
};


/**
 * Destroy listeners when the field is removed from the document.
 */
ClickToEditWrapper.prototype.exitDocument = function() {
  this.mouseEventHandler_.removeAll();
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.isInDocument_ = false;
};


/**
 * Returns the uneditable field element if the field is not yet editable
 * (equivalent to EditableField.getOriginalElement()), and the editable DOM
 * element if the field is currently editable (equivalent to
 * EditableField.getElement()).
 * @return {Element} The element containing the editable field contents.
 */
ClickToEditWrapper.prototype.getElement = function() {
  return this.fieldObj_.isLoaded() ? this.fieldObj_.getElement() :
                                     this.fieldObj_.getOriginalElement();
};


/**
 * True if a mouse event should be handled, false if it should be ignored.
 * @param {BrowserEvent} e The mouse event.
 * @return {boolean} Wether or not this mouse event should be handled.
 * @private
 */
ClickToEditWrapper.prototype.shouldHandleMouseEvent_ = function(e) {
  return e.isButton(BrowserEvent.MouseButton.LEFT) &&
      !(e.shiftKey || e.ctrlKey || e.altKey || e.metaKey);
};


/**
 * Handle mouse click events on the field.
 * @param {BrowserEvent} e The click event.
 * @private
 */
ClickToEditWrapper.prototype.handleClick_ = function(e) {
  // If the user clicked on a link in an uneditable field,
  // we want to cancel the click.
  var anchorAncestor = dom.getAncestorByTagNameAndClass(
      /** @type {Node} */ (e.target), TagName.A);
  if (anchorAncestor) {
    e.preventDefault();

    if (!BrowserFeature.HAS_ACTIVE_ELEMENT) {
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      this.savedAnchorClicked_ = anchorAncestor;
    }
  }
};


/**
 * Handle a mouse up event on the field.
 * @param {BrowserEvent} e The mouseup event.
 * @private
 */
ClickToEditWrapper.prototype.handleMouseUp_ = function(e) {
  // Only respond to the left mouse button.
  if (this.shouldHandleMouseEvent_(e)) {
    // We need to get the selection when the user mouses up, but the
    // selection doesn't actually change until after the mouseup event has
    // propagated. So we need to do this asynchronously.
    this.originalDomHelper_.getWindow().setTimeout(this.finishMouseUpBound_, 0);
  }
};


/**
 * A helper function for handleMouseUp_ -- does the actual work
 * when the event is finished propagating.
 * @private
 */
ClickToEditWrapper.prototype.finishMouseUp_ = function() {
  // Make sure that the field is still not editable.
  if (!this.fieldObj_.isLoaded()) {
    if (this.savedCaretRange_) {
      this.savedCaretRange_.dispose();
      this.savedCaretRange_ = null;
    }

    if (!this.fieldObj_.queryCommandValue(Command.USING_LOREM)) {
      // We need carets (blank span nodes) to maintain the selection when
      // the html is copied into an iframe. However, because our code
      // clears the selection to make the behavior consistent, we need to do
      // this even when we're not using an iframe.
      this.insertCarets_();
    }

    this.ensureFieldEditable_();
  }

  this.exitDocument();
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.savedAnchorClicked_ = null;
};


/**
 * Ensure that the field is editable. If the field is not editable,
 * make it so, and record the fact that it was done by a user mouse event.
 * @private
 */
ClickToEditWrapper.prototype.ensureFieldEditable_ = function() {
  if (!this.fieldObj_.isLoaded()) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.mouseEventTriggeredLoad_ = true;
    this.makeFieldEditable(this.fieldObj_);
  }
};


/**
 * Once the field has loaded in an iframe, re-create the selection
 * as marked by the carets.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ClickToEditWrapper.prototype.renderSelection_ = function() {
  if (this.savedCaretRange_) {
    // Make sure that the restoration document is inside the iframe
    // if we're using one.
    this.savedCaretRange_.setRestorationDocument(
        this.fieldObj_.getEditableDomHelper().getDocument());

    var startCaret = this.savedCaretRange_.getCaret(true);
    var endCaret = this.savedCaretRange_.getCaret(false);
    var hasCarets = startCaret && endCaret;
  }

  // There are two reasons why we might want to focus the field:
  // 1) makeFieldEditable was triggered by the click-to-edit wrapper.
  //    In this case, the mouse event should have triggered a focus, but
  //    the editor might have taken the focus away to create lorem ipsum
  //    text or create an iframe for the field. So we make sure the focus
  //    is restored.
  // 2) somebody placed carets, and we need to select those carets. The field
  //    needs focus to ensure that the selection appears.
  if (this.mouseEventTriggeredLoad_ || hasCarets) {
    this.focusOnFieldObj(this.fieldObj_);
  }

  if (hasCarets) {
    this.savedCaretRange_.restore();
    this.fieldObj_.dispatchSelectionChangeEvent();

    // NOTE(nicksantos): Bubbles aren't actually enabled until the end
    // if the load sequence, so if the user clicked on a link, the bubble
    // will not pop up.
  }

  if (this.savedCaretRange_) {
    this.savedCaretRange_.dispose();
    this.savedCaretRange_ = null;
  }

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.mouseEventTriggeredLoad_ = false;
};


/**
 * Focus on the field object.
 * @param {Field} field The field to focus.
 * @protected
 */
ClickToEditWrapper.prototype.focusOnFieldObj = function(field) {
  field.focusAndPlaceCursorAtStart();
};


/**
 * Make the field object editable.
 * @param {Field} field The field to make editable.
 * @protected
 */
ClickToEditWrapper.prototype.makeFieldEditable = function(field) {
  field.makeEditable();
};


//================================================================
// Caret-handling methods


/**
 * Gets a saved caret range for the given range.
 * @param {AbstractRange} range A range wrapper.
 * @return {SavedCaretRange} The range, saved with carets, or null
 *    if the range wrapper was null.
 * @private
 */
ClickToEditWrapper.createCaretRange_ = function(range) {
  return range && editorRange.saveUsingNormalizedCarets(range);
};


/**
 * Inserts the carets, given the current selection.
 *
 * Note that for all practical purposes, a cursor position is just
 * a selection with the start and end at the same point.
 * @private
 */
ClickToEditWrapper.prototype.insertCarets_ = function() {
  var fieldElement = this.fieldObj_.getOriginalElement();

  this.savedCaretRange_ = null;
  var originalWindow = this.originalDomHelper_.getWindow();
  if (Range.hasSelection(originalWindow)) {
    var range = Range.createFromWindow(originalWindow);
    range = range && editorRange.narrow(range, fieldElement);
    this.savedCaretRange_ =
        ClickToEditWrapper.createCaretRange_(range);
  }

  if (!this.savedCaretRange_) {
    // We couldn't figure out where to put the carets.
    // But in FF2/IE6+, this could mean that the user clicked on a
    // 'special' node, (e.g., a link or an unselectable item). So the
    // selection appears to be null or the full page, even though the user did
    // click on something. In IE, we can determine the real selection via
    // document.activeElement. In FF, we have to be more hacky.
    var specialNodeClicked;
    if (BrowserFeature.HAS_ACTIVE_ELEMENT) {
      specialNodeClicked =
          dom.getActiveElement(this.originalDomHelper_.getDocument());
    } else {
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      specialNodeClicked = this.savedAnchorClicked_;
    }

    var isFieldElement = function(node) {
      return node == fieldElement;
    };
    if (specialNodeClicked &&
        dom.getAncestor(specialNodeClicked, isFieldElement, true)) {
      // Insert the cursor at the beginning of the active element to be
      // consistent with the behavior in FF1.5, where clicking on a
      // link makes the current selection equal to the cursor position
      // directly before that link.
      //
      // TODO(nicksantos): Is there a way to more accurately place the cursor?
      this.savedCaretRange_ = ClickToEditWrapper.createCaretRange_(
          Range.createFromNodes(
              specialNodeClicked, 0, specialNodeClicked, 0));
    }
  }
};
