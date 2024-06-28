/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview TabPane widget implementation.
 */

goog.declareModuleId('goog.ui.tabpane');

import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import * as events from '../events/events.js';
import { Event } from '../events/event.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
import { KeyCodes } from '../events/keycodes.js';
import { SafeStyleSheet } from '../html/safestylesheet.js';
import * as style from '../style/style.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * TabPane widget. All children already inside the tab pane container element
 * will be be converted to tabs. Each tab is represented by a TabPane.
 * TabPage object. Further pages can be constructed either from an existing
 * container or created from scratch.
 *
 * @param {Element} el Container element to create the tab pane out of.
 * @param {TabPane.TabLocation=} opt_tabLocation Location of the tabs
 *     in relation to the content container. Default is top.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @param {boolean=} opt_useMouseDown Whether to use MOUSEDOWN instead of CLICK
 *     for tab changes.
 * @extends {EventTarget}
 * @constructor
 * @see ../demos/tabpane.html
 * @deprecated Use goog.ui.TabBar instead.
 */
export function TabPane(el, opt_tabLocation, opt_domHelper, opt_useMouseDown) {
  EventTarget.call(this);

  /**
     * DomHelper used to interact with the document, allowing components to be
     * created in a different window.  This property is considered protected;
     * subclasses of Component may refer to it directly.
     * @type {dom.DomHelper}
     * @protected
     * @suppress {underscore|visibility}
     */
  this.dom_ = opt_domHelper || dom.getDomHelper();

  /**
   * Tab pane element.
   * @type {Element}
   * @private
   */
  this.el_ = el;

  /**
     * Collection of tab panes.
     * @type {Array<TabPane.TabPage>}
     * @private
     */
  this.pages_ = [];

  /**
     * Location of the tabs with respect to the content box.
     * @type {TabPane.TabLocation}
     * @private
     */
  this.tabLocation_ =
      opt_tabLocation ? opt_tabLocation : TabPane.TabLocation.TOP;

  /**
   * Whether to use MOUSEDOWN instead of CLICK for tab change events. This
   * fixes some focus problems on Safari/Chrome.
   * @type {boolean}
   * @private
   */
  this.useMouseDown_ = !!opt_useMouseDown;

  this.create_();
}
goog.inherits(TabPane, EventTarget);


/**
 * Element containing the tab buttons.
 * @type {Element}
 * @private
 */
TabPane.prototype.elButtonBar_;


/**
 * Element containing the tab pages.
 * @type {Element}
 * @private
 */
TabPane.prototype.elContent_;


/**
 * Selected page.
 * @type {TabPane.TabPage?}
 * @private
 */
TabPane.prototype.selected_;


/**
 * Constants for event names
 *
 * @const
 */
TabPane.Events = {
  /** @const {string} */
  CHANGE: 'change'
};


/**
 * Enum for representing the location of the tabs in relation to the content.
 *
 * @enum {number}
 */
TabPane.TabLocation = {
  TOP: 0,
  BOTTOM: 1,
  LEFT: 2,
  RIGHT: 3
};


/**
 * Creates HTML nodes for tab pane.
 *
 * @private
 */
TabPane.prototype.create_ = function() {
  this.el_.className = goog.getCssName('goog-tabpane');

  var nodes = this.getChildNodes_();

  // Create tab strip
  this.elButtonBar_ = this.dom_.createDom(
      TagName.UL,
      {'className': goog.getCssName('goog-tabpane-tabs'), 'tabIndex': '0'});

  // Create content area
  this.elContent_ = this.dom_.createDom(
      TagName.DIV, goog.getCssName('goog-tabpane-cont'));
  this.el_.appendChild(this.elContent_);

  var element = asserts.assertElement(this.el_);

  switch (this.tabLocation_) {
    case TabPane.TabLocation.TOP:
      element.insertBefore(this.elButtonBar_, this.elContent_);
      element.insertBefore(this.createClear_(), this.elContent_);
      classlist.add(element, goog.getCssName('goog-tabpane-top'));
      break;
    case TabPane.TabLocation.BOTTOM:
      element.appendChild(this.elButtonBar_);
      element.appendChild(this.createClear_());
      classlist.add(element, goog.getCssName('goog-tabpane-bottom'));
      break;
    case TabPane.TabLocation.LEFT:
      element.insertBefore(this.elButtonBar_, this.elContent_);
      classlist.add(element, goog.getCssName('goog-tabpane-left'));
      break;
    case TabPane.TabLocation.RIGHT:
      element.insertBefore(this.elButtonBar_, this.elContent_);
      classlist.add(element, goog.getCssName('goog-tabpane-right'));
      break;
    default:
      throw new Error('Invalid tab location');
  }

  // Listen for click and keydown events on header
  this.elButtonBar_.tabIndex = 0;
  events.listen(
      this.elButtonBar_, this.useMouseDown_ ? EventType.MOUSEDOWN :
                                              EventType.CLICK,
      this.onHeaderClick_, false, this);
  events.listen(
      this.elButtonBar_, EventType.KEYDOWN, this.onHeaderKeyDown_,
      false, this);

  this.createPages_(nodes);
};


/**
 * Creates the HTML node for the clearing div, and associated style in
 * the <HEAD>.
 *
 * @return {!Element} Reference to a DOM div node.
 * @private
 */
TabPane.prototype.createClear_ = function() {
  var clearFloatStyle = SafeStyleSheet.createRule(
      '.' + goog.getCssName('goog-tabpane-clear'),
      {'clear': 'both', 'height': '0', 'overflow': 'hidden'});
  style.installSafeStyleSheet(clearFloatStyle);
  return this.dom_.createDom(
      TagName.DIV, goog.getCssName('goog-tabpane-clear'));
};


/** @override */
TabPane.prototype.disposeInternal = function() {
  TabPane.superClass_.disposeInternal.call(this);
  events.unlisten(
      this.elButtonBar_, this.useMouseDown_ ? EventType.MOUSEDOWN :
                                              EventType.CLICK,
      this.onHeaderClick_, false, this);
  events.unlisten(
      this.elButtonBar_, EventType.KEYDOWN, this.onHeaderKeyDown_,
      false, this);
  delete this.el_;
  this.elButtonBar_ = null;
  this.elContent_ = null;
};


/**
 * @return {!Array<Element>} The element child nodes of tab pane container.
 * @private
 */
TabPane.prototype.getChildNodes_ = function() {
  var nodes = [];

  var child = dom.getFirstElementChild(this.el_);
  while (child) {
    nodes.push(child);
    child = dom.getNextElementSibling(child);
  }

  return nodes;
};


/**
 * Creates pages out of a collection of elements.
 *
 * @param {Array<Element>} nodes Array of elements to create pages out of.
 * @private
 */
TabPane.prototype.createPages_ = function(nodes) {
  for (var node, i = 0; node = nodes[i]; i++) {
    this.addPage(new TabPane.TabPage(node));
  }
};


/**
 * Adds a page to the tab pane.
 *
 * @param {TabPane.TabPage} page Tab page to add.
 * @param {number=} opt_index Zero based index to insert tab at. Inserted at the
 *                           end if not specified.
 */
TabPane.prototype.addPage = function(page, opt_index) {
  // If page is already in another tab pane it's removed from that one before it
  // can be added to this one.
  if (page.parent_ && page.parent_ != this &&
      page.parent_ instanceof TabPane) {
    page.parent_.removePage(page);
  }

  // Insert page at specified position
  var index = this.pages_.length;
  if (opt_index !== undefined && opt_index != index) {
    index = opt_index;
    this.pages_.splice(index, 0, page);
    this.elButtonBar_.insertBefore(
        /** @type {!Node} */ (page.elTitle_),
        this.elButtonBar_.childNodes[index]);
  }

  // Append page to end
  else {
    this.pages_.push(page);
    this.elButtonBar_.appendChild(/** @type {!Node} */ (page.elTitle_));
  }

  page.setParent_(this, index);

  // Select first page and fire change event
  if (!this.selected_) {
    this.selected_ = page;
    this.dispatchEvent(new TabPaneEvent(
        TabPane.Events.CHANGE, this, this.selected_));
  }

  // Move page content to the tab pane and update visibility.
  this.elContent_.appendChild(/** @type {!Node} */ (page.elContent_));
  page.setVisible_(page == this.selected_);

  // Update index for following pages
  for (var pg, i = index + 1; pg = this.pages_[i]; i++) {
    pg.index_ = i;
  }
};


/**
 * Removes the specified page from the tab pane.
 *
 * @param {TabPane.TabPage|number} page Reference to tab page or zero
 *     based index.
 */
TabPane.prototype.removePage = function(page) {
  if (typeof page === 'number') {
    page = this.pages_[page];
  }
  this.pages_.splice(page.index_, 1);
  page.setParent_(null);

  dom.removeNode(page.elTitle_);
  dom.removeNode(page.elContent_);

  for (var pg, i = 0; pg = this.pages_[i]; i++) {
    pg.setParent_(this, i);
  }
};


/**
 * Gets the tab page by zero based index.
 *
 * @param {number} index Index of page to return.
 * @return {TabPane.TabPage?} page The tab page.
 */
TabPane.prototype.getPage = function(index) {
  return this.pages_[index];
};


/**
 * Sets the selected tab page by object reference.
 *
 * @param {TabPane.TabPage} page Tab page to select.
 */
TabPane.prototype.setSelectedPage = function(page) {
  if (page.isEnabled() && (!this.selected_ || page != this.selected_)) {
    this.selected_.setVisible_(false);
    page.setVisible_(true);
    this.selected_ = page;

    // Fire changed event
    this.dispatchEvent(
        new TabPaneEvent(
            TabPane.Events.CHANGE, this, this.selected_));
  }
};


/**
 * Sets the selected tab page by zero based index.
 *
 * @param {number} index Index of page to select.
 */
TabPane.prototype.setSelectedIndex = function(index) {
  if (index >= 0 && index < this.pages_.length) {
    this.setSelectedPage(this.pages_[index]);
  }
};


/**
 * @return {number} The index for the selected tab page or -1 if no page is
 *     selected.
 */
TabPane.prototype.getSelectedIndex = function() {
  return this.selected_ ? /** @type {number} */ (this.selected_.index_) : -1;
};


/**
 * @return {TabPane.TabPage?} The selected tab page.
 */
TabPane.prototype.getSelectedPage = function() {
  return this.selected_ || null;
};


/**
 * @return {Element} The element that contains the tab pages.
 */
TabPane.prototype.getContentElement = function() {
  return this.elContent_ || null;
};


/**
 * @return {Element} The main element for the tabpane.
 */
TabPane.prototype.getElement = function() {
  return this.el_ || null;
};


/**
 * Click event handler for header element, handles clicks on tabs.
 * @param {BrowserEvent} event Click event.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
TabPane.prototype.onHeaderClick_ = function(event) {
  var el = event.target;

  // Determine index if a tab (li element) was clicked.
  while (el != this.elButtonBar_) {
    if (el.tagName == TagName.LI) {
      var i;
      // {} prevents compiler warning
      for (i = 0; el = el.previousSibling; i++) {
      }
      this.setSelectedIndex(i);
      break;
    }
    el = el.parentNode;
  }
  event.preventDefault();
};


/**
 * KeyDown event handler for header element. Arrow keys moves between pages.
 * Home and end selects the first/last page.
 * @param {BrowserEvent} event KeyDown event.
 * @private
 * @suppress {strictPrimitiveOperators} Part of the go/strict_warnings_migration
 */
TabPane.prototype.onHeaderKeyDown_ = function(event) {
  if (event.altKey || event.metaKey || event.ctrlKey) {
    return;
  }

  switch (event.keyCode) {
    case KeyCodes.LEFT:
      var index = this.selected_.getIndex() - 1;
      this.setSelectedIndex(index < 0 ? this.pages_.length - 1 : index);
      break;
    case KeyCodes.RIGHT:
      var index = this.selected_.getIndex() + 1;
      this.setSelectedIndex(index >= this.pages_.length ? 0 : index);
      break;
    case KeyCodes.HOME:
      this.setSelectedIndex(0);
      break;
    case KeyCodes.END:
      this.setSelectedIndex(this.pages_.length - 1);
      break;
  }
};



/**
 * Object representing an individual tab pane.
 *
 * @param {Element=} opt_el Container element to create the pane out of.
 * @param {(Element|string)=} opt_title Pane title or element to use as the
 *     title. If not specified the first element in the container is used as
 *     the title.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper
 * The first parameter can be omitted.
 * @constructor
 */
TabPane.TabPage = function(opt_el, opt_title, opt_domHelper) {
  /** @type {!Element|string|null} */
  var title = null;
  var el;
  if (opt_title) {
    title = opt_title;
    el = opt_el;
  } else if (opt_el) {
    var child = dom.getFirstElementChild(opt_el);
    if (child) {
      title = dom.getTextContent(child);
      child.parentNode.removeChild(child);
    }
    el = opt_el;
  }

  /**
     * DomHelper used to interact with the document, allowing components to be
     * created in a different window.  This property is considered protected;
     * subclasses of Component may refer to it directly.
     * @type {dom.DomHelper}
     * @protected
     * @suppress {underscore|visibility}
     */
  this.dom_ = opt_domHelper || dom.getDomHelper();

  /**
   * Content element
   * @type {Element}
   * @private
   */
  this.elContent_ = el || this.dom_.createDom(TagName.DIV);

  /**
   * Title element
   * @type {Element}
   * @private
   */
  this.elTitle_ = this.dom_.createDom(TagName.LI, null, title);

  /**
     * Parent TabPane reference.
     * @type {TabPane?}
     * @private
     */
  this.parent_ = null;

  /**
   * Index for page in tab pane.
   * @type {?number}
   * @private
   */
  this.index_ = null;

  /**
   * Flags if this page is enabled and can be selected.
   * @type {boolean}
   * @private
   */
  this.enabled_ = true;
};


/**
 * @return {string} The title for tab page.
 */
TabPane.TabPage.prototype.getTitle = function() {
  return dom.getTextContent(this.elTitle_);
};


/**
 * Sets title for tab page.
 *
 * @param {string} title Title for tab page.
 */
TabPane.TabPage.prototype.setTitle = function(title) {
  dom.setTextContent(this.elTitle_, title);
};


/**
 * @return {Element} The title element.
 */
TabPane.TabPage.prototype.getTitleElement = function() {
  return this.elTitle_;
};


/**
 * @return {Element} The content element.
 */
TabPane.TabPage.prototype.getContentElement = function() {
  return this.elContent_;
};


/**
 * @return {?number} The index of page in tab pane.
 */
TabPane.TabPage.prototype.getIndex = function() {
  return this.index_;
};


/**
 * @return {TabPane?} The parent tab pane for page.
 */
TabPane.TabPage.prototype.getParent = function() {
  return this.parent_;
};


/**
 * Selects page in the associated tab pane.
 */
TabPane.TabPage.prototype.select = function() {
  if (this.parent_) {
    this.parent_.setSelectedPage(this);
  }
};


/**
 * Sets the enabled state.
 *
 * @param {boolean} enabled Enabled state.
 */
TabPane.TabPage.prototype.setEnabled = function(enabled) {
  this.enabled_ = enabled;
  this.elTitle_.className = enabled ?
      goog.getCssName('goog-tabpane-tab') :
      goog.getCssName('goog-tabpane-tab-disabled');
};


/**
 * Returns if the page is enabled.
 * @return {boolean} Whether the page is enabled or not.
 */
TabPane.TabPage.prototype.isEnabled = function() {
  return this.enabled_;
};


/**
 * Sets visible state for page content and updates style of tab.
 *
 * @param {boolean} visible Visible state.
 * @private
 */
TabPane.TabPage.prototype.setVisible_ = function(visible) {
  if (this.isEnabled()) {
    this.elContent_.style.display = visible ? '' : 'none';
    this.elTitle_.className = visible ?
        goog.getCssName('goog-tabpane-tab-selected') :
        goog.getCssName('goog-tabpane-tab');
  }
};


/**
 * Sets parent tab pane for tab page.
 *
 * @param {TabPane?} tabPane Tab strip object.
 * @param {number=} opt_index Index of page in pane.
 * @private
 */
TabPane.TabPage.prototype.setParent_ = function(tabPane, opt_index) {
  this.parent_ = tabPane;
  this.index_ = (opt_index !== undefined) ? opt_index : null;
};



/**
 * Object representing a tab pane page changed event.
 *
 * @param {string} type Event type.
 * @param {TabPane} target Tab widget initiating event.
 * @param {TabPane.TabPage} page Selected page in tab pane.
 * @extends {Event}
 * @constructor
 * @final
 */
export function TabPaneEvent(type, target, page) {
  Event.call(this, type, target);

  /**
     * The selected page.
     * @type {TabPane.TabPage}
     */
  this.page = page;
}
goog.inherits(TabPaneEvent, Event);
