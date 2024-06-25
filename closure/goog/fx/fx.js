/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Legacy stub for the goog.fx namespace.  Requires the moved
 * namespaces. Animation and easing have been moved to animation.js and
 * easing.js.  Users of this stub should move off so we may remove it in the
 * future.
 *
 * @suppress {extraRequire} All the requires in this file are "extra"
 * because this file is not actually using them.
 */

import * as asserts from '../asserts/asserts.js';

import {
 Animation,
 Animation as fxAnimation,
 Animation as googFxAnimation,
 AnimationEvent,
} from './animation.js';

import { Transition } from './transition.js';
import * as easing from './easing.js';
