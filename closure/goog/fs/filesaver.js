/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A wrapper for the HTML5 FileSaver object.
 */

goog.declareModuleId('goog.fs.filesaver');

import { EventTarget } from '../events/eventtarget.js';
import { Error } from './error.js';
import { ProgressEvent } from './progressevent.js';



/**
 * An object for monitoring the saving of files. This emits ProgressEvents of
 * the types listed in {@link FileSaver.EventType}.
 *
 * This should not be instantiated directly. Instead, its subclass
 * {@link goog.fs.FileWriter} should be accessed via
 * {@link goog.fs.FileEntry#createWriter}.
 *
 * @param {!FileSaver} fileSaver The underlying FileSaver object.
 * @constructor
 * @extends {EventTarget}
 */
export function FileSaver(fileSaver) {
 FileSaver.base(this, 'constructor');

 /**
  * The underlying FileSaver object.
  *
  * @type {!FileSaver}
  * @private
  */
 this.saver_ = fileSaver;

 this.saver_.onwritestart = goog.bind(this.dispatchProgressEvent_, this);
 this.saver_.onprogress = goog.bind(this.dispatchProgressEvent_, this);
 this.saver_.onwrite = goog.bind(this.dispatchProgressEvent_, this);
 this.saver_.onabort = goog.bind(this.dispatchProgressEvent_, this);
 this.saver_.onerror = goog.bind(this.dispatchProgressEvent_, this);
 this.saver_.onwriteend = goog.bind(this.dispatchProgressEvent_, this);
}
goog.inherits(FileSaver, EventTarget);


/**
 * Possible states for a FileSaver.
 *
 * @enum {number}
 */
FileSaver.ReadyState = {
  /**
   * The object has been constructed, but there is no pending write.
   */
  INIT: 0,
  /**
   * Data is being written.
   */
  WRITING: 1,
  /**
   * The data has been written to the file, the write was aborted, or an error
   * occurred.
   */
  DONE: 2
};


/**
 * Events emitted by a FileSaver.
 *
 * @enum {string}
 */
FileSaver.EventType = {
  /**
   * Emitted when the writing begins. readyState will be WRITING.
   */
  WRITE_START: 'writestart',
  /**
   * Emitted when progress has been made in saving the file. readyState will be
   * WRITING.
   */
  PROGRESS: 'progress',
  /**
   * Emitted when the data has been successfully written. readyState will be
   * WRITING.
   */
  WRITE: 'write',
  /**
   * Emitted when the writing has been aborted. readyState will be WRITING.
   */
  ABORT: 'abort',
  /**
   * Emitted when an error is encountered or the writing has been aborted.
   * readyState will be WRITING.
   */
  ERROR: 'error',
  /**
   * Emitted when the writing is finished, whether successfully or not.
   * readyState will be DONE.
   */
  WRITE_END: 'writeend'
};


/**
 * Abort the writing of the file.
 */
FileSaver.prototype.abort = function() {
 try {
   this.saver_.abort();
 } catch (e) {
   throw new Error(e, 'aborting save');
 }
};


/**
 * @return {FileSaver.ReadyState} The current state of the FileSaver.
 */
FileSaver.prototype.getReadyState = function() {
 return (
  /** @type {FileSaver.ReadyState} */ (this.saver_.readyState)
 );
};


/**
 * @return {Error} The error encountered while writing, if any.
 */
FileSaver.prototype.getError = function() {
 return this.saver_.error &&
     new Error(this.saver_.error, 'saving file');
};


/**
 * Wrap a progress event emitted by the underlying file saver and re-emit it.
 *
 * @param {!ProgressEvent} event The underlying event.
 * @private
 */
FileSaver.prototype.dispatchProgressEvent_ = function(event) {
 this.dispatchEvent(new ProgressEvent(event, this));
};


/** @override */
FileSaver.prototype.disposeInternal = function() {
 delete this.saver_;
 FileSaver.base(this, 'disposeInternal');
};
