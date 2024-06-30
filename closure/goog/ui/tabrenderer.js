/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Default renderer for {@link goog.ui.Tab}s.  Based on the
 * original `TabPane` code.
 */

import { Role } from '../a11y/aria/roles.js';

import { Component } from './component.js';
import { ControlRenderer } from './controlrenderer.js';
const { Control } = goog.requireType('goog.ui.control');
const { Tab } = goog.requireType('goog.ui.tab');



/**
 * Default renderer for {@link goog.ui.Tab}s, based on the `TabPane` code.
 * @constructor
 * @extends {ControlRenderer}
 */
export function TabRenderer() {
  ControlRenderer.call(this);
}
goog.inherits(TabRenderer, ControlRenderer);
goog.addSingletonGetter(TabRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
TabRenderer.CSS_CLASS = goog.getCssName('goog-tab');


/**
 * Returns the CSS class name to be applied to the root element of all tabs
 * rendered or decorated using this renderer.
 * @return {string} Renderer-specific CSS class name.
 * @override
 */
TabRenderer.prototype.getCssClass = function() {
  return TabRenderer.CSS_CLASS;
};


/**
 * Returns the ARIA role to be applied to the tab element.
 * See http://wiki/Main/ARIA for more info.
 * @return {Role} ARIA role.
 * @override
 */
TabRenderer.prototype.getAriaRole = function() {
  return Role.TAB;
};


/**
 * Returns the tab's contents wrapped in a DIV, with the renderer's own CSS
 * class and additional state-specific classes applied to it.  Creates the
 * following DOM structure:
 *
 *    <div class="goog-tab" title="Title">Content</div>
 *
 * @param {Control} tab Tab to render.
 * @return {Element} Root element for the tab.
 * @override
 */
TabRenderer.prototype.createDom = function(tab) {
  var element = TabRenderer.superClass_.createDom.call(this, tab);

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var tooltip = /** @type {!Tab} */ (tab).getTooltip();
  if (tooltip) {
    // Only update the element if the tab has a tooltip.
    this.setTooltip(element, tooltip);
  }

  return element;
};


/**
 * Decorates the element with the tab.  Initializes the tab's ID, content,
 * tooltip, and state based on the ID of the element, its title, child nodes,
 * and CSS classes, respectively.  Returns the element.
 * @param {Control} tab Tab to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 * @override
 * @suppress {strictMissingProperties,visibility} Added to tighten compiler checks
 */
TabRenderer.prototype.decorate = function(tab, element) {
  element = TabRenderer.superClass_.decorate.call(this, tab, element);

  var tooltip = this.getTooltip(element);
  if (tooltip) {
    // Only update the tab if the element has a tooltip.
    /** @type {!Tab} */ (tab).setTooltipInternal(tooltip);
  }

  // If the tab is selected and hosted in a tab bar, update the tab bar's
  // selection model.
  if (tab.isSelected()) {
    var tabBar = tab.getParent();
    if (tabBar && typeof tabBar.setSelectedTab === 'function') {
      // We need to temporarily deselect the tab, so the tab bar can re-select
      // it and thereby correctly initialize its state.  We use the protected
      // setState() method to avoid dispatching useless events.
      tab.setState(Component.State.SELECTED, false);
      tabBar.setSelectedTab(tab);
    }
  }

  return element;
};


/**
 * Takes a tab's root element, and returns its tooltip text, or the empty
 * string if the element has no tooltip.
 * @param {Element} element The tab's root element.
 * @return {string} The tooltip text (empty string if none).
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
TabRenderer.prototype.getTooltip = function(element) {
  return element.title || '';
};


/**
 * Takes a tab's root element and a tooltip string, and updates the element
 * with the new tooltip.  If the new tooltip is null or undefined, sets the
 * element's title to the empty string.
 * @param {Element} element The tab's root element.
 * @param {string|null|undefined} tooltip New tooltip text (if any).
 */
TabRenderer.prototype.setTooltip = function(element, tooltip) {
  if (element) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    element.title = tooltip || '';
  }
};
