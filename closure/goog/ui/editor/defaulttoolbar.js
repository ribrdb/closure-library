/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Factory functions for creating a default editing toolbar.
 *
 * @see ../../demos/editor/editor.html
 */

import * as asserts from '../../asserts/asserts.js';

import * as dom from '../../dom/dom.js';
import { TagName } from '../../dom/tagname.js';
import * as classlist from '../../dom/classlist.js';
import { Command } from '../../editor/command.js';
import * as style from '../../style/style.js';
import * as ToolbarFactory from './toolbarfactory.js';
import * as messages from './messages.js';
import * as userAgent from '../../useragent/useragent.js';
const { Button } = goog.requireType('goog.ui.button');
const { ButtonRenderer } = goog.requireType('goog.ui.buttonrenderer');
const { ColorMenuButtonRenderer } = goog.requireType('goog.ui.colormenubuttonrenderer');
const { Control } = goog.requireType('goog.ui.control');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');
const { MenuButtonRenderer } = goog.requireType('goog.ui.menubuttonrenderer');
const { MenuItem } = goog.requireType('goog.ui.menuitem');
const { Select } = goog.requireType('goog.ui.select');
const { Toolbar } = goog.requireType('goog.ui.toolbar');
const { ToolbarColorMenuButton } = goog.requireType('goog.ui.toolbarcolormenubutton');

// Font menu creation.


/** @desc Font menu item caption for the default sans-serif font. */
export var MSG_FONT_NORMAL = goog.getMsg('Normal');


/** @desc Font menu item caption for the default serif font. */
export var MSG_FONT_NORMAL_SERIF =
    goog.getMsg('Normal / serif');


/**
 * Common font descriptors for all locales.  Each descriptor has the following
 * attributes:
 * <ul>
 *   <li>`caption` - Caption to show in the font menu (e.g. 'Tahoma')
 *   <li>`value` - Value for the corresponding 'font-family' CSS style
 *       (e.g. 'Tahoma, Arial, sans-serif')
 * </ul>
 * @type {!Array<{caption:string, value:string}>}
 * @private
 */
var FONTS_ = [
  {
    caption: MSG_FONT_NORMAL,
    value: 'arial,sans-serif'
  },
  {
    caption: MSG_FONT_NORMAL_SERIF,
    value: 'times new roman,serif'
  },
  {caption: 'Courier New', value: 'courier new,monospace'},
  {caption: 'Georgia', value: 'georgia,serif'},
  {caption: 'Trebuchet', value: 'trebuchet ms,sans-serif'},
  {caption: 'Verdana', value: 'verdana,sans-serif'}
];


/**
 * Locale-specific font descriptors.  The object is a map of locale strings to
 * arrays of font descriptors.
 * @type {!Object<!Array<{caption:string, value:string}>>}
 * @private
 */
var I18N_FONTS_ = {
  'ja': [
    {
      caption: '\uff2d\uff33 \uff30\u30b4\u30b7\u30c3\u30af',
      value: 'ms pgothic,sans-serif'
    },
    {caption: '\uff2d\uff33 \uff30\u660e\u671d', value: 'ms pmincho,serif'}, {
      caption: '\uff2d\uff33 \u30b4\u30b7\u30c3\u30af',
      value: 'ms gothic,monospace'
    }
  ],
  'ko': [
    {caption: '\uad74\ub9bc', value: 'gulim,sans-serif'},
    {caption: '\ubc14\ud0d5', value: 'batang,serif'},
    {caption: '\uad74\ub9bc\uccb4', value: 'gulimche,monospace'}
  ],
  'zh-tw': [
    {caption: '\u65b0\u7d30\u660e\u9ad4', value: 'pmingliu,serif'},
    {caption: '\u7d30\u660e\u9ad4', value: 'mingliu,serif'}
  ],
  'zh-cn': [
    {caption: '\u5b8b\u4f53', value: 'simsun,serif'},
    {caption: '\u9ed1\u4f53', value: 'simhei,sans-serif'},
    {caption: 'MS Song', value: 'ms song,monospace'}
  ]
};


/**
 * Default locale for font names.
 * @type {string}
 * @private
 */
var locale_ = 'en-us';


/**
 * Sets the locale for the font names.  If not set, defaults to 'en-us'.
 * Used only for default creation of font names name.  Must be set
 * before font name menu is created.
 * @param {string} locale Locale to use for the toolbar font names.
 */
export function setLocale(locale) {
  locale_ = locale;
}


/**
 * Initializes the given font menu button by adding default fonts to the menu.
 * If setLocale was called to specify a locale
 * for which locale-specific default fonts exist, those are added before
 * common fonts.
 * @param {!Select} button Font menu button.
 */
export function addDefaultFonts(button) {
  // Normalize locale to lowercase, with a hyphen (see bug 1036165).
  const locale =
      locale_.replace(/_/, '-').toLowerCase();
  // Add locale-specific default fonts, if any.
  let fontlist = [];

  if (locale in I18N_FONTS_) {
    fontlist = I18N_FONTS_[locale];
  }
  if (fontlist.length) {
    ToolbarFactory.addFonts(button, fontlist);
  }
  // Add locale-independent default fonts.
  ToolbarFactory.addFonts(
      button, FONTS_);
}


// Font size menu creation.


/** @desc Font size menu item caption for the 'Small' size. */
export var MSG_FONT_SIZE_SMALL = goog.getMsg('Small');


/** @desc Font size menu item caption for the 'Normal' size. */
export var MSG_FONT_SIZE_NORMAL = goog.getMsg('Normal');


/** @desc Font size menu item caption for the 'Large' size. */
export var MSG_FONT_SIZE_LARGE = goog.getMsg('Large');


/** @desc Font size menu item caption for the 'Huge' size. */
export var MSG_FONT_SIZE_HUGE = goog.getMsg('Huge');


/**
 * Font size descriptors, each with the following attributes:
 * <ul>
 *   <li>`caption` - Caption to show in the font size menu (e.g. 'Huge')
 *   <li>`value` - Value for the corresponding HTML font size (e.g. 6)
 * </ul>
 * @type {!Array<{caption:string, value:number}>}
 * @private
 */
var FONT_SIZES_ = [
  {caption: MSG_FONT_SIZE_SMALL, value: 1},
  {caption: MSG_FONT_SIZE_NORMAL, value: 2},
  {caption: MSG_FONT_SIZE_LARGE, value: 4},
  {caption: MSG_FONT_SIZE_HUGE, value: 6}
];


/**
 * Initializes the given font size menu button by adding default font sizes to
 * it.
 * @param {!Select} button Font size menu button.
 */
export function addDefaultFontSizes(button) {
  ToolbarFactory.addFontSizes(
      button, FONT_SIZES_);
}


// Header format menu creation.


/** @desc Caption for "Heading" block format option. */
export var MSG_FORMAT_HEADING = goog.getMsg('Heading');


/** @desc Caption for "Subheading" block format option. */
export var MSG_FORMAT_SUBHEADING = goog.getMsg('Subheading');


/** @desc Caption for "Minor heading" block format option. */
export var MSG_FORMAT_MINOR_HEADING =
    goog.getMsg('Minor heading');


/** @desc Caption for "Normal" block format option. */
export var MSG_FORMAT_NORMAL = goog.getMsg('Normal');


/**
 * Format option descriptors, each with the following attributes:
 * <ul>
 *   <li>`caption` - Caption to show in the menu (e.g. 'Minor heading')
 *   <li>`command` - Corresponding {@link TagName} (e.g.
 *       'H4')
 * </ul>
 * @type {!Array<{caption: string, command: !TagName}>}
 * @private
 */
var FORMAT_OPTIONS_ = [
  {
    caption: MSG_FORMAT_HEADING,
    command: TagName.H2
  },
  {
    caption: MSG_FORMAT_SUBHEADING,
    command: TagName.H3
  },
  {
    caption: MSG_FORMAT_MINOR_HEADING,
    command: TagName.H4
  },
  {
    caption: MSG_FORMAT_NORMAL,
    command: TagName.P
  }
];


/**
 * Initializes the given "Format block" menu button by adding default format
 * options to the menu.
 * @param {!Select} button "Format block" menu button.
 */
export function addDefaultFormatOptions(button) {
  ToolbarFactory.addFormatOptions(
      button, FORMAT_OPTIONS_);
}


/**
 * Creates a {@link Toolbar} containing a default set of editor
 * toolbar buttons, and renders it into the given parent element.
 * @param {!Element} elem Toolbar parent element.
 * @param {boolean=} opt_isRightToLeft Whether the editor chrome is
 *     right-to-left; defaults to the directionality of the toolbar parent
 *     element.
 * @return {!Toolbar} Default editor toolbar, rendered into the given
 *     parent element.
 * @see DEFAULT_BUTTONS
 */
export function makeDefaultToolbar(elem, opt_isRightToLeft) {
  const isRightToLeft = opt_isRightToLeft || style.isRightToLeft(elem);
  const buttons = isRightToLeft ?
      DEFAULT_BUTTONS_RTL :
      DEFAULT_BUTTONS;
  return makeToolbar(
      buttons, elem, opt_isRightToLeft);
}


/**
 * Creates a {@link Toolbar} containing the specified set of
 * toolbar buttons, and renders it into the given parent element.  Each
 * item in the `items` array must either be a
 * {@link Command} (to create a built-in button) or a subclass
 * of {@link Control} (to create a custom control).
 * @param {!Array<string|Control>} items Toolbar items; each must
 *     be a {@link Command} or a {@link Control}.
 * @param {!Element} elem Toolbar parent element.
 * @param {boolean=} opt_isRightToLeft Whether the editor chrome is
 *     right-to-left; defaults to the directionality of the toolbar parent
 *     element.
 * @return {!Toolbar} Editor toolbar, rendered into the given parent
 *     element.
 */
export function makeToolbar(items, elem, opt_isRightToLeft) {
  const domHelper = dom.getDomHelper(elem);
  const controls = [];

  for (let i = 0, button; button = items[i]; i++) {
    if (typeof button === 'string') {
      button = makeBuiltInToolbarButton(
          button, domHelper);
    }
    if (button) {
      controls.push(button);
    }
  }

  return ToolbarFactory.makeToolbar(
      controls, elem, opt_isRightToLeft);
}


/**
 * Creates an instance of a subclass of {@link Button} for the given
 * {@link Command}, or null if no built-in button exists for the
 * command.  Note that this function is only intended to create built-in
 * buttons; please don't try to hack it!
 * @param {string} command Editor command ID.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {Button} Toolbar button (null if no built-in button exists
 *     for the command).
 */
export function makeBuiltInToolbarButton(command, opt_domHelper) {
  let button = null;
  const descriptor = buttons_[command];
  if (descriptor) {
    // Default the factory method to makeToggleButton, since most built-in
    // toolbar buttons are toggle buttons. See also
    /* button_list_.*/
    /** @type {!Function} */
    const factory =
        descriptor.factory || ToolbarFactory.makeToggleButton;
    const id = descriptor.command;
    const tooltip = descriptor.tooltip;
    const caption = descriptor.caption;
    const classNames = descriptor.classes;
    // Default the DOM helper to the one for the current document.
    const domHelper = opt_domHelper || dom.getDomHelper();
    // Instantiate the button based on the descriptor.
    button = factory(id, tooltip, caption, classNames, null, domHelper);
    // If this button's state should be queried when updating the toolbar,
    // set the button object's queryable property to true.
    if (descriptor.queryable) {
      button.queryable = true;
    }
  }
  return button;
}


/**
 * A set of built-in buttons to display in the default editor toolbar.
 * @type {!Array<string>}
 */
export var DEFAULT_BUTTONS = [
  Command.IMAGE, Command.LINK, Command.BOLD,
  Command.ITALIC, Command.UNORDERED_LIST,
  Command.FONT_COLOR, Command.FONT_FACE,
  Command.FONT_SIZE, Command.JUSTIFY_LEFT,
  Command.JUSTIFY_CENTER, Command.JUSTIFY_RIGHT,
  Command.EDIT_HTML
];


/**
 * A set of built-in buttons to display in the default editor toolbar when
 * the editor chrome is right-to-left (BiDi mode only).
 * @type {!Array<string>}
 */
export var DEFAULT_BUTTONS_RTL = [
  Command.IMAGE, Command.LINK, Command.BOLD,
  Command.ITALIC, Command.UNORDERED_LIST,
  Command.FONT_COLOR, Command.FONT_FACE,
  Command.FONT_SIZE, Command.JUSTIFY_RIGHT,
  Command.JUSTIFY_CENTER, Command.JUSTIFY_LEFT,
  Command.DIR_RTL, Command.DIR_LTR,
  Command.EDIT_HTML
];


/**
 * Creates a toolbar button with the given ID, tooltip, and caption.  Applies
 * any custom CSS class names to the button's caption element.  This button
 * is designed to be used as the RTL button.
 * @param {string} id Button ID; must equal a {@link Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {ButtonRenderer=} opt_renderer Button renderer; defaults to
 *     {@link goog.ui.ToolbarButtonRenderer} if unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Button} A toolbar button.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
function rtlButtonFactory_(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = ToolbarFactory.makeToggleButton(
      id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper);
  button.updateFromValue = function(value) {
    // Enable/disable right-to-left text editing mode in the toolbar.
    const isRtl = !!value;
    // Enable/disable a marker class on the toolbar's root element; the rest is
    // done using CSS scoping in editortoolbar.css.  This changes
    // direction-senitive toolbar icons (like indent/outdent)
    classlist.enable(
        asserts.assert(button.getParent().getElement()),
        goog.getCssName('tr-rtl-mode'), isRtl);
    button.setChecked(isRtl);
  };
  return button;
}


/**
 * Creates a toolbar button with the given ID, tooltip, and caption.  Applies
 * any custom CSS class names to the button's caption element.  Designed to
 * be used to create undo and redo buttons.
 * @param {string} id Button ID; must equal a {@link Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {ButtonRenderer=} opt_renderer Button renderer; defaults to
 *     {@link goog.ui.ToolbarButtonRenderer} if unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Button} A toolbar button.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
function undoRedoButtonFactory_(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = ToolbarFactory.makeButton(
      id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper);
  button.updateFromValue = function(value) {
    button.setEnabled(value);
  };
  return button;
}


/**
 * Creates a toolbar button with the given ID, tooltip, and caption.  Applies
 * any custom CSS class names to the button's caption element.  Used to create
 * a font face button, filled with default fonts.
 * @param {string} id Button ID; must equal a {@link Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {MenuButtonRenderer=} opt_renderer Button renderer; defaults
 *     to {@link goog.ui.ToolbarMenuButtonRenderer} if unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Button} A toolbar button.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
function fontFaceFactory_(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = ToolbarFactory.makeSelectButton(
      id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper);
  addDefaultFonts(button);
  button.setDefaultCaption(MSG_FONT_NORMAL);
  // Font options don't have keyboard accelerators.
  classlist.add(
      asserts.assert(button.getMenu().getContentElement()),
      goog.getCssName('goog-menu-noaccel'));

  // How to update this button's state.
  button.updateFromValue = function(value) {
    // Normalize value to null or a non-empty string (sometimes we get
    // the empty string, sometimes we get false...), extract the substring
    // up to the first comma to get the primary font name, and normalize
    // to lowercase.  This allows us to map a font spec like "Arial,
    // Helvetica, sans-serif" to a font menu item.
    // TODO (attila): Try to make this more robust.
    let item = null;
    if (value && value.length > 0) {
      item = /** @type {MenuItem} */ (button.getMenu().getChild(
          ToolbarFactory.getPrimaryFont(value)));
    }
    const selectedItem = button.getSelectedItem();
    if (item != selectedItem) {
      button.setSelectedItem(item);
    }
  };
  return button;
}


/**
 * Creates a toolbar button with the given ID, tooltip, and caption.  Applies
 * any custom CSS class names to the button's caption element. Use to create a
 * font size button, filled with default font sizes.
 * @param {string} id Button ID; must equal a {@link Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {MenuButtonRenderer=} opt_renderer Button renderer; defaults
 *     to {@link goog.ui.ToolbarMebuButtonRenderer} if unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Button} A toolbar button.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
function fontSizeFactory_(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = ToolbarFactory.makeSelectButton(
      id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper);
  addDefaultFontSizes(button);
  button.setDefaultCaption(MSG_FONT_SIZE_NORMAL);
  // Font size options don't have keyboard accelerators.
  classlist.add(
      asserts.assert(button.getMenu().getContentElement()),
      goog.getCssName('goog-menu-noaccel'));
  // How to update this button's state.
  button.updateFromValue = function(value) {
    // Webkit pre-534.7 returns a string like '32px' instead of the equivalent
    // integer, so normalize that first.
    // NOTE(user): Gecko returns "6" so can't just normalize all
    // strings, only ones ending in "px".
    if (typeof value === 'string' && style.getLengthUnits(value) == 'px') {
      value = ToolbarFactory.getLegacySizeFromPx(
          parseInt(value, 10));
    }
    // Normalize value to null or a positive integer (sometimes we get
    // the empty string, sometimes we get false, or -1 if the above
    // normalization didn't match to a particular 0-7 size)
    value = value > 0 ? value : null;
    if (value != button.getValue()) {
      button.setValue(value);
    }
  };
  return button;
}


/**
 * Function to update the state of a color menu button.
 * @param {ToolbarColorMenuButton} button The button to which the
 *     color menu is attached.
 * @param {number} color Color value to update to.
 * @private
 */
function colorUpdateFromValue_(button, color) {
  let value = color;

  try {
    if (userAgent.IE) {
      // IE returns a number that, converted to hex, is a BGR color.
      // Convert from decimal to BGR to RGB.
      const hex = '000000' + value.toString(16);
      const bgr = hex.slice(-6);
      value =
          '#' + bgr.substring(4, 6) + bgr.substring(2, 4) + bgr.substring(0, 2);
    }
    if (value != button.getValue()) {
      button.setValue(/** @type {string} */ (value));
    }
  } catch (ex) {
    // TODO(attila): Find out when/why this happens.
  }
}


/**
 * Creates a toolbar button with the given ID, tooltip, and caption.  Applies
 * any custom CSS class names to the button's caption element. Use to create
 * a font color button.
 * @param {string} id Button ID; must equal a {@link Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {ColorMenuButtonRenderer=} opt_renderer Button renderer;
 *     defaults to {@link goog.ui.ToolbarColorMenuButtonRenderer} if
 *     unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Button} A toolbar button.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
function fontColorFactory_(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = ToolbarFactory.makeColorMenuButton(
      id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper);
  // Initialize default foreground color.
  button.setSelectedColor('#000');
  button.updateFromValue = goog.partial(
      colorUpdateFromValue_,
      /** @type {!ToolbarColorMenuButton} */ (button));
  return button;
}


/**
 * Creates a toolbar button with the given ID, tooltip, and caption.  Applies
 * any custom CSS class names to the button's caption element. Use to create
 * a font background color button.
 * @param {string} id Button ID; must equal a {@link Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {ColorMenuButtonRenderer=} opt_renderer Button renderer;
 *     defaults to {@link goog.ui.ToolbarColorMenuButtonRenderer} if
 *     unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Button} A toolbar button.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
function backgroundColorFactory_(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = ToolbarFactory.makeColorMenuButton(
      id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper);
  // Initialize default background color.
  button.setSelectedColor('#FFF');
  button.updateFromValue = goog.partial(
      colorUpdateFromValue_,
      /** @type {!ToolbarColorMenuButton} */ (button));
  return button;
}


/**
 * Creates a toolbar button with the given ID, tooltip, and caption.  Applies
 * any custom CSS class names to the button's caption element. Use to create
 * the format menu, prefilled with default formats.
 * @param {string} id Button ID; must equal a {@link Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {MenuButtonRenderer=} opt_renderer Button renderer;
 *     defaults to
 *     {@link goog.ui.ToolbarMenuButtonRenderer} if unspecified.
 * @param {dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Button} A toolbar button.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
function formatBlockFactory_(id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper) {
  const button = ToolbarFactory.makeSelectButton(
      id, tooltip, caption, opt_classNames, opt_renderer, opt_domHelper);
  addDefaultFormatOptions(button);
  button.setDefaultCaption(MSG_FORMAT_NORMAL);
  // Format options don't have keyboard accelerators.
  classlist.add(
      asserts.assert(button.getMenu().getContentElement()),
      goog.getCssName('goog-menu-noaccel'));
  // How to update this button.
  button.updateFromValue = function(value) {
    // Normalize value to null or a nonempty string (sometimes we get
    // the empty string, sometimes we get false...)
    value = value && value.length > 0 ? value : null;
    if (value != button.getValue()) {
      button.setValue(value);
    }
  };
  return button;
}


// Messages used for tooltips and captions.


/** @desc Format menu tooltip. */
export var MSG_FORMAT_BLOCK_TITLE = goog.getMsg('Format');


/** @desc Format menu caption. */
export var MSG_FORMAT_BLOCK_CAPTION = goog.getMsg('Format');


/** @desc Undo button tooltip. */
export var MSG_UNDO_TITLE = goog.getMsg('Undo');


/** @desc Redo button tooltip. */
export var MSG_REDO_TITLE = goog.getMsg('Redo');


/** @desc Font menu tooltip. */
export var MSG_FONT_FACE_TITLE = goog.getMsg('Font');


/** @desc Font size menu tooltip. */
export var MSG_FONT_SIZE_TITLE = goog.getMsg('Font size');


/** @desc Text foreground color menu tooltip. */
export var MSG_FONT_COLOR_TITLE = goog.getMsg('Text color');


/** @desc Bold button tooltip. */
export var MSG_BOLD_TITLE = goog.getMsg('Bold');


/** @desc Italic button tooltip. */
export var MSG_ITALIC_TITLE = goog.getMsg('Italic');


/** @desc Underline button tooltip. */
export var MSG_UNDERLINE_TITLE = goog.getMsg('Underline');


/** @desc Text background color menu tooltip. */
export var MSG_BACKGROUND_COLOR_TITLE =
    goog.getMsg('Text background color');


/** @desc Link button tooltip. */
export var MSG_LINK_TITLE =
    goog.getMsg('Add or remove link');


/** @desc Numbered list button tooltip. */
export var MSG_ORDERED_LIST_TITLE =
    goog.getMsg('Numbered list');


/** @desc Bullet list button tooltip. */
export var MSG_UNORDERED_LIST_TITLE =
    goog.getMsg('Bullet list');


/** @desc Outdent button tooltip. */
export var MSG_OUTDENT_TITLE =
    goog.getMsg('Decrease indent');


/** @desc Indent button tooltip. */
export var MSG_INDENT_TITLE = goog.getMsg('Increase indent');


/** @desc Align left button tooltip. */
export var MSG_ALIGN_LEFT_TITLE = goog.getMsg('Align left');


/** @desc Align center button tooltip. */
export var MSG_ALIGN_CENTER_TITLE =
    goog.getMsg('Align center');


/** @desc Align right button tooltip. */
export var MSG_ALIGN_RIGHT_TITLE =
    goog.getMsg('Align right');


/** @desc Justify button tooltip. */
export var MSG_JUSTIFY_TITLE = goog.getMsg('Justify');


/** @desc Remove formatting button tooltip. */
export var MSG_REMOVE_FORMAT_TITLE =
    goog.getMsg('Remove formatting');


/** @desc Insert image button tooltip. */
export var MSG_IMAGE_TITLE = goog.getMsg('Insert image');


/** @desc Strike through button tooltip. */
export var MSG_STRIKE_THROUGH_TITLE =
    goog.getMsg('Strikethrough');


/** @desc Left-to-right button tooltip. */
export var MSG_DIR_LTR_TITLE = goog.getMsg('Left-to-right');


/** @desc Right-to-left button tooltip. */
export var MSG_DIR_RTL_TITLE = goog.getMsg('Right-to-left');


/** @desc Blockquote button tooltip. */
export var MSG_BLOCKQUOTE_TITLE = goog.getMsg('Quote');


/** @desc Edit HTML button tooltip. */
export var MSG_EDIT_HTML_TITLE =
    goog.getMsg('Edit HTML source');


/** @desc Subscript button tooltip. */
export var MSG_SUBSCRIPT = goog.getMsg('Subscript');


/** @desc Superscript button tooltip. */
export var MSG_SUPERSCRIPT = goog.getMsg('Superscript');


/** @desc Edit HTML button caption. */
export var MSG_EDIT_HTML_CAPTION = goog.getMsg('Edit HTML');


/**
 * Map of `Command`s to toolbar button descriptor objects,
 * each of which has the following attributes:
 * <ul>
 *   <li>`command` - The command corresponding to the
 *       button (mandatory)
 *   <li>`tooltip` - Tooltip text (optional); if unspecified, the button
 *       has no hover text
 *   <li>`caption` - Caption to display on the button (optional); if
 *       unspecified, the button has no text caption
 *   <li>`classes` - CSS class name(s) to be applied to the button's
 *       element when rendered (optional); if unspecified, defaults to
 *       'tr-icon'
 *       plus 'tr-' followed by the command ID, but without any leading '+'
 *       character (e.g. if the command ID is '+undo', then `classes`
 *       defaults to 'tr-icon tr-undo')
 *   <li>`factory` - factory function used to create the button, which
 *       must accept `id`, `tooltip`, `caption`, and
 *       `classes` as arguments, and must return an instance of
 *       {@link Button} or an appropriate subclass (optional); if
 *       unspecified, defaults to
 *       {@link makeToggleButton},
 *       since most built-in toolbar buttons are toggle buttons
 *   <li>(@code queryable} - Whether the button's state should be queried
 *       when updating the toolbar (optional).
 * </ul>
 * Note that this object is only used for creating toolbar buttons for
 * built-in editor commands; custom buttons aren't listed here.  Please don't
 * try to hack this!
 * @private {!Object<string, !ButtonDescriptor>}.
 */
var buttons_ = {};


/**
 * @typedef {{
 *   command: string,
 *   tooltip: (undefined|string),
 *   caption: (undefined|ControlContent),
 *   classes: (undefined|string),
 *   factory: (undefined|!Function),
 *   queryable:(undefined|boolean)}}
 */
export var ButtonDescriptor;


/**
 * Built-in toolbar button descriptors.  See
 * {@link buttons_} for details on button
 * descriptor objects.  This array is processed at JS parse time; each item is
 * inserted into {@link buttons_}, and the array
 * itself is deleted and (hopefully) garbage-collected.
 * @private {Array<!ButtonDescriptor>}
 */
var button_list_ = [
  {
    command: Command.UNDO,
    tooltip: MSG_UNDO_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-undo'),
    factory: undoRedoButtonFactory_,
    queryable: true
  },
  {
    command: Command.REDO,
    tooltip: MSG_REDO_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-redo'),
    factory: undoRedoButtonFactory_,
    queryable: true
  },
  {
    command: Command.FONT_FACE,
    tooltip: MSG_FONT_FACE_TITLE,
    classes: goog.getCssName('tr-fontName'),
    factory: fontFaceFactory_,
    queryable: true
  },
  {
    command: Command.FONT_SIZE,
    tooltip: MSG_FONT_SIZE_TITLE,
    classes: goog.getCssName('tr-fontSize'),
    factory: fontSizeFactory_,
    queryable: true
  },
  {
    command: Command.BOLD,
    tooltip: MSG_BOLD_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-bold'),
    queryable: true
  },
  {
    command: Command.ITALIC,
    tooltip: MSG_ITALIC_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-italic'),
    queryable: true
  },
  {
    command: Command.UNDERLINE,
    tooltip: MSG_UNDERLINE_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-underline'),
    queryable: true
  },
  {
    command: Command.FONT_COLOR,
    tooltip: MSG_FONT_COLOR_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-foreColor'),
    factory: fontColorFactory_,
    queryable: true
  },
  {
    command: Command.BACKGROUND_COLOR,
    tooltip: MSG_BACKGROUND_COLOR_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-backColor'),
    factory: backgroundColorFactory_,
    queryable: true
  },
  {
    command: Command.LINK,
    tooltip: MSG_LINK_TITLE,
    caption: messages.MSG_LINK_CAPTION,
    classes: goog.getCssName('tr-link'),
    queryable: true
  },
  {
    command: Command.ORDERED_LIST,
    tooltip: MSG_ORDERED_LIST_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' +
        goog.getCssName('tr-insertOrderedList'),
    queryable: true
  },
  {
    command: Command.UNORDERED_LIST,
    tooltip: MSG_UNORDERED_LIST_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' +
        goog.getCssName('tr-insertUnorderedList'),
    queryable: true
  },
  {
    command: Command.OUTDENT,
    tooltip: MSG_OUTDENT_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-outdent'),
    factory: ToolbarFactory.makeButton
  },
  {
    command: Command.INDENT,
    tooltip: MSG_INDENT_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-indent'),
    factory: ToolbarFactory.makeButton
  },
  {
    command: Command.JUSTIFY_LEFT,
    tooltip: MSG_ALIGN_LEFT_TITLE,
    classes:
        goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-justifyLeft'),
    queryable: true
  },
  {
    command: Command.JUSTIFY_CENTER,
    tooltip: MSG_ALIGN_CENTER_TITLE,
    classes:
        goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-justifyCenter'),
    queryable: true
  },
  {
    command: Command.JUSTIFY_RIGHT,
    tooltip: MSG_ALIGN_RIGHT_TITLE,
    classes:
        goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-justifyRight'),
    queryable: true
  },
  {
    command: Command.JUSTIFY_FULL,
    tooltip: MSG_JUSTIFY_TITLE,
    classes:
        goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-justifyFull'),
    queryable: true
  },
  {
    command: Command.REMOVE_FORMAT,
    tooltip: MSG_REMOVE_FORMAT_TITLE,
    classes:
        goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-removeFormat'),
    factory: ToolbarFactory.makeButton
  },
  {
    command: Command.IMAGE,
    tooltip: MSG_IMAGE_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-image'),
    factory: ToolbarFactory.makeButton
  },
  {
    command: Command.STRIKE_THROUGH,
    tooltip: MSG_STRIKE_THROUGH_TITLE,
    classes:
        goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-strikeThrough'),
    queryable: true
  },
  {
    command: Command.SUBSCRIPT,
    tooltip: MSG_SUBSCRIPT,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-subscript'),
    queryable: true
  },
  {
    command: Command.SUPERSCRIPT,
    tooltip: MSG_SUPERSCRIPT,
    classes:
        goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-superscript'),
    queryable: true
  },
  {
    command: Command.DIR_LTR,
    tooltip: MSG_DIR_LTR_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-ltr'),
    queryable: true
  },
  {
    command: Command.DIR_RTL,
    tooltip: MSG_DIR_RTL_TITLE,
    classes: goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-rtl'),
    factory: rtlButtonFactory_,
    queryable: true
  },
  {
    command: Command.BLOCKQUOTE,
    tooltip: MSG_BLOCKQUOTE_TITLE,
    classes:
        goog.getCssName('tr-icon') + ' ' + goog.getCssName('tr-BLOCKQUOTE'),
    queryable: true
  },
  {
    command: Command.FORMAT_BLOCK,
    tooltip: MSG_FORMAT_BLOCK_TITLE,
    caption: MSG_FORMAT_BLOCK_CAPTION,
    classes: goog.getCssName('tr-formatBlock'),
    factory: formatBlockFactory_,
    queryable: true
  },
  {
    command: Command.EDIT_HTML,
    tooltip: MSG_EDIT_HTML_TITLE,
    caption: MSG_EDIT_HTML_CAPTION,
    classes: goog.getCssName('tr-editHtml'),
    factory: ToolbarFactory.makeButton
  }
];


(function() {
  /* Create the buttons_ map from*/
  /* button_list_.*/
  for (let i = 0, button; button = button_list_[i]; i++) {
    buttons_[button.command] = button;
  }

  /* button_list_ is no longer needed*/
  // once the map is ready.
  button_list_ = null;
})();

