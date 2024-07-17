/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Character Picker widget for picking any Unicode character.
 *
 * @see ../demos/charpicker.html
 */

import * as aria from '../a11y/aria/aria.js';

import { State } from '../a11y/aria/attributes.js';
import * as array from '../array/array.js';
import * as asserts from '../asserts/asserts.js';
import { dispose } from '../disposable/dispose.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import * as events from '../events/events.js';
import { Event } from '../events/event.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventType } from '../events/eventtype.js';
import { InputHandler } from '../events/inputhandler.js';
import { KeyCodes } from '../events/keycodes.js';
import { KeyHandler } from '../events/keyhandler.js';
import { CharListDecompressor } from '../i18n/charlistdecompressor.js';
import { CharPickerData } from '../i18n/charpickerdata.js';
import * as uChar from '../i18n/uchar.js';
import { NameFetcher } from '../i18n/uchar/namefetcher.js';
import { Set } from '../structs/set.js';
import * as style from '../style/style.js';
import { Button } from './button.js';
import { Component } from './component.js';
import { ContainerScroller } from './containerscroller.js';
import { FlatButtonRenderer } from './flatbuttonrenderer.js';
import { HoverCard } from './hovercard.js';
import { LabelInput } from './labelinput.js';
import { Menu } from './menu.js';
import { MenuButton } from './menubutton.js';
import { MenuItem } from './menuitem.js';
import { Tooltip } from './tooltip.js';
const { KeyEvent } = goog.requireType('goog.events.keyevent');



/**
 * Character Picker Class. This widget can be used to pick any Unicode
 * character by traversing a category-subcategory structure or by inputing its
 * hex value.
 *
 * See charpicker.html demo for example usage.
 * @param {CharPickerData} charPickerData Category names and charlist.
 * @param {!NameFetcher} charNameFetcher Object which fetches
 *     the names of the characters that are shown in the widget. These names
 *     may be stored locally or come from an external source.
 * @param {Array<string>=} opt_recents List of characters to be displayed in
 *     resently selected characters area.
 * @param {number=} opt_initCategory Sequence number of initial category.
 * @param {number=} opt_initSubcategory Sequence number of initial subcategory.
 * @param {number=} opt_rowCount Number of rows in the grid.
 * @param {number=} opt_columnCount Number of columns in the grid.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {Component}
 * @final
 */
export function CharPicker(
 charPickerData,
 charNameFetcher,
 opt_recents,
 opt_initCategory,
 opt_initSubcategory,
 opt_rowCount,
 opt_columnCount,
 opt_domHelper
) {
 Component.call(this, opt_domHelper);

 /**
   * Object used to retrieve character names.
   * @type {!NameFetcher}
   * @private
   */
 this.charNameFetcher_ = charNameFetcher;

 /**
   * Object containing character lists and category names.
   * @type {CharPickerData}
   * @private
   */
 this.data_ = charPickerData;

 /**
  * The category number to be used on widget init.
  * @type {number}
  * @private
  */
 this.initCategory_ = opt_initCategory || 0;

 /**
  * The subcategory number to be used on widget init.
  * @type {number}
  * @private
  */
 this.initSubcategory_ = opt_initSubcategory || 0;

 /**
  * Number of columns in the grid.
  * @type {number}
  * @private
  */
 this.columnCount_ = opt_columnCount || 10;

 /**
  * Number of entries to be added to the grid.
  * @type {number}
  * @private
  */
 this.gridsize_ = (opt_rowCount || 10) * this.columnCount_;

 /**
  * Number of the recently selected characters displayed.
  * @type {number}
  * @private
  */
 this.recentwidth_ = this.columnCount_ + 1;

 /**
  * List of recently used characters.
  * @type {Array<string>}
  * @private
  */
 this.recents_ = opt_recents || [];

 /**
     * Handler for events.
     * @type {EventHandler<!CharPicker>}
     * @private
     */
 this.eventHandler_ = new EventHandler(this);

 /**
  * Decompressor used to get the list of characters from a base88 encoded
  * character list.
  * @type {Object}
  * @private
  */
 this.decompressor_ = new CharListDecompressor();
}
goog.inherits(CharPicker, Component);


/**
 * The last selected character.
 * @type {?string}
 * @private
 */
CharPicker.prototype.selectedChar_ = null;


/**
 * Set of formatting characters whose display need to be swapped with nbsp
 * to prevent layout issues.
 * @type {?Set}
 * @private
 */
CharPicker.prototype.layoutAlteringChars_ = null;


/**
 * The top category menu.
 * @type {?Menu}
 * @private
 */
CharPicker.prototype.menu_ = null;


/**
 * The top category menu button.
 * @type {?MenuButton}
 * @private
 */
CharPicker.prototype.menubutton_ = null;


/**
 * The subcategory menu.
 * @type {?Menu}
 * @private
 */
CharPicker.prototype.submenu_ = null;


/**
 * The subcategory menu button.
 * @type {?MenuButton}
 * @private
 */
CharPicker.prototype.submenubutton_ = null;


/** @type {number} */
CharPicker.prototype.itempos;


/** @type {!Array<string>} */
CharPicker.prototype.items;


/** @private {!KeyHandler} */
CharPicker.prototype.keyHandler_;


/**
 * Category index used to index the data tables.
 * @type {number}
 */
CharPicker.prototype.category;


/** @private {?Element} */
CharPicker.prototype.stick_ = null;


/**
 * The element representing the number of rows visible in the grid.
 * This along with CharPicker.stick_ would help to create a scrollbar
 * of right size.
 * @type {?HTMLElement}
 * @private
 */
CharPicker.prototype.stickwrap_ = null;


/**
 * The component containing all the buttons for each character in display.
 * @type {?Component}
 * @private
 */
CharPicker.prototype.grid_ = null;


/**
 * The component used for extra information about the character set displayed.
 * @type {?Component}
 * @private
 */
CharPicker.prototype.notice_ = null;


/**
 * Grid displaying recently selected characters.
 * @type {?Component}
 * @private
 */
CharPicker.prototype.recentgrid_ = null;


/**
 * Input field for entering the hex value of the character.
 * @type {?Component}
 * @private
 */
CharPicker.prototype.input_ = null;


/**
 * OK button for entering hex value of the character.
 * @private {?Button}
 */
CharPicker.prototype.okbutton_ = null;


/**
 * Element displaying character name in preview.
 * @type {?Element}
 * @private
 */
CharPicker.prototype.charNameEl_ = null;


/**
 * Element displaying character in preview.
 * @type {?Element}
 * @private
 */
CharPicker.prototype.zoomEl_ = null;


/**
 * Element displaying character number (codepoint) in preview.
 * @type {?Element}
 * @private
 */
CharPicker.prototype.unicodeEl_ = null;


/**
 * Hover card for displaying the preview of a character.
 * Preview would contain character in large size and its U+ notation. It would
 * also display the name, if available.
 * @type {?HoverCard}
 * @private
 */
CharPicker.prototype.hc_ = null;


/**
 * Gets the last selected character.
 * @return {?string} The last selected character.
 */
CharPicker.prototype.getSelectedChar = function() {
 return this.selectedChar_;
};


/**
 * Gets the list of characters user selected recently.
 * @return {Array<string>} The recent character list.
 */
CharPicker.prototype.getRecentChars = function() {
 return this.recents_;
};


/** @override */
CharPicker.prototype.createDom = function() {
 CharPicker.superClass_.createDom.call(this);

 this.decorateInternal(
     this.getDomHelper().createElement(TagName.DIV));
};


/** @override */
CharPicker.prototype.disposeInternal = function() {
 dispose(this.hc_);
 this.hc_ = null;
 dispose(this.eventHandler_);
 this.eventHandler_ = null;
 CharPicker.superClass_.disposeInternal.call(this);
};


/** @override */
CharPicker.prototype.decorateInternal = function(element) {
 CharPicker.superClass_.decorateInternal.call(this, element);

 // The chars below cause layout disruption or too narrow to hover:
 // \u0020, \u00AD, \u2000 - \u200f, \u2028 - \u202f, \u3000, \ufeff
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 var chrs = this.decompressor_.toCharList(':2%C^O80V1H2s2G40Q%s0');
 this.layoutAlteringChars_ = new Set(chrs);

 this.menu_ = new Menu(this.getDomHelper());

 var categories = this.data_.categories;
 for (var i = 0; i < this.data_.categories.length; i++) {
   this.menu_.addChild(this.createMenuItem_(i, categories[i]), true);
 }

 this.menubutton_ = new MenuButton(
     'Category Menu', this.menu_,
     /* opt_renderer */ undefined, this.getDomHelper());
 this.addChild(this.menubutton_, true);

 this.submenu_ = new Menu(this.getDomHelper());

 this.submenubutton_ = new MenuButton(
     'Subcategory Menu', this.submenu_, /* opt_renderer */ undefined,
     this.getDomHelper());
 this.addChild(this.submenubutton_, true);

 // The containing component for grid component and the scroller.
 var gridcontainer = new Component(this.getDomHelper());
 this.addChild(gridcontainer, true);

 var stickwrap = new Component(this.getDomHelper());
 gridcontainer.addChild(stickwrap, true);
 this.stickwrap_ = /** @type {!HTMLElement} */ (stickwrap.getElement());

 var stick = new Component(this.getDomHelper());
 stickwrap.addChild(stick, true);
 this.stick_ = stick.getElement();

 this.grid_ = new Component(this.getDomHelper());
 gridcontainer.addChild(this.grid_, true);

 this.notice_ = new Component(this.getDomHelper());
 this.notice_.setElementInternal(
     this.getDomHelper().createDom(TagName.DIV));
 this.addChild(this.notice_, true);

 // The component used for displaying 'Recent Selections' label.
 /**
  * @desc The text label above the list of recently selected characters.
  */
 var MSG_CHAR_PICKER_RECENT_SELECTIONS = goog.getMsg('Recent Selections:');
 var recenttext = new Component(this.getDomHelper());
 recenttext.setElementInternal(
     this.getDomHelper().createDom(
         TagName.SPAN, null, MSG_CHAR_PICKER_RECENT_SELECTIONS));
 this.addChild(recenttext, true);

 this.recentgrid_ = new Component(this.getDomHelper());
 this.addChild(this.recentgrid_, true);

 // The component used for displaying 'U+'.
 var uplus = new Component(this.getDomHelper());
 uplus.setElementInternal(
     this.getDomHelper().createDom(TagName.SPAN, null, 'U+'));
 this.addChild(uplus, true);

 /**
  * @desc The text inside the input box to specify the hex code of a character.
  */
 var MSG_CHAR_PICKER_HEX_INPUT = goog.getMsg('Hex Input');
 this.input_ =
     new LabelInput(MSG_CHAR_PICKER_HEX_INPUT, this.getDomHelper());
 this.addChild(this.input_, true);

 this.okbutton_ = new Button(
     'OK', /* opt_renderer */ undefined, this.getDomHelper());
 this.addChild(this.okbutton_, true);
 this.okbutton_.setEnabled(false);

 this.zoomEl_ = this.getDomHelper().createDom(
     TagName.DIV,
     {id: 'zoom', className: goog.getCssName('goog-char-picker-char-zoom')});

 this.charNameEl_ = this.getDomHelper().createDom(
     TagName.DIV,
     {id: 'charName', className: goog.getCssName('goog-char-picker-name')});

 this.unicodeEl_ = this.getDomHelper().createDom(
     TagName.DIV,
     {id: 'unicode', className: goog.getCssName('goog-char-picker-unicode')});

 var card = this.getDomHelper().createDom(
     TagName.DIV, {'id': 'preview'}, this.zoomEl_, this.charNameEl_,
     this.unicodeEl_);
 style.setElementShown(card, false);
 this.hc_ = new HoverCard(
     {'DIV': 'char'},
     /* opt_checkDescendants */ undefined, this.getDomHelper());
 this.hc_.setElement(card);
 var self = this;

 /**
  * Function called by hover card just before it is visible to collect data.
  */
 function onBeforeShow() {
   var trigger = self.hc_.getAnchorElement();
   var ch = self.getChar_(trigger);
   if (ch) {
     dom.setTextContent(self.zoomEl_, self.displayChar_(ch));
     dom.setTextContent(self.unicodeEl_, uChar.toHexString(ch));
     // Clear the character name since we don't want to show old data because
     // it is retrieved asynchronously and the DOM object is re-used
     dom.setTextContent(self.charNameEl_, '');
     self.charNameFetcher_.getName(ch, function(charName) {
      if (charName) {
        dom.setTextContent(self.charNameEl_, charName);
      }
     });
   }
 }

 events.listen(
     this.hc_, HoverCard.EventType.BEFORE_SHOW, onBeforeShow);
 asserts.assert(element);
 classlist.add(element, goog.getCssName('goog-char-picker'));
 classlist.add(
     asserts.assert(this.stick_), goog.getCssName('goog-stick'));
 classlist.add(
     asserts.assert(this.stickwrap_), goog.getCssName('goog-stickwrap'));
 classlist.add(
     asserts.assert(gridcontainer.getElement()),
     goog.getCssName('goog-char-picker-grid-container'));
 classlist.add(
     asserts.assert(this.grid_.getElement()),
     goog.getCssName('goog-char-picker-grid'));
 classlist.add(
     asserts.assert(this.recentgrid_.getElement()),
     goog.getCssName('goog-char-picker-grid'));
 classlist.add(
     asserts.assert(this.recentgrid_.getElement()),
     goog.getCssName('goog-char-picker-recents'));

 classlist.add(
     asserts.assert(this.notice_.getElement()),
     goog.getCssName('goog-char-picker-notice'));
 classlist.add(
     asserts.assert(uplus.getElement()),
     goog.getCssName('goog-char-picker-uplus'));
 classlist.add(
     asserts.assert(this.input_.getElement()),
     goog.getCssName('goog-char-picker-input-box'));
 classlist.add(
     asserts.assert(this.okbutton_.getElement()),
     goog.getCssName('goog-char-picker-okbutton'));
 classlist.add(
     asserts.assert(card), goog.getCssName('goog-char-picker-hovercard'));

 this.hc_.className = goog.getCssName('goog-char-picker-hovercard');

 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 this.grid_.buttoncount = this.gridsize_;
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 this.recentgrid_.buttoncount = this.recentwidth_;
 this.populateGridWithButtons_(this.grid_);
 this.populateGridWithButtons_(this.recentgrid_);

 this.updateGrid_(this.recentgrid_, this.recents_);
 this.setSelectedCategory_(this.initCategory_, this.initSubcategory_);
 new ContainerScroller(this.menu_);
 new ContainerScroller(this.submenu_);

 classlist.add(
     asserts.assert(this.menu_.getElement()),
     goog.getCssName('goog-char-picker-menu'));
 classlist.add(
     asserts.assert(this.submenu_.getElement()),
     goog.getCssName('goog-char-picker-menu'));
};


/** @override */
CharPicker.prototype.enterDocument = function() {
 CharPicker.superClass_.enterDocument.call(this);
 var inputkh = new InputHandler(this.input_.getElement());
 this.keyHandler_ = new KeyHandler(this.input_.getElement());

 // Stop the propagation of ACTION events at menu and submenu buttons.
 // If stopped at capture phase, the button will not be set to normal state.
 // If not stopped, the user widget will receive the event, which is
 // undesired. User widget should receive an event only on the character
 // click.
 this.eventHandler_
     .listen(
         this.menubutton_, Component.ComponentEventType.ACTION,
         Event.stopPropagation)
     .listen(
         this.submenubutton_, Component.ComponentEventType.ACTION,
         Event.stopPropagation)
     .listen(
         this, Component.ComponentEventType.ACTION, this.handleSelectedItem_,
         true)
     .listen(
         inputkh, InputHandler.EventType.INPUT, this.handleInput_)
     .listen(
         this.keyHandler_, KeyHandler.EventType.KEY,
         this.handleEnter_)
     .listen(
         this.recentgrid_, Component.ComponentEventType.FOCUS,
         this.handleFocus_)
     .listen(this.grid_, Component.ComponentEventType.FOCUS, this.handleFocus_);

 events.listen(
     this.okbutton_.getElement(), EventType.MOUSEDOWN,
     this.handleOkClick_, true, this);

 events.listen(
     this.stickwrap_, EventType.SCROLL, this.handleScroll_, true,
     this);
};


/**
 * Handles the button focus by updating the aria label with the character name
 * so it becomes possible to get spoken feedback while tabbing through the
 * visible symbols.
 * @param {Event} e The focus event.
 * @private
 */
CharPicker.prototype.handleFocus_ = function(e) {
 var button = e.target;
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 var element = /** @type {!Element} */ (button.getElement());
 var ch = this.getChar_(element);

 // Clear the aria label to avoid speaking the old value in case the button
 // element has no char attribute or the character name cannot be retrieved.
 aria.setState(element, State.LABEL, '');

 if (ch) {
   // This is working with screen readers because the call to getName is
   // synchronous once the values have been prefetched by the RemoteNameFetcher
   // and because it is always synchronous when using the LocalNameFetcher.
   // Also, the special character itself is not used as the label because some
   // screen readers, notably ChromeVox, are not able to speak them.
   // TODO(user): Consider changing the NameFetcher API to provide a
   // method that lets the caller retrieve multiple character names at once
   // so that this asynchronous gymnastic can be avoided.
   this.charNameFetcher_.getName(ch, function(charName) {
    if (charName) {
      aria.setState(element, State.LABEL, charName);
    }
   });
 }
};


/**
 * On scroll, updates the grid with characters correct to the scroll position.
 * @param {Event} e Scroll event to handle.
 * @private
 */
CharPicker.prototype.handleScroll_ = function(e) {
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 var height = e.target.scrollHeight;
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 var top = e.target.scrollTop;
 var itempos =
     Math.ceil(top * this.items.length / (this.columnCount_ * height)) *
     this.columnCount_;
 if (this.itempos != itempos) {
   this.itempos = itempos;
   this.modifyGridWithItems_(this.grid_, this.items, itempos);
 }
 e.stopPropagation();
};


/**
 * On a menu click, sets correct character set in the grid; on a grid click
 * accept the character as the selected one and adds to recent selection, if not
 * already present.
 * @param {Event} e Event for the click on menus or grid.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CharPicker.prototype.handleSelectedItem_ = function(e) {
 var parent = /** @type {Component} */ (e.target).getParent();
 if (parent == this.menu_) {
   this.menu_.setVisible(false);
   this.setSelectedCategory_(e.target.getValue());
 } else if (parent == this.submenu_) {
   this.submenu_.setVisible(false);
   this.setSelectedSubcategory_(e.target.getValue());
 } else if (parent == this.grid_) {
   /** @suppress {strictMissingProperties} Added to tighten compiler checks */
   var button = e.target.getElement();
   this.selectedChar_ = this.getChar_(button);
   this.updateRecents_(this.selectedChar_);
 } else if (parent == this.recentgrid_) {
   /** @suppress {strictMissingProperties} Added to tighten compiler checks */
   this.selectedChar_ = this.getChar_(e.target.getElement());
 }
};


/**
 * When user types the characters displays the preview. Enables the OK button,
 * if the character is valid.
 * @param {Event} e Event for typing in input field.
 * @private
 */
CharPicker.prototype.handleInput_ = function(e) {
 var ch = this.getInputChar();
 if (ch) {
   dom.setTextContent(this.zoomEl_, ch);
   dom.setTextContent(this.unicodeEl_, uChar.toHexString(ch));
   dom.setTextContent(this.charNameEl_, '');
   var coord =
       new Tooltip.ElementTooltipPosition(this.input_.getElement());
   this.hc_.setPosition(coord);
   this.hc_.triggerForElement(this.input_.getElement());
   this.okbutton_.setEnabled(true);
 } else {
   this.hc_.cancelTrigger();
   this.hc_.setVisible(false);
   this.okbutton_.setEnabled(false);
 }
};


/**
 * On OK click accepts the character and updates the recent char list.
 * @param {Event=} opt_event Event for click on OK button.
 * @return {boolean} Indicates whether to propagate event.
 * @private
 */
CharPicker.prototype.handleOkClick_ = function(opt_event) {
 var ch = this.getInputChar();
 if (ch && ch.charCodeAt(0)) {
   this.selectedChar_ = ch;
   this.updateRecents_(ch);
   return true;
 }
 return false;
};


/**
 * Behaves exactly like the OK button on Enter key.
 * @param {KeyEvent} e Event for enter on the input field.
 * @return {boolean} Indicates whether to propagate event.
 * @private
 */
CharPicker.prototype.handleEnter_ = function(e) {
 if (e.keyCode == KeyCodes.ENTER) {
   return this.handleOkClick_() ?
       this.dispatchEvent(Component.ComponentEventType.ACTION) :
       false;
 }
 return false;
};


/**
 * Gets the character from the event target.
 * @param {Element} e Event target containing the 'char' attribute.
 * @return {string} The character specified in the event.
 * @private
 */
CharPicker.prototype.getChar_ = function(e) {
 return e.getAttribute('char');
};


/**
 * Creates a menu entry for either the category listing or subcategory listing.
 * @param {number} id Id to be used for the entry.
 * @param {string} caption Text displayed for the menu item.
 * @return {!MenuItem} Menu item to be added to the menu listing.
 * @private
 */
CharPicker.prototype.createMenuItem_ = function(id, caption) {
 var item = new MenuItem(caption, /* model */ id, this.getDomHelper());
 item.setVisible(true);
 return item;
};


/**
 * Sets the category and updates the submenu items and grid accordingly.
 * @param {number} category Category index used to index the data tables.
 * @param {number=} opt_subcategory Subcategory index used with category index.
 * @private
 */
CharPicker.prototype.setSelectedCategory_ = function(
    category, opt_subcategory) {
 this.category = category;
 this.menubutton_.setCaption(this.data_.categories[category]);
 while (this.submenu_.hasChildren()) {
   this.submenu_.removeChildAt(0, true).dispose();
 }

 var subcategories = this.data_.subcategories[category];
 for (var i = 0; i < subcategories.length; i++) {
   var item = this.createMenuItem_(i, subcategories[i]);
   this.submenu_.addChild(item, true);
 }
 this.setSelectedSubcategory_(opt_subcategory || 0);
};


/**
 * Sets the subcategory and updates the grid accordingly.
 * @param {number} subcategory Sub-category index used to index the data tables.
 * @private
 */
CharPicker.prototype.setSelectedSubcategory_ = function(subcategory) {
 var subcategories = this.data_.subcategories;
 var name = subcategories[this.category][subcategory];
 this.submenubutton_.setCaption(name);
 this.setSelectedGrid_(this.category, subcategory);
};


/**
 * Updates the grid according to a given category and subcategory.
 * @param {number} category Index to the category table.
 * @param {number} subcategory Index to the subcategory table.
 * @private
 */
CharPicker.prototype.setSelectedGrid_ = function(
    category, subcategory) {
 var charLists = this.data_.charList;
 var charListStr = charLists[category][subcategory];
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 var content = this.decompressor_.toCharList(charListStr);
 this.charNameFetcher_.prefetch(charListStr);
 this.updateGrid_(this.grid_, content);
};


/**
 * Updates the grid with new character list.
 * @param {Component} grid The grid which is updated with a new set of
 *     characters.
 * @param {Array<string>} items Characters to be added to the grid.
 * @private
 */
CharPicker.prototype.updateGrid_ = function(grid, items) {
 if (grid == this.grid_) {
   /**
    * @desc The message used when there are invisible characters like space
    *     or format control characters.
    */
   var MSG_PLEASE_HOVER =
       goog.getMsg('Please hover over each cell for the character name.');

   dom.setTextContent(
       this.notice_.getElement(),
       this.charNameFetcher_.isNameAvailable(items[0]) ? MSG_PLEASE_HOVER :
                                                         '');
   this.items = items;
   if (this.stickwrap_.offsetHeight > 0) {
     this.stick_.style.height =
         this.stickwrap_.offsetHeight * items.length / this.gridsize_ + 'px';
   } else {
     // This is the last ditch effort if height is not avaialble.
     // Maximum of 3em is assumed to the cell height. Extra space after
     // last character in the grid is OK.
     this.stick_.style.height =
         3 * this.columnCount_ * items.length / this.gridsize_ + 'em';
   }
   this.stickwrap_.scrollTop = 0;
 }

 this.modifyGridWithItems_(grid, items, 0);
};


/**
 * Updates the grid with new character list for a given starting point.
 * @param {Component} grid The grid which is updated with a new set of
 *     characters.
 * @param {Array<string>} items Characters to be added to the grid.
 * @param {number} start The index from which the characters should be
 *     displayed.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CharPicker.prototype.modifyGridWithItems_ = function(
    grid, items, start) {
 for (var buttonpos = 0, itempos = start;
      buttonpos < grid.buttoncount && itempos < items.length;
      buttonpos++, itempos++) {
   this.modifyCharNode_(
       /** @type {!Button} */ (grid.getChildAt(buttonpos)),
       items[itempos]);
 }

 for (; buttonpos < grid.buttoncount; buttonpos++) {
   grid.getChildAt(buttonpos).setVisible(false);
 }
};


/**
 * Creates the grid for characters to displayed for selection.
 * @param {Component} grid The grid which is updated with a new set of
 *     characters.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CharPicker.prototype.populateGridWithButtons_ = function(grid) {
 for (var i = 0; i < grid.buttoncount; i++) {
   var button = new Button(
       ' ', FlatButtonRenderer.getInstance(), this.getDomHelper());

   // Dispatch the focus event so we can update the aria description while
   // the user tabs through the cells.
   button.setDispatchTransitionEvents(Component.State.FOCUSED, true);

   grid.addChild(button, true);
   button.setVisible(false);

   var buttonEl = button.getElement();
   asserts.assert(buttonEl, 'The button DOM element cannot be null.');

   // Override the button role so the user doesn't hear "button" each time he
   // tabs through the cells.
   aria.removeRole(buttonEl);
 }
};


/**
 * Updates the grid cell with new character.
 * @param {Button} button This button is popped up for new character.
 * @param {string} ch Character to be displayed by the button.
 * @private
 */
CharPicker.prototype.modifyCharNode_ = function(button, ch) {
 var text = this.displayChar_(ch);
 var buttonEl = button.getElement();
 dom.setTextContent(buttonEl, text);
 buttonEl.setAttribute('char', ch);
 button.setVisible(true);
};


/**
 * Adds a given character to the recent character list.
 * @param {string} character Character to be added to the recent list.
 * @private
 */
CharPicker.prototype.updateRecents_ = function(character) {
 if (character && character.charCodeAt(0) &&
     !array.contains(this.recents_, character)) {
   this.recents_.unshift(character);
   if (this.recents_.length > this.recentwidth_) {
     this.recents_.pop();
   }
   this.updateGrid_(this.recentgrid_, this.recents_);
 }
};


/**
 * Gets the user inputed unicode character.
 * @return {string} Unicode character inputed by user.
 */
CharPicker.prototype.getInputChar = function() {
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 var text = this.input_.getValue();
 var code = parseInt(text, 16);
 return /** @type {string} */ (uChar.fromCharCode(code));
};


/**
 * Gets the display character for the given character.
 * @param {string} ch Character whose display is fetched.
 * @return {string} The display of the given character.
 * @private
 */
CharPicker.prototype.displayChar_ = function(ch) {
 return this.layoutAlteringChars_.contains(ch) ? '\u00A0' : ch;
};
