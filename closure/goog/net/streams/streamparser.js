/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview the private interface for implementing parsers responsible
 * for decoding the input stream (e.g. an HTTP body) to objects per their
 * specified content-types, e.g. JSON, Protobuf.
 *
 * A default JSON parser is provided,
 *
 * A Protobuf stream parser is also provided.
 */

goog.declareModuleId('goog.net.streams.streamparser');



/**
 * This interface represents a stream parser.
 *
 * @interface
 * @package
 */
export function StreamParser() {}


/**
 * Checks if the parser is aborted due to invalid input.
 *
 * @return {boolean} true if the input is still valid.
 */
StreamParser.prototype.isInputValid = function() {};

/**
 * @return {boolean} True if this parser should parse binary(Array or
 *     ArrayBuffer) input, otherwise only string input will be accepted.
 */
StreamParser.prototype.acceptsBinaryInput = function() {};

/**
 * Checks the error message.
 *
 * @return {?string} any debug info on the first invalid input, or null if
 *    the input is still valid.
 */
StreamParser.prototype.getErrorMessage = function() {};


/**
 * Parse the new input.
 *
 * Note that there is no Parser state to indicate the end of a stream.
 *
 * @param {string|!ArrayBuffer|!Array<number>} input The input data
 * @throws {!Error} if the input is invalid, and the parser will remain invalid
 *    once an error has been thrown.
 * @return {?Array<string|!Object>} any parsed objects (atomic messages)
 *    in an array, or null if more data needs be read to parse any new object.
 */
StreamParser.prototype.parse = function(input) {};
