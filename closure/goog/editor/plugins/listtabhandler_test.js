/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { BrowserEvent } from '../../events/browserevent.js';
import { Command } from '../command.js';
import { FieldMock } from '../../testing/editor/fieldmock.js';
import { KeyCodes } from '../../events/keycodes.js';
import { ListTabHandler } from './listtabhandler.js';
import { StrictMock } from '../../testing/strictmock.js';
import { TestHelper } from '../../testing/editor/testhelper.js';
import * as dom from '../../dom/dom.js';
import * as functions from '../../functions/functions.js';
import { testSuite } from '../../testing/testsuite.js';

let field;
let editableField;
let tabHandler;
let testHelper;

testSuite({
  setUpPage() {
    field = dom.getElement('field');
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  setUp() {
    editableField = new FieldMock();
    // Modal mode behavior tested as part of AbstractTabHandler tests.
    editableField.inModalMode = functions.FALSE;

    tabHandler = new ListTabHandler();
    tabHandler.registerFieldObject(editableField);

    testHelper = new TestHelper(field);
    testHelper.setUpEditableElement();
  },

  tearDown() {
    editableField = null;
    testHelper.tearDownEditableElement();
    tabHandler.dispose();
  },

  /** @suppress {missingProperties} suppression added to enable type checking */
  testListIndentInLi() {
    field.innerHTML = '<ul><li>Text</li></ul>';

    const testText = field.firstChild.firstChild.firstChild;  // div ul li Test
    testHelper.select(testText, 0, testText, 4);

    const event = new StrictMock(BrowserEvent);
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    event.keyCode = KeyCodes.TAB;
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    event.shiftKey = false;

    editableField.execCommand(Command.INDENT);
    event.preventDefault();

    editableField.$replay();
    event.$replay();

    assertTrue(
        'Event must be handled',
        tabHandler.handleKeyboardShortcut(event, '', false));

    editableField.$verify();
    event.$verify();
  },

  /** @suppress {missingProperties} suppression added to enable type checking */
  testListIndentContainLi() {
    field.innerHTML = '<ul><li>Text</li></ul>';

    const testText = field.firstChild.firstChild.firstChild;  // div ul li Test
    testHelper.select(field.firstChild, 0, testText, 4);

    const event = new StrictMock(BrowserEvent);
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    event.keyCode = KeyCodes.TAB;
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    event.shiftKey = false;

    editableField.execCommand(Command.INDENT);
    event.preventDefault();

    editableField.$replay();
    event.$replay();

    assertTrue(
        'Event must be handled',
        tabHandler.handleKeyboardShortcut(event, '', false));

    editableField.$verify();
    event.$verify();
  },

  /** @suppress {missingProperties} suppression added to enable type checking */
  testListOutdentInLi() {
    field.innerHTML = '<ul><li>Text</li></ul>';

    const testText = field.firstChild.firstChild.firstChild;  // div ul li Test
    testHelper.select(testText, 0, testText, 4);

    const event = new StrictMock(BrowserEvent);
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    event.keyCode = KeyCodes.TAB;
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    event.shiftKey = true;

    editableField.execCommand(Command.OUTDENT);
    event.preventDefault();

    editableField.$replay();
    event.$replay();

    assertTrue(
        'Event must be handled',
        tabHandler.handleKeyboardShortcut(event, '', false));

    editableField.$verify();
    event.$verify();
  },

  /** @suppress {missingProperties} suppression added to enable type checking */
  testListOutdentContainLi() {
    field.innerHTML = '<ul><li>Text</li></ul>';

    const testText = field.firstChild.firstChild.firstChild;  // div ul li Test
    testHelper.select(field.firstChild, 0, testText, 4);

    const event = new StrictMock(BrowserEvent);
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    event.keyCode = KeyCodes.TAB;
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    event.shiftKey = true;

    editableField.execCommand(Command.OUTDENT);
    event.preventDefault();

    editableField.$replay();
    event.$replay();

    assertTrue(
        'Event must be handled',
        tabHandler.handleKeyboardShortcut(event, '', false));

    editableField.$verify();
    event.$verify();
  },

  testNoOp() {
    dom.setTextContent(field, 'Text');

    const testText = field.firstChild;
    testHelper.select(testText, 0, testText, 4);

    const event = new StrictMock(BrowserEvent);
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    event.keyCode = KeyCodes.TAB;
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    event.shiftKey = true;

    editableField.$replay();
    event.$replay();

    assertFalse(
        'Event must not be handled',
        tabHandler.handleKeyboardShortcut(event, '', false));

    editableField.$verify();
    event.$verify();
  },
});
