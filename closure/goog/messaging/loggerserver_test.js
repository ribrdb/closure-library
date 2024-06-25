/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import * as googLog from '../log/log.js';
import * as googLog_0 from '../log/log.js';
import * as log from '../log/log.js';
const Level = googLog.Level;
const Logger = googLog_0.Logger;
import { LoggerServer } from './loggerserver.js';
import { MockControl } from '../testing/mockcontrol.js';
import { MockMessageChannel } from '../testing/messaging/mockmessagechannel.js';
import { PropertyReplacer } from '../testing/propertyreplacer.js';
import { testSuite } from '../testing/testsuite.js';

let mockControl;
let channel;
let stubs;

testSuite({
  setUpPage() {
    stubs = new PropertyReplacer();
  },

  setUp() {
    mockControl = new MockControl();
    channel = new MockMessageChannel(mockControl);
    stubs.set(
        log, 'getLogger', mockControl.createFunctionMock('goog.log.getLogger'));
    stubs.set(log, 'log', mockControl.createFunctionMock('goog.log.log'));
  },

  tearDown() {
    channel.dispose();
    stubs.reset();
  },

  /** @suppress {missingProperties} suppression added to enable type checking */
  testCommandWithoutChannelName() {
    const mockLogger = mockControl.createStrictMock(Logger);
    log.getLogger('test.object.Name').$returns(mockLogger);
    log.log(mockLogger, Level.SEVERE, '[remote logger] foo bar', null).$once();
    mockControl.$replayAll();

    const server = new LoggerServer(channel, 'log');
    channel.receive('log', {
      name: 'test.object.Name',
      level: Level.SEVERE.value,
      message: 'foo bar',
      exception: null,
    });
    mockControl.$verifyAll();
    server.dispose();
  },

  /** @suppress {missingProperties} suppression added to enable type checking */
  testCommandWithChannelName() {
    const mockLogger = mockControl.createStrictMock(Logger);
    log.getLogger('test.object.Name').$returns(mockLogger);
    log.log(mockLogger, Level.SEVERE, '[some channel] foo bar', null).$once();
    mockControl.$replayAll();

    const server = new LoggerServer(channel, 'log', 'some channel');
    channel.receive('log', {
      name: 'test.object.Name',
      level: Level.SEVERE.value,
      message: 'foo bar',
      exception: null,
    });
    mockControl.$verifyAll();
    server.dispose();
  },

  /** @suppress {missingProperties} suppression added to enable type checking */
  testCommandWithException() {
    const mockLogger = mockControl.createStrictMock(Logger);
    log.getLogger('test.object.Name').$returns(mockLogger);
    log.log(
           mockLogger, Level.SEVERE, '[some channel] foo bar',
           {message: 'Bad things', stack: ['foo', 'bar']})
        .$once();
    mockControl.$replayAll();

    const server = new LoggerServer(channel, 'log', 'some channel');
    channel.receive('log', {
      name: 'test.object.Name',
      level: Level.SEVERE.value,
      message: 'foo bar',
      exception: {message: 'Bad things', stack: ['foo', 'bar']},
    });
    mockControl.$verifyAll();
    server.dispose();
  },
});
