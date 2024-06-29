/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides factory methods for selecting the best storage
 * mechanism, depending on availability and needs.
 */

import { HTML5LocalStorage } from './html5localstorage.js';

import { HTML5SessionStorage } from './html5sessionstorage.js';
import { IEUserData } from './ieuserdata.js';
import { PrefixedMechanism } from './prefixedmechanism.js';
const { IterableMechanism } = goog.requireType('goog.storage.mechanism.IterableMechanism');


/**
 * The key to shared userData storage.
 * @type {string}
 */
export var USER_DATA_SHARED_KEY = 'UserDataSharedStore';


/**
 * Returns the best local storage mechanism, or null if unavailable.
 * Local storage means that the database is placed on user's computer.
 * The key-value database is normally shared between all the code paths
 * that request it, so using an optional namespace is recommended. This
 * provides separation and makes key collisions unlikely.
 *
 * @param {string=} opt_namespace Restricts the visibility to given namespace.
 * @return {IterableMechanism} Created mechanism or null.
 */
export function create(opt_namespace) {
 return createHTML5LocalStorage(
            opt_namespace) ||
     createIEUserData(opt_namespace);
}


/**
 * Returns an HTML5 local storage mechanism, or null if unavailable.
 * Since the HTML5 local storage does not support namespaces natively,
 * and the key-value database is shared between all the code paths
 * that request it, it is recommended that an optional namespace is
 * used to provide key separation employing a prefix.
 *
 * @param {string=} opt_namespace Restricts the visibility to given namespace.
 * @return {IterableMechanism} Created mechanism or null.
 */
export function createHTML5LocalStorage(opt_namespace) {
 var storage = new HTML5LocalStorage();
 if (storage.isAvailable()) {
   return opt_namespace ?
       new PrefixedMechanism(storage, opt_namespace) :
       storage;
 }
 return null;
}


/**
 * Returns an HTML5 session storage mechanism, or null if unavailable.
 * Since the HTML5 session storage does not support namespaces natively,
 * and the key-value database is shared between all the code paths
 * that request it, it is recommended that an optional namespace is
 * used to provide key separation employing a prefix.
 *
 * @param {string=} opt_namespace Restricts the visibility to given namespace.
 * @return {IterableMechanism} Created mechanism or null.
 */
export function createHTML5SessionStorage(opt_namespace) {
 var storage = new HTML5SessionStorage();
 if (storage.isAvailable()) {
   return opt_namespace ?
       new PrefixedMechanism(storage, opt_namespace) :
       storage;
 }
 return null;
}


/**
 * Returns an IE userData local storage mechanism, or null if unavailable.
 * Using an optional namespace is recommended to provide separation and
 * avoid key collisions.
 *
 * @param {string=} opt_namespace Restricts the visibility to given namespace.
 * @return {IterableMechanism} Created mechanism or null.
 */
export function createIEUserData(opt_namespace) {
 var storage = new IEUserData(
     opt_namespace ||
     USER_DATA_SHARED_KEY);
 if (storage.isAvailable()) {
   return storage;
 }
 return null;
}
