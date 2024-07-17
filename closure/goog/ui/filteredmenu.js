/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Menu where items can be filtered based on user keyboard input.
 * If a filter is specified only the items matching it will be displayed.
 *
 * @see ../demos/filteredmenu.html
 */


import * as aria from '../a11y/aria/aria.js';

import { AutoCompleteValues, State } from '../a11y/aria/attributes.js';
import * as googDom from '../dom/dom.js';
import { InputType } from '../dom/inputtype.js';
import { TagName } from '../dom/tagname.js';
import * as events from '../events/events.js';
import { EventType } from '../events/eventtype.js';
import { InputHandler } from '../events/inputhandler.js';
import { KeyCodes } from '../events/keycodes.js';
import * as googString from '../string/string.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
import { FilterObservingMenuItem } from './filterobservingmenuitem.js';
import { Menu } from './menu.js';
import { MenuItem } from './menuitem.js';
import * as userAgent from '../useragent/useragent.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { KeyEvent } = goog.requireType('goog.events.keyevent');
const { Control } = goog.requireType('goog.ui.control');
const { MenuRenderer } = goog.requireType('goog.ui.menurenderer');



/**
 * Filtered menu class.
 * @param {MenuRenderer=} opt_renderer Renderer used to render filtered
 *     menu; defaults to {@link MenuRenderer}.
 * @param {googDom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {Menu}
 */
export function FilteredMenu(opt_renderer, opt_domHelper) {
  Menu.call(this, opt_domHelper, opt_renderer);
}
goog.inherits(FilteredMenu, Menu);


/**
 * Events fired by component.
 * @enum {string}
 */
FilteredMenu.EventType = {
  /** Dispatched after the component filter criteria has been changed. */
  FILTER_CHANGED: 'filterchange'
};


/**
 * Filter menu element ids.
 * @enum {string}
 * @private
 */
FilteredMenu.Id_ = {
  CONTENT_ELEMENT: 'content-el'
};


/**
 * Filter input element.
 * @type {Element|undefined}
 * @private
 */
FilteredMenu.prototype.filterInput_;


/**
 * The input handler that provides the input event.
 * @type {InputHandler|undefined}
 * @private
 */
FilteredMenu.prototype.inputHandler_;


/**
 * Maximum number of characters for filter input.
 * @type {number}
 * @private
 */
FilteredMenu.prototype.maxLength_ = 0;


/**
 * Label displayed in the filter input when no text has been entered.
 * @type {string}
 * @private
 */
FilteredMenu.prototype.label_ = '';


/**
 * Label element.
 * @type {Element|undefined}
 * @private
 */
FilteredMenu.prototype.labelEl_;


/**
 * Whether multiple items can be entered comma separated.
 * @type {boolean}
 * @private
 */
FilteredMenu.prototype.allowMultiple_ = false;


/**
 * List of items entered in the search box if multiple entries are allowed.
 * @type {Array<string>|undefined}
 * @private
 */
FilteredMenu.prototype.enteredItems_;


/**
 * Index of first item that should be affected by the filter. Menu items with
 * a lower index will not be affected by the filter.
 * @type {number}
 * @private
 */
FilteredMenu.prototype.filterFromIndex_ = 0;


/**
 * Filter applied to the menu.
 * @type {string|undefined|null}
 * @private
 */
FilteredMenu.prototype.filterStr_;


/**
 * @private {Element}
 */
FilteredMenu.prototype.contentElement_;


/**
 * Map of child nodes that shouldn't be affected by filtering.
 * @type {Object|undefined}
 * @private
 */
FilteredMenu.prototype.persistentChildren_;


/** @override */
FilteredMenu.prototype.createDom = function() {
  FilteredMenu.superClass_.createDom.call(this);

  var dom = this.getDomHelper();
  var el = dom.createDom(
      TagName.DIV,
      goog.getCssName(this.getRenderer().getCssClass(), 'filter'),
      this.labelEl_ = dom.createDom(TagName.DIV, null, this.label_),
      this.filterInput_ = dom.createDom(
          TagName.INPUT, {'type': InputType.TEXT}));
  var element = this.getElement();
  dom.appendChild(element, el);
  var contentElementId = this.makeId(FilteredMenu.Id_.CONTENT_ELEMENT);
  this.contentElement_ = dom.createDom(TagName.DIV, {
    'class': goog.getCssName(this.getRenderer().getCssClass(), 'content'),
    'id': contentElementId
  });
  dom.appendChild(element, this.contentElement_);

  this.initFilterInput_();

  aria.setState(
      this.filterInput_, State.AUTOCOMPLETE,
      AutoCompleteValues.LIST);
  aria.setState(
      this.filterInput_, State.OWNS, contentElementId);
  aria.setState(
      this.filterInput_, State.EXPANDED, true);
};


/**
 * Helper method that initializes the filter input element.
 * @private
 */
FilteredMenu.prototype.initFilterInput_ = function() {
  this.setFocusable(true);
  this.setKeyEventTarget(this.filterInput_);

  // Workaround for mozilla bug #236791.
  if (userAgent.GECKO) {
    this.filterInput_.setAttribute('autocomplete', 'off');
  }

  if (this.maxLength_) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.filterInput_.maxLength = this.maxLength_;
  }
};


/**
 * Sets up listeners and prepares the filter functionality.
 * @private
 */
FilteredMenu.prototype.setUpFilterListeners_ = function() {
  if (!this.inputHandler_ && this.filterInput_) {
    this.inputHandler_ = new InputHandler( (this.filterInput_));
    style.setUnselectable(this.filterInput_, false);
    events.listen(
        this.inputHandler_, InputHandler.EventType.INPUT,
        this.handleFilterEvent, false, this);
    events.listen(
        this.filterInput_.parentNode, EventType.CLICK,
        this.onFilterLabelClick_, false, this);
    if (this.allowMultiple_) {
      this.enteredItems_ = [];
    }
  }
};


/**
 * Tears down listeners and resets the filter functionality.
 * @private
 */
FilteredMenu.prototype.tearDownFilterListeners_ = function() {
  if (this.inputHandler_) {
    events.unlisten(
        this.inputHandler_, InputHandler.EventType.INPUT,
        this.handleFilterEvent, false, this);
    events.unlisten(
        this.filterInput_.parentNode, EventType.CLICK,
        this.onFilterLabelClick_, false, this);

    this.inputHandler_.dispose();
    this.inputHandler_ = undefined;
    this.enteredItems_ = undefined;
  }
};


/** @override */
FilteredMenu.prototype.setVisible = function(show, opt_force, opt_e) {
  var visibilityChanged = FilteredMenu.superClass_.setVisible.call(
      this, show, opt_force, opt_e);
  if (visibilityChanged && show && this.isInDocument()) {
    this.setFilter('');
    this.setUpFilterListeners_();
  } else if (visibilityChanged && !show) {
    this.tearDownFilterListeners_();
  }

  return visibilityChanged;
};


/** @override */
FilteredMenu.prototype.disposeInternal = function() {
  this.tearDownFilterListeners_();
  this.filterInput_ = undefined;
  this.labelEl_ = undefined;
  FilteredMenu.superClass_.disposeInternal.call(this);
};


/**
 * Sets the filter label (the label displayed in the filter input element if no
 * text has been entered).
 * @param {?string} label Label text.
 */
FilteredMenu.prototype.setFilterLabel = function(label) {
  this.label_ = label || '';
  if (this.labelEl_) {
    googDom.setTextContent(this.labelEl_, this.label_);
  }
};


/**
 * @return {string} The filter label.
 */
FilteredMenu.prototype.getFilterLabel = function() {
  return this.label_;
};


/**
 * Sets the filter string.
 * @param {?string} str Filter string.
 */
FilteredMenu.prototype.setFilter = function(str) {
  if (this.filterInput_) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.filterInput_.value = str;
    this.filterItems_(str);
  }
};


/**
 * Returns the filter string.
 * @return {string} Current filter or an an empty string.
 */
FilteredMenu.prototype.getFilter = function() {
  return this.filterInput_ && typeof this.filterInput_.value === 'string' ?
      this.filterInput_.value :
      '';
};


/**
 * Sets the index of first item that should be affected by the filter. Menu
 * items with a lower index will not be affected by the filter.
 * @param {number} index Index of first item that should be affected by filter.
 */
FilteredMenu.prototype.setFilterFromIndex = function(index) {
  this.filterFromIndex_ = index;
};


/**
 * Returns the index of first item that is affected by the filter.
 * @return {number} Index of first item that is affected by filter.
 */
FilteredMenu.prototype.getFilterFromIndex = function() {
  return this.filterFromIndex_;
};


/**
 * Gets a list of items entered in the search box.
 * @return {!Array<string>} The entered items.
 */
FilteredMenu.prototype.getEnteredItems = function() {
  return this.enteredItems_ || [];
};


/**
 * Sets whether multiple items can be entered comma separated.
 * @param {boolean} b Whether multiple items can be entered.
 */
FilteredMenu.prototype.setAllowMultiple = function(b) {
  this.allowMultiple_ = b;
};


/**
 * @return {boolean} Whether multiple items can be entered comma separated.
 */
FilteredMenu.prototype.getAllowMultiple = function() {
  return this.allowMultiple_;
};


/**
 * Sets whether the specified child should be affected (shown/hidden) by the
 * filter criteria.
 * @param {Component} child Child to change.
 * @param {boolean} persistent Whether the child should be persistent.
 */
FilteredMenu.prototype.setPersistentVisibility = function(
    child, persistent) {
  if (!this.persistentChildren_) {
    this.persistentChildren_ = {};
  }
  this.persistentChildren_[child.getId()] = persistent;
};


/**
 * Returns whether the specified child should be affected (shown/hidden) by the
 * filter criteria.
 * @param {Component} child Menu item to check.
 * @return {boolean} Whether the menu item is persistent.
 */
FilteredMenu.prototype.hasPersistentVisibility = function(child) {
  return !!(
      this.persistentChildren_ && this.persistentChildren_[child.getId()]);
};


/**
 * Handles filter input events.
 * @param {BrowserEvent} e The event object.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
FilteredMenu.prototype.handleFilterEvent = function(e) {
  this.filterItems_(this.filterInput_.value);

  // Highlight the first visible item unless there's already a highlighted item.
  var highlighted = this.getHighlighted();
  if (!highlighted || !highlighted.isVisible()) {
    this.highlightFirst();
  }
  this.dispatchEvent(FilteredMenu.EventType.FILTER_CHANGED);
};


/**
 * Shows/hides elements based on the supplied filter.
 * @param {?string} str Filter string.
 * @private
 */
FilteredMenu.prototype.filterItems_ = function(str) {
  // Do nothing unless the filter string has changed.
  if (this.filterStr_ == str) {
    return;
  }

  if (this.labelEl_) {
    this.labelEl_.style.visibility = str == '' ? 'visible' : 'hidden';
  }

  if (this.allowMultiple_ && this.enteredItems_) {
    // Matches all non space characters after the last comma.
    var lastWordRegExp = /^(.+),[ ]*([^,]*)$/;
    var matches = str.match(lastWordRegExp);
    // matches[1] is the string up to, but not including, the last comma and
    // matches[2] the part after the last comma. If there are no non-space
    // characters after the last comma matches[2] is undefined.
    var items = matches && matches[1] ? matches[1].split(',') : [];

    // If the number of comma separated items has changes recreate the
    // entered items array and fire a change event.
    if (str.slice(-1) == ',' || items.length != this.enteredItems_.length) {
      var lastItem = items[items.length - 1] || '';

      // Auto complete text in input box based on the highlighted item.
      if (this.getHighlighted() && lastItem != '') {
        var caption = this.getHighlighted().getCaption();
        if (caption.toLowerCase().indexOf(lastItem.toLowerCase()) == 0) {
          items[items.length - 1] = caption;
          /**
           * @suppress {strictMissingProperties} Added to tighten compiler
           * checks
           */
          this.filterInput_.value = items.join(',') + ',';
        }
      }
      this.enteredItems_ = items;
      this.dispatchEvent(Component.ComponentEventType.CHANGE);
      this.setHighlightedIndex(-1);
    }

    if (matches) {
      str = matches.length > 2 ? googString.trim(matches[2]) : '';
    }
  }

  var matcher =
      new RegExp('(^|[- ,_/.:])' + googString.regExpEscape(str), 'i');
  for (var child, i = this.filterFromIndex_; child = this.getChildAt(i); i++) {
    if (child instanceof FilterObservingMenuItem) {
      child.callObserver(str);
    } else if (!this.hasPersistentVisibility(child)) {
      // Only show items matching the filter and highlight the part of the
      // caption that matches.
      var caption = child.getCaption();
      if (caption) {
        var matchArray = caption.match(matcher);
        if (str == '' || matchArray) {
          child.setVisible(true);
          var pos = caption.indexOf(matchArray[0]);

          // If position is non zero increase by one to skip the separator.
          if (pos) {
            pos++;
          }
          this.boldContent(child, pos, str.length);
        } else {
          child.setVisible(false);
        }
      } else {
        // Hide separators and other items without a caption if a filter string
        // has been entered.
        child.setVisible(str == '');
      }
    }
  }
  this.filterStr_ = str;
};


/**
 * Updates the content of the given menu item, bolding the part of its caption
 * from start and through the next len characters.
 * @param {!Control} child The control to bold content on.
 * @param {number} start The index at which to start bolding.
 * @param {number} len How many characters to bold.
 * @protected
 */
FilteredMenu.prototype.boldContent = function(child, start, len) {
  var caption = child.getCaption();
  var boldedCaption;
  if (len == 0) {
    boldedCaption = this.getDomHelper().createTextNode(caption);
  } else {
    var preMatch = caption.slice(0, start);
    var match = caption.slice(start, start + len);
    var postMatch = caption.slice(start + len);
    boldedCaption = this.getDomHelper().createDom(
        TagName.SPAN, null, preMatch,
        this.getDomHelper().createDom(TagName.B, null, match),
        postMatch);
  }
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var accelerator = child.getAccelerator && child.getAccelerator();
  if (accelerator) {
    child.setContent([
      boldedCaption, this.getDomHelper().createDom(
                         TagName.SPAN,
                         MenuItem.ACCELERATOR_CLASS, accelerator)
    ]);
  } else {
    child.setContent(boldedCaption);
  }
};


/**
 * Handles the menu's behavior for a key event. The highlighted menu item will
 * be given the opportunity to handle the key behavior.
 * @param {KeyEvent} e A browser event.
 * @return {boolean} Whether the event was handled.
 * @override
 */
FilteredMenu.prototype.handleKeyEventInternal = function(e) {
  // Home, end and the arrow keys are normally used to change the selected menu
  // item. Return false here to prevent the menu from preventing the default
  // behavior for HOME, END and any key press with a modifier.
  if (e.shiftKey || e.ctrlKey || e.altKey ||
      e.keyCode == KeyCodes.HOME ||
      e.keyCode == KeyCodes.END) {
    return false;
  }

  if (e.keyCode == KeyCodes.ESC) {
    this.dispatchEvent(Component.ComponentEventType.BLUR);
    return true;
  }

  return FilteredMenu.superClass_.handleKeyEventInternal.call(this, e);
};


/**
 * Sets the highlighted index, unless the HIGHLIGHT event is intercepted and
 * cancelled.  -1 = no highlight. Also scrolls the menu item into view.
 * @param {number} index Index of menu item to highlight.
 * @override
 */
FilteredMenu.prototype.setHighlightedIndex = function(index) {
  FilteredMenu.superClass_.setHighlightedIndex.call(this, index);
  var contentEl = this.getContentElement();
  var el = /** @type {!HTMLElement} */ (
      this.getHighlighted() ? this.getHighlighted().getElement() : null);
  if (this.filterInput_) {
    aria.setActiveDescendant(this.filterInput_, el);
  }

  if (el && googDom.contains(contentEl, el)) {
    style.scrollIntoContainerView(el, contentEl);
  }
};

/**
 * Handles clicks on the filter label. Focuses the input element.
 * @param {BrowserEvent} e A browser event.
 * @private
 */
FilteredMenu.prototype.onFilterLabelClick_ = function(e) {
  this.filterInput_.focus();
};


/** @override */
FilteredMenu.prototype.getContentElement = function() {
  return this.contentElement_ || this.getElement();
};


/**
 * Returns the filter input element.
 * @return {Element} Input element.
 */
FilteredMenu.prototype.getFilterInputElement = function() {
  return this.filterInput_ || null;
};


/** @override */
FilteredMenu.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  // Decorate the menu content.
  this.decorateContent(element);

  // Locate internally managed elements.
  var el = this.getDomHelper().getElementsByTagNameAndClass(
      TagName.DIV,
      goog.getCssName(this.getRenderer().getCssClass(), 'filter'), element)[0];
  this.labelEl_ = googDom.getFirstElementChild(el);
  this.filterInput_ = googDom.getNextElementSibling(this.labelEl_);
  this.contentElement_ = googDom.getNextElementSibling(el);

  // Decorate additional menu items (like 'apply').
  this.getRenderer().decorateChildren(
      this,
      /** @type {!Element} */ (el.parentNode), this.contentElement_);

  this.initFilterInput_();
};
