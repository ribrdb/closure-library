/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A color menu button.  Extends {@link MenuButton} by
 * showing the currently selected color in the button caption.
 */

goog.declareModuleId('goog.ui.colormenubutton');

import object from '../object/object.js';
import { ColorMenuButtonRenderer } from './colormenubuttonrenderer.js';
import { ColorPalette } from './colorpalette.js';
import { Component } from './component.js';
import { Menu } from './menu.js';
import { MenuButton } from './menubutton.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { Event } = goog.requireType('goog.events.event');
const { Control } = goog.requireType('goog.ui.control');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');
const { MenuButtonRenderer } = goog.requireType('goog.ui.menubuttonrenderer');



/**
 * A color menu button control.  Extends {@link MenuButton} by adding
 * an API for getting and setting the currently selected color from a menu of
 * color palettes.
 *
 * @param {ControlContent} content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {Menu=} opt_menu Menu to render under the button when clicked;
 *     should contain at least one {@link ColorPalette} if present.
 * @param {MenuButtonRenderer=} opt_renderer Button renderer;
 *     defaults to {@link ColorMenuButtonRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {MenuButton}
 */
export function ColorMenuButton(content, opt_menu, opt_renderer, opt_domHelper) {
  MenuButton.call(
      this, content, opt_menu,
      opt_renderer || ColorMenuButtonRenderer.getInstance(),
      opt_domHelper);
}
goog.inherits(ColorMenuButton, MenuButton);


/**
 * Default color palettes.
 * @type {!Object}
 */
ColorMenuButton.PALETTES = {
  /** Default grayscale colors. */
  GRAYSCALE:
      ['#000', '#444', '#666', '#999', '#ccc', '#eee', '#f3f3f3', '#fff'],

  /** Default solid colors. */
  SOLID: ['#f00', '#f90', '#ff0', '#0f0', '#0ff', '#00f', '#90f', '#f0f'],

  /** Default pastel colors. */
  PASTEL: [
    '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9',
    '#ead1dc', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8',
    '#b4a7d6', '#d5a6bd', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af',
    '#6fa8dc', '#8e7cc3', '#c27ba0', '#cc0000', '#e69138', '#f1c232', '#6aa84f',
    '#45818e', '#3d85c6', '#674ea7', '#a64d79', '#990000', '#b45f06', '#bf9000',
    '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47', '#660000', '#783f04',
    '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#4c1130'
  ]
};


/**
 * Value for the "no color" menu item object in the color menu (if present).
 * The {@link ColorMenuButton#handleMenuAction} method interprets
 * ACTION events dispatched by an item with this value as meaning "clear the
 * selected color."
 * @type {string}
 */
ColorMenuButton.NO_COLOR = 'none';


/**
 * Factory method that creates and returns a new {@link Menu} instance
 * containing default color palettes.
 * @param {Array<Control>=} opt_extraItems Optional extra menu items to
 *     add before the color palettes.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @return {!Menu} Color menu.
 */
ColorMenuButton.newColorMenu = function(opt_extraItems, opt_domHelper) {
  var menu = new Menu(opt_domHelper);

  if (opt_extraItems) {
    opt_extraItems.forEach(function(item) {
      menu.addChild(item, true);
    });
  }

  object.forEach(ColorMenuButton.PALETTES, function(colors) {
    var palette = new ColorPalette(colors, null, opt_domHelper);
    palette.setSize(8);
    menu.addChild(palette, true);
  });

  return menu;
};


/**
 * Returns the currently selected color (null if none).
 * @return {string} The selected color.
 */
ColorMenuButton.prototype.getSelectedColor = function() {
  return /** @type {string} */ (this.getValue());
};


/**
 * Sets the selected color, or clears the selected color if the argument is
 * null or not any of the available color choices.
 * @param {?string} color New color.
 */
ColorMenuButton.prototype.setSelectedColor = function(color) {
  this.setValue(color);
};


/**
 * Sets the value associated with the color menu button.  Overrides
 * {@link goog.ui.Button#setValue} by interpreting the value as a color
 * spec string.
 * @param {*} value New button value; should be a color spec string.
 * @override
 */
ColorMenuButton.prototype.setValue = function(value) {
  var color = /** @type {?string} */ (value);
  for (var i = 0, item; item = this.getItemAt(i); i++) {
    if (typeof item.setSelectedColor == 'function') {
      // This menu item looks like a color palette.
      item.setSelectedColor(color);
    }
  }
  ColorMenuButton.superClass_.setValue.call(this, color);
};


/**
 * Handles {@link Component.ComponentEventType.ACTION} events dispatched by
 * the menu item clicked by the user.  Updates the button, calls the superclass
 * implementation to hide the menu, stops the propagation of the event, and
 * dispatches an ACTION event on behalf of the button itself.  Overrides
 * {@link MenuButton#handleMenuAction}.
 * @param {Event} e Action event to handle.
 * @override
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
ColorMenuButton.prototype.handleMenuAction = function(e) {
  if (typeof e.target.getSelectedColor == 'function') {
    // User clicked something that looks like a color palette.
    this.setValue(e.target.getSelectedColor());
  } else if (e.target.getValue() == ColorMenuButton.NO_COLOR) {
    // User clicked the special "no color" menu item.
    this.setValue(null);
  }
  ColorMenuButton.superClass_.handleMenuAction.call(this, e);
  e.stopPropagation();
  this.dispatchEvent(Component.ComponentEventType.ACTION);
};


/**
 * Opens or closes the menu.  Overrides {@link MenuButton#setOpen} by
 * generating a default color menu on the fly if needed.
 * @param {boolean} open Whether to open or close the menu.
 * @param {Event=} opt_e Mousedown event that caused the menu to
 *     be opened.
 * @override
 */
ColorMenuButton.prototype.setOpen = function(open, opt_e) {
  if (open && this.getItemCount() == 0) {
    this.setMenu(
        ColorMenuButton.newColorMenu(null, this.getDomHelper()));
    this.setValue(/** @type {?string} */ (this.getValue()));
  }
  ColorMenuButton.superClass_.setOpen.call(this, open, opt_e);
};


/* Register a decorator factory function for ColorMenuButtons.*/
registry.setDecoratorByClassName(
    ColorMenuButtonRenderer.CSS_CLASS, function() {
  return new ColorMenuButton(null);
});
