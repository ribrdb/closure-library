/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview LooseMock of AbstractRange.
 */

goog.setTestOnly('goog.testing.MockRange');

import { AbstractRange } from '../dom/abstractrange.js';
import { SavedCaretRange } from '../dom/savedcaretrange.js';
import { LooseMock } from './loosemock.js';



/**
 * LooseMock of AbstractRange. Useful because the mock framework cannot
 * simply create a mock out of an abstract class, and cannot create a mock out
 * of classes that implements __iterator__ because it relies on the default
 * behavior of iterating through all of an object's properties.
 * @constructor
 * @extends {LooseMock}
 * @final
 */
export function MockRange() {
 LooseMock.call(this, MockRange.ConcreteRange_);
}
goog.inherits(MockRange, LooseMock);


// *** Private helper class ************************************************* //



/**
 * Concrete subclass of AbstractRange that simply sets the abstract
 * method __iterator__ to undefined so that javascript defaults to iterating
 * through all of the object's properties.
 * @constructor
 * @extends {AbstractRange}
 * @private
 */
MockRange.ConcreteRange_ = function() {
 AbstractRange.call(this);
};
goog.inherits(MockRange.ConcreteRange_, AbstractRange);


/**
 * Undefine the iterator so the mock framework can loop through this class'
 * properties.
 * @override
 */
MockRange.ConcreteRange_.prototype.__iterator__ =
    // This isn't really type-safe.
    /** @type {?} */ (undefined);

/** @override */
MockRange.ConcreteRange_.prototype.saveUsingCarets = function() {
 return (this.getStartNode() && this.getEndNode()) ?
     new SavedCaretRange(this) :
     null;
};
