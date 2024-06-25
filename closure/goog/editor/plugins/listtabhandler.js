/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Editor plugin to handle tab keys in lists to indent and
 * outdent.
 */

import * as dom from '../../dom/dom.js';

import { TagName } from '../../dom/tagname.js';
import { Command } from '../command.js';
import { AbstractTabHandler } from './abstracttabhandler.js';
import * as iter from '../../iter/iter.js';



/**
 * Plugin to handle tab keys in lists to indent and outdent.
 * @constructor
 * @extends {AbstractTabHandler}
 * @final
 */
export function ListTabHandler() {
  AbstractTabHandler.call(this);
}
goog.inherits(
    ListTabHandler, AbstractTabHandler);


/** @override */
ListTabHandler.prototype.getTrogClassId = function() {
  return 'ListTabHandler';
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ListTabHandler.prototype.handleTabKey = function(e) {
  var range = this.getFieldObject().getRange();
  if (dom.getAncestorByTagNameAndClass(
          range.getContainerElement(), TagName.LI) ||
      iter.some(range, function(node) {
        return node.tagName == TagName.LI;
      })) {
    this.getFieldObject().execCommand(
        e.shiftKey ? Command.OUTDENT : Command.INDENT);
    e.preventDefault();
    return true;
  }

  return false;
};
