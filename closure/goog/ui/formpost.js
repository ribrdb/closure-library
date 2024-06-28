/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility for making the browser submit a hidden form, which can
 * be used to effect a POST from JavaScript.
 */

import * as array from '../array/array.js';

import { InputType } from '../dom/inputtype.js';
import { TagName } from '../dom/tagname.js';
import * as safe from '../dom/safe.js';
import { SafeHtml } from '../html/safehtml.js';
import { Component } from './component.js';
const { DomHelper } = goog.requireType('goog.dom.dom');



/**
 * Creates a formpost object.
 * @constructor
 * @extends {Component}
 * @param {DomHelper=} opt_dom The DOM helper.
 * @final
 */
export function FormPost(opt_dom) {
  Component.call(this, opt_dom);
}
goog.inherits(FormPost, Component);


/** @override */
FormPost.prototype.createDom = function() {
  this.setElementInternal(this.getDomHelper().createDom(
      TagName.FORM, {'method': 'POST', 'style': 'display:none'}));
};


/**
 * Constructs a POST request and directs the browser as if a form were
 * submitted.
 * @param {Object} parameters Object with parameter values. Values can be
 *     strings, numbers, or arrays of strings or numbers.
 * @param {string=} opt_url The destination URL. If not specified, uses the
 *     current URL for window for the DOM specified in the constructor.
 * @param {string=} opt_target An optional name of a window in which to open the
 *     URL. If not specified, uses the window for the DOM specified in the
 *     constructor.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
FormPost.prototype.post = function(parameters, opt_url, opt_target) {
  var form = this.getElement();
  if (!form) {
    this.render();
    form = this.getElement();
  }
  form.action = opt_url || '';
  form.target = opt_target || '';
  this.setParameters_(form, parameters);
  form.submit();
};


/**
 * Creates hidden inputs in a form to match parameters.
 * @param {!Element} form The form element.
 * @param {Object} parameters Object with parameter values. Values can be
 *     strings, numbers, or arrays of strings or numbers.
 * @private
 */
FormPost.prototype.setParameters_ = function(form, parameters) {
  var name, value, html = [];
  for (name in parameters) {
    value = parameters[name];
    if (goog.isArrayLike(value)) {
      array.forEach(value, goog.bind(function(innerValue) {
        html.push(this.createInput_(name, String(innerValue)));
      }, this));
    } else {
      html.push(this.createInput_(name, String(value)));
    }
  }
  safe.setInnerHtml(form, SafeHtml.concat(html));
};


/**
 * Creates a hidden <input> tag.
 * @param {string} name The name of the input.
 * @param {string} value The value of the input.
 * @return {!SafeHtml}
 * @private
 */
FormPost.prototype.createInput_ = function(name, value) {
  return SafeHtml.create(
      'input',
      {'type': InputType.HIDDEN, 'name': name, 'value': value});
};
