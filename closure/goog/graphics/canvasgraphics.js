/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview CanvasGraphics sub class that uses the canvas tag for drawing.
 */


goog.declareModuleId('goog.graphics.canvasgraphics');


import { TagName } from '../dom/tagname.js';
import { EventType } from '../events/eventtype.js';
import { AbstractGraphics } from './abstractgraphics.js';

import {
  CanvasEllipseElement,
  CanvasGroupElement,
  CanvasImageElement,
  CanvasPathElement,
  CanvasRectElement,
  CanvasTextElement,
} from './canvaselement.js';

import { Font } from './font.js';
import { SolidFill } from './solidfill.js';
import { Size } from '../math/size.js';
import * as style from '../style/style.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { AffineTransform } = goog.requireType('goog.graphics.affinetransform');
const { Element:GraphicsElement } = goog.requireType('goog.graphics.element');
const { EllipseElement } = goog.requireType('goog.graphics.ellipseelement');
const { Fill } = goog.requireType('goog.graphics.fill');
const { GroupElement } = goog.requireType('goog.graphics.groupelement');
const { ImageElement } = goog.requireType('goog.graphics.imageelement');
const { Path } = goog.requireType('goog.graphics.path');
const { PathElement } = goog.requireType('goog.graphics.pathelement');
const { RectElement } = goog.requireType('goog.graphics.rectelement');
const { Stroke } = goog.requireType('goog.graphics.stroke');
const { StrokeAndFillElement } = goog.requireType('goog.graphics.strokeandfillelement');
const { TextElement } = goog.requireType('goog.graphics.textelement');



/**
 * A Graphics implementation for drawing using canvas.
 * @param {string|number} width The (non-zero) width in pixels.  Strings
 *     expressing percentages of parent with (e.g. '80%') are also accepted.
 * @param {string|number} height The (non-zero) height in pixels.  Strings
 *     expressing percentages of parent with (e.g. '80%') are also accepted.
 * @param {?number=} opt_coordWidth The coordinate width - if
 *     omitted or null, defaults to same as width.
 * @param {?number=} opt_coordHeight The coordinate height - if
 *     omitted or null, defaults to same as height.
 * @param {DomHelper=} opt_domHelper The DOM helper object for the
 *     document we want to render in.
 * @constructor
 * @extends {AbstractGraphics}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function CanvasGraphics(width, height, opt_coordWidth, opt_coordHeight, opt_domHelper) {
  AbstractGraphics.call(
      this, width, height, opt_coordWidth, opt_coordHeight, opt_domHelper);
}
goog.inherits(CanvasGraphics, AbstractGraphics);


/**
 * Sets the fill for the given element.
 * @param {StrokeAndFillElement} element The element
 *     wrapper.
 * @param {Fill} fill The fill object.
 * @override
 */
CanvasGraphics.prototype.setElementFill = function(
    element, fill) {
  this.redraw();
};


/**
 * Sets the stroke for the given element.
 * @param {StrokeAndFillElement} element The element
 *     wrapper.
 * @param {Stroke} stroke The stroke object.
 * @override
 */
CanvasGraphics.prototype.setElementStroke = function(
    element, stroke) {
  this.redraw();
};


/**
 * Set the translation and rotation of an element.
 *
 * If a more general affine transform is needed than this provides
 * (e.g. skew and scale) then use setElementAffineTransform.
 * @param {GraphicsElement} element The element wrapper.
 * @param {number} x The x coordinate of the translation transform.
 * @param {number} y The y coordinate of the translation transform.
 * @param {number} angle The angle of the rotation transform.
 * @param {number} centerX The horizontal center of the rotation transform.
 * @param {number} centerY The vertical center of the rotation transform.
 * @override
 */
CanvasGraphics.prototype.setElementTransform = function(
    element, x, y, angle, centerX, centerY) {
  this.redraw();
};


/**
 * Set the transformation of an element.
 *
 * Note that in this implementation this method just calls this.redraw()
 * and the affineTransform param is unused.
 * @param {!GraphicsElement} element The element wrapper.
 * @param {!AffineTransform} affineTransform The
 *     transformation applied to this element.
 * @override
 */
CanvasGraphics.prototype.setElementAffineTransform = function(
    element, affineTransform) {
  this.redraw();
};


/**
 * Push an element transform on to the transform stack.
 * @param {GraphicsElement} element The transformed element.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.pushElementTransform = function(
    element) {
  var ctx = this.getContext();
  ctx.save();

  var transform = element.getTransform();

  // TODO(robbyw): Test for unsupported transforms i.e. skews.
  var tx = transform.getTranslateX();
  var ty = transform.getTranslateY();
  if (tx || ty) {
    ctx.translate(tx, ty);
  }

  var sinTheta = transform.getShearY();
  if (sinTheta) {
    ctx.rotate(Math.asin(sinTheta));
  }
};


/**
 * Pop an element transform off of the transform stack.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.popElementTransform = function() {
  this.getContext().restore();
};


/**
 * Creates the DOM representation of the graphics area.
 * @override
 */
CanvasGraphics.prototype.createDom = function() {
  var element = this.dom_.createDom(
      TagName.DIV, {'style': 'position:relative;overflow:hidden'});
  this.setElementInternal(element);

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.canvas_ = this.dom_.createDom(TagName.CANVAS);
  element.appendChild(this.canvas_);

  /**
     * The main canvas element.
     * @type {CanvasGroupElement}
     */
  this.canvasElement = new CanvasGroupElement(this);

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.lastGroup_ = this.canvasElement;
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.redrawTimeout_ = 0;

  this.updateSize();
};


/**
 * Clears the drawing context object in response to actions that make the old
 * context invalid - namely resize of the canvas element.
 * @private
 */
CanvasGraphics.prototype.clearContext_ = function() {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.context_ = null;
};


/**
 * Returns the drawing context.
 * @return {Object} The canvas element rendering context.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.getContext = function() {
  if (!this.getElement()) {
    this.createDom();
  }
  if (!this.context_) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.context_ = this.canvas_.getContext('2d');
    this.context_.save();
  }
  return this.context_;
};


/**
 * Changes the coordinate system position.
 * @param {number} left The coordinate system left bound.
 * @param {number} top The coordinate system top bound.
 * @override
 */
CanvasGraphics.prototype.setCoordOrigin = function(left, top) {
  this.coordLeft = left;
  this.coordTop = top;
  this.redraw();
};


/**
 * Changes the coordinate size.
 * @param {number} coordWidth The coordinate width.
 * @param {number} coordHeight The coordinate height.
 * @override
 */
CanvasGraphics.prototype.setCoordSize = function(
    coordWidth, coordHeight) {
  CanvasGraphics.superClass_.setCoordSize.apply(this, arguments);
  this.redraw();
};


/**
 * Change the size of the canvas.
 * @param {number} pixelWidth The width in pixels.
 * @param {number} pixelHeight The height in pixels.
 * @override
 */
CanvasGraphics.prototype.setSize = function(
    pixelWidth, pixelHeight) {
  this.width = pixelWidth;
  this.height = pixelHeight;

  this.updateSize();
  this.redraw();
};


/** @override */
CanvasGraphics.prototype.getPixelSize = function() {
  // goog.style.getSize does not work for Canvas elements.  We
  // have to compute the size manually if it is percentage based.
  var width = this.width;
  var height = this.height;
  var computeWidth = (typeof width === 'string') && width.indexOf('%') != -1;
  var computeHeight = (typeof height === 'string') && height.indexOf('%') != -1;

  if (!this.isInDocument() && (computeWidth || computeHeight)) {
    return null;
  }

  var parent;
  var parentSize;

  if (computeWidth) {
    parent = /** @type {Element} */ (this.getElement().parentNode);
    parentSize = style.getSize(parent);
    width = parseFloat(/** @type {string} */ (width)) * parentSize.width / 100;
  }

  if (computeHeight) {
    parent = parent || /** @type {Element} */ (this.getElement().parentNode);
    parentSize = parentSize || style.getSize(parent);
    height =
        parseFloat(/** @type {string} */ (height)) * parentSize.height / 100;
  }

  return new Size(
      /** @type {number} */ (width),
      /** @type {number} */ (height));
};


/**
 * Update the size of the canvas.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.updateSize = function() {
  style.setSize(this.getElement(), this.width, this.height);

  var pixels = this.getPixelSize();
  if (pixels) {
    style.setSize(
        this.canvas_,
        /** @type {number} */ (pixels.width),
        /** @type {number} */ (pixels.height));
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.canvas_.width = pixels.width;
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.canvas_.height = pixels.height;
    this.clearContext_();
  }
};


/**
 * Reset the canvas.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.reset = function() {
  var ctx = this.getContext();
  ctx.restore();
  var size = this.getPixelSize();
  if (size.width && size.height) {
    ctx.clearRect(0, 0, size.width, size.height);
  }
  ctx.save();
};


/**
 * Remove all drawing elements from the graphics.
 * @override
 */
CanvasGraphics.prototype.clear = function() {
  this.reset();
  this.canvasElement.clear();
  var el = this.getElement();

  // Remove all children (text nodes) except the canvas (which is at index 0)
  while (el.childNodes.length > 1) {
    el.removeChild(/** @type {!Node} */ (el.lastChild));
  }
};


/**
 * Redraw the entire canvas.
 * @suppress {strictCheckTypes} Added to tighten compiler checks
 */
CanvasGraphics.prototype.redraw = function() {
  if (this.preventRedraw_) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.needsRedraw_ = true;
    return;
  }

  if (this.isInDocument()) {
    this.reset();

    if (this.coordWidth) {
      var pixels = this.getPixelSize();
      this.getContext().scale(
          pixels.width / this.coordWidth, pixels.height / this.coordHeight);
    }
    if (this.coordLeft || this.coordTop) {
      this.getContext().translate(-this.coordLeft, -this.coordTop);
    }
    this.pushElementTransform(this.canvasElement);
    this.canvasElement.draw(this.context_);
    this.popElementTransform();
  }
};


/**
 * Draw an element, including any stroke or fill.
 * @param {GraphicsElement} element The element to draw.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.drawElement = function(element) {
  if (element instanceof CanvasTextElement) {
    // Don't draw text since that is not implemented using canvas.
    return;
  }

  var ctx = this.getContext();
  this.pushElementTransform(element);

  if (!element.getFill || !element.getStroke) {
    // Draw without stroke or fill (e.g. the element is an image or group).
    element.draw(ctx);
    this.popElementTransform();
    return;
  }

  var fill = element.getFill();
  if (fill) {
    if (fill instanceof SolidFill) {
      if (fill.getOpacity() != 0) {
        /**
         * @suppress {strictMissingProperties} Added to tighten compiler checks
         */
        ctx.globalAlpha = fill.getOpacity();
        /**
         * @suppress {strictMissingProperties} Added to tighten compiler checks
         */
        ctx.fillStyle = fill.getColor();
        element.draw(ctx);
        ctx.fill();
        /**
         * @suppress {strictMissingProperties} Added to tighten compiler checks
         */
        ctx.globalAlpha = 1;
      }
    } else {  // (fill instanceof goog.graphics.LinearGradient)
              /**
               * @suppress {strictMissingProperties} Added to tighten compiler checks
               */
      var linearGradient = ctx.createLinearGradient(
          fill.getX1(), fill.getY1(), fill.getX2(), fill.getY2());
      linearGradient.addColorStop(0.0, fill.getColor1());
      linearGradient.addColorStop(1.0, fill.getColor2());

      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      ctx.fillStyle = linearGradient;
      element.draw(ctx);
      ctx.fill();
    }
  }

  var stroke = element.getStroke();
  if (stroke) {
    element.draw(ctx);
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    ctx.strokeStyle = stroke.getColor();

    var width = stroke.getWidth();
    if (typeof width === 'string' && width.indexOf('px') != -1) {
      width = parseFloat(width) / this.getPixelScaleX();
    }
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    ctx.lineWidth = width;

    ctx.stroke();
  }

  this.popElementTransform();
};


/**
 * Append an element.
 *
 * @param {GraphicsElement} element The element to draw.
 * @param {GroupElement|undefined} group The group to draw
 *     it in. If null or undefined, defaults to the root group.
 * @protected
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.append = function(element, group) {
  group = group || this.canvasElement;
  group.appendChild(element);

  if (this.isDrawable(group)) {
    this.drawElement(element);
  }
};


/**
 * Draw an ellipse.
 *
 * @param {number} cx Center X coordinate.
 * @param {number} cy Center Y coordinate.
 * @param {number} rx Radius length for the x-axis.
 * @param {number} ry Radius length for the y-axis.
 * @param {Stroke} stroke Stroke object describing the
 *    stroke.
 * @param {Fill} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper
 *     element to append to.  If not specified, appends to the main canvas.
 *
 * @return {!EllipseElement} The newly created element.
 * @override
 */
CanvasGraphics.prototype.drawEllipse = function(
    cx, cy, rx, ry, stroke, fill, opt_group) {
  var element = new CanvasEllipseElement(
      null, this, cx, cy, rx, ry, stroke, fill);
  this.append(element, opt_group);
  return element;
};


/**
 * Draw a rectangle.
 *
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 * @param {Stroke} stroke Stroke object describing the
 *    stroke.
 * @param {Fill} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper
 *     element to append to. If not specified, appends to the main canvas.
 *
 * @return {!RectElement} The newly created element.
 * @override
 */
CanvasGraphics.prototype.drawRect = function(
    x, y, width, height, stroke, fill, opt_group) {
  var element = new CanvasRectElement(
      null, this, x, y, width, height, stroke, fill);
  this.append(element, opt_group);
  return element;
};


/**
 * Draw an image.
 *
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @param {number} width Width of image.
 * @param {number} height Height of image.
 * @param {string} src Source of the image.
 * @param {GroupElement=} opt_group The group wrapper
 *     element to append to. If not specified, appends to the main canvas.
 *
 * @return {!ImageElement} The newly created element.
 */
CanvasGraphics.prototype.drawImage = function(
    x, y, width, height, src, opt_group) {
  var element = new CanvasImageElement(
      null, this, x, y, width, height, src);
  this.append(element, opt_group);
  return element;
};


/**
 * Draw a text string vertically centered on a given line.
 *
 * @param {string} text The text to draw.
 * @param {number} x1 X coordinate of start of line.
 * @param {number} y1 Y coordinate of start of line.
 * @param {number} x2 X coordinate of end of line.
 * @param {number} y2 Y coordinate of end of line.
 * @param {?string} align Horizontal alignment: left (default), center, right.
 * @param {Font} font Font describing the font properties.
 * @param {Stroke} stroke Stroke object describing the stroke.
 * @param {Fill} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper
 *     element to append to. If not specified, appends to the main canvas.
 *
 * @return {!TextElement} The newly created element.
 * @override
 */
CanvasGraphics.prototype.drawTextOnLine = function(
    text, x1, y1, x2, y2, align, font, stroke, fill, opt_group) {
  var element = new CanvasTextElement(
      this, text, x1, y1, x2, y2, align,
      /** @type {!Font} */ (font), stroke, fill);
  this.append(element, opt_group);
  return element;
};


/**
 * Draw a path.
 * @param {!Path} path The path object to draw.
 * @param {Stroke} stroke Stroke object describing the stroke.
 * @param {Fill} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper
 *     element to append to. If not specified, appends to the main canvas.
 *
 * @return {!PathElement} The newly created element.
 * @override
 */
CanvasGraphics.prototype.drawPath = function(
    path, stroke, fill, opt_group) {
  var element =
      new CanvasPathElement(null, this, path, stroke, fill);
  this.append(element, opt_group);
  return element;
};


/**
 * @param {GroupElement} group The group to possibly
 *     draw to.
 * @return {boolean} Whether drawing can occur now.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.isDrawable = function(group) {
  return this.isInDocument() && !this.redrawTimeout_ &&
      !this.isRedrawRequired(group);
};


/**
 * Returns true if drawing to the given group means a redraw is required.
 * @param {GroupElement} group The group to draw to.
 * @return {boolean} Whether drawing to this group should force a redraw.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.isRedrawRequired = function(group) {
  // TODO(robbyw): Moving up to any parent of lastGroup should not force redraw.
  return group != this.canvasElement && group != this.lastGroup_;
};


/**
 * Create an empty group of drawing elements.
 *
 * @param {GroupElement=} opt_group The group wrapper
 *     element to append to. If not specified, appends to the main canvas.
 *
 * @return {!CanvasGroupElement} The newly created group.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.createGroup = function(opt_group) {
  var group = new CanvasGroupElement(this);

  opt_group = opt_group || this.canvasElement;

  // TODO(robbyw): Moving up to any parent group should not force redraw.
  if (opt_group == this.canvasElement || opt_group == this.lastGroup_) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.lastGroup_ = group;
  }

  this.append(group, opt_group);

  return group;
};


/**
 * Measure and return the width (in pixels) of a given text string.
 * Text measurement is needed to make sure a text can fit in the allocated
 * area. The way text length is measured is by writing it into a div that is
 * after the visible area, measure the div width, and immediately erase the
 * written value.
 *
 * @param {string} text The text string to measure.
 * @param {Font} font The font object describing the font style.
 * @override
 */
CanvasGraphics.prototype.getTextWidth = goog.abstractMethod;


/**
 * Disposes of the component by removing event handlers, detacing DOM nodes from
 * the document body, and removing references to them.
 * @override
 * @protected
 */
CanvasGraphics.prototype.disposeInternal = function() {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.context_ = null;
  CanvasGraphics.superClass_.disposeInternal.call(this);
};


/** @override */
CanvasGraphics.prototype.enterDocument = function() {
  var oldPixelSize = this.getPixelSize();
  CanvasGraphics.superClass_.enterDocument.call(this);
  if (!oldPixelSize) {
    this.updateSize();
    this.dispatchEvent(EventType.RESIZE);
  }
  this.redraw();
};


/**
 * Start preventing redraws - useful for chaining large numbers of changes
 * together.  Not guaranteed to do anything - i.e. only use this for
 * optimization of a single code path.
 * @override
 */
CanvasGraphics.prototype.suspend = function() {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.preventRedraw_ = true;
};


/**
 * Stop preventing redraws.  If any redraws had been prevented, a redraw will
 * be done now.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGraphics.prototype.resume = function() {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.preventRedraw_ = false;

  if (this.needsRedraw_) {
    this.redraw();
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.needsRedraw_ = false;
  }
};


/**
 * Removes an element from the Canvas.
 * @param {GraphicsElement} elem the element to remove.
 * @override
 */
CanvasGraphics.prototype.removeElement = function(elem) {
  if (!elem) {
    return;
  }
  this.canvasElement.removeElement(elem);
  this.redraw();
};
