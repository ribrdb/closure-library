/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as LocaleFeature from './localefeature.js';

import { testSuite } from '../testing/testsuite.js';


goog.setTestOnly('goog.i18n.localeFeatureTest');

testSuite({
  testUseEcmaScript2020: function() {
    assertTrue(
        (typeof (LocaleFeature.USE_ECMASCRIPT_I18N_2020) !== 'undefined'));
  },

  testUseEcmaScript2021: function() {
    assertTrue(
        (typeof (LocaleFeature.USE_ECMASCRIPT_I18N_2021) !== 'undefined'));
  },

  testRdtfFlag: function() {
    assertTrue(
        (typeof (LocaleFeature.USE_ECMASCRIPT_I18N_RDTF) !== 'undefined'));
  },

  testNumFormatFlag: function() {
    assertTrue(
        (typeof (LocaleFeature.USE_ECMASCRIPT_I18N_NUMFORMAT) !== 'undefined'));
  },

  testRdtfOptOutFlag: function() {
    assertFalse(
        (typeof (LocaleFeature.ECMASCRIPT_INTL_OPT_OUT) === 'undefined'));
  },

  testRdtfOptOutFlagSet: function() {
    assertFalse(LocaleFeature.ECMASCRIPT_INTL_OPT_OUT);
  },
});
