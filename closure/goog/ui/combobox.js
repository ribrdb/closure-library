/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A combo box control that allows user input with
 * auto-suggestion from a limited set of options.
 *
 * @see ../demos/combobox.html
 */

import { Timer } from '../timer/timer.js';

import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { InputType } from '../dom/inputtype.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { EventType } from '../events/eventtype.js';
import { InputHandler } from '../events/inputhandler.js';
import { KeyCodes } from '../events/keycodes.js';
import { KeyHandler } from '../events/keyhandler.js';
import * as log from '../log/log.js';
import { Corner } from '../positioning/positioning.js';
import { MenuAnchoredPosition } from '../positioning/menuanchoredposition.js';
import * as googString from '../string/string.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
import { ItemEvent } from './itemevent.js';
import { LabelInput } from './labelinput.js';
import { Menu } from './menu.js';
import { MenuItem } from './menuitem.js';
import { MenuSeparator } from './menuseparator.js';
import * as registry from './registry.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { Event } = goog.requireType('goog.events.event');
const { KeyEvent } = goog.requireType('goog.events.keyevent');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');
const { MenuItemRenderer } = goog.requireType('goog.ui.menuitemrenderer');



/**
 * A ComboBox control.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @param {Menu=} opt_menu Optional menu component.
 *     This menu is disposed of by this control.
 * @param {LabelInput=} opt_labelInput Optional label input.
 *     This label input is disposed of by this control.
 * @extends {Component}
 * @constructor
 */
export function ComboBox(opt_domHelper, opt_menu, opt_labelInput) {
  Component.call(this, opt_domHelper);

  this.labelInput_ = opt_labelInput || new LabelInput();
  this.enabled_ = true;

  // TODO(user): Allow lazy creation of menus/menu items
  this.menu_ = opt_menu || new Menu(this.getDomHelper());
  this.setupMenu_();
}
goog.inherits(ComboBox, Component);


/**
 * Number of milliseconds to wait before dismissing combobox after blur.
 * @type {number}
 */
ComboBox.BLUR_DISMISS_TIMER_MS = 250;


/**
 * A logger to help debugging of combo box behavior.
 * @type {log.Logger}
 * @private
 */
ComboBox.prototype.logger_ = log.getLogger('goog.ui.ComboBox');


/**
 * Whether the combo box is enabled.
 * @type {boolean}
 * @private
 */
ComboBox.prototype.enabled_;


/**
 * Keyboard event handler to manage key events dispatched by the input element.
 * @type {KeyHandler}
 * @private
 */
ComboBox.prototype.keyHandler_;


/**
 * Input handler to take care of firing events when the user inputs text in
 * the input.
 * @type {InputHandler?}
 * @private
 */
ComboBox.prototype.inputHandler_ = null;


/**
 * The last input token.
 * @type {?string}
 * @private
 */
ComboBox.prototype.lastToken_ = null;


/**
 * A LabelInput control that manages the focus/blur state of the input box.
 * @type {LabelInput?}
 * @private
 */
ComboBox.prototype.labelInput_ = null;


/**
 * Drop down menu for the combo box.  Will be created at construction time.
 * @type {Menu?}
 * @private
 */
ComboBox.prototype.menu_ = null;


/**
 * The cached visible count.
 * @type {number}
 * @private
 */
ComboBox.prototype.visibleCount_ = -1;


/**
 * The input element.
 * @type {?Element}
 * @private
 */
ComboBox.prototype.input_ = null;


/**
 * The match function.  The first argument for the match function will be
 * a MenuItem's caption and the second will be the token to evaluate.
 * @type {Function}
 * @private
 */
ComboBox.prototype.matchFunction_ = googString.startsWith;


/**
 * Element used as the combo boxes button.
 * @type {?Element}
 * @private
 */
ComboBox.prototype.button_ = null;


/**
 * Default text content for the input box when it is unchanged and unfocussed.
 * @type {string}
 * @private
 */
ComboBox.prototype.defaultText_ = '';


/**
 * Name for the input box created
 * @type {string}
 * @private
 */
ComboBox.prototype.fieldName_ = '';


/**
 * Timer identifier for delaying the dismissal of the combo menu.
 * @type {?number}
 * @private
 */
ComboBox.prototype.dismissTimer_ = null;


/**
 * True if the unicode inverted triangle should be displayed in the dropdown
 * button. Defaults to false.
 * @type {boolean} useDropdownArrow
 * @private
 */
ComboBox.prototype.useDropdownArrow_ = false;


/**
 * Create the DOM objects needed for the combo box.  A span and text input.
 * @override
 */
ComboBox.prototype.createDom = function() {
  this.input_ = this.getDomHelper().createDom(TagName.INPUT, {
    name: this.fieldName_,
    type: InputType.TEXT,
    autocomplete: 'off'
  });
  this.button_ = this.getDomHelper().createDom(
      TagName.SPAN, goog.getCssName('goog-combobox-button'));
  this.setElementInternal(
      this.getDomHelper().createDom(
          TagName.SPAN, goog.getCssName('goog-combobox'), this.input_,
          this.button_));
  if (this.useDropdownArrow_) {
    dom.setTextContent(this.button_, '\u25BC');
    style.setUnselectable(this.button_, true /* unselectable */);
  }
  this.input_.setAttribute('label', this.defaultText_);
  this.labelInput_.decorate(this.input_);
  this.menu_.setFocusable(false);
  if (!this.menu_.isInDocument()) {
    this.addChild(this.menu_, true);
  }
};


/**
 * Enables/Disables the combo box.
 * @param {boolean} enabled Whether to enable (true) or disable (false) the
 *     combo box.
 */
ComboBox.prototype.setEnabled = function(enabled) {
  this.enabled_ = enabled;
  this.labelInput_.setEnabled(enabled);
  classlist.enable(
      asserts.assert(this.getElement()),
      goog.getCssName('goog-combobox-disabled'), !enabled);
};


/**
 * @return {boolean} Whether the menu item is enabled.
 */
ComboBox.prototype.isEnabled = function() {
  return this.enabled_;
};


/** @override */
ComboBox.prototype.enterDocument = function() {
  ComboBox.superClass_.enterDocument.call(this);

  var handler = this.getHandler();
  handler.listen(
      this.getElement(), EventType.MOUSEDOWN,
      this.onComboMouseDown_);
  handler.listen(
      this.getDomHelper().getDocument(), EventType.MOUSEDOWN,
      this.onDocClicked_);

  handler.listen(this.input_, EventType.BLUR, this.onInputBlur_);

  this.keyHandler_ = new KeyHandler(this.input_);
  handler.listen(
      this.keyHandler_, KeyHandler.EventType.KEY,
      this.handleKeyEvent);

  this.inputHandler_ = new InputHandler(this.input_);
  handler.listen(
      this.inputHandler_, InputHandler.EventType.INPUT,
      this.onInputEvent_);

  handler.listen(
      this.menu_, Component.ComponentEventType.ACTION, this.onMenuSelected_);
};


/** @override */
ComboBox.prototype.exitDocument = function() {
  this.keyHandler_.dispose();
  delete this.keyHandler_;
  this.inputHandler_.dispose();
  this.inputHandler_ = null;
  ComboBox.superClass_.exitDocument.call(this);
};


/**
 * Combo box currently can't decorate elements.
 * @return {boolean} The value false.
 * @override
 */
ComboBox.prototype.canDecorate = function() {
  return false;
};


/** @override */
ComboBox.prototype.disposeInternal = function() {
  ComboBox.superClass_.disposeInternal.call(this);

  this.clearDismissTimer_();

  this.labelInput_.dispose();
  this.menu_.dispose();

  this.labelInput_ = null;
  this.menu_ = null;
  this.input_ = null;
  this.button_ = null;
};


/**
 * Dismisses the menu and resets the value of the edit field.
 */
ComboBox.prototype.dismiss = function() {
  this.clearDismissTimer_();
  this.hideMenu_();
  this.menu_.setHighlightedIndex(-1);
};


/**
 * Adds a new menu item at the end of the menu.
 * @param {MenuItem} item Menu item to add to the menu.
 */
ComboBox.prototype.addItem = function(item) {
  this.menu_.addChild(item, true);
  this.visibleCount_ = -1;
};


/**
 * Adds a new menu item at a specific index in the menu.
 * @param {MenuItem} item Menu item to add to the menu.
 * @param {number} n Index at which to insert the menu item.
 */
ComboBox.prototype.addItemAt = function(item, n) {
  this.menu_.addChildAt(item, n, true);
  this.visibleCount_ = -1;
};


/**
 * Removes an item from the menu and disposes it.
 * @param {MenuItem} item The menu item to remove.
 */
ComboBox.prototype.removeItem = function(item) {
  var child = this.menu_.removeChild(item, true);
  if (child) {
    child.dispose();
    this.visibleCount_ = -1;
  }
};


/**
 * Remove all of the items from the ComboBox menu
 */
ComboBox.prototype.removeAllItems = function() {
  for (var i = this.getItemCount() - 1; i >= 0; --i) {
    this.removeItem(this.getItemAt(i));
  }
};


/**
 * Removes a menu item at a given index in the menu.
 * @param {number} n Index of item.
 */
ComboBox.prototype.removeItemAt = function(n) {
  var child = this.menu_.removeChildAt(n, true);
  if (child) {
    child.dispose();
    this.visibleCount_ = -1;
  }
};


/**
 * Returns a reference to the menu item at a given index.
 * @param {number} n Index of menu item.
 * @return {MenuItem?} Reference to the menu item.
 */
ComboBox.prototype.getItemAt = function(n) {
  return /** @type {MenuItem?} */ (this.menu_.getChildAt(n));
};


/**
 * Returns the number of items in the list, including non-visible items,
 * such as separators.
 * @return {number} Number of items in the menu for this combobox.
 */
ComboBox.prototype.getItemCount = function() {
  return this.menu_.getChildCount();
};


/**
 * @return {Menu} The menu that pops up.
 */
ComboBox.prototype.getMenu = function() {
  return this.menu_;
};


/**
 * @return {Element} The input element.
 */
ComboBox.prototype.getInputElement = function() {
  return this.input_;
};


/**
 * @return {LabelInput} A LabelInput control that manages the
 *     focus/blur state of the input box.
 */
ComboBox.prototype.getLabelInput = function() {
  return this.labelInput_;
};


/**
 * @return {number} The number of visible items in the menu.
 * @private
 */
ComboBox.prototype.getNumberOfVisibleItems_ = function() {
  if (this.visibleCount_ == -1) {
    var count = 0;
    for (var i = 0, n = this.menu_.getChildCount(); i < n; i++) {
      var item = this.menu_.getChildAt(i);
      if (!(item instanceof MenuSeparator) && item.isVisible()) {
        count++;
      }
    }
    this.visibleCount_ = count;
  }

  return this.visibleCount_;
};


/**
 * Sets the match function to be used when filtering the combo box menu.
 * @param {Function} matchFunction The match function to be used when filtering
 *     the combo box menu.
 */
ComboBox.prototype.setMatchFunction = function(matchFunction) {
  this.matchFunction_ = matchFunction;
};


/**
 * @return {Function} The match function for the combox box.
 */
ComboBox.prototype.getMatchFunction = function() {
  return this.matchFunction_;
};


/**
 * Sets the default text for the combo box.
 * @param {string} text The default text for the combo box.
 */
ComboBox.prototype.setDefaultText = function(text) {
  this.defaultText_ = text;
  if (this.labelInput_) {
    this.labelInput_.setLabel(this.defaultText_);
  }
};


/**
 * @return {string} text The default text for the combox box.
 */
ComboBox.prototype.getDefaultText = function() {
  return this.defaultText_;
};


/**
 * Sets the field name for the combo box.
 * @param {string} fieldName The field name for the combo box.
 */
ComboBox.prototype.setFieldName = function(fieldName) {
  this.fieldName_ = fieldName;
};


/**
 * @return {string} The field name for the combo box.
 */
ComboBox.prototype.getFieldName = function() {
  return this.fieldName_;
};


/**
 * Set to true if a unicode inverted triangle should be displayed in the
 * dropdown button.
 * This option defaults to false for backwards compatibility.
 * @param {boolean} useDropdownArrow True to use the dropdown arrow.
 */
ComboBox.prototype.setUseDropdownArrow = function(useDropdownArrow) {
  this.useDropdownArrow_ = !!useDropdownArrow;
};


/**
 * Sets the current value of the combo box.
 * @param {string} value The new value.
 */
ComboBox.prototype.setValue = function(value) {
  if (this.labelInput_.getValue() != value) {
    this.labelInput_.setValue(value);
    this.handleInputChange_();
  }
};


/**
 * @return {string} The current value of the combo box.
 */
ComboBox.prototype.getValue = function() {
  return this.labelInput_.getValue();
};


/**
 * @return {string} HTML escaped token.
 */
ComboBox.prototype.getToken = function() {
  return googString.htmlEscape(this.getTokenText_());
};


/**
 * @return {string} The token for the current cursor position in the
 *     input box, when multi-input is disabled it will be the full input value.
 * @private
 */
ComboBox.prototype.getTokenText_ = function() {
  // TODO(user): Implement multi-input such that getToken returns a substring
  // of the whole input delimited by commas.
  return googString.trim(this.labelInput_.getValue().toLowerCase());
};


/**
 * @private
 */
ComboBox.prototype.setupMenu_ = function() {
  var sm = this.menu_;
  sm.setVisible(false);
  sm.setAllowAutoFocus(false);
  sm.setAllowHighlightDisabled(true);
};


/**
 * Shows the menu if it isn't already showing.  Also positions the menu
 * correctly, resets the menu item visibilities and highlights the relevant
 * item.
 * @param {boolean} showAll Whether to show all items, with the first matching
 *     item highlighted.
 * @private
 */
ComboBox.prototype.maybeShowMenu_ = function(showAll) {
  var isVisible = this.menu_.isVisible();
  var numVisibleItems = this.getNumberOfVisibleItems_();

  if (isVisible && numVisibleItems == 0) {
    log.fine(this.logger_, 'no matching items, hiding');
    this.hideMenu_();

  } else if (!isVisible && numVisibleItems > 0) {
    if (showAll) {
      log.fine(this.logger_, 'showing menu');
      this.setItemVisibilityFromToken_('');
      this.setItemHighlightFromToken_(this.getTokenText_());
    }
    // In Safari 2.0, when clicking on the combox box, the blur event is
    // received after the click event that invokes this function. Since we want
    // to cancel the dismissal after the blur event is processed, we have to
    // wait for all event processing to happen.
    Timer.callOnce(this.clearDismissTimer_, 1, this);

    this.showMenu_();
  }

  this.positionMenu();
};


/**
 * Positions the menu.
 * @protected
 */
ComboBox.prototype.positionMenu = function() {
  if (this.menu_ && this.menu_.isVisible()) {
    var position = new MenuAnchoredPosition(
        this.getElement(), Corner.BOTTOM_START, true);
    position.reposition(
        this.menu_.getElement(), Corner.TOP_START);
  }
};


/**
 * Show the menu and add an active class to the combo box's element.
 * @private
 */
ComboBox.prototype.showMenu_ = function() {
  this.menu_.setVisible(true);
  classlist.add(
      asserts.assert(this.getElement()),
      goog.getCssName('goog-combobox-active'));
};


/**
 * Hide the menu and remove the active class from the combo box's element.
 * @private
 */
ComboBox.prototype.hideMenu_ = function() {
  this.menu_.setVisible(false);
  classlist.remove(
      asserts.assert(this.getElement()),
      goog.getCssName('goog-combobox-active'));
};


/**
 * Clears the dismiss timer if it's active.
 * @private
 */
ComboBox.prototype.clearDismissTimer_ = function() {
  if (this.dismissTimer_) {
    Timer.clear(this.dismissTimer_);
    this.dismissTimer_ = null;
  }
};


/**
 * Event handler for when the combo box area has been clicked.
 * @param {BrowserEvent} e The browser event.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ComboBox.prototype.onComboMouseDown_ = function(e) {
  // We only want this event on the element itself or the input or the button.
  if (this.enabled_ &&
      (e.target == this.getElement() || e.target == this.input_ ||
       dom.contains(this.button_, /** @type {Node} */ (e.target)))) {
    if (this.menu_.isVisible()) {
      log.fine(this.logger_, 'Menu is visible, dismissing');
      this.dismiss();
    } else {
      log.fine(this.logger_, 'Opening dropdown');
      this.maybeShowMenu_(true);
      this.input_.select();
      this.menu_.setMouseButtonPressed(true);
      // Stop the click event from stealing focus
      e.preventDefault();
    }
  }
  // Stop the event from propagating outside of the combo box
  e.stopPropagation();
};


/**
 * Event handler for when the document is clicked.
 * @param {BrowserEvent} e The browser event.
 * @private
 */
ComboBox.prototype.onDocClicked_ = function(e) {
  if (!dom.contains(
          this.menu_.getElement(), /** @type {Node} */ (e.target))) {
    this.dismiss();
  }
};


/**
 * Handle the menu's select event.
 * @param {Event} e The event.
 * @private
 */
ComboBox.prototype.onMenuSelected_ = function(e) {
  var item = /** @type {!MenuItem} */ (e.target);
  // Stop propagation of the original event and redispatch to allow the menu
  // select to be cancelled at this level. i.e. if a menu item should cause
  // some behavior such as a user prompt instead of assigning the caption as
  // the value.
  if (this.dispatchEvent(
          new ItemEvent(
              Component.ComponentEventType.ACTION, this, item))) {
    var caption = item.getCaption();
    log.fine(
        this.logger_, 'Menu selection: ' + caption + '. Dismissing menu');
    if (this.labelInput_.getValue() != caption) {
      this.labelInput_.setValue(caption);
      this.dispatchEvent(Component.ComponentEventType.CHANGE);
    }
    this.dismiss();
  }
  e.stopPropagation();
};


/**
 * Event handler for when the input box looses focus -- hide the menu
 * @param {BrowserEvent} e The browser event.
 * @private
 */
ComboBox.prototype.onInputBlur_ = function(e) {
  this.clearDismissTimer_();
  this.dismissTimer_ = Timer.callOnce(
      this.dismiss, ComboBox.BLUR_DISMISS_TIMER_MS, this);
};


/**
 * Handles keyboard events from the input box.  Returns true if the combo box
 * was able to handle the event, false otherwise.
 * @param {KeyEvent} e Key event to handle.
 * @return {boolean} Whether the event was handled by the combo box.
 * @protected
 * @suppress {visibility} performActionInternal
 */
ComboBox.prototype.handleKeyEvent = function(e) {
  var isMenuVisible = this.menu_.isVisible();

  // Give the menu a chance to handle the event.
  if (isMenuVisible && this.menu_.handleKeyEvent(e)) {
    return true;
  }

  // The menu is either hidden or didn't handle the event.
  var handled = false;
  switch (e.keyCode) {
    case KeyCodes.ESC:
      // If the menu is visible and the user hit Esc, dismiss the menu.
      if (isMenuVisible) {
        log.fine(
            this.logger_, 'Dismiss on Esc: ' + this.labelInput_.getValue());
        this.dismiss();
        handled = true;
      }
      break;
    case KeyCodes.TAB:
      // If the menu is open and an option is highlighted, activate it.
      if (isMenuVisible) {
        var highlighted = this.menu_.getHighlighted();
        if (highlighted) {
          log.fine(
              this.logger_, 'Select on Tab: ' + this.labelInput_.getValue());
          highlighted.performActionInternal(e);
          handled = true;
        }
      }
      break;
    case KeyCodes.UP:
    case KeyCodes.DOWN:
      // If the menu is hidden and the user hit the up/down arrow, show it.
      if (!isMenuVisible) {
        log.fine(this.logger_, 'Up/Down - maybe show menu');
        this.maybeShowMenu_(true);
        handled = true;
      }
      break;
  }

  if (handled) {
    e.preventDefault();
  }

  return handled;
};


/**
 * Handles the content of the input box changing.
 * @param {Event} e The INPUT event to handle.
 * @private
 */
ComboBox.prototype.onInputEvent_ = function(e) {
  // If the key event is text-modifying, update the menu.
  log.fine(
      this.logger_, 'Key is modifying: ' + this.labelInput_.getValue());
  this.handleInputChange_();
};


/**
 * Handles the content of the input box changing, either because of user
 * interaction or programmatic changes.
 * @private
 */
ComboBox.prototype.handleInputChange_ = function() {
  var token = this.getTokenText_();
  this.setItemVisibilityFromToken_(token);
  if (dom.getActiveElement(this.getDomHelper().getDocument()) ==
      this.input_) {
    // Do not alter menu visibility unless the user focus is currently on the
    // combobox (otherwise programmatic changes may cause the menu to become
    // visible).
    this.maybeShowMenu_(false);
  }
  var highlighted = this.menu_.getHighlighted();
  if (token == '' || !highlighted || !highlighted.isVisible()) {
    this.setItemHighlightFromToken_(token);
  }
  this.lastToken_ = token;
  this.dispatchEvent(Component.ComponentEventType.CHANGE);
};


/**
 * Loops through all menu items setting their visibility according to a token.
 * @param {string} token The token.
 * @private
 */
ComboBox.prototype.setItemVisibilityFromToken_ = function(token) {
  var isVisibleItem = false;
  var count = 0;
  var recheckHidden = !this.matchFunction_(token, this.lastToken_);

  for (var i = 0, n = this.menu_.getChildCount(); i < n; i++) {
    var item = this.menu_.getChildAt(i);
    if (item instanceof MenuSeparator) {
      // Ensure that separators are only shown if there is at least one visible
      // item before them.
      item.setVisible(isVisibleItem);
      isVisibleItem = false;
    } else if (item instanceof MenuItem) {
      if (!item.isVisible() && !recheckHidden) continue;

      var caption = item.getCaption();
      var visible = this.isItemSticky_(item) ||
          caption && this.matchFunction_(caption.toLowerCase(), token);
      if (typeof item.setFormatFromToken == 'function') {
        item.setFormatFromToken(token);
      }
      item.setVisible(!!visible);
      isVisibleItem = visible || isVisibleItem;

    } else {
      // Assume all other items are correctly using their visibility.
      isVisibleItem = item.isVisible() || isVisibleItem;
    }

    if (!(item instanceof MenuSeparator) && item.isVisible()) {
      count++;
    }
  }

  this.visibleCount_ = count;
};


/**
 * Highlights the first token that matches the given token.
 * @param {string} token The token.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ComboBox.prototype.setItemHighlightFromToken_ = function(token) {
  if (token == '') {
    this.menu_.setHighlightedIndex(-1);
    return;
  }

  for (var i = 0, n = this.menu_.getChildCount(); i < n; i++) {
    var item = this.menu_.getChildAt(i);
    var caption = item.getCaption();
    if (caption && this.matchFunction_(caption.toLowerCase(), token)) {
      this.menu_.setHighlightedIndex(i);
      if (item.setFormatFromToken) {
        item.setFormatFromToken(token);
      }
      return;
    }
  }
  this.menu_.setHighlightedIndex(-1);
};


/**
 * Returns true if the item has an isSticky method and the method returns true.
 * @param {MenuItem} item The item.
 * @return {boolean} Whether the item has an isSticky method and the method
 *     returns true.
 * @private
 */
ComboBox.prototype.isItemSticky_ = function(item) {
  return typeof item.isSticky == 'function' && item.isSticky();
};



/**
 * Class for combo box items.
 * @param {ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {*=} opt_data Identifying data for the menu item.
 * @param {dom.DomHelper=} opt_domHelper Optional dom helper used for dom
 *     interactions.
 * @param {MenuItemRenderer=} opt_renderer Optional renderer.
 * @constructor
 * @extends {MenuItem}
 */
export function ComboBoxItem(content, opt_data, opt_domHelper, opt_renderer) {
  ComboBoxItem.base(
      this, 'constructor', content, opt_data, opt_domHelper, opt_renderer);
}
goog.inherits(ComboBoxItem, MenuItem);


/* Register a decorator factory function for ComboBoxItems.*/
registry.setDecoratorByClassName(
    goog.getCssName('goog-combobox-item'), function() {
  // ComboBoxItem defaults to using MenuItemRenderer.
  return new ComboBoxItem(null);
});


/**
 * Whether the menu item is sticky, non-sticky items will be hidden as the
 * user types.
 * @type {boolean}
 * @private
 */
ComboBoxItem.prototype.isSticky_ = false;


/**
 * Sets the menu item to be sticky or not sticky.
 * @param {boolean} sticky Whether the menu item should be sticky.
 */
ComboBoxItem.prototype.setSticky = function(sticky) {
  this.isSticky_ = sticky;
};


/**
 * @return {boolean} Whether the menu item is sticky.
 */
ComboBoxItem.prototype.isSticky = function() {
  return this.isSticky_;
};


/**
 * Sets the format for a menu item based on a token, bolding the token.
 * @param {string} token The token.
 */
ComboBoxItem.prototype.setFormatFromToken = function(token) {
  if (this.isEnabled()) {
    var caption = this.getCaption();
    var index = caption.toLowerCase().indexOf(token);
    if (index >= 0) {
      var domHelper = this.getDomHelper();
      this.setContent([
        domHelper.createTextNode(caption.slice(0, index)),
        domHelper.createDom(
            TagName.B, null,
            caption.slice(index, index + token.length)),
        domHelper.createTextNode(caption.slice(index + token.length))
      ]);
    }
  }
};
