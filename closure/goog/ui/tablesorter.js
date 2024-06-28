/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A table sorting decorator.
 *
 * @see ../demos/tablesorter.html
 */

import * as array from '../array/array.js';

import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { EventType } from '../events/eventtype.js';
import * as functions from '../functions/functions.js';
import { Component } from './component.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * A table sorter allows for sorting of a table by column.  This component can
 * be used to decorate an already existing TABLE element with sorting
 * features.
 *
 * The TABLE should use a THEAD containing TH elements for the table column
 * headers.
 *
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {Component}
 */
export function TableSorter(opt_domHelper) {
  Component.call(this, opt_domHelper);

  /**
   * The current sort header of the table, or null if none.
   * @type {?HTMLTableCellElement}
   * @private
   */
  this.header_ = null;

  /**
   * Whether the last sort was in reverse.
   * @type {boolean}
   * @private
   */
  this.reversed_ = false;

  /**
   * The default sorting function.
   * @type {function(*, *) : number}
   * @private
   */
  this.defaultSortFunction_ = TableSorter.numericSort;

  /**
   * Array of custom sorting functions per colun.
   * @type {Array<function(*, *) : number>}
   * @private
   */
  this.sortFunctions_ = [];
}
goog.inherits(TableSorter, Component);


/**
 * Row number (in <thead>) to use for sorting.
 * @type {number}
 * @private
 */
TableSorter.prototype.sortableHeaderRowIndex_ = 0;


/**
 * Sets the row index (in <thead>) to be used for sorting.
 * By default, the first row (index 0) is used.
 * Must be called before decorate() is called.
 * @param {number} index The row index.
 */
TableSorter.prototype.setSortableHeaderRowIndex = function(index) {
  if (this.isInDocument()) {
    throw new Error(Component.Error.ALREADY_RENDERED);
  }
  this.sortableHeaderRowIndex_ = index;
};


/**
 * Table sorter events.
 * @enum {string}
 */
TableSorter.EventType = {
  BEFORESORT: 'beforesort',
  SORT: 'sort'
};


/** @override */
TableSorter.prototype.canDecorate = function(element) {
  return element.tagName == TagName.TABLE;
};


/**
 * @override
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
TableSorter.prototype.enterDocument = function() {
  TableSorter.superClass_.enterDocument.call(this);

  var table = this.getElement();
  var headerRow = table.tHead.rows[this.sortableHeaderRowIndex_];

  this.getHandler().listen(headerRow, EventType.CLICK, this.sort_);
};


/**
 * @return {number} The current sort column of the table, or -1 if none.
 */
TableSorter.prototype.getSortColumn = function() {
  return this.header_ ? this.header_.cellIndex : -1;
};


/**
 * @return {boolean} Whether the last sort was in reverse.
 */
TableSorter.prototype.isSortReversed = function() {
  return this.reversed_;
};


/**
 * @return {function(*, *) : number} The default sort function to be used by
 *     all columns.
 */
TableSorter.prototype.getDefaultSortFunction = function() {
  return this.defaultSortFunction_;
};


/**
 * Sets the default sort function to be used by all columns.  If not set
 * explicitly, this defaults to numeric sorting.
 * @param {function(*, *) : number} sortFunction The new default sort function.
 */
TableSorter.prototype.setDefaultSortFunction = function(sortFunction) {
  this.defaultSortFunction_ = sortFunction;
};


/**
 * Gets the sort function to be used by the given column.  Returns the default
 * sort function if no sort function is explicitly set for this column.
 * @param {number} column The column index.
 * @return {function(*, *) : number} The sort function used by the column.
 */
TableSorter.prototype.getSortFunction = function(column) {
  return this.sortFunctions_[column] || this.defaultSortFunction_;
};


/**
 * Set the sort function for the given column, overriding the default sort
 * function.
 * @param {number} column The column index.
 * @param {function(*, *) : number} sortFunction The new sort function.
 */
TableSorter.prototype.setSortFunction = function(column, sortFunction) {
  this.sortFunctions_[column] = sortFunction;
};


/**
 * Sort the table contents by the values in the given column.
 * @param {BrowserEvent} e The click event.
 * @private
 */
TableSorter.prototype.sort_ = function(e) {
  // Determine what column was clicked.
  // TODO(robbyw): If this table cell contains another table, this could break.
  var target = e.target;
  var th = dom.getAncestorByTagNameAndClass(target, TagName.TH);

  // If the user clicks on the same column, sort it in reverse of what it is
  // now.  Otherwise, sort forward.
  var reverse = th == this.header_ ? !this.reversed_ : false;

  // Perform the sort.
  if (this.dispatchEvent(TableSorter.EventType.BEFORESORT)) {
    if (this.sort(th.cellIndex, reverse)) {
      this.dispatchEvent(TableSorter.EventType.SORT);
    }
  }
};


/**
 * Sort the table contents by the values in the given column.
 * @param {number} column The column to sort by.
 * @param {boolean=} opt_reverse Whether to sort in reverse.
 * @return {boolean} Whether the sort was executed.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
TableSorter.prototype.sort = function(column, opt_reverse) {
  var sortFunction = this.getSortFunction(column);
  if (sortFunction === TableSorter.noSort) {
    return false;
  }

  // Remove old header classes.
  if (this.header_) {
    classlist.remove(
        this.header_, this.reversed_ ?
            goog.getCssName('goog-tablesorter-sorted-reverse') :
            goog.getCssName('goog-tablesorter-sorted'));
  }

  // If the user clicks on the same column, sort it in reverse of what it is
  // now.  Otherwise, sort forward.
  this.reversed_ = !!opt_reverse;
  var multiplier = this.reversed_ ? -1 : 1;
  var cmpFn = function(a, b) {
    return multiplier * sortFunction(a[0], b[0]) || a[1] - b[1];
  };

  // Sort all tBodies
  var table = this.getElement();
  array.forEach(table.tBodies, function(tBody) {
    // Collect all of the rows into an array.
    var values = array.map(tBody.rows, function(row, rowIndex) {
      return [dom.getTextContent(row.cells[column]), rowIndex, row];
    });

    values.sort(cmpFn);

    // Remove the tBody temporarily since this speeds up the sort on some
    // browsers.
    var nextSibling = tBody.nextSibling;
    table.removeChild(tBody);

    // Sort the rows, using the resulting array.
    values.forEach(function(row) {
      tBody.appendChild(row[2]);
    });

    // Reinstate the tBody.
    table.insertBefore(tBody, nextSibling);
  });

  // Mark this as the last sorted column.
  this.header_ = /** @type {!HTMLTableCellElement} */
      (table.tHead.rows[this.sortableHeaderRowIndex_].cells[column]);

  // Update the header class.
  classlist.add(
      this.header_, this.reversed_ ?
          goog.getCssName('goog-tablesorter-sorted-reverse') :
          goog.getCssName('goog-tablesorter-sorted'));

  return true;
};


/**
 * Disables sorting on the specified column
 * @param {*} a First sort value.
 * @param {*} b Second sort value.
 * @return {number} Negative if a < b, 0 if a = b, and positive if a > b.
 */
TableSorter.noSort = functions.error('no sort');


/**
 * A numeric sort function.  NaN values (or values that do not parse as float
 * numbers) compare equal to each other and greater to any other number.
 * @param {*} a First sort value.
 * @param {*} b Second sort value.
 * @return {number} Negative if a < b, 0 if a = b, and positive if a > b.
 */
TableSorter.numericSort = function(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  // foo == foo is false if and only if foo is NaN.
  if (a == a) {
    return b == b ? a - b : -1;
  } else {
    return b == b ? 1 : 0;
  }
};


/**
 * Alphabetic sort function.
 * @param {*} a First sort value.
 * @param {*} b Second sort value.
 * @return {number} Negative if a < b, 0 if a = b, and positive if a > b.
 */
TableSorter.alphaSort = array.defaultCompare;


/**
 * Returns a function that is the given sort function in reverse.
 * @param {function(*, *) : number} sortFunction The original sort function.
 * @return {function(*, *) : number} A new sort function that reverses the
 *     given sort function.
 */
TableSorter.createReverseSort = function(sortFunction) {
  return function(a, b) {
    return -1 * sortFunction(a, b);
  };
};
