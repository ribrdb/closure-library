/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Multiple Element Drag and Drop.
 *
 * Drag and drop implementation for sources/targets consisting of multiple
 * elements.
 *
 * @see ../demos/dragdrop.html
 */

import * as dom from '../dom/dom.js';

import { AbstractDragDrop, DragDropItem } from './abstractdragdrop.js';



/**
 * Drag/drop implementation for creating drag sources/drop targets consisting of
 * multiple HTML Elements (items). All items share the same drop target(s) but
 * can be dragged individually.
 *
 * @extends {AbstractDragDrop}
 * @constructor
 * @struct
 */
export function DragDropGroup() {
 AbstractDragDrop.call(this);
}
goog.inherits(DragDropGroup, AbstractDragDrop);


/**
 * Add item to drag object.
 *
 * @param {Element|string} element Dom Node, or string representation of node
 *     id, to be used as drag source/drop target.
 * @param {DRAG_DROP_DATA=} opt_data Data associated with the source/target.
 * @throws Error If no element argument is provided or if the type is
 *     invalid
 * @template DRAG_DROP_DATA
 * @override
 */
DragDropGroup.prototype.addItem = function(element, opt_data) {
 var item = new DragDropItem(element, opt_data);
 this.addDragDropItem(item);
};


/**
 * Add DragDropItem to drag object.
 *
 * @param {DragDropItem} item DragDropItem being added to the
 *     drag object.
 * @throws Error If no element argument is provided or if the type is
 *     invalid
 */
DragDropGroup.prototype.addDragDropItem = function(item) {
 item.setParent(this);
 this.items_.push(item);
 if (this.isInitialized()) {
   this.initItem(item);
 }
};


/**
 * Remove item from drag object.
 *
 * @param {Element|string} element Dom Node, or string representation of node
 *     id, that was previously added with addItem().
 */
DragDropGroup.prototype.removeItem = function(element) {
 element = dom.getElement(element);
 for (var item, i = 0; item = this.items_[i]; i++) {
   if (item.element == element) {
     this.items_.splice(i, 1);
     this.disposeItem(item);
     break;
   }
 }
};


/**
 * Marks the supplied list of items as selected. A drag operation for any of the
 * selected items will affect all of them.
 *
 * @param {Array<DragDropItem>} list List of items to select or null to
 *     clear selection.
 *
 * TODO(eae): Not yet implemented.
 */
DragDropGroup.prototype.setSelection = function(list) {

};
