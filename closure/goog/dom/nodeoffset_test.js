/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { NodeOffset } from './nodeoffset.js';
import { NodeType } from './nodetype.js';
import { TagName } from './tagname.js';
import * as dom from './dom.js';
import { testSuite } from '../testing/testsuite.js';

let test1;
let test2;
let i;
let empty;

testSuite({
  setUpPage() {
    test1 = dom.getElement('test1');
    i = dom.getElement('i');
    test2 = dom.getElement('test2');
    test2.innerHTML = test1.innerHTML;
    empty = dom.getElement('empty');
  },

  /**
     @suppress {strictMissingProperties} suppression added to enable type
     checking
   */
  testElementOffset() {
    const nodeOffset = new NodeOffset(i, test1);

    const recovered = nodeOffset.findTargetNode(test2);
    assertNotNull('Should recover a node.', recovered);
    assertEquals(
        'Should recover an I node.', String(TagName.I), recovered.tagName);
    assertTrue(
        'Should recover a child of test2', dom.contains(test2, recovered));
    assertFalse(
        'Should not recover a child of test1', dom.contains(test1, recovered));

    nodeOffset.dispose();
  },

  testNodeOffset() {
    const nodeOffset = new NodeOffset(i.firstChild, test1);

    const recovered = nodeOffset.findTargetNode(test2);
    assertNotNull('Should recover a node.', recovered);
    assertEquals(
        'Should recover a text node.', NodeType.TEXT, recovered.nodeType);
    assertEquals(
        'Should  have correct contents.', 'text.', recovered.nodeValue);
    assertTrue(
        'Should recover a child of test2', dom.contains(test2, recovered));
    assertFalse(
        'Should not recover a child of test1', dom.contains(test1, recovered));

    nodeOffset.dispose();
  },

  testToString() {
    const nodeOffset = new NodeOffset(i.firstChild, test1);

    assertEquals(
        'Should have correct string representation', '3,B\n1,I\n0,#text',
        nodeOffset.toString());

    nodeOffset.dispose();
  },

  testBadRecovery() {
    const nodeOffset = new NodeOffset(i.firstChild, test1);

    const recovered = nodeOffset.findTargetNode(empty);
    assertNull('Should recover nothing.', recovered);

    nodeOffset.dispose();
  },
});
