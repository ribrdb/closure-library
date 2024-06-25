/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { CharPicker } from './charpicker.js';
import { CharPickerData } from '../i18n/charpickerdata.js';
import { EventType } from '../events/eventtype.js';
import { FlatButtonRenderer } from './flatbuttonrenderer.js';
import { Event as GoogEvent } from '../events/event.js';
import { MockControl } from '../testing/mockcontrol.js';
import { NameFetcher } from '../i18n/uchar/namefetcher.js';
import { State } from '../a11y/aria/attributes.js';
import * as aria from '../a11y/aria/aria.js';
import { dispose } from '../disposable/dispose.js';
import * as dom from '../dom/dom.js';
import * as events from '../testing/events/events.js';
import * as mockmatchers from '../testing/mockmatchers.js';
import { testSuite } from '../testing/testsuite.js';

let charPicker;
let charPickerData;
let charPickerElement;

let charNameFetcherMock;
let mockControl;

testSuite({
  setUp() {
    mockControl = new MockControl();
    charNameFetcherMock = mockControl.createLooseMock(
        NameFetcher, true /* opt_ignoreUnexpectedCalls */);

    charPickerData = new CharPickerData();
    charPickerElement = dom.getElement('charpicker');

    /** @suppress {checkTypes} suppression added to enable type checking */
    charPicker = new CharPicker(charPickerData, charNameFetcherMock);
  },

  tearDown() {
    dispose(charPicker);
    dom.removeChildren(charPickerElement);
    mockControl.$tearDown();
  },

  /**
     @suppress {missingProperties,checkTypes} suppression added to enable type
     checking
   */
  testAriaLabelIsUpdatedOnFocus() {
    const character = '←';
    const characterName = 'right arrow';

    charNameFetcherMock.getName(character, mockmatchers.isFunction)
        .$does((c, callback) => {
          callback(characterName);
        });

    mockControl.$replayAll();

    charPicker.decorate(charPickerElement);

    // Get the first button elements within the grid div and override its
    // char attribute so the test doesn't depend on the actual grid content.
    const gridElement = dom.getElementByClass(
        goog.getCssName('goog-char-picker-grid'), charPickerElement);
    const buttonElement =
        dom.getElementsByClass(FlatButtonRenderer.CSS_CLASS, gridElement)[0];
    buttonElement.setAttribute('char', character);

    // Trigger a focus event on the button element.
    events.fireBrowserEvent(new GoogEvent(EventType.FOCUS, buttonElement));

    mockControl.$verifyAll();

    const ariaLabel = aria.getState(buttonElement, State.LABEL);
    assertEquals(
        'The aria label should be updated when the button' +
            'gains focus.',
        characterName, ariaLabel);
  },
});
