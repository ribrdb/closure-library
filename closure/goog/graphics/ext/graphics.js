/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Graphics surface type.
 */



// TODO(user): We're trying to migrate all ES5 subclasses of Closure
// Library to ES6. In ES6 this cannot be referenced before super is called. This
// file has at least one this before a super call (in ES5) and cannot be
// automatically upgraded to ES6 as a result. Please fix this if you have a
// chance. Note: This can sometimes be caused by not calling the super
// constructor at all. You can run the conversion tool yourself to see what it
// does on this file: blaze run //javascript/refactoring/es6_classes:convert.

goog.declareModuleId('goog.graphics.ext.graphics');

import * as events from '../../events/events.js';
import { EventType } from '../../events/eventtype.js';
import * as graphics from '../graphics.js';
import { Group } from './group.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { AbstractGraphics } = goog.requireType('goog.graphics.abstractgraphics');
const { Coordinate } = goog.requireType('goog.math.coordinate');
const { Size } = goog.requireType('goog.math.size');



/**
 * Wrapper for a graphics surface.
 * @param {string|number} width The width in pixels.  Strings
 *     expressing percentages of parent with (e.g. '80%') are also accepted.
 * @param {string|number} height The height in pixels.  Strings
 *     expressing percentages of parent with (e.g. '80%') are also accepted.
 * @param {?number=} opt_coordWidth The coordinate width - if
 *     omitted or null, defaults to same as width.
 * @param {?number=} opt_coordHeight The coordinate height. - if
 *     omitted or null, defaults to same as height.
 * @param {DomHelper=} opt_domHelper The DOM helper object for the
 *     document we want to render in.
 * @param {boolean=} opt_isSimple Flag used to indicate the graphics object will
 *     be drawn to in a single pass, and the fastest implementation for this
 *     scenario should be favored.  NOTE: Setting to true may result in
 *     degradation of text support.
 * @constructor
 * @extends {Group}
 * @final
 */
export function Graphics(
 width,
 height,
 opt_coordWidth,
 opt_coordHeight,
 opt_domHelper,
 opt_isSimple
) {
 const surface = opt_isSimple ?
     graphics.createSimpleGraphics(
         width, height, opt_coordWidth, opt_coordHeight, opt_domHelper) :
     graphics.createGraphics(
         width, height, opt_coordWidth, opt_coordHeight, opt_domHelper);
 this.implementation_ = surface;

 Group.call(this, null, surface.getCanvasElement());

 events.listen(
     surface, EventType.RESIZE, this.updateChildren, false, this);
}
goog.inherits(Graphics, Group);


/**
 * The root level graphics implementation.
 * @type {AbstractGraphics}
 * @private
 */
Graphics.prototype.implementation_;


/**
 * @return {AbstractGraphics} The graphics implementation layer.
 */
Graphics.prototype.getImplementation = function() {
 return this.implementation_;
};


/**
 * Changes the coordinate size.
 * @param {number} coordWidth The coordinate width.
 * @param {number} coordHeight The coordinate height.
 */
Graphics.prototype.setCoordSize = function(
    coordWidth, coordHeight) {
 this.implementation_.setCoordSize(coordWidth, coordHeight);
 Graphics.superClass_.setSize.call(
     this, coordWidth, coordHeight);
};


/**
 * @return {Size} The coordinate size.
 */
Graphics.prototype.getCoordSize = function() {
 return this.implementation_.getCoordSize();
};


/**
 * Changes the coordinate system position.
 * @param {number} left The coordinate system left bound.
 * @param {number} top The coordinate system top bound.
 */
Graphics.prototype.setCoordOrigin = function(left, top) {
 this.implementation_.setCoordOrigin(left, top);
};


/**
 * @return {!Coordinate} The coordinate system position.
 */
Graphics.prototype.getCoordOrigin = function() {
 return this.implementation_.getCoordOrigin();
};


/**
 * Change the size of the canvas.
 * @param {number} pixelWidth The width in pixels.
 * @param {number} pixelHeight The height in pixels.
 */
Graphics.prototype.setPixelSize = function(
    pixelWidth, pixelHeight) {
 this.implementation_.setSize(pixelWidth, pixelHeight);

 const coordSize = this.getCoordSize();
 Graphics.superClass_.setSize.call(
     this, coordSize.width, coordSize.height);
};


/**
 * @return {Size?} Returns the number of pixels spanned by the
 *     surface, or null if the size could not be computed due to the size being
 *     specified in percentage points and the component not being in the
 *     document.
 */
Graphics.prototype.getPixelSize = function() {
 return this.implementation_.getPixelSize();
};


/**
 * @return {number} The coordinate width of the canvas.
 * @override
 */
Graphics.prototype.getWidth = function() {
 return this.implementation_.getCoordSize().width;
};


/**
 * @return {number} The coordinate width of the canvas.
 * @override
 */
Graphics.prototype.getHeight = function() {
 return this.implementation_.getCoordSize().height;
};


/**
 * @return {number} Returns the number of pixels per unit in the x direction.
 * @override
 */
Graphics.prototype.getPixelScaleX = function() {
 return this.implementation_.getPixelScaleX();
};


/**
 * @return {number} Returns the number of pixels per unit in the y direction.
 * @override
 */
Graphics.prototype.getPixelScaleY = function() {
 return this.implementation_.getPixelScaleY();
};


/**
 * @return {Element} The root element of the graphics surface.
 */
Graphics.prototype.getElement = function() {
 return this.implementation_.getElement();
};


/**
 * Renders the underlying graphics.
 *
 * @param {Element} parentElement Parent element to render the component into.
 */
Graphics.prototype.render = function(parentElement) {
 this.implementation_.render(parentElement);
};


/**
 * Never transform a surface.
 * @override
 */
Graphics.prototype.transform = function() {};


/**
 * Called from the parent class, this method resets any pre-computed positions
 * and sizes.
 * @protected
 * @override
 */
Graphics.prototype.redraw = function() {
 this.transformChildren();
};
