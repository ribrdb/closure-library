/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { EventType } from './eventtype.js';
import { XhrIo } from './xhrio.js';
import { XhrIoPool } from '../testing/net/xhriopool.js';
import { XhrManager } from './xhrmanager.js';
import { dispose } from '../disposable/dispose.js';
import * as events from '../events/events.js';
import { recordFunction } from '../testing/recordfunction.js';
import { testSuite } from '../testing/testsuite.js';
const TestingNetXhrIo = goog.requireType('goog.testing.net.xhrio');

/** @type {XhrManager} */
let xhrManager;

/** @type {TestingNetXhrIo} */
let xhrIo;

testSuite({
  setUp() {
    xhrManager = new XhrManager();
    /** @suppress {visibility} suppression added to enable type checking */
    xhrManager.xhrPool_ = new XhrIoPool();
    /** @suppress {visibility} suppression added to enable type checking */
    xhrIo = xhrManager.xhrPool_.getXhr();
  },

  tearDown() {
    dispose(xhrManager);
  },

  testGetOutstandingRequestIds() {
    assertArrayEquals(
        'No outstanding requests', [], xhrManager.getOutstandingRequestIds());

    xhrManager.send('test1', '/test1');
    assertArrayEquals(
        'Single outstanding request', ['test1'],
        xhrManager.getOutstandingRequestIds());

    xhrManager.send('test2', '/test2');
    assertArrayEquals(
        'Two outstanding requests', ['test1', 'test2'],
        xhrManager.getOutstandingRequestIds());

    xhrIo.simulateResponse(200, 'data');
    assertArrayEquals(
        'Single outstanding request', ['test2'],
        xhrManager.getOutstandingRequestIds());

    xhrIo.simulateResponse(200, 'data');
    assertArrayEquals(
        'No outstanding requests', [], xhrManager.getOutstandingRequestIds());
  },

  testForceAbortQueuedRequest() {
    xhrManager.send('test', '/test');
    xhrManager.send('queued', '/queued');

    assertNotThrows(
        'Forced abort of queued request should not throw an error',
        goog.bind(xhrManager.abort, xhrManager, 'queued', true));

    assertNotThrows(
        'Forced abort of normal request should not throw an error',
        goog.bind(xhrManager.abort, xhrManager, 'test', true));
  },

  testDefaultResponseType() {
    const callback = recordFunction((e) => {
      assertEquals('test1', e.id);
      assertEquals(XhrIo.ResponseType.DEFAULT, e.xhrIo.getResponseType());
    });
    events.listenOnce(xhrManager, EventType.READY, callback);
    xhrManager.send('test1', '/test2');
    assertEquals(1, callback.getCallCount());

    xhrIo.simulateResponse(200, 'data');  // Do this to make tearDown() happy.
  },

  testNonDefaultResponseType() {
    const callback = recordFunction((e) => {
      assertEquals('test2', e.id);
      assertEquals(XhrIo.ResponseType.ARRAY_BUFFER, e.xhrIo.getResponseType());
    });
    events.listenOnce(xhrManager, EventType.READY, callback);
    xhrManager.send(
        'test2', '/test2', undefined /* opt_method */,
        undefined /* opt_content */, undefined /* opt_headers */,
        undefined /* opt_priority */, undefined /* opt_callback */,
        undefined /* opt_maxRetries */, XhrIo.ResponseType.ARRAY_BUFFER);
    assertEquals(1, callback.getCallCount());

    xhrIo.simulateResponse(200, 'data');  // Do this to make tearDown() happy.
  },
});
