/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thin wrapper around the DOM element returned from
 * the different draw methods of the graphics implementation, and
 * all interfaces that the various element types support.
 */


goog.declareModuleId('goog.graphics.element');

import * as asserts from '../asserts/asserts.js';
import * as events from '../events/events.js';
import { EventTarget } from '../events/eventtarget.js';
import { Listenable } from '../events/listenable.js';
import { AffineTransform } from './affinetransform.js';
import * as math from '../math/math.js';
goog.requireType('goog.graphics.abstractgraphics');



/**
 * Base class for a thin wrapper around the DOM element returned from
 * the different draw methods of the graphics.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element  The DOM element to wrap.
 * @param {goog.graphics.AbstractGraphics} graphics  The graphics creating
 *     this element.
 * @constructor
 * @extends {EventTarget}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function Element(element, graphics) {
 EventTarget.call(this);
 this.element_ = element;
 this.graphics_ = graphics;
 // Overloading EventTarget field to state that this is not a custom event.
 // TODO(user) Should be handled in EventTarget.js (see bug 846824).
 this[Listenable.IMPLEMENTED_BY_PROP] = false;
}
goog.inherits(Element, EventTarget);


/**
 * The graphics object that contains this element.
 * @type {goog.graphics.AbstractGraphics?}
 * @private
 */
Element.prototype.graphics_ = null;


/**
 * The native browser element this class wraps.
 * @type {?Element}
 * @private
 */
Element.prototype.element_ = null;


/**
 * The transformation applied to this element.
 * @type {AffineTransform?}
 * @private
 */
Element.prototype.transform_ = null;


/**
 * Returns the underlying object.
 * @return {Element} The underlying element.
 */
Element.prototype.getElement = function() {
 return this.element_;
};


/**
 * Returns the graphics.
 * @return {goog.graphics.AbstractGraphics} The graphics that created the
 *     element.
 */
Element.prototype.getGraphics = function() {
 return this.graphics_;
};


/**
 * Set the translation and rotation of the element.
 *
 * If a more general affine transform is needed than this provides
 * (e.g. skew and scale) then use setTransform.
 * @param {number} x The x coordinate of the translation transform.
 * @param {number} y The y coordinate of the translation transform.
 * @param {number} rotate The angle of the rotation transform.
 * @param {number} centerX The horizontal center of the rotation transform.
 * @param {number} centerY The vertical center of the rotation transform.
 */
Element.prototype.setTransformation = function(
    x, y, rotate, centerX, centerY) {
 this.transform_ =
     AffineTransform
         .getRotateInstance(math.toRadians(rotate), centerX, centerY)
         .translate(x, y);
 this.getGraphics().setElementTransform(this, x, y, rotate, centerX, centerY);
};


/**
 * @return {!AffineTransform} The transformation applied to
 *     this element.
 */
Element.prototype.getTransform = function() {
 return this.transform_ ? this.transform_.clone() :
                          new AffineTransform();
};


/**
 * Set the affine transform of the element.
 * @param {!AffineTransform} affineTransform The
 *     transformation applied to this element.
 */
Element.prototype.setTransform = function(affineTransform) {
 this.transform_ = affineTransform.clone();
 this.getGraphics().setElementAffineTransform(this, affineTransform);
};


/** @override */
Element.prototype.addEventListener = function(
    type, handler, opt_capture, opt_handlerScope) {
 events.listen(
     this.element_, type, handler, opt_capture, opt_handlerScope);
};


/** @override */
Element.prototype.removeEventListener = function(
    type, handler, opt_capture, opt_handlerScope) {
 events.unlisten(
     this.element_, type, handler, opt_capture, opt_handlerScope);
};


/** @override */
Element.prototype.disposeInternal = function() {
 Element.superClass_.disposeInternal.call(this);
 asserts.assert(this.element_);
 events.removeAll(this.element_);
};
