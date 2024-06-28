/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Tooltip widget implementation.
 *
 * @see ../demos/tooltip.html
 */

import { Timer } from '../timer/timer.js';

import * as array from '../array/array.js';
import * as asserts from '../asserts/asserts.js';
import { dispose } from '../disposable/dispose.js';
import * as googDom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as safe from '../dom/safe.js';
import * as events from '../events/events.js';
import { EventType } from '../events/eventtype.js';
import { FocusHandler } from '../events/focushandler.js';
import { Box } from '../math/box.js';
import { Coordinate } from '../math/coordinate.js';
import * as positioning from '../positioning/positioning.js';
import { Corner, Overflow, OverflowStatus } from '../positioning/positioning.js';
import { AnchoredPosition } from '../positioning/anchoredposition.js';
import { ViewportPosition } from '../positioning/viewportposition.js';
import { Set } from '../structs/set.js';
import * as style from '../style/style.js';
import { Popup } from './popup.js';
import { PopupBase } from './popupbase.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { SafeHtml } = goog.requireType('goog.html.SafeHtml');
const { AbstractPosition } =goog.requireType('goog.positioning.abstractposition');



/**
 * Tooltip widget. Can be attached to one or more elements and is shown, with a
 * slight delay, when the cursor is over the element or the element gains
 * focus.
 *
 * @param {Element|string=} opt_el Element to display tooltip for, either
 *     element reference or string id.
 * @param {?string=} opt_str Text message to display in tooltip.
 * @param {googDom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {Popup}
 */
export function Tooltip(opt_el, opt_str, opt_domHelper) {
  /**
     * Dom Helper
     * @type {googDom.DomHelper}
     * @private
     */
  this.dom_ = opt_domHelper ||
      (opt_el ? googDom.getDomHelper(googDom.getElement(opt_el)) :
                googDom.getDomHelper());

  Popup.call(this, this.dom_.createDom(TagName.DIV, {
    'style': 'position:absolute;display:none;'
  }));

  /**
     * Cursor position relative to the page.
     * @type {!Coordinate}
     * @protected
     */
  this.cursorPosition = new Coordinate(1, 1);

  /**
     * Elements this widget is attached to.
     * @type {Set}
     * @private
     */
  this.elements_ = new Set();

  /**
     * Keyboard focus event handler for elements inside the tooltip.
     * @private {?FocusHandler}
     */
  this.tooltipFocusHandler_ = null;

  // Attach to element, if specified
  if (opt_el) {
    this.attach(opt_el);
  }

  // Set message, if specified.
  if (opt_str != null) {
    this.setText(opt_str);
  }
}
goog.inherits(Tooltip, Popup);


/**
 * List of active (open) tooltip widgets. Used to prevent multiple tooltips
 * from appearing at once.
 *
 * @type {!Array<Tooltip>}
 * @private
 */
Tooltip.activeInstances_ = [];


/**
 * Active element reference. Used by the delayed show functionality to keep
 * track of the element the mouse is over or the element with focus.
 * @type {?Element}
 * @private
 */
Tooltip.prototype.activeEl_ = null;


/**
 * CSS class name for tooltip.
 *
 * @type {string}
 */
Tooltip.prototype.className = goog.getCssName('goog-tooltip');


/**
 * Delay in milliseconds since the last mouseover or mousemove before the
 * tooltip is displayed for an element.
 *
 * @type {number}
 * @private
 */
Tooltip.prototype.showDelayMs_ = 500;


/**
 * Timer for when to show.
 *
 * @type {number|undefined}
 * @protected
 */
Tooltip.prototype.showTimer;


/**
 * Delay in milliseconds before tooltips are hidden.
 *
 * @type {number}
 * @private
 */
Tooltip.prototype.hideDelayMs_ = 0;


/**
 * Timer for when to hide.
 *
 * @type {number|undefined}
 * @protected
 */
Tooltip.prototype.hideTimer;


/**
 * Element that triggered the tooltip.  Note that if a second element triggers
 * this tooltip, anchor becomes that second element, even if its show is
 * cancelled and the original tooltip survives.
 *
 * @type {Element|undefined}
 * @protected
 */
Tooltip.prototype.anchor;


/**
 * Possible states for the tooltip to be in.
 * @enum {number}
 */
Tooltip.State = {
  INACTIVE: 0,
  WAITING_TO_SHOW: 1,
  SHOWING: 2,
  WAITING_TO_HIDE: 3,
  UPDATING: 4  // waiting to show new hovercard while old one still showing.
};


/**
 * Popup activation types. Used to select a positioning strategy.
 * @enum {number}
 */
Tooltip.Activation = {
  CURSOR: 0,
  FOCUS: 1
};


/**
 * Whether the anchor has seen the cursor move or has received focus since the
 * tooltip was last shown. Used to ignore mouse over events triggered by view
 * changes and UI updates.
 * @type {boolean|undefined}
 * @private
 */
Tooltip.prototype.seenInteraction_;


/**
 * Whether the cursor must have moved before the tooltip will be shown.
 * @type {boolean|undefined}
 * @private
 */
Tooltip.prototype.requireInteraction_;


/**
 * If this tooltip's element contains another tooltip that becomes active, this
 * property identifies that tooltip so that we can check if this tooltip should
 * not be hidden because the nested tooltip is active.
 * @type {Tooltip}
 * @private
 */
Tooltip.prototype.childTooltip_;


/**
 * If this tooltip is inside another tooltip's element, then it may have
 * prevented that tooltip from hiding.  When this tooltip hides, we'll need
 * to check if the parent should be hidden as well.
 * @type {Tooltip}
 * @private
 */
Tooltip.prototype.parentTooltip_;


/**
 * Returns the dom helper that is being used on this component.
 * @return {googDom.DomHelper} The dom helper used on this component.
 */
Tooltip.prototype.getDomHelper = function() {
  return this.dom_;
};


/**
 * @return {Tooltip} Active tooltip in a child element, or null if none.
 * @protected
 */
Tooltip.prototype.getChildTooltip = function() {
  return this.childTooltip_;
};


/**
 * Attach to element. Tooltip will be displayed when the cursor is over the
 * element or when the element has been active for a few milliseconds.
 *
 * @param {Element|string} el Element to display tooltip for, either element
 *                            reference or string id.
 */
Tooltip.prototype.attach = function(el) {
  el = googDom.getElement(el);

  this.elements_.add(el);
  events.listen(
      el, EventType.MOUSEOVER, this.handleMouseOver, false, this);
  events.listen(
      el, EventType.MOUSEOUT, this.handleMouseOutAndBlur, false,
      this);
  events.listen(
      el, EventType.MOUSEMOVE, this.handleMouseMove, false, this);
  events.listen(
      el, EventType.FOCUS, this.handleFocus, false, this);
  events.listen(
      el, EventType.BLUR, this.handleMouseOutAndBlur, false, this);
};


/**
 * Detach from element(s).
 *
 * @param {Element|string=} opt_el Element to detach from, either element
 *                                reference or string id. If no element is
 *                                specified all are detached.
 */
Tooltip.prototype.detach = function(opt_el) {
  if (opt_el) {
    var el = googDom.getElement(opt_el);
    this.detachElement_(el);
    this.elements_.remove(el);
  } else {
    var a = this.elements_.getValues();
    for (var el, i = 0; el = a[i]; i++) {
      this.detachElement_(el);
    }
    this.elements_.clear();
  }
};


/**
 * Detach from element.
 *
 * @param {Element} el Element to detach from.
 * @private
 */
Tooltip.prototype.detachElement_ = function(el) {
  events.unlisten(
      el, EventType.MOUSEOVER, this.handleMouseOver, false, this);
  events.unlisten(
      el, EventType.MOUSEOUT, this.handleMouseOutAndBlur, false,
      this);
  events.unlisten(
      el, EventType.MOUSEMOVE, this.handleMouseMove, false, this);
  events.unlisten(
      el, EventType.FOCUS, this.handleFocus, false, this);
  events.unlisten(
      el, EventType.BLUR, this.handleMouseOutAndBlur, false, this);
};


/**
 * Sets delay in milliseconds before tooltip is displayed for an element.
 *
 * @param {number} delay The delay in milliseconds.
 */
Tooltip.prototype.setShowDelayMs = function(delay) {
  this.showDelayMs_ = delay;
};


/**
 * @return {number} The delay in milliseconds before tooltip is displayed for an
 *     element.
 */
Tooltip.prototype.getShowDelayMs = function() {
  return this.showDelayMs_;
};


/**
 * Sets delay in milliseconds before tooltip is hidden once the cursor leavs
 * the element.
 *
 * @param {number} delay The delay in milliseconds.
 */
Tooltip.prototype.setHideDelayMs = function(delay) {
  this.hideDelayMs_ = delay;
};


/**
 * @return {number} The delay in milliseconds before tooltip is hidden once the
 *     cursor leaves the element.
 */
Tooltip.prototype.getHideDelayMs = function() {
  return this.hideDelayMs_;
};


/**
 * Sets tooltip message as plain text.
 *
 * @param {string} str Text message to display in tooltip.
 */
Tooltip.prototype.setText = function(str) {
  googDom.setTextContent(this.getElement(), str);
};


/**
 * Sets tooltip message as HTML markup.
 * @param {!SafeHtml} html HTML message to display in tooltip.
 */
Tooltip.prototype.setSafeHtml = function(html) {
  var element = this.getElement();
  if (element) {
    safe.setInnerHtml(element, html);
  }
};


/**
 * Sets tooltip element.
 *
 * @param {Element} el HTML element to use as the tooltip.
 * @override
 */
Tooltip.prototype.setElement = function(el) {
  var oldElement = this.getElement();
  if (oldElement) {
    googDom.removeNode(oldElement);
  }
  Tooltip.superClass_.setElement.call(this, el);
  if (el) {
    var body = this.dom_.getDocument().body;
    body.insertBefore(el, body.lastChild);
    this.registerContentFocusEvents_();
  } else {
    dispose(this.tooltipFocusHandler_);
    this.tooltipFocusHandler_ = null;
  }
};


/**
 * Handler for keyboard focus events of elements inside the tooltip's content
 * element. This should only be invoked if this.getElement() != null.
 * @private
 */
Tooltip.prototype.registerContentFocusEvents_ = function() {
  dispose(this.tooltipFocusHandler_);
  this.tooltipFocusHandler_ =
      new FocusHandler(asserts.assert(this.getElement()));
  this.registerDisposable(this.tooltipFocusHandler_);

  events.listen(
      this.tooltipFocusHandler_, FocusHandler.EventType.FOCUSIN,
      this.clearHideTimer, undefined /* opt_capt */, this);
  events.listen(
      this.tooltipFocusHandler_, FocusHandler.EventType.FOCUSOUT,
      this.startHideTimer, undefined /* opt_capt */, this);
};


/**
 * @return {string} The tooltip message as plain text.
 */
Tooltip.prototype.getText = function() {
  return googDom.getTextContent(this.getElement());
};


/**
 * @return {string} The tooltip message as HTML as plain string.
 */
Tooltip.prototype.getHtml = function() {
  return this.getElement().innerHTML;
};


/**
 * @return {Tooltip.State} Current state of tooltip.
 */
Tooltip.prototype.getState = function() {
  return this.showTimer ?
                         (this.isVisible() ? Tooltip.State.UPDATING :
                                             Tooltip.State.WAITING_TO_SHOW) :
      this.hideTimer   ? Tooltip.State.WAITING_TO_HIDE :
      this.isVisible() ? Tooltip.State.SHOWING :
                         Tooltip.State.INACTIVE;
};


/**
 * Sets whether tooltip requires the mouse to have moved or the anchor receive
 * focus before the tooltip will be shown.
 * @param {boolean} requireInteraction Whether tooltip should require some user
 *     interaction before showing tooltip.
 */
Tooltip.prototype.setRequireInteraction = function(requireInteraction) {
  this.requireInteraction_ = requireInteraction;
};


/**
 * Returns true if the coord is in the tooltip.
 * @param {Coordinate} coord Coordinate being tested.
 * @return {boolean} Whether the coord is in the tooltip.
 */
Tooltip.prototype.isCoordinateInTooltip = function(coord) {
  // Check if coord is inside the tooltip
  if (!this.isVisible()) {
    return false;
  }

  var offset = style.getPageOffset(this.getElement());
  var size = style.getSize(this.getElement());
  return offset.x <= coord.x && coord.x <= offset.x + size.width &&
      offset.y <= coord.y && coord.y <= offset.y + size.height;
};


/**
 * Called before the popup is shown.
 *
 * @return {boolean} Whether tooltip should be shown.
 * @protected
 * @override
 */
Tooltip.prototype.onBeforeShow = function() {
  if (!PopupBase.prototype.onBeforeShow.call(this)) {
    return false;
  }

  // Hide all open tooltips except if this tooltip is triggered by an element
  // inside another tooltip.
  if (this.anchor) {
    for (var tt, i = 0; tt = Tooltip.activeInstances_[i]; i++) {
      if (!googDom.contains(tt.getElement(), this.anchor)) {
        tt.setVisible(false);
      }
    }
  }
  array.insert(Tooltip.activeInstances_, this);

  var element = this.getElement();
  element.className = this.className;
  this.clearHideTimer();

  // Register event handlers for tooltip. Used to prevent the tooltip from
  // closing if the cursor is over the tooltip rather then the element that
  // triggered it.
  events.listen(
      element, EventType.MOUSEOVER, this.handleTooltipMouseOver,
      false, this);
  events.listen(
      element, EventType.MOUSEOUT, this.handleTooltipMouseOut,
      false, this);

  this.clearShowTimer();
  return true;
};


/** @override */
Tooltip.prototype.onHide = function() {
  array.remove(Tooltip.activeInstances_, this);

  // Hide all open tooltips triggered by an element inside this tooltip.
  var element = this.getElement();
  for (var tt, i = 0; tt = Tooltip.activeInstances_[i]; i++) {
    if (tt.anchor && googDom.contains(element, tt.anchor)) {
      tt.setVisible(false);
    }
  }

  // If this tooltip is inside another tooltip, start hide timer for that
  // tooltip in case this tooltip was the only reason it was still showing.
  if (this.parentTooltip_) {
    this.parentTooltip_.startHideTimer();
  }

  events.unlisten(
      element, EventType.MOUSEOVER, this.handleTooltipMouseOver,
      false, this);
  events.unlisten(
      element, EventType.MOUSEOUT, this.handleTooltipMouseOut,
      false, this);

  this.anchor = undefined;
  // If we are still waiting to show a different hovercard, don't abort it
  // because you think you haven't seen a mouse move:
  if (this.getState() == Tooltip.State.INACTIVE) {
    this.seenInteraction_ = false;
  }

  PopupBase.prototype.onHide.call(this);
};


/**
 * Called by timer from mouse over handler. Shows tooltip if cursor is still
 * over the same element.
 *
 * @param {Element} el Element to show tooltip for.
 * @param {AbstractPosition=} opt_pos Position to display popup
 *     at.
 */
Tooltip.prototype.maybeShow = function(el, opt_pos) {
  // Assert that the mouse is still over the same element, and that we have not
  // detached from the anchor in the meantime.
  if (this.anchor == el && this.elements_.contains(this.anchor)) {
    if (this.seenInteraction_ || !this.requireInteraction_) {
      // If it is currently showing, then hide it, and abort if it doesn't hide.
      this.setVisible(false);
      if (!this.isVisible()) {
        this.positionAndShow_(el, opt_pos);
      }
    } else {
      this.anchor = undefined;
    }
  }
  this.showTimer = undefined;
};


/**
 * @return {Set} Elements this widget is attached to.
 * @protected
 */
Tooltip.prototype.getElements = function() {
  return this.elements_;
};


/**
 * @return {Element} Active element reference.
 */
Tooltip.prototype.getActiveElement = function() {
  return this.activeEl_;
};


/**
 * @param {Element} activeEl Active element reference.
 * @protected
 */
Tooltip.prototype.setActiveElement = function(activeEl) {
  this.activeEl_ = activeEl;
};


/**
 * Shows tooltip for a specific element.
 *
 * @param {Element} el Element to show tooltip for.
 * @param {AbstractPosition=} opt_pos Position to display popup
 *     at.
 */
Tooltip.prototype.showForElement = function(el, opt_pos) {
  this.attach(el);
  this.activeEl_ = el;

  this.positionAndShow_(el, opt_pos);
};


/**
 * Sets tooltip position and shows it.
 *
 * @param {Element} el Element to show tooltip for.
 * @param {AbstractPosition=} opt_pos Position to display popup
 *     at.
 * @private
 */
Tooltip.prototype.positionAndShow_ = function(el, opt_pos) {
  this.anchor = el;
  this.setPosition(
      opt_pos ||
      this.getPositioningStrategy(Tooltip.Activation.CURSOR));
  this.setVisible(true);
};


/**
 * Called by timer from mouse out handler. Hides tooltip if cursor is still
 * outside element and tooltip, or if a child of tooltip has the focus.
 * @param {?Element|undefined} el Tooltip's anchor when hide timer was started.
 */
Tooltip.prototype.maybeHide = function(el) {
  this.hideTimer = undefined;
  if (el == this.anchor) {
    var dom = this.getDomHelper();
    var focusedEl = dom.getActiveElement();
    // If the tooltip content is focused, then don't hide the tooltip.
    var tooltipContentFocused = focusedEl && this.getElement() &&
        dom.contains(this.getElement(), focusedEl);
    if ((this.activeEl_ == null ||
         (this.activeEl_ != this.getElement() &&
          !this.elements_.contains(this.activeEl_))) &&
        !tooltipContentFocused && !this.hasActiveChild()) {
      this.setVisible(false);
    }
  }
};


/**
 * @return {boolean} Whether tooltip element contains an active child tooltip,
 *     and should thus not be hidden.  When the child tooltip is hidden, it
 *     will check if the parent should be hidden, too.
 * @protected
 */
Tooltip.prototype.hasActiveChild = function() {
  return !!(this.childTooltip_ && this.childTooltip_.activeEl_);
};


/**
 * Saves the current mouse cursor position to `this.cursorPosition`.
 * @param {BrowserEvent} event MOUSEOVER or MOUSEMOVE event.
 * @private
 */
Tooltip.prototype.saveCursorPosition_ = function(event) {
  var scroll = this.dom_.getDocumentScroll();
  this.cursorPosition.x = event.clientX + scroll.x;
  this.cursorPosition.y = event.clientY + scroll.y;
};


/**
 * Handler for mouse over events.
 *
 * @param {BrowserEvent} event Event object.
 * @protected
 */
Tooltip.prototype.handleMouseOver = function(event) {
  var el = this.getAnchorFromElement(/** @type {Element} */ (event.target));
  this.activeEl_ = el;
  this.clearHideTimer();
  if (el != this.anchor) {
    this.anchor = el;
    this.startShowTimer(el);
    this.checkForParentTooltip_();
    this.saveCursorPosition_(event);
  }
};


/**
 * Find anchor containing the given element, if any.
 *
 * @param {Element} el Element that triggered event.
 * @return {Element} Element in elements_ array that contains given element,
 *     or null if not found.
 * @protected
 */
Tooltip.prototype.getAnchorFromElement = function(el) {
  // FireFox has a bug where mouse events relating to <input> elements are
  // sometimes duplicated (often in FF2, rarely in FF3): once for the
  // <input> element and once for a magic hidden <div> element.  JavaScript
  // code does not have sufficient permissions to read properties on that
  // magic element and thus will throw an error in this call to
  // getAnchorFromElement_().  In that case we swallow the error.
  // See https://bugzilla.mozilla.org/show_bug.cgi?id=330961
  try {
    while (el && !this.elements_.contains(el)) {
      el = /** @type {Element} */ (el.parentNode);
    }
    return el;
  } catch (e) {
    return null;
  }
};


/**
 * Handler for mouse move events.
 *
 * @param {BrowserEvent} event MOUSEMOVE event.
 * @protected
 */
Tooltip.prototype.handleMouseMove = function(event) {
  this.saveCursorPosition_(event);
  this.seenInteraction_ = true;
};


/**
 * Handler for focus events.
 *
 * @param {BrowserEvent} event Event object.
 * @protected
 */
Tooltip.prototype.handleFocus = function(event) {
  var el = this.getAnchorFromElement(/** @type {Element} */ (event.target));
  this.activeEl_ = el;
  this.seenInteraction_ = true;

  if (this.anchor != el) {
    this.anchor = el;
    var pos = this.getPositioningStrategy(Tooltip.Activation.FOCUS);
    this.clearHideTimer();
    this.startShowTimer(el, pos);

    this.checkForParentTooltip_();
  }
};


/**
 * Return a Position instance for repositioning the tooltip. Override in
 * subclasses to customize the way repositioning is done.
 *
 * @param {Tooltip.Activation} activationType Information about what
 *    kind of event caused the popup to be shown.
 * @return {!AbstractPosition} The position object used
 *    to position the tooltip.
 * @protected
 */
Tooltip.prototype.getPositioningStrategy = function(activationType) {
  if (activationType == Tooltip.Activation.CURSOR) {
    var coord = this.cursorPosition.clone();
    return new Tooltip.CursorTooltipPosition(coord);
  }
  return new Tooltip.ElementTooltipPosition(this.activeEl_);
};


/**
 * Looks for an active tooltip whose element contains this tooltip's anchor.
 * This allows us to prevent hides until they are really necessary.
 *
 * @private
 */
Tooltip.prototype.checkForParentTooltip_ = function() {
  if (this.anchor) {
    for (var tt, i = 0; tt = Tooltip.activeInstances_[i]; i++) {
      if (googDom.contains(tt.getElement(), this.anchor)) {
        tt.childTooltip_ = this;
        this.parentTooltip_ = tt;
      }
    }
  }
};


/**
 * Handler for mouse out and blur events.
 *
 * @param {BrowserEvent} event Event object.
 * @protected
 */
Tooltip.prototype.handleMouseOutAndBlur = function(event) {
  var el = this.getAnchorFromElement(/** @type {Element} */ (event.target));
  var elTo = this.getAnchorFromElement(
      /** @type {Element} */ (event.relatedTarget));
  if (el == elTo) {
    // We haven't really left the anchor, just moved from one child to
    // another.
    return;
  }

  if (el == this.activeEl_) {
    this.activeEl_ = null;
  }

  this.clearShowTimer();
  this.seenInteraction_ = false;
  if (this.isVisible() &&
      (!event.relatedTarget ||
       !googDom.contains(this.getElement(), event.relatedTarget))) {
    this.startHideTimer();
  } else {
    this.anchor = undefined;
  }
};


/**
 * Handler for mouse over events for the tooltip element.
 *
 * @param {BrowserEvent} event Event object.
 * @protected
 */
Tooltip.prototype.handleTooltipMouseOver = function(event) {
  var element = this.getElement();
  if (this.activeEl_ != element) {
    this.clearHideTimer();
    this.activeEl_ = element;
  }
};


/**
 * Handler for mouse out events for the tooltip element.
 *
 * @param {BrowserEvent} event Event object.
 * @protected
 */
Tooltip.prototype.handleTooltipMouseOut = function(event) {
  var element = this.getElement();
  if (this.activeEl_ == element &&
      (!event.relatedTarget ||
       !googDom.contains(element, event.relatedTarget))) {
    this.activeEl_ = null;
    this.startHideTimer();
  }
};


/**
 * Helper method, starts timer that calls maybeShow. Parameters are passed to
 * the maybeShow method.
 *
 * @param {Element} el Element to show tooltip for.
 * @param {AbstractPosition=} opt_pos Position to display popup
 *     at.
 * @protected
 */
Tooltip.prototype.startShowTimer = function(el, opt_pos) {
  if (!this.showTimer) {
    this.showTimer = Timer.callOnce(
        goog.bind(this.maybeShow, this, el, opt_pos), this.showDelayMs_);
  }
};


/**
 * Helper method called to clear the show timer.
 *
 * @protected
 */
Tooltip.prototype.clearShowTimer = function() {
  if (this.showTimer) {
    Timer.clear(this.showTimer);
    this.showTimer = undefined;
  }
};


/**
 * Helper method called to start the close timer.
 * @protected
 */
Tooltip.prototype.startHideTimer = function() {
  if (this.getState() == Tooltip.State.SHOWING) {
    this.hideTimer = Timer.callOnce(
        goog.bind(this.maybeHide, this, this.anchor), this.getHideDelayMs());
  }
};


/**
 * Helper method called to clear the close timer.
 * @protected
 */
Tooltip.prototype.clearHideTimer = function() {
  if (this.hideTimer) {
    Timer.clear(this.hideTimer);
    this.hideTimer = undefined;
  }
};


/** @override */
Tooltip.prototype.disposeInternal = function() {
  this.setVisible(false);
  this.clearShowTimer();
  this.detach();
  if (this.getElement()) {
    googDom.removeNode(this.getElement());
  }
  this.activeEl_ = null;
  delete this.dom_;
  Tooltip.superClass_.disposeInternal.call(this);
};



/**
 * Popup position implementation that positions the popup (the tooltip in this
 * case) based on the cursor position. It's positioned below the cursor to the
 * right if there's enough room to fit all of it inside the Viewport. Otherwise
 * it's displayed as far right as possible either above or below the element.
 *
 * Used to position tooltips triggered by the cursor.
 *
 * @param {number|!Coordinate} arg1 Left position or coordinate.
 * @param {number=} opt_arg2 Top position.
 * @constructor
 * @extends {ViewportPosition}
 * @final
 */
Tooltip.CursorTooltipPosition = function(arg1, opt_arg2) {
  ViewportPosition.call(this, arg1, opt_arg2);
};
goog.inherits(
    Tooltip.CursorTooltipPosition, ViewportPosition);


/**
 * Repositions the popup based on cursor position.
 *
 * @param {Element} element The DOM element of the popup.
 * @param {Corner} popupCorner The corner of the popup element
 *     that that should be positioned adjacent to the anchorElement.
 * @param {Box=} opt_margin A margin specified in pixels.
 * @override
 */
Tooltip.CursorTooltipPosition.prototype.reposition = function(
    element, popupCorner, opt_margin) {
  var viewportElt = style.getClientViewportElement(element);
  var viewport = style.getVisibleRectForElement(viewportElt);
  var margin = opt_margin ? new Box(
                                opt_margin.top + 10, opt_margin.right,
                                opt_margin.bottom, opt_margin.left + 10) :
                            new Box(10, 0, 0, 10);

  if (positioning.positionAtCoordinate(
          this.coordinate, element, Corner.TOP_START, margin,
          viewport,
          Overflow.ADJUST_X |
              Overflow.FAIL_Y) &
      OverflowStatus.FAILED) {
    positioning.positionAtCoordinate(
        this.coordinate, element, Corner.TOP_START, margin,
        viewport,
        Overflow.ADJUST_X |
            Overflow.ADJUST_Y);
  }
};



/**
 * Popup position implementation that positions the popup (the tooltip in this
 * case) based on the element position. It's positioned below the element to the
 * right if there's enough room to fit all of it inside the Viewport. Otherwise
 * it's displayed as far right as possible either above or below the element.
 *
 * Used to position tooltips triggered by focus changes.
 *
 * @param {Element} element The element to anchor the popup at.
 * @constructor
 * @extends {AnchoredPosition}
 */
Tooltip.ElementTooltipPosition = function(element) {
  AnchoredPosition.call(
      this, element, Corner.BOTTOM_RIGHT);
};
goog.inherits(
    Tooltip.ElementTooltipPosition, AnchoredPosition);


/**
 * Repositions the popup based on element position.
 *
 * @param {Element} element The DOM element of the popup.
 * @param {Corner} popupCorner The corner of the popup element
 *     that should be positioned adjacent to the anchorElement.
 * @param {Box=} opt_margin A margin specified in pixels.
 * @override
 */
Tooltip.ElementTooltipPosition.prototype.reposition = function(
    element, popupCorner, opt_margin) {
  var offset = new Coordinate(10, 0);

  if (positioning.positionAtAnchor(
          this.element, this.corner, element, popupCorner, offset, opt_margin,
          Overflow.ADJUST_X |
              Overflow.FAIL_Y) &
      OverflowStatus.FAILED) {
    positioning.positionAtAnchor(
        this.element, Corner.TOP_RIGHT, element,
        Corner.BOTTOM_LEFT, offset, opt_margin,
        Overflow.ADJUST_X |
            Overflow.ADJUST_Y);
  }
};
