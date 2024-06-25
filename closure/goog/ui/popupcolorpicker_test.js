/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ColorPicker } from './colorpicker.js';
import { PopupColorPicker } from './popupcolorpicker.js';
import * as dom from '../dom/dom.js';
import * as events from '../events/events.js';
import { testSuite } from '../testing/testsuite.js';
import * as testingEvents from '../testing/events/events.js';

// Unittest to ensure that the popup gets created in createDom().

// Unittest to ensure the popup opens with a custom color picker.

testSuite({
  testPopupCreation() {
    const picker = new PopupColorPicker();
    picker.createDom();
    assertNotNull(picker.getPopup());
  },

  testAutoHideIsSetProperly() {
    const picker = new PopupColorPicker();
    picker.createDom();
    picker.setAutoHide(true);
    const containingDiv = dom.getElement('containingDiv');
    picker.setAutoHideRegion(containingDiv);
    assertTrue(picker.getAutoHide());
    assertEquals(containingDiv, picker.getAutoHideRegion());
  },

  testCustomColorPicker() {
    const button1 = document.getElementById('button1');
    const domHelper = dom.getDomHelper();
    const colorPicker = new ColorPicker();
    colorPicker.setColors(['#ffffff', '#000000']);
    const picker = new PopupColorPicker(domHelper, colorPicker);
    picker.render();
    picker.attach(button1);
    assertNotNull(picker.getColorPicker());
    assertNotNull(picker.getPopup().getElement());
    assertNull(picker.getSelectedColor());

    let changeEvents = 0;
    events.listen(picker, ColorPicker.EventType.CHANGE, (e) => {
      changeEvents++;
    });

    // Select the first color.
    testingEvents.fireClickSequence(button1);
    testingEvents.fireClickSequence(
        document.getElementById('goog-palette-cell-0').firstChild);
    assertEquals('#ffffff', picker.getSelectedColor());
    assertEquals(1, changeEvents);
  },
});
