/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Displays and edits the value of a cookie.
 * Intended only for debugging.
 */
import * as asserts from '../asserts/asserts.js';

import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import { EventType } from '../events/eventtype.js';
import { Cookies } from '../net/cookies.js';
import * as googString from '../string/string.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
const { Event } = goog.requireType('goog.events.event');



/**
 * Displays and edits the value of a cookie.
 * @final
 * @unrestricted
 */
export class CookieEditor extends Component {
  /**
     * @param {dom.DomHelper=} opt_domHelper Optional DOM helper.
     */
  constructor(opt_domHelper) {
    super(opt_domHelper);
  }

  /**
   * Sets the cookie which this component will edit.
   * @param {string} cookieKey Cookie key.
   */
  selectCookie(cookieKey) {
    asserts.assert(Cookies.getInstance().isValidName(cookieKey));
    this.cookieKey_ = cookieKey;
    if (this.textAreaElem_) {
      this.textAreaElem_.value =
          Cookies.getInstance().get(cookieKey) || '';
    }
  }

  /** @override */
  canDecorate() {
    return false;
  }

  /** @override */
  createDom() {
    // Debug-only, so we don't need i18n.
    this.clearButtonElem_ = dom.createDom(
        TagName.BUTTON, /* attributes */ null, 'Clear');
    this.updateButtonElem_ = dom.createDom(
        TagName.BUTTON, /* attributes */ null, 'Update');
    var value =
        this.cookieKey_ && Cookies.getInstance().get(this.cookieKey_);
    this.textAreaElem_ = dom.createDom(
        TagName.TEXTAREA, /* attibutes */ null, value || '');
    this.valueWarningElem_ = dom.createDom(
        TagName.SPAN,
        /* attibutes */ {'style': 'display:none;color:red'},
        'Invalid cookie value.');
    this.setElementInternal(dom.createDom(
        TagName.DIV,
        /* attibutes */ null, this.valueWarningElem_,
        dom.createDom(TagName.BR), this.textAreaElem_,
        dom.createDom(TagName.BR), this.clearButtonElem_,
        this.updateButtonElem_));
  }

  /** @override */
  enterDocument() {
    super.enterDocument();
    this.getHandler().listen(
        this.clearButtonElem_, EventType.CLICK, this.handleClear_);
    this.getHandler().listen(
        this.updateButtonElem_, EventType.CLICK,
        this.handleUpdate_);
  }

  /**
   * Handles user clicking clear button.
   * @param {!Event} e The click event.
   * @private
   */
  handleClear_(e) {
    if (this.cookieKey_) {
      Cookies.getInstance().remove(this.cookieKey_);
    }
    this.textAreaElem_.value = '';
  }

  /**
   * Handles user clicking update button.
   * @param {!Event} e The click event.
   * @private
   */
  handleUpdate_(e) {
    if (this.cookieKey_) {
      var value = this.textAreaElem_.value;
      if (value) {
        // Strip line breaks.
        value = googString.stripNewlines(value);
      }
      if (Cookies.getInstance().isValidValue(value)) {
        Cookies.getInstance().set(this.cookieKey_, value);
        style.setElementShown(this.valueWarningElem_, false);
      } else {
        style.setElementShown(this.valueWarningElem_, true);
      }
    }
  }

  /** @override */
  disposeInternal() {
    this.clearButtonElem_ = null;
    this.cookieKey_ = null;
    this.textAreaElem_ = null;
    this.updateButtonElem_ = null;
    this.valueWarningElem_ = null;
  }
}



/**
 * Cookie key.
 * @type {?string}
 * @private
 */
CookieEditor.prototype.cookieKey_;


/**
 * Text area.
 * @type {HTMLTextAreaElement}
 * @private
 */
CookieEditor.prototype.textAreaElem_;


/**
 * Clear button.
 * @type {HTMLButtonElement}
 * @private
 */
CookieEditor.prototype.clearButtonElem_;


/**
 * Invalid value warning text.
 * @type {HTMLSpanElement}
 * @private
 */
CookieEditor.prototype.valueWarningElem_;


/**
 * Update button.
 * @type {HTMLButtonElement}
 * @private
 */
CookieEditor.prototype.updateButtonElem_;


// TODO(user): add combobox for user to select different cookies
