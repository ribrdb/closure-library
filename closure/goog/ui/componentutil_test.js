/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Component } from './component.js';
import * as ComponentUtil from './componentutil.js';
import { MouseAsMouseEventType } from '../events/mouseasmouseeventtype.js';
import { PointerAsMouseEventType } from '../events/pointerasmouseeventtype.js';
import { testSuite } from '../testing/testsuite.js';

let component;

testSuite({
  setUp() {
    component = new Component();
  },

  tearDown() {
    component.dispose();
  },

  testGetMouseEventType() {
    component.setPointerEventsEnabled(false);
    assertEquals(
        'Component must use mouse events when specified.',
        ComponentUtil.getMouseEventType(component), MouseAsMouseEventType);

    component.setPointerEventsEnabled(true);
    assertEquals(
        'Component must use pointer events when specified.',
        ComponentUtil.getMouseEventType(component), PointerAsMouseEventType);
  },
});
