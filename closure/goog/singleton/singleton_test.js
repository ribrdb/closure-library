/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import * as singleton from './singleton.js';
import { testSuite } from '../testing/testsuite.js';
import * as testingSingleton from '../testing/singleton.js';

testSuite({
  tearDown() {
    singleton.instantiatedSingletons.length = 0;
  },

  testGetInstance() {
    class Foo {
      constructor() {
        this.test = 'test';
      }

      static getInstance() {
        return singleton.getInstance(Foo);
      }
    }

    const foo = Foo.getInstance();
    assertNotNull(foo);
    // Equivalent when called twice.
    assertEquals(foo, Foo.getInstance());
    assertEquals('test', foo.test);
  },

  testGetInstance_errorForSealed() {
    class Foo {
      constructor() {
        this.test = 'test';
      }

      static getInstance() {
        return singleton.getInstance(Foo);
      }
    }

    Object.seal(Foo);
    assertThrows(() => {
      Foo.getInstance();
    });
  },

  testGetInstance_reset() {
    class Foo {
      constructor() {
        this.test = 'test';
      }

      static getInstance() {
        return singleton.getInstance(Foo);
      }
    }

    const foo = Foo.getInstance();
    assertNotNull(foo);
    assertEquals(foo, Foo.getInstance());
    testingSingleton.reset(Foo);
    assertNotEquals(foo, Foo.getInstance());
  },

  testGetInstance_resetAll() {
    class Foo {
      constructor() {
        this.test = 'test';
      }

      static getInstance() {
        return singleton.getInstance(Foo);
      }
    }

    const foo = Foo.getInstance();
    assertNotNull(foo);
    assertEquals(foo, Foo.getInstance());
    testingSingleton.resetAll();
    assertNotEquals(foo, Foo.getInstance());
  },

  testGetInstance_superclass() {
    class Foo {
      constructor() {
        this.test = 'test';
      }

      static getInstance() {
        return singleton.getInstance(Foo);
      }
    }

    class Bar extends Foo {
      constructor() {
        super();

        this.test = 'test-2';
      }

      static getInstance() {
        return singleton.getInstance(Bar);
      }
    }

    assertNotEquals(Foo.getInstance(), Bar.getInstance());
  }
});
