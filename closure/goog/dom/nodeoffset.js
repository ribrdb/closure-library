/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Object to store the offset from one node to another in a way
 * that works on any similar DOM structure regardless of whether it is the same
 * actual nodes.
 */

import { Disposable } from '../disposable/disposable.js';

import { TagName } from './tagname.js';



/**
 * Object to store the offset from one node to another in a way that works on
 * any similar DOM structure regardless of whether it is the same actual nodes.
 * @param {Node} node The node to get the offset for.
 * @param {Node} baseNode The node to calculate the offset from.
 * @extends {Disposable}
 * @constructor
 * @final
 */
export function NodeOffset(node, baseNode) {
  Disposable.call(this);

  /**
   * A stack of childNode offsets.
   * @type {Array<number>}
   * @private
   */
  this.offsetStack_ = [];

  /**
   * A stack of childNode names.
   * @type {Array<string>}
   * @private
   */
  this.nameStack_ = [];

  while (node && node.nodeName != TagName.BODY && node != baseNode) {
    // Compute the sibling offset.
    var siblingOffset = 0;
    var sib = node.previousSibling;
    while (sib) {
      sib = sib.previousSibling;
      ++siblingOffset;
    }
    this.offsetStack_.unshift(siblingOffset);
    this.nameStack_.unshift(node.nodeName);

    node = node.parentNode;
  }
}
goog.inherits(NodeOffset, Disposable);


/**
 * @return {string} A string representation of this object.
 * @override
 */
NodeOffset.prototype.toString = function() {
  var strs = [];
  var name;
  for (var i = 0; name = this.nameStack_[i]; i++) {
    strs.push(this.offsetStack_[i] + ',' + name);
  }
  return strs.join('\n');
};


/**
 * Walk the dom and find the node relative to baseNode.  Returns null on
 * failure.
 * @param {Node} baseNode The node to start walking from.  Should be equivalent
 *     to the node passed in to the constructor, in that it should have the
 *     same contents.
 * @return {Node} The node relative to baseNode, or null on failure.
 */
NodeOffset.prototype.findTargetNode = function(baseNode) {
  var name;
  var curNode = baseNode;
  for (var i = 0; name = this.nameStack_[i]; ++i) {
    curNode = curNode.childNodes[this.offsetStack_[i]];

    // Sanity check and make sure the element names match.
    if (!curNode || curNode.nodeName != name) {
      return null;
    }
  }
  return curNode;
};


/** @override */
NodeOffset.prototype.disposeInternal = function() {
  delete this.offsetStack_;
  delete this.nameStack_;
};
