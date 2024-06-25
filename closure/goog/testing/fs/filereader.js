/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock FileReader object.
 */

goog.setTestOnly('goog.testing.fs.FileReader');

import { Timer } from '../../timer/timer.js';
import { EventTarget } from '../../events/eventtarget.js';
import { Error } from '../../fs/error.js';
import { FileReader as fsFileReader } from '../../fs/filereader.js';
import { Blob } from './blob.js';
import { ProgressEvent } from './progressevent.js';



/**
 * A mock FileReader object. This emits the same events as
 * {@link fsFileReader}.
 *
 * @constructor
 * @extends {EventTarget}
 */
export function FileReader() {
 FileReader.base(this, 'constructor');

 /**
   * The current state of the reader.
   * @type {fsFileReader.ReadyState}
   * @private
   */
 this.readyState_ = fsFileReader.ReadyState.INIT;
}
goog.inherits(FileReader, EventTarget);


/**
 * The most recent error experienced by this reader.
 * @type {Error}
 * @private
 */
FileReader.prototype.error_;


/**
 * Whether the current operation has been aborted.
 * @type {boolean}
 * @private
 */
FileReader.prototype.aborted_ = false;


/**
 * The blob this reader is reading from.
 * @type {Blob}
 * @private
 */
FileReader.prototype.blob_;


/**
 * The possible return types.
 * @enum {number}
 */
FileReader.ReturnType = {
  /**
   * Used when reading as text.
   */
  TEXT: 1,

  /**
   * Used when reading as binary string.
   */
  BINARY_STRING: 2,

  /**
   * Used when reading as array buffer.
   */
  ARRAY_BUFFER: 3,

  /**
   * Used when reading as data URL.
   */
  DATA_URL: 4
};


/**
 * The return type we're reading.
 * @type {FileReader.ReturnType}
 * @private
 */
FileReader.prototype.returnType_;


/**
 * @see {fsFileReader#getReadyState}
 * @return {fsFileReader.ReadyState} The current ready state.
 */
FileReader.prototype.getReadyState = function() {
 return this.readyState_;
};


/**
 * @see {fsFileReader#getError}
 * @return {Error} The current error.
 */
FileReader.prototype.getError = function() {
 return this.error_;
};


/**
 * @see {fsFileReader#abort}
 */
FileReader.prototype.abort = function() {
 if (this.readyState_ != fsFileReader.ReadyState.LOADING) {
   const msg = 'aborting read';
   throw new Error({'name': 'InvalidStateError'}, msg);
 }

 this.aborted_ = true;
};


/**
 * @see {fsFileReader#getResult}
 * @return {*} The result of the file read.
 */
FileReader.prototype.getResult = function() {
 if (this.readyState_ != fsFileReader.ReadyState.DONE) {
   return undefined;
 }
 if (this.error_) {
   return undefined;
 }
 if (this.returnType_ == FileReader.ReturnType.TEXT) {
   return this.blob_.toString();
 } else if (
     this.returnType_ == FileReader.ReturnType.ARRAY_BUFFER) {
   return this.blob_.toArrayBuffer();
 } else if (
     this.returnType_ == FileReader.ReturnType.BINARY_STRING) {
   return this.blob_.toString();
 } else if (
     this.returnType_ == FileReader.ReturnType.DATA_URL) {
   return this.blob_.toDataUrl();
 } else {
   return undefined;
 }
};


/**
 * Fires the read events.
 * @param {!Blob} blob The blob to read from.
 * @private
 */
FileReader.prototype.read_ = function(blob) {
 this.blob_ = blob;
 if (this.readyState_ == fsFileReader.ReadyState.LOADING) {
   const msg = 'reading file';
   throw new Error({'name': 'InvalidStateError'}, msg);
 }

 this.readyState_ = fsFileReader.ReadyState.LOADING;
 Timer.callOnce(function() {
  if (this.aborted_) {
    this.abort_(blob.size);
    return;
  }

  this.progressEvent_(fsFileReader.EventType.LOAD_START, 0, blob.size);
  this.progressEvent_(
      fsFileReader.EventType.LOAD, blob.size / 2, blob.size);
  this.progressEvent_(
      fsFileReader.EventType.LOAD, blob.size, blob.size);
  this.readyState_ = fsFileReader.ReadyState.DONE;
  this.progressEvent_(
      fsFileReader.EventType.LOAD, blob.size, blob.size);
  this.progressEvent_(
      fsFileReader.EventType.LOAD_END, blob.size, blob.size);
 }, 0, this);
};


/**
 * @see {fsFileReader#readAsBinaryString}
 * @param {!Blob} blob The blob to read.
 */
FileReader.prototype.readAsBinaryString = function(blob) {
 this.returnType_ = FileReader.ReturnType.BINARY_STRING;
 this.read_(blob);
};


/**
 * @see {fsFileReader#readAsArrayBuffer}
 * @param {!Blob} blob The blob to read.
 */
FileReader.prototype.readAsArrayBuffer = function(blob) {
 this.returnType_ = FileReader.ReturnType.ARRAY_BUFFER;
 this.read_(blob);
};


/**
 * @see {fsFileReader#readAsText}
 * @param {!Blob} blob The blob to read.
 * @param {string=} opt_encoding The name of the encoding to use.
 */
FileReader.prototype.readAsText = function(blob, opt_encoding) {
 this.returnType_ = FileReader.ReturnType.TEXT;
 this.read_(blob);
};


/**
 * @see {fsFileReader#readAsDataUrl}
 * @param {!Blob} blob The blob to read.
 */
FileReader.prototype.readAsDataUrl = function(blob) {
 this.returnType_ = FileReader.ReturnType.DATA_URL;
 this.read_(blob);
};


/**
 * Abort the current action and emit appropriate events.
 *
 * @param {number} total The total data that was to be processed, in bytes.
 * @private
 */
FileReader.prototype.abort_ = function(total) {
 this.error_ = new Error({'name': 'AbortError'}, 'reading file');
 this.progressEvent_(fsFileReader.EventType.ERROR, 0, total);
 this.progressEvent_(fsFileReader.EventType.ABORT, 0, total);
 this.readyState_ = fsFileReader.ReadyState.DONE;
 this.progressEvent_(fsFileReader.EventType.LOAD_END, 0, total);
 this.aborted_ = false;
};


/**
 * Dispatch a progress event.
 *
 * @param {fsFileReader.EventType} type The event type.
 * @param {number} loaded The number of bytes processed.
 * @param {number} total The total data that was to be processed, in bytes.
 * @private
 */
FileReader.prototype.progressEvent_ = function(
    type, loaded, total) {
 this.dispatchEvent(new ProgressEvent(type, loaded, total));
};
