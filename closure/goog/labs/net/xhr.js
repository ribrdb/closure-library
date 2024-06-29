/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Offered as an alternative to XhrIo as a way for making requests
 * via XMLHttpRequest.  Instead of mirroring the XHR interface and exposing
 * events, results are used as a way to pass a "promise" of the response to
 * interested parties.
 */

import { Promise } from '../../promise/promise.js';

import * as asserts from '../../asserts/asserts.js';
import { DebugError } from '../../debug/error.js';
import { HttpStatus } from '../../net/httpstatus.js';
import { XmlHttp } from '../../net/xmlhttp.js';
import object from '../../object/object.js';
import * as googString from '../../string/string.js';
import * as utils from '../../uri/utils.js';
import * as userAgent from '../../useragent/useragent.js';
const { XhrLike } = goog.requireType('goog.net.xhrlike');
const { XmlHttpFactory } = goog.requireType('goog.net.xmlhttpfactory');



/**
 * Configuration options for an XMLHttpRequest.
 * - headers: map of header key/value pairs.
 * - timeoutMs: number of milliseconds after which the request will be timed
 *      out by the client. Default is to allow the browser to handle timeouts.
 * - withCredentials: whether user credentials are to be included in a
 *      cross-origin request. See:
 *      http://www.w3.org/TR/XMLHttpRequest/#the-withcredentials-attribute
 * - mimeType: allows the caller to override the content-type and charset for
 *      the request. See:
 *      http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-overridemimetype
 * - responseType: may be set to change the response type to an arraybuffer or
 *      blob for downloading binary data. See:
 *      http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-responsetype]
 * - xmlHttpFactory: allows the caller to override the factory used to create
 *      XMLHttpRequest objects.
 * - xssiPrefix: Prefix used for protecting against XSSI attacks, which should
 *      be removed before parsing the response as JSON.
 *
 * @typedef {{
 *   headers: (Object<string>|undefined),
 *   mimeType: (string|undefined),
 *   responseType: (ResponseType|undefined),
 *   timeoutMs: (number|undefined),
 *   withCredentials: (boolean|undefined),
 *   xmlHttpFactory: (XmlHttpFactory|undefined),
 *   xssiPrefix: (string|undefined)
 * }}
 */
export var Options;


/**
 * Defines the types that are allowed as post data.
 * @typedef {(ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string|undefined)}
 */
export var PostData;


/**
 * The Content-Type HTTP header name.
 * @type {string}
 */
export var CONTENT_TYPE_HEADER = 'Content-Type';


/**
 * The Content-Type HTTP header value for a url-encoded form.
 * @type {string}
 */
export var FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=utf-8';


/**
 * Supported data types for the responseType field.
 * See: http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-response
 * @enum {string}
 */
export var ResponseType = {
  ARRAYBUFFER: 'arraybuffer',
  BLOB: 'blob',
  DOCUMENT: 'document',
  JSON: 'json',
  TEXT: 'text'
};


/**
 * Sends a get request, returning a promise that will be resolved
 * with the response text once the request completes.
 *
 * @param {string} url The URL to request.
 * @param {Options=} opt_options Configuration options for the request.
 * @return {!Promise<string>} A promise that will be resolved with the
 *     response text once the request completes.
 */
export function get(url, opt_options) {
  return send('GET', url, null, opt_options).then(function(request) {
    return request.responseText;
  });
}


/**
 * Sends a post request, returning a promise that will be resolved
 * with the response text once the request completes.
 *
 * @param {string} url The URL to request.
 * @param {PostData} data The body of the post request.
 * @param {Options=} opt_options Configuration options for the request.
 * @return {!Promise<string>} A promise that will be resolved with the
 *     response text once the request completes.
 */
export function post(url, data, opt_options) {
  return send('POST', url, data, opt_options).then(function(request) {
    return request.responseText;
  });
}


/**
 * Sends a get request, returning a promise that will be resolved with
 * the parsed response text once the request completes.
 *
 * @param {string} url The URL to request.
 * @param {Options=} opt_options Configuration options for the request.
 * @return {!Promise<Object>} A promise that will be resolved with the
 *     response JSON once the request completes.
 */
export function getJson(url, opt_options) {
  return send('GET', url, null, opt_options).then(function(request) {
    return parseJson_(request.responseText, opt_options);
  });
}


/**
 * Sends a get request, returning a promise that will be resolved with the
 * response as a Blob.
 *
 * @param {string} url The URL to request.
 * @param {Options=} opt_options Configuration options for the request. If
 *     responseType is set, it will be ignored for this request.
 * @return {!Promise<!Blob>} A promise that will be resolved with an
 *     immutable Blob representing the file once the request completes.
 */
export function getBlob(url, opt_options) {
  asserts.assert(
      'Blob' in goog.global, 'getBlob is not supported in this browser.');

  const options = /** @type {!Options} */ (
      opt_options ? object.clone(opt_options) : {});
  options.responseType = ResponseType.BLOB;

  return send('GET', url, null, options).then(function(request) {
    return /** @type {!Blob} */ (request.response);
  });
}


/**
 * Sends a get request, returning a promise that will be resolved with the
 * response as an array of bytes.
 *
 * Supported in all XMLHttpRequest level 2 browsers, as well as IE9. IE8 and
 * earlier are not supported.
 *
 * @param {string} url The URL to request.
 * @param {Options=} opt_options Configuration options for the request. If
 *     responseType is set, it will be ignored for this request.
 * @return {!Promise<!Uint8Array|!Array<number>>} A promise that will be
 *     resolved with an array of bytes once the request completes.
 */
export function getBytes(url, opt_options) {
  asserts.assert(
      !userAgent.IE || userAgent.isDocumentModeOrHigher(9),
      'getBytes is not supported in this browser.');

  const options = /** @type {!Options} */ (
      opt_options ? object.clone(opt_options) : {});
  options.responseType = ResponseType.ARRAYBUFFER;

  return send('GET', url, null, options).then(function(request) {
    // Use the ArrayBuffer response in browsers that support XMLHttpRequest2.
    // This covers nearly all modern browsers: http://caniuse.com/xhr2
    if (request.response) {
      return new Uint8Array(/** @type {!ArrayBuffer} */ (request.response));
    }

    // Fallback for IE9: the response may be accessed as an array of bytes with
    // the non-standard responseBody property, which can only be accessed as a
    // VBArray. IE7 and IE8 require significant amounts of VBScript to extract
    // the bytes.
    // See: http://stackoverflow.com/questions/1919972/
    if (goog.global['VBArray']) {
      return new goog.global['VBArray'](request['responseBody']).toArray();
    }

    // Nearly all common browsers are covered by the cases above. If downloading
    // binary files in older browsers is necessary, the MDN article "Sending and
    // Receiving Binary Data" provides techniques that may work with
    // XMLHttpRequest level 1 browsers: http://goo.gl/7lEuGN
    throw new Error(
        'getBytes is not supported in this browser.', url, request);
  });
}


/**
 * Sends a post request, returning a promise that will be resolved with
 * the parsed response text once the request completes.
 *
 * @param {string} url The URL to request.
 * @param {PostData} data The body of the post request.
 * @param {Options=} opt_options Configuration options for the request.
 * @return {!Promise<Object>} A promise that will be resolved with the
 *     response JSON once the request completes.
 */
export function postJson(url, data, opt_options) {
  return send('POST', url, data, opt_options).then(function(request) {
    return parseJson_(request.responseText, opt_options);
  });
}


/**
 * Sends a request, returning a promise that will be resolved
 * with the XHR object once the request completes.
 *
 * If content type hasn't been set in opt_options headers, and hasn't been
 * explicitly set to null, default to form-urlencoded/UTF8 for POSTs.
 *
 * @param {string} method The HTTP method for the request.
 * @param {string} url The URL to request.
 * @param {PostData} data The body of the post request.
 * @param {Options=} opt_options Configuration options for the request.
 * @return {!Promise<!XhrLike.OrNative>} A promise that will be
 *     resolved with the XHR object once the request completes.
 * @suppress {missingProperties} request is loosely typed
 */
export function send(method, url, data, opt_options) {
  const options = opt_options || /** @type {!Options} */ ({});
  const request = options.xmlHttpFactory ?
      options.xmlHttpFactory.createInstance() :
      XmlHttp();

  const result =
      new Promise(/**
                      @suppress {strictPrimitiveOperators} Part of the
                      go/strict_warnings_migration
                    */
                   function(resolve, reject) {
                     let timer;

                     try {
                       request.open(method, url, true);
                     } catch (e) {
                       // XMLHttpRequest.open may throw when 'open' is called,
                       // for example, IE7 throws "Access Denied" for
                       // cross-origin requests.
                       reject(new Error(
                           'Error opening XHR: ' + e.message, url, request));
                     }

                     // So sad that IE doesn't support onload and onerror.
                     request.onreadystatechange = function() {
                       if (request.readyState ==
                           XmlHttp.ReadyState.COMPLETE) {
                         goog.global.clearTimeout(timer);
                         // Note: When developing locally, XHRs to file://
                         // schemes return a status code of 0. We mark that case
                         // as a success too.
                         if (HttpStatus.isSuccess(request.status) ||
                             request.status === 0 &&
                                 !isEffectiveSchemeHttp_(url)) {
                           resolve(request);
                         } else {
                           reject(
                               new HttpError(request.status, url, request));
                         }
                       }
                     };
                     request.onerror = function() {
                       reject(new Error('Network error', url, request));
                     };

                     // Set the headers.
                     let contentType;
                     if (options.headers) {
                       for (let key in options.headers) {
                         const value = options.headers[key];
                         if (value != null) {
                           request.setRequestHeader(key, value);
                         }
                       }
                       contentType = options.headers[CONTENT_TYPE_HEADER];
                     }

                     // Browsers will automatically set the content type to
                     // multipart/form-data when passed a FormData object.
                     const dataIsFormData =
                         (goog.global['FormData'] &&
                          (data instanceof goog.global['FormData']));
                     // If a content type hasn't been set, it hasn't been
                     // explicitly set to null, and the data isn't a FormData,
                     // default to form-urlencoded/UTF8 for POSTs. This is
                     // because some proxies have been known to reject posts
                     // without a content-type.
                     if (method == 'POST' && contentType === undefined &&
                         !dataIsFormData) {
                       request.setRequestHeader(
                           CONTENT_TYPE_HEADER, FORM_CONTENT_TYPE);
                     }

                     // Set whether to include cookies with cross-domain
                     // requests. See:
                     // http://www.w3.org/TR/XMLHttpRequest/#the-withcredentials-attribute
                     if (options.withCredentials) {
                       request.withCredentials = options.withCredentials;
                     }

                     // Allows setting an alternative response type, such as an
                     // ArrayBuffer. See:
                     // http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-responsetype
                     if (options.responseType) {
                       request.responseType = options.responseType;
                     }

                     // Allow the request to override the MIME type of the
                     // response. See:
                     // http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-overridemimetype
                     if (options.mimeType) {
                       request.overrideMimeType(options.mimeType);
                     }

                     // Handle timeouts, if requested.
                     if (options.timeoutMs > 0) {
                       timer = goog.global.setTimeout(function() {
                         // Clear event listener before aborting so the errback
                         // will not be called twice.
                         request.onreadystatechange = () => {};
                         request.abort();
                         reject(new TimeoutError(url, request));
                       }, options.timeoutMs);
                     }

                     // Trigger the send.
                     try {
                       request.send(data);
                     } catch (e) {
                       // XMLHttpRequest.send is known to throw on some versions
                       // of FF, for example if a cross-origin request is
                       // disallowed.
                       request.onreadystatechange = () => {};
                       goog.global.clearTimeout(timer);
                       reject(new Error(
                           'Error sending XHR: ' + e.message, url, request));
                     }
                   });
  return result.thenCatch(function(error) {
    if (error instanceof Promise.CancellationError) {
      request.abort();
    }
    throw error;
  });
}


/**
 * @param {string} url The URL to test.
 * @return {boolean} Whether the effective scheme is HTTP or HTTPS.
 * @private
 */
function isEffectiveSchemeHttp_(url) {
  const scheme = utils.getEffectiveScheme(url);
  // NOTE(user): Empty-string is for the case under FF3.5 when the location
  // is not defined inside a web worker.
  return scheme == 'http' || scheme == 'https' || scheme == '';
}

/**
 * @param {string} responseText
 * @param {string=} opt_xssiPrefix Prefix used for protecting against XSSI
 *     attacks, which should be removed before parsing the response as JSON.
 * @return {!Object} JSON-parsed value of the original responseText.
 */
export function parseJson(responseText, opt_xssiPrefix) {
  return parseJson_(responseText, {xssiPrefix: opt_xssiPrefix});
}


/**
 * JSON-parses the given response text, returning an Object.
 *
 * @param {string} responseText Response text.
 * @param {Options|undefined} options The options object.
 * @return {!Object} The JSON-parsed value of the original responseText.
 * @private
 */
function parseJson_(responseText, options) {
  let prefixStrippedResult = responseText;
  if (options && options.xssiPrefix) {
    prefixStrippedResult =
        stripXssiPrefix_(options.xssiPrefix, prefixStrippedResult);
  }
  return /** @type {!Object} */ (JSON.parse(prefixStrippedResult));
}


/**
 * Strips the XSSI prefix from the input string.
 *
 * @param {string} prefix The XSSI prefix.
 * @param {string} string The string to strip the prefix from.
 * @return {string} The input string without the prefix.
 * @private
 */
function stripXssiPrefix_(prefix, string) {
  if (googString.startsWith(string, prefix)) {
    string = string.substring(prefix.length);
  }
  return string;
}



/**
 * Generic error that may occur during a request.
 *
 * @param {string} message The error message.
 * @param {string} url The URL that was being requested.
 * @param {!XhrLike.OrNative} request The XHR that failed.
 * @extends {DebugError}
 * @constructor
 */
export function Error(message, url, request) {
  Error.base(this, 'constructor', message + ', url=' + url);

  /**
   * The URL that was requested.
   * @type {string}
   */
  this.url = url;

  /**
   * The XMLHttpRequest corresponding with the failed request.
   * @type {!XhrLike.OrNative}
   */
  this.xhr = request;
}
goog.inherits(Error, DebugError);


/** @override */
Error.prototype.name = 'XhrError';



/**
 * Class for HTTP errors.
 *
 * @param {number} status The HTTP status code of the response.
 * @param {string} url The URL that was being requested.
 * @param {!XhrLike.OrNative} request The XHR that failed.
 * @extends {Error}
 * @constructor
 * @final
 */
export function HttpError(status, url, request) {
  HttpError.base(
      this, 'constructor', 'Request Failed, status=' + status, url, request);

  /**
   * The HTTP status code for the error.
   * @type {number}
   */
  this.status = status;
}
goog.inherits(HttpError, Error);


/** @override */
HttpError.prototype.name = 'XhrHttpError';



/**
 * Class for Timeout errors.
 *
 * @param {string} url The URL that timed out.
 * @param {!XhrLike.OrNative} request The XHR that failed.
 * @extends {Error}
 * @constructor
 * @final
 */
export function TimeoutError(url, request) {
  TimeoutError.base(this, 'constructor', 'Request timed out', url, request);
}
goog.inherits(TimeoutError, Error);


/** @override */
TimeoutError.prototype.name = 'XhrTimeoutError';
