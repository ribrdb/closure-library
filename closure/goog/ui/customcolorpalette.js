/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A color palette with a button for adding additional colors
 * manually.
 */

import * as googColor from '../color/color.js';

import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { ColorPalette } from './colorpalette.js';
import { Component } from './component.js';
const { Event } = goog.requireType('goog.events.event');
const { PaletteRenderer } = goog.requireType('goog.ui.paletterenderer');



/**
 * A custom color palette is a grid of color swatches and a button that allows
 * the user to add additional colors to the palette
 *
 * @param {Array<string>} initColors Array of initial colors to populate the
 *     palette with.
 * @param {PaletteRenderer=} opt_renderer Renderer used to render or
 *     decorate the palette; defaults to {@link PaletteRenderer}.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {ColorPalette}
 * @final
 */
export function CustomColorPalette(initColors, opt_renderer, opt_domHelper) {
  ColorPalette.call(this, initColors, opt_renderer, opt_domHelper);
  this.setSupportedState(Component.State.OPENED, true);
}
goog.inherits(CustomColorPalette, ColorPalette);


/**
 * Returns an array of DOM nodes for each color, and an additional cell with a
 * '+'.
 * @override
 */
CustomColorPalette.prototype.createColorNodes = function() {
  /** @desc Hover caption for the button that allows the user to add a color. */
  var MSG_CLOSURE_CUSTOM_COLOR_BUTTON = goog.getMsg('Add a color');

  var nl = CustomColorPalette.base(this, 'createColorNodes');
  nl.push(
      dom.createDom(
          TagName.DIV, {
            'class': goog.getCssName('goog-palette-customcolor'),
            'title': MSG_CLOSURE_CUSTOM_COLOR_BUTTON
          },
          '+'));
  return nl;
};


/**
 * @override
 * @param {Event} e Mouse or key event that triggered the action.
 * @return {boolean} True if the action was allowed to proceed, false otherwise.
 */
CustomColorPalette.prototype.performActionInternal = function(e) {
  var item = /** @type {Element} */ (this.getHighlightedItem());
  if (item) {
    if (classlist.contains(
            item, goog.getCssName('goog-palette-customcolor'))) {
      // User activated the special "add custom color" swatch.
      this.promptForCustomColor();
    } else {
      // User activated a normal color swatch.
      this.setSelectedItem(item);
      return this.dispatchEvent(Component.ComponentEventType.ACTION);
    }
  }
  return false;
};


/**
 * Prompts the user to enter a custom color.  Currently uses a window.prompt
 * but could be updated to use a dialog box with a WheelColorPalette.
 */
CustomColorPalette.prototype.promptForCustomColor = function() {
  /** @desc Default custom color dialog. */
  var MSG_CLOSURE_CUSTOM_COLOR_PROMPT = goog.getMsg(
      'Input custom color, i.e. pink, #F00, #D015FF or rgb(100, 50, 25)');

  // A CustomColorPalette is considered "open" while the color selection prompt
  // is open.  Enabling state transition events for the OPENED state and
  // listening for OPEN events allows clients to save the selection before
  // it is destroyed (see e.g. bug 1064701).
  var response = null;
  this.setOpen(true);
  if (this.isOpen()) {
    // The OPEN event wasn't canceled; prompt for custom color.
    response = window.prompt(MSG_CLOSURE_CUSTOM_COLOR_PROMPT, '#FFFFFF');
    this.setOpen(false);
  }

  if (!response) {
    // The user hit cancel
    return;
  }

  var color;

  try {
    color = googColor.parse(response).hex;
  } catch (er) {
    /** @desc Alert message sent when the input string is not a valid color. */
    var MSG_CLOSURE_CUSTOM_COLOR_INVALID_INPUT = goog.getMsg(
        'ERROR: "{$color}" is not a valid color.', {'color': response});
    alert(MSG_CLOSURE_CUSTOM_COLOR_INVALID_INPUT);
    return;
  }

  // TODO(user): This is relatively inefficient.  Consider adding
  // functionality to palette to add individual items after render time.
  var colors = this.getColors();
  colors.push(color);
  this.setColors(colors);

  // Set the selected color to the new color and notify listeners of the action.
  this.setSelectedColor(color);
  this.dispatchEvent(Component.ComponentEventType.ACTION);
};
