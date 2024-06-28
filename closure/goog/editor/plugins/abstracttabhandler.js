/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Abstract Editor plugin class to handle tab keys.  Has one
 * abstract method which should be overriden to handle a tab key press.
 */

import { Plugin } from '../plugin.js';

import { KeyCodes } from '../../events/keycodes.js';
import * as userAgent from '../../useragent/useragent.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * Plugin to handle tab keys. Specific tab behavior defined by subclasses.
 *
 * @constructor
 * @extends {Plugin}
 */
export function AbstractTabHandler() {
 Plugin.call(this);
}
goog.inherits(AbstractTabHandler, Plugin);


/** @override */
AbstractTabHandler.prototype.getTrogClassId =
    goog.abstractMethod;


/** @override */
AbstractTabHandler.prototype.handleKeyboardShortcut =
    function(e, key, isModifierPressed) {
     // If a dialog doesn't have selectable field, Moz grabs the event and
     // performs actions in editor window. This solves that problem and allows
     // the event to be passed on to proper handlers.
     if (userAgent.GECKO && this.getFieldObject().inModalMode()) {
       return false;
     }

     // Don't handle Ctrl+Tab since the user is most likely trying to switch
     // browser tabs. See bug 1305086.
     // FF3 on Mac sends Ctrl-Tab to trogedit and we end up inserting a tab, but
     // then it also switches the tabs. See bug 1511681. Note that we don't use
     // isModifierPressed here since isModifierPressed is true only if metaKey
     // is true on Mac.
     if (e.keyCode == KeyCodes.TAB && !e.metaKey && !e.ctrlKey) {
       return this.handleTabKey(e);
     }

     return false;
    };


/**
 * Handle a tab key press.
 * @param {!BrowserEvent} e The key event.
 * @return {boolean} Whether this event was handled by this plugin.
 * @protected
 */
AbstractTabHandler.prototype.handleTabKey =
    goog.abstractMethod;
