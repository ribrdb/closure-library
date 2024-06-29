/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Unit tests for the collectable storage interface.
 */

goog.setTestOnly();

import * as asserts from '../testing/asserts.js';
const { CollectableStorage } = goog.requireType('goog.storage.collectablestorage');
const { IterableMechanism } = goog.requireType('goog.storage.mechanism.IterableMechanism');
const { MockClock } = goog.requireType('goog.testing.mockclock');



/**
 * Tests basic operation: expiration and collection of collectable storage.
 *
 * @param {IterableMechanism} mechanism
 * @param {MockClock} clock
 * @param {CollectableStorage} storage
  */
export function runBasicTests(mechanism, clock, storage) {
 // No expiration.
 storage.set('first', 'three seconds', 3000);
 storage.set('second', 'one second', 1000);
 storage.set('third', 'permanent');
 storage.set('fourth', 'two seconds', 2000);
 clock.tick(100);
 storage.collect();
 assertEquals('three seconds', storage.get('first'));
 assertEquals('one second', storage.get('second'));
 assertEquals('permanent', storage.get('third'));
 assertEquals('two seconds', storage.get('fourth'));

 // A key has expired.
 clock.tick(1000);
 storage.collect();
 assertNull(mechanism.get('second'));
 assertEquals('three seconds', storage.get('first'));
 assertUndefined(storage.get('second'));
 assertEquals('permanent', storage.get('third'));
 assertEquals('two seconds', storage.get('fourth'));

 // Another two keys have expired.
 clock.tick(2000);
 storage.collect();
 assertNull(mechanism.get('first'));
 assertNull(mechanism.get('fourth'));
 assertUndefined(storage.get('first'));
 assertEquals('permanent', storage.get('third'));
 assertUndefined(storage.get('fourth'));

 // Clean up.
 storage.remove('third');
 assertNull(mechanism.get('third'));
 assertUndefined(storage.get('third'));
 storage.collect();
 clock.uninstall();
}
