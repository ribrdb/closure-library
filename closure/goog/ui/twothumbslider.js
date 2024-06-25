/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Twothumbslider is a slider that allows to select a subrange
 * within a range by dragging two thumbs. The selected sub-range is exposed
 * through getValue() and getExtent().
 *
 * To decorate, the twothumbslider should be bound to an element with the class
 * name 'goog-twothumbslider-[vertical / horizontal]' containing children with
 * the classname 'goog-twothumbslider-value-thumb' and
 * 'goog-twothumbslider-extent-thumb', respectively.
 *
 * Decorate Example:
 * <div id="twothumbslider" class="goog-twothumbslider-horizontal">
 *   <div class="goog-twothumbslider-value-thumb">
 *   <div class="goog-twothumbslider-extent-thumb">
 * </div>
 * <script>
 *
 * var slider = new TwoThumbSlider;
 * slider.decorate(document.getElementById('twothumbslider'));
 *
 * TODO(user): add a11y once we know what this element is
 *
 * @see ../demos/twothumbslider.html
 */

import * as aria from '../a11y/aria/aria.js';

import { Role } from '../a11y/aria/roles.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import { SliderBase } from './sliderbase.js';



/**
 * This creates a TwoThumbSlider object.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {SliderBase}
 */
export function TwoThumbSlider(opt_domHelper) {
    SliderBase.call(this, opt_domHelper);
    this.rangeModel.setValue(this.getMinimum());
    this.rangeModel.setExtent(this.getMaximum() - this.getMinimum());
}
goog.inherits(TwoThumbSlider, SliderBase);


/**
 * The prefix we use for the CSS class names for the slider and its elements.
 * @type {string}
 */
TwoThumbSlider.CSS_CLASS_PREFIX =
    goog.getCssName('goog-twothumbslider');


/**
 * CSS class name for the value thumb element.
 * @type {string}
 */
TwoThumbSlider.VALUE_THUMB_CSS_CLASS =
    goog.getCssName(TwoThumbSlider.CSS_CLASS_PREFIX, 'value-thumb');


/**
 * CSS class name for the extent thumb element.
 * @type {string}
 */
TwoThumbSlider.EXTENT_THUMB_CSS_CLASS =
    goog.getCssName(TwoThumbSlider.CSS_CLASS_PREFIX, 'extent-thumb');


/**
 * CSS class name for the range highlight element.
 * @type {string}
 */
TwoThumbSlider.RANGE_HIGHLIGHT_CSS_CLASS =
    goog.getCssName(TwoThumbSlider.CSS_CLASS_PREFIX, 'rangehighlight');


/**
 * @param {SliderBase.Orientation} orient orientation of the slider.
 * @return {string} The CSS class applied to the twothumbslider element.
 * @protected
 * @override
 */
TwoThumbSlider.prototype.getCssClass = function(orient) {
    return orient == SliderBase.Orientation.VERTICAL ?
        goog.getCssName(TwoThumbSlider.CSS_CLASS_PREFIX, 'vertical') :
        goog.getCssName(TwoThumbSlider.CSS_CLASS_PREFIX, 'horizontal');
};


/**
 * This creates a thumb element with the specified CSS class name.
 * @param {string} cs  CSS class name of the thumb to be created.
 * @return {!HTMLDivElement} The created thumb element.
 * @private
 */
TwoThumbSlider.prototype.createThumb_ = function(cs) {
    var thumb = this.getDomHelper().createDom(TagName.DIV, cs);
    aria.setRole(thumb, Role.BUTTON);
    return /** @type {!HTMLDivElement} */ (thumb);
};


/**
 * Creates the thumb members for a twothumbslider. If the
 * element contains a child with a class name 'goog-twothumbslider-value-thumb'
 * (or 'goog-twothumbslider-extent-thumb', respectively), then that will be used
 * as the valueThumb (or as the extentThumb, respectively). If the element
 * contains a child with a class name 'goog-twothumbslider-rangehighlight',
 * then that will be used as the range highlight.
 * @override
 */
TwoThumbSlider.prototype.createThumbs = function() {
    // find range highlight and thumbs
    var valueThumb = dom.getElementsByTagNameAndClass(
        null, TwoThumbSlider.VALUE_THUMB_CSS_CLASS, this.getElement())[0];
    var extentThumb = dom.getElementsByTagNameAndClass(
        null, TwoThumbSlider.EXTENT_THUMB_CSS_CLASS,
        this.getElement())[0];
    var rangeHighlight = dom.getElementsByTagNameAndClass(
        null, TwoThumbSlider.RANGE_HIGHLIGHT_CSS_CLASS,
        this.getElement())[0];
    if (!valueThumb) {
      valueThumb =
          this.createThumb_(TwoThumbSlider.VALUE_THUMB_CSS_CLASS);
      this.getElement().appendChild(valueThumb);
    }
    if (!extentThumb) {
      extentThumb =
          this.createThumb_(TwoThumbSlider.EXTENT_THUMB_CSS_CLASS);
      this.getElement().appendChild(extentThumb);
    }
    if (!rangeHighlight) {
      rangeHighlight = this.getDomHelper().createDom(
          TagName.DIV, TwoThumbSlider.RANGE_HIGHLIGHT_CSS_CLASS);
      // Insert highlight before value thumb so that it renders under the thumbs.
      this.getDomHelper().insertSiblingBefore(rangeHighlight, valueThumb);
    }
    this.valueThumb = /** @type {!HTMLDivElement} */ (valueThumb);
    this.extentThumb = /** @type {!HTMLDivElement} */ (extentThumb);
    this.rangeHighlight = /** @type {!HTMLDivElement} */ (rangeHighlight);
};
