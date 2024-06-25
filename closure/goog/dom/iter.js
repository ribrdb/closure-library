/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Iterators over DOM nodes.
 */

import * as iter from '../iter/iter.js';

import { Iterator } from '../iter/iter.js';



/**
 * Iterator over a Node's siblings.
 * @param {Node} node The node to start with.
 * @param {boolean=} opt_includeNode Whether to return the given node as the
 *     first return value from next.
 * @param {boolean=} opt_reverse Whether to traverse siblings in reverse
 *     document order.
 * @constructor
 * @extends {Iterator}
 */
export function SiblingIterator(node, opt_includeNode, opt_reverse) {
 /**
  * The current node, or null if iteration is finished.
  * @type {Node}
  * @private
  */
 this.node_ = node;

 /**
  * Whether to iterate in reverse.
  * @type {boolean}
  * @private
  */
 this.reverse_ = !!opt_reverse;

 if (node && !opt_includeNode) {
   this.next();
 }
}
goog.inherits(SiblingIterator, Iterator);


/**
 * @return {!IIterableResult<!Node>}
 * @override
 */
SiblingIterator.prototype.next = function() {
 var node = this.node_;
 if (!node) {
   return iter.ES6_ITERATOR_DONE;
 }
 this.node_ = this.reverse_ ? node.previousSibling : node.nextSibling;
 return iter.createEs6IteratorYield(node);
};


/**
 * Iterator over an Element's children.
 * @param {Element} element The element to iterate over.
 * @param {boolean=} opt_reverse Optionally traverse children from last to
 *     first.
 * @param {number=} opt_startIndex Optional starting index.
 * @constructor
 * @extends {SiblingIterator}
 * @final
 */
export function ChildIterator(element, opt_reverse, opt_startIndex) {
 if (opt_startIndex === undefined) {
   opt_startIndex = opt_reverse && element.childNodes.length ?
       element.childNodes.length - 1 :
       0;
 }
 SiblingIterator.call(
     this, element.childNodes[opt_startIndex], true, opt_reverse);
}
goog.inherits(ChildIterator, SiblingIterator);



/**
 * Iterator over a Node's ancestors, stopping after the document body.
 * @param {Node} node The node to start with.
 * @param {boolean=} opt_includeNode Whether to return the given node as the
 *     first return value from next.
 * @constructor
 * @extends {Iterator}
 * @final
 */
export function AncestorIterator(node, opt_includeNode) {
 /**
  * The current node, or null if iteration is finished.
  * @type {Node}
  * @private
  */
 this.node_ = node;

 if (node && !opt_includeNode) {
   this.next();
 }
}
goog.inherits(AncestorIterator, Iterator);


/**
 * @return {!IIterableResult<!Node>}
 * @override
 */
AncestorIterator.prototype.next = function() {
 var node = this.node_;
 if (!node) {
   return iter.ES6_ITERATOR_DONE;
 }
 this.node_ = node.parentNode;
 return iter.createEs6IteratorYield(node);
};