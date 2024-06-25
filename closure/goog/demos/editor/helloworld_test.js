/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly('goog.demos.editor.HelloWorldTest');

import { FieldMock } from '../../testing/editor/fieldmock.js';
import { HelloWorld } from './helloworld.js';
import { TestHelper } from '../../testing/editor/testhelper.js';
import * as googDom from '../../dom/dom.js';
import * as googUserAgent from '../../useragent/useragent.js';
import { testSuite } from '../../testing/testsuite.js';

let FIELD;
let plugin;
let fieldMock;
let testHelper;

testSuite({
  setUpPage() {
    FIELD = googDom.getElement('field');
    testHelper = new TestHelper(FIELD);
  },

  setUp() {
    testHelper.setUpEditableElement();
    FIELD.focus();
    plugin = new HelloWorld();
    fieldMock = /** @type {?} */ (new FieldMock());
    plugin.registerFieldObject(fieldMock);
  },

  tearDown() {
    testHelper.tearDownEditableElement();
  },

  testIsSupportedCommand() {
    fieldMock.$replay();
    assertTrue(
        '+helloWorld should be suported',
        plugin.isSupportedCommand('+helloWorld'));
    assertFalse(
        'other commands should not be supported',
        plugin.isSupportedCommand('blah'));
    fieldMock.$verify();
  },

  testExecCommandInternal() {
    // fails on Firefox
    if (googUserAgent.GECKO) {
      return;
    }

    fieldMock.$replay();
    /** @suppress {visibility} suppression added to enable type checking */
    const result = plugin.execCommandInternal(HelloWorld.COMMAND.HELLO_WORLD);
    assertUndefined(result);
    const spans = FIELD.getElementsByTagName('span');
    assertEquals(1, spans.length);
    const helloWorldSpan = spans.item(0);
    assertEquals('Hello World!', googDom.getTextContent(helloWorldSpan));
    fieldMock.$verify();
  },
});
