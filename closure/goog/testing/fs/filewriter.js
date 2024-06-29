goog.declareModuleId('goog.testing.fs.filewriter');
/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock FileWriter object.
 */

goog.setTestOnly('goog.testing.fs.FileWriter');

import { Timer } from '../../timer/timer.js';
import { EventTarget } from '../../events/eventtarget.js';
import { Error } from '../../fs/error.js';
import { FileSaver } from '../../fs/filesaver.js';
import * as googString from '../../string/string.js';
import { Blob } from './blob.js';
import { File } from './file.js';
import { ProgressEvent } from './progressevent.js';
const { FileEntry } = goog.requireType('goog.testing.fs.entry');



/**
 * A mock FileWriter object. This emits the same events as
 * {@link FileSaver} and {@link goog.fs.FileWriter}.
 *
 * @param {!FileEntry} fileEntry The file entry to write to.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function FileWriter(fileEntry) {
  FileWriter.base(this, 'constructor');

  /**
     * The file entry to which to write.
     * @type {!FileEntry}
     * @private
     */
  this.fileEntry_ = fileEntry;

  /**
     * The file blob to write to.
     * @type {!File}
     * @private
     */
  this.file_ = fileEntry.fileSync();

  /**
     * The current state of the writer.
     * @type {FileSaver.ReadyState}
     * @private
     */
  this.readyState_ = FileSaver.ReadyState.INIT;
}
goog.inherits(FileWriter, EventTarget);


/**
 * The most recent error experienced by this writer.
 * @type {Error}
 * @private
 */
FileWriter.prototype.error_;


/**
 * Whether the current operation has been aborted.
 * @type {boolean}
 * @private
 */
FileWriter.prototype.aborted_ = false;


/**
 * The current position in the file.
 * @type {number}
 * @private
 */
FileWriter.prototype.position_ = 0;


/**
 * @see {FileSaver#getReadyState}
 * @return {FileSaver.ReadyState} The ready state.
 */
FileWriter.prototype.getReadyState = function() {
  return this.readyState_;
};


/**
 * @see {FileSaver#getError}
 * @return {Error} The error.
 */
FileWriter.prototype.getError = function() {
  return this.error_;
};


/**
 * @see {goog.fs.FileWriter#getPosition}
 * @return {number} The position.
 */
FileWriter.prototype.getPosition = function() {
  return this.position_;
};


/**
 * @see {goog.fs.FileWriter#getLength}
 * @return {number} The length.
 */
FileWriter.prototype.getLength = function() {
  return this.file_.size;
};


/**
 * @see {FileSaver#abort}
 */
FileWriter.prototype.abort = function() {
  if (this.readyState_ != FileSaver.ReadyState.WRITING) {
    const msg = 'aborting save of ' + this.fileEntry_.getFullPath();
    throw new Error({'name': 'InvalidStateError'}, msg);
  }

  this.aborted_ = true;
};


/**
 * @see {goog.fs.FileWriter#write}
 * @param {!Blob} blob The blob to write.
 */
FileWriter.prototype.write = function(blob) {
  if (this.readyState_ == FileSaver.ReadyState.WRITING) {
    const msg = 'writing to ' + this.fileEntry_.getFullPath();
    throw new Error({'name': 'InvalidStateError'}, msg);
  }

  this.readyState_ = FileSaver.ReadyState.WRITING;
  Timer.callOnce(function() {
    if (this.aborted_) {
      this.abort_(blob.size);
      return;
    }

    this.progressEvent_(FileSaver.EventType.WRITE_START, 0, blob.size);
    const fileString = this.file_.toString();
    this.file_.setDataInternal(
        fileString.substring(0, this.position_) + blob.toString() +
        fileString.substring(this.position_ + blob.size, fileString.length));
    this.position_ += blob.size;

    this.progressEvent_(
        FileSaver.EventType.WRITE, blob.size, blob.size);
    this.readyState_ = FileSaver.ReadyState.DONE;
    this.progressEvent_(
        FileSaver.EventType.WRITE_END, blob.size, blob.size);
  }, 0, this);
};


/**
 * @see {goog.fs.FileWriter#truncate}
 * @param {number} size The size to truncate to.
 */
FileWriter.prototype.truncate = function(size) {
  if (this.readyState_ == FileSaver.ReadyState.WRITING) {
    const msg = 'truncating ' + this.fileEntry_.getFullPath();
    throw new Error({'name': 'InvalidStateError'}, msg);
  }

  this.readyState_ = FileSaver.ReadyState.WRITING;
  Timer.callOnce(function() {
    if (this.aborted_) {
      this.abort_(size);
      return;
    }

    this.progressEvent_(FileSaver.EventType.WRITE_START, 0, size);

    const fileString = this.file_.toString();
    if (size > fileString.length) {
      this.file_.setDataInternal(
          fileString + googString.repeat('\0', size - fileString.length));
    } else {
      this.file_.setDataInternal(fileString.substring(0, size));
    }
    this.position_ = Math.min(this.position_, size);

    this.progressEvent_(FileSaver.EventType.WRITE, size, size);
    this.readyState_ = FileSaver.ReadyState.DONE;
    this.progressEvent_(FileSaver.EventType.WRITE_END, size, size);
  }, 0, this);
};


/**
 * @see {goog.fs.FileWriter#seek}
 * @param {number} offset The offset to seek to.
 */
FileWriter.prototype.seek = function(offset) {
  if (this.readyState_ == FileSaver.ReadyState.WRITING) {
    const msg = 'truncating ' + this.fileEntry_.getFullPath();
    throw new Error({name: 'InvalidStateError'}, msg);
  }

  if (offset < 0) {
    this.position_ = Math.max(0, this.file_.size + offset);
  } else {
    this.position_ = Math.min(offset, this.file_.size);
  }
};


/**
 * Abort the current action and emit appropriate events.
 *
 * @param {number} total The total data that was to be processed, in bytes.
 * @private
 */
FileWriter.prototype.abort_ = function(total) {
  this.error_ = new Error(
      {'name': 'AbortError'}, 'saving ' + this.fileEntry_.getFullPath());
  this.progressEvent_(FileSaver.EventType.ERROR, 0, total);
  this.progressEvent_(FileSaver.EventType.ABORT, 0, total);
  this.readyState_ = FileSaver.ReadyState.DONE;
  this.progressEvent_(FileSaver.EventType.WRITE_END, 0, total);
  this.aborted_ = false;
};


/**
 * Dispatch a progress event.
 *
 * @param {FileSaver.EventType} type The type of the event.
 * @param {number} loaded The number of bytes processed.
 * @param {number} total The total data that was to be processed, in bytes.
 * @private
 */
FileWriter.prototype.progressEvent_ = function(
    type, loaded, total) {
  // On write, update the last modified date to the current (real or mock) time.
  if (type == FileSaver.EventType.WRITE) {
    this.file_.lastModifiedDate = new Date(Date.now());
  }

  this.dispatchEvent(new ProgressEvent(type, loaded, total));
};
