/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Rich text spell checker implementation.
 *
 * @see ../demos/richtextspellchecker.html
 */

import { Timer } from '../timer/timer.js';

import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { NodeType } from '../dom/nodetype.js';
import * as Range from '../dom/range.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventType } from '../events/eventtype.js';
import { KeyCodes } from '../events/keycodes.js';
import { KeyHandler } from '../events/keyhandler.js';
import { Coordinate } from '../math/coordinate.js';
import { SpellCheck } from '../spell/spellcheck.js';
import { StringBuffer } from '../string/stringbuffer.js';
import * as style from '../style/style.js';
import { AbstractSpellChecker } from './abstractspellchecker.js';
import { Component } from './component.js';
import { PopupMenu } from './popupmenu.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { Event } = goog.requireType('goog.events.event');



/**
 * Rich text spell checker implementation.
 *
 * @param {SpellCheck} handler Instance of the SpellCheckHandler
 *     support object to use. A single instance can be shared by multiple editor
 *     components.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {AbstractSpellChecker}
 */
export function RichTextSpellChecker(handler, opt_domHelper) {
  AbstractSpellChecker.call(this, handler, opt_domHelper);

  /**
     * String buffer for use in reassembly of the original text.
     * @type {StringBuffer}
     * @private
     */
  this.workBuffer_ = new StringBuffer();

  /**
   * Bound async function (to avoid rebinding it on every call).
   * @type {Function}
   * @private
   */
  this.boundContinueAsyncFn_ = goog.bind(this.continueAsync_, this);

  /**
     * Event handler for listening to events without leaking.
     * @private {!EventHandler}
     */
  this.eventHandler_ = new EventHandler(this);
  this.registerDisposable(this.eventHandler_);

  /**
     * The object handling keyboard events.
     * @private {!KeyHandler}
     */
  this.keyHandler_ = new KeyHandler();
  this.registerDisposable(this.keyHandler_);
}
goog.inherits(RichTextSpellChecker, AbstractSpellChecker);


/**
 * Root node for rich editor.
 * @type {Node}
 * @private
 */
RichTextSpellChecker.prototype.rootNode_;


/**
 * Indicates whether the root node for the rich editor is an iframe.
 * @private {boolean}
 */
RichTextSpellChecker.prototype.rootNodeIframe_ = false;


/**
 * Current node where spell checker has interrupted to go to the next stack
 * frame.
 * @type {Node}
 * @private
 */
RichTextSpellChecker.prototype.currentNode_;


/**
 * Counter of inserted elements. Used in processing loop to attempt to preserve
 * existing nodes if they contain no misspellings.
 * @type {number}
 * @private
 */
RichTextSpellChecker.prototype.elementsInserted_ = 0;


/**
 * Number of words to scan to precharge the dictionary.
 * @type {number}
 * @private
 */
RichTextSpellChecker.prototype.dictionaryPreScanSize_ = 1000;


/**
 * Class name for word spans.
 * @type {string}
 */
RichTextSpellChecker.prototype.wordClassName =
    goog.getCssName('goog-spellcheck-word');


/**
 * DomHelper to be used for interacting with the editable document/element.
 *
 * @type {dom.DomHelper|undefined}
 * @private
 */
RichTextSpellChecker.prototype.editorDom_;


/**
 * Tag name portion of the marker for the text that does not need to be checked
 * for spelling.
 *
 * @type {Array<string|undefined>}
 */
RichTextSpellChecker.prototype.excludeTags;


/**
 * CSS Style text for invalid words. As it's set inside the rich edit iframe
 * classes defined in the parent document are not available, thus the style is
 * set inline.
 * @type {string}
 */
RichTextSpellChecker.prototype.invalidWordCssText =
    'background: yellow;';


/**
 * Creates the initial DOM representation for the component.
 *
 * @throws {Error} Not supported. Use decorate.
 * @see #decorate
 * @override
 */
RichTextSpellChecker.prototype.createDom = function() {
  throw new Error('Render not supported for goog.ui.RichTextSpellChecker.');
};


/**
 * Decorates the element for the UI component.
 * @param {Element} element Element to decorate.
 * @override
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
RichTextSpellChecker.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
  this.rootNodeIframe_ = element.contentDocument || element.contentWindow;
  if (this.rootNodeIframe_) {
    var doc = element.contentDocument || element.contentWindow.document;
    this.rootNode_ = doc.body;
    this.editorDom_ = dom.getDomHelper(doc);
  } else {
    this.rootNode_ = element;
    this.editorDom_ = dom.getDomHelper(element);
  }
};


/** @override */
RichTextSpellChecker.prototype.enterDocument = function() {
  RichTextSpellChecker.superClass_.enterDocument.call(this);

  var rootElement = asserts.assertElement(
      this.rootNode_,
      'The rootNode_ of a richtextspellchecker must be an Element.');
  this.keyHandler_.attach(rootElement);

  this.initSuggestionsMenu();
};


/** @override */
RichTextSpellChecker.prototype.initSuggestionsMenu = function() {
  RichTextSpellChecker.base(this, 'initSuggestionsMenu');

  var menu = asserts.assertInstanceof(
      this.getMenu(), PopupMenu,
      'The menu of a richtextspellchecker must be a PopupMenu.');
  this.eventHandler_.listen(
      menu, Component.ComponentEventType.HIDE, this.onCorrectionHide_);
};


/**
 * Checks spelling for all text and displays correction UI.
 * @override
 */
RichTextSpellChecker.prototype.check = function() {
  this.blockReadyEvents();
  this.preChargeDictionary_(this.rootNode_, this.dictionaryPreScanSize_);
  this.unblockReadyEvents();

  this.eventHandler_.listen(
      this.spellCheck, SpellCheck.EventType.READY,
      this.onDictionaryCharged_, true);
  this.spellCheck.processPending();
};


/**
 * Processes nodes recursively.
 *
 * @param {Node} node Node to start with.
 * @param {number} words Max number of words to process.
 * @private
 */
RichTextSpellChecker.prototype.preChargeDictionary_ = function(
    node, words) {
  while (node) {
    var next = this.nextNode_(node);
    if (this.isExcluded_(node)) {
      node = next;
      continue;
    }
    if (node.nodeType == NodeType.TEXT) {
      if (node.nodeValue) {
        words -= this.populateDictionary(node.nodeValue, words);
        if (words <= 0) {
          return;
        }
      }
    } else if (node.nodeType == NodeType.ELEMENT) {
      if (node.firstChild) {
        next = node.firstChild;
      }
    }
    node = next;
  }
};


/**
 * Starts actual processing after the dictionary is charged.
 * @param {Event} e SpellCheck.EventType.READY event.
 * @private
 */
RichTextSpellChecker.prototype.onDictionaryCharged_ = function(e) {
  e.stopPropagation();
  this.eventHandler_.unlisten(
      this.spellCheck, SpellCheck.EventType.READY,
      this.onDictionaryCharged_, true);

  // Now actually do the spell checking.
  this.clearWordElements();
  this.initializeAsyncMode();
  this.elementsInserted_ = 0;
  var result = this.processNode_(this.rootNode_);
  if (result == AbstractSpellChecker.AsyncResult.PENDING) {
    Timer.callOnce(this.boundContinueAsyncFn_);
    return;
  }
  this.finishAsyncProcessing();
  this.finishCheck_();
};


/**
 * Continues asynchrnonous spell checking.
 * @private
 */
RichTextSpellChecker.prototype.continueAsync_ = function() {
  var result = this.continueAsyncProcessing();
  if (result == AbstractSpellChecker.AsyncResult.PENDING) {
    Timer.callOnce(this.boundContinueAsyncFn_);
    return;
  }
  result = this.processNode_(this.currentNode_);
  if (result == AbstractSpellChecker.AsyncResult.PENDING) {
    Timer.callOnce(this.boundContinueAsyncFn_);
    return;
  }
  this.finishAsyncProcessing();
  this.finishCheck_();
};


/**
 * Finalizes spelling check.
 * @private
 */
RichTextSpellChecker.prototype.finishCheck_ = function() {
  delete this.currentNode_;
  this.spellCheck.processPending();

  if (!this.isVisible()) {
    this.eventHandler_
        .listen(this.rootNode_, EventType.CLICK, this.onWordClick_)
        .listen(
            this.keyHandler_, KeyHandler.EventType.KEY,
            this.handleRootNodeKeyEvent);
  }
  RichTextSpellChecker.superClass_.check.call(this);
};


/**
 * Finds next node in our enumeration of the tree.
 *
 * @param {Node} node The node to which we're computing the next node for.
 * @return {Node} The next node or null if none was found.
 * @private
 */
RichTextSpellChecker.prototype.nextNode_ = function(node) {
  while (node != this.rootNode_) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
  return null;
};


/**
 * Determines if the node is text node without any children.
 *
 * @param {Node} node The node to check.
 * @return {boolean} Whether the node is a text leaf node.
 * @private
 */
RichTextSpellChecker.prototype.isTextLeaf_ = function(node) {
  return node != null && node.nodeType == NodeType.TEXT &&
      !node.firstChild;
};


/** @override */
RichTextSpellChecker.prototype.setExcludeMarker = function(marker) {
  if (marker) {
    if (typeof marker == 'string') {
      marker = [marker];
    }

    this.excludeTags = [];
    this.excludeMarker = [];
    for (var i = 0; i < /** @type {!IArrayLike} */ (marker).length; i++) {
      var parts = marker[i].split('.');
      if (parts.length == 2) {
        this.excludeTags.push(parts[0]);
        this.excludeMarker.push(parts[1]);
      } else {
        this.excludeMarker.push(parts[0]);
        this.excludeTags.push(undefined);
      }
    }
  }
};


/**
 * Determines if the node is excluded from checking.
 * @param {Node} node The node to check.
 * @return {boolean} Whether the node is excluded.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
RichTextSpellChecker.prototype.isExcluded_ = function(node) {
  if (this.excludeMarker && node.className) {
    for (var i = 0; i < this.excludeMarker.length; i++) {
      var excludeTag = this.excludeTags[i];
      var excludeClass = this.excludeMarker[i];
      var isExcluded =
          !!(excludeClass && node.className.indexOf(excludeClass) != -1 &&
             (!excludeTag || node.tagName == excludeTag));
      if (isExcluded) {
        return true;
      }
    }
  }
  return false;
};


/**
 * Processes nodes recursively.
 * @param {Node} node Node where to start.
 * @return {AbstractSpellChecker.AsyncResult|undefined} Result code.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
RichTextSpellChecker.prototype.processNode_ = function(node) {
  delete this.currentNode_;
  while (node) {
    var next = this.nextNode_(node);
    if (this.isExcluded_(node)) {
      node = next;
      continue;
    }
    if (node.nodeType == NodeType.TEXT) {
      var deleteNode = true;
      if (node.nodeValue) {
        var currentElements = this.elementsInserted_;
        var result = this.processTextAsync(node, node.nodeValue);
        if (result == AbstractSpellChecker.AsyncResult.PENDING) {
          // This marks node for deletion (empty nodes get deleted couple
          // of lines down this function). This is so our algorithm terminates.
          // In this case the node may be needlessly recreated, but it
          // happens rather infrequently and saves a lot of code.
          node.nodeValue = '';
          this.currentNode_ = node;
          return result;
        }
        // If we did not add nodes in processing, the current element is still
        // valid. Let's preserve it!
        if (currentElements == this.elementsInserted_) {
          deleteNode = false;
        }
      }
      if (deleteNode) {
        dom.removeNode(node);
      }
    } else if (node.nodeType == NodeType.ELEMENT) {
      // If this is a spell checker element...
      if (node.className == this.wordClassName) {
        // First, reconsolidate the text nodes inside the element - editing
        // in IE splits them up.
        var runner = node.firstChild;
        while (runner) {
          if (this.isTextLeaf_(runner)) {
            while (this.isTextLeaf_(runner.nextSibling)) {
              // Yes, this is not super efficient in IE, but it will almost
              // never happen.
              runner.nodeValue += runner.nextSibling.nodeValue;
              dom.removeNode(runner.nextSibling);
            }
          }
          runner = runner.nextSibling;
        }
        // Move its contents out and reprocess it on the next iteration.
        if (node.firstChild) {
          next = node.firstChild;
          while (node.firstChild) {
            node.parentNode.insertBefore(node.firstChild, node);
          }
        }
        // get rid of the empty shell.
        dom.removeNode(node);
      } else {
        if (node.firstChild) {
          next = node.firstChild;
        }
      }
    }
    node = next;
  }
};


/**
 * Processes word.
 *
 * @param {Node} node Node containing word.
 * @param {string} word Word to process.
 * @param {SpellCheck.WordStatus} status Status of the word.
 * @protected
 * @override
 */
RichTextSpellChecker.prototype.processWord = function(
    node, word, status) {
  node.parentNode.insertBefore(this.createWordElement(word, status), node);
  this.elementsInserted_++;
};


/**
 * Processes recognized text and separators.
 *
 * @param {Node} node Node containing separator.
 * @param {string} text Text to process.
 * @protected
 * @override
 */
RichTextSpellChecker.prototype.processRange = function(node, text) {
  // The text does not change, it only gets split, so if the lengths are the
  // same, the text is the same, so keep the existing node.
  if (node.nodeType == NodeType.TEXT &&
      node.nodeValue.length == text.length) {
    return;
  }

  node.parentNode.insertBefore(this.editorDom_.createTextNode(text), node);
  this.elementsInserted_++;
};


/** @override */
RichTextSpellChecker.prototype.getElementByIndex = function(id) {
  return this.editorDom_.getElement(this.makeElementId(id));
};


/**
 * Updates or replaces element based on word status.
 * @see AbstractSpellChecker.prototype.updateElement_
 *
 * Overridden from AbstractSpellChecker because we need to be mindful of
 * deleting the currentNode_ - this can break our pending processing.
 *
 * @param {Element} el Word element.
 * @param {string} word Word to update status for.
 * @param {SpellCheck.WordStatus} status Status of word.
 * @protected
 * @override
 */
RichTextSpellChecker.prototype.updateElement = function(
    el, word, status) {
  if (status == SpellCheck.WordStatus.VALID &&
      el != this.currentNode_ && el.nextSibling != this.currentNode_) {
    this.removeMarkup(el);
  } else {
    dom.setProperties(el, this.getElementProperties(status));
  }
};


/**
 * Hides correction UI.
 * @override
 */
RichTextSpellChecker.prototype.resume = function() {
  RichTextSpellChecker.superClass_.resume.call(this);

  this.restoreNode_(this.rootNode_);

  this.eventHandler_
      .unlisten(this.rootNode_, EventType.CLICK, this.onWordClick_)
      .unlisten(
          this.keyHandler_, KeyHandler.EventType.KEY,
          this.handleRootNodeKeyEvent);
};


/**
 * Processes nodes recursively, removes all spell checker markup, and
 * consolidates text nodes.
 * @param {Node} node node on which to recurse.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
RichTextSpellChecker.prototype.restoreNode_ = function(node) {
  while (node) {
    if (this.isExcluded_(node)) {
      node = node.nextSibling;
      continue;
    }
    // Contents of the child of the element is usually 1 text element, but the
    // user can actually add multiple nodes in it during editing. So we move
    // all the children out, prepend, and reprocess (pointer is set back to
    // the first node that's been moved out, and the loop repeats).
    if (node.nodeType == NodeType.ELEMENT &&
        node.className == this.wordClassName) {
      var firstElement = node.firstChild;
      var next;
      for (var child = firstElement; child; child = next) {
        next = child.nextSibling;
        node.parentNode.insertBefore(child, node);
      }
      next = firstElement || node.nextSibling;
      dom.removeNode(node);
      node = next;
      continue;
    }
    // If this is a chain of text elements, we're trying to consolidate it.
    var textLeaf = this.isTextLeaf_(node);
    if (textLeaf) {
      var textNodes = 1;
      var next = node.nextSibling;
      while (this.isTextLeaf_(node.previousSibling)) {
        node = node.previousSibling;
        ++textNodes;
      }
      while (this.isTextLeaf_(next)) {
        next = next.nextSibling;
        ++textNodes;
      }
      if (textNodes > 1) {
        this.workBuffer_.append(node.nodeValue);
        while (this.isTextLeaf_(node.nextSibling)) {
          this.workBuffer_.append(node.nextSibling.nodeValue);
          dom.removeNode(node.nextSibling);
        }
        node.nodeValue = this.workBuffer_.toString();
        this.workBuffer_.clear();
      }
    }
    // Process child nodes, if any.
    if (node.firstChild) {
      this.restoreNode_(node.firstChild);
    }
    node = node.nextSibling;
  }
};


/**
 * Returns desired element properties for the specified status.
 *
 * @param {SpellCheck.WordStatus} status Status of the word.
 * @return {!Object} Properties to apply to word element.
 * @protected
 * @override
 */
RichTextSpellChecker.prototype.getElementProperties = function(status) {
  return {
    'class': this.wordClassName,
    'style': (status == SpellCheck.WordStatus.INVALID) ?
        this.invalidWordCssText :
        ''
  };
};


/**
 * Handler for click events.
 * @param {BrowserEvent} event Event object.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
RichTextSpellChecker.prototype.onWordClick_ = function(event) {
  var target = /** @type {Element} */ (event.target);
  if (event.target.className == this.wordClassName &&
      this.spellCheck.checkWord(dom.getTextContent(target)) ==
          SpellCheck.WordStatus.INVALID) {
    this.showSuggestionsMenu(target, event);

    // Prevent document click handler from closing the menu.
    event.stopPropagation();
  }
};


/** @override */
RichTextSpellChecker.prototype.disposeInternal = function() {
  RichTextSpellChecker.superClass_.disposeInternal.call(this);
  this.rootNode_ = null;
  this.editorDom_ = null;
};


/**
 * Returns whether the editor node is an iframe.
 *
 * @return {boolean} true the editor node is an iframe, otherwise false.
 * @protected
 */
RichTextSpellChecker.prototype.isEditorIframe = function() {
  return this.rootNodeIframe_;
};


/**
 * Handles keyboard events inside the editor to allow keyboard navigation
 * between misspelled words and activation of the suggestion menu.
 *
 * @param {BrowserEvent} e the key event.
 * @return {boolean} The handled value.
 * @protected
 */
RichTextSpellChecker.prototype.handleRootNodeKeyEvent = function(e) {
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
        var el = this.editorDom_.getElement(
            this.makeElementId(this.getFocusedElementIndex()));
        if (el) {
          var position = style.getClientPosition(el);

          if (this.isEditorIframe()) {
            var iframePosition =
                style.getClientPosition(this.getElementStrict());
            position = Coordinate.sum(iframePosition, position);
          }

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


/** @override */
RichTextSpellChecker.prototype.onCorrectionAction = function(event) {
  RichTextSpellChecker.base(this, 'onCorrectionAction', event);

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
RichTextSpellChecker.prototype.onCorrectionHide_ = function(event) {
  this.reFocus_();
};


/**
 * Sets the focus back on the previously focused word element.
 * @private
 */
RichTextSpellChecker.prototype.reFocus_ = function() {
  this.getElementStrict().focus();

  var el = this.getElementByIndex(this.getFocusedElementIndex());
  if (el) {
    this.focusOnElement(el);
  }
};


/** @override */
RichTextSpellChecker.prototype.focusOnElement = function(element) {
  Range.createCaret(element, 0).select();
};
