/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ErrorCode } from './errorcode.js';
import { FakeMechanism } from '../testing/storage/fakemechanism.js';
import { RichStorage } from './richstorage.js';
import * as storageTester from './storagetester.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testBasicOperations() {
    const mechanism = new FakeMechanism();
    const storage = new RichStorage(mechanism);
    storageTester.runBasicTests(storage);
  },

  testWrapping() {
    const mechanism = new FakeMechanism();
    const storage = new RichStorage(mechanism);

    // Some metadata.
    const object = {'a': 97, 'b': 98};
    const wrapper = new RichStorage.Wrapper(object);
    wrapper['meta'] = 'info';
    storage.set('first', wrapper);
    assertObjectEquals(object, storage.get('first'));
    assertObjectEquals(wrapper, storage.getWrapper('first'));
    assertEquals('info', storage.getWrapper('first')['meta']);

    // Multiple wrappings.
    const wrapper1 = RichStorage.Wrapper.wrapIfNecessary(object);
    wrapper1['some'] = 'meta';
    const wrapper2 = RichStorage.Wrapper.wrapIfNecessary(wrapper1);
    wrapper2['more'] = 'stuff';
    storage.set('second', wrapper2);
    assertObjectEquals(object, storage.get('second'));
    assertObjectEquals(wrapper2, storage.getWrapper('second'));
    assertEquals('meta', storage.getWrapper('second')['some']);
    assertEquals('stuff', storage.getWrapper('second')['more']);

    // Invalid wrappings.
    mechanism.set('third', 'null');
    assertEquals(ErrorCode.INVALID_VALUE, assertThrows(() => {
                   storage.get('third');
                 }));
    mechanism.set('third', '{"meta": "data"}');
    assertEquals(ErrorCode.INVALID_VALUE, assertThrows(() => {
                   storage.get('third');
                 }));

    // Weird values.
    /** @suppress {checkTypes} suppression added to enable type checking */
    const wrapperA = new RichStorage.Wrapper.wrapIfNecessary(null);
    wrapperA['one'] = 1;
    storage.set('first', wrapperA);
    assertObjectEquals(wrapperA, storage.getWrapper('first'));
    /** @suppress {checkTypes} suppression added to enable type checking */
    const wrapperB = new RichStorage.Wrapper.wrapIfNecessary('');
    wrapperA['two'] = [];
    storage.set('second', wrapperB);
    assertObjectEquals(wrapperB, storage.getWrapper('second'));

    // Clean up.
    storage.remove('first');
    storage.remove('second');
    storage.remove('third');
    assertUndefined(storage.get('first'));
    assertUndefined(storage.get('second'));
    assertUndefined(storage.get('third'));
    assertNull(mechanism.get('first'));
    assertNull(mechanism.get('second'));
    assertNull(mechanism.get('third'));
  },
});
