/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { EventTarget as GoogEventTarget } from './eventtarget.js';
import eventTargetTester from './eventtargettester.js';
import { testSuite } from '../testing/testsuite.js';

const KeyType = eventTargetTester.KeyType;
const UnlistenReturnType = eventTargetTester.UnlistenReturnType;

testSuite(Object.assign(
    {
      setUp() {
        const newListenableFn = () => new GoogEventTarget();
        const listenFn = (src, type, listener, opt_capt, opt_handler) => {
          src.addEventListener(type, listener, opt_capt, opt_handler);
        };
        const unlistenFn = (src, type, listener, opt_capt, opt_handler) => {
          src.removeEventListener(type, listener, opt_capt, opt_handler);
        };
        const dispatchEventFn = (src, e) => src.dispatchEvent(e);

        eventTargetTester.setUp(
            newListenableFn, listenFn, unlistenFn, null /* unlistenByKeyFn */,
            null /* listenOnceFn */, dispatchEventFn, null /* removeAllFn */,
            null /* getListenersFn */, null /* getListenerFn */,
            null /* hasListenerFn */, KeyType.UNDEFINED,
            UnlistenReturnType.UNDEFINED, true);
      },

      tearDown() {
        eventTargetTester.tearDown();
      },
    },
    eventTargetTester.commonTests));
