/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Progressive Emoji Palette renderer implementation.
 */

import { TagName } from '../../dom/tagname.js';

import * as style from '../../style/style.js';
import { EmojiPaletteRenderer } from './emojipaletterenderer.js';



/**
 * Progressively renders an emoji palette. The progressive renderer tries to
 * use img tags instead of background-image for sprited emoji, since most
 * browsers render img tags progressively (i.e., as the data comes in), while
 * only very new browsers render background-image progressively.
 *
 * @param {string} defaultImgUrl Url of the img that should be used to fill up
 *     the cells in the emoji table, to prevent jittering. Will be stretched
 *     to the emoji cell size. A good image is a transparent dot.
 * @constructor
 * @extends {EmojiPaletteRenderer}
 * @final
 */
export function ProgressiveEmojiPaletteRenderer(defaultImgUrl) {
  EmojiPaletteRenderer.call(this, defaultImgUrl);
}
goog.inherits(
    ProgressiveEmojiPaletteRenderer,
    EmojiPaletteRenderer);


/** @override */
ProgressiveEmojiPaletteRenderer.prototype
    .buildElementFromSpriteMetadata = function(dom, spriteInfo, displayUrl) {
  const width = spriteInfo.getWidthCssValue();
  const height = spriteInfo.getHeightCssValue();
  const x = spriteInfo.getXOffsetCssValue();
  const y = spriteInfo.getYOffsetCssValue();
  // Need this extra div for proper vertical centering.
  const inner = dom.createDom(TagName.IMG, {'src': displayUrl});
  const el = dom.createDom(
      TagName.DIV, goog.getCssName('goog-palette-cell-extra'), inner);
  style.setStyle(el, {
    'width': width,
    'height': height,
    'overflow': 'hidden',
    'position': 'relative'
  });
  style.setStyle(inner, {'left': x, 'top': y, 'position': 'absolute'});

  return el;
};


/** @override */
ProgressiveEmojiPaletteRenderer.prototype
    .updateAnimatedPaletteItem = function(item, animatedImg) {
  // Just to be safe, we check for the existence of the img element within this
  // palette item before attempting to modify it.
  /** @type {!HTMLImageElement|undefined} */
  let img;
  let el = item.firstChild;
  while (el) {
    if ('IMG' == /** @type {!Element} */ (el).tagName) {
      img = /** @type {!HTMLImageElement} */ (el);
      break;
    }
    el = el.firstChild;
  }
  if (!img) {
    return;
  }

  img.width = animatedImg.width;
  img.height = animatedImg.height;
  style.setStyle(img, {'left': 0, 'top': 0});
  img.src = animatedImg.src;
};
