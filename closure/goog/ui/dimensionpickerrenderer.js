/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The default renderer for a dom.DimensionPicker.  A
 * dimension picker allows the user to visually select a row and column count.
 * It looks like a palette but in order to minimize DOM load it is rendered.
 * using CSS background tiling instead of as a grid of nodes.
 */

import { Announcer } from '../a11y/aria/announcer.js';

import { LivePriority } from '../a11y/aria/attributes.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as bidi from '../i18n/bidi.js';
import * as googStyle from '../style/style.js';
import { ControlRenderer } from './controlrenderer.js';
import * as userAgent from '../useragent/useragent.js';
const { Control } = goog.requireType('goog.ui.control');
const { DimensionPicker } = goog.requireType('goog.ui.dimensionpicker');



/**
 * Default renderer for {@link DimensionPicker}s.  Renders the
 * palette as two divs, one with the un-highlighted background, and one with the
 * highlighted background.
 *
 * @constructor
 * @extends {ControlRenderer}
 */
export function DimensionPickerRenderer() {
  ControlRenderer.call(this);

  /** @private {Announcer} */
  this.announcer_ = new Announcer();
}
goog.inherits(DimensionPickerRenderer, ControlRenderer);
goog.addSingletonGetter(DimensionPickerRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
DimensionPickerRenderer.CSS_CLASS =
    goog.getCssName('goog-dimension-picker');


/**
 * Return the underlying div for the given outer element.
 * @param {Element} element The root element.
 * @return {Element} The underlying div.
 * @private
 */
DimensionPickerRenderer.prototype.getUnderlyingDiv_ = function(
    element) {
  return /** @type {Element} */ (element.firstChild.childNodes[1]);
};


/**
 * Return the highlight div for the given outer element.
 * @param {Element} element The root element.
 * @return {Element} The highlight div.
 * @private
 */
DimensionPickerRenderer.prototype.getHighlightDiv_ = function(element) {
  return /** @type {Element} */ (element.firstChild.lastChild);
};


/**
 * Return the status message div for the given outer element.
 * @param {Element} element The root element.
 * @return {Element} The status message div.
 * @private
 */
DimensionPickerRenderer.prototype.getStatusDiv_ = function(element) {
  return /** @type {Element} */ (element.lastChild);
};


/**
 * Return the invisible mouse catching div for the given outer element.
 * @param {Element} element The root element.
 * @return {Element} The invisible mouse catching div.
 * @private
 */
DimensionPickerRenderer.prototype.getMouseCatcher_ = function(element) {
  return /** @type {Element} */ (element.firstChild.firstChild);
};


/**
 * Overrides {@link ControlRenderer#canDecorate} to allow decorating
 * empty DIVs only.
 * @param {Element} element The element to check.
 * @return {boolean} Whether if the element is an empty div.
 * @override
 */
DimensionPickerRenderer.prototype.canDecorate = function(element) {
  return element.tagName == TagName.DIV && !element.firstChild;
};


/**
 * Overrides {@link ControlRenderer#decorate} to decorate empty DIVs.
 * @param {Control} control DimensionPicker to decorate.
 * @param {Element} element The element to decorate.
 * @return {Element} The decorated element.
 * @override
 */
DimensionPickerRenderer.prototype.decorate = function(
    control, element) {
  var palette = /** @type {DimensionPicker} */ (control);
  DimensionPickerRenderer.superClass_.decorate.call(
      this, palette, element);

  this.addElementContents_(palette, element);
  this.updateSize(palette, element);

  return element;
};


/**
 * Scales various elements in order to update the palette's size.
 * @param {DimensionPicker} palette The palette object.
 * @param {Element} element The element to set the style of.
 */
DimensionPickerRenderer.prototype.updateSize = function(
    palette, element) {
  var size = palette.getSize();

  element.style.width = size.width + 'em';

  var underlyingDiv = this.getUnderlyingDiv_(element);
  underlyingDiv.style.width = size.width + 'em';
  underlyingDiv.style.height = size.height + 'em';

  if (palette.isRightToLeft()) {
    this.adjustParentDirection_(palette, element);
  }
};


/**
 * Adds the appropriate content elements to the given outer DIV.
 * @param {DimensionPicker} palette The palette object.
 * @param {Element} element The element to decorate.
 * @private
 */
DimensionPickerRenderer.prototype.addElementContents_ = function(
    palette, element) {
  // First we create a single div containing three stacked divs.  The bottom div
  // catches mouse events.  We can't use document level mouse move detection as
  // we could lose events to iframes.  This is especially important in Firefox 2
  // in which TrogEdit creates iframes. The middle div uses a css tiled
  // background image to represent deselected tiles.  The top div uses a
  // different css tiled background image to represent selected tiles.
  var mouseCatcherDiv = palette.getDomHelper().createDom(
      TagName.DIV,
      goog.getCssName(this.getCssClass(), 'mousecatcher'));
  var unhighlightedDiv =
      palette.getDomHelper().createDom(TagName.DIV, {
        'class': goog.getCssName(this.getCssClass(), 'unhighlighted'),
        'style': 'width:100%;height:100%'
      });
  var highlightedDiv = palette.getDomHelper().createDom(
      TagName.DIV, goog.getCssName(this.getCssClass(), 'highlighted'));
  element.appendChild(
      palette.getDomHelper().createDom(
          TagName.DIV, {
            'style': 'width:100%;height:100%;touch-action:none;'
          },
          mouseCatcherDiv, unhighlightedDiv, highlightedDiv));

  // Lastly we add a div to store the text version of the current state.
  element.appendChild(
      palette.getDomHelper().createDom(
          TagName.DIV, goog.getCssName(this.getCssClass(), 'status')));
};


/**
 * Creates a div and adds the appropriate contents to it.
 * @param {Control} control Picker to render.
 * @return {!Element} Root element for the palette.
 * @override
 */
DimensionPickerRenderer.prototype.createDom = function(control) {
  var palette = /** @type {DimensionPicker} */ (control);
  var classNames = this.getClassNames(palette);
  // Hide the element from screen readers so they don't announce "1 of 1" for
  // the perceived number of items in the palette.
  var element = palette.getDomHelper().createDom(
      TagName.DIV,
      {'class': classNames ? classNames.join(' ') : '', 'aria-hidden': 'true'});
  this.addElementContents_(palette, element);
  this.updateSize(palette, element);
  return element;
};


/**
 * Initializes the control's DOM when the control enters the document.  Called
 * from {@link Control#enterDocument}.
 * @param {Control} control Palette whose DOM is to be
 *     initialized as it enters the document.
 * @override
 */
DimensionPickerRenderer.prototype.initializeDom = function(control) {
  var palette = /** @type {DimensionPicker} */ (control);
  DimensionPickerRenderer.superClass_.initializeDom.call(this, palette);

  // Make the displayed highlighted size match the dimension picker's value.
  var highlightedSize = palette.getValue();
  this.setHighlightedSize(
      palette, highlightedSize.width, highlightedSize.height);

  this.positionMouseCatcher(palette);
};


/**
 * Get the element to listen for mouse move events on.
 * @param {DimensionPicker} palette The palette to listen on.
 * @return {Element} The element to listen for mouse move events on.
 */
DimensionPickerRenderer.prototype.getMouseMoveElement = function(
    palette) {
  return /** @type {Element} */ (palette.getElement().firstChild);
};


/**
 * Returns the x offset in to the grid for the given mouse x position.
 * @param {DimensionPicker} palette The table size palette.
 * @param {number} x The mouse event x position.
 * @return {number} The x offset in to the grid.
 */
DimensionPickerRenderer.prototype.getGridOffsetX = function(
    palette, x) {
  // TODO(robbyw): Don't rely on magic 18 - measure each palette's em size.
  return Math.min(palette.maxColumns, Math.ceil(x / 18));
};


/**
 * Returns the y offset in to the grid for the given mouse y position.
 * @param {DimensionPicker} palette The table size palette.
 * @param {number} y The mouse event y position.
 * @return {number} The y offset in to the grid.
 */
DimensionPickerRenderer.prototype.getGridOffsetY = function(
    palette, y) {
  return Math.min(palette.maxRows, Math.ceil(y / 18));
};


/**
 * Sets the highlighted size. Does nothing if the palette hasn't been rendered.
 * @param {DimensionPicker} palette The table size palette.
 * @param {number} columns The number of columns to highlight.
 * @param {number} rows The number of rows to highlight.
 */
DimensionPickerRenderer.prototype.setHighlightedSize = function(
    palette, columns, rows) {
  var element = palette.getElement();
  // Can't update anything if DimensionPicker hasn't been rendered.
  if (!element) {
    return;
  }

  // Style the highlight div.
  var style = this.getHighlightDiv_(element).style;
  style.width = columns + 'em';
  style.height = rows + 'em';

  // Explicitly set style.right so the element grows to the left when increase
  // in width.
  if (palette.isRightToLeft()) {
    style.right = '0';
  }

  /**
   * @desc The dimension of the columns and rows currently selected in the
   * dimension picker, as text that can be spoken by a screen reader.
   */
  var MSG_DIMENSION_PICKER_HIGHLIGHTED_DIMENSIONS = goog.getMsg(
      '{$numCols} by {$numRows}',
      {'numCols': String(columns), 'numRows': String(rows)});
  this.announcer_.say(
      MSG_DIMENSION_PICKER_HIGHLIGHTED_DIMENSIONS,
      LivePriority.ASSERTIVE);

  // Update the size text.
  dom.setTextContent(
      this.getStatusDiv_(element),
      bidi.enforceLtrInText(columns + ' x ' + rows));
};


/**
 * Position the mouse catcher such that it receives mouse events past the
 * selectedsize up to the maximum size.  Takes care to not introduce scrollbars.
 * Should be called on enter document and when the window changes size.
 * @param {DimensionPicker} palette The table size palette.
 */
DimensionPickerRenderer.prototype.positionMouseCatcher = function(
    palette) {
  var mouseCatcher = this.getMouseCatcher_(palette.getElement());
  var doc = dom.getOwnerDocument(mouseCatcher);
  var body = doc.body;

  var position = googStyle.getRelativePosition(mouseCatcher, body);

  // Hide the mouse catcher so it doesn't affect the body's scroll size.
  mouseCatcher.style.display = 'none';

  // Compute the maximum size the catcher can be without introducing scrolling.
  var xAvailableEm = (palette.isRightToLeft() && position.x > 0) ?
      Math.floor(position.x / 18) :
      Math.floor((body.scrollWidth - position.x) / 18);

  // Computing available height is more complicated - we need to check the
  // window's inner height.
  var height;
  if (userAgent.IE) {
    // Offset 20px to make up for scrollbar size.
    height = googStyle.getClientViewportElement(body).scrollHeight - 20;
  } else {
    var win = dom.getWindow(doc);
    // Offset 20px to make up for scrollbar size.
    height = Math.max(win.innerHeight, body.scrollHeight) - 20;
  }
  var yAvailableEm = Math.floor((height - position.y) / 18);

  // Resize and display the mouse catcher.
  mouseCatcher.style.width = Math.min(palette.maxColumns, xAvailableEm) + 'em';
  mouseCatcher.style.height = Math.min(palette.maxRows, yAvailableEm) + 'em';
  mouseCatcher.style.display = '';

  // Explicitly set style.right so the mouse catcher is positioned on the left
  // side instead of right.
  if (palette.isRightToLeft()) {
    mouseCatcher.style.right = '0';
  }
};


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
DimensionPickerRenderer.prototype.getCssClass = function() {
  return DimensionPickerRenderer.CSS_CLASS;
};


/**
 * This function adjusts the positioning from 'left' and 'top' to 'right' and
 * 'top' as appropriate for RTL control.  This is so when the dimensionpicker
 * grow in width, the containing element grow to the left instead of right.
 * This won't be necessary if goog.ui.SubMenu rendering code would position RTL
 * control with 'right' and 'top'.
 * @private
 *
 * @param {DimensionPicker} palette The palette object.
 * @param {Element} element The palette's element.
 */
DimensionPickerRenderer.prototype.adjustParentDirection_ = function(
    palette, element) {
  var parent = palette.getParent();
  if (parent) {
    var parentElement = parent.getElement();

    // Anchors the containing element to the right so it grows to the left
    // when it increase in width.
    var right = googStyle.getStyle(parentElement, 'right');
    if (right == '') {
      var parentPos = googStyle.getPosition(parentElement);
      var parentSize = googStyle.getSize(parentElement);
      if (parentSize.width != 0 && parentPos.x != 0) {
        var visibleRect =
            googStyle.getBounds(googStyle.getClientViewportElement());
        var visibleWidth = visibleRect.width;
        right = visibleWidth - parentPos.x - parentSize.width;
        googStyle.setStyle(parentElement, 'right', right + 'px');
      }
    }

    // When a table is inserted, the containing element's position is
    // recalculated the next time it shows, set left back to '' to prevent
    // extra white space on the left.
    var left = googStyle.getStyle(parentElement, 'left');
    if (left != '') {
      googStyle.setStyle(parentElement, 'left', '');
    }
  } else {
    googStyle.setStyle(element, 'right', '0px');
  }
};
