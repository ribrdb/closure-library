/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { AncestorIterator, ChildIterator, SiblingIterator } from './iter.js';
import { NodeType } from './nodetype.js';
import * as dom from './dom.js';
import { testSuite } from '../testing/testsuite.js';
import * as testingDom from '../testing/dom.js';

let test;
let br;

testSuite({
  setUpPage() {
    test = dom.getElement('test');
    br = dom.getElement('br');
  },

  testNextSibling() {
    const expectedContent = ['#br', 'def'];
    testingDom.assertNodesMatch(
        new SiblingIterator(test.firstChild), expectedContent);
  },

  testNextSiblingInclusive() {
    const expectedContent = ['abc', '#br', 'def'];
    testingDom.assertNodesMatch(
        new SiblingIterator(test.firstChild, true), expectedContent);
  },

  testPreviousSibling() {
    const expectedContent = ['#br', 'abc'];
    testingDom.assertNodesMatch(
        new SiblingIterator(test.lastChild, false, true), expectedContent);
  },

  testPreviousSiblingInclusive() {
    const expectedContent = ['def', '#br', 'abc'];
    testingDom.assertNodesMatch(
        new SiblingIterator(test.lastChild, true, true), expectedContent);
  },

  testChildIterator() {
    const expectedContent = ['abc', '#br', 'def'];
    testingDom.assertNodesMatch(new ChildIterator(test), expectedContent);
  },

  testChildIteratorIndex() {
    const expectedContent = ['#br', 'def'];
    testingDom.assertNodesMatch(
        new ChildIterator(test, false, 1), expectedContent);
  },

  testChildIteratorReverse() {
    const expectedContent = ['def', '#br', 'abc'];
    testingDom.assertNodesMatch(new ChildIterator(test, true), expectedContent);
  },

  testEmptyChildIteratorReverse() {
    const expectedContent = [];
    testingDom.assertNodesMatch(new ChildIterator(br, true), expectedContent);
  },

  testChildIteratorIndexReverse() {
    const expectedContent = ['#br', 'abc'];
    testingDom.assertNodesMatch(
        new ChildIterator(test, true, 1), expectedContent);
  },

  testAncestorIterator() {
    const expectedContent = ['#test', '#body', '#html', NodeType.DOCUMENT];
    testingDom.assertNodesMatch(new AncestorIterator(br), expectedContent);
  },

  testAncestorIteratorInclusive() {
    const expectedContent =
        ['#br', '#test', '#body', '#html', NodeType.DOCUMENT];
    testingDom.assertNodesMatch(
        new AncestorIterator(br, true), expectedContent);
  },
});
