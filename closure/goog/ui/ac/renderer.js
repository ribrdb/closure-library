/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class for rendering the results of an auto complete and
 * allow the user to select an row.
 */

import * as aria from '../../a11y/aria/aria.js';

import { Role } from '../../a11y/aria/roles.js';
import { State } from '../../a11y/aria/attributes.js';
import * as asserts from '../../asserts/asserts.js';
import { dispose } from '../../disposable/dispose.js';
import * as dom from '../../dom/dom.js';
import { NodeType } from '../../dom/nodetype.js';
import { TagName } from '../../dom/tagname.js';
import * as classlist from '../../dom/classlist.js';
import * as events from '../../events/events.js';
import { EventTarget } from '../../events/eventtarget.js';
import { EventType } from '../../events/eventtype.js';
import { FadeInAndShow, FadeOutAndHide } from '../../fx/dom.js';
import * as positioning from '../../positioning/positioning.js';
import { Corner, Overflow } from '../../positioning/positioning.js';
import * as googString from '../../string/string.js';
import * as style from '../../style/style.js';
import { IdGenerator } from '../idgenerator.js';
import { AutoComplete } from './autocomplete.js';
const { Event } = goog.requireType('goog.events.event');
const { Animation } = goog.requireType('goog.fx.animation');



/**
 * Class for rendering the results of an auto-complete in a drop down list.
 *
 * @constructor
 * @param {Element=} opt_parentNode optional reference to the parent element
 *     that will hold the autocomplete elements. dom.getDocument().body
 *     will be used if this is null.
 * @param {?({renderRow}|{render})=} opt_customRenderer Custom full renderer to
 *     render each row. Should be something with a renderRow or render method.
 * @param {boolean=} opt_rightAlign Determines if the autocomplete will always
 *     be right aligned. False by default.
 * @param {boolean=} opt_useStandardHighlighting Determines if standard
 *     highlighting should be applied to each row of data. Standard highlighting
 *     bolds every matching substring for a given token in each row. True by
 *     default.
 * @extends {EventTarget}
 * @suppress {underscore}
 */
export function Renderer(
  opt_parentNode,
  opt_customRenderer,
  opt_rightAlign,
  opt_useStandardHighlighting
) {
  Renderer.base(this, 'constructor');

  /**
   * Reference to the parent element that will hold the autocomplete elements
   * @type {Element}
   * @private
   */
  this.parent_ = opt_parentNode || dom.getDocument().body;

  /**
     * Dom helper for the parent element's document.
     * @type {dom.DomHelper}
     * @private
     */
  this.dom_ = dom.getDomHelper(this.parent_);

  /**
   * Whether to reposition the autocomplete UI below the target node
   * @type {boolean}
   * @private
   */
  this.reposition_ = !opt_parentNode;

  /**
   * Reference to the main element that controls the rendered autocomplete
   * @type {?Element}
   * @private
   */
  this.element_ = null;

  /**
   * The current token that has been entered
   * @type {string}
   * @private
   */
  this.token_ = '';

  /**
   * Array used to store the current set of rows being displayed
   * @type {Array<!Object>}
   * @private
   */
  this.rows_ = [];

  /**
   * Array of the node divs that hold each result that is being displayed.
   * @type {Array<Element>}
   * @protected
   * @suppress {underscore|visibility}
   */
  this.rowDivs_ = [];

  /**
   * The index of the currently highlighted row
   * @type {number}
   * @protected
   * @suppress {underscore|visibility}
   */
  this.hilitedRow_ = -1;

  /**
   * The time that the rendering of the menu rows started
   * @type {number}
   * @protected
   * @suppress {underscore|visibility}
   */
  this.startRenderingRows_ = -1;

  /**
   * Store the current state for the renderer
   * @type {boolean}
   * @private
   */
  this.visible_ = false;

  /**
   * Classname for the main element.  This must be a single valid class name.
   * @type {string}
   */
  this.className = goog.getCssName('ac-renderer');

  /**
   * Classname for row divs.  This must be a single valid class name.
   * @type {string}
   */
  this.rowClassName = goog.getCssName('ac-row');

  // TODO(gboyer): Remove this as soon as we remove references and ensure that
  // no groups are pushing javascript using this.
  /**
   * The old class name for active row.  This name is deprecated because its
   * name is generic enough that a typical implementation would require a
   * descendant selector.
   * Active row will have rowClassName & activeClassName &
   * legacyActiveClassName.
   * @type {string}
   * @private
   */
  this.legacyActiveClassName_ = goog.getCssName('active');

  /**
   * Class name for active row div.  This must be a single valid class name.
   * Active row will have rowClassName & activeClassName &
   * legacyActiveClassName.
   * @type {string}
   */
  this.activeClassName = goog.getCssName('ac-active');

  /**
   * Class name for the bold tag highlighting the matched part of the text.
   * @type {string}
   */
  this.highlightedClassName = goog.getCssName('ac-highlighted');

  /**
   * Custom full renderer
   * @type {?({renderRow}|{render})}
   * @private
   */
  this.customRenderer_ = opt_customRenderer || null;

  /**
   * Flag to indicate whether standard highlighting should be applied.
   * this is set to true if left unspecified to retain existing
   * behaviour for autocomplete clients
   * @type {boolean}
   * @private
   */
  this.useStandardHighlighting_ =
      opt_useStandardHighlighting != null ? opt_useStandardHighlighting : true;

  /**
   * Flag to indicate whether matches should be done on whole words instead
   * of any string.
   * @type {boolean}
   * @private
   */
  this.matchWordBoundary_ = true;

  /**
   * Flag to set all tokens as highlighted in the autocomplete row.
   * @type {boolean}
   * @private
   */
  this.highlightAllTokens_ = false;

  /**
   * Determines if the autocomplete will always be right aligned
   * @type {boolean}
   * @private
   */
  this.rightAlign_ = !!opt_rightAlign;

  /**
   * Whether to align with top of target field
   * @type {boolean}
   * @private
   */
  this.topAlign_ = false;

  /**
   * Duration (in msec) of fade animation when menu is shown/hidden.
   * Setting to 0 (default) disables animation entirely.
   * @type {number}
   * @private
   */
  this.menuFadeDuration_ = 0;

  /**
   * Whether we should limit the dropdown from extending past the bottom of the
   * screen and instead show a scrollbar on the dropdown.
   * @type {boolean}
   * @private
   */
  this.showScrollbarsIfTooLarge_ = false;

  /**
   * Animation in progress, if any.
   * @type {Animation|undefined}
   */
  this.animation_;
}
goog.inherits(Renderer, EventTarget);


/**
 * The anchor element to position the rendered autocompleter against.
 * @type {Element}
 * @private
 */
Renderer.prototype.anchorElement_;


/**
 * The anchor element to position the rendered autocompleter against.
 * @protected {Element|undefined}
 */
Renderer.prototype.target_;


/**
 * The element on which to base the width of the autocomplete.
 * @protected {Node}
 */
Renderer.prototype.widthProvider_;


/**
 * The element on which to base the max width of the autocomplete.
 * @protected {!Node|undefined}
 */
Renderer.prototype.maxWidthProvider_;


/**
 * The border width of the autocomplete dropdown, only used in calculating the
 * dropdown width.
 * @private {number}
 */
Renderer.prototype.borderWidth_ = 0;


/**
 * A flag used to make sure we highlight only one match in the rendered row.
 * @private {boolean}
 */
Renderer.prototype.wasHighlightedAtLeastOnce_;


/**
 * The delay before mouseover events are registered, in milliseconds
 * @type {number}
 * @const
 */
Renderer.DELAY_BEFORE_MOUSEOVER = 300;


/**
 * Gets the renderer's element.
 * @return {Element} The  main element that controls the rendered autocomplete.
 */
Renderer.prototype.getElement = function() {
  return this.element_;
};


/**
 * Sets the width provider element. The provider is only used on redraw and as
 * such will not automatically update on resize.
 * @param {Node} widthProvider The element whose width should be mirrored.
 * @param {number=} opt_borderWidth The width of the border of the autocomplete,
 *     which will be subtracted from the width of the autocomplete dropdown.
 * @param {!Node=} maxWidthProvider The element whose width should be used
 *     as the autocomplete's max width.
 */
Renderer.prototype.setWidthProvider = function(
    widthProvider, opt_borderWidth, maxWidthProvider = undefined) {
  this.widthProvider_ = widthProvider;
  if (opt_borderWidth) {
    this.borderWidth_ = opt_borderWidth;
  }
  if (maxWidthProvider) {
    this.maxWidthProvider_ = maxWidthProvider;
  }
};


/**
 * Set whether to align autocomplete to top of target element
 * @param {boolean} align If true, align to top.
 */
Renderer.prototype.setTopAlign = function(align) {
  this.topAlign_ = align;
};


/**
 * @return {boolean} Whether we should be aligning to the top of
 *     the target element.
 */
Renderer.prototype.getTopAlign = function() {
  return this.topAlign_;
};


/**
 * Set whether to align autocomplete to the right of the target element.
 * @param {boolean} align If true, align to right.
 */
Renderer.prototype.setRightAlign = function(align) {
  this.rightAlign_ = align;
};


/**
 * @return {boolean} Whether the autocomplete menu should be right aligned.
 */
Renderer.prototype.getRightAlign = function() {
  return this.rightAlign_;
};


/**
 * @param {boolean} show Whether we should limit the dropdown from extending
 *     past the bottom of the screen and instead show a scrollbar on the
 *     dropdown.
 */
Renderer.prototype.setShowScrollbarsIfTooLarge = function(show) {
  this.showScrollbarsIfTooLarge_ = show;
};


/**
 * Set whether or not standard highlighting should be used when rendering rows.
 * @param {boolean} useStandardHighlighting true if standard highlighting used.
 */
Renderer.prototype.setUseStandardHighlighting = function(
    useStandardHighlighting) {
  this.useStandardHighlighting_ = useStandardHighlighting;
};


/**
 * @param {boolean} matchWordBoundary Determines whether matches should be
 *     higlighted only when the token matches text at a whole-word boundary.
 *     True by default.
 */
Renderer.prototype.setMatchWordBoundary = function(
    matchWordBoundary) {
  this.matchWordBoundary_ = matchWordBoundary;
};


/**
 * Set whether or not to highlight all matching tokens rather than just the
 * first.
 * @param {boolean} highlightAllTokens Whether to highlight all matching tokens
 *     rather than just the first.
 */
Renderer.prototype.setHighlightAllTokens = function(
    highlightAllTokens) {
  this.highlightAllTokens_ = highlightAllTokens;
};


/**
 * Sets the duration (in msec) of the fade animation when menu is shown/hidden.
 * Setting to 0 (default) disables animation entirely.
 * @param {number} duration Duration (in msec) of the fade animation (or 0 for
 *     no animation).
 */
Renderer.prototype.setMenuFadeDuration = function(duration) {
  this.menuFadeDuration_ = duration;
};


/**
 * Sets the anchor element for the subsequent call to renderRows.
 * @param {Element} anchor The anchor element.
 */
Renderer.prototype.setAnchorElement = function(anchor) {
  this.anchorElement_ = anchor;
};


/**
 * @return {Element} The anchor element.
 * @protected
 */
Renderer.prototype.getAnchorElement = function() {
  return this.anchorElement_;
};


/**
 * Render the autocomplete UI
 *
 * @param {Array<!Object>} rows Matching UI rows.
 * @param {string} token Token we are currently matching against.
 * @param {Element=} opt_target Current HTML node, will position popup beneath
 *     this node.
 */
Renderer.prototype.renderRows = function(rows, token, opt_target) {
  this.token_ = token;
  this.rows_ = rows;
  this.hilitedRow_ = -1;
  this.startRenderingRows_ = goog.now();
  this.target_ = opt_target;
  this.rowDivs_ = [];
  this.redraw();
};


/**
 * Hide the object.
 */
Renderer.prototype.dismiss = function() {
  if (this.visible_) {
    this.visible_ = false;
    this.toggleAriaMarkup_(false /* isShown */);

    if (this.menuFadeDuration_ > 0) {
      dispose(this.animation_);
      this.animation_ =
          new FadeOutAndHide(this.element_, this.menuFadeDuration_);
      this.animation_.play();
    } else {
      style.setElementShown(this.element_, false);
    }
  }
};


/**
 * Show the object.
 */
Renderer.prototype.show = function() {
  if (!this.visible_) {
    this.visible_ = true;
    this.toggleAriaMarkup_(true /* isShown */);

    if (this.menuFadeDuration_ > 0) {
      dispose(this.animation_);
      this.animation_ =
          new FadeInAndShow(this.element_, this.menuFadeDuration_);
      this.animation_.play();
    } else {
      style.setElementShown(this.element_, true);
    }
  }
};


/**
 * Toggle the ARIA markup to add popup semantics when the target is shown and
 * to remove them when it is hidden.
 * @param {boolean} isShown Whether the menu is being shown.
 * @private
 */
Renderer.prototype.toggleAriaMarkup_ = function(isShown) {
  if (!this.target_) {
    return;
  }

  aria.setState(this.target_, State.HASPOPUP, isShown);
  aria.setState(
      asserts.assert(this.element_), State.EXPANDED,
      isShown);
  aria.setState(this.target_, State.EXPANDED, isShown);
  if (isShown) {
    aria.setState(
        this.target_, State.OWNS, this.element_.id);
  } else {
    aria.removeState(this.target_, State.OWNS);
    aria.setActiveDescendant(this.target_, null);
  }
};


/**
 * @return {boolean} True if the object is visible.
 */
Renderer.prototype.isVisible = function() {
  return this.visible_;
};


/**
 * Sets the 'active' class of the nth item.
 * @param {number} index Index of the item to highlight.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Renderer.prototype.hiliteRow = function(index) {
  var row =
      index >= 0 && index < this.rows_.length ? this.rows_[index] : undefined;
  var rowDiv = index >= 0 && index < this.rowDivs_.length ?
      this.rowDivs_[index] :
      undefined;

  var evtObj = /** @lends {Event.prototype} */ ({
    type: AutoComplete.EventType.ROW_HILITE,
    rowNode: rowDiv,
    row: row ? row.data : null
  });
  if (this.dispatchEvent(evtObj)) {
    this.hiliteNone();
    this.hilitedRow_ = index;
    if (rowDiv) {
      classlist.addAll(
          rowDiv, [this.activeClassName, this.legacyActiveClassName_]);
      if (this.target_) {
        aria.setActiveDescendant(this.target_, rowDiv);
      }
      style.scrollIntoContainerView(rowDiv, this.element_);
    }
  }
};


/**
 * Removes the 'active' class from the currently selected row.
 */
Renderer.prototype.hiliteNone = function() {
  if (this.hilitedRow_ >= 0) {
    classlist.removeAll(
        asserts.assert(this.rowDivs_[this.hilitedRow_]),
        [this.activeClassName, this.legacyActiveClassName_]);
  }
};


/**
 * Sets the 'active' class of the item with a given id.
 * @param {number} id Id of the row to hilight. If id is -1 then no rows get
 *     hilited.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Renderer.prototype.hiliteId = function(id) {
  if (id == -1) {
    this.hiliteRow(-1);
  } else {
    for (var i = 0; i < this.rows_.length; i++) {
      if (this.rows_[i].id == id) {
        this.hiliteRow(i);
        return;
      }
    }
  }
};


/**
 * Sets CSS classes on autocomplete conatainer element.
 *
 * @param {Element} elem The container element.
 * @private
 */
Renderer.prototype.setMenuClasses_ = function(elem) {
  asserts.assert(elem);
  // Legacy clients may set the renderer's className to a space-separated list
  // or even have a trailing space.
  classlist.addAll(elem, googString.trim(this.className).split(' '));
};


/**
 * If the main HTML element hasn't been made yet, creates it and appends it
 * to the parent.
 * @private
 */
Renderer.prototype.maybeCreateElement_ = function() {
  if (!this.element_) {
    // Make element and add it to the parent
    var el = this.dom_.createDom(TagName.DIV, {style: 'display:none'});
    if (this.showScrollbarsIfTooLarge_) {
      // Make sure that the dropdown will get scrollbars if it isn't large
      // enough to show all rows.
      el.style.overflowY = 'auto';
    }
    this.element_ = el;
    this.setMenuClasses_(el);
    aria.setRole(el, Role.LISTBOX);

    el.id = IdGenerator.getInstance().getNextUniqueId();

    this.dom_.appendChild(this.parent_, el);

    // Add this object as an event handler
    events.listen(
        el, EventType.CLICK, this.handleClick_, false, this);
    events.listen(
        el, EventType.MOUSEDOWN, this.handleMouseDown_, false,
        this);
    events.listen(
        el, EventType.MOUSEOVER, this.handleMouseOver_, false,
        this);
  }
};


/**
 * Redraw (or draw if this is the first call) the rendered auto-complete drop
 * down.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Renderer.prototype.redraw = function() {
  // Create the element if it doesn't yet exist
  this.maybeCreateElement_();

  // For top aligned with target (= bottom aligned element),
  // we need to hide and then add elements while hidden to prevent
  // visible repositioning
  if (this.topAlign_) {
    this.element_.style.visibility = 'hidden';
  }

  if (this.widthProvider_) {
    var width = this.widthProvider_.clientWidth - this.borderWidth_ + 'px';
    this.element_.style.minWidth = width;
  }
  if (this.maxWidthProvider_) {
    const maxWidth =
        this.maxWidthProvider_.clientWidth - this.borderWidth_ + 'px';
    this.element_.style.maxWidth = maxWidth;
  }

  // Remove the current child nodes
  this.rowDivs_.length = 0;
  this.dom_.removeChildren(this.element_);

  // Generate the new rows (use forEach so we can change rows_ from an
  // array to a different datastructure if required)
  if (this.customRenderer_ && this.customRenderer_.render) {
    this.customRenderer_.render(this, this.element_, this.rows_, this.token_);
  } else {
    var curRow = null;
    this.rows_.forEach(function(row) {
      row = this.renderRowHtml(row, this.token_);
      if (this.topAlign_) {
        // Aligned with top of target = best match at bottom
        this.element_.insertBefore(row, curRow);
      } else {
        this.dom_.appendChild(this.element_, row);
      }
      curRow = row;
    }, this);
  }

  // Don't show empty result sets
  if (this.rows_.length == 0) {
    this.dismiss();
    return;
  } else {
    this.show();
  }

  this.reposition();

  // Make the autocompleter unselectable, so that it
  // doesn't steal focus from the input field when clicked.
  style.setUnselectable(this.element_, true);
};


/**
 * @return {Corner} The anchor corner to position the popup at.
 * @protected
 */
Renderer.prototype.getAnchorCorner = function() {
  var anchorCorner = this.rightAlign_ ? Corner.BOTTOM_RIGHT :
                                        Corner.BOTTOM_LEFT;
  if (this.topAlign_) {
    anchorCorner = positioning.flipCornerVertical(anchorCorner);
  }
  return anchorCorner;
};


/**
 * Repositions the auto complete popup relative to the location node, if it
 * exists and the auto position has been set.
 */
Renderer.prototype.reposition = function() {
  if (this.target_ && this.reposition_) {
    var anchorElement = this.anchorElement_ || this.target_;
    var anchorCorner = this.getAnchorCorner();

    var overflowMode = Overflow.ADJUST_X_EXCEPT_OFFSCREEN;
    if (this.showScrollbarsIfTooLarge_) {
      // positionAtAnchor will set the height of this.element_ when it runs
      // (because of RESIZE_HEIGHT), and it will never increase it relative to
      // its current value when it runs again. But if the user scrolls their
      // page, then we might actually want a bigger height when the dropdown is
      // displayed next time. So we clear the height before calling
      // positionAtAnchor, so it is free to set the height as large as it
      // chooses.
      this.element_.style.height = '';
      overflowMode |= Overflow.RESIZE_HEIGHT;
    }

    positioning.positionAtAnchor(
        anchorElement, anchorCorner, this.element_,
        positioning.flipCornerVertical(anchorCorner), null, null,
        overflowMode);

    if (this.topAlign_) {
      // This flickers, but is better than the alternative of positioning
      // in the wrong place and then moving.
      this.element_.style.visibility = 'visible';
    }
  }
};


/**
 * Sets whether the renderer should try to determine where to position the
 * drop down.
 * @param {boolean} auto Whether to autoposition the drop down.
 */
Renderer.prototype.setAutoPosition = function(auto) {
  this.reposition_ = auto;
};


/**
 * @return {boolean} Whether the drop down will be autopositioned.
 * @protected
 */
Renderer.prototype.getAutoPosition = function() {
  return this.reposition_;
};


/**
 * @return {Element} The target element.
 * @protected
 */
Renderer.prototype.getTarget = function() {
  return this.target_ || null;
};


/**
 * Disposes of the renderer and its associated HTML.
 * @override
 * @protected
 */
Renderer.prototype.disposeInternal = function() {
  if (this.element_) {
    events.unlisten(
        this.element_, EventType.CLICK, this.handleClick_, false,
        this);
    events.unlisten(
        this.element_, EventType.MOUSEDOWN, this.handleMouseDown_,
        false, this);
    events.unlisten(
        this.element_, EventType.MOUSEOVER, this.handleMouseOver_,
        false, this);
    this.dom_.removeNode(this.element_);
    this.element_ = null;
    this.visible_ = false;
  }

  dispose(this.animation_);
  this.parent_ = null;

  Renderer.base(this, 'disposeInternal');
};


/**
 * Generic function that takes a row and renders a DOM structure for that row.
 *
 * Normally this will only be matching a maximum of 20 or so items.  Even with
 * 40 rows, DOM this building is fine.
 * @param {Object} row Object representing row.
 * @param {string} token Token to highlight.
 * @param {Node} node The node to render into.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Renderer.prototype.renderRowContents_ = function(row, token, node) {
  dom.setTextContent(node, row.data.toString());
};


/**
 * Goes through a node and all of its child nodes, replacing HTML text that
 * matches a token with <b>token</b>.
 * The replacement will happen on the first match or all matches depending on
 * this.highlightAllTokens_ value.
 *
 * @param {Node} node Node to match.
 * @param {string|Array<string>} tokenOrArray Token to match or array of tokens
 *     to match.  By default, only the first match will be highlighted.  If
 *     highlightAllTokens is set, then all tokens appearing at the start of a
 *     word, in whatever order and however many times, will be highlighted.
 * @private
 */
Renderer.prototype.startHiliteMatchingText_ = function(
    node, tokenOrArray) {
  this.wasHighlightedAtLeastOnce_ = false;
  this.hiliteMatchingText_(node, tokenOrArray);
};


/**
 * @param {Node} node Node to match.
 * @param {string|Array<string>} tokenOrArray Token to match or array of tokens
 *     to match.
 * @private
 */
Renderer.prototype.hiliteMatchingText_ = function(
    node, tokenOrArray) {
  if (!this.highlightAllTokens_ && this.wasHighlightedAtLeastOnce_) {
    return;
  }

  if (node.nodeType == NodeType.TEXT) {
    var rest = null;
    if (Array.isArray(tokenOrArray) && tokenOrArray.length > 1 &&
        !this.highlightAllTokens_) {
      rest = tokenOrArray.slice(1);
    }

    var token = this.getTokenRegExp_(tokenOrArray);
    if (token.length == 0) return;

    var text = node.nodeValue;

    // Create a regular expression to match a token at the beginning of a line
    // or preceded by non-alpha-numeric characters. Note: token could have |
    // operators in it, so we need to parenthesise it before adding \b to it.
    // or preceded by non-alpha-numeric characters
    //
    // NOTE(user): When using word matches, this used to have
    // a (^|\\W+) clause where it now has \\b but it caused various
    // browsers to hang on really long strings. The (^|\\W+) matcher was also
    // unnecessary, because \b already checks that the character before the
    // is a non-word character, and ^ matches the start of the line or following
    // a line terminator character, which is also \W. The regexp also used to
    // have a capturing match before the \\b, which would capture the
    // non-highlighted content, but that caused the regexp matching to run much
    // slower than the current version.
    var re = this.matchWordBoundary_ ?
        new RegExp('\\b(?:' + token + ')', 'gi') :
        new RegExp(token, 'gi');
    var textNodes = [];
    var lastIndex = 0;

    // Find all matches
    // Note: text.split(re) has inconsistencies between IE and FF, so
    // manually recreated the logic
    var match = re.exec(text);
    var numMatches = 0;
    while (match) {
      numMatches++;
      textNodes.push(text.substring(lastIndex, match.index));
      textNodes.push(text.substring(match.index, re.lastIndex));
      lastIndex = re.lastIndex;
      match = re.exec(text);
    }
    textNodes.push(text.substring(lastIndex));

    // Replace the tokens with bolded text.  Each pair of textNodes
    // (starting at index idx) includes a node of text before the bolded
    // token, and a node (at idx + 1) consisting of what should be
    // enclosed in bold tags.
    if (textNodes.length > 1) {
      var maxNumToBold = !this.highlightAllTokens_ ? 1 : numMatches;
      for (var i = 0; i < maxNumToBold; i++) {
        var idx = 2 * i;

        node.nodeValue = textNodes[idx];
        var boldTag = this.dom_.createElement(TagName.B);
        boldTag.className = this.highlightedClassName;
        this.dom_.appendChild(
            boldTag, this.dom_.createTextNode(textNodes[idx + 1]));
        boldTag = node.parentNode.insertBefore(boldTag, node.nextSibling);
        node.parentNode.insertBefore(
            this.dom_.createTextNode(''), boldTag.nextSibling);
        node = boldTag.nextSibling;
      }

      // Append the remaining text nodes to the end.
      var remainingTextNodes = textNodes.slice(maxNumToBold * 2);
      node.nodeValue = remainingTextNodes.join('');

      this.wasHighlightedAtLeastOnce_ = true;
    } else if (rest) {
      this.hiliteMatchingText_(node, rest);
    }
  } else {
    var child = node.firstChild;
    while (child) {
      var nextChild = child.nextSibling;
      this.hiliteMatchingText_(child, tokenOrArray);
      child = nextChild;
    }
  }
};


/**
 * Transforms a token into a string ready to be put into the regular expression
 * in hiliteMatchingText_.
 * @param {string|Array<string>} tokenOrArray The token or array to get the
 *     regex string from.
 * @return {string} The regex-ready token.
 * @private
 */
Renderer.prototype.getTokenRegExp_ = function(tokenOrArray) {
  var token = '';

  if (!tokenOrArray) {
    return token;
  }

  if (Array.isArray(tokenOrArray)) {
    // Remove invalid tokens from the array, which may leave us with nothing.
    tokenOrArray = tokenOrArray.filter(function(str) {
      return !googString.isEmptyOrWhitespace(googString.makeSafe(str));
    });
  }

  // If highlighting all tokens, join them with '|' so the regular expression
  // will match on any of them.
  if (this.highlightAllTokens_) {
    if (Array.isArray(tokenOrArray)) {
      var tokenArray = tokenOrArray.map(googString.regExpEscape);
      token = tokenArray.join('|');
    } else {
      // Remove excess whitespace from the string so bars will separate valid
      // tokens in the regular expression.
      token = googString.collapseWhitespace(tokenOrArray);

      token = googString.regExpEscape(token);
      token = token.replace(/ /g, '|');
    }
  } else {
    // Not highlighting all matching tokens.  If tokenOrArray is a string, use
    // that as the token.  If it is an array, use the first element in the
    // array.
    // TODO(user): why is this this way?. We should match against all
    // tokens in the array, but only accept the first match.
    if (Array.isArray(tokenOrArray)) {
      token = tokenOrArray.length > 0 ?
          googString.regExpEscape(tokenOrArray[0]) :
          '';
    } else {
      // For the single-match string token, we refuse to match anything if
      // the string begins with a non-word character, as matches by definition
      // can only occur at the start of a word. (This also handles the
      // goog.string.isEmptyOrWhitespace(goog.string.makeSafe(tokenOrArray))
      // case.)
      if (!/^\W/.test(tokenOrArray)) {
        token = googString.regExpEscape(tokenOrArray);
      }
    }
  }

  return token;
};


/**
 * Render a row by creating a div and then calling row rendering callback or
 * default row handler
 *
 * @param {Object} row Object representing row.
 * @param {string} token Token to highlight.
 * @return {!Element} An element with the rendered HTML.
 * @suppress {strictMissingProperties} this.customRenderer_ and renderRow
 */
Renderer.prototype.renderRowHtml = function(row, token) {
  // Create and return the element.
  var elem = this.dom_.createDom(TagName.DIV, {
    className: this.rowClassName,
    id: IdGenerator.getInstance().getNextUniqueId()
  });
  aria.setRole(elem, Role.OPTION);
  if (this.customRenderer_ && this.customRenderer_.renderRow) {
    this.customRenderer_.renderRow(row, token, elem);
  } else {
    this.renderRowContents_(row, token, elem);
  }

  if (token && this.useStandardHighlighting_) {
    this.startHiliteMatchingText_(elem, token);
  }

  classlist.add(elem, this.rowClassName);
  this.rowDivs_.push(elem);
  return elem;
};


/**
 * Given an event target looks up through the parents till it finds a div.  Once
 * found it will then look to see if that is one of the childnodes, if it is
 * then the index is returned, otherwise -1 is returned.
 * @param {Element} et HtmlElement.
 * @return {number} Index corresponding to event target.
 * @private
 */
Renderer.prototype.getRowFromEventTarget_ = function(et) {
  while (et && et != this.element_ &&
         !classlist.contains(et, this.rowClassName)) {
    et = /** @type {Element} */ (et.parentNode);
  }
  return et ? this.rowDivs_.indexOf(et) : -1;
};


/**
 * Handle the click events.  These are redirected to the AutoComplete object
 * which then makes a callback to select the correct row.
 * @param {Event} e Browser event object.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Renderer.prototype.handleClick_ = function(e) {
  var index = this.getRowFromEventTarget_(/** @type {Element} */ (e.target));
  if (index >= 0) {
    this.dispatchEvent(/** @lends {Event.prototype} */ ({
      type: AutoComplete.EventType.SELECT,
      row: this.rows_[index].id
    }));
  }
  e.stopPropagation();
};


/**
 * Handle the mousedown event and prevent the AC from losing focus.
 * @param {Event} e Browser event object.
 * @private
 */
Renderer.prototype.handleMouseDown_ = function(e) {
  e.stopPropagation();
  e.preventDefault();
};


/**
 * Handle the mousing events.  These are redirected to the AutoComplete object
 * which then makes a callback to set the correctly highlighted row.  This is
 * because the AutoComplete can move the focus as well, and there is no sense
 * duplicating the code
 * @param {Event} e Browser event object.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Renderer.prototype.handleMouseOver_ = function(e) {
  var index = this.getRowFromEventTarget_(/** @type {Element} */ (e.target));
  if (index >= 0) {
    if ((goog.now() - this.startRenderingRows_) <
        Renderer.DELAY_BEFORE_MOUSEOVER) {
      return;
    }

    this.dispatchEvent({
      type: AutoComplete.EventType.HILITE,
      row: this.rows_[index].id
    });
  }
};



/**
 * Class allowing different implementations to custom render the autocomplete.
 * Extending classes should override the render function.
 * @constructor
 */
Renderer.CustomRenderer = function() {};


/**
 * Renders the autocomplete box. May be set to null.
 *
 * Because of the type, this function cannot be documented with param JSDoc.
 *
 * The function expects the following parameters:
 *
 * renderer, Renderer: The autocomplete renderer.
 * element, Element: The main element that controls the rendered autocomplete.
 * rows, Array: The current set of rows being displayed.
 * token, string: The current token that has been entered. *
 *
 * @type {function(Renderer, Element, Array, string)|
 *        null|undefined}
 */
Renderer.CustomRenderer.prototype.render = function(
    renderer, element, rows, token) {};


/**
 * Generic function that takes a row and renders a DOM structure for that row.
 * @param {Object} row Object representing row.
 * @param {string} token Token to highlight.
 * @param {Node} node The node to render into.
 */
Renderer.CustomRenderer.prototype.renderRow = function(
    row, token, node) {};
