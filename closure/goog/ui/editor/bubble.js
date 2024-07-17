/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Bubble component - handles display, hiding, etc. of the
 * actual bubble UI.
 *
 * This is used exclusively by code within the editor package, and should not
 * be used directly.
 */

import * as asserts from '../../asserts/asserts.js';

import * as googDom from '../../dom/dom.js';
import { TagName } from '../../dom/tagname.js';
import { ViewportSizeMonitor } from '../../dom/viewportsizemonitor.js';
import * as classlist from '../../dom/classlist.js';
import * as safe from '../../dom/safe.js';
import * as style from '../../editor/style.js';
import { EventHandler } from '../../events/eventhandler.js';
import { EventTarget } from '../../events/eventtarget.js';
import { EventType } from '../../events/eventtype.js';
import * as functions from '../../functions/functions.js';
import * as log from '../../log/log.js';
import { Box } from '../../math/box.js';
import object from '../../object/object.js';
import * as positioning from '../../positioning/positioning.js';
import { Corner, Overflow, OverflowStatus } from '../../positioning/positioning.js';
import * as googString from '../../string/string.js';
import { Const } from '../../string/const.js';
import * as googStyle from '../../style/style.js';
import { Component } from '../component.js';
import { PopupBase } from '../popupbase.js';
import * as userAgent from '../../useragent/useragent.js';



/**
 * Property bubble UI element.
 * @param {Element} parent The parent element for this bubble.
 * @param {number} zIndex The z index to draw the bubble at.
 * @constructor
 * @extends {EventTarget}
 */
export function Bubble(parent, zIndex) {
 Bubble.base(this, 'constructor');

 /**
   * Dom helper for the document the bubble should be shown in.
   * @type {!googDom.DomHelper}
   * @private
   */
 this.dom_ = googDom.getDomHelper(parent);

 /**
     * Event handler for this bubble.
     * @type {EventHandler<!Bubble>}
     * @private
     */
 this.eventHandler_ = new EventHandler(this);

 /**
   * Object that monitors the application window for size changes.
   * @type {ViewportSizeMonitor}
   * @private
   */
 this.viewPortSizeMonitor_ =
     new ViewportSizeMonitor(this.dom_.getWindow());

 /**
    * Maps panel ids to panels.
    * @type {Object<Bubble.Panel_>}
    * @private
    */
 this.panels_ = {};

 /**
  * Container element for the entire bubble.  This may contain elements related
  * to look and feel or styling of the bubble.
  * @type {Element}
  * @private
  */
 this.bubbleContainer_ = this.dom_.createDom(
     TagName.DIV,
     {'className': Bubble.BUBBLE_CLASSNAME});

 googStyle.setElementShown(this.bubbleContainer_, false);
 googDom.appendChild(parent, this.bubbleContainer_);
 googStyle.setStyle(this.bubbleContainer_, 'zIndex', zIndex);

 /**
  * Container element for the bubble panels - this should be some inner element
  * within (or equal to) bubbleContainer.
  * @type {Element}
  * @private
  */
 this.bubbleContents_ = this.createBubbleDom(this.dom_, this.bubbleContainer_);

 /**
  * Element showing the close box.
  * @type {!Element}
  * @private
  */
 this.closeBox_ = this.dom_.createDom(TagName.DIV, {
   'className': goog.getCssName('tr_bubble_closebox'),
 });
 safe.setInnerHtmlFromConstant(
     this.closeBox_, Const.from('&nbsp;'));
 this.bubbleContents_.appendChild(this.closeBox_);

 // We make bubbles unselectable so that clicking on them does not steal focus
 // or move the cursor away from the element the bubble is attached to.
 style.makeUnselectable(this.bubbleContainer_, this.eventHandler_);

 /**
   * Popup that controls showing and hiding the bubble at the appropriate
   * position.
   * @type {PopupBase}
   * @private
   */
 this.popup_ = new PopupBase(this.bubbleContainer_);
}
goog.inherits(Bubble, EventTarget);


/**
 * The css class name of the bubble container element.
 * @type {string}
 */
Bubble.BUBBLE_CLASSNAME = goog.getCssName('tr_bubble');


/**
 * Creates and adds DOM for the bubble UI to the given container.  This default
 * implementation just returns the container itself.
 * @param {!googDom.DomHelper} dom DOM helper to use.
 * @param {!Element} container Element to add the new elements to.
 * @return {!Element} The element where bubble content should be added.
 * @protected
 */
Bubble.prototype.createBubbleDom = function(dom, container) {
 return container;
};


/**
 * A logger for Bubble.
 * @type {log.Logger}
 * @protected
 */
Bubble.prototype.logger =
    log.getLogger('goog.ui.editor.Bubble');


/** @override */
Bubble.prototype.disposeInternal = function() {
 Bubble.base(this, 'disposeInternal');

 googDom.removeNode(this.bubbleContainer_);
 this.bubbleContainer_ = null;

 this.eventHandler_.dispose();
 this.eventHandler_ = null;

 this.viewPortSizeMonitor_.dispose();
 this.viewPortSizeMonitor_ = null;
};


/**
 * @return {Element} The element that where the bubble's contents go.
 */
Bubble.prototype.getContentElement = function() {
 return this.bubbleContents_;
};


/**
 * @return {Element} The element that contains the bubble.
 * @protected
 */
Bubble.prototype.getContainerElement = function() {
 return this.bubbleContainer_;
};


/**
 * @return {EventHandler<T>} The event handler.
 * @protected
 * @this {T}
 * @template T
 */
Bubble.prototype.getEventHandler = function() {
 return this.eventHandler_;
};


/**
 * Handles user resizing of window.
 * @private
 */
Bubble.prototype.handleWindowResize_ = function() {
 if (this.isVisible()) {
   this.reposition();
 }
};


/**
 * Sets whether the bubble dismisses itself when the user clicks outside of it.
 * @param {boolean} autoHide Whether to autohide on an external click.
 */
Bubble.prototype.setAutoHide = function(autoHide) {
 this.popup_.setAutoHide(autoHide);
};


/**
 * Returns whether there is already a panel of the given type.
 * @param {string} type Type of panel to check.
 * @return {boolean} Whether there is already a panel of the given type.
 */
Bubble.prototype.hasPanelOfType = function(type) {
 return object.some(this.panels_, function(panel) {
  return panel.type == type;
 });
};


/**
 * Adds a panel to the bubble.
 * @param {string} type The type of bubble panel this is.  Should usually be
 *     the same as the tagName of the targetElement.  This ensures multiple
 *     bubble panels don't appear for the same element.
 * @param {string} title The title of the panel.
 * @param {Element} targetElement The target element of the bubble.
 * @param {function(Element): void} contentFn Function that when called with
 *     a container element, will add relevant panel content to it.
 * @param {boolean=} opt_preferTopPosition Whether to prefer placing the bubble
 *     above the element instead of below it.  Defaults to preferring below.
 *     If any panel prefers the top position, the top position is used.
 * @return {string} The id of the panel.
 */
Bubble.prototype.addPanel = function(
    type, title, targetElement, contentFn, opt_preferTopPosition) {
 const id = googString.createUniqueString();
 const panel = new Bubble.Panel_(
     this.dom_, id, type, title, targetElement, !opt_preferTopPosition);
 this.panels_[id] = panel;

 // Insert the panel in string order of type.  Technically we could use binary
 // search here but n is really small (probably 0 - 2) so it's not worth it.
 // The last child of bubbleContents_ is the close box so we take care not
 // to treat it as a panel element, and we also ensure it stays as the last
 // element.  The intention here is not to create any artificial order, but
 // just to ensure that it is always consistent.
 let nextElement;
 for (let i = 0, len = this.bubbleContents_.childNodes.length - 1; i < len;
      i++) {
   const otherChild = this.bubbleContents_.childNodes[i];
   /** @suppress {strictMissingProperties} Added to tighten compiler checks */
   const otherPanel = this.panels_[otherChild.id];
   if (otherPanel.type > type) {
     nextElement = otherChild;
     break;
   }
 }
 googDom.insertSiblingBefore(
     panel.element, nextElement || this.bubbleContents_.lastChild);

 contentFn(panel.getContentElement());
 style.makeUnselectable(panel.element, this.eventHandler_);

 const numPanels = object.getCount(this.panels_);
 if (numPanels == 1) {
   this.openBubble_();
 } else if (numPanels == 2) {
   classlist.add(
       asserts.assert(this.bubbleContainer_),
       goog.getCssName('tr_multi_bubble'));
 }
 this.reposition();

 return id;
};


/**
 * Removes the panel with the given id.
 * @param {string} id The id of the panel.
 */
Bubble.prototype.removePanel = function(id) {
 const panel = this.panels_[id];
 googDom.removeNode(panel.element);
 delete this.panels_[id];

 const numPanels = object.getCount(this.panels_);
 if (numPanels <= 1) {
   classlist.remove(
       asserts.assert(this.bubbleContainer_),
       goog.getCssName('tr_multi_bubble'));
 }

 if (numPanels == 0) {
   this.closeBubble_();
 } else {
   this.reposition();
 }
};


/**
 * Opens the bubble.
 * @private
 */
Bubble.prototype.openBubble_ = function() {
 this.eventHandler_
     .listen(this.closeBox_, EventType.CLICK, this.closeBubble_)
     .listen(
         this.viewPortSizeMonitor_, EventType.RESIZE,
         this.handleWindowResize_)
     .listen(
         this.popup_, PopupBase.EventType.HIDE, this.handlePopupHide);

 this.popup_.setVisible(true);
 this.reposition();
};


/**
 * Closes the bubble.
 * @private
 */
Bubble.prototype.closeBubble_ = function() {
 this.popup_.setVisible(false);
};


/**
 * Handles the popup's hide event by removing all panels and dispatching a
 * HIDE event.
 * @protected
 */
Bubble.prototype.handlePopupHide = function() {
 // Remove the panel elements.
 for (let panelId in this.panels_) {
   googDom.removeNode(this.panels_[panelId].element);
 }

 // Update the state to reflect no panels.
 this.panels_ = {};
 classlist.remove(
     asserts.assert(this.bubbleContainer_),
     goog.getCssName('tr_multi_bubble'));

 this.eventHandler_.removeAll();
 this.dispatchEvent(Component.ComponentEventType.HIDE);
};


/**
 * Returns the visibility of the bubble.
 * @return {boolean} True if visible false if not.
 */
Bubble.prototype.isVisible = function() {
 return this.popup_.isVisible();
};


/**
 * The vertical clearance in pixels between the bottom of the targetElement
 * and the edge of the bubble.
 * @type {number}
 * @private
 */
Bubble.VERTICAL_CLEARANCE_ = userAgent.IE ? 4 : 2;


/**
 * Bubble's margin box to be passed to positioning.
 * @type {Box}
 * @private
 */
Bubble.MARGIN_BOX_ = new Box(
    Bubble.VERTICAL_CLEARANCE_, 0,
    Bubble.VERTICAL_CLEARANCE_, 0);


/**
 * Returns the margin box.
 * @return {Box}
 * @protected
 */
Bubble.prototype.getMarginBox = function() {
 return Bubble.MARGIN_BOX_;
};


/**
 * Positions and displays this bubble below its targetElement. Assumes that
 * the bubbleContainer is already contained in the document object it applies
 * to.
 */
Bubble.prototype.reposition = function() {
 let targetElement = null;
 let preferBottomPosition = true;
 for (let panelId in this.panels_) {
   const panel = this.panels_[panelId];
   // We don't care which targetElement we get, so we just take the last one.
   targetElement = panel.targetElement;
   preferBottomPosition = preferBottomPosition && panel.preferBottomPosition;
 }
 let status = OverflowStatus.FAILED;

 // Fix for bug when bubbleContainer and targetElement have
 // opposite directionality, the bubble should anchor to the END of
 // the targetElement instead of START.
 const reverseLayout =
     (googStyle.isRightToLeft(this.bubbleContainer_) !=
      googStyle.isRightToLeft(targetElement));

 // Try to put the bubble at the bottom of the target unless the plugin has
 // requested otherwise.
 if (preferBottomPosition) {
   status = this.positionAtAnchor_(
       reverseLayout ? Corner.BOTTOM_END :
                       Corner.BOTTOM_START,
       Corner.TOP_START,
       Overflow.ADJUST_X | Overflow.FAIL_Y);
 }

 if (status & OverflowStatus.FAILED) {
   // Try to put it at the top of the target if there is not enough
   // space at the bottom.
   status = this.positionAtAnchor_(
       reverseLayout ? Corner.TOP_END :
                       Corner.TOP_START,
       Corner.BOTTOM_START,
       Overflow.ADJUST_X | Overflow.FAIL_Y);
 }

 if (status & OverflowStatus.FAILED) {
   // Put it at the bottom again with adjustment if there is no
   // enough space at the top.
   status = this.positionAtAnchor_(
       reverseLayout ? Corner.BOTTOM_END :
                       Corner.BOTTOM_START,
       Corner.TOP_START, Overflow.ADJUST_X |
           Overflow.ADJUST_Y);
   if (status & OverflowStatus.FAILED) {
     log.warning(
         this.logger,
         'reposition(): positionAtAnchor() failed with ' + status);
   }
 }
};


/**
 * A helper for reposition() - positions the bubble in regards to the position
 * of the elements the bubble is attached to.
 * @param {Corner} targetCorner The corner of
 *     the target element.
 * @param {Corner} bubbleCorner The corner of the bubble.
 * @param {number} overflow Overflow handling mode bitmap,
 *     {@see Overflow}.
 * @return {number} Status bitmap, {@see OverflowStatus}.
 * @private
 */
Bubble.prototype.positionAtAnchor_ = function(
    targetCorner, bubbleCorner, overflow) {
 let targetElement = null;
 for (let panelId in this.panels_) {
   // For now, we use the outermost element.  This assumes the multiple
   // elements this panel is showing for contain each other - in the event
   // that is not generally the case this may need to be updated to pick
   // the lowest or highest element depending on targetCorner.
   const candidate = this.panels_[panelId].targetElement;
   if (!targetElement || googDom.contains(candidate, targetElement)) {
     targetElement = this.panels_[panelId].targetElement;
   }
 }
 return positioning.positionAtAnchor(
     targetElement, targetCorner, this.bubbleContainer_, bubbleCorner, null,
     this.getMarginBox(), overflow, null, this.getViewportBox());
};


/**
 * Returns the viewport box to use when positioning the bubble.
 * @return {Box}
 * @protected
 */
Bubble.prototype.getViewportBox = functions.NULL;



/**
 * Private class used to describe a bubble panel.
 * @param {googDom.DomHelper} dom DOM helper used to create the panel.
 * @param {string} id ID of the panel.
 * @param {string} type Type of the panel.
 * @param {string} title Title of the panel.
 * @param {Element} targetElement Element the panel is showing for.
 * @param {boolean} preferBottomPosition Whether this panel prefers to show
 *     below the target element.
 * @constructor
 * @private
 */
Bubble.Panel_ = function(
    dom, id, type, title, targetElement, preferBottomPosition) {
 /**
  * The type of bubble panel.
  * @type {string}
  */
 this.type = type;

 /**
  * The target element of this bubble panel.
  * @type {Element}
  */
 this.targetElement = targetElement;

 /**
  * Whether the panel prefers to be placed below the target element.
  * @type {boolean}
  */
 this.preferBottomPosition = preferBottomPosition;

 /**
  * The element containing this panel.
  * @type {!Element}
  */
 this.element = dom.createDom(
     TagName.DIV,
     {className: goog.getCssName('tr_bubble_panel'), id: id},
     dom.createDom(
         TagName.DIV,
         {className: goog.getCssName('tr_bubble_panel_title')},
         title ? title + ':' : ''),  // TODO(robbyw): Does this work in bidi?
     dom.createDom(
         TagName.DIV,
         {className: goog.getCssName('tr_bubble_panel_content')}));
};


/**
 * @return {Element} The element in the panel where content should go.
 */
Bubble.Panel_.prototype.getContentElement = function() {
 return /** @type {Element} */ (this.element.lastChild);
};
