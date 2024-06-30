/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Base class for bubble plugins.
 */

import { Announcer } from '../../a11y/aria/announcer.js';

import { LivePriority } from '../../a11y/aria/attributes.js';
import * as array from '../../array/array.js';
import * as dom from '../../dom/dom.js';
import * as Range from '../../dom/range.js';
import { TagName } from '../../dom/tagname.js';
import { Command } from '../command.js';
import { Link } from '../link.js';
import { AbstractBubblePlugin } from './abstractbubbleplugin.js';
import * as functions from '../../functions/functions.js';
import * as googString from '../../string/string.js';
import * as style from '../../style/style.js';
import * as messages from '../../ui/editor/messages.js';
import * as utils from '../../uri/utils.js';
import * as window from '../../window/window.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * Property bubble plugin for links.
 * @param {...!LinkBubble.Action} var_args List of
 *     extra actions supported by the bubble.
 * @constructor
 * @extends {AbstractBubblePlugin}
 */
export function LinkBubble(var_args) {
  LinkBubble.base(this, 'constructor');

  /**
     * List of extra actions supported by the bubble.
     * @type {Array<!LinkBubble.Action>}
     * @private
     */
  this.extraActions_ = Array.prototype.slice.call(arguments);

  /**
   * List of spans corresponding to the extra actions.
   * @type {Array<!Element>}
   * @private
   */
  this.actionSpans_ = [];

  /**
   * A list of whitelisted URL schemes which are safe to open.
   * @type {Array<string>}
   * @private
   */
  this.safeToOpenSchemes_ = ['http', 'https', 'ftp'];

  /** @private @const {!Announcer} */
  this.announcer_ = new Announcer();
  this.registerDisposable(this.announcer_);
}
goog.inherits(
    LinkBubble, AbstractBubblePlugin);


/** @const @private {string} */
LinkBubble.DISABLE_LINK_BUBBLE_DATA_ATTRIBUTE_ = 'data-dlb';


/**
 * Element id for the link text.
 * type {string}
 * @private
 */
LinkBubble.LINK_TEXT_ID_ = 'tr_link-text';


/**
 * Element id for the test link span.
 * type {string}
 * @private
 */
LinkBubble.TEST_LINK_SPAN_ID_ = 'tr_test-link-span';


/**
 * Element id for the test link.
 * type {string}
 * @private
 */
LinkBubble.TEST_LINK_ID_ = 'tr_test-link';


/**
 * Element id for the change link span.
 * type {string}
 * @private
 */
LinkBubble.CHANGE_LINK_SPAN_ID_ = 'tr_change-link-span';


/**
 * Element id for the link.
 * type {string}
 * @private
 */
LinkBubble.CHANGE_LINK_ID_ = 'tr_change-link';


/**
 * Element id for the delete link span.
 * type {string}
 * @private
 */
LinkBubble.DELETE_LINK_SPAN_ID_ = 'tr_delete-link-span';


/**
 * Element id for the delete link.
 * type {string}
 * @private
 */
LinkBubble.DELETE_LINK_ID_ = 'tr_delete-link';


/**
 * Element id for the link bubble wrapper div.
 * type {string}
 * @private
 */
LinkBubble.LINK_DIV_ID_ = 'tr_link-div';


/**
 * @desc Text label for link that lets the user click it to see where the link
 *     this bubble is for point to.
 */
const MSG_LINK_BUBBLE_TEST_LINK = goog.getMsg('Go to link: ');


/**
 * @desc Label that pops up a dialog to change the link.
 */
const MSG_LINK_BUBBLE_CHANGE = goog.getMsg('Change');


/**
 * @desc Label that allow the user to remove this link.
 */
const MSG_LINK_BUBBLE_REMOVE = goog.getMsg('Remove');


/**
 * @desc Message shown in a link bubble when the link is not a valid url.
 */
const MSG_INVALID_URL_LINK_BUBBLE = goog.getMsg('invalid url');


/** @desc Screen reader announcement that a link has been removed. */
const MSG_LINK_BUBBLE_REMOVE_ANNOUNCEMENT =
    goog.getMsg('Removed link.');


/**
 * @param {!Element} targetElement
 * @return {boolean}
 * @private
 */
LinkBubble.shouldShowLinkBubble_ = function(targetElement) {
  return !targetElement.hasAttribute(
      LinkBubble.DISABLE_LINK_BUBBLE_DATA_ATTRIBUTE_);
};


/**
 * Whether to stop leaking the page's url via the referrer header when the
 * link text link is clicked.
 * @type {boolean}
 * @private
 */
LinkBubble.prototype.stopReferrerLeaks_ = false;


/**
 * Whether to block opening links with a non-whitelisted URL scheme.
 * @type {boolean}
 * @private
 */
LinkBubble.prototype.blockOpeningUnsafeSchemes_ = true;


/**
 * Tells the plugin to stop leaking the page's url via the referrer header when
 * the link text link is clicked. When the user clicks on a link, the
 * browser makes a request for the link url, passing the url of the current page
 * in the request headers. If the user wants the current url to be kept secret
 * (e.g. an unpublished document), the owner of the url that was clicked will
 * see the secret url in the request headers, and it will no longer be a secret.
 * Calling this method will not send a referrer header in the request, just as
 * if the user had opened a blank window and typed the url in themselves.
 */
LinkBubble.prototype.stopReferrerLeaks = function() {
  // TODO(user): Right now only 2 plugins have this API to stop
  // referrer leaks. If more plugins need to do this, come up with a way to
  // enable the functionality in all plugins at once. Same thing for
  // setBlockOpeningUnsafeSchemes and associated functionality.
  this.stopReferrerLeaks_ = true;
};


/**
 * Tells the plugin whether to block URLs with schemes not in the whitelist.
 * If blocking is enabled, this plugin will not linkify the link in the bubble
 * popup.
 * @param {boolean} blockOpeningUnsafeSchemes Whether to block non-whitelisted
 *     schemes.
 */
LinkBubble.prototype.setBlockOpeningUnsafeSchemes =
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
LinkBubble.prototype.setSafeToOpenSchemes = function(
    schemes) {
  this.safeToOpenSchemes_ = schemes;
};


/** @override */
LinkBubble.prototype.getTrogClassId = function() {
  return 'LinkBubble';
};


/** @override */
LinkBubble.prototype.isSupportedCommand = function(
    command) {
  return command == Command.UPDATE_LINK_BUBBLE;
};


/** @override */
LinkBubble.prototype.execCommandInternal = function(
    command, var_args) {
  if (command == Command.UPDATE_LINK_BUBBLE) {
    this.updateLink_();
  }
};


/**
 * Updates the href in the link bubble with a new link.
 * @private
 */
LinkBubble.prototype.updateLink_ = function() {
  var targetEl = this.getTargetElement();
  if (targetEl) {
    this.closeBubble();
    this.createBubble(targetEl);
  }
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
LinkBubble.prototype.getBubbleTargetFromSelection =
    function(selectedElement) {
      var bubbleTarget = dom.getAncestorByTagNameAndClass(
          selectedElement, TagName.A);

      if (!bubbleTarget) {
        // See if the selection is touching the right side of a link, and if so,
        // show a bubble for that link.  The check for "touching" is very brittle,
        // and currently only guarantees that it will pop up a bubble at the
        // position the cursor is placed at after the link dialog is closed.
        // NOTE(robbyw): This assumes this method is always called with
        // selected element = range.getContainerElement().  Right now this is true,
        // but attempts to re-use this method for other purposes could cause issues.
        // TODO(robbyw): Refactor this method to also take a range, and use that.
        var range = this.getFieldObject().getRange();
        if (range && range.isCollapsed() && range.getStartOffset() == 0) {
          var startNode = range.getStartNode();
          var previous = startNode.previousSibling;
          if (previous && previous.tagName == TagName.A) {
            bubbleTarget = previous;
          }
        }
      }

      return /** @type {Element} */ (bubbleTarget);
    };


/**
 * Set the optional function for getting the "test" link of a url.
 * @param {function(string) : string} func The function to use.
 */
LinkBubble.prototype.setTestLinkUrlFn = function(func) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.testLinkUrlFn_ = func;
};


/**
 * Returns the target element url for the bubble.
 * @return {string} The url href.
 * @protected
 */
LinkBubble.prototype.getTargetUrl = function() {
  // Get the href-attribute through getAttribute() rather than the href property
  // because Google-Toolbar on Firefox with "Send with Gmail" turned on
  // modifies the href-property of 'mailto:' links but leaves the attribute
  // untouched.
  return this.getTargetElement().getAttribute('href') || '';
};


/** @override */
LinkBubble.prototype.getBubbleType = function() {
  return String(TagName.A);
};


/** @override */
LinkBubble.prototype.getBubbleTitle = function() {
  return messages.MSG_LINK_CAPTION;
};


/**
 * Returns the message to display for testing a link.
 * @return {string} The message for testing a link.
 * @protected
 */
LinkBubble.prototype.getTestLinkMessage = function() {
  return MSG_LINK_BUBBLE_TEST_LINK;
};

/** @override */
LinkBubble.prototype.handleSelectionChangeInternal =
    function(selectedElement) {
      if (selectedElement) {
        var bubbleTarget = this.getBubbleTargetFromSelection(selectedElement);
        if (bubbleTarget &&
            !LinkBubble.shouldShowLinkBubble_(bubbleTarget)) {
          return false;
        }
      }

      return LinkBubble.base(
          this, 'handleSelectionChangeInternal', selectedElement);
    };


/**
 * @override
 * @suppress {missingProperties} dom_ isn't declared
 */
LinkBubble.prototype.createBubbleContents = function(
    bubbleContainer) {
  var linkObj = this.getLinkToTextObj_();

  // Create linkTextSpan, show plain text for e-mail address or truncate the
  // text to <= 48 characters so that property bubbles don't grow too wide and
  // create a link if URL.  Only linkify valid links.
  // TODO(robbyw): Repalce this color with a CSS class.
  var color = linkObj.valid ? 'black' : 'red';
  var shouldOpenUrl = this.shouldOpenUrl(linkObj.linkText);
  var linkTextSpan;
  if (Link.isLikelyEmailAddress(linkObj.linkText) ||
      !linkObj.valid || !shouldOpenUrl) {
    linkTextSpan = this.dom_.createDom(
        TagName.SPAN, {
          id: LinkBubble.LINK_TEXT_ID_,
          style: 'color:' + color
        },
        this.dom_.createTextNode(linkObj.linkText));
  } else {
    var testMsgSpan = this.dom_.createDom(
        TagName.SPAN,
        {id: LinkBubble.TEST_LINK_SPAN_ID_},
        this.getTestLinkMessage());
    linkTextSpan = this.dom_.createDom(
        TagName.SPAN, {
          id: LinkBubble.LINK_TEXT_ID_,
          style: 'color:' + color
        },
        '');
    var linkText = googString.truncateMiddle(linkObj.linkText, 48);
    // Actually creates a pseudo-link that can't be right-clicked to open in a
    // new tab, because that would avoid the logic to stop referrer leaks.
    this.createLink(
        LinkBubble.TEST_LINK_ID_,
        this.dom_.createTextNode(linkText).data, this.testLink, linkTextSpan);
  }

  var changeLinkSpan = this.createLinkOption(
      LinkBubble.CHANGE_LINK_SPAN_ID_);
  this.createLink(
      LinkBubble.CHANGE_LINK_ID_,
      MSG_LINK_BUBBLE_CHANGE,
      this.showLinkDialog_, changeLinkSpan);

  // This function is called multiple times - we have to reset the array.
  this.actionSpans_ = [];
  for (var i = 0; i < this.extraActions_.length; i++) {
    var action = this.extraActions_[i];
    var actionSpan = this.createLinkOption(action.spanId_);
    this.actionSpans_.push(actionSpan);
    this.createLink(action.linkId_, action.message_, function() {
      action.actionFn_(this.getTargetUrl());
    }, actionSpan);
  }

  var removeLinkSpan = this.createLinkOption(
      LinkBubble.DELETE_LINK_SPAN_ID_);
  this.createLink(
      LinkBubble.DELETE_LINK_ID_,
      MSG_LINK_BUBBLE_REMOVE, this.deleteLink_,
      removeLinkSpan);

  this.onShow();

  var bubbleContents = this.dom_.createDom(
      TagName.DIV, {id: LinkBubble.LINK_DIV_ID_},
      testMsgSpan || '', linkTextSpan, changeLinkSpan);

  for (i = 0; i < this.actionSpans_.length; i++) {
    bubbleContents.appendChild(this.actionSpans_[i]);
  }
  bubbleContents.appendChild(removeLinkSpan);

  dom.appendChild(bubbleContainer, bubbleContents);
};


/**
 * Tests the link by opening it in a new tab/window. Should be used as the
 * click event handler for the test pseudo-link.
 * @param {!Event=} opt_event If passed in, the event will be stopped.
 * @protected
 */
LinkBubble.prototype.testLink = function(opt_event) {
  window.open(
      this.getTestLinkAction_(),
      {'target': '_blank', 'noreferrer': this.stopReferrerLeaks_},
      this.getFieldObject().getAppWindow());
  if (opt_event) {
    opt_event.stopPropagation();
    opt_event.preventDefault();
  }
};


/**
 * Returns whether the URL should be considered invalid.  This always returns
 * false in the base class, and should be overridden by subclasses that wish
 * to impose validity rules on URLs.
 * @param {string} url The url to check.
 * @return {boolean} Whether the URL should be considered invalid.
 */
LinkBubble.prototype.isInvalidUrl = functions.FALSE;


/**
 * Gets the text to display for a link, based on the type of link
 * @return {!Object} Returns an object of the form:
 *     {linkText: displayTextForLinkTarget, valid: ifTheLinkIsValid}.
 * @private
 */
LinkBubble.prototype.getLinkToTextObj_ = function() {
  var isError;
  var targetUrl = this.getTargetUrl();

  if (this.isInvalidUrl(targetUrl)) {
    targetUrl = MSG_INVALID_URL_LINK_BUBBLE;
    isError = true;
  } else if (Link.isMailto(targetUrl)) {
    targetUrl = targetUrl.substring(7);  // 7 == "mailto:".length
  }

  return {linkText: targetUrl, valid: !isError};
};


/**
 * Shows the link dialog.
 * @param {BrowserEvent} e The event.
 * @private
 */
LinkBubble.prototype.showLinkDialog_ = function(e) {
  // Needed when this occurs due to an ENTER key event, else the newly created
  // dialog manages to have its OK button pressed, causing it to disappear.
  e.preventDefault();

  this.getFieldObject().execCommand(
      Command.MODAL_LINK_EDITOR,
      new Link(
          /** @type {HTMLAnchorElement} */ (this.getTargetElement()), false));
  this.closeBubble();
};


/**
 * Deletes the link associated with the bubble
 * @param {BrowserEvent} e The event.
 * @private
 */
LinkBubble.prototype.deleteLink_ = function(e) {
  // Needed when this occurs due to an ENTER key event, else the editor receives
  // the key press and inserts a newline.
  e.preventDefault();

  this.getFieldObject().dispatchBeforeChange();

  var link = this.getTargetElement();
  var child = link.lastChild;
  dom.flattenElement(link);

  var restoreScrollPosition = this.saveScrollPosition();
  var range = Range.createFromNodeContents(child);
  range.collapse(false);
  range.select();

  this.closeBubble();

  this.getFieldObject().dispatchChange();
  this.getFieldObject().focus();
  restoreScrollPosition();

  this.announcer_.say(
      MSG_LINK_BUBBLE_REMOVE_ANNOUNCEMENT,
      LivePriority.ASSERTIVE);
};


/**
 * Sets the proper state for the action links.
 * @protected
 * @override
 * @suppress {missingProperties} dom_ is not declared
 */
LinkBubble.prototype.onShow = function() {
  var linkDiv =
      this.dom_.getElement(LinkBubble.LINK_DIV_ID_);
  if (linkDiv) {
    var testLinkSpan =
        this.dom_.getElement(LinkBubble.TEST_LINK_SPAN_ID_);
    if (testLinkSpan) {
      var url = this.getTargetUrl();
      style.setElementShown(testLinkSpan, !Link.isMailto(url));
    }

    for (var i = 0; i < this.extraActions_.length; i++) {
      var action = this.extraActions_[i];
      var actionSpan = this.dom_.getElement(action.spanId_);
      if (actionSpan) {
        style.setElementShown(
            actionSpan, action.toShowFn_(this.getTargetUrl()));
      }
    }
  }
};


/**
 * Gets the url for the bubble test link.  The test link is the link in the
 * bubble the user can click on to make sure the link they entered is correct.
 * @return {string} The url for the bubble link href.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
LinkBubble.prototype.getTestLinkAction_ = function() {
  var targetUrl = this.getTargetUrl();
  return this.testLinkUrlFn_ ? this.testLinkUrlFn_(targetUrl) : targetUrl;
};


/**
 * Checks whether the plugin should open the given url in a new window.
 * @param {string} url The url to check.
 * @return {boolean} If the plugin should open the given url in a new window.
 * @protected
 */
LinkBubble.prototype.shouldOpenUrl = function(url) {
  return !this.blockOpeningUnsafeSchemes_ || this.isSafeSchemeToOpen_(url);
};


/**
 * Determines whether or not a url has a scheme which is safe to open.
 * Schemes like javascript are unsafe due to the possibility of XSS.
 * @param {string} url A url.
 * @return {boolean} Whether the url has a safe scheme.
 * @private
 */
LinkBubble.prototype.isSafeSchemeToOpen_ = function(url) {
  var scheme = utils.getScheme(url) || 'http';
  return array.contains(this.safeToOpenSchemes_, scheme.toLowerCase());
};



/**
 * Constructor for extra actions that can be added to the link bubble.
 * @param {string} spanId The ID for the span showing the action.
 * @param {string} linkId The ID for the link showing the action.
 * @param {string} message The text for the link showing the action.
 * @param {function(string):boolean} toShowFn Test function to determine whether
 *     to show the action for the given URL.
 * @param {function(string):void} actionFn Action function to run when the
 *     action is clicked.  Takes the current target URL as a parameter.
 * @constructor
 * @final
 */
LinkBubble.Action = function(
    spanId, linkId, message, toShowFn, actionFn) {
  this.spanId_ = spanId;
  this.linkId_ = linkId;
  this.message_ = message;
  this.toShowFn_ = toShowFn;
  this.actionFn_ = actionFn;
};
