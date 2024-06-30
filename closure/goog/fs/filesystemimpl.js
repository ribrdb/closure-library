/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Concrete implementation of the FileSystem interface
 *     using an HTML FileSystem object.
 */
import { DirectoryEntryImpl } from './entryimpl.js';

import * as fs from './filesystem.js';



/**
 * A local filesystem.
 *
 * This shouldn't be instantiated directly. Instead, it should be accessed via
 * {@link goog.fs.getTemporary} or {@link goog.fs.getPersistent}.
 *
 * @param {!FileSystem} fs The underlying FileSystem object.
 * @constructor
 * @implements {fs.FileSystem}
 * @final
 */
export function FileSystemImpl(fs) {
 /**
  * The underlying FileSystem object.
  *
  * @type {!FileSystem}
  * @private
  */
 this.fs_ = fs;
}


/** @override */
FileSystemImpl.prototype.getName = function() {
 return this.fs_.name;
};


/** @override */
FileSystemImpl.prototype.getRoot = function() {
 return new DirectoryEntryImpl(this, this.fs_.root);
};


/**
 * @return {!FileSystem} The underlying FileSystem object.
 */
FileSystemImpl.prototype.getBrowserFileSystem = function() {
 return this.fs_;
};
