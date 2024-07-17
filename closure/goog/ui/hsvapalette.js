/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An HSVA (hue/saturation/value/alpha) color palette/picker
 * implementation.
 * Without the styles from the demo css file, only a hex color label and input
 * field show up.
 *
 * @see ../demos/hsvapalette.html
 */

import * as array from '../array/array.js';

import * as colorAlpha from '../color/alpha.js';
import { TagName } from '../dom/tagname.js';
import * as events from '../events/events.js';
import { EventType } from '../events/eventtype.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
import { HsvPalette } from './hsvpalette.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { Event } = goog.requireType('goog.events.event');
const { Rect } = goog.requireType('goog.math.rect');



/**
 * Creates an HSVA palette. Allows a user to select the hue, saturation,
 * value/brightness and alpha/opacity.
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @param {string=} opt_color Optional initial color, without alpha (default is
 *     red).
 * @param {number=} opt_alpha Optional initial alpha (default is 1).
 * @param {string=} opt_class Optional base for creating classnames (default is
 *     'goog-hsva-palette').
 * @extends {HsvPalette}
 * @constructor
 * @final
 */
export function HsvaPalette(opt_domHelper, opt_color, opt_alpha, opt_class) {
  HsvaPalette.base(
      this, 'constructor', opt_domHelper, opt_color, opt_class);

  /**
   * Alpha transparency of the currently selected color, in [0, 1]. When
   * undefined, the palette will behave as a non-transparent HSV palette,
   * assuming full opacity.
   * @type {number}
   * @private
   */
  this.alpha_ = (opt_alpha !== undefined) ? opt_alpha : 1;

  /**
   * @override
   */
  this.className = opt_class || goog.getCssName('goog-hsva-palette');
}
goog.inherits(HsvaPalette, HsvPalette);


/**
 * DOM element representing the alpha background image.
 * @type {HTMLElement}
 * @private
 */
HsvaPalette.prototype.aImageEl_;


/**
 * DOM element representing the alpha handle.
 * @type {HTMLElement}
 * @private
 */
HsvaPalette.prototype.aHandleEl_;


/**
 * DOM element representing the swatch backdrop image.
 * @type {Element}
 * @private
 */
HsvaPalette.prototype.swatchBackdropEl_;


/** @override */
HsvaPalette.prototype.getAlpha = function() {
  return this.alpha_;
};


/**
 * Sets which color is selected and update the UI. The passed color should be
 * in #rrggbb format. The alpha value will be set to 1.
 * @param {number} alpha The selected alpha value, in [0, 1].
 */
HsvaPalette.prototype.setAlpha = function(alpha) {
  this.setColorAlphaHelper_(this.color, alpha);
};


/**
 * Sets which color is selected and update the UI. The passed color should be
 * in #rrggbb format. The alpha value will be set to 1.
 * @param {string} color The selected color.
 * @override
 */
HsvaPalette.prototype.setColor = function(color) {
  this.setColorAlphaHelper_(color, 1);
};


/**
 * Gets the color that is currently selected in this color picker, in #rrggbbaa
 * format.
 * @return {string} The string of the selected color with alpha.
 */
HsvaPalette.prototype.getColorRgbaHex = function() {
  var alphaHex = Math.floor(this.alpha_ * 255).toString(16);
  return this.color + (alphaHex.length == 1 ? '0' + alphaHex : alphaHex);
};


/**
 * Sets which color is selected and update the UI. The passed color should be
 * in #rrggbbaa format. The alpha value will be set to 1.
 * @param {string} color The selected color with alpha.
 */
HsvaPalette.prototype.setColorRgbaHex = function(color) {
  var parsed = HsvaPalette.parseColorRgbaHex_(color);
  this.setColorAlphaHelper_(parsed[0], parsed[1]);
};


/**
 * Sets which color and alpha value are selected and update the UI. The passed
 * color should be in #rrggbb format.
 * @param {string} color The selected color in #rrggbb format.
 * @param {number} alpha The selected alpha value, in [0, 1].
 * @private
 */
HsvaPalette.prototype.setColorAlphaHelper_ = function(color, alpha) {
  var colorChange = this.color != color;
  var alphaChange = this.alpha_ != alpha;
  this.alpha_ = alpha;
  this.color = color;
  if (colorChange) {
    // This is to prevent multiple event dispatches.
    this.setColorInternal(color);
  }
  if (colorChange || alphaChange) {
    this.updateUi();
    this.dispatchEvent(Component.ComponentEventType.ACTION);
  }
};


/** @override */
HsvaPalette.prototype.createDom = function() {
  HsvaPalette.base(this, 'createDom');

  var dom = this.getDomHelper();
  this.aImageEl_ = /** @type {!HTMLElement} */ (
      dom.createDom(
          TagName.DIV, goog.getCssName(this.className, 'a-image')));
  this.aHandleEl_ = /** @type {!HTMLElement} */ (
      dom.createDom(
          TagName.DIV, goog.getCssName(this.className, 'a-handle')));
  this.swatchBackdropEl_ = dom.createDom(
      TagName.DIV, goog.getCssName(this.className, 'swatch-backdrop'));
  var element = this.getElement();
  dom.appendChild(element, this.aImageEl_);
  dom.appendChild(element, this.aHandleEl_);
  dom.appendChild(element, this.swatchBackdropEl_);
};


/** @override */
HsvaPalette.prototype.disposeInternal = function() {
  HsvaPalette.base(this, 'disposeInternal');

  delete this.aImageEl_;
  delete this.aHandleEl_;
  delete this.swatchBackdropEl_;
};


/** @override */
HsvaPalette.prototype.updateUi = function() {
  HsvaPalette.base(this, 'updateUi');
  if (this.isInDocument()) {
    var a = this.alpha_ * 255;
    var top = this.aImageEl_.offsetTop -
        Math.floor(this.aHandleEl_.offsetHeight / 2) +
        this.aImageEl_.offsetHeight * ((255 - a) / 255);
    this.aHandleEl_.style.top = top + 'px';
    this.aImageEl_.style.backgroundColor = this.color;
    style.setOpacity(this.swatchElement, a / 255);
  }
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
HsvaPalette.prototype.updateInput = function() {
  if (!array.equals(
          [this.color, this.alpha_],
          HsvaPalette.parseUserInput_(this.inputElement.value))) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.inputElement.value = this.getColorRgbaHex();
  }
};


/** @override */
HsvaPalette.prototype.handleMouseDown = function(e) {
  HsvaPalette.base(this, 'handleMouseDown', e);
  if (e.target == this.aImageEl_ || e.target == this.aHandleEl_) {
    // Setup value change listeners
    var b = style.getBounds(this.valueBackgroundImageElement);
    this.handleMouseMoveA_(b, e);
    this.mouseMoveListener = events.listen(
        this.getDomHelper().getDocument(), EventType.MOUSEMOVE,
        goog.bind(this.handleMouseMoveA_, this, b));
    this.mouseUpListener = events.listen(
        this.getDomHelper().getDocument(), EventType.MOUSEUP,
        this.handleMouseUp, false, this);
  }
};


/**
 * Handles mousemove events on the document once a drag operation on the alpha
 * slider has started.
 * @param {Rect} b Boundaries of the value slider object at the start
 *     of the drag operation.
 * @param {Event} e Event object.
 * @private
 */
HsvaPalette.prototype.handleMouseMoveA_ = function(b, e) {
  e.preventDefault();
  var vportPos = this.getDomHelper().getDocumentScroll();
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var newA =
      (b.top + b.height -
       Math.min(Math.max(vportPos.y + e.clientY, b.top), b.top + b.height)) /
      b.height;
  this.setAlpha(newA);
};


/** @override */
HsvaPalette.prototype.handleInput = function(e) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var parsed = HsvaPalette.parseUserInput_(this.inputElement.value);
  if (parsed) {
    this.setColorAlphaHelper_(parsed[0], parsed[1]);
  }
};


/**
 * Parses an #rrggbb or #rrggbbaa color string.
 * @param {string} value User-entered color value.
 * @return {Array<?>} A two element array [color, alpha], where color is
 *     #rrggbb and alpha is in [0, 1]. Null if the argument was invalid.
 * @private
 */
HsvaPalette.parseUserInput_ = function(value) {
  if (/^#?[0-9a-f]{8}$/i.test(value)) {
    return HsvaPalette.parseColorRgbaHex_(value);
  } else if (/^#?[0-9a-f]{6}$/i.test(value)) {
    return [value, 1];
  }
  return null;
};


/**
 * Parses a #rrggbbaa color string.
 * @param {string} color The color and alpha in #rrggbbaa format.
 * @return {!Array<?>} A two element array [color, alpha], where color is
 *     #rrggbb and alpha is in [0, 1].
 * @private
 */
HsvaPalette.parseColorRgbaHex_ = function(color) {
  var hex = colorAlpha.parse(color).hex;
  return [
    colorAlpha.extractHexColor(hex),
    parseInt(colorAlpha.extractAlpha(hex), 16) / 255
  ];
};
