/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A generic interface for saving and restoring ranges.
 */


goog.declareModuleId('goog.dom.savedrange');

import { Disposable } from '../disposable/disposable.js';
import * as log from '../log/log.js';
const { AbstractRange } = goog.requireType('goog.dom.abstractrange');



/**
 * Abstract interface for a saved range.
 * // TODO(user): rename to AbstractSavedRange?
 * @constructor
 * @extends {Disposable}
 * @abstract
 */
export function SavedRange() {
 Disposable.call(this);
}
goog.inherits(SavedRange, Disposable);


/**
 * Logging object.
 * @type {log.Logger}
 * @private
 */
SavedRange.logger_ = log.getLogger('goog.dom.SavedRange');


/**
 * Restores the range and by default disposes of the saved copy.  Take note:
 * this means the by default SavedRange objects are single use objects.
 * @param {boolean=} opt_stayAlive Whether this SavedRange should stay alive
 *     (not be disposed) after restoring the range. Defaults to false (dispose).
 * @return {AbstractRange} The restored range.
 */
SavedRange.prototype.restore = function(opt_stayAlive) {
 if (this.isDisposed()) {
   log.error(
       SavedRange.logger_,
       'Disposed SavedRange objects cannot be restored.');
 }

 var range = this.restoreInternal();
 if (!opt_stayAlive) {
   this.dispose();
 }
 return range;
};

/**
 * Internal method to restore the saved range.
 * @return {AbstractRange} The restored range.
 * @protected
 */
SavedRange.prototype.restoreInternal = goog.abstractMethod;

/**
 * Abstract interface for a range saved using carets.
 * @constructor
 * @extends {SavedRange}
 * @abstract
 */
export function AbstractSavedCaretRange() {
 SavedRange.call(this);
}
goog.inherits(AbstractSavedCaretRange, SavedRange);

/**
 * Gets the range that this SavedCaretRage represents, without selecting it
 * or removing the carets from the DOM.
 * @return {AbstractRange?} An abstract range.
 */
AbstractSavedCaretRange.prototype.toAbstractRange =
    goog.abstractMethod;

/**
 * Gets carets.
 * @param {boolean} start If true, returns the start caret. Otherwise, get the
 *     end caret.
 * @return {?Element} The start or end caret in the given document.
 * @abstract
 */
AbstractSavedCaretRange.prototype.getCaret = function(start) {};

/**
 * Removes the carets from the current restoration document.
 * @param {!AbstractRange=} opt_range A range whose offsets have
 *     already been adjusted for caret removal; it will be adjusted if it is
 *     also affected by post-removal operations, such as text node
 *     normalization.
 * @return {?AbstractRange|undefined} The adjusted range, if opt_range
 *     was provided.
 * @abstract
 */
AbstractSavedCaretRange.prototype.removeCarets = function(
    opt_range) {};


/**
 * Sets the document where the range will be restored.
 * @param {!Document} doc An HTML document.
 * @abstract
 */
AbstractSavedCaretRange.prototype.setRestorationDocument = function(
    doc) {};
