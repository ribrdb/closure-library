/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventType } from './eventtype.js';

import { MouseEvents } from './mouseevents.js';


/**
 * An alias for `EventType.MOUSE*` event types that continue to use
 * mouse events.
 * @const {!MouseEvents}
 */
export var MouseAsMouseEventType = {
  MOUSEDOWN: EventType.MOUSEDOWN,
  MOUSEUP: EventType.MOUSEUP,
  MOUSECANCEL: EventType.MOUSECANCEL,
  MOUSEMOVE: EventType.MOUSEMOVE,
  MOUSEOVER: EventType.MOUSEOVER,
  MOUSEOUT: EventType.MOUSEOUT,
  MOUSEENTER: EventType.MOUSEENTER,
  MOUSELEAVE: EventType.MOUSELEAVE
};
