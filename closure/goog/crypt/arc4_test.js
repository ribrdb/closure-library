/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Arc4 } from './arc4.js';
import * as googArray from '../array/array.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testEncryptionDecryption() {
    const key = [0x25, 0x26, 0x27, 0x28];
    const startArray = [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67];
    const byteArray = [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67];

    let arc4 = new Arc4();
    arc4.setKey(key);
    arc4.crypt(byteArray);

    assertArrayEquals(byteArray, [0x51, 0xBB, 0xDD, 0x95, 0x9B, 0x42, 0x34]);

    // The same key and crypt call should unencrypt the data back to its
    // original state
    arc4 = new Arc4();
    arc4.setKey(key);
    arc4.crypt(byteArray);
    assertArrayEquals(byteArray, startArray);
  },

  testDiscard() {
    const key = [0x25, 0x26, 0x27, 0x28];
    const data = [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67];

    let arc4 = new Arc4();
    arc4.setKey(key);
    arc4.discard(256);
    const withDiscard = googArray.clone(data);
    arc4.crypt(withDiscard);

    // First encrypting a dummy array should give the same result as
    // discarding.
    arc4 = new Arc4();
    arc4.setKey(key);
    const withCrypt = googArray.clone(data);
    arc4.crypt(new Array(256));
    arc4.crypt(withCrypt);
    assertArrayEquals(withDiscard, withCrypt);
  },
});
