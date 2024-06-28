/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Zippy widget implementation.
 *
 * @see ../demos/zippy.html
 */

import * as aria from '../a11y/aria/aria.js';

import { Role } from '../a11y/aria/roles.js';
import { State } from '../a11y/aria/attributes.js';
import { dispose } from '../disposable/dispose.js';
import * as dom from '../dom/dom.js';
import * as classlist from '../dom/classlist.js';
import { Event } from '../events/event.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
import { KeyCodes } from '../events/keycodes.js';
import { KeyHandler } from '../events/keyhandler.js';
import * as style from '../style/style.js';
const {BrowserEvent} = goog.requireType('goog.events.browserevent');



/**
 * Zippy widget. Expandable/collapsible container, clicking the header toggles
 * the visibility of the content.
 *
 * @extends {EventTarget}
 * @param {Element|string|null} header Header element, either element
 *     reference, string id or null if no header exists.
 * @param {Element|string|function():Element=} opt_content Content element
 *     (if any), either element reference or string id.  If skipped, the caller
 *     should handle the TOGGLE event in its own way. If a function is passed,
 *     then if will be called to create the content element the first time the
 *     zippy is expanded.
 * @param {boolean=} opt_expanded Initial expanded/visibility state. If
 *     undefined, attempts to infer the state from the DOM. Setting visibility
 *     using one of the standard Soy templates guarantees correct inference.
 * @param {Element|string=} opt_expandedHeader Element to use as the header when
 *     the zippy is expanded.
 * @param {dom.DomHelper=} opt_domHelper An optional DOM helper.
 * @param {Role<string>=} opt_role ARIA role, default TAB.
 * @constructor
 */
export function Zippy(
  header,
  opt_content,
  opt_expanded,
  opt_expandedHeader,
  opt_domHelper,
  opt_role
) {
  Zippy.base(this, 'constructor');

  /**
     * DomHelper used to interact with the document, allowing components to be
     * created in a different window.
     * @type {!dom.DomHelper}
     * @private
     */
  this.dom_ = opt_domHelper || dom.getDomHelper();

  /**
   * Header element or null if no header exists.
   * @type {Element}
   * @private
   */
  this.elHeader_ = this.dom_.getElement(header) || null;

  /**
   * When present, the header to use when the zippy is expanded.
   * @type {Element}
   * @private
   */
  this.elExpandedHeader_ = this.dom_.getElement(opt_expandedHeader || null);

  /**
   * Function that will create the content element, or false if there is no such
   * function.
   * @type {?function():Element}
   * @private
   */
  this.lazyCreateFunc_ = typeof opt_content === 'function' ? opt_content : null;

  /**
     * ARIA role.
     * @type {Role<string>}
     * @private
     */
  this.role_ = opt_role || Role.TAB;

  /**
   * Content element.
   * @type {Element}
   * @private
   */
  this.elContent_ = this.lazyCreateFunc_ || !opt_content ?
      null :
      this.dom_.getElement(/** @type {!Element} */ (opt_content));

  /**
   * Expanded state.
   * @type {boolean}
   * @private
   */
  this.expanded_ = opt_expanded == true;
  if (opt_expanded === undefined && !this.lazyCreateFunc_) {
    // For the dual caption case, we can get expanded_ from the visibility of
    // the expandedHeader. For the single-caption case, we use the
    // presence/absence of the relevant class. Using one of the standard Soy
    // templates guarantees that this will work.
    if (this.elExpandedHeader_) {
      this.expanded_ = style.isElementShown(this.elExpandedHeader_);
    } else if (this.elHeader_) {
      this.expanded_ = classlist.contains(
          this.elHeader_, goog.getCssName('goog-zippy-expanded'));
    }
  }


  /**
       * A keyboard events handler. If there are two headers it is shared for both.
       * @type {EventHandler<!Zippy>}
       * @private
       */
  this.keyboardEventHandler_ = new EventHandler(this);

  /**
     * The keyhandler used for listening on most key events. This takes care of
     * abstracting away some of the browser differences.
     * @private {!KeyHandler}
     */
  this.keyHandler_ = new KeyHandler();

  /**
       * A mouse events handler. If there are two headers it is shared for both.
       * @type {EventHandler<!Zippy>}
       * @private
       */
  this.mouseEventHandler_ = new EventHandler(this);

  var self = this;
  function addHeaderEvents(el) {
    if (el) {
      el.tabIndex = 0;
      aria.setRole(el, self.getAriaRole());
      classlist.add(el, goog.getCssName('goog-zippy-header'));
      self.enableMouseEventsHandling_(el);
      self.enableKeyboardEventsHandling_(el);
    }
  }
  addHeaderEvents(this.elHeader_);
  addHeaderEvents(this.elExpandedHeader_);

  // initialize based on expanded state
  this.setExpanded(this.expanded_);
}
goog.inherits(Zippy, EventTarget);


/**
 * Constants for event names
 *
 * @enum {string}
 */
Zippy.Events = {
  // Zippy will dispatch an ACTION event for user interaction. Mimics
  // `goog.ui.Controls#performActionInternal` by first changing
  // the toggle state and then dispatching an ACTION event.
  ACTION: 'action',
  // Zippy state is toggled from collapsed to expanded or vice versa.
  TOGGLE: 'toggle'
};


/**
 * Whether to listen for and handle mouse events; defaults to true.
 * @type {boolean}
 * @private
 */
Zippy.prototype.handleMouseEvents_ = true;


/**
 * Whether to listen for and handle key events; defaults to true.
 * @type {boolean}
 * @private
 */
Zippy.prototype.handleKeyEvents_ = true;


/** @override */
Zippy.prototype.disposeInternal = function() {
  Zippy.base(this, 'disposeInternal');
  dispose(this.keyboardEventHandler_);
  dispose(this.keyHandler_);
  dispose(this.mouseEventHandler_);
};


/**
 * @return {Role} The ARIA role to be applied to Zippy element.
 */
Zippy.prototype.getAriaRole = function() {
  return this.role_;
};


/**
 * @return {!HTMLElement} The content element.
 */
Zippy.prototype.getContentElement = function() {
  return /** @type {!HTMLElement} */ (this.elContent_);
};


/**
 * @return {Element} The visible header element.
 */
Zippy.prototype.getVisibleHeaderElement = function() {
  var expandedHeader = this.elExpandedHeader_;
  return expandedHeader && style.isElementShown(expandedHeader) ?
      expandedHeader :
      this.elHeader_;
};


/**
 * Expands content pane.
 */
Zippy.prototype.expand = function() {
  this.setExpanded(true);
};


/**
 * Collapses content pane.
 */
Zippy.prototype.collapse = function() {
  this.setExpanded(false);
};


/**
 * Toggles expanded state.
 */
Zippy.prototype.toggle = function() {
  this.setExpanded(!this.expanded_);
};


/**
 * Sets expanded state.
 *
 * @param {boolean} expanded Expanded/visibility state.
 */
Zippy.prototype.setExpanded = function(expanded) {
  if (this.elContent_) {
    // Hide the element, if one is provided.
    style.setElementShown(this.elContent_, expanded);
  } else if (expanded && this.lazyCreateFunc_) {
    // Assume that when the element is not hidden upon creation.
    this.elContent_ = this.lazyCreateFunc_();
  }
  if (this.elContent_) {
    classlist.add(
        this.elContent_, goog.getCssName('goog-zippy-content'));
  }

  if (this.elExpandedHeader_) {
    // Hide the show header and show the hide one.
    style.setElementShown(this.elHeader_, !expanded);
    style.setElementShown(this.elExpandedHeader_, expanded);
  } else {
    // Update header image, if any.
    this.updateHeaderClassName(expanded);
  }

  this.setExpandedInternal(expanded);

  // Fire toggle event
  this.dispatchEvent(
      new ZippyEvent(
          Zippy.Events.TOGGLE, this, this.expanded_));
};


/**
 * Sets expanded internal state.
 *
 * @param {boolean} expanded Expanded/visibility state.
 * @protected
 */
Zippy.prototype.setExpandedInternal = function(expanded) {
  this.expanded_ = expanded;
};


/**
 * @return {boolean} Whether the zippy is expanded.
 */
Zippy.prototype.isExpanded = function() {
  return this.expanded_;
};


/**
 * Updates the header element's className and ARIA (accessibility) EXPANDED
 * state.
 *
 * @param {boolean} expanded Expanded/visibility state.
 * @protected
 */
Zippy.prototype.updateHeaderClassName = function(expanded) {
  if (this.elHeader_) {
    classlist.enable(
        this.elHeader_, goog.getCssName('goog-zippy-expanded'), expanded);
    classlist.enable(
        this.elHeader_, goog.getCssName('goog-zippy-collapsed'), !expanded);
    aria.setState(
        this.elHeader_, State.EXPANDED, expanded);
  }
};


/**
 * @return {boolean} Whether the Zippy handles its own key events.
 */
Zippy.prototype.isHandleKeyEvents = function() {
  return this.handleKeyEvents_;
};


/**
 * @return {boolean} Whether the Zippy handles its own mouse events.
 */
Zippy.prototype.isHandleMouseEvents = function() {
  return this.handleMouseEvents_;
};


/**
 * Sets whether the Zippy handles it's own keyboard events.
 * @param {boolean} enable Whether the Zippy handles keyboard events.
 */
Zippy.prototype.setHandleKeyboardEvents = function(enable) {
  if (this.handleKeyEvents_ != enable) {
    this.handleKeyEvents_ = enable;
    if (enable) {
      this.enableKeyboardEventsHandling_(this.elHeader_);
      this.enableKeyboardEventsHandling_(this.elExpandedHeader_);
    } else {
      this.keyboardEventHandler_.removeAll();
      this.keyHandler_.detach();
    }
  }
};


/**
 * Sets whether the Zippy handles it's own mouse events.
 * @param {boolean} enable Whether the Zippy handles mouse events.
 */
Zippy.prototype.setHandleMouseEvents = function(enable) {
  if (this.handleMouseEvents_ != enable) {
    this.handleMouseEvents_ = enable;
    if (enable) {
      this.enableMouseEventsHandling_(this.elHeader_);
      this.enableMouseEventsHandling_(this.elExpandedHeader_);
    } else {
      this.mouseEventHandler_.removeAll();
    }
  }
};


/**
 * Enables keyboard events handling for the passed header element.
 * @param {Element} header The header element.
 * @private
 */
Zippy.prototype.enableKeyboardEventsHandling_ = function(header) {
  if (header) {
    this.keyHandler_.attach(header);
    this.keyboardEventHandler_.listen(
        this.keyHandler_, KeyHandler.EventType.KEY,
        this.onHeaderKeyDown_);
  }
};


/**
 * Enables mouse events handling for the passed header element.
 * @param {Element} header The header element.
 * @private
 */
Zippy.prototype.enableMouseEventsHandling_ = function(header) {
  if (header) {
    this.mouseEventHandler_.listen(
        header, EventType.CLICK, this.onHeaderClick_);
  }
};


/**
 * KeyDown event handler for header element. Enter and space toggles expanded
 * state.
 *
 * @param {!BrowserEvent} event KeyDown event.
 * @private
 */
Zippy.prototype.onHeaderKeyDown_ = function(event) {
  if (event.keyCode == KeyCodes.ENTER ||
      event.keyCode == KeyCodes.SPACE) {
    this.toggle();
    this.dispatchActionEvent_(event);

    // Prevent enter key from submitting form.
    event.preventDefault();

    event.stopPropagation();
  }
};


/**
 * Click event handler for header element.
 *
 * @param {!BrowserEvent} event Click event.
 * @private
 */
Zippy.prototype.onHeaderClick_ = function(event) {
  this.toggle();
  this.dispatchActionEvent_(event);
};


/**
 * Dispatch an ACTION event whenever there is user interaction with the header.
 * Please note that after the zippy state change is completed a TOGGLE event
 * will be dispatched. However, the TOGGLE event is dispatch on every toggle,
 * including programmatic call to `#toggle`.
 * @param {!BrowserEvent} triggeringEvent
 * @private
 */
Zippy.prototype.dispatchActionEvent_ = function(triggeringEvent) {
  this.dispatchEvent(new ZippyEvent(
      Zippy.Events.ACTION, this, this.expanded_, triggeringEvent));
};



/**
 * Object representing a zippy toggle event.
 *
 * @param {string} type Event type.
 * @param {Zippy} target Zippy widget initiating event.
 * @param {boolean} expanded Expanded state.
 * @param {!BrowserEvent=} opt_triggeringEvent
 * @extends {Event}
 * @constructor
 * @final
 */
export function ZippyEvent(type, target, expanded, opt_triggeringEvent) {
  ZippyEvent.base(this, 'constructor', type, target);

  /**
   * The expanded state.
   * @type {boolean}
   */
  this.expanded = expanded;

  /**
   * For ACTION events, the key or mouse event that triggered this event, if
   * there was one.
   * @type {?BrowserEvent}
   */
  this.triggeringEvent = opt_triggeringEvent || null;
}
goog.inherits(ZippyEvent, Event);
