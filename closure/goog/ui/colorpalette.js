/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A control for representing a palette of colors, that the user
 * can highlight or select via the keyboard or the mouse.
 */

import * as googColor from '../color/color.js';

import { TagName } from '../dom/tagname.js';
import * as style from '../style/style.js';
import { Palette } from './palette.js';
import { PaletteRenderer } from './paletterenderer.js';
const { DomHelper } = goog.requireType('goog.dom.dom');



/**
 * A color palette is a grid of color swatches that the user can highlight or
 * select via the keyboard or the mouse.  The selection state of the palette is
 * controlled by a selection model.  When the user makes a selection, the
 * component fires an ACTION event.  Event listeners may retrieve the selected
 * color using the {@link #getSelectedColor} method.
 *
 * @param {Array<string>=} opt_colors Array of colors in any valid CSS color
 *     format.
 * @param {PaletteRenderer=} opt_renderer Renderer used to render or
 *     decorate the palette; defaults to {@link PaletteRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {Palette}
 */
export function ColorPalette(opt_colors, opt_renderer, opt_domHelper) {
  /**
   * Array of colors to show in the palette.
   * @type {Array<string>}
   * @private
   */
  this.colors_ = opt_colors || [];

  Palette.call(
      this, null, opt_renderer || PaletteRenderer.getInstance(),
      opt_domHelper);

  // Set the colors separately from the super call since we need the correct
  // DomHelper to be initialized for this class.
  this.setColors(this.colors_);
}
goog.inherits(ColorPalette, Palette);


/**
 * Array of normalized colors. Initialized lazily as often never needed.
 * @type {?Array<string>}
 * @private
 */
ColorPalette.prototype.normalizedColors_ = null;


/**
 * Array of labels for the colors. Will be used for the tooltips and
 * accessibility.
 * @type {?Array<string>}
 * @private
 */
ColorPalette.prototype.labels_ = null;


/**
 * Returns the array of colors represented in the color palette.
 * @return {Array<string>} Array of colors.
 */
ColorPalette.prototype.getColors = function() {
  return this.colors_;
};

/**
 * Returns the array of tooltip labels for the colors in the color palette.
 * @return {?Array<string>} Array of labels.
 * @protected
 * @final
 */
ColorPalette.prototype.getLabels = function() {
  return this.labels_;
};

/**
 * Sets the colors that are contained in the palette.
 * @param {Array<string>} colors Array of colors in any valid CSS color format.
 * @param {Array<string>=} opt_labels The array of labels to be used as
 *        tooltips. When not provided, the color value will be used.
 */
ColorPalette.prototype.setColors = function(colors, opt_labels) {
  this.colors_ = colors;
  this.labels_ = opt_labels || null;
  this.normalizedColors_ = null;
  this.setContent(this.createColorNodes());
};


/**
 * @return {?string} The current selected color in hex, or null.
 */
ColorPalette.prototype.getSelectedColor = function() {
  var selectedItem = /** @type {Element} */ (this.getSelectedItem());
  if (selectedItem) {
    var color = style.getStyle(selectedItem, 'background-color');
    return ColorPalette.parseColor_(color);
  } else {
    return null;
  }
};


/**
 * Sets the selected color.  Clears the selection if the argument is null or
 * can't be parsed as a color.
 * @param {?string} color The color to set as selected; null clears the
 *     selection.
 */
ColorPalette.prototype.setSelectedColor = function(color) {
  var hexColor = ColorPalette.parseColor_(color);
  if (!this.normalizedColors_) {
    this.normalizedColors_ = this.colors_.map(function(color) {
      return ColorPalette.parseColor_(color);
    });
  }
  this.setSelectedIndex(
      hexColor ? this.normalizedColors_.indexOf(hexColor) : -1);
};


/**
 * @return {!Array<!Node>} An array of DOM nodes for each color.
 * @protected
 */
ColorPalette.prototype.createColorNodes = function() {
  return this.colors_.map(function(color, index) {
    var swatch = this.getDomHelper().createDom(TagName.DIV, {
      'class': goog.getCssName(this.getRenderer().getCssClass(), 'colorswatch'),
      'style': 'background-color:' + color
    });
    if (this.labels_ && this.labels_[index]) {
      swatch.title = this.labels_[index];
    } else {
      swatch.title = color.charAt(0) == '#' ?
          'RGB (' + googColor.hexToRgb(color).join(', ') + ')' :
          color;
    }
    return swatch;
  }, this);
};


/**
 * Takes a string, attempts to parse it as a color spec, and returns a
 * normalized hex color spec if successful (null otherwise).
 * @param {?string} color String possibly containing a color spec; may be null.
 * @return {?string} Normalized hex color spec, or null if the argument can't
 *     be parsed as a color.
 * @private
 */
ColorPalette.parseColor_ = function(color) {
  if (color) {
    try {
      return googColor.parse(color).hex;
    } catch (ex) {
      // Fall through.
    }
  }
  return null;
};
