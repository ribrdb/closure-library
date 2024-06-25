goog.declareModuleId('goog.testing.fs.file');
/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock file object.
 */

goog.setTestOnly('goog.testing.fs.File');

import { Blob } from './blob.js';



/**
 * A mock file object.
 *
 * @param {string} name The name of the file.
 * @param {Date=} opt_lastModified The last modified date for this file. May be
 *     null if file modification dates are not supported.
 * @param {string=} opt_data The string data encapsulated by the blob.
 * @param {string=} opt_type The mime type of the blob.
 * @constructor
 * @extends {Blob}
 * @final
 */
export function File(name, opt_lastModified, opt_data, opt_type) {
 File.base(this, 'constructor', opt_data, opt_type);

 /**
  * @see http://www.w3.org/TR/FileAPI/#dfn-name
  * @type {string}
  */
 this.name = name;

 /**
  * @see http://www.w3.org/TR/FileAPI/#dfn-lastModifiedDate
  * @type {Date}
  */
 this.lastModifiedDate = opt_lastModified || null;
}
goog.inherits(File, Blob);
