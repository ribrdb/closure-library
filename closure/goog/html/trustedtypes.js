/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Policy to convert strings to Trusted Types. See
 * https://github.com/WICG/trusted-types for details.
 */

POLICY_NAME = goog.define(
    'goog.html.trustedtypes.POLICY_NAME',
    goog.TRUSTED_TYPES_POLICY_NAME ? goog.TRUSTED_TYPES_POLICY_NAME + '#html' :
                                     '');


/**
 * Cached result of goog.createTrustedTypesPolicy.
 * @type {?TrustedTypePolicy|undefined}
 * @private
 */
var cachedPolicy_;


/**
 * Creates a (singleton) Trusted Type Policy for Safe HTML Types.
 * @return {?TrustedTypePolicy}
 * @package
 */
export function getPolicyPrivateDoNotAccessOrElse() {
 if (!POLICY_NAME) {
   // Binary not configured for Trusted Types.
   return null;
 }

 if (cachedPolicy_ === undefined) {
   cachedPolicy_ =
       goog.createTrustedTypesPolicy(POLICY_NAME);
 }

 return cachedPolicy_;
}
export var POLICY_NAME;
