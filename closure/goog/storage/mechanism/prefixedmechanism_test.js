/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { HTML5LocalStorage } from './html5localstorage.js';
import { PrefixedMechanism } from './prefixedmechanism.js';
import * as iterableMechanismTests from './iterablemechanismtests.js';
import * as mechanismSeparationTests from './mechanismseparationtests.js';
import * as mechanismSharingTests from './mechanismsharingtests.js';
import * as mechanismTests from './mechanismtests.js';
import { testSuite } from '../../testing/testsuite.js';

let submechanism = null;
let mechanism;
let mechanismShared;
let mechanismSeparate;

testSuite({
  setUp() {
    submechanism = new HTML5LocalStorage();
    if (submechanism.isAvailable()) {
      mechanism = new PrefixedMechanism(submechanism, 'test');
      mechanismShared = new PrefixedMechanism(submechanism, 'test');
      mechanismSeparate = new PrefixedMechanism(submechanism, 'test2');
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

  testAvailability() {
    if (submechanism.isAvailable()) {
      assertNotNull(mechanism);
      assertNotNull(mechanismShared);
      assertNotNull(mechanismSeparate);
    }
  },

  ...mechanismTests.register({
    getMechanism: function() {
      return mechanism;
    },
    getMinimumQuota: function() {
      return 0;
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
