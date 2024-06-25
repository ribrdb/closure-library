/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventType } from './eventtype.js';

import * as eventTypeHelpers from './eventtypehelpers.js';


/**
 * Constants for pointer event names that fall back to corresponding touch event
 * names on unsupported platforms. These are intended to be drop-in replacements
 * for corresponding values in `EventType`.
 * @enum {string}
 */
export var PointerTouchFallbackEventType = {
  POINTERDOWN: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTERDOWN, EventType.MSPOINTERDOWN,
      EventType.TOUCHSTART),
  POINTERUP: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTERUP, EventType.MSPOINTERUP,
      EventType.TOUCHEND),
  POINTERCANCEL: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTERCANCEL,
      EventType.MSPOINTERCANCEL, EventType.TOUCHCANCEL),
  POINTERMOVE: eventTypeHelpers.getPointerFallbackEventName(
      EventType.POINTERMOVE, EventType.MSPOINTERMOVE,
      EventType.TOUCHMOVE)
};
