/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock of goog.editor.field.
 */

goog.setTestOnly('goog.testing.editor.FieldMock');

import * as dom from '../../dom/dom.js';
import * as Range from '../../dom/range.js';
import { Field } from '../../editor/field.js';
import { LooseMock } from '../loosemock.js';
import * as mockmatchers from '../mockmatchers.js';
const { AbstractRange } = goog.requireType('goog.dom.abstractrange');



/**
 * Mock of Field.
 * @param {Window=} opt_window Window the field would edit.  Defaults to
 *     `window`.
 * @param {Window=} opt_appWindow "AppWindow" of the field, which can be
 *     different from `opt_window` when mocking a field that uses an
 *     iframe. Defaults to `opt_window`.
 * @param {AbstractRange=} opt_range An object (mock or real) to be
 *     returned by getRange(). If omitted, a new Range is created
 *     from the window every time getRange() is called.
 * @constructor
 * @extends {LooseMock}
 * @suppress {missingProperties} Mocks do not fit in the type system well.
 * @final
 */
export function FieldMock(opt_window, opt_appWindow, opt_range) {
  LooseMock.call(this, Field);
  opt_window = opt_window || window;
  opt_appWindow = opt_appWindow || opt_window;

  // We want to pretend this is a Field even though it can't actaully be a
  // subclass.
  const thisField = /** @type {!Field} */ (/** @type {*} */ (this));

  thisField.getAppWindow();
  this.$anyTimes();
  this.$returns(opt_appWindow);

  thisField.getRange();
  this.$anyTimes();
  this.$does(function() {
    return opt_range || Range.createFromWindow(opt_window);
  });

  thisField.getEditableDomHelper();
  this.$anyTimes();
  this.$returns(dom.getDomHelper(opt_window.document));

  thisField.usesIframe();
  this.$anyTimes();

  thisField.getBaseZindex();
  this.$anyTimes();
  this.$returns(0);

  thisField.restoreSavedRange(
      /** @type {?} */ (mockmatchers.ignoreArgument));
  this.$anyTimes();
  this.$does(function(range) {
    if (range) {
      range.restore();
    }
    thisField.focus();
  });

  // These methods cannot be set on the prototype, because the prototype
  // gets stepped on by the mock framework.
  let inModalMode = false;

  /**
   * @return {boolean} Whether we're in modal interaction mode.
   */
  this.inModalMode = function() {
    return inModalMode;
  };

  /**
   * @param {boolean} mode Sets whether we're in modal interaction mode.
   */
  this.setModalMode = function(mode) {
    inModalMode = mode;
  };

  let uneditable = false;

  /**
   * @return {boolean} Whether the field is uneditable.
   */
  this.isUneditable = function() {
    return uneditable;
  };

  /**
   * @param {boolean} isUneditable Whether the field is uneditable.
   */
  this.setUneditable = function(isUneditable) {
    uneditable = isUneditable;
  };
}
goog.inherits(FieldMock, LooseMock);
