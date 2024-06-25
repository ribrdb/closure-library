/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview File #1 of error module.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */

import { ModuleManager } from '../modulemanager.js';

ModuleManager.getInstance().beforeLoadModuleCode('errorMod');

throw new Error('errorMod should not load.');