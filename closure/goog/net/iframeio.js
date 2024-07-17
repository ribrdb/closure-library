/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class for managing requests via iFrames.  Supports a number of
 * methods of transfer.
 *
 * Gets and Posts can be performed and the resultant page read in as text,
 * JSON, or from the HTML DOM.
 *
 * Using an iframe causes the throbber to spin, this is good for providing
 * feedback to the user that an action has occurred.
 *
 * Requests do not affect the history stack, see goog.History if you require
 * this behavior.
 *
 * The responseText and responseJson methods assume the response is plain,
 * text.  You can access the Iframe's DOM through responseXml if you need
 * access to the raw HTML.
 *
 * Tested:
 *    + FF2.0 (Win Linux)
 *    + IE6, IE7
 *    + Opera 9.1,
 *    + Chrome
 *    - Opera 8.5 fails because of no textContent and buggy innerText support
 *
 * NOTE: Safari doesn't fire the onload handler when loading plain text files
 *
 * This has been tested with Drip in IE to ensure memory usage is as constant
 * as possible. When making making thousands of requests, memory usage stays
 * constant for a while but then starts increasing (<500k for 2000
 * requests) -- this hasn't yet been tracked down yet, though it is cleared up
 * after a refresh.
 *
 *
 * BACKGROUND FILE UPLOAD:
 * By posting an arbitrary form through an IframeIo object, it is possible to
 * implement background file uploads.  Here's how to do it:
 *
 * - Create a form:
 *   <pre>
 *   &lt;form id="form" enctype="multipart/form-data" method="POST"&gt;
 *      &lt;input name="userfile" type="file" /&gt;
 *   &lt;/form&gt;
 *   </pre>
 *
 * - Have the user click the file input
 * - Create an IframeIo instance
 *   <pre>
 *   const io = new IframeIo;
 *   events.listen(io, netEventType.COMPLETE,
 *       function() { alert('Sent'); });
 *   io.sendFromForm(document.getElementById('form'));
 *   </pre>
 *
 *
 * INCREMENTAL LOADING:
 * Gmail sends down multiple script blocks which get executed as they are
 * received by the client. This allows incremental rendering of the thread
 * list and conversations.
 *
 * This requires collaboration with the server that is sending the requested
 * page back.  To set incremental loading up, you should:
 *
 * A) In the application code there should be an externed reference to
 * <code>handleIncrementalData()</code>.  e.g.
 * goog.exportSymbol('GG_iframeFn', IframeIo.handleIncrementalData);
 *
 * B) The response page should them call this method directly, an example
 * response would look something like this:
 * <pre>
 *   &lt;html&gt;
 *   &lt;head&gt;
 *     &lt;meta content="text/html;charset=UTF-8" http-equiv="content-type"&gt;
 *   &lt;/head&gt;
 *   &lt;body&gt;
 *     &lt;script&gt;
 *       D = top.P ? function(d) { top.GG_iframeFn(window, d) } : function() {};
 *     &lt;/script&gt;
 *
 *     &lt;script&gt;D([1, 2, 3, 4, 5]);&lt;/script&gt;
 *     &lt;script&gt;D([6, 7, 8, 9, 10]);&lt;/script&gt;
 *     &lt;script&gt;D([11, 12, 13, 14, 15]);&lt;/script&gt;
 *   &lt;/body&gt;
 *   &lt;/html&gt;
 * </pre>
 *
 * Your application should then listen, on the IframeIo instance, to the event
 * netEventType.INCREMENTAL_DATA.  The event object contains a
 * 'data' member which is the content from the D() calls above.
 *
 * NOTE: There can be problems if you save a reference to the data object in IE.
 * If you save an array, and the iframe is dispose, then the array looses its
 * prototype and thus array methods like .join().  You can get around this by
 * creating arrays using the parent window's Array constructor, or you can
 * clone the array.
 *
 *
 * EVENT MODEL:
 * The various send methods work asynchronously. You can be notified about
 * the current status of the request (completed, success or error) by
 * listening for events on the IframeIo object itself. The following events
 * will be sent:
 * - netEventType.COMPLETE: when the request is completed
 *   (either successfully or unsuccessfully). You can find out about the result
 *   using the isSuccess() and getLastError
 *   methods.
 * - netEventType.SUCCESS</code>: when the request was completed
 *   successfully
 * - netEventType.ERROR: when the request failed
 * - netEventType.ABORT: when the request has been aborted
 *
 * Example:
 * <pre>
 * const io = new IframeIo();
 * events.listen(io, netEventType.COMPLETE,
 *   function() { alert('request complete'); });
 * io.sendFromForm(...);
 * </pre>
 */

import { Timer } from '../timer/timer.js';

import { Uri } from '../uri/uri.js';
import * as array from '../array/array.js';
import * as asserts from '../asserts/asserts.js';
import * as formatter from '../debug/formatter.js';
import * as googDom from '../dom/dom.js';
import { InputType } from '../dom/inputtype.js';
import { TagName } from '../dom/tagname.js';
import * as safe from '../dom/safe.js';
import * as events from '../events/events.js';
import { Event } from '../events/event.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
import * as legacyconversions from '../html/legacyconversions.js';
import * as uncheckedconversions from '../html/uncheckedconversions.js';
import * as json from '../json/json.js';
import * as log from '../log/log.js';
import * as googLog from '../log/log.js';
import { ErrorCode } from './errorcode.js';
import { EventType as netEventType } from './eventtype.js';
import * as reflect from '../reflect/reflect.js';
import * as googString from '../string/string.js';
import { Const } from '../string/const.js';
import * as structs from '../structs/structs.js';
import * as userAgent from '../useragent/useragent.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { SafeHtml } = goog.requireType('goog.html.SafeHtml');
const { Map } = goog.requireType('goog.structs.map');



/**
 * Class for managing requests via iFrames.
 * @constructor
 * @extends {EventTarget}
 */
export function IframeIo() {
  IframeIo.base(this, 'constructor');

  /**
   * Name for this IframeIo and frame
   * @type {string}
   * @private
   */
  this.name_ = IframeIo.getNextName_();

  /**
   * An array of iframes that have been finished with.  We need them to be
   * disposed async, so we don't confuse the browser (see below).
   * @type {Array<Element>}
   * @private
   */
  this.iframesForDisposal_ = [];

  // Create a lookup from names to instances of IframeIo.  This is a helper
  /* function to be used in conjunction with IframeIo.getInstanceByName*/
  // to find the IframeIo object associated with a particular iframe.  Used in
  // incremental scripts etc.
  IframeIo.instances_[this.name_] = this;
}
goog.inherits(IframeIo, EventTarget);


/**
 * Object used as a map to lookup instances of IframeIo objects by name.
 * @type {Object}
 * @private
 */
IframeIo.instances_ = {};


/**
 * Prefix for frame names
 * @type {string}
 */
IframeIo.FRAME_NAME_PREFIX = 'closure_frame';


/**
 * Suffix that is added to inner frames used for sending requests in non-IE
 * browsers
 * @type {string}
 */
IframeIo.INNER_FRAME_SUFFIX = '_inner';


/**
 * The number of milliseconds after a request is completed to dispose the
 * iframes.  This can be done lazily so we wait long enough for any processing
 * that occurred as a result of the response to finish.
 * @type {number}
 */
IframeIo.IFRAME_DISPOSE_DELAY_MS = 2000;


/**
 * Counter used when creating iframes
 * @type {number}
 * @private
 */
IframeIo.counter_ = 0;


/**
 * Form element to post to.
 * @type {HTMLFormElement}
 * @private
 */
IframeIo.form_;


/**
 * Static send that creates a short lived instance of IframeIo to send the
 * request.
 * @param {Uri|string} uri Uri of the request, it is up the caller to
 *     manage query string params.
 * @param {Function=} opt_callback Event handler for when request is completed.
 * @param {string=} opt_method Default is GET, POST uses a form to submit the
 *     request.
 * @param {boolean=} opt_noCache Append a timestamp to the request to avoid
 *     caching.
 * @param {Object|Map=} opt_data Map of key-value pairs that
 *     will be posted to the server via the iframe's form.
 */
IframeIo.send = function(
    uri, opt_callback, opt_method, opt_noCache, opt_data) {
  const io = new IframeIo();
  events.listen(io, netEventType.READY, io.dispose, false, io);
  if (opt_callback) {
    events.listen(io, netEventType.COMPLETE, opt_callback);
  }
  io.send(uri, opt_method, opt_noCache, opt_data);
};


/**
 * Find an iframe by name (assumes the context is goog.global since that is
 * where IframeIo's iframes are kept).
 * @param {string} fname The name to find.
 * @return {HTMLIFrameElement} The iframe element with that name.
 */
IframeIo.getIframeByName = function(fname) {
  return window.frames[fname];
};


/**
 * Find an instance of the IframeIo object by name.
 * @param {string} fname The name to find.
 * @return {IframeIo} The instance of IframeIo.
 */
IframeIo.getInstanceByName = function(fname) {
  return IframeIo.instances_[fname];
};


/**
 * Handles incremental data and routes it to the correct iframeIo instance.
 * The HTML page requested by the IframeIo instance should contain script blocks
 * that call an externed reference to this method.
 * @param {Window} win The window object.
 * @param {Object} data The data object.
 */
IframeIo.handleIncrementalData = function(win, data) {
  // If this is the inner-frame, then we need to use the parent instead.
  const iframeName =
      googString.endsWith(win.name, IframeIo.INNER_FRAME_SUFFIX) ?
      win.parent.name :
      win.name;

  const iframeIoName = iframeName.substring(0, iframeName.lastIndexOf('_'));
  const iframeIo = IframeIo.getInstanceByName(iframeIoName);
  if (iframeIo && iframeName == iframeIo.iframeName_) {
    iframeIo.handleIncrementalData_(data);
  } else {
    const logger = googLog.getLogger('goog.net.IframeIo');
    googLog.info(logger, 'Incremental iframe data routed for unknown iframe');
  }
};


/**
 * @return {string} The next iframe name.
 * @private
 */
IframeIo.getNextName_ = function() {
  return IframeIo.FRAME_NAME_PREFIX + IframeIo.counter_++;
};


/**
 * Gets a static form, one for all instances of IframeIo since IE6 leaks form
 * nodes that are created/removed from the document.
 * @return {!HTMLFormElement} The static form.
 * @private
 */
IframeIo.getForm_ = function() {
  if (!IframeIo.form_) {
    IframeIo.form_ = googDom.createDom(TagName.FORM);
    IframeIo.form_.acceptCharset = 'utf-8';

    // Hide the form and move it off screen
    const s = IframeIo.form_.style;
    s.position = 'absolute';
    s.visibility = 'hidden';
    s.top = s.left = '-10px';
    s.width = s.height = '10px';
    s.overflow = 'hidden';

    googDom.getDocument().body.appendChild(IframeIo.form_);
  }
  return IframeIo.form_;
};


/**
 * Adds the key value pairs from a map like data structure to a form
 * @param {HTMLFormElement} form The form to add to.
 * @param {Object|Map|Uri.QueryData} data The data to add.
 * @private
 */
IframeIo.addFormInputs_ = function(form, data) {
  const helper = googDom.getDomHelper(form);
  structs.forEach(data, function(value, key) {
    if (!Array.isArray(value)) {
      value = [value];
    }
    array.forEach(value, function(value) {
      const inp = helper.createDom(
          TagName.INPUT,
          {'type': InputType.HIDDEN, 'name': key, 'value': value});
      form.appendChild(inp);
    });
  });
};


/**
 * Reference to a logger for the IframeIo objects
 * @type {log.Logger}
 * @private
 */
IframeIo.prototype.logger_ = googLog.getLogger('goog.net.IframeIo');


/**
 * Reference to form element that gets reused for requests to the iframe.
 * @type {?HTMLFormElement}
 * @private
 */
IframeIo.prototype.form_ = null;


/**
 * Reference to the iframe being used for the current request, or null if no
 * request is currently active.
 * @type {?HTMLIFrameElement}
 * @private
 */
IframeIo.prototype.iframe_ = null;


/**
 * Name of the iframe being used for the current request, or null if no
 * request is currently active.
 * @type {?string}
 * @private
 */
IframeIo.prototype.iframeName_ = null;


/**
 * Next id so that iframe names are unique.
 * @type {number}
 * @private
 */
IframeIo.prototype.nextIframeId_ = 0;


/**
 * Whether the object is currently active with a request.
 * @type {boolean}
 * @private
 */
IframeIo.prototype.active_ = false;


/**
 * Whether the last request is complete.
 * @type {boolean}
 * @private
 */
IframeIo.prototype.complete_ = false;


/**
 * Whether the last request was a success.
 * @type {boolean}
 * @private
 */
IframeIo.prototype.success_ = false;


/**
 * The URI for the last request.
 * @type {?Uri}
 * @private
 */
IframeIo.prototype.lastUri_ = null;


/**
 * The text content of the last request.
 * @type {?string}
 * @private
 */
IframeIo.prototype.lastContent_ = null;


/**
 * Last error code
 * @type {ErrorCode}
 * @private
 */
IframeIo.prototype.lastErrorCode_ = ErrorCode.NO_ERROR;


/**
 * Window timeout ID used to detect when firefox silently fails.
 * @type {?number}
 * @private
 */
IframeIo.prototype.firefoxSilentErrorTimeout_ = null;


/**
 * Window timeout ID used by the timer that disposes the iframes.
 * @type {?number}
 * @private
 */
IframeIo.prototype.iframeDisposalTimer_ = null;


/**
 * This is used to ensure that we don't handle errors twice for the same error.
 * We can reach the {@link #handleError_} method twice in IE if the form is
 * submitted while IE is offline and the URL is not available.
 * @type {boolean}
 * @private
 */
IframeIo.prototype.errorHandled_;


/**
 * Whether to suppress the listeners that determine when the iframe loads.
 * @type {boolean}
 * @private
 */
IframeIo.prototype.ignoreResponse_ = false;


/** @private {Function} */
IframeIo.prototype.errorChecker_;


/** @private {Object} */
IframeIo.prototype.lastCustomError_;


/** @private {?string} */
IframeIo.prototype.lastContentHtml_;


/**
 * Sends a request via an iframe.
 *
 * A HTML form is used and submitted to the iframe, this simplifies the
 * difference between GET and POST requests. The iframe needs to be created and
 * destroyed for each request otherwise the request will contribute to the
 * history stack.
 *
 * sendFromForm does some clever trickery (thanks jlim) in non-IE browsers to
 * stop a history entry being added for POST requests.
 *
 * @param {Uri|string} uri Uri of the request.
 * @param {string=} opt_method Default is GET, POST uses a form to submit the
 *     request.
 * @param {boolean=} opt_noCache Append a timestamp to the request to avoid
 *     caching.
 * @param {Object|Map=} opt_data Map of key-value pairs.
 */
IframeIo.prototype.send = function(
    uri, opt_method, opt_noCache, opt_data) {
  if (this.active_) {
    throw new Error('[goog.net.IframeIo] Unable to send, already active.');
  }

  const uriObj = new Uri(uri);
  this.lastUri_ = uriObj;
  const method = opt_method ? opt_method.toUpperCase() : 'GET';

  if (opt_noCache) {
    uriObj.makeUnique();
  }

  googLog.info(
      this.logger_, 'Sending iframe request: ' + uriObj + ' [' + method + ']');

  // Build a form for this request
  this.form_ = IframeIo.getForm_();

  if (method == 'GET') {
    // For GET requests, we assume that the caller didn't want the queryparams
    // already specified in the URI to be clobbered by the form, so we add the
    // params here.
    IframeIo.addFormInputs_(this.form_, uriObj.getQueryData());
  }

  if (opt_data) {
    // Create form fields for each of the data values
    IframeIo.addFormInputs_(this.form_, opt_data);
  }

  // Set the URI that the form will be posted
  safe.setFormElementAction(
      this.form_,
      legacyconversions.safeUrlFromString(uriObj.toString()));
  this.form_.method = method;

  this.sendFormInternal_();
  this.clearForm_();
};


/**
 * Sends the data stored in an existing form to the server. The HTTP method
 * should be specified on the form, the action can also be specified but can
 * be overridden by the optional URI param.
 *
 * This can be used in conjunction will a file-upload input to upload a file in
 * the background without affecting history.
 *
 * Example form:
 * <pre>
 *   &lt;form action="/server/" enctype="multipart/form-data" method="POST"&gt;
 *     &lt;input name="userfile" type="file"&gt;
 *   &lt;/form&gt;
 * </pre>
 *
 * @param {HTMLFormElement} form Form element used to send the request to the
 *     server.
 * @param {string=} opt_uri Uri to set for the destination of the request, by
 *     default the uri will come from the form.
 * @param {boolean=} opt_noCache Append a timestamp to the request to avoid
 *     caching.
 */
IframeIo.prototype.sendFromForm = function(
    form, opt_uri, opt_noCache) {
  if (this.active_) {
    throw new Error('[goog.net.IframeIo] Unable to send, already active.');
  }

  const uri = new Uri(opt_uri || form.action);
  if (opt_noCache) {
    uri.makeUnique();
  }

  googLog.info(this.logger_, 'Sending iframe request from form: ' + uri);

  this.lastUri_ = uri;
  this.form_ = form;
  safe.setFormElementAction(
      asserts.assert(this.form_), uri.toString());
  this.sendFormInternal_();
};


/**
 * Abort the current Iframe request
 * @param {ErrorCode=} opt_failureCode Optional error code to use -
 *     defaults to ABORT.
 */
IframeIo.prototype.abort = function(opt_failureCode) {
  if (this.active_) {
    googLog.info(this.logger_, 'Request aborted');
    const requestIframe = this.getRequestIframe();
    asserts.assert(requestIframe);
    events.removeAll(requestIframe);
    this.complete_ = false;
    this.active_ = false;
    this.success_ = false;
    this.lastErrorCode_ = opt_failureCode || ErrorCode.ABORT;

    this.dispatchEvent(netEventType.ABORT);

    this.makeReady_();
  }
};


/** @override */
IframeIo.prototype.disposeInternal = function() {
  googLog.fine(this.logger_, 'Disposing iframeIo instance');

  // If there is an active request, abort it
  if (this.active_) {
    googLog.fine(this.logger_, 'Aborting active request');
    this.abort();
  }

  // Call super-classes implementation (remove listeners)
  IframeIo.superClass_.disposeInternal.call(this);

  // Add the current iframe to the list of iframes for disposal.
  if (this.iframe_) {
    this.scheduleIframeDisposal_();
  }

  // Disposes of the form
  this.disposeForm_();

  // Nullify anything that might cause problems and clear state
  delete this.errorChecker_;
  this.form_ = null;
  this.lastCustomError_ = this.lastContent_ = this.lastContentHtml_ = null;
  this.lastUri_ = null;
  this.lastErrorCode_ = ErrorCode.NO_ERROR;

  delete IframeIo.instances_[this.name_];
};


/**
 * @return {boolean} True if transfer is complete.
 */
IframeIo.prototype.isComplete = function() {
  return this.complete_;
};


/**
 * @return {boolean} True if transfer was successful.
 */
IframeIo.prototype.isSuccess = function() {
  return this.success_;
};


/**
 * @return {boolean} True if a transfer is in progress.
 */
IframeIo.prototype.isActive = function() {
  return this.active_;
};


/**
 * Returns the last response text (i.e. the text content of the iframe).
 * Assumes plain text!
 * @return {?string} Result from the server.
 */
IframeIo.prototype.getResponseText = function() {
  return this.lastContent_;
};


/**
 * Returns the last response html (i.e. the innerHtml of the iframe).
 * @return {?string} Result from the server.
 */
IframeIo.prototype.getResponseHtml = function() {
  return this.lastContentHtml_;
};


/**
 * Parses the content as JSON. This is a legacy method for browsers without
 * JSON.parse or for responses that are not valid JSON (e.g. containing NaN).
 * Use JSON.parse(this.getResponseText()) in the other cases.
 * @return {Object} The parsed content.
 */
IframeIo.prototype.getResponseJson = function() {
  return json.parse(this.lastContent_);
};


/**
 * Returns the document object from the last request.  Not truly XML, but
 * used to mirror the XhrIo interface.
 * @return {HTMLDocument} The document object from the last request.
 */
IframeIo.prototype.getResponseXml = function() {
  if (!this.iframe_) return null;

  return this.getContentDocument_();
};


/**
 * Get the uri of the last request.
 * @return {Uri} Uri of last request.
 */
IframeIo.prototype.getLastUri = function() {
  return this.lastUri_;
};


/**
 * Gets the last error code.
 * @return {ErrorCode} Last error code.
 */
IframeIo.prototype.getLastErrorCode = function() {
  return this.lastErrorCode_;
};


/**
 * Gets the last error message.
 * @return {string} Last error message.
 */
IframeIo.prototype.getLastError = function() {
  return ErrorCode.getDebugMessage(this.lastErrorCode_);
};


/**
 * Gets the last custom error.
 * @return {Object} Last custom error.
 */
IframeIo.prototype.getLastCustomError = function() {
  return this.lastCustomError_;
};


/**
 * Sets the callback function used to check if a loaded IFrame is in an error
 * state.
 * @param {Function} fn Callback that expects a document object as it's single
 *     argument.
 */
IframeIo.prototype.setErrorChecker = function(fn) {
  this.errorChecker_ = fn;
};


/**
 * Gets the callback function used to check if a loaded IFrame is in an error
 * state.
 * @return {Function} A callback that expects a document object as it's single
 *     argument.
 */
IframeIo.prototype.getErrorChecker = function() {
  return this.errorChecker_;
};


/**
 * @return {boolean} Whether the server response is being ignored.
 */
IframeIo.prototype.isIgnoringResponse = function() {
  return this.ignoreResponse_;
};


/**
 * Sets whether to ignore the response from the server by not adding any event
 * handlers to fire when the iframe loads. This is necessary when using IframeIo
 * to submit to a server on another domain, to avoid same-origin violations when
 * trying to access the response. If this is set to true, the IframeIo instance
 * will be a single-use instance that is only usable for one request.  It will
 * only clean up its resources (iframes and forms) when it is disposed.
 * @param {boolean} ignore Whether to ignore the server response.
 */
IframeIo.prototype.setIgnoreResponse = function(ignore) {
  this.ignoreResponse_ = ignore;
};


/**
 * Submits the internal form to the iframe.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
IframeIo.prototype.sendFormInternal_ = function() {
  this.active_ = true;
  this.complete_ = false;
  this.lastErrorCode_ = ErrorCode.NO_ERROR;

  // Make Iframe
  this.createIframe_();

  // For all other browsers we do some trickery to ensure that there is no
  // entry on the history stack. Thanks go to jlim for the prototype for this

  googLog.fine(this.logger_, 'Setting up iframes and cloning form');

  this.appendIframe_();

  const innerFrameName =
      this.iframeName_ + IframeIo.INNER_FRAME_SUFFIX;

  // Open and document.write another iframe into the iframe
  const doc = googDom.getFrameContentDocument(this.iframe_);
  let html;
  if (document.baseURI) {
    // On Safari 4 and 5 the new iframe doesn't inherit the current baseURI.
    html = IframeIo.createIframeHtmlWithBaseUri_(innerFrameName);
  } else {
    html = IframeIo.createIframeHtml_(innerFrameName);
  }
  safe.documentWrite(doc, html);

  // Listen for the iframe's load
  if (!this.ignoreResponse_) {
    events.listen(
        doc.getElementById(innerFrameName), EventType.LOAD,
        this.onIframeLoaded_, false, this);
  }

  // Fix text areas, since importNode won't clone changes to the value
  const textareas = googDom.getElementsByTagName(
      TagName.TEXTAREA, asserts.assert(this.form_));
  for (let i = 0, n = textareas.length; i < n; i++) {
    // The childnodes represent the initial child nodes for the text area
    // appending a text node essentially resets the initial value ready for
    // it to be clones - while maintaining HTML escaping.
    const value = textareas[i].value;
    if (googDom.getRawTextContent(textareas[i]) != value) {
      googDom.setTextContent(textareas[i], value);
      textareas[i].value = value;
    }
  }

  // Append a cloned form to the iframe
  let clone = doc.importNode(asserts.assert(this.form_), true);
  clone.target = innerFrameName;
  // Work around crbug.com/66987
  clone.action = this.form_.action;
  doc.body.appendChild(clone);

  // Fix select boxes, importNode won't override the default value
  const selects = googDom.getElementsByTagName(
      TagName.SELECT, asserts.assert(this.form_));
  const clones = googDom.getElementsByTagName(
      TagName.SELECT, /** @type {!Element} */ (clone));
  for (let i = 0, n = selects.length; i < n; i++) {
    const selectsOptions =
        googDom.getElementsByTagName(TagName.OPTION, selects[i]);
    const clonesOptions =
        googDom.getElementsByTagName(TagName.OPTION, clones[i]);
    for (let j = 0, m = selectsOptions.length; j < m; j++) {
      clonesOptions[j].selected = selectsOptions[j].selected;
    }
  }

  // IE and some versions of Firefox (1.5 - 1.5.07?) fail to clone the value
  // attribute for <input type="file"> nodes, which results in an empty
  // upload if the clone is submitted.  Check, and if the clone failed, submit
  // using the original form instead.
  const inputs = googDom.getElementsByTagName(
      TagName.INPUT, asserts.assert(this.form_));
  const inputClones = googDom.getElementsByTagName(
      TagName.INPUT, /** @type {!Element} */ (clone));
  for (let i = 0, n = inputs.length; i < n; i++) {
    if (inputs[i].type == InputType.FILE) {
      if (inputs[i].value != inputClones[i].value) {
        googLog.fine(
            this.logger_,
            'File input value not cloned properly.  Will ' +
                'submit using original form.');
        this.form_.target = innerFrameName;
        clone = this.form_;
        break;
      }
    }
  }

  googLog.fine(this.logger_, 'Submitting form');


  try {
    this.errorHandled_ = false;
    clone.submit();
    doc.close();

    if (userAgent.GECKO) {
      // This tests if firefox silently fails, this can happen, for example,
      // when the server resets the connection because of a large file upload
      this.firefoxSilentErrorTimeout_ =
          Timer.callOnce(this.testForFirefoxSilentError_, 250, this);
    }

  } catch (e) {
    // If submit threw an exception then it probably means the page that the
    // code is running on the local file system and the form's action was
    // pointing to a file that doesn't exist, causing the browser to fire an
    // exception.

    googLog.error(
        this.logger_,
        'Error when submitting form: ' +
            formatter.HtmlFormatter.exposeException(e));

    if (!this.ignoreResponse_) {
      events.unlisten(
          doc.getElementById(innerFrameName), EventType.LOAD,
          this.onIframeLoaded_, false, this);
    }

    doc.close();

    this.handleError_(ErrorCode.FILE_NOT_FOUND);
  }
};


/**
 * @param {string} innerFrameName
 * @return {!SafeHtml}
 * @private
 */
IframeIo.createIframeHtml_ = function(innerFrameName) {
  const innerFrameNameEscaped = googString.htmlEscape(innerFrameName);
  return uncheckedconversions
      .safeHtmlFromStringKnownToSatisfyTypeContract(
          Const.from(
              'Short HTML snippet, input escaped, for performance'),
          '<body><iframe id="' + innerFrameNameEscaped + '" name="' +
              innerFrameNameEscaped + '"></iframe>');
};


/**
 * @param {string} innerFrameName
 * @return {!SafeHtml}
 * @private
 */
IframeIo.createIframeHtmlWithBaseUri_ = function(innerFrameName) {
  const innerFrameNameEscaped = googString.htmlEscape(innerFrameName);
  return uncheckedconversions
      .safeHtmlFromStringKnownToSatisfyTypeContract(
          Const.from(
              'Short HTML snippet, input escaped, safe URL, for performance'),
          '<head><base href="' +
              googString.htmlEscape(/** @type {string} */ (document.baseURI)) +
              '"></head>' +
              '<body><iframe id="' + innerFrameNameEscaped + '" name="' +
              innerFrameNameEscaped + '"></iframe>');
};


/**
 * Handles the load event of the iframe for IE, determines if the request was
 * successful or not, handles clean up and dispatching of appropriate events.
 * @param {BrowserEvent} e The browser event.
 * @private
 */
IframeIo.prototype.onIeReadyStateChange_ = function(e) {
  if (this.iframe_.readyState == 'complete') {
    events.unlisten(
        this.iframe_, EventType.READYSTATECHANGE,
        this.onIeReadyStateChange_, false, this);
    let doc;

    try {
      doc = googDom.getFrameContentDocument(this.iframe_);

      // IE serves about:blank when it cannot load the resource while offline.
      if (userAgent.IE && doc.location == 'about:blank' &&
          !navigator.onLine) {
        this.handleError_(ErrorCode.OFFLINE);
        return;
      }
    } catch (ex) {
      this.handleError_(ErrorCode.ACCESS_DENIED);
      return;
    }
    this.handleLoad_(/** @type {!HTMLDocument} */ (doc));
  }
};


/**
 * Handles the load event of the iframe for non-IE browsers.
 * @param {BrowserEvent} e The browser event.
 * @private
 */
IframeIo.prototype.onIframeLoaded_ = function(e) {
  events.unlisten(
      this.getRequestIframe(), EventType.LOAD, this.onIframeLoaded_,
      false, this);
  try {
    this.handleLoad_(this.getContentDocument_());
  } catch (ex) {
    this.handleError_(ErrorCode.ACCESS_DENIED);
  }
};


/**
 * Handles generic post-load
 * @param {HTMLDocument} contentDocument The frame's document.
 * @private
 */
IframeIo.prototype.handleLoad_ = function(contentDocument) {
  googLog.fine(this.logger_, 'Iframe loaded');

  this.complete_ = true;
  this.active_ = false;

  let errorCode;

  // Try to get the innerHTML.  If this fails then it can be an access denied
  // error or the document may just not have a body, typical case is if there
  // is an IE's default 404.

  try {
    const body = contentDocument.body;
    this.lastContent_ = body.textContent || body.innerText;
    this.lastContentHtml_ = body.innerHTML;
  } catch (ex) {
    errorCode = ErrorCode.ACCESS_DENIED;
  }

  // Use a callback function, defined by the application, to analyse the
  // contentDocument and determine if it is an error page.  Applications
  // may send down markers in the document, define JS vars, or some other test.
  let customError;
  if (!errorCode && typeof this.errorChecker_ == 'function') {
    customError = this.errorChecker_(contentDocument);
    if (customError) {
      errorCode = ErrorCode.CUSTOM_ERROR;
    }
  }

  googLog.log(
      this.logger_, googLog.Level.FINER, 'Last content: ' + this.lastContent_);
  googLog.log(
      this.logger_, googLog.Level.FINER, 'Last uri: ' + this.lastUri_);

  if (errorCode) {
    googLog.fine(this.logger_, 'Load event occurred but failed');
    this.handleError_(errorCode, customError);

  } else {
    googLog.fine(this.logger_, 'Load succeeded');
    this.success_ = true;
    this.lastErrorCode_ = ErrorCode.NO_ERROR;
    this.dispatchEvent(netEventType.COMPLETE);
    this.dispatchEvent(netEventType.SUCCESS);

    this.makeReady_();
  }
};


/**
 * Handles errors.
 * @param {ErrorCode} errorCode Error code.
 * @param {Object=} opt_customError If error is CUSTOM_ERROR, this is the
 *     client-provided custom error.
 * @private
 */
IframeIo.prototype.handleError_ = function(
    errorCode, opt_customError) {
  if (!this.errorHandled_) {
    this.success_ = false;
    this.active_ = false;
    this.complete_ = true;
    this.lastErrorCode_ = errorCode;
    if (errorCode == ErrorCode.CUSTOM_ERROR) {
      asserts.assert(opt_customError !== undefined);
      this.lastCustomError_ = opt_customError;
    }
    this.dispatchEvent(netEventType.COMPLETE);
    this.dispatchEvent(netEventType.ERROR);

    this.makeReady_();

    this.errorHandled_ = true;
  }
};


/**
 * Dispatches an event indicating that the IframeIo instance has received a data
 * packet via incremental loading.  The event object has a 'data' member.
 * @param {Object} data Data.
 * @private
 */
IframeIo.prototype.handleIncrementalData_ = function(data) {
  this.dispatchEvent(new IframeIo.IncrementalDataEvent(data));
};


/**
 * Finalizes the request, schedules the iframe for disposal, and maybe disposes
 * the form.
 * @private
 */
IframeIo.prototype.makeReady_ = function() {
  googLog.info(this.logger_, 'Ready for new requests');
  this.scheduleIframeDisposal_();
  this.disposeForm_();
  this.dispatchEvent(netEventType.READY);
};


/**
 * Creates an iframe to be used with a request.  We use a new iframe for each
 * request so that requests don't create history entries.
 * @private
 */
IframeIo.prototype.createIframe_ = function() {
  googLog.fine(this.logger_, 'Creating iframe');

  this.iframeName_ = this.name_ + '_' + (this.nextIframeId_++).toString(36);

  const dom = googDom.getDomHelper(this.form_);
  this.iframe_ = dom.createDom(
      TagName.IFRAME,
      {'name': this.iframeName_, 'id': this.iframeName_});

  const s = this.iframe_.style;
  s.visibility = 'hidden';
  s.width = s.height = '10px';
  // Chrome sometimes shows scrollbars when visibility is hidden, but not when
  // display is none.
  s.display = 'none';

  // There are reports that safari 2.0.3 has a bug where absolutely positioned
  // iframes can't have their src set.
  if (!userAgent.WEBKIT) {
    s.position = 'absolute';
    s.top = s.left = '-10px';
  } else {
    s.marginTop = s.marginLeft = '-10px';
  }
};


/**
 * Appends the Iframe to the document body.
 * @private
 */
IframeIo.prototype.appendIframe_ = function() {
  googDom.getDomHelper(this.form_)
      .getDocument()
      .body.appendChild(/** @type {!Node} */ (this.iframe_));
};


/**
 * Schedules an iframe for disposal, async.  We can't remove the iframes in the
 * same execution context as the response, otherwise some versions of Firefox
 * will not detect that the response has correctly finished and the loading bar
 * will stay active forever.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
IframeIo.prototype.scheduleIframeDisposal_ = function() {
  const iframe = this.iframe_;

  // There shouldn't be a case where the iframe is null and we get to this
  // stage, but the error reports in http://b/909448 indicate it is possible.
  if (iframe) {
    // NOTE(user): Stops Internet Explorer leaking the iframe object. This
    // shouldn't be needed, since the events have all been removed, which
    // should in theory clean up references.  Oh well...
    iframe.onreadystatechange = null;
    iframe.onload = null;
    iframe.onerror = null;

    this.iframesForDisposal_.push(iframe);
  }

  if (this.iframeDisposalTimer_) {
    Timer.clear(this.iframeDisposalTimer_);
    this.iframeDisposalTimer_ = null;
  }

  if (userAgent.GECKO) {
    // For FF and Presto Opera, we must dispose the iframe async,
    // but it doesn't need to be done as soon as possible.
    // We therefore schedule it for 2s out, so as not to
    // affect any other actions that may have been triggered by the request.
    this.iframeDisposalTimer_ = Timer.callOnce(
        this.disposeIframes_, IframeIo.IFRAME_DISPOSE_DELAY_MS, this);

  } else {
    // For non-Gecko browsers we dispose straight away.
    this.disposeIframes_();
  }

  // Nullify reference
  this.iframe_ = null;
  this.iframeName_ = null;
};


/**
 * Disposes any iframes.
 * @private
 */
IframeIo.prototype.disposeIframes_ = function() {
  if (this.iframeDisposalTimer_) {
    // Clear the timer
    Timer.clear(this.iframeDisposalTimer_);
    this.iframeDisposalTimer_ = null;
  }

  while (this.iframesForDisposal_.length != 0) {
    const iframe = this.iframesForDisposal_.pop();
    googLog.info(this.logger_, 'Disposing iframe');
    googDom.removeNode(iframe);
  }
};


/**
 * Removes all the child nodes from the static form so it can be reused again.
 * This should happen right after sending a request. Otherwise, there can be
 * issues when another iframe uses this form right after the first iframe.
 * @private
 */
IframeIo.prototype.clearForm_ = function() {
  if (this.form_ && this.form_ == IframeIo.form_) {
    googDom.removeChildren(this.form_);
  }
};


/**
 * Disposes of the Form.  Since IE6 leaks form nodes, this just cleans up the
 * DOM and nullifies the instances reference so the form can be used for another
 * request.
 * @private
 */
IframeIo.prototype.disposeForm_ = function() {
  this.clearForm_();
  this.form_ = null;
};


/**
 * @return {HTMLDocument} The appropriate content document.
 * @private
 */
IframeIo.prototype.getContentDocument_ = function() {
  if (this.iframe_) {
    return /** @type {!HTMLDocument} */ (googDom.getFrameContentDocument(this.getRequestIframe()));
  }
  return null;
};


/**
 * @return {?HTMLIFrameElement} The appropriate iframe to use for requests
 *     (created in sendForm_).
 */
IframeIo.prototype.getRequestIframe = function() {
  if (this.iframe_) {
    return /** @type {?HTMLIFrameElement} */ (googDom.getFrameContentDocument(this.iframe_)
            .getElementById(this.iframeName_ + IframeIo.INNER_FRAME_SUFFIX));
  }
  return null;
};


/**
 * Tests for a silent failure by firefox that can occur when the connection is
 * reset by the server or is made to an illegal URL.
 * @private
 */
IframeIo.prototype.testForFirefoxSilentError_ = function() {
  if (this.active_) {
    const doc = this.getContentDocument_();

    // This is a hack to test of the document has loaded with a page that
    // we can't access, such as a network error, that won't report onload
    // or onerror events.
    if (doc && !reflect.canAccessProperty(doc, 'documentUri')) {
      if (!this.ignoreResponse_) {
        events.unlisten(
            this.getRequestIframe(), EventType.LOAD,
            this.onIframeLoaded_, false, this);
      }

      if (navigator.onLine) {
        googLog.warning(this.logger_, 'Silent Firefox error detected');
        this.handleError_(ErrorCode.FF_SILENT_ERROR);
      } else {
        googLog.warning(
            this.logger_, 'Firefox is offline so report offline error ' +
                'instead of silent error');
        this.handleError_(ErrorCode.OFFLINE);
      }
      return;
    }
    this.firefoxSilentErrorTimeout_ =
        Timer.callOnce(this.testForFirefoxSilentError_, 250, this);
  }
};



/**
 * Class for representing incremental data events.
 * @param {Object} data The data associated with the event.
 * @extends {Event}
 * @constructor
 * @final
 */
IframeIo.IncrementalDataEvent = function(data) {
  Event.call(this, netEventType.INCREMENTAL_DATA);

  /**
   * The data associated with the event.
   * @type {Object}
   */
  this.data = data;
};
goog.inherits(IframeIo.IncrementalDataEvent, Event);



/**
 * Test-only exports.
 * @const
 */
IframeIo.TEST_ONLY = {
  getForm: IframeIo.getForm_,
};
