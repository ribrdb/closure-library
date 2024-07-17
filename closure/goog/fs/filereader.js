/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A wrapper for the HTML5 FileReader object.
 */

goog.declareModuleId('goog.fs.filereader');

import { Deferred } from '../../../third_party/closure/goog/mochikit/async/deferred.js';
import { EventTarget } from '../events/eventtarget.js';
import { Error } from './error.js';
import { ProgressEvent as GoogProgressEvent } from './progressevent.js';



/**
 * An object for monitoring the reading of files. This emits ProgressEvents of
 * the types listed in {@link FileReader_.EventType}.
 *
 * @constructor
 * @extends {EventTarget}
 * @final
 */
function FileReader_() {
 FileReader_.base(this, 'constructor');

 /**
  * The underlying FileReader object.
  *
  * @type {!FileReader}
  * @private
  */
 this.reader_ = new FileReader();

 this.reader_.onloadstart = goog.bind(this.dispatchProgressEvent_, this);
 this.reader_.onprogress = goog.bind(this.dispatchProgressEvent_, this);
 this.reader_.onload = goog.bind(this.dispatchProgressEvent_, this);
 this.reader_.onabort = goog.bind(this.dispatchProgressEvent_, this);
 this.reader_.onerror = goog.bind(this.dispatchProgressEvent_, this);
 this.reader_.onloadend = goog.bind(this.dispatchProgressEvent_, this);
}
export { FileReader_ as FileReader };
goog.inherits(FileReader_, EventTarget);


/**
 * Possible states for a FileReader.
 *
 * @enum {number}
 */
FileReader_.ReadyState = {
  /**
   * The object has been constructed, but there is no pending read.
   */
  INIT: 0,
  /**
   * Data is being read.
   */
  LOADING: 1,
  /**
   * The data has been read from the file, the read was aborted, or an error
   * occurred.
   */
  DONE: 2
};


/**
 * Events emitted by a FileReader.
 *
 * @enum {string}
 */
FileReader_.EventType = {
  /**
   * Emitted when the reading begins. readyState will be LOADING.
   */
  LOAD_START: 'loadstart',
  /**
   * Emitted when progress has been made in reading the file. readyState will be
   * LOADING.
   */
  PROGRESS: 'progress',
  /**
   * Emitted when the data has been successfully read. readyState will be
   * LOADING.
   */
  LOAD: 'load',
  /**
   * Emitted when the reading has been aborted. readyState will be LOADING.
   */
  ABORT: 'abort',
  /**
   * Emitted when an error is encountered or the reading has been aborted.
   * readyState will be LOADING.
   */
  ERROR: 'error',
  /**
   * Emitted when the reading is finished, whether successfully or not.
   * readyState will be DONE.
   */
  LOAD_END: 'loadend'
};


/**
 * Abort the reading of the file.
 */
FileReader_.prototype.abort = function() {
 try {
   this.reader_.abort();
 } catch (e) {
   throw new Error(e, 'aborting read');
 }
};


/**
 * @return {FileReader_.ReadyState} The current state of the FileReader.
 */
FileReader_.prototype.getReadyState = function() {
 return /** @type {FileReader_.ReadyState} */ (this.reader_.readyState);
};


/**
 * @return {*} The result of the file read.
 */
FileReader_.prototype.getResult = function() {
 return this.reader_.result;
};


/**
 * @return {Error} The error encountered while reading, if any.
 */
FileReader_.prototype.getError = function() {
 return this.reader_.error &&
     new Error(this.reader_.error, 'reading file');
};


/**
 * Wrap a progress event emitted by the underlying file reader and re-emit it.
 *
 * @param {!ProgressEvent} event The underlying event.
 * @private
 */
FileReader_.prototype.dispatchProgressEvent_ = function(event) {
 this.dispatchEvent(new GoogProgressEvent(event, this));
};


/** @override */
FileReader_.prototype.disposeInternal = function() {
 FileReader_.base(this, 'disposeInternal');
 delete this.reader_;
};


/**
 * Starts reading a blob as a binary string.
 * @param {!Blob} blob The blob to read.
 */
FileReader_.prototype.readAsBinaryString = function(blob) {
 this.reader_.readAsBinaryString(blob);
};


/**
 * Reads a blob as a binary string.
 * @param {!Blob} blob The blob to read.
 * @return {!Deferred} The deferred Blob contents as a binary string.
 *     If an error occurs, the errback is called with a {@link Error}.
 */
FileReader_.readAsBinaryString = function(blob) {
 const reader = new FileReader_();
 const d = FileReader_.createDeferred_(reader);
 reader.readAsBinaryString(blob);
 return d;
};


/**
 * Starts reading a blob as an array buffer.
 * @param {!Blob} blob The blob to read.
 */
FileReader_.prototype.readAsArrayBuffer = function(blob) {
 this.reader_.readAsArrayBuffer(blob);
};


/**
 * Reads a blob as an array buffer.
 * @param {!Blob} blob The blob to read.
 * @return {!Deferred} The deferred Blob contents as an array buffer.
 *     If an error occurs, the errback is called with a {@link Error}.
 */
FileReader_.readAsArrayBuffer = function(blob) {
 const reader = new FileReader_();
 const d = FileReader_.createDeferred_(reader);
 reader.readAsArrayBuffer(blob);
 return d;
};


/**
 * Starts reading a blob as text.
 * @param {!Blob} blob The blob to read.
 * @param {string=} opt_encoding The name of the encoding to use.
 */
FileReader_.prototype.readAsText = function(blob, opt_encoding) {
 this.reader_.readAsText(blob, opt_encoding);
};


/**
 * Reads a blob as text.
 * @param {!Blob} blob The blob to read.
 * @param {string=} opt_encoding The name of the encoding to use.
 * @return {!Deferred} The deferred Blob contents as text.
 *     If an error occurs, the errback is called with a {@link Error}.
 */
FileReader_.readAsText = function(blob, opt_encoding) {
 const reader = new FileReader_();
 const d = FileReader_.createDeferred_(reader);
 reader.readAsText(blob, opt_encoding);
 return d;
};


/**
 * Starts reading a blob as a data URL.
 * @param {!Blob} blob The blob to read.
 */
FileReader_.prototype.readAsDataUrl = function(blob) {
 this.reader_.readAsDataURL(blob);
};


/**
 * Reads a blob as a data URL.
 * @param {!Blob} blob The blob to read.
 * @return {!Deferred} The deferred Blob contents as a data URL.
 *     If an error occurs, the errback is called with a {@link Error}.
 */
FileReader_.readAsDataUrl = function(blob) {
 const reader = new FileReader_();
 const d = FileReader_.createDeferred_(reader);
 reader.readAsDataUrl(blob);
 return d;
};


/**
 * Creates a new deferred object for the results of a read method.
 * @param {FileReader_} reader The reader to create a deferred for.
 * @return {!Deferred} The deferred results.
 * @private
 */
FileReader_.createDeferred_ = function(reader) {
 const deferred = new Deferred();
 reader.listen(
     FileReader_.EventType.LOAD_END, goog.partial(function(d, r, e) {
  const result = r.getResult();
  const error = r.getError();
  if (result != null && !error) {
    d.callback(result);
  } else {
    d.errback(error);
  }
  r.dispose();
 }, deferred, reader));
 return deferred;
};
