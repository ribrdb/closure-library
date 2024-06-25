/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { EventObserver } from './eventobserver.js';
import { Event as GoogEvent } from '../../events/event.js';
import { EventTarget as GoogEventTarget } from '../../events/eventtarget.js';
import * as googEvents from '../../events/events.js';
import { testSuite } from '../testsuite.js';

// Return an event's type
function getEventType(e) {
  return e.type;
}

testSuite({
  testGetEvents() {
    const observer = new EventObserver();
    const target = new GoogEventTarget();
    googEvents.listen(target, ['foo', 'bar', 'baz'], observer);

    const eventTypes =
        ['bar', 'baz', 'foo', 'qux', 'quux', 'corge', 'foo', 'baz'];
    eventTypes.forEach(goog.bind(target.dispatchEvent, target));

    const replayEvents = observer.getEvents();

    assertArrayEquals(
        'Only the listened-for event types should be remembered',
        ['bar', 'baz', 'foo', 'foo', 'baz'],
        observer.getEvents().map(getEventType));

    assertArrayEquals(['bar'], observer.getEvents('bar').map(getEventType));
    assertArrayEquals(
        ['baz', 'baz'], observer.getEvents('baz').map(getEventType));
    assertArrayEquals(
        ['foo', 'foo'], observer.getEvents('foo').map(getEventType));
  },

  testHandleEvent() {
    const events = [
      new GoogEvent('foo'),
      new GoogEvent('bar'),
      new GoogEvent('baz'),
    ];

    const observer = new EventObserver();
    events.forEach(goog.bind(observer.handleEvent, observer));

    assertArrayEquals(events, observer.getEvents());
    assertArrayEquals([events[0]], observer.getEvents('foo'));
    assertArrayEquals([events[1]], observer.getEvents('bar'));
    assertArrayEquals([events[2]], observer.getEvents('baz'));
  },

  testClear() {
    const event = new GoogEvent('foo');

    const observer = new EventObserver();
    observer.handleEvent(event);

    assertArrayEquals([event], observer.getEvents());

    observer.clear();

    assertArrayEquals([], observer.getEvents());

    const otherEvent = new GoogEvent('baz');
    observer.handleEvent(otherEvent);

    assertArrayEquals([otherEvent], observer.getEvents());
  },
});
