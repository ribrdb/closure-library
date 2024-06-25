/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A lite polyfill of the ReadableStream native API with a subset
 * of methods supported.
 */
import liteImpl from './lite_impl.js';

import liteNativeImpl from './lite_native_impl.js';

import {
  ReadableStream,
  ReadableStreamDefaultController,
  ReadableStreamDefaultReader,
  ReadableStreamUnderlyingSource,
} from './lite_types.js';

import defines from './defines.js';
const {USE_NATIVE_IMPLEMENTATION} = defines;

/**
 * Creates and returns a new ReadableStream.
 *
 * The underlying source should only have a start() method, and no other
 * properties.
 * @param {!ReadableStreamUnderlyingSource<T>} underlyingSource
 * @return {!ReadableStream<T>}
 * @suppress {strictMissingProperties}
 * @template T
 */
function newReadableStream(underlyingSource) {
  if (USE_NATIVE_IMPLEMENTATION === 'true' ||
      (USE_NATIVE_IMPLEMENTATION === 'detect' && goog.global.ReadableStream)) {
    return liteNativeImpl.newReadableStream(underlyingSource);
  } else {
    return liteImpl.newReadableStream(underlyingSource);
  }
}

export default {
  ReadableStream,
  ReadableStreamDefaultController,
  ReadableStreamDefaultReader,
  ReadableStreamUnderlyingSource,
  newReadableStream,
};
