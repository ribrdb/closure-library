/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A tab control, designed to be used in {@link TabBar}s.
 *
 * @see ../demos/tabbar.html
 */

goog.declareModuleId('goog.ui.tab');

import { Component } from './component.js';
import { Control } from './control.js';
import { TabRenderer } from './tabrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * Tab control, designed to be hosted in a {@link TabBar}.  The tab's
 * DOM may be different based on the configuration of the containing tab bar,
 * so tabs should only be rendered or decorated as children of a tab bar.
 * @param {ControlContent} content Text caption or DOM structure to
 *     display as the tab's caption (if any).
 * @param {TabRenderer=} opt_renderer Optional renderer used to render
 *     or decorate the tab.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {Control}
 */
export function Tab(content, opt_renderer, opt_domHelper) {
 Control.call(
     this, content, opt_renderer || TabRenderer.getInstance(),
     opt_domHelper);

 // Tabs support the SELECTED state.
 this.setSupportedState(Component.State.SELECTED, true);

 // Tabs must dispatch state transition events for the DISABLED and SELECTED
 // states in order for the tab bar to function properly.
 this.setDispatchTransitionEvents(
     Component.State.DISABLED | Component.State.SELECTED,
     true);
}
goog.inherits(Tab, Control);


/**
 * Tooltip text for the tab, displayed on hover (if any).
 * @type {string|undefined}
 * @private
 */
Tab.prototype.tooltip_;


/**
 * @return {string|undefined} Tab tooltip text (if any).
 */
Tab.prototype.getTooltip = function() {
 return this.tooltip_;
};


/**
 * Sets the tab tooltip text.  If the tab has already been rendered, updates
 * its tooltip.
 * @param {string} tooltip New tooltip text.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Tab.prototype.setTooltip = function(tooltip) {
 this.getRenderer().setTooltip(this.getElement(), tooltip);
 this.setTooltipInternal(tooltip);
};


/**
 * Sets the tab tooltip text.  Considered protected; to be called only by the
 * renderer during element decoration.
 * @param {string} tooltip New tooltip text.
 * @protected
 */
Tab.prototype.setTooltipInternal = function(tooltip) {
 this.tooltip_ = tooltip;
};


/* Register a decorator factory function for Tabs.*/
registry.setDecoratorByClassName(
    TabRenderer.CSS_CLASS, function() {
 return new Tab(null);
});
