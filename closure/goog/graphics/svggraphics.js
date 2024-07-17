/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview SvgGraphics sub class that uses SVG to draw the graphics.
 */

goog.declareModuleId('goog.graphics.svggraphics');

import { Timer } from '../timer/timer.js';
import * as dom from '../dom/dom.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventType } from '../events/eventtype.js';
import { AbstractGraphics } from './abstractgraphics.js';
import { Font } from './font.js';
import { LinearGradient } from './lineargradient.js';
import { Path } from './path.js';
import { SolidFill } from './solidfill.js';
import { Stroke } from './stroke.js';

import {
  SvgEllipseElement,
  SvgGroupElement,
  SvgImageElement,
  SvgPathElement,
  SvgRectElement,
  SvgTextElement,
} from './svgelement.js';

import * as math from '../math/math.js';
import { Size } from '../math/size.js';
import * as style from '../style/style.js';
import * as userAgent from '../useragent/useragent.js';
const { AffineTransform } = goog.requireType('goog.graphics.affinetransform');
const { Element:GraphicsElement } = goog.requireType('goog.graphics.element');
const { EllipseElement } = goog.requireType('goog.graphics.ellipseelement');
const { Fill } = goog.requireType('goog.graphics.fill');
const { GroupElement } = goog.requireType('goog.graphics.groupelement');
const { ImageElement } = goog.requireType('goog.graphics.imageelement');
const { PathElement } = goog.requireType('goog.graphics.pathelement');
const { RectElement } = goog.requireType('goog.graphics.rectelement');
const { StrokeAndFillElement } = goog.requireType('goog.graphics.strokeandfillelement');
const { TextElement } = goog.requireType('goog.graphics.textelement');



/**
 * A Graphics implementation for drawing using SVG.
 * @param {string|number} width The width in pixels.  Strings
 *     expressing percentages of parent with (e.g. '80%') are also accepted.
 * @param {string|number} height The height in pixels.  Strings
 *     expressing percentages of parent with (e.g. '80%') are also accepted.
 * @param {?number=} opt_coordWidth The coordinate width - if
 *     omitted or null, defaults to same as width.
 * @param {?number=} opt_coordHeight The coordinate height - if
 *     omitted or null, defaults to same as height.
 * @param {dom.DomHelper=} opt_domHelper The DOM helper object for the
 *     document we want to render in.
 * @constructor
 * @extends {AbstractGraphics}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 * @final
 */
export function SvgGraphics(width, height, opt_coordWidth, opt_coordHeight, opt_domHelper) {
  AbstractGraphics.call(
      this, width, height, opt_coordWidth, opt_coordHeight, opt_domHelper);

  /**
   * Map from def key to id of def root element.
   * Defs are global "defines" of svg that are used to share common attributes,
   * for example gradients.
   * @type {Object}
   * @private
   */
  this.defs_ = {};

  /**
   * Whether to manually implement viewBox by using a coordinate transform.
   * As of 1/11/08 this is necessary for Safari 3 but not for the nightly
   * WebKit build. Apply to webkit versions < 526. 525 is the
   * last version used by Safari 3.1.
   * @type {boolean}
   * @private
   */
  this.useManualViewbox_ =
      userAgent.WEBKIT && !userAgent.isVersionOrHigher(526);

  /**
       * Event handler.
       * @type {EventHandler<!SvgGraphics>}
       * @private
       */
  this.handler_ = new EventHandler(this);
}
goog.inherits(SvgGraphics, AbstractGraphics);


/**
 * The SVG namespace URN
 * @private
 * @type {string}
 */
SvgGraphics.SVG_NS_ = 'http://www.w3.org/2000/svg';


/**
 * The name prefix for def entries
 * @private
 * @type {string}
 */
SvgGraphics.DEF_ID_PREFIX_ = '_svgdef_';


/**
 * The next available unique identifier for a def entry.
 * This is a static variable, so that when multiple graphics are used in one
 * document, the same def id can not be re-defined by another SvgGraphics.
 * @type {number}
 * @private
 */
SvgGraphics.nextDefId_ = 0;


/**
 * Svg element for definitions for other elements, e.g. linear gradients.
 * @type {Element}
 * @private
 */
SvgGraphics.prototype.defsElement_;


/**
 * Creates an SVG element. Used internally and by different SVG classes.
 * @param {string} tagName The type of element to create.
 * @param {Object=} opt_attributes Map of name-value pairs for attributes.
 * @return {!Element} The created element.
 * @private
 */
SvgGraphics.prototype.createSvgElement_ = function(
    tagName, opt_attributes) {
  var element = this.dom_.getDocument().createElementNS(
      SvgGraphics.SVG_NS_, tagName);

  if (opt_attributes) {
    this.setElementAttributes(element, opt_attributes);
  }

  return element;
};


/**
 * Sets properties to an SVG element. Used internally and by different
 * SVG elements.
 * @param {Element} element The svg element.
 * @param {Object} attributes Map of name-value pairs for attributes.
 */
SvgGraphics.prototype.setElementAttributes = function(
    element, attributes) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};


/**
 * Appends an element.
 *
 * @param {GraphicsElement} element The element wrapper.
 * @param {GroupElement=} opt_group The group wrapper element
 *     to append to. If not specified, appends to the main canvas.
 * @private
 */
SvgGraphics.prototype.append_ = function(element, opt_group) {
  var parent = opt_group || this.canvasElement;
  parent.getElement().appendChild(/** @type {!Node} */ (element.getElement()));
};


/**
 * Sets the fill of the given element.
 * @param {StrokeAndFillElement} element The element wrapper.
 * @param {Fill?} fill The fill object.
 * @override
 */
SvgGraphics.prototype.setElementFill = function(element, fill) {
  var svgElement = element.getElement();
  if (fill instanceof SolidFill) {
    svgElement.setAttribute('fill', fill.getColor());
    svgElement.setAttribute('fill-opacity', fill.getOpacity());
  } else if (fill instanceof LinearGradient) {
    // create a def key which is just a concat of all the relevant fields
    var defKey = 'lg-' + fill.getX1() + '-' + fill.getY1() + '-' +
        fill.getX2() + '-' + fill.getY2() + '-' + fill.getColor1() + '-' +
        fill.getColor2();
    // It seems that the SVG version accepts opacity where the VML does not

    var id = this.getDef(defKey);

    if (!id) {  // No def for this yet, create it
      // Create the gradient def entry (only linear gradient are supported)
      var gradient = this.createSvgElement_('linearGradient', {
        'x1': fill.getX1(),
        'y1': fill.getY1(),
        'x2': fill.getX2(),
        'y2': fill.getY2(),
        'gradientUnits': 'userSpaceOnUse'
      });

      var gstyle = 'stop-color:' + fill.getColor1();
      if (typeof fill.getOpacity1() === 'number') {
        gstyle += ';stop-opacity:' + fill.getOpacity1();
      }
      var stop1 =
          this.createSvgElement_('stop', {'offset': '0%', 'style': gstyle});
      gradient.appendChild(stop1);

      // LinearGradients don't have opacity in VML so implement that before
      // enabling the following code.
      // if (fill.getOpacity() != null) {
      //   gstyles += 'opacity:' + fill.getOpacity() + ';'
      // }
      gstyle = 'stop-color:' + fill.getColor2();
      if (typeof fill.getOpacity2() === 'number') {
        gstyle += ';stop-opacity:' + fill.getOpacity2();
      }
      var stop2 =
          this.createSvgElement_('stop', {'offset': '100%', 'style': gstyle});
      gradient.appendChild(stop2);

      // LinearGradients don't have opacity in VML so implement that before
      // enabling the following code.
      // if (fill.getOpacity() != null) {
      //   gstyles += 'opacity:' + fill.getOpacity() + ';'
      // }

      id = this.addDef(defKey, gradient);
    }

    // Link element to linearGradient definition
    svgElement.setAttribute('fill', 'url(#' + id + ')');
  } else {
    svgElement.setAttribute('fill', 'none');
  }
};


/**
 * Sets the stroke of the given element.
 * @param {StrokeAndFillElement} element The element wrapper.
 * @param {Stroke?} stroke The stroke object.
 * @override
 */
SvgGraphics.prototype.setElementStroke = function(
    element, stroke) {
  var svgElement = element.getElement();
  if (stroke) {
    svgElement.setAttribute('stroke', stroke.getColor());
    svgElement.setAttribute('stroke-opacity', stroke.getOpacity());

    var width = stroke.getWidth();
    if (typeof width === 'string' && width.indexOf('px') != -1) {
      svgElement.setAttribute(
          'stroke-width', parseFloat(width) / this.getPixelScaleX());
    } else {
      svgElement.setAttribute('stroke-width', width);
    }
  } else {
    svgElement.setAttribute('stroke', 'none');
  }
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
SvgGraphics.prototype.setElementTransform = function(
    element, x, y, angle, centerX, centerY) {
  element.getElement().setAttribute(
      'transform',
      'translate(' + x + ',' + y + ') rotate(' + angle + ' ' + centerX + ' ' +
          centerY + ')');
};


/**
 * Set the transformation of an element.
 * @param {GraphicsElement} element The element wrapper.
 * @param {!AffineTransform} affineTransform The
 *     transformation applied to this element.
 * @override
 */
SvgGraphics.prototype.setElementAffineTransform = function(
    element, affineTransform) {
  var t = affineTransform;
  var substr = [
    t.getScaleX(), t.getShearY(), t.getShearX(), t.getScaleY(),
    t.getTranslateX(), t.getTranslateY()
  ].join(',');
  element.getElement().setAttribute('transform', 'matrix(' + substr + ')');
};


/**
 * Creates the DOM representation of the graphics area.
 * @override
 */
SvgGraphics.prototype.createDom = function() {
  // Set up the standard attributes.
  var attributes =
      {'width': this.width, 'height': this.height, 'overflow': 'hidden'};

  var svgElement = this.createSvgElement_('svg', attributes);

  var groupElement = this.createSvgElement_('g');

  this.defsElement_ = this.createSvgElement_('defs');
  this.canvasElement = new SvgGroupElement(groupElement, this);

  svgElement.appendChild(this.defsElement_);
  svgElement.appendChild(groupElement);

  // Use the svgElement as the root element.
  this.setElementInternal(svgElement);

  // Set up the coordinate system.
  this.setViewBox_();
};


/**
 * Changes the coordinate system position.
 * @param {number} left The coordinate system left bound.
 * @param {number} top The coordinate system top bound.
 * @override
 */
SvgGraphics.prototype.setCoordOrigin = function(left, top) {
  this.coordLeft = left;
  this.coordTop = top;

  this.setViewBox_();
};


/**
 * Changes the coordinate size.
 * @param {number} coordWidth The coordinate width.
 * @param {number} coordHeight The coordinate height.
 * @override
 */
SvgGraphics.prototype.setCoordSize = function(
    coordWidth, coordHeight) {
  SvgGraphics.superClass_.setCoordSize.apply(this, arguments);
  this.setViewBox_();
};


/**
 * @return {string} The view box string.
 * @private
 */
SvgGraphics.prototype.getViewBox_ = function() {
  return this.coordLeft + ' ' + this.coordTop + ' ' +
      (this.coordWidth ? this.coordWidth + ' ' + this.coordHeight : '');
};


/**
 * Sets up the view box.
 * @private
 */
SvgGraphics.prototype.setViewBox_ = function() {
  if (this.coordWidth || this.coordLeft || this.coordTop) {
    this.getElement().setAttribute('preserveAspectRatio', 'none');
    if (this.useManualViewbox_) {
      this.updateManualViewBox_();
    } else {
      this.getElement().setAttribute('viewBox', this.getViewBox_());
    }
  }
};


/**
 * Updates the transform of the root element to fake a viewBox.  Should only
 * be called when useManualViewbox_ is set.
 * @private
 * @suppress {strictPrimitiveOperators} Part of the go/strict_warnings_migration
 */
SvgGraphics.prototype.updateManualViewBox_ = function() {
  if (!this.isInDocument() ||
      !(this.coordWidth || this.coordLeft || !this.coordTop)) {
    return;
  }

  var size = this.getPixelSize();
  if (size.width == 0) {
    // In Safari, invisible SVG is sometimes shown.  Explicitly hide it.
    this.getElement().style.visibility = 'hidden';
    return;
  }

  this.getElement().style.visibility = '';

  var offsetX = -this.coordLeft;
  var offsetY = -this.coordTop;
  var scaleX = size.width / this.coordWidth;
  var scaleY = size.height / this.coordHeight;

  this.canvasElement.getElement().setAttribute(
      'transform', 'scale(' + scaleX + ' ' + scaleY + ') ' +
          'translate(' + offsetX + ' ' + offsetY + ')');
};


/**
 * Change the size of the canvas.
 * @param {number} pixelWidth The width in pixels.
 * @param {number} pixelHeight The height in pixels.
 * @override
 */
SvgGraphics.prototype.setSize = function(
    pixelWidth, pixelHeight) {
  style.setSize(this.getElement(), pixelWidth, pixelHeight);
};


/** @override */
SvgGraphics.prototype.getPixelSize = function() {
  if (!userAgent.GECKO) {
    return this.isInDocument() ?
        style.getSize(this.getElement()) :
        SvgGraphics.base(this, 'getPixelSize');
  }

  // In Gecko, goog.style.getSize does not work for SVG elements.  We have to
  // compute the size manually if it is percentage based.
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
 * Remove all drawing elements from the graphics.
 * @override
 */
SvgGraphics.prototype.clear = function() {
  this.canvasElement.clear();
  dom.removeChildren(this.defsElement_);
  this.defs_ = {};
};


/**
 * Draw an ellipse.
 *
 * @param {number} cx Center X coordinate.
 * @param {number} cy Center Y coordinate.
 * @param {number} rx Radius length for the x-axis.
 * @param {number} ry Radius length for the y-axis.
 * @param {Stroke?} stroke Stroke object describing the
 *    stroke.
 * @param {Fill?} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper element
 *     to append to. If not specified, appends to the main canvas.
 *
 * @return {!EllipseElement} The newly created element.
 * @override
 */
SvgGraphics.prototype.drawEllipse = function(
    cx, cy, rx, ry, stroke, fill, opt_group) {
  var element = this.createSvgElement_(
      'ellipse', {'cx': cx, 'cy': cy, 'rx': rx, 'ry': ry});
  var wrapper =
      new SvgEllipseElement(element, this, stroke, fill);
  this.append_(wrapper, opt_group);
  return wrapper;
};


/**
 * Draw a rectangle.
 *
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 * @param {Stroke?} stroke Stroke object describing the
 *    stroke.
 * @param {Fill?} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper element
 *     to append to. If not specified, appends to the main canvas.
 *
 * @return {!RectElement} The newly created element.
 * @override
 */
SvgGraphics.prototype.drawRect = function(
    x, y, width, height, stroke, fill, opt_group) {
  var element = this.createSvgElement_(
      'rect', {'x': x, 'y': y, 'width': width, 'height': height});
  var wrapper = new SvgRectElement(element, this, stroke, fill);
  this.append_(wrapper, opt_group);
  return wrapper;
};


/**
 * Draw an image.
 *
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @param {number} width Width of the image.
 * @param {number} height Height of the image.
 * @param {string} src The source fo the image.
 * @param {GroupElement=} opt_group The group wrapper element
 *     to append to. If not specified, appends to the main canvas.
 *
 * @return {!ImageElement} The newly created image wrapped in a
 *     rectangle element.
 */
SvgGraphics.prototype.drawImage = function(
    x, y, width, height, src, opt_group) {
  var element = this.createSvgElement_('image', {
    'x': x,
    'y': y,
    'width': width,
    'height': height,
    'image-rendering': 'optimizeQuality',
    'preserveAspectRatio': 'none'
  });
  element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', src);
  var wrapper = new SvgImageElement(element, this);
  this.append_(wrapper, opt_group);
  return wrapper;
};


/**
 * Draw a text string vertically centered on a given line.
 *
 * @param {string} text The text to draw.
 * @param {number} x1 X coordinate of start of line.
 * @param {number} y1 Y coordinate of start of line.
 * @param {number} x2 X coordinate of end of line.
 * @param {number} y2 Y coordinate of end of line.
 * @param {string} align Horizontal alignment: left (default), center, right.
 * @param {Font} font Font describing the font properties.
 * @param {Stroke?} stroke Stroke object describing the
 *    stroke.
 * @param {Fill?} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper element
 *     to append to. If not specified, appends to the main canvas.
 *
 * @return {!TextElement} The newly created element.
 * @override
 */
SvgGraphics.prototype.drawTextOnLine = function(
    text, x1, y1, x2, y2, align, font, stroke, fill, opt_group) {
  var angle = Math.round(math.angle(x1, y1, x2, y2));
  var dx = x2 - x1;
  var dy = y2 - y1;
  var lineLength = Math.round(Math.sqrt(dx * dx + dy * dy));  // Length of line

  // SVG baseline is on the glyph's base line. We estimate it as 85% of the
  // font height. This is just a rough estimate, but do not have a better way.
  var fontSize = font.size;
  var attributes = {'font-family': font.family, 'font-size': fontSize};
  var baseline = Math.round(fontSize * 0.85);
  var textY = Math.round(y1 - (fontSize / 2) + baseline);
  var textX = x1;
  if (align == 'center') {
    textX += Math.round(lineLength / 2);
    attributes['text-anchor'] = 'middle';
  } else if (align == 'right') {
    textX += lineLength;
    attributes['text-anchor'] = 'end';
  }
  attributes['x'] = textX;
  attributes['y'] = textY;
  if (font.bold) {
    attributes['font-weight'] = 'bold';
  }
  if (font.italic) {
    attributes['font-style'] = 'italic';
  }
  if (angle != 0) {
    attributes['transform'] = 'rotate(' + angle + ' ' + x1 + ' ' + y1 + ')';
  }

  var element = this.createSvgElement_('text', attributes);
  element.appendChild(this.dom_.getDocument().createTextNode(text));

  // Bypass a Firefox-Mac bug where text fill is ignored. If text has no stroke,
  // set a stroke, otherwise the text will not be visible.
  if (stroke == null && userAgent.GECKO && userAgent.MAC) {
    var color = 'black';
    // For solid fills, use the fill color
    if (fill instanceof SolidFill) {
      color = fill.getColor();
    }
    stroke = new Stroke(1, color);
  }

  var wrapper = new SvgTextElement(element, this, stroke, fill);
  this.append_(wrapper, opt_group);
  return wrapper;
};


/**
 * Draw a path.
 *
 * @param {!Path} path The path object to draw.
 * @param {Stroke?} stroke Stroke object describing the
 *    stroke.
 * @param {Fill?} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper element
 *     to append to. If not specified, appends to the main canvas.
 *
 * @return {!PathElement} The newly created element.
 * @override
 */
SvgGraphics.prototype.drawPath = function(
    path, stroke, fill, opt_group) {
  var element = this.createSvgElement_(
      'path', {'d': SvgGraphics.getSvgPath(path)});
  var wrapper = new SvgPathElement(element, this, stroke, fill);
  this.append_(wrapper, opt_group);
  return wrapper;
};


/**
 * Returns a string representation of a logical path suitable for use in
 * an SVG element.
 *
 * @param {Path} path The logical path.
 * @return {string} The SVG path representation.
 * @suppress {deprecated} goog.graphics is deprecated.
 */
SvgGraphics.getSvgPath = function(path) {
  var list = [];
  path.forEachSegment(function(segment, args) {
    switch (segment) {
      case Path.Segment.MOVETO:
        list.push('M');
        Array.prototype.push.apply(list, args);
        break;
      case Path.Segment.LINETO:
        list.push('L');
        Array.prototype.push.apply(list, args);
        break;
      case Path.Segment.CURVETO:
        list.push('C');
        Array.prototype.push.apply(list, args);
        break;
      case Path.Segment.ARCTO:
        var extent = args[3];
        list.push(
            'A', args[0], args[1], 0, Math.abs(extent) > 180 ? 1 : 0,
            extent > 0 ? 1 : 0, args[4], args[5]);
        break;
      case Path.Segment.CLOSE:
        list.push('Z');
        break;
    }
  });
  return list.join(' ');
};


/**
 * Create an empty group of drawing elements.
 *
 * @param {GroupElement=} opt_group The group wrapper element
 *     to append to. If not specified, appends to the main canvas.
 *
 * @return {!GroupElement} The newly created group.
 * @override
 */
SvgGraphics.prototype.createGroup = function(opt_group) {
  var element = this.createSvgElement_('g');
  var parent = opt_group || this.canvasElement;
  parent.getElement().appendChild(element);
  return new SvgGroupElement(element, this);
};


/**
 * Measure and return the width (in pixels) of a given text string.
 * Text measurement is needed to make sure a text can fit in the allocated area.
 * The way text length is measured is by writing it into a div that is after
 * the visible area, measure the div width, and immediately erase the written
 * value.
 *
 * @override
 */
SvgGraphics.prototype.getTextWidth = function(text, font) {
  // TODO(user) Implement
  throw new Error("unimplemented method");
};


/**
 * Adds a definition of an element to the global definitions.
 * @param {string} defKey This is a key that should be unique in a way that
 *     if two definitions are equal the should have the same key.
 * @param {Element} defElement DOM element to add as a definition. It must
 *     have an id attribute set.
 * @return {string} The assigned id of the defElement.
 */
SvgGraphics.prototype.addDef = function(defKey, defElement) {
  if (defKey in this.defs_) {
    return this.defs_[defKey];
  }
  var id = SvgGraphics.DEF_ID_PREFIX_ +
      SvgGraphics.nextDefId_++;
  defElement.setAttribute('id', id);
  this.defs_[defKey] = id;

  // Add the def defElement of the defs list.
  var defs = this.defsElement_;
  defs.appendChild(defElement);
  return id;
};


/**
 * Returns the id of a definition element.
 * @param {string} defKey This is a key that should be unique in a way that
 *     if two definitions are equal the should have the same key.
 * @return {?string} The id of the found definition element or null if
 *     not found.
 */
SvgGraphics.prototype.getDef = function(defKey) {
  return defKey in this.defs_ ? this.defs_[defKey] : null;
};


/**
 * Removes a definition of an elemnt from the global definitions.
 * @param {string} defKey This is a key that should be unique in a way that
 *     if two definitions are equal they should have the same key.
 */
SvgGraphics.prototype.removeDef = function(defKey) {
  var id = this.getDef(defKey);
  if (id) {
    var element = this.dom_.getElement(id);
    this.defsElement_.removeChild(/** @type {!Node} */ (element));
    delete this.defs_[defKey];
  }
};


/** @override */
SvgGraphics.prototype.enterDocument = function() {
  var oldPixelSize = this.getPixelSize();
  SvgGraphics.superClass_.enterDocument.call(this);

  // Dispatch a resize if this is the first time the size value is accurate.
  if (!oldPixelSize) {
    this.dispatchEvent(EventType.RESIZE);
  }


  // For percentage based heights, listen for changes to size.
  if (this.useManualViewbox_) {
    var width = this.width;
    var height = this.height;

    if (typeof width == 'string' && width.indexOf('%') != -1 &&
        typeof height == 'string' && height.indexOf('%') != -1) {
      // SVG elements don't behave well with respect to size events, so we
      // resort to polling.
      this.handler_.listen(
          SvgGraphics.getResizeCheckTimer_(), Timer.TICK,
          this.updateManualViewBox_);
    }

    this.updateManualViewBox_();
  }
};


/** @override */
SvgGraphics.prototype.exitDocument = function() {
  SvgGraphics.superClass_.exitDocument.call(this);

  // Stop polling.
  if (this.useManualViewbox_) {
    this.handler_.unlisten(
        SvgGraphics.getResizeCheckTimer_(), Timer.TICK,
        this.updateManualViewBox_);
  }
};


/**
 * Disposes of the component by removing event handlers, detacing DOM nodes from
 * the document body, and removing references to them.
 * @override
 * @protected
 */
SvgGraphics.prototype.disposeInternal = function() {
  delete this.defs_;
  delete this.defsElement_;
  delete this.canvasElement;
  this.handler_.dispose();
  delete this.handler_;
  SvgGraphics.superClass_.disposeInternal.call(this);
};


/**
 * The centralized resize checking timer.
 * @type {Timer|undefined}
 * @private
 */
SvgGraphics.resizeCheckTimer_;


/**
 * @return {Timer} The centralized timer object used for interval timing.
 * @private
 */
SvgGraphics.getResizeCheckTimer_ = function() {
  if (!SvgGraphics.resizeCheckTimer_) {
    SvgGraphics.resizeCheckTimer_ = new Timer(400);
    SvgGraphics.resizeCheckTimer_.start();
  }

  return /** @type {Timer} */ (SvgGraphics.resizeCheckTimer_);
};


/** @override */
SvgGraphics.prototype.isDomClonable = function() {
  return true;
};
