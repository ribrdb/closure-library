/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview
 * @suppress {missingRequire} Stubbing goog.net.XhrIo
 */

goog.setTestOnly();

import { MockControl } from '../../testing/mockcontrol.js';
import { XhrIo } from '../../testing/net/xhrio.js';
import { RemoteArrayMatcher } from './remotearraymatcher.js';

/** @suppress {extraRequire} */
import * as xhrio from '../../net/xhrio.js';

import { testSuite } from '../../testing/testsuite.js';

const url = 'http://www.google.com';
const token = 'goog';
const maxMatches = 5;
const fullToken = 'google';

const responseJsonText = '["eric", "larry", "sergey", "marissa", "pupius"]';
const responseJson = JSON.parse(responseJsonText);

let mockControl;
let mockMatchHandler;

testSuite({
  setUp() {
    xhrio.$set('XhrIo', /** @type {?} */ (XhrIo));
    mockControl = new MockControl();
    mockMatchHandler = mockControl.createFunctionMock();
  },

  /**
     @suppress {checkTypes,visibility,strictMissingProperties} suppression
     added to enable type checking
   */
  testRequestMatchingRows_noSimilarTrue() {
    const matcher = new RemoteArrayMatcher(url);
    mockMatchHandler(token, responseJson);
    mockControl.$replayAll();
    matcher.requestMatchingRows(token, maxMatches, mockMatchHandler, fullToken);
    matcher.xhr_.simulateResponse(200, responseJsonText);
    mockControl.$verifyAll();
    mockControl.$resetAll();
  },

  /**
     @suppress {checkTypes,visibility,strictMissingProperties} suppression
     added to enable type checking
   */
  testRequestMatchingRows_twoCalls() {
    const matcher = new RemoteArrayMatcher(url);

    const dummyMatchHandler = mockControl.createFunctionMock();

    mockMatchHandler(token, responseJson);
    mockControl.$replayAll();

    matcher.requestMatchingRows(
        token, maxMatches, dummyMatchHandler, fullToken);

    matcher.requestMatchingRows(token, maxMatches, mockMatchHandler, fullToken);
    matcher.xhr_.simulateResponse(200, responseJsonText);
    mockControl.$verifyAll();
    mockControl.$resetAll();
  },
});
