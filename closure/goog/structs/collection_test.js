/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { AvlTree } from './avltree.js';
import { Set as StructsSet } from './set.js';
import { testSuite } from '../testing/testsuite.js';

// Simple exercise of a collection object.
function exerciseCollection(collection) {
  assertEquals(0, collection.getCount());

  for (let i = 1; i <= 10; i++) {
    assertFalse(collection.contains(i));
    collection.add(i);
    assertTrue(collection.contains(i));
    assertEquals(i, collection.getCount());
  }

  assertEquals(10, collection.getCount());

  for (let i = 10; i > 0; i--) {
    assertTrue(collection.contains(i));
    collection.remove(i);
    assertFalse(collection.contains(i));
    assertEquals(i - 1, collection.getCount());
  }

  assertEquals(0, collection.getCount());
}
testSuite({
  testSet() {
    const set = new StructsSet();
    exerciseCollection(set);
  },

  testAvlTree() {
    const tree = new AvlTree();
    exerciseCollection(tree);
  },
});
