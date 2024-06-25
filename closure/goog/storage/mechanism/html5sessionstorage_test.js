/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { HTML5SessionStorage } from './html5sessionstorage.js';
import * as iterableMechanismTests from './iterablemechanismtests.js';
import * as mechanismSharingTests from './mechanismsharingtests.js';
import * as mechanismTests from './mechanismtests.js';
import * as product from '../../useragent/product.js';
import { testSuite } from '../../testing/testsuite.js';
import * as userAgent from '../../useragent/useragent.js';

let mechanism;
let mechanismShared;
let minimumQuota;

testSuite({
  shouldRunTests() {
    // Disabled in Safari because Apple SafariDriver runs tests in Private
    // Browsing mode, and Safari does not permit writing to sessionStorage in
    // Private Browsing windows.
    return !product.SAFARI;
  },

  setUp() {
    const sessionStorage = new HTML5SessionStorage();
    if (sessionStorage.isAvailable()) {
      mechanism = sessionStorage;
      // There should be at least 2 MiB.
      minimumQuota = 2 * 1024 * 1024;
      mechanismShared = new HTML5SessionStorage();
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
  },

  /**
     @suppress {strictMissingProperties} suppression added to enable type
     checking
   */
  testAvailability() {
    if (userAgent.WEBKIT ||
        userAgent.GECKO && window.location.protocol != 'file:' ||
        userAgent.IE) {
      assertNotNull(mechanism);
      assertTrue(mechanism.isAvailable());
      assertNotNull(mechanismShared);
      assertTrue(mechanismShared.isAvailable());
    }
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
});
