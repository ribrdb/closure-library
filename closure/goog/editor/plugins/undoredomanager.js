/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Code for managing series of undo-redo actions in the form of
 * {@link UndoRedoState}s.
 */


import { UndoRedoState } from './undoredostate.js';

import * as events from '../../events/events.js';
import { EventTarget } from '../../events/eventtarget.js';



/**
 * Manages undo and redo operations through a series of `UndoRedoState`s
 * maintained on undo and redo stacks.
 *
 * @constructor
 * @extends {EventTarget}
 */
export function UndoRedoManager() {
  EventTarget.call(this);

  /**
   * The maximum number of states on the undo stack at any time. Used to limit
   * the memory footprint of the undo-redo stack.
   * TODO(user) have a separate memory size based limit.
   * @type {number}
   * @private
   */
  this.maxUndoDepth_ = 100;

  /**
     * The undo stack.
     * @type {Array<UndoRedoState>}
     * @private
     */
  this.undoStack_ = [];

  /**
     * The redo stack.
     * @type {Array<UndoRedoState>}
     * @private
     */
  this.redoStack_ = [];

  /**
   * A queue of pending undo or redo actions. Stored as objects with two
   * properties: func and state. The func property stores the undo or redo
   * function to be called, the state property stores the state that method
   * came from.
   * @type {Array<Object>}
   * @private
   */
  this.pendingActions_ = [];
}
goog.inherits(UndoRedoManager, EventTarget);


/**
 * Event types for the events dispatched by undo-redo manager.
 * @enum {string}
 */
UndoRedoManager.EventType = {
  /**
   * Signifies that he undo or redo stack transitioned between 0 and 1 states,
   * meaning that the ability to peform undo or redo operations has changed.
   */
  STATE_CHANGE: 'state_change',

  /**
   * Signifies that a state was just added to the undo stack. Events of this
   * type will have a `state` property whose value is the state that
   * was just added.
   */
  STATE_ADDED: 'state_added',

  /**
   * Signifies that the undo method of a state is about to be called.
   * Events of this type will have a `state` property whose value is the
   * state whose undo action is about to be performed. If the event is cancelled
   * the action does not proceed, but the state will still transition between
   * stacks.
   */
  BEFORE_UNDO: 'before_undo',

  /**
   * Signifies that the redo method of a state is about to be called.
   * Events of this type will have a `state` property whose value is the
   * state whose redo action is about to be performed. If the event is cancelled
   * the action does not proceed, but the state will still transition between
   * stacks.
   */
  BEFORE_REDO: 'before_redo'
};


/**
 * The key for the listener for the completion of the asynchronous state whose
 * undo or redo action is in progress. Null if no action is in progress.
 * @type {?events.Key}
 * @private
 */
UndoRedoManager.prototype.inProgressActionKey_ = null;


/**
 * Set the max undo stack depth (not the real memory usage).
 * @param {number} depth Depth of the stack.
 */
UndoRedoManager.prototype.setMaxUndoDepth = function(
    depth) {
  this.maxUndoDepth_ = depth;
};


/**
 * Add state to the undo stack. This clears the redo stack.
 *
 * @param {UndoRedoState} state The state to add to the undo
 *     stack.
 */
UndoRedoManager.prototype.addState = function(state) {
  // TODO: is the state.equals check necessary?
  if (this.undoStack_.length == 0 ||
      !state.equals(this.undoStack_[this.undoStack_.length - 1])) {
    this.undoStack_.push(state);
    if (this.undoStack_.length > this.maxUndoDepth_) {
      this.undoStack_.shift();
    }
    // Clobber the redo stack.
    var redoLength = this.redoStack_.length;
    this.redoStack_.length = 0;

    this.dispatchEvent({
      type: UndoRedoManager.EventType.STATE_ADDED,
      state: state
    });

    // If the redo state had states on it, then clobbering the redo stack above
    // has caused a state change.
    if (this.undoStack_.length == 1 || redoLength) {
      this.dispatchStateChange_();
    }
  }
};


/**
 * Dispatches a STATE_CHANGE event with this manager as the target.
 * @private
 */
UndoRedoManager.prototype.dispatchStateChange_ =
    function() {
      this.dispatchEvent(
          UndoRedoManager.EventType.STATE_CHANGE);
    };


/**
 * Performs the undo operation of the state at the top of the undo stack, moving
 * that state to the top of the redo stack. If the undo stack is empty, does
 * nothing.
 */
UndoRedoManager.prototype.undo = function() {
  this.shiftState_(this.undoStack_, this.redoStack_);
};


/**
 * Performs the redo operation of the state at the top of the redo stack, moving
 * that state to the top of the undo stack. If redo undo stack is empty, does
 * nothing.
 */
UndoRedoManager.prototype.redo = function() {
  this.shiftState_(this.redoStack_, this.undoStack_);
};


/**
 * @return {boolean} Wether the undo stack has items on it, i.e., if it is
 *     possible to perform an undo operation.
 */
UndoRedoManager.prototype.hasUndoState = function() {
  return this.undoStack_.length > 0;
};


/**
 * @return {boolean} Wether the redo stack has items on it, i.e., if it is
 *     possible to perform a redo operation.
 */
UndoRedoManager.prototype.hasRedoState = function() {
  return this.redoStack_.length > 0;
};


/**
 * Move a state from one stack to the other, performing the appropriate undo
 * or redo action.
 *
 * @param {Array<UndoRedoState>} fromStack Stack to move
 *     the state from.
 * @param {Array<UndoRedoState>} toStack Stack to move
 *     the state to.
 * @private
 */
UndoRedoManager.prototype.shiftState_ = function(
    fromStack, toStack) {
  if (fromStack.length) {
    var state = fromStack.pop();

    // Push the current state into the redo stack.
    toStack.push(state);

    this.addAction_({
      type: fromStack == this.undoStack_ ?
          UndoRedoManager.EventType.BEFORE_UNDO :
          UndoRedoManager.EventType.BEFORE_REDO,
      func: fromStack == this.undoStack_ ? state.undo : state.redo,
      state: state
    });

    // If either stack transitioned between 0 and 1 in size then the ability
    // to do an undo or redo has changed and we must dispatch a state change.
    if (fromStack.length == 0 || toStack.length == 1) {
      this.dispatchStateChange_();
    }
  }
};


/**
 * Adds an action to the queue of pending undo or redo actions. If no actions
 * are pending, immediately performs the action.
 *
 * @param {Object} action An undo or redo action. Stored as an object with two
 *     properties: func and state. The func property stores the undo or redo
 *     function to be called, the state property stores the state that method
 *     came from.
 * @private
 */
UndoRedoManager.prototype.addAction_ = function(action) {
  this.pendingActions_.push(action);
  if (this.pendingActions_.length == 1) {
    this.doAction_();
  }
};


/**
 * Executes the action at the front of the pending actions queue. If an action
 * is already in progress or the queue is empty, does nothing.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
UndoRedoManager.prototype.doAction_ = function() {
  if (this.inProgressActionKey_ || this.pendingActions_.length == 0) {
    return;
  }

  var action = this.pendingActions_.shift();

  var e = {type: action.type, state: action.state};

  if (this.dispatchEvent(e)) {
    if (action.state.isAsynchronous()) {
      this.inProgressActionKey_ = events.listen(
          action.state, UndoRedoState.ACTION_COMPLETED,
          this.finishAction_, false, this);
      action.func.call(action.state);
    } else {
      action.func.call(action.state);
      this.doAction_();
    }
  }
};


/**
 * Finishes processing the current in progress action, starting the next queued
 * action if one exists.
 * @private
 */
UndoRedoManager.prototype.finishAction_ = function() {
  events.unlistenByKey(/** @type {number} */ (this.inProgressActionKey_));
  this.inProgressActionKey_ = null;
  this.doAction_();
};


/**
 * Clears the undo and redo stacks.
 */
UndoRedoManager.prototype.clearHistory = function() {
  if (this.undoStack_.length > 0 || this.redoStack_.length > 0) {
    this.undoStack_.length = 0;
    this.redoStack_.length = 0;
    this.dispatchStateChange_();
  }
};


/**
 * @return {UndoRedoState|undefined} The state at the top of
 *     the undo stack without removing it from the stack.
 */
UndoRedoManager.prototype.undoPeek = function() {
  return this.undoStack_[this.undoStack_.length - 1];
};


/**
 * @return {UndoRedoState|undefined} The state at the top of
 *     the redo stack without removing it from the stack.
 */
UndoRedoManager.prototype.redoPeek = function() {
  return this.redoStack_[this.redoStack_.length - 1];
};
