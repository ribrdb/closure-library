/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Emoji Palette renderer implementation.
 * @suppress {checkPrototypalTypes}
 */

import * as aria from '../../a11y/aria/aria.js';

import * as asserts from '../../asserts/asserts.js';
import { NodeType } from '../../dom/nodetype.js';
import { TagName } from '../../dom/tagname.js';
import * as classlist from '../../dom/classlist.js';
import * as style from '../../style/style.js';
import { PaletteRenderer } from '../paletterenderer.js';
import { Emoji } from './emoji.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { Palette } = goog.requireType('goog.ui.palette');
const { SpriteInfo } = goog.requireType('goog.ui.emoji.spriteinfo');



/**
 * Renders an emoji palette.
 *
 * @param {?string} defaultImgUrl Url of the img that should be used to fill up
 *     the cells in the emoji table, to prevent jittering. Will be stretched
 *     to the emoji cell size. A good image is a transparent dot.
 * @constructor
 * @extends {PaletteRenderer}
 */
export function EmojiPaletteRenderer(defaultImgUrl) {
  PaletteRenderer.call(this);

  this.defaultImgUrl_ = defaultImgUrl;
}
goog.inherits(EmojiPaletteRenderer, PaletteRenderer);


/**
 * Globally unique ID sequence for cells rendered by this renderer class.
 * @type {number}
 * @private
 */
EmojiPaletteRenderer.cellId_ = 0;


/**
 * Url of the img that should be used for cells in the emoji palette that are
 * not filled with emoji, i.e., after all the emoji have already been placed
 * on a page.
 *
 * @type {?string}
 * @private
 */
EmojiPaletteRenderer.prototype.defaultImgUrl_ = null;


/** @override */
EmojiPaletteRenderer.getCssClass = function() {
  return goog.getCssName('goog-ui-emojipalette');
};


/**
 * Creates a palette item from the given emoji data.
 *
 * @param {DomHelper} dom DOM helper for constructing DOM elements.
 * @param {string} id Goomoji id for the emoji.
 * @param {SpriteInfo} spriteInfo Spriting info for the emoji.
 * @param {string} displayUrl URL of the image served for this cell, whether
 *     an individual emoji image or a sprite.
 * @return {!HTMLDivElement} The palette item for this emoji.
 */
EmojiPaletteRenderer.prototype.createPaletteItem = function(
    dom, id, spriteInfo, displayUrl) {
  let el;

  if (spriteInfo) {
    const cssClass = spriteInfo.getCssClass();
    if (cssClass) {
      el = dom.createDom(TagName.DIV, cssClass);
    } else {
      el = this.buildElementFromSpriteMetadata(dom, spriteInfo, displayUrl);
    }
  } else {
    el = dom.createDom(TagName.IMG, {'src': displayUrl});
  }

  const outerdiv = dom.createDom(
      TagName.DIV, goog.getCssName('goog-palette-cell-wrapper'), el);
  outerdiv.setAttribute(Emoji.ATTRIBUTE, id);
  outerdiv.setAttribute(Emoji.DATA_ATTRIBUTE, id);
  return /** @type {!HTMLDivElement} */ (outerdiv);
};


/**
 * Modifies a palette item containing an animated emoji, in response to the
 * animated emoji being successfully downloaded.
 *
 * @param {Element} item The palette item to update.
 * @param {Image} animatedImg An Image object containing the animated emoji.
 */
EmojiPaletteRenderer.prototype.updateAnimatedPaletteItem =
    function(item, animatedImg) {
      // An animated emoji is one that had sprite info for a static version and is
      // now being updated. See createPaletteItem for the structure of the palette
      // items we're modifying.

      const inner = /** @type {Element} */ (item.firstChild);
      asserts.assert(inner);
      // The first case is a palette item with a CSS class representing the sprite,
      // and an animated emoji.
      const classes = classlist.get(inner);
      if (classes && classes.length == 1) {
        inner.className = '';
      }

      style.setStyle(inner, {
        'width': animatedImg.width,
        'height': animatedImg.height,
        'background-image': 'url(' + animatedImg.src + ')',
        'background-position': '0 0'
      });
    };


/**
 * Builds the inner contents of a palette item out of sprite metadata.
 *
 * @param {DomHelper} dom DOM helper for constructing DOM elements.
 * @param {SpriteInfo} spriteInfo The metadata to create the css
 *     for the sprite.
 * @param {string} displayUrl The URL of the image for this cell.
 * @return {!HTMLDivElement} The inner element for a palette item.
 */
EmojiPaletteRenderer.prototype.buildElementFromSpriteMetadata =
    function(dom, spriteInfo, displayUrl) {
      const width = spriteInfo.getWidthCssValue();
      const height = spriteInfo.getHeightCssValue();
      const x = spriteInfo.getXOffsetCssValue();
      const y = spriteInfo.getYOffsetCssValue();

      const el = dom.createDom(TagName.DIV);
      style.setStyle(el, {
        'width': width,
        'height': height,
        'background-image': 'url(' + displayUrl + ')',
        'background-repeat': 'no-repeat',
        'background-position': x + ' ' + y
      });

      return /** @type {!HTMLDivElement} */ (el);
    };


/** @override */
EmojiPaletteRenderer.prototype.createCell = function(node, dom) {
  // Create a cell with  the default img if we're out of items, in order to
  // prevent jitter in the table. If there's no default img url, just create an
  // empty div, to prevent trying to fetch a null url.
  if (!node) {
    const elem = this.defaultImgUrl_ ?
        dom.createDom(TagName.IMG, {src: this.defaultImgUrl_}) :
        dom.createDom(TagName.DIV);
    node = dom.createDom(
        TagName.DIV, goog.getCssName('goog-palette-cell-wrapper'),
        elem);
  }

  const cell = dom.createDom(
      TagName.TD, {
        'class': goog.getCssName(this.getCssClass(), 'cell'),
        // Cells must have an ID, for accessibility, so we generate one here.
        'id': this.getCssClass() + '-cell-' +
            EmojiPaletteRenderer.cellId_++
      },
      node);
  aria.setRole(cell, 'gridcell');
  return cell;
};


/**
 * Returns the item corresponding to the given node, or null if the node is
 * neither a palette cell nor part of a palette item.
 * @param {Palette} palette Palette in which to look for the item.
 * @param {Node} node Node to look for.
 * @return {Node} The corresponding palette item (null if not found).
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
EmojiPaletteRenderer.prototype.getContainingItem = function(
    palette, node) {
  const root = palette.getElement();
  while (node && node.nodeType == NodeType.ELEMENT && node != root) {
    if (node.tagName == TagName.TD) {
      return node.firstChild;
    }
    node = node.parentNode;
  }

  return null;
};
