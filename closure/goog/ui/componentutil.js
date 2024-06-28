/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Static utility methods for UI components.
 */

import { MouseAsMouseEventType } from '../events/mouseasmouseeventtype.js';

import { MouseEvents } from '../events/mouseevents.js';
import { PointerAsMouseEventType } from '../events/pointerasmouseeventtype.js';
const {Component} = goog.requireType('goog.ui.component');



/**
 * @param {!Component} component
 * @return {!MouseEvents} The browser events that should be listened
 *     to for the given mouse events.
 */
export function getMouseEventType(component) {
 return component.pointerEventsEnabled() ?
     PointerAsMouseEventType :
     MouseAsMouseEventType;
}
