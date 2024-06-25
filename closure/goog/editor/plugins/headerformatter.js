/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Handles applying header styles to text.
 */

import { Command } from '../command.js';

import { Plugin } from '../plugin.js';
import * as userAgent from '../../useragent/useragent.js';



/**
 * Applies header styles to text.
 * @constructor
 * @extends {Plugin}
 * @final
 */
export function HeaderFormatter() {
  Plugin.call(this);
}
goog.inherits(HeaderFormatter, Plugin);


/** @override */
HeaderFormatter.prototype.getTrogClassId = function() {
  return 'HeaderFormatter';
};

// TODO(user):  Move execCommand functionality from basictextformatter into
// here for headers.  I'm not doing this now because it depends on the
// switch statements in basictextformatter and we'll need to abstract that out
// in order to separate out any of the functions from basictextformatter.


/**
 * Commands that can be passed as the optional argument to execCommand.
 * @enum {string}
 */
HeaderFormatter.HEADER_COMMAND = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4'
};


/**
 * @override
 */
HeaderFormatter.prototype.handleKeyboardShortcut = function(
    e, key, isModifierPressed) {
  if (!isModifierPressed) {
    return false;
  }
  var command = null;
  switch (key) {
    case '1':
      command = HeaderFormatter.HEADER_COMMAND.H1;
      break;
    case '2':
      command = HeaderFormatter.HEADER_COMMAND.H2;
      break;
    case '3':
      command = HeaderFormatter.HEADER_COMMAND.H3;
      break;
    case '4':
      command = HeaderFormatter.HEADER_COMMAND.H4;
      break;
  }
  if (command) {
    this.getFieldObject().execCommand(
        Command.FORMAT_BLOCK, command);
    // Prevent default isn't enough to cancel tab navigation in FF.
    if (userAgent.GECKO) {
      e.stopPropagation();
    }
    return true;
  }
  return false;
};
