/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { PropertyReplacer } from '../testing/propertyreplacer.js';
import { StrictMock } from '../testing/strictmock.js';
import * as asserts from './asserts.js';
import { testSuite } from '../testing/testsuite.js';

let stubs;

testSuite({
  setUpPage() {
    stubs = new PropertyReplacer();
  },

  tearDown() {
    stubs.reset();
  },

  testAssertIsLocation() {
    assertNotThrows(() => {
      asserts.assertIsLocation(window.location);
    });

    // Ad-hoc mock objects are allowed.
    const o = {foo: 'bar'};
    assertNotThrows(() => {
      asserts.assertIsLocation(o);
    });

    // So are fancy mocks.
    const mock = new StrictMock(window.location);
    assertNotThrows(() => {
      asserts.assertIsLocation(mock);
    });

    const linkElement = document.createElement('LINK');
    const ex = assertThrows(() => {
      asserts.assertIsLocation(linkElement);
    });
    assertContains('Argument is not a Location', ex.message);
  },
});
