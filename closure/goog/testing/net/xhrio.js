goog.declareModuleId('goog.testing.net.xhrio');
/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock of XhrIo for unit testing.
 * @suppress {accessControls} Reassigning private properties for test impl.
 */

goog.setTestOnly('goog.testing.net.XhrIo');

import { Uri } from '../../uri/uri.js';
import * as array from '../../array/array.js';
import * as maps from '../../collections/maps.js';
import * as xml from '../../dom/xml.js';
import * as events from '../../events/events.js';
import { ErrorCode } from '../../net/errorcode.js';
import { EventType } from '../../net/eventtype.js';
import { HttpStatus } from '../../net/httpstatus.js';
import { XhrIo as netXhrIo } from '../../net/xhrio.js';
import { XmlHttp } from '../../net/xmlhttp.js';
import object from '../../object/object.js';
import { TestQueue } from '../testqueue.js';
const { XhrLike } = goog.requireType('goog.net.xhrlike');

/**
 * Mock implementation of netXhrIo. This doesn't provide a mock
 * implementation for all cases, but it's not too hard to add them as needed.
 * @param {TestQueue=} opt_testQueue Test queue for inserting test
 *     events.
 * @constructor
 * @extends {netXhrIo}
 */
function XhrIo_(opt_testQueue) {
  XhrIo_.base.call(this);

  /**
   * Map of default headers to add to every request, use:
   * XhrIo.headers.set(name, value)
   * @type {!Map<string, string>}
   */
  this.headers = new Map();

  /**
     * Queue of events write to.
     * @private {?TestQueue}
     */
  this.testQueue_ = opt_testQueue || null;
}
export { XhrIo_ as XhrIo };
goog.inherits(XhrIo_, netXhrIo);

/**
 * Some compiled tests replace netXhrIo with XhrIo_,
 * which would cause a circular constructor loop.
 * @nocollapse
 */
XhrIo_.base = netXhrIo;

/**
 * To emulate the behavior of the actual XhrIo, we do not allow access to the
 * XhrIo's properties outside the event callbacks. For backwards compatibility,
 * we allow tests to allow access by setting this value to true.
 * @type {boolean}
 */
XhrIo_.allowUnsafeAccessToXhrIoOutsideCallbacks = false;


/**
 * Alias this enum here to make mocking of netXhrIo easier.
 * @enum {string}
 */
XhrIo_.ResponseType = netXhrIo.ResponseType;

/**
 * Alias this array here to make mocking of netXhrIo easier.
 * @type {!Array<string>}
 */
XhrIo_.METHODS_WITH_FORM_DATA =
    netXhrIo.METHODS_WITH_FORM_DATA;


/**
 * All non-disposed instances of XhrIo_ created
 * by {@link XhrIo_.send} are in this Array.
 * @see XhrIo_.cleanup
 * @type {!Array<!XhrIo_>}
 * @private
 */
XhrIo_.sendInstances_ = [];


/**
 * Returns an Array containing all non-disposed instances of
 * XhrIo_ created by {@link XhrIo_.send}.
 * @return {!Array<!XhrIo_>} Array of XhrIo_
 *     instances.
 */
XhrIo_.getSendInstances = function() {
  return XhrIo_.sendInstances_;
};


/**
 * Disposes all non-disposed instances of XhrIo_ created by
 * {@link XhrIo_.send}.
 * @see netXhrIo.cleanup
 */
XhrIo_.cleanup = function() {
  var instances = XhrIo_.sendInstances_;
  while (instances.length) {
    instances.pop().dispose();
  }
};


/**
 * Simulates the static XhrIo send method.
 * @param {string} url Uri to make request to.
 * @param {Function=} opt_callback Callback function for when request is
 *     complete.
 * @param {string=} opt_method Send method, default: GET.
 * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=}
 *     opt_content Body data.
 * @param {?Object|?maps.MapLike<string,string>=} opt_headers
 *     Map of headers to add to the request.
 * @param {number=} opt_timeoutInterval Number of milliseconds after which an
 *     incomplete request will be aborted; 0 means no timeout is set.
 * @param {boolean=} opt_withCredentials Whether to send credentials with the
 *     request. Default to false. See {@link netXhrIo#setWithCredentials}.
 * @return {!XhrIo_} The mocked sent XhrIo.
 */
XhrIo_.send = function(
    url, opt_callback, opt_method, opt_content, opt_headers,
    opt_timeoutInterval, opt_withCredentials) {
  var x = new XhrIo_();
  XhrIo_.sendInstances_.push(x);
  if (opt_callback) {
    events.listen(x, EventType.COMPLETE, opt_callback);
  }
  events.listen(
      x, EventType.READY,
      goog.partial(XhrIo_.cleanupSend_, x));
  if (opt_timeoutInterval) {
    x.setTimeoutInterval(opt_timeoutInterval);
  }
  x.setWithCredentials(Boolean(opt_withCredentials));
  x.send(url, opt_method, opt_content, opt_headers);

  return x;
};


/**
 * Disposes of the specified XhrIo_ created by
 * {@link XhrIo_.send} and removes it from
 * {@link XhrIo_.pendingStaticSendInstances_}.
 * @param {!XhrIo_} XhrIo An XhrIo created by
 *     {@link XhrIo_.send}.
 * @private
 */
XhrIo_.cleanupSend_ = function(XhrIo) {
  XhrIo.dispose();
  array.remove(XhrIo_.sendInstances_, XhrIo);
};


/**
 * Stores the simulated response headers for the requests which are sent through
 * this XhrIo.
 * @type {Object}
 * @private
 */
XhrIo_.prototype.responseHeaders_;


/**
 * Last POST content that was requested.
 * @private {
 *     ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string|undefined}
 */
XhrIo_.prototype.lastContent_;


/**
 * Additional headers that were requested in the last query.
 * @private {?Object|?maps.MapLike<string,string>|undefined}
 */
XhrIo_.prototype.lastHeaders_;


/**
 * The response object.
 * @private {string|!Document|!ArrayBuffer|!Blob|null}
 */
XhrIo_.prototype.response_ = '';


/**
 * The status code.
 * @private {number}
 */
XhrIo_.prototype.statusCode_ = 0;


/**
 * Mock ready state.
 * @private {number}
 */
XhrIo_.prototype.readyState_ =
    XmlHttp.ReadyState.UNINITIALIZED;


/**
 * Whether there's currently an underlying XHR object.
 * @private {boolean}
 */
XhrIo_.prototype.hasXhr_ = false;


/**
 * Returns the number of milliseconds after which an incomplete request will be
 * aborted, or 0 if no timeout is set.
 * @return {number} Timeout interval in milliseconds.
 * @override
 */
XhrIo_.prototype.getTimeoutInterval = function() {
  return this.timeoutInterval_;
};


/**
 * Sets the number of milliseconds after which an incomplete request will be
 * aborted and a {@link EventType.TIMEOUT} event raised; 0 means no
 * timeout is set.
 * @param {number} ms Timeout interval in milliseconds; 0 means none.
 * @override
 */
XhrIo_.prototype.setTimeoutInterval = function(ms) {
  this.timeoutInterval_ = Math.max(0, ms);
};


/**
 * Causes timeout events to be fired.
 */
XhrIo_.prototype.simulateTimeout = function() {
  this.lastErrorCode_ = ErrorCode.TIMEOUT;
  this.dispatchEvent(EventType.TIMEOUT);
  this.abort(ErrorCode.TIMEOUT);
};


/**
 * Sets the desired type for the response. At time of writing, this is only
 * supported in very recent versions of WebKit (10.0.612.1 dev and later).
 *
 * If this is used, the response may only be accessed via {@link #getResponse}.
 *
 * @param {netXhrIo.ResponseType} type The desired type for the response.
 * @override
 */
XhrIo_.prototype.setResponseType = function(type) {
  this.responseType_ = type;
};


/**
 * Gets the desired type for the response.
 * @return {!netXhrIo.ResponseType} The desired type for the response.
 * @override
 */
XhrIo_.prototype.getResponseType = function() {
  return this.responseType_;
};


/**
 * Sets whether a "credentialed" request that is aware of cookie and
 * authentication information should be made. This option is only supported by
 * browsers that support HTTP Access Control. As of this writing, this option
 * is not supported in IE.
 *
 * @param {boolean} withCredentials Whether this should be a "credentialed"
 *     request.
 * @override
 */
XhrIo_.prototype.setWithCredentials = function(
    withCredentials) {
  this.withCredentials_ = withCredentials;
};


/**
 * Gets whether a "credentialed" request is to be sent.
 * @return {boolean} The desired type for the response.
 * @override
 */
XhrIo_.prototype.getWithCredentials = function() {
  return this.withCredentials_;
};
/**
 * Specify a Trust Tokens operation to execute alongside the request.
 * @param {!TrustTokenAttributeType} trustToken a Trust Tokens operation to
 *     execute.
 * @override
 */
XhrIo_.prototype.setTrustToken = function(trustToken) {
  this.trustToken_ = trustToken;
};

/**
 * Sets whether progress events are enabled for this request. Note
 * that progress events require pre-flight OPTIONS request handling
 * for CORS requests, and may cause trouble with older browsers. See
 * netXhrIo.progressEventsEnabled_ for details.
 * @param {boolean} enabled Whether progress events should be enabled.
 * @override
 */
XhrIo_.prototype.setProgressEventsEnabled = function(enabled) {
  this.progressEventsEnabled_ = enabled;
};


/**
 * Gets whether progress events are enabled.
 * @return {boolean} Whether progress events are enabled for this request.
 * @override
 */
XhrIo_.prototype.getProgressEventsEnabled = function() {
  return this.progressEventsEnabled_;
};


/**
 * Abort the current XMLHttpRequest
 * @param {!ErrorCode=} opt_failureCode Optional error code to use -
 *     defaults to ABORT.
 * @override
 */
XhrIo_.prototype.abort = function(opt_failureCode) {
  if (this.active_) {
    try {
      this.active_ = false;
      this.readyState_ = XmlHttp.ReadyState.UNINITIALIZED;
      this.statusCode_ = -1;
      this.lastErrorCode_ = opt_failureCode || ErrorCode.ABORT;
      this.dispatchEvent(EventType.COMPLETE);
      this.dispatchEvent(EventType.ABORT);
    } finally {
      this.simulateReady();
    }
  }
};


/**
 * Simulates the XhrIo send.
 * @param {?Uri|string} url Uri to make request too.
 * @param {string=} opt_method Send method, default: GET.
 * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=}
 *     opt_content Body data.
 * @param {?Object|?maps.MapLike<string, string>=} opt_headers
 *     Map of headers to add to the request.
 * @override
 */
XhrIo_.prototype.send = function(
    url, opt_method, opt_content, opt_headers) {
  if (this.hasXhr_) {
    throw new Error('[goog.net.XhrIo] Object is active with another request');
  }

  this.lastUri_ = url;
  this.lastMethod_ = opt_method || 'GET';
  this.lastContent_ = opt_content;
  if (this.headers.size > 0) {
    this.lastHeaders_ = maps.toObject(this.headers);
    // Add headers specific to this request
    if (opt_headers) {
      if (Object.getPrototypeOf(opt_headers) === Object.prototype) {
        for (let key in opt_headers) {
          this.lastHeaders_[key] = opt_headers[key];
        }
      } else if (
          typeof opt_headers.keys === 'function' &&
          typeof opt_headers.get === 'function') {
        for (const key of opt_headers.keys()) {
          this.lastHeaders_[key] = opt_headers.get(key);
        }
      } else {
        throw new Error(
            'Unknown input type for opt_headers: ' + String(opt_headers));
      }
    }
  } else {
    this.lastHeaders_ = opt_headers;
  }

  if (this.testQueue_) {
    this.testQueue_.enqueue(['s', url, opt_method, opt_content, opt_headers]);
  }
  this.hasXhr_ = true;
  this.active_ = true;
  this.readyState_ = XmlHttp.ReadyState.UNINITIALIZED;
  this.simulateReadyStateChange(XmlHttp.ReadyState.LOADING);
};


/**
 * Creates a new XHR object.
 * @return {!XhrLike.OrNative} The newly created XHR object.
 * @override
 */
XhrIo_.prototype.createXhr = function() {
  return XmlHttp();
};


/**
 * Simulates changing to the new ready state.
 * @param {number} readyState Ready state to change to.
 */
XhrIo_.prototype.simulateReadyStateChange = function(
    readyState) {
  if (readyState < this.readyState_) {
    throw new Error('Readystate cannot go backwards');
  }

  // INTERACTIVE can be dispatched repeatedly as more data is reported.
  if (readyState == XmlHttp.ReadyState.INTERACTIVE &&
      readyState == this.readyState_) {
    this.dispatchEvent(EventType.READY_STATE_CHANGE);
    return;
  }

  while (this.readyState_ < readyState) {
    this.readyState_++;
    this.dispatchEvent(EventType.READY_STATE_CHANGE);

    if (this.readyState_ == XmlHttp.ReadyState.COMPLETE) {
      this.active_ = false;
      this.dispatchEvent(EventType.COMPLETE);
    }
  }
};


/**
 * Simulate receiving some bytes but the request not fully completing, and
 * the XHR entering the 'INTERACTIVE' state.
 * @param {string} partialResponse A string to append to the response text.
 * @param {Object=} opt_headers Simulated response headers.
 */
XhrIo_.prototype.simulatePartialResponse = function(
    partialResponse, opt_headers) {
  this.response_ += partialResponse;
  this.responseHeaders_ = opt_headers || {};
  this.statusCode_ = 200;
  this.simulateReadyStateChange(XmlHttp.ReadyState.INTERACTIVE);
};


/**
 * Simulates receiving a response.
 * @param {number} statusCode Simulated status code.
 * @param {string|!Document|!ArrayBuffer|!Blob|null} response Simulated
 *     response.
 * @param {Object=} opt_headers Simulated response headers.
 */
XhrIo_.prototype.simulateResponse = function(
    statusCode, response, opt_headers) {
  // This library allows a response to be simulated without send ever being
  // called. If there are no send instances, then just pretend that xhr_ and
  // active_ have been set to true.
  if (!XhrIo_.allowUnsafeAccessToXhrIoOutsideCallbacks &&
      !XhrIo_.sendInstances_.length) {
    this.hasXhr_ = true;
    this.active_ = true;
  }
  this.statusCode_ = statusCode;
  this.response_ = response || '';
  this.responseHeaders_ = opt_headers || {};

  try {
    if (this.isSuccess()) {
      this.simulateReadyStateChange(XmlHttp.ReadyState.COMPLETE);
      this.dispatchEvent(EventType.SUCCESS);
    } else {
      this.lastErrorCode_ = ErrorCode.HTTP_ERROR;
      this.lastError_ = this.getStatusText() + ' [' + this.getStatus() + ']';
      this.simulateReadyStateChange(XmlHttp.ReadyState.COMPLETE);
      this.dispatchEvent(EventType.ERROR);
    }
  } finally {
    this.simulateReady();
  }
};


/**
 * Simulates the Xhr is ready for the next request.
 */
XhrIo_.prototype.simulateReady = function() {
  this.active_ = false;
  this.hasXhr_ = false;
  this.dispatchEvent(EventType.READY);
};


/**
 * Simulates the Xhr progress event.
 * @param {boolean} lengthComputable Whether progress is measurable.
 * @param {number} loaded Amount of work already performed.
 * @param {number} total Total amount of work to perform.
 * @param {boolean=} opt_isDownload Whether the progress is from a download or
 *     upload.
 */
XhrIo_.prototype.simulateProgress = function(
    lengthComputable, loaded, total, opt_isDownload) {
  /**
     * @typedef {{
     *   type: EventType,
     *   lengthComputable: boolean,
     *   loaded: number,
     *   total: number
     * }}
     */
  var ProgressEventType;

  var /** ProgressEventType */ progressEvent = {
    type: EventType.PROGRESS,
    lengthComputable: lengthComputable,
    loaded: loaded,
    total: total
  };
  this.dispatchEvent(progressEvent);
  var specificProgress =
      /** @type {ProgressEventType} */ (object.clone(progressEvent));
  specificProgress.type = opt_isDownload ?
      EventType.DOWNLOAD_PROGRESS :
      EventType.UPLOAD_PROGRESS;
  this.dispatchEvent(specificProgress);
};


/**
 * @return {boolean} Whether there is an active request.
 * @override
 */
XhrIo_.prototype.isActive = function() {
  return !!this.hasXhr_;
};


/**
 * Has the request completed.
 * @return {boolean} Whether the request has completed.
 * @override
 */
XhrIo_.prototype.isComplete = function() {
  return this.readyState_ == XmlHttp.ReadyState.COMPLETE;
};


/**
 * Has the request compeleted with a success.
 * @return {boolean} Whether the request compeleted successfully.
 * @override
 */
XhrIo_.prototype.isSuccess = function() {
  var status = this.getStatus();
  // A zero status code is considered successful for local files.
  return HttpStatus.isSuccess(status) ||
      status === 0 && !this.isLastUriEffectiveSchemeHttp_();
};


/**
 * Returns the readystate.
 * @return {!XmlHttp.ReadyState} XmlHttp.ReadyState.*.
 * @override
 */
XhrIo_.prototype.getReadyState = function() {
  return /** @type {!XmlHttp.ReadyState} */ (this.readyState_);
};


/**
 * Get the status from the Xhr object.  Will only return correct result when
 * called from the context of a callback.
 * @return {number} Http status.
 * @override
 */
XhrIo_.prototype.getStatus = function() {
  return this.statusCode_;
};


/**
 * Get the status text from the Xhr object.  Will only return correct result
 * when called from the context of a callback.
 * @return {string} Status text.
 * @override
 */
XhrIo_.prototype.getStatusText = function() {
  return '';
};


/**
 * Gets the last error message.
 * @return {!ErrorCode} Last error code.
 * @override
 */
XhrIo_.prototype.getLastErrorCode = function() {
  return this.lastErrorCode_;
};


/**
 * Gets the last URI that was requested.
 * @return {string} Last URI.
 * @override
 */
XhrIo_.prototype.getLastUri = function() {
  // A few tests depend on this returning a goog.Uri object, even though
  // goog.net.XhrIo only ever returns a string from getLastUri.
  // TODO(closure-team): Update the tests that are using getLastUri for
  // null or goog.Uri return values.
  return /** @type {string} */ (this.lastUri_);
};


/**
 * Gets the last HTTP method that was requested.
 * @return {string|undefined} Last HTTP method used by send.
 */
XhrIo_.prototype.getLastMethod = function() {
  return this.lastMethod_;
};


/**
 * Gets the last POST content that was requested.
 * @return {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string|undefined}
 *     Last POST content or undefined if last request was a GET.
 */
XhrIo_.prototype.getLastContent = function() {
  return this.lastContent_;
};


/**
 * Gets the headers of the last request.
 * @return {?Object|?maps.MapLike<string,string>|undefined}
 *     Last headers manually set in send
 *      call or undefined if no additional headers were specified.
 */
XhrIo_.prototype.getLastRequestHeaders = function() {
  return this.lastHeaders_;
};


/**
 * Returns true if there is a valid xhr, or if
 * allowUnsafeAccessToXhrIoOutsideCallbacks is false.
 * @return {boolean}
 * @private
 */
XhrIo_.prototype.checkXhr_ = function() {
  return (XhrIo_.allowUnsafeAccessToXhrIoOutsideCallbacks || !!this.hasXhr_);
};


/**
 * Gets the response text from the Xhr object.  Will only return correct result
 * when called from the context of a callback.
 * @return {string} Result from the server.
 * @override
 */
XhrIo_.prototype.getResponseText = function() {
  if (!this.checkXhr_()) {
    return '';
  } else if (typeof this.response_ === 'string') {
    return this.response_;
  } else if (
      goog.global['ArrayBuffer'] && this.response_ instanceof ArrayBuffer) {
    return '';
  } else {
    return xml.serialize(/** @type {Document} */ (this.response_));
  }
};


/**
 * Gets the response body from the Xhr object. Will only return correct result
 * when called from the context of a callback.
 * @return {Object} Binary result from the server or null.
 * @override
 */
XhrIo_.prototype.getResponseBody = function() {
  return null;
};


/**
 * Gets the response and evaluates it as JSON from the Xhr object.  Will only
 * return correct result when called from the context of a callback.
 * @param {string=} opt_xssiPrefix Optional XSSI prefix string to use for
 *     stripping of the response before parsing. This needs to be set only if
 *     your backend server prepends the same prefix string to the JSON response.
 * @return {!Object|undefined} JavaScript object.
 * @throws Error if s is invalid JSON.
 * @override
 */
XhrIo_.prototype.getResponseJson = function(opt_xssiPrefix) {
  if (!this.checkXhr_()) {
    return undefined;
  }

  var responseText = this.getResponseText();
  if (opt_xssiPrefix && responseText.indexOf(opt_xssiPrefix) == 0) {
    responseText = responseText.substring(opt_xssiPrefix.length);
  }

  return /** @type {!Object} */ (JSON.parse(responseText));
};


/**
 * Gets the response XML from the Xhr object.  Will only return correct result
 * when called from the context of a callback.
 * @return {Document} Result from the server if it was XML.
 * @override
 */
XhrIo_.prototype.getResponseXml = function() {
  if (!this.checkXhr_()) {
    return null;
  }
  // NOTE(user): I haven't found out how to check in Internet Explorer
  // whether the response is XML document, so I do it the other way around.
  return typeof this.response_ === 'string' ||
          (goog.global['ArrayBuffer'] &&
           this.response_ instanceof ArrayBuffer) ?
      null :
      /** @type {Document} */ (this.response_);
};


/**
 * Get the response as the type specificed by {@link #setResponseType}. At time
 * of writing, this is only supported in very recent versions of WebKit
 * (10.0.612.1 dev and later).
 *
 * @return {*} The response.
 * @override
 */
XhrIo_.prototype.getResponse = function() {
  return this.checkXhr_() ? this.response_ : null;
};


/**
 * Get the value of the response-header with the given name from the Xhr object
 * Will only return correct result when called from the context of a callback
 * and the request has completed
 * @param {string} key The name of the response-header to retrieve.
 * @return {string|undefined} The value of the response-header named key.
 * @override
 */
XhrIo_.prototype.getResponseHeader = function(key) {
  if (!this.checkXhr_() || !this.isComplete()) {
    return undefined;
  }
  return this.responseHeaders_[key];
};


/**
 * Gets the text of all the headers in the response.
 * Will only return correct result when called from the context of a callback
 * and the request has completed
 * @return {string} The string containing all the response headers.
 * @override
 */
XhrIo_.prototype.getAllResponseHeaders = function() {
  if (!this.checkXhr_() || !this.isComplete()) {
    return '';
  }
  return this.getAllStreamingResponseHeaders();
};


/**
 * Returns all response headers as a key-value map.
 * Multiple values for the same header key can be combined into one,
 * separated by a comma and a space.
 * Note that the native getResponseHeader method for retrieving a single header
 * does a case insensitive match on the header name. This method does not
 * include any case normalization logic, it will just return a key-value
 * representation of the headers.
 * See: http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
 * @return {!Object<string, string>} An object with the header keys as keys
 *     and header values as values.
 * @override
 */
XhrIo_.prototype.getResponseHeaders = function() {
  if (!this.checkXhr_() || !this.isComplete()) {
    return {};
  }
  var headersObject = {};
  object.forEach(this.responseHeaders_, function(value, key) {
    if (headersObject[key]) {
      headersObject[key] += ', ' + value;
    } else {
      headersObject[key] = value;
    }
  });
  return headersObject;
};


/**
 * Get the value of the response-header with the given name from the Xhr object.
 * As opposed to {@link #getResponseHeader}, this method does not require that
 * the request has completed.
 * @param {string} key The name of the response-header to retrieve.
 * @return {?string} The value of the response-header, or null if it is
 *     unavailable.
 * @override
 */
XhrIo_.prototype.getStreamingResponseHeader = function(key) {
  if (!this.checkXhr_()) {
    return null;
  }
  if (!this.responseHeaders_) {
    return null;
  }
  return key in this.responseHeaders_ ? this.responseHeaders_[key] : null;
};


/**
 * Gets the text of all the headers in the response. As opposed to
 * {@link #getAllResponseHeaders}, this method does not require that the request
 * has completed.
 * @return {string} The value of the response headers or empty string.
 * @override
 */
XhrIo_.prototype.getAllStreamingResponseHeaders = function() {
  if (!this.checkXhr_()) {
    return '';
  }
  var headers = [];
  object.forEach(this.responseHeaders_, function(value, name) {
    headers.push(name + ': ' + value);
  });
  return headers.join('\r\n');
};
