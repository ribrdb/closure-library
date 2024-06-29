/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Animated zippy widget implementation.
 *
 * @see ../demos/zippy.html
 */

import { Role } from '../a11y/aria/roles.js';

import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as googEvents from '../events/events.js';
import { Animation } from '../fx/animation.js';
import { Transition } from '../fx/transition.js';
import * as easing from '../fx/easing.js';
import { Zippy, ZippyEvent } from './zippy.js';
const { Event } = goog.requireType('goog.events.event');



/**
 * Zippy widget. Expandable/collapsible container, clicking the header toggles
 * the visibility of the content.
 *
 * @param {Element|string|null} header Header element, either element
 *     reference, string id or null if no header exists.
 * @param {Element|string} content Content element, either element reference or
 *     string id.
 * @param {boolean=} opt_expanded Initial expanded/visibility state. Defaults to
 *     false.
 * @param {dom.DomHelper=} opt_domHelper An optional DOM helper.
 * @param {Role<string>=} opt_role ARIA role, default TAB.
 * @constructor
 * @extends {Zippy}
 */
export function AnimatedZippy(header, content, opt_expanded, opt_domHelper, opt_role) {
 var domHelper = opt_domHelper || dom.getDomHelper();

 // Create wrapper element and move content into it.
 var elWrapper =
     domHelper.createDom(TagName.DIV, {'style': 'overflow:hidden'});
 var elContent = domHelper.getElement(content);
 elContent.parentNode.replaceChild(elWrapper, elContent);
 elWrapper.appendChild(elContent);

 /**
  * Content wrapper, used for animation.
  * @type {Element}
  * @private
  */
 this.elWrapper_ = elWrapper;

 /**
   * Reference to animation or null if animation is not active.
   * @type {?Animation}
   * @private
   */
 this.anim_ = null;

 // Call constructor of super class.
 Zippy.call(
     this, header, elContent, opt_expanded, undefined, domHelper, opt_role);

 // Set initial state.
 // NOTE: Set the class names as well otherwise animated zippys
 // start with empty class names.
 var expanded = this.isExpanded();
 this.elWrapper_.style.display = expanded ? '' : 'none';
 this.updateHeaderClassName(expanded);
}
goog.inherits(AnimatedZippy, Zippy);


/**
 * Constants for event names.
 *
 * @const
 */
AnimatedZippy.Events = {
  /**
   * The beginning of the animation when the zippy state toggles.
   * @const {string}
   */
  TOGGLE_ANIMATION_BEGIN: googEvents.getUniqueId('toggleanimationbegin'),

  /**
   * The end of the animation when the zippy state toggles.
   * @const {string}
   */
  TOGGLE_ANIMATION_END: googEvents.getUniqueId('toggleanimationend')
};


/**
 * Duration of expand/collapse animation, in milliseconds.
 * @type {number}
 */
AnimatedZippy.prototype.animationDuration = 500;


/**
 * Acceleration function for expand/collapse animation.
 * @type {!Function}
 */
AnimatedZippy.prototype.animationAcceleration = easing.easeOut;


/**
 * @return {boolean} Whether the zippy is in the process of being expanded or
 *     collapsed.
 */
AnimatedZippy.prototype.isBusy = function() {
 return this.anim_ != null;
};


/**
 * Sets expanded state.
 *
 * @param {boolean} expanded Expanded/visibility state.
 * @override
 */
AnimatedZippy.prototype.setExpanded = function(expanded) {
 if (this.isExpanded() == expanded && !this.anim_) {
   return;
 }

 // Reset display property of wrapper to allow content element to be
 // measured.
 if (this.elWrapper_.style.display == 'none') {
   this.elWrapper_.style.display = '';
 }

 // Measure content element.
 var h = this.getContentElement().offsetHeight;

 // Stop active animation (if any) and determine starting height.
 var startH = 0;
 if (this.anim_) {
   googEvents.removeAll(this.anim_);
   this.anim_.stop(false);

   var marginTop = parseInt(this.getContentElement().style.marginTop, 10);
   startH = h - Math.abs(marginTop);
 } else {
   startH = expanded ? 0 : h;
 }

 // Updates header class name after the animation has been stopped.
 this.updateHeaderClassName(expanded);

 // Set up expand/collapse animation.
 this.anim_ = new Animation(
     [0, startH], [0, expanded ? h : 0], this.animationDuration,
     this.animationAcceleration);

 var events = [
   Transition.EventType.BEGIN, Animation.EventType.ANIMATE,
   Transition.EventType.END
 ];
 googEvents.listen(this.anim_, events, this.onAnimate_, false, this);
 googEvents.listen(
     this.anim_, Transition.EventType.BEGIN,
     goog.bind(this.onAnimationBegin_, this, expanded));
 googEvents.listen(
     this.anim_, Transition.EventType.END,
     goog.bind(this.onAnimationCompleted_, this, expanded));

 // Start animation.
 this.anim_.play(false);
};


/**
 * Called during animation
 *
 * @param {Event} e The event.
 * @private
 */
AnimatedZippy.prototype.onAnimate_ = function(e) {
 var contentElement = this.getContentElement();
 var h = contentElement.offsetHeight;
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 contentElement.style.marginTop = (e.y - h) + 'px';
};


/**
 * Called once the expand/collapse animation has started.
 *
 * @param {boolean} expanding Expanded/visibility state.
 * @private
 */
AnimatedZippy.prototype.onAnimationBegin_ = function(expanding) {
 this.dispatchEvent(new ZippyEvent(
     AnimatedZippy.Events.TOGGLE_ANIMATION_BEGIN, this, expanding));
};


/**
 * Called once the expand/collapse animation has completed.
 *
 * @param {boolean} expanded Expanded/visibility state.
 * @private
 */
AnimatedZippy.prototype.onAnimationCompleted_ = function(expanded) {
 // Fix wrong end position if the content has changed during the animation.
 if (expanded) {
   this.getContentElement().style.marginTop = '0';
 }

 googEvents.removeAll(/** @type {!Animation} */ (this.anim_));
 this.setExpandedInternal(expanded);
 this.anim_ = null;

 if (!expanded) {
   this.elWrapper_.style.display = 'none';
 }

 // Fire toggle event.
 this.dispatchEvent(
     new ZippyEvent(Zippy.Events.TOGGLE, this, expanded));
 this.dispatchEvent(new ZippyEvent(
     AnimatedZippy.Events.TOGGLE_ANIMATION_END, this, expanded));
};
