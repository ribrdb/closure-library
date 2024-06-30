/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Plugin for generating emoticons.
 */

import { TagName } from '../../dom/tagname.js';

import { Plugin } from '../plugin.js';
import * as range from '../range.js';
import * as functions from '../../functions/functions.js';
import { Emoji } from '../../ui/emoji/emoji.js';
import * as userAgent from '../../useragent/useragent.js';



/**
 * Plugin for generating emoticons.
 *
 * @constructor
 * @extends {Plugin}
 * @final
 */
export function Emoticons() {
  Emoticons.base(this, 'constructor');
}
goog.inherits(Emoticons, Plugin);


/**
 * The emoticon command.
 * @const
 */
Emoticons.COMMAND = '+emoticon';


/** @override */
Emoticons.prototype.getTrogClassId =
    functions.constant(Emoticons.COMMAND);


/** @override */
Emoticons.prototype.isSupportedCommand = function(command) {
  return command == Emoticons.COMMAND;
};


/**
 * Inserts an emoticon into the editor at the cursor location. Places the
 * cursor to the right of the inserted emoticon.
 * @param {string} command Command to execute.
 * @param {*=} opt_arg Emoji to insert.
 * @return {!Object|undefined} The result of the command.
 * @override
 */
Emoticons.prototype.execCommandInternal = function(
    command, opt_arg) {
  var emoji = /** @type {Emoji} */ (opt_arg);

  var styleProperties = 'margin:0 0.2ex;vertical-align:middle;';
  var emojiHeight = emoji.getHeight();
  styleProperties += emojiHeight ? 'height:' + emojiHeight + 'px;' : '';
  var emojiWidth = emoji.getWidth();
  styleProperties += emojiWidth ? 'width:' + emojiWidth + 'px;' : '';

  var dom = this.getFieldDomHelper();
  var imgAttributes = {'src': emoji.getUrl(), 'style': styleProperties};
  if (emoji.getAltText()) {
    imgAttributes['alt'] = emoji.getAltText();
  }
  var img = dom.createDom(TagName.IMG, imgAttributes);

  img.setAttribute(Emoji.ATTRIBUTE, emoji.getId());
  img.setAttribute(Emoji.DATA_ATTRIBUTE, emoji.getId());

  this.getFieldObject().getRange().replaceContentsWithNode(img);

  // IE8 does the right thing with the cursor, and has a js error when we try
  // to place the cursor manually.
  // IE9 loses the cursor when the window is focused, so focus first.
  if (!userAgent.IE || userAgent.isDocumentModeOrHigher(9)) {
    this.getFieldObject().focus();
    range.placeCursorNextTo(img, false);
  }
};
