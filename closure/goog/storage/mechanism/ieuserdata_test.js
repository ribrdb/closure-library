/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { IEUserData } from './ieuserdata.js';
import * as iterableMechanismTests from './iterablemechanismtests.js';
import * as mechanismSeparationTests from './mechanismseparationtests.js';
import * as mechanismSharingTests from './mechanismsharingtests.js';
import * as mechanismTests from './mechanismtests.js';
import { testSuite } from '../../testing/testsuite.js';
import * as userAgent from '../../useragent/useragent.js';

let mechanism;
let minimumQuota;
let mechanismShared;
let mechanismSeparate;

testSuite({

  shouldRunTests() {
    return userAgent.IE && !userAgent.isDocumentModeOrHigher(9);
  },

  setUp() {
    const ieUserData = new IEUserData('test');
    if (ieUserData.isAvailable()) {
      mechanism = ieUserData;
      // There should be at least 32 KiB.
      minimumQuota = 32 * 1024;
      mechanismShared = new IEUserData('test');
      mechanismSeparate = new IEUserData('test2');
    }
  },

  tearDown() {
    if (!!mechanism) {
      mechanism.clear();
      mechanism = null;
    }
    if (!!mechanismShared) {
      mechanismShared.clear();
      mechanismShared = null;
    }
    if (!!mechanismSeparate) {
      mechanismSeparate.clear();
      mechanismSeparate = null;
    }
  },

  /**
     @suppress {strictMissingProperties} suppression added to enable type
     checking
   */
  testAvailability() {
    assertNotNull(mechanism);
    assertTrue(mechanism.isAvailable());
    assertNotNull(mechanismShared);
    assertTrue(mechanismShared.isAvailable());
    assertNotNull(mechanismSeparate);
    assertTrue(mechanismSeparate.isAvailable());
  },

  testEncoding() {
    /** @suppress {visibility} suppression added to enable type checking */
    function assertEncodingPair(cleartext, encoded) {
      assertEquals(encoded, IEUserData.encodeKey_(cleartext));
      assertEquals(cleartext, IEUserData.decodeKey_(encoded));
    }
    assertEncodingPair('simple', '_simple');
    assertEncodingPair(
        'aa.bb%cc!\0$\u4e00.', '_aa.2Ebb.25cc.21.00.24.E4.B8.80.2E');
  },


  ...mechanismTests.register({
    getMechanism: function() {
      return mechanism;
    },
    getMinimumQuota: function() {
      return minimumQuota;
    },
  }),

  ...iterableMechanismTests.register({
    getMechanism: function() {
      return mechanism;
    },
  }),

  ...mechanismSharingTests.register({
    getMechanism: function() {
      return mechanism;
    },
    getMechanismShared: function() {
      return mechanismShared;
    },
  }),

  ...mechanismSeparationTests.register({
    getMechanism: function() {
      return mechanism;
    },
    getMechanismSeparate: function() {
      return mechanismSeparate;
    },
  }),
});
