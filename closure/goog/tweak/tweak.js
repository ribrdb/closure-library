/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides facilities for creating and querying tweaks.
 * @see http://code.google.com/p/closure-library/wiki/UsingTweaks
 */

import * as asserts from '../asserts/asserts.js';

import {
  BaseSetting,
  BooleanGroup,
  BooleanInGroupSetting,
  BooleanSetting,
  ButtonAction,
  NumericSetting,
  StringSetting,
} from './entries.js';

import { Registry } from './registry.js';
const { BaseEntry } = goog.requireType('goog.tweak.entries');



/**
 * The global reference to the registry, if it exists.
 * @type {?Registry}
 * @private
 */
var registry_ = null;


/**
 * The boolean group set by beginBooleanGroup and cleared by endBooleanGroup.
 * @type {?BooleanGroup}
 * @private
 */
var activeBooleanGroup_ = null;


/**
 * Returns/creates the registry singleton.
 * @return {!Registry} The tweak registry.
 * @deprecated
 */
export function getRegistry() {
  if (!registry_) {
    var queryString = window.location.search;
    registry_ = new Registry(queryString);
  }
  return registry_;
}


/**
 * Type for configParams.
 * TODO(agrieve): Remove |Object when optional fields in struct types are
 *     implemented.
 * @typedef {{
 *     label:(string|undefined),
 *     validValues:(!Array<string>|!Array<number>|undefined),
 *     paramName:(string|undefined),
 *     restartRequired:(boolean|undefined),
 *     callback:(Function|undefined),
 *     token:(string|undefined)
 *     }|!Object}
 */
export var ConfigParams;


/**
 * Applies all extra configuration parameters in configParams.
 * @param {!BaseEntry} entry The entry to apply them to.
 * @param {!ConfigParams} configParams Extra configuration
 *     parameters.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
function applyConfigParams_(entry, configParams) {
  if (configParams.label) {
    entry.label = configParams.label;
    delete configParams.label;
  }
  if (configParams.validValues) {
    asserts.assert(
        entry instanceof StringSetting ||
            entry instanceof NumericSetting,
        'Cannot set validValues on tweak: %s', entry.getId());
    if (entry instanceof StringSetting) {
      entry.setValidValues(configParams.validValues);
    } else if (entry instanceof NumericSetting) {
      entry.setValidValues(configParams.validValues);
    }
    delete configParams.validValues;
  }
  if (configParams.paramName !== undefined) {
    asserts.assertInstanceof(
        entry, BaseSetting, 'Cannot set paramName on tweak: %s',
        entry.getId());
    entry.setParamName(configParams.paramName);
    delete configParams.paramName;
  }
  if (configParams.restartRequired !== undefined) {
    entry.setRestartRequired(configParams.restartRequired);
    delete configParams.restartRequired;
  }
  if (configParams.callback) {
    entry.addCallback(configParams.callback);
    delete configParams.callback;
    asserts.assert(
        !entry.isRestartRequired() || (configParams.restartRequired == false),
        'Tweak %s should set restartRequired: false, when adding a callback.',
        entry.getId());
  }
  if (configParams.token) {
    asserts.assertInstanceof(
        entry, BooleanInGroupSetting,
        'Cannot set token on tweak: %s', entry.getId());
    entry.setToken(configParams.token);
    delete configParams.token;
  }
  for (var key in configParams) {
    asserts.fail(
        'Unknown config options (' + key + '=' + configParams[key] +
        ') for tweak ' + entry.getId());
  }
}


/**
 * Registers a tweak using the given factoryFunc.
 * @param {!BaseEntry} entry The entry to register.
 * @param {boolean|string|number=} opt_defaultValue Default value.
 * @param {ConfigParams=} opt_configParams Extra
 *     configuration parameters.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
function doRegister_(entry, opt_defaultValue, opt_configParams) {
  if (opt_configParams) {
    applyConfigParams_(entry, opt_configParams);
  }
  if (opt_defaultValue != undefined) {
    entry.setDefaultValue(opt_defaultValue);
  }
  if (activeBooleanGroup_) {
    asserts.assertInstanceof(
        entry, BooleanInGroupSetting,
        'Forgot to end Boolean Group: %s',
        activeBooleanGroup_.getId());
    activeBooleanGroup_.addChild(
        /** @type {!BooleanInGroupSetting} */ (entry));
  }
  getRegistry().register(entry);
}


/**
 * Creates and registers a group of BooleanSettings that are all set by a
 * single query parameter. A call to endBooleanGroup() must be used
 * to close this group. Only registerBoolean() calls are allowed with
 * the beginBooleanGroup()/endBooleanGroup().
 * @param {string} id The unique ID for the setting.
 * @param {string} description A description of what the setting does.
 * @param {ConfigParams=} opt_configParams Extra configuration
 *     parameters.
 */
export function beginBooleanGroup(id, description, opt_configParams) {
  var entry = new BooleanGroup(id, description);
  doRegister_(entry, undefined, opt_configParams);
  activeBooleanGroup_ = entry;
}


/**
 * Stops adding boolean entries to the active boolean group.
 */
function endBooleanGroup() {
  activeBooleanGroup_ = null;
};


/**
 * Creates and registers a BooleanSetting.
 * @param {string} id The unique ID for the setting.
 * @param {string} description A description of what the setting does.
 * @param {boolean=} opt_defaultValue The default value for the setting.
 * @param {ConfigParams=} opt_configParams Extra configuration
 *     parameters.
 * @deprecated
 */
export function registerBoolean(id, description, opt_defaultValue, opt_configParams) {
  // TODO(agrieve): There is a bug in the compiler that causes these calls not
  //     to be stripped without this outer if. Might be Issue #90.
  if (activeBooleanGroup_) {
    var entry = new BooleanInGroupSetting(
        id, description, activeBooleanGroup_);
  } else {
    entry = new BooleanSetting(id, description);
  }
  doRegister_(entry, opt_defaultValue, opt_configParams);
}


/**
 * Creates and registers a StringSetting.
 * @param {string} id The unique ID for the setting.
 * @param {string} description A description of what the setting does.
 * @param {string=} opt_defaultValue The default value for the setting.
 * @param {ConfigParams=} opt_configParams Extra configuration
 *     parameters.
 * @deprecated
 */
export function registerString(id, description, opt_defaultValue, opt_configParams) {
  doRegister_(
      new StringSetting(id, description), opt_defaultValue,
      opt_configParams);
}


/**
 * Creates and registers a NumericSetting.
 * @param {string} id The unique ID for the setting.
 * @param {string} description A description of what the setting does.
 * @param {number=} opt_defaultValue The default value for the setting.
 * @param {ConfigParams=} opt_configParams Extra configuration
 *     parameters.
 * @deprecated
 */
export function registerNumber(id, description, opt_defaultValue, opt_configParams) {
  doRegister_(
      new NumericSetting(id, description), opt_defaultValue,
      opt_configParams);
}


/**
 * Creates and registers a ButtonAction.
 * @param {string} id The unique ID for the setting.
 * @param {string} description A description of what the action does.
 * @param {!Function} callback Function to call when the button is clicked.
 * @param {string=} opt_label The button text (instead of the ID).
 */
export function registerButton(id, description, callback, opt_label) {
  var tweak = new ButtonAction(id, description, callback);
  tweak.label = opt_label || tweak.label;
  doRegister_(tweak);
}


/**
 * Returns the value of the boolean setting with the given ID.
 * @param {string} id The unique string that identifies this entry.
 * @return {boolean} The value of the tweak.
 */
export function getBoolean(id) {
  return getRegistry().getBooleanSetting(id).getValue();
}


/**
 * Returns the value of the string setting with the given ID,
 * @param {string} id The unique string that identifies this entry.
 * @return {string} The value of the tweak.
 */
export function getString(id) {
  return getRegistry().getStringSetting(id).getValue();
}


/**
 * Returns the value of the numeric setting with the given ID.
 * @param {string} id The unique string that identifies this entry.
 * @return {number} The value of the tweak.
 */
export function getNumber(id) {
  return getRegistry().getNumericSetting(id).getValue();
}

/**
 * 
 * @param {Registry} registry 
 * @private
 */
export function setRegistry_(registry) {
  registry_ = registry;
}

/** @private */
export function resetActiveBooleanGroup_() {
  activeBooleanGroup_ = null;
}