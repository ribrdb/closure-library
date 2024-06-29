/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Loads a list of URIs in bulk. All requests must be a success
 * in order for the load to be considered a success.
 */

import { Event } from '../events/event.js';

import { EventHandler } from '../events/eventhandler.js';
import { EventTarget } from '../events/eventtarget.js';
import * as log from '../log/log.js';
import { BulkLoaderHelper } from './bulkloaderhelper.js';
import { EventType } from './eventtype.js';
import { XhrIo } from './xhrio.js';
const { Uri } = goog.requireType('goog.uri.uri');



/**
 * Class used to load multiple URIs.
 * @param {Array<string|Uri>} uris The URIs to load.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function BulkLoader(uris) {
 EventTarget.call(this);

 /**
    * The bulk loader helper.
    * @type {BulkLoaderHelper}
    * @private
    */
 this.helper_ = new BulkLoaderHelper(uris);

 /**
     * The handler for managing events.
     * @type {EventHandler<!BulkLoader>}
     * @private
     */
 this.eventHandler_ = new EventHandler(this);
}
goog.inherits(BulkLoader, EventTarget);


/**
 * A logger.
 * @type {log.Logger}
 * @private
 */
BulkLoader.prototype.logger_ =
    log.getLogger('goog.net.BulkLoader');


/**
 * Gets the response texts, in order.
 * @return {Array<string>} The response texts.
 */
BulkLoader.prototype.getResponseTexts = function() {
 return this.helper_.getResponseTexts();
};


/**
 * Gets the request Uris.
 * @return {Array<string>} The request URIs, in order.
 */
BulkLoader.prototype.getRequestUris = function() {
 return this.helper_.getUris();
};


/**
 * Starts the process of loading the URIs.
 */
BulkLoader.prototype.load = function() {
 const eventHandler = this.eventHandler_;
 const uris = this.helper_.getUris();
 log.info(
     this.logger_, 'Starting load of code with ' + uris.length + ' uris.');

 for (let i = 0; i < uris.length; i++) {
   const xhrIo = new XhrIo();
   eventHandler.listen(
       xhrIo, EventType.COMPLETE,
       goog.bind(this.handleEvent_, this, i));

   xhrIo.send(uris[i]);
 }
};


/**
 * Handles all events fired by the XhrManager.
 * @param {number} id The id of the request.
 * @param {Event} e The event.
 * @private
 */
BulkLoader.prototype.handleEvent_ = function(id, e) {
 log.info(
     this.logger_,
     'Received event "' + e.type + '" for id ' + id + ' with uri ' +
         this.helper_.getUri(id));
 const xhrIo = /** @type {XhrIo} */ (e.target);
 if (xhrIo.isSuccess()) {
   this.handleSuccess_(id, xhrIo);
 } else {
   this.handleError_(id, xhrIo);
 }
};


/**
 * Handles when a request is successful (i.e., completed and response received).
 * Stores thhe responseText and checks if loading is complete.
 * @param {number} id The id of the request.
 * @param {XhrIo} xhrIo The XhrIo objects that was used.
 * @private
 */
BulkLoader.prototype.handleSuccess_ = function(id, xhrIo) {
 // Save the response text.
 this.helper_.setResponseText(id, xhrIo.getResponseText());

 // Check if all response texts have been received.
 if (this.helper_.isLoadComplete()) {
   this.finishLoad_();
 }
 xhrIo.dispose();
};


/**
 * Handles when a request has ended in error (i.e., all retries completed and
 * none were successful). Cancels loading of the URI's.
 * @param {number|string} id The id of the request.
 * @param {XhrIo} xhrIo The XhrIo objects that was used.
 * @private
 */
BulkLoader.prototype.handleError_ = function(id, xhrIo) {
 // TODO(user): Abort all pending requests.

 // Dispatch the ERROR event.
 this.dispatchEvent(new BulkLoader.LoadErrorEvent(xhrIo.getStatus()));
 xhrIo.dispose();
};


/**
 * Finishes the load of the URI's. Dispatches the SUCCESS event.
 * @private
 */
BulkLoader.prototype.finishLoad_ = function() {
 log.info(this.logger_, 'All uris loaded.');

 // Dispatch the SUCCESS event.
 this.dispatchEvent(EventType.SUCCESS);
};


/** @override */
BulkLoader.prototype.disposeInternal = function() {
 BulkLoader.superClass_.disposeInternal.call(this);

 this.eventHandler_.dispose();
 this.eventHandler_ = null;

 this.helper_.dispose();
 this.helper_ = null;
};


/**
 * @param {number} status The response status.
 * @constructor
 * @extends {Event}
 * @final
 * @protected
 */
BulkLoader.LoadErrorEvent = function(status) {
 BulkLoader.LoadErrorEvent.base(
     this, 'constructor', EventType.ERROR);

 /** @type {number} */
 this.status = status;
};
goog.inherits(BulkLoader.LoadErrorEvent, Event);
