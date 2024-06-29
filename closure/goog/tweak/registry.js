/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition for Registry.
 * Most clients should not use this class directly, but instead use the API
 * defined in tweak.js. One possible use case for directly using TweakRegistry
 * is to register tweaks that are not known at compile time.
 */

goog.declareModuleId('goog.tweak.registry');

import * as array from '../array/array.js';
import * as asserts from '../asserts/asserts.js';
import * as log from '../log/log.js';
import * as googString from '../string/string.js';

import {
  BasePrimitiveSetting,
  BaseSetting,
  BooleanSetting,
  NumericSetting,
  StringSetting,
} from './entries.js';

import * as utils from '../uri/utils.js';
const { BaseEntry } = goog.requireType('goog.tweak.entries');



/**
 * Singleton that manages all tweaks. This should be instantiated only from
 * goog.tweak.getRegistry().
 * @param {string} queryParams Value of window.location.search.
 * @constructor
 * @final
 */
export function Registry(queryParams) {
  /**
   * A map of entry id -> entry object
   * @type {!Object<!BaseEntry>}
   * @private
   */
  this.entryMap_ = {};

  /**
   * The map of query params to use when initializing entry settings.
   * @type {!Object<string>}
   * @private
   */
  this.parsedQueryParams_ = Registry.parseQueryParams(queryParams);

  /**
   * List of callbacks to call when a new entry is registered.
   * @type {!Array<!Function>}
   * @private
   */
  this.onRegisterListeners_ = [];
}


/**
 * The logger for this class.
 * @type {log.Logger}
 * @private
 */
Registry.prototype.logger_ =
    log.getLogger('goog.tweak.Registry');


/**
 * Simple parser for query params. Makes all keys lower-case.
 * @param {string} queryParams The part of the url between the ? and the #.
 * @return {!Object<string>} map of key->value.
 */
Registry.parseQueryParams = function(queryParams) {
  // Strip off the leading ? and split on &.
  var parts = queryParams.slice(1).split('&');
  var ret = {};

  for (var i = 0, il = parts.length; i < il; ++i) {
    var entry = parts[i].split('=');
    if (entry[0]) {
      ret[googString.urlDecode(entry[0]).toLowerCase()] =
          googString.urlDecode(entry[1] || '');
    }
  }
  return ret;
};


/**
 * Registers the given tweak setting/action.
 * @param {BaseEntry} entry The entry.
 */
Registry.prototype.register = function(entry) {
  var id = entry.getId();
  var oldBaseEntry = this.entryMap_[id];
  if (oldBaseEntry) {
    if (oldBaseEntry == entry) {
      log.warning(this.logger_, 'Tweak entry registered twice: ' + id);
      return;
    }
    asserts.fail(
        'Tweak entry registered twice and with different types: ' + id);
  }

  // Set its value from the query params.
  if (entry instanceof BaseSetting) {
    if (entry.getParamName()) {
      entry.setInitialQueryParamValue(
          this.parsedQueryParams_[entry.getParamName()]);
    }
  }

  this.entryMap_[id] = entry;
  // Call all listeners.
  for (var i = 0, callback; callback = this.onRegisterListeners_[i]; ++i) {
    callback(entry);
  }
};


/**
 * Adds a callback to be called whenever a new tweak is added.
 * @param {!Function} func The callback.
 */
Registry.prototype.addOnRegisterListener = function(func) {
  this.onRegisterListeners_.push(func);
};


/**
 * @param {string} id The unique string that identifies this entry.
 * @return {boolean} Whether a tweak with the given ID is registered.
 */
Registry.prototype.hasEntry = function(id) {
  return id in this.entryMap_;
};


/**
 * Returns the BaseEntry with the given ID. Asserts if it does not exists.
 * @param {string} id The unique string that identifies this entry.
 * @return {!BaseEntry} The entry.
 */
Registry.prototype.getEntry = function(id) {
  var ret = this.entryMap_[id];
  asserts.assert(ret, 'Tweak not registered: %s', id);
  return ret;
};


/**
 * Returns the boolean setting with the given ID. Asserts if the ID does not
 * refer to a registered entry or if it refers to one of the wrong type.
 * @param {string} id The unique string that identifies this entry.
 * @return {!BooleanSetting} The entry.
 */
Registry.prototype.getBooleanSetting = function(id) {
  var entry = this.getEntry(id);
  asserts.assertInstanceof(
      entry, BooleanSetting,
      'getBooleanSetting called on wrong type of BaseSetting');
  return /** @type {!BooleanSetting} */ (entry);
};


/**
 * Returns the string setting with the given ID. Asserts if the ID does not
 * refer to a registered entry or if it refers to one of the wrong type.
 * @param {string} id The unique string that identifies this entry.
 * @return {!StringSetting} The entry.
 */
Registry.prototype.getStringSetting = function(id) {
  var entry = this.getEntry(id);
  asserts.assertInstanceof(
      entry, StringSetting,
      'getStringSetting called on wrong type of BaseSetting');
  return /** @type {!StringSetting} */ (entry);
};


/**
 * Returns the numeric setting with the given ID. Asserts if the ID does not
 * refer to a registered entry or if it refers to one of the wrong type.
 * @param {string} id The unique string that identifies this entry.
 * @return {!NumericSetting} The entry.
 */
Registry.prototype.getNumericSetting = function(id) {
  var entry = this.getEntry(id);
  asserts.assertInstanceof(
      entry, NumericSetting,
      'getNumericSetting called on wrong type of BaseSetting');
  return /** @type {!NumericSetting} */ (entry);
};


/**
 * Creates and returns an array of all BaseSetting objects with an associted
 * query parameter.
 * @param {boolean} excludeChildEntries Exclude BooleanInGroupSettings.
 * @param {boolean} excludeNonSettings Exclude entries that are not subclasses
 *     of BaseSetting.
 * @return {!Array<!BaseSetting>} The settings.
 */
Registry.prototype.extractEntries = function(
    excludeChildEntries, excludeNonSettings) {
  var entries = [];
  for (var id in this.entryMap_) {
    var entry = this.entryMap_[id];
    if (entry instanceof BaseSetting) {
      if (excludeChildEntries && !entry.getParamName()) {
        continue;
      }
    } else if (excludeNonSettings) {
      continue;
    }
    entries.push(entry);
  }
  return entries;
};


/**
 * Returns the query part of the URL that will apply all set tweaks.
 * @param {string=} opt_existingSearchStr The part of the url between the ? and
 *     the #. Uses window.location.search if not given.
 * @return {string} The query string.
 */
Registry.prototype.makeUrlQuery = function(opt_existingSearchStr) {
  var existingParams = opt_existingSearchStr == undefined ?
      window.location.search :
      opt_existingSearchStr;

  var sortedEntries = this.extractEntries(
      true /* excludeChildEntries */, true /* excludeNonSettings */);
  // Sort the params so that the urlQuery has stable ordering.
  sortedEntries.sort(function(a, b) {
    return array.defaultCompare(a.getParamName(), b.getParamName());
  });

  // Add all values that are not set to their defaults.
  var keysAndValues = [];
  for (var i = 0, entry; entry = sortedEntries[i]; ++i) {
    var encodedValue = entry.getNewValueEncoded();
    if (encodedValue != null) {
      keysAndValues.push(entry.getParamName(), encodedValue);
    }
    // Strip all tweak query params from the existing query string. This will
    // make the final query string contain only the tweak settings that are set
    // to their non-default values and also maintain non-tweak related query
    // parameters.
    existingParams = utils.removeParam(
        existingParams,
        encodeURIComponent(/** @type {string} */ (entry.getParamName())));
  }

  var tweakParams = utils.buildQueryData(keysAndValues);
  // Decode spaces and commas in order to make the URL more readable.
  tweakParams = tweakParams.replace(/%2C/g, ',').replace(/%20/g, '+');
  return !tweakParams ? existingParams : existingParams ?
                        existingParams + '&' + tweakParams :
                        '?' + tweakParams;
};

