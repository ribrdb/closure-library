/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Code for an UndoRedoState interface representing an undo and
 * redo action for a particular state change. To be used by
 * {@link goog.editor.plugins.UndoRedoManager}.
 */


import { EventTarget } from '../../events/eventtarget.js';



/**
 * Represents an undo and redo action for a particular state transition.
 *
 * @param {boolean} asynchronous Whether the undo or redo actions for this
 *     state complete asynchronously. If true, then this state must fire
 *     an ACTION_COMPLETED event when undo or redo is complete.
 * @constructor
 * @extends {EventTarget}
 */
export function UndoRedoState(asynchronous) {
 UndoRedoState.base(this, 'constructor');

 /**
  * Indicates if the undo or redo actions for this state complete
  * asynchronously.
  * @type {boolean}
  * @private
  */
 this.asynchronous_ = asynchronous;
}
goog.inherits(UndoRedoState, EventTarget);


/**
 * Event type for events indicating that this state has completed an undo or
 * redo operation.
 * @const
 */
UndoRedoState.ACTION_COMPLETED = 'action_completed';


/**
 * @return {boolean} Whether or not the undo and redo actions of this state
 *     complete asynchronously. If true, the state will fire an ACTION_COMPLETED
 *     event when an undo or redo action is complete.
 */
UndoRedoState.prototype.isAsynchronous = function() {
 return this.asynchronous_;
};


/**
 * Undoes the action represented by this state.
 */
UndoRedoState.prototype.undo = goog.abstractMethod;


/**
 * Redoes the action represented by this state.
 */
UndoRedoState.prototype.redo = goog.abstractMethod;


/**
 * Checks if two undo-redo states are the same.
 * @param {UndoRedoState} state The state to compare.
 * @return {boolean} Wether the two states are equal.
 */
UndoRedoState.prototype.equals = goog.abstractMethod;
