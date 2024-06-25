/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { EventMatcher } from './matchers.js';
import { Event as GoogEvent } from '../../events/event.js';
import { testSuite } from '../testsuite.js';

testSuite({
  /** @suppress {checkTypes} suppression added to enable type checking */
  testEventMatcher() {
    const matcher = new EventMatcher('foo');
    assertFalse(matcher.matches(undefined));
    assertFalse(matcher.matches(null));
    assertFalse(matcher.matches({type: 'foo'}));
    assertFalse(matcher.matches(new GoogEvent('bar')));

    assertTrue(matcher.matches(new GoogEvent('foo')));
    const FooEvent = function() {
      GoogEvent.call(this, 'foo');
    };
    goog.inherits(FooEvent, GoogEvent);
    assertTrue(matcher.matches(new FooEvent()));
  },
});
