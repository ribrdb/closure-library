/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Development CSS Compiler runtime execution.
 */

import { DevCss } from './devcss.js';

(function() {
 const devCssInstance = new DevCss();
 devCssInstance.activateBrowserSpecificCssRules();
})();
