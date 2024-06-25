/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides data persistence using IE userData mechanism.
 * UserData uses proprietary Element.addBehavior(), Element.load(),
 * Element.save(), and Element.XMLDocument() methods, see:
 * http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx.
 */


// TODO(user): We're trying to migrate all ES5 subclasses of Closure
// Library to ES6. In ES6 this cannot be referenced before super is called. This
// file has at least one this before a super call (in ES5) and cannot be
// automatically upgraded to ES6 as a result. Please fix this if you have a
// chance. Note: This can sometimes be caused by not calling the super
// constructor at all. You can run the conversion tool yourself to see what it
// does on this file: blaze run //javascript/refactoring/es6_classes:convert.

import * as asserts from '../../asserts/asserts.js';

import * as iter from '../../iter/iter.js';
import { Iterator } from '../../iter/iter.js';
import { ErrorCode } from './errorcode.js';
import { IterableMechanism } from './iterablemechanism.js';
import { Map } from '../../structs/map.js';
import * as userAgent from '../../useragent/useragent.js';



/**
 * Provides a storage mechanism using IE userData.
 *
 * @param {string} storageKey The key (store name) to store the data under.
 * @param {string=} opt_storageNodeId The ID of the associated HTML element,
 *     one will be created if not provided.
 * @constructor
 * @extends {IterableMechanism}
 * @final
 */
export function IEUserData(storageKey, opt_storageNodeId) {
  /**
   * The key to store the data under.
   *
   * @private {string}
   */
  this.storageKey_ = storageKey;

  /**
   * The document element used for storing data.
   *
   * @private {?Element}
   */
  this.storageNode_ = null;

  IEUserData.base(this, 'constructor');

  // Tested on IE6, IE7 and IE8. It seems that IE9 introduces some security
  // features which make persistent (loaded) node attributes invisible from
  // JavaScript.
  if (userAgent.IE && !userAgent.isDocumentModeOrHigher(9)) {
    if (!IEUserData.storageMap_) {
      IEUserData.storageMap_ = new Map();
    }
    this.storageNode_ = /** @type {Element} */ (
        IEUserData.storageMap_.get(storageKey));
    if (!this.storageNode_) {
      if (opt_storageNodeId) {
        this.storageNode_ = document.getElementById(opt_storageNodeId);
      } else {
        this.storageNode_ = document.createElement('userdata');
        // This is a special IE-only method letting us persist data.
        this.storageNode_['addBehavior']('#default#userData');
        document.body.appendChild(this.storageNode_);
      }
      IEUserData.storageMap_.set(
          storageKey, this.storageNode_);
    }


    try {
      // Availability check.
      this.loadNode_();
    } catch (e) {
      this.storageNode_ = null;
    }
  }
}
goog.inherits(
    IEUserData,
    IterableMechanism);


/**
 * Encoding map for characters which are not encoded by encodeURIComponent().
 * See encodeKey_ documentation for encoding details.
 *
 * @type {!Object}
 * @const
 */
IEUserData.ENCODE_MAP = {
  '.': '.2E',
  '!': '.21',
  '~': '.7E',
  '*': '.2A',
  '\'': '.27',
  '(': '.28',
  ')': '.29',
  '%': '.'
};


/**
 * Global storageKey to storageNode map, so we save on reloading the storage.
 *
 * @type {?Map}
 * @private
 */
IEUserData.storageMap_ = null;


/**
 * Encodes anything other than [-a-zA-Z0-9_] using a dot followed by hex,
 * and prefixes with underscore to form a valid and safe HTML attribute name.
 *
 * We use URI encoding to do the initial heavy lifting, then escape the
 * remaining characters that we can't use. Since a valid attribute name can't
 * contain the percent sign (%), we use a dot (.) as an escape character.
 *
 * @param {string} key The key to be encoded.
 * @return {string} The encoded key.
 * @private
 */
IEUserData.encodeKey_ = function(key) {
  // encodeURIComponent leaves - _ . ! ~ * ' ( ) unencoded.
  return '_' + encodeURIComponent(key).replace(/[.!~*'()%]/g, function(c) {
    return IEUserData.ENCODE_MAP[c];
  });
};


/**
 * Decodes a dot-encoded and character-prefixed key.
 * See encodeKey_ documentation for encoding details.
 *
 * @param {string} key The key to be decoded.
 * @return {string} The decoded key.
 * @private
 */
IEUserData.decodeKey_ = function(key) {
  return decodeURIComponent(key.replace(/\./g, '%')).slice(1);
};


/**
 * Determines whether or not the mechanism is available.
 *
 * @return {boolean} True if the mechanism is available.
 */
IEUserData.prototype.isAvailable = function() {
  return !!this.storageNode_;
};


/** @override */
IEUserData.prototype.set = function(key, value) {
  this.storageNode_.setAttribute(
      IEUserData.encodeKey_(key), value);
  this.saveNode_();
};


/** @override */
IEUserData.prototype.get = function(key) {
  // According to Microsoft, values can be strings, numbers or booleans. Since
  // we only save strings, any other type is a storage error. If we returned
  // nulls for such keys, i.e., treated them as non-existent, this would lead
  // to a paradox where a key exists, but it does not when it is retrieved.
  // http://msdn.microsoft.com/en-us/library/ms531348(v=vs.85).aspx
  var value = this.storageNode_.getAttribute(
      IEUserData.encodeKey_(key));
  if (typeof value !== 'string' && value !== null) {
    throw ErrorCode.INVALID_VALUE;
  }
  return value;
};


/** @override */
IEUserData.prototype.remove = function(key) {
  this.storageNode_.removeAttribute(
      IEUserData.encodeKey_(key));
  this.saveNode_();
};


/** @override */
IEUserData.prototype.getCount = function() {
  return this.getNode_().attributes.length;
};


/** @override */
IEUserData.prototype.__iterator__ = function(opt_keys) {
  var i = 0;
  var attributes = this.getNode_().attributes;
  var newIter = new Iterator();
  /**
   * @return {!IIterableResult<string>}
   * @override
   */
  newIter.next = function() {
    if (i >= attributes.length) {
      return iter.ES6_ITERATOR_DONE;
    }
    var item = asserts.assert(attributes[i++]);
    if (opt_keys) {
      return iter.createEs6IteratorYield(
          IEUserData.decodeKey_(item.nodeName));
    }
    var value = item.nodeValue;
    // The value must exist and be a string, otherwise it is a storage error.
    if (typeof value !== 'string') {
      throw ErrorCode.INVALID_VALUE;
    }
    return iter.createEs6IteratorYield(value);
  };

  return newIter;
};


/** @override */
IEUserData.prototype.clear = function() {
  var node = this.getNode_();
  for (var left = node.attributes.length; left > 0; left--) {
    node.removeAttribute(node.attributes[left - 1].nodeName);
  }
  this.saveNode_();
};


/**
 * Loads the underlying storage node to the state we saved it to before.
 *
 * @private
 */
IEUserData.prototype.loadNode_ = function() {
  // This is a special IE-only method on Elements letting us persist data.
  this.storageNode_['load'](this.storageKey_);
};


/**
 * Saves the underlying storage node.
 *
 * @private
 */
IEUserData.prototype.saveNode_ = function() {
  try {
    // This is a special IE-only method on Elements letting us persist data.
    // Do not try to assign this.storageNode_['save'] to a variable, it does
    // not work. May throw an exception when the quota is exceeded.
    this.storageNode_['save'](this.storageKey_);
  } catch (e) {
    throw ErrorCode.QUOTA_EXCEEDED;
  }
};


/**
 * Returns the storage node.
 *
 * @return {!Element} Storage DOM Element.
 * @private
 */
IEUserData.prototype.getNode_ = function() {
  // This is a special IE-only property letting us browse persistent data.
  var doc = /** @type {Document} */ (this.storageNode_['XMLDocument']);
  return doc.documentElement;
};
