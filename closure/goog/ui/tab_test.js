/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Component } from './component.js';
import { TabRenderer } from './tabrenderer.js';
import { Tab as UiTab } from './tab.js';
import * as dom from '../dom/dom.js';
import { testSuite } from '../testing/testsuite.js';

let sandbox;
let tab;

testSuite({
  setUp() {
    sandbox = dom.getElement('sandbox');
    tab = new UiTab('Hello');
  },

  tearDown() {
    tab.dispose();
    dom.removeChildren(sandbox);
  },

  testConstructor() {
    assertNotNull('Tab must not be null', tab);
    assertEquals('Tab must have expected content', 'Hello', tab.getContent());
    assertEquals(
        'Tab\'s renderer must default to TabRenderer',
        TabRenderer.getInstance(), tab.getRenderer());
    assertTrue(
        'Tab must support the SELECTED state',
        tab.isSupportedState(Component.State.SELECTED));
    assertTrue(
        'SELECTED must be an auto-state',
        tab.isAutoState(Component.State.SELECTED));
    assertTrue(
        'Tab must dispatch transition events for the DISABLED state',
        tab.isDispatchTransitionEvents(Component.State.DISABLED));
    assertTrue(
        'Tab must dispatch transition events for the SELECTED state',
        tab.isDispatchTransitionEvents(Component.State.SELECTED));
  },

  testGetSetTooltip() {
    assertUndefined('Tooltip must be undefined by default', tab.getTooltip());
    tab.setTooltip('Hello, world!');
    assertEquals(
        'Tooltip must have expected value', 'Hello, world!', tab.getTooltip());
  },

  testSetAriaLabel() {
    assertNull('Tab must not have aria label by default', tab.getAriaLabel());
    tab.setAriaLabel('My tab');
    tab.render();
    const element = tab.getElementStrict();
    assertNotNull('Element must not be null', element);
    assertEquals(
        'Tab element must have expected aria-label', 'My tab',
        element.getAttribute('aria-label'));
    assertEquals(
        'Tab element must have expected aria role', 'tab',
        element.getAttribute('role'));
    tab.setAriaLabel('My new tab');
    assertEquals(
        'Tab element must have updated aria-label', 'My new tab',
        element.getAttribute('aria-label'));
    assertEquals(
        'Tab element must have expected aria role', 'tab',
        element.getAttribute('role'));
  },
});
