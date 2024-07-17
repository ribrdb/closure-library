// TODO(user): We're trying to migrate all ES5 subclasses of Closure
// Library to ES6. In ES6 this cannot be referenced before super is called. This
// file has at least one this before a super call (in ES5) and cannot be
// automatically upgraded to ES6 as a result. Please fix this if you have a
// chance. Note: This can sometimes be caused by not calling the super
// constructor at all. You can run the conversion tool yourself to see what it
// does on this file: blaze run //javascript/refactoring/es6_classes:convert.

goog.declareModuleId('goog.testing.fs.entry');

/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock filesystem objects. These are all in the same file to
 * avoid circular dependency issues.
 */

goog.setTestOnly('goog.testing.fs.DirectoryEntry');

import { Timer } from '../../timer/timer.js';
import * as array from '../../array/array.js';
import * as asserts from '../../asserts/asserts.js';
import { Deferred } from '../../../../third_party/closure/goog/mochikit/async/deferred.js';

import {
  DirectoryEntry as fsDirectoryEntry,
  Entry as fsEntry,
  FileEntry as fsFileEntry,
} from '../../fs/entry.js';

import { DirectoryEntryImpl } from '../../fs/entryimpl.js';
import { Error } from '../../fs/error.js';
import * as functions from '../../functions/functions.js';
import object from '../../object/object.js';
import * as googString from '../../string/string.js';
import { File } from './file.js';
import { FileWriter } from './filewriter.js';
const { FileSystem } = goog.requireType('goog.testing.fs.filesystem');

/**
 * A mock filesystem entry object.
 *
 * @param {!FileSystem} fs The filesystem containing this entry.
 * @param {!DirectoryEntry} parent The directory entry directly
 *     containing this entry.
 * @param {string} name The name of this entry.
 * @constructor
 * @implements {fsEntry}
 */
export function Entry(fs, parent, name) {
  /**
     * This entry's filesystem.
     * @type {!FileSystem}
     * @private
     */
  this.fs_ = fs;

  /**
   * The name of this entry.
   * @type {string}
   * @private
   */
  this.name_ = name;

  /**
     * The parent of this entry.
     * @type {!DirectoryEntry}
     */
  this.parent = parent;
}


/**
 * Whether or not this entry has been deleted.
 * @type {boolean}
 */
Entry.prototype.deleted = false;


/** @override */
Entry.prototype.isFile = goog.abstractMethod;


/** @override */
Entry.prototype.isDirectory = goog.abstractMethod;


/** @override */
Entry.prototype.getName = function() {
  return this.name_;
};


/** @override */
Entry.prototype.getFullPath = function() {
  if (this.getName() == '' || this.parent.getName() == '') {
    // The root directory has an empty name
    return '/' + this.name_;
  } else {
    return this.parent.getFullPath() + '/' + this.name_;
  }
};


/**
 * @return {!FileSystem}
 * @override
 */
Entry.prototype.getFileSystem = function() {
  return this.fs_;
};


/** @override */
Entry.prototype.getLastModified = goog.abstractMethod;


/** @override */
Entry.prototype.getMetadata = goog.abstractMethod;


/** @override */
Entry.prototype.moveTo = function(parent, opt_newName) {
  const msg = 'moving ' + this.getFullPath() + ' into ' + parent.getFullPath() +
      (opt_newName ? ', renaming to ' + opt_newName : '');
  let newFile;
  return this.checkNotDeleted(msg)
      .addCallback(function() {
    return this.copyTo(parent, opt_newName);
  })
      .addCallback(function(file) {
    newFile = file;
    return this.remove();
  })
      .addCallback(function() {
    return newFile;
  });
};


/** @override */
Entry.prototype.copyTo = function(parent, opt_newName) {
  asserts.assert(parent instanceof DirectoryEntry);
  const msg = 'copying ' + this.getFullPath() + ' into ' +
      parent.getFullPath() +
      (opt_newName ? ', renaming to ' + opt_newName : '');
  const self = this;
  return this.checkNotDeleted(msg).addCallback(function() {
    asserts.assert(parent instanceof DirectoryEntry);
    const name = opt_newName || self.getName();
    const entry = self.clone();
    /** @type {!DirectoryEntry} */ (parent).children[name] =
          entry;
    parent.lastModifiedTimestamp_ = Date.now();
    entry.name_ = name;
    entry.parent = /** @type {!DirectoryEntry} */ (parent);
    return entry;
  });
};


/**
 * @return {!Entry} A shallow copy of this entry object.
 */
Entry.prototype.clone = goog.abstractMethod;


/** @override */
Entry.prototype.toUrl = function(opt_mimetype) {
  return 'fakefilesystem:' + this.getFullPath();
};


/** @override */
Entry.prototype.toUri = Entry.prototype.toUrl;


/** @override */
Entry.prototype.wrapEntry = goog.abstractMethod;


/** @override */
Entry.prototype.remove = function() {
  const msg = 'removing ' + this.getFullPath();
  const self = this;
  return this.checkNotDeleted(msg).addCallback(function() {
    delete this.parent.children[self.getName()];
    self.parent.lastModifiedTimestamp_ = Date.now();
    self.deleted = true;
    return;
  });
};


/** @override */
Entry.prototype.getParent = function() {
  const msg = 'getting parent of ' + this.getFullPath();
  return this.checkNotDeleted(msg).addCallback(function() {
    return this.parent;
  });
};


/**
 * Return a deferred that will call its errback if this entry has been deleted.
 * In addition, the deferred will only run after a timeout of 0, and all its
 * callbacks will run with the entry as "this".
 *
 * @param {string} action The name of the action being performed. For error
 *     reporting.
 * @return {!Deferred} The deferred that will be called after a
 *     timeout of 0.
 * @protected
 */
Entry.prototype.checkNotDeleted = function(action) {
  const d = new Deferred(undefined, this);
  Timer.callOnce(function() {
    if (this.deleted) {
      const err = new Error({'name': 'NotFoundError'}, action);
      d.errback(err);
    } else {
      d.callback();
    }
  }, 0, this);
  return d;
};



/**
 * A mock directory entry object.
 *
 * @param {!FileSystem} fs The filesystem containing this entry.
 * @param {DirectoryEntry} parent The directory entry directly
 *     containing this entry. If this is null, that means this is the root
 *     directory and so is its own parent.
 * @param {string} name The name of this entry.
 * @param {!Object<!Entry>} children The map of child names to
 *     entry objects.
 * @constructor
 * @extends {Entry}
 * @implements {fsDirectoryEntry}
 * @final
 */
export function DirectoryEntry(fs, parent, name, children) {
  DirectoryEntry.base(
      this, 'constructor', fs, parent || this, name);

  /**
     * The map of child names to entry objects.
     * @type {!Object<!Entry>}
     */
  this.children = children;

  /**
   * The modification time of the directory. Measured using Date.now, which may
   * be overridden with mock time providers.
   * @type {number}
   * @private
   */
  this.lastModifiedTimestamp_ = Date.now();
}
goog.inherits(DirectoryEntry, Entry);


/**
 * Constructs and returns the metadata object for this entry.
 * @return {{modificationTime: Date}} The metadata object.
 * @private
 */
DirectoryEntry.prototype.getMetadata_ = function() {
  return {'modificationTime': new Date(this.lastModifiedTimestamp_)};
};


/** @override */
DirectoryEntry.prototype.isFile = function() {
  return false;
};


/** @override */
DirectoryEntry.prototype.isDirectory = function() {
  return true;
};


/** @override */
DirectoryEntry.prototype.getLastModified = function() {
  const msg = 'reading last modified date for ' + this.getFullPath();
  return this.checkNotDeleted(msg).addCallback(function() {
    return new Date(this.lastModifiedTimestamp_);
  });
};


/** @override */
DirectoryEntry.prototype.getMetadata = function() {
  const msg = 'reading metadata for ' + this.getFullPath();
  return this.checkNotDeleted(msg).addCallback(function() {
    return this.getMetadata_();
  });
};


/** @override */
DirectoryEntry.prototype.clone = function() {
  return new DirectoryEntry(
      this.getFileSystem(), this.parent, this.getName(), this.children);
};


/** @override */
DirectoryEntry.prototype.remove = function() {
  if (!object.isEmpty(this.children)) {
    const d = new Deferred();
    Timer.callOnce(function() {
      d.errback(new Error(
          {'name': 'InvalidModificationError'},
          'removing ' + this.getFullPath()));
    }, 0, this);
    return d;
  } else if (this != this.getFileSystem().getRoot()) {
    return DirectoryEntry.base(this, 'remove');
  } else {
    // Root directory, do nothing.
    return Deferred.succeed();
  }
};


/** @override */
DirectoryEntry.prototype.getFile = function(
    path, opt_behavior) {
  const msg = 'loading file ' + path + ' from ' + this.getFullPath();
  opt_behavior = opt_behavior || fsDirectoryEntry.Behavior.DEFAULT;
  return this.checkNotDeleted(msg).addCallback(function() {
    try {
      return Deferred.succeed(this.getFileSync(path, opt_behavior));
    } catch (e) {
      return Deferred.fail(e);
    }
  });
};


/** @override */
DirectoryEntry.prototype.getDirectory = function(
    path, opt_behavior) {
  const msg = 'loading directory ' + path + ' from ' + this.getFullPath();
  opt_behavior = opt_behavior || fsDirectoryEntry.Behavior.DEFAULT;
  return this.checkNotDeleted(msg).addCallback(function() {
    try {
      return Deferred.succeed(
          this.getDirectorySync(path, opt_behavior));
    } catch (e) {
      return Deferred.fail(e);
    }
  });
};


/**
 * Get a file entry synchronously, without waiting for a Deferred to resolve.
 *
 * @param {string} path The path to the file, relative to this directory.
 * @param {fsDirectoryEntry.Behavior=} opt_behavior The behavior for
 *     loading the file.
 * @param {string=} opt_data The string data encapsulated by the blob.
 * @param {string=} opt_type The mime type of the blob.
 * @return {!FileEntry} The loaded file.
 */
DirectoryEntry.prototype.getFileSync = function(
    path, opt_behavior, opt_data, opt_type) {
  opt_behavior = opt_behavior || fsDirectoryEntry.Behavior.DEFAULT;
  return /** @type {!FileEntry} */ (this.getEntry_(path, opt_behavior, true, /* isFile */goog.bind(function(parent, name) {
      return new FileEntry(
          this.getFileSystem(), parent, name,
          opt_data !== undefined ? opt_data : '', opt_type);
    }, this)));
};


/**
 * Creates a file synchronously. This is a shorthand for getFileSync, useful for
 * setting up tests.
 *
 * @param {string} path The path to the file, relative to this directory.
 * @return {!FileEntry} The created file.
 */
DirectoryEntry.prototype.createFileSync = function(path) {
  return this.getFileSync(path, fsDirectoryEntry.Behavior.CREATE);
};


/**
 * Get a directory synchronously, without waiting for a Deferred to resolve.
 *
 * @param {string} path The path to the directory, relative to this one.
 * @param {fsDirectoryEntry.Behavior=} opt_behavior The behavior for
 *     loading the directory.
 * @return {!DirectoryEntry} The loaded directory.
 */
DirectoryEntry.prototype.getDirectorySync = function(
    path, opt_behavior) {
  opt_behavior = opt_behavior || fsDirectoryEntry.Behavior.DEFAULT;
  return /** @type {!DirectoryEntry} */ (this.getEntry_(path, opt_behavior, false, /* isFile */goog.bind(function(parent, name) {
      return new DirectoryEntry(
          this.getFileSystem(), parent, name, {});
    }, this)));
};


/**
 * Creates a directory synchronously. This is a shorthand for getFileSync,
 * useful for setting up tests.
 *
 * @param {string} path The path to the directory, relative to this directory.
 * @return {!DirectoryEntry} The created directory.
 */
DirectoryEntry.prototype.createDirectorySync = function(path) {
  return this.getDirectorySync(path, fsDirectoryEntry.Behavior.CREATE);
};


/**
 * Get a file or directory entry from a path. This handles parsing the path for
 * subdirectories and throwing appropriate errors should something go wrong.
 *
 * @param {string} path The path to the entry, relative to this directory.
 * @param {fsDirectoryEntry.Behavior} behavior The behavior for loading
 *     the entry.
 * @param {boolean} isFile Whether a file or directory is being loaded.
 * @param {function(!DirectoryEntry, string) :
 *             !Entry} createFn
 *     The function for creating the entry if it doesn't yet exist. This is
 *     passed the parent entry and the name of the new entry.
 * @return {!Entry} The loaded entry.
 * @private
 */
DirectoryEntry.prototype.getEntry_ = function(
    path, behavior, isFile, createFn) {
  // Filter out leading, trailing, and duplicate slashes.
  const components = path.split('/').filter(functions.identity);

  const basename = /** @type {string} */ (array.peek(components)) || '';
  let dir =
      googString.startsWith(path, '/') ? this.getFileSystem().getRoot() : this;

  components.slice(0, -1).forEach(function(p) {
    const subdir = dir.children[p];
    if (!subdir) {
      throw new Error(
          {'name': 'NotFoundError'},
          'loading ' + path + ' from ' + this.getFullPath() + ' (directory ' +
              dir.getFullPath() + '/' + p + ')');
    }
    dir = subdir;
  }, this);

  // If there is no basename, the path must resolve to the root directory.
  let entry = basename ? dir.children[basename] : dir;

  if (!entry) {
    if (behavior == fsDirectoryEntry.Behavior.DEFAULT) {
      throw new Error(
          {'name': 'NotFoundError'},
          'loading ' + path + ' from ' + this.getFullPath());
    } else {
      asserts.assert(
          behavior == fsDirectoryEntry.Behavior.CREATE ||
          behavior == fsDirectoryEntry.Behavior.CREATE_EXCLUSIVE);
      entry = createFn(dir, basename);
      dir.children[basename] = entry;
      this.lastModifiedTimestamp_ = Date.now();
      return entry;
    }
  } else if (behavior == fsDirectoryEntry.Behavior.CREATE_EXCLUSIVE) {
    throw new Error(
        {'name': 'InvalidModificationError'},
        'loading ' + path + ' from ' + this.getFullPath());
  } else if (entry.isFile() != isFile) {
    throw new Error(
        {'name': 'TypeMismatchError'},
        'loading ' + path + ' from ' + this.getFullPath());
  } else {
    if (behavior == fsDirectoryEntry.Behavior.CREATE) {
      this.lastModifiedTimestamp_ = Date.now();
    }
    return entry;
  }
};


/**
 * Returns whether this directory has a child with the given name.
 *
 * @param {string} name The name of the entry to check for.
 * @return {boolean} Whether or not this has a child with the given name.
 */
DirectoryEntry.prototype.hasChild = function(name) {
  return name in this.children;
};


/** @override */
DirectoryEntry.prototype.removeRecursively = function() {
  const msg = 'removing ' + this.getFullPath() + ' recursively';
  return this.checkNotDeleted(msg).addCallback(function() {
    const d = Deferred.succeed(null);
    object.forEach(this.children, function(child) {
      d.awaitDeferred(
          child.isDirectory() ? child.removeRecursively() : child.remove());
    });
    d.addCallback(function() {
      return this.remove();
    }, this);
    return d;
  });
};


/** @override */
DirectoryEntry.prototype.listDirectory = function() {
  const msg = 'listing ' + this.getFullPath();
  return this.checkNotDeleted(msg).addCallback(function() {
    return object.getValues(this.children);
  });
};


/** @override */
DirectoryEntry.prototype.createPath =
    // This isn't really type-safe.
    /** @type {!Function} */ (DirectoryEntryImpl.prototype.createPath);



/**
 * A mock file entry object.
 *
 * @param {!FileSystem} fs The filesystem containing this entry.
 * @param {!DirectoryEntry} parent The directory entry directly
 *     containing this entry.
 * @param {string} name The name of this entry.
 * @param {string} data The data initially contained in the file.
 * @param {string=} opt_type The mime type of the blob.
 * @constructor
 * @extends {Entry}
 * @implements {fsFileEntry}
 * @final
 */
export function FileEntry(fs, parent, name, data, opt_type) {
  FileEntry.base(this, 'constructor', fs, parent, name);

  /**
     * The internal file blob referenced by this file entry.
     * @type {!File}
     * @private
     */
  this.file_ =
      new File(name, new Date(Date.now()), data, opt_type);

  /**
   * The metadata for file.
   * @type {{modificationTime: Date}}
   * @private
   */
  this.metadata_ = {'modificationTime': this.file_.lastModifiedDate};
}
goog.inherits(FileEntry, Entry);


/** @override */
FileEntry.prototype.isFile = function() {
  return true;
};


/** @override */
FileEntry.prototype.isDirectory = function() {
  return false;
};


/** @override */
FileEntry.prototype.clone = function() {
  return new FileEntry(
      this.getFileSystem(), this.parent, this.getName(),
      this.fileSync().toString());
};


/** @override */
FileEntry.prototype.getLastModified = function() {
  return this.file().addCallback(function(file) {
    return file.lastModifiedDate;
  });
};


/** @override */
FileEntry.prototype.getMetadata = function() {
  const msg = 'getting metadata for ' + this.getFullPath();
  return this.checkNotDeleted(msg).addCallback(function() {
    return this.metadata_;
  });
};


/** @override */
FileEntry.prototype.createWriter = function() {
  const d = new Deferred();
  Timer.callOnce(
      goog.bind(d.callback, d, new FileWriter(this)));
  return d;
};

/** @override */
FileEntry.prototype.file = function() {
  const msg = 'getting file for ' + this.getFullPath();
  return this.checkNotDeleted(msg).addCallback(function() {
    return this.fileSync();
  });
};


/**
 * Get the internal file representation synchronously, without waiting for a
 * Deferred to resolve.
 *
 * @return {!File} The internal file blob referenced by this
 *     FileEntry.
 */
FileEntry.prototype.fileSync = function() {
  return this.file_;
};
