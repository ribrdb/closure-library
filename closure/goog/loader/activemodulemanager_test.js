/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ModuleManager } from '../module/modulemanager.js';
import activeModuleManager from './activemodulemanager.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  tearDown() {
    activeModuleManager.reset();
  },

  testConfigure_shouldApplyConfigFunctionsOnSettingModuleManager() {
    const mm = new ModuleManager();
    let configurationFnCalled = false;
    const configurationFn = function(moduleManager) {
      assertEquals(mm, moduleManager);
      configurationFnCalled = true;
    };

    assertFalse(configurationFnCalled);
    activeModuleManager.configure(configurationFn);
    activeModuleManager.set(mm);
    assertTrue(configurationFnCalled);
  },

  testConfigure_shouldApplyConfigFunctionsImmediatelyWhenManagerAlreadySet() {
    const mm = new ModuleManager();
    activeModuleManager.set(mm);

    let configurationFnCalled = false;
    const configurationFn = function(moduleManager) {
      assertEquals(mm, moduleManager);
      configurationFnCalled = true;
    };

    assertFalse(configurationFnCalled);
    // function applied immediately if module manager is not null
    activeModuleManager.configure(configurationFn);
    assertTrue(configurationFnCalled);
  },

  testConfigure_shouldApplyAllConfigFunctionsConfigIsCalledMultipleTimes() {
    const mm = new ModuleManager();

    let configurationFn1Called = false;
    let configurationFn2Called = false;
    const configurationFn1 = function(moduleManager) {
      assertEquals(mm, moduleManager);
      configurationFn1Called = true;
    };
    const configurationFn2 = function(moduleManager) {
      assertEquals(mm, moduleManager);
      configurationFn2Called = true;
    };

    activeModuleManager.configure(configurationFn1);
    activeModuleManager.configure(configurationFn2);

    assertFalse(configurationFn1Called);
    assertFalse(configurationFn2Called);

    activeModuleManager.set(mm);

    assertTrue(configurationFn1Called);
    assertTrue(configurationFn2Called);
  },

  testConfigure_shouldApplyConfigFunctionsOnGetModuleManager() {
    const defaultModuleManager = new ModuleManager();
    activeModuleManager.setDefault(() => {
      return defaultModuleManager;
    });

    let configurationFnCalled = false;
    const configurationFn = function(moduleManager) {
      assertEquals(defaultModuleManager, moduleManager);
      configurationFnCalled = true;
    };

    activeModuleManager.configure(configurationFn);
    assertFalse(configurationFnCalled);
    // should apply configurations to default module manager
    activeModuleManager.get();
    assertTrue(configurationFnCalled);
  },
});
