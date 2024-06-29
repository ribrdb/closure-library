/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A plugin for the LinkDialog.
 */

import * as array from '../../array/array.js';

import * as dom from '../../dom/dom.js';
import { Command } from '../command.js';
import { AbstractDialogPlugin } from './abstractdialogplugin.js';
import { EventHandler } from '../../events/eventhandler.js';
import * as functions from '../../functions/functions.js';
import { AbstractDialog } from '../../ui/editor/abstractdialog.js';
import { LinkDialog } from '../../ui/editor/linkdialog.js';
import * as utils from '../../uri/utils.js';
const { Link } = goog.requireType('goog.editor.link');
const { Event } = goog.requireType('goog.events.event');
const { SafeHtml } = goog.requireType('goog.html.SafeHtml');



/**
 * A plugin that opens the link dialog.
 * @constructor
 * @extends {AbstractDialogPlugin}
 */
export function LinkDialogPlugin() {
  LinkDialogPlugin.base(
      this, 'constructor', Command.MODAL_LINK_EDITOR);

  /**
       * Event handler for this object.
       * @type {EventHandler<!LinkDialogPlugin>}
       * @private
       */
  this.eventHandler_ = new EventHandler(this);


  /**
   * A list of whitelisted URL schemes which are safe to open.
   * @type {Array<string>}
   * @private
   */
  this.safeToOpenSchemes_ = ['http', 'https', 'ftp'];
}
goog.inherits(
    LinkDialogPlugin,
    AbstractDialogPlugin);


/**
 * Link object that the dialog is editing.
 * @type {Link}
 * @protected
 */
LinkDialogPlugin.prototype.currentLink_;


/**
 * Optional warning to show about email addresses.
 * @type {SafeHtml}
 * @private
 */
LinkDialogPlugin.prototype.emailWarning_;


/**
 * Whether to show a checkbox where the user can choose to have the link open in
 * a new window.
 * @type {boolean}
 * @private
 */
LinkDialogPlugin.prototype.showOpenLinkInNewWindow_ = false;


/**
 * Whether to focus the text to display input instead of the url input if the
 * text to display input is empty when the dialog opens.
 * @type {boolean}
 * @private
 */
LinkDialogPlugin.prototype
    .focusTextToDisplayOnOpenIfEmpty_ = false;

/**
 * Whether the "open link in new window" checkbox should be checked when the
 * dialog is shown, and also whether it was checked last time the dialog was
 * closed.
 * @type {boolean}
 * @private
 */
LinkDialogPlugin.prototype.isOpenLinkInNewWindowChecked_ =
    false;


/**
 * Weather to show a checkbox where the user can choose to add 'rel=nofollow'
 * attribute added to the link.
 * @type {boolean}
 * @private
 */
LinkDialogPlugin.prototype.showRelNoFollow_ = false;


/**
 * Whether to stop referrer leaks.  Defaults to false.
 * @type {boolean}
 * @private
 */
LinkDialogPlugin.prototype.stopReferrerLeaks_ = false;


/**
 * Whether to prevent access to the opener window in the new window to prevent
 * reverse tabnabbing. Defaults to false.
 * @private {boolean}
 */
LinkDialogPlugin.prototype.stopTabNabbing_ = false;


/**
 * Whether to block opening links with a non-whitelisted URL scheme.
 * @type {boolean}
 * @private
 */
LinkDialogPlugin.prototype.blockOpeningUnsafeSchemes_ =
    true;


/** @override */
LinkDialogPlugin.prototype.getTrogClassId =
    functions.constant('LinkDialogPlugin');


/**
 * Tells the plugin whether to block URLs with schemes not in the whitelist.
 * If blocking is enabled, this plugin will stop the 'Test Link' popup
 * window from being created. Blocking doesn't affect link creation--if the
 * user clicks the 'OK' button with an unsafe URL, the link will still be
 * created as normal.
 * @param {boolean} blockOpeningUnsafeSchemes Whether to block non-whitelisted
 *     schemes.
 */
LinkDialogPlugin.prototype.setBlockOpeningUnsafeSchemes =
    function(blockOpeningUnsafeSchemes) {
      this.blockOpeningUnsafeSchemes_ = blockOpeningUnsafeSchemes;
    };


/**
 * Sets a whitelist of allowed URL schemes that are safe to open.
 * Schemes should all be in lowercase. If the plugin is set to block opening
 * unsafe schemes, user-entered URLs will be converted to lowercase and checked
 * against this list. The whitelist has no effect if blocking is not enabled.
 * @param {Array<string>} schemes String array of URL schemes to allow (http,
 *     https, etc.).
 */
LinkDialogPlugin.prototype.setSafeToOpenSchemes = function(
    schemes) {
  this.safeToOpenSchemes_ = schemes;
};


/**
 * Tells the dialog to show a checkbox where the user can choose to have the
 * link open in a new window.
 * @param {boolean} startChecked Whether to check the checkbox the first
 *     time the dialog is shown. Subesquent times the checkbox will remember its
 *     previous state.
 */
LinkDialogPlugin.prototype.showOpenLinkInNewWindow =
    function(startChecked) {
      this.showOpenLinkInNewWindow_ = true;
      this.isOpenLinkInNewWindowChecked_ = startChecked;
    };


/**
 * Tells the dialog to focus the text to display input instead of the url field
 * if the text to display input is empty when the dialog is opened.
 */
LinkDialogPlugin.prototype.focusTextToDisplayOnOpenIfEmpty =
    function() {
      this.focusTextToDisplayOnOpenIfEmpty_ = true;
    };


/**
 * Tells the dialog to show a checkbox where the user can choose to have
 * 'rel=nofollow' attribute added to the link.
 */
LinkDialogPlugin.prototype.showRelNoFollow = function() {
  this.showRelNoFollow_ = true;
};


/**
 * Returns whether the"open link in new window" checkbox was checked last time
 * the dialog was closed.
 * @return {boolean} Whether the"open link in new window" checkbox was checked
 *     last time the dialog was closed.
 */
LinkDialogPlugin.prototype
    .getOpenLinkInNewWindowCheckedState = function() {
  return this.isOpenLinkInNewWindowChecked_;
};


/**
 * Tells the plugin to stop leaking the page's url via the referrer header when
 * the "test this link" link is clicked. When the user clicks on a link, the
 * browser makes a request for the link url, passing the url of the current page
 * in the request headers. If the user wants the current url to be kept secret
 * (e.g. an unpublished document), the owner of the url that was clicked will
 * see the secret url in the request headers, and it will no longer be a secret.
 * Calling this method will not send a referrer header in the request, just as
 * if the user had opened a blank window and typed the url in themselves.
 */
LinkDialogPlugin.prototype.stopReferrerLeaks = function() {
  this.stopReferrerLeaks_ = true;
};


/**
 * Tells the plugin to stop leaving a reference to the current window in windows
 * opened when "Test this link" is clicked. Otherwise, the reference can be used
 * to launch a reverse tabnabbing attack.
 */
LinkDialogPlugin.prototype.stopTabNabbing = function() {
  this.stopTabNabbing_ = true;
};


/**
 * Sets the warning message to show to users about including email addresses on
 * public web pages.
 * @param {!SafeHtml} emailWarning Warning message to show users about
 *     including email addresses on the web.
 */
LinkDialogPlugin.prototype.setEmailWarning = function(
    emailWarning) {
  this.emailWarning_ = emailWarning;
};


/**
 * Handles execCommand by opening the dialog.
 * @param {string} command The command to execute.
 * @param {*=} opt_arg {@link A Link} object representing the link
 *     being edited.
 * @return {*} Always returns true, indicating the dialog was shown.
 * @protected
 * @override
 */
LinkDialogPlugin.prototype.execCommandInternal = function(
    command, opt_arg) {
  this.currentLink_ = /** @type {Link} */ (opt_arg);
  return LinkDialogPlugin.base(
      this, 'execCommandInternal', command, opt_arg);
};


/**
 * Handles when the dialog closes.
 * @param {Event} e The AFTER_HIDE event object.
 * @override
 * @protected
 */
LinkDialogPlugin.prototype.handleAfterHide = function(e) {
  LinkDialogPlugin.base(this, 'handleAfterHide', e);
  this.currentLink_ = null;
};


/**
 * @return {EventHandler<T>} The event handler.
 * @protected
 * @this {T}
 * @template T
 */
LinkDialogPlugin.prototype.getEventHandler = function() {
  return this.eventHandler_;
};


/**
 * @return {Link} The link being edited.
 * @protected
 */
LinkDialogPlugin.prototype.getCurrentLink = function() {
  return this.currentLink_;
};


/**
 * Creates a new instance of the dialog and registers for the relevant events.
 * @param {dom.DomHelper} dialogDomHelper The dom helper to be used to
 *     create the dialog.
 * @param {*=} opt_link The target link (should be a Link).
 * @return {!LinkDialog} The dialog.
 * @override
 * @protected
 */
LinkDialogPlugin.prototype.createDialog = function(
    dialogDomHelper, opt_link) {
  var dialog = new LinkDialog(
      dialogDomHelper,
      /** @type {Link} */ (opt_link));
  if (this.emailWarning_) {
    dialog.setEmailWarning(this.emailWarning_);
  }
  if (this.showOpenLinkInNewWindow_) {
    dialog.showOpenLinkInNewWindow(this.isOpenLinkInNewWindowChecked_);
  }
  if (this.focusTextToDisplayOnOpenIfEmpty_) {
    dialog.focusTextToDisplayOnOpenIfEmpty();
  }
  if (this.showRelNoFollow_) {
    dialog.showRelNoFollow();
  }
  dialog.setStopReferrerLeaks(this.stopReferrerLeaks_);
  dialog.setStopTabNabbing(this.stopTabNabbing_);
  this.eventHandler_
      .listen(dialog, AbstractDialog.EventType.OK, this.handleOk)
      .listen(
          dialog, AbstractDialog.EventType.CANCEL,
          this.handleCancel)
      .listen(
          dialog, LinkDialog.EventType.BEFORE_TEST_LINK,
          this.handleBeforeTestLink);
  return dialog;
};


/** @override */
LinkDialogPlugin.prototype.disposeInternal = function() {
  LinkDialogPlugin.base(this, 'disposeInternal');
  this.eventHandler_.dispose();
};


/**
 * Handles the OK event from the dialog by updating the link in the field.
 * @param {LinkDialog.OkEvent} e OK event object.
 * @protected
 */
LinkDialogPlugin.prototype.handleOk = function(e) {
  // We're not restoring the original selection, so clear it out.
  this.disposeOriginalSelection();

  this.currentLink_.setTextAndUrl(e.linkText, e.linkUrl);
  if (this.showOpenLinkInNewWindow_) {
    // Save checkbox state for next time.
    this.isOpenLinkInNewWindowChecked_ = e.openInNewWindow;
  }

  var anchor = this.currentLink_.getAnchor();
  this.touchUpAnchorOnOk_(anchor, e);
  var extraAnchors = this.currentLink_.getExtraAnchors();
  for (var i = 0; i < extraAnchors.length; ++i) {
    extraAnchors[i].href = anchor.href;
    this.touchUpAnchorOnOk_(extraAnchors[i], e);
  }

  // Place cursor to the right of the modified link.
  this.currentLink_.placeCursorRightOf();

  this.getFieldObject().focus();

  this.getFieldObject().dispatchSelectionChangeEvent();
  this.getFieldObject().dispatchChange();

  this.eventHandler_.removeAll();
};


/**
 * Apply the necessary properties to a link upon Ok being clicked in the dialog.
 * @param {HTMLAnchorElement} anchor The anchor to set properties on.
 * @param {Event} e Event object.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
LinkDialogPlugin.prototype.touchUpAnchorOnOk_ = function(
    anchor, e) {
  if (this.showOpenLinkInNewWindow_) {
    if (e.openInNewWindow) {
      anchor.target = '_blank';
    } else {
      if (anchor.target == '_blank') {
        anchor.target = '';
      }
      // If user didn't indicate to open in a new window but the link already
      // had a target other than '_blank', let's leave what they had before.
    }
  }

  if (this.showRelNoFollow_) {
    var alreadyPresent = LinkDialog.hasNoFollow(anchor.rel);
    if (alreadyPresent && !e.noFollow) {
      anchor.rel = LinkDialog.removeNoFollow(anchor.rel);
    } else if (!alreadyPresent && e.noFollow) {
      anchor.rel = anchor.rel ? anchor.rel + ' nofollow' : 'nofollow';
    }
  }
};


/**
 * Handles the CANCEL event from the dialog by clearing the anchor if needed.
 * @param {Event} e Event object.
 * @protected
 */
LinkDialogPlugin.prototype.handleCancel = function(e) {
  if (this.currentLink_.isNew()) {
    dom.flattenElement(this.currentLink_.getAnchor());
    var extraAnchors = this.currentLink_.getExtraAnchors();
    for (var i = 0; i < extraAnchors.length; ++i) {
      dom.flattenElement(extraAnchors[i]);
    }
    // Make sure listeners know the anchor was flattened out.
    this.getFieldObject().dispatchChange();
  }

  this.eventHandler_.removeAll();
};


/**
 * Handles the BeforeTestLink event fired when the 'test' link is clicked.
 * @param {LinkDialog.BeforeTestLinkEvent} e BeforeTestLink event
 *     object.
 * @protected
 */
LinkDialogPlugin.prototype.handleBeforeTestLink = function(
    e) {
  if (!this.shouldOpenUrl(e.url)) {
    /** @desc Message when the user tries to test (preview) a link, but the
     * link cannot be tested. */
    var MSG_UNSAFE_LINK = goog.getMsg('This link cannot be tested.');
    alert(MSG_UNSAFE_LINK);
    e.preventDefault();
  }
};


/**
 * Checks whether the plugin should open the given url in a new window.
 * @param {string} url The url to check.
 * @return {boolean} If the plugin should open the given url in a new window.
 * @protected
 */
LinkDialogPlugin.prototype.shouldOpenUrl = function(url) {
  return !this.blockOpeningUnsafeSchemes_ || this.isSafeSchemeToOpen_(url);
};


/**
 * Determines whether or not a url has a scheme which is safe to open.
 * Schemes like javascript are unsafe due to the possibility of XSS.
 * @param {string} url A url.
 * @return {boolean} Whether the url has a safe scheme.
 * @private
 */
LinkDialogPlugin.prototype.isSafeSchemeToOpen_ = function(
    url) {
  var scheme = utils.getScheme(url) || 'http';
  return array.contains(this.safeToOpenSchemes_, scheme.toLowerCase());
};
