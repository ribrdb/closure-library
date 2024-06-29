/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thicker wrapper around graphics groups.
 */


goog.declareModuleId('goog.graphics.ext.group');

import * as array from '../../array/array.js';
import { Element } from './element.js';
const { GroupElement } = goog.requireType('goog.graphics.groupelement');



/**
 * Wrapper for a graphics group.
 * @param {Group} group Parent for this element. Can
 *     be null if this is a Graphics instance.
 * @param {GroupElement=} opt_wrapper The thin wrapper
 *     to wrap. If omitted, a new group will be created. Must be included
 *     when group is null.
 * @constructor
 * @extends {Element}
 */
export function Group(group, opt_wrapper) {
  opt_wrapper = opt_wrapper ||
      group.getGraphicsImplementation().createGroup(group.getWrapper());
  Element.call(this, group, opt_wrapper);

  /**
     * Array of child elements this group contains.
     * @type {Array<Element>}
     * @private
     */
  this.children_ = [];
}
goog.inherits(Group, Element);


/**
 * Add an element to the group.  This should be treated as package local, as
 * it is called by the draw* methods.
 * @param {!Element} element The element to add.
 * @param {boolean=} opt_chain Whether this addition is part of a longer set
 *     of element additions.
 */
Group.prototype.addChild = function(element, opt_chain) {
  if (!array.contains(this.children_, element)) {
    this.children_.push(element);
  }

  const transformed = this.growToFit_(element);

  if (element.isParentDependent()) {
    element.parentTransform();
  }

  if (!opt_chain && element.isPendingTransform()) {
    element.reset();
  }

  if (transformed) {
    this.reset();
  }
};


/**
 * Remove an element from the group.
 * @param {Element} element The element to remove.
 */
Group.prototype.removeChild = function(element) {
  array.remove(this.children_, element);

  // TODO(robbyw): shape.fireEvent('delete')

  this.getGraphicsImplementation().removeElement(element.getWrapper());
};


/**
 * Calls the given function on each of this component's children in order.  If
 * `opt_obj` is provided, it will be used as the 'this' object in the
 * function when called.  The function should take two arguments:  the child
 * component and its 0-based index.  The return value is ignored.
 * @param {Function} f The function to call for every child component; should
 *    take 2 arguments (the child and its index).
 * @param {Object=} opt_obj Used as the 'this' object in f when called.
 */
Group.prototype.forEachChild = function(f, opt_obj) {
  if (this.children_) {
    this.children_.forEach(f, opt_obj);
  }
};


/**
 * @return {GroupElement} The underlying thin wrapper.
 * @override
 */
Group.prototype.getWrapper;


/**
 * Reset the element.
 * @override
 */
Group.prototype.reset = function() {
  Group.superClass_.reset.call(this);

  this.updateChildren();
};


/**
 * Called from the parent class, this method resets any pre-computed positions
 * and sizes.
 * @protected
 * @override
 */
Group.prototype.redraw = function() {
  this.getWrapper().setSize(this.getWidth(), this.getHeight());
  this.transformChildren();
};


/**
 * Transform the children that need to be transformed.
 * @protected
 */
Group.prototype.transformChildren = function() {
  this.forEachChild(function(child) {
    if (child.isParentDependent()) {
      child.parentTransform();
    }
  });
};


/**
 * As part of the reset process, update child elements.
 */
Group.prototype.updateChildren = function() {
  this.forEachChild(function(child) {
    if (child.isParentDependent() || child.isPendingTransform()) {
      child.reset();
    } else if (child.updateChildren) {
      child.updateChildren();
    }
  });
};


/**
 * When adding an element, grow this group's bounds to fit it.
 * @param {!Element} element The added element.
 * @return {boolean} Whether the size of this group changed.
 * @private
 */
Group.prototype.growToFit_ = function(element) {
  let transformed = false;

  const x = element.getMaxX();
  if (x > this.getWidth()) {
    this.setMinWidth(x);
    transformed = true;
  }

  const y = element.getMaxY();
  if (y > this.getHeight()) {
    this.setMinHeight(y);
    transformed = true;
  }

  return transformed;
};


/**
 * @return {number} The width of the element's coordinate space.
 */
Group.prototype.getCoordinateWidth = function() {
  return this.getWidth();
};


/**
 * @return {number} The height of the element's coordinate space.
 */
Group.prototype.getCoordinateHeight = function() {
  return this.getHeight();
};


/**
 * Remove all drawing elements from the group.
 */
Group.prototype.clear = function() {
  while (this.children_.length) {
    this.removeChild(this.children_[0]);
  }
};
