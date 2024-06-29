/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Show hovercards with a delay after the mouse moves over an
 * element of a specified type and with a specific attribute.
 *
 * @see ../demos/hovercard.html
 */

import * as dom from '../dom/dom.js';

import * as events from '../events/events.js';
import { Event } from '../events/event.js';
import { EventType } from '../events/eventtype.js';
import { AdvancedTooltip } from './advancedtooltip.js';
import { PopupBase } from './popupbase.js';
import { Tooltip } from './tooltip.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { AbstractPosition } = goog.requireType('goog.positioning.abstractposition');



/**
 * Create a hover card object.  Hover cards extend tooltips in that they don't
 * have to be manually attached to each element that can cause them to display.
 * Instead, you can create a function that gets called when the mouse goes over
 * any element on your page, and returns whether or not the hovercard should be
 * shown for that element.
 *
 * Alternatively, you can define a map of tag names to the attribute name each
 * tag should have for that tag to trigger the hover card.  See example below.
 *
 * Hovercards can also be triggered manually by calling
 * `triggerForElement`, shown without a delay by calling
 * `showForElement`, or triggered over other elements by calling
 * `attach`.  For the latter two cases, the application is responsible
 * for calling `detach` when finished.
 *
 * HoverCard objects fire a TRIGGER event when the mouse moves over an element
 * that can trigger a hovercard, and BEFORE_SHOW when the hovercard is
 * about to be shown.  Clients can respond to these events and can prevent the
 * hovercard from being triggered or shown.
 *
 * @param {Function|Object} isAnchor Function that returns true if a given
 *     element should trigger the hovercard.  Alternatively, it can be a map of
 *     tag names to the attribute that the tag should have in order to trigger
 *     the hovercard, e.g., {A: 'href'} for all links.  Tag names must be all
 *     upper case; attribute names are case insensitive.
 * @param {boolean=} opt_checkDescendants Use false for a performance gain if
 *     you are sure that none of your triggering elements have child elements.
 *     Default is true.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper to use for
 *     creating and rendering the hovercard element.
 * @param {Document=} opt_triggeringDocument Optional document to use in place
 *     of the one included in the DomHelper for finding triggering elements.
 *     Defaults to the document included in the DomHelper.
 * @constructor
 * @extends {AdvancedTooltip}
 */
export function HoverCard(isAnchor, opt_checkDescendants, opt_domHelper, opt_triggeringDocument) {
  AdvancedTooltip.call(this, null, null, opt_domHelper);

  if (typeof isAnchor === 'function') {
    // Override default implementation of `isAnchor_`.
    this.isAnchor_ = isAnchor;
  } else {
    /**
     * Map of tag names to attribute names that will trigger a hovercard.
     * @type {Object}
     * @private
     */
    this.anchors_ = isAnchor;
  }

  /**
   * Whether anchors may have child elements.  If true, then we need to check
   * the parent chain of any mouse over event to see if any of those elements
   * could be anchors.  Default is true.
   * @type {boolean}
   * @private
   */
  this.checkDescendants_ = opt_checkDescendants != false;

  /**
   * Array of anchor elements that should be detached when we are no longer
   * associated with them.
   * @type {!Array<Element>}
   * @private
   */
  this.tempAttachedAnchors_ = [];

  /**
   * Document containing the triggering elements, to which we listen for
   * mouseover events.
   * @type {Document}
   * @private
   */
  this.document_ = opt_triggeringDocument ||
      (opt_domHelper ? opt_domHelper.getDocument() : dom.getDocument());

  events.listen(
      this.document_, EventType.MOUSEOVER,
      this.handleTriggerMouseOver_, false, this);
}
goog.inherits(HoverCard, AdvancedTooltip);


/**
 * Enum for event type fired by HoverCard.
 * @enum {string}
 */
HoverCard.EventType = {
  TRIGGER: 'trigger',
  CANCEL_TRIGGER: 'canceltrigger',
  BEFORE_SHOW: PopupBase.EventType.BEFORE_SHOW,
  SHOW: PopupBase.EventType.SHOW,
  BEFORE_HIDE: PopupBase.EventType.BEFORE_HIDE,
  HIDE: PopupBase.EventType.HIDE
};


/** @override */
HoverCard.prototype.disposeInternal = function() {
  HoverCard.superClass_.disposeInternal.call(this);

  events.unlisten(
      this.document_, EventType.MOUSEOVER,
      this.handleTriggerMouseOver_, false, this);
};


/**
 * Anchor of hovercard currently being shown.  This may be different from
 * `anchor` property if a second hovercard is triggered, when
 * `anchor` becomes the second hovercard while `currentAnchor_`
 * is still the old (but currently displayed) anchor.
 * @type {Element}
 * @private
 */
HoverCard.prototype.currentAnchor_;


/**
 * Maximum number of levels to search up the dom when checking descendants.
 * @type {number}
 * @private
 */
HoverCard.prototype.maxSearchSteps_;


/**
 * This function can be overridden by passing a function as the first parameter
 * to the constructor.
 * @param {Node} node Node to test.
 * @return {boolean} Whether or not hovercard should be shown.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
HoverCard.prototype.isAnchor_ = function(node) {
  return node.tagName in this.anchors_ &&
      !!node.getAttribute(this.anchors_[node.tagName]);
};


/**
 * If the user mouses over an element with the correct tag and attribute, then
 * trigger the hovercard for that element.  If anchors could have children, then
 * we also need to check the parent chain of the given element.
 * @param {Event} e Mouse over event.
 * @private
 */
HoverCard.prototype.handleTriggerMouseOver_ = function(e) {
  var target = /** @type {Element} */ (e.target);
  // Target might be null when hovering over disabled input textboxes in IE.
  if (!target) {
    return;
  }
  if (this.isAnchor_(target)) {
    this.setPosition(null);
    this.triggerForElement(target);
  } else if (this.checkDescendants_) {
    var trigger = dom.getAncestor(
        target, goog.bind(this.isAnchor_, this), false, this.maxSearchSteps_);
    if (trigger) {
      this.setPosition(null);
      this.triggerForElement(/** @type {!Element} */ (trigger));
    }
  }
};


/**
 * Triggers the hovercard to show after a delay.
 * @param {Element} anchorElement Element that is triggering the hovercard.
 * @param {AbstractPosition=} opt_pos Position to display
 *     hovercard.
 * @param {Object=} opt_data Data to pass to the onTrigger event.
 */
HoverCard.prototype.triggerForElement = function(
    anchorElement, opt_pos, opt_data) {
  if (anchorElement == this.currentAnchor_) {
    // Element is already showing, just make sure it doesn't hide.
    this.clearHideTimer();
    return;
  }
  if (anchorElement == this.anchor) {
    // Hovercard is pending, no need to retrigger.
    return;
  }

  // If a previous hovercard was being triggered, cancel it.
  this.maybeCancelTrigger_();

  // Create a new event for this trigger
  var triggerEvent = new HoverCard.TriggerEvent(
      HoverCard.EventType.TRIGGER, this, anchorElement, opt_data);

  if (!this.getElements().contains(anchorElement)) {
    this.attach(anchorElement);
    this.tempAttachedAnchors_.push(anchorElement);
  }
  this.anchor = anchorElement;
  if (!this.onTrigger(triggerEvent)) {
    this.onCancelTrigger();
    return;
  }
  var pos = opt_pos || this.getPosition();
  this.startShowTimer(
      anchorElement,
      /** @type {AbstractPosition} */ (pos));
};


/**
 * Sets the current anchor element at the time that the hovercard is shown.
 * @param {Element} anchor New current anchor element, or null if there is
 *     no current anchor.
 * @private
 */
HoverCard.prototype.setCurrentAnchor_ = function(anchor) {
  if (anchor != this.currentAnchor_) {
    this.detachTempAnchor_(this.currentAnchor_);
  }
  this.currentAnchor_ = anchor;
};


/**
 * If given anchor is in the list of temporarily attached anchors, then
 * detach and remove from the list.
 * @param {Element|undefined} anchor Anchor element that we may want to detach
 *     from.
 * @private
 */
HoverCard.prototype.detachTempAnchor_ = function(anchor) {
  if (anchor) {
    var pos = this.tempAttachedAnchors_.indexOf(anchor);
    if (pos != -1) {
      this.detach(anchor);
      this.tempAttachedAnchors_.splice(pos, 1);
    }
  }
};


/**
 * Called when an element triggers the hovercard.  This will return false
 * if an event handler sets preventDefault to true, which will prevent
 * the hovercard from being shown.
 * @param {!HoverCard.TriggerEvent} triggerEvent Event object to use
 *     for trigger event.
 * @return {boolean} Whether hovercard should be shown or cancelled.
 * @protected
 */
HoverCard.prototype.onTrigger = function(triggerEvent) {
  return this.dispatchEvent(triggerEvent);
};


/**
 * Abort pending hovercard showing, if any.
 */
HoverCard.prototype.cancelTrigger = function() {
  this.clearShowTimer();
  this.onCancelTrigger();
};


/**
 * If hovercard is in the process of being triggered, then cancel it.
 * @private
 */
HoverCard.prototype.maybeCancelTrigger_ = function() {
  if (this.getState() == Tooltip.State.WAITING_TO_SHOW ||
      this.getState() == Tooltip.State.UPDATING) {
    this.cancelTrigger();
  }
};


/**
 * This method gets called when we detect that a trigger event will not lead
 * to the hovercard being shown.
 * @protected
 */
HoverCard.prototype.onCancelTrigger = function() {
  var event = new HoverCard.TriggerEvent(
      HoverCard.EventType.CANCEL_TRIGGER, this, this.anchor || null);
  this.dispatchEvent(event);
  this.detachTempAnchor_(this.anchor);
  delete this.anchor;
};


/**
 * Gets the DOM element that triggered the current hovercard.  Note that in
 * the TRIGGER or CANCEL_TRIGGER events, the current hovercard's anchor may not
 * be the one that caused the event, so use the event's anchor property instead.
 * @return {Element} Object that caused the currently displayed hovercard (or
 *     pending hovercard if none is displayed) to be triggered.
 */
HoverCard.prototype.getAnchorElement = function() {
  // this.currentAnchor_ is only set if the hovercard is showing.  If it isn't
  // showing yet, then use this.anchor as the pending anchor.
  return /** @type {Element} */ (this.currentAnchor_ || this.anchor);
};


/**
 * Make sure we detach from temp anchor when we are done displaying hovercard.
 * @protected
 * @override
 */
HoverCard.prototype.onHide = function() {
  HoverCard.superClass_.onHide.call(this);
  this.setCurrentAnchor_(null);
};


/**
 * This mouse over event is only received if the anchor is already attached.
 * If it was attached manually, then it may need to be triggered.
 * @param {BrowserEvent} event Mouse over event.
 * @override
 */
HoverCard.prototype.handleMouseOver = function(event) {
  // If this is a child of a triggering element, find the triggering element.
  var trigger = this.getAnchorFromElement(
      /** @type {Element} */ (event.target));

  // If we moused over an element different from the one currently being
  // triggered (if any), then trigger this new element.
  if (trigger && trigger != this.anchor) {
    this.triggerForElement(trigger);
    return;
  }

  HoverCard.superClass_.handleMouseOver.call(this, event);
};


/**
 * If the mouse moves out of the trigger while we're being triggered, then
 * cancel it.
 * @param {BrowserEvent} event Mouse out or blur event.
 * @override
 */
HoverCard.prototype.handleMouseOutAndBlur = function(event) {
  // Get ready to see if a trigger should be cancelled.
  var anchor = this.anchor;
  var state = this.getState();
  HoverCard.superClass_.handleMouseOutAndBlur.call(this, event);
  if (state != this.getState() &&
      (state == Tooltip.State.WAITING_TO_SHOW ||
       state == Tooltip.State.UPDATING)) {
    // Tooltip's handleMouseOutAndBlur method sets anchor to null.  Reset
    // so that the cancel trigger event will have the right data, and so that
    // it will be properly detached.
    this.anchor = anchor;
    this.onCancelTrigger();  // This will remove and detach the anchor.
  }
};


/**
 * Called by timer from mouse over handler. If this is called and the hovercard
 * is not shown for whatever reason, then send a cancel trigger event.
 * @param {Element} el Element to show tooltip for.
 * @param {AbstractPosition=} opt_pos Position to display popup
 *     at.
 * @override
 */
HoverCard.prototype.maybeShow = function(el, opt_pos) {
  HoverCard.superClass_.maybeShow.call(this, el, opt_pos);

  if (!this.isVisible()) {
    this.cancelTrigger();
  } else {
    this.setCurrentAnchor_(el);
  }
};


/**
 * Sets the max number of levels to search up the dom if checking descendants.
 * @param {number} maxSearchSteps Maximum number of levels to search up the
 *     dom if checking descendants.
 */
HoverCard.prototype.setMaxSearchSteps = function(maxSearchSteps) {
  if (!maxSearchSteps) {
    this.checkDescendants_ = false;
  } else if (this.checkDescendants_) {
    this.maxSearchSteps_ = maxSearchSteps;
  }
};



/**
 * Create a trigger event for specified anchor and optional data.
 * @param {HoverCard.EventType} type Event type.
 * @param {HoverCard} target Hovercard that is triggering the event.
 * @param {Element} anchor Element that triggered event.
 * @param {Object=} opt_data Optional data to be available in the TRIGGER event.
 * @constructor
 * @extends {Event}
 * @final
 */
HoverCard.TriggerEvent = function(type, target, anchor, opt_data) {
  Event.call(this, type, target);

  /**
   * Element that triggered the hovercard event.
   * @type {Element}
   */
  this.anchor = anchor;

  /**
   * Optional data to be passed to the listener.
   * @type {Object|undefined}
   */
  this.data = opt_data;
};
goog.inherits(HoverCard.TriggerEvent, Event);
