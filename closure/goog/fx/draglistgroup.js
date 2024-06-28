/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A DragListGroup is a class representing a group of one or more
 * "drag lists" with items that can be dragged within them and between them.
 *
 * @see ../demos/draglistgroup.html
 */


import * as asserts from '../asserts/asserts.js';

import { dispose } from '../disposable/dispose.js';
import * as dom from '../dom/dom.js';
import * as classlist from '../dom/classlist.js';
import * as events from '../events/events.js';
import { Event } from '../events/event.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventId } from '../events/eventid.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
import { Dragger } from './dragger.js';
import { Coordinate } from '../math/coordinate.js';
import * as googString from '../string/string.js';
import * as style from '../style/style.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const {DragEvent} = goog.requireType('goog.fx.dragger');
const {Rect} = goog.requireType('goog.math.rect');



/**
 * A class representing a group of one or more "drag lists" with items that can
 * be dragged within them and between them.
 *
 * Example usage:
 *   var dragListGroup = new DragListGroup();
 *   dragListGroup.setDragItemHandleHoverClass(className1, className2);
 *   dragListGroup.setDraggerElClass(className3);
 *   dragListGroup.addDragList(vertList, DragListDirection.DOWN);
 *   dragListGroup.addDragList(horizList, DragListDirection.RIGHT);
 *   dragListGroup.init();
 *
 * @extends {EventTarget}
 * @constructor
 * @struct
 */
export function DragListGroup() {
  DragListGroup.base(this, 'constructor');

  /**
   * The user-supplied CSS classes to add to a drag item on hover (not during a
   * drag action).
   * @private {Array|undefined}
   */
  this.dragItemHoverClasses_;

  /**
   * The user-supplied CSS classes to add to a drag item handle on hover (not
   * during a drag action).
   * @private {Array|undefined}
   */
  this.dragItemHandleHoverClasses_;

  /**
   * The user-supplied CSS classes to add to the current drag item (during a
   * drag action).
   * @private {Array|undefined}
   */
  this.currDragItemClasses_;

  /**
   * The user-supplied CSS classes to add to the clone of the current drag item
   * that's actually being dragged around (during a drag action).
   * @private {Array<string>|undefined}
   */
  this.draggerElClasses_;

  /**
   * The current drag item being moved.
   * Note: This is only defined while a drag action is happening.
   * @private {Element}
   */
  this.currDragItem_;

  /**
   * The drag list that `this.currDragItem_` is currently hovering over,
   * or null if it is not hovering over a list.
   * @private {Element}
   */
  this.currHoverList_;

  /**
   * The original drag list that the current drag item came from. We need to
   * remember this in case the user drops the item outside of any lists, in
   * which case we return the item to its original location.
   * Note: This is only defined while a drag action is happening.
   * @private {Element}
   */
  this.origList_;

  /**
   * The original next item in the original list that the current drag item came
   * from. We need to remember this in case the user drops the item outside of
   * any lists, in which case we return the item to its original location.
   * Note: This is only defined while a drag action is happening.
   * @private {Element}
   */
  this.origNextItem_;

  /**
   * The current item in the list we are hovering over. We need to remember
   * this in case we do not update the position of the current drag item while
   * dragging (see `updateWhileDragging_`). In this case the current drag
   * item will be inserted into the list before this element when the drag ends.
   * @private {Element}
   */
  this.currHoverItem_;

  /**
   * The clone of the current drag item that's actually being dragged around.
   * Note: This is only defined while a drag action is happening.
   * @private {HTMLElement}
   */
  this.draggerEl_;

  /**
     * The dragger object.
     * Note: This is only defined while a drag action is happening.
     * @private {Dragger}
     */
  this.dragger_;

  /**
   * The amount of distance, in pixels, after which a mousedown or touchstart is
   * considered a drag.
   * @private {number}
   */
  this.hysteresisDistance_ = 0;


  /**
   * The drag lists.
   * @private {Array<Element>}
   */
  this.dragLists_ = [];

  /**
   * All the drag items. Set by init().
   * @private {Array<Element>}
   */
  this.dragItems_ = [];

  /**
   * Which drag item corresponds to a given handle.  Set by init().
   * Specifically, this maps from the unique ID (as given by goog.getUid)
   * of the handle to the drag item.
   * @private {Object}
   */
  this.dragItemForHandle_ = {};

  /**
       * The event handler for this instance.
       * @private {EventHandler<!DragListGroup>}
       */
  this.eventHandler_ = new EventHandler(this);

  /**
   * Whether the setup has been done to make all items in all lists draggable.
   * @private {boolean}
   */
  this.isInitialized_ = false;

  /**
   * Whether the currDragItem is always displayed. By default the list
   * collapses, the currDragItem's display is set to none, when we do not
   * hover over a draglist.
   * @private {boolean}
   */
  this.isCurrDragItemAlwaysDisplayed_ = false;

  /**
   * Whether to update the position of the currDragItem as we drag, i.e.,
   * insert the currDragItem each time to the position where it would land if
   * we were to end the drag at that point. Defaults to true.
   * @private {boolean}
   */
  this.updateWhileDragging_ = true;

  /**
   * Whether to force attempt/prevent correcting the initial position of the
   * currDragItem.  Defaults to DRAGLISTGROUP_CORRECT_POSITION_DRAG_START.
   * @private {boolean}
   */
  this.correctDraggedElementInitialPos_ =
      DragListGroup.CORRECT_POSITION_DRAG_START;

  /**
   * Whether to reposition the center rather than to keep the same ratio of the
   * currDragItem under the mouse cursor when correcting its initial position on
   * the X axis. Defaults to false.
   * @private {boolean}
   */
  this.correctInitialPosCenteredOnX_ = false;
}
goog.inherits(DragListGroup, EventTarget);


/**
 * @define {boolean} Whether to attempt correcting the initial position of the
 * currDragItem to ensures that the mouse cursor is always over the dragged
 * element. This is needed in cases where the dragged element dimensions are
 * smaller than its source element dimensions.
 */
DragListGroup.CORRECT_POSITION_DRAG_START =
    goog.define('goog.fx.DragListGroup.CORRECT_POSITION_DRAG_START', true);


/**
 * Enum to indicate the direction that a drag list grows.
 * @enum {number}
 */
export var DragListDirection = {
  DOWN: 0,      // common
  RIGHT: 2,     // common
  LEFT: 3,      // uncommon (except perhaps for right-to-left interfaces)
  RIGHT_2D: 4,  // common + handles multiple lines if items are wrapped
  LEFT_2D: 5    // for rtl languages
};


/**
 * Enum to indicate the drag and drop permissions for a drag list. Default is
 * DRAG_OUT_AND_DROP.
 * @enum {number}
 */
export var DragListPermission = {
  DRAG_OUT_AND_DROP: 0,  // default
  ONLY_DRAG_OUT: 1,      // Prevents an item from being dropped into this drag
                         // list.
  ONLY_DROP: 2           // Prevents an item from being removed from this drag
                         // list, but items can be dropped here.
};


/**
 * Events dispatched by this class.
 * @enum {!EventId<!DragListGroupEvent>}
 */
DragListGroup.EventType = {
  /**
   * Raised on mouse down, when the dragger is first created.  Handle this event
   * to customize the dragger element even if the drag never actually starts (if
   * the mouse never moves beyond hysteresis).
   */
  DRAGGERCREATED:
      new EventId(events.getUniqueId('draggercreated')),
  BEFOREDRAGSTART: new EventId('beforedragstart'),
  DRAGSTART: new EventId('dragstart'),
  BEFOREDRAGMOVE: new EventId('beforedragmove'),
  DRAGMOVE: new EventId('dragmove'),
  BEFOREDRAGEND: new EventId('beforedragend'),
  /** Raised after the dragged item is moved to the new spot. */
  DRAGEND: new EventId('dragend'),
  /**
   * Raised whenever the dragger element is removed:
   *  - When a drag completes successfully.
   *  - If the drag never started due to mouseup within hysteresis.
   *  - If the drag was cancelled by a BEFORE* event.
   *  - If the drag was cancelled due to focus loss.
   */
  DRAGGERREMOVED:
      new EventId(events.getUniqueId('draggerremoved'))
};


/**
 * Sets the property of the currDragItem that it is always displayed in the
 * list.
 */
DragListGroup.prototype.setIsCurrDragItemAlwaysDisplayed = function() {
  this.isCurrDragItemAlwaysDisplayed_ = true;
};


/**
 * Sets the private property updateWhileDragging_ to false. This disables the
 * update of the position of the currDragItem while dragging. It will only be
 * placed to its new location once the drag ends.
 */
DragListGroup.prototype.setNoUpdateWhileDragging = function() {
  this.updateWhileDragging_ = false;
};


/**
 * Sets the correctDraggedElementInitialPos_ private property. This override the
 * DRAGLISTGROUP_CORRECT_POSITION_DRAG_START compile flag, to allow for a per
 * component control within a project.
 * @param {boolean} updateInitialPosition Whether to allow/forbid the correction
 *     of the currDragEl initial position.
 */
DragListGroup.prototype.overrideCorrectDraggedElementInitialPos =
    function(updateInitialPosition) {
      this.correctDraggedElementInitialPos_ = updateInitialPosition;
    };

/**
 * Sets the distance the user has to drag the element before a drag operation
 * is started.
 * @param {number} distance The number of pixels after which a mousedown and
 *     move is considered a drag.
 */
DragListGroup.prototype.setHysteresis = function(distance) {
  this.hysteresisDistance_ = distance;
};


/**
 * @return {number} distance The number of pixels after which a mousedown and
 *     move is considered a drag.
 */
DragListGroup.prototype.getHysteresis = function() {
  return this.hysteresisDistance_;
};


/** @return {boolean} true if the user is currently dragging an element. */
DragListGroup.prototype.isDragging = function() {
  return !!this.dragger_;
};


/**
 * Adds a drag list to this DragListGroup.
 * All calls to this method must happen before the call to init().
 * Remember that all child nodes (except text nodes) will be made draggable to
 * any other drag list in this group.
 *
 * @param {Element} dragListElement Must be a container for a list of items
 *     that should all be made draggable.
 * @param {DragListDirection} growthDirection The direction that this
 *     drag list grows in (i.e. if an item is appended to the DOM, the list's
 *     bounding box expands in this direction).
 * @param {boolean=} opt_unused Unused argument.
 * @param {string=} opt_dragHoverClass CSS class to apply to this drag list when
 *     the draggerEl hovers over it during a drag action.  If present, must be a
 *     single, valid classname (not a string of space-separated classnames).
 * @param {!DragListPermission=} opt_dragListPermission Defaults
 *     to DRAG_OUT_AND_DROP but can be passed in to modify to prevent users from
 *     dragging an item out of a list or dropping an item into a list.
 */
DragListGroup.prototype.addDragList = function(
    dragListElement, growthDirection, opt_unused, opt_dragHoverClass,
    opt_dragListPermission) {
  asserts.assert(!this.isInitialized_);

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  dragListElement.dlgGrowthDirection_ = growthDirection;
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  dragListElement.dlgDragHoverClass_ = opt_dragHoverClass;
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  dragListElement.dlgDragPermission =
      opt_dragListPermission || DragListPermission.DRAG_OUT_AND_DROP;
  this.dragLists_.push(dragListElement);
};


/**
 * Sets a user-supplied function used to get the "handle" element for a drag
 * item. The function must accept exactly one argument. The argument may be
 * any drag item element.
 *
 * If not set, the default implementation uses the whole drag item as the
 * handle.
 *
 * @param {function(!Element): Element} getHandleForDragItemFn A function that,
 *     given any drag item, returns a reference to its "handle" element
 *     (which may be the drag item element itself).
 */
DragListGroup.prototype.setFunctionToGetHandleForDragItem = function(
    getHandleForDragItemFn) {
  asserts.assert(!this.isInitialized_);
  this.getHandleForDragItem_ = getHandleForDragItemFn;
};


/**
 * Sets a user-supplied CSS class to add to a drag item on hover (not during a
 * drag action).
 * @param {...string} var_args The CSS class or classes.
 */
DragListGroup.prototype.setDragItemHoverClass = function(var_args) {
  asserts.assert(!this.isInitialized_);
  this.dragItemHoverClasses_ = Array.prototype.slice.call(arguments, 0);
};


/**
 * Sets a user-supplied CSS class to add to a drag item handle on hover (not
 * during a drag action).
 * @param {...string} var_args The CSS class or classes.
 */
DragListGroup.prototype.setDragItemHandleHoverClass = function(
    var_args) {
  asserts.assert(!this.isInitialized_);
  this.dragItemHandleHoverClasses_ = Array.prototype.slice.call(arguments, 0);
};


/**
 * Sets a user-supplied CSS class to add to the current drag item (during a
 * drag action).
 *
 * If not set, the default behavior adds visibility:hidden to the current drag
 * item so that it is a block of empty space in the hover drag list (if any).
 * If this class is set by the user, then the default behavior does not happen
 * (unless, of course, the class also contains visibility:hidden).
 *
 * @param {...string} var_args The CSS class or classes.
 */
DragListGroup.prototype.setCurrDragItemClass = function(var_args) {
  asserts.assert(!this.isInitialized_);
  this.currDragItemClasses_ = Array.prototype.slice.call(arguments, 0);
};


/**
 * Sets a user-supplied CSS class to add to the clone of the current drag item
 * that's actually being dragged around (during a drag action).
 * @param {string} draggerElClass The CSS class.
 */
DragListGroup.prototype.setDraggerElClass = function(draggerElClass) {
  asserts.assert(!this.isInitialized_);
  // Split space-separated classes up into an array.
  this.draggerElClasses_ = googString.trim(draggerElClass).split(' ');
};


/**
 * Performs the initial setup to make all items in all lists draggable.
 */
DragListGroup.prototype.init = function() {
  if (this.isInitialized_) {
    return;
  }

  for (var i = 0, numLists = this.dragLists_.length; i < numLists; i++) {
    var dragList = this.dragLists_[i];

    var dragItems = dom.getChildren(dragList);
    for (var j = 0, numItems = dragItems.length; j < numItems; ++j) {
      this.listenForDragEvents(dragItems[j]);
    }
  }

  this.isInitialized_ = true;
};


/**
 * Adds a single item to the given drag list and sets up the drag listeners for
 * it.
 * If opt_index is specified the item is inserted at this index, otherwise the
 * item is added as the last child of the list.
 *
 * @param {!Element} list The drag list where to add item to.
 * @param {!Element} item The new element to add.
 * @param {number=} opt_index Index where to insert the item in the list. If not
 * specified item is inserted as the last child of list.
 */
DragListGroup.prototype.addItemToDragList = function(
    list, item, opt_index) {
  if (opt_index !== undefined) {
    dom.insertChildAt(list, item, opt_index);
  } else {
    dom.appendChild(list, item);
  }
  this.listenForDragEvents(item);
};


/** @override */
DragListGroup.prototype.disposeInternal = function() {
  this.eventHandler_.dispose();

  for (var i = 0, n = this.dragLists_.length; i < n; i++) {
    var dragList = this.dragLists_[i];
    // Note: IE doesn't allow 'delete' for fields on HTML elements (because
    // they're not real JS objects in IE), so we just set them to undefined.
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    dragList.dlgGrowthDirection_ = undefined;
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    dragList.dlgDragHoverClass_ = undefined;
  }

  this.dragLists_.length = 0;
  this.dragItems_.length = 0;
  this.dragItemForHandle_ = null;

  // In the case where a drag event is currently in-progress and dispose is
  // called, this cleans up the extra state.
  this.cleanupDragDom_();

  DragListGroup.superClass_.disposeInternal.call(this);
};


/**
 * Caches the heights of each drag list and drag item, except for the current
 * drag item.
 */
DragListGroup.prototype.recacheListAndItemBounds = function() {
  this.recacheListAndItemBounds_(this.currDragItem_);
};


/**
 * Caches the heights of each drag list and drag item, except for the current
 * drag item.
 *
 * @param {Element} currDragItem The item currently being dragged.
 * @private
 */
DragListGroup.prototype.recacheListAndItemBounds_ = function(
    currDragItem) {
  for (var i = 0, n = this.dragLists_.length; i < n; i++) {
    var dragList = this.dragLists_[i];
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    dragList.dlgBounds_ = style.getBounds(dragList);
  }

  for (var i = 0, n = this.dragItems_.length; i < n; i++) {
    var dragItem = this.dragItems_[i];
    if (dragItem != currDragItem) {
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      dragItem.dlgBounds_ = style.getBounds(dragItem);
    }
  }
};


/**
 * Listens for drag events on the given drag item. This method is currently used
 * to initialize drag items.
 *
 * @param {!Element} dragItem the element to initialize. This element has to be
 * in one of the drag lists.
 * @protected
 */
DragListGroup.prototype.listenForDragEvents = function(dragItem) {
  var dragItemHandle = this.getHandleForDragItem_(dragItem);
  var uid = goog.getUid(dragItemHandle);
  this.dragItemForHandle_[uid] = dragItem;

  if (this.dragItemHoverClasses_) {
    this.eventHandler_.listen(
        dragItem, EventType.MOUSEOVER,
        this.handleDragItemMouseover_);
    this.eventHandler_.listen(
        dragItem, EventType.MOUSEOUT, this.handleDragItemMouseout_);
  }
  if (this.dragItemHandleHoverClasses_) {
    this.eventHandler_.listen(
        dragItemHandle, EventType.MOUSEOVER,
        this.handleDragItemHandleMouseover_);
    this.eventHandler_.listen(
        dragItemHandle, EventType.MOUSEOUT,
        this.handleDragItemHandleMouseout_);
  }

  this.dragItems_.push(dragItem);

  this.eventHandler_.listen(
      dragItemHandle,
      [EventType.MOUSEDOWN, EventType.TOUCHSTART],
      this.handlePotentialDragStart_);
};


/**
 * Handles mouse and touch events which may start a drag action.
 * @param {!BrowserEvent} e MOUSEDOWN or TOUCHSTART event.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DragListGroup.prototype.handlePotentialDragStart_ = function(e) {
  var uid = goog.getUid(/** @type {Node} */ (e.currentTarget));
  var potentialDragItem =
      /** @type {!Element} */ (this.dragItemForHandle_[uid]);

  if (potentialDragItem.parentElement.dlgDragPermission ==
      DragListPermission.ONLY_DROP) {
    return;
  }

  this.currDragItem_ = potentialDragItem;

  this.draggerEl_ = /** @type {!HTMLElement} */ (
      this.createDragElementInternal(this.currDragItem_));
  if (this.draggerElClasses_) {
    // Add CSS class for the clone, if any.
    classlist.addAll(
        asserts.assert(this.draggerEl_), this.draggerElClasses_ || []);
  }

  // Place the clone (i.e. draggerEl) at the same position as the actual
  // current drag item. This is a bit tricky since
  //   goog.style.getPageOffset() gets the left-top pos of the border, but
  //   goog.style.setPageOffset() sets the left-top pos of the margin.
  // It's difficult to adjust for the margins of the clone because it's
  // difficult to read it: goog.style.getComputedStyle() doesn't work for IE.
  // Instead, our workaround is simply to set the clone's margins to 0px.
  this.draggerEl_.style.margin = '0';
  this.draggerEl_.style.position = 'absolute';
  this.draggerEl_.style.visibility = 'hidden';
  var doc = dom.getOwnerDocument(this.currDragItem_);
  doc.body.appendChild(this.draggerEl_);

  // Important: goog.style.setPageOffset() only works correctly for IE when the
  // element is already in the document.
  var currDragItemPos = style.getPageOffset(this.currDragItem_);
  style.setPageOffset(this.draggerEl_, currDragItemPos);

  this.dragger_ = new Dragger(this.draggerEl_);
  this.dragger_.setHysteresis(this.hysteresisDistance_);

  // Listen to events on the dragger. These handlers will be unregistered at
  // DRAGEND, when the dragger is disposed of. We can't use eventHandler_,
  // because it creates new references to the handler functions at each
  // dragging action, and keeps them until DragListGroup is disposed of.
  events.listen(
      this.dragger_, Dragger.EventType.START, this.handleDragStart_,
      false, this);
  events.listen(
      this.dragger_, Dragger.EventType.END, this.handleDragEnd_, false,
      this);
  events.listen(
      this.dragger_, Dragger.EventType.EARLY_CANCEL, this.cleanup_,
      false, this);
  this.dispatchEvent(new DragListGroupEvent(
      DragListGroup.EventType.DRAGGERCREATED, this, e,
      this.currDragItem_, this.draggerEl_, this.dragger_));
  this.dragger_.startDrag(e);
};


/**
 * Creates copy of node being dragged.
 *
 * @param {Element} sourceEl Element to copy.
 * @return {!Element} The clone of `sourceEl`.
 * @deprecated Use Dragger.cloneNode().
 * @private
 */
DragListGroup.prototype.cloneNode_ = function(sourceEl) {
  return Dragger.cloneNode(sourceEl);
};


/**
 * Generates an element to follow the cursor during dragging, given a drag
 * source element.  The default behavior is simply to clone the source element,
 * but this may be overridden in subclasses.  This method is called by
 * `createDragElement()` before the drag class is added.
 *
 * @param {Element} sourceEl Drag source element.
 * @return {!Element} The new drag element.
 * @protected
 * @suppress {deprecated}
 */
DragListGroup.prototype.createDragElementInternal = function(sourceEl) {
  return this.cloneNode_(sourceEl);
};


/**
 * Handles the start of a drag action.
 * @param {!DragEvent} e Dragger.EventType.START event.
 * @private
 */
DragListGroup.prototype.handleDragStart_ = function(e) {
  if (!this.dispatchEvent(new DragListGroupEvent(
          DragListGroup.EventType.BEFOREDRAGSTART, this, e.browserEvent,
          this.currDragItem_, null, null))) {
    e.preventDefault();
    this.cleanup_();
    return;
  }

  // Record the original location of the current drag item.
  // Note: this.origNextItem_ may be null.
  this.origList_ = /** @type {Element} */ (this.currDragItem_.parentNode);
  this.origNextItem_ = dom.getNextElementSibling(this.currDragItem_);
  this.currHoverItem_ = this.origNextItem_;
  this.currHoverList_ = this.origList_;

  // If there's a CSS class specified for the current drag item, add it.
  // Otherwise, make the actual current drag item hidden (takes up space).
  if (this.currDragItemClasses_) {
    classlist.addAll(
        asserts.assert(this.currDragItem_),
        this.currDragItemClasses_ || []);
  } else {
    this.currDragItem_.style.visibility = 'hidden';
  }

  // Precompute distances from top-left corner to center for efficiency.
  var draggerElSize = style.getSize(this.draggerEl_);
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.draggerEl_.halfWidth = draggerElSize.width / 2;
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.draggerEl_.halfHeight = draggerElSize.height / 2;

  this.maybeUpdateDraggerDeltaToPlaceElUnderCursor_(e);

  this.draggerEl_.style.visibility = '';

  // Record the bounds of all the drag lists and all the other drag items. This
  // caching is for efficiency, so that we don't have to recompute the bounds on
  // each drag move. Do this in the state where the current drag item is not in
  // any of the lists, except when update while dragging is disabled, as in this
  // case the current drag item does not get removed until drag ends.
  if (this.updateWhileDragging_) {
    this.currDragItem_.style.display = 'none';
  }
  this.recacheListAndItemBounds_(this.currDragItem_);
  this.currDragItem_.style.display = '';

  // Listen to events on the dragger.
  events.listen(
      this.dragger_, Dragger.EventType.DRAG, this.handleDragMove_,
      false, this);

  this.dispatchEvent(
      new DragListGroupEvent(
          DragListGroup.EventType.DRAGSTART, this, e.browserEvent,
          this.currDragItem_, this.draggerEl_, this.dragger_));
};


/**
 * Update the dragger_.delta[X&Y] properties to place the dragged element under
 * the cursor mouse if that is not already the case.
 * @param {!DragEvent|!BrowserEvent} dragEvent MOUSEDOWN or
 *     TOUCHSTART event.
 * @private
 */
DragListGroup.prototype.maybeUpdateDraggerDeltaToPlaceElUnderCursor_ =
    function(dragEvent) {
      if (!this.correctDraggedElementInitialPos_) {
        return;
      }
      const draggerElBoundingRect = this.draggerEl_.getBoundingClientRect();
      const {clientX: cursorX, clientY: cursorY} = dragEvent;
      const maxCursorX = this.dragger_.limitX(cursorX);
      if (maxCursorX > draggerElBoundingRect.right) {
        // Ensure the cursor will be scaled identically over the X axis for both the
        // dragged and the source element: e.g. if the mouse click happens at 70% of
        // the width on the source element, then the dragged element is repositioned
        // in the way that the cursor is at 70% of its width.
        const sourceItemBoundingRect = this.currDragItem_.getBoundingClientRect();
        const sourceCursorOffset = maxCursorX - sourceItemBoundingRect.left;
        const cursorPosPercent = sourceCursorOffset / sourceItemBoundingRect.width;
        const offset = draggerElBoundingRect.width * cursorPosPercent;

        this.dragger_.deltaX = maxCursorX - offset;
      }
      const maxCursorY = this.dragger_.limitY(cursorY);
      if (maxCursorY > draggerElBoundingRect.bottom) {
        // The Y axis repositioning means that the dragged element will be moved in
        // a way that the cursor will be placed on its bottom line. The scaling
        // behavior which is apllied on the X axis cannot be safely replicated on
        // the Y axis, leading to element bouncing out of the page/cursor reach.
        this.dragger_.deltaY += maxCursorY - draggerElBoundingRect.bottom;
      }
    };


/**
 * Handles a drag movement (i.e. DRAG event fired by the dragger).
 *
 * @param {DragEvent} dragEvent Event object fired by the dragger.
 * @return {boolean} The return value for the event.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DragListGroup.prototype.handleDragMove_ = function(dragEvent) {
  // Compute the center of the dragger element (i.e. the cloned drag item).
  var draggerElPos = style.getPageOffset(this.draggerEl_);
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var draggerElCenter = new Coordinate(
      draggerElPos.x + this.draggerEl_.halfWidth,
      draggerElPos.y + this.draggerEl_.halfHeight);

  // Check whether the center is hovering over one of the drag lists.
  var hoverList = this.getHoverDragList_(draggerElCenter);

  // If hovering over a list, find the next item (if drag were to end now).
  var hoverNextItem =
      hoverList ? this.getHoverNextItem_(hoverList, draggerElCenter) : null;

  var rv = this.dispatchEvent(
      new DragListGroupEvent(
          DragListGroup.EventType.BEFOREDRAGMOVE, this, dragEvent,
          this.currDragItem_, this.draggerEl_, this.dragger_, draggerElCenter,
          hoverList, hoverNextItem));
  if (!rv) {
    return false;
  }

  if (hoverList &&
      hoverList.dlgDragPermission != DragListPermission.ONLY_DRAG_OUT) {
    if (this.updateWhileDragging_) {
      this.insertCurrDragItem_(hoverList, hoverNextItem);
    } else {
      // If update while dragging is disabled do not insert
      // the dragged item, but update the hovered item instead.
      this.updateCurrHoverItem(hoverNextItem, draggerElCenter);
    }
    this.currDragItem_.style.display = '';
    // Add drag list's hover class (if any).
    if (hoverList.dlgDragHoverClass_) {
      classlist.add(
          asserts.assert(hoverList), hoverList.dlgDragHoverClass_);
    }

  } else {
    // Not hovering over a drag list, so remove the item altogether unless
    // specified otherwise by the user.
    if (!this.isCurrDragItemAlwaysDisplayed_) {
      this.currDragItem_.style.display = 'none';
    }

    // Remove hover classes (if any) from all drag lists.
    for (var i = 0, n = this.dragLists_.length; i < n; i++) {
      var dragList = this.dragLists_[i];
      if (dragList.dlgDragHoverClass_) {
        classlist.remove(
            asserts.assert(dragList), dragList.dlgDragHoverClass_);
      }
    }
  }

  // If the current hover list is different than the last, the lists may have
  // shrunk, so we should recache the bounds.
  if (hoverList != this.currHoverList_) {
    this.currHoverList_ = hoverList;
    this.recacheListAndItemBounds_(this.currDragItem_);
  }

  this.dispatchEvent(new DragListGroupEvent(
      DragListGroup.EventType.DRAGMOVE, this, dragEvent,
      /** @type {Element} */ (this.currDragItem_), this.draggerEl_,
      this.dragger_, draggerElCenter, hoverList, hoverNextItem));

  // Return false to prevent selection due to mouse drag.
  return false;
};


/**
 * Clear all our temporary fields that are only defined while dragging, and
 * all the bounds info stored on the drag lists and drag elements.
 * @param {!Event=} opt_e EARLY_CANCEL event from the dragger if
 *     cleanup_ was called as an event handler.
 * @private
 */
DragListGroup.prototype.cleanup_ = function(opt_e) {
  this.cleanupDragDom_();

  this.currDragItem_ = null;
  this.currHoverList_ = null;
  this.origList_ = null;
  this.origNextItem_ = null;
  this.draggerEl_ = null;
  this.dragger_ = null;

  // Note: IE doesn't allow 'delete' for fields on HTML elements (because
  // they're not real JS objects in IE), so we just set them to null.
  for (var i = 0, n = this.dragLists_.length; i < n; i++) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.dragLists_[i].dlgBounds_ = null;
  }
  for (var i = 0, n = this.dragItems_.length; i < n; i++) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.dragItems_[i].dlgBounds_ = null;
  }
};


/**
 * Handles the end or the cancellation of a drag action, i.e. END or CLEANUP
 * event fired by the dragger.
 *
 * @param {!DragEvent} dragEvent Event object fired by the dragger.
 * @return {boolean} Whether the event was handled.
 * @private
 */
DragListGroup.prototype.handleDragEnd_ = function(dragEvent) {
  var rv = this.dispatchEvent(new DragListGroupEvent(
      DragListGroup.EventType.BEFOREDRAGEND, this, dragEvent,
      /** @type {Element} */ (this.currDragItem_), this.draggerEl_,
      this.dragger_));
  if (!rv) {
    return false;
  }

  // If update while dragging is disabled insert the current drag item into
  // its intended location.
  if (!this.updateWhileDragging_) {
    this.insertCurrHoverItem();
  }

  // The DRAGEND handler may need the new order of the list items. Clean up the
  // garbage.
  this.cleanupDragDom_();

  this.dispatchEvent(
      new DragListGroupEvent(
          DragListGroup.EventType.DRAGEND, this, dragEvent,
          this.currDragItem_, this.draggerEl_, this.dragger_));

  this.cleanup_();

  return true;
};


/**
 * Cleans up DOM changes that are made by the {@code handleDrag*} methods.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DragListGroup.prototype.cleanupDragDom_ = function() {
  // Disposes of the dragger and remove the cloned drag item.
  dispose(this.dragger_);
  var hadDragger = this.draggerEl_ && this.draggerEl_.parentElement;
  if (this.draggerEl_) {
    dom.removeNode(this.draggerEl_);
  }

  // If the current drag item is not in any list, put it back in its original
  // location.
  if (this.currDragItem_ && this.currDragItem_.style.display == 'none') {
    // Note: this.origNextItem_ may be null, but insertBefore() still works.
    this.origList_.insertBefore(this.currDragItem_, this.origNextItem_);
    this.currDragItem_.style.display = '';
  }

  // If there's a CSS class specified for the current drag item, remove it.
  // Otherwise, make the current drag item visible (instead of empty space).
  if (this.currDragItemClasses_ && this.currDragItem_) {
    classlist.removeAll(
        asserts.assert(this.currDragItem_),
        this.currDragItemClasses_ || []);
  } else if (this.currDragItem_) {
    this.currDragItem_.style.visibility = '';
  }

  // Remove hover classes (if any) from all drag lists.
  for (var i = 0, n = this.dragLists_.length; i < n; i++) {
    var dragList = this.dragLists_[i];
    if (dragList.dlgDragHoverClass_) {
      classlist.remove(
          asserts.assert(dragList), dragList.dlgDragHoverClass_);
    }
  }
  if (hadDragger) {
    this.dispatchEvent(new DragListGroupEvent(
        DragListGroup.EventType.DRAGGERREMOVED, this, null,
        this.currDragItem_, this.draggerEl_, this.dragger_));
  }
};


/**
 * Default implementation of the function to get the "handle" element for a
 * drag item. By default, we use the whole drag item as the handle. Users can
 * change this by calling setFunctionToGetHandleForDragItem().
 *
 * @param {!Element} dragItem The drag item to get the handle for.
 * @return {Element} The dragItem element itself.
 * @private
 */
DragListGroup.prototype.getHandleForDragItem_ = function(dragItem) {
  return dragItem;
};


/**
 * Handles a MOUSEOVER event fired on a drag item.
 * @param {BrowserEvent} e The event.
 * @private
 */
DragListGroup.prototype.handleDragItemMouseover_ = function(e) {
  var targetEl = asserts.assertElement(e.currentTarget);
  classlist.addAll(targetEl, this.dragItemHoverClasses_ || []);
};


/**
 * Handles a MOUSEOUT event fired on a drag item.
 * @param {BrowserEvent} e The event.
 * @private
 */
DragListGroup.prototype.handleDragItemMouseout_ = function(e) {
  var targetEl = asserts.assertElement(e.currentTarget);
  classlist.removeAll(targetEl, this.dragItemHoverClasses_ || []);
};


/**
 * Handles a MOUSEOVER event fired on the handle element of a drag item.
 * @param {BrowserEvent} e The event.
 * @private
 */
DragListGroup.prototype.handleDragItemHandleMouseover_ = function(e) {
  var targetEl = asserts.assertElement(e.currentTarget);
  classlist.addAll(targetEl, this.dragItemHandleHoverClasses_ || []);
};


/**
 * Handles a MOUSEOUT event fired on the handle element of a drag item.
 * @param {BrowserEvent} e The event.
 * @private
 */
DragListGroup.prototype.handleDragItemHandleMouseout_ = function(e) {
  var targetEl = asserts.assertElement(e.currentTarget);
  classlist.removeAll(
      targetEl, this.dragItemHandleHoverClasses_ || []);
};


/**
 * Helper for handleDragMove_().
 * Given the position of the center of the dragger element, figures out whether
 * it's currently hovering over any of the drag lists.
 *
 * @param {Coordinate} draggerElCenter The center position of the
 *     dragger element.
 * @return {Element} If currently hovering over a drag list, returns the drag
 *     list element. Else returns null.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DragListGroup.prototype.getHoverDragList_ = function(draggerElCenter) {
  // If the current drag item was in a list last time we did this, then check
  // that same list first.
  var prevHoverList = null;
  if (this.currDragItem_.style.display != 'none') {
    prevHoverList = /** @type {Element} */ (this.currDragItem_.parentNode);
    // Important: We can't use the cached bounds for this list because the
    // cached bounds are based on the case where the current drag item is not
    // in the list. Since the current drag item is known to be in this list, we
    // must recompute the list's bounds.
    var prevHoverListBounds = style.getBounds(prevHoverList);
    if (this.isInRect_(draggerElCenter, prevHoverListBounds)) {
      return prevHoverList;
    }
  }

  for (var i = 0, n = this.dragLists_.length; i < n; i++) {
    var dragList = this.dragLists_[i];
    if (dragList == prevHoverList) {
      continue;
    }
    if (this.isInRect_(draggerElCenter, dragList.dlgBounds_)) {
      return dragList;
    }
  }

  return null;
};


/**
 * Checks whether a coordinate position resides inside a rectangle.
 * @param {Coordinate} pos The coordinate position.
 * @param {Rect} rect The rectangle.
 * @return {boolean} True if 'pos' is within the bounds of 'rect'.
 * @private
 */
DragListGroup.prototype.isInRect_ = function(pos, rect) {
  return pos.x > rect.left && pos.x < rect.left + rect.width &&
      pos.y > rect.top && pos.y < rect.top + rect.height;
};


/**
 * Updates the value of currHoverItem_.
 *
 * This method is used for insertion only when updateWhileDragging_ is false.
 * The below implementation is the basic one. This method can be extended by
 * a subclass to support changes to hovered item (eg: highlighting). Parametr
 * opt_draggerElCenter can be used for more sophisticated effects.
 *
 * @param {Element} hoverNextItem element of the list that is hovered over.
 * @param {Coordinate=} opt_draggerElCenter current position of
 *     the dragged element.
 * @protected
 */
DragListGroup.prototype.updateCurrHoverItem = function(
    hoverNextItem, opt_draggerElCenter) {
  if (hoverNextItem) {
    this.currHoverItem_ = hoverNextItem;
  }
};


/**
 * Inserts the currently dragged item in its new place.
 *
 * This method is used for insertion only when updateWhileDragging_ is false
 * (otherwise there is no need for that). In the basic implementation
 * the element is inserted before the currently hovered over item (this can
 * be changed by overriding the method in subclasses).
 *
 * @protected
 */
DragListGroup.prototype.insertCurrHoverItem = function() {
  this.origList_.insertBefore(
      /** @type {!Node} */ (this.currDragItem_), this.currHoverItem_);
};


/**
 * Helper for handleDragMove_().
 * Given the position of the center of the dragger element, plus the drag list
 * that it's currently hovering over, figures out the next drag item in the
 * list that follows the current position of the dragger element. (I.e. if
 * the drag action ends right now, it would become the item after the current
 * drag item.)
 *
 * @param {Element} hoverList The drag list that we're hovering over.
 * @param {Coordinate} draggerElCenter The center position of the
 *     dragger element.
 * @return {Element} Returns the earliest item in the hover list that belongs
 *     after the current position of the dragger element. If all items in the
 *     list should come before the current drag item, then returns null.
 * @private
 * @suppress {strictMissingProperties, strictPrimitiveOperators} Added to
 * tighten compiler checks
 */
DragListGroup.prototype.getHoverNextItem_ = function(
    hoverList, draggerElCenter) {
  if (hoverList == null) {
    throw new Error('getHoverNextItem_ called with null hoverList.');
  }

  // The definition of what it means for the draggerEl to be "before" a given
  // item in the hover drag list is not always the same. It changes based on
  // the growth direction of the hover drag list in question.
  /** @type {number} */
  var relevantCoord = 0;
  var getRelevantBoundFn;
  var isBeforeFn;
  var pickClosestRow = false;
  var distanceToClosestRow = undefined;
  switch (hoverList.dlgGrowthDirection_) {
    case DragListDirection.DOWN:
      // "Before" means draggerElCenter.y is less than item's bottom y-value.
      relevantCoord = draggerElCenter.y;
      getRelevantBoundFn = DragListGroup.getBottomBound_;
      isBeforeFn = DragListGroup.isLessThan_;
      break;
    case DragListDirection.RIGHT_2D:
      pickClosestRow = true;
    case DragListDirection.RIGHT:
      // "Before" means draggerElCenter.x is less than item's right x-value.
      relevantCoord = draggerElCenter.x;
      getRelevantBoundFn = DragListGroup.getRightBound_;
      isBeforeFn = DragListGroup.isLessThan_;
      break;
    case DragListDirection.LEFT_2D:
      pickClosestRow = true;
    case DragListDirection.LEFT:
      // "Before" means draggerElCenter.x is greater than item's left x-value.
      relevantCoord = draggerElCenter.x;
      getRelevantBoundFn = DragListGroup.getLeftBound_;
      isBeforeFn = DragListGroup.isGreaterThan_;
      break;
  }

  // This holds the earliest drag item found so far that should come after
  // this.currDragItem_ in the hover drag list (based on draggerElCenter).
  var earliestAfterItem = null;
  // This is the position of the relevant bound for the earliestAfterItem,
  // where "relevant" is determined by the growth direction of hoverList.
  var earliestAfterItemRelevantBound;

  var hoverListItems = dom.getChildren(hoverList);
  for (var i = 0, n = hoverListItems.length; i < n; i++) {
    var item = hoverListItems[i];
    if (item == this.currDragItem_) {
      continue;
    }

    var relevantBound = getRelevantBoundFn(item.dlgBounds_);
    // When the hoverlist is broken into multiple rows (i.e., in the case of
    // LEFT_2D and RIGHT_2D) it is no longer enough to only look at the
    // x-coordinate alone in order to find the {@earliestAfterItem} in the
    // hoverlist. Make sure it is chosen from the row closest to the
    // `draggerElCenter`.
    if (pickClosestRow) {
      var distanceToRow = DragListGroup.verticalDistanceFromItem_(
          item, draggerElCenter);
      // Initialize the distance to the closest row to the current value if
      // undefined.
      if (distanceToClosestRow === undefined) {
        distanceToClosestRow = distanceToRow;
      }
      if (isBeforeFn(relevantCoord, relevantBound) &&
          (earliestAfterItemRelevantBound == undefined ||
           (distanceToRow < distanceToClosestRow) ||
           ((distanceToRow == distanceToClosestRow) &&
            (isBeforeFn(relevantBound, earliestAfterItemRelevantBound) ||
             relevantBound == earliestAfterItemRelevantBound)))) {
        earliestAfterItem = item;
        earliestAfterItemRelevantBound = relevantBound;
      }
      // Update distance to closest row.
      if (distanceToRow < distanceToClosestRow) {
        distanceToClosestRow = distanceToRow;
      }
    } else if (
        isBeforeFn(relevantCoord, relevantBound) &&
        (earliestAfterItemRelevantBound == undefined ||
         isBeforeFn(relevantBound, earliestAfterItemRelevantBound))) {
      earliestAfterItem = item;
      earliestAfterItemRelevantBound = relevantBound;
    }
  }
  // If we ended up picking an element that is not in the closest row it can
  // only happen if we should have picked the last one in which case there is
  // no consecutive element.
  if (earliestAfterItem !== null &&
      DragListGroup.verticalDistanceFromItem_(
          earliestAfterItem, draggerElCenter) > distanceToClosestRow) {
    return null;
  } else {
    return earliestAfterItem;
  }
};


/**
 * Private helper for getHoverNextItem().
 * Given an item and a target determine the vertical distance from the item's
 * center to the target.
 * @param {Element} item The item to measure the distance from.
 * @param {Coordinate} target The (x,y) coordinate of the target
 *     to measure the distance to.
 * @return {number} The vertical distance between the center of the item and
 *     the target.
 * @private
 */
DragListGroup.verticalDistanceFromItem_ = function(item, target) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var itemBounds = item.dlgBounds_;
  var itemCenterY = itemBounds.top + (itemBounds.height - 1) / 2;
  return Math.abs(target.y - itemCenterY);
};


/**
 * Private helper for getHoverNextItem_().
 * Given the bounds of an item, computes the item's bottom y-value.
 * @param {Rect} itemBounds The bounds of the item.
 * @return {number} The item's bottom y-value.
 * @private
 */
DragListGroup.getBottomBound_ = function(itemBounds) {
  return itemBounds.top + itemBounds.height - 1;
};


/**
 * Private helper for getHoverNextItem_().
 * Given the bounds of an item, computes the item's right x-value.
 * @param {Rect} itemBounds The bounds of the item.
 * @return {number} The item's right x-value.
 * @private
 */
DragListGroup.getRightBound_ = function(itemBounds) {
  return itemBounds.left + itemBounds.width - 1;
};


/**
 * Private helper for getHoverNextItem_().
 * Given the bounds of an item, computes the item's left x-value.
 * @param {Rect} itemBounds The bounds of the item.
 * @return {number} The item's left x-value.
 * @private
 */
DragListGroup.getLeftBound_ = function(itemBounds) {
  return itemBounds.left || 0;
};


/**
 * Private helper for getHoverNextItem_().
 * @param {number} a Number to compare.
 * @param {number} b Number to compare.
 * @return {boolean} Whether a is less than b.
 * @private
 */
DragListGroup.isLessThan_ = function(a, b) {
  return a < b;
};


/**
 * Private helper for getHoverNextItem_().
 * @param {number} a Number to compare.
 * @param {number} b Number to compare.
 * @return {boolean} Whether a is greater than b.
 * @private
 */
DragListGroup.isGreaterThan_ = function(a, b) {
  return a > b;
};


/**
 * Inserts the current drag item to the appropriate location in the drag list
 * that we're hovering over (if the current drag item is not already there).
 *
 * @param {Element} hoverList The drag list we're hovering over.
 * @param {Element} hoverNextItem The next item in the hover drag list.
 * @private
 */
DragListGroup.prototype.insertCurrDragItem_ = function(
    hoverList, hoverNextItem) {
  if (this.currDragItem_.parentNode != hoverList ||
      dom.getNextElementSibling(this.currDragItem_) != hoverNextItem) {
    // The current drag item is not in the correct location, so we move it.
    // Note: hoverNextItem may be null, but insertBefore() still works.
    hoverList.insertBefore(this.currDragItem_, hoverNextItem);
  }
};



/**
 * The event object dispatched by DragListGroup.
 * The fields draggerElCenter, hoverList, and hoverNextItem are only available
 * for the BEFOREDRAGMOVE and DRAGMOVE events.
 *
 * @param {!DragListGroup.EventType} type
 * @param {DragListGroup} dragListGroup A reference to the associated
 *     DragListGroup object.
 * @param {BrowserEvent|DragEvent} event The event fired
 *     by the browser or fired by the dragger.
 * @param {Element} currDragItem The current drag item being moved.
 * @param {Element} draggerEl The clone of the current drag item that's actually
 *     being dragged around.
 * @param {Dragger} dragger The dragger object.
 * @param {Coordinate=} opt_draggerElCenter The current center
 *     position of the draggerEl.
 * @param {Element=} opt_hoverList The current drag list that's being hovered
 *     over, or null if the center of draggerEl is outside of any drag lists.
 *     If not null and the drag action ends right now, then currDragItem will
 *     end up in this list.
 * @param {Element=} opt_hoverNextItem The current next item in the hoverList
 *     that the draggerEl is hovering over. (I.e. If the drag action ends
 *     right now, then this item would become the next item after the new
 *     location of currDragItem.) May be null if not applicable or if
 *     currDragItem would be added to the end of hoverList.
 * @constructor
 * @struct
 * @extends {Event}
 */
export function DragListGroupEvent(
  type,
  dragListGroup,
  event,
  currDragItem,
  draggerEl,
  dragger,
  opt_draggerElCenter,
  opt_hoverList,
  opt_hoverNextItem
) {
  Event.call(this, type);

  /**
     * A reference to the associated DragListGroup object.
     * @type {DragListGroup}
     */
  this.dragListGroup = dragListGroup;

  /**
     * The event fired by the browser or fired by the dragger.
     * @type {BrowserEvent|DragEvent}
     */
  this.event = event;

  /**
   * The current drag item being move.
   * @type {Element}
   */
  this.currDragItem = currDragItem;

  /**
   * The clone of the current drag item that's actually being dragged around.
   * @type {Element}
   */
  this.draggerEl = draggerEl;

  /**
     * The dragger object.
     * @type {Dragger}
     */
  this.dragger = dragger;

  /**
     * The current center position of the draggerEl.
     * @type {Coordinate|undefined}
     */
  this.draggerElCenter = opt_draggerElCenter;

  /**
   * The current drag list that's being hovered over, or null if the center of
   * draggerEl is outside of any drag lists. (I.e. If not null and the drag
   * action ends right now, then currDragItem will end up in this list.)
   * @type {Element|undefined}
   */
  this.hoverList = opt_hoverList;

  /**
   * The current next item in the hoverList that the draggerEl is hovering over.
   * (I.e. If the drag action ends right now, then this item would become the
   * next item after the new location of currDragItem.) May be null if not
   * applicable or if currDragItem would be added to the end of hoverList.
   * @type {Element|undefined}
   */
  this.hoverNextItem = opt_hoverNextItem;
}
goog.inherits(DragListGroupEvent, Event);
