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
function GoogProgressEvent(event, target) {
 GoogProgressEvent.base(this, 'constructor', event.type, target);

 /**
  * The underlying event object.
  * @type {!ProgressEvent}
  * @private
  */
 this.event_ = event;
}
goog.inherits(GoogProgressEvent, Event);
export {GoogProgressEvent as ProgressEvent};


/**
 * @return {boolean} Whether or not the total size of the of the file being
 *     saved is known.
 */
GoogProgressEvent.prototype.isLengthComputable = function() {
 return this.event_.lengthComputable;
};


/**
 * @return {number} The number of bytes saved so far.
 */
GoogProgressEvent.prototype.getLoaded = function() {
 return this.event_.loaded;
};


/**
 * @return {number} The total number of bytes in the file being saved.
 */
GoogProgressEvent.prototype.getTotal = function() {
 return this.event_.total;
};
