/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { MockControl as AsyncMockControl } from '../testing/async/mockcontrol.js';
import { Deferred } from '../../../third_party/closure/goog/mochikit/async/deferred.js';
import { DeferredChannel } from './deferredchannel.js';
import { MockControl } from '../testing/mockcontrol.js';
import { MockMessageChannel } from '../testing/messaging/mockmessagechannel.js';
import { testSuite } from '../testing/testsuite.js';

let asyncMockControl;
let mockControl;

let deferredChannel;
let mockChannel;

let cancelled;
let deferred;

testSuite({
  setUp() {
    mockControl = new MockControl();
    asyncMockControl = new AsyncMockControl(mockControl);
    mockChannel = new MockMessageChannel(mockControl);
    cancelled = false;
    deferred = new Deferred(() => {
      cancelled = true;
    });
    deferredChannel = new DeferredChannel(deferred);
  },

  tearDown() {
    mockControl.$verifyAll();
  },

  testDeferredResolvedBeforeSend() {
    mockChannel.send('test', 'val');
    mockControl.$replayAll();
    deferred.callback(mockChannel);
    deferredChannel.send('test', 'val');
  },

  testDeferredResolvedBeforeRegister() {
    deferred.callback(mockChannel);
    deferredChannel.registerService(
        'test',
        asyncMockControl.asyncAssertEquals('passes on register', 'val'));
    mockChannel.receive('test', 'val');
  },

  testDeferredResolvedBeforeRegisterObject() {
    deferred.callback(mockChannel);
    deferredChannel.registerService(
        'test',
        asyncMockControl.asyncAssertEquals(
            'passes on register', {'key': 'val'}),
        true);
    mockChannel.receive('test', {'key': 'val'});
  },

  testDeferredResolvedBeforeRegisterDefault() {
    deferred.callback(mockChannel);
    deferredChannel.registerDefaultService(asyncMockControl.asyncAssertEquals(
        'passes on register', 'test', 'val'));
    mockChannel.receive('test', 'val');
  },

  testDeferredResolvedAfterSend() {
    mockChannel.send('test', 'val');
    mockControl.$replayAll();
    deferredChannel.send('test', 'val');
    deferred.callback(mockChannel);
  },

  testDeferredResolvedAfterRegister() {
    deferredChannel.registerService(
        'test',
        asyncMockControl.asyncAssertEquals('passes on register', 'val'));
    deferred.callback(mockChannel);
    mockChannel.receive('test', 'val');
  },

  testDeferredResolvedAfterRegisterObject() {
    deferredChannel.registerService(
        'test',
        asyncMockControl.asyncAssertEquals(
            'passes on register', {'key': 'val'}),
        true);
    deferred.callback(mockChannel);
    mockChannel.receive('test', {'key': 'val'});
  },

  testDeferredResolvedAfterRegisterDefault() {
    deferredChannel.registerDefaultService(asyncMockControl.asyncAssertEquals(
        'passes on register', 'test', 'val'));
    deferred.callback(mockChannel);
    mockChannel.receive('test', 'val');
  },

  testCancel() {
    deferredChannel.cancel();
    assertTrue(cancelled);
  },
});
