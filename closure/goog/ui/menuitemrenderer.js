/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link MenuItem}s.
 */

goog.declareModuleId('goog.ui.menuitemrenderer');

import { Role } from '../a11y/aria/roles.js';
import * as asserts from '../asserts/asserts.js';
import * as googDom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { Component } from './component.js';
import { ControlRenderer } from './controlrenderer.js';
const {Control} = goog.requireType('goog.ui.control');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');
const {MenuItem} = goog.requireType('goog.ui.menuitem');



/**
 * Default renderer for {@link MenuItem}s.  Each item has the following
 * structure:
 *
 *    <div class="goog-menuitem">
 *      <div class="goog-menuitem-content">
 *        ...(menu item contents)...
 *      </div>
 *    </div>
 *
 * @constructor
 * @extends {ControlRenderer}
 */
export function MenuItemRenderer() {
  ControlRenderer.call(this);

  /**
   * Commonly used CSS class names, cached here for convenience (and to avoid
   * unnecessary string concatenation).
   * @type {!Array<string>}
   * @private
   */
  this.classNameCache_ = [];
}
goog.inherits(MenuItemRenderer, ControlRenderer);
goog.addSingletonGetter(MenuItemRenderer);


/**
 * CSS class name the renderer applies to menu item elements.
 * @type {string}
 */
MenuItemRenderer.CSS_CLASS = goog.getCssName('goog-menuitem');


/**
 * Constants for referencing composite CSS classes.
 * @enum {number}
 * @private
 */
MenuItemRenderer.CompositeCssClassIndex_ = {
  HOVER: 0,
  CHECKBOX: 1,
  CONTENT: 2
};


/**
 * Returns the composite CSS class by using the cached value or by constructing
 * the value from the base CSS class and the passed index.
 * @param {MenuItemRenderer.CompositeCssClassIndex_} index Index for the
 *     CSS class - could be highlight, checkbox or content in usual cases.
 * @return {string} The composite CSS class.
 * @private
 */
MenuItemRenderer.prototype.getCompositeCssClass_ = function(index) {
  var result = this.classNameCache_[index];
  if (!result) {
    switch (index) {
      case MenuItemRenderer.CompositeCssClassIndex_.HOVER:
        result = goog.getCssName(this.getStructuralCssClass(), 'highlight');
        break;
      case MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX:
        result = goog.getCssName(this.getStructuralCssClass(), 'checkbox');
        break;
      case MenuItemRenderer.CompositeCssClassIndex_.CONTENT:
        result = goog.getCssName(this.getStructuralCssClass(), 'content');
        break;
    }
    this.classNameCache_[index] = result;
  }

  return result;
};


/** @override */
MenuItemRenderer.prototype.getAriaRole = function() {
  return Role.MENU_ITEM;
};


/**
 * Overrides {@link ControlRenderer#createDom} by adding extra markup
 * and stying to the menu item's element if it is selectable or checkable.
 * @param {Control} item Menu item to render.
 * @return {!Element} Root element for the item.
 * @override
 */
MenuItemRenderer.prototype.createDom = function(item) {
  var element = item.getDomHelper().createDom(
      TagName.DIV, this.getClassNames(item).join(' '),
      this.createContent(item.getContent(), item.getDomHelper()));
  this.setEnableCheckBoxStructure(
      item, element, item.isSupportedState(Component.State.SELECTED) ||
          item.isSupportedState(Component.State.CHECKED));
  return element;
};


/** @override */
MenuItemRenderer.prototype.getContentElement = function(element) {
  return /** @type {Element} */ (element && element.firstChild);
};


/**
 * Overrides {@link ControlRenderer#decorate} by initializing the
 * menu item to checkable based on whether the element to be decorated has
 * extra stying indicating that it should be.
 * @param {Control} item Menu item instance to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 * @override
 */
MenuItemRenderer.prototype.decorate = function(item, element) {
  asserts.assert(element);
  if (!this.hasContentStructure(element)) {
    element.appendChild(
        /** @type {!Node} */ (
            this.createContent(element.childNodes, item.getDomHelper())));
  }
  if (classlist.contains(element, goog.getCssName('goog-option'))) {
    (/** @type {MenuItem} */ (item)).setCheckable(true);
    this.setCheckable(item, element, true);
  }
  return MenuItemRenderer.superClass_.decorate.call(
      this, item, element);
};


/**
 * Takes a menu item's root element, and sets its content to the given text
 * caption or DOM structure.  Overrides the superclass immplementation by
 * making sure that the checkbox structure (for selectable/checkable menu
 * items) is preserved.
 * @param {Element} element The item's root element.
 * @param {ControlContent} content Text caption or DOM structure to be
 *     set as the item's content.
 * @override
 */
MenuItemRenderer.prototype.setContent = function(element, content) {
  // Save the checkbox element, if present.
  var contentElement = this.getContentElement(element);
  var checkBoxElement =
      this.hasCheckBoxStructure(element) ? contentElement.firstChild : null;
  MenuItemRenderer.superClass_.setContent.call(this, element, content);
  if (checkBoxElement && !this.hasCheckBoxStructure(element)) {
    // The call to setContent() blew away the checkbox element; reattach it.
    contentElement.insertBefore(
        checkBoxElement, contentElement.firstChild || null);
  }
};


/**
 * Returns true if the element appears to have a proper menu item structure by
 * checking whether its first child has the appropriate structural class name.
 * @param {Element} element Element to check.
 * @return {boolean} Whether the element appears to have a proper menu item DOM.
 * @protected
 */
MenuItemRenderer.prototype.hasContentStructure = function(element) {
  var child = googDom.getFirstElementChild(element);
  var contentClassName = this.getCompositeCssClass_(
      MenuItemRenderer.CompositeCssClassIndex_.CONTENT);
  return !!child && classlist.contains(child, contentClassName);
};


/**
 * Wraps the given text caption or existing DOM node(s) in a structural element
 * containing the menu item's contents.
 * @param {ControlContent} content Menu item contents.
 * @param {googDom.DomHelper} dom DOM helper for document interaction.
 * @return {!Element} Menu item content element.
 * @protected
 */
MenuItemRenderer.prototype.createContent = function(content, dom) {
  var contentClassName = this.getCompositeCssClass_(
      MenuItemRenderer.CompositeCssClassIndex_.CONTENT);
  return dom.createDom(TagName.DIV, contentClassName, content);
};


/**
 * Enables/disables radio button semantics on the menu item.
 * @param {Control} item Menu item to update.
 * @param {Element} element Menu item element to update (may be null if the
 *     item hasn't been rendered yet).
 * @param {boolean} selectable Whether the item should be selectable.
 */
MenuItemRenderer.prototype.setSelectable = function(
    item, element, selectable) {
  if (item && element) {
    this.setEnableCheckBoxStructure(item, element, selectable);
  }
};


/**
 * Enables/disables checkbox semantics on the menu item.
 * @param {Control} item Menu item to update.
 * @param {Element} element Menu item element to update (may be null if the
 *     item hasn't been rendered yet).
 * @param {boolean} checkable Whether the item should be checkable.
 */
MenuItemRenderer.prototype.setCheckable = function(
    item, element, checkable) {
  if (item && element) {
    this.setEnableCheckBoxStructure(item, element, checkable);
  }
};


/**
 * Determines whether the item contains a checkbox element.
 * @param {Element} element Menu item root element.
 * @return {boolean} Whether the element contains a checkbox element.
 * @protected
 */
MenuItemRenderer.prototype.hasCheckBoxStructure = function(element) {
  var contentElement = this.getContentElement(element);
  if (contentElement) {
    var child = contentElement.firstChild;
    var checkboxClassName = this.getCompositeCssClass_(
        MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX);
    return !!child && googDom.isElement(child) &&
        classlist.contains(
            /** @type {!Element} */ (child), checkboxClassName);
  }
  return false;
};


/**
 * Adds or removes extra markup and CSS styling to the menu item to make it
 * selectable or non-selectable, depending on the value of the
 * `selectable` argument.
 * @param {!Control} item Menu item to update.
 * @param {!Element} element Menu item element to update.
 * @param {boolean} enable Whether to add or remove the checkbox structure.
 * @protected
 */
MenuItemRenderer.prototype.setEnableCheckBoxStructure = function(
    item, element, enable) {
  this.setAriaRole(element, item.getPreferredAriaRole());
  this.setAriaStates(item, element);
  if (enable != this.hasCheckBoxStructure(element)) {
    classlist.enable(element, goog.getCssName('goog-option'), enable);
    var contentElement = this.getContentElement(element);
    if (enable) {
      // Insert checkbox structure.
      var checkboxClassName = this.getCompositeCssClass_(
          MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX);
      contentElement.insertBefore(
          item.getDomHelper().createDom(
              TagName.DIV, checkboxClassName),
          contentElement.firstChild || null);
    } else {
      // Remove checkbox structure.
      contentElement.removeChild(
          /** @type {!Node} */ (contentElement.firstChild));
    }
  }
};


/**
 * Takes a single {@link Component.State}, and returns the
 * corresponding CSS class name (null if none).  Overrides the superclass
 * implementation by using 'highlight' as opposed to 'hover' as the CSS
 * class name suffix for the HOVER state, for backwards compatibility.
 * @param {Component.State} state Component state.
 * @return {string|undefined} CSS class representing the given state
 *     (undefined if none).
 * @override
 */
MenuItemRenderer.prototype.getClassForState = function(state) {
  switch (state) {
    case Component.State.HOVER:
      // We use 'highlight' as the suffix, for backwards compatibility.
      return this.getCompositeCssClass_(
          MenuItemRenderer.CompositeCssClassIndex_.HOVER);
    case Component.State.CHECKED:
    case Component.State.SELECTED:
      // We use 'goog-option-selected' as the class, for backwards
      // compatibility.
      return goog.getCssName('goog-option-selected');
    default:
      return MenuItemRenderer.superClass_.getClassForState.call(
          this, state);
  }
};


/**
 * Takes a single CSS class name which may represent a component state, and
 * returns the corresponding component state (0x00 if none).  Overrides the
 * superclass implementation by treating 'goog-option-selected' as special,
 * for backwards compatibility.
 * @param {string} className CSS class name, possibly representing a component
 *     state.
 * @return {Component.State} state Component state corresponding
 *     to the given CSS class (0x00 if none).
 * @override
 */
MenuItemRenderer.prototype.getStateFromClass = function(className) {
  var hoverClassName = this.getCompositeCssClass_(
      MenuItemRenderer.CompositeCssClassIndex_.HOVER);
  switch (className) {
    case goog.getCssName('goog-option-selected'):
      return Component.State.CHECKED;
    case hoverClassName:
      return Component.State.HOVER;
    default:
      return MenuItemRenderer.superClass_.getStateFromClass.call(
          this, className);
  }
};


/** @override */
MenuItemRenderer.prototype.getCssClass = function() {
  return MenuItemRenderer.CSS_CLASS;
};
