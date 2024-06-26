/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Common test functions for tweak unit tests.
 *
 * @package
 */

goog.setTestOnly();

import * as tweak from './tweak.js';

import {
    BooleanGroup,
    BooleanInGroupSetting,
    BooleanSetting,
    ButtonAction,
    NumericSetting,
    StringSetting,
} from './entries.js';

import { Registry } from './registry.js';


globalThis.boolEntry = null;
globalThis.boolEntry2 = null;
globalThis.strEntry = null;
globalThis.strEntry2 = null;
globalThis.strEnumEntry = null;
globalThis.numEntry = null;
globalThis.numEnumEntry = null;
globalThis.boolGroup = null;
globalThis.boolOneEntry = null;
globalThis.boolTwoEntry = null;
globalThis.buttonEntry = null;


/**
 * Creates a registry with some entries in it.
 * @param {string} queryParams The query parameter string to use for the
 *     registry.
 * @suppress {accessControls} Private state is accessed for test purposes.
 */
export function createRegistryEntries(queryParams) {
  // Initialize the registry with the given query string.
  var registry = new Registry(queryParams);
  tweak.setRegistry_(registry);

  boolEntry = new BooleanSetting('Bool', 'The bool1');
  registry.register(boolEntry);

  boolEntry2 = new BooleanSetting('Bool2', 'The bool2');
  boolEntry2.setDefaultValue(true);
  registry.register(boolEntry2);

  strEntry = new StringSetting('Str', 'The str1');
  strEntry.setParamName('s');
  registry.register(strEntry);

  strEntry2 = new StringSetting('Str2', 'The str2');
  strEntry2.setDefaultValue('foo');
  registry.register(strEntry2);

  strEnumEntry = new StringSetting('Enum', 'The enum');
  strEnumEntry.setValidValues(['A', 'B', 'C']);
  strEnumEntry.setRestartRequired(false);
  registry.register(strEnumEntry);

  numEntry = new NumericSetting('Num', 'The num');
  numEntry.setDefaultValue(99);
  registry.register(numEntry);

  numEnumEntry = new NumericSetting('Enum2', 'The 2nd enum');
  numEnumEntry.setValidValues([1, 2, 3]);
  numEnumEntry.setRestartRequired(false);
  numEnumEntry.label = 'Enum the second&';
  registry.register(numEnumEntry);

  boolGroup = new BooleanGroup('BoolGroup', 'The bool group');
  registry.register(boolGroup);

  boolOneEntry =
      new BooleanInGroupSetting('BoolOne', 'Desc for 1', boolGroup);
  boolOneEntry.setToken('B1');
  boolOneEntry.setRestartRequired(false);
  boolGroup.addChild(boolOneEntry);
  registry.register(boolOneEntry);

  boolTwoEntry =
      new BooleanInGroupSetting('BoolTwo', 'Desc for 2', boolGroup);
  boolTwoEntry.setDefaultValue(true);
  boolGroup.addChild(boolTwoEntry);
  registry.register(boolTwoEntry);

  buttonEntry = new ButtonAction('Button', 'The Btn', () => {});
  buttonEntry.label = '<btn>';
  registry.register(buttonEntry);

  var nsBoolGroup =
      new BooleanGroup('foo.bar.BoolGroup', 'Namespaced Bool Group');
  registry.register(nsBoolGroup);
  var nsBool = new BooleanInGroupSetting(
      'foo.bar.BoolOne', 'Desc for Namespaced 1', nsBoolGroup);
  nsBoolGroup.addChild(nsBool);
  registry.register(nsBool);
}
