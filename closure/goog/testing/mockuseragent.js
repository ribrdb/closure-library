/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview MockUserAgent overrides googUserAgent.getUserAgentString()
 *     depending on a specified configuration.
 */

goog.setTestOnly('goog.testing.MockUserAgent');

import { Disposable } from '../disposable/disposable.js';
import util from '../labs/useragent/util.js';
import { PropertyReplacer } from './propertyreplacer.js';
import * as googUserAgent from '../useragent/useragent.js';



/**
 * Class for unit testing code that uses googUserAgent.
 *
 * @extends {Disposable}
 * @constructor
 * @final
 */
export function MockUserAgent() {
 Disposable.call(this);

 /**
   * Property replacer used to mock out User-Agent functions.
   * @type {!PropertyReplacer}
   * @private
   */
 this.propertyReplacer_ = new PropertyReplacer();

 /**
   * The userAgent string used by googUserAgent.
   * @type {?string}
   * @private
   */
 this.userAgent_ = googUserAgent.getUserAgentString();

 /**
   * The navigator object used by googUserAgent
   * @type {?Navigator}
   * @private
   */
 this.navigator_ = googUserAgent.getNavigatorTyped();

 /**
   * The documentMode number used by googUserAgent
   * @type {number|undefined}
   * @private
   */
 this.documentMode_ = googUserAgent.DOCUMENT_MODE;
}
goog.inherits(MockUserAgent, Disposable);


/**
 * Whether this MockUserAgent has been installed.
 * @type {boolean}
 * @private
 */
MockUserAgent.prototype.installed_;


/**
 * Installs this MockUserAgent.
 */
MockUserAgent.prototype.install = function() {
 if (!this.installed_) {
   // Stub out user agent functions.
   this.propertyReplacer_.replace(
       googUserAgent, 'getUserAgentString',
       goog.bind(this.getUserAgentString, this));

   // Stub out navigator functions.
   this.propertyReplacer_.replace(
       googUserAgent, 'getNavigator', goog.bind(this.getNavigator, this));

   // Stub out navigator functions.
   this.propertyReplacer_.replace(
       googUserAgent, 'getNavigatorTyped',
       goog.bind(this.getNavigator, this));

   // Stub out documentMode functions.
   this.propertyReplacer_.replace(
       googUserAgent, 'getDocumentMode_',
       goog.bind(this.getDocumentMode, this));

   this.propertyReplacer_.replace(
       googUserAgent, 'DOCUMENT_MODE', this.getDocumentMode());

   this.installed_ = true;
 }
};


/**
 * @return {?string} The userAgent set in this class.
 */
MockUserAgent.prototype.getUserAgentString = function() {
 return this.userAgent_;
};


/**
 * @param {string} userAgent The desired userAgent string to use.
 */
MockUserAgent.prototype.setUserAgentString = function(userAgent) {
 this.userAgent_ = userAgent;
 // goog.labs.userAgent.util is a goog.module, so its properties can't be
 // stubbed. Use setUserAgent instead.
 util.setUserAgent(userAgent);
};


/**
 * @return {?Object} The Navigator set in this class.
 */
MockUserAgent.prototype.getNavigator = function() {
 return this.navigator_;
};


/**
 * @return {?Navigator} The Navigator set in this class.
 */
MockUserAgent.prototype.getNavigatorTyped = function() {
 return this.navigator_;
};

/**
 * @param {Object} navigator The desired Navigator object to use.
 */
MockUserAgent.prototype.setNavigator = function(navigator) {
 this.navigator_ = /** @type {?Navigator} */ (navigator);
};

/**
 * @return {number|undefined} The documentMode set in this class.
 */
MockUserAgent.prototype.getDocumentMode = function() {
 return this.documentMode_;
};

/**
 * @param {number} documentMode The desired documentMode to use.
 */
MockUserAgent.prototype.setDocumentMode = function(documentMode) {
 this.documentMode_ = documentMode;
 this.propertyReplacer_.set(googUserAgent, 'DOCUMENT_MODE', documentMode);
};

/**
 * Uninstalls the MockUserAgent.
 */
MockUserAgent.prototype.uninstall = function() {
 if (this.installed_) {
   this.propertyReplacer_.reset();
   util.setUserAgent(null);
   this.installed_ = false;
 }
};


/** @override */
MockUserAgent.prototype.disposeInternal = function() {
 this.uninstall();
 delete this.propertyReplacer_;
 delete this.navigator_;
 delete this.documentMode_;
 MockUserAgent.base(this, 'disposeInternal');
};
