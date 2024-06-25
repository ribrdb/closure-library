/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thin wrapper around the DOM element for graphics groups.
 */


goog.declareModuleId('goog.graphics.groupelement');

import { Element } from './element.js';
goog.requireType('goog.graphics.abstractgraphics');



/**
 * Interface for a graphics group element.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {goog.graphics.AbstractGraphics} graphics The graphics creating
 *     this element.
 * @constructor
 * @extends {Element}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function GroupElement(element, graphics) {
 Element.call(this, element, graphics);
}
goog.inherits(GroupElement, Element);


/**
 * Remove all drawing elements from the group.
 */
GroupElement.prototype.clear = goog.abstractMethod;


/**
 * Set the size of the group element.
 * @param {number|string} width The width of the group element.
 * @param {number|string} height The height of the group element.
 */
GroupElement.prototype.setSize = goog.abstractMethod;
