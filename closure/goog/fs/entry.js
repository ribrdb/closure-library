/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wrappers for HTML5 Entry objects. These are all in the same
 * file to avoid circular dependency issues.
 *
 * When adding or modifying functionality in this namespace, be sure to update
 * the mock counterparts in goog.testing.fs.
 */
goog.declareModuleId('goog.fs.entry');

const {Deferred} = goog.requireType('goog.mochikit.async.deferred');
const {FileSystem} = goog.requireType('goog.fs.filesystem');
const {FileWriter} = goog.requireType('goog.fs.filewriter');



/**
 * The interface for entries in the filesystem.
 * @interface
 */
export function Entry() {}


/**
 * @return {boolean} Whether or not this entry is a file.
 */
Entry.prototype.isFile = function() {};


/**
 * @return {boolean} Whether or not this entry is a directory.
 */
Entry.prototype.isDirectory = function() {};


/**
 * @return {string} The name of this entry.
 */
Entry.prototype.getName = function() {};


/**
 * @return {string} The full path to this entry.
 */
Entry.prototype.getFullPath = function() {};


/**
 * @return {!FileSystem} The filesystem backing this entry.
 */
Entry.prototype.getFileSystem = function() {};


/**
 * Retrieves the last modified date for this entry.
 *
 * @return {!Deferred} The deferred Date for this entry. If an error
 *     occurs, the errback is called with a {@link goog.fs.Error}.
 */
Entry.prototype.getLastModified = function() {};


/**
 * Retrieves the metadata for this entry.
 *
 * @return {!Deferred} The deferred Metadata for this entry. If an
 *     error occurs, the errback is called with a {@link goog.fs.Error}.
 */
Entry.prototype.getMetadata = function() {};


/**
 * Move this entry to a new location.
 *
 * @param {!DirectoryEntry} parent The new parent directory.
 * @param {string=} opt_newName The new name of the entry. If omitted, the entry
 *     retains its original name.
 * @return {!Deferred} The deferred {@link FileEntry} or
 *     {@link DirectoryEntry} for the new entry. If an error occurs, the
 *     errback is called with a {@link goog.fs.Error}.
 */
Entry.prototype.moveTo = function(parent, opt_newName) {};


/**
 * Copy this entry to a new location.
 *
 * @param {!DirectoryEntry} parent The new parent directory.
 * @param {string=} opt_newName The name of the new entry. If omitted, the new
 *     entry has the same name as the original.
 * @return {!Deferred} The deferred {@link FileEntry} or
 *     {@link DirectoryEntry} for the new entry. If an error occurs, the
 *     errback is called with a {@link goog.fs.Error}.
 */
Entry.prototype.copyTo = function(parent, opt_newName) {};


/**
 * Wrap an HTML5 entry object in an appropriate subclass instance.
 *
 * @param {!Entry} entry The underlying Entry object.
 * @return {!Entry} The appropriate subclass wrapper.
 * @protected
 */
Entry.prototype.wrapEntry = function(entry) {};


/**
 * Get the URL for this file.
 *
 * @param {string=} opt_mimeType The MIME type that will be served for the URL.
 * @return {string} The URL.
 */
Entry.prototype.toUrl = function(opt_mimeType) {};


/**
 * Get the URI for this file.
 *
 * @deprecated Use {@link #toUrl} instead.
 * @param {string=} opt_mimeType The MIME type that will be served for the URI.
 * @return {string} The URI.
 */
Entry.prototype.toUri = function(opt_mimeType) {};


/**
 * Remove this entry.
 *
 * @return {!Deferred} A deferred object. If the removal succeeds,
 *     the callback is called with true. If an error occurs, the errback is
 *     called a {@link goog.fs.Error}.
 */
Entry.prototype.remove = function() {};


/**
 * Gets the parent directory.
 *
 * @return {!Deferred} The deferred {@link DirectoryEntry}.
 *     If an error occurs, the errback is called with a {@link goog.fs.Error}.
 */
Entry.prototype.getParent = function() {};



/**
 * A directory in a local FileSystem.
 *
 * @interface
 * @extends {Entry}
 */
export function DirectoryEntry() {}


/**
 * Behaviors for getting files and directories.
 * @enum {number}
 */
DirectoryEntry.Behavior = {
  /**
   * Get the file if it exists, error out if it doesn't.
   */
  DEFAULT: 1,
  /**
   * Get the file if it exists, create it if it doesn't.
   */
  CREATE: 2,
  /**
   * Error out if the file exists, create it if it doesn't.
   */
  CREATE_EXCLUSIVE: 3
};


/**
 * Get a file in the directory.
 *
 * @param {string} path The path to the file, relative to this directory.
 * @param {DirectoryEntry.Behavior=} opt_behavior The behavior for
 *     handling an existing file, or the lack thereof.
 * @return {!Deferred} The deferred {@link FileEntry}. If an
 *     error occurs, the errback is called with a {@link goog.fs.Error}.
 */
DirectoryEntry.prototype.getFile = function(path, opt_behavior) {};


/**
 * Get a directory within this directory.
 *
 * @param {string} path The path to the directory, relative to this directory.
 * @param {DirectoryEntry.Behavior=} opt_behavior The behavior for
 *     handling an existing directory, or the lack thereof.
 * @return {!Deferred} The deferred {@link DirectoryEntry}.
 *     If an error occurs, the errback is called a {@link goog.fs.Error}.
 */
DirectoryEntry.prototype.getDirectory = function(path, opt_behavior) {};


/**
 * Opens the directory for the specified path, creating the directory and any
 * intermediate directories as necessary.
 *
 * @param {string} path The directory path to create. May be absolute or
 *     relative to the current directory. The parent directory ".." and current
 *     directory "." are supported.
 * @return {!Deferred} A deferred {@link DirectoryEntry} for
 *     the requested path. If an error occurs, the errback is called with a
 *     {@link goog.fs.Error}.
 */
DirectoryEntry.prototype.createPath = function(path) {};


/**
 * Gets a list of all entries in this directory.
 *
 * @return {!Deferred} The deferred list of {@link Entry}
 *     results. If an error occurs, the errback is called with a
 *     {@link goog.fs.Error}.
 */
DirectoryEntry.prototype.listDirectory = function() {};


/**
 * Removes this directory and all its contents.
 *
 * @return {!Deferred} A deferred object. If the removal succeeds,
 *     the callback is called with true. If an error occurs, the errback is
 *     called a {@link goog.fs.Error}.
 */
DirectoryEntry.prototype.removeRecursively = function() {};



/**
 * A file in a local filesystem.
 *
 * @interface
 * @extends {Entry}
 */
export function FileEntry() {}


/**
 * Create a writer for writing to the file.
 *
 * @return {!Deferred<!FileWriter>} If an error occurs, the
 *     errback is called with a {@link goog.fs.Error}.
 */
FileEntry.prototype.createWriter = function() {};


/**
 * Get the file contents as a File blob.
 *
 * @return {!Deferred<!File>} If an error occurs, the errback is
 *     called with a {@link goog.fs.Error}.
 */
FileEntry.prototype.file = function() {};
