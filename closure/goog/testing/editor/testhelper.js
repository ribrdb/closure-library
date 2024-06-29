/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class that allows for simple text editing tests.
 */

goog.setTestOnly('goog.testing.editor.TestHelper');

import { Disposable } from '../../disposable/disposable.js';
import * as dom from '../../dom/dom.js';
import * as Range from '../../dom/range.js';
import { BrowserFeature } from '../../editor/browserfeature.js';
import * as node from '../../editor/node.js';
import { AbstractBubblePlugin } from '../../editor/plugins/abstractbubbleplugin.js';
import * as testingDom from '../dom.js';
const { AbstractRange } = goog.requireType('goog.dom.abstractrange');



/**
 * Create a new test controller.
 * @param {Element} root The root editable element.
 * @constructor
 * @extends {Disposable}
 * @final
 */
export function TestHelper(root) {
  if (!root) {
    throw new Error('Null root');
  }
  Disposable.call(this);

  /**
   * Convenience variable for root DOM element.
   * @type {!Element}
   * @private
   */
  this.root_ = root;

  /**
   * The starting HTML of the editable element.
   * @type {string}
   * @private
   */
  this.savedHtml_ = '';
}
goog.inherits(TestHelper, Disposable);


/**
 * Selects a new root element.
 * @param {Element} root The root editable element.
 */
TestHelper.prototype.setRoot = function(root) {
  if (!root) {
    throw new Error('Null root');
  }
  this.root_ = root;
};


/**
 * Make the root element editable.  Also saves its HTML to be restored
 * in tearDown.
 */
TestHelper.prototype.setUpEditableElement = function() {
  this.savedHtml_ = this.root_.innerHTML;
  if (BrowserFeature.HAS_CONTENT_EDITABLE) {
    this.root_.contentEditable = true;
  } else {
    this.root_.ownerDocument.designMode = 'on';
  }
  this.root_.setAttribute('g_editable', 'true');
};


/**
 * Reset the element previously initialized, restoring its HTML and making it
 * non editable.
 * @suppress {accessControls} Private state of
 *     {@link AbstractBubblePlugin} is accessed for test
 *     purposes.
 */
TestHelper.prototype.tearDownEditableElement = function() {
  if (BrowserFeature.HAS_CONTENT_EDITABLE) {
    this.root_.contentEditable = false;
  } else {
    this.root_.ownerDocument.designMode = 'off';
  }
  dom.removeChildren(this.root_);
  this.root_.innerHTML = this.savedHtml_;
  this.root_.removeAttribute('g_editable');

  if (AbstractBubblePlugin) {
    // Remove old bubbles.
    for (let key in AbstractBubblePlugin.bubbleMap_) {
      AbstractBubblePlugin.bubbleMap_[key].dispose();
    }
    // Ensure we get a new bubble for each test.
    AbstractBubblePlugin.bubbleMap_ = {};
  }
};


/**
 * Assert that the html in 'root' is substantially similar to htmlPattern.
 * This method tests for the same set of styles, and for the same order of
 * nodes.  Breaking whitespace nodes are ignored.  Elements can be annotated
 * with classnames corresponding to keys in goog.userAgent and will be
 * expected to show up in that user agent and expected not to show up in
 * others.
 * @param {string} htmlPattern The pattern to match.
 */
TestHelper.prototype.assertHtmlMatches = function(
    htmlPattern) {
  testingDom.assertHtmlContentsMatch(htmlPattern, this.root_);
};


/**
 * Finds the first text node descendant of root with the given content.
 * @param {string|RegExp} textOrRegexp The text to find, or a regular
 *     expression to find a match of.
 * @return {Node} The first text node that matches, or null if none is found.
 */
TestHelper.prototype.findTextNode = function(textOrRegexp) {
  return testingDom.findTextNode(textOrRegexp, this.root_);
};


/**
 * Select from the given `fromOffset` in the given `from` node to
 * the given `toOffset` in the optionally given `to` node. If nodes
 * are passed in, uses them, otherwise uses findTextNode to find the nodes to
 * select. Selects a caret if opt_to and opt_toOffset are not given.
 * @param {Node|string} from Node or text of the node to start the selection at.
 * @param {number} fromOffset Offset within the above node to start the
 *     selection at.
 * @param {Node|string=} opt_to Node or text of the node to end the selection
 *     at.
 * @param {number=} opt_toOffset Offset within the above node to end the
 *     selection at.
 * @return {!AbstractRange}
 */
TestHelper.prototype.select = function(
    from, fromOffset, opt_to, opt_toOffset) {
  let end;
  const start = end =
      (typeof from === 'string') ? this.findTextNode(from) : from;
  let endOffset;
  const startOffset = endOffset = fromOffset;

  if (opt_to && typeof opt_toOffset === 'number') {
    end = (typeof opt_to === 'string') ? this.findTextNode(opt_to) : opt_to;
    endOffset = opt_toOffset;
  }

  const range =
      Range.createFromNodes(start, startOffset, end, endOffset);
  range.select();
  return range;
};


/** @override */
TestHelper.prototype.disposeInternal = function() {
  if (node.isEditableContainer(this.root_)) {
    this.tearDownEditableElement();
  }
  delete this.root_;
  TestHelper.base(this, 'disposeInternal');
};
