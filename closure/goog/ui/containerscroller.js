/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Scroll behavior that can be added onto a container.
 */

import { Disposable } from '../disposable/disposable.js';

import { Timer } from '../timer/timer.js';
import { EventHandler } from '../events/eventhandler.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
import { Container } from './container.js';
const { Event } = goog.requireType('goog.events.event');



/**
 * Plug-on scrolling behavior for a container.
 *
 * Use this to style containers, such as pop-up menus, to be scrolling, and
 * automatically keep the highlighted element visible.
 *
 * To use this, first style your container with the desired overflow
 * properties and height to achieve vertical scrolling.  Also, the scrolling
 * div should have no vertical padding, for two reasons: it is difficult to
 * compensate for, and is generally not what you want due to the strange way
 * CSS handles padding on the scrolling dimension.
 *
 * The container must already be rendered before this may be constructed.
 *
 * @param {!Container} container The container to attach behavior to.
 * @constructor
 * @extends {Disposable}
 * @final
 */
export function ContainerScroller(container) {
  Disposable.call(this);

  /**
     * The container that we are bestowing scroll behavior on.
     * @type {!Container}
     * @private
     */
  this.container_ = container;

  /**
       * Event handler for this object.
       * @type {!EventHandler<!ContainerScroller>}
       * @private
       */
  this.eventHandler_ = new EventHandler(this);

  this.eventHandler_.listen(
      container, Component.ComponentEventType.HIGHLIGHT, this.onHighlight_);
  this.eventHandler_.listen(
      container, Component.ComponentEventType.ENTER, this.onEnter_);
  this.eventHandler_.listen(
      container, Container.EventType.AFTER_SHOW, this.onAfterShow_);
  this.eventHandler_.listen(
      container, Component.ComponentEventType.HIDE, this.onHide_);

  // TODO(gboyer): Allow a ContainerScroller to be attached with a Container
  // before the container is rendered.

  this.doScrolling_(true);
}
goog.inherits(ContainerScroller, Disposable);


/**
 * The last target the user hovered over.
 *
 * @see #onEnter_
 * @type {?Component}
 * @private
 */
ContainerScroller.prototype.lastEnterTarget_ = null;


/**
 * The scrollTop of the container before it was hidden.
 * Used to restore the scroll position when the container is shown again.
 * @type {?number}
 * @private
 */
ContainerScroller.prototype.scrollTopBeforeHide_ = null;


/**
 * Whether we are disabling the default handler for hovering.
 *
 * @see #onEnter_
 * @see #temporarilyDisableHover_
 * @type {boolean}
 * @private
 */
ContainerScroller.prototype.disableHover_ = false;


/**
 * Handles hover events on the container's children.
 *
 * Helps enforce two constraints: scrolling should not cause mouse highlights,
 * and mouse highlights should not cause scrolling.
 *
 * @param {Event} e The container's ENTER event.
 * @private
 */
ContainerScroller.prototype.onEnter_ = function(e) {
  if (this.disableHover_) {
    // The container was scrolled recently.  Since the mouse may be over the
    // container, stop the default action of the ENTER event from causing
    // highlights.
    e.preventDefault();
  } else {
    // The mouse is moving and causing hover events.  Stop the resulting
    // highlight (if it happens) from causing a scroll.
    this.lastEnterTarget_ = /** @type {Component} */ (e.target);
  }
};


/**
 * Handles highlight events on the container's children.
 * @param {Event} e The container's highlight event.
 * @private
 */
ContainerScroller.prototype.onHighlight_ = function(e) {
  this.doScrolling_();
};


/**
 * Handles AFTER_SHOW events on the container. Makes the container
 * scroll to the previously scrolled position (if there was one),
 * then adjust it to make the highlighted element be in view (if there is one).
 * If there was no previous scroll position, then center the highlighted
 * element (if there is one).
 * @param {Event} e The container's AFTER_SHOW event.
 * @private
 */
ContainerScroller.prototype.onAfterShow_ = function(e) {
  if (this.scrollTopBeforeHide_ != null) {
    this.container_.getElement().scrollTop = this.scrollTopBeforeHide_;
    // Make sure the highlighted item is still visible, in case the list
    // or its hilighted item has changed.
    this.doScrolling_(false);
  } else {
    this.doScrolling_(true);
  }
};


/**
 * Handles hide events on the container. Clears out the last enter target,
 * since it is no longer applicable, and remembers the scroll position of
 * the menu so that it can be restored when the menu is reopened.
 * @param {Event} e The container's hide event.
 * @private
 */
ContainerScroller.prototype.onHide_ = function(e) {
  if (e.target == this.container_) {
    this.lastEnterTarget_ = null;
    this.scrollTopBeforeHide_ = this.container_.getElement().scrollTop;
  }
};


/**
 * Centers the currently highlighted item, if this is scrollable.
 * @param {boolean=} opt_center Whether to center the highlighted element
 *     rather than simply ensure it is in view.  Useful for the first
 *     render.
 * @private
 */
ContainerScroller.prototype.doScrolling_ = function(opt_center) {
  var highlighted = this.container_.getHighlighted();

  // Only scroll if we're visible and there is a highlighted item.
  if (this.container_.isVisible() && highlighted &&
      highlighted != this.lastEnterTarget_) {
    var element = this.container_.getElement();
    style.scrollIntoContainerView(
        highlighted.getElement(), element, opt_center);
    this.temporarilyDisableHover_();
    this.lastEnterTarget_ = null;
  }
};


/**
 * Temporarily disables hover events from changing highlight.
 * @see #onEnter_
 * @private
 */
ContainerScroller.prototype.temporarilyDisableHover_ = function() {
  this.disableHover_ = true;
  Timer.callOnce(function() {
    this.disableHover_ = false;
  }, 0, this);
};


/** @override */
ContainerScroller.prototype.disposeInternal = function() {
  ContainerScroller.superClass_.disposeInternal.call(this);
  this.eventHandler_.dispose();
  this.lastEnterTarget_ = null;
};
