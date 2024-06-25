/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Trogedit constants for browser features and quirks that should
 * be used by the rich text editor.
 */

import * as defines from './defines.js';

import * as userAgent from '../useragent/useragent.js';
import * as product from '../useragent/product.js';


/**
 * Maps browser quirks to boolean values, detailing what the current
 * browser supports.
 * @const
 */
export var BrowserFeature = {

  // Has the contentEditable attribute, which makes nodes editable.
  //
  // NOTE(nicksantos): FF3 has contentEditable, but there are 3 major reasons
  // why we don't use it:
  // 1) In FF3, we listen for key events on the document, and we'd have to
  //    filter them properly. See TR_Browser.USE_DOCUMENT_FOR_KEY_EVENTS.
  // 2) In FF3, we listen for focus/blur events on the document, which
  //    simply doesn't make sense in contentEditable. focus/blur
  //    on contentEditable elements still has some quirks, which we're
  //    talking to Firefox-team about.
  // 3) We currently use Mutation events in FF3 to detect changes,
  //    and these are dispatched on the document only.
  // If we ever hope to support FF3/contentEditable, all 3 of these issues
  // will need answers. Most just involve refactoring at our end.
  HAS_CONTENT_EDITABLE: userAgent.IE || userAgent.WEBKIT ||
      userAgent.EDGE ||
      (defines.USE_CONTENTEDITABLE_IN_FIREFOX_3 &&
       userAgent.GECKO),

  // Whether nodes can be copied from one document to another
  HAS_DOCUMENT_INDEPENDENT_NODES: userAgent.GECKO,

  // Whether the cursor goes before or inside the first block element on
  // focus, e.g., <body><p>foo</p></body>. FF will put the cursor before the
  // paragraph on focus, which is wrong.
  PUTS_CURSOR_BEFORE_FIRST_BLOCK_ELEMENT_ON_FOCUS: userAgent.GECKO,

  // Whether the selection of one frame is cleared when another frame
  // is focused.
  CLEARS_SELECTION_WHEN_FOCUS_LEAVES:
      userAgent.IE || userAgent.WEBKIT,

  // Whether "unselectable" is supported as an element style.
  HAS_UNSELECTABLE_STYLE: userAgent.GECKO || userAgent.WEBKIT,

  // Whether this browser's "FormatBlock" command does not suck.
  FORMAT_BLOCK_WORKS_FOR_BLOCKQUOTES:
      userAgent.GECKO || userAgent.WEBKIT,

  // Whether the readystatechange event is more reliable than load.
  PREFERS_READY_STATE_CHANGE_EVENT: userAgent.IE,

  // Whether hitting the tab key will fire a keypress event.
  // see http://www.quirksmode.org/js/keys.html
  // TODO(sdh): This is fixed in IE8 and higher.
  TAB_FIRES_KEYPRESS: !userAgent.IE,

  // Has a standards mode quirk where width=100% doesn't do the right thing,
  // but width=99% does.
  // TODO(user): This should be fixable by less hacky means
  NEEDS_99_WIDTH_IN_STANDARDS_MODE: userAgent.IE,

  // Whether keyboard events only reliably fire on the document.
  // On Gecko without contentEditable, keyboard events only fire reliably on the
  // document element. With contentEditable, the field itself is focusable,
  // which means that it will fire key events. This does not apply if
  // application is using ContentEditableField or otherwise overriding Field
  // not to use an iframe.
  USE_DOCUMENT_FOR_KEY_EVENTS: userAgent.GECKO &&
      !defines.USE_CONTENTEDITABLE_IN_FIREFOX_3,

  // Whether this browser shows non-standard attributes in innerHTML.
  SHOWS_CUSTOM_ATTRS_IN_INNER_HTML: userAgent.IE,

  // Whether this browser shrinks empty nodes away to nothing.
  // (If so, we need to insert some space characters into nodes that
  //  shouldn't be collapsed)
  COLLAPSES_EMPTY_NODES: userAgent.GECKO || userAgent.WEBKIT,

  // Whether we must convert <strong> and <em> tags to <b>, <i>.
  CONVERT_TO_B_AND_I_TAGS: userAgent.GECKO,

  // Whether this browser likes to tab through images in contentEditable mode,
  // and we like to disable this feature.
  TABS_THROUGH_IMAGES: userAgent.IE,

  // Whether this browser supports execCommand("styleWithCSS") to toggle between
  // inserting html tags or inline styling for things like bold, italic, etc.
  /** @const {boolean} */
  HAS_STYLE_WITH_CSS: userAgent.GECKO || userAgent.WEBKIT,

  // Whether clicking on an editable link will take you to that site.
  /** @const {boolean} */
  FOLLOWS_EDITABLE_LINKS: userAgent.WEBKIT || userAgent.IE,

  // Whether this browser has document.activeElement available.
  HAS_ACTIVE_ELEMENT:
      userAgent.IE || userAgent.EDGE || userAgent.GECKO,

  // Whether this browser supports the setCapture method on DOM elements.
  HAS_SET_CAPTURE: userAgent.IE,

  // Whether this browser can't set background color when the selection
  // is collapsed.
  EATS_EMPTY_BACKGROUND_COLOR: userAgent.GECKO,

  // Whether this browser supports the "focusin" or "DOMFocusIn" event
  // consistently.
  // NOTE(nicksantos): FF supports DOMFocusIn, but doesn't seem to do so
  // consistently.
  SUPPORTS_FOCUSIN: userAgent.IE,

  // Whether clicking on an image will cause the selection to move to the image.
  // Note: Gecko moves the selection, but it won't always go to the image.
  // For example, if the image is wrapped in a div, and you click on the img,
  // anchorNode = focusNode = div, anchorOffset = 0, focusOffset = 1, so this
  // is another way of "selecting" the image, but there are too many special
  // cases like this so we will do the work manually.
  SELECTS_IMAGES_ON_CLICK: userAgent.IE,

  // Whether this browser moves <style> tags into new <head> elements.
  MOVES_STYLE_TO_HEAD: userAgent.WEBKIT,

  // Whether to use keydown for key listening (uses keypress otherwise). Taken
  // from goog.events.KeyHandler.
  USES_KEYDOWN: true,

  // Whether the browser corrupts all text nodes in Node#normalize,
  // removing them from the Document instead of merging them.
  NORMALIZE_CORRUPTS_ALL_TEXT_NODES: userAgent.IE,

  // Browsers where executing subscript then superscript (or vv) will cause both
  // to be applied in a nested fashion instead of the first being overwritten by
  // the second.
  NESTS_SUBSCRIPT_SUPERSCRIPT:
      userAgent.IE || userAgent.EDGE || userAgent.GECKO,

  // Whether this browser can place a cursor in an empty element natively.
  CAN_SELECT_EMPTY_ELEMENT: !userAgent.IE && !userAgent.WEBKIT,

  FORGETS_FORMATTING_WHEN_LISTIFYING: userAgent.GECKO,

  LEAVES_P_WHEN_REMOVING_LISTS: userAgent.IE,

  CAN_LISTIFY_BR: !userAgent.IE,

  // See bug 1286408. When somewhere inside your selection there is an element
  // with a style attribute that sets the font size, if you change the font
  // size, the browser creates a font tag, but the font size in the style attr
  // overrides the font tag. Only webkit removes that font size from the style
  // attr.
  DOESNT_OVERRIDE_FONT_SIZE_IN_STYLE_ATTR:
      !userAgent.WEBKIT && !userAgent.EDGE,

  SUPPORTS_FILE_PASTING: product.CHROME,
};
