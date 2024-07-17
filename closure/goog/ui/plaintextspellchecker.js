/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Plain text spell checker implementation.
 *
 * @see ../demos/plaintextspellchecker.html
 */

import { Timer } from '../timer/timer.js';

import * as aria from '../a11y/aria/aria.js';
import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventType } from '../events/eventtype.js';
import { KeyCodes } from '../events/keycodes.js';
import { KeyHandler } from '../events/keyhandler.js';
import { SpellCheck } from '../spell/spellcheck.js';
import * as style from '../style/style.js';
import { AbstractSpellChecker } from './abstractspellchecker.js';
import { Component } from './component.js';
import * as userAgent from '../useragent/useragent.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { Event } = goog.requireType('goog.events.event');
const { Size } = goog.requireType('goog.math.size');
const { PopupMenu } = goog.requireType('goog.ui.popupmenu');



/**
 * Plain text spell checker implementation.
 *
 * @param {SpellCheck} handler Instance of the SpellCheckHandler
 *     support object to use. A single instance can be shared by multiple
 *     editor components.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {AbstractSpellChecker}
 * @final
 */
export function PlainTextSpellChecker(handler, opt_domHelper) {
  AbstractSpellChecker.call(this, handler, opt_domHelper);

  /**
   * Correction UI container.
   * @private {!HTMLDivElement}
   */
  this.overlay_ = this.getDomHelper().createDom(TagName.DIV);
  style.setPreWrap(this.overlay_);

  /**
   * Bound async function (to avoid rebinding it on every call).
   * @type {Function}
   * @private
   */
  this.boundContinueAsyncFn_ = goog.bind(this.continueAsync_, this);

  /**
   * Regular expression for matching line breaks.
   * @type {RegExp}
   * @private
   */
  this.endOfLineMatcher_ = new RegExp('(.*)(\n|\r\n){0,1}', 'g');
}
goog.inherits(PlainTextSpellChecker, AbstractSpellChecker);


/**
 * Class name for invalid words.
 * @type {string}
 */
PlainTextSpellChecker.prototype.invalidWordClassName =
    goog.getCssName('goog-spellcheck-invalidword');


/**
 * Class name for corrected words.
 * @type {string}
 */
PlainTextSpellChecker.prototype.correctedWordClassName =
    goog.getCssName('goog-spellcheck-correctedword');


/**
 * Class name for correction pane.
 * @type {string}
 */
PlainTextSpellChecker.prototype.correctionPaneClassName =
    goog.getCssName('goog-spellcheck-correctionpane');


/**
 * Number of words to scan to precharge the dictionary.
 * @type {number}
 * @private
 */
PlainTextSpellChecker.prototype.dictionaryPreScanSize_ = 1000;


/**
 * Size of window. Used to check if a resize operation actually changed the size
 * of the window.
 * @type {Size|undefined}
 * @private
 */
PlainTextSpellChecker.prototype.winSize_;


/**
 * Event handler for listening to events without leaking.
 * @type {EventHandler|undefined}
 * @private
 */
PlainTextSpellChecker.prototype.eventHandler_;


/**
 * The object handling keyboard events.
 * @type {KeyHandler|undefined}
 * @private
 */
PlainTextSpellChecker.prototype.keyHandler_;


/** @private {number} */
PlainTextSpellChecker.prototype.textArrayIndex_;


/** @private {!Array<string>} */
PlainTextSpellChecker.prototype.textArray_;


/** @private {!Array<boolean>} */
PlainTextSpellChecker.prototype.textArrayProcess_;


/**
 * Creates the initial DOM representation for the component.
 * @override
 */
PlainTextSpellChecker.prototype.createDom = function() {
  this.setElementInternal(
      this.getDomHelper().createElement(TagName.TEXTAREA));
};


/** @override */
PlainTextSpellChecker.prototype.enterDocument = function() {
  PlainTextSpellChecker.superClass_.enterDocument.call(this);

  this.eventHandler_ = new EventHandler(this);
  this.keyHandler_ = new KeyHandler(this.overlay_);

  this.initSuggestionsMenu();
  this.initAccessibility_();
};


/** @override */
PlainTextSpellChecker.prototype.exitDocument = function() {
  PlainTextSpellChecker.superClass_.exitDocument.call(this);

  if (this.eventHandler_) {
    this.eventHandler_.dispose();
    this.eventHandler_ = undefined;
  }
  if (this.keyHandler_) {
    this.keyHandler_.dispose();
    this.keyHandler_ = undefined;
  }
};


/**
 * Initializes suggestions menu. Populates menu with separator and ignore option
 * that are always valid. Suggestions are later added above the separator.
 * @override
 */
PlainTextSpellChecker.prototype.initSuggestionsMenu = function() {
  PlainTextSpellChecker.superClass_.initSuggestionsMenu.call(this);
  this.eventHandler_.listen(
      /** @type {PopupMenu} */ (this.getMenu()),
      Component.ComponentEventType.HIDE, this.onCorrectionHide_);
};


/**
 * Checks spelling for all text and displays correction UI.
 * @override
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
PlainTextSpellChecker.prototype.check = function() {
  var text = this.getElement().value;
  this.getElement().readOnly = true;

  // Prepare and position correction UI.
  dom.removeChildren(this.overlay_);
  this.overlay_.className = this.correctionPaneClassName;
  if (this.getElement().parentNode != this.overlay_.parentNode) {
    this.getElement().parentNode.appendChild(this.overlay_);
  }
  style.setElementShown(this.overlay_, false);

  this.preChargeDictionary_(text);
};


/**
 * Final stage of spell checking - displays the correction UI.
 * @private
 */
PlainTextSpellChecker.prototype.finishCheck_ = function() {
  // Show correction UI.
  this.positionOverlay_();
  style.setElementShown(this.getElement(), false);
  style.setElementShown(this.overlay_, true);

  var eh = this.eventHandler_;
  eh.listen(this.overlay_, EventType.CLICK, this.onWordClick_);
  eh.listen(
      /** @type {KeyHandler} */ (this.keyHandler_),
      KeyHandler.EventType.KEY, this.handleOverlayKeyEvent);

  // The position and size of the overlay element needs to be recalculated if
  // the browser window is resized.
  var win = dom.getWindow(this.getDomHelper().getDocument()) || window;
  this.winSize_ = dom.getViewportSize(win);
  eh.listen(win, EventType.RESIZE, this.onWindowResize_);

  PlainTextSpellChecker.superClass_.check.call(this);
};


/**
 * Start the scan after the dictionary was loaded.
 *
 * @param {string} text text to process.
 * @private
 */
PlainTextSpellChecker.prototype.preChargeDictionary_ = function(text) {
  this.eventHandler_.listen(
      this.spellCheck, SpellCheck.EventType.READY,
      this.onDictionaryCharged_, true);

  this.populateDictionary(text, this.dictionaryPreScanSize_);
};


/**
 * Loads few initial dictionary words into the cache.
 * @param {Event} e SpellCheck.EventType.READY event.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
PlainTextSpellChecker.prototype.onDictionaryCharged_ = function(e) {
  e.stopPropagation();
  this.eventHandler_.unlisten(
      this.spellCheck, SpellCheck.EventType.READY,
      this.onDictionaryCharged_, true);
  this.checkAsync_(this.getElement().value);
};


/**
 * Processes the included and skips the excluded text ranges.
 * @return {AbstractSpellChecker.AsyncResult} Whether the spell
 *     checking is pending or done.
 * @private
 */
PlainTextSpellChecker.prototype.spellCheckLoop_ = function() {
  for (var i = this.textArrayIndex_; i < this.textArray_.length; ++i) {
    var text = this.textArray_[i];
    if (this.textArrayProcess_[i]) {
      var result = this.processTextAsync(this.overlay_, text);
      if (result == AbstractSpellChecker.AsyncResult.PENDING) {
        this.textArrayIndex_ = i + 1;
        Timer.callOnce(this.boundContinueAsyncFn_);
        return result;
      }
    } else {
      this.processRange(this.overlay_, text);
    }
  }

  this.textArray_ = [];
  this.textArrayProcess_ = [];

  return AbstractSpellChecker.AsyncResult.DONE;
};


/**
 * Breaks text into included and excluded ranges using the marker RegExp
 * supplied by the caller.
 *
 * @param {string} text text to process.
 * @private
 * @suppress {strictMissingProperties} this.excludeMarker is a union type
 */
PlainTextSpellChecker.prototype.initTextArray_ = function(text) {
  if (!this.excludeMarker) {
    this.textArray_ = [text];
    this.textArrayProcess_ = [true];
    return;
  }

  this.textArray_ = [];
  this.textArrayProcess_ = [];
  this.excludeMarker.lastIndex = 0;
  var stringSegmentStart = 0;
  var result;
  while (result = this.excludeMarker.exec(text)) {
    if (result[0].length == 0) {
      break;
    }
    var excludedRange = result[0];
    var includedRange = text.slice(stringSegmentStart, result.index);
    if (includedRange) {
      this.textArray_.push(includedRange);
      this.textArrayProcess_.push(true);
    }
    this.textArray_.push(excludedRange);
    this.textArrayProcess_.push(false);
    stringSegmentStart = this.excludeMarker.lastIndex;
  }

  var leftoverText = text.slice(stringSegmentStart);
  if (leftoverText) {
    this.textArray_.push(leftoverText);
    this.textArrayProcess_.push(true);
  }
};


/**
 * Starts asynchrnonous spell checking.
 *
 * @param {string} text text to process.
 * @private
 */
PlainTextSpellChecker.prototype.checkAsync_ = function(text) {
  this.initializeAsyncMode();
  this.initTextArray_(text);
  this.textArrayIndex_ = 0;
  if (this.spellCheckLoop_() ==
      AbstractSpellChecker.AsyncResult.PENDING) {
    return;
  }
  this.finishAsyncProcessing();
  this.finishCheck_();
};


/**
 * Continues asynchrnonous spell checking.
 * @private
 */
PlainTextSpellChecker.prototype.continueAsync_ = function() {
  // First finish with the current segment.
  var result = this.continueAsyncProcessing();
  if (result == AbstractSpellChecker.AsyncResult.PENDING) {
    Timer.callOnce(this.boundContinueAsyncFn_);
    return;
  }
  if (this.spellCheckLoop_() ==
      AbstractSpellChecker.AsyncResult.PENDING) {
    return;
  }
  this.finishAsyncProcessing();
  this.finishCheck_();
};


/**
 * Processes word.
 *
 * @param {Node} node Node containing word.
 * @param {string} word Word to process.
 * @param {SpellCheck.WordStatus} status Status of word.
 * @override
 */
PlainTextSpellChecker.prototype.processWord = function(
    node, word, status) {
  node.appendChild(this.createWordElement(word, status));
};


/**
 * Processes range of text - recognized words and separators.
 *
 * @param {Node} node Node containing separator.
 * @param {string} text text to process.
 * @override
 */
PlainTextSpellChecker.prototype.processRange = function(node, text) {
  this.endOfLineMatcher_.lastIndex = 0;
  var result;
  while (result = this.endOfLineMatcher_.exec(text)) {
    if (result[0].length == 0) {
      break;
    }
    node.appendChild(this.getDomHelper().createTextNode(result[1]));
    if (result[2]) {
      node.appendChild(this.getDomHelper().createElement(TagName.BR));
    }
  }
};


/**
 * Hides correction UI.
 * @override
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
PlainTextSpellChecker.prototype.resume = function() {
  var wasVisible = this.isVisible();

  PlainTextSpellChecker.superClass_.resume.call(this);

  style.setElementShown(this.overlay_, false);
  style.setElementShown(this.getElement(), true);
  this.getElement().readOnly = false;

  if (wasVisible) {
    this.getElement().value = dom.getRawTextContent(this.overlay_);
    dom.removeChildren(this.overlay_);

    var eh = this.eventHandler_;
    eh.unlisten(this.overlay_, EventType.CLICK, this.onWordClick_);
    eh.unlisten(
        /** @type {KeyHandler} */ (this.keyHandler_),
        KeyHandler.EventType.KEY, this.handleOverlayKeyEvent);

    var win = dom.getWindow(this.getDomHelper().getDocument()) || window;
    eh.unlisten(win, EventType.RESIZE, this.onWindowResize_);
  }
};


/**
 * Returns desired element properties for the specified status.
 *
 * @param {SpellCheck.WordStatus} status Status of word.
 * @return {!Object} Properties to apply to word element.
 * @override
 */
PlainTextSpellChecker.prototype.getElementProperties = function(
    status) {
  if (status == SpellCheck.WordStatus.INVALID) {
    return {'class': this.invalidWordClassName};
  } else if (status == SpellCheck.WordStatus.CORRECTED) {
    return {'class': this.correctedWordClassName};
  }
  return {'class': ''};
};


/**
 * Handles the click events.
 * @param {BrowserEvent} event Event object.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
PlainTextSpellChecker.prototype.onWordClick_ = function(event) {
  if (event.target.className == this.invalidWordClassName ||
      event.target.className == this.correctedWordClassName) {
    this.showSuggestionsMenu(/** @type {!Element} */ (event.target), event);

    // Prevent document click handler from closing the menu.
    event.stopPropagation();
  }
};


/**
 * Handles window resize events.
 *
 * @param {BrowserEvent} event Event object.
 * @private
 */
PlainTextSpellChecker.prototype.onWindowResize_ = function(event) {
  var win = dom.getWindow(this.getDomHelper().getDocument()) || window;
  var size = dom.getViewportSize(win);

  if (size.width != this.winSize_.width ||
      size.height != this.winSize_.height) {
    style.setElementShown(this.overlay_, false);
    style.setElementShown(this.getElement(), true);

    // IE requires a slight delay, allowing the resize operation to take effect.
    if (userAgent.IE) {
      Timer.callOnce(this.resizeOverlay_, 100, this);
    } else {
      this.resizeOverlay_();
    }
    this.winSize_ = size;
  }
};


/**
 * Resizes overlay to match the size of the bound element then displays the
 * overlay. Helper for {@link #onWindowResize_}.
 *
 * @private
 */
PlainTextSpellChecker.prototype.resizeOverlay_ = function() {
  this.positionOverlay_();
  style.setElementShown(this.getElement(), false);
  style.setElementShown(this.overlay_, true);
};


/**
 * Updates the position and size of the overlay to match the original element.
 *
 * @private
 */
PlainTextSpellChecker.prototype.positionOverlay_ = function() {
  style.setPosition(
      this.overlay_, style.getPosition(this.getElement()));
  style.setSize(this.overlay_, style.getSize(this.getElement()));
};


/** @override */
PlainTextSpellChecker.prototype.disposeInternal = function() {
  this.getDomHelper().removeNode(this.overlay_);
  delete this.overlay_;
  delete this.boundContinueAsyncFn_;
  delete this.endOfLineMatcher_;
  PlainTextSpellChecker.superClass_.disposeInternal.call(this);
};


/**
 * Specify ARIA roles and states as appropriate.
 * @private
 */
PlainTextSpellChecker.prototype.initAccessibility_ = function() {
  asserts.assert(
      this.overlay_,
      'The plain text spell checker DOM element cannot be null.');
  aria.setRole(this.overlay_, 'region');
  aria.setState(this.overlay_, 'live', 'assertive');
  this.overlay_.tabIndex = 0;

  /** @desc Title for Spell Checker's overlay.*/
  var MSG_SPELLCHECKER_OVERLAY_TITLE = goog.getMsg('Spell Checker');
  this.overlay_.title = MSG_SPELLCHECKER_OVERLAY_TITLE;
};


/**
 * Handles key down for overlay.
 * @param {BrowserEvent} e The browser event.
 * @return {boolean} The handled value.
 */
PlainTextSpellChecker.prototype.handleOverlayKeyEvent = function(e) {
  var handled = false;
  switch (e.keyCode) {
    case KeyCodes.RIGHT:
      if (e.ctrlKey) {
        handled = this.navigate(AbstractSpellChecker.Direction.NEXT);
      }
      break;

    case KeyCodes.LEFT:
      if (e.ctrlKey) {
        handled =
            this.navigate(AbstractSpellChecker.Direction.PREVIOUS);
      }
      break;

    case KeyCodes.DOWN:
      if (this.getFocusedElementIndex()) {
        var el = this.getDomHelper().getElement(
            this.makeElementId(this.getFocusedElementIndex()));
        if (el) {
          var position = style.getPosition(el);
          var size = style.getSize(el);
          position.x += size.width / 2;
          position.y += size.height / 2;
          this.showSuggestionsMenu(el, position);
          handled = true;
        }
      }
      break;
  }

  if (handled) {
    e.preventDefault();
  }

  return handled;
};


/**
 * Handles correction menu actions.
 *
 * @param {Event} event Action event.
 * @override
 */
PlainTextSpellChecker.prototype.onCorrectionAction = function(event) {
  PlainTextSpellChecker.superClass_.onCorrectionAction.call(
      this, event);

  // In case of editWord base class has already set the focus (on the input),
  // otherwise set the focus back on the word.
  if (event.target != this.getMenuEdit()) {
    this.reFocus_();
  }
};


/**
 * Restores focus when the suggestion menu is hidden.
 *
 * @param {BrowserEvent} event Blur event.
 * @private
 */
PlainTextSpellChecker.prototype.onCorrectionHide_ = function(event) {
  this.reFocus_();
};


/**
 * Sets the focus back on the previously focused word element.
 * @private
 */
PlainTextSpellChecker.prototype.reFocus_ = function() {
  var el = this.getElementByIndex(this.getFocusedElementIndex());
  if (el) {
    el.focus();
  } else {
    this.overlay_.focus();
  }
};
