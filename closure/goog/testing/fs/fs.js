/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock implementations of the Closure HTML5 FileSystem wrapper
 * classes. These implementations are designed to be usable in any browser, so
 * they use none of the native FileSystem-related objects.
 */

goog.setTestOnly('goog.testing.fs');

import { Timer } from '../../timer/timer.js';
import { Deferred } from '../../../../third_party/closure/goog/mochikit/async/deferred.js';

/** used in mocking */
import * as googFs from '../../fs/fs.js';
import * as googFsBlob from '../../fs/blob.js';

/** used in mocking */
import * as googFsUrl from '../../fs/url.js';

import { PropertyReplacer } from '../propertyreplacer.js';
import { Blob } from './blob.js';
import { FileSystem } from './filesystem.js';


/**
 * Get a filesystem object. Since these are mocks, there's no difference between
 * temporary and persistent filesystems.
 *
 * @param {number} size Ignored.
 * @return {!Deferred} The deferred
 *     {@link FileSystem}.
 */
export function getTemporary(size) {
 const d = new Deferred();
 Timer.callOnce(
     goog.bind(d.callback, d, new FileSystem()));
 return d;
}


/**
 * Get a filesystem object. Since these are mocks, there's no difference between
 * temporary and persistent filesystems.
 *
 * @param {number} size Ignored.
 * @return {!Deferred} The deferred
 *     {@link FileSystem}.
 */
export function getPersistent(size) {
 return getTemporary(size);
}


/**
 * Which object URLs have been granted for fake blobs.
 * @type {!Object<boolean>}
 * @private
 */
var objectUrls_ = {};


/**
 * Create a fake object URL for a given fake blob. This can be used as a real
 * URL, and it can be created and revoked normally.
 *
 * @param {!Blob} blob The blob for which to create the URL.
 * @return {string} The URL.
 */
export function createObjectUrl(blob) {
 const url = blob.toDataUrl();
 objectUrls_[url] = true;
 return url;
}


/**
 * Remove a URL that was created for a fake blob.
 *
 * @param {string} url The URL to revoke.
 */
export function revokeObjectUrl(url) {
 delete objectUrls_[url];
}


/**
 * Return whether or not a URL has been granted for the given blob.
 *
 * @param {!Blob} blob The blob to check.
 * @return {boolean} Whether a URL has been granted.
 */
export function isObjectUrlGranted(blob) {
 return (blob.toDataUrl()) in objectUrls_;
}


/**
 * Concatenates one or more values together and converts them to a fake blob.
 *
 * @param {...(string|!Blob)} var_args The values that will make
 *     up the resulting blob.
 * @return {!Blob} The blob.
 */
export function getBlob(var_args) {
 return new Blob(
     Array.prototype.map.call(arguments, String).join(''));
}


/**
 * Creates a blob with the given properties.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Blob for more details.
 *
 * @param {Array<string|!Blob>} parts
 *     The values that will make up the resulting blob.
 * @param {string=} opt_type The MIME type of the Blob.
 * @param {string=} opt_endings Specifies how strings containing newlines are to
 *     be written out.
 * @return {!Blob} The blob.
 */
export function getBlobWithProperties(parts, opt_type, opt_endings) {
 return new Blob(parts.map(String).join(''), opt_type);
}


/**
 * Slices the blob. The returned blob contains data from the start byte
 * (inclusive) till the end byte (exclusive). Negative indices can be used
 * to count bytes from the end of the blob (-1 == blob.size - 1). Indices
 * are always clamped to blob range. If end is omitted, all the data till
 * the end of the blob is taken.
 *
 * @param {!Blob} testBlob The blob to slice.
 * @param {number} start Index of the starting byte.
 * @param {number=} opt_end Index of the ending byte.
 * @return {!Blob} The new blob or null if not supported.
 */
export function sliceBlob(testBlob, start, opt_end) {
 return testBlob.slice(start, opt_end);
}


/**
 * Installs goog.testing.fs in place of the standard googFs. After calling
 * this, code that uses googFs should work without issue using 
 *
 * @param {!PropertyReplacer} stubs The property replacer for
 *     stubbing out the original googFs functions.
 */
export function install(stubs) {
 // Prevent warnings that goog.fs may get optimized away. It's true this is
 // unsafe in compiled code, but it's only meant for tests.
 const fs = googFs;
 const fsUrl = googFsUrl;
 stubs.replace(fs, 'getTemporary', getTemporary);
 stubs.replace(fs, 'getPersistent', getPersistent);
 stubs.replace(fsUrl, 'createObjectUrl', createObjectUrl);
 stubs.replace(fsUrl, 'revokeObjectUrl', revokeObjectUrl);
 stubs.replace(fsUrl, 'browserSupportsObjectUrls', function() {
  return true;
 });
 const fsBlob = googFsBlob;
 stubs.replace(fsBlob, 'getBlob', getBlob);
 stubs.replace(
     fsBlob, 'getBlobWithProperties', getBlobWithProperties);
}
