/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A full ponyfill of the ReadableStream native API.
 */
import fullImpl from './full_impl.js';

import fullNativeImpl from './full_native_impl.js';
import {ReadableStream, ReadableStreamAsyncIterator, ReadableStreamDefaultController, ReadableStreamDefaultReader, ReadableStreamStrategy, ReadableStreamUnderlyingSource} from './full_types.js';
import defines from './defines.js';
const {USE_NATIVE_IMPLEMENTATION} = defines;

/**
 * Creates and returns a new ReadableStream.
 *
 * The underlying source should only have a start() method, and no other
 * properties.
 * @param {!ReadableStreamUnderlyingSource<T>=} underlyingSource
 * @param {!ReadableStreamStrategy<T>=} strategy
 * @return {!ReadableStream<T>}
 * @suppress {strictMissingProperties}
 * @template T
 */
function newReadableStream(underlyingSource = {}, strategy = {}) {
  if (USE_NATIVE_IMPLEMENTATION === 'true' ||
      (USE_NATIVE_IMPLEMENTATION === 'detect' && goog.global.ReadableStream)) {
    return fullNativeImpl.newReadableStream(underlyingSource, strategy);
  } else {
    return fullImpl.newReadableStream(underlyingSource, strategy);
  }
}

export default {
  ReadableStream,
  ReadableStreamAsyncIterator,
  ReadableStreamDefaultController,
  ReadableStreamDefaultReader,
  ReadableStreamStrategy,
  ReadableStreamUnderlyingSource,
  newReadableStream,
};
