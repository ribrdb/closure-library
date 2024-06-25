/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PointerTouchFallbackEventType } from './pointertouchfallbackeventtype.js';


/**
 * An alias for `goog.events.EventType.TOUCH*` event types that is overridden by
 * corresponding `POINTER*` event types.
 * @enum {string}
 */
export var PointerAsTouchEventType = {
  TOUCHCANCEL: PointerTouchFallbackEventType.POINTERCANCEL,
  TOUCHEND: PointerTouchFallbackEventType.POINTERUP,
  TOUCHMOVE: PointerTouchFallbackEventType.POINTERMOVE,
  TOUCHSTART: PointerTouchFallbackEventType.POINTERDOWN
};
