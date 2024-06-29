/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generator for unique element IDs.
 */

/**
 * Creates a new id generator.
 * @constructor
 * @final
 */
export function IdGenerator() {};
goog.addSingletonGetter(IdGenerator);


/**
 * Next unique ID to use
 * @type {number}
 * @private
 */
IdGenerator.prototype.nextId_ = 0;


/**
 * Random ID prefix to help avoid collisions with other closure JavaScript on
 * the same page that may initialize its own IdGenerator singleton.
 * @type {string}
 * @private
 */
IdGenerator.prototype.idPrefix_ = '';


/**
 * Sets the ID prefix for this singleton. This is a temporary workaround to be
 * backwards compatible with code relying on the undocumented, but consistent,
 * behavior. In the future this will be removed and the prefix will be set to
 * a randomly generated string.
 * @param {string} idPrefix
 */
IdGenerator.prototype.setIdPrefix = function(idPrefix) {
 this.idPrefix_ = idPrefix;
};


/**
 * Gets the next unique ID.
 * @return {string} The next unique identifier.
 */
IdGenerator.prototype.getNextUniqueId = function() {
 return this.idPrefix_ + ':' + (this.nextId_++).toString(36);
};
