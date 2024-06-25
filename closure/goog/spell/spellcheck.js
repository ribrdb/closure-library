/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Support class for spell checker components.
 */

import { Timer } from '../timer/timer.js';

import { Event } from '../events/event.js';
import { EventTarget } from '../events/eventtarget.js';
import { Set } from '../structs/set.js';



/**
 * Support class for spell checker components. Provides basic functionality
 * such as word lookup and caching.
 *
 * @param {function(!Array<string>, !SpellCheck, !Function)=}
 *     opt_lookupFunction Function to use for word lookup. Must
 *     accept an array of words, an object reference and a callback function as
 *     parameters. It must also call the callback function (as a method on the
 *     object), once ready, with an array containing the original words, their
 *     spelling status and optionally an array of suggestions.
 * @param {string=} opt_language Content language.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function SpellCheck(opt_lookupFunction, opt_language) {
 EventTarget.call(this);

 /**
    * Function used to lookup spelling of words.
    * @private {?function(!Array<string>, !SpellCheck, !Function)}
    */
 this.lookupFunction_ = opt_lookupFunction || null;

 /**
   * Cache for words not yet checked with lookup function.
   * @type {Set}
   * @private
   */
 this.unknownWords_ = new Set();

 this.setLanguage(opt_language);
}
goog.inherits(SpellCheck, EventTarget);


/**
 * Delay, in ms, to wait for additional words to be entered before a lookup
 * operation is triggered.
 *
 * @type {number}
 * @private
 */
SpellCheck.LOOKUP_DELAY_ = 100;


/**
 * Constants for event names
 *
 * @enum {string}
 */
SpellCheck.EventType = {
  /**
   * Fired when all pending words have been processed.
   */
  READY: 'ready',

  /**
   * Fired when all lookup function failed.
   */
  ERROR: 'error',

  /**
   * Fired when a word's status is changed.
   */
  WORD_CHANGED: 'wordchanged'
};


/**
 * Cache. Shared across all spell checker instances. Map with language as the
 * key and a cache for that language as the value.
 *
 * @type {Object}
 * @private
 */
SpellCheck.cache_ = {};


/**
 * Content Language.
 * @type {string}
 * @private
 */
SpellCheck.prototype.language_ = '';


/**
 * Cache for set language. Reference to the element corresponding to the set
 * language in the static SpellCheck.cache_.
 *
 * @type {Object|undefined}
 * @private
 */
SpellCheck.prototype.cache_;


/**
 * Id for timer processing the pending queue.
 *
 * @type {number}
 * @private
 */
SpellCheck.prototype.queueTimer_ = 0;


/**
 * Whether a lookup operation is in progress.
 *
 * @type {boolean}
 * @private
 */
SpellCheck.prototype.lookupInProgress_ = false;


/**
 * Codes representing the status of an individual word.
 *
 * @enum {number}
 */
SpellCheck.WordStatus = {
  UNKNOWN: 0,
  VALID: 1,
  INVALID: 2,
  IGNORED: 3,
  CORRECTED: 4  // Temporary status, not stored in cache
};


/**
 * Fields for word array in cache.
 *
 * @enum {number}
 */
SpellCheck.CacheIndex = {
  STATUS: 0,
  SUGGESTIONS: 1
};


/**
 * Regular expression for identifying word boundaries.
 *
 * @type {string}
 */
SpellCheck.WORD_BOUNDARY_CHARS =
    '\t\r\n\u00A0 !\"#$%&()*+,-./\\\\:;<=>?@\\[\\]^_`{|}~';


/**
 * Regular expression for identifying word boundaries.
 *
 * @type {RegExp}
 */
SpellCheck.WORD_BOUNDARY_REGEX =
    new RegExp('[' + SpellCheck.WORD_BOUNDARY_CHARS + ']');


/**
 * Regular expression for splitting a string into individual words and blocks of
 * separators. Matches zero or one word followed by zero or more separators.
 *
 * @type {RegExp}
 */
SpellCheck.SPLIT_REGEX = new RegExp(
    '([^' + SpellCheck.WORD_BOUNDARY_CHARS + ']*)' +
    '([' + SpellCheck.WORD_BOUNDARY_CHARS + ']*)');


/**
 * Sets the lookup function.
 *
 * @param {Function} f Function to use for word lookup. Must accept an array of
 *     words, an object reference and a callback function as parameters.
 *     It must also call the callback function (as a method on the object),
 *     once ready, with an array containing the original words, their
 *     spelling status and optionally an array of suggestions.
 */
SpellCheck.prototype.setLookupFunction = function(f) {
 this.lookupFunction_ = f;
};


/**
 * Sets language.
 *
 * @param {string=} opt_language Content language.
 */
SpellCheck.prototype.setLanguage = function(opt_language) {
 this.language_ = opt_language || '';

 if (!SpellCheck.cache_[this.language_]) {
   SpellCheck.cache_[this.language_] = {};
 }
 this.cache_ = SpellCheck.cache_[this.language_];
};


/**
 * Returns language.
 *
 * @return {string} Content language.
 */
SpellCheck.prototype.getLanguage = function() {
 return this.language_;
};


/**
 * Checks spelling for a block of text.
 *
 * @param {string} text Block of text to spell check.
 */
SpellCheck.prototype.checkBlock = function(text) {
 const words = text.split(SpellCheck.WORD_BOUNDARY_REGEX);

 const len = words.length;
 for (let word, i = 0; i < len; i++) {
   word = words[i];
   this.checkWord_(word);
 }

 if (!this.queueTimer_ && !this.lookupInProgress_ &&
     this.unknownWords_.getCount()) {
   this.processPending_();
 } else if (this.unknownWords_.getCount() == 0) {
   this.dispatchEvent(SpellCheck.EventType.READY);
 }
};


/**
 * Checks spelling for a single word. Returns the status of the supplied word,
 * or UNKNOWN if it's not cached. If it's not cached the word is added to a
 * queue and checked with the verification implementation with a short delay.
 *
 * @param {string} word Word to check spelling of.
 * @return {SpellCheck.WordStatus} The status of the supplied word,
 *     or UNKNOWN if it's not cached.
 */
SpellCheck.prototype.checkWord = function(word) {
 const status = this.checkWord_(word);

 if (status == SpellCheck.WordStatus.UNKNOWN && !this.queueTimer_ &&
     !this.lookupInProgress_) {
   this.queueTimer_ = Timer.callOnce(
       this.processPending_, SpellCheck.LOOKUP_DELAY_, this);
 }

 return status;
};


/**
 * Checks spelling for a single word. Returns the status of the supplied word,
 * or UNKNOWN if it's not cached.
 *
 * @param {string} word Word to check spelling of.
 * @return {SpellCheck.WordStatus} The status of the supplied word,
 *     or UNKNOWN if it's not cached.
 * @private
 */
SpellCheck.prototype.checkWord_ = function(word) {
 if (!word) {
   return SpellCheck.WordStatus.INVALID;
 }

 const cacheEntry = this.cache_[word];
 if (!cacheEntry) {
   this.unknownWords_.add(word);
   return SpellCheck.WordStatus.UNKNOWN;
 }

 return cacheEntry[SpellCheck.CacheIndex.STATUS];
};


/**
 * Processes pending words unless a lookup operation has already been queued or
 * is in progress.
 *
 * @throws {Error}
 */
SpellCheck.prototype.processPending = function() {
 if (this.unknownWords_.getCount()) {
   if (!this.queueTimer_ && !this.lookupInProgress_) {
     this.processPending_();
   }
 } else {
   this.dispatchEvent(SpellCheck.EventType.READY);
 }
};


/**
 * Processes pending words using the verification callback.
 *
 * @throws {Error}
 * @private
 */
SpellCheck.prototype.processPending_ = function() {
 if (!this.lookupFunction_) {
   throw new Error('No lookup function provided for spell checker.');
 }

 if (this.unknownWords_.getCount()) {
   this.lookupInProgress_ = true;
   const func = this.lookupFunction_;
   func(Array.from(this.unknownWords_.values()), this, this.lookupCallback_);
 } else {
   this.dispatchEvent(SpellCheck.EventType.READY);
 }

 this.queueTimer_ = 0;
};


/**
 * Callback for lookup function.
 *
 * @param {Array<Array<?>>} data Data array. Each word is represented by an
 *     array containing the word, the status and optionally an array of
 *     suggestions. Passing null indicates that the operation failed.
 * @private
 *
 * Example:
 * obj.lookupCallback_([
 *   ['word', VALID],
 *   ['wrod', INVALID, ['word', 'wood', 'rod']]
 * ]);
 */
SpellCheck.prototype.lookupCallback_ = function(data) {
 // Lookup function failed; abort then dispatch error event.
 if (data == null) {
   if (this.queueTimer_) {
     Timer.clear(this.queueTimer_);
     this.queueTimer_ = 0;
   }
   this.lookupInProgress_ = false;

   this.dispatchEvent(SpellCheck.EventType.ERROR);
   return;
 }

 for (let a, i = 0; a = data[i]; i++) {
   this.setWordStatus_(a[0], a[1], a[2]);
 }
 this.lookupInProgress_ = false;

 // Fire ready event if all pending words have been processed.
 if (this.unknownWords_.getCount() == 0) {
   this.dispatchEvent(SpellCheck.EventType.READY);

   // Process pending
 } else if (!this.queueTimer_) {
   this.queueTimer_ = Timer.callOnce(
       this.processPending_, SpellCheck.LOOKUP_DELAY_, this);
 }
};


/**
 * Sets a words spelling status.
 *
 * @param {string} word Word to set status for.
 * @param {SpellCheck.WordStatus} status Status of word.
 * @param {Array<string>=} opt_suggestions Suggestions.
 *
 * Example:
 * obj.setWordStatus('word', VALID);
 * obj.setWordStatus('wrod', INVALID, ['word', 'wood', 'rod']);.
 */
SpellCheck.prototype.setWordStatus = function(
    word, status, opt_suggestions) {
 this.setWordStatus_(word, status, opt_suggestions);
};


/**
 * Sets a words spelling status.
 *
 * @param {string} word Word to set status for.
 * @param {SpellCheck.WordStatus} status Status of word.
 * @param {Array<string>=} opt_suggestions Suggestions.
 * @private
 */
SpellCheck.prototype.setWordStatus_ = function(
    word, status, opt_suggestions) {
 const suggestions = opt_suggestions || [];
 this.cache_[word] = [status, suggestions];
 this.unknownWords_.remove(word);

 this.dispatchEvent(
     new SpellCheck.WordChangedEvent(this, word, status));
};


/**
 * Returns suggestions for the given word.
 *
 * @param {string} word Word to get suggestions for.
 * @return {Array<string>} An array of suggestions for the given word.
 */
SpellCheck.prototype.getSuggestions = function(word) {
 const cacheEntry = this.cache_[word];

 if (!cacheEntry) {
   this.checkWord(word);
   return [];
 }

 return cacheEntry[SpellCheck.CacheIndex.STATUS] ==
         SpellCheck.WordStatus.INVALID ?
     cacheEntry[SpellCheck.CacheIndex.SUGGESTIONS] :
     [];
};



/**
 * Object representing a word changed event. Fired when the status of a word
 * changes.
 *
 * @param {SpellCheck} target Spellcheck object initiating event.
 * @param {string} word Word to set status for.
 * @param {SpellCheck.WordStatus} status Status of word.
 * @extends {Event}
 * @constructor
 * @final
 */
SpellCheck.WordChangedEvent = function(target, word, status) {
 Event.call(
     this, SpellCheck.EventType.WORD_CHANGED, target);

 /**
  * Word the status has changed for.
  * @type {string}
  */
 this.word = word;

 /**
    * New status
    * @type {SpellCheck.WordStatus}
    */
 this.status = status;
};
goog.inherits(SpellCheck.WordChangedEvent, Event);
