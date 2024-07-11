/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides CORS support for HTTP based RPC requests.
 *
 * As part of net.rpc package, CORS features provided by this class
 * depend on the server support. Please check related specs to decide how
 * to enable any of the features provided by this class.
 */

import { Uri as GoogUri } from '../../uri/uri.js';

import googObject from '../../object/object.js';
import * as googString from '../../string/string.js';
import * as googUriUtils from '../../uri/utils.js';


/**
 * The default URL parameter name to overwrite http headers with a URL param
 * to avoid CORS preflight.
 *
 * See https://github.com/whatwg/fetch/issues/210#issue-129531743 for the spec.
 *
 * @type {string}
 */
export let HTTP_HEADERS_PARAM_NAME = '$httpHeaders';


/**
 * The default URL parameter name to overwrite http method with a URL param
 * to avoid CORS preflight.
 *
 * See https://github.com/whatwg/fetch/issues/210#issue-129531743 for the spec.
 *
 * @type {string}
 */
export let HTTP_METHOD_PARAM_NAME = '$httpMethod';


/**
 * Generates the URL parameter value with custom headers encoded as
 * HTTP/1.1 headers block.
 *
 * @param {!Object<string, string>} headers The custom headers.
 * @return {string} The URL param to overwrite custom HTTP headers.
 */
export function generateHttpHeadersOverwriteParam(headers) {
  let result = '';
  googObject.forEach(headers, function(value, key) {
    result += key;
    result += ':';
    result += value;
    result += '\r\n';
  });
  return result;
};


/**
 * Generates the URL-encoded URL parameter value with custom headers encoded as
 * HTTP/1.1 headers block.
 *
 * @param {!Object<string, string>} headers The custom headers.
 * @return {string} The URL param to overwrite custom HTTP headers.
 */
export function generateEncodedHttpHeadersOverwriteParam(headers) {
  return googString.urlEncode(
      generateHttpHeadersOverwriteParam(headers));
};


/**
 * Sets custom HTTP headers via an overwrite URL param.
 *
 * @param {!GoogUri|string} url The URI object or a string path.
 * @param {string} urlParam The URL param name.
 * @param {!Object<string, string>} extraHeaders The HTTP headers.
 * @return {!GoogUri|string} The URI object or a string path with headers
 * encoded as a url param.
 */
export function setHttpHeadersWithOverwriteParam(
    url, urlParam, extraHeaders) {
  if (googObject.isEmpty(extraHeaders)) {
    return url;
  }
  const httpHeaders = generateHttpHeadersOverwriteParam(extraHeaders);
  if (typeof url === 'string') {
    return googUriUtils.appendParam(
        url, googString.urlEncode(urlParam), httpHeaders);
  } else {
    url.setParameterValue(urlParam, httpHeaders);  // duplicate removed!
    return url;
  }
};
