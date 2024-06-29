/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the MenuBase class.
 */

import { EventHandler } from '../events/eventhandler.js';

import { EventType } from '../events/eventtype.js';
import { KeyHandler } from '../events/keyhandler.js';
import { Popup } from './popup.js';
const { Event } = goog.requireType('goog.events.event');
const { KeyEvent } = goog.requireType('goog.events.keyevent');



/**
 * The MenuBase class provides an abstract base class for different
 * implementations of menu controls.
 *
 * @param {Element=} opt_element A DOM element for the popup.
 * @deprecated Use goog.ui.Menu.
 * @constructor
 * @extends {Popup}
 */
export function MenuBase(opt_element) {
 Popup.call(this, opt_element);

 /**
     * Event handler for simplifiying adding/removing listeners.
     * @type {EventHandler<!MenuBase>}
     * @private
     */
 this.eventHandler_ = new EventHandler(this);

 /**
   * KeyHandler to cope with the vagaries of cross-browser key events.
   * @type {KeyHandler}
   * @private
   */
 this.keyHandler_ = new KeyHandler(this.getElement());
}
goog.inherits(MenuBase, Popup);


/**
 * Events fired by the Menu
 * @const
 */
MenuBase.Events = {};


/**
 * Event fired by the Menu when an item is "clicked".
 * @const {string}
 */
MenuBase.Events.ITEM_ACTION = 'itemaction';


/** @override */
MenuBase.prototype.disposeInternal = function() {
 MenuBase.superClass_.disposeInternal.call(this);
 this.eventHandler_.dispose();
 this.keyHandler_.dispose();
};


/**
 * Called after the menu is shown. Derived classes can override to hook this
 * event but should make sure to call the parent class method.
 *
 * @protected
 * @override
 */
MenuBase.prototype.onShow = function() {
 MenuBase.superClass_.onShow.call(this);

 // register common event handlers for derived classes
 var el = this.getElement();
 this.eventHandler_.listen(
     el, EventType.MOUSEOVER, this.onMouseOver);
 this.eventHandler_.listen(
     el, EventType.MOUSEOUT, this.onMouseOut);
 this.eventHandler_.listen(
     el, EventType.MOUSEDOWN, this.onMouseDown);
 this.eventHandler_.listen(el, EventType.MOUSEUP, this.onMouseUp);

 this.eventHandler_.listen(
     this.keyHandler_, KeyHandler.EventType.KEY, this.onKeyDown);
};


/**
 * Called after the menu is hidden. Derived classes can override to hook this
 * event but should make sure to call the parent class method.
 * @param {?Node=} opt_target Target of the event causing the hide.
 * @protected
 * @override
 */
MenuBase.prototype.onHide = function(opt_target) {
 MenuBase.superClass_.onHide.call(this, opt_target);

 // remove listeners when hidden
 this.eventHandler_.removeAll();
};


/**
 * Returns the selected item
 *
 * @return {Object} The item selected or null if no item is selected.
 */
MenuBase.prototype.getSelectedItem = function() {
 return null;
};


/**
 * Sets the selected item
 *
 * @param {Object} item The item to select. The type of this item is specific
 *     to the menu class.
 */
MenuBase.prototype.setSelectedItem = function(item) {};


/**
 * Mouse over handler for the menu. Derived classes should override.
 *
 * @param {Event} e The event object.
 * @protected
 */
MenuBase.prototype.onMouseOver = function(e) {};


/**
 * Mouse out handler for the menu. Derived classes should override.
 *
 * @param {Event} e The event object.
 * @protected
 */
MenuBase.prototype.onMouseOut = function(e) {};


/**
 * Mouse down handler for the menu. Derived classes should override.
 *
 * @param {!Event} e The event object.
 * @protected
 */
MenuBase.prototype.onMouseDown = function(e) {};


/**
 * Mouse up handler for the menu. Derived classes should override.
 *
 * @param {Event} e The event object.
 * @protected
 */
MenuBase.prototype.onMouseUp = function(e) {};


/**
 * Key down handler for the menu. Derived classes should override.
 *
 * @param {KeyEvent} e The event object.
 * @protected
 */
MenuBase.prototype.onKeyDown = function(e) {};
