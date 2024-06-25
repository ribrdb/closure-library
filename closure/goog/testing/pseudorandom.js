/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview PseudoRandom provides a mechanism for generating deterministic
 * pseudo random numbers based on a seed. Based on the Park-Miller algorithm.
 * See https://doi.org/10.1145%2F63039.63042 for details.
 */

goog.setTestOnly('goog.testing.PseudoRandom');

import { Disposable } from '../disposable/disposable.js';



/**
 * Class for unit testing code that uses Math.random. Generates deterministic
 * random numbers.
 *
 * @param {number=} opt_seed The seed to use.
 * @param {boolean=} opt_install Whether to install the PseudoRandom at
 *     construction time.
 * @extends {Disposable}
 * @constructor
 * @final
 */
export function PseudoRandom(opt_seed, opt_install) {
 Disposable.call(this);

 if (opt_seed === undefined) {
   opt_seed = PseudoRandom.seedUniquifier_++ + goog.now();
 }
 this.seed(opt_seed);

 if (opt_install) {
   this.install();
 }
}
goog.inherits(PseudoRandom, Disposable);


/**
 * Helps create a unique seed.
 * @type {number}
 * @private
 */
PseudoRandom.seedUniquifier_ = 0;


/**
 * Constant used as part of the algorithm.
 * @type {number}
 */
PseudoRandom.A = 48271;


/**
 * Constant used as part of the algorithm. 2^31 - 1.
 * @type {number}
 */
PseudoRandom.M = 2147483647;


/**
 * Constant used as part of the algorithm. It is equal to M / A.
 * @type {number}
 */
PseudoRandom.Q = 44488;


/**
 * Constant used as part of the algorithm. It is equal to M % A.
 * @type {number}
 */
PseudoRandom.R = 3399;


/**
 * Constant used as part of the algorithm to get values from range [0, 1).
 * @type {number}
 */
PseudoRandom.ONE_OVER_M_MINUS_ONE =
    1.0 / (PseudoRandom.M - 1);


/**
 * The seed of the random sequence and also the next returned value (before
 * normalization). Must be between 1 and M - 1 (inclusive).
 * @type {number}
 * @private
 */
PseudoRandom.prototype.seed_ = 1;


/**
 * Whether this PseudoRandom has been installed.
 * @type {boolean}
 * @private
 */
PseudoRandom.prototype.installed_;


/**
 * The original Math.random function.
 * @type {function(): number}
 * @private
 */
PseudoRandom.prototype.mathRandom_;


/**
 * Installs this PseudoRandom as the system number generator.
 */
PseudoRandom.prototype.install = function() {
 if (!this.installed_) {
   this.mathRandom_ = Math.random;
   Math.random = goog.bind(this.random, this);
   this.installed_ = true;
 }
};


/** @override */
PseudoRandom.prototype.disposeInternal = function() {
 PseudoRandom.superClass_.disposeInternal.call(this);
 this.uninstall();
};


/**
 * Uninstalls the PseudoRandom.
 */
PseudoRandom.prototype.uninstall = function() {
 if (this.installed_) {
   Math.random = this.mathRandom_;
   this.installed_ = false;
 }
};


/**
 * Seed the generator.
 *
 * @param {number=} opt_seed The seed to use.
 */
PseudoRandom.prototype.seed = function(opt_seed) {
 this.seed_ = (opt_seed || 0) % (PseudoRandom.M - 1);
 if (this.seed_ <= 0) {
   this.seed_ += PseudoRandom.M - 1;
 }
};


/**
 * @return {number} The next number in the sequence.
 */
PseudoRandom.prototype.random = function() {
 var hi = Math.floor(this.seed_ / PseudoRandom.Q);
 var lo = this.seed_ % PseudoRandom.Q;
 var test =
     PseudoRandom.A * lo - PseudoRandom.R * hi;
 if (test > 0) {
   this.seed_ = test;
 } else {
   this.seed_ = test + PseudoRandom.M;
 }
 return (this.seed_ - 1) * PseudoRandom.ONE_OVER_M_MINUS_ONE;
};
