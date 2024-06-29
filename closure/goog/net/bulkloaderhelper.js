/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper class to load a list of URIs in bulk. All URIs
 * must be a successfully loaded in order for the entire load to be considered
 * a success.
 */

import { Disposable } from '../disposable/disposable.js';

const { Uri } = goog.requireType('goog.uri.uri');



/**
 * Helper class used to load multiple URIs.
 * @param {Array<string|Uri>} uris The URIs to load.
 * @constructor
 * @extends {Disposable}
 * @final
 */
export function BulkLoaderHelper(uris) {
 Disposable.call(this);

 /**
  * The URIs to load.
  * @type {Array<string|Uri>}
  * @private
  */
 this.uris_ = uris;

 /**
  * The response from the XHR's.
  * @type {Array<string>}
  * @private
  */
 this.responseTexts_ = [];
}
goog.inherits(BulkLoaderHelper, Disposable);



/**
 * Gets the URI by id.
 * @param {number} id The id.
 * @return {string|Uri} The URI specified by the id.
 */
BulkLoaderHelper.prototype.getUri = function(id) {
 return this.uris_[id];
};


/**
 * Gets the URIs.
 * @return {Array<string|Uri>} The URIs.
 */
BulkLoaderHelper.prototype.getUris = function() {
 return this.uris_;
};


/**
 * Gets the response texts.
 * @return {Array<string>} The response texts.
 */
BulkLoaderHelper.prototype.getResponseTexts = function() {
 return this.responseTexts_;
};


/**
 * Sets the response text by id.
 * @param {number} id The id.
 * @param {string} responseText The response texts.
 */
BulkLoaderHelper.prototype.setResponseText = function(
    id, responseText) {
 this.responseTexts_[id] = responseText;
};


/**
 * Determines if the load of the URIs is complete.
 * @return {boolean} TRUE iff the load is complete.
 */
BulkLoaderHelper.prototype.isLoadComplete = function() {
 const responseTexts = this.responseTexts_;
 if (responseTexts.length == this.uris_.length) {
   for (let i = 0; i < responseTexts.length; i++) {
     if (responseTexts[i] == null) {
       return false;
     }
   }
   return true;
 }
 return false;
};


/** @override */
BulkLoaderHelper.prototype.disposeInternal = function() {
 BulkLoaderHelper.superClass_.disposeInternal.call(this);

 this.uris_ = null;
 this.responseTexts_ = null;
};
