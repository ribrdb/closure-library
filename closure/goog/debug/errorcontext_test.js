/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly('goog.debug.errorcontextTest');

import * as errorcontext from './errorcontext.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testAddContext() {
    const err = new Error('something happened');
    assertObjectEquals({}, errorcontext.getErrorContext(err));

    errorcontext.addErrorContext(err, 'key', 'value');
    assertObjectEquals({key: 'value'}, errorcontext.getErrorContext(err));

    errorcontext.addErrorContext(err, 'another_key', 'another_value');
    assertObjectEquals(
        {key: 'value', another_key: 'another_value'},
        errorcontext.getErrorContext(err));

    // Overwrite the first context value.
    errorcontext.addErrorContext(err, 'key', 'new_value');
    assertObjectEquals(
        {key: 'new_value', another_key: 'another_value'},
        errorcontext.getErrorContext(err));
  },
});
