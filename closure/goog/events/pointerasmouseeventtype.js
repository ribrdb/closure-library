/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PointerFallbackEventType } from './pointerfallbackeventtype.js';

import { MouseEvents } from './mouseevents.js';


/**
 * An alias for `goog.events.EventType.MOUSE*` event types that is overridden by
 * corresponding `POINTER*` event types.
 * @const {!MouseEvents}
 */
export var PointerAsMouseEventType = {
  MOUSEDOWN: PointerFallbackEventType.POINTERDOWN,
  MOUSEUP: PointerFallbackEventType.POINTERUP,
  MOUSECANCEL: PointerFallbackEventType.POINTERCANCEL,
  MOUSEMOVE: PointerFallbackEventType.POINTERMOVE,
  MOUSEOVER: PointerFallbackEventType.POINTEROVER,
  MOUSEOUT: PointerFallbackEventType.POINTEROUT,
  MOUSEENTER: PointerFallbackEventType.POINTERENTER,
  MOUSELEAVE: PointerFallbackEventType.POINTERLEAVE
};
