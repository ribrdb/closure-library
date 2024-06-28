/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Announcer that allows messages to be spoken by assistive
 * technologies.
 */

import { Disposable } from '../../disposable/disposable.js';

import * as aria from './aria.js';
import { LivePriority, State } from './attributes.js';
import * as dom from '../../dom/dom.js';
import { TagName } from '../../dom/tagname.js';
import object from '../../object/object.js';
import * as googString from '../../string/string.js';



/**
 * Class that allows messages to be spoken by assistive technologies that the
 * user may have active.
 *
 * @param {dom.DomHelper=} opt_domHelper DOM helper.
 * @constructor
 * @extends {Disposable}
 * @final
 */
export function Announcer(opt_domHelper) {
 Announcer.base(this, 'constructor');

 /**
   * @type {dom.DomHelper}
   * @private
   */
 this.domHelper_ = opt_domHelper || dom.getDomHelper();

 /**
   * Map of priority to live region elements to use for communicating updates.
   * Elements are created on demand.
   * @type {Object<LivePriority, !Element>}
   * @private
   */
 this.liveRegions_ = {};

 /**
   * Map of live region to the last message inserted in that region.
   * @type {?Object<!LivePriority, string>}
   * @private
   */
 this.lastMessageAnnouncedPerPriority_ = {};
}
goog.inherits(Announcer, Disposable);


/** @override */
Announcer.prototype.disposeInternal = function() {
 object.forEach(
     this.liveRegions_, this.domHelper_.removeNode, this.domHelper_);
 this.liveRegions_ = null;
 this.domHelper_ = null;
 this.lastMessageAnnouncedPerPriority_ = null;
 Announcer.base(this, 'disposeInternal');
};


/**
 * Announce a message to be read by any assistive technologies the user may
 * have active.
 * @param {string} message The message to announce to screen readers.
 * @param {LivePriority=} opt_priority The priority of the
 *     message. Defaults to POLITE.
 */
Announcer.prototype.say = function(message, opt_priority) {
 const priority = opt_priority || LivePriority.POLITE;
 const liveRegion = this.getLiveRegion_(priority);
 // TODO(user): Remove the code once Chrome fix the bug on their
 // end. Add nonbreaking space such that there's a change to aria live region
 // to verbalize repeated character or text.
 const lastMessageAnnounced = this.lastMessageAnnouncedPerPriority_[priority];
 const announceMessage =
     lastMessageAnnounced && lastMessageAnnounced === message ?
     message + googString.Unicode.NBSP :
     message;
 if (message) {
   this.lastMessageAnnouncedPerPriority_[priority] = announceMessage;
 }
 dom.setTextContent(liveRegion, announceMessage);
};

/**
 * Returns the id value for an aria-live region for a given priority.
 * @param {!LivePriority} priority The required priority.
 * @return {string} The generated id on the liveRegion.
 */
Announcer.prototype.getLiveRegionId = function(priority) {
  return this.getLiveRegion_(priority).getAttribute('id');
};

/**
 * Returns an aria-live region that can be used to communicate announcements.
 * @param {!LivePriority} priority The required priority.
 * @return {!Element} A live region of the requested priority.
 * @private
 */
Announcer.prototype.getLiveRegion_ = function(priority) {
 var liveRegion = this.liveRegions_[priority];
 if (liveRegion) {
   // Make sure the live region is not aria-hidden.
   aria.removeState(liveRegion, State.HIDDEN);
   return liveRegion;
 }

 liveRegion = this.domHelper_.createElement(TagName.DIV);
 // Generate a unique id for the live region.
 liveRegion.id = `goog-lr-${goog.getUid(liveRegion)}`;
 // Note that IE has a habit of declaring things that aren't display:none as
 // invisible to third-party tools like JAWs, so we can't just use height:0.
 liveRegion.style.position = 'absolute';
 liveRegion.style.top = '-1000px';
 liveRegion.style.height = '1px';
 liveRegion.style.overflow = 'hidden';
 aria.setState(liveRegion, State.LIVE, priority);
 aria.setState(liveRegion, State.ATOMIC, 'true');
 this.domHelper_.getDocument().body.appendChild(liveRegion);
 this.liveRegions_[priority] = liveRegion;
 return liveRegion;
};
