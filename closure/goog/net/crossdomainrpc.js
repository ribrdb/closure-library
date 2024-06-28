/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Cross domain RPC library using the <a
 * href="http://go/xd2_design" target="_top">XD2 approach</a>.
 *
 * <h5>Protocol</h5>
 * Client sends a request across domain via a form submission.  Server
 * receives these parameters: "xdpe:request-id", "xdpe:dummy-uri" ("xdpe" for
 * "cross domain parameter to echo back") and other user parameters prefixed
 * with "xdp" (for "cross domain parameter").  Headers are passed as parameters
 * prefixed with "xdh" (for "cross domain header").  Only strings are supported
 * for parameters and headers.  A GET method is mapped to a form GET.  All
 * other methods are mapped to a POST.  Server is expected to produce a
 * HTML response such as the following:
 * <pre>
 * &lt;body&gt;
 * &lt;script type="text/javascript"
 *     src="path-to-crossdomainrpc.js"&gt;&lt;/script&gt;
 * const currentDirectory = location.href.substring(
 *     0, location.href.lastIndexOf('/')
 * );
 *
 * // echo all parameters prefixed with "xdpe:"
 * const echo = {};
 * echo[CrossDomainRpc.PARAM_ECHO_REQUEST_ID] =
 *     &lt;value of parameter "xdpe:request-id"&gt;;
 * echo[CrossDomainRpc.PARAM_ECHO_DUMMY_URI] =
 *     &lt;value of parameter "xdpe:dummy-uri"&gt;;
 *
 * CrossDomainRpc.sendResponse(
 *     '({"result":"&lt;responseInJSON"})',
 *     true,    // is JSON
 *     echo,    // parameters to echo back
 *     status,  // response status code
 *     headers  // response headers
 * );
 * &lt;/script&gt;
 * &lt;/body&gt;
 * </pre>
 *
 * <h5>Server Side</h5>
 * For an example of the server side, refer to the following files:
 * <ul>
 * <li>http://go/xdservletfilter.java</li>
 * <li>http://go/xdservletrequest.java</li>
 * <li>http://go/xdservletresponse.java</li>
 * </ul>
 *
 * <h5>System Requirements</h5>
 * Tested on IE6, IE7, Firefox 2.0 and Safari nightly r23841.
 */

import { Uri } from '../uri/uri.js';

import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as safe from '../dom/safe.js';
import * as events from '../events/events.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
import { SafeHtml } from '../html/safehtml.js';
import * as log from '../log/log.js';
import { EventType as netEventType } from './eventtype.js';
import { HttpStatus } from './httpstatus.js';
import * as googString from '../string/string.js';
import * as userAgent from '../useragent/useragent.js';



/**
 * Creates a new instance of cross domain RPC.
 *
 * @extends {EventTarget}
 * @constructor
 * @final
 */
export function CrossDomainRpc() {
  EventTarget.call(this);
}
goog.inherits(CrossDomainRpc, EventTarget);


/**
 * Cross-domain response iframe marker.
 * @type {string}
 * @private
 */
CrossDomainRpc.RESPONSE_MARKER_ = 'xdrp';


/**
 * Use a fallback dummy resource if none specified or detected.
 * @type {boolean}
 * @private
 */
CrossDomainRpc.useFallBackDummyResource_ = true;


/** @type {Object} */
CrossDomainRpc.prototype.responseHeaders;


/** @type {string} */
CrossDomainRpc.prototype.responseText;


/** @type {number} */
CrossDomainRpc.prototype.status;


/** @private {number} */
CrossDomainRpc.prototype.timeWaitedAfterResponseReady_;


/** @private {boolean} */
CrossDomainRpc.prototype.responseTextIsJson_;


/** @private {boolean} */
CrossDomainRpc.prototype.responseReady_;


/** @private {!HTMLIFrameElement} */
CrossDomainRpc.prototype.requestFrame_;


/** @private {events.Key} */
CrossDomainRpc.prototype.loadListenerKey_;


/**
 * Checks to see if we are executing inside a response iframe.  This is the
 * case when this page is used as a dummy resource to gain caller's domain.
 * @return {*} True if we are executing inside a response iframe; false
 *     otherwise.
 * @private
 */
CrossDomainRpc.isInResponseIframe_ = function() {
  return window.location &&
      (window.location.hash.indexOf(CrossDomainRpc.RESPONSE_MARKER_) ==
           1 ||
       window.location.search.indexOf(
           CrossDomainRpc.RESPONSE_MARKER_) == 1);
};


/**
 * Stops execution of the rest of the page if this page is loaded inside a
 *    response iframe.
 */
if (CrossDomainRpc.isInResponseIframe_()) {
  if (userAgent.EDGE_OR_IE) {
    document.execCommand('Stop');
  } else if (userAgent.GECKO) {
    window.stop();
  } else {
    throw new Error('stopped');
  }
}


/**
 * Sets the URI for a dummy resource on caller's domain.  This function is
 * used for specifying a particular resource to use rather than relying on
 * auto detection.
 * @param {string} dummyResourceUri URI to dummy resource on the same domain
 *    of caller's page.
 */
CrossDomainRpc.setDummyResourceUri = function(dummyResourceUri) {
  CrossDomainRpc.dummyResourceUri_ = dummyResourceUri;
};


/**
 * Sets whether a fallback dummy resource ("/robots.txt" on Firefox and Safari
 * and current page on IE) should be used when a suitable dummy resource is
 * not available.
 * @param {boolean} useFallBack Whether to use fallback or not.
 */
CrossDomainRpc.setUseFallBackDummyResource = function(useFallBack) {
  CrossDomainRpc.useFallBackDummyResource_ = useFallBack;
};


/**
 * Sends a request across domain.
 * @param {string} uri Uri to make request to.
 * @param {Function=} opt_continuation Continuation function to be called
 *     when request is completed.  Takes one argument of an event object
 *     whose target has the following properties: "status" is the HTTP
 *     response status code, "responseText" is the response text,
 *     and "headers" is an object with all response headers.  The event
 *     target's getResponseJson() method returns a JavaScript object evaluated
 *     from the JSON response or undefined if response is not JSON.
 * @param {string=} opt_method Method of request. Default is POST.
 * @param {Object=} opt_params Parameters. Each property is turned into a
 *     request parameter.
 * @param {Object=} opt_headers Map of headers of the request.
 */
CrossDomainRpc.send = function(
    uri, opt_continuation, opt_method, opt_params, opt_headers) {
  const xdrpc = new CrossDomainRpc();
  if (opt_continuation) {
    events.listen(xdrpc, netEventType.COMPLETE, opt_continuation);
  }
  events.listen(xdrpc, netEventType.READY, xdrpc.reset);
  xdrpc.sendRequest(uri, opt_method, opt_params, opt_headers);
};


/**
 * Sets debug mode to true or false.  When debug mode is on, response iframes
 * are visible and left behind after their use is finished.
 * @param {boolean} flag Flag to indicate intention to turn debug model on
 *     (true) or off (false).
 */
CrossDomainRpc.setDebugMode = function(flag) {
  CrossDomainRpc.debugMode_ = flag;
};


/**
 * Logger for CrossDomainRpc
 * @type {log.Logger}
 * @private
 */
CrossDomainRpc.logger_ = log.getLogger('goog.net.CrossDomainRpc');


/**
 * Creates the HTML of an input element
 * @param {string} name Name of input element.
 * @param {*} value Value of input element.
 * @return {!SafeHtml} HTML of input element with that name and value.
 * @private
 */
CrossDomainRpc.createInputHtml_ = function(name, value) {
  return SafeHtml.create('textarea', {'name': name}, String(value));
};


/**
 * Finds a dummy resource that can be used by response to gain domain of
 * requester's page.
 * @return {string} URI of the resource to use.
 * @private
 */
CrossDomainRpc.getDummyResourceUri_ = function() {
  if (CrossDomainRpc.dummyResourceUri_) {
    return CrossDomainRpc.dummyResourceUri_;
  }

  // find a style sheet if not on IE, which will attempt to save style sheet
  if (userAgent.GECKO) {
    const links = dom.getElementsByTagName(TagName.LINK);
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      // find a link which is on the same domain as this page
      // cannot use one with '?' or '#' in its URL as it will confuse
      /* CrossDomainRpc.getFramePayload_()*/
      if (link.rel == 'stylesheet' &&
          Uri.haveSameDomain(link.href, window.location.href) &&
          link.href.indexOf('?') < 0) {
        return CrossDomainRpc.removeHash_(link.href);
      }
    }
  }

  const images = dom.getElementsByTagName(TagName.IMG);
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    // find a link which is on the same domain as this page
    // cannot use one with '?' or '#' in its URL as it will confuse
    /* CrossDomainRpc.getFramePayload_()*/
    if (Uri.haveSameDomain(image.src, window.location.href) &&
        image.src.indexOf('?') < 0) {
      return CrossDomainRpc.removeHash_(image.src);
    }
  }

  if (!CrossDomainRpc.useFallBackDummyResource_) {
    throw new Error(
        'No suitable dummy resource specified or detected for this page');
  }

  if (userAgent.EDGE_OR_IE) {
    // use this page as the dummy resource; remove hash from URL if any
    return CrossDomainRpc.removeHash_(window.location.href);
  } else {
    /**
     * Try to use "http://<this-domain>/robots.txt" which may exist.  Even if
     * it does not, an error page is returned and is a good dummy resource to
     * use on Firefox and Safari.  An existing resource is faster because it
     * is cached.
     */
    const locationHref = window.location.href;
    const rootSlash = locationHref.indexOf('/', locationHref.indexOf('//') + 2);
    const rootHref = locationHref.substring(0, rootSlash);
    return rootHref + '/robots.txt';
  }
};


/**
 * Removes everything at and after hash from URI
 * @param {string} uri Uri to to remove hash.
 * @return {string} Uri with its hash and all characters after removed.
 * @private
 */
CrossDomainRpc.removeHash_ = function(uri) {
  return uri.split('#')[0];
};


// ------------
// request side


/**
 * next request id used to support multiple XD requests at the same time
 * @type {number}
 * @private
 */
CrossDomainRpc.nextRequestId_ = 0;


/**
 * Header prefix.
 * @type {string}
 */
CrossDomainRpc.HEADER = 'xdh:';


/**
 * Parameter prefix.
 * @type {string}
 */
CrossDomainRpc.PARAM = 'xdp:';


/**
 * Parameter to echo prefix.
 * @type {string}
 */
CrossDomainRpc.PARAM_ECHO = 'xdpe:';


/**
 * Parameter to echo: request id
 * @type {string}
 */
CrossDomainRpc.PARAM_ECHO_REQUEST_ID =
    CrossDomainRpc.PARAM_ECHO + 'request-id';


/**
 * Parameter to echo: dummy resource URI
 * @type {string}
 */
CrossDomainRpc.PARAM_ECHO_DUMMY_URI =
    CrossDomainRpc.PARAM_ECHO + 'dummy-uri';


/**
 * Cross-domain request marker.
 * @type {string}
 * @private
 */
CrossDomainRpc.REQUEST_MARKER_ = 'xdrq';


/**
 * Sends a request across domain.
 * @param {string} uri Uri to make request to.
 * @param {string=} opt_method Method of request, 'GET' or 'POST' (uppercase).
 *     Default is 'POST'.
 * @param {Object=} opt_params Parameters. Each property is turned into a
 *     request parameter.
 * @param {Object=} opt_headers Map of headers of the request.
 */
CrossDomainRpc.prototype.sendRequest = function(
    uri, opt_method, opt_params, opt_headers) {
  // create request frame
  const requestFrame = this.requestFrame_ =
      dom.createElement(TagName.IFRAME);
  const requestId = CrossDomainRpc.nextRequestId_++;
  requestFrame.id = CrossDomainRpc.REQUEST_MARKER_ + '-' + requestId;
  if (!CrossDomainRpc.debugMode_) {
    requestFrame.style.position = 'absolute';
    requestFrame.style.top = '-5000px';
    requestFrame.style.left = '-5000px';
  }
  document.body.appendChild(requestFrame);

  // build inputs
  const inputs = [];

  // add request id
  inputs.push(
      CrossDomainRpc.createInputHtml_(
          CrossDomainRpc.PARAM_ECHO_REQUEST_ID, requestId));

  // add dummy resource uri
  const dummyUri = CrossDomainRpc.getDummyResourceUri_();
  log.fine(CrossDomainRpc.logger_, 'dummyUri: ' + dummyUri);
  inputs.push(
      CrossDomainRpc.createInputHtml_(
          CrossDomainRpc.PARAM_ECHO_DUMMY_URI, dummyUri));

  // add parameters
  if (opt_params) {
    for (let name in opt_params) {
      const value = opt_params[name];
      inputs.push(
          CrossDomainRpc.createInputHtml_(
              CrossDomainRpc.PARAM + name, value));
    }
  }

  // add headers
  if (opt_headers) {
    for (let name in opt_headers) {
      const value = opt_headers[name];
      inputs.push(
          CrossDomainRpc.createInputHtml_(
              CrossDomainRpc.HEADER + name, value));
    }
  }

  const requestFrameContentHtml = SafeHtml.create(
      'body', {},
      SafeHtml.create(
          'form',
          {'method': opt_method == 'GET' ? 'GET' : 'POST', 'action': uri},
          inputs));
  let requestFrameDoc = dom.getFrameContentDocument(requestFrame);
  requestFrameDoc.open();
  safe.documentWrite(requestFrameDoc, requestFrameContentHtml);
  requestFrameDoc.close();

  requestFrameDoc.forms[0].submit();
  requestFrameDoc = null;

  this.loadListenerKey_ =
      events.listen(requestFrame, EventType.LOAD, function() {
        log.fine(CrossDomainRpc.logger_, 'response ready');
        this.responseReady_ = true;
      }, false, this);

  this.receiveResponse_();
};


/**
 * period of response polling (ms)
 * @type {number}
 * @private
 */
CrossDomainRpc.RESPONSE_POLLING_PERIOD_ = 50;


/**
 * timeout from response comes back to sendResponse is called (ms)
 * @type {number}
 * @private
 */
CrossDomainRpc.SEND_RESPONSE_TIME_OUT_ = 500;


/**
 * Receives response by polling to check readiness of response and then
 *     reads response frames and assembles response data
 * @private
 */
CrossDomainRpc.prototype.receiveResponse_ = function() {
  this.timeWaitedAfterResponseReady_ = 0;
  const responseDetectorHandle = window.setInterval(goog.bind(function() {
    this.detectResponse_(responseDetectorHandle);
  }, this), CrossDomainRpc.RESPONSE_POLLING_PERIOD_);
};


/**
 * Detects response inside request frame
 * @param {number} responseDetectorHandle Handle of detector.
 * @private
 */
CrossDomainRpc.prototype.detectResponse_ = function(
    responseDetectorHandle) {
  const requestFrameWindow = this.requestFrame_.contentWindow;
  const grandChildrenLength = requestFrameWindow.frames.length;
  let responseInfoFrame = null;
  if (grandChildrenLength > 0 &&
      CrossDomainRpc.isResponseInfoFrame_(
          responseInfoFrame =
              requestFrameWindow.frames[grandChildrenLength - 1])) {
    log.fine(CrossDomainRpc.logger_, 'xd response ready');

    const responseInfoPayload =
        CrossDomainRpc.getFramePayload_(responseInfoFrame)
            .substring(1);
    const params = new Uri.QueryData(responseInfoPayload);

    const chunks = [];
    const numChunks = Number(params.get('n'));
    log.fine(
        CrossDomainRpc.logger_,
        'xd response number of chunks: ' + numChunks);
    for (let i = 0; i < numChunks; i++) {
      const responseFrame = requestFrameWindow.frames[i];
      if (!responseFrame || !responseFrame.location ||
          !responseFrame.location.href) {
        // On Safari 3.0, it is sometimes the case that the
        // iframe exists but doesn't have a same domain href yet.
        log.fine(
            CrossDomainRpc.logger_, 'xd response iframe not ready');
        return;
      }
      const responseChunkPayload =
          CrossDomainRpc.getFramePayload_(responseFrame);
      // go past "chunk="
      const chunkIndex =
          responseChunkPayload.indexOf(CrossDomainRpc.PARAM_CHUNK_) +
          CrossDomainRpc.PARAM_CHUNK_.length + 1;
      const chunk = responseChunkPayload.substring(chunkIndex);
      chunks.push(chunk);
    }

    window.clearInterval(responseDetectorHandle);

    let responseData = chunks.join('');
    // Payload is not encoded to begin with on IE. Decode in other cases only.
    if (!userAgent.EDGE_OR_IE) {
      responseData = decodeURIComponent(responseData);
    }

    this.status = Number(params.get('status'));
    this.responseText = responseData;
    this.responseTextIsJson_ = params.get('isDataJson') == 'true';
    this.responseHeaders = /** @type {?Object} */ (JSON.parse(
        /** @type {string} */ (params.get('headers'))));

    this.dispatchEvent(netEventType.READY);
    this.dispatchEvent(netEventType.COMPLETE);
  } else {
    if (this.responseReady_) {
      /* The response has come back. But the first response iframe has not
       * been created yet. If this lasts long enough, it is an error.
       */
      this.timeWaitedAfterResponseReady_ +=
          CrossDomainRpc.RESPONSE_POLLING_PERIOD_;
      if (this.timeWaitedAfterResponseReady_ >
          CrossDomainRpc.SEND_RESPONSE_TIME_OUT_) {
        log.fine(CrossDomainRpc.logger_, 'xd response timed out');
        window.clearInterval(responseDetectorHandle);

        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.responseText = 'response timed out';

        this.dispatchEvent(netEventType.READY);
        this.dispatchEvent(netEventType.ERROR);
        this.dispatchEvent(netEventType.COMPLETE);
      }
    }
  }
};


/**
 * Checks whether a frame is response info frame.
 * @param {Object} frame Frame to check.
 * @return {boolean} True if frame is a response info frame; false otherwise.
 * @private
 */
CrossDomainRpc.isResponseInfoFrame_ = function(frame) {
  try {
    return CrossDomainRpc.getFramePayload_(frame).indexOf(
               CrossDomainRpc.RESPONSE_INFO_MARKER_) == 1;
  } catch (e) {
    // frame not ready for same-domain access yet
    return false;
  }
};


/**
 * Returns the payload of a frame (value after # or ? on the URL).  This value
 * is URL encoded except IE, where the value is not encoded to begin with.
 * @param {Object} frame Frame.
 * @return {string} Payload of that frame.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
CrossDomainRpc.getFramePayload_ = function(frame) {
  const href = frame.location.href;
  const question = href.indexOf('?');
  const hash = href.indexOf('#');
  // On IE, beucase the URL is not encoded, we can have a case where ?
  // is the delimiter before payload and # in payload or # as the delimiter
  // and ? in payload.  So here we treat whoever is the first as the delimiter.
  const delimiter = question < 0 ? hash :
      hash < 0                   ? question :
                                   Math.min(question, hash);
  return href.substring(delimiter);
};


/**
 * If response is JSON, evaluates it to a JavaScript object and
 * returns it; otherwise returns undefined.
 * @return {Object|undefined} JavaScript object if response is in JSON
 *     or undefined.
 */
CrossDomainRpc.prototype.getResponseJson = function() {
  return this.responseTextIsJson_ ?
      /** @type {?Object} */ (JSON.parse(this.responseText)) :
      undefined;
};


/**
 * @return {boolean} Whether the request completed with a success.
 */
CrossDomainRpc.prototype.isSuccess = function() {
  // Definition similar to goog.net.XhrIo.prototype.isSuccess.
  switch (this.status) {
    case HttpStatus.OK:
    case HttpStatus.NOT_MODIFIED:
      return true;

    default:
      return false;
  }
};


/**
 * Removes request iframe used.
 */
CrossDomainRpc.prototype.reset = function() {
  if (!CrossDomainRpc.debugMode_) {
    log.fine(
        CrossDomainRpc.logger_,
        'request frame removed: ' + this.requestFrame_.id);
    events.unlistenByKey(this.loadListenerKey_);
    this.requestFrame_.parentNode.removeChild(this.requestFrame_);
  }
  delete this.requestFrame_;
};


// -------------
// response side


/**
 * Name of response info iframe.
 * @type {string}
 * @private
 */
CrossDomainRpc.RESPONSE_INFO_MARKER_ =
    CrossDomainRpc.RESPONSE_MARKER_ + '-info';


/**
 * Maximal chunk size.  IE can only handle 4095 bytes on its URL.
 * 16MB has been tested on Firefox.  But 1MB is a practical size.
 * @type {number}
 * @private
 */
CrossDomainRpc.MAX_CHUNK_SIZE_ =
    userAgent.EDGE_OR_IE ? 4095 : 1024 * 1024;


/**
 * Query parameter 'chunk'.
 * @type {string}
 * @private
 */
CrossDomainRpc.PARAM_CHUNK_ = 'chunk';


/**
 * Prefix before data chunk for passing other parameters.
 * type String
 * @private
 */
CrossDomainRpc.CHUNK_PREFIX_ =
    CrossDomainRpc.RESPONSE_MARKER_ + '=1&' +
    CrossDomainRpc.PARAM_CHUNK_ + '=';


/**
 * Makes response available for grandparent (requester)'s receiveResponse
 * call to pick up by creating a series of iframes pointed to the dummy URI
 * with a payload (value after either ? or #) carrying a chunk of response
 * data and a response info iframe that tells the grandparent (requester) the
 * readiness of response.
 * @param {string} data Response data (string or JSON string).
 * @param {boolean} isDataJson true if data is a JSON string; false if just a
 *     string.
 * @param {Object} echo Parameters to echo back
 *     "xdpe:request-id": Server that produces the response needs to
 *     copy it here to support multiple current XD requests on the same page.
 *     "xdpe:dummy-uri": URI to a dummy resource that response
 *     iframes point to to gain the domain of the client.  This can be an
 *     image (IE) or a CSS file (FF) found on the requester's page.
 *     Server should copy value from request parameter "xdpe:dummy-uri".
 * @param {number} status HTTP response status code.
 * @param {string} headers Response headers in JSON format.
 */
CrossDomainRpc.sendResponse = function(
    data, isDataJson, echo, status, headers) {
  let dummyUri = echo[CrossDomainRpc.PARAM_ECHO_DUMMY_URI];

  // since the dummy-uri can be specified by the user, verify that it doesn't
  // use any other protocols. (Specifically we don't want users to use a
  // dummy-uri beginning with "javascript:").
  if (!googString.caseInsensitiveStartsWith(dummyUri, 'http://') &&
      !googString.caseInsensitiveStartsWith(dummyUri, 'https://')) {
    dummyUri = 'http://' + dummyUri;
  }

  // usable chunk size is max less dummy URI less chunk prefix length
  // TODO(user): Figure out why we need to do "- 1" below
  const chunkSize = CrossDomainRpc.MAX_CHUNK_SIZE_ - dummyUri.length -
      1 -  // payload delimiter ('#' or '?')
      CrossDomainRpc.CHUNK_PREFIX_.length - 1;

  /*
   * Here we used to do URI encoding of data before we divide it into chunks
   * and decode on the receiving end.  We don't do this any more on IE for the
   * following reasons.
   *
   * 1) On IE, calling decodeURIComponent on a relatively large string is
   *   extremely slow (~22s for 160KB).  So even a moderate amount of data
   *   makes this library pretty much useless.  Fortunately, we can actually
   *   put unencoded data on IE's URL and get it back reliably.  So we are
   *   completely skipping encoding and decoding on IE.  When we call
   *   getFrameHash_ to get it back, the value is still intact(*) and unencoded.
   * 2) On Firefox, we have to call decodeURIComponent because location.hash
   *   does decoding by itself.  Fortunately, decodeURIComponent is not slow
   *   on Firefox.
   * 3) Safari automatically encodes everything you put on URL and it does not
   *   automatically decode when you access it via location.hash or
   *   location.href.  So we encode it here and decode it in detectResponse_().
   *
   * Note(user): IE actually does encode only space to %20 and decodes that
   *   automatically when you do location.href or location.hash.
   */
  if (!userAgent.EDGE_OR_IE) {
    data = encodeURIComponent(data);
  }

  const numChunksToSend = Math.ceil(data.length / chunkSize);
  if (numChunksToSend == 0) {
    CrossDomainRpc.createResponseInfo_(
        dummyUri, numChunksToSend, isDataJson, status, headers);
  } else {
    let numChunksSent = 0;
    const checkToCreateResponseInfo_ = function() {
      if (++numChunksSent == numChunksToSend) {
        CrossDomainRpc.createResponseInfo_(
            dummyUri, numChunksToSend, isDataJson, status, headers);
      }
    };

    for (let i = 0; i < numChunksToSend; i++) {
      const chunkStart = i * chunkSize;
      const chunkEnd = chunkStart + chunkSize;
      const chunk = chunkEnd > data.length ?
          data.substring(chunkStart) :
          data.substring(chunkStart, chunkEnd);

      const responseFrame = dom.createElement(TagName.IFRAME);
      responseFrame.src = dummyUri +
          CrossDomainRpc.getPayloadDelimiter_(dummyUri) +
          CrossDomainRpc.CHUNK_PREFIX_ + chunk;
      document.body.appendChild(responseFrame);

      // We used to call the function below when handling load event of
      // responseFrame.  But that event does not fire on IE when current
      // page is used as the dummy resource (because its loading is stopped?).
      // It also does not fire sometimes on Firefox.  So now we call it
      // directly.
      checkToCreateResponseInfo_();
    }
  }
};


/**
 * Creates a response info iframe to indicate completion of sendResponse
 * @param {string} dummyUri URI to a dummy resource.
 * @param {number} numChunks Total number of chunks.
 * @param {boolean} isDataJson Whether response is a JSON string or just string.
 * @param {number} status HTTP response status code.
 * @param {string} headers Response headers in JSON format.
 * @private
 */
CrossDomainRpc.createResponseInfo_ = function(
    dummyUri, numChunks, isDataJson, status, headers) {
  const responseInfoFrame = dom.createElement(TagName.IFRAME);
  document.body.appendChild(responseInfoFrame);
  responseInfoFrame.src = dummyUri +
      CrossDomainRpc.getPayloadDelimiter_(dummyUri) +
      CrossDomainRpc.RESPONSE_INFO_MARKER_ + '=1&n=' + numChunks +
      '&isDataJson=' + isDataJson + '&status=' + status + '&headers=' +
      encodeURIComponent(headers);
};


/**
 * Returns payload delimiter, either "#" when caller's page is not used as
 * the dummy resource or "?" when it is, in which case caching issues prevent
 * response frames to gain the caller's domain.
 * @param {string} dummyUri URI to resource being used as dummy resource.
 * @return {string} Either "?" when caller's page is used as dummy resource or
 *     "#" if it is not.
 * @private
 */
CrossDomainRpc.getPayloadDelimiter_ = function(dummyUri) {
  return CrossDomainRpc.REFERRER_ == dummyUri ? '?' : '#';
};


/**
 * Removes all parameters (after ? or #) from URI.
 * @param {string} uri URI to remove parameters from.
 * @return {string} URI with all parameters removed.
 * @private
 */
CrossDomainRpc.removeUriParams_ = function(uri) {
  // remove everything after question mark
  const question = uri.indexOf('?');
  if (question > 0) {
    uri = uri.substring(0, question);
  }

  // remove everything after hash mark
  const hash = uri.indexOf('#');
  if (hash > 0) {
    uri = uri.substring(0, hash);
  }

  return uri;
};


/**
 * Gets a response header.
 * @param {string} name Name of response header.
 * @return {string|undefined} Value of response header; undefined if not found.
 */
CrossDomainRpc.prototype.getResponseHeader = function(name) {
  return goog.isObject(this.responseHeaders) ? this.responseHeaders[name] :
                                               undefined;
};


/**
 * Referrer of current document with all parameters after "?" and "#" stripped.
 * @type {string}
 * @private
 */
CrossDomainRpc.REFERRER_ =
    CrossDomainRpc.removeUriParams_(document.referrer);
