/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Factory class to create a simple autocomplete that will match
 * from an array of data provided via ajax.
 *
 * @see ../../demos/autocompleteremote.html
 */

import { AutoComplete } from './autocomplete.js';

import { InputHandler } from './inputhandler.js';
import { RemoteArrayMatcher } from './remotearraymatcher.js';
import { Renderer } from './renderer.js';
const { Map } = goog.requireType('goog.structs.map');



/**
 * Factory class for building a remote autocomplete widget that autocompletes
 * an inputbox or text area from a data array provided via ajax.
 * @param {string} url The Uri which generates the auto complete matches.
 * @param {Element} input Input element or text area.
 * @param {boolean=} opt_multi Whether to allow multiple entries; defaults
 *     to false.
 * @param {boolean=} opt_useSimilar Whether to use similar matches; e.g.
 *     "gost" => "ghost".
 * @constructor
 * @extends {AutoComplete}
 */
export function Remote(url, input, opt_multi, opt_useSimilar) {
 var matcher = new RemoteArrayMatcher(url, !opt_useSimilar);
 this.matcher_ = matcher;

 var renderer = new Renderer();

 var inputhandler = new InputHandler(null, null, !!opt_multi, 300);

 AutoComplete.call(this, matcher, renderer, inputhandler);

 inputhandler.attachAutoComplete(this);
 inputhandler.attachInputs(input);
}
goog.inherits(Remote, AutoComplete);


/**
 * Set whether or not standard highlighting should be used when rendering rows.
 * @param {boolean} useStandardHighlighting true if standard highlighting used.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Remote.prototype.setUseStandardHighlighting = function(
    useStandardHighlighting) {
 this.renderer_.setUseStandardHighlighting(useStandardHighlighting);
};


/**
 * Gets the attached InputHandler object.
 * @return {InputHandler} The input handler.
 */
Remote.prototype.getInputHandler = function() {
 return /** @type {InputHandler} */ (this.selectionHandler_);
};


/**
 * Set the send method ("GET", "POST") for the matcher.
 * @param {string} method The send method; default: GET.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Remote.prototype.setMethod = function(method) {
 this.matcher_.setMethod(method);
};


/**
 * Set the post data for the matcher.
 * @param {string} content Post data.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Remote.prototype.setContent = function(content) {
 this.matcher_.setContent(content);
};


/**
 * Set the HTTP headers for the matcher.
 * @param {Object|Map} headers Map of headers to add to the
 *     request.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Remote.prototype.setHeaders = function(headers) {
 this.matcher_.setHeaders(headers);
};


/**
 * Set the timeout interval for the matcher.
 * @param {number} interval Number of milliseconds after which an
 *     incomplete request will be aborted; 0 means no timeout is set.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Remote.prototype.setTimeoutInterval = function(interval) {
 this.matcher_.setTimeoutInterval(interval);
};
