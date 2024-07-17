/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A dimension picker control.  A dimension picker allows the
 * user to visually select a row and column count.
 *
 * @see ../demos/dimensionpicker.html
 * @see ../demos/dimensionpicker_rtl.html
 */

goog.declareModuleId('goog.ui.dimensionpicker');

import { BrowserEvent } from '../events/browserevent.js';
import { EventType } from '../events/eventtype.js';
import { KeyCodes } from '../events/keycodes.js';
import { Size } from '../math/size.js';
import { Component } from './component.js';
import * as ComponentUtil from './componentutil.js';
import { Control } from './control.js';
import { DimensionPickerRenderer } from './dimensionpickerrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { Event } = goog.requireType('goog.events.event');
const { KeyEvent } = goog.requireType('goog.events.keyevent');



/**
 * A dimension picker allows the user to visually select a row and column
 * count using their mouse and keyboard.
 *
 * The currently selected dimension is controlled by an ACTION event.  Event
 * listeners may retrieve the selected item using the
 * {@link #getValue} method.
 *
 * @param {DimensionPickerRenderer=} opt_renderer Renderer used to
 *     render or decorate the palette; defaults to
 *     {@link DimensionPickerRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {Control}
 */
export function DimensionPicker(opt_renderer, opt_domHelper) {
  Control.call(
      this, null, opt_renderer || DimensionPickerRenderer.getInstance(),
      opt_domHelper);

  this.size_ = new Size(this.minColumns, this.minRows);
}
goog.inherits(DimensionPicker, Control);


/**
 * Minimum number of columns to show in the grid.
 * @type {number}
 */
DimensionPicker.prototype.minColumns = 5;


/**
 * Minimum number of rows to show in the grid.
 * @type {number}
 */
DimensionPicker.prototype.minRows = 5;


/**
 * Maximum number of columns to show in the grid.
 * @type {number}
 */
DimensionPicker.prototype.maxColumns = 20;


/**
 * Maximum number of rows to show in the grid.
 * @type {number}
 */
DimensionPicker.prototype.maxRows = 20;


/**
 * Palette dimensions (columns x rows).
 * @type {Size}
 * @private
 */
DimensionPicker.prototype.size_;


/**
 * Currently highlighted row count.
 * @type {number}
 * @private
 */
DimensionPicker.prototype.highlightedRows_ = 1;


/**
 * Currently highlighted column count.
 * @type {number}
 * @private
 */
DimensionPicker.prototype.highlightedColumns_ = 1;


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DimensionPicker.prototype.enterDocument = function() {
  DimensionPicker.superClass_.enterDocument.call(this);

  var MouseEventType = ComponentUtil.getMouseEventType(this);

  var handler = this.getHandler();
  handler
      .listen(
          this.getRenderer().getMouseMoveElement(this),
          MouseEventType.MOUSEMOVE, this.handleMouseMove)
      .listen(
          this.getDomHelper().getWindow(), EventType.RESIZE,
          this.handleWindowResize);

  var parent = this.getParent();
  if (parent) {
    handler.listen(parent, Component.ComponentEventType.SHOW, this.handleShow_);
  }
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DimensionPicker.prototype.exitDocument = function() {
  DimensionPicker.superClass_.exitDocument.call(this);

  var MouseEventType = ComponentUtil.getMouseEventType(this);

  var handler = this.getHandler();
  handler
      .unlisten(
          this.getRenderer().getMouseMoveElement(this),
          MouseEventType.MOUSEMOVE, this.handleMouseMove)
      .unlisten(
          this.getDomHelper().getWindow(), EventType.RESIZE,
          this.handleWindowResize);

  var parent = this.getParent();
  if (parent) {
    handler.unlisten(
        parent, Component.ComponentEventType.SHOW, this.handleShow_);
  }
};


/**
 * Resets the highlighted size when the picker is shown.
 * @private
 */
DimensionPicker.prototype.handleShow_ = function() {
  if (this.isVisible()) {
    this.setValue(1, 1);
  }
};


/** @override */
DimensionPicker.prototype.disposeInternal = function() {
  DimensionPicker.superClass_.disposeInternal.call(this);
  delete this.size_;
};


// Palette event handling.


/**
 * Handles mousemove events. Determines which palette size was moused over and
 * highlights it.
 * @param {BrowserEvent} e Mouse event to handle.
 * @protected
 */
DimensionPicker.prototype.handleMouseMove = function(e) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var highlightedSizeX = this.getRenderer().getGridOffsetX(
      this,
      this.isRightToLeft() ?
          /** @type {!HTMLElement} */ (e.target).offsetWidth - e.offsetX :
          e.offsetX);
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var highlightedSizeY = this.getRenderer().getGridOffsetY(this, e.offsetY);

  this.setValue(highlightedSizeX, highlightedSizeY);
};


/**
 * Override `handleMouseDown` for pointer events.
 * @override
 */
DimensionPicker.prototype.handleMouseDown = function(e) {
  // For touch events, check for intersection with the grid element to prevent
  // taps on the invisible mouse catcher element from performing an action.
  if (DimensionPicker.isTouchEvent_(e) && !this.isEventOnGrid_(e)) {
    return;
  }

  DimensionPicker.base(this, 'handleMouseDown', e);

  // For touch events, delegate to `handleMouseMove` to update the highlight
  // state immediately. Not needed for mouse since we assume hover mousemove
  // events have already taken care of this.
  if (DimensionPicker.isTouchEvent_(e)) {
    this.handleMouseMove(/** @type {?BrowserEvent} */ (e));
  }
};


/**
 * Override `handleMouseUp` for pointer events.
 * @override
 */
DimensionPicker.prototype.handleMouseUp = function(e) {
  // For touch events, check for intersection with the grid element to prevent
  // taps on the invisible mouse catcher element from performing an action.
  if (DimensionPicker.isTouchEvent_(e) && !this.isEventOnGrid_(e)) {
    return;
  }

  DimensionPicker.base(this, 'handleMouseUp', e);
};


/**
 * Handles window resize events.  Ensures no scrollbars are introduced by the
 * renderer's mouse catcher.
 * @param {Event} e Resize event to handle.
 * @protected
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DimensionPicker.prototype.handleWindowResize = function(e) {
  this.getRenderer().positionMouseCatcher(this);
};


/**
 * Handle key events if supported, so the user can use the keyboard to
 * manipulate the highlighted rows and columns.
 * @param {KeyEvent} e The key event object.
 * @return {boolean} Whether the key event was handled.
 * @override
 */
DimensionPicker.prototype.handleKeyEvent = function(e) {
  var rows = this.highlightedRows_;
  var columns = this.highlightedColumns_;
  switch (e.keyCode) {
    case KeyCodes.DOWN:
      rows++;
      break;
    case KeyCodes.UP:
      rows--;
      break;
    case KeyCodes.LEFT:
      if (this.isRightToLeft()) {
        columns++;
      } else {
        if (columns == 1) {
          // Delegate to parent.
          return false;
        } else {
          columns--;
        }
      }
      break;
    case KeyCodes.RIGHT:
      if (this.isRightToLeft()) {
        if (columns == 1) {
          // Delegate to parent.
          return false;
        } else {
          columns--;
        }
      } else {
        columns++;
      }
      break;
    default:
      return DimensionPicker.superClass_.handleKeyEvent.call(this, e);
  }
  this.setValue(columns, rows);
  return true;
};


// Palette management.


/**
 * @return {Size} Current table size shown (columns x rows).
 */
DimensionPicker.prototype.getSize = function() {
  return this.size_;
};


/**
 * @return {!Size} size The currently highlighted dimensions.
 */
DimensionPicker.prototype.getValue = function() {
  return new Size(this.highlightedColumns_, this.highlightedRows_);
};


/**
 * Sets the currently highlighted dimensions. If the dimensions are not valid
 * (not between 1 and the maximum number of columns/rows to show), they will
 * be changed to the closest valid value.
 * @param {(number|!Size)} columns The number of columns to highlight,
 *     or a Size object containing both.
 * @param {number=} opt_rows The number of rows to highlight.  Can be
 *     omitted when columns is a good.math.Size object.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DimensionPicker.prototype.setValue = function(columns, opt_rows) {
  if (opt_rows === undefined) {
    columns = /** @type {!Size} */ (columns);
    opt_rows = columns.height;
    columns = columns.width;
  } else {
    columns = /** @type {number} */ (columns);
  }

  // Ensure that the row and column values are within the minimum value (1) and
  // maxmimum values.
  columns = Math.max(1, columns);
  opt_rows = Math.max(1, opt_rows);
  columns = Math.min(this.maxColumns, columns);
  opt_rows = Math.min(this.maxRows, opt_rows);

  if (this.highlightedColumns_ != columns ||
      this.highlightedRows_ != opt_rows) {
    var renderer = this.getRenderer();
    // Show one more row/column than highlighted so the user understands the
    // palette can grow.
    this.size_.width =
        Math.max(Math.min(columns + 1, this.maxColumns), this.minColumns);
    this.size_.height =
        Math.max(Math.min(opt_rows + 1, this.maxRows), this.minRows);
    renderer.updateSize(this, this.getElement());

    this.highlightedColumns_ = columns;
    this.highlightedRows_ = opt_rows;
    renderer.setHighlightedSize(this, columns, opt_rows);
  }
};


/**
 * Returns whether the given event intersects the grid element.
 * @param {?Event} e Mouse event to handle.
 * @return {boolean}
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DimensionPicker.prototype.isEventOnGrid_ = function(e) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var gridEl = this.getRenderer().getMouseMoveElement(this);
  var gridBounds = gridEl.getBoundingClientRect();
  return e.clientX >= gridBounds.left && e.clientX <= gridBounds.right &&
      e.clientY >= gridBounds.top && e.clientY <= gridBounds.bottom;
};


/**
 * @param {?Event} e Mouse or pointer event to handle.
 * @return {boolean}
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DimensionPicker.isTouchEvent_ = function(e) {
  return e.pointerType &&
      e.pointerType != BrowserEvent.PointerType.MOUSE;
};


/**
 * Register this control so it can be created from markup
 */
registry.setDecoratorByClassName(
    DimensionPickerRenderer.CSS_CLASS, function() {
  return new DimensionPicker();
});
