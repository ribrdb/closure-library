/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Options for rendering matches.
 */

/**
 * A simple class that contains options for rendering a set of autocomplete
 * matches.  Used as an optional argument in the callback from the matcher.
 * @constructor
 */
export function RenderOptions() {};


/**
 * Whether the current highlighting is to be preserved when displaying the new
 * set of matches.
 * @type {boolean}
 * @private
 */
RenderOptions.prototype.preserveHilited_ = false;


/**
 * Whether the first match is to be highlighted.  When undefined the autoHilite
 * flag of the autocomplete is used.
 * @type {boolean|undefined}
 * @private
 */
RenderOptions.prototype.autoHilite_;


/**
 * @param {boolean} flag The new value for the preserveHilited_ flag.
 */
RenderOptions.prototype.setPreserveHilited = function(flag) {
 this.preserveHilited_ = flag;
};


/**
 * @return {boolean} The value of the preserveHilited_ flag.
 */
RenderOptions.prototype.getPreserveHilited = function() {
 return this.preserveHilited_;
};


/**
 * @param {boolean} flag The new value for the autoHilite_ flag.
 */
RenderOptions.prototype.setAutoHilite = function(flag) {
 this.autoHilite_ = flag;
};


/**
 * @return {boolean|undefined} The value of the autoHilite_ flag.
 */
RenderOptions.prototype.getAutoHilite = function() {
 return this.autoHilite_;
};
