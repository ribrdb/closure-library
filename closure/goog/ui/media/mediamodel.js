/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the base media model consistent with the Yahoo Media
 * RSS specification {@link http://search.yahoo.com/mrss/}.
 */

import { TrustedResourceUrl } from '../../html/trustedresourceurl.js';

const { Size } = goog.requireType('goog.math.size');



/**
 * An base data value class for all media data models.
 *
 * MediaModels are exact matches to the fields defined in the Yahoo RSS media
 * specification {@link http://search.yahoo.com/mrss/}.
 *
 * The current common data shared by medias is to have URLs, mime types,
 * captions, descriptions, thumbnails and players. Some of these may not be
 * available, or applications may not want to render them, so `null`
 * values are allowed. `goog.ui.media.MediaRenderer` checks whether the
 * values are available before creating DOMs for them.
 *
 * @param {string=} opt_url An optional URL of the media.
 * @param {string=} opt_caption An optional caption of the media.
 * @param {string=} opt_description An optional description of the media.
 * @param {MediaModel.MimeType=} opt_type The type of the media.
 * @param {MediaModel.Medium=} opt_medium The medium of the media.
 * @param {number=} opt_duration The duration of the media in seconds.
 * @param {number=} opt_width The width of the media in pixels.
 * @param {number=} opt_height The height of the media in pixels.
 * @constructor
 */
export function MediaModel(
 opt_url,
 opt_caption,
 opt_description,
 opt_type,
 opt_medium,
 opt_duration,
 opt_width,
 opt_height
) {
 /**
  * The URL of the media.
  * @type {string|undefined}
  * @private
  */
 this.url_ = opt_url;

 /**
  * The caption of the media.
  * @type {string|undefined}
  * @private
  */
 this.caption_ = opt_caption;

 /**
  * A description of the media, typically user generated comments about it.
  * @type {string|undefined}
  * @private
  */
 this.description_ = opt_description;

 /**
    * The mime type of the media.
    * @type {MediaModel.MimeType|undefined}
    * @private
    */
 this.type_ = opt_type;

 /**
    * The medium of the media.
    * @type {MediaModel.Medium|undefined}
    * @private
    */
 this.medium_ = opt_medium;

 /**
  * The duration of the media in seconds.
  * @type {number|undefined}
  * @private
  */
 this.duration_ = opt_duration;

 /**
  * The width of the media in pixels.
  * @type {number|undefined}
  * @private
  */
 this.width_ = opt_width;

 /**
  * The height of the media in pixels.
  * @type {number|undefined}
  * @private
  */
 this.height_ = opt_height;

 /**
    * A list of thumbnails representations of the media (eg different sizes of
    * the same photo, etc).
    * @type {Array<MediaModel.Thumbnail>}
    * @private
    */
 this.thumbnails_ = [];

 /**
    * The list of categories that are applied to this media.
    * @type {Array<MediaModel.Category>}
    * @private
    */
 this.categories_ = [];

 /**
    * The list of credits that pertain to this media object.
    * @type {!Array<MediaModel.Credit>}
    * @private
    */
 this.credits_ = [];

 /**
    * The list of subtitles for the media object.
    * @type {Array<MediaModel.SubTitle>}
    * @private
    */
 this.subTitles_ = [];
}


/**
 * The supported media mime types, a subset of the media types found here:
 * {@link http://www.iana.org/assignments/media-types/} and here
 * {@link http://en.wikipedia.org/wiki/Internet_media_type}
 * @enum {string}
 */
MediaModel.MimeType = {
  HTML: 'text/html',
  PLAIN: 'text/plain',
  FLASH: 'application/x-shockwave-flash',
  JPEG: 'image/jpeg',
  GIF: 'image/gif',
  PNG: 'image/png'
};


/**
 * Supported mediums, found here:
 * {@link http://video.search.yahoo.com/mrss}
 * @enum {string}
 */
MediaModel.Medium = {
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  DOCUMENT: 'document',
  EXECUTABLE: 'executable'
};


/**
 * The media player.
 * @type {MediaModel.Player}
 * @private
 */
MediaModel.prototype.player_;


/**
 * Gets the URL of this media.
 * @return {string|undefined} The URL of the media.
 */
MediaModel.prototype.getUrl = function() {
 return this.url_;
};


/**
 * Sets the URL of this media.
 * @param {string} url The URL of the media.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setUrl = function(url) {
 this.url_ = url;
 return this;
};


/**
 * Gets the caption of this media.
 * @return {string|undefined} The caption of the media.
 */
MediaModel.prototype.getCaption = function() {
 return this.caption_;
};


/**
 * Sets the caption of this media.
 * @param {string} caption The caption of the media.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setCaption = function(caption) {
 this.caption_ = caption;
 return this;
};


/**
 * Gets the media mime type.
 * @return {MediaModel.MimeType|undefined} The media mime type.
 */
MediaModel.prototype.getType = function() {
 return this.type_;
};


/**
 * Sets the media mime type.
 * @param {MediaModel.MimeType} type The media mime type.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setType = function(type) {
 this.type_ = type;
 return this;
};


/**
 * Gets the media medium.
 * @return {MediaModel.Medium|undefined} The media medium.
 */
MediaModel.prototype.getMedium = function() {
 return this.medium_;
};


/**
 * Sets the media medium.
 * @param {MediaModel.Medium} medium The media medium.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setMedium = function(medium) {
 this.medium_ = medium;
 return this;
};


/**
 * Gets the description of this media.
 * @return {string|undefined} The description of the media.
 */
MediaModel.prototype.getDescription = function() {
 return this.description_;
};


/**
 * Sets the description of this media.
 * @param {string} description The description of the media.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setDescription = function(description) {
 this.description_ = description;
 return this;
};


/**
 * Gets the thumbnail urls.
 * @return {Array<MediaModel.Thumbnail>} The list of thumbnails.
 */
MediaModel.prototype.getThumbnails = function() {
 return this.thumbnails_;
};


/**
 * Sets the thumbnail list.
 * @param {Array<MediaModel.Thumbnail>} thumbnails The list of
 *     thumbnail.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setThumbnails = function(thumbnails) {
 this.thumbnails_ = thumbnails;
 return this;
};


/**
 * Gets the duration of the media.
 * @return {number|undefined} The duration in seconds.
 */
MediaModel.prototype.getDuration = function() {
 return this.duration_;
};


/**
 * Sets duration of the media.
 * @param {number} duration The duration of the media, in seconds.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setDuration = function(duration) {
 this.duration_ = duration;
 return this;
};


/**
 * Gets the width of the media in pixels.
 * @return {number|undefined} The width in pixels.
 */
MediaModel.prototype.getWidth = function() {
 return this.width_;
};


/**
 * Sets the width of the media.
 * @param {number} width The width of the media, in pixels.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setWidth = function(width) {
 this.width_ = width;
 return this;
};


/**
 * Gets the height of the media in pixels.
 * @return {number|undefined} The height in pixels.
 */
MediaModel.prototype.getHeight = function() {
 return this.height_;
};


/**
 * Sets the height of the media.
 * @param {number} height The height of the media, in pixels.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setHeight = function(height) {
 this.height_ = height;
 return this;
};


/**
 * Gets the player data.
 * @return {MediaModel.Player|undefined} The media player data.
 */
MediaModel.prototype.getPlayer = function() {
 return this.player_;
};


/**
 * Sets the player data.
 * @param {MediaModel.Player} player The media player data.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setPlayer = function(player) {
 this.player_ = player;
 return this;
};


/**
 * Gets the categories of the media.
 * @return {Array<MediaModel.Category>} The categories of the
 *     media.
 */
MediaModel.prototype.getCategories = function() {
 return this.categories_;
};


/**
 * Sets the categories of the media
 * @param {Array<MediaModel.Category>} categories The categories
 *     of the media.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setCategories = function(categories) {
 this.categories_ = categories;
 return this;
};


/**
 * Finds the first category with the given scheme.
 * @param {string} scheme The scheme to search for.
 * @return {?MediaModel.Category} The category that has the
 *     given scheme. May be null.
 */
MediaModel.prototype.findCategoryWithScheme = function(scheme) {
 if (!this.categories_) {
   return null;
 }
 const category = this.categories_.find(function(category) {
  return category ? scheme == category.getScheme() : false;
 }) ||
     null;
 return /** @type {?MediaModel.Category} */ (category);
};


/**
 * Gets the credits of the media.
 * @return {!Array<MediaModel.Credit>} The credits of the media.
 */
MediaModel.prototype.getCredits = function() {
 return this.credits_;
};


/**
 * Sets the credits of the media
 * @param {!Array<MediaModel.Credit>} credits The credits of the
 *     media.
 * @return {!MediaModel} The object itself, used for chaining.
 */
MediaModel.prototype.setCredits = function(credits) {
 this.credits_ = credits;
 return this;
};


/**
 * Finds all credits with the given role.
 * @param {string} role The role to search for.
 * @return {!Array<!MediaModel.Credit>} An array of credits
 *     with the given role. May be empty.
 */
MediaModel.prototype.findCreditsWithRole = function(role) {
 const credits = this.credits_.filter(function(credit) {
  return role == credit.getRole();
 });
 return /** @type {!Array<!MediaModel.Credit>} */ (credits);
};


/**
 * Gets the subtitles for the media.
 * @return {Array<MediaModel.SubTitle>} The subtitles.
 */
MediaModel.prototype.getSubTitles = function() {
 return this.subTitles_;
};


/**
 * Sets the subtitles for the media
 * @param {Array<MediaModel.SubTitle>} subtitles The subtitles.
 * @return {!MediaModel} The object itself.
 */
MediaModel.prototype.setSubTitles = function(subtitles) {
 this.subTitles_ = subtitles;
 return this;
};



/**
 * Constructs a thumbnail containing details of the thumbnail's image URL and
 * optionally its size.
 * @param {string} url The URL of the thumbnail's image.
 * @param {Size=} opt_size The size of the thumbnail's image if known.
 * @constructor
 * @final
 */
MediaModel.Thumbnail = function(url, opt_size) {
 /**
  * The thumbnail's image URL.
  * @type {string}
  * @private
  */
 this.url_ = url;

 /**
  * The size of the thumbnail's image if known.
  * @type {Size}
  * @private
  */
 this.size_ = opt_size || null;
};


/**
 * Gets the thumbnail URL.
 * @return {string} The thumbnail's image URL.
 */
MediaModel.Thumbnail.prototype.getUrl = function() {
 return this.url_;
};


/**
 * Sets the thumbnail URL.
 * @param {string} url The thumbnail's image URL.
 * @return {!MediaModel.Thumbnail} The object itself, used for
 *     chaining.
 */
MediaModel.Thumbnail.prototype.setUrl = function(url) {
 this.url_ = url;
 return this;
};


/**
 * Gets the thumbnail size.
 * @return {Size} The size of the thumbnail's image if known.
 */
MediaModel.Thumbnail.prototype.getSize = function() {
 return this.size_;
};


/**
 * Sets the thumbnail size.
 * @param {Size} size The size of the thumbnail's image.
 * @return {!MediaModel.Thumbnail} The object itself, used for
 *     chaining.
 */
MediaModel.Thumbnail.prototype.setSize = function(size) {
 this.size_ = size;
 return this;
};



/**
 * Constructs a player containing details of the player's URL and
 * optionally its size.
 * @param {!TrustedResourceUrl} url The URL of the player.
 * @param {Object=} opt_vars Optional map of arguments to the player.
 * @param {Size=} opt_size The size of the player if known.
 * @constructor
 * @final
 */
MediaModel.Player = function(url, opt_vars, opt_size) {
 /**
   * The player's URL.
   * @type {!TrustedResourceUrl}
   * @private
   */
 this.trustedResourceUrl_ = url;

 /**
  * Player arguments, typically flash arguments.
  * @type {Object}
  * @private
  */
 this.vars_ = opt_vars || null;

 /**
  * The size of the player if known.
  * @type {Size}
  * @private
  */
 this.size_ = opt_size || null;
};


/**
 * Gets the player URL.
 * @return {!TrustedResourceUrl} The player's URL.
 */
MediaModel.Player.prototype.getTrustedResourceUrl = function() {
 return this.trustedResourceUrl_;
};


/**
 * Gets the player URL.
 * @return {string} The player's URL.
 */
MediaModel.Player.prototype.getUrl = function() {
 return this.trustedResourceUrl_.getTypedStringValue();
};


/**
 * Sets the player URL.
 * @param {!TrustedResourceUrl} url The player's URL.
 * @return {!MediaModel.Player} The object itself, used for
 *     chaining.
 */
MediaModel.Player.prototype.setUrl = function(url) {
 this.trustedResourceUrl_ = url;
 return this;
};


/**
 * Gets the player arguments.
 * @return {Object} The media player arguments.
 */
MediaModel.Player.prototype.getVars = function() {
 return this.vars_;
};


/**
 * Sets the player arguments.
 * @param {Object} vars The media player arguments.
 * @return {!MediaModel.Player} The object itself, used for
 *     chaining.
 */
MediaModel.Player.prototype.setVars = function(vars) {
 this.vars_ = vars;
 return this;
};


/**
 * Gets the size of the player.
 * @return {Size} The size of the player if known.
 */
MediaModel.Player.prototype.getSize = function() {
 return this.size_;
};


/**
 * Sets the size of the player.
 * @param {Size} size The size of the player.
 * @return {!MediaModel.Player} The object itself, used for
 *     chaining.
 */
MediaModel.Player.prototype.setSize = function(size) {
 this.size_ = size;
 return this;
};



/**
 * A taxonomy to be set that gives an indication of the type of media content,
 * and its particular contents.
 * @param {string} scheme The URI that identifies the categorization scheme.
 * @param {string} value The value of the category.
 * @param {string=} opt_label The human readable label that can be displayed in
 *     end user applications.
 * @constructor
 * @final
 */
MediaModel.Category = function(scheme, value, opt_label) {
 /**
  * The URI that identifies the categorization scheme.
  * @type {string}
  * @private
  */
 this.scheme_ = scheme;

 /**
  * The value of the category.
  * @type {string}
  * @private
  */
 this.value_ = value;

 /**
  * The human readable label that can be displayed in end user applications.
  * @type {string}
  * @private
  */
 this.label_ = opt_label || '';
};


/**
 * Gets the category scheme.
 * @return {string} The category scheme URI.
 */
MediaModel.Category.prototype.getScheme = function() {
 return this.scheme_;
};


/**
 * Sets the category scheme.
 * @param {string} scheme The category's scheme.
 * @return {!MediaModel.Category} The object itself, used for
 *     chaining.
 */
MediaModel.Category.prototype.setScheme = function(scheme) {
 this.scheme_ = scheme;
 return this;
};


/**
 * Gets the categor's value.
 * @return {string} The category's value.
 */
MediaModel.Category.prototype.getValue = function() {
 return this.value_;
};


/**
 * Sets the category value.
 * @param {string} value The category value to be set.
 * @return {!MediaModel.Category} The object itself, used for
 *     chaining.
 */
MediaModel.Category.prototype.setValue = function(value) {
 this.value_ = value;
 return this;
};


/**
 * Gets the label of the category.
 * @return {string} The label of the category.
 */
MediaModel.Category.prototype.getLabel = function() {
 return this.label_;
};


/**
 * Sets the label of the category.
 * @param {string} label The label of the category.
 * @return {!MediaModel.Category} The object itself, used for
 *     chaining.
 */
MediaModel.Category.prototype.setLabel = function(label) {
 this.label_ = label;
 return this;
};



/**
 * Indicates an entity that has contributed to a media object. Based on
 * 'media.credit' in the rss spec.
 * @param {string} value The name of the entity being credited.
 * @param {MediaModel.Credit.Role=} opt_role The role the entity
 *     played.
 * @param {MediaModel.Credit.Scheme=} opt_scheme The URI that
 *     identifies the role scheme.
 * @constructor
 * @final
 */
MediaModel.Credit = function(value, opt_role, opt_scheme) {
 /**
  * The name of entity being credited.
  * @type {string}
  * @private
  */
 this.value_ = value;

 /**
    * The role the entity played.
    * @type {MediaModel.Credit.Role|undefined}
    * @private
    */
 this.role_ = opt_role;

 /**
    * The URI that identifies the role scheme
    * @type {MediaModel.Credit.Scheme|undefined}
    * @private
    */
 this.scheme_ = opt_scheme;
};


/**
 * The types of known roles.
 * @enum {string}
 */
MediaModel.Credit.Role = {
  UPLOADER: 'uploader',
  OWNER: 'owner'
};


/**
 * The types of known schemes.
 * @enum {string}
 */
MediaModel.Credit.Scheme = {
  EUROPEAN_BROADCASTING: 'urn:ebu',
  YAHOO: 'urn:yvs',
  YOUTUBE: 'urn:youtube'
};


/**
 * Gets the name of the entity being credited.
 * @return {string} The name of the entity.
 */
MediaModel.Credit.prototype.getValue = function() {
 return this.value_;
};


/**
 * Sets the value of the credit object.
 * @param {string} value The value.
 * @return {!MediaModel.Credit} The object itself.
 */
MediaModel.Credit.prototype.setValue = function(value) {
 this.value_ = value;
 return this;
};


/**
 * Gets the role of the entity being credited.
 * @return {MediaModel.Credit.Role|undefined} The role of the
 *     entity.
 */
MediaModel.Credit.prototype.getRole = function() {
 return this.role_;
};


/**
 * Sets the role of the credit object.
 * @param {MediaModel.Credit.Role} role The role.
 * @return {!MediaModel.Credit} The object itself.
 */
MediaModel.Credit.prototype.setRole = function(role) {
 this.role_ = role;
 return this;
};


/**
 * Gets the scheme of the credit object.
 * @return {MediaModel.Credit.Scheme|undefined} The URI that
 *     identifies the role scheme.
 */
MediaModel.Credit.prototype.getScheme = function() {
 return this.scheme_;
};


/**
 * Sets the scheme of the credit object.
 * @param {MediaModel.Credit.Scheme} scheme The scheme.
 * @return {!MediaModel.Credit} The object itself.
 */
MediaModel.Credit.prototype.setScheme = function(scheme) {
 this.scheme_ = scheme;
 return this;
};



/**
 * A reference to the subtitle URI for a media object.
 * Implements the 'media.subTitle' in the rss spec.
 *
 * @param {string} href The subtitle's URI.
 *     to fetch the subtitle file.
 * @param {string} lang An RFC 3066 language.
 * @param {string} type The MIME type of the URI.
 * @constructor
 * @final
 */
MediaModel.SubTitle = function(href, lang, type) {
 /**
  * The subtitle href.
  * @type {string}
  * @private
  */
 this.href_ = href;

 /**
  * The RFC 3066 language.
  * @type {string}
  * @private
  */
 this.lang_ = lang;

 /**
  * The MIME type of the resource.
  * @type {string}
  * @private
  */
 this.type_ = type;
};


/**
 * Sets the href for the subtitle object.
 * @param {string} href The subtitle's URI.
 * @return {!MediaModel.SubTitle} The object itself.
 */
MediaModel.SubTitle.prototype.setHref = function(href) {
 this.href_ = href;
 return this;
};


/**
 * Get the href for the subtitle object.
 * @return {string} href The subtitle's URI.
 */
MediaModel.SubTitle.prototype.getHref = function() {
 return this.href_;
};


/**
 * Sets the language for the subtitle object.
 * @param {string} lang The RFC 3066 language.
 * @return {!MediaModel.SubTitle} The object itself.
 */
MediaModel.SubTitle.prototype.setLang = function(lang) {
 this.lang_ = lang;
 return this;
};


/**
 * Get the lang for the subtitle object.
 * @return {string} lang The RFC 3066 language.
 */
MediaModel.SubTitle.prototype.getLang = function() {
 return this.lang_;
};


/**
 * Sets the type for the subtitle object.
 * @param {string} type The MIME type.
 * @return {!MediaModel.SubTitle} The object itself.
 */
MediaModel.SubTitle.prototype.setType = function(type) {
 this.type_ = type;
 return this;
};


/**
 * Get the type for the subtitle object.
 * @return {string} type The MIME type.
 */
MediaModel.SubTitle.prototype.getType = function() {
 return this.type_;
};
