/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ContentEditableField } from './contenteditablefield.js';
import { SafeHtml } from '../html/safehtml.js';
import * as googDom from '../dom/dom.js';
import { testSuite } from '../testing/testsuite.js';


const HTML = '<div id="testField">I am text.</div>';

globalThis.FieldConstructor = ContentEditableField;

testSuite({
  setUp() {
    googDom.getElement('parent').innerHTML = HTML;
    assertTrue(
        'FieldConstructor should be set by the test HTML file',
        typeof FieldConstructor === 'function');
  },

  testNoIframeAndSameElement() {
    const field = new ContentEditableField('testField');
    field.makeEditable();
    assertFalse(field.usesIframe());
    assertEquals(
        'Original element should equal field element',
        field.getOriginalElement(), field.getElement());
    assertEquals(
        'Sanity check on original element', 'testField',
        field.getOriginalElement().id);
    assertEquals(
        'Editable document should be same as main document', document,
        field.getEditableDomHelper().getDocument());
    field.dispose();
  },

  testMakeEditableAndUnEditable() {
    const elem = googDom.getElement('testField');
    googDom.setTextContent(elem, 'Hello world');
    const field = new ContentEditableField('testField');

    field.makeEditable();
    assertEquals('true', String(elem.contentEditable));
    assertEquals('Hello world', googDom.getTextContent(elem));
    field.setSafeHtml(
        false /* addParas */, SafeHtml.htmlEscape('Goodbye world'));
    assertEquals('Goodbye world', googDom.getTextContent(elem));

    field.makeUneditable();
    assertNotEquals('true', String(elem.contentEditable));
    assertEquals('Goodbye world', googDom.getTextContent(elem));
    field.dispose();
  },
});
