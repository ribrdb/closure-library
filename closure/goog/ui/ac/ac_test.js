/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { BrowserEvent } from '../../events/browserevent.js';
import { EventType } from '../../events/eventtype.js';
import { Event as GoogEvent } from '../../events/event.js';
import { KeyCodes } from '../../events/keycodes.js';
import { MockClock } from '../../testing/mockclock.js';
import { NodeType } from '../../dom/nodetype.js';
import * as ac from './ac.js';
import * as asserts from '../../asserts/asserts.js';
import * as classlist from '../../dom/classlist.js';
import * as dom from '../../dom/dom.js';
import * as events from '../../events/events.js';
import * as selection from '../../dom/selection.js';
import * as style from '../../style/style.js';
import { testSuite } from '../../testing/testsuite.js';
import * as testingEvents from '../../testing/events/events.js';
import * as userAgent from '../../useragent/useragent.js';

let autocomplete;
const data = ['ab', 'aab', 'aaab'];
let input;
let mockClock;

//=========================================================================
// Utility methods

/**
 * Fire listeners of a given type that are listening to the event's
 * currentTarget.
 * @param {BrowserEvent} event
 * @suppress {checkTypes} suppression added to enable type checking
 */
function simulateEvent(event) {
  events.fireListeners(event.currentTarget, event.type, true, event);
  events.fireListeners(event.currentTarget, event.type, false, event);
}

/**
 * Fire all key event listeners that are listening to the input element.
 * @param {number} keyCode The key code.
 */
function simulateAllKeyEventsOnInput(keyCode) {
  testingEvents.fireKeySequence(input, keyCode);
}

/**
 * @param {string} text
 * @return {Node} Node whose inner text maches the given text.
 * @suppress {checkTypes} suppression added to enable type checking
 */
function findNodeByInnerText(text) {
  return dom.findNode(document.body, (node) => {
    try {
      /** @suppress {checkTypes} suppression added to enable type checking */
      const display = userAgent.IE ? style.getCascadedStyle(node, 'display') :
                                     style.getComputedStyle(node, 'display');

      return dom.getRawTextContent(node) == text && 'none' != display &&
          node.nodeType == NodeType.ELEMENT;
    } catch (e) {
      return false;
    }
  });
}

//=========================================================================
// Tests

testSuite({
  setUpPage() {
    ac.createSimpleAutoComplete(data, dom.getElement('user'), true, false);
  },

  setUp() {
    mockClock = new MockClock(true);
    input = dom.getElement('input');
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    input.value = '';
    autocomplete = ac.createSimpleAutoComplete(data, input, true, false);
  },

  tearDown() {
    autocomplete.dispose();
    mockClock.dispose();
  },

  /** Ensure that the display of the autocompleter works. */
  testBasicDisplay() {
    simulateAllKeyEventsOnInput(KeyCodes.DOWN);

    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    input.value = 'a';
    simulateAllKeyEventsOnInput(KeyCodes.A);
    mockClock.tick(500);

    const nodes = [
      findNodeByInnerText(data[0]),
      findNodeByInnerText(data[1]),
      findNodeByInnerText(data[2]),
    ];
    assert(!!nodes[0]);
    assert(!!nodes[1]);
    assert(!!nodes[2]);
    assert(style.isUnselectable(nodes[0]));
    assert(style.isUnselectable(nodes[1]));
    assert(style.isUnselectable(nodes[2]));

    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    input.value = 'aa';
    simulateAllKeyEventsOnInput(KeyCodes.A);
    mockClock.tick(500);

    assertFalse(!!findNodeByInnerText(data[0]));
    assert(!!findNodeByInnerText(data[1]));
    assert(!!findNodeByInnerText(data[2]));
  },

  /**
     Ensure that key navigation with multiple inputs work
     @suppress {strictMissingProperties} suppression added to enable type
     checking
   */
  testKeyNavigation() {
    simulateAllKeyEventsOnInput(KeyCodes.DOWN);

    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    input.value = 'c, a';
    selection.setCursorPosition(input, 'c, a'.length);
    simulateAllKeyEventsOnInput(KeyCodes.A);
    mockClock.tick(500);

    assert(document.body.innerHTML, !!findNodeByInnerText(data[1]));
    assert(!!findNodeByInnerText(data[2]));

    const selected = asserts.assertElement(findNodeByInnerText(data[0]));
    assertTrue(
        'Should have new standard active class',
        classlist.contains(selected, 'ac-active'));
    assertTrue(
        'Should have legacy active class',
        classlist.contains(selected, 'active'));

    simulateAllKeyEventsOnInput(KeyCodes.DOWN);
    assertFalse(classlist.contains(
        asserts.assertElement(findNodeByInnerText(data[0])), 'ac-active'));
    assert(classlist.contains(
        asserts.assertElement(findNodeByInnerText(data[1])), 'ac-active'));

    simulateAllKeyEventsOnInput(KeyCodes.ENTER);
    assertEquals('c, aab, ', input.value);
  },

  /**
     Ensure that mouse navigation with multiple inputs works.
     @suppress {checkTypes,strictMissingProperties} suppression added to enable
     type checking
   */
  testMouseNavigation() {
    simulateAllKeyEventsOnInput(KeyCodes.DOWN);

    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    input.value = 'c, a';
    selection.setCursorPosition(input, 'c, a'.length);
    simulateAllKeyEventsOnInput(KeyCodes.A);
    mockClock.tick(500);

    const secondOption = asserts.assertElement(findNodeByInnerText(data[1]));
    const parent = secondOption.parentNode;
    assertFalse(classlist.contains(secondOption, 'ac-active'));

    const mouseOver = new GoogEvent(EventType.MOUSEOVER, secondOption);
    simulateEvent(new BrowserEvent(mouseOver, parent));
    assert(classlist.contains(secondOption, 'ac-active'));

    const mouseDown = new GoogEvent(EventType.MOUSEDOWN, secondOption);
    simulateEvent(new BrowserEvent(mouseDown, parent));
    const mouseClick = new GoogEvent(EventType.CLICK, secondOption);
    simulateEvent(new BrowserEvent(mouseClick, parent));

    assertEquals('c, aab, ', input.value);
  },
});
