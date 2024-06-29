/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generic factory functions for creating the building blocks for
 * an editor toolbar.
 */

import * as dom from '../../dom/dom.js';

import { TagName } from '../../dom/tagname.js';
import * as googString from '../../string/string.js';
import * as style from '../../style/style.js';
import { Component } from '../component.js';
import { Container } from '../container.js';
import { Option } from '../option.js';
import { Toolbar } from '../toolbar.js';
import { ToolbarButton } from '../toolbarbutton.js';
import { ToolbarColorMenuButton } from '../toolbarcolormenubutton.js';
import { ToolbarMenuButton } from '../toolbarmenubutton.js';
import { ToolbarRenderer } from '../toolbarrenderer.js';
import { ToolbarSelect } from '../toolbarselect.js';
const { Button } = goog.requireType('goog.ui.button');
const { ButtonRenderer } = goog.requireType('goog.ui.buttonrenderer');
const { ColorMenuButton } = goog.requireType('goog.ui.colormenubutton');
const { ColorMenuButtonRenderer } = goog.requireType('goog.ui.colormenubuttonrenderer');
const { Control } = goog.requireType('goog.ui.control');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');
const { MenuButton } = goog.requireType('goog.ui.menubutton');
const { MenuButtonRenderer } = goog.requireType('goog.ui.menubuttonrenderer');
const { Select } = goog.requireType('goog.ui.select');


/**
 * Takes a font spec (e.g. "Arial, Helvetica, sans-serif") and returns the
 * primary font name, normalized to lowercase (e.g. "arial").
 * @param {string} fontSpec Font specification.
 * @return {string} The primary font name, in lowercase.
 */
export function getPrimaryFont(fontSpec) {
  const i = fontSpec.indexOf(',');
  const fontName =
      (i != -1 ? fontSpec.substring(0, i) : fontSpec).toLowerCase();
  // Strip leading/trailing quotes from the font name (bug 1050118).
  return googString.stripQuotes(fontName, '"\'');
}


/**
 * Bulk-adds fonts to the given font menu button.  The argument must be an
 * array of font descriptor objects, each of which must have the following
 * attributes:
 * <ul>
 *   <li>`caption` - Caption to show in the font menu (e.g. 'Tahoma')
 *   <li>`value` - Value for the corresponding 'font-family' CSS style
 *       (e.g. 'Tahoma, Arial, sans-serif')
 * </ul>
 * @param {!Select} button Font menu button.
 * @param {!Array<{caption: string, value: string}>} fonts Array of
 *     font descriptors.
 */
export function addFonts(button, fonts) {
  fonts.forEach(function(font) {
    addFont(button, font.caption, font.value);
  });
}


/**
 * Adds a menu item to the given font menu button.  The first font listed in
 * the `value` argument is considered the font ID, so adding two items
 * whose CSS style starts with the same font may lead to unpredictable results.
 * @param {!Select} button Font menu button.
 * @param {string} caption Caption to show for the font menu.
 * @param {string} value Value for the corresponding 'font-family' CSS style.
 */
export function addFont(button, caption, value) {
  // The font ID is the first font listed in the CSS style, normalized to
  // lowercase.
  const id = getPrimaryFont(value);

  // Construct the option, and add it to the button.
  const option = new Option(caption, value, button.getDomHelper());
  option.setId(id);
  button.addItem(option);

  // Captions are shown in their own font.
  option.getContentElement().style.fontFamily = value;
}


/**
 * Bulk-adds font sizes to the given font size menu button.  The argument must
 * be an array of font size descriptor objects, each of which must have the
 * following attributes:
 * <ul>
 *   <li>`caption` - Caption to show in the font size menu (e.g. 'Huge')
 *   <li>`value` - Value for the corresponding HTML font size (e.g. 6)
 * </ul>
 * @param {!Select} button Font size menu button.
 * @param {!Array<{caption: string, value:number}>} sizes Array of font
 *     size descriptors.
 */
export function addFontSizes(button, sizes) {
  sizes.forEach(function(size) {
    addFontSize(button, size.caption, size.value);
  });
}


/**
 * Adds a menu item to the given font size menu button.  The `value`
 * argument must be a legacy HTML font size in the 0-7 range.
 * @param {!Select} button Font size menu button.
 * @param {string} caption Caption to show in the font size menu.
 * @param {number} value Value for the corresponding HTML font size.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
export function addFontSize(button, caption, value) {
  // Construct the option, and add it to the button.
  const option = new Option(caption, value, button.getDomHelper());
  button.addItem(option);

  // Adjust the font size of the menu item and the height of the checkbox
  // element after they've been rendered by addItem().  Captions are shown in
  // the corresponding font size, and lining up the checkbox is tricky.
  const content = option.getContentElement();
  content.style.fontSize =
      getPxFromLegacySize(value) + 'px';
  content.firstChild.style.height = '1.1em';
}


/**
 * Converts a legacy font size specification into an equivalent pixel size.
 * For example, {@code &lt;font size="6"&gt;} is {@code font-size: 32px;}, etc.
 * @param {number} fontSize Legacy font size spec in the 0-7 range.
 * @return {number} Equivalent pixel size.
 */
export function getPxFromLegacySize(fontSize) {
  return LEGACY_SIZE_TO_PX_MAP_[fontSize] || 10;
}


/**
 * Converts a pixel font size specification into an equivalent legacy size.
 * For example, {@code font-size: 32px;} is {@code &lt;font size="6"&gt;}, etc.
 * If the given pixel size doesn't exactly match one of the legacy sizes, -1 is
 * returned.
 * @param {number} px Pixel font size.
 * @return {number} Equivalent legacy size spec in the 0-7 range, or -1 if none
 *     exists.
 */
export function getLegacySizeFromPx(px) {
  // Use lastIndexOf to get the largest legacy size matching the pixel size
  // (most notably returning 1 instead of 0 for 10px).
  return LEGACY_SIZE_TO_PX_MAP_.lastIndexOf(px);
}


/**
 * Map of legacy font sizes (0-7) to equivalent pixel sizes.
 * @type {!Array<number>}
 * @private
 */
export var LEGACY_SIZE_TO_PX_MAP_ = [10, 10, 13, 16, 18, 24, 32, 48];


/**
 * Bulk-adds format options to the given "Format block" menu button.  The
 * argument must be an array of format option descriptor objects, each of
 * which must have the following attributes:
 * <ul>
 *   <li>`caption` - Caption to show in the menu (e.g. 'Minor heading')
 *   <li>`command` - Corresponding {@link TagName} (e.g.
 *       'H4')
 * </ul>
 * @param {!Select} button "Format block" menu button.
 * @param {!Array<{caption: string, command: !TagName}>} formats Array
 *     of format option descriptors.
 */
export function addFormatOptions(button, formats) {
  formats.forEach(function(format) {
    addFormatOption(
        button, format.caption, format.command);
  });
}


/**
 * Adds a menu item to the given "Format block" menu button.
 * @param {!Select} button "Format block" menu button.
 * @param {string} caption Caption to show in the menu.
 * @param {!TagName} tag Corresponding block format tag.
 */
export function addFormatOption(button, caption, tag) {
  // Construct the option, and add it to the button.
  // TODO(attila): Create boring but functional menu item for now...
  const buttonDom = button.getDomHelper();
  const option = new Option(
      buttonDom.createDom(TagName.DIV, null, caption), tag, buttonDom);
  option.setId(String(tag));
  button.addItem(option);
}


/**
 * Creates a {@link Toolbar} containing the specified set of
 * toolbar buttons, and renders it into the given parent element.  Each
 * item in the `items` array must a {@link Control}.
 * @param {!Array<Control>} items Toolbar items; each must
 *     be a {@link Control}.
 * @param {!Element} elem Toolbar parent element.
 * @param {boolean=} opt_isRightToLeft Whether the editor chrome is
 *     right-to-left; defaults to the directionality of the toolbar parent
 *     element.
 * @return {!Toolbar} Editor toolbar, rendered into the given parent
 *     element.
 */
export function makeToolbar(items, elem, opt_isRightToLeft) {
  const domHelper = dom.getDomHelper(elem);

  // Create an empty horizontal toolbar using the default renderer.
  const toolbar = new Toolbar(
      ToolbarRenderer.getInstance(),
      Container.Orientation.HORIZONTAL, domHelper);

  // Optimization:  Explicitly test for the directionality of the parent
  // element here, so we can set it for both the toolbar and its children,
  // saving a lot of expensive calls to goog.style.isRightToLeft() during
  // rendering.
  const isRightToLeft = opt_isRightToLeft || style.isRightToLeft(elem);
  toolbar.setRightToLeft(isRightToLeft);

  // Optimization:  Set the toolbar to non-focusable before it is rendered,
  // to avoid creating unnecessary keyboard event handler objects.
  toolbar.setFocusable(false);

  for (let i = 0, button; button = items[i]; i++) {
    // Optimization:  Set the button to non-focusable before it is rendered,
    // to avoid creating unnecessary keyboard event handler objects.  Also set
    // the directionality of the button explicitly, to avoid expensive calls
    // to goog.style.isRightToLeft() during rendering.
    button.setSupportedState(Component.State.FOCUSED, false);
    button.setRightToLeft(isRightToLeft);
    toolbar.addChild(button, true);
  }

  toolbar.render(elem);
  return toolbar;
}


/**
 * Creates a toolbar button with the given ID, tooltip, and caption.  Applies
 * any custom CSS class names to the button's caption element.
 * @param {string} id Button ID; must equal a {@link goog.editor.Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {ButtonRenderer=} opt_renderer Button renderer; defaults to
 *     {@link ToolbarButtonRenderer} if unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Button} A toolbar button.
 */
export function makeButton(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = new ToolbarButton(
      createContent_(
          caption, opt_classNames, opt_domHelper),
      opt_renderer, opt_domHelper);
  button.setId(id);
  button.setTooltip(tooltip);
  return button;
}


/**
 * Creates a toggle button with the given ID, tooltip, and caption. Applies
 * any custom CSS class names to the button's caption element. The button
 * returned has checkbox-like toggle semantics.
 * @param {string} id Button ID; must equal a {@link goog.editor.Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {ButtonRenderer=} opt_renderer Button renderer; defaults to
 *     {@link ToolbarButtonRenderer} if unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Button} A toggle button.
 */
export function makeToggleButton(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = makeButton(
      id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper);
  button.setSupportedState(Component.State.CHECKED, true);
  return button;
}


/**
 * Creates a menu button with the given ID, tooltip, and caption. Applies
 * any custom CSS class names to the button's caption element.  The button
 * returned doesn't have an actual menu attached; use {@link
 * MenuButton#setMenu} to attach a {@link goog.ui.Menu} to the
 * button.
 * @param {string} id Button ID; must equal a {@link goog.editor.Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {ButtonRenderer=} opt_renderer Button renderer; defaults to
 *     {@link ToolbarMenuButtonRenderer} if unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!MenuButton} A menu button.
 */
export function makeMenuButton(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = new ToolbarMenuButton(
      createContent_(
          caption, opt_classNames, opt_domHelper),
      null, opt_renderer, opt_domHelper);
  button.setId(id);
  button.setTooltip(tooltip);
  return button;
}


/**
 * Creates a select button with the given ID, tooltip, and caption. Applies
 * any custom CSS class names to the button's root element.  The button
 * returned doesn't have an actual menu attached; use {@link
 * Select#setMenu} to attach a {@link goog.ui.Menu} containing
 * {@link Option}s to the select button.
 * @param {string} id Button ID; must equal a {@link goog.editor.Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption; used as the
 *     default caption when nothing is selected.
 * @param {string=} opt_classNames CSS class name(s) to apply to the button's
 *     root element.
 * @param {MenuButtonRenderer=} opt_renderer Button renderer;
 *     defaults to {@link ToolbarMenuButtonRenderer} if unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Select} A select button.
 */
export function makeSelectButton(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button =
      new ToolbarSelect(null, null, opt_renderer, opt_domHelper);
  if (opt_classNames) {
    // Unlike the other button types, for Select buttons we apply the
    // extra class names to the root element, because for select buttons the
    // caption isn't stable (as it changes each time the selection changes).
    opt_classNames.split(/\s+/).forEach(button.addClassName, button);
  }
  button.addClassName(goog.getCssName('goog-toolbar-select'));
  button.setDefaultCaption(caption);
  button.setId(id);
  button.setTooltip(tooltip);
  return button;
}


/**
 * Creates a color menu button with the given ID, tooltip, and caption.
 * Applies any custom CSS class names to the button's caption element.  The
 * button is created with a default color menu containing standard color
 * palettes.
 * @param {string} id Button ID; must equal a {@link goog.editor.Command} for
 *     built-in toolbar buttons, but can be anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {ColorMenuButtonRenderer=} opt_renderer Button renderer;
 *     defaults to {@link ToolbarColorMenuButtonRenderer}
 *     if unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!ColorMenuButton} A color menu button.
 */
export function makeColorMenuButton(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = new ToolbarColorMenuButton(
      createContent_(
          caption, opt_classNames, opt_domHelper),
      null, opt_renderer, opt_domHelper);
  button.setId(id);
  button.setTooltip(tooltip);
  return button;
}


/**
 * Creates a new DIV that wraps a button caption, optionally applying CSS
 * class names to it.  Used as a helper function in button factory methods.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the DIV that
 *     wraps the caption (if any).
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Element} DIV that wraps the caption.
 * @private
 */
function createContent_(caption, opt_classNames, opt_domHelper) {
  return (opt_domHelper || dom.getDomHelper())
      .createDom(TagName.DIV, opt_classNames, caption);
}
