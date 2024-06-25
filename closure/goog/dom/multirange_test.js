/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { MultiRange } from './multirange.js';
import * as Range from './range.js';
import * as dom from './dom.js';
import * as iter from '../iter/iter.js';
import { testSuite } from '../testing/testsuite.js';

let range;

testSuite({
  setUp() {
    /** @suppress {checkTypes} suppression added to enable type checking */
    range = new MultiRange.createFromTextRanges([
      Range.createFromNodeContents(dom.getElement('test2')),
      Range.createFromNodeContents(dom.getElement('test1')),
    ]);
  },

  testStartAndEnd() {
    assertEquals(dom.getElement('test1').firstChild, range.getStartNode());
    assertEquals(0, range.getStartOffset());
    assertEquals(dom.getElement('test2').firstChild, range.getEndNode());
    assertEquals(6, range.getEndOffset());
  },

  /**
   * @suppress {strictMissingProperties} suppression added to enable type
   * checking
   */
  testStartAndEndIterator() {
    const it = iter.toIterator(range);
    assertEquals(dom.getElement('test1').firstChild, it.getStartNode());
    assertEquals(0, it.getStartTextOffset());
    assertEquals(dom.getElement('test2').firstChild, it.getEndNode());
    assertEquals(3, it.getEndTextOffset());

    it.next();
    it.next();
    assertEquals(6, it.getEndTextOffset());
  },

  /**
   * @suppress {strictMissingProperties} suppression added to enable type
   * checking
   */
  testStartAndEndIteratorEs6() {
    const it = iter.toIterator(range);
    assertEquals(dom.getElement('test1').firstChild, it.getStartNode());
    assertEquals(0, it.getStartTextOffset());
    assertEquals(dom.getElement('test2').firstChild, it.getEndNode());
    assertEquals(3, it.getEndTextOffset());

    it.next();
    it.next();
    assertEquals(6, it.getEndTextOffset());
  },

  testIteration() {
    const tags = iter.toArray(range);
    assertEquals(2, tags.length);

    assertEquals(dom.getElement('test1').firstChild, tags[0]);
    assertEquals(dom.getElement('test2').firstChild, tags[1]);
  },
});
