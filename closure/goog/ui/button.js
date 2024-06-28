/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A button control. This implementation extends {@link
 * Control}.
 *
 * @see ../demos/button.html
 */

goog.declareModuleId('goog.ui.button');

import { EventType } from '../events/eventtype.js';
import { KeyCodes } from '../events/keycodes.js';
import { KeyHandler } from '../events/keyhandler.js';
import { ButtonRenderer } from './buttonrenderer.js';
import { ButtonSide } from './buttonside.js';
import { Component } from './component.js';
import { Control } from './control.js';
import { NativeButtonRenderer } from './nativebuttonrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { KeyEvent} = goog.requireType('goog.events.keyevent');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');



/**
 * A button control, rendered as a native browser button by default.
 *
 * @param {ControlContent=} opt_content Text caption or existing DOM
 *     structure to display as the button's caption (if any).
 * @param {ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the button; defaults to {@link NativeButtonRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {Control}
 */
export function Button(opt_content, opt_renderer, opt_domHelper) {
 Control.call(
     this, opt_content,
     opt_renderer || NativeButtonRenderer.getInstance(),
     opt_domHelper);
}
goog.inherits(Button, Control);


/**
 * Constants for button sides, see {@link Button.prototype.setCollapsed}
 * for details. Aliased from ButtonSide to support legacy users without
 * creating a circular dependency in {@link ButtonRenderer}.
 * @enum {number}
 * @deprecated use {@link ButtonSide} instead.
 */
Button.Side = ButtonSide;


/**
 * Value associated with the button.
 * @type {*}
 * @private
 */
Button.prototype.value_;


/**
 * Tooltip text for the button, displayed on hover.
 * @type {string|undefined}
 * @private
 */
Button.prototype.tooltip_;


/* Button API implementation.*/


/**
 * Returns the value associated with the button.
 * @return {*} Button value (undefined if none).
 */
Button.prototype.getValue = function() {
 return this.value_;
};


/**
 * Sets the value associated with the button, and updates its DOM.
 * @param {*} value New button value.
 */
Button.prototype.setValue = function(value) {
 this.value_ = value;
 var renderer = /** @type {!ButtonRenderer} */ (this.getRenderer());
 renderer.setValue(this.getElement(), /** @type {string} */ (value));
};


/**
 * Sets the value associated with the button.  Unlike {@link #setValue},
 * doesn't update the button's DOM.  Considered protected; to be called only
 * by renderer code during element decoration.
 * @param {*} value New button value.
 * @protected
 */
Button.prototype.setValueInternal = function(value) {
 this.value_ = value;
};


/**
 * Returns the tooltip for the button.
 * @return {string|undefined} Tooltip text (undefined if none).
 */
Button.prototype.getTooltip = function() {
 return this.tooltip_;
};


/**
 * Sets the tooltip for the button, and updates its DOM.
 * @param {string} tooltip New tooltip text.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Button.prototype.setTooltip = function(tooltip) {
 this.tooltip_ = tooltip;
 this.getRenderer().setTooltip(this.getElement(), tooltip);
};


/**
 * Sets the tooltip for the button.  Unlike {@link #setTooltip}, doesn't update
 * the button's DOM.  Considered protected; to be called only by renderer code
 * during element decoration.
 * @param {string} tooltip New tooltip text.
 * @protected
 */
Button.prototype.setTooltipInternal = function(tooltip) {
 this.tooltip_ = tooltip;
};


/**
 * Collapses the border on one or both sides of the button, allowing it to be
 * combined with the adjancent button(s), forming a single UI componenet with
 * multiple targets.
 * @param {number} sides Bitmap of one or more {@link ButtonSide}s for
 *     which borders should be collapsed.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Button.prototype.setCollapsed = function(sides) {
 this.getRenderer().setCollapsed(this, sides);
};


// goog.ui.Control & goog.ui.Component API implementation.


/** @override */
Button.prototype.disposeInternal = function() {
 Button.superClass_.disposeInternal.call(this);
 delete this.value_;
 delete this.tooltip_;
};


/** @override */
Button.prototype.enterDocument = function() {
 Button.superClass_.enterDocument.call(this);
 if (this.isSupportedState(Component.State.FOCUSED)) {
   var keyTarget = this.getKeyEventTarget();
   if (keyTarget) {
     this.getHandler().listen(
         keyTarget, EventType.KEYUP, this.handleKeyEventInternal);
   }
 }
};


/**
 * Attempts to handle a keyboard event; returns true if the event was handled,
 * false otherwise.  If the button is enabled and the Enter/Space key was
 * pressed, handles the event by dispatching an `ACTION` event,
 * and returns true. Overrides {@link Control#handleKeyEventInternal}.
 * @param {KeyEvent} e Key event to handle.
 * @return {boolean} Whether the key event was handled.
 * @protected
 * @override
 */
Button.prototype.handleKeyEventInternal = function(e) {
 if (e.keyCode == KeyCodes.ENTER &&
         e.type == KeyHandler.EventType.KEY ||
     e.keyCode == KeyCodes.SPACE &&
         e.type == EventType.KEYUP) {
   return this.performActionInternal(e);
 }
 // Return true for space keypress (even though the event is handled on keyup)
 // as preventDefault needs to be called up keypress to take effect in IE and
 // WebKit.
 return e.keyCode == KeyCodes.SPACE;
};


/* Register a decorator factory function for Buttons.*/
registry.setDecoratorByClassName(
    ButtonRenderer.CSS_CLASS, function() {
 return new Button(null);
});
