/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview SpriteInfo implementation. This is a simple wrapper class to
 * hold CSS metadata needed for sprited emoji.
 *
 * @see ../demos/popupemojipicker.html or emojipicker_test.html for examples
 * of how to use this class.
 */
goog.declareModuleId('goog.ui.emoji.spriteinfo');



/**
 * Creates a SpriteInfo object with the specified properties. If the image is
 * sprited via CSS, then only the first parameter needs a value. If the image
 * is sprited via metadata, then the first parameter should be left null.
 *
 * @param {?string} cssClass CSS class to properly display the sprited image.
 * @param {string=} opt_url Url of the sprite image.
 * @param {number=} opt_width Width of the image being sprited.
 * @param {number=} opt_height Height of the image being sprited.
 * @param {number=} opt_xOffset Positive x offset of the image being sprited
 *     within the sprite.
 * @param {number=} opt_yOffset Positive y offset of the image being sprited
 *     within the sprite.
 * @param {boolean=} opt_animated Whether the sprite is animated.
 * @constructor
 * @final
 */
export function SpriteInfo(
 cssClass,
 opt_url,
 opt_width,
 opt_height,
 opt_xOffset,
 opt_yOffset,
 opt_animated
) {
 if (cssClass != null) {
   this.cssClass_ = cssClass;
 } else {
   if (opt_url == undefined || opt_width === undefined ||
       opt_height === undefined || opt_xOffset == undefined ||
       opt_yOffset === undefined) {
     throw new Error('Sprite info is not fully specified');
   }

   this.url_ = opt_url;
   this.width_ = opt_width;
   this.height_ = opt_height;
   this.xOffset_ = opt_xOffset;
   this.yOffset_ = opt_yOffset;
 }

 this.animated_ = !!opt_animated;
}


/**
 * Name of the CSS class to properly display the sprited image.
 * @type {string}
 * @private
 */
SpriteInfo.prototype.cssClass_;


/**
 * Url of the sprite image.
 * @type {string|undefined}
 * @private
 */
SpriteInfo.prototype.url_;


/**
 * Width of the image being sprited.
 * @type {number|undefined}
 * @private
 */
SpriteInfo.prototype.width_;


/**
 * Height of the image being sprited.
 * @type {number|undefined}
 * @private
 */
SpriteInfo.prototype.height_;


/**
 * Positive x offset of the image being sprited within the sprite.
 * @type {number|undefined}
 * @private
 */
SpriteInfo.prototype.xOffset_;


/**
 * Positive y offset of the image being sprited within the sprite.
 * @type {number|undefined}
 * @private
 */
SpriteInfo.prototype.yOffset_;


/**
 * Whether the emoji specified by the sprite is animated.
 * @type {boolean}
 * @private
 */
SpriteInfo.prototype.animated_;


/**
 * Returns the css class of the sprited image.
 * @return {?string} Name of the CSS class to properly display the sprited
 *     image.
 */
SpriteInfo.prototype.getCssClass = function() {
 return this.cssClass_ || null;
};


/**
 * Returns the url of the sprite image.
 * @return {?string} Url of the sprite image.
 */
SpriteInfo.prototype.getUrl = function() {
 return this.url_ || null;
};


/**
 * Returns whether the emoji specified by this sprite is animated.
 * @return {boolean} Whether the emoji is animated.
 */
SpriteInfo.prototype.isAnimated = function() {
 return this.animated_;
};


/**
 * Returns the width of the image being sprited, appropriate for a CSS value.
 * @return {string} The width of the image being sprited.
 */
SpriteInfo.prototype.getWidthCssValue = function() {
 return SpriteInfo.getCssPixelValue_(this.width_);
};


/**
 * Returns the height of the image being sprited, appropriate for a CSS value.
 * @return {string} The height of the image being sprited.
 */
SpriteInfo.prototype.getHeightCssValue = function() {
 return SpriteInfo.getCssPixelValue_(this.height_);
};


/**
 * Returns the x offset of the image being sprited within the sprite,
 * appropriate for a CSS value.
 * @return {string} The x offset of the image being sprited within the sprite.
 */
SpriteInfo.prototype.getXOffsetCssValue = function() {
 return SpriteInfo.getOffsetCssValue_(this.xOffset_);
};


/**
 * Returns the positive y offset of the image being sprited within the sprite,
 * appropriate for a CSS value.
 * @return {string} The y offset of the image being sprited within the sprite.
 */
SpriteInfo.prototype.getYOffsetCssValue = function() {
 return SpriteInfo.getOffsetCssValue_(this.yOffset_);
};


/**
 * Returns a string appropriate for use as a CSS value. If the value is zero,
 * then there is no unit appended.
 *
 * @param {number|undefined} value A number to be turned into a
 *     CSS size/location value.
 * @return {string} A string appropriate for use as a CSS value.
 * @private
 */
SpriteInfo.getCssPixelValue_ = function(value) {
 return !value ? '0' : value + 'px';
};


/**
 * Returns a string appropriate for use as a CSS value for a position offset,
 * such as the position argument for sprites.
 *
 * @param {number|undefined} posOffset A positive offset for a position.
 * @return {string} A string appropriate for use as a CSS value.
 * @private
 */
SpriteInfo.getOffsetCssValue_ = function(posOffset) {
 const offset = SpriteInfo.getCssPixelValue_(posOffset);
 return offset == '0' ? offset : '-' + offset;
};
