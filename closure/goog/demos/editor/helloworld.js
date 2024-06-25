/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A simple plugin that inserts 'Hello World!' on command. This
 * plugin is intended to be an example of a very simple plugin for plugin
 * developers.
 *
 * @see helloworld.html
 */

import * as dom from '../../dom/dom.js';

import { TagName } from '../../dom/tagname.js';
import { Plugin } from '../../editor/plugin.js';



/**
 * Plugin to insert 'Hello World!' into an editable field.
 * @final
 * @unrestricted
 */
export class HelloWorld extends Plugin {
  constructor() {
    super();
  }

  /** @override */
  getTrogClassId() {
    return 'HelloWorld';
  }

  /** @override */
  isSupportedCommand(command) {
    return command == HelloWorld.COMMAND.HELLO_WORLD;
  }

  /**
   * Executes a command. Does not fire any BEFORECHANGE, CHANGE, or
   * SELECTIONCHANGE events (these are handled by the super class implementation
   * of `execCommand`.
   * @param {string} command Command to execute.
   * @override
   * @protected
   */
  execCommandInternal(command) {
    const domHelper = this.getFieldObject().getEditableDomHelper();
    const range = this.getFieldObject().getRange();
    range.removeContents();
    const newNode =
        domHelper.createDom(TagName.SPAN, null, 'Hello World!');
    range.insertNode(newNode, false);
  }
}



/**
 * Commands implemented by this plugin.
 * @enum {string}
 */
HelloWorld.COMMAND = {
  HELLO_WORLD: '+helloWorld'
};
