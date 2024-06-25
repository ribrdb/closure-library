/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventType } from './eventtype.js';

import * as eventTypeHelpers from './eventtypehelpers.js';


/**
 * Constants for pointer event names that fall back to corresponding mouse event
 * names on unsupported platforms. These are intended to be drop-in replacements
 * for corresponding values in `EventType`.
 * @enum {string}
 */
export var PointerFallbackEventType = {
  POINTERDOWN: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTERDOWN, EventType.MSPOINTERDOWN,
      EventType.MOUSEDOWN),
  POINTERUP: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTERUP, EventType.MSPOINTERUP,
      EventType.MOUSEUP),
  POINTERCANCEL: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTERCANCEL,
      EventType.MSPOINTERCANCEL,
      // When falling back to mouse events, there is no MOUSECANCEL equivalent
      // of POINTERCANCEL. In this case POINTERUP already falls back to MOUSEUP
      // which represents both UP and CANCEL. POINTERCANCEL does not fall back
      // to MOUSEUP to prevent listening twice on the same event.
      EventType.MOUSECANCEL),
  POINTERMOVE: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTERMOVE, EventType.MSPOINTERMOVE,
      EventType.MOUSEMOVE),
  POINTEROVER: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTEROVER, EventType.MSPOINTEROVER,
      EventType.MOUSEOVER),
  POINTEROUT: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTEROUT, EventType.MSPOINTEROUT,
      EventType.MOUSEOUT),
  POINTERENTER: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTERENTER, EventType.MSPOINTERENTER,
      EventType.MOUSEENTER),
  POINTERLEAVE: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTERLEAVE, EventType.MSPOINTERLEAVE,
      EventType.MOUSELEAVE)
};
