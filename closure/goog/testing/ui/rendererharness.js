/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A driver for testing renderers.
 */

goog.setTestOnly('goog.testing.ui.RendererHarness');

import { Disposable } from '../../disposable/disposable.js';
import { NodeType } from '../../dom/nodetype.js';
import * as asserts from '../asserts.js';
import * as dom from '../dom.js';
import { Control } from '../../ui/control.js';
import { ControlRenderer } from '../../ui/controlrenderer.js';



/**
 * A driver for testing renderers.
 *
 * @param {ControlRenderer} renderer A renderer to test.
 * @param {Element} renderParent The parent of the element where controls will
 *     be rendered.
 * @param {Element} decorateParent The parent of the element where controls will
 *     be decorated.
 * @constructor
 * @extends {Disposable}
 * @final
 */
export function RendererHarness(renderer, renderParent, decorateParent) {
 Disposable.call(this);

 /**
   * The renderer under test.
   * @type {ControlRenderer}
   * @private
   */
 this.renderer_ = renderer;

 /**
  * The parent of the element where controls will be rendered.
  * @type {Element}
  * @private
  */
 this.renderParent_ = renderParent;

 /**
  * The original HTML of the render element.
  * @type {string}
  * @private
  */
 this.renderHtml_ = renderParent.innerHTML;

 /**
  * The parent of the element where controls will be decorated.
  * @type {Element}
  * @private
  */
 this.decorateParent_ = decorateParent;

 /**
  * The original HTML of the decorated element.
  * @type {string}
  * @private
  */
 this.decorateHtml_ = decorateParent.innerHTML;
}
goog.inherits(RendererHarness, Disposable);


/**
 * A control to create by decoration.
 * @type {Control}
 * @private
 */
RendererHarness.prototype.decorateControl_;


/**
 * A control to create by rendering.
 * @type {Control}
 * @private
 */
RendererHarness.prototype.renderControl_;


/**
 * Whether all the necessary assert methods have been called.
 * @type {boolean}
 * @private
 */
RendererHarness.prototype.verified_ = false;


/**
 * Attach a control and render its DOM.
 * @param {Control} control A control.
 * @return {Element} The element created.
 */
RendererHarness.prototype.attachControlAndRender = function(
    control) {
 this.renderControl_ = control;

 control.setRenderer(this.renderer_);
 control.render(this.renderParent_);
 return control.getElement();
};


/**
 * Attach a control and decorate the element given in the constructor.
 * @param {Control} control A control.
 * @return {Element} The element created.
 */
RendererHarness.prototype.attachControlAndDecorate = function(
    control) {
 this.decorateControl_ = control;

 control.setRenderer(this.renderer_);

 const child = this.decorateParent_.firstChild;
 assertEquals(
     'The decorated node must be an element', NodeType.ELEMENT,
     child.nodeType);
 control.decorate(/** @type {!Element} */ (child));
 return control.getElement();
};


/**
 * Assert that the rendered element and the decorated element match.
 */
RendererHarness.prototype.assertDomMatches = function() {
 assert(
     'Both elements were not generated',
     !!(this.renderControl_ && this.decorateControl_));
 dom.assertHtmlMatches(
     this.renderControl_.getElement().innerHTML,
     this.decorateControl_.getElement().innerHTML);
 this.verified_ = true;
};


/**
 * Destroy the harness, verifying that all assertions had been checked.
 * @override
 * @protected
 */
RendererHarness.prototype.disposeInternal = function() {
 // If the harness was not verified appropriately, throw an exception.
 assert(
     'Expected assertDomMatches to be called',
     this.verified_ || !this.renderControl_ || !this.decorateControl_);

 if (this.decorateControl_) {
   this.decorateControl_.dispose();
 }
 if (this.renderControl_) {
   this.renderControl_.dispose();
 }

 this.renderParent_.innerHTML = this.renderHtml_;
 this.decorateParent_.innerHTML = this.decorateHtml_;

 RendererHarness.superClass_.disposeInternal.call(this);
};
