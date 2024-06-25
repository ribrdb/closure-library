/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A wrapper for the HTML5 File ProgressEvent objects.
 */
import { Event } from '../events/event.js';



/**
 * A wrapper for the progress events emitted by the File APIs.
 *
 * @param {!ProgressEvent} event The underlying event object.
 * @param {!Object} target The file access object emitting the event.
 * @extends {Event}
 * @constructor
 * @final
 */
export function ProgressEvent(event, target) {
 ProgressEvent.base(this, 'constructor', event.type, target);

 /**
  * The underlying event object.
  * @type {!ProgressEvent}
  * @private
  */
 this.event_ = event;
}
goog.inherits(ProgressEvent, Event);


/**
 * @return {boolean} Whether or not the total size of the of the file being
 *     saved is known.
 */
ProgressEvent.prototype.isLengthComputable = function() {
 return this.event_.lengthComputable;
};


/**
 * @return {number} The number of bytes saved so far.
 */
ProgressEvent.prototype.getLoaded = function() {
 return this.event_.loaded;
};


/**
 * @return {number} The total number of bytes in the file being saved.
 */
ProgressEvent.prototype.getTotal = function() {
 return this.event_.total;
};
