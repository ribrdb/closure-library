/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Single Element Drag and Drop.
 *
 * Drag and drop implementation for sources/targets consisting of a single
 * element.
 *
 * @see ../demos/dragdrop.html
 */

import { AbstractDragDrop, DragDropItem } from './abstractdragdrop.js';



/**
 * Drag/drop implementation for creating drag sources/drop targets consisting of
 * a single HTML Element.
 *
 * @param {Element|string} element Dom Node, or string representation of node
 *     id, to be used as drag source/drop target.
 * @param {DRAG_DROP_DATA=} opt_data Data associated with the source/target.
 * @throws Error If no element argument is provided or if the type is invalid
 * @extends {AbstractDragDrop}
 * @template DRAG_DROP_DATA
 * @constructor
 * @struct
 */
export function DragDrop(element, opt_data) {
 AbstractDragDrop.call(this);

 var item = new DragDropItem(element, opt_data);
 item.setParent(this);
 this.items_.push(item);
}
goog.inherits(DragDrop, AbstractDragDrop);
