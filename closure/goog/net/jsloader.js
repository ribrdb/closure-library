/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A utility to load JavaScript files via DOM script tags.
 * Refactored from goog.net.Jsonp. Works cross-domain.
 */

import * as array from '../array/array.js';

import { Deferred } from '../../../third_party/closure/goog/mochikit/async/deferred.js';
import { DebugError } from '../debug/error.js';
import * as dom from '../dom/dom.js';
import { DomHelper } from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as safe from '../dom/safe.js';
import { TrustedResourceUrl } from '../html/trustedresourceurl.js';
import object from '../object/object.js';


/**
 * The name of the property of goog.global under which the JavaScript
 * verification object is stored by the loaded script.
 * @private {string}
 */
var GLOBAL_VERIFY_OBJS_ = 'closure_verification';


/**
 * The default length of time, in milliseconds, we are prepared to wait for a
 * load request to complete.
 * @type {number}
 */
export var DEFAULT_TIMEOUT = 5000;


/**
 * Optional parameters for send.
 * timeout: The length of time, in milliseconds, we are prepared to wait
 *     for a load request to complete, or 0 or negative for no timeout. Default
 *     is 5 seconds.
 * document: The HTML document under which to load the JavaScript. Default is
 *     the current document.
 * cleanupWhenDone: If true clean up the script tag after script completes to
 *     load. This is important if you just want to read data from the JavaScript
 *     and then throw it away. Default is false.
 * attributes: Additional attributes to set on the script tag.
 *
 * @typedef {{
 *   timeout: (number|undefined),
 *   document: (HTMLDocument|undefined),
 *   cleanupWhenDone: (boolean|undefined),
 *   attributes: (!Object<string, string>|undefined)
 * }}
 */
export var Options;


/**
 * Scripts (URIs) waiting to be loaded.
 * @private {!Array<!TrustedResourceUrl>}
 */
var scriptsToLoad_ = [];


/**
 * The deferred result of loading the URIs in scriptsToLoad_.
 * We need to return this to a caller that wants to load URIs while
 * a deferred is already working on them.
 * @private {!Deferred<null>}
 */
var scriptLoadingDeferred_;



/**
 * Loads and evaluates the JavaScript files at the specified URIs, guaranteeing
 * the order of script loads.
 *
 * Because we have to load the scripts in serial (load script 1, exec script 1,
 * load script 2, exec script 2, and so on), this will be slower than doing
 * the network fetches in parallel.
 *
 * If you need to load a large number of scripts but dependency order doesn't
 * matter, you should just call safeLoad N times.
 *
 * If you need to load a large number of scripts on the same domain,
 * you may want to use goog.module.ModuleLoader.
 *
 * @param {Array<!TrustedResourceUrl>} trustedUris The URIs to load.
 * @param {Options=} opt_options Optional parameters. See
 *     options documentation for details.
 * @return {!Deferred} The deferred result, that may be used to add
 *     callbacks
 */
export function safeLoadMany(trustedUris, opt_options) {
  // Loading the scripts in serial introduces asynchronosity into the flow.
  // Therefore, there are race conditions where client A can kick off the load
  // sequence for client B, even though client A's scripts haven't all been
  // loaded yet.
  //
  // To work around this issue, all module loads share a queue.
  if (!trustedUris.length) {
    return Deferred.succeed(null);
  }

  const isAnotherModuleLoading = scriptsToLoad_.length;
  array.extend(scriptsToLoad_, trustedUris);
  if (isAnotherModuleLoading) {
    // jsloader is still loading some other scripts.
    // In order to prevent the race condition noted above, we just add
    // these URIs to the end of the scripts' queue and return the deferred
    // result of the ongoing script load, so the caller knows when they
    // finish loading.
    return scriptLoadingDeferred_;
  }

  trustedUris = scriptsToLoad_;
  const popAndLoadNextScript = function() {
    const trustedUri = trustedUris.shift();
    const deferred = safeLoad(trustedUri, opt_options);
    if (trustedUris.length) {
      deferred.addBoth(popAndLoadNextScript);
    }
    return deferred;
  };
  scriptLoadingDeferred_ = popAndLoadNextScript();
  return scriptLoadingDeferred_;
}


/**
 * Loads and evaluates a JavaScript file.
 * When the script loads, a user callback is called.
 * It is the client's responsibility to verify that the script ran successfully.
 *
 * @param {!TrustedResourceUrl} trustedUri The URI of the JavaScript.
 * @param {Options=} opt_options Optional parameters. See
 *     Options documentation for details.
 * @return {!Deferred} The deferred result, that may be used to add
 *     callbacks and/or cancel the transmission.
 *     The error callback will be called with a single Error
 *     parameter.
 */
export function safeLoad(trustedUri, opt_options) {
  const options = opt_options || /** @type {!Options} */ ({});
  const doc = options.document || document;
  const uri = TrustedResourceUrl.unwrap(trustedUri);

  const script =
      new DomHelper(doc).createElement(TagName.SCRIPT);
  const request = {script_: script, timeout_: undefined};
  const deferred = new Deferred(cancel_, request);

  // Set a timeout.
  let timeout = null;
  const timeoutDuration = (options.timeout != null) ?
      options.timeout :
      DEFAULT_TIMEOUT;
  if (timeoutDuration > 0) {
    timeout = window.setTimeout(function() {
      cleanup_(script, true);
      deferred.errback(
          new Error(
              ErrorCode.TIMEOUT,
              'Timeout reached for loading script ' + uri));
    }, timeoutDuration);
    request.timeout_ = timeout;
  }

  // Hang the user callback to be called when the script completes to load.
  // NOTE(user): This callback will be called in IE even upon error. In any
  // case it is the client's responsibility to verify that the script ran
  // successfully.
  script.onload = script.onreadystatechange = function() {
    if (!script.readyState || script.readyState == 'loaded' ||
        script.readyState == 'complete') {
      const removeScriptNode = options.cleanupWhenDone || false;
      cleanup_(script, removeScriptNode, timeout);
      deferred.callback(null);
    }
  };

  // Add an error callback.
  // NOTE(user): Not supported in IE.
  script.onerror = function() {
    cleanup_(script, true, timeout);
    deferred.errback(
        new Error(
            ErrorCode.LOAD_ERROR,
            'Error while loading script ' + uri));
  };

  const properties = options.attributes || {};
  object.extend(
      properties, {'type': 'text/javascript', 'charset': 'UTF-8'});
  dom.setProperties(script, properties);
  // NOTE(user): Safari never loads the script if we don't set the src
  // attribute before appending.
  safe.setScriptSrc(script, trustedUri);
  const scriptParent = getScriptParentElement_(doc);
  scriptParent.appendChild(script);

  return deferred;
}


/**
 * Loads a JavaScript file and verifies it was evaluated successfully, using a
 * verification object.
 * The verification object is set by the loaded JavaScript at the end of the
 * script.
 * We verify this object was set and return its value in the success callback.
 * If the object is not defined we trigger an error callback.
 *
 * @param {!TrustedResourceUrl} trustedUri The URI of the JavaScript.
 * @param {string} verificationObjName The name of the verification object that
 *     the loaded script should set.
 * @param {Options} options Optional parameters. See
 *     Options documentation for details.
 * @return {!Deferred} The deferred result, that may be used to add
 *     callbacks and/or cancel the transmission.
 *     The success callback will be called with a single parameter containing
 *     the value of the verification object.
 *     The error callback will be called with a single Error
 *     parameter.
 */
export function safeLoadAndVerify(trustedUri, verificationObjName, options) {
  // Define the global objects variable.
  if (!goog.global[GLOBAL_VERIFY_OBJS_]) {
    goog.global[GLOBAL_VERIFY_OBJS_] = {};
  }
  const verifyObjs = goog.global[GLOBAL_VERIFY_OBJS_];
  const uri = TrustedResourceUrl.unwrap(trustedUri);

  // Verify that the expected object does not exist yet.
  if (verifyObjs[verificationObjName] !== undefined) {
    // TODO(user): Error or reset variable?
    return Deferred.fail(
        new Error(
            ErrorCode.VERIFY_OBJECT_ALREADY_EXISTS,
            'Verification object ' + verificationObjName +
                ' already defined.'));
  }

  // Send request to load the JavaScript.
  const sendDeferred = safeLoad(trustedUri, options);

  // Create a deferred object wrapping the send result.
  const deferred =
      new Deferred(goog.bind(sendDeferred.cancel, sendDeferred));

  // Call user back with object that was set by the script.
  sendDeferred.addCallback(function() {
    const result = verifyObjs[verificationObjName];
    if (result !== undefined) {
      deferred.callback(result);
      delete verifyObjs[verificationObjName];
    } else {
      // Error: script was not loaded properly.
      deferred.errback(
          new Error(
              ErrorCode.VERIFY_ERROR, 'Script ' + uri +
                  ' loaded, but verification object ' + verificationObjName +
                  ' was not defined.'));
    }
  });

  // Pass error to new deferred object.
  sendDeferred.addErrback(function(error) {
    if (verifyObjs[verificationObjName] !== undefined) {
      delete verifyObjs[verificationObjName];
    }
    deferred.errback(error);
  });

  return deferred;
}


/**
 * Gets the DOM element under which we should add new script elements.
 * How? Take the first head element, and if not found take doc.documentElement,
 * which always exists.
 *
 * @param {!HTMLDocument} doc The relevant document.
 * @return {!Element} The script parent element.
 * @private
 */
function getScriptParentElement_(doc) {
  const headElements =
      dom.getElementsByTagName(TagName.HEAD, doc);
  if (!headElements || headElements.length === 0) {
    return doc.documentElement;
  } else {
    return headElements[0];
  }
}


/**
 * Cancels a given request.
 * @this {{script_: Element, timeout_: number}} The request context.
 * @private
 */
function cancel_() {
  const request = this;
  if (request && request.script_) {
    const scriptNode = request.script_;
    if (scriptNode && scriptNode.tagName == TagName.SCRIPT) {
      cleanup_(scriptNode, true, request.timeout_);
    }
  }
}


/**
 * Removes the script node and the timeout.
 * @param {Node} scriptNode The node to be cleaned up.
 * @param {boolean} removeScriptNode If true completely remove the script node.
 * @param {?number=} opt_timeout The timeout handler to cleanup.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
function cleanup_(scriptNode, removeScriptNode, opt_timeout) {
  if (opt_timeout != null) {
    goog.global.clearTimeout(opt_timeout);
  }

  scriptNode.onload = () => {};
  scriptNode.onerror = () => {};
  scriptNode.onreadystatechange = () => {};

  // Do this after a delay (removing the script node of a running script can
  // confuse older IEs).
  if (removeScriptNode) {
    window.setTimeout(function() {
      dom.removeNode(scriptNode);
    }, 0);
  }
}


/**
 * Possible error codes for jsloader.
 * @enum {number}
 */
export var ErrorCode = {
  LOAD_ERROR: 0,
  TIMEOUT: 1,
  VERIFY_ERROR: 2,
  VERIFY_OBJECT_ALREADY_EXISTS: 3,
};



/**
 * A jsloader error.
 *
 * @param {ErrorCode} code The error code.
 * @param {string=} opt_message Additional message.
 * @constructor
 * @extends {DebugError}
 * @final
 */
export function Error(code, opt_message) {
  let msg = 'Jsloader error (code #' + code + ')';
  if (opt_message) {
    msg += ': ' + opt_message;
  }
  Error.base(this, 'constructor', msg);

  /**
     * The code for this error.
     *
     * @type {ErrorCode}
     */
  this.code = code;
}
goog.inherits(Error, DebugError);
