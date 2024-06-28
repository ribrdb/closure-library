/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities to abstract mouse and touch events.
 */


import * as array from '../../array/array.js';

import * as asserts from '../../asserts/asserts.js';
import { EventType } from '../../events/eventtype.js';
import * as googString from '../../string/string.js';


/**
 * Description the geometry and target of an event.
 *
 * @typedef {{
 *   clientX: number,
 *   clientY: number,
 *   screenX: number,
 *   screenY: number,
 *   target: EventTarget
 * }}
 */
export var TouchData;


/**
 * Takes a mouse or touch event and returns the relevant geometry and target
 * data.
 * @param {!Event} e A mouse or touch event.
 * @return {!TouchData}
 */
export function getTouchData(e) {
 let source = e;
 asserts.assert(
     googString.startsWith(e.type, 'touch') ||
         googString.startsWith(e.type, 'mouse'),
     'Event must be mouse or touch event.');

 if (googString.startsWith(e.type, 'touch')) {
   asserts.assert(
       array.contains(
           [
             EventType.TOUCHCANCEL, EventType.TOUCHEND,
             EventType.TOUCHMOVE, EventType.TOUCHSTART
           ],
           e.type),
       'Touch event not of valid type.');

   // If the event is end or cancel, take the first changed touch,
   // otherwise the first target touch.
   /** @suppress {strictMissingProperties} Added to tighten compiler checks */
   source = (e.type == EventType.TOUCHEND ||
             e.type == EventType.TOUCHCANCEL) ?
       e.changedTouches[0] :
       e.targetTouches[0];
 }

 return {
   clientX: source['clientX'],
   clientY: source['clientY'],
   screenX: source['screenX'],
   screenY: source['screenY'],
   target: source['target']
 };
}
