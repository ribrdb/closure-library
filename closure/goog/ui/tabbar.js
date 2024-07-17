/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Tab bar UI component.
 *
 * @see ../demos/tabbar.html
 */

import { Component } from './component.js';

import { Container, Container as uiContainer } from './container.js';

// We need to include following dependency because of the magic with
// goog.ui.registry.setDecoratorByClassName
import { Tab } from './tab.js';

import { TabBarRenderer } from './tabbarrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { Event } = goog.requireType('goog.events.event');
const { Control } = goog.requireType('goog.ui.control');



/**
 * Tab bar UI component.  A tab bar contains tabs, rendered above, below,
 * before, or after tab contents.  Tabs in tab bars dispatch the following
 * events:
 * <ul>
 *   <li>{@link Component.ComponentEventType.ACTION} when activated via the
 *       keyboard or the mouse,
 *   <li>{@link Component.ComponentEventType.SELECT} when selected, and
 *   <li>{@link Component.ComponentEventType.UNSELECT} when deselected.
 * </ul>
 * Clients may listen for all of the above events on the tab bar itself, and
 * refer to the event target to identify the tab that dispatched the event.
 * When an unselected tab is clicked for the first time, it dispatches both a
 * `SELECT` event and an `ACTION` event; subsequent clicks on an
 * already selected tab only result in `ACTION` events.
 *
 * @param {TabBar.Location=} opt_location Tab bar location; defaults to
 *     {@link TabBar.Location.TOP}.
 * @param {TabBarRenderer=} opt_renderer Renderer used to render or
 *     decorate the container; defaults to {@link TabBarRenderer}.
 * @param {DomHelper=} opt_domHelper DOM helper, used for document
 *     interaction.
 * @constructor
 * @extends {Container}
 */
export function TabBar(opt_location, opt_renderer, opt_domHelper) {
  this.setLocation(opt_location || TabBar.Location.TOP);

  uiContainer.call(
      this, this.getOrientation(),
      opt_renderer || TabBarRenderer.getInstance(), opt_domHelper);

  this.listenToTabEvents_();
}
goog.inherits(TabBar, uiContainer);


/**
 * Tab bar location relative to tab contents.
 * @enum {string}
 */
TabBar.Location = {
  // Above tab contents.
  TOP: 'top',
  // Below tab contents.
  BOTTOM: 'bottom',
  // To the left of tab contents (to the right if the page is right-to-left).
  START: 'start',
  // To the right of tab contents (to the left if the page is right-to-left).
  END: 'end'
};


/**
 * Tab bar location; defaults to {@link TabBar.Location.TOP}.
 * @type {TabBar.Location}
 * @private
 */
TabBar.prototype.location_;


/**
 * Whether keyboard navigation should change the selected tab, or just move
 * the highlight.  Defaults to true.
 * @type {boolean}
 * @private
 */
TabBar.prototype.autoSelectTabs_ = true;


/**
 * The currently selected tab (null if none).
 * @type {Control?}
 * @private
 */
TabBar.prototype.selectedTab_ = null;


/**
 * @override
 */
TabBar.prototype.enterDocument = function() {
  TabBar.superClass_.enterDocument.call(this);

  this.listenToTabEvents_();
};


/** @override */
TabBar.prototype.disposeInternal = function() {
  TabBar.superClass_.disposeInternal.call(this);
  this.selectedTab_ = null;
};


/**
 * Removes the tab from the tab bar.  Overrides the superclass implementation
 * by deselecting the tab being removed.  Since {@link #removeChildAt} uses
 * {@link #removeChild} internally, we only need to override this method.
 * @param {string|Component} tab Tab to remove.
 * @param {boolean=} opt_unrender Whether to call `exitDocument` on the
 *     removed tab, and detach its DOM from the document (defaults to false).
 * @return {?Control} The removed tab, if any.
 * @override
 */
TabBar.prototype.removeChild = function(tab, opt_unrender) {
  // This actually only accepts Controls. There's a TODO
  // on the superclass method to fix this.
  this.deselectIfSelected(/** @type {Control} */ (tab));
  return TabBar.superClass_.removeChild.call(this, tab, opt_unrender);
};


/**
 * @return {TabBar.Location} Tab bar location relative to tab contents.
 */
TabBar.prototype.getLocation = function() {
  return this.location_;
};


/**
 * Sets the location of the tab bar relative to tab contents.
 * @param {TabBar.Location} location Tab bar location relative to tab
 *     contents.
 * @throws {Error} If the tab bar has already been rendered.
 */
TabBar.prototype.setLocation = function(location) {
  // setOrientation() will take care of throwing an error if already rendered.
  this.setOrientation(TabBar.getOrientationFromLocation(location));
  this.location_ = location;
};


/**
 * @return {boolean} Whether keyboard navigation should change the selected tab,
 *     or just move the highlight.
 */
TabBar.prototype.isAutoSelectTabs = function() {
  return this.autoSelectTabs_;
};


/**
 * Enables or disables auto-selecting tabs using the keyboard.  If auto-select
 * is enabled, keyboard navigation switches tabs immediately, otherwise it just
 * moves the highlight.
 * @param {boolean} enable Whether keyboard navigation should change the
 *     selected tab, or just move the highlight.
 */
TabBar.prototype.setAutoSelectTabs = function(enable) {
  this.autoSelectTabs_ = enable;
};


/**
 * Highlights the tab at the given index in response to a keyboard event.
 * Overrides the superclass implementation by also selecting the tab if
 * {@link #isAutoSelectTabs} returns true.
 * @param {number} index Index of tab to highlight.
 * @protected
 * @override
 */
TabBar.prototype.setHighlightedIndexFromKeyEvent = function(index) {
  TabBar.superClass_.setHighlightedIndexFromKeyEvent.call(this, index);
  if (this.autoSelectTabs_) {
    // Immediately select the tab.
    this.setSelectedTabIndex(index);
  }
};


/**
 * @return {Control?} The currently selected tab (null if none).
 */
TabBar.prototype.getSelectedTab = function() {
  return this.selectedTab_;
};


/**
 * Selects the given tab.
 * @param {Control?} tab Tab to select (null to select none).
 */
TabBar.prototype.setSelectedTab = function(tab) {
  if (tab) {
    // Select the tab and have it dispatch a SELECT event, to be handled in
    // handleTabSelect() below.
    tab.setSelected(true);
  } else if (this.getSelectedTab()) {
    // De-select the currently selected tab and have it dispatch an UNSELECT
    // event, to be handled in handleTabUnselect() below.
    this.getSelectedTab().setSelected(false);
  }
};


/**
 * @return {number} Index of the currently selected tab (-1 if none).
 */
TabBar.prototype.getSelectedTabIndex = function() {
  return this.indexOfChild(this.getSelectedTab());
};


/**
 * Selects the tab at the given index.
 * @param {number} index Index of the tab to select (-1 to select none).
 */
TabBar.prototype.setSelectedTabIndex = function(index) {
  this.setSelectedTab(/** @type {Tab} */ (this.getChildAt(index)));
};


/**
 * If the specified tab is the currently selected tab, deselects it, and
 * selects the closest selectable tab in the tab bar (first looking before,
 * then after the deselected tab).  Does nothing if the argument is not the
 * currently selected tab.  Called internally when a tab is removed, hidden,
 * or disabled, to ensure that another tab is selected instead.
 * @param {Control?} tab Tab to deselect (if any).
 * @protected
 */
TabBar.prototype.deselectIfSelected = function(tab) {
  if (tab && tab == this.getSelectedTab()) {
    var index = this.indexOfChild(tab);
    // First look for the closest selectable tab before this one.
    for (var i = index - 1;
         tab = /** @type {Tab} */ (this.getChildAt(i)); i--) {
      if (this.isSelectableTab(tab)) {
        this.setSelectedTab(tab);
        return;
      }
    }
    // Next, look for the closest selectable tab after this one.
    for (var j = index + 1;
         tab = /** @type {Tab} */ (this.getChildAt(j)); j++) {
      if (this.isSelectableTab(tab)) {
        this.setSelectedTab(tab);
        return;
      }
    }
    // If all else fails, just set the selection to null.
    this.setSelectedTab(null);
  }
};


/**
 * Returns true if the tab is selectable, false otherwise.  Only visible and
 * enabled tabs are selectable.
 * @param {Control} tab Tab to check.
 * @return {boolean} Whether the tab is selectable.
 * @protected
 */
TabBar.prototype.isSelectableTab = function(tab) {
  return tab.isVisible() && tab.isEnabled();
};


/**
 * Handles `SELECT` events dispatched by tabs as they become selected.
 * @param {Event} e Select event to handle.
 * @protected
 */
TabBar.prototype.handleTabSelect = function(e) {
  if (this.selectedTab_ && this.selectedTab_ != e.target) {
    // Deselect currently selected tab.
    this.selectedTab_.setSelected(false);
  }
  this.selectedTab_ = /** @type {Tab} */ (e.target);
};


/**
 * Handles `UNSELECT` events dispatched by tabs as they become deselected.
 * @param {Event} e Unselect event to handle.
 * @protected
 */
TabBar.prototype.handleTabUnselect = function(e) {
  if (e.target == this.selectedTab_) {
    this.selectedTab_ = null;
  }
};


/**
 * Handles `DISABLE` events displayed by tabs.
 * @param {Event} e Disable event to handle.
 * @protected
 */
TabBar.prototype.handleTabDisable = function(e) {
  this.deselectIfSelected(/** @type {Tab} */ (e.target));
};


/**
 * Handles `HIDE` events displayed by tabs.
 * @param {Event} e Hide event to handle.
 * @protected
 */
TabBar.prototype.handleTabHide = function(e) {
  this.deselectIfSelected(/** @type {Tab} */ (e.target));
};


/**
 * Handles focus events dispatched by the tab bar's key event target.  If no tab
 * is currently highlighted, highlights the selected tab or the first tab if no
 * tab is selected either.
 * @param {Event} e Focus event to handle.
 * @protected
 * @override
 */
TabBar.prototype.handleFocus = function(e) {
  if (!this.getHighlighted()) {
    this.setHighlighted(
        this.getSelectedTab() ||
        /** @type {Tab} */ (this.getChildAt(0)));
  }
};


/**
 * Subscribes to events dispatched by tabs.
 * @private
 */
TabBar.prototype.listenToTabEvents_ = function() {
  // Listen for SELECT, UNSELECT, DISABLE, and HIDE events dispatched by tabs.
  this.getHandler()
      .listen(this, Component.ComponentEventType.SELECT, this.handleTabSelect)
      .listen(
          this, Component.ComponentEventType.UNSELECT, this.handleTabUnselect)
      .listen(this, Component.ComponentEventType.DISABLE, this.handleTabDisable)
      .listen(this, Component.ComponentEventType.HIDE, this.handleTabHide);
};


/**
 * Returns the {@link Container.Orientation} that is implied by the
 * given {@link TabBar.Location}.
 * @param {TabBar.Location} location Tab bar location.
 * @return {Container.Orientation} Corresponding orientation.
 */
TabBar.getOrientationFromLocation = function(location) {
  return location == TabBar.Location.START ||
          location == TabBar.Location.END ?
      uiContainer.Orientation.VERTICAL :
      uiContainer.Orientation.HORIZONTAL;
};


/* Register a decorator factory function for TabBars.*/
registry.setDecoratorByClassName(
    TabBarRenderer.CSS_CLASS, function() {
  return new TabBar();
});
