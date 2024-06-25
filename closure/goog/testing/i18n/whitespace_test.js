/**
 * @fileoverview Tests for whitespace module functions.
 */
goog.setTestOnly();

import { testSuite } from '../testsuite.js';
import { assertEquals } from '../asserts.js';
import { removeWhitespace } from './whitespace.js';

testSuite({
  testWhitespaceNormalization() {
    assertEquals('', removeWhitespace('\u1680'));
    assertEquals('ab', removeWhitespace('a\u3000b'));
    assertEquals('abc', removeWhitespace('\ta\u00a0\u0020b\u205fc'));
    assertEquals('xy', removeWhitespace('x\u0020y'));
    assertEquals('xy', removeWhitespace('x\u202fy'));
    assertEquals('xy', removeWhitespace('x\t\u00a0y'));
  },
});
