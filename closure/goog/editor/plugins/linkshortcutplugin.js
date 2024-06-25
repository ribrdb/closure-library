/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Adds a keyboard shortcut for the link command.
 */

import { Command } from '../command.js';

import { Link } from '../link.js';
import { Plugin } from '../plugin.js';



/**
 * Plugin to add a keyboard shortcut for the link command
 * @constructor
 * @extends {Plugin}
 * @final
 */
export function LinkShortcutPlugin() {
  LinkShortcutPlugin.base(this, 'constructor');
}
goog.inherits(LinkShortcutPlugin, Plugin);


/** @override */
LinkShortcutPlugin.prototype.getTrogClassId = function() {
  return 'LinkShortcutPlugin';
};


/**
 * @override
 */
LinkShortcutPlugin.prototype.handleKeyboardShortcut =
    function(e, key, isModifierPressed) {
      if (isModifierPressed && key == 'k' && !e.shiftKey) {
        var link = /** @type {Link?} */ (
            this.getFieldObject().execCommand(Command.LINK));
        if (link) {
          link.finishLinkCreation(this.getFieldObject());
        }
        return true;
      }

      return false;
    };
