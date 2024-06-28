/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Default renderer for {@link goog.ui.Button}s.
 */

goog.declareModuleId('goog.ui.buttonrenderer');

import * as aria from '../a11y/aria/aria.js';
import { Role } from '../a11y/aria/roles.js';
import { State } from '../a11y/aria/attributes.js';
import * as asserts from '../asserts/asserts.js';
import { ButtonSide } from './buttonside.js';
import { Component } from './component.js';
import { ControlRenderer } from './controlrenderer.js';  // circular
const {Button} = goog.requireType('goog.ui.button');



/**
 * Default renderer for {@link goog.ui.Button}s.  Extends the superclass with
 * the following button-specific API methods:
 * <ul>
 *   <li>`getValue` - returns the button element's value
 *   <li>`setValue` - updates the button element to reflect its new value
 *   <li>`getTooltip` - returns the button element's tooltip text
 *   <li>`setTooltip` - updates the button element's tooltip text
 *   <li>`setCollapsed` - removes one or both of the button element's
 *       borders
 * </ul>
 * For alternate renderers, see {@link goog.ui.NativeButtonRenderer},
 * {@link goog.ui.CustomButtonRenderer}, and {@link goog.ui.FlatButtonRenderer}.
 * @constructor
 * @extends {ControlRenderer}
 */
export function ButtonRenderer() {
  ControlRenderer.call(this);
}
goog.inherits(ButtonRenderer, ControlRenderer);
goog.addSingletonGetter(ButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
ButtonRenderer.CSS_CLASS = goog.getCssName('goog-button');


/**
 * Returns the ARIA role to be applied to buttons.
 * @return {Role|undefined} ARIA role.
 * @override
 */
ButtonRenderer.prototype.getAriaRole = function() {
  return Role.BUTTON;
};


/**
 * Updates the button's ARIA (accessibility) state if the button is being
 * treated as a checkbox. Also makes sure that attributes which aren't
 * supported by buttons aren't being added.
 * @param {Element} element Element whose ARIA state is to be updated.
 * @param {Component.State} state Component state being enabled or
 *     disabled.
 * @param {boolean} enable Whether the state is being enabled or disabled.
 * @protected
 * @override
 */
ButtonRenderer.prototype.updateAriaState = function(
    element, state, enable) {
  switch (state) {
    // If button has CHECKED or SELECTED state, assign aria-pressed
    case Component.State.SELECTED:
    case Component.State.CHECKED:
      asserts.assert(element, 'The button DOM element cannot be null.');
      aria.setState(element, State.PRESSED, enable);
      break;
    default:
    case Component.State.OPENED:
    case Component.State.DISABLED:
      ButtonRenderer.base(
          this, 'updateAriaState', element, state, enable);
      break;
  }
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ButtonRenderer.prototype.createDom = function(button) {
  var element = ButtonRenderer.base(this, 'createDom', button);
  this.setTooltip(element, button.getTooltip());

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var value = button.getValue();
  if (value) {
    this.setValue(element, value);
  }

  // If this is a toggle button, set ARIA state
  if (button.isSupportedState(Component.State.CHECKED)) {
    this.updateAriaState(
        element, Component.State.CHECKED, button.isChecked());
  }

  return element;
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ButtonRenderer.prototype.decorate = function(button, element) {
  // The superclass implementation takes care of common attributes; we only
  // need to set the value and the tooltip.
  element =
      ButtonRenderer.superClass_.decorate.call(this, button, element);

  button.setValueInternal(this.getValue(element));
  button.setTooltipInternal(this.getTooltip(element));

  // If this is a toggle button, set ARIA state
  if (button.isSupportedState(Component.State.CHECKED)) {
    this.updateAriaState(
        element, Component.State.CHECKED, button.isChecked());
  }

  return element;
};


/**
 * Takes a button's root element, and returns the value associated with it.
 * No-op in the base class.
 * @param {Element} element The button's root element.
 * @return {string|undefined} The button's value (undefined if none).
 */
ButtonRenderer.prototype.getValue = function(element) {};


/**
 * Takes a button's root element and a value, and updates the element to reflect
 * the new value.  No-op in the base class.
 * @param {Element} element The button's root element.
 * @param {string} value New value.
 */
ButtonRenderer.prototype.setValue = function(element, value) {};


/**
 * Takes a button's root element, and returns its tooltip text.
 * @param {Element} element The button's root element.
 * @return {string|undefined} The tooltip text.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ButtonRenderer.prototype.getTooltip = function(element) {
  return element.title;
};


/**
 * Takes a button's root element and a tooltip string, and updates the element
 * with the new tooltip.
 * @param {Element} element The button's root element.
 * @param {string} tooltip New tooltip text.
 * @protected
 */
ButtonRenderer.prototype.setTooltip = function(element, tooltip) {
  if (element) {
    // Don't set a title attribute if there isn't a tooltip. Blank title
    // attributes can be interpreted incorrectly by screen readers.
    if (tooltip) {
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      element.title = tooltip;
    } else {
      element.removeAttribute('title');
    }
  }
};


/**
 * Collapses the border on one or both sides of the button, allowing it to be
 * combined with the adjacent button(s), forming a single UI componenet with
 * multiple targets.
 * @param {Button} button Button to update.
 * @param {number} sides Bitmap of one or more {@link ButtonSide}s for
 *     which borders should be collapsed.
 * @protected
 */
ButtonRenderer.prototype.setCollapsed = function(button, sides) {
  var isRtl = button.isRightToLeft();
  var collapseLeftClassName =
      goog.getCssName(this.getStructuralCssClass(), 'collapse-left');
  var collapseRightClassName =
      goog.getCssName(this.getStructuralCssClass(), 'collapse-right');

  button.enableClassName(
      isRtl ? collapseRightClassName : collapseLeftClassName,
      !!(sides & ButtonSide.START));
  button.enableClassName(
      isRtl ? collapseLeftClassName : collapseRightClassName,
      !!(sides & ButtonSide.END));
};


/** @override */
ButtonRenderer.prototype.getCssClass = function() {
  return ButtonRenderer.CSS_CLASS;
};
