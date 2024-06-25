/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides functions to parse and pretty-print HTML strings.
 */

import { TagName } from '../dom/tagname.js';

import object from '../object/object.js';
import { StringBuffer } from '../string/stringbuffer.js';



/**
 * This class formats HTML to be more human-readable.
 * TODO(user): Add hierarchical indentation.
 * @param {number=} opt_timeOutMillis Max # milliseconds to spend on #format. If
 *     this time is exceeded, return partially formatted. 0 or negative number
 *     indicates no timeout.
 * @constructor
 * @final
 */
export function HtmlPrettyPrinter(opt_timeOutMillis) {
  /**
   * Max # milliseconds to spend on #format.
   * @type {number}
   * @private
   */
  this.timeOutMillis_ =
      opt_timeOutMillis && opt_timeOutMillis > 0 ? opt_timeOutMillis : 0;
}


/**
 * Singleton.
 * @private {HtmlPrettyPrinter?}
 */
HtmlPrettyPrinter.instance_ = null;


/**
 * Singleton lazy initializer.
 * @return {!HtmlPrettyPrinter} Singleton.
 * @private
 */
HtmlPrettyPrinter.getInstance_ = function() {
  if (!HtmlPrettyPrinter.instance_) {
    HtmlPrettyPrinter.instance_ =
        new HtmlPrettyPrinter();
  }
  return HtmlPrettyPrinter.instance_;
};


/**
 * Static utility function. See prototype #format.
 * @param {string} html The HTML text to pretty print.
 * @return {string} Formatted result.
 */
HtmlPrettyPrinter.format = function(html) {
  return HtmlPrettyPrinter.getInstance_().format(html);
};


/**
 * List of patterns used to tokenize HTML for pretty printing. Cache
 * subexpression for tag name.
 * comment|meta-tag|tag|text|other-less-than-characters
 * @private {!RegExp}
 * @const
 */
HtmlPrettyPrinter.TOKEN_REGEX_ =
    /(?:<!--.*?-->|<!.*?>|<(\/?)(\w+)[^<>]*>|[^<]+|<)/g;


/**
 * Tags whose contents we don't want pretty printed.
 * @private {!Object}
 * @const
 */
HtmlPrettyPrinter.NON_PRETTY_PRINTED_TAGS_ = object.createSet(
    TagName.SCRIPT, TagName.STYLE, TagName.PRE,
    'XMP');


/**
 * 'Block' tags. We should add newlines before and after these tags during
 * pretty printing. Tags drawn mostly from HTML4 definitions for block and other
 * non-online tags, excepting the ones in
 * #HtmlPrettyPrinter.NON_PRETTY_PRINTED_TAGS_.
 * @private {!Object}
 * @const
 */
HtmlPrettyPrinter.BLOCK_TAGS_ = object.createSet(
    TagName.ADDRESS, TagName.APPLET, TagName.AREA,
    TagName.BASE, TagName.BASEFONT,
    TagName.BLOCKQUOTE, TagName.BODY,
    TagName.CAPTION, TagName.CENTER, TagName.COL,
    TagName.COLGROUP, TagName.DIR, TagName.DIV,
    TagName.DL, TagName.FIELDSET, TagName.FORM,
    TagName.FRAME, TagName.FRAMESET, TagName.H1,
    TagName.H2, TagName.H3, TagName.H4,
    TagName.H5, TagName.H6, TagName.HEAD,
    TagName.HR, TagName.HTML, TagName.IFRAME,
    TagName.ISINDEX, TagName.LEGEND, TagName.LINK,
    TagName.MENU, TagName.META, TagName.NOFRAMES,
    TagName.NOSCRIPT, TagName.OL, TagName.OPTGROUP,
    TagName.OPTION, TagName.P, TagName.PARAM,
    TagName.TABLE, TagName.TBODY, TagName.TD,
    TagName.TFOOT, TagName.TH, TagName.THEAD,
    TagName.TITLE, TagName.TR, TagName.UL);


/**
 * Non-block tags that break flow. We insert a line break after, but not before
 * these. Tags drawn from HTML4 definitions.
 * @private {!Object}
 * @const
 */
HtmlPrettyPrinter.BREAKS_FLOW_TAGS_ = object.createSet(
    TagName.BR, TagName.DD, TagName.DT,
    TagName.LI, TagName.NOFRAMES);


/**
 * Empty tags. These are treated as both start and end tags.
 * @private {!Object}
 * @const
 */
HtmlPrettyPrinter.EMPTY_TAGS_ = object.createSet(
    TagName.BR, TagName.HR, TagName.ISINDEX);


/**
 * Breaks up HTML so it's easily readable by the user.
 * @param {string} html The HTML text to pretty print.
 * @return {string} Formatted result.
 * @throws {Error} Regex error, data loss, or endless loop detected.
 */
HtmlPrettyPrinter.prototype.format = function(html) {
  // Trim leading whitespace, but preserve first indent; in other words, keep
  // any spaces immediately before the first non-whitespace character (that's
  // what $1 is), but remove all other leading whitespace. This adjustment
  // historically had been made in Docs. The motivation is that some
  // browsers prepend several line breaks in designMode.
  html = html.replace(/^\s*?( *\S)/, '$1');

  // Trim trailing whitespace.
  html = html.replace(/\s+$/, '');

  // Keep track of how much time we've used.
  var timeOutMillis = this.timeOutMillis_;
  var startMillis = timeOutMillis ? Date.now() : 0;

  // Handles concatenation of the result and required line breaks.
  var buffer = new HtmlPrettyPrinter.Buffer();

  // Declare these for efficiency since we access them in a loop.
  var tokenRegex = HtmlPrettyPrinter.TOKEN_REGEX_;
  var nonPpTags = HtmlPrettyPrinter.NON_PRETTY_PRINTED_TAGS_;
  var blockTags = HtmlPrettyPrinter.BLOCK_TAGS_;
  var breaksFlowTags = HtmlPrettyPrinter.BREAKS_FLOW_TAGS_;
  var emptyTags = HtmlPrettyPrinter.EMPTY_TAGS_;

  // Used to verify we're making progress through our regex tokenization.
  var lastIndex = 0;

  // Use this to track non-pretty-printed tags and children.
  var nonPpTagStack = [];

  // Loop through each matched token.
  var match;
  while (match = tokenRegex.exec(html)) {
    // Get token.
    var token = match[0];

    // Is this token a tag? match.length == 3 for tags, 1 for all others.
    if (match.length == 3) {
      var tagName = match[2];
      if (tagName) {
        tagName = tagName.toUpperCase();
      }

      // Non-pretty-printed tags?
      if (nonPpTags.hasOwnProperty(tagName)) {
        // End tag?
        if (match[1] == '/') {
          // Do we have a matching start tag?
          var stackSize = nonPpTagStack.length;
          var startTagName = stackSize ? nonPpTagStack[stackSize - 1] : null;
          if (startTagName == tagName) {
            // End of non-pretty-printed block. Line break after.
            nonPpTagStack.pop();
            buffer.pushToken(false, token, !nonPpTagStack.length);
          } else {
            // Malformed HTML. No line breaks.
            buffer.pushToken(false, token, false);
          }
        } else {
          // Start of non-pretty-printed block. Line break before.
          buffer.pushToken(!nonPpTagStack.length, token, false);
          nonPpTagStack.push(tagName);
        }
      } else if (nonPpTagStack.length) {
        // Inside non-pretty-printed block, no new line breaks.
        buffer.pushToken(false, token, false);
      } else if (blockTags.hasOwnProperty(tagName)) {
        // Put line break before start block and after end block tags.
        var isEmpty = emptyTags.hasOwnProperty(tagName);
        var isEndTag = match[1] == '/';
        buffer.pushToken(isEmpty || !isEndTag, token, isEmpty || isEndTag);
      } else if (breaksFlowTags.hasOwnProperty(tagName)) {
        var isEmpty = emptyTags.hasOwnProperty(tagName);
        var isEndTag = match[1] == '/';
        // Put line break after end flow-breaking tags.
        buffer.pushToken(false, token, isEndTag || isEmpty);
      } else {
        // All other tags, no line break.
        buffer.pushToken(false, token, false);
      }
    } else {
      // Non-tags, no line break.
      buffer.pushToken(false, token, false);
    }

    // Double check that we're making progress.
    var newLastIndex = tokenRegex.lastIndex;
    if (!token || newLastIndex <= lastIndex) {
      throw new Error('Regex failed to make progress through source html.');
    }
    lastIndex = newLastIndex;

    // Out of time?
    if (timeOutMillis) {
      if (Date.now() - startMillis > timeOutMillis) {
        // Push unprocessed data as one big token and reset regex object.
        buffer.pushToken(false, html.substring(tokenRegex.lastIndex), false);
        tokenRegex.lastIndex = 0;
        break;
      }
    }
  }

  // Ensure we end in a line break.
  buffer.lineBreak();

  // Construct result string.
  var result = String(buffer);

  // Length should be original length plus # line breaks added.
  var expectedLength = html.length + buffer.breakCount;
  if (result.length != expectedLength) {
    throw new Error('Lost data pretty printing html.');
  }

  return result;
};



/**
 * This class is a buffer to which we push our output. It tracks line breaks to
 * make sure we don't add unnecessary ones.
 * @constructor
 * @final
 */
HtmlPrettyPrinter.Buffer = function() {
  /**
     * Tokens to be output in #toString.
     * @type {StringBuffer}
     * @private
     */
  this.out_ = new StringBuffer();
};


/**
 * Tracks number of line breaks added.
 * @type {number}
 */
HtmlPrettyPrinter.Buffer.prototype.breakCount = 0;


/**
 * Tracks if we are at the start of a new line.
 * @type {boolean}
 * @private
 */
HtmlPrettyPrinter.Buffer.prototype.isBeginningOfNewLine_ = true;


/**
 * Tracks if we need a new line before the next token.
 * @type {boolean}
 * @private
 */
HtmlPrettyPrinter.Buffer.prototype.needsNewLine_ = false;


/**
 * Adds token and necessary line breaks to output buffer.
 * @param {boolean} breakBefore If true, add line break before token if
 *     necessary.
 * @param {string} token Token to push.
 * @param {boolean} breakAfter If true, add line break after token if
 *     necessary.
 */
HtmlPrettyPrinter.Buffer.prototype.pushToken = function(
    breakBefore, token, breakAfter) {
  // If this token needs a preceding line break, and
  // we haven't already added a line break, and
  // this token does not start with a line break,
  // then add line break.
  // Due to FF3.0 bug with lists, we don't insert a /n
  // right before </ul>. See bug 1520665.
  if ((this.needsNewLine_ || breakBefore) && !/^\r?\n/.test(token) &&
      !/\/ul/i.test(token)) {
    this.lineBreak();
  }

  // Token.
  this.out_.append(token);

  // Remember if this string ended with a line break so we know we don't have to
  // insert another one before the next token.
  this.isBeginningOfNewLine_ = /\r?\n$/.test(token);

  // Remember if this token requires a line break after it. We don't insert it
  // here because we might not have to if the next token starts with a line
  // break.
  this.needsNewLine_ = breakAfter && !this.isBeginningOfNewLine_;
};


/**
 * Append line break if we need one.
 */
HtmlPrettyPrinter.Buffer.prototype.lineBreak = function() {
  if (!this.isBeginningOfNewLine_) {
    this.out_.append('\n');
    ++this.breakCount;
  }
};


/**
 * @return {string} String representation of tokens.
 * @override
 */
HtmlPrettyPrinter.Buffer.prototype.toString = function() {
  return this.out_.toString();
};
