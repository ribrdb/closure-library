/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Event type for PageVisibilityMonitor.
 * @see http://www.w3.org/TR/page-visibility/
 */

import { Event } from '../../events/event.js';

import { EventType } from '../../events/eventtype.js';
import PageVisibilityState from './pagevisibilitystate.js';

/**
 * A page visibility change event.
 * @final
 */
export default class PageVisibilityEvent extends Event {
  /**
   * Constructs a new PageVisibilityEvent.
   * @param {boolean} hidden Whether the page is hidden.
   * @param {!PageVisibilityState} visibilityState A more detailed visibility
   *     state.
   */
  constructor(hidden, visibilityState) {
    super(EventType.VISIBILITYCHANGE);

    /**
     * Whether the page is hidden.
     * @type {boolean}
     */
    this.hidden = hidden;

    /**
     * A more detailed visibility state.
     * @type {!PageVisibilityState}
     */
    this.visibilityState = visibilityState;
  }
}
