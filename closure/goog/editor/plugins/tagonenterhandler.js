/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview TrogEdit plugin to handle enter keys by inserting the
 * specified block level tag.
 */

import * as googDom from '../../dom/dom.js';

import { NodeType } from '../../dom/nodetype.js';
import * as Range from '../../dom/range.js';
import { TagName } from '../../dom/tagname.js';
import { Command } from '../command.js';
import * as editorNode from '../node.js';
import { EnterHandler } from './enterhandler.js';
import * as editorRange from '../range.js';
import * as style from '../style.js';
import { KeyCodes } from '../../events/keycodes.js';
import * as functions from '../../functions/functions.js';
import { Unicode } from '../../string/string.js';
import * as googStyle from '../../style/style.js';
import * as userAgent from '../../useragent/useragent.js';
const {AbstractRange} = goog.requireType('goog.dom.abstractrange');



/**
 * Plugin to handle enter keys. This subclass normalizes all browsers to use
 * the given block tag on enter.
 * @param {!TagName} tag The type of tag to add on enter.
 * @constructor
 * @extends {EnterHandler}
 */
export function TagOnEnterHandler(tag) {
  this.tag = tag;

  EnterHandler.call(this);
}
goog.inherits(
    TagOnEnterHandler, EnterHandler);


/** @override */
TagOnEnterHandler.prototype.getTrogClassId = function() {
  return 'TagOnEnterHandler';
};


/** @override */
TagOnEnterHandler.prototype.getNonCollapsingBlankHtml =
    function() {
      if (this.tag == TagName.P) {
        return '<p>&nbsp;</p>';
      } else if (this.tag == TagName.DIV) {
        return '<div><br></div>';
      }
      return '<br>';
    };


/**
 * This plugin is active on uneditable fields so it can provide a value for
 * queryCommandValue calls asking for Command.BLOCKQUOTE.
 * @return {boolean} True.
 * @override
 */
TagOnEnterHandler.prototype.activeOnUneditableFields =
    functions.TRUE;


/** @override */
TagOnEnterHandler.prototype.isSupportedCommand = function(
    command) {
  return command == Command.DEFAULT_TAG;
};


/** @override */
TagOnEnterHandler.prototype.queryCommandValue = function(
    command) {
  return command == Command.DEFAULT_TAG ? String(this.tag) : null;
};


/** @override */
TagOnEnterHandler.prototype.handleBackspaceInternal =
    function(e, range) {
      TagOnEnterHandler.superClass_.handleBackspaceInternal
          .call(this, e, range);

      if (userAgent.GECKO) {
        this.markBrToNotBeRemoved_(range, true);
      }
    };


/** @override */
TagOnEnterHandler.prototype.processParagraphTagsInternal =
    function(e, split) {
      if (userAgent.IE && this.tag != TagName.P) {
        this.ensureBlockIeOpera(this.tag);
      }
    };


/** @override */
TagOnEnterHandler.prototype.handleDeleteGecko = function(
    e) {
  var range = this.getFieldObject().getRange();
  var container =
      style.getContainer(range && range.getContainerElement());
  if (this.getFieldObject().getElement().lastChild == container &&
      EnterHandler.isBrElem(container)) {
    // Don't delete if it's the last node in the field and just has a BR.
    e.preventDefault();
    // TODO(user): I think we probably don't need to stopPropagation here
    e.stopPropagation();
  } else {
    // Go ahead with deletion.
    // Prevent an existing BR immediately following the selection being deleted
    // from being removed in the keyup stage (as opposed to a BR added by FF
    // after deletion, which we do remove).
    this.markBrToNotBeRemoved_(range, false);
    // Manually delete the selection if it's at a BR.
    this.deleteBrGecko(e);
  }
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
TagOnEnterHandler.prototype.handleKeyUpInternal = function(
    e) {
  if (userAgent.GECKO) {
    if (e.keyCode == KeyCodes.DELETE) {
      this.removeBrIfNecessary_(false);
    } else if (e.keyCode == KeyCodes.BACKSPACE) {
      this.removeBrIfNecessary_(true);
    }
  } else if ((userAgent.IE) && e.keyCode == KeyCodes.ENTER) {
    this.ensureBlockIeOpera(this.tag, true);
  }
  // Safari uses DIVs by default.
};


/**
 * String that matches a single BR tag or NBSP surrounded by non-breaking
 * whitespace
 * @type {string}
 * @private
 */
TagOnEnterHandler.BrOrNbspSurroundedWithWhiteSpace_ =
    '[\t\n\r ]*(<br[^>]*\/?>|&nbsp;)[\t\n\r ]*';


/**
 * String that matches a single BR tag or NBSP surrounded by non-breaking
 * whitespace
 * @type {RegExp}
 * @private
 */
TagOnEnterHandler.emptyLiRegExp_ = new RegExp(
    '^' +
    TagOnEnterHandler.BrOrNbspSurroundedWithWhiteSpace_ +
    '$');


/**
 * Ensures the current node is wrapped in the tag.
 * @param {Node} node The node to ensure gets wrapped.
 * @param {Element} container Element containing the selection.
 * @return {Element} Element containing the selection, after the wrapping.
  * @private
 */
TagOnEnterHandler.prototype.ensureNodeIsWrappedW3c_ =
    function(node, container) {
      if (container == this.getFieldObject().getElement()) {
        // If the first block-level ancestor of cursor is the field,
        // don't split the tree. Find all the text from the cursor
        // to both block-level elements surrounding it (if they exist)
        // and split the text into two elements.
        // This is the IE contentEditable behavior.

        // The easy way to do this is to wrap all the text in an element
        // and then split the element as if the user had hit enter
        // in the paragraph

        // However, simply wrapping the text into an element creates problems
        // if the text was already wrapped using some other element such as an
        // anchor.  For example, wrapping the text of
        //   <a href="">Text</a>
        // would produce
        //   <a href=""><p>Text</p></a>
        // which is not what we want.  What we really want is
        //   <p><a href="">Text</a></p>
        // So we need to search for an ancestor of position.node to be wrapped.
        // We do this by iterating up the hierarchy of postiion.node until we've
        // reached the node that's just under the container.
        var isChildOfFn = function(child) {
          return container == child.parentNode;
        };
        var nodeToWrap = googDom.getAncestor(node, isChildOfFn, true);
        container = TagOnEnterHandler.wrapInContainerW3c_(
            String(this.tag), {node: nodeToWrap, offset: 0}, container);
      }
      return container;
    };


/** @override */
TagOnEnterHandler.prototype.handleEnterWebkitInternal =
    function(e) {
      if (this.tag == TagName.DIV) {
        var range = this.getFieldObject().getRange();
        var container = style.getContainer(range.getContainerElement());

        var position = editorRange.getDeepEndPoint(range, true);
        container = this.ensureNodeIsWrappedW3c_(position.node, container);
        Range.createCaret(position.node, position.offset).select();
      }
    };


/** @override */
TagOnEnterHandler.prototype
    .handleEnterAtCursorGeckoInternal = function(e, wasCollapsed, range) {
  // We use this because there are a few cases where FF default
  // implementation doesn't follow IE's:
  //   -Inserts BRs into empty elements instead of NBSP which has nasty
  //    side effects w/ making/deleting selections
  //   -Hitting enter when your cursor is in the field itself. IE will
  //    create two elements. FF just inserts a BR.
  //   -Hitting enter inside an empty list-item doesn't create a block
  //    tag. It just splits the list and puts your cursor in the middle.
  var li = null;
  if (wasCollapsed) {
    // Only break out of lists for collapsed selections.
    li = googDom.getAncestorByTagNameAndClass(
        range && range.getContainerElement(), TagName.LI);
  }
  var isEmptyLi =
      (li &&
       li.innerHTML.match(
           TagOnEnterHandler.emptyLiRegExp_));
  var elementAfterCursor = isEmptyLi ? this.breakOutOfEmptyListItemGecko_(li) :
                                       this.handleRegularEnterGecko_();

  // Move the cursor in front of "nodeAfterCursor", and make sure it
  // is visible
  this.scrollCursorIntoViewGecko_(elementAfterCursor);

  // Fix for http://b/1991234 :
  if (EnterHandler.isBrElem(elementAfterCursor)) {
    // The first element in the new line is a line with just a BR and maybe some
    // whitespace.
    // Calling normalize() is needed because there might be empty text nodes
    // before BR and empty text nodes cause the cursor position bug in Firefox.
    // See http://b/5220858
    elementAfterCursor.normalize();
    var br = googDom.getElementsByTagName(
        TagName.BR, elementAfterCursor)[0];
    if (br.previousSibling &&
        br.previousSibling.nodeType == NodeType.TEXT) {
      // If there is some whitespace before the BR, don't put the selection on
      // the BR, put it in the text node that's there, otherwise when you type
      // it will create adjacent text nodes.
      elementAfterCursor = br.previousSibling;
    }
  }

  editorRange.selectNodeStart(elementAfterCursor);

  e.preventDefault();
  // TODO(user): I think we probably don't need to stopPropagation here
  e.stopPropagation();
};


/**
 * If The cursor is in an empty LI then break out of the list like in IE
 * @param {Node} li LI to break out of.
 * @return {!Element} Element to put the cursor after.
 * @private
 */
TagOnEnterHandler.prototype.breakOutOfEmptyListItemGecko_ =
    function(li) {
      // Do this as follows:
      // 1. <ul>...<li>&nbsp;</li>...</ul>
      // 2. <ul id='foo1'>...<li id='foo2'>&nbsp;</li>...</ul>
      // 3. <ul id='foo1'>...</ul><p id='foo3'>&nbsp;</p><ul id='foo2'>...</ul>
      // 4. <ul>...</ul><p>&nbsp;</p><ul>...</ul>
      //
      // There are a couple caveats to the above. If the UL is contained in
      // a list, then the new node inserted is an LI, not a P.
      // For an OL, it's all the same, except the tagname of course.
      // Finally, it's possible that with the LI at the beginning or the end
      // of the list that we'll end up with an empty list. So we special case
      // those cases.

      var listNode = li.parentNode;
      var grandparent = listNode.parentNode;
      /** @suppress {strictMissingProperties} Added to tighten compiler checks */
      var inSubList = grandparent.tagName == TagName.OL ||
          grandparent.tagName == TagName.UL;

      // TODO(robbyw): Should we apply the list or list item styles to the new node?
      var newNode = googDom.getDomHelper(li).createElement(
          inSubList ? TagName.LI : this.tag);

      if (!li.previousSibling) {
        googDom.insertSiblingBefore(newNode, listNode);
      } else {
        if (li.nextSibling) {
          var listClone = listNode.cloneNode(false);
          while (li.nextSibling) {
            listClone.appendChild(li.nextSibling);
          }
          googDom.insertSiblingAfter(listClone, listNode);
        }
        googDom.insertSiblingAfter(newNode, listNode);
      }
      if (editorNode.isEmpty(listNode)) {
        googDom.removeNode(listNode);
      }
      googDom.removeNode(li);
      newNode.textContent = '\xA0';

      return newNode;
    };


/**
 * Wrap the text indicated by "position" in an HTML container of type
 * "nodeName".
 * @param {string} nodeName Type of container, e.g. "p" (paragraph).
 * @param {Object} position The W3C cursor position object
 *     (from getCursorPositionW3c).
 * @param {Node} container The field containing position.
 * @return {!Element} The container element that holds the contents from
 *     position.
 * @private
 */
TagOnEnterHandler.wrapInContainerW3c_ = function(
    nodeName, position, container) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var start = position.node;
  while (start.previousSibling &&
         !style.isContainer(start.previousSibling)) {
    start = start.previousSibling;
  }

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var end = position.node;
  while (end.nextSibling && !style.isContainer(end.nextSibling)) {
    end = end.nextSibling;
  }

  var para = container.ownerDocument.createElement(nodeName);
  while (start != end) {
    var newStart = start.nextSibling;
    googDom.appendChild(para, start);
    start = newStart;
  }
  var nextSibling = end.nextSibling;
  googDom.appendChild(para, end);
  container.insertBefore(para, nextSibling);

  return para;
};


/**
 * When we delete an element, FF inserts a BR. We want to strip that
 * BR after the fact, but in the case where your cursor is at a character
 * right before a BR and you delete that character, we don't want to
 * strip it. So we detect this case on keydown and mark the BR as not needing
 * removal.
 * @param {AbstractRange} range The closure range object.
 * @param {boolean} isBackspace Whether this is handling the backspace key.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
TagOnEnterHandler.prototype.markBrToNotBeRemoved_ =
    function(range, isBackspace) {
      var focusNode = range.getFocusNode();
      var focusOffset = range.getFocusOffset();
      var newEndOffset = isBackspace ? focusOffset : focusOffset + 1;

      if (editorNode.getLength(focusNode) == newEndOffset) {
        var sibling = focusNode.nextSibling;
        if (sibling && sibling.tagName == TagName.BR) {
          /**
           * @suppress {strictMissingProperties} Added to tighten compiler checks
           */
          this.brToKeep_ = sibling;
        }
      }
    };


/**
 * If we hit delete/backspace to merge elements, FF inserts a BR.
 * We want to strip that BR. In markBrToNotBeRemoved, we detect if
 * there was already a BR there before the delete/backspace so that
 * we don't accidentally remove a user-inserted BR.
 * @param {boolean} isBackSpace Whether this is handling the backspace key.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
TagOnEnterHandler.prototype.removeBrIfNecessary_ = function(
    isBackSpace) {
  var range = this.getFieldObject().getRange();
  var focusNode = range.getFocusNode();
  var focusOffset = range.getFocusOffset();

  var sibling;
  if (isBackSpace && focusNode.data == '') {
    // nasty hack. sometimes firefox will backspace a paragraph and put
    // the cursor before the BR. when it does this, the focusNode is
    // an empty textnode.
    sibling = focusNode.nextSibling;
  } else if (isBackSpace && focusOffset == 0) {
    var node = focusNode;
    while (node && !node.previousSibling &&
           node.parentNode != this.getFieldObject().getElement()) {
      node = node.parentNode;
    }
    sibling = node.previousSibling;
  } else if (focusNode.length == focusOffset) {
    sibling = focusNode.nextSibling;
  }

  if (!sibling || sibling.tagName != TagName.BR ||
      this.brToKeep_ == sibling) {
    return;
  }

  googDom.removeNode(sibling);
  if (focusNode.nodeType == NodeType.TEXT) {
    // Sometimes firefox inserts extra whitespace. Do our best to deal.
    // This is buggy though.
    /** @type {!Text} */ (focusNode).data =
        TagOnEnterHandler.trimTabsAndLineBreaks_(
            focusNode.data);
    // When we strip whitespace, make sure that our cursor is still at
    // the end of the textnode.
    Range
        .createCaret(focusNode, Math.min(focusOffset, focusNode.length))
        .select();
  }
};


/**
 * Trim the tabs and line breaks from a string.
 * @param {string} string String to trim.
 * @return {string} Trimmed string.
 * @private
 */
TagOnEnterHandler.trimTabsAndLineBreaks_ = function(
    string) {
  return string.replace(/^[\t\n\r]|[\t\n\r]$/g, '');
};


/**
 * Called in response to a normal enter keystroke. It has the action of
 * splitting elements.
 * @return {!Element} The node that the cursor should be before.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
TagOnEnterHandler.prototype.handleRegularEnterGecko_ =
    function() {
      var range = this.getFieldObject().getRange();
      var container = style.getContainer(range.getContainerElement());
      var newNode;
      if (EnterHandler.isBrElem(container)) {
        if (container.tagName == TagName.BODY) {
          // If the field contains only a single BR, this code ensures we don't
          // try to clone the body tag.
          container = this.ensureNodeIsWrappedW3c_(
              googDom.getElementsByTagName(TagName.BR, container)[0],
              container);
        }

        newNode = container.cloneNode(true);
        googDom.insertSiblingAfter(newNode, container);
      } else {
        if (!container.firstChild) {
          container.textContent = '\xA0';
        }

        var position = editorRange.getDeepEndPoint(range, true);
        container = this.ensureNodeIsWrappedW3c_(position.node, container);

        newNode = TagOnEnterHandler.splitDomAndAppend_(
            position.node, position.offset, container);

        // If the left half and right half of the splitted node are anchors then
        // that means the user pressed enter while the caret was inside
        // an anchor tag and split it.  The left half is the first anchor
        // found while traversing the right branch of container.  The right half
        // is the first anchor found while traversing the left branch of newNode.
        var leftAnchor =
            TagOnEnterHandler.findAnchorInTraversal_(container);
        var rightAnchor =
            TagOnEnterHandler.findAnchorInTraversal_(
                newNode, true);
        if (leftAnchor && rightAnchor && leftAnchor.tagName == TagName.A &&
            rightAnchor.tagName == TagName.A) {
          // If the original anchor (left anchor) is now empty, that means
          // the user pressed [Enter] at the beginning of the anchor,
          // in which case we we
          // want to replace that anchor with its child nodes
          // Otherwise, we take the second half of the splitted text and break
          // it out of the anchor.
          var anchorToRemove = editorNode.isEmpty(leftAnchor, false) ?
              leftAnchor :
              rightAnchor;
          googDom.flattenElement(/** @type {!Element} */ (anchorToRemove));
        }
      }
      return /** @type {!Element} */ (newNode);
    };


/**
 * Scroll the cursor into view, resulting from splitting the paragraph/adding
 * a br. It behaves differently than scrollIntoView
 * @param {Element} element The element immediately following the cursor. Will
 *     be used to determine how to scroll in order to make the cursor visible.
 *     CANNOT be a BR, as they do not have offsetHeight/offsetTop.
 * @private
 */
TagOnEnterHandler.prototype.scrollCursorIntoViewGecko_ =
    function(element) {
      if (!this.getFieldObject().isFixedHeight()) {
        return;  // Only need to scroll fixed height fields.
      }

      var field = this.getFieldObject().getElement();

      // Get the y position of the element we want to scroll to
      var elementY = googStyle.getPageOffsetTop(element);

      // Determine the height of that element, since we want the bottom of the
      // element to be in view.
      var bottomOfNode = elementY +
          /** @type {!HTMLElement} */ (element).offsetHeight;

      var dom = this.getFieldDomHelper();
      var win = this.getFieldDomHelper().getWindow();
      var scrollY = dom.getDocumentScroll().y;
      var viewportHeight = googDom.getViewportSize(win).height;

      // If the botom of the element is outside the viewport, move it into view
      if (bottomOfNode > viewportHeight + scrollY) {
        // In standards mode, use the html element and not the body
        if (field.tagName == TagName.BODY &&
            editorNode.isStandardsMode(field)) {
          field = field.parentNode;
        }
        /** @suppress {strictMissingProperties} Added to tighten compiler checks */
        field.scrollTop = bottomOfNode - viewportHeight;
      }
    };


/**
 * Splits the DOM tree around the given node and returns the node
 * containing the second half of the tree. The first half of the tree
 * is modified, but not removed from the DOM.
 * @param {Node} positionNode Node to split at.
 * @param {number} positionOffset Offset into positionNode to split at.  If
 *     positionNode is a text node, this offset is an offset in to the text
 *     content of that node.  Otherwise, positionOffset is an offset in to
 *     the childNodes array.  All elements with child index of  positionOffset
 *     or greater will be moved to the second half.  If positionNode is an
 *     empty element, the dom will be split at that element, with positionNode
 *     ending up in the second half.  positionOffset must be 0 in this case.
 * @param {Node=} opt_root Node at which to stop splitting the dom (the root
 *     is also split).
 * @return {!Node} The node containing the second half of the tree.
 * @private
 */
TagOnEnterHandler.splitDom_ = function(
    positionNode, positionOffset, opt_root) {
  if (!opt_root) opt_root = positionNode.ownerDocument.body;

  // Split the node.
  var textSplit = positionNode.nodeType == NodeType.TEXT;
  /** @type {?Node} */
  var secondHalfOfSplitNode = null;
  if (textSplit) {
    if (userAgent.IE && positionOffset == positionNode.nodeValue.length) {
      // Since splitText fails in IE at the end of a node, we split it manually.
      secondHalfOfSplitNode =
          googDom.getDomHelper(positionNode).createTextNode('');
      googDom.insertSiblingAfter(secondHalfOfSplitNode, positionNode);
    } else {
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      secondHalfOfSplitNode = positionNode.splitText(positionOffset);
    }
  } else {
    // Here we ensure positionNode is the last node in the first half of the
    // resulting tree.
    if (positionOffset) {
      // Use offset as an index in to childNodes.
      positionNode = positionNode.childNodes[positionOffset - 1];
    } else {
      // In this case, positionNode would be the last node in the first half
      // of the tree, but we actually want to move it to the second half.
      // Therefore we set secondHalfOfSplitNode to the same node.
      positionNode = secondHalfOfSplitNode =
          positionNode.firstChild || positionNode;
    }
  }

  // Create second half of the tree.
  var secondHalf = editorNode.splitDomTreeAt(
      positionNode, secondHalfOfSplitNode, opt_root);

  if (textSplit) {
    // Join secondHalfOfSplitNode and its right text siblings together and
    // then replace leading NonNbspWhiteSpace with a Nbsp.  If
    // secondHalfOfSplitNode has a right sibling that isn't a text node,
    // then we can leave secondHalfOfSplitNode empty.
    secondHalfOfSplitNode =
        TagOnEnterHandler.joinTextNodes_(
            secondHalfOfSplitNode, true);
    TagOnEnterHandler.replaceWhiteSpaceWithNbsp_(
        secondHalfOfSplitNode, true, !!secondHalfOfSplitNode.nextSibling);

    // Join positionNode and its left text siblings together and then replace
    // trailing NonNbspWhiteSpace with a Nbsp.
    var firstHalf = TagOnEnterHandler.joinTextNodes_(
        positionNode, false);
    TagOnEnterHandler.replaceWhiteSpaceWithNbsp_(
        firstHalf, false, false);
  }

  return secondHalf;
};


/**
 * Splits the DOM tree around the given node and returns the node containing
 * second half of the tree, which is appended after the old node.  The first
 * half of the tree is modified, but not removed from the DOM.
 * @param {Node} positionNode Node to split at.
 * @param {number} positionOffset Offset into positionNode to split at.  If
 *     positionNode is a text node, this offset is an offset in to the text
 *     content of that node.  Otherwise, positionOffset is an offset in to
 *     the childNodes array.  All elements with child index of  positionOffset
 *     or greater will be moved to the second half.  If positionNode is an
 *     empty element, the dom will be split at that element, with positionNode
 *     ending up in the second half.  positionOffset must be 0 in this case.
 * @param {Node} node Node to split.
 * @return {!Node} The node containing the second half of the tree.
 * @private
 */
TagOnEnterHandler.splitDomAndAppend_ = function(
    positionNode, positionOffset, node) {
  var newNode = TagOnEnterHandler.splitDom_(
      positionNode, positionOffset, node);
  googDom.insertSiblingAfter(newNode, node);
  return newNode;
};


/**
 * Joins node and its adjacent text nodes together.
 * @param {Node} node The node to start joining.
 * @param {boolean} moveForward Determines whether to join left siblings (false)
 *     or right siblings (true).
 * @return {Node} The joined text node.
 * @private
 */
TagOnEnterHandler.joinTextNodes_ = function(
    node, moveForward) {
  if (node && node.nodeName == '#text') {
    var nextNodeFn = moveForward ? 'nextSibling' : 'previousSibling';
    var prevNodeFn = moveForward ? 'previousSibling' : 'nextSibling';
    var nodeValues = [node.nodeValue];
    while (node[nextNodeFn] &&
           node[nextNodeFn].nodeType == NodeType.TEXT) {
      node = node[nextNodeFn];
      nodeValues.push(node.nodeValue);
      googDom.removeNode(node[prevNodeFn]);
    }
    if (!moveForward) {
      nodeValues.reverse();
    }
    node.nodeValue = nodeValues.join('');
  }
  return node;
};


/**
 * Replaces leading or trailing spaces of a text node to a single Nbsp.
 * @param {Node} textNode The text node to search and replace white spaces.
 * @param {boolean} fromStart Set to true to replace leading spaces, false to
 *     replace trailing spaces.
 * @param {boolean} isLeaveEmpty Set to true to leave the node empty if the
 *     text node was empty in the first place, otherwise put a Nbsp into the
 *     text node.
 * @private
 */
TagOnEnterHandler.replaceWhiteSpaceWithNbsp_ = function(
    textNode, fromStart, isLeaveEmpty) {
  var regExp = fromStart ? /^[ \t\r\n]+/ : /[ \t\r\n]+$/;
  textNode.nodeValue =
      textNode.nodeValue.replace(regExp, Unicode.NBSP);

  if (!isLeaveEmpty && textNode.nodeValue == '') {
    textNode.nodeValue = Unicode.NBSP;
  }
};


/**
 * Finds the first A element in a traversal from the input node.  The input
 * node itself is not included in the search.
 * @param {Node} node The node to start searching from.
 * @param {boolean=} opt_useFirstChild Whether to traverse along the first child
 *     (true) or last child (false).
 * @return {Node} The first anchor node found in the search, or null if none
 *     was found.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
TagOnEnterHandler.findAnchorInTraversal_ = function(
    node, opt_useFirstChild) {
  while ((node = opt_useFirstChild ? node.firstChild : node.lastChild) &&
         node.tagName != TagName.A) {
    // Do nothing - advancement is handled in the condition.
  }
  return node;
};
