/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A wrapper for the HTML5 FileSystem object.
 */

goog.declareModuleId('goog.fs.filesystem');

goog.requireType('goog.fs.entry');



/**
 * A local filesystem.
 *
 * @interface
 */
export function FileSystem() {}


/**
 * @return {string} The name of the filesystem.
 */
FileSystem.prototype.getName = function() {};


/**
 * @return {!goog.fs.DirectoryEntry} The root directory of the filesystem.
 */
FileSystem.prototype.getRoot = function() {};
