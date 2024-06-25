/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import * as iterableMechanismTests from './iterablemechanismtests.js';
import * as mechanismSeparationTests from './mechanismseparationtests.js';
import * as mechanismSharingTests from './mechanismsharingtests.js';
import * as mechanismTests from './mechanismtests.js';
import * as mechanismfactory from './mechanismfactory.js';
import { testSuite } from '../../testing/testsuite.js';

let mechanism;
let mechanismShared;
let mechanismSeparate;

testSuite({

  setUp() {
    mechanism = mechanismfactory.create('test');
    mechanismShared = mechanismfactory.create('test');
    mechanismSeparate = mechanismfactory.create('test2');
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
    const probe = mechanismfactory.create();
    if (!!probe) {
      assertNotNull(mechanism);
      assertNotNull(mechanismShared);
      assertNotNull(mechanismSeparate);
    }

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
