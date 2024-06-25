/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides access to high-entropy user agent values.
 */

import { HighEntropyValue } from './highentropyvalue.js';

/**
 * @type {!HighEntropyValue<!Array<!NavigatorUABrandVersion>|undefined>}
 */
const fullVersionList = new HighEntropyValue('fullVersionList');
export { fullVersionList };

/**
 * @type {!HighEntropyValue<string>}
 */
const platformVersion = new HighEntropyValue('platformVersion');
export { platformVersion };