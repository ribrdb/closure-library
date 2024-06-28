/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Native browser textarea renderer for {@link goog.ui.Textarea}s.
 * @suppress {strictMissingProperties} legacy accesses off type 'Element'
 */

import { TagName } from '../dom/tagname.js';

import { Component } from './component.js';
import { ControlRenderer } from './controlrenderer.js';
const {Control} = goog.requireType('goog.ui.control');



/**
 * Renderer for {@link goog.ui.Textarea}s.  Renders and decorates native HTML
 * textarea elements.  Since native HTML textareas have built-in support for
 * many features, overrides many expensive (and redundant) superclass methods to
 * be no-ops.
 * @constructor
 * @extends {ControlRenderer}
 */
export function TextareaRenderer() {
  ControlRenderer.call(this);
}
goog.inherits(TextareaRenderer, ControlRenderer);
goog.addSingletonGetter(TextareaRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
TextareaRenderer.CSS_CLASS = goog.getCssName('goog-textarea');


/** @override */
TextareaRenderer.prototype.getAriaRole = function() {
  // textareas don't need ARIA roles to be recognized by screen readers.
  return undefined;
};


/** @override */
TextareaRenderer.prototype.decorate = function(control, element) {
  this.setUpTextarea_(control);
  TextareaRenderer.superClass_.decorate.call(this, control, element);
  control.setContent(element.value);
  return element;
};


/**
 * Returns the textarea's contents wrapped in an HTML textarea element.  Sets
 * the textarea's disabled attribute as needed.
 * @param {Control} textarea Textarea to render.
 * @return {!Element} Root element for the Textarea control (an HTML textarea
 *     element).
 * @override
 */
TextareaRenderer.prototype.createDom = function(textarea) {
  this.setUpTextarea_(textarea);
  var element = textarea.getDomHelper().createDom(
      TagName.TEXTAREA, {
        'class': this.getClassNames(textarea).join(' '),
        'disabled': !textarea.isEnabled()
      },
      textarea.getContent() || '');
  return element;
};


/**
 * Overrides {@link TextareaRenderer#canDecorate} by returning true only
 * if the element is an HTML textarea.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 * @override
 */
TextareaRenderer.prototype.canDecorate = function(element) {
  return element.tagName == TagName.TEXTAREA;
};


/**
 * Textareas natively support right-to-left rendering.
 * @override
 */
TextareaRenderer.prototype.setRightToLeft = function() {};


/**
 * Textareas are always focusable as long as they are enabled.
 * @override
 */
TextareaRenderer.prototype.isFocusable = function(textarea) {
  return textarea.isEnabled();
};


/**
 * Textareas natively support keyboard focus.
 * @override
 */
TextareaRenderer.prototype.setFocusable = function() {};


/**
 * Textareas also expose the DISABLED state in the HTML textarea's
 * `disabled` attribute.
 * @override
 */
TextareaRenderer.prototype.setState = function(
    textarea, state, enable) {
  TextareaRenderer.superClass_.setState.call(
      this, textarea, state, enable);
  var element = textarea.getElement();
  if (element && state == Component.State.DISABLED) {
    element.disabled = enable;
  }
};


/**
 * Textareas don't need ARIA states to support accessibility, so this is
 * a no-op.
 * @override
 */
TextareaRenderer.prototype.updateAriaState = function() {};


/**
 * Sets up the textarea control such that it doesn't waste time adding
 * functionality that is already natively supported by browser
 * textareas.
 * @param {Control} textarea Textarea control to configure.
 * @private
 */
TextareaRenderer.prototype.setUpTextarea_ = function(textarea) {
  textarea.setHandleMouseEvents(false);
  textarea.setAutoStates(Component.State.ALL, false);
  textarea.setSupportedState(Component.State.FOCUSED, false);
};


/** @override **/
TextareaRenderer.prototype.setContent = function(element, value) {
  if (element) {
    element.value = value;
  }
};


/** @override **/
TextareaRenderer.prototype.getCssClass = function() {
  return TextareaRenderer.CSS_CLASS;
};
