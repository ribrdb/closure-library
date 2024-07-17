/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview  Class for splitting two areas with draggable control for
 * changing size.
 *
 * The DOM that is created (or that can be decorated) looks like this:
 * <div class='goog-splitpane'>
 *   <div class='goog-splitpane-first-container'></div>
 *   <div class='goog-splitpane-second-container'></div>
 *   <div class='goog-splitpane-handle'></div>
 * </div>
 *
 * The content to be split goes in the first and second DIVs, the third one
 * is for managing (and styling) the splitter handle.
 *
 * @see ../demos/splitpane.html
 */


import * as asserts from '../asserts/asserts.js';

import { dispose } from '../disposable/dispose.js';
import * as googDom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { EventType } from '../events/eventtype.js';
import { Dragger } from '../fx/dragger.js';
import { Rect } from '../math/rect.js';
import { Size } from '../math/size.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
const {Event} = goog.requireType('goog.events.event');
const {DragEvent} = goog.requireType('goog.fx.dragger');



/**
 * A left/right up/down Container SplitPane.
 * Create SplitPane with two Component opjects to split.
 * TODO(user): Support minimum splitpane size.
 * TODO(user): Allow component change/orientation after init.
 * TODO(user): Support hiding either side of handle (plus handle).
 * TODO(user): Look at setBorderBoxSize fixes and revist borderwidth code.
 *
 * @param {Component} firstComponent Left or Top component.
 * @param {Component} secondComponent Right or Bottom component.
 * @param {SplitPane.Orientation} orientation SplitPane orientation.
 * @param {googDom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {Component}
 * @constructor
 */
export function SplitPane(firstComponent, secondComponent, orientation, opt_domHelper) {
  SplitPane.base(this, 'constructor', opt_domHelper);

  /**
     * The orientation of the containers.
     * @type {SplitPane.Orientation}
     * @private
     */
  this.orientation_ = orientation;

  /**
     * The left/top component.
     * @type {Component}
     * @private
     */
  this.firstComponent_ = firstComponent;
  this.addChild(firstComponent);

  /**
     * The right/bottom component.
     * @type {Component}
     * @private
     */
  this.secondComponent_ = secondComponent;
  this.addChild(secondComponent);

  /** @private {?Element} */
  this.splitpaneHandle_ = null;
}
goog.inherits(SplitPane, Component);


/**
 * Events.
 * @enum {string}
 */
SplitPane.EventType = {

  /**
   * Dispatched after handle drag.
   */
  HANDLE_DRAG: 'handle_drag',

  /**
   * Dispatched after handle drag end.
   */
  HANDLE_DRAG_END: 'handle_drag_end',

  /**
   * Dispatched after handle snap (double-click splitter).
   */
  HANDLE_SNAP: 'handle_snap'
};


/**
 * CSS class names for splitpane outer container.
 * @type {string}
 * @private
 */
SplitPane.CLASS_NAME_ = goog.getCssName('goog-splitpane');


/**
 * CSS class name for first splitpane container.
 * @type {string}
 * @private
 */
SplitPane.FIRST_CONTAINER_CLASS_NAME_ =
    goog.getCssName('goog-splitpane-first-container');


/**
 * CSS class name for second splitpane container.
 * @type {string}
 * @private
 */
SplitPane.SECOND_CONTAINER_CLASS_NAME_ =
    goog.getCssName('goog-splitpane-second-container');


/**
 * CSS class name for the splitpane handle.
 * @type {string}
 * @private
 */
SplitPane.HANDLE_CLASS_NAME_ = goog.getCssName('goog-splitpane-handle');


/**
 * CSS class name for the splitpane handle in horizontal orientation.
 * @type {string}
 * @private
 */
SplitPane.HANDLE_CLASS_NAME_HORIZONTAL_ =
    goog.getCssName('goog-splitpane-handle-horizontal');


/**
 * CSS class name for the splitpane handle in horizontal orientation.
 * @type {string}
 * @private
 */
SplitPane.HANDLE_CLASS_NAME_VERTICAL_ =
    goog.getCssName('goog-splitpane-handle-vertical');


/**
  * The dragger to move the drag handle.
  * @type {Dragger?}
  * @private
  */
SplitPane.prototype.splitDragger_ = null;


/**
 * The left/top component dom container.
 * @type {?Element}
 * @private
 */
SplitPane.prototype.firstComponentContainer_ = null;


/**
 * The right/bottom component dom container.
 * @type {?Element}
 * @private
 */
SplitPane.prototype.secondComponentContainer_ = null;


/**
 * The size (width or height) of the splitpane handle, default = 5.
 * @type {number}
 * @private
 */
SplitPane.prototype.handleSize_ = 5;


/**
 * The initial size (width or height) of the left or top component.
 * @type {?number}
 * @private
 */
SplitPane.prototype.initialSize_ = null;


/**
 * The saved size (width or height) of the left or top component on a
 * double-click (snap).
 * This needs to be saved so it can be restored after another double-click.
 * @type {?number}
 * @private
 */
SplitPane.prototype.savedSnapSize_ = null;


/**
 * The first component size, so we don't change it on a window resize.
 * @type {?number}
 * @private
 */
SplitPane.prototype.firstComponentSize_ = null;


/**
 * If we resize as they user moves the handle (default = true).
 * @type {boolean}
 * @private
 */
SplitPane.prototype.continuousResize_ = true;


/**
 * Iframe overlay to prevent iframes from grabbing events.
 * @type {?Element}
 * @private
 */
SplitPane.prototype.iframeOverlay_ = null;


/**
 * Z indices for iframe overlay and splitter handle.
 * @enum {number}
 * @private
 */
SplitPane.IframeOverlayIndex_ = {
  HIDDEN: -1,
  OVERLAY: 1,
  SPLITTER_HANDLE: 2
};


/**
* Orientation values for the splitpane.
* @enum {string}
*/
SplitPane.Orientation = {

  /**
   * Horizontal orientation means splitter moves right-left.
   */
  HORIZONTAL: 'horizontal',

  /**
   * Vertical orientation means splitter moves up-down.
   */
  VERTICAL: 'vertical'
};


/**
 * Create the DOM node & text node needed for the splitpane.
 * @override
 */
SplitPane.prototype.createDom = function() {
  var dom = this.getDomHelper();

  // Create the components.
  var firstContainer = dom.createDom(
      TagName.DIV, SplitPane.FIRST_CONTAINER_CLASS_NAME_);
  var secondContainer = dom.createDom(
      TagName.DIV, SplitPane.SECOND_CONTAINER_CLASS_NAME_);
  var splitterHandle =
      dom.createDom(TagName.DIV, SplitPane.HANDLE_CLASS_NAME_);

  // Create the primary element, a DIV that holds the two containers and handle.
  this.setElementInternal(
      dom.createDom(
          TagName.DIV, SplitPane.CLASS_NAME_, firstContainer,
          secondContainer, splitterHandle));

  this.firstComponentContainer_ = firstContainer;
  this.secondComponentContainer_ = secondContainer;
  this.splitpaneHandle_ = splitterHandle;
  this.setUpHandle_();

  this.finishSetup_();
};


/**
 * Determines if a given element can be decorated by this type of component.
 * @param {Element} element Element to decorate.
 * @return {boolean} True if the element can be decorated, false otherwise.
 * @override
 */
SplitPane.prototype.canDecorate = function(element) {
  var className = SplitPane.FIRST_CONTAINER_CLASS_NAME_;
  var firstContainer = this.getElementToDecorate_(element, className);
  if (!firstContainer) {
    return false;
  }
  // Since we have this component, save it so we don't have to get it
  // again in decorateInternal.  Same w/other components.
  this.firstComponentContainer_ = firstContainer;

  className = SplitPane.SECOND_CONTAINER_CLASS_NAME_;
  var secondContainer = this.getElementToDecorate_(element, className);

  if (!secondContainer) {
    return false;
  }
  this.secondComponentContainer_ = secondContainer;

  className = SplitPane.HANDLE_CLASS_NAME_;
  var splitpaneHandle = this.getElementToDecorate_(element, className);
  if (!splitpaneHandle) {
    return false;
  }
  this.splitpaneHandle_ = splitpaneHandle;

  // We found all the components we're looking for, so return true.
  return true;
};


/**
 * Obtains the element to be decorated by class name. If multiple such elements
 * are found, preference is given to those directly attached to the specified
 * root element.
 * @param {Element} rootElement The root element from which to retrieve the
 *     element to be decorated.
 * @param {string} className The target class name.
 * @return {!Element} The element to decorate.
 * @private
 */
SplitPane.prototype.getElementToDecorate_ = function(
    rootElement, className) {
  // Decorate the root element's children, if available.
  var childElements = googDom.getChildren(rootElement);
  for (var i = 0; i < childElements.length; i++) {
    var childElement = asserts.assertElement(childElements[i]);
    if (classlist.contains(childElement, className)) {
      return childElement;
    }
  }

  // Default to the first descendant element with the correct class.
  return googDom.getElementsByTagNameAndClass(null, className, rootElement)[0];
};


/**
 * Decorates the given HTML element as a SplitPane.  Overrides {@link
 * Component#decorateInternal}.  Considered protected.
 * @param {Element} element Element (SplitPane div) to decorate.
 * @protected
 * @override
 */
SplitPane.prototype.decorateInternal = function(element) {
  SplitPane.base(this, 'decorateInternal', element);

  this.setUpHandle_();

  var elSize = style.getBorderBoxSize(element);
  this.setSize(new Size(elSize.width, elSize.height));

  this.finishSetup_();
};


/**
 * Parent the passed in components to the split containers.  Call their
 * createDom methods if necessary.
 * @private
 */
SplitPane.prototype.finishSetup_ = function() {
  var dom = this.getDomHelper();

  if (!this.firstComponent_.getElement()) {
    this.firstComponent_.createDom();
  }

  dom.appendChild(
      this.firstComponentContainer_, this.firstComponent_.getElement());

  if (!this.secondComponent_.getElement()) {
    this.secondComponent_.createDom();
  }

  dom.appendChild(
      this.secondComponentContainer_, this.secondComponent_.getElement());

  this.splitDragger_ =
      new Dragger(this.splitpaneHandle_, this.splitpaneHandle_);

  this.firstComponentContainer_.style.position = 'absolute';
  this.secondComponentContainer_.style.position = 'absolute';
  var handleStyle = this.splitpaneHandle_.style;
  handleStyle.position = 'absolute';
  handleStyle.overflow = 'hidden';
  handleStyle.zIndex = SplitPane.IframeOverlayIndex_.SPLITTER_HANDLE;
};


/**
 * Setup all events and do an initial resize.
 * @override
 */
SplitPane.prototype.enterDocument = function() {
  SplitPane.base(this, 'enterDocument');

  // If position is not set in the inline style of the element, it is not
  // possible to get the element's real CSS position until the element is in
  // the document.
  // When position:relative is set in the CSS and the element is not in the
  // document, Safari, Chrome, and Opera always return the empty string; while
  // IE always return "static".
  // Do the final check to see if element's position is set as "relative",
  // "absolute" or "fixed".
  var element = this.getElement();
  if (style.getComputedPosition(element) == 'static') {
    element.style.position = 'relative';
  }

  this.getHandler()
      .listen(
          this.splitpaneHandle_, EventType.DBLCLICK,
          this.handleDoubleClick_)
      .listen(
          this.splitDragger_, Dragger.EventType.START,
          this.handleDragStart_)
      .listen(
          this.splitDragger_, Dragger.EventType.DRAG, this.handleDrag_)
      .listen(
          this.splitDragger_, Dragger.EventType.END,
          this.handleDragEnd_);

  this.setFirstComponentSize(this.initialSize_);
};


/**
 * Sets the initial size of the left or top component.
 * @param {number} size The size in Pixels of the container.
 */
SplitPane.prototype.setInitialSize = function(size) {
  this.initialSize_ = size;
};


/**
 * Sets the SplitPane handle size.
 * TODO(user): Make sure this works after initialization.
 * @param {number} size The size of the handle in pixels.
 */
SplitPane.prototype.setHandleSize = function(size) {
  this.handleSize_ = size;
};


/**
 * Sets whether we resize on handle drag.
 * @param {boolean} continuous The continuous resize value.
 */
SplitPane.prototype.setContinuousResize = function(continuous) {
  this.continuousResize_ = continuous;
};


/**
 * Returns whether the orientation for the split pane is vertical
 * or not.
 * @return {boolean} True if the orientation is vertical, false otherwise.
 */
SplitPane.prototype.isVertical = function() {
  return this.orientation_ == SplitPane.Orientation.VERTICAL;
};


/**
 * Initializes the handle by assigning the correct height/width and adding
 * the correct class as per the orientation.
 * @private
 */
SplitPane.prototype.setUpHandle_ = function() {
  if (this.isVertical()) {
    this.splitpaneHandle_.style.height = this.handleSize_ + 'px';
    classlist.add(
        this.splitpaneHandle_, SplitPane.HANDLE_CLASS_NAME_VERTICAL_);
  } else {
    this.splitpaneHandle_.style.width = this.handleSize_ + 'px';
    classlist.add(
        this.splitpaneHandle_, SplitPane.HANDLE_CLASS_NAME_HORIZONTAL_);
  }
};


/**
 * Sets the orientation class for the split pane handle.
 * @protected
 */
SplitPane.prototype.setOrientationClassForHandle = function() {
  asserts.assert(this.splitpaneHandle_);
  if (this.isVertical()) {
    classlist.swap(
        this.splitpaneHandle_, SplitPane.HANDLE_CLASS_NAME_HORIZONTAL_,
        SplitPane.HANDLE_CLASS_NAME_VERTICAL_);
  } else {
    classlist.swap(
        this.splitpaneHandle_, SplitPane.HANDLE_CLASS_NAME_VERTICAL_,
        SplitPane.HANDLE_CLASS_NAME_HORIZONTAL_);
  }
};


/**
 * Sets the orientation of the split pane.
 * @param {SplitPane.Orientation} orientation SplitPane orientation.
 */
SplitPane.prototype.setOrientation = function(orientation) {
  if (this.orientation_ != orientation) {
    this.orientation_ = orientation;
    var isVertical = this.isVertical();

    // If the split pane is already in document, then the positions and sizes
    // need to be adjusted.
    if (this.isInDocument()) {
      this.setOrientationClassForHandle();
      // TODO(user): Should handleSize_ and initialSize_ also be adjusted ?
      if (typeof this.firstComponentSize_ === 'number') {
        var splitpaneSize = style.getBorderBoxSize(this.getElement());
        var ratio = isVertical ? splitpaneSize.height / splitpaneSize.width :
                                 splitpaneSize.width / splitpaneSize.height;
        // TODO(user): Fix the behaviour for the case when the handle is
        // placed on either of  the edges of the split pane. Also, similar
        // behaviour is present in {@link #setSize}. Probably need to modify
        // {@link #setFirstComponentSize}.
        this.setFirstComponentSize(this.firstComponentSize_ * ratio);
      } else {
        this.setFirstComponentSize();
      }
    }
  }
};


/**
 * Gets the orientation of the split pane.
 * @return {SplitPane.Orientation} The orientation.
 */
SplitPane.prototype.getOrientation = function() {
  return this.orientation_;
};


/**
 * Move and resize a container.  The sizing changes the BorderBoxSize.
 * @param {Element} element The element to move and size.
 * @param {Rect} rect The top, left, width and height to change to.
 * @private
 */
SplitPane.prototype.moveAndSize_ = function(element, rect) {
  style.setPosition(element, rect.left, rect.top);
  // TODO(user): Add a Size.max call for below.
  style.setBorderBoxSize(
      element,
      new Size(Math.max(rect.width, 0), Math.max(rect.height, 0)));
};


/**
 * @return {?number} The size of the left/top component.
 */
SplitPane.prototype.getFirstComponentSize = function() {
  return this.firstComponentSize_;
};


/**
 * Set the size of the left/top component, and resize the other component based
 * on that size and handle size.
 * @param {?number=} opt_size The size of the top or left, in pixels. If
 *     unspecified, leaves the size of the first component unchanged but adjusts
 *     the size of the second component to fit the split pane size.
 */
SplitPane.prototype.setFirstComponentSize = function(opt_size) {
  this.setFirstComponentSize_(
      style.getBorderBoxSize(this.getElement()), opt_size);
};


/**
 * Set the size of the left/top component, and resize the other component based
 * on that size and handle size. Unlike the public method, this takes the
 * current pane size which avoids the expensive getBorderBoxSize() call
 * when we have the size available.
 *
 * @param {!Size} splitpaneSize The current size of the splitpane.
 * @param {?number=} opt_size The size of the top or left, in pixels.
 * @private
 */
SplitPane.prototype.setFirstComponentSize_ = function(
    splitpaneSize, opt_size) {
  var top = 0, left = 0;

  var isVertical = this.isVertical();
  // Figure out first component size; it's either passed in, taken from the
  // saved size, or is half of the total size.
  var firstComponentSize = (typeof opt_size === 'number') ?
      opt_size :
      typeof this.firstComponentSize_ === 'number' ?
      this.firstComponentSize_ :
      Math.floor((isVertical ? splitpaneSize.height : splitpaneSize.width) / 2);
  this.firstComponentSize_ = firstComponentSize;

  var firstComponentWidth;
  var firstComponentHeight;
  var secondComponentWidth;
  var secondComponentHeight;
  var handleWidth;
  var handleHeight;
  var secondComponentLeft;
  var secondComponentTop;
  var handleLeft;
  var handleTop;

  if (isVertical) {
    // Width for the handle and the first and second components will be the
    // width of the split pane. The height for the first component will be
    // the calculated first component size. The height for the second component
    // will be the  total height minus the heights of the first component and
    // the handle.
    firstComponentHeight = firstComponentSize;
    firstComponentWidth = splitpaneSize.width;
    handleWidth = splitpaneSize.width;
    handleHeight = this.handleSize_;
    secondComponentHeight =
        splitpaneSize.height - firstComponentHeight - handleHeight;
    secondComponentWidth = splitpaneSize.width;
    handleTop = top + firstComponentHeight;
    handleLeft = left;
    secondComponentTop = handleTop + handleHeight;
    secondComponentLeft = left;
  } else {
    // Height for the handle and the first and second components will be the
    // height of the split pane. The width for the first component will be
    // the calculated first component size. The width for the second component
    // will be the  total width minus the widths of the first component and
    // the handle.
    firstComponentWidth = firstComponentSize;
    firstComponentHeight = splitpaneSize.height;
    handleWidth = this.handleSize_;
    handleHeight = splitpaneSize.height;
    secondComponentWidth =
        splitpaneSize.width - firstComponentWidth - handleWidth;
    secondComponentHeight = splitpaneSize.height;
    handleLeft = left + firstComponentWidth;
    handleTop = top;
    secondComponentLeft = handleLeft + handleWidth;
    secondComponentTop = top;
  }

  // Now move and size the containers.
  this.moveAndSize_(
      this.firstComponentContainer_,
      new Rect(left, top, firstComponentWidth, firstComponentHeight));

  if (typeof this.firstComponent_.resize == 'function') {
    this.firstComponent_.resize(
        new Size(firstComponentWidth, firstComponentHeight));
  }

  this.moveAndSize_(
      this.splitpaneHandle_,
      new Rect(handleLeft, handleTop, handleWidth, handleHeight));

  this.moveAndSize_(
      this.secondComponentContainer_,
      new Rect(
          secondComponentLeft, secondComponentTop, secondComponentWidth,
          secondComponentHeight));

  if (typeof this.secondComponent_.resize == 'function') {
    this.secondComponent_.resize(
        new Size(secondComponentWidth, secondComponentHeight));
  }
  // Fire a CHANGE event.
  this.dispatchEvent(Component.ComponentEventType.CHANGE);
};


/**
 * Set the size of the splitpane.  This is usually called by the controlling
 * application.  This will set the SplitPane BorderBoxSize.
 * @param {!Size} size The size to set the splitpane.
 * @param {?number=} opt_firstComponentSize The size of the top or left
 *     component, in pixels.
 */
SplitPane.prototype.setSize = function(size, opt_firstComponentSize) {
  style.setBorderBoxSize(this.getElement(), size);
  if (this.iframeOverlay_) {
    style.setBorderBoxSize(this.iframeOverlay_, size);
  }
  this.setFirstComponentSize_(size, opt_firstComponentSize);
};


/**
 * Snap the container to the left or top on a Double-click.
 * @private
 */
SplitPane.prototype.snapIt_ = function() {
  var handlePos = style.getRelativePosition(
      this.splitpaneHandle_, this.firstComponentContainer_);
  var firstBorderBoxSize =
      style.getBorderBoxSize(this.firstComponentContainer_);
  var firstContentBoxSize =
      style.getContentBoxSize(this.firstComponentContainer_);

  var isVertical = this.isVertical();

  // Where do we snap the handle (what size to make the component) and what
  // is the current handle position.
  var snapSize;
  var handlePosition;
  if (isVertical) {
    snapSize = firstBorderBoxSize.height - firstContentBoxSize.height;
    handlePosition = handlePos.y;
  } else {
    snapSize = firstBorderBoxSize.width - firstContentBoxSize.width;
    handlePosition = handlePos.x;
  }

  if (snapSize == handlePosition) {
    // This means we're 'unsnapping', set it back to where it was.
    this.setFirstComponentSize(this.savedSnapSize_);
  } else {
    // This means we're 'snapping', set the size to snapSize, and hide the
    // first component.
    if (isVertical) {
      this.savedSnapSize_ =
          style.getBorderBoxSize(this.firstComponentContainer_).height;
    } else {
      this.savedSnapSize_ =
          style.getBorderBoxSize(this.firstComponentContainer_).width;
    }
    this.setFirstComponentSize(snapSize);
  }

  // Fire a SNAP event.
  this.dispatchEvent(SplitPane.EventType.HANDLE_SNAP);
};


/**
 * Handle the start drag event - set up the dragger.
 * @param {Event} e The event.
 * @private
 */
SplitPane.prototype.handleDragStart_ = function(e) {
  // Setup iframe overlay to prevent iframes from grabbing events.
  if (!this.iframeOverlay_) {
    // Create the overlay.
    var cssStyles = 'position: relative';
    this.iframeOverlay_ = this.getDomHelper().createDom(
        TagName.DIV, {'style': cssStyles});

    this.getDomHelper().appendChild(this.getElement(), this.iframeOverlay_);
  }
  this.iframeOverlay_.style.zIndex =
      SplitPane.IframeOverlayIndex_.OVERLAY;

  style.setBorderBoxSize(
      this.iframeOverlay_, style.getBorderBoxSize(this.getElement()));

  var pos = style.getPosition(this.firstComponentContainer_);

  // For the size of the limiting box, we add the container content box sizes
  // so that if the handle is placed all the way to the end or the start, the
  // border doesn't exceed the total size. For position, we add the difference
  // between the border box and content box sizes of the first container to the
  // position of the first container. The start position should be such that
  // there is no overlap of borders.
  var limitWidth = 0;
  var limitHeight = 0;
  var limitx = pos.x;
  var limity = pos.y;
  var firstBorderBoxSize =
      style.getBorderBoxSize(this.firstComponentContainer_);
  var firstContentBoxSize =
      style.getContentBoxSize(this.firstComponentContainer_);
  var secondContentBoxSize =
      style.getContentBoxSize(this.secondComponentContainer_);
  if (this.isVertical()) {
    limitHeight = firstContentBoxSize.height + secondContentBoxSize.height;
    limity += firstBorderBoxSize.height - firstContentBoxSize.height;
  } else {
    limitWidth = firstContentBoxSize.width + secondContentBoxSize.width;
    limitx += firstBorderBoxSize.width - firstContentBoxSize.width;
  }
  var limits = new Rect(limitx, limity, limitWidth, limitHeight);
  this.splitDragger_.setLimits(limits);
};


/**
 * Find the location relative to the splitpane.
 * @param {number} left The x location relative to the window.
 * @return {number} The relative x location.
 * @private
 */
SplitPane.prototype.getRelativeLeft_ = function(left) {
  return left - style.getPosition(this.firstComponentContainer_).x;
};


/**
 * Find the location relative to the splitpane.
 * @param {number} top The y location relative to the window.
 * @return {number} The relative y location.
 * @private
 */
SplitPane.prototype.getRelativeTop_ = function(top) {
  return top - style.getPosition(this.firstComponentContainer_).y;
};


/**
 * Handle the drag event. Move the containers.
 * @param {!DragEvent} e The event.
 * @private
 */
SplitPane.prototype.handleDrag_ = function(e) {
  if (this.continuousResize_) {
    if (this.isVertical()) {
      var top = this.getRelativeTop_(e.top);
      this.setFirstComponentSize(top);
    } else {
      var left = this.getRelativeLeft_(e.left);
      this.setFirstComponentSize(left);
    }
    this.dispatchEvent(SplitPane.EventType.HANDLE_DRAG);
  }
};


/**
 * Handle the drag end event. If we're not doing continuous resize,
 * resize the component.  If we're doing continuous resize, the component
 * is already the correct size.
 * @param {!DragEvent} e The event.
 * @private
 */
SplitPane.prototype.handleDragEnd_ = function(e) {
  // Push iframe overlay down.
  this.iframeOverlay_.style.zIndex =
      SplitPane.IframeOverlayIndex_.HIDDEN;
  if (!this.continuousResize_) {
    if (this.isVertical()) {
      var top = this.getRelativeTop_(e.top);
      this.setFirstComponentSize(top);
    } else {
      var left = this.getRelativeLeft_(e.left);
      this.setFirstComponentSize(left);
    }
  }

  this.dispatchEvent(SplitPane.EventType.HANDLE_DRAG_END);
};


/**
 * Handle the Double-click. Call the snapIt method which snaps the container
 * to the top or left.
 * @param {Event} e The event.
 * @private
 */
SplitPane.prototype.handleDoubleClick_ = function(e) {
  this.snapIt_();
};


/** @override */
SplitPane.prototype.disposeInternal = function() {
  dispose(this.splitDragger_);
  this.splitDragger_ = null;

  googDom.removeNode(this.iframeOverlay_);
  this.iframeOverlay_ = null;

  SplitPane.base(this, 'disposeInternal');
};
