/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Object which fetches Unicode codepoint names that are locally
 * stored in a bundled database. Currently, only invisible characters are
 * covered by this database. See the goog.i18n.uChar.RemoteNameFetcher class for
 * a remote database option.
 */

import { NameFetcher } from './namefetcher.js';

import * as uCharNames from '../ucharnames.js';
import * as log from '../../log/log.js';



/**
 * Builds the NameFetcherLocal object. This is a simple object which retrieves
 * character names from a local bundled database. This database only covers
 * invisible characters. See the goog.i18n.uChar class for more details.
 *
 * @constructor
 * @implements {NameFetcher}
 * @final
 */
export function LocalNameFetcher() {}


/**
 * A reference to the LocalNameFetcher logger.
 *
 * @type {log.Logger}
 * @private
 */
LocalNameFetcher.logger_ =
    log.getLogger('goog.i18n.uChar.LocalNameFetcher');


/** @override */
LocalNameFetcher.prototype.prefetch = function(character) {};


/** @override */
LocalNameFetcher.prototype.getName = function(
    character, callback) {
 const localName = uCharNames.toName(character);
 if (!localName) {
   log.warning(
       LocalNameFetcher.logger_,
       'No local name defined for character ' + character);
 }
 callback(localName);
};


/** @override */
LocalNameFetcher.prototype.isNameAvailable = function(
    character) {
 return !!uCharNames.toName(character);
};
