/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An example of how to write a dialog plugin.
 */

import { HelloWorldDialog } from './helloworlddialog.js';

import { TagName } from '../../dom/tagname.js';
import { AbstractDialogPlugin } from '../../editor/plugins/abstractdialogplugin.js';
import * as editorRange from '../../editor/range.js';
import * as functions from '../../functions/functions.js';
import { AbstractDialog } from '../../ui/editor/abstractdialog.js';
const { DomHelper } = goog.requireType('goog.dom.dom');


// *** Public interface ***************************************************** //



/**
 * A plugin that opens the hello world dialog.
 * @final
 * @unrestricted
 */
export class HelloWorldDialogPlugin extends AbstractDialogPlugin {
constructor() {
super(HelloWorldDialogPlugin.Command.HELLO_WORLD_DIALOG);
}

/**
* Creates a new instance of the dialog and registers for the relevant events.
* @param {DomHelper} dialogDomHelper The dom helper to be used to
*     create the dialog.
* @return {!HelloWorldDialog} The dialog.
* @override
* @protected
*/
createDialog(dialogDomHelper) {
const dialog = new HelloWorldDialog(dialogDomHelper);
dialog.addEventListener(
    AbstractDialog.EventType.OK, this.handleOk_, false,
    this);
return dialog;
}

/**
* Handles the OK event from the dialog by inserting the hello world message
* into the field.
* @param {HelloWorldDialog.OkEvent} e OK event object.
* @private
*/
handleOk_(e) {
// First restore the selection so we can manipulate the field's content
// according to what was selected.
this.restoreOriginalSelection();

// Notify listeners that the field's contents are about to change.
this.getFieldObject().dispatchBeforeChange();

// Now we can clear out what was previously selected (if anything).
const range = this.getFieldObject().getRange();
range.removeContents();
// And replace it with a span containing our hello world message.
let createdNode = this.getFieldDomHelper().createDom(
    TagName.SPAN, null, e.message);
createdNode = range.insertNode(createdNode, false);
// Place the cursor at the end of the new text node (false == to the right).
editorRange.placeCursorNextTo(createdNode, false);

// Notify listeners that the field's selection has changed.
this.getFieldObject().dispatchSelectionChangeEvent();
// Notify listeners that the field's contents have changed.
this.getFieldObject().dispatchChange();
}
}



/**
 * Commands implemented by this plugin.
 * @enum {string}
 */
HelloWorldDialogPlugin.Command = {
  HELLO_WORLD_DIALOG: 'helloWorldDialog'
};


/** @override */
HelloWorldDialogPlugin.prototype.getTrogClassId =
    functions.constant('HelloWorldDialog');


// *** Protected interface ************************************************** //



// *** Private implementation *********************************************** //
