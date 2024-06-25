/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { EventHandler } from './eventhandler.js';
import { EventType } from './eventtype.js';
import * as events from '../testing/events/events.js';
import { Event as GoogTestingEvent } from '../testing/events/events.js';
import { InputHandler } from './inputhandler.js';
import { KeyCodes } from './keycodes.js';
import { dispose } from '../disposable/dispose.js';
import * as dom from '../dom/dom.js';
import { recordFunction } from '../testing/recordfunction.js';
import { testSuite } from '../testing/testsuite.js';
import * as userAgent from '../useragent/useragent.js';

let inputHandler;
let eventHandler;

function listenToInput(inputHandler) {
  const callback = recordFunction();
  eventHandler.listen(inputHandler, InputHandler.EventType.INPUT, callback);
  return callback;
}

function fireFakeInputEvent(input) {
  // Simulate the input event that IE fires on focus when a placeholder
  // is present.
  input.focus();
  if (userAgent.IE) {
    // IE fires an input event with keycode 0
    fireInputEvent(input, 0);
  }
}

function fireInputEvent(input, keyCode) {
  const inputEvent = new GoogTestingEvent(EventType.INPUT, input);
  inputEvent.keyCode = keyCode;
  inputEvent.charCode = keyCode;
  events.fireBrowserEvent(inputEvent);
}

testSuite({
  setUp() {
    eventHandler = new EventHandler();
  },

  tearDown() {
    dispose(inputHandler);
    dispose(eventHandler);
  },

  testInputWithPlaceholder() {
    const input = dom.getElement('input-w-placeholder');
    inputHandler = new InputHandler(input);
    const callback = listenToInput(inputHandler);
    fireFakeInputEvent(input);
    assertEquals(0, callback.getCallCount());
  },

  testInputWithPlaceholder_withValue() {
    const input = dom.getElement('input-w-placeholder');
    inputHandler = new InputHandler(input);
    const callback = listenToInput(inputHandler);
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    input.value = 'foo';
    fireFakeInputEvent(input);
    assertEquals(0, callback.getCallCount());
  },

  testInputWithPlaceholder_someKeys() {
    const input = dom.getElement('input-w-placeholder');
    inputHandler = new InputHandler(input);
    const callback = listenToInput(inputHandler);
    input.focus();
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    input.value = 'foo';

    fireInputEvent(input, KeyCodes.M);
    assertEquals(1, callback.getCallCount());
  },
});
