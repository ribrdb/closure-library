/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Emoji Picker implementation. This provides a UI widget for
 * choosing an emoji from a grid of possible choices.
 *
 * @see ../demos/popupemojipicker.html for an example of how to instantiate
 * an emoji picker.
 *
 * Based on goog.ui.ColorPicker (colorpicker.js).
 *
 * @see ../../demos/popupemojipicker.html
 */

import { TagName } from '../../dom/tagname.js';

import * as style from '../../style/style.js';
import { Component } from '../component.js';
import { TabPane } from '../tabpane.js';
import { Emoji } from './emoji.js';
import { EmojiPalette } from './emojipalette.js';
import { EmojiPaletteRenderer } from './emojipaletterenderer.js';
import { ProgressiveEmojiPaletteRenderer } from './progressiveemojipaletterenderer.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { TabPaneEvent } = goog.requireType('goog.ui.tabpane');



/**
 * Creates a new, empty emoji picker. An emoji picker is a grid of emoji, each
 * cell of the grid containing a single emoji. The picker may contain multiple
 * pages of emoji.
 *
 * When a user selects an emoji, by either clicking or pressing enter, the
 * picker fires a Component.ComponentEventType.ACTION event with the id. The
 * client listens on this event and in the handler can retrieve the id of the
 * selected emoji and do something with it, for instance, inserting an image
 * tag into a rich text control. An emoji picker does not maintain state. That
 * is, once an emoji is selected, the emoji picker does not remember which emoji
 * was selected.
 *
 * The emoji picker is implemented as a tabpane with each tabpage being a table.
 * Each of the tables are the same size to prevent jittering when switching
 * between pages.
 *
 * @param {string} defaultImgUrl Url of the img that should be used to fill up
 *     the cells in the emoji table, to prevent jittering. Should be the same
 *     size as the emoji.
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {Component}
 * @constructor
 */
export function EmojiPicker(defaultImgUrl, opt_domHelper) {
  Component.call(this, opt_domHelper);

  this.defaultImgUrl_ = defaultImgUrl;

  /**
   * Emoji that this picker displays.
   *
   * @type {Array<Object>}
   * @private
   */
  this.emoji_ = [];

  /**
     * Pages of this emoji picker.
     *
     * @type {Array<EmojiPalette>}
     * @private
     */
  this.pages_ = [];

  /**
   * Keeps track of which pages in the picker have been loaded. Used for delayed
   * loading of tabs.
   *
   * @type {Array<boolean>}
   * @private
   */
  this.pageLoadStatus_ = [];

  /**
     * Tabpane to hold the pages of this emojipicker.
     *
     * @type {?TabPane}
     * @private
     */
  this.tabPane_ = null;

  this.getHandler().listen(
      this, Component.ComponentEventType.ACTION, this.onEmojiPaletteAction_);
}
goog.inherits(EmojiPicker, Component);


/**
 * Default number of rows per grid of emoji.
 *
 * @type {number}
 */
EmojiPicker.DEFAULT_NUM_ROWS = 5;


/**
 * Default number of columns per grid of emoji.
 *
 * @type {number}
 */
EmojiPicker.DEFAULT_NUM_COLS = 10;


/**
 * Default location of the tabs in relation to the emoji grids.
 *
 * @type {TabPane.TabLocation}
 */
EmojiPicker.DEFAULT_TAB_LOCATION =
    TabPane.TabLocation.TOP;


/** @private {Emoji} */
EmojiPicker.prototype.selectedEmoji_;


/** @private {EmojiPaletteRenderer} */
EmojiPicker.prototype.renderer_;


/**
 * Number of rows per grid of emoji.
 *
 * @type {number}
 * @private
 */
EmojiPicker.prototype.numRows_ =
    EmojiPicker.DEFAULT_NUM_ROWS;


/**
 * Number of columns per grid of emoji.
 *
 * @type {number}
 * @private
 */
EmojiPicker.prototype.numCols_ =
    EmojiPicker.DEFAULT_NUM_COLS;


/**
 * Whether the number of rows in the picker should be automatically determined
 * by the specified number of columns so as to minimize/eliminate jitter when
 * switching between tabs.
 *
 * @type {boolean}
 * @private
 */
EmojiPicker.prototype.autoSizeByColumnCount_ = true;


/**
 * Location of the tabs for the picker tabpane.
 *
 * @type {TabPane.TabLocation}
 * @private
 */
EmojiPicker.prototype.tabLocation_ =
    EmojiPicker.DEFAULT_TAB_LOCATION;


/**
 * Whether the component is focusable.
 * @type {boolean}
 * @private
 */
EmojiPicker.prototype.focusable_ = true;


/**
 * Url of the img that should be used for cells in the emoji picker that are
 * not filled with emoji, i.e., after all the emoji have already been placed
 * on a page.
 *
 * @type {string}
 * @private
 */
EmojiPicker.prototype.defaultImgUrl_;


/**
 * If present, indicates a prefix that should be prepended to all URLs
 * of images in this emojipicker. This provides an optimization if the URLs
 * are long, so that the client does not have to send a long string for each
 * emoji.
 *
 * @type {string|undefined}
 * @private
 */
EmojiPicker.prototype.urlPrefix_;


/**
 * If true, delay loading the images for the emojipalettes until after
 * construction. This gives a better user experience before the images are in
 * the cache, since other widgets waiting for construction of the emojipalettes
 * won't have to wait for all the images (which may be a substantial amount) to
 * load.
 *
 * @type {boolean}
 * @private
 */
EmojiPicker.prototype.delayedLoad_ = false;


/**
 * Whether to use progressive rendering in the emojipicker's palette, if using
 * sprited imgs. If true, then uses img tags, which most browsers render
 * progressively (i.e., as the data comes in). If false, then uses div tags
 * with the background-image, which some newer browsers render progressively
 * but older ones do not.
 *
 * @type {boolean}
 * @private
 */
EmojiPicker.prototype.progressiveRender_ = false;


/**
 * Whether to require the caller to manually specify when to start loading
 * animated emoji. This is primarily for unittests to be able to test the
 * structure of the emojipicker palettes before and after the animated emoji
 * have been loaded.
 *
 * @type {boolean}
 * @private
 */
EmojiPicker.prototype.manualLoadOfAnimatedEmoji_ = false;


/**
 * Index of the active page in the picker.
 *
 * @type {number}
 * @private
 */
EmojiPicker.prototype.activePage_ = -1;


/**
 * Adds a group of emoji to the picker.
 *
 * @param {string|Element} title Title for the group.
 * @param {Array<Array<string>>} emojiGroup A new group of emoji to be added
 *    Each internal array contains [emojiUrl, emojiId].
 */
EmojiPicker.prototype.addEmojiGroup = function(
    title, emojiGroup) {
  this.emoji_.push({title: title, emoji: emojiGroup});
};


/**
 * Gets the number of rows per grid in the emoji picker.
 *
 * @return {number} number of rows per grid.
 */
EmojiPicker.prototype.getNumRows = function() {
  return this.numRows_;
};


/**
 * Gets the number of columns per grid in the emoji picker.
 *
 * @return {number} number of columns per grid.
 */
EmojiPicker.prototype.getNumColumns = function() {
  return this.numCols_;
};


/**
 * Sets the number of rows per grid in the emoji picker. This should only be
 * called before the picker has been rendered.
 *
 * @param {number} numRows Number of rows per grid.
 */
EmojiPicker.prototype.setNumRows = function(numRows) {
  this.numRows_ = numRows;
};


/**
 * Sets the number of columns per grid in the emoji picker. This should only be
 * called before the picker has been rendered.
 *
 * @param {number} numCols Number of columns per grid.
 */
EmojiPicker.prototype.setNumColumns = function(numCols) {
  this.numCols_ = numCols;
};


/**
 * Sets whether to automatically size the emojipicker based on the number of
 * columns and the number of emoji in each group, so as to reduce jitter.
 *
 * @param {boolean} autoSize Whether to automatically size the picker.
 */
EmojiPicker.prototype.setAutoSizeByColumnCount = function(
    autoSize) {
  this.autoSizeByColumnCount_ = autoSize;
};


/**
 * Sets the location of the tabs in relation to the emoji grids. This should
 * only be called before the picker has been rendered.
 *
 * @param {TabPane.TabLocation} tabLocation The location of the tabs.
 */
EmojiPicker.prototype.setTabLocation = function(tabLocation) {
  this.tabLocation_ = tabLocation;
};


/**
 * Sets whether loading of images should be delayed until after dom creation.
 * Thus, this function must be called before {@link #createDom}. If set to true,
 * the client must call {@link #loadImages} when they wish the images to be
 * loaded.
 *
 * @param {boolean} shouldDelay Whether to delay loading the images.
 */
EmojiPicker.prototype.setDelayedLoad = function(shouldDelay) {
  this.delayedLoad_ = shouldDelay;
};


/**
 * Sets whether to require the caller to manually specify when to start loading
 * animated emoji. This is primarily for unittests to be able to test the
 * structure of the emojipicker palettes before and after the animated emoji
 * have been loaded. This only affects sprited emojipickers with sprite data
 * for animated emoji.
 *
 * @param {boolean} manual Whether to load animated emoji manually.
 */
EmojiPicker.prototype.setManualLoadOfAnimatedEmoji = function(
    manual) {
  this.manualLoadOfAnimatedEmoji_ = manual;
};


/**
 * Returns true if the component is focusable, false otherwise.  The default
 * is true.  Focusable components always have a tab index and allocate a key
 * handler to handle keyboard events while focused.
 * @return {boolean} Whether the component is focusable.
 */
EmojiPicker.prototype.isFocusable = function() {
  return this.focusable_;
};


/**
 * Sets whether the component is focusable.  The default is true.
 * Focusable components always have a tab index and allocate a key handler to
 * handle keyboard events while focused.
 * @param {boolean} focusable Whether the component is focusable.
 */
EmojiPicker.prototype.setFocusable = function(focusable) {
  this.focusable_ = focusable;
  for (let i = 0; i < this.pages_.length; i++) {
    if (this.pages_[i]) {
      this.pages_[i].setSupportedState(
          Component.State.FOCUSED, focusable);
    }
  }
};


/**
 * Sets the URL prefix for the emoji URLs.
 *
 * @param {string} urlPrefix Prefix that should be prepended to all URLs.
 */
EmojiPicker.prototype.setUrlPrefix = function(urlPrefix) {
  this.urlPrefix_ = urlPrefix;
};


/**
 * Sets the progressive rendering aspect of this emojipicker. Must be called
 * before createDom to have an effect.
 *
 * @param {boolean} progressive Whether this picker should render progressively.
 */
EmojiPicker.prototype.setProgressiveRender = function(
    progressive) {
  this.progressiveRender_ = progressive;
};


/**
 * Adjusts the number of rows to be the maximum row count out of all the emoji
 * groups, in order to prevent jitter in switching among the tabs.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
EmojiPicker.prototype.adjustNumRowsIfNecessary_ = function() {
  let currentMax = 0;

  for (let i = 0; i < this.emoji_.length; i++) {
    const numEmoji = this.emoji_[i].emoji.length;
    const rowsNeeded = Math.ceil(numEmoji / this.numCols_);
    if (rowsNeeded > currentMax) {
      currentMax = rowsNeeded;
    }
  }

  this.setNumRows(currentMax);
};


/**
 * Causes the emoji imgs to be loaded into the picker. Used for delayed loading.
 * No-op if delayed loading is not set.
 */
EmojiPicker.prototype.loadImages = function() {
  if (!this.delayedLoad_) {
    return;
  }

  // Load the first page only
  this.loadPage_(0);
  this.activePage_ = 0;
};


/**
 * @override
 * @suppress {deprecated,strictMissingProperties} Part of the go/strict_warnings_migration
 */
EmojiPicker.prototype.createDom = function() {
  this.setElementInternal(this.getDomHelper().createDom(TagName.DIV));

  if (this.autoSizeByColumnCount_) {
    this.adjustNumRowsIfNecessary_();
  }

  if (this.emoji_.length == 0) {
    throw new Error('Must add some emoji to the picker');
  }

  // If there is more than one group of emoji, we construct a tabpane
  if (this.emoji_.length > 1) {
    // Give the tabpane a div to use as its content element, since tabpane
    // overwrites the CSS class of the element it's passed
    const div = this.getDomHelper().createDom(TagName.DIV);
    this.getElement().appendChild(div);
    this.tabPane_ = new TabPane(
        div, this.tabLocation_, this.getDomHelper(), true /* use MOUSEDOWN */);
  }

  this.renderer_ = this.progressiveRender_ ?
      new ProgressiveEmojiPaletteRenderer(this.defaultImgUrl_) :
      new EmojiPaletteRenderer(this.defaultImgUrl_);

  for (let i = 0; i < this.emoji_.length; i++) {
    const emoji = this.emoji_[i].emoji;
    const page = this.delayedLoad_ ? this.createPlaceholderEmojiPage_(emoji) :
                                     this.createEmojiPage_(emoji, i);
    this.pages_.push(page);
  }

  this.activePage_ = 0;
  this.getElement().tabIndex = 0;
};


/**
 * Used by unittests to manually load the animated emoji for this picker.
 */
EmojiPicker.prototype.manuallyLoadAnimatedEmoji = function() {
  for (let i = 0; i < this.pages_.length; i++) {
    this.pages_[i].loadAnimatedEmoji();
  }
};


/**
 * Creates a page if it has not already been loaded. This has the side effects
 * of setting the load status of the page to true.
 *
 * @param {Array<Array<string>>} emoji Emoji for this page. See
 *     {@link addEmojiGroup} for more details.
 * @param {number} index Index of the page in the emojipicker.
 * @return {EmojiPalette} the emoji page.
 * @private
 */
EmojiPicker.prototype.createEmojiPage_ = function(emoji, index) {
  // Safeguard against trying to create the same page twice
  if (this.pageLoadStatus_[index]) {
    return null;
  }

  const palette = new EmojiPalette(
      emoji, this.urlPrefix_, this.renderer_, this.getDomHelper());
  if (!this.manualLoadOfAnimatedEmoji_) {
    palette.loadAnimatedEmoji();
  }
  palette.setSize(this.numCols_, this.numRows_);
  palette.setSupportedState(Component.State.FOCUSED, this.focusable_);
  palette.createDom();
  palette.setParent(this);

  this.pageLoadStatus_[index] = true;

  return palette;
};


/**
 * Returns an array of emoji whose real URLs have been replaced with the
 * default img URL. Used for delayed loading.
 *
 * @param {Array<Array<string>>} emoji Original emoji array.
 * @return {!Array<!Array<string>>} emoji array with all emoji pointing to the
 *     default img.
 * @private
 */
EmojiPicker.prototype.getPlaceholderEmoji_ = function(emoji) {
  const placeholderEmoji = [];

  for (let i = 0; i < emoji.length; i++) {
    placeholderEmoji.push([this.defaultImgUrl_, emoji[i][1]]);
  }

  return placeholderEmoji;
};


/**
 * Creates an emoji page using placeholder emoji pointing to the default
 * img instead of the real emoji. Used for delayed loading.
 *
 * @param {Array<Array<string>>} emoji Emoji for this page. See
 *     {@link addEmojiGroup} for more details.
 * @return {!EmojiPalette} the emoji page.
 * @private
 */
EmojiPicker.prototype.createPlaceholderEmojiPage_ = function(
    emoji) {
  const placeholderEmoji = this.getPlaceholderEmoji_(emoji);

  const palette = new EmojiPalette(
      placeholderEmoji,
      null,  // no url prefix
      this.renderer_, this.getDomHelper());
  palette.setSize(this.numCols_, this.numRows_);
  palette.setSupportedState(Component.State.FOCUSED, this.focusable_);
  palette.createDom();
  palette.setParent(this);

  return palette;
};


/**
 * EmojiPickers cannot be used to decorate pre-existing html, since the
 * structure they build is fairly complicated.
 * @param {Element} element Element to decorate.
 * @return {boolean} Returns always false.
 * @override
 */
EmojiPicker.prototype.canDecorate = function(element) {
  return false;
};


/**
 * @override
 * @suppress {deprecated,strictMissingProperties} Part of the go/strict_warnings_migration
 */
EmojiPicker.prototype.enterDocument = function() {
  EmojiPicker.superClass_.enterDocument.call(this);

  for (let i = 0; i < this.pages_.length; i++) {
    this.pages_[i].enterDocument();
    const pageElement = this.pages_[i].getElement();

    // Add a new tab to the tabpane if there's more than one group of emoji.
    // If there is just one group of emoji, then we simply use the single
    // page's element as the content for the picker
    if (this.pages_.length > 1) {
      // Create a simple default title containg the page number if the title
      // was not provided in the emoji group params
      const title = this.emoji_[i].title || (i + 1);
      this.tabPane_.addPage(
          new TabPane.TabPage(pageElement, title, this.getDomHelper()));
    } else {
      this.getElement().appendChild(/** @type {!Node} */ (pageElement));
    }
  }

  // Initialize listeners. Note that we need to initialize this listener
  // after createDom, because addPage causes the TabPane.Events.CHANGE
  // event to fire, but we only want the handler (which loads delayed images)
  // to run after the picker has been constructed.
  if (this.tabPane_) {
    this.getHandler().listen(
        this.tabPane_, TabPane.Events.CHANGE, this.onPageChanged_);

    // Make the tabpane unselectable so that changing tabs doesn't disturb the
    // cursor
    style.setUnselectable(this.tabPane_.getElement(), true);
  }

  this.getElement().unselectable = 'on';
};


/** @override */
EmojiPicker.prototype.exitDocument = function() {
  EmojiPicker.superClass_.exitDocument.call(this);
  for (let i = 0; i < this.pages_.length; i++) {
    this.pages_[i].exitDocument();
  }
};


/** @override */
EmojiPicker.prototype.disposeInternal = function() {
  EmojiPicker.superClass_.disposeInternal.call(this);

  if (this.tabPane_) {
    this.tabPane_.dispose();
    this.tabPane_ = null;
  }

  for (let i = 0; i < this.pages_.length; i++) {
    this.pages_[i].dispose();
  }
  this.pages_.length = 0;
};


/**
 * @return {string} CSS class for the root element of EmojiPicker.
 */
EmojiPicker.prototype.getCssClass = function() {
  return goog.getCssName('goog-ui-emojipicker');
};


/**
 * Returns the currently selected emoji from this picker. If the picker is
 * using the URL prefix optimization, allocates a new emoji object with the
 * full URL. This method is meant to be used by clients of the emojipicker,
 * e.g., in a listener on goog.ui.Component.ComponentEventType.ACTION that wants to use
 * the just-selected emoji.
 *
 * @return {Emoji} The currently selected emoji from this picker.
 */
EmojiPicker.prototype.getSelectedEmoji = function() {
  return this.urlPrefix_ ? new Emoji(
                               this.urlPrefix_ + this.selectedEmoji_.getUrl(),
                               this.selectedEmoji_.getId()) :
                           this.selectedEmoji_;
};

/**
 * Returns the number of emoji groups in this picker.
 *
 * @return {number} The number of emoji groups in this picker.
 */
EmojiPicker.prototype.getNumEmojiGroups = function() {
  return this.emoji_.length;
};


/**
 * Returns a page from the picker. This should be considered protected, and is
 * ONLY FOR TESTING.
 *
 * @param {number} index Index of the page to return.
 * @return {EmojiPalette?} the page at the specified index or null
 *     if none exists.
 */
EmojiPicker.prototype.getPage = function(index) {
  return this.pages_[index];
};


/**
 * Returns all the pages from the picker. This should be considered protected,
 * and is ONLY FOR TESTING.
 *
 * @return {Array<EmojiPalette>?} the pages in the picker or
 *     null if none exist.
 */
EmojiPicker.prototype.getPages = function() {
  return this.pages_;
};


/**
 * Returns the tabpane if this is a multipage picker. This should be considered
 * protected, and is ONLY FOR TESTING.
 *
 * @return {TabPane} the tabpane if it is a multipage picker,
 *     or null if it does not exist or is a single page picker.
 */
EmojiPicker.prototype.getTabPane = function() {
  return this.tabPane_;
};


/**
 * @return {EmojiPalette} The active page of the emoji picker.
 * @private
 */
EmojiPicker.prototype.getActivePage_ = function() {
  return this.pages_[this.activePage_];
};


/**
 * Handles actions from the EmojiPalettes that this picker contains.
 *
 * @param {Component.ComponentEventType} e The event object.
 * @private
 */
EmojiPicker.prototype.onEmojiPaletteAction_ = function(e) {
  this.selectedEmoji_ = this.getActivePage_().getSelectedEmoji();
};


/**
 * Handles changes in the active page in the tabpane.
 *
 * @param {TabPaneEvent} e The event object.
 * @private
 */
EmojiPicker.prototype.onPageChanged_ = function(e) {
  const index = /** @type {number} */ (e.page.getIndex());
  this.loadPage_(index);
  this.activePage_ = index;
};


/**
 * Loads a page into the picker if it has not yet been loaded.
 * @param {number} index Index of the page to load.
 * @private
 * @suppress {deprecated,strictMissingProperties} Part of the go/strict_warnings_migration
 */
EmojiPicker.prototype.loadPage_ = function(index) {
  if (index < 0 || index > this.pages_.length) {
    throw new Error('Index out of bounds');
  }

  if (!this.pageLoadStatus_[index]) {
    const oldPage = this.pages_[index];
    this.pages_[index] = this.createEmojiPage_(this.emoji_[index].emoji, index);
    this.pages_[index].enterDocument();
    const pageElement = this.pages_[index].getElement();
    if (this.pages_.length > 1) {
      this.tabPane_.removePage(index);
      const title = this.emoji_[index].title || (index + 1);
      this.tabPane_.addPage(
          new TabPane.TabPage(pageElement, title, this.getDomHelper()),
          index);
      this.tabPane_.setSelectedIndex(index);
    } else {
      const el = this.getElement();
      el.appendChild(/** @type {!Node} */ (pageElement));
    }
    if (oldPage) {
      oldPage.dispose();
    }
  }
};
