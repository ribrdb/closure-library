/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the TreeControl class, which
 * provides a way to view a hierarchical set of data.
 *
 *
 * This is a based on the webfx tree control. It since been updated to add
 * typeahead support, as well as accessibility support using ARIA framework.
 *
 * @see ../../demos/tree/demo.html
 */

goog.declareModuleId('goog.ui.tree.treecontrol');

import * as aria from '../../a11y/aria/aria.js';
import * as asserts from '../../asserts/asserts.js';
import * as classlist from '../../dom/classlist.js';
import { EventType } from '../../events/eventtype.js';
import { FocusHandler } from '../../events/focushandler.js';
import { KeyHandler } from '../../events/keyhandler.js';
import { SafeHtml } from '../../html/safehtml.js';
import * as log from '../../log/log.js';
import { BaseNode } from './basenode.js';
import { TreeNode } from './treenode.js';
import { TypeAhead } from './typeahead.js';
import * as userAgent from '../../useragent/useragent.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * This creates a TreeControl object. A tree control provides a way to
 * view a hierarchical set of data.
 * @param {string|!SafeHtml} content The content of the node label.
 *     Strings are treated as plain-text and will be HTML escaped.
 * @param {Object=} opt_config The configuration for the tree. See
 *    TreeControl.defaultConfig. If not specified, a default config
 *    will be used.
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {BaseNode}
 */
export function TreeControl(content, opt_config, opt_domHelper) {
  BaseNode.call(this, content, opt_config, opt_domHelper);

  // The root is open and selected by default.
  this.setExpandedInternal(true);
  this.setSelectedInternal(true);

  this.selectedItem_ = this;

  /**
     * Used for typeahead support.
     * @private {!TypeAhead}
     */
  this.typeAhead_ = new TypeAhead();

  /**
     * The object handling keyboard events.
     * @private {?KeyHandler}
     */
  this.keyHandler_ = null;

  /**
     * The object handling focus events.
     * @private {?FocusHandler}
     */
  this.focusHandler_ = null;

  /**
     * Logger
     * @private {?log.Logger}
     */
  this.logger_ = log.getLogger('this');

  /**
   * Whether the tree is focused.
   * @private {boolean}
   */
  this.focused_ = false;

  /**
     * Child node that currently has focus.
     * @private {?BaseNode}
     */
  this.focusedNode_ = null;

  /**
   * Whether to show lines.
   * @private {boolean}
   */
  this.showLines_ = true;

  /**
   * Whether to show expanded lines.
   * @private {boolean}
   */
  this.showExpandIcons_ = true;

  /**
   * Whether to show the root node.
   * @private {boolean}
   */
  this.showRootNode_ = true;

  /**
   * Whether to show the root lines.
   * @private {boolean}
   */
  this.showRootLines_ = true;

  if (userAgent.IE) {

    try {
      // works since IE6SP1
      document.execCommand('BackgroundImageCache', false, true);
    } catch (e) {
      log.warning(this.logger_, 'Failed to enable background image cache');
    }
  }
}
goog.inherits(TreeControl, BaseNode);


/** @override */
TreeControl.prototype.getTree = function() {
  return this;
};


/** @override */
TreeControl.prototype.getDepth = function() {
  return 0;
};


/**
 * Expands the parent chain of this node so that it is visible.
 * @override
 */
TreeControl.prototype.reveal = function() {
  // always expanded by default
  // needs to be overriden so that we don't try to reveal our parent
  // which is a generic component
};


/**
 * Handles focus on the tree.
 * @param {!BrowserEvent} e The browser event.
 * @private
 */
TreeControl.prototype.handleFocus_ = function(e) {
  this.focused_ = true;
  classlist.add(
      asserts.assert(this.getElement()), goog.getCssName('focused'));

  if (this.selectedItem_) {
    this.selectedItem_.select();
  }
};


/**
 * Handles blur on the tree.
 * @param {!BrowserEvent} e The browser event.
 * @private
 */
TreeControl.prototype.handleBlur_ = function(e) {
  this.focused_ = false;
  classlist.remove(
      asserts.assert(this.getElement()), goog.getCssName('focused'));
};


/**
 * @return {boolean} Whether the tree has keyboard focus.
 */
TreeControl.prototype.hasFocus = function() {
  return this.focused_;
};


/** @override */
TreeControl.prototype.getExpanded = function() {
  return !this.showRootNode_ ||
      TreeControl.superClass_.getExpanded.call(this);
};


/** @override */
TreeControl.prototype.setExpanded = function(expanded) {
  if (!this.showRootNode_) {
    this.setExpandedInternal(expanded);
  } else {
    TreeControl.superClass_.setExpanded.call(this, expanded);
  }
};


/** @override */
TreeControl.prototype.getExpandIconSafeHtml = function() {
  // no expand icon for root element
  return SafeHtml.EMPTY;
};


/** @override */
TreeControl.prototype.getIconElement = function() {
  const el = this.getRowElement();
  return el ? /** @type {Element} */ (el.firstChild) : null;
};


/** @override */
TreeControl.prototype.getExpandIconElement = function() {
  // no expand icon for root element
  return null;
};


/** @override */
TreeControl.prototype.updateExpandIcon = function() {
  // no expand icon
};


/**
 * @override
 * @suppress {strictMissingProperties}
 */
TreeControl.prototype.getRowClassName = function() {
  return TreeControl.superClass_.getRowClassName.call(this) +
      (this.showRootNode_ ? '' : ' ' + this.getConfig().cssHideRoot);
};


/**
 * Returns the source for the icon.
 * @return {string} Src for the icon.
 * @override
 * @suppress {strictMissingProperties}
 */
TreeControl.prototype.getCalculatedIconClass = function() {
  const expanded = this.getExpanded();
  const expandedIconClass = this.getExpandedIconClass();
  if (expanded && expandedIconClass) {
    return expandedIconClass;
  }
  const iconClass = this.getIconClass();
  if (!expanded && iconClass) {
    return iconClass;
  }

  // fall back on default icons
  const config = this.getConfig();
  if (expanded && config.cssExpandedRootIcon) {
    return config.cssTreeIcon + ' ' + config.cssExpandedRootIcon;
  } else if (!expanded && config.cssCollapsedRootIcon) {
    return config.cssTreeIcon + ' ' + config.cssCollapsedRootIcon;
  }
  return '';
};


/**
 * Sets the selected item.
 * @param {BaseNode} node The item to select.
 */
TreeControl.prototype.setSelectedItem = function(node) {
  if (this.selectedItem_ == node) {
    return;
  }

  let hadFocus = false;
  if (this.selectedItem_) {
    hadFocus = this.selectedItem_ == this.focusedNode_;
    this.selectedItem_.setSelectedInternal(false);
  }

  this.selectedItem_ = node;

  if (node) {
    node.setSelectedInternal(true);
    if (hadFocus) {
      node.select();
    }
  }

  this.dispatchEvent(EventType.CHANGE);
};


/**
 * Returns the selected item.
 * @return {BaseNode} The currently selected item.
 */
TreeControl.prototype.getSelectedItem = function() {
  return this.selectedItem_;
};


/**
 * Sets whether to show lines.
 * @param {boolean} b Whether to show lines.
 */
TreeControl.prototype.setShowLines = function(b) {
  if (this.showLines_ != b) {
    this.showLines_ = b;
    if (this.isInDocument()) {
      this.updateLinesAndExpandIcons_();
    }
  }
};


/**
 * @return {boolean} Whether to show lines.
 */
TreeControl.prototype.getShowLines = function() {
  return this.showLines_;
};


/**
 * Updates the lines after the tree has been drawn.
 * @private
 */
TreeControl.prototype.updateLinesAndExpandIcons_ = function() {
  const tree = this;
  const showLines = tree.getShowLines();
  const showRootLines = tree.getShowRootLines();

  /**
     * Recursively walk through all nodes and update the class names of the
     * expand icon and the children element.
     * @param {!BaseNode} node
     */
  function updateShowLines(node) {
    const childrenEl = node.getChildrenElement();
    if (childrenEl) {
      const hideLines =
          !showLines || tree == node.getParent() && !showRootLines;
      /** @suppress {strictMissingProperties} */
      const childClass = hideLines ? node.getConfig().cssChildrenNoLines :
                                     node.getConfig().cssChildren;
      childrenEl.className = childClass;

      const expandIconEl = node.getExpandIconElement();
      if (expandIconEl) {
        expandIconEl.className = node.getExpandIconClass();
      }
    }
    node.forEachChild(updateShowLines);
  }
  updateShowLines(this);
};


/**
 * Sets whether to show root lines.
 * @param {boolean} b Whether to show root lines.
 */
TreeControl.prototype.setShowRootLines = function(b) {
  if (this.showRootLines_ != b) {
    this.showRootLines_ = b;
    if (this.isInDocument()) {
      this.updateLinesAndExpandIcons_();
    }
  }
};


/**
 * @return {boolean} Whether to show root lines.
 */
TreeControl.prototype.getShowRootLines = function() {
  return this.showRootLines_;
};


/**
 * Sets whether to show expand icons.
 * @param {boolean} b Whether to show expand icons.
 */
TreeControl.prototype.setShowExpandIcons = function(b) {
  if (this.showExpandIcons_ != b) {
    this.showExpandIcons_ = b;
    if (this.isInDocument()) {
      this.updateLinesAndExpandIcons_();
    }
  }
};


/**
 * @return {boolean} Whether to show expand icons.
 */
TreeControl.prototype.getShowExpandIcons = function() {
  return this.showExpandIcons_;
};


/**
 * Sets whether to show the root node.
 * @param {boolean} b Whether to show the root node.
 */
TreeControl.prototype.setShowRootNode = function(b) {
  if (this.showRootNode_ != b) {
    this.showRootNode_ = b;
    if (this.isInDocument()) {
      const el = this.getRowElement();
      if (el) {
        el.className = this.getRowClassName();
      }
    }
    // Ensure that we do not hide the selected item.
    if (!b && this.getSelectedItem() == this && this.getFirstChild()) {
      this.setSelectedItem(this.getFirstChild());
    }
  }
};


/**
 * @return {boolean} Whether to show the root node.
 */
TreeControl.prototype.getShowRootNode = function() {
  return this.showRootNode_;
};


/**
 * Add roles and states.
 * @protected
 * @override
 */
TreeControl.prototype.initAccessibility = function() {
  TreeControl.superClass_.initAccessibility.call(this);

  const elt = this.getElement();
  asserts.assert(elt, 'The DOM element for the tree cannot be null.');
  aria.setRole(elt, 'tree');
  aria.setState(elt, 'labelledby', this.getLabelElement().id);
};


/** @override */
TreeControl.prototype.enterDocument = function() {
  TreeControl.superClass_.enterDocument.call(this);
  const el = this.getElement();
  /** @suppress {strictMissingProperties} */
  el.className = this.getConfig().cssRoot;
  el.setAttribute('hideFocus', 'true');
  this.attachEvents_();
  this.initAccessibility();
};


/** @override */
TreeControl.prototype.exitDocument = function() {
  TreeControl.superClass_.exitDocument.call(this);
  this.detachEvents_();
};


/**
 * Adds the event listeners to the tree.
 * @private
 * @suppress {strictMissingProperties}
 */
TreeControl.prototype.attachEvents_ = function() {
  const el = this.getElement();
  el.tabIndex = 0;

  const kh = this.keyHandler_ = new KeyHandler(el);
  const fh = this.focusHandler_ = new FocusHandler(el);

  this.getHandler()
      .listen(fh, FocusHandler.EventType.FOCUSOUT, this.handleBlur_)
      .listen(fh, FocusHandler.EventType.FOCUSIN, this.handleFocus_)
      .listen(kh, KeyHandler.EventType.KEY, this.handleKeyEvent)
      .listen(el, EventType.MOUSEDOWN, this.handleMouseEvent_)
      .listen(el, EventType.CLICK, this.handleMouseEvent_)
      .listen(el, EventType.DBLCLICK, this.handleMouseEvent_);
};


/**
 * Removes the event listeners from the tree.
 * @private
 */
TreeControl.prototype.detachEvents_ = function() {
  this.keyHandler_.dispose();
  this.keyHandler_ = null;
  this.focusHandler_.dispose();
  this.focusHandler_ = null;
};


/**
 * Handles mouse events.
 * @param {!BrowserEvent} e The browser event.
 * @private
 */
TreeControl.prototype.handleMouseEvent_ = function(e) {
  log.fine(this.logger_, 'Received event ' + e.type);
  const node = this.getNodeFromEvent_(e);
  if (node) {
    switch (e.type) {
      case EventType.MOUSEDOWN:
        node.onMouseDown(e);
        break;
      case EventType.CLICK:
        node.onClick_(e);
        break;
      case EventType.DBLCLICK:
        node.onDoubleClick_(e);
        break;
    }
  }
};


/**
 * Handles key down on the tree.
 * @param {!BrowserEvent} e The browser event.
 * @return {boolean} The handled value.
 */
TreeControl.prototype.handleKeyEvent = function(e) {
  let handled = false;

  // Handle typeahead and navigation keystrokes.
  handled = this.typeAhead_.handleNavigation(e) ||
      (this.selectedItem_ && this.selectedItem_.onKeyDown(e)) ||
      this.typeAhead_.handleTypeAheadChar(e);

  if (handled) {
    e.preventDefault();
  }

  return handled;
};


/**
 * Finds the containing node given an event.
 * @param {!BrowserEvent} e The browser event.
 * @return {BaseNode} The containing node or null if no node is
 *     found.
 * @private
 * @suppress {strictMissingProperties}
 */
TreeControl.prototype.getNodeFromEvent_ = function(e) {
  // find the right node
  let node = null;
  let target = e.target;
  while (target != null) {
    const id = target.id;
    node = BaseNode.allNodes[id];
    if (node) {
      return node;
    }
    if (target == this.getElement()) {
      break;
    }
    target = target.parentNode;
  }
  return null;
};


/**
 * Creates a new tree node using the same config as the root.
 * @param {string=} opt_content The content of the node label. Strings are
 *     treated as plain-text and will be HTML escaped. To set SafeHtml content,
 *     omit opt_content and call setSafeHtml on the resulting node.
 * @return {!TreeNode} The new item.
 */
TreeControl.prototype.createNode = function(opt_content) {
  return new TreeNode(
      opt_content || SafeHtml.EMPTY, this.getConfig(),
      this.getDomHelper());
};


/**
 * Allows the caller to notify that the given node has been added or just had
 * been updated in the tree.
 * @param {BaseNode} node New node being added or existing node
 *    that just had been updated.
 */
TreeControl.prototype.setNode = function(node) {
  this.typeAhead_.setNodeInMap(node);
};


/**
 * Allows the caller to notify that the given node is being removed from the
 * tree.
 * @param {BaseNode} node Node being removed.
 */
TreeControl.prototype.removeNode = function(node) {
  this.typeAhead_.removeNodeFromMap(node);
};


/**
 * Clear the typeahead buffer.
 */
TreeControl.prototype.clearTypeAhead = function() {
  this.typeAhead_.clear();
};


/**
 * A default configuration for the tree.
 */
TreeControl.defaultConfig = BaseNode.defaultConfig;
