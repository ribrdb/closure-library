/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Exports a method to create an inert document, which will not
 * execute JS or make network requests while parsing HTML.
 */

/**
 * Creates an DOM Document object that will not execute scripts or make
 * network requests while parsing HTML.
 * @return {!Document}
 */
function createInertDocument() {
  'use strict';
  return document.implementation.createHTMLDocument('');
}

export {createInertDocument};
