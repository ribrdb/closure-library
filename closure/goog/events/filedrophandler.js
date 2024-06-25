/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a files drag and drop event detector. It works on
 * HTML5 browsers.
 *
 * @see ../demos/filedrophandler.html
 */

import * as array from '../array/array.js';

import * as dom from '../dom/dom.js';
import { BrowserEvent } from './browserevent.js';
import { EventHandler } from './eventhandler.js';
import { EventTarget } from './eventtarget.js';
import { EventType } from './eventtype.js';
import * as log from '../log/log.js';
import * as googLog from '../log/log.js';



/**
 * A files drag and drop event detector. Gets an `element` as parameter
 * and fires `FileDropHandler.EventType.DROP` event when files
 * are dropped in the `element`.
 *
 * @param {Element|Document} element The element or document to listen on.
 * @param {boolean=} opt_preventDropOutside Whether to prevent a drop on the
 *     area outside the `element`. Default false.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function FileDropHandler(element, opt_preventDropOutside) {
  EventTarget.call(this);

  /**
       * Handler for drag/drop events.
       * @type {!EventHandler<!FileDropHandler>}
       * @private
       */
  this.eventHandler_ = new EventHandler(this);

  var doc = element;
  if (opt_preventDropOutside) {
    doc = dom.getOwnerDocument(element);
  }

  // Add dragenter listener to the owner document of the element.
  this.eventHandler_.listen(
      doc, EventType.DRAGENTER, this.onDocDragEnter_);

  // Add dragover listener to the owner document of the element only if the
  // document is not the element itself.
  if (doc != element) {
    this.eventHandler_.listen(
        doc, EventType.DRAGOVER, this.onDocDragOver_);
  }

  // Add dragover and drop listeners to the element.
  this.eventHandler_.listen(
      element, EventType.DRAGOVER, this.onElemDragOver_);
  this.eventHandler_.listen(
      element, EventType.DROP, this.onElemDrop_);
}
goog.inherits(FileDropHandler, EventTarget);


/**
 * Whether the drag event contains files. It is initialized only in the
 * dragenter event. It is used in all the drag events to prevent default actions
 * only if the drag contains files. Preventing default actions is necessary to
 * go from dragenter to dragover and from dragover to drop. However we do not
 * always want to prevent default actions, e.g. when the user drags text or
 * links on a text area we should not prevent the browser default action that
 * inserts the text in the text area. It is also necessary to stop propagation
 * when handling drag events on the element to prevent them from propagating
 * to the document.
 * @private
 * @type {boolean}
 */
FileDropHandler.prototype.dndContainsFiles_ = false;


/**
 * A logger, used to help us debug the algorithm.
 * @type {log.Logger}
 * @private
 */
FileDropHandler.prototype.logger_ =
    googLog.getLogger('goog.events.FileDropHandler');


/**
 * The types of events fired by this class.
 * @enum {string}
 */
FileDropHandler.EventType = {
  DROP: EventType.DROP
};


/** @override */
FileDropHandler.prototype.disposeInternal = function() {
  FileDropHandler.superClass_.disposeInternal.call(this);
  this.eventHandler_.dispose();
};


/**
 * Dispatches the DROP event.
 * @param {BrowserEvent} e The underlying browser event.
 * @private
 */
FileDropHandler.prototype.dispatch_ = function(e) {
  googLog.fine(this.logger_, 'Firing DROP event...');
  var event = new BrowserEvent(e.getBrowserEvent());
  event.type = FileDropHandler.EventType.DROP;
  this.dispatchEvent(event);
};


/**
 * Handles dragenter on the document.
 * @param {BrowserEvent} e The dragenter event.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
FileDropHandler.prototype.onDocDragEnter_ = function(e) {
  googLog.log(
      this.logger_, googLog.Level.FINER,
      '"' + e.target.id + '" (' + e.target + ') dispatched: ' + e.type);
  var dt = e.getBrowserEvent().dataTransfer;
  // Check whether the drag event contains files.
  this.dndContainsFiles_ = !!(
      dt && ((dt.types && (array.contains(dt.types, 'Files') ||
                           array.contains(dt.types, 'public.file-url'))) ||
             (dt.files && dt.files.length > 0)));
  // If it does
  if (this.dndContainsFiles_) {
    // Prevent default actions.
    e.preventDefault();
  }
  googLog.log(
      this.logger_, googLog.Level.FINER,
      'dndContainsFiles_: ' + this.dndContainsFiles_);
};


/**
 * Handles dragging something over the document.
 * @param {BrowserEvent} e The dragover event.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
FileDropHandler.prototype.onDocDragOver_ = function(e) {
  googLog.log(
      this.logger_, googLog.Level.FINEST,
      '"' + e.target.id + '" (' + e.target + ') dispatched: ' + e.type);
  if (this.dndContainsFiles_) {
    // Prevent default actions.
    e.preventDefault();
    // Disable the drop on the document outside the drop zone.
    var dt = e.getBrowserEvent().dataTransfer;
    dt.dropEffect = 'none';
  }
};


/**
 * Handles dragging something over the element (drop zone).
 * @param {BrowserEvent} e The dragover event.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
FileDropHandler.prototype.onElemDragOver_ = function(e) {
  googLog.log(
      this.logger_, googLog.Level.FINEST,
      '"' + e.target.id + '" (' + e.target + ') dispatched: ' + e.type);
  if (this.dndContainsFiles_) {
    // Prevent default actions and stop the event from propagating further to
    // the document. Both lines are needed! (See comment above).
    e.preventDefault();
    e.stopPropagation();
    // Allow the drop on the drop zone.
    var dt = e.getBrowserEvent().dataTransfer;

    // IE bug #811625 (https://goo.gl/UWuxX0) will throw error SCRIPT65535
    // when attempting to set property effectAllowed on IE10+.
    // See more: https://github.com/google/closure-library/issues/485.
    try {
      dt.effectAllowed = 'all';
    } catch (err) {
    }
    dt.dropEffect = 'copy';
  }
};


/**
 * Handles dropping something onto the element (drop zone).
 * @param {BrowserEvent} e The drop event.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
FileDropHandler.prototype.onElemDrop_ = function(e) {
  googLog.log(
      this.logger_, googLog.Level.FINER,
      '"' + e.target.id + '" (' + e.target + ') dispatched: ' + e.type);
  // If the drag and drop event contains files.
  if (this.dndContainsFiles_) {
    // Prevent default actions and stop the event from propagating further to
    // the document. Both lines are needed! (See comment above).
    e.preventDefault();
    e.stopPropagation();
    // Dispatch DROP event.
    this.dispatch_(e);
  }
};
