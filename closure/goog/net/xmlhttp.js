/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Low level handling of XMLHttpRequest.
 */

goog.declareModuleId('goog.net.xmlhttp');

import * as asserts from '../asserts/asserts.js';
import { WrapperXmlHttpFactory } from './wrapperxmlhttpfactory.js';
import { XmlHttpFactory } from './xmlhttpfactory.js';
const { XhrLike } = goog.requireType('goog.net.xhrlike');


/**
 * Static class for creating XMLHttpRequest objects.
 * @return {!XhrLike.OrNative} A new XMLHttpRequest object.
 */
export function XmlHttp() {
 return XmlHttp.factory_.createInstance();
}


/**
 * @define {boolean} Whether to assume XMLHttpRequest exists. Setting this to
 *     true bypasses the ActiveX probing code.
 * NOTE(ruilopes): Due to the way JSCompiler works, this define *will not* strip
 * out the ActiveX probing code from binaries.  To achieve this, use
 * `XmlHttpDefines.ASSUME_NATIVE_XHR` instead.
 * TODO(ruilopes): Collapse both defines.
 */
XmlHttp.ASSUME_NATIVE_XHR =
    goog.define('goog.net.XmlHttp.ASSUME_NATIVE_XHR', false);


/** @const */
export var XmlHttpDefines = {};


/**
 * @define {boolean} Whether to assume XMLHttpRequest exists. Setting this to
 *     true eliminates the ActiveX probing code.
 */
XmlHttpDefines.ASSUME_NATIVE_XHR =
    goog.define('goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR', false);


/**
 * Gets the options to use with the XMLHttpRequest objects obtained using
 * the static methods.
 * @return {Object} The options.
 */
XmlHttp.getOptions = function() {
 return XmlHttp.factory_.getOptions();
};


/**
 * Type of options that an XmlHttp object can have.
 * @enum {number}
 */
XmlHttp.OptionType = {
  /**
   * Whether a no-op function should be used to clear the onreadystatechange
   * handler instead of null.
   */
  USE_NULL_FUNCTION: 0,

  /**
   * NOTE(user): In IE if send() errors on a *local* request the readystate
   * is still changed to COMPLETE.  We need to ignore it and allow the
   * try/catch around send() to pick up the error.
   */
  LOCAL_REQUEST_ERROR: 1,
};


/**
 * Status constants for XMLHTTP, matches:
 * https://msdn.microsoft.com/en-us/library/ms534361(v=vs.85).aspx
 * @enum {number}
 */
XmlHttp.ReadyState = {
  /**
   * Constant for when xmlhttprequest.readyState is uninitialized
   */
  UNINITIALIZED: 0,

  /**
   * Constant for when xmlhttprequest.readyState is loading.
   */
  LOADING: 1,

  /**
   * Constant for when xmlhttprequest.readyState is loaded.
   */
  LOADED: 2,

  /**
   * Constant for when xmlhttprequest.readyState is in an interactive state.
   */
  INTERACTIVE: 3,

  /**
   * Constant for when xmlhttprequest.readyState is completed
   */
  COMPLETE: 4,
};


/**
 * The global factory instance for creating XMLHttpRequest objects.
 * @type {XmlHttpFactory}
 * @private
 */
XmlHttp.factory_;


/**
 * Sets the factories for creating XMLHttpRequest objects and their options.
 * @param {Function} factory The factory for XMLHttpRequest objects.
 * @param {Function} optionsFactory The factory for options.
 * @deprecated Use setGlobalFactory instead.
 */
XmlHttp.setFactory = function(factory, optionsFactory) {
 XmlHttp.setGlobalFactory(new WrapperXmlHttpFactory(
     asserts.assert(factory), asserts.assert(optionsFactory)));
};


/**
 * Sets the global factory object.
 * @param {!XmlHttpFactory} factory New global factory object.
 */
XmlHttp.setGlobalFactory = function(factory) {
 XmlHttp.factory_ = factory;
};



/**
 * Default factory to use when creating xhr objects.  You probably shouldn't be
 * instantiating this directly, but rather using it via XmlHttp.
 * @extends {XmlHttpFactory}
 * @constructor
 */
export function DefaultXmlHttpFactory() {
 XmlHttpFactory.call(this);
}
goog.inherits(DefaultXmlHttpFactory, XmlHttpFactory);


/** @override */
DefaultXmlHttpFactory.prototype.createInstance = function() {
 const progId = this.getProgId_();
 if (progId) {
   return new ActiveXObject(progId);
 } else {
   return new XMLHttpRequest();
 }
};


/** @override */
DefaultXmlHttpFactory.prototype.internalGetOptions = function() {
 const progId = this.getProgId_();
 const options = {};
 if (progId) {
   options[XmlHttp.OptionType.USE_NULL_FUNCTION] = true;
   options[XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = true;
 }
 return options;
};


/**
 * The ActiveX PROG ID string to use to create xhr's in IE. Lazily initialized.
 * @type {string|undefined}
 * @private
 */
DefaultXmlHttpFactory.prototype.ieProgId_;


/**
 * Initialize the private state used by other functions.
 * @return {string} The ActiveX PROG ID string to use to create xhr's in IE.
 * @private
 */
DefaultXmlHttpFactory.prototype.getProgId_ = function() {
 if (XmlHttp.ASSUME_NATIVE_XHR ||
     XmlHttpDefines.ASSUME_NATIVE_XHR) {
   return '';
 }

 // The following blog post describes what PROG IDs to use to create the
 // XMLHTTP object in Internet Explorer:
 // http://blogs.msdn.com/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
 // However we do not (yet) fully trust that this will be OK for old versions
 // of IE on Win9x so we therefore keep the last 2.
 if (!this.ieProgId_ && typeof XMLHttpRequest == 'undefined' &&
     typeof ActiveXObject != 'undefined') {
   // Candidate Active X types.
   const ACTIVE_X_IDENTS = [
     'MSXML2.XMLHTTP.6.0',
     'MSXML2.XMLHTTP.3.0',
     'MSXML2.XMLHTTP',
     'Microsoft.XMLHTTP',
   ];
   for (let i = 0; i < ACTIVE_X_IDENTS.length; i++) {
     const candidate = ACTIVE_X_IDENTS[i];

     try {
       new ActiveXObject(candidate);
       // NOTE(user): cannot assign progid and return candidate in one line
       // because JSCompiler complaings: BUG 658126
       this.ieProgId_ = candidate;
       return candidate;
     } catch (e) {
       // do nothing; try next choice
     }
   }

   // couldn't find any matches
   throw new Error(
       'Could not create ActiveXObject. ActiveX might be disabled,' +
       ' or MSXML might not be installed');
 }

 return /** @type {string} */ (this.ieProgId_);
};


// Set the global factory to an instance of the default factory.
XmlHttp.setGlobalFactory(new DefaultXmlHttpFactory());
