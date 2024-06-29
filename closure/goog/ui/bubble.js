/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the Bubble class.
 *
 *
 * @see ../demos/bubble.html
 *
 * TODO: support decoration and addChild
 */

import { Timer } from '../timer/timer.js';

import * as safe from '../dom/safe.js';
import * as events from '../events/events.js';
import { EventType } from '../events/eventtype.js';
import { SafeHtml } from '../html/safehtml.js';
import { Box } from '../math/box.js';
import * as positioning from '../positioning/positioning.js';
import { Corner, CornerBit } from '../positioning/positioning.js';
import { AbsolutePosition } from '../positioning/absoluteposition.js';
import { AnchoredPosition } from '../positioning/anchoredposition.js';
import { Const } from '../string/const.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
import { Popup } from './popup.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { AbstractPosition } = goog.requireType('goog.positioning.abstractposition');


/**
 * The Bubble provides a general purpose bubble implementation that can be
 * anchored to a particular element and displayed for a period of time.
 *
 * @param {string|!SafeHtml|?Element} message Message or an element
 *     to display inside the bubble. Strings are treated as plain-text and will
 *     be HTML escaped.
 * @param {Object=} opt_config The configuration
 *     for the bubble. If not specified, the default configuration will be
 *     used. {@see Bubble.defaultConfig}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {Component}
 */
export function Bubble(message, opt_config, opt_domHelper) {
  Component.call(this, opt_domHelper);

  if (typeof message === 'string') {
    message = SafeHtml.htmlEscape(message);
  }

  /**
     * The HTML string or element to display inside the bubble.
     *
     * @type {!SafeHtml|Element}
     * @private
     */
  this.message_ = message;

  /**
     * The Popup element used to position and display the bubble.
     *
     * @type {Popup}
     * @private
     */
  this.popup_ = new Popup();

  /**
   * Configuration map that contains bubble's UI elements.
   *
   * @type {Object}
   * @private
   */
  this.config_ = opt_config || Bubble.defaultConfig;

  /**
   * Id of the close button for this bubble.
   *
   * @type {string}
   * @private
   */
  this.closeButtonId_ = this.makeId('cb');

  /**
   * Id of the div for the embedded element.
   *
   * @type {string}
   * @private
   */
  this.messageId_ = this.makeId('mi');
}
goog.inherits(Bubble, Component);


/**
 * In milliseconds, timeout after which the button auto-hides. Null means
 * infinite.
 * @type {?number}
 * @private
 */
Bubble.prototype.timeout_ = null;


/**
 * Key returned by the bubble timer.
 * @type {?number}
 * @private
 */
Bubble.prototype.timerId_ = 0;


/**
 * Key returned by the listen function for the close button.
 * @type {?events.Key}
 * @private
 */
Bubble.prototype.listener_ = null;



/** @override */
Bubble.prototype.createDom = function() {
  Bubble.superClass_.createDom.call(this);

  var element = this.getElement();
  element.style.position = 'absolute';
  element.style.visibility = 'hidden';

  this.popup_.setElement(element);
};


/**
 * Attaches the bubble to an anchor element. Computes the positioning and
 * orientation of the bubble.
 *
 * @param {Element} anchorElement The element to which we are attaching.
 */
Bubble.prototype.attach = function(anchorElement) {
  this.setAnchoredPosition_(
      anchorElement, this.computePinnedCorner_(anchorElement));
};


/**
 * Sets the corner of the bubble to used in the positioning algorithm.
 *
 * @param {Corner} corner The bubble corner used for
 *     positioning constants.
 */
Bubble.prototype.setPinnedCorner = function(corner) {
  this.popup_.setPinnedCorner(corner);
};


/**
 * Sets the position of the bubble. Pass null for corner in AnchoredPosition
 * for corner to be computed automatically.
 *
 * @param {AbstractPosition} position The position of the
 *     bubble.
 */
Bubble.prototype.setPosition = function(position) {
  if (position instanceof AbsolutePosition) {
    this.popup_.setPosition(position);
  } else if (position instanceof AnchoredPosition) {
    this.setAnchoredPosition_(position.element, position.corner);
  } else {
    throw new Error('Bubble only supports absolute and anchored positions!');
  }
};


/**
 * Sets the timeout after which bubble hides itself.
 *
 * @param {number} timeout Timeout of the bubble.
 */
Bubble.prototype.setTimeout = function(timeout) {
  this.timeout_ = timeout;
};


/**
 * Sets whether the bubble should be automatically hidden whenever user clicks
 * outside the bubble element.
 *
 * @param {boolean} autoHide Whether to hide if user clicks outside the bubble.
 */
Bubble.prototype.setAutoHide = function(autoHide) {
  this.popup_.setAutoHide(autoHide);
};


/**
 * Sets whether the bubble should be visible.
 *
 * @param {boolean} visible Desired visibility state.
 */
Bubble.prototype.setVisible = function(visible) {
  if (visible && !this.popup_.isVisible()) {
    this.configureElement_();
  }
  this.popup_.setVisible(visible);
  if (!this.popup_.isVisible()) {
    this.unconfigureElement_();
  }
};


/**
 * @return {boolean} Whether the bubble is visible.
 */
Bubble.prototype.isVisible = function() {
  return this.popup_.isVisible();
};


/** @override */
Bubble.prototype.disposeInternal = function() {
  this.unconfigureElement_();
  this.popup_.dispose();
  this.popup_ = null;
  Bubble.superClass_.disposeInternal.call(this);
};


/**
 * Creates element's contents and configures all timers. This is called on
 * setVisible(true).
 * @private
 */
Bubble.prototype.configureElement_ = function() {
  if (!this.isInDocument()) {
    throw new Error('You must render the bubble before showing it!');
  }

  var element = this.getElement();
  var corner = this.popup_.getPinnedCorner();
  safe.setInnerHtml(
      /** @type {!Element} */ (element), this.computeHtmlForCorner_(corner));

  if (!(this.message_ instanceof SafeHtml)) {
    var messageDiv = this.getDomHelper().getElement(this.messageId_);
    this.getDomHelper().appendChild(messageDiv, this.message_);
  }
  var closeButton = this.getDomHelper().getElement(this.closeButtonId_);
  this.listener_ = events.listen(
      closeButton, EventType.CLICK, this.hideBubble_, false, this);

  if (this.timeout_) {
    this.timerId_ = Timer.callOnce(this.hideBubble_, this.timeout_, this);
  }
};


/**
 * Gets rid of the element's contents and all associated timers and listeners.
 * This is called on dispose as well as on setVisible(false).
 * @private
 */
Bubble.prototype.unconfigureElement_ = function() {
  if (this.listener_) {
    events.unlistenByKey(this.listener_);
    this.listener_ = null;
  }
  if (this.timerId_) {
    Timer.clear(this.timerId_);
    this.timerId_ = null;
  }

  var element = this.getElement();
  if (element) {
    this.getDomHelper().removeChildren(element);
    safe.setInnerHtml(element, SafeHtml.EMPTY);
  }
};


/**
 * Computes bubble position based on anchored element.
 *
 * @param {Element} anchorElement The element to which we are attaching.
 * @param {Corner} corner The bubble corner used for
 *     positioning.
 * @private
 */
Bubble.prototype.setAnchoredPosition_ = function(
    anchorElement, corner) {
  this.popup_.setPinnedCorner(corner);
  var margin = this.createMarginForCorner_(corner);
  this.popup_.setMargin(margin);
  var anchorCorner = positioning.flipCorner(corner);
  this.popup_.setPosition(
      new AnchoredPosition(anchorElement, anchorCorner));
};


/**
 * Hides the bubble. This is called asynchronously by timer of event processor
 * for the mouse click on the close button.
 * @private
 */
Bubble.prototype.hideBubble_ = function() {
  this.setVisible(false);
};


/**
 * Returns an AnchoredPosition that will position the bubble optimally
 * given the position of the anchor element and the size of the viewport.
 *
 * @param {Element} anchorElement The element to which the bubble is attached.
 * @return {!AnchoredPosition} The AnchoredPosition
 *     to give to {@link #setPosition}.
 */
Bubble.prototype.getComputedAnchoredPosition = function(anchorElement) {
  return new AnchoredPosition(
      anchorElement, this.computePinnedCorner_(anchorElement));
};


/**
 * Computes the pinned corner for the bubble.
 * @param {Element} anchorElement The element to which the button is attached.
 * @return {Corner} The pinned corner.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Bubble.prototype.computePinnedCorner_ = function(anchorElement) {
  var doc = this.getDomHelper().getOwnerDocument(anchorElement);
  var viewportElement = style.getClientViewportElement(doc);
  var viewportWidth = viewportElement.offsetWidth;
  var viewportHeight = viewportElement.offsetHeight;
  var anchorElementOffset = style.getPageOffset(anchorElement);
  var anchorElementSize = style.getSize(anchorElement);
  var anchorType = 0;
  // right margin or left?
  if (viewportWidth - anchorElementOffset.x - anchorElementSize.width >
      anchorElementOffset.x) {
    anchorType += 1;
  }
  // attaches to the top or to the bottom?
  if (viewportHeight - anchorElementOffset.y - anchorElementSize.height >
      anchorElementOffset.y) {
    anchorType += 2;
  }
  return Bubble.corners_[anchorType];
};


/**
 * Computes the right offset for a given bubble corner
 * and creates a margin element for it. This is done to have the
 * button anchor element on its frame rather than on the corner.
 * @param {Corner} corner The corner.
 * @return {!Box} the computed margin. Only left or right fields are
 *     non-zero, but they may be negative.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Bubble.prototype.createMarginForCorner_ = function(corner) {
  var margin = new Box(0, 0, 0, 0);
  if (corner & CornerBit.RIGHT) {
    margin.right -= this.config_.marginShift;
  } else {
    margin.left -= this.config_.marginShift;
  }
  return margin;
};


/**
 * Computes the HTML string for a given bubble orientation.
 * @param {Corner} corner The corner.
 * @return {!SafeHtml} The HTML string to place inside the
 *     bubble's popup.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Bubble.prototype.computeHtmlForCorner_ = function(corner) {
  var bubbleTopClass;
  var bubbleBottomClass;
  switch (corner) {
    case Corner.TOP_LEFT:
      bubbleTopClass = this.config_.cssBubbleTopLeftAnchor;
      bubbleBottomClass = this.config_.cssBubbleBottomNoAnchor;
      break;
    case Corner.TOP_RIGHT:
      bubbleTopClass = this.config_.cssBubbleTopRightAnchor;
      bubbleBottomClass = this.config_.cssBubbleBottomNoAnchor;
      break;
    case Corner.BOTTOM_LEFT:
      bubbleTopClass = this.config_.cssBubbleTopNoAnchor;
      bubbleBottomClass = this.config_.cssBubbleBottomLeftAnchor;
      break;
    case Corner.BOTTOM_RIGHT:
      bubbleTopClass = this.config_.cssBubbleTopNoAnchor;
      bubbleBottomClass = this.config_.cssBubbleBottomRightAnchor;
      break;
    default:
      throw new Error('This corner type is not supported by bubble!');
  }
  var message = null;
  if (this.message_ instanceof SafeHtml) {
    message = this.message_;
  } else {
    message = SafeHtml.create('div', {'id': this.messageId_});
  }

  var tableRows = SafeHtml.concat(
      SafeHtml.create(
          'tr', {},
          SafeHtml.create(
              'td', {'colspan': 4, 'class': bubbleTopClass})),
      SafeHtml.create(
          'tr', {},
          SafeHtml.concat(
              SafeHtml.create(
                  'td', {'class': this.config_.cssBubbleLeft}),
              SafeHtml.create(
                  'td', {
                    'class': this.config_.cssBubbleFont,
                    'style':
                        Const.from('padding:0 4px;background:white')
                  },
                  message),
              SafeHtml.create('td', {
                'id': this.closeButtonId_,
                'class': this.config_.cssCloseButton
              }),
              SafeHtml.create(
                  'td', {'class': this.config_.cssBubbleRight}))),
      SafeHtml.create(
          'tr', {},
          SafeHtml.create(
              'td', {'colspan': 4, 'class': bubbleBottomClass})));

  return SafeHtml.create(
      'table', {
        'border': 0,
        'cellspacing': 0,
        'cellpadding': 0,
        'width': this.config_.bubbleWidth,
        'style': Const.from('z-index:1')
      },
      tableRows);
};


/**
 * A default configuration for the bubble.
 *
 * @type {Object}
 */
Bubble.defaultConfig = {
  bubbleWidth: 147,
  marginShift: 60,
  cssBubbleFont: goog.getCssName('goog-bubble-font'),
  cssCloseButton: goog.getCssName('goog-bubble-close-button'),
  cssBubbleTopRightAnchor: goog.getCssName('goog-bubble-top-right-anchor'),
  cssBubbleTopLeftAnchor: goog.getCssName('goog-bubble-top-left-anchor'),
  cssBubbleTopNoAnchor: goog.getCssName('goog-bubble-top-no-anchor'),
  cssBubbleBottomRightAnchor:
      goog.getCssName('goog-bubble-bottom-right-anchor'),
  cssBubbleBottomLeftAnchor: goog.getCssName('goog-bubble-bottom-left-anchor'),
  cssBubbleBottomNoAnchor: goog.getCssName('goog-bubble-bottom-no-anchor'),
  cssBubbleLeft: goog.getCssName('goog-bubble-left'),
  cssBubbleRight: goog.getCssName('goog-bubble-right')
};


/**
 * An auxiliary array optimizing the corner computation.
 *
 * @type {Array<Corner>}
 * @private
 */
Bubble.corners_ = [
  Corner.BOTTOM_RIGHT, Corner.BOTTOM_LEFT,
  Corner.TOP_RIGHT, Corner.TOP_LEFT
];
