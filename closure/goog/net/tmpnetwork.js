/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview tmpnetwork.js contains some temporary networking functions
 * for browserchannel which will be moved at a later date.
 */


/**
 * Namespace for BrowserChannel
 */
import { Uri } from '../uri/uri.js';

import { ChannelDebug } from './channeldebug.js';


/**
 * Default timeout to allow for google.com pings.
 * @type {number}
 */
export var GOOGLECOM_TIMEOUT = 10000;


/**
 * @define {string} url to use to test for internet connectivity.
 * Use protocol-relative URLs to avoid insecure content warnings in IE.
 */
export var TEST_URL = goog.define(
    'goog.net.tmpnetwork.TEST_URL', '//www.google.com/images/cleardot.gif');


/**
 * Pings the network to check if an error is a server error or user's network
 * error.
 *
 * @param {Function} callback The function to call back with results.
 * @param {Uri?=} opt_imageUri The URI of an image to use for the network
 *     test. You *must* provide an image URI; the default behavior is provided
 *     for compatibility with existing code, but the search team does not want
 *     people using images served off of google.com for this purpose. The
 *     default will go away when all usages have been changed.
 * @param {number=} opt_timeout Milliseconds before giving up.
 */
export function testGoogleCom(callback, opt_imageUri, opt_timeout) {
  // We need to add a 'rand' to make sure the response is not fulfilled
  // by browser cache.
  let uri = opt_imageUri;
  if (!uri) {
    uri = new Uri(TEST_URL);
    uri.makeUnique();
  }
  testLoadImage(
      uri.toString(), opt_timeout || GOOGLECOM_TIMEOUT,
      callback);
}


/**
 * Test loading the given image, retrying if necessary.
 * @param {string} url URL to the iamge.
 * @param {number} timeout Milliseconds before giving up.
 * @param {Function} callback Function to call with results.
 * @param {number} retries The number of times to retry.
 * @param {number=} opt_pauseBetweenRetriesMS Optional number of milliseconds
 *     between retries - defaults to 0.
 */
export function testLoadImageWithRetries(url, timeout, callback, retries, opt_pauseBetweenRetriesMS) {
  const channelDebug = new ChannelDebug();
  channelDebug.debug('TestLoadImageWithRetries: ' + opt_pauseBetweenRetriesMS);
  if (retries == 0) {
    // no more retries, give up
    callback(false);
    return;
  }

  const pauseBetweenRetries = opt_pauseBetweenRetriesMS || 0;
  retries--;
  testLoadImage(url, timeout, function(succeeded) {
    if (succeeded) {
      callback(true);
    } else {
      // try again
      goog.global.setTimeout(function() {
        testLoadImageWithRetries(
            url, timeout, callback, retries, pauseBetweenRetries);
      }, pauseBetweenRetries);
    }
  });
}


/**
 * Test loading the given image.
 * @param {string} url URL to the image.
 * @param {number} timeout Milliseconds before giving up.
 * @param {Function} callback Function to call with results.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
export function testLoadImage(url, timeout, callback) {
  const channelDebug = new ChannelDebug();
  channelDebug.debug('TestLoadImage: loading ' + url);
  const img = new Image();
  img.onload = function() {
    try {
      channelDebug.debug('TestLoadImage: loaded');
      clearImageCallbacks_(img);
      callback(true);
    } catch (e) {
      channelDebug.dumpException(e);
    }
  };
  img.onerror = function() {
    try {
      channelDebug.debug('TestLoadImage: error');
      clearImageCallbacks_(img);
      callback(false);
    } catch (e) {
      channelDebug.dumpException(e);
    }
  };
  img.onabort = function() {
    try {
      channelDebug.debug('TestLoadImage: abort');
      clearImageCallbacks_(img);
      callback(false);
    } catch (e) {
      channelDebug.dumpException(e);
    }
  };
  img.ontimeout = function() {
    try {
      channelDebug.debug('TestLoadImage: timeout');
      clearImageCallbacks_(img);
      callback(false);
    } catch (e) {
      channelDebug.dumpException(e);
    }
  };

  goog.global.setTimeout(function() {
    if (img.ontimeout) {
      img.ontimeout();
    }
  }, timeout);
  img.src = url;
}


/**
 * Clear handlers to avoid memory leaks.
 * @param {Image} img The image to clear handlers from.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
function clearImageCallbacks_(img) {
  // NOTE(user): Nullified individually to avoid compiler warnings
  // (BUG 658126)
  img.onload = null;
  img.onerror = null;
  img.onabort = null;
  img.ontimeout = null;
}
