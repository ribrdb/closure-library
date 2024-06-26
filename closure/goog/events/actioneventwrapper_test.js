/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { EventHandler } from './eventhandler.js';
import { KeyCodes } from './keycodes.js';
import { Role } from '../a11y/aria/roles.js';
import { ActionEventWrapper_, actionEventWrapper } from './actioneventwrapper.js';
import * as aria from '../a11y/aria/aria.js';
import * as googEvents from './events.js';
import { testSuite } from '../testing/testsuite.js';
import * as testingEvents from '../testing/events/events.js';
import { EventType } from './eventtype.js';

let a;
let buttonEl;
let eh;
let events;

class Foo {
  test(e) {
    events.push(e);
  }
}

function assertListenersExist(el, listenerCount, capt) {
  /** @suppress {visibility} suppression added to enable type checking */
  const EVENT_TYPES = ActionEventWrapper_.EVENT_TYPES_;
  for (let i = 0; i < EVENT_TYPES.length; ++i) {
    assertEquals(
        listenerCount,
        googEvents.getListeners(el, EVENT_TYPES[i], capt).length);
  }
}

testSuite({
  setUpPage() {
    a = document.getElementById('a');
    buttonEl = document.getElementById('button');
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  setUp() {
    events = [];
    eh = new EventHandler();

    assertEquals(
        'No listeners registered yet', 0, googEvents.getListeners(a).length);
  },

  tearDown() {
    eh.dispose();
  },

  testAddActionListener() {
    const listener = (e) => {
      events.push(e);
    };
    googEvents.listenWithWrapper(a, actionEventWrapper, listener);

    assertListenersExist(a, 1, false);

    testingEvents.fireClickSequence(a);
    assertEquals('1 event should have been dispatched', 1, events.length);
    assertEquals('Should be an click event', 'click', events[0].type);

    testingEvents.fireKeySequence(a, KeyCodes.ENTER);
    assertEquals('2 events should have been dispatched', 2, events.length);
    assertEquals('Should be a keypress event', 'keypress', events[1].type);

    aria.setRole(
        /** @type {!Element} */ (a), Role.BUTTON);
    testingEvents.fireKeySequence(a, KeyCodes.SPACE);
    assertEquals('3 events should have been dispatched', 3, events.length);
    assertEquals('Should be a keyup event', 'keyup', events[2].type);
    assertTrue('Should be default prevented.', events[2].defaultPrevented);
    aria.removeRole(/** @type {!Element} */ (a));

    testingEvents.fireKeySequence(a, KeyCodes.SPACE);
    assertEquals('3 events should have been dispatched', 3, events.length);

    testingEvents.fireKeySequence(a, KeyCodes.ESC);
    assertEquals('3 events should have been dispatched', 3, events.length);

    aria.setRole(
        /** @type {!Element} */ (a), Role.TAB);
    testingEvents.fireKeySequence(a, KeyCodes.SPACE);
    assertEquals('4 events should have been dispatched', 4, events.length);
    assertEquals('Should be a keyup event', 'keyup', events[2].type);
    assertTrue('Should be default prevented.', events[2].defaultPrevented);
    aria.removeRole(/** @type {!Element} */ (a));

    testingEvents.fireKeySequence(a, KeyCodes.SPACE);
    assertEquals('4 events should have been dispatched', 4, events.length);

    testingEvents.fireKeySequence(a, KeyCodes.ESC);
    assertEquals('4 events should have been dispatched', 4, events.length);

    googEvents.unlistenWithWrapper(a, actionEventWrapper, listener);
    assertListenersExist(a, 0, false);
  },

  testAddActionListenerForHandleEvent() {
    const listener = {
      handleEvent: function(e) {
        events.push(e);
      },
    };
    googEvents.listenWithWrapper(a, actionEventWrapper, listener);

    assertListenersExist(a, 1, false);

    testingEvents.fireClickSequence(a);
    assertEquals('1 event should have been dispatched', 1, events.length);
    assertEquals('Should be an click event', 'click', events[0].type);

    testingEvents.fireKeySequence(a, KeyCodes.ENTER);
    assertEquals('2 events should have been dispatched', 2, events.length);
    assertEquals('Should be a keypress event', 'keypress', events[1].type);

    aria.setRole(
        /** @type {!Element} */ (a), Role.BUTTON);
    testingEvents.fireKeySequence(a, KeyCodes.SPACE);
    assertEquals('3 events should have been dispatched', 3, events.length);
    assertEquals('Should be a keyup event', 'keyup', events[2].type);
    assertTrue('Should be default prevented.', events[2].defaultPrevented);
    aria.removeRole(/** @type {!Element} */ (a));

    testingEvents.fireKeySequence(a, KeyCodes.SPACE);
    assertEquals('3 events should have been dispatched', 3, events.length);

    testingEvents.fireKeySequence(a, KeyCodes.ESC);
    assertEquals('3 events should have been dispatched', 3, events.length);

    googEvents.unlistenWithWrapper(a, actionEventWrapper, listener);
    assertListenersExist(a, 0, false);
  },

  testAddActionListenerInCaptPhase() {
    let count = 0;
    const captListener = (e) => {
      events.push(e);
      assertEquals(0, count);
      count++;
    };

    const bubbleListener = (e) => {
      events.push(e);
      assertEquals(1, count);
      count = 0;
    };

    googEvents.listenWithWrapper(a, actionEventWrapper, captListener, true);

    googEvents.listenWithWrapper(a, actionEventWrapper, bubbleListener);

    assertListenersExist(a, 1, false);
    assertListenersExist(a, 1, true);

    testingEvents.fireClickSequence(a);
    assertEquals('2 event should have been dispatched', 2, events.length);
    assertEquals('Should be an click event', 'click', events[0].type);

    testingEvents.fireKeySequence(a, KeyCodes.ENTER);
    assertEquals('4 events should have been dispatched', 4, events.length);
    assertEquals('Should be a keypress event', 'keypress', events[2].type);

    testingEvents.fireKeySequence(a, KeyCodes.SPACE);
    assertEquals('4 events should have been dispatched', 4, events.length);

    testingEvents.fireKeySequence(a, KeyCodes.ESC);
    assertEquals('4 events should have been dispatched', 4, events.length);

    googEvents.unlistenWithWrapper(a, actionEventWrapper, captListener, true);
    googEvents.unlistenWithWrapper(a, actionEventWrapper, bubbleListener);

    assertListenersExist(a, 0, false);
    assertListenersExist(a, 0, true);
  },

  testRemoveActionListener() {
    const listener1 = (e) => {
      events.push(e);
    };
    const listener2 = (e) => {
      events.push({type: 'err'});
    };

    googEvents.listenWithWrapper(a, actionEventWrapper, listener1);
    assertListenersExist(a, 1, false);

    googEvents.listenWithWrapper(a, actionEventWrapper, listener2);
    assertListenersExist(a, 2, false);

    testingEvents.fireKeySequence(a, KeyCodes.ENTER);
    assertEquals('2 events should have been dispatched', 2, events.length);
    assertEquals('Should be a keypress event', 'keypress', events[0].type);
    assertEquals('Should be an err event', 'err', events[1].type);

    googEvents.unlistenWithWrapper(a, actionEventWrapper, listener2);
    assertListenersExist(a, 1, false);

    events = [];
    testingEvents.fireKeySequence(a, KeyCodes.ENTER);
    assertEquals('1 event should have been dispatched', 1, events.length);
    assertEquals('Should be a keypress event', 'keypress', events[0].type);

    googEvents.unlistenWithWrapper(a, actionEventWrapper, listener1);
    assertListenersExist(a, 0, false);
  },

  testEventHandlerActionListener() {
    const listener = (e) => {
      events.push(e);
    };
    eh.listenWithWrapper(a, actionEventWrapper, listener);

    assertListenersExist(a, 1, false);

    testingEvents.fireClickSequence(a);
    assertEquals('1 event should have been dispatched', 1, events.length);
    assertEquals('Should be an click event', 'click', events[0].type);

    testingEvents.fireKeySequence(a, KeyCodes.ENTER);
    assertEquals('2 events should have been dispatched', 2, events.length);
    assertEquals('Should be a keypress event', 'keypress', events[1].type);

    testingEvents.fireKeySequence(a, KeyCodes.SPACE);
    assertEquals('2 events should have been dispatched', 2, events.length);

    testingEvents.fireKeySequence(a, KeyCodes.ESC);
    assertEquals('2 events should have been dispatched', 2, events.length);

    eh.unlistenWithWrapper(a, actionEventWrapper, listener);
    assertListenersExist(a, 0, false);
  },

  testEventHandlerActionListenerWithScope() {
    const foo = new Foo();
    const eh2 = new EventHandler(foo);

    eh2.listenWithWrapper(a, actionEventWrapper, foo.test);

    assertListenersExist(a, 1, false);

    testingEvents.fireClickSequence(a);
    assertEquals('1 event should have been dispatched', 1, events.length);
    assertEquals('Should be an click event', 'click', events[0].type);

    testingEvents.fireKeySequence(a, KeyCodes.ENTER);
    assertEquals('2 events should have been dispatched', 2, events.length);
    assertEquals('Should be a keypress event', 'keypress', events[1].type);

    testingEvents.fireKeySequence(a, KeyCodes.SPACE);
    assertEquals('2 events should have been dispatched', 2, events.length);

    testingEvents.fireKeySequence(a, KeyCodes.ESC);
    assertEquals('2 events should have been dispatched', 2, events.length);

    eh2.dispose();
    assertListenersExist(a, 0, false);
  },

  testBlockBrowserScrollInteractableRole() {
    const listener = (e) => {
      events.push(e);
    };
    eh.listenWithWrapper(buttonEl, actionEventWrapper, e => {});
    eh.listen(
        buttonEl,
        [
          EventType.KEYDOWN,
          EventType.KEYUP,
        ],
        listener);

    testingEvents.fireKeySequence(buttonEl, KeyCodes.SPACE);

    assertEquals(
        'KEYUP and KEYDOWN events should have been fired.', 2, events.length);
    assertTrue(
        'SPACE key events should have been default prevented.',
        events.every(e => e.defaultPrevented));
  },

  testDontPreventDefaultUnknownRole() {
    const listener = (e) => {
      events.push(e);
    };
    eh.listenWithWrapper(a, actionEventWrapper, e => {});
    eh.listen(
        a,
        [
          EventType.KEYDOWN,
          EventType.KEYUP,
        ],
        listener);

    testingEvents.fireKeySequence(a, KeyCodes.SPACE);

    assertEquals(
        'KEYUP and KEYDOWN events should have been fired.', 2, events.length);
    assertTrue(
        'SPACE key events should not have been default prevented on ' +
            'non-interactable elements.',
        events.every(e => !e.defaultPrevented));
  },
});
