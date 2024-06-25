/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A plugin that fills the field with lorem ipsum text when it's
 * empty and does not have the focus. Applies to both editable and uneditable
 * fields.
 */

import * as asserts from '../../asserts/asserts.js';

import * as dom from '../../dom/dom.js';
import { Command } from '../command.js';
import { Field } from '../field.js';
import { Plugin } from '../plugin.js';
import * as node from '../node.js';
import * as functions from '../../functions/functions.js';
import { SafeHtml } from '../../html/safehtml.js';
import * as userAgent from '../../useragent/useragent.js';



/**
 * A plugin that manages lorem ipsum state of editable fields.
 * @param {string} message The lorem ipsum message.
 * @constructor
 * @extends {Plugin}
 * @final
 */
export function LoremIpsum(message) {
  Plugin.call(this);

  /**
   * The lorem ipsum message.
   * @type {string}
   * @private
   */
  this.message_ = message;
}
goog.inherits(LoremIpsum, Plugin);


/** @override */
LoremIpsum.prototype.getTrogClassId =
    functions.constant('LoremIpsum');


/** @override */
LoremIpsum.prototype.activeOnUneditableFields =
    functions.TRUE;


/**
 * Whether the field is currently filled with lorem ipsum text.
 * @type {boolean}
 * @private
 */
LoremIpsum.prototype.usingLorem_ = false;


/**
 * Handles queryCommandValue.
 * @param {string} command The command to query.
 * @return {boolean} The result.
 * @override
 */
LoremIpsum.prototype.queryCommandValue = function(command) {
  return command == Command.USING_LOREM && this.usingLorem_;
};


/**
 * Handles execCommand.
 * @param {string} command The command to execute.
 *     Should be CLEAR_LOREM or UPDATE_LOREM.
 * @param {*=} opt_placeCursor Whether to place the cursor in the field
 *     after clearing lorem. Should be a boolean.
 * @override
 */
LoremIpsum.prototype.execCommand = function(
    command, opt_placeCursor) {
  if (command == Command.CLEAR_LOREM) {
    this.clearLorem_(!!opt_placeCursor);
  } else if (command == Command.UPDATE_LOREM) {
    this.updateLorem_();
  }
};


/** @override */
LoremIpsum.prototype.isSupportedCommand = function(
    command) {
  return command == Command.CLEAR_LOREM ||
      command == Command.UPDATE_LOREM ||
      command == Command.USING_LOREM;
};


/**
 * Set the lorem ipsum text in a Field if needed.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
LoremIpsum.prototype.updateLorem_ = function() {
  // Try to apply lorem ipsum if:
  // 1) We have lorem ipsum text
  // 2) There's not a dialog open, as that screws
  //    with the dialog's ability to properly restore the selection
  //    on dialog close (since the DOM nodes would get clobbered in FF)
  // 3) We're not using lorem already
  // 4) The field is not currently active (doesn't have focus).
  var fieldObj = this.getFieldObject();
  if (!this.usingLorem_ && !fieldObj.inModalMode() &&
      Field.getActiveFieldId() != fieldObj.id) {
    var field = fieldObj.getElement();
    if (!field) {
      // Fallback on the original element. This is needed by
      // fields managed by click-to-edit.
      field = fieldObj.getOriginalElement();
    }

    asserts.assert(field);
    if (node.isEmpty(field)) {
      this.usingLorem_ = true;

      // Save the old font style so it can be restored when we
      // clear the lorem ipsum style.
      this.oldFontStyle_ = field.style.fontStyle;
      field.style.fontStyle = 'italic';
      fieldObj.setSafeHtml(
          true, SafeHtml.htmlEscapePreservingNewlines(this.message_),
          true);
    }
  }
};


/**
 * Clear an EditableField's lorem ipsum and put in initial text if needed.
 *
 * If using click-to-edit mode (where Trogedit manages whether the field
 * is editable), this works for both editable and uneditable fields.
 *
 * TODO(user): Is this really necessary? See TODO below.
 * @param {boolean=} opt_placeCursor Whether to place the cursor in the field
 *     after clearing lorem.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
LoremIpsum.prototype.clearLorem_ = function(
    opt_placeCursor) {
  // Don't mess with lorem state when a dialog is open as that screws
  // with the dialog's ability to properly restore the selection
  // on dialog close (since the DOM nodes would get clobbered)
  var fieldObj = this.getFieldObject();
  if (this.usingLorem_ && !fieldObj.inModalMode()) {
    var field = fieldObj.getElement();
    if (!field) {
      // Fallback on the original element. This is needed by
      // fields managed by click-to-edit.
      field = fieldObj.getOriginalElement();
    }

    asserts.assert(field);
    this.usingLorem_ = false;
    field.style.fontStyle = this.oldFontStyle_;
    fieldObj.setSafeHtml(true, null, true);

    // TODO(nicksantos): I'm pretty sure that this is a hack, but talk to
    // Julie about why this is necessary and what to do with it. Really,
    // we need to figure out where it's necessary and remove it where it's
    // not. Safari never places the cursor on its own willpower.
    if (opt_placeCursor && fieldObj.isLoaded()) {
      if (userAgent.WEBKIT) {
        dom.getOwnerDocument(fieldObj.getElement()).body.focus();
        fieldObj.focusAndPlaceCursorAtStart();
      }
    }
  }
};
