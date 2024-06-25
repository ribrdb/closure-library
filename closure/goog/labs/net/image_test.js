/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Unit tests for goog.labs.net.Image. */

goog.setTestOnly();

import { TestCase } from '../../testing/testcase.js';
import * as googString from '../../string/string.js';
import * as netImage from './image.js';
import { recordFunction } from '../../testing/recordfunction.js';
import { testSuite } from '../../testing/testsuite.js';

testSuite({
  setUpPage() {
    TestCase.getActiveTestCase().promiseTimeout = 10000;  // 10s
  },

  testValidImage() {
    const url = 'testdata/cleardot.gif';

    return netImage.load(url).then((value) => {
      assertEquals('IMG', value.tagName);
      assertTrue(googString.endsWith(value.src, url));
    });
  },

  testInvalidImage() {
    const url = 'testdata/invalid.gif';  // This file does not exist.

    return netImage.load(url).then(
        () => {
          fail('Invalid image should not resolve');
        },
        (errResult) => {
          assertNull(errResult);
        });
  },

  testImageFactory() {
    const returnedImage = new Image();
    const factory = () => returnedImage;
    const countedFactory = recordFunction(factory);

    const url = 'testdata/cleardot.gif';

    return netImage.load(url, countedFactory).then((value) => {
      assertEquals(returnedImage, value);
      assertEquals(1, countedFactory.getCallCount());
    });
  },

  testExistingImage() {
    const image = new Image();

    const url = 'testdata/cleardot.gif';

    return netImage.load(url, image).then((value) => {
      assertEquals(image, value);
    });
  },
});
