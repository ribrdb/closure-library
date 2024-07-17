/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An HSV (hue/saturation/value) color palette/picker
 * implementation. Inspired by examples like
 * http://johndyer.name/lab/colorpicker/ and the author's initial work. This
 * control allows for more control in picking colors than a simple swatch-based
 * palette. Without the styles from the demo css file, only a hex color label
 * and input field show up.
 *
 * @see ../demos/hsvpalette.html
 */

import * as googColor from '../color/color.js';

import { InputType } from '../dom/inputtype.js';
import { TagName } from '../dom/tagname.js';
import * as events from '../events/events.js';
import { EventType } from '../events/eventtype.js';
import { InputHandler } from '../events/inputhandler.js';
import * as style from '../style/style.js';
import * as bidi from '../style/bidi.js';
import { Component } from './component.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { Event } = goog.requireType('goog.events.event');
const { Rect } = goog.requireType('goog.math.rect');



/**
 * Creates an HSV palette. Allows a user to select the hue, saturation and
 * value/brightness.
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @param {string=} opt_color Optional initial color (default is red).
 * @param {string=} opt_class Optional base for creating classnames (default is
 *     goog.getCssName('goog-hsv-palette')).
 * @extends {Component}
 * @constructor
 */
export function HsvPalette(opt_domHelper, opt_color, opt_class) {
 Component.call(this, opt_domHelper);

 this.setColorInternal(opt_color || '#f00');

 /**
  * The base class name for the component.
  * @type {string}
  * @protected
  */
 this.className = opt_class || goog.getCssName('goog-hsv-palette');

 /**
  * The document which is being listened to.
  * type {HTMLDocument}
  * @private
  */
 this.document_ = this.getDomHelper().getDocument();
}
goog.inherits(HsvPalette, Component);
// TODO(user): Make this inherit from goog.ui.Control and split this into
// a control and a renderer.


/**
 * @desc Label for an input field where a user can enter a hexadecimal color
 * specification, such as #ff0000 for red.
 * @private
 */
HsvPalette.MSG_HSV_PALETTE_HEX_COLOR_ = goog.getMsg('Hex color');


/**
 * DOM element representing the hue/saturation background image.
 * @type {HTMLElement}
 * @private
 */
HsvPalette.prototype.hsImageEl_;


/**
 * DOM element representing the hue/saturation handle.
 * @type {HTMLElement}
 * @private
 */
HsvPalette.prototype.hsHandleEl_;


/**
 * DOM element representing the value background image.
 * @type {HTMLElement}
 * @protected
 */
HsvPalette.prototype.valueBackgroundImageElement;


/**
 * DOM element representing the value handle.
 * @type {HTMLElement}
 * @private
 */
HsvPalette.prototype.vHandleEl_;


/**
 * DOM element representing the current color swatch.
 * @type {Element}
 * @protected
 */
HsvPalette.prototype.swatchElement;


/**
 * DOM element representing the hex color input text field.
 * @type {Element}
 * @protected
 */
HsvPalette.prototype.inputElement;


/**
 * Input handler object for the hex value input field.
 * @type {InputHandler}
 * @private
 */
HsvPalette.prototype.inputHandler_;


/**
 * Listener key for the mousemove event (during a drag operation).
 * @type {events.Key}
 * @protected
 */
HsvPalette.prototype.mouseMoveListener;


/**
 * Listener key for the mouseup event (during a drag operation).
 * @type {events.Key}
 * @protected
 */
HsvPalette.prototype.mouseUpListener;


/** @private {!googColor.Hsv} */
HsvPalette.prototype.hsv_;


/**
 * Hex representation of the color.
 * @protected {string}
 */
HsvPalette.prototype.color;


/**
 * Gets the color that is currently selected in this color picker.
 * @return {string} The string of the selected color.
 */
HsvPalette.prototype.getColor = function() {
 return this.color;
};


/**
 * Alpha transparency of the currently selected color, in [0, 1].
 * For the HSV palette this always returns 1. The HSVA palette overrides
 * this method.
 * @return {number} The current alpha value.
 */
HsvPalette.prototype.getAlpha = function() {
 return 1;
};


/**
 * Updates the text entry field.
 * @protected
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
HsvPalette.prototype.updateInput = function() {
 var parsed;
 try {
   parsed = googColor.parse(this.inputElement.value).hex;
 } catch (e) {
   // ignore
 }
 if (this.color != parsed) {
   this.inputElement.value = this.color;
 }
};


/**
 * Sets which color is selected and update the UI.
 * @param {string} color The selected color.
 * @param {boolean=} opt_disableDispatchEvent (optional) Whether the event
 * should not be fired.
 */
HsvPalette.prototype.setColor = function(
    color, opt_disableDispatchEvent) {
 if (color != this.color) {
   this.setColorInternal(color);
   this.updateUi();
   if (!opt_disableDispatchEvent) {
     this.dispatchEvent(Component.ComponentEventType.ACTION);
   }
 }
};


/**
 * Sets which color is selected.
 * @param {string} color The selected color.
 * @protected
 */
HsvPalette.prototype.setColorInternal = function(color) {
 var rgbHex = googColor.parse(color).hex;
 var rgbArray = googColor.hexToRgb(rgbHex);
 this.hsv_ = googColor.rgbArrayToHsv(rgbArray);
 // Hue is divided by 360 because the documentation for goog.color is currently
 // incorrect.
 // TODO(user): Fix this, see http://1324469 .
 this.hsv_[0] = this.hsv_[0] / 360;
 this.color = rgbHex;
};


/**
 * Alters the hue, saturation, and/or value of the currently selected color and
 * updates the UI.
 * @param {?number=} opt_hue (optional) hue in [0, 1].
 * @param {?number=} opt_saturation (optional) saturation in [0, 1].
 * @param {?number=} opt_value (optional) value in [0, 255].
 */
HsvPalette.prototype.setHsv = function(
    opt_hue, opt_saturation, opt_value) {
 if (opt_hue != null || opt_saturation != null || opt_value != null) {
   this.setHsv_(opt_hue, opt_saturation, opt_value);
   this.updateUi();
   this.dispatchEvent(Component.ComponentEventType.ACTION);
 }
};


/**
 * Alters the hue, saturation, and/or value of the currently selected color.
 * @param {?number=} opt_hue (optional) hue in [0, 1].
 * @param {?number=} opt_saturation (optional) saturation in [0, 1].
 * @param {?number=} opt_value (optional) value in [0, 255].
 * @private
 */
HsvPalette.prototype.setHsv_ = function(
    opt_hue, opt_saturation, opt_value) {
 this.hsv_[0] = (opt_hue != null) ? opt_hue : this.hsv_[0];
 this.hsv_[1] = (opt_saturation != null) ? opt_saturation : this.hsv_[1];
 this.hsv_[2] = (opt_value != null) ? opt_value : this.hsv_[2];
 // Hue is multiplied by 360 because the documentation for goog.color is
 // currently incorrect.
 // TODO(user): Fix this, see http://1324469 .
 this.color = googColor.hsvArrayToHex(
     [this.hsv_[0] * 360, this.hsv_[1], this.hsv_[2]]);
};


/**
 * HsvPalettes cannot be used to decorate pre-existing html, since the
 * structure they build is fairly complicated.
 * @param {Element} element Element to decorate.
 * @return {boolean} Returns always false.
 * @override
 */
HsvPalette.prototype.canDecorate = function(element) {
 return false;
};


/** @override */
HsvPalette.prototype.createDom = function() {
 var dom = this.getDomHelper();
 var noalpha = '';

 var backdrop = dom.createDom(
     TagName.DIV, goog.getCssName(this.className, 'hs-backdrop'));

 this.hsHandleEl_ = /** @type {!HTMLElement} */ (
     dom.createDom(
         TagName.DIV, goog.getCssName(this.className, 'hs-handle')));

 this.hsImageEl_ = /** @type {!HTMLElement} */ (
     dom.createDom(
         TagName.DIV, goog.getCssName(this.className, 'hs-image'),
         this.hsHandleEl_));

 this.valueBackgroundImageElement = /** @type {!HTMLElement} */ (
     dom.createDom(
         TagName.DIV, goog.getCssName(this.className, 'v-image')));

 this.vHandleEl_ = /** @type {!HTMLElement} */ (
     dom.createDom(
         TagName.DIV, goog.getCssName(this.className, 'v-handle')));

 this.swatchElement = dom.createDom(
     TagName.DIV, goog.getCssName(this.className, 'swatch'));

 this.inputElement = dom.createDom(TagName.INPUT, {
   'class': goog.getCssName(this.className, 'input'),
   'aria-label': HsvPalette.MSG_HSV_PALETTE_HEX_COLOR_,
   'type': InputType.TEXT,
   'dir': 'ltr'
 });
 // Spellcheck is not necessary, so setting it to false on the inputElement.
 this.inputElement.spellcheck = false;

 var labelElement =
     dom.createDom(TagName.LABEL, null, this.inputElement);

 var element = dom.createDom(
     TagName.DIV, this.className + noalpha, backdrop, this.hsImageEl_,
     this.valueBackgroundImageElement, this.vHandleEl_, this.swatchElement,
     labelElement);

 this.setElementInternal(element);

 // TODO(arv): Set tabIndex
};


/**
 * Renders the color picker inside the provided element. This will override the
 * current content of the element.
 * @override
 */
HsvPalette.prototype.enterDocument = function() {
 HsvPalette.superClass_.enterDocument.call(this);

 // TODO(user): Accessibility.

 this.updateUi();

 var handler = this.getHandler();
 handler.listen(
     this.getElement(), EventType.MOUSEDOWN, this.handleMouseDown);

 // Cannot create InputHandler in createDom because IE throws an exception
 // on document.activeElement
 if (!this.inputHandler_) {
   this.inputHandler_ = new InputHandler(this.inputElement);
 }

 handler.listen(
     this.inputHandler_, InputHandler.EventType.INPUT,
     this.handleInput);
};


/** @override */
HsvPalette.prototype.disposeInternal = function() {
 HsvPalette.superClass_.disposeInternal.call(this);

 delete this.hsImageEl_;
 delete this.hsHandleEl_;
 delete this.valueBackgroundImageElement;
 delete this.vHandleEl_;
 delete this.swatchElement;
 delete this.inputElement;
 if (this.inputHandler_) {
   this.inputHandler_.dispose();
   delete this.inputHandler_;
 }
 events.unlistenByKey(this.mouseMoveListener);
 events.unlistenByKey(this.mouseUpListener);
};


/**
 * Updates the position, opacity, and styles for the UI representation of the
 * palette.
 * @protected
 */
HsvPalette.prototype.updateUi = function() {
 if (this.isInDocument()) {
   var h = this.hsv_[0];
   var s = this.hsv_[1];
   var v = this.hsv_[2];

   var left = this.hsImageEl_.offsetWidth * h;

   // We don't use a flipped gradient image in RTL, so we need to flip the
   // offset in RTL so that it still hovers over the correct color on the
   // gradiant.
   if (this.isRightToLeft()) {
     left = this.hsImageEl_.offsetWidth - left;
   }

   // We also need to account for the handle size.
   var handleOffset = Math.ceil(this.hsHandleEl_.offsetWidth / 2);
   left -= handleOffset;

   var top = this.hsImageEl_.offsetHeight * (1 - s);
   // Account for the handle size.
   top -= Math.ceil(this.hsHandleEl_.offsetHeight / 2);

   bidi.setPosition(
       this.hsHandleEl_, left, top, this.isRightToLeft());

   top = this.valueBackgroundImageElement.offsetTop -
       Math.floor(this.vHandleEl_.offsetHeight / 2) +
       this.valueBackgroundImageElement.offsetHeight * ((255 - v) / 255);

   this.vHandleEl_.style.top = top + 'px';
   style.setOpacity(this.hsImageEl_, (v / 255));

   style.setStyle(
       this.valueBackgroundImageElement, 'background-color',
       googColor.hsvToHex(this.hsv_[0] * 360, this.hsv_[1], 255));

   style.setStyle(this.swatchElement, 'background-color', this.color);
   style.setStyle(
       this.swatchElement, 'color',
       (this.hsv_[2] > 255 / 2) ? '#000' : '#fff');
   this.updateInput();
 }
};


/**
 * Handles mousedown events on palette UI elements.
 * @param {BrowserEvent} e Event object.
 * @protected
 */
HsvPalette.prototype.handleMouseDown = function(e) {
 if (e.target == this.valueBackgroundImageElement ||
     e.target == this.vHandleEl_) {
   // Setup value change listeners
   var b = style.getBounds(this.valueBackgroundImageElement);
   this.handleMouseMoveV_(b, e);
   this.mouseMoveListener = events.listen(
       this.document_, EventType.MOUSEMOVE,
       goog.bind(this.handleMouseMoveV_, this, b));
   this.mouseUpListener = events.listen(
       this.document_, EventType.MOUSEUP, this.handleMouseUp,
       false, this);
 } else if (e.target == this.hsImageEl_ || e.target == this.hsHandleEl_) {
   // Setup hue/saturation change listeners
   var b = style.getBounds(this.hsImageEl_);
   this.handleMouseMoveHs_(b, e);
   this.mouseMoveListener = events.listen(
       this.document_, EventType.MOUSEMOVE,
       goog.bind(this.handleMouseMoveHs_, this, b));
   this.mouseUpListener = events.listen(
       this.document_, EventType.MOUSEUP, this.handleMouseUp,
       false, this);
 }
};


/**
 * Handles mousemove events on the document once a drag operation on the value
 * slider has started.
 * @param {Rect} b Boundaries of the value slider object at the start
 *     of the drag operation.
 * @param {BrowserEvent} e Event object.
 * @private
 */
HsvPalette.prototype.handleMouseMoveV_ = function(b, e) {
 e.preventDefault();
 var vportPos = this.getDomHelper().getDocumentScroll();

 var height =
     Math.min(Math.max(vportPos.y + e.clientY, b.top), b.top + b.height);

 var newV = Math.round(255 * (b.top + b.height - height) / b.height);

 this.setHsv(null, null, newV);
};


/**
 * Handles mousemove events on the document once a drag operation on the
 * hue/saturation slider has started.
 * @param {Rect} b Boundaries of the value slider object at the start
 *     of the drag operation.
 * @param {BrowserEvent} e Event object.
 * @private
 */
HsvPalette.prototype.handleMouseMoveHs_ = function(b, e) {
 e.preventDefault();
 var vportPos = this.getDomHelper().getDocumentScroll();
 var newH =
     (Math.min(Math.max(vportPos.x + e.clientX, b.left), b.left + b.width) -
      b.left) /
     b.width;
 var newS =
     (-Math.min(Math.max(vportPos.y + e.clientY, b.top), b.top + b.height) +
      b.top + b.height) /
     b.height;
 this.setHsv(newH, newS, null);
};


/**
 * Handles mouseup events on the document, which ends a drag operation.
 * @param {Event} e Event object.
 * @protected
 */
HsvPalette.prototype.handleMouseUp = function(e) {
 events.unlistenByKey(this.mouseMoveListener);
 events.unlistenByKey(this.mouseUpListener);
};


/**
 * Handles input events on the hex value input field.
 * @param {Event} e Event object.
 * @protected
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
HsvPalette.prototype.handleInput = function(e) {
 if (/^#?[0-9a-f]{6}$/i.test(this.inputElement.value)) {
   this.setColor(this.inputElement.value);
 }
};
