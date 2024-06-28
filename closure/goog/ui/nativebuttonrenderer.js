/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Native browser button renderer for {@link goog.ui.Button}s.
 */

import * as asserts from '../asserts/asserts.js';

import { InputType } from '../dom/inputtype.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { EventType } from '../events/eventtype.js';
import { ButtonRenderer } from './buttonrenderer.js';
import { Component } from './component.js';
const {Control} = goog.requireType('goog.ui.control');



/**
 * Renderer for {@link goog.ui.Button}s.  Renders and decorates native HTML
 * button elements.  Since native HTML buttons have built-in support for many
 * features, overrides many expensive (and redundant) superclass methods to
 * be no-ops.
 * @constructor
 * @extends {ButtonRenderer}
 */
export function NativeButtonRenderer() {
 ButtonRenderer.call(this);
}
goog.inherits(NativeButtonRenderer, ButtonRenderer);
goog.addSingletonGetter(NativeButtonRenderer);


/** @override */
NativeButtonRenderer.prototype.getAriaRole = function() {
 // Native buttons don't need ARIA roles to be recognized by screen readers.
 return undefined;
};


/**
 * Returns the button's contents wrapped in a native HTML button element.  Sets
 * the button's disabled attribute as needed.
 * @param {Control} button Button to render.
 * @return {!Element} Root element for the button (a native HTML button
 *     element).
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
NativeButtonRenderer.prototype.createDom = function(button) {
 this.setUpNativeButton_(button);
 return button.getDomHelper().createDom(
     TagName.BUTTON, {
       'class': this.getClassNames(button).join(' '),
       'disabled': !button.isEnabled(),
       'title': button.getTooltip() || '',
       'value': button.getValue() || ''
     },
     button.getCaption() || '');
};


/**
 * Overrides {@link ButtonRenderer#canDecorate} by returning true only
 * if the element is an HTML button.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
NativeButtonRenderer.prototype.canDecorate = function(element) {
 return element.tagName == TagName.BUTTON ||
     (element.tagName == TagName.INPUT &&
      (element.type == InputType.BUTTON ||
       element.type == InputType.SUBMIT ||
       element.type == InputType.RESET));
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
NativeButtonRenderer.prototype.decorate = function(button, element) {
 this.setUpNativeButton_(button);
 if (element.disabled) {
   // Add the marker class for the DISABLED state before letting the superclass
   // implementation decorate the element, so its state will be correct.
   var disabledClassName = asserts.assertString(
       this.getClassForState(Component.State.DISABLED));
   classlist.add(element, disabledClassName);
 }
 return NativeButtonRenderer.superClass_.decorate.call(
     this, button, element);
};


/**
 * Native buttons natively support BiDi and keyboard focus.
 * @suppress {visibility} getHandler and performActionInternal
 * @override
 */
NativeButtonRenderer.prototype.initializeDom = function(button) {
 // WARNING:  This is a hack, and it is only applicable to native buttons,
 // which are special because they do natively what most Controls
 // do programmatically.  Do not use your renderer's initializeDom method
 // to hook up event handlers!
 button.getHandler().listen(
     button.getElement(), EventType.CLICK,
     button.performActionInternal);
};


/**
 * @override
 * Native buttons don't support text selection.
 */
NativeButtonRenderer.prototype.setAllowTextSelection = function() {};


/**
 * @override
 * Native buttons natively support right-to-left rendering.
 */
NativeButtonRenderer.prototype.setRightToLeft = function() {};


/**
 * @override
 * Native buttons are always focusable as long as they are enabled.
 */
NativeButtonRenderer.prototype.isFocusable = function(button) {
 return button.isEnabled();
};


/**
 * @override
 * Native buttons natively support keyboard focus.
 */
NativeButtonRenderer.prototype.setFocusable = function() {};


/**
 * @override
 * Native buttons also expose the DISABLED state in the HTML button's
 * `disabled` attribute.
 */
NativeButtonRenderer.prototype.setState = function(
    button, state, enable) {
 NativeButtonRenderer.superClass_.setState.call(
     this, button, state, enable);
 var element = button.getElement();
 if (element && state == Component.State.DISABLED) {
   /** @suppress {strictMissingProperties} Added to tighten compiler checks */
   element.disabled = enable;
 }
};


/**
 * @override
 * Native buttons store their value in the HTML button's `value`
 * attribute.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
NativeButtonRenderer.prototype.getValue = function(element) {
 // TODO(attila): Make this work on IE!  This never worked...
 // See http://www.fourmilab.ch/fourmilog/archives/2007-03/000824.html
 // for a description of the problem.
 return element.value;
};


/**
 * @override
 * Native buttons also expose their value in the HTML button's `value`
 * attribute.
 */
NativeButtonRenderer.prototype.setValue = function(element, value) {
 if (element) {
   // TODO(attila): Make this work on IE!  This never worked...
   // See http://www.fourmilab.ch/fourmilog/archives/2007-03/000824.html
   // for a description of the problem.
   /** @suppress {strictMissingProperties} Added to tighten compiler checks */
   element.value = value;
 }
};


/**
 * @override
 * Native buttons don't need ARIA states to support accessibility, so this is
 * a no-op.
 */
NativeButtonRenderer.prototype.updateAriaState = function() {};


/**
 * Sets up the button control such that it doesn't waste time adding
 * functionality that is already natively supported by native browser
 * buttons.
 * @param {Control} button Button control to configure.
 * @private
 */
NativeButtonRenderer.prototype.setUpNativeButton_ = function(button) {
 button.setHandleMouseEvents(false);
 button.setAutoStates(Component.State.ALL, false);
 button.setSupportedState(Component.State.FOCUSED, false);
};
