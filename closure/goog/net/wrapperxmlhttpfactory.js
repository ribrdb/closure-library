/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Implementation of XmlHttpFactory which allows construction from
 * simple factory methods.
 */

import { XhrLike } from './xhrlike.js';

import { XmlHttpFactory } from './xmlhttpfactory.js';



/**
 * An xhr factory subclass which can be constructed using two factory methods.
 * This exists partly to allow the preservation of goog.net.XmlHttp.setFactory()
 * with an unchanged signature.
 * @param {function():!XhrLike.OrNative} xhrFactory
 *     A function which returns a new XHR object.
 * @param {function():!Object} optionsFactory A function which returns the
 *     options associated with xhr objects from this factory.
 * @extends {XmlHttpFactory}
 * @constructor
 * @final
 */
export function WrapperXmlHttpFactory(xhrFactory, optionsFactory) {
 XmlHttpFactory.call(this);

 /**
   * XHR factory method.
   * @type {function() : !XhrLike.OrNative}
   * @private
   */
 this.xhrFactory_ = xhrFactory;

 /**
  * Options factory method.
  * @type {function() : !Object}
  * @private
  */
 this.optionsFactory_ = optionsFactory;
}
goog.inherits(WrapperXmlHttpFactory, XmlHttpFactory);


/** @override */
WrapperXmlHttpFactory.prototype.createInstance = function() {
 return this.xhrFactory_();
};


/** @override */
WrapperXmlHttpFactory.prototype.getOptions = function() {
 return this.optionsFactory_();
};
