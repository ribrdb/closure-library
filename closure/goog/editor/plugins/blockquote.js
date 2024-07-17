/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview goog.editor plugin to handle splitting block quotes.
 */

import * as dom from '../../dom/dom.js';

import { NodeType } from '../../dom/nodetype.js';
import { TagName } from '../../dom/tagname.js';
import * as classlist from '../../dom/classlist.js';
import { Command } from '../command.js';
import { Plugin } from '../plugin.js';
import * as editorNode from '../node.js';
import * as functions from '../../functions/functions.js';
import * as log from '../../log/log.js';



/**
 * Plugin to handle splitting block quotes.  This plugin does nothing on its
 * own and should be used in conjunction with EnterHandler or one of its
 * subclasses.
 * @param {boolean} requiresClassNameToSplit Whether to split only blockquotes
 *     that have the given classname.
 * @param {string=} opt_className The classname to apply to generated
 *     blockquotes.  Defaults to 'tr_bq'.
 * @constructor
 * @extends {Plugin}
 * @final
 */
export function Blockquote(requiresClassNameToSplit, opt_className) {
  Plugin.call(this);

  /**
   * Whether we only split blockquotes that have {@link classname}, or whether
   * all blockquote tags should be split on enter.
   * @type {boolean}
   * @private
   */
  this.requiresClassNameToSplit_ = requiresClassNameToSplit;

  /**
   * Classname to put on blockquotes that are generated via the toolbar for
   * blockquote, so that we can internally distinguish these from blockquotes
   * that are used for indentation.  This classname can be over-ridden by
   * clients for styling or other purposes.
   * @type {string}
   * @private
   */
  this.className_ = opt_className || goog.getCssName('tr_bq');
}
goog.inherits(Blockquote, Plugin);


/**
 * Command implemented by this plugin.
 * @type {string}
 */
Blockquote.SPLIT_COMMAND = '+splitBlockquote';


/**
 * Class ID used to identify this plugin.
 * @type {string}
 */
Blockquote.CLASS_ID = 'Blockquote';


/**
 * Logging object.
 * @type {log.Logger}
 * @protected
 * @override
 */
Blockquote.prototype.logger =
    log.getLogger('goog.editor.plugins.Blockquote');


/** @override */
Blockquote.prototype.getTrogClassId = function() {
  return Blockquote.CLASS_ID;
};


/**
 * Since our exec command is always called from elsewhere, we make it silent.
 * @override
 */
Blockquote.prototype.isSilentCommand = functions.TRUE;


/**
 * Checks if a node is a blockquote which can be split. A splittable blockquote
 * meets the following criteria:
 * <ol>
 *   <li>Node is a blockquote element</li>
 *   <li>Node has the blockquote classname if the classname is required to
 *       split</li>
 * </ol>
 *
 * @param {Node} node DOM node in question.
 * @return {boolean} Whether the node is a splittable blockquote.
 */
Blockquote.prototype.isSplittableBlockquote = function(
    node) {
  if (/** @type {!Element} */ (node).tagName != TagName.BLOCKQUOTE) {
    return false;
  }

  if (!this.requiresClassNameToSplit_) {
    return true;
  }

  return classlist.contains(
      /** @type {!Element} */ (node), this.className_);
};


/**
 * Checks if a node is a blockquote element which has been setup.
 * @param {Node} node DOM node to check.
 * @return {boolean} Whether the node is a blockquote with the required class
 *     name applied.
 */
Blockquote.prototype.isSetupBlockquote = function(node) {
  return /** @type {!Element} */ (node).tagName ==
        TagName.BLOCKQUOTE &&
        classlist.contains(
            /** @type {!Element} */ (node), this.className_);
};


/**
 * Checks if a node is a blockquote element which has not been setup yet.
 * @param {Node} node DOM node to check.
 * @return {boolean} Whether the node is a blockquote without the required
 *     class name applied.
 */
Blockquote.prototype.isUnsetupBlockquote = function(node) {
  return /** @type {!Element} */ (node).tagName ==
        TagName.BLOCKQUOTE &&
        !this.isSetupBlockquote(node);
};


/**
 * Gets the class name required for setup blockquotes.
 * @return {string} The blockquote class name.
 */
Blockquote.prototype.getBlockquoteClassName = function() {
  return this.className_;
};


/**
 * Helper routine which walks up the tree to find the topmost
 * ancestor with only a single child. The ancestor node or the original
 * node (if no ancestor was found) is then removed from the DOM.
 *
 * @param {Node} node The node whose ancestors have to be searched.
 * @param {Node} root The root node to stop the search at.
 * @private
 */
Blockquote.findAndRemoveSingleChildAncestor_ = function(
    node, root) {
  var predicateFunc = function(parentNode) {
    return parentNode != root && parentNode.childNodes.length == 1;
  };
  var ancestor =
      editorNode.findHighestMatchingAncestor(node, predicateFunc);
  if (!ancestor) {
    ancestor = node;
  }
  dom.removeNode(ancestor);
};


/**
 * Remove every nodes from the DOM tree that are all white space nodes.
 * @param {Array<Node>} nodes Nodes to be checked.
 * @private
 */
Blockquote.removeAllWhiteSpaceNodes_ = function(nodes) {
  for (var i = 0; i < nodes.length; ++i) {
    if (editorNode.isEmpty(nodes[i], true)) {
      dom.removeNode(nodes[i]);
    }
  }
};


/** @override */
Blockquote.prototype.isSupportedCommand = function(
    command) {
  return command == Blockquote.SPLIT_COMMAND;
};


/**
 * Splits a quoted region if any.  To be called on a key press event.  When this
 * function returns true, the event that caused it to be called should be
 * canceled.
 * @param {string} command The command to execute.
 * @param {...*} var_args Single additional argument representing the current
 *     cursor position. It is an object with a
 *     `node` key and an `offset` key.
 * @return {boolean|undefined} Boolean true when the quoted region has been
 *     split, false or undefined otherwise.
 * @override
 */
Blockquote.prototype.execCommandInternal = function(
    command, var_args) {
  var pos = arguments[1];
  if (command == Blockquote.SPLIT_COMMAND && pos &&
      (this.className_ || !this.requiresClassNameToSplit_)) {
    return this.splitQuotedBlockW3C_(pos);
  }
};


/**
 * Version of splitQuotedBlock_ that uses W3C ranges.
 * @param {Object} anchorPos The current cursor position.
 * @return {boolean} Whether the blockquote was split.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Blockquote.prototype.splitQuotedBlockW3C_ = function(
    anchorPos) {
  var cursorNode = anchorPos.node;
  var quoteNode = editorNode.findTopMostEditableAncestor(
      cursorNode.parentNode, goog.bind(this.isSplittableBlockquote, this));

  var secondHalf, textNodeToRemove;
  var insertTextNode = false;
  // There are two special conditions that we account for here.
  //
  // 1. Whenever the cursor is after (one<BR>|) or just before a BR element
  //    (one|<BR>) and the user presses enter, the second quoted block starts
  //    with a BR which appears to the user as an extra newline. This stems
  //    from the fact that we create two text nodes as our split boundaries
  //    and the BR becomes a part of the second half because of this.
  //
  // 2. When the cursor is at the end of a text node with no siblings and
  //    the user presses enter, the second blockquote might contain a
  //    empty subtree that ends in a 0 length text node. We account for that
  //    as a post-splitting operation.
  if (quoteNode) {
    // selection is in a line that has text in it
    if (cursorNode.nodeType == NodeType.TEXT) {
      if (anchorPos.offset == cursorNode.length) {
        var siblingNode = cursorNode.nextSibling;

        // This accounts for the condition where the cursor appears at the
        // end of a text node and right before the BR eg: one|<BR>. We ensure
        // that we split on the BR in that case.
        if (siblingNode && siblingNode.tagName == TagName.BR) {
          cursorNode = siblingNode;
          // This might be null but splitDomTreeAt accounts for the null case.
          secondHalf = siblingNode.nextSibling;
        } else {
          textNodeToRemove = cursorNode.splitText(anchorPos.offset);
          secondHalf = textNodeToRemove;
        }
      } else {
        secondHalf = cursorNode.splitText(anchorPos.offset);
      }
    } else if (cursorNode.tagName == TagName.BR) {
      // This might be null but splitDomTreeAt accounts for the null case.
      secondHalf = cursorNode.nextSibling;
    } else {
      // The selection is in a line that is empty, with more than 1 level
      // of quote.
      insertTextNode = true;
    }
  } else {
    // Check if current node is a quote node.
    // This will happen if user clicks in an empty line in the quote,
    // when there is 1 level of quote.
    if (this.isSetupBlockquote(cursorNode)) {
      quoteNode = cursorNode;
      insertTextNode = true;
    }
  }

  if (insertTextNode) {
    // Create two empty text nodes to split between.
    cursorNode = this.insertEmptyTextNodeBeforeRange_();
    secondHalf = this.insertEmptyTextNodeBeforeRange_();
  }

  if (!quoteNode) {
    return false;
  }

  secondHalf =
      editorNode.splitDomTreeAt(cursorNode, secondHalf, quoteNode);
  dom.insertSiblingAfter(secondHalf, quoteNode);

  // Set the insertion point.
  var dh = this.getFieldDomHelper();
  var tagToInsert = this.getFieldObject().queryCommandValue(
                        Command.DEFAULT_TAG) ||
      TagName.DIV;
  var container = dh.createElement(/** @type {string} */ (tagToInsert));
  container.textContent = '\xA0';  // Prevent the div from collapsing.
  quoteNode.parentNode.insertBefore(container, secondHalf);
  dh.getWindow().getSelection().collapse(container, 0);

  // We need to account for the condition where the second blockquote
  // might contain an empty DOM tree. This arises from trying to split
  // at the end of an empty text node. We resolve this by walking up the tree
  // till we either reach the blockquote or till we hit a node with more
  // than one child. The resulting node is then removed from the DOM.
  if (textNodeToRemove) {
    Blockquote.findAndRemoveSingleChildAncestor_(
        textNodeToRemove, secondHalf);
  }

  Blockquote.removeAllWhiteSpaceNodes_(
      [quoteNode, secondHalf]);
  return true;
};


/**
 * Inserts an empty text node before the field's range.
 * @return {!Node} The empty text node.
 * @private
 */
Blockquote.prototype.insertEmptyTextNodeBeforeRange_ =
    function() {
      var range = this.getFieldObject().getRange();
      var node = this.getFieldDomHelper().createTextNode('');
      range.insertNode(node, true);
      return node;
    };

