/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class for managing the interactions between a rich autocomplete
 * object and a text-input or textarea.
 */

import { InputHandler } from './inputhandler.js';



/**
 * Class for managing the interaction between an autocomplete object and a
 * text-input or textarea.
 * @param {?string=} opt_separators Seperators to split multiple entries.
 * @param {?string=} opt_literals Characters used to delimit text literals.
 * @param {?boolean=} opt_multi Whether to allow multiple entries
 *     (Default: true).
 * @param {?number=} opt_throttleTime Number of milliseconds to throttle
 *     keyevents with (Default: 150).
 * @constructor
 * @extends {InputHandler}
 */
export function RichInputHandler(opt_separators, opt_literals, opt_multi, opt_throttleTime) {
 InputHandler.call(
     this, opt_separators, opt_literals, opt_multi, opt_throttleTime);
}
goog.inherits(RichInputHandler, InputHandler);


/**
 * Selects the given rich row.  The row's select(target) method is called.
 * @param {Object} row The row to select.
 * @return {boolean} Whether to suppress the update event.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
RichInputHandler.prototype.selectRow = function(row) {
 var suppressUpdate =
     RichInputHandler.superClass_.selectRow.call(this, row);
 row.select(this.ac_.getTarget());
 return suppressUpdate;
};
