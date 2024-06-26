/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Unit tests for goog.html.trustedtypes package. */

goog.setTestOnly();

import { PropertyReplacer } from '../testing/propertyreplacer.js';
import { recordFunction } from '../testing/recordfunction.js';
import { testSuite } from '../testing/testsuite.js';
import * as trustedtypes from './trustedtypes.js';

const stubs = new PropertyReplacer();

testSuite({

  setUp() {
    /** @suppress {visibility} suppression added to enable type checking */
    trustedtypes._reset();  // reset the cache.
  },

  tearDown() {
    stubs.reset();
  },

  testGetPolicyPrivateDoNotAccessOrElse_noPolicyName() {
    stubs.set(trustedtypes, 'POLICY_NAME', '');
    const recorder = recordFunction(goog.createTrustedTypesPolicy);
    stubs.set(goog, 'createTrustedTypesPolicy', recorder);
    const policy = trustedtypes.getPolicyPrivateDoNotAccessOrElse();
    recorder.assertCallCount(0);
    assertNull(policy);
  },

  testGetPolicyPrivateDoNotAccessOrElse_withPolicyName() {
    stubs.set(trustedtypes, 'POLICY_NAME', 'foo');
    const recorder = recordFunction(goog.createTrustedTypesPolicy);
    stubs.set(goog, 'createTrustedTypesPolicy', recorder);
    const policy = trustedtypes.getPolicyPrivateDoNotAccessOrElse();
    recorder.assertCallCount(1);
    assertEquals('foo', recorder.getLastCall().getArguments()[0]);
    assertEquals(recorder.getLastCall().getReturnValue(), policy);
  },

  testGetPolicyPrivateDoNotAccessOrElse_defaultPolicyName() {
    const recorder = recordFunction(goog.createTrustedTypesPolicy);
    stubs.set(goog, 'createTrustedTypesPolicy', recorder);
    const policy = trustedtypes.getPolicyPrivateDoNotAccessOrElse();
    recorder.assertCallCount(1);
    assertEquals(
        `${goog.TRUSTED_TYPES_POLICY_NAME}#html`,
        recorder.getLastCall().getArguments()[0]);
    assertEquals(recorder.getLastCall().getReturnValue(), policy);
  },

  testGetPolicyPrivateDoNotAccessOrElse_caching() {
    stubs.set(trustedtypes, 'POLICY_NAME', 'foo');
    const recorder = recordFunction(goog.createTrustedTypesPolicy);
    stubs.set(goog, 'createTrustedTypesPolicy', recorder);
    trustedtypes.getPolicyPrivateDoNotAccessOrElse();
    trustedtypes.getPolicyPrivateDoNotAccessOrElse();
    recorder.assertCallCount(1);
  },

});
