/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class that retrieves autocomplete matches via an ajax call.
 */

import { Disposable } from '../../disposable/disposable.js';

import { Uri } from '../../uri/uri.js';
import * as events from '../../events/events.js';
import { EventType } from '../../net/eventtype.js';
import { XhrIo } from '../../net/xhrio.js';
const { Event } = goog.requireType('goog.events.event');
const { XmlHttpFactory } = goog.requireType('goog.net.xmlhttpfactory');
const { Map } = goog.requireType('goog.structs.map');



/**
 * An array matcher that requests matches via ajax.
 * @param {string} url The Uri which generates the auto complete matches.  The
 *     search term is passed to the server as the 'token' query param.
 * @param {boolean=} opt_noSimilar If true, request that the server does not do
 *     similarity matches for the input token against the dictionary.
 *     The value is sent to the server as the 'use_similar' query param which is
 *     either "1" (opt_noSimilar==false) or "0" (opt_noSimilar==true).
 * @param {XmlHttpFactory=} opt_xmlHttpFactory Specify the
 *     XmlHttpFactory used to retrieve the matches.
 * @constructor
 * @extends {Disposable}
 */
export function RemoteArrayMatcher(url, opt_noSimilar, opt_xmlHttpFactory) {
 Disposable.call(this);

 /**
  * The base URL for the ajax call.  The token and max_matches are added as
  * query params.
  * @type {string}
  * @private
  */
 this.url_ = url;

 /**
  * Whether similar matches should be found as well.  This is sent as a hint
  * to the server only.
  * @type {boolean}
  * @private
  */
 this.useSimilar_ = !opt_noSimilar;

 /**
   * The XhrIo object used for making remote requests.  When a new request
   * is made, the current one is aborted and the new one sent.
   * @type {XhrIo}
   * @private
   */
 this.xhr_ = new XhrIo(opt_xmlHttpFactory);
}
goog.inherits(RemoteArrayMatcher, Disposable);


/**
 * The HTTP send method (GET, POST) to use when making the ajax call.
 * @type {string}
 * @private
 */
RemoteArrayMatcher.prototype.method_ = 'GET';


/**
 * Data to submit during a POST.
 * @type {string|undefined}
 * @private
 */
RemoteArrayMatcher.prototype.content_ = undefined;


/**
 * Headers to send with every HTTP request.
 * @type {?Object|?Map}
 * @private
 */
RemoteArrayMatcher.prototype.headers_ = null;


/**
 * Key to the listener on XHR. Used to clear previous listeners.
 * @type {?events.Key}
 * @private
 */
RemoteArrayMatcher.prototype.lastListenerKey_ = null;


/**
 * Set the send method ("GET", "POST").
 * @param {string} method The send method; default: GET.
 */
RemoteArrayMatcher.prototype.setMethod = function(method) {
 this.method_ = method;
};


/**
 * Set the post data.
 * @param {string} content Post data.
 */
RemoteArrayMatcher.prototype.setContent = function(content) {
 this.content_ = content;
};


/**
 * Set the HTTP headers.
 * @param {Object|Map} headers Map of headers to add to the
 *     request.
 */
RemoteArrayMatcher.prototype.setHeaders = function(headers) {
 this.headers_ = headers;
};


/**
 * Set the timeout interval.
 * @param {number} interval Number of milliseconds after which an
 *     incomplete request will be aborted; 0 means no timeout is set.
 */
RemoteArrayMatcher.prototype.setTimeoutInterval = function(
    interval) {
 this.xhr_.setTimeoutInterval(interval);
};


/**
 * Builds a complete GET-style URL, given the base URI and autocomplete related
 * parameter values.
 * <b>Override this to build any customized lookup URLs.</b>
 * <b>Can be used to change request method and any post content as well.</b>
 * @param {string} uri The base URI of the request target.
 * @param {string} token Current token in autocomplete.
 * @param {number} maxMatches Maximum number of matches required.
 * @param {boolean} useSimilar A hint to the server.
 * @param {string=} opt_fullString Complete text in the input element.
 * @return {?string} The complete url. Return null if no request should be sent.
 * @protected
 */
RemoteArrayMatcher.prototype.buildUrl = function(
    uri, token, maxMatches, useSimilar, opt_fullString) {
 var url = new Uri(uri);
 url.setParameterValue('token', token);
 url.setParameterValue('max_matches', String(maxMatches));
 url.setParameterValue('use_similar', String(Number(useSimilar)));
 return url.toString();
};


/**
 * Returns whether the suggestions should be updated?
 * <b>Override this to prevent updates eg - when token is empty.</b>
 * @param {string} uri The base URI of the request target.
 * @param {string} token Current token in autocomplete.
 * @param {number} maxMatches Maximum number of matches required.
 * @param {boolean} useSimilar A hint to the server.
 * @param {string=} opt_fullString Complete text in the input element.
 * @return {boolean} Whether new matches be requested.
 * @protected
 */
RemoteArrayMatcher.prototype.shouldRequestMatches = function(
    uri, token, maxMatches, useSimilar, opt_fullString) {
 return true;
};


/**
 * Parses and retrieves the array of suggestions from XHR response.
 * <b>Override this if the response is not a simple JSON array.</b>
 * @param {string} responseText The XHR response text.
 * @return {Array<string>} The array of suggestions.
 * @protected
 */
RemoteArrayMatcher.prototype.parseResponseText = function(
    responseText) {
 var matches = [];
 // If there is no response text, JSON.parse will throw a syntax error.
 if (responseText) {

   try {
     matches = JSON.parse(responseText);
   } catch (exception) {
   }
 }
 return /** @type {Array<string>} */ (matches);
};


/**
 * Handles the XHR response.
 * @param {string} token The XHR autocomplete token.
 * @param {Function} matchHandler The AutoComplete match handler.
 * @param {Event} event The XHR success event.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
RemoteArrayMatcher.prototype.xhrCallback = function(
    token, matchHandler, event) {
 var text = event.target.getResponseText();
 matchHandler(token, this.parseResponseText(text));
};


/**
 * Retrieve a set of matching rows from the server via ajax.
 * @param {string} token The text that should be matched; passed to the server
 *     as the 'token' query param.
 * @param {number} maxMatches The maximum number of matches requested from the
 *     server; passed as the 'max_matches' query param.  The server is
 *     responsible for limiting the number of matches that are returned.
 * @param {Function} matchHandler Callback to execute on the result after
 *     matching.
 * @param {string=} opt_fullString The full string from the input box.
 */
RemoteArrayMatcher.prototype.requestMatchingRows = function(
    token, maxMatches, matchHandler, opt_fullString) {
 if (!this.shouldRequestMatches(
         this.url_, token, maxMatches, this.useSimilar_, opt_fullString)) {
   return;
 }
 // Set the query params on the URL.
 var url = this.buildUrl(
     this.url_, token, maxMatches, this.useSimilar_, opt_fullString);
 if (!url) {
   // Do nothing if there is no URL.
   return;
 }

 // The callback evals the server response and calls the match handler on
 // the array of matches.
 var callback = goog.bind(this.xhrCallback, this, token, matchHandler);

 // Abort the current request and issue the new one; prevent requests from
 // being queued up by the browser with a slow server
 if (this.xhr_.isActive()) {
   this.xhr_.abort();
 }
 // This ensures if previous XHR is aborted or ends with error, the
 // corresponding success-callbacks are cleared.
 if (this.lastListenerKey_) {
   events.unlistenByKey(this.lastListenerKey_);
 }
 // Listen once ensures successful callback gets cleared by itself.
 this.lastListenerKey_ =
     events.listenOnce(this.xhr_, EventType.SUCCESS, callback);
 this.xhr_.send(url, this.method_, this.content_, this.headers_);
};


/** @override */
RemoteArrayMatcher.prototype.disposeInternal = function() {
 this.xhr_.dispose();
 RemoteArrayMatcher.superClass_.disposeInternal.call(this);
};
