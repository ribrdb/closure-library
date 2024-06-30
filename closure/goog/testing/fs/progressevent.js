/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock ProgressEvent object.
 */

goog.setTestOnly('goog.testing.fs.ProgressEvent');

import { Event } from '../../events/event.js';
const { FileReader } = goog.requireType('goog.fs.filereader');
const { FileSaver } = goog.requireType('goog.fs.filesaver');



/**
 * A mock progress event.
 *
 * @param {!FileSaver.EventType|!FileReader.EventType} type
 *     Event type.
 * @param {number} loaded The number of bytes processed.
 * @param {number} total The total data that was to be processed, in bytes.
 * @constructor
 * @extends {Event}
 * @final
 */
export function ProgressEvent(type, loaded, total) {
 ProgressEvent.base(this, 'constructor', type);

 /**
  * The number of bytes processed.
  * @type {number}
  * @private
  */
 this.loaded_ = loaded;


 /**
  * The total data that was to be procesed, in bytes.
  * @type {number}
  * @private
  */
 this.total_ = total;
}
goog.inherits(ProgressEvent, Event);


/**
 * @see {goog.fs.ProgressEvent#isLengthComputable}
 * @return {boolean} True if the length is known.
 */
ProgressEvent.prototype.isLengthComputable = function() {
 return true;
};


/**
 * @see {goog.fs.ProgressEvent#getLoaded}
 * @return {number} The number of bytes loaded or written.
 */
ProgressEvent.prototype.getLoaded = function() {
 return this.loaded_;
};


/**
 * @see {goog.fs.ProgressEvent#getTotal}
 * @return {number} The total bytes to load or write.
 */
ProgressEvent.prototype.getTotal = function() {
 return this.total_;
};
