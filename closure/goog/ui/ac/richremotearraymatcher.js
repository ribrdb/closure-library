/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class that retrieves rich autocomplete matches, represented as
 * a structured list of lists, via an ajax call.  The first element of each
 * sublist is the name of a client-side javascript function that converts the
 * remaining sublist elements into rich rows.
 */

import * as dom from '../../dom/dom.js';

import { RemoteArrayMatcher } from './remotearraymatcher.js';



/**
 * An array matcher that requests rich matches via ajax and converts them into
 * rich rows.
 *
 * @param {string} url The Uri which generates the auto complete matches.  The
 *     search term is passed to the server as the 'token' query param.
 * @param {boolean=} opt_noSimilar If true, request that the server does not do
 *     similarity matches for the input token against the dictionary.
 *     The value is sent to the server as the 'use_similar' query param which is
 *     either "1" (opt_noSimilar==false) or "0" (opt_noSimilar==true).
 * @constructor
 * @extends {RemoteArrayMatcher}
 */
export function RichRemoteArrayMatcher(url, opt_noSimilar) {
  RemoteArrayMatcher.call(this, url, opt_noSimilar);

  /**
   * A function(rows) that is called before the array matches are returned.
   * It runs client-side and filters the results given by the server before
   * being rendered by the client.
   * @type {?Function}
   * @private
   */
  this.rowFilter_ = null;

  /**
     * A function(type, response) converting the type and the server response to
     * an object with two methods: render(node, token) and select(target).
     * @private {RichRemoteArrayMatcher.RowBuilder}
     */
  this.rowBuilder_ = function(type, response) {
    return /** @type {!Object} */ (response);
  };
}
goog.inherits(RichRemoteArrayMatcher, RemoteArrayMatcher);


/**
 * Set the filter that is called before the array matches are returned.
 * @param {Function} rowFilter A function(rows) that returns an array of rows as
 *     a subset of the rows input array.
 */
RichRemoteArrayMatcher.prototype.setRowFilter = function(rowFilter) {
  this.rowFilter_ = rowFilter;
};


/**
 * @typedef {function(string, *): {
 *   render: (function(!Element, string)|undefined),
 *   select: (function(!Element)|undefined)
 * }}
 */
RichRemoteArrayMatcher.RowBuilder;


/**
 * Sets the function building the rows.
 * @param {RichRemoteArrayMatcher.RowBuilder} rowBuilder
 *     A function(type, response) converting the type and the server response to
 *     an object with two methods: render(node, token) and select(target).
 */
RichRemoteArrayMatcher.prototype.setRowBuilder = function(
    rowBuilder) {
  this.rowBuilder_ = rowBuilder;
};


/**
 * Retrieve a set of matching rows from the server via ajax and convert them
 * into rich rows.
 * @param {string} token The text that should be matched; passed to the server
 *     as the 'token' query param.
 * @param {number} maxMatches The maximum number of matches requested from the
 *     server; passed as the 'max_matches' query param. The server is
 *     responsible for limiting the number of matches that are returned.
 * @param {Function} matchHandler Callback to execute on the result after
 *     matching.
 * @override
 */
RichRemoteArrayMatcher.prototype.requestMatchingRows = function(
    token, maxMatches, matchHandler) {
  // The RichRemoteArrayMatcher must map over the results and filter them
  // before calling the request matchHandler.  This is done by passing
  // myMatchHandler to RemoteArrayMatcher.requestMatchingRows which maps,
  // filters, and then calls matchHandler.
  var myMatchHandler = goog.bind(function(token, matches) {
    try {
      var rows = [];
      for (var i = 0; i < matches.length; i++) {
        for (var j = 1; j < matches[i].length; j++) {
          var richRow = this.rowBuilder_(matches[i][0], matches[i][j]);
          rows.push(richRow);

          // If no render function was provided, set the node's textContent.
          if (typeof richRow.render == 'undefined') {
            richRow.render = function(node, token) {
              dom.setTextContent(node, richRow.toString());
            };
          }

          // If no select function was provided, set the text of the input.
          if (typeof richRow.select == 'undefined') {
            richRow.select = function(target) {
              target.value = richRow.toString();
            };
          }
        }
      }
      if (this.rowFilter_) {
        rows = this.rowFilter_(rows);
      }
      matchHandler(token, rows);
    } catch (exception) {
      // TODO(user): Is this what we want?
      matchHandler(token, []);
    }
  }, this);

  // Call the super's requestMatchingRows with myMatchHandler
  RichRemoteArrayMatcher.superClass_.requestMatchingRows.call(
      this, token, maxMatches, myMatchHandler);
};
