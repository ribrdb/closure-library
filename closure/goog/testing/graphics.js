/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Testing utilities for DOM related tests.
 */

goog.setTestOnly('goog.testing.graphics');

import { Path } from '../graphics/path.js';
import * as asserts from './asserts.js';


/**
 * Array mapping numeric segment constant to a descriptive character.
 * @type {Array<string>}
 * @private
 */
var SEGMENT_NAMES_ = function() {
  var arr = [];
  arr[Path.Segment.MOVETO] = 'M';
  arr[Path.Segment.LINETO] = 'L';
  arr[Path.Segment.CURVETO] = 'C';
  arr[Path.Segment.ARCTO] = 'A';
  arr[Path.Segment.CLOSE] = 'X';
  return arr;
}();


/**
 * Test if the given path matches the expected array of commands and parameters.
 * @param {Array<string|number>} expected The expected array of commands and
 *     parameters.
 * @param {Path} path The path to test against.
 */
export function assertPathEquals(expected, path) {
  var actual = [];
  path.forEachSegment(function(seg, args) {
    actual.push(SEGMENT_NAMES_[seg]);
    Array.prototype.push.apply(actual, args);
  });
  assertEquals(expected.length, actual.length);
  for (var i = 0; i < expected.length; i++) {
    if (typeof expected[i] === 'number') {
      assertTrue(typeof actual[i] === 'number');
      assertRoughlyEquals(expected[i], actual[i], 0.01);
    } else {
      assertEquals(expected[i], actual[i]);
    }
  }
}
