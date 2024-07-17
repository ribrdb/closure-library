/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Tabbed pane with style and functionality specific to
 * Editor dialogs.
 */

import * as asserts from '../../asserts/asserts.js';

import * as googDom from '../../dom/dom.js';
import { InputType } from '../../dom/inputtype.js';
import { TagName } from '../../dom/tagname.js';
import * as classlist from '../../dom/classlist.js';
import { EventHandler } from '../../events/eventhandler.js';
import { EventType } from '../../events/eventtype.js';
import * as style from '../../style/style.js';
import { Component } from '../component.js';
import { Control } from '../control.js';
import { Tab } from '../tab.js';
import { TabBar } from '../tabbar.js';
const { Event } = goog.requireType('goog.events.event');



/**
 * Creates a new Editor-style tab pane.
 * @param {googDom.DomHelper} dom The dom helper for the window to create this
 *     tab pane in.
 * @param {string=} opt_caption Optional caption of the tab pane.
 * @constructor
 * @extends {Component}
 * @final
 */
export function TabPane(dom, opt_caption) {
 TabPane.base(this, 'constructor', dom);

 /**
     * The event handler used to register events.
     * @type {EventHandler<!TabPane>}
     * @private
     */
 this.eventHandler_ = new EventHandler(this);
 this.registerDisposable(this.eventHandler_);

 /**
   * The tab bar used to render the tabs.
   * @type {TabBar}
   * @private
   */
 this.tabBar_ =
     new TabBar(TabBar.Location.START, undefined, this.dom_);
 this.tabBar_.setFocusable(false);

 /**
  * The content element.
  * @private
  */
 this.tabContent_ = this.dom_.createDom(
     TagName.DIV, {className: goog.getCssName('goog-tab-content')});

 /**
  * The currently selected radio button.
  * @type {?Element}
  * @private
  */
 this.selectedRadio_ = null;

 /**
  * The currently visible tab content.
  * @type {?Element}
  * @private
  */
 this.visibleContent_ = null;


 // Add the caption as the first element in the tab bar.
 if (opt_caption) {
   const captionControl =
       new Control(opt_caption, undefined, this.dom_);
   captionControl.addClassName(goog.getCssName('tr-tabpane-caption'));
   captionControl.setEnabled(false);
   this.tabBar_.addChild(captionControl, true);
 }
}
goog.inherits(TabPane, Component);


/**
 * @return {string} The ID of the content element for the current tab.
 */
TabPane.prototype.getCurrentTabId = function() {
 return this.tabBar_.getSelectedTab().getId();
};


/**
 * Selects the tab with the given id.
 * @param {string} id Id of the tab to select.
 */
TabPane.prototype.setSelectedTabId = function(id) {
 this.tabBar_.setSelectedTab(this.tabBar_.getChild(id));
};


/**
 * Adds a tab to the tab pane.
 * @param {string} id The id of the tab to add.
 * @param {string} caption The caption of the tab.
 * @param {string} tooltip The tooltip for the tab.
 * @param {string} groupName for the radio button group.
 * @param {Element} content The content element to show when this tab is
 *     selected.
 */
TabPane.prototype.addTab = function(
    id, caption, tooltip, groupName, content) {
 const radio = this.dom_.createDom(
     TagName.INPUT,
     {name: groupName, type: InputType.RADIO});

 const tab = new Tab(
     [radio, this.dom_.createTextNode(caption)], undefined, this.dom_);
 tab.setId(id);
 tab.setTooltip(tooltip);
 this.tabBar_.addChild(tab, true);

 // When you navigate the radio buttons with TAB and then the Arrow keys on
 // Chrome and FF, you get a CLICK event on them, and the radio button
 // is selected.  You don't get a SELECT at all.  We listen for SELECT
 // nonetheless because it's possible that some browser will issue only
 // SELECT.
 this.eventHandler_.listen(
     radio, [EventType.SELECT, EventType.CLICK],
     goog.bind(this.tabBar_.setSelectedTab, this.tabBar_, tab));

 content.id = id + '-tab';
 this.tabContent_.appendChild(content);
 style.setElementShown(content, false);
};


/** @override */
TabPane.prototype.enterDocument = function() {
 TabPane.base(this, 'enterDocument');

 // Get the root element and add a class name to it.
 const root = this.getElement();
 asserts.assert(root);
 classlist.add(root, goog.getCssName('tr-tabpane'));

 // Add the tabs.
 this.addChild(this.tabBar_, true);
 this.eventHandler_.listen(
     this.tabBar_, Component.ComponentEventType.SELECT, this.handleTabSelect_);

 // Add the tab content.
 root.appendChild(this.tabContent_);

 // Add an element to clear the tab float.
 root.appendChild(this.dom_.createDom(TagName.DIV, {
   className: goog.getCssName('goog-tab-bar-clear')
 }));
};


/**
 * Handles a tab change.
 * @param {Event} e The browser change event.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
TabPane.prototype.handleTabSelect_ = function(e) {
 const tab = /** @type {Tab} */ (e.target);

 // Show the tab content.
 if (this.visibleContent_) {
   style.setElementShown(this.visibleContent_, false);
 }
 this.visibleContent_ = this.dom_.getElement(tab.getId() + '-tab');
 style.setElementShown(this.visibleContent_, true);

 // Select the appropriate radio button (and deselect the current one).
 if (this.selectedRadio_) {
   this.selectedRadio_.checked = false;
 }
 this.selectedRadio_ = googDom.getElementsByTagName(
     TagName.INPUT, tab.getElementStrict())[0];
 this.selectedRadio_.checked = true;
};
