/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Rounded corner tab renderer for {@link Tab}s.
 */

import * as googDom from '../dom/dom.js';

import { TagName } from '../dom/tagname.js';
import { Tab } from './tab.js';
import { TabBar } from './tabbar.js';
import { TabRenderer } from './tabrenderer.js';
import * as registry from './registry.js';
const {Control} = goog.requireType('goog.ui.control');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');



/**
 * Rounded corner tab renderer for {@link Tab}s.
 * @constructor
 * @extends {TabRenderer}
 * @final
 */
export function RoundedTabRenderer() {
 TabRenderer.call(this);
}
goog.inherits(RoundedTabRenderer, TabRenderer);
goog.addSingletonGetter(RoundedTabRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
RoundedTabRenderer.CSS_CLASS = goog.getCssName('goog-rounded-tab');


/**
 * Returns the CSS class name to be applied to the root element of all tabs
 * rendered or decorated using this renderer.
 * @return {string} Renderer-specific CSS class name.
 * @override
 */
RoundedTabRenderer.prototype.getCssClass = function() {
 return RoundedTabRenderer.CSS_CLASS;
};


/**
 * Creates the tab's DOM structure, based on the containing tab bar's location
 * relative to tab contents.  For example, the DOM for a tab in a tab bar
 * located above tab contents would look like this:
 *
 *    <div class="goog-rounded-tab" title="...">
 *      <table class="goog-rounded-tab-table">
 *        <tbody>
 *          <tr>
 *            <td nowrap>
 *              <div class="goog-rounded-tab-outer-edge"></div>
 *              <div class="goog-rounded-tab-inner-edge"></div>
 *            </td>
 *          </tr>
 *          <tr>
 *            <td nowrap>
 *              <div class="goog-rounded-tab-caption">Hello, world</div>
 *            </td>
 *          </tr>
 *        </tbody>
 *      </table>
 *    </div>
 *
 * @param {Control} tab Tab to render.
 * @return {Element} Root element for the tab.
 * @override
 */
RoundedTabRenderer.prototype.createDom = function(tab) {
 return this.decorate(
     tab, RoundedTabRenderer.superClass_.createDom.call(this, tab));
};


/**
 * Decorates the element with the tab.  Overrides the superclass implementation
 * by wrapping the tab's content in a table that implements rounded corners.
 * @param {Control} tab Tab to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
RoundedTabRenderer.prototype.decorate = function(tab, element) {
 var tabBar = tab.getParent();

 if (!this.getContentElement(element)) {
   // The element to be decorated doesn't appear to have the full tab DOM,
   // so we have to create it.
   element.appendChild(
       this.createTab(
           tab.getDomHelper(), element.childNodes, tabBar.getLocation()));
 }

 return RoundedTabRenderer.superClass_.decorate.call(
     this, tab, element);
};


/**
 * Creates a table implementing a rounded corner tab.
 * @param {googDom.DomHelper} dom DOM helper to use for element construction.
 * @param {ControlContent} caption Text caption or DOM structure
 *     to display as the tab's caption.
 * @param {TabBar.Location} location Tab bar location relative to the
 *     tab contents.
 * @return {!Element} Table implementing a rounded corner tab.
 * @protected
 */
RoundedTabRenderer.prototype.createTab = function(
    dom, caption, location) {
 var rows = [];

 if (location != TabBar.Location.BOTTOM) {
   // This is a left, right, or top tab, so it needs a rounded top edge.
   rows.push(this.createEdge(dom, /* isTopEdge */ true));
 }
 rows.push(this.createCaption(dom, caption));
 if (location != TabBar.Location.TOP) {
   // This is a left, right, or bottom tab, so it needs a rounded bottom edge.
   rows.push(this.createEdge(dom, /* isTopEdge */ false));
 }

 return dom.createDom(
     TagName.TABLE, {
       'cellPadding': 0,
       'cellSpacing': 0,
       'className': goog.getCssName(this.getStructuralCssClass(), 'table')
     },
     dom.createDom(TagName.TBODY, null, rows));
};


/**
 * Creates a table row implementing the tab caption.
 * @param {googDom.DomHelper} dom DOM helper to use for element construction.
 * @param {ControlContent} caption Text caption or DOM structure
 *     to display as the tab's caption.
 * @return {!Element} Tab caption table row.
 * @protected
 */
RoundedTabRenderer.prototype.createCaption = function(dom, caption) {
 var baseClass = this.getStructuralCssClass();
 return dom.createDom(
     TagName.TR, null,
     dom.createDom(
         TagName.TD, {'noWrap': true},
         dom.createDom(
             TagName.DIV, goog.getCssName(baseClass, 'caption'),
             caption)));
};


/**
 * Creates a table row implementing a rounded tab edge.
 * @param {googDom.DomHelper} dom DOM helper to use for element construction.
 * @param {boolean} isTopEdge Whether to create a top or bottom edge.
 * @return {!Element} Rounded tab edge table row.
 * @protected
 */
RoundedTabRenderer.prototype.createEdge = function(dom, isTopEdge) {
 var baseClass = this.getStructuralCssClass();
 var inner = dom.createDom(
     TagName.DIV, goog.getCssName(baseClass, 'inner-edge'));
 var outer = dom.createDom(
     TagName.DIV, goog.getCssName(baseClass, 'outer-edge'));
 return dom.createDom(
     TagName.TR, null,
     dom.createDom(
         TagName.TD, {'noWrap': true},
         isTopEdge ? [outer, inner] : [inner, outer]));
};


/** @override */
RoundedTabRenderer.prototype.getContentElement = function(element) {
 var baseClass = this.getStructuralCssClass();
 return element &&
     googDom.getElementsByTagNameAndClass(
         TagName.DIV, goog.getCssName(baseClass, 'caption'),
         element)[0];
};


// Register a decorator factory function for Tabs using the rounded
// tab renderer.
registry.setDecoratorByClassName(
    RoundedTabRenderer.CSS_CLASS, function() {
 return new Tab(null, RoundedTabRenderer.getInstance());
});
