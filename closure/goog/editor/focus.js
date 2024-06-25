/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilties to handle focusing related to rich text editing.
 */

import * as selection from '../dom/selection.js';


/**
 * Change focus to the given input field and set cursor to end of current text.
 * @param {Element} inputElem Input DOM element.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
export function focusInputField(inputElem) {
 inputElem.focus();
 selection.setCursorPosition(inputElem, inputElem.value.length);
}
