/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Objects representing shapes drawn on a canvas.
 */

import * as array from '../array/array.js';

import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as safe from '../dom/safe.js';
import { EllipseElement } from './ellipseelement.js';
import { Font } from './font.js';
import { GroupElement } from './groupelement.js';
import { ImageElement } from './imageelement.js';
import { Path } from './path.js';
import { PathElement } from './pathelement.js';
import { RectElement } from './rectelement.js';
import { TextElement } from './textelement.js';
import { SafeHtml } from '../html/safehtml.js';
import * as uncheckedconversions from '../html/uncheckedconversions.js';
import * as math from '../math/math.js';
import * as googString from '../string/string.js';
import { Const } from '../string/const.js';
const {CanvasGraphics} = goog.requireType('goog.graphics.canvasgraphics');
const {Element:GraphicsElement} = goog.requireType('goog.graphics.element');
const {Fill} = goog.requireType('goog.graphics.fill');
const {Stroke} = goog.requireType('goog.graphics.stroke');



/**
 * Object representing a group of objects in a canvas.
 * This is an implementation of the GroupElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {CanvasGraphics} graphics The graphics creating
 *     this element.
 * @constructor
 * @extends {GroupElement}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 * @final
 */
export function CanvasGroupElement(graphics) {
 GroupElement.call(this, null, graphics);


 /**
  * Children contained by this group.
  * @type {Array<GraphicsElement>}
  * @private
  */
 this.children_ = [];
}
goog.inherits(CanvasGroupElement, GroupElement);


/**
 * Remove all drawing elements from the group.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGroupElement.prototype.clear = function() {
 if (this.children_.length) {
   this.children_.length = 0;
   this.getGraphics().redraw();
 }
};


/**
 * Set the size of the group element.
 * @param {number|string} width The width of the group element.
 * @param {number|string} height The height of the group element.
 * @override
 */
CanvasGroupElement.prototype.setSize = function(width, height) {
  // Do nothing.
};


/**
 * Append a child to the group.  Does not draw it
 * @param {GraphicsElement} element The child to append.
 */
CanvasGroupElement.prototype.appendChild = function(element) {
 this.children_.push(element);
};


/**
 * Draw the group.
 * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGroupElement.prototype.draw = function(ctx) {
 for (var i = 0, len = this.children_.length; i < len; i++) {
   this.getGraphics().drawElement(this.children_[i]);
 }
};


/**
 * Removes an element from the group.
 * @param {!GraphicsElement} elem the element to remove.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasGroupElement.prototype.removeElement = function(elem) {
 array.removeIf(this.children_, function(child) {
  // If the child has children (and thus is a group element)
  // call removeElement on that group
  if (child.children_) {
    child.removeElement(elem);
    return false;
  } else {
    return child === elem;
  }
 });
};



/**
 * Thin wrapper for canvas ellipse elements.
 * This is an implementation of the EllipseElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {CanvasGraphics} graphics  The graphics creating
 *     this element.
 * @param {number} cx Center X coordinate.
 * @param {number} cy Center Y coordinate.
 * @param {number} rx Radius length for the x-axis.
 * @param {number} ry Radius length for the y-axis.
 * @param {Stroke} stroke The stroke to use for this element.
 * @param {Fill} fill The fill to use for this element.
 * @constructor
 * @extends {EllipseElement}
 * @final
 */
export function CanvasEllipseElement(element, graphics, cx, cy, rx, ry, stroke, fill) {
 EllipseElement.call(this, element, graphics, stroke, fill);

 /**
  * X coordinate of the ellipse center.
  * @type {number}
  * @private
  */
 this.cx_ = cx;


 /**
  * Y coordinate of the ellipse center.
  * @type {number}
  * @private
  */
 this.cy_ = cy;


 /**
  * Radius length for the x-axis.
  * @type {number}
  * @private
  */
 this.rx_ = rx;


 /**
  * Radius length for the y-axis.
  * @type {number}
  * @private
  */
 this.ry_ = ry;


 /**
   * Internal path approximating an ellipse.
   * @type {Path}
   * @private
   */
 this.path_ = new Path();
 this.setUpPath_();

 /**
    * Internal path element that actually does the drawing.
    * @type {CanvasPathElement}
    * @private
    */
 this.pathElement_ = new CanvasPathElement(
     null, graphics, this.path_, stroke, fill);
}
goog.inherits(CanvasEllipseElement, EllipseElement);


/**
 * Sets up the path.
 * @private
 */
CanvasEllipseElement.prototype.setUpPath_ = function() {
 this.path_.clear();
 this.path_.moveTo(
     this.cx_ + math.angleDx(0, this.rx_),
     this.cy_ + math.angleDy(0, this.ry_));
 this.path_.arcTo(this.rx_, this.ry_, 0, 360);
 this.path_.close();
};


/**
 * Update the center point of the ellipse.
 * @param {number} cx Center X coordinate.
 * @param {number} cy Center Y coordinate.
 * @override
 */
CanvasEllipseElement.prototype.setCenter = function(cx, cy) {
 this.cx_ = cx;
 this.cy_ = cy;
 this.setUpPath_();
 this.pathElement_.setPath(/** @type {!Path} */ (this.path_));
};


/**
 * Update the radius of the ellipse.
 * @param {number} rx Center X coordinate.
 * @param {number} ry Center Y coordinate.
 * @override
 */
CanvasEllipseElement.prototype.setRadius = function(rx, ry) {
 this.rx_ = rx;
 this.ry_ = ry;
 this.setUpPath_();
 this.pathElement_.setPath(/** @type {!Path} */ (this.path_));
};


/**
 * Draw the ellipse.  Should be treated as package scope.
 * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
 */
CanvasEllipseElement.prototype.draw = function(ctx) {
 this.pathElement_.draw(ctx);
};



/**
 * Thin wrapper for canvas rectangle elements.
 * This is an implementation of the RectElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {CanvasGraphics} graphics The graphics creating
 *     this element.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @param {number} w Width of rectangle.
 * @param {number} h Height of rectangle.
 * @param {Stroke} stroke The stroke to use for this element.
 * @param {Fill} fill The fill to use for this element.
 * @constructor
 * @extends {RectElement}
 * @final
 */
export function CanvasRectElement(element, graphics, x, y, w, h, stroke, fill) {
 RectElement.call(this, element, graphics, stroke, fill);

 /**
  * X coordinate of the top left corner.
  * @type {number}
  * @private
  */
 this.x_ = x;


 /**
  * Y coordinate of the top left corner.
  * @type {number}
  * @private
  */
 this.y_ = y;


 /**
  * Width of the rectangle.
  * @type {number}
  * @private
  */
 this.w_ = w;


 /**
  * Height of the rectangle.
  * @type {number}
  * @private
  */
 this.h_ = h;
}
goog.inherits(CanvasRectElement, RectElement);


/**
 * Update the position of the rectangle.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasRectElement.prototype.setPosition = function(x, y) {
 this.x_ = x;
 this.y_ = y;
 if (this.drawn_) {
   this.getGraphics().redraw();
 }
};


/**
 * Whether the rectangle has been drawn yet.
 * @type {boolean}
 * @private
 */
CanvasRectElement.prototype.drawn_ = false;


/**
 * Update the size of the rectangle.
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasRectElement.prototype.setSize = function(width, height) {
 this.w_ = width;
 this.h_ = height;
 if (this.drawn_) {
   this.getGraphics().redraw();
 }
};


/**
 * Draw the rectangle.  Should be treated as package scope.
 * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
 */
CanvasRectElement.prototype.draw = function(ctx) {
 this.drawn_ = true;
 ctx.beginPath();
 ctx.moveTo(this.x_, this.y_);
 ctx.lineTo(this.x_, this.y_ + this.h_);
 ctx.lineTo(this.x_ + this.w_, this.y_ + this.h_);
 ctx.lineTo(this.x_ + this.w_, this.y_);
 ctx.closePath();
};



/**
 * Thin wrapper for canvas path elements.
 * This is an implementation of the PathElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {CanvasGraphics} graphics The graphics creating
 *     this element.
 * @param {!Path} path The path object to draw.
 * @param {Stroke} stroke The stroke to use for this element.
 * @param {Fill} fill The fill to use for this element.
 * @constructor
 * @extends {PathElement}
 * @final
 */
export function CanvasPathElement(element, graphics, path, stroke, fill) {
 PathElement.call(this, element, graphics, stroke, fill);

 this.setPath(path);
}
goog.inherits(CanvasPathElement, PathElement);


/**
 * Whether the shape has been drawn yet.
 * @type {boolean}
 * @private
 */
CanvasPathElement.prototype.drawn_ = false;


/**
 * The path to draw.
 * @type {Path}
 * @private
 */
CanvasPathElement.prototype.path_;


/**
 * Update the underlying path.
 * @param {!Path} path The path object to draw.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasPathElement.prototype.setPath = function(path) {
 this.path_ =
     path.isSimple() ? path : Path.createSimplifiedPath(path);
 if (this.drawn_) {
   this.getGraphics().redraw();
 }
};


/**
 * Draw the path.  Should be treated as package scope.
 * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
 * @suppress {deprecated} goog.graphics is deprecated.
 */
CanvasPathElement.prototype.draw = function(ctx) {
 this.drawn_ = true;

 ctx.beginPath();
 this.path_.forEachSegment(function(segment, args) {
  switch (segment) {
    case Path.Segment.MOVETO:
      ctx.moveTo(args[0], args[1]);
      break;
    case Path.Segment.LINETO:
      for (var i = 0; i < args.length; i += 2) {
        ctx.lineTo(args[i], args[i + 1]);
      }
      break;
    case Path.Segment.CURVETO:
      for (var i = 0; i < args.length; i += 6) {
        ctx.bezierCurveTo(
            args[i], args[i + 1], args[i + 2], args[i + 3], args[i + 4],
            args[i + 5]);
      }
      break;
    case Path.Segment.ARCTO:
      throw new Error('Canvas paths cannot contain arcs');
    case Path.Segment.CLOSE:
      ctx.closePath();
      break;
  }
 });
};



/**
 * Thin wrapper for canvas text elements.
 * This is an implementation of the TextElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {!CanvasGraphics} graphics The graphics creating
 *     this element.
 * @param {string} text The text to draw.
 * @param {number} x1 X coordinate of start of line.
 * @param {number} y1 Y coordinate of start of line.
 * @param {number} x2 X coordinate of end of line.
 * @param {number} y2 Y coordinate of end of line.
 * @param {?string} align Horizontal alignment: left (default), center, right.
 * @param {!Font} font Font describing the font properties.
 * @param {Stroke} stroke The stroke to use for this element.
 * @param {Fill} fill The fill to use for this element.
 * @constructor
 * @extends {TextElement}
 * @final
 */
export function CanvasTextElement(graphics, text, x1, y1, x2, y2, align, font, stroke, fill) {
 var element = dom.createDom(
     TagName.DIV,
     {'style': 'display:table;position:absolute;padding:0;margin:0;border:0'});
 TextElement.call(this, element, graphics, stroke, fill);

 /**
  * The text to draw.
  * @type {string}
  * @private
  */
 this.text_ = text;

 /**
  * X coordinate of the start of the line the text is drawn on.
  * @type {number}
  * @private
  */
 this.x1_ = x1;

 /**
  * Y coordinate of the start of the line the text is drawn on.
  * @type {number}
  * @private
  */
 this.y1_ = y1;

 /**
  * X coordinate of the end of the line the text is drawn on.
  * @type {number}
  * @private
  */
 this.x2_ = x2;

 /**
  * Y coordinate of the end of the line the text is drawn on.
  * @type {number}
  * @private
  */
 this.y2_ = y2;

 /**
  * Horizontal alignment: left (default), center, right.
  * @type {string}
  * @private
  */
 this.align_ = align || 'left';

 /**
   * Font object describing the font properties.
   * @type {Font}
   * @private
   */
 this.font_ = font;

 /**
  * The inner element that contains the text.
  * @type {Element}
  * @private
  */
 this.innerElement_ = dom.createDom(
     TagName.DIV,
     {'style': 'display:table-cell;padding: 0;margin: 0;border: 0'});

 this.updateStyle_();
 this.updateText_();

 // Append to the DOM.
 graphics.getElement().appendChild(element);
 element.appendChild(this.innerElement_);
}
goog.inherits(CanvasTextElement, TextElement);


/**
 * Update the displayed text of the element.
 * @param {string} text The text to draw.
 * @override
 */
CanvasTextElement.prototype.setText = function(text) {
 this.text_ = text;
 this.updateText_();
};


/**
 * Sets the fill for this element.
 * @param {Fill} fill The fill object.
 * @override
 */
CanvasTextElement.prototype.setFill = function(fill) {
 this.fill = fill;
 var element = this.getElement();
 if (element) {
   /** @suppress {strictMissingProperties} Added to tighten compiler checks */
   element.style.color = fill.getColor() || fill.getColor1();
 }
};


/**
 * Sets the stroke for this element.
 * @param {Stroke} stroke The stroke object.
 * @override
 */
CanvasTextElement.prototype.setStroke = function(stroke) {
  // Ignore stroke
};


/**
 * Draw the text.  Should be treated as package scope.
 * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
 */
CanvasTextElement.prototype.draw = function(ctx) {
  // Do nothing - the text is already drawn.
};


/**
 * Update the styles of the DIVs.
 * @private
 */
CanvasTextElement.prototype.updateStyle_ = function() {
 var x1 = this.x1_;
 var x2 = this.x2_;
 var y1 = this.y1_;
 var y2 = this.y2_;
 var align = this.align_;
 var font = this.font_;
 var style = this.getElement().style;
 var scaleX = this.getGraphics().getPixelScaleX();
 var scaleY = this.getGraphics().getPixelScaleY();

 if (x1 == x2) {
   // Special case vertical text
   style.lineHeight = '90%';

   this.innerElement_.style.verticalAlign =
       align == 'center' ? 'middle' : align == 'left' ?
                           (y1 < y2 ? 'top' : 'bottom') :
                           y1 < y2 ? 'bottom' : 'top';
   style.textAlign = 'center';

   var w = font.size * scaleX;
   style.top = Math.round(Math.min(y1, y2) * scaleY) + 'px';
   style.left = Math.round((x1 - w / 2) * scaleX) + 'px';
   style.width = Math.round(w) + 'px';
   style.height = Math.abs(y1 - y2) * scaleY + 'px';

   style.fontSize = font.size * 0.6 * scaleY + 'pt';
 } else {
   style.lineHeight = '100%';
   this.innerElement_.style.verticalAlign = 'top';
   style.textAlign = align;

   style.top = Math.round(((y1 + y2) / 2 - font.size * 2 / 3) * scaleY) + 'px';
   style.left = Math.round(x1 * scaleX) + 'px';
   style.width = Math.round(Math.abs(x2 - x1) * scaleX) + 'px';
   style.height = 'auto';

   style.fontSize = font.size * scaleY + 'pt';
 }

 style.fontWeight = font.bold ? 'bold' : 'normal';
 style.fontStyle = font.italic ? 'italic' : 'normal';
 style.fontFamily = font.family;

 var fill = this.getFill();
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 style.color = fill.getColor() || fill.getColor1();
};


/**
 * Update the text content.
 * @private
 */
CanvasTextElement.prototype.updateText_ = function() {
 if (this.x1_ == this.x2_) {
   // Special case vertical text
   var html = this.text_.split('')
                  .map(function(entry) {
    return googString.htmlEscape(entry);
   })
                  .join('<br>');
   // Creating a SafeHtml for each character would be quite expensive, and it's
   // obvious that this is safe, so an unchecked conversion is appropriate.
   var safeHtml =
       uncheckedconversions
           .safeHtmlFromStringKnownToSatisfyTypeContract(
               Const.from('Concatenate escaped chars and <br>'),
               html);
   safe.setInnerHtml(
       /** @type {!Element} */ (this.innerElement_), safeHtml);
 } else {
   safe.setInnerHtml(
       /** @type {!Element} */ (this.innerElement_),
       SafeHtml.htmlEscape(this.text_));
 }
};



/**
 * Thin wrapper for canvas image elements.
 * This is an implementation of the ImageElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {CanvasGraphics} graphics The graphics creating
 *     this element.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @param {number} w Width of rectangle.
 * @param {number} h Height of rectangle.
 * @param {string} src Source of the image.
 * @constructor
 * @extends {ImageElement}
 * @final
 */
export function CanvasImageElement(element, graphics, x, y, w, h, src) {
 ImageElement.call(this, element, graphics);

 /**
  * X coordinate of the top left corner.
  * @type {number}
  * @private
  */
 this.x_ = x;


 /**
  * Y coordinate of the top left corner.
  * @type {number}
  * @private
  */
 this.y_ = y;


 /**
  * Width of the rectangle.
  * @type {number}
  * @private
  */
 this.w_ = w;


 /**
  * Height of the rectangle.
  * @type {number}
  * @private
  */
 this.h_ = h;


 /**
  * URL of the image source.
  * @type {string}
  * @private
  */
 this.src_ = src;
}
goog.inherits(CanvasImageElement, ImageElement);


/**
 * Whether the image has been drawn yet.
 * @type {boolean}
 * @private
 */
CanvasImageElement.prototype.drawn_ = false;


/**
 * Update the position of the image.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasImageElement.prototype.setPosition = function(x, y) {
 this.x_ = x;
 this.y_ = y;
 if (this.drawn_) {
   this.getGraphics().redraw();
 }
};


/**
 * Update the size of the image.
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasImageElement.prototype.setSize = function(width, height) {
 this.w_ = width;
 this.h_ = height;
 if (this.drawn_) {
   this.getGraphics().redraw();
 }
};


/**
 * Update the source of the image.
 * @param {string} src Source of the image.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasImageElement.prototype.setSource = function(src) {
 this.src_ = src;
 if (this.drawn_) {
   // TODO(robbyw): Probably need to reload the image here.
   this.getGraphics().redraw();
 }
};


/**
 * Draw the image.  Should be treated as package scope.
 * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasImageElement.prototype.draw = function(ctx) {
 if (this.img_) {
   if (this.w_ && this.h_) {
     // If the image is already loaded, draw it.
     ctx.drawImage(this.img_, this.x_, this.y_, this.w_, this.h_);
   }
   this.drawn_ = true;

 } else {
   // Otherwise, load it.
   var img = new Image();
   img.onload = goog.bind(this.handleImageLoad_, this, img);
   // TODO(robbyw): Handle image load errors.
   img.src = this.src_;
 }
};


/**
 * Handle an image load.
 * @param {Element} img The image element that finished loading.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CanvasImageElement.prototype.handleImageLoad_ = function(img) {
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 this.img_ = img;

 // TODO(robbyw): Add a small delay to catch batched images
 this.getGraphics().redraw();
};
