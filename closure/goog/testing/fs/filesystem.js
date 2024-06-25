goog.declareModuleId('goog.testing.fs.filesystem');
/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock filesystem object.
 */

goog.setTestOnly('goog.testing.fs.FileSystem');

import { FileSystem as fsFileSystem } from '../../fs/filesystem.js';
import { DirectoryEntry } from './entry.js';



/**
 * A mock filesystem object.
 *
 * @param {string=} opt_name The name of the filesystem.
 * @constructor
 * @implements {fsFileSystem}
 * @final
 */
export function FileSystem(opt_name) {
 /**
  * The name of the filesystem.
  * @type {string}
  * @private
  */
 this.name_ = opt_name || 'goog.testing.fs.FileSystem';

 /**
   * The root entry of the filesystem.
   * @type {!DirectoryEntry}
   * @private
   */
 this.root_ = new DirectoryEntry(this, null, '', {});
}


/** @override */
FileSystem.prototype.getName = function() {
 return this.name_;
};


/**
 * @override
 * @return {!DirectoryEntry}
 */
FileSystem.prototype.getRoot = function() {
 return this.root_;
};
