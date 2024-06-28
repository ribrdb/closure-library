/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A utility class for managing editable links.
 */

goog.declareModuleId('goog.editor.link');

import * as dom from '../dom/dom.js';
import { NodeType } from '../dom/nodetype.js';
import { TagName } from '../dom/tagname.js';
import { Command } from './command.js';
import { Field } from './field.js';
import * as node from './node.js';
import * as range from './range.js';
import * as googString from '../string/string.js';
import * as utils from '../uri/utils.js';
import { ComponentIndex } from '../uri/utils.js';



/**
 * Wrap an editable link.
 * @param {HTMLAnchorElement} anchor The anchor element.
 * @param {boolean} isNew Whether this is a new link.
 * @constructor
 * @final
 */
export function Link(anchor, isNew) {
  /**
   * The link DOM element.
   * @type {HTMLAnchorElement}
   * @private
   */
  this.anchor_ = anchor;

  /**
   * Whether this link represents a link just added to the document.
   * @type {boolean}
   * @private
   */
  this.isNew_ = isNew;


  /**
   * Any extra anchors created by the browser from a selection in the same
   * operation that created the primary link
   * @type {!Array<HTMLAnchorElement>}
   * @private
   */
  this.extraAnchors_ = [];
}


/**
 * @return {HTMLAnchorElement} The anchor element.
 */
Link.prototype.getAnchor = function() {
  return this.anchor_;
};


/**
 * @return {!Array<HTMLAnchorElement>} The extra anchor elements, if any,
 *     created by the browser from a selection.
 */
Link.prototype.getExtraAnchors = function() {
  return this.extraAnchors_;
};


/**
 * @return {string} The inner text for the anchor.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Link.prototype.getCurrentText = function() {
  if (!this.currentText_) {
    var anchor = this.getAnchor();

    var leaf = node.getLeftMostLeaf(anchor);
    if (leaf.tagName && leaf.tagName == TagName.IMG) {
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      this.currentText_ = leaf.getAttribute('alt') || '';
    } else {
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      this.currentText_ = dom.getRawTextContent(this.getAnchor());
    }
  }
  return this.currentText_;
};


/**
 * @return {boolean} Whether the link is new.
 */
Link.prototype.isNew = function() {
  return this.isNew_;
};


/**
 * Set the url without affecting the isNew() status of the link.
 * @param {string} url A URL.
 */
Link.prototype.initializeUrl = function(url) {
  this.getAnchor().href = url;
};


/**
 * Removes the link, leaving its contents in the document.  Note that this
 * object will no longer be usable/useful after this call.
 */
Link.prototype.removeLink = function() {
  dom.flattenElement(this.anchor_);
  this.anchor_ = null;
  while (this.extraAnchors_.length) {
    dom.flattenElement(/** @type {Element} */ (this.extraAnchors_.pop()));
  }
};


/**
 * Change the link.
 * @param {string} newText New text for the link. If the link contains all its
 *     text in one descendant, newText will only replace the text in that
 *     one node. Otherwise, we'll change the innerHTML of the whole
 *     link to newText.
 * @param {string} newUrl A new URL.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Link.prototype.setTextAndUrl = function(newText, newUrl) {
  var anchor = this.getAnchor();
  anchor.href = newUrl;

  // If the text did not change, don't update link text.
  var currentText = this.getCurrentText();
  if (newText != currentText) {
    var leaf = node.getLeftMostLeaf(anchor);

    if (leaf.tagName && leaf.tagName == TagName.IMG) {
      leaf.setAttribute('alt', newText ? newText : '');
    } else {
      if (leaf.nodeType == NodeType.TEXT) {
        leaf = leaf.parentNode;
      }

      if (dom.getRawTextContent(leaf) != currentText) {
        leaf = anchor;
      }

      dom.removeChildren(leaf);
      var domHelper = dom.getDomHelper(leaf);
      dom.appendChild(leaf, domHelper.createTextNode(newText));
    }

    // The text changed, so force getCurrentText to recompute.
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.currentText_ = null;
  }

  this.isNew_ = false;
};


/**
 * Places the cursor to the right of the anchor.
 * Note that this is different from range's placeCursorNextTo
 * in that it specifically handles the placement of a cursor in browsers
 * that trap you in links, by adding a space when necessary and placing the
 * cursor after that space.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Link.prototype.placeCursorRightOf = function() {
  range.placeCursorNextTo(this.getAnchor(), false);
};


/**
 * Updates the cursor position and link bubble for this link.
 * @param {Field} field The field in which the link is created.
 * @param {string} url The link url.
 * @private
 */
Link.prototype.updateLinkDisplay_ = function(field, url) {
  this.initializeUrl(url);
  this.placeCursorRightOf();
  field.execCommand(Command.UPDATE_LINK_BUBBLE);
};


/**
 * @return {string?} The modified string for the link if the link
 *     text appears to be a valid link. Returns null if this is not
 *     a valid link address.
 */
Link.prototype.getValidLinkFromText = function() {
  var text = googString.trim(this.getCurrentText());
  if (Link.isLikelyUrl(text)) {
    if (text.search(/:/) < 0) {
      return 'http://' + googString.trimLeft(text);
    }
    return text;
  } else if (Link.isLikelyEmailAddress(text)) {
    return 'mailto:' + text;
  }
  return null;
};


/**
 * After link creation, finish creating the link depending on the type
 * of link being created.
 * @param {Field} field The field where this link is being created.
 */
Link.prototype.finishLinkCreation = function(field) {
  var linkFromText = this.getValidLinkFromText();
  if (linkFromText) {
    this.updateLinkDisplay_(field, linkFromText);
  } else {
    field.execCommand(Command.MODAL_LINK_EDITOR, this);
  }
};


/**
 * Initialize a new link.
 * @param {HTMLAnchorElement} anchor The anchor element.
 * @param {string} url The initial URL.
 * @param {string=} opt_target The target.
 * @param {Array<HTMLAnchorElement>=} opt_extraAnchors Extra anchors created
 *     by the browser when parsing a selection.
 * @return {!Link} The link.
 */
Link.createNewLink = function(
    anchor, url, opt_target, opt_extraAnchors) {
  var link = new Link(anchor, true);
  link.initializeUrl(url);

  if (opt_target) {
    anchor.target = opt_target;
  }
  if (opt_extraAnchors) {
    link.extraAnchors_ = opt_extraAnchors;
  }

  return link;
};


/**
 * Initialize a new link using text in anchor, or empty string if there is no
 * likely url in the anchor.
 * @param {HTMLAnchorElement} anchor The anchor element with likely url content.
 * @param {string=} opt_target The target.
 * @return {!Link} The link.
 */
Link.createNewLinkFromText = function(anchor, opt_target) {
  var link = new Link(anchor, true);
  var text = link.getValidLinkFromText();
  link.initializeUrl(text ? text : '');
  if (opt_target) {
    anchor.target = opt_target;
  }
  return link;
};


/**
 * Returns true if str could be a URL, false otherwise
 *
 * Ex: TR_Util.isLikelyUrl_("http://www.google.com") == true
 *     TR_Util.isLikelyUrl_("www.google.com") == true
 *
 * @param {string} str String to check if it looks like a URL.
 * @return {boolean} Whether str could be a URL.
 */
Link.isLikelyUrl = function(str) {
  // Whitespace means this isn't a domain.
  if (/\s/.test(str)) {
    return false;
  }

  if (Link.isLikelyEmailAddress(str)) {
    return false;
  }

  // Add a scheme if the url doesn't have one - this helps the parser.
  var addedScheme = false;
  if (!/^[^:\/?#.]+:/.test(str)) {
    str = 'http://' + str;
    addedScheme = true;
  }

  // Parse the domain.
  var parts = utils.split(str);

  // Relax the rules for special schemes.
  var scheme = parts[ComponentIndex.SCHEME];
  if (['mailto', 'aim'].indexOf(scheme) != -1) {
    return true;
  }

  // Require domains to contain a '.', unless the domain is fully qualified and
  // forbids domains from containing invalid characters.
  var domain = parts[ComponentIndex.DOMAIN];
  if (!domain ||
      (addedScheme && (domain.indexOf('.') === -1 || domain.length < 3)) ||
      (/[^\w\d\-\u0100-\uffff.%]/.test(domain))) {
    return false;
  }

  // Require http and ftp paths to start with '/'.
  var path = parts[ComponentIndex.PATH];
  return !path || path.indexOf('/') == 0;
};


/**
 * Regular expression that matches strings that could be an email address.
 * @type {RegExp}
 * @private
 */
Link.LIKELY_EMAIL_ADDRESS_ = new RegExp(
    '^' +                         // Test from start of string
        '[\\w-]+(\\.[\\w-]+)*' +  // Dot-delimited alphanumerics and dashes
                                  // (name)
        '\\@' +                   // @
        '([\\w-]+\\.)+' +         // Alphanumerics, dashes and dots (domain)
        '(\\d+|\\w\\w+)$',  // Domain ends in at least one number or 2 letters
    'i');


/**
 * Returns true if str could be an email address, false otherwise
 *
 * Ex: Link.isLikelyEmailAddress_("some word") == false
 *     Link.isLikelyEmailAddress_("foo@foo.com") == true
 *
 * @param {string} str String to test for being email address.
 * @return {boolean} Whether "str" looks like an email address.
 */
Link.isLikelyEmailAddress = function(str) {
  return Link.LIKELY_EMAIL_ADDRESS_.test(str);
};


/**
 * Determines whether or not a url is an email link.
 * @param {string} url A url.
 * @return {boolean} Whether the url is a mailto link.
 */
Link.isMailto = function(url) {
  return !!url && googString.startsWith(url, 'mailto:');
};
