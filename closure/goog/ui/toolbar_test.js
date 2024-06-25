/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { EventType } from '../events/eventtype.js';
import * as events from '../testing/events/events.js';
import { Event as GoogTestingEvent } from '../testing/events/events.js';
import { Toolbar } from './toolbar.js';
import { ToolbarMenuButton } from './toolbarmenubutton.js';
import * as aria from '../a11y/aria/aria.js';
import * as dom from '../dom/dom.js';
import { testSuite } from '../testing/testsuite.js';

let toolbar;
let toolbarWrapper;
let buttons;

testSuite({
  setUp() {
    toolbar = new Toolbar();
    toolbarWrapper = dom.getElement('toolbar-wrapper');

    // Render and populate the toolbar.
    toolbar.render(toolbarWrapper);
    const toolbarElem = toolbar.getElement();
    const button1 = new ToolbarMenuButton('button 1');
    const button2 = new ToolbarMenuButton('button 2');
    const button3 = new ToolbarMenuButton('button 3');
    button1.render(toolbarElem);
    button2.render(toolbarElem);
    button3.render(toolbarElem);
    toolbar.addChild(button1);
    toolbar.addChild(button2);
    toolbar.addChild(button3);
    buttons = [button1, button2, button3];
  },

  tearDown() {
    toolbar.dispose();
  },

  testHighlightFirstOnFocus() {
    const firstButton = buttons[0];

    // Verify that focusing the toolbar via the keyboard (i.e. no click event)
    // highlights the first item and sets it as the active descendant.
    events.fireFocusEvent(toolbar.getElement());
    assertEquals(0, toolbar.getHighlightedIndex());
    assertTrue(firstButton.isHighlighted());
    assertEquals(
        firstButton.getElement(),
        aria.getActiveDescendant(toolbar.getElement()));

    // Verify that removing focus unhighlights the first item and removes it as
    // the active descendant.
    events.fireBlurEvent(toolbar.getElement());
    assertEquals(-1, toolbar.getHighlightedIndex());
    assertNull(aria.getActiveDescendant(toolbar.getElement()));
    assertFalse(firstButton.isHighlighted());
  },

  testHighlightSelectedOnClick() {
    const firstButton = buttons[0];
    const secondButton = buttons[1];

    // Verify that mousing over and clicking on a toolbar button selects only
    // the correct item.
    const mouseover =
        new GoogTestingEvent(EventType.MOUSEOVER, secondButton.getElement());
    events.fireBrowserEvent(mouseover);
    const mousedown =
        new GoogTestingEvent(EventType.MOUSEDOWN, toolbar.getElement());
    events.fireBrowserEvent(mousedown);
    assertEquals(1, toolbar.getHighlightedIndex());
    assertTrue(secondButton.isHighlighted());
    assertFalse(firstButton.isHighlighted());
    assertEquals(
        secondButton.getElement(),
        aria.getActiveDescendant(toolbar.getElement()));
  },
});
