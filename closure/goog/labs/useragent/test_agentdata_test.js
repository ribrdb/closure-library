/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Unit tests for userAgentBrowser. */

goog.setTestOnly();

import { testSuite } from '../../testing/testsuite.js';
import { INCOMPLETE_USERAGENT_DATA, withHighEntropyData } from './test_agentdata.js';

testSuite({
  async testGetHighEntropyValuesRejectsByDefault() {
    await assertRejects(
        INCOMPLETE_USERAGENT_DATA.getHighEntropyValues(['platformVersion']));
  },

  async testGetHighEntropyValuesWithMatchingKey() {
    const hasPlatformVersion = withHighEntropyData(INCOMPLETE_USERAGENT_DATA, {
      platformVersion: '10.0.0',
    });
    assertObjectEquals(
        {platformVersion: '10.0.0'},
        await hasPlatformVersion.getHighEntropyValues(['platformVersion']));
  },

  async testGetHighEntropyValuesWithNonStringValue() {
    const hasPlatformVersion =
        withHighEntropyData(INCOMPLETE_USERAGENT_DATA, {versionList: []});
    assertObjectEquals(
        {versionList: []},
        await hasPlatformVersion.getHighEntropyValues(['versionList']));
  },
});
