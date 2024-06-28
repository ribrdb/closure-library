/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the TreeNode class.
 *
 *
 * This is a based on the webfx tree control. See file comment in
 * treecontrol.js.
 */

import * as asserts from '../../asserts/asserts.js';

import { BaseNode } from './basenode.js';
const {DomHelper} = goog.requireType('goog.dom.dom');
const {SafeHtml} = goog.requireType('goog.html.SafeHtml');  // circular
const {TreeControl} = goog.requireType('goog.ui.tree.treecontrol');



/**
 * A single node in the tree.
 * @param {string|!SafeHtml} content The content of the node label.
 *     Strings are treated as plain-text and will be HTML escaped.
 * @param {Object=} opt_config The configuration for the tree. See
 *    TreeControl.defaultConfig. If not specified, a default config
 *    will be used.
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {BaseNode}
 */
export function TreeNode(content, opt_config, opt_domHelper) {
  BaseNode.call(this, content, opt_config, opt_domHelper);
}
goog.inherits(TreeNode, BaseNode);


/**
 * Returns the tree.
 * @return {?TreeControl} The tree.
 * @override
 */
TreeNode.prototype.getTree = function() {
  if (this.tree) {
    return this.tree;
  }
  const parent = this.getParent();
  if (parent) {
    asserts.assertInstanceof(parent, TreeNode);
    const tree = parent.getTree();
    if (tree) {
      this.setTreeInternal(tree);
      return tree;
    }
  }
  return null;
};


/**
 * Returns the source for the icon.
 * @return {string} Src for the icon.
 * @override
 * @suppress {strictMissingProperties}
 */
TreeNode.prototype.getCalculatedIconClass = function() {
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
  if (this.hasChildren()) {
    if (expanded && config.cssExpandedFolderIcon) {
      return config.cssTreeIcon + ' ' + config.cssExpandedFolderIcon;
    } else if (!expanded && config.cssCollapsedFolderIcon) {
      return config.cssTreeIcon + ' ' + config.cssCollapsedFolderIcon;
    }
  } else {
    if (config.cssFileIcon) {
      return config.cssTreeIcon + ' ' + config.cssFileIcon;
    }
  }
  return '';
};
