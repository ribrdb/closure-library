/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

// Mock JScript functions
goog.setTestOnly();

import * as jscript from './jscript.js';
import { testSuite } from '../testing/testsuite.js';



globalThis['ScriptEngine'] = function() {
  return 'JScript';
};

globalThis['ScriptEngineMajorVersion'] = function() {
  return 1;
};

globalThis['ScriptEngineMinorVersion'] = function() {
  return 2;
};

globalThis['ScriptEngineBuildVersion'] = function() {
  return 3456;
};


testSuite({
  setUpPage() {
    jscript.init();
  },

  testHasJscript() {
    assertTrue('Should have jscript', jscript.HAS_JSCRIPT);
  },

  testVersion() {
    assertEquals('Version should be 1.2.3456', '1.2.3456', jscript.VERSION);
  },

  testIsVersion() {
    assertTrue(
        'Should be version 1.2.3456 or larger', jscript.isVersion('1.2.3456'));
    assertTrue('Should be version 1.2 or larger', jscript.isVersion('1.2'));
    assertFalse(
        'Should not be version 8.9 or larger', jscript.isVersion('8.9'));
  },
});
