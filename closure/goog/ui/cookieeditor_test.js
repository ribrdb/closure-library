/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { CookieEditor } from './cookieeditor.js';
import { Cookies } from '../net/cookies.js';
import { EventType } from '../events/eventtype.js';
import { Event as GoogEvent } from '../events/event.js';
import * as dom from '../dom/dom.js';
import * as events from '../testing/events/events.js';
import { testSuite } from '../testing/testsuite.js';

const COOKIE_KEY = 'my_fabulous_cookie';
const cookies = Cookies.getInstance();

/** @suppress {visibility} suppression added to enable type checking */
function newCookieEditor(cookieValue = undefined) {
  // Set cookie.
  if (cookieValue) {
    cookies.set(COOKIE_KEY, cookieValue);
  }

  // Render editor.
  const editor = new CookieEditor();
  editor.selectCookie(COOKIE_KEY);
  editor.render(dom.getElement('test_container'));
  assertEquals(
      'wrong text area value', cookieValue || '',
      editor.textAreaElem_.value || '');

  return editor;
}

testSuite({
  setUp() {
    dom.removeChildren(dom.getElement('test_container'));
    cookies.remove(COOKIE_KEY);
  },

  testRender() {
    // Render editor.
    const editor = newCookieEditor();

    // All expected elements created?
    const elem = editor.getElement();
    assertNotNullNorUndefined('missing element', elem);
    assertNotNullNorUndefined('missing clear button', editor.clearButtonElem_);
    assertNotNullNorUndefined(
        'missing update button', editor.updateButtonElem_);
    assertNotNullNorUndefined('missing text area', editor.textAreaElem_);
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testEditCookie() {
    // Render editor.
    const editor = newCookieEditor();

    // Invalid value.
    let newValue = 'my bad value;';
    editor.textAreaElem_.value = newValue;
    events.fireBrowserEvent(
        new GoogEvent(EventType.CLICK, editor.updateButtonElem_));
    assertTrue('unexpected cookie value', !cookies.get(COOKIE_KEY));

    // Valid value.
    newValue = 'my fabulous value';
    editor.textAreaElem_.value = newValue;
    events.fireBrowserEvent(
        new GoogEvent(EventType.CLICK, editor.updateButtonElem_));
    assertEquals('wrong cookie value', newValue, cookies.get(COOKIE_KEY));
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testClearCookie() {
    // Render editor.
    const value = 'I will be cleared';
    const editor = newCookieEditor(value);

    // Clear value.
    events.fireBrowserEvent(
        new GoogEvent(EventType.CLICK, editor.clearButtonElem_));
    assertTrue('unexpected cookie value', !cookies.get(COOKIE_KEY));
  },
});
