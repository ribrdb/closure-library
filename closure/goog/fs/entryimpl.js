/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Concrete implementations of the
 *     DirectoryEntry, and FileEntry interfaces.
 */
import { Deferred } from '../../../third_party/closure/goog/mochikit/async/deferred.js';

import * as fs from './entry.js';
import { Error } from './error.js';
import { FileWriter as GoogFsFileWriter } from './filewriter.js';
import * as functions from '../functions/functions.js';
import * as googString from '../string/string.js';
const {FileSystem} = goog.requireType('goog.fs.filesystem');



/**
 * Base class for concrete implementations of goog.fs.Entry.
 * @param {!FileSystem} fs The wrapped filesystem.
 * @param {!Entry} entry The underlying Entry object.
 * @constructor
 * @implements {fs.Entry}
 */
export function EntryImpl(fs, entry) {
  /**
   * The wrapped filesystem.
   *
   * @type {!FileSystem}
   * @private
   */
  this.fs_ = fs;

  /**
   * The underlying Entry object.
   *
   * @type {!Entry}
   * @private
   */
  this.entry_ = entry;
}


/** @override */
EntryImpl.prototype.isFile = function() {
  return this.entry_.isFile;
};


/** @override */
EntryImpl.prototype.isDirectory = function() {
  return this.entry_.isDirectory;
};


/** @override */
EntryImpl.prototype.getName = function() {
  return this.entry_.name;
};


/** @override */
EntryImpl.prototype.getFullPath = function() {
  return this.entry_.fullPath;
};


/** @override */
EntryImpl.prototype.getFileSystem = function() {
  return this.fs_;
};


/** @override */
EntryImpl.prototype.getLastModified = function() {
  return this.getMetadata().addCallback(function(metadata) {
    return metadata.modificationTime;
  });
};


/** @override */
EntryImpl.prototype.getMetadata = function() {
  const d = new Deferred();

  this.entry_.getMetadata(function(metadata) {
    d.callback(metadata);
  }, goog.bind(function(err) {
    const msg = 'retrieving metadata for ' + this.getFullPath();
    d.errback(new Error(err, msg));
  }, this));
  return d;
};


/** @override */
EntryImpl.prototype.moveTo = function(parent, opt_newName) {
  const d = new Deferred();
  this.entry_.moveTo(
      /** @type {!DirectoryEntryImpl} */ (parent).dir_, opt_newName,
      goog.bind(function(entry) {
        d.callback(this.wrapEntry(entry));
      }, this), goog.bind(function(err) {
    const msg = 'moving ' + this.getFullPath() + ' into ' +
        parent.getFullPath() +
        (opt_newName ? ', renaming to ' + opt_newName : '');
    d.errback(new Error(err, msg));
  }, this));
  return d;
};


/** @override */
EntryImpl.prototype.copyTo = function(parent, opt_newName) {
  const d = new Deferred();
  this.entry_.copyTo(
      /** @type {!DirectoryEntryImpl} */ (parent).dir_, opt_newName,
      goog.bind(function(entry) {
        d.callback(this.wrapEntry(entry));
      }, this), goog.bind(function(err) {
    const msg = 'copying ' + this.getFullPath() + ' into ' +
        parent.getFullPath() +
        (opt_newName ? ', renaming to ' + opt_newName : '');
    d.errback(new Error(err, msg));
  }, this));
  return d;
};


/** @override */
EntryImpl.prototype.wrapEntry = function(entry) {
  return entry.isFile ?
      new FileEntryImpl(this.fs_, /** @type {!FileEntry} */ (entry)) :
      new DirectoryEntryImpl(
          this.fs_, /** @type {!DirectoryEntry} */ (entry));
};


/** @override */
EntryImpl.prototype.toUrl = function(opt_mimeType) {
  return this.entry_.toURL(opt_mimeType);
};


/** @override */
EntryImpl.prototype.toUri = EntryImpl.prototype.toUrl;


/** @override */
EntryImpl.prototype.remove = function() {
  const d = new Deferred();
  this.entry_.remove(
      goog.bind(d.callback, d, true /* result */), goog.bind(function(err) {
    const msg = 'removing ' + this.getFullPath();
    d.errback(new Error(err, msg));
  }, this));
  return d;
};


/** @override */
EntryImpl.prototype.getParent = function() {
  const d = new Deferred();
  this.entry_.getParent(goog.bind(function(parent) {
    d.callback(new DirectoryEntryImpl(this.fs_, parent));
  }, this), goog.bind(function(err) {
    const msg = 'getting parent of ' + this.getFullPath();
    d.errback(new Error(err, msg));
  }, this));
  return d;
};



/**
 * A directory in a local FileSystem.
 *
 * This should not be instantiated directly. Instead, it should be accessed via
 * {@link FileSystem#getRoot} or
 * {@link fs.DirectoryEntry#getDirectoryEntry}.
 *
 * @param {!FileSystem} fs The wrapped filesystem.
 * @param {!DirectoryEntry} dir The underlying DirectoryEntry object.
 * @constructor
 * @extends {EntryImpl}
 * @implements {fs.DirectoryEntry}
 * @final
 */
export function DirectoryEntryImpl(fs, dir) {
  DirectoryEntryImpl.base(this, 'constructor', fs, dir);

  /**
   * The underlying DirectoryEntry object.
   *
   * @type {!DirectoryEntry}
   * @private
   */
  this.dir_ = dir;
}
goog.inherits(DirectoryEntryImpl, EntryImpl);


/** @override */
DirectoryEntryImpl.prototype.getFile = function(path, opt_behavior) {
  const d = new Deferred();
  this.dir_.getFile(
      path, this.getOptions_(opt_behavior), goog.bind(function(entry) {
    d.callback(new FileEntryImpl(this.fs_, entry));
  }, this), goog.bind(function(err) {
    const msg = 'loading file ' + path + ' from ' + this.getFullPath();
    d.errback(new Error(err, msg));
  }, this));
  return d;
};


/** @override */
DirectoryEntryImpl.prototype.getDirectory = function(
    path, opt_behavior) {
  const d = new Deferred();
  this.dir_.getDirectory(
      path, this.getOptions_(opt_behavior), goog.bind(function(entry) {
    d.callback(new DirectoryEntryImpl(this.fs_, entry));
  }, this), goog.bind(function(err) {
    const msg = 'loading directory ' + path + ' from ' + this.getFullPath();
    d.errback(new Error(err, msg));
  }, this));
  return d;
};


/** @override */
DirectoryEntryImpl.prototype.createPath = function(path) {
  // If the path begins at the root, reinvoke createPath on the root directory.
  if (googString.startsWith(path, '/')) {
    const root = this.getFileSystem().getRoot();
    if (this.getFullPath() != root.getFullPath()) {
      return root.createPath(path);
    }
  }

  // Filter out any empty path components caused by '//' or a leading slash.
  const parts = path.split('/').filter(functions.identity);

  /**
       * @param {DirectoryEntryImpl} dir
       * @return {!Deferred}
       */
  function getNextDirectory(dir) {
    if (!parts.length) {
      return Deferred.succeed(dir);
    }

    let def;
    const nextDir = parts.shift();

    if (nextDir == '..') {
      def = dir.getParent();
    } else if (nextDir == '.') {
      def = Deferred.succeed(dir);
    } else {
      def = dir.getDirectory(nextDir, fs.DirectoryEntry.Behavior.CREATE);
    }
    return def.addCallback(getNextDirectory);
  }

  return getNextDirectory(this);
};


/** @override */
DirectoryEntryImpl.prototype.listDirectory = function() {
  const d = new Deferred();
  const reader = this.dir_.createReader();
  const results = [];

  const errorCallback = goog.bind(function(err) {
    const msg = 'listing directory ' + this.getFullPath();
    d.errback(new Error(err, msg));
  }, this);

  const successCallback = goog.bind(function(entries) {
    if (entries.length) {
      for (let i = 0, entry; entry = entries[i]; i++) {
        results.push(this.wrapEntry(entry));
      }
      reader.readEntries(successCallback, errorCallback);
    } else {
      d.callback(results);
    }
  }, this);

  reader.readEntries(successCallback, errorCallback);
  return d;
};


/** @override */
DirectoryEntryImpl.prototype.removeRecursively = function() {
  const d = new Deferred();
  this.dir_.removeRecursively(
      goog.bind(d.callback, d, true /* result */), goog.bind(function(err) {
    const msg = 'removing ' + this.getFullPath() + ' recursively';
    d.errback(new Error(err, msg));
  }, this));
  return d;
};


/**
 * Converts a value in the Behavior enum into an options object expected by the
 * File API.
 *
 * @param {fs.DirectoryEntry.Behavior=} opt_behavior The behavior for
 *     existing files.
 * @return {!Object<boolean>} The options object expected by the File API.
 * @private
 */
DirectoryEntryImpl.prototype.getOptions_ = function(opt_behavior) {
  if (opt_behavior == fs.DirectoryEntry.Behavior.CREATE) {
    return {'create': true};
  } else if (opt_behavior == fs.DirectoryEntry.Behavior.CREATE_EXCLUSIVE) {
    return {'create': true, 'exclusive': true};
  } else {
    return {};
  }
};



/**
 * A file in a local filesystem.
 *
 * This should not be instantiated directly. Instead, it should be accessed via
 * {@link fs.DirectoryEntry#getFile}.
 *
 * @param {!FileSystem} fs The wrapped filesystem.
 * @param {!FileEntry} file The underlying FileEntry object.
 * @constructor
 * @extends {EntryImpl}
 * @implements {fs.FileEntry}
 * @final
 */
export function FileEntryImpl(fs, file) {
  FileEntryImpl.base(this, 'constructor', fs, file);

  /**
   * The underlying FileEntry object.
   *
   * @type {!FileEntry}
   * @private
   */
  this.file_ = file;
}
goog.inherits(FileEntryImpl, EntryImpl);


/** @override */
FileEntryImpl.prototype.createWriter = function() {
  const d = new Deferred();
  this.file_.createWriter(function(w) {
    d.callback(new GoogFsFileWriter(w));
  }, goog.bind(function(err) {
    const msg = 'creating writer for ' + this.getFullPath();
    d.errback(new Error(err, msg));
  }, this));
  return d;
};


/** @override */
FileEntryImpl.prototype.file = function() {
  const d = new Deferred();
  this.file_.file(function(f) {
    d.callback(f);
  }, goog.bind(function(err) {
    const msg = 'getting file for ' + this.getFullPath();
    d.errback(new Error(err, msg));
  }, this));
  return d;
};
