/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class for showing simple modal dialog boxes.
 *
 * TODO(user):
 *   * Standardize CSS class names with other components
 *   * Add functionality to "host" other components in content area
 *   * Abstract out ButtonSet and make it more general
 * @see ../demos/dialog.html
 */

import * as aria from '../a11y/aria/aria.js';

import { Role } from '../a11y/aria/roles.js';
import { State } from '../a11y/aria/attributes.js';
import * as asserts from '../asserts/asserts.js';
import * as googDom from '../dom/dom.js';
import { NodeType } from '../dom/nodetype.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import * as safe from '../dom/safe.js';
import * as events from '../events/events.js';
import { Event } from '../events/event.js';
import { EventType } from '../events/eventtype.js';
import { KeyCodes } from '../events/keycodes.js';
import { Keys } from '../events/keys.js';
import { Dragger } from '../fx/dragger.js';
import { SafeHtml } from '../html/safehtml.js';
import { Rect } from '../math/rect.js';
import * as googString from '../string/string.js';
import * as style from '../style/style.js';
import { UiMap as Map } from './map.js';
import { ModalPopup } from './modalpopup.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * Class for showing simple dialog boxes.
 * The Html structure of the dialog box is:
 * <pre>
 *  Element         Function                Class-name, modal-dialog = default
 * ----------------------------------------------------------------------------
 * - iframe         Iframe mask              modal-dialog-bg
 * - div            Background mask          modal-dialog-bg
 * - div            Dialog area              modal-dialog
 *     - div        Title bar                modal-dialog-title
 *        - span                             modal-dialog-title-text
 *          - text  Title text               N/A
 *        - span                             modal-dialog-title-close
 *          - ??    Close box                N/A
 *     - div        Content area             modal-dialog-content
 *        - ??      User specified content   N/A
 *     - div        Button area              modal-dialog-buttons
 *        - button                           N/A
 *        - button
 *        - ...
 * </pre>
 * @constructor
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 *     This should be a single, valid CSS class name.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {googDom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *     goog.ui.Component} for semantics.
 * @extends {ModalPopup}
 */
export function Dialog(opt_class, opt_useIframeMask, opt_domHelper) {
  Dialog.base(this, 'constructor', opt_useIframeMask, opt_domHelper);

  /**
   * CSS class name for the dialog element, also used as a class name prefix for
   * related elements.  Defaults to goog.getCssName('modal-dialog').
   * @type {string}
   * @private
   */
  this.class_ = opt_class || goog.getCssName('modal-dialog');

  this.buttons_ = Dialog.ButtonSet.createOkCancel();
}
goog.inherits(Dialog, ModalPopup);


/**
 * Button set.  Default to Ok/Cancel.
 * @type {Dialog.ButtonSet}
 * @private
 */
Dialog.prototype.buttons_;


/**
 * Whether the escape key closes this dialog.
 * @type {boolean}
 * @private
 */
Dialog.prototype.escapeToCancel_ = true;


/**
 * Whether this dialog should include a title close button.
 * @type {boolean}
 * @private
 */
Dialog.prototype.hasTitleCloseButton_ = true;


/**
 * Whether the dialog is modal. Defaults to true.
 * @type {boolean}
 * @private
 */
Dialog.prototype.modal_ = true;


/**
 * Whether the dialog is draggable. Defaults to true.
 * @type {boolean}
 * @private
 */
Dialog.prototype.draggable_ = true;


/**
 * Whether the dialog keeps track of its surrounding space. Defaults to false.
 * @private {boolean}
 */
Dialog.prototype.trackSurroundingSpace_ = false;


/**
 * The amount of space in pixels to the left of the dialog.
 * @private {number}
 */
Dialog.prototype.spaceOnLeft_ = 1;


/**
 * The amount of space in pixels to the right of the dialog.
 * @private {number}
 */
Dialog.prototype.spaceOnRight_ = 1;


/**
 * The amount of space in pixels above the dialog.
 * @private {number}
 */
Dialog.prototype.spaceOnTop_ = 1;


/**
 * The amount of space in pixels below the dialog.
 * @private {number}
 */
Dialog.prototype.spaceOnBottom_ = 1;


/**
 * Opacity for background mask.  Defaults to 50%.
 * @type {number}
 * @private
 */
Dialog.prototype.backgroundElementOpacity_ = 0.50;


/**
 * Dialog's title.
 * @type {string}
 * @private
 */
Dialog.prototype.title_ = '';


/**
 * Dialog's content (HTML).
 * @type {?SafeHtml}
 * @private
 */
Dialog.prototype.content_ = null;


/**
 * Dragger.
 * @type {?Dragger}
 * @private
 */
Dialog.prototype.dragger_ = null;


/**
 * Whether the dialog should be disposed when it is hidden.
 * @type {boolean}
 * @private
 */
Dialog.prototype.disposeOnHide_ = false;


/**
 * Element for the title bar.
 * @type {?Element}
 * @private
 */
Dialog.prototype.titleEl_ = null;


/**
 * Element for the text area of the title bar.
 * @type {?Element}
 * @private
 */
Dialog.prototype.titleTextEl_ = null;


/**
 * Id of element for the text area of the title bar.
 * @type {?string}
 * @private
 */
Dialog.prototype.titleTextId_ = null;


/**
 * Element for the close box area of the title bar.
 * @type {?Element}
 * @private
 */
Dialog.prototype.titleCloseEl_ = null;


/**
 * Element for the content area.
 * @type {?Element}
 * @private
 */
Dialog.prototype.contentEl_ = null;


/**
 * Element for the button bar.
 * @type {?Element}
 * @private
 */
Dialog.prototype.buttonEl_ = null;


/**
 * The dialog's preferred ARIA role.
 * @type {Role}
 * @private
 */
Dialog.prototype.preferredAriaRole_ = Role.DIALOG;


/**
 * Whether the dialog sets the aria-describedby element to point to the content
 * element.
 * @type {boolean}
 * @private
 */
Dialog.prototype.isAriaDescribedByContent_ = false;


/** @override */
Dialog.prototype.getCssClass = function() {
  return this.class_;
};


/**
 * Sets the title.
 * @param {string} title The title text.
 */
Dialog.prototype.setTitle = function(title) {
  this.title_ = title;
  if (this.titleTextEl_) {
    googDom.setTextContent(this.titleTextEl_, title);
  }
};


/**
 * Gets the title.
 * @return {string} The title.
 */
Dialog.prototype.getTitle = function() {
  return this.title_;
};


/**
 * Allows plain text to be set in the content element.
 * @param {string} text Content plain text. Newlines are preserved.
 */
Dialog.prototype.setTextContent = function(text) {
  this.setSafeHtmlContent(
      SafeHtml.htmlEscapePreservingNewlines(text));
};


/**
 * Allows arbitrary HTML to be set in the content element.
 * @param {!SafeHtml} html Content HTML.
 */
Dialog.prototype.setSafeHtmlContent = function(html) {
  this.content_ = html;
  if (this.contentEl_) {
    safe.setInnerHtml(this.contentEl_, html);
  }
};


/**
 * Gets the content HTML of the content element as a plain string.
 *
 * Note that this method returns the HTML markup that was previously set via
 * setSafeHtmlContent() or setTextContent(). In particular, the HTML returned by
 * this method does not reflect any changes to the content element's DOM that
 * were made by other means.
 *
 * @return {string} Content HTML.
 */
Dialog.prototype.getContent = function() {
  return this.content_ != null ? SafeHtml.unwrap(this.content_) : '';
};


/**
 * Gets the content HTML of the content element.
 * @return {SafeHtml} Content HTML.
 */
Dialog.prototype.getSafeHtmlContent = function() {
  return this.content_;
};


/**
 * Returns the dialog's preferred ARIA role. This can be used to override the
 * default dialog role, e.g. with an ARIA role of ALERTDIALOG for a simple
 * warning or confirmation dialog.
 * @return {Role} This dialog's preferred ARIA role.
 */
Dialog.prototype.getPreferredAriaRole = function() {
  return this.preferredAriaRole_;
};


/**
 * Sets the dialog's preferred ARIA role. This can be used to override the
 * default dialog role, e.g. with an ARIA role of ALERTDIALOG for a simple
 * warning or confirmation dialog.
 * @param {Role} role This dialog's preferred ARIA role.
 */
Dialog.prototype.setPreferredAriaRole = function(role) {
  this.preferredAriaRole_ = role;
};


/**
 * @return {boolean} Whether the dialog sets the aria-describedby element to
 *     point to the content element.
 */
Dialog.prototype.isAriaDescribedByContent = function() {
  return this.isAriaDescribedByContent_;
};


/**
 * Sets whether the dialog sets the aria-describedby element to point to the
 * content element. This must be set prior to `createDom`.
 * @param {boolean} isAriaDescribedByContent
 */
Dialog.prototype.setIsAriaDescribedByContent = function(
    isAriaDescribedByContent) {
  this.isAriaDescribedByContent_ = isAriaDescribedByContent;
};


/**
 * Renders if the DOM is not created.
 * @private
 */
Dialog.prototype.renderIfNoDom_ = function() {
  if (!this.getElement()) {
    // TODO(gboyer): Ideally we'd only create the DOM, but many applications
    // are requiring this behavior.  Eventually, it would be best if the
    // element getters could return null if the elements have not been
    // created.
    this.render();
  }
};


/**
 * Returns the content element so that more complicated things can be done with
 * the content area.  Renders if the DOM is not yet created.  Overrides
 * {@link goog.ui.Component#getContentElement}.
 * @return {Element} The content element.
 * @override
 */
Dialog.prototype.getContentElement = function() {
  this.renderIfNoDom_();
  return this.contentEl_;
};


/**
 * Returns the title element so that more complicated things can be done with
 * the title.  Renders if the DOM is not yet created.
 * @return {Element} The title element.
 */
Dialog.prototype.getTitleElement = function() {
  this.renderIfNoDom_();
  return this.titleEl_;
};


/**
 * Returns the title text element so that more complicated things can be done
 * with the text of the title.  Renders if the DOM is not yet created.
 * @return {Element} The title text element.
 */
Dialog.prototype.getTitleTextElement = function() {
  this.renderIfNoDom_();
  return this.titleTextEl_;
};


/**
 * Returns the title close element so that more complicated things can be done
 * with the close area of the title.  Renders if the DOM is not yet created.
 * @return {Element} The close box.
 */
Dialog.prototype.getTitleCloseElement = function() {
  this.renderIfNoDom_();
  return this.titleCloseEl_;
};

/**
 * Get the dialog close message.
 * @return {string}
 * @protected
 */
Dialog.prototype.getDialogCloseMessage = function() {
  return Dialog.MSG_GOOG_UI_DIALOG_CLOSE_;
};

/**
 * Returns the button element so that more complicated things can be done with
 * the button area.  Renders if the DOM is not yet created.
 * @return {Element} The button container element.
 */
Dialog.prototype.getButtonElement = function() {
  this.renderIfNoDom_();
  return this.buttonEl_;
};


/**
 * Returns the dialog element so that more complicated things can be done with
 * the dialog box.  Renders if the DOM is not yet created.
 * @return {Element} The dialog element.
 */
Dialog.prototype.getDialogElement = function() {
  this.renderIfNoDom_();
  return this.getElement();
};


/**
 * Returns the background mask element so that more complicated things can be
 * done with the background region.  Renders if the DOM is not yet created.
 * @return {Element} The background mask element.
 * @override
 */
Dialog.prototype.getBackgroundElement = function() {
  this.renderIfNoDom_();
  return Dialog.base(this, 'getBackgroundElement');
};


/**
 * Gets the opacity of the background mask.
 * @return {number} Background mask opacity.
 */
Dialog.prototype.getBackgroundElementOpacity = function() {
  return this.backgroundElementOpacity_;
};


/**
 * Sets the opacity of the background mask.
 * @param {number} opacity Background mask opacity.
 */
Dialog.prototype.setBackgroundElementOpacity = function(opacity) {
  this.backgroundElementOpacity_ = opacity;

  if (this.getElement()) {
    var bgEl = this.getBackgroundElement();
    if (bgEl) {
      style.setOpacity(bgEl, this.backgroundElementOpacity_);
    }
  }
};


/**
 * Sets the modal property of the dialog. In case the dialog is already
 * inDocument, renders the modal background elements according to the specified
 * modal parameter.
 *
 * Note that non-modal dialogs cannot use an iframe mask.
 *
 * @param {boolean} modal Whether the dialog is modal.
 */
Dialog.prototype.setModal = function(modal) {
  if (modal != this.modal_) {
    this.setModalInternal_(modal);
  }
};


/**
 * Sets the modal property of the dialog.
 * @param {boolean} modal Whether the dialog is modal.
 * @private
 */
Dialog.prototype.setModalInternal_ = function(modal) {
  this.modal_ = modal;
  if (this.isInDocument()) {
    var dom = this.getDomHelper();
    var bg = this.getBackgroundElement();
    var bgIframe = this.getBackgroundIframe();
    if (modal) {
      if (bgIframe) {
        dom.insertSiblingBefore(bgIframe, this.getElement());
      }
      dom.insertSiblingBefore(bg, this.getElement());
    } else {
      dom.removeNode(bgIframe);
      dom.removeNode(bg);
    }
  }
  if (this.isVisible()) {
    this.setA11YDetectBackground(modal);
  }
};


/**
 * @return {boolean} modal Whether the dialog is modal.
 */
Dialog.prototype.getModal = function() {
  return this.modal_;
};


/**
 * @return {string} The CSS class name for the dialog element.
 */
Dialog.prototype.getClass = function() {
  return this.getCssClass();
};


/**
 * Sets whether the dialog can be dragged.
 * @param {boolean} draggable Whether the dialog can be dragged.
 */
Dialog.prototype.setDraggable = function(draggable) {
  this.draggable_ = draggable;
  this.setDraggingEnabled_(draggable && this.isInDocument());
};


/**
 * Sets whether the dialog keeps track of its surrounding space.
 * @param {boolean} trackSurroundingSpace
 */
Dialog.prototype.setTrackSurroundingSpace = function(
    trackSurroundingSpace) {
  this.trackSurroundingSpace_ = trackSurroundingSpace;
  this.maybeUpdateSurroundingSpace_();
};


/** Handles the dialog being dragged. */
Dialog.prototype.handleDrag = function() {
  this.maybeUpdateSurroundingSpace_();
};


/** Updates the surrounding space fields if that behavior is enabled. */
Dialog.prototype.maybeUpdateSurroundingSpace_ = function() {
  if (!this.trackSurroundingSpace_) {
    return;
  }

  const doc = this.getDomHelper().getDocument();
  const win = googDom.getWindow(doc) || window;
  const viewSize = googDom.getViewportSize(win);
  if (!this.getElement()) {
    return;
  }
  const element = /** @type {!HTMLElement} */ (this.getElementStrict());
  const popupSize = style.getSize(element);

  let x = 0;
  let y = 0;
  if (style.getComputedPosition(element) != 'fixed') {
    const scroll = this.getDomHelper().getDocumentScroll();
    x = scroll.x;
    y = scroll.y;
  }

  this.spaceOnLeft_ = element.offsetLeft - x;
  this.spaceOnRight_ = viewSize.width - element.offsetLeft - popupSize.width;
  this.spaceOnTop_ = element.offsetTop - y;
  this.spaceOnBottom_ = viewSize.height - element.offsetTop - popupSize.height;
};


/**
 * Gets an object containing fields for how many pixels of space there are on
 * each side of the dialog, or null if this dialog isn't keeping track of that
 * information.
 * @return {?{left: number, right: number, top: number, bottom: number}}
 */
Dialog.prototype.getSurroundingSpace = function() {
  if (!this.trackSurroundingSpace_) {
    return null;
  }
  return {
    left: this.spaceOnLeft_,
    right: this.spaceOnRight_,
    top: this.spaceOnTop_,
    bottom: this.spaceOnBottom_
  };
};


/**
 * Returns a dragger for moving the dialog and adds a class for the move cursor.
 * Defaults to allow dragging of the title only, but can be overridden if
 * different drag targets or dragging behavior is desired.
 * @return {!Dragger} The created dragger instance.
 * @protected
 */
Dialog.prototype.createDragger = function() {
  return new Dragger(this.getElement(), this.titleEl_);
};


/**
 * @return {boolean} Whether the dialog is draggable.
 */
Dialog.prototype.getDraggable = function() {
  return this.draggable_;
};


/**
 * Enables or disables dragging.
 * @param {boolean} enabled Whether to enable it.
 * @private
 */
Dialog.prototype.setDraggingEnabled_ = function(enabled) {
  // This isn't ideal, but the quickest and easiest way to append
  // title-draggable to the last class in the class_ string, then trim and
  // split the string into an array (in case the dialog was set up with
  // multiple, space-separated class names).
  var classNames =
      googString.trim(goog.getCssName(this.class_, 'title-draggable'))
          .split(' ');

  if (this.getElement()) {
    if (enabled) {
      classlist.addAll(asserts.assert(this.titleEl_), classNames);
    } else {
      classlist.removeAll(
          asserts.assert(this.titleEl_), classNames);
    }
  }

  if (enabled && !this.dragger_) {
    this.dragger_ = this.createDragger();
    classlist.addAll(asserts.assert(this.titleEl_), classNames);
    events.listen(
        this.dragger_, Dragger.EventType.START, this.setDraggerLimits_,
        false, this);
    events.listen(
        this.dragger_, Dragger.EventType.DRAG, this.handleDrag, false,
        this);
  } else if (!enabled && this.dragger_) {
    this.dragger_.dispose();
    this.dragger_ = null;
  }
};


/** @override */
Dialog.prototype.createDom = function() {
  Dialog.base(this, 'createDom');
  var element = this.getElement();
  asserts.assert(element, 'getElement() returns null');

  var dom = this.getDomHelper();
  // TODO(user): Fix this to use makeId instead of the dialog's id.
  this.titleTextId_ = this.getId();
  const contentElId = this.makeId('contentEl');
  this.titleEl_ = dom.createDom(
      TagName.DIV, goog.getCssName(this.class_, 'title'),
      this.titleTextEl_ = dom.createDom(
          TagName.SPAN, {
            'className': goog.getCssName(this.class_, 'title-text'),
            'id': this.titleTextId_
          },
          this.title_),
      this.titleCloseEl_ = dom.createDom(
          TagName.SPAN, goog.getCssName(this.class_, 'title-close'))),
  googDom.append(
      element, this.titleEl_,
      this.contentEl_ = dom.createDom(TagName.DIV, {
        'className': goog.getCssName(this.class_, 'content'),
        'id': contentElId
      }),
      this.buttonEl_ = dom.createDom(
          TagName.DIV, goog.getCssName(this.class_, 'buttons')));

  // Make the title and close button behave correctly with screen readers.
  // Note: this is only being added if the dialog is not decorated. Decorators
  // are expected to add aria label, role, and tab indexing in their templates.
  aria.setRole(this.titleTextEl_, Role.HEADING);
  aria.setRole(this.titleCloseEl_, Role.BUTTON);
  googDom.setFocusableTabIndex(this.titleCloseEl_, true);
  aria.setLabel(
      this.titleCloseEl_, Dialog.MSG_GOOG_UI_DIALOG_CLOSE_);


  aria.setRole(element, this.getPreferredAriaRole());
  aria.setState(
      element, State.LABELLEDBY, this.titleTextId_ || '');
  // If setContent() was called before createDom(), make sure the inner HTML of
  // the content element is initialized.
  if (this.content_) {
    safe.setInnerHtml(this.contentEl_, this.content_);
    if (this.isAriaDescribedByContent_ && contentElId) {
      aria.setState(
          element, State.DESCRIBEDBY, contentElId);
    }
  }
  style.setElementShown(this.titleCloseEl_, this.hasTitleCloseButton_);

  // Render the buttons.
  if (this.buttons_) {
    this.buttons_.attachToElement(this.buttonEl_);
  }
  style.setElementShown(this.buttonEl_, !!this.buttons_);
  this.setBackgroundElementOpacity(this.backgroundElementOpacity_);
};


/** @override */
Dialog.prototype.decorateInternal = function(element) {
  Dialog.base(this, 'decorateInternal', element);
  var dialogElement = this.getElement();
  asserts.assert(
      dialogElement, 'The DOM element for dialog cannot be null.');
  // Decorate or create the content element.
  var contentClass = goog.getCssName(this.class_, 'content');
  this.contentEl_ = googDom.getElementsByTagNameAndClass(
      null, contentClass, dialogElement)[0];
  if (!this.contentEl_) {
    this.contentEl_ =
        this.getDomHelper().createDom(TagName.DIV, contentClass);
    if (this.content_) {
      safe.setInnerHtml(this.contentEl_, this.content_);
    }
    dialogElement.appendChild(this.contentEl_);
  }

  // Decorate or create the title bar element.
  var titleClass = goog.getCssName(this.class_, 'title');
  var titleTextClass = goog.getCssName(this.class_, 'title-text');
  var titleCloseClass = goog.getCssName(this.class_, 'title-close');
  this.titleEl_ =
      googDom.getElementsByTagNameAndClass(null, titleClass, dialogElement)[0];
  if (this.titleEl_) {
    // Only look for title text & title close elements if a title bar element
    // was found.  Otherwise assume that the entire title bar has to be
    // created from scratch.
    this.titleTextEl_ = googDom.getElementsByTagNameAndClass(
        null, titleTextClass, this.titleEl_)[0];
    this.titleCloseEl_ = googDom.getElementsByTagNameAndClass(
        null, titleCloseClass, this.titleEl_)[0];
  } else {
    // Create the title bar element and insert it before the content area.
    // This is useful if the element to decorate only includes a content area.
    this.titleEl_ =
        this.getDomHelper().createDom(TagName.DIV, titleClass);
    dialogElement.insertBefore(this.titleEl_, this.contentEl_);
  }

  // Decorate or create the title text element.
  if (this.titleTextEl_) {
    this.title_ = googDom.getTextContent(this.titleTextEl_);
    // Give the title text element an id if it doesn't already have one.
    if (!this.titleTextEl_.id) {
      this.titleTextEl_.id = this.getId();
    }
  } else {
    this.titleTextEl_ = googDom.createDom(
        TagName.SPAN,
        {'className': titleTextClass, 'id': this.getId()});
    this.titleEl_.appendChild(this.titleTextEl_);
  }
  this.titleTextId_ = this.titleTextEl_.id;
  aria.setState(
      dialogElement, State.LABELLEDBY, this.titleTextId_ || '');
  // Decorate or create the title close element.
  if (!this.titleCloseEl_) {
    this.titleCloseEl_ =
        this.getDomHelper().createDom(TagName.SPAN, titleCloseClass);
    this.titleEl_.appendChild(this.titleCloseEl_);
  }
  style.setElementShown(this.titleCloseEl_, this.hasTitleCloseButton_);

  // Decorate or create the button container element.
  var buttonsClass = goog.getCssName(this.class_, 'buttons');
  this.buttonEl_ = googDom.getElementsByTagNameAndClass(
      null, buttonsClass, dialogElement)[0];
  if (this.buttonEl_) {
    // Button container element found.  Create empty button set and use it to
    // decorate the button container.
    this.buttons_ = new Dialog.ButtonSet(this.getDomHelper());
    this.buttons_.decorate(this.buttonEl_);
  } else {
    // Create new button container element, and render a button set into it.
    this.buttonEl_ =
        this.getDomHelper().createDom(TagName.DIV, buttonsClass);
    dialogElement.appendChild(this.buttonEl_);
    if (this.buttons_) {
      this.buttons_.attachToElement(this.buttonEl_);
    }
    style.setElementShown(this.buttonEl_, !!this.buttons_);
  }
  this.setBackgroundElementOpacity(this.backgroundElementOpacity_);
};


/** @override */
Dialog.prototype.enterDocument = function() {
  Dialog.base(this, 'enterDocument');

  // Listen for keyboard events while the dialog is visible.
  this.getHandler()
      .listen(this.getElement(), EventType.KEYDOWN, this.onKey_)
      .listen(this.getElement(), EventType.KEYPRESS, this.onKey_);

  // NOTE: see bug 1163154 for an example of an edge case where making the
  // dialog visible in response to a KEYDOWN will result in a CLICK event
  // firing on the default button (immediately closing the dialog) if the key
  // that fired the KEYDOWN is also normally used to activate controls
  // (i.e. SPACE/ENTER).
  //
  // This could be worked around by attaching the onButtonClick_ handler in a
  // setTimeout, but that was deemed undesirable.
  this.getHandler().listen(
      this.buttonEl_, EventType.CLICK, this.onButtonClick_);

  // Add drag support.
  this.setDraggingEnabled_(this.draggable_);

  // Add event listeners to the close box and the button container.
  this.getHandler().listen(
      this.titleCloseEl_, EventType.CLICK, this.onTitleCloseClick_);

  var element = this.getElement();
  asserts.assert(element, 'The DOM element for dialog cannot be null');
  aria.setRole(element, this.getPreferredAriaRole());
  if (this.titleTextEl_.id !== '') {
    aria.setState(
        element, State.LABELLEDBY, this.titleTextEl_.id);
  }

  if (!this.modal_) {
    this.setModalInternal_(false);
  }
};


/** @override */
Dialog.prototype.exitDocument = function() {
  if (this.isVisible()) {
    this.setVisible(false);
  }

  // Remove drag support.
  this.setDraggingEnabled_(false);

  Dialog.base(this, 'exitDocument');
};


/**
 * Sets the visibility of the dialog box. Lazily renders the component if
 * needed. After this method returns, isVisible() will always return the new
 * state, even if there is a transition.
 * @param {boolean} visible Whether the dialog should be visible.
 * @override
 */
Dialog.prototype.setVisible = function(visible) {
  if (visible == this.isVisible()) {
    return;
  }

  // If the dialog hasn't been rendered yet, render it now.
  if (!this.isInDocument()) {
    this.render();
  }

  Dialog.base(this, 'setVisible', visible);
};


/**
 * @override
 * @suppress {deprecated} AFTER_SHOW is deprecated earlier in this file.
 */
Dialog.prototype.onShow = function() {
  Dialog.base(this, 'onShow');
  this.maybeUpdateSurroundingSpace_();
  this.dispatchEvent(Dialog.EventType.AFTER_SHOW);
};


/**
 * @override
 * @suppress {deprecated} AFTER_HIDE is deprecated earlier in this file.
 */
Dialog.prototype.onHide = function() {
  Dialog.base(this, 'onHide');
  this.dispatchEvent(Dialog.EventType.AFTER_HIDE);
  if (this.disposeOnHide_) {
    this.dispose();
  }
};


/**
 * Sets dragger limits when dragging is started.
 * @param {!Event} e Dragger.EventType.START event.
 * @private
 */
Dialog.prototype.setDraggerLimits_ = function(e) {
  var doc = this.getDomHelper().getDocument();
  var win = googDom.getWindow(doc) || window;

  // Take the max of scroll height and view height for cases in which document
  // does not fill screen.
  var viewSize = googDom.getViewportSize(win);
  var w = Math.max(doc.body.scrollWidth, viewSize.width);
  var h = Math.max(doc.body.scrollHeight, viewSize.height);

  var dialogSize = style.getSize(this.getElement());
  if (style.getComputedPosition(this.getElement()) == 'fixed') {
    // Ensure position:fixed dialogs can't be dragged beyond the viewport.
    this.dragger_.setLimits(new Rect(
        0, 0, Math.max(0, viewSize.width - dialogSize.width),
        Math.max(0, viewSize.height - dialogSize.height)));
  } else {
    this.dragger_.setLimits(
        new Rect(0, 0, w - dialogSize.width, h - dialogSize.height));
  }
};


/**
 * Handles a click on the title close area.
 * @param {BrowserEvent} e Browser's event object.
 * @private
 */
Dialog.prototype.onTitleCloseClick_ = function(e) {
  this.handleTitleClose_();
};


/**
 * Performs the action of closing the dialog in response to the title close
 * button being interacted with. General purpose method to be called by click
 * and button event handlers.
 * @private
 */
Dialog.prototype.handleTitleClose_ = function() {
  if (!this.hasTitleCloseButton_) {
    return;
  }

  var bs = this.getButtonSet();
  var key = bs && bs.getCancel();
  // Only if there is a valid cancel button is an event dispatched.
  if (key) {
    var caption = /** @type {Element|string} */ (bs.get(key));
    if (this.dispatchEvent(new Dialog.Event(key, caption))) {
      this.setVisible(false);
    }
  } else {
    this.setVisible(false);
  }
};


/**
 * @return {boolean} Whether this dialog has a title close button.
 */
Dialog.prototype.getHasTitleCloseButton = function() {
  return this.hasTitleCloseButton_;
};


/**
 * Sets whether the dialog should have a close button in the title bar. There
 * will always be an element for the title close button, but setting this
 * parameter to false will cause it to be hidden and have no active listener.
 * @param {boolean} b Whether this dialog should have a title close button.
 */
Dialog.prototype.setHasTitleCloseButton = function(b) {
  this.hasTitleCloseButton_ = b;
  if (this.titleCloseEl_) {
    style.setElementShown(this.titleCloseEl_, this.hasTitleCloseButton_);
  }
};


/**
 * @return {boolean} Whether the escape key should close this dialog.
 */
Dialog.prototype.isEscapeToCancel = function() {
  return this.escapeToCancel_;
};


/**
 * @param {boolean} b Whether the escape key should close this dialog.
 */
Dialog.prototype.setEscapeToCancel = function(b) {
  this.escapeToCancel_ = b;
};


/**
 * Sets whether the dialog should be disposed when it is hidden.  By default
 * dialogs are not disposed when they are hidden.
 * @param {boolean} b Whether the dialog should get disposed when it gets
 *     hidden.
 */
Dialog.prototype.setDisposeOnHide = function(b) {
  this.disposeOnHide_ = b;
};


/**
 * @return {boolean} Whether the dialog should be disposed when it is hidden.
 */
Dialog.prototype.getDisposeOnHide = function() {
  return this.disposeOnHide_;
};


/** @override */
Dialog.prototype.disposeInternal = function() {
  this.titleCloseEl_ = null;
  this.buttonEl_ = null;
  Dialog.base(this, 'disposeInternal');
};


/**
 * Sets the button set to use.
 * Note: Passing in null will cause no button set to be rendered.
 * @param {Dialog.ButtonSet?} buttons The button set to use.
 */
Dialog.prototype.setButtonSet = function(buttons) {
  this.buttons_ = buttons;
  if (this.buttonEl_) {
    if (this.buttons_) {
      this.buttons_.attachToElement(this.buttonEl_);
    } else {
      safe.setInnerHtml(this.buttonEl_, SafeHtml.EMPTY);
    }
    style.setElementShown(this.buttonEl_, !!this.buttons_);
  }
};


/**
 * Returns the button set being used.
 * @return {Dialog.ButtonSet?} The button set being used.
 */
Dialog.prototype.getButtonSet = function() {
  return this.buttons_;
};


/**
 * Handles a click on the button container.
 * @param {BrowserEvent} e Browser's event object.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Dialog.prototype.onButtonClick_ = function(e) {
  var button = this.findParentButton_(/** @type {Element} */ (e.target));
  if (button && !button.disabled) {
    var key = button.name;
    var caption = /** @type {Element|string} */ (this.getButtonSet().get(key));
    if (this.dispatchEvent(new Dialog.Event(key, caption))) {
      this.setVisible(false);
    }
  }
};


/**
 * Finds the parent button of an element (or null if there was no button
 * parent).
 * @param {Element} element The element that was clicked on.
 * @return {Element} Returns the parent button or null if not found.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Dialog.prototype.findParentButton_ = function(element) {
  var el = element;
  while (el != null && el != this.buttonEl_) {
    if (el.tagName == TagName.BUTTON) {
      return /** @type {Element} */ (el);
    }
    el = el.parentNode;
  }
  return null;
};


/**
 * Handles keydown and keypress events, and dismisses the popup if cancel is
 * pressed.  If there is a cancel action in the ButtonSet, than that will be
 * fired.  Also prevents tabbing out of the dialog.
 * @param {BrowserEvent} e Browser's event object.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Dialog.prototype.onKey_ = function(e) {
  var close = false;
  var hasHandler = false;
  var buttonSet = this.getButtonSet();
  var target = e.target;

  if (e.type == EventType.KEYDOWN) {
    // Escape and tab can only properly be handled in keydown handlers.
    if (this.escapeToCancel_ && e.keyCode == KeyCodes.ESC) {
      // Only if there is a valid cancel button is an event dispatched.
      var cancel = buttonSet && buttonSet.getCancel();

      // Users may expect to hit escape on a SELECT element.
      var isSpecialFormElement =
          target.tagName == TagName.SELECT && !target.disabled;

      if (cancel && !isSpecialFormElement) {
        hasHandler = true;

        var caption = buttonSet.get(cancel);
        close = this.dispatchEvent(new Dialog.Event(
            cancel,
            /** @type {Element|null|string} */ (caption)));
      } else if (!isSpecialFormElement) {
        close = true;
      }
    } else if (
        e.keyCode == KeyCodes.TAB && e.shiftKey &&
        target == this.getElement()) {
      // Prevent the user from shift-tabbing backwards out of the dialog box.
      // Instead, set up a wrap in focus backward to the end of the dialog.
      this.setupBackwardTabWrap();
    }
  } else if (e.keyCode == KeyCodes.ENTER) {
    // Only handle ENTER in keypress events, in case the action opens a
    // popup window.
    var key;
    if (target.tagName == TagName.BUTTON && !target.disabled) {
      // If the target is a button and it's enabled, we can fire that button's
      // handler.
      key = target.name;
    } else if (target == this.titleCloseEl_) {
      // if the title 'close' button is in focus, close the dialog
      this.handleTitleClose_();
    } else if (buttonSet) {
      // Try to fire the default button's handler (if one exists), but only if
      // the button is enabled.
      var defaultKey = buttonSet.getDefault();
      var defaultButton = defaultKey && buttonSet.getButton(defaultKey);

      // Users may expect to hit enter on a TEXTAREA, SELECT or an A element.
      var isSpecialFormElement = (target.tagName == TagName.TEXTAREA ||
                                  target.tagName == TagName.SELECT ||
                                  target.tagName == TagName.A) &&
          !target.disabled;

      if (defaultButton && !defaultButton.disabled && !isSpecialFormElement) {
        key = defaultKey;
      }
    }
    if (key && buttonSet) {
      hasHandler = true;
      close = this.dispatchEvent(
          new Dialog.Event(key, String(buttonSet.get(key))));
    }
  } else if (
      target == this.titleCloseEl_ &&
      (e.keyCode == KeyCodes.SPACE ||
       e.key == Keys.SPACE)) {
    // if the title 'close' button is in focus on 'SPACE,' close the dialog
    this.handleTitleClose_();
  }

  if (close || hasHandler) {
    e.stopPropagation();
    e.preventDefault();
  }

  if (close) {
    this.setVisible(false);
  }
};



/**
 * Dialog event class.
 * @param {string} key Key identifier for the button.
 * @param {string|Element} caption Caption on the button (might be i18nlized).
 * @constructor
 * @extends {Event}
 */
Dialog.Event = function(key, caption) {
  /** @const {!Dialog.EventType} */
  this.type = Dialog.EventType.SELECT;
  /** @const */
  this.key = key;
  /** @const */
  this.caption = caption;
};
goog.inherits(Dialog.Event, Event);


/**
 * Event type constant for dialog events.
 * TODO(attila): Change this to Dialog.EventType.SELECT.
 * @type {string}
 * @deprecated Use Dialog.EventType.SELECT.
 */
Dialog.SELECT_EVENT = 'dialogselect';


/**
 * Events dispatched by dialogs.
 * @enum {string}
 */
Dialog.EventType = {
  /**
     * Dispatched when the user closes the dialog.
     * The dispatched event will always be of type {@link Dialog.Event}.
     * Canceling the event will prevent the dialog from closing.
     */
  SELECT: 'dialogselect',

  /**
   * Dispatched after the dialog is closed. Not cancelable.
   * @deprecated Use goog.ui.PopupBase.EventType.HIDE.
   */
  AFTER_HIDE: 'afterhide',

  /**
   * Dispatched after the dialog is shown. Not cancelable.
   * @deprecated Use goog.ui.PopupBase.EventType.SHOW.
   */
  AFTER_SHOW: 'aftershow'
};



/**
 * A button set defines the behaviour of a set of buttons that the dialog can
 * show.  Uses the {@link goog.structs.Map} interface.
 * @param {googDom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *    goog.ui.Component} for semantics.
 * @constructor
 * @extends {Map}
 */
Dialog.ButtonSet = function(opt_domHelper) {
  Map.call(this);
  // TODO(attila):  Refactor ButtonSet to extend goog.ui.Component?
  this.dom_ = opt_domHelper || googDom.getDomHelper();


  /**
   * A CSS className for this component.
   * @private @const {string}
   */
  this.class_ = goog.getCssName('goog-buttonset');


  /**
   * The button that has default focus (references key in buttons_ map).
   * @private {?string}
   */
  this.defaultButton_ = null;


  /**
   * Optional container the button set should be rendered into.
   * @private {?Element}
   */
  this.element_ = null;


  /**
   * The button whose action is associated with the escape key and the X button
   * on the dialog.
   * @private {?string}
   */
  this.cancelButton_ = null;
};
goog.inherits(Dialog.ButtonSet, Map);


/** @override */
Dialog.ButtonSet.prototype.clear = function() {
  Map.prototype.clear.call(this);
  this.defaultButton_ = this.cancelButton_ = null;
};


/**
 * Adds a button to the button set.  Buttons will be displayed in the order they
 * are added.
 *
 * @param {*} key Key used to identify the button in events.
 * @param {*} caption A string caption or a DOM node that can be
 *     appended to a button element.
 * @param {boolean=} opt_isDefault Whether this button is the default button,
 *     Dialog will dispatch for this button if enter is pressed.
 * @param {boolean=} opt_isCancel Whether this button has the same behaviour as
 *    cancel.  If escape is pressed this button will fire.
 * @return {!Dialog.ButtonSet} The button set, to make it easy to chain
 *    "set" calls and build new ButtonSets.
 * @override
 */
Dialog.ButtonSet.prototype.set = function(
    key, caption, opt_isDefault, opt_isCancel) {
  Map.prototype.set.call(this, key, caption);

  if (opt_isDefault) {
    this.defaultButton_ = /** @type {?string} */ (key);
  }
  if (opt_isCancel) {
    this.cancelButton_ = /** @type {?string} */ (key);
  }

  return this;
};


/**
 * Adds a button (an object with a key and caption) to this button set. Buttons
 * will be displayed in the order they are added.
 * @see Dialog.DefaultButtons
 * @param {{key: string, caption: string}} button The button key and caption.
 * @param {boolean=} opt_isDefault Whether this button is the default button.
 *     Dialog will dispatch for this button if enter is pressed.
 * @param {boolean=} opt_isCancel Whether this button has the same behavior as
 *     cancel. If escape is pressed this button will fire.
 * @return {!Dialog.ButtonSet} The button set, to make it easy to chain
 *     "addButton" calls and build new ButtonSets.
 */
Dialog.ButtonSet.prototype.addButton = function(
    button, opt_isDefault, opt_isCancel) {
  return this.set(button.key, button.caption, opt_isDefault, opt_isCancel);
};


/**
 * Attaches the button set to an element, rendering it inside.
 * @param {Element} el Container.
 */
Dialog.ButtonSet.prototype.attachToElement = function(el) {
  this.element_ = el;
  this.render();
};


/**
 * Renders the button set inside its container element.
 */
Dialog.ButtonSet.prototype.render = function() {
  if (this.element_) {
    safe.setInnerHtml(this.element_, SafeHtml.EMPTY);
    var domHelper = googDom.getDomHelper(this.element_);
    this.forEach(function(caption, key) {
      var button =
          domHelper.createDom(TagName.BUTTON, {'name': key}, caption);
      if (key == this.defaultButton_) {
        button.className = goog.getCssName(this.class_, 'default');
      }
      this.element_.appendChild(button);
    }, this);
  }
};


/**
 * Decorates the given element by adding any `button` elements found
 * among its descendants to the button set.  The first button found is assumed
 * to be the default and will receive focus when the button set is rendered.
 * If a button with a name of {@link Dialog.DefaultButtonKeys.CANCEL}
 * is found, it is assumed to have "Cancel" semantics.
 * TODO(attila):  ButtonSet should be a goog.ui.Component.  Really.
 * @param {Element} element The element to decorate; should contain buttons.
 */
Dialog.ButtonSet.prototype.decorate = function(element) {
  if (!element || element.nodeType != NodeType.ELEMENT) {
    return;
  }

  this.element_ = element;
  var buttons =
      googDom.getElementsByTagName(TagName.BUTTON, this.element_);
  for (var i = 0, button, key, caption; button = buttons[i]; i++) {
    // Buttons should have a "name" attribute and have their caption defined by
    // their innerHTML, but not everyone knows this, and we should play nice.
    key = button.name || button.id;
    caption = googDom.getTextContent(button) || button.value;
    if (key) {
      var isDefault = i == 0;
      var isCancel = button.name == Dialog.DefaultButtonKeys.CANCEL;
      this.set(key, caption, isDefault, isCancel);
      if (isDefault) {
        classlist.add(button, goog.getCssName(this.class_, 'default'));
      }
    }
  }
};


/**
 * Gets the component's element.
 * @return {Element} The element for the component.
 * TODO(user): Remove after refactoring to goog.ui.Component.
 */
Dialog.ButtonSet.prototype.getElement = function() {
  return this.element_;
};


/**
 * Returns the dom helper that is being used on this component.
 * @return {!googDom.DomHelper} The dom helper used on this component.
 * TODO(user): Remove after refactoring to goog.ui.Component.
 */
Dialog.ButtonSet.prototype.getDomHelper = function() {
  return this.dom_;
};


/**
 * Sets the default button.
 * @param {?string} key The default button.
 */
Dialog.ButtonSet.prototype.setDefault = function(key) {
  this.defaultButton_ = key;
};


/**
 * Returns the default button.
 * @return {?string} The default button.
 */
Dialog.ButtonSet.prototype.getDefault = function() {
  return this.defaultButton_;
};


/**
 * Sets the cancel button.
 * @param {?string} key The cancel button.
 */
Dialog.ButtonSet.prototype.setCancel = function(key) {
  this.cancelButton_ = key;
};


/**
 * Returns the cancel button.
 * @return {?string} The cancel button.
 */
Dialog.ButtonSet.prototype.getCancel = function() {
  return this.cancelButton_;
};


/**
 * Returns the HTML Button element.
 * @param {string} key The button to return.
 * @return {Element} The button, if found else null.
 */
Dialog.ButtonSet.prototype.getButton = function(key) {
  var buttons = this.getAllButtons();
  for (var i = 0, nextButton; nextButton = buttons[i]; i++) {
    if (nextButton.name == key || nextButton.id == key) {
      return nextButton;
    }
  }
  return null;
};


/**
 * Returns all the HTML Button elements in the button set container.
 * @return {!IArrayLike<!Element>} A live NodeList of the buttons.
 */
Dialog.ButtonSet.prototype.getAllButtons = function() {
  return googDom.getElementsByTagName(
      TagName.BUTTON, asserts.assert(this.element_));
};


/**
 * Enables or disables a button in this set by key. If the button is not found,
 * does nothing.
 * @param {string} key The button to enable or disable.
 * @param {boolean} enabled True to enable; false to disable.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Dialog.ButtonSet.prototype.setButtonEnabled = function(key, enabled) {
  var button = this.getButton(key);
  if (button) {
    button.disabled = !enabled;
  }
};


/**
 * Enables or disables all of the buttons in this set.
 * @param {boolean} enabled True to enable; false to disable.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
Dialog.ButtonSet.prototype.setAllButtonsEnabled = function(enabled) {
  var allButtons = this.getAllButtons();
  for (var i = 0, button; button = allButtons[i]; i++) {
    button.disabled = !enabled;
  }
};


/**
 * The keys used to identify standard buttons in events.
 * @enum {string}
 */
Dialog.DefaultButtonKeys = {
  OK: 'ok',
  CANCEL: 'cancel',
  YES: 'yes',
  NO: 'no',
  SAVE: 'save',
  CONTINUE: 'continue'
};


/**
 * @desc Standard caption for the dialog 'OK' button.
 * @private
 */
Dialog.MSG_DIALOG_OK_ = goog.getMsg('OK');


/**
 * @desc Standard caption for the dialog 'Cancel' button.
 * @private
 */
Dialog.MSG_DIALOG_CANCEL_ = goog.getMsg('Cancel');


/**
 * @desc Standard caption for the dialog 'Yes' button.
 * @private
 */
Dialog.MSG_DIALOG_YES_ = goog.getMsg('Yes');


/**
 * @desc Standard caption for the dialog 'No' button.
 * @private
 */
Dialog.MSG_DIALOG_NO_ = goog.getMsg('No');


/**
 * @desc Standard caption for the dialog 'Save' button.
 * @private
 */
Dialog.MSG_DIALOG_SAVE_ = goog.getMsg('Save');


/**
 * @desc Standard caption for the dialog 'Continue' button.
 * @private
 */
Dialog.MSG_DIALOG_CONTINUE_ = goog.getMsg('Continue');


/**
 * @desc Standard label for the dialog 'X' (close) button.
 * @private
 */
Dialog.MSG_GOOG_UI_DIALOG_CLOSE_ = goog.getMsg('Close');


/**
 * The default captions for the default buttons.
 * @enum {string}
 */
Dialog.DefaultButtonCaptions = {
  OK: Dialog.MSG_DIALOG_OK_,
  CANCEL: Dialog.MSG_DIALOG_CANCEL_,
  YES: Dialog.MSG_DIALOG_YES_,
  NO: Dialog.MSG_DIALOG_NO_,
  SAVE: Dialog.MSG_DIALOG_SAVE_,
  CONTINUE: Dialog.MSG_DIALOG_CONTINUE_
};


/**
 * The standard buttons (keys associated with captions).
 * @enum {{key: string, caption: string}}
 */
Dialog.ButtonSet.DefaultButtons = {
  OK: {
    key: Dialog.DefaultButtonKeys.OK,
    caption: Dialog.DefaultButtonCaptions.OK
  },
  CANCEL: {
    key: Dialog.DefaultButtonKeys.CANCEL,
    caption: Dialog.DefaultButtonCaptions.CANCEL
  },
  YES: {
    key: Dialog.DefaultButtonKeys.YES,
    caption: Dialog.DefaultButtonCaptions.YES
  },
  NO: {
    key: Dialog.DefaultButtonKeys.NO,
    caption: Dialog.DefaultButtonCaptions.NO
  },
  SAVE: {
    key: Dialog.DefaultButtonKeys.SAVE,
    caption: Dialog.DefaultButtonCaptions.SAVE
  },
  CONTINUE: {
    key: Dialog.DefaultButtonKeys.CONTINUE,
    caption: Dialog.DefaultButtonCaptions.CONTINUE
  }
};


/**
 * Creates a new ButtonSet with a single 'OK' button, which is also set with
 * cancel button semantics so that pressing escape will close the dialog.
 * @return {!Dialog.ButtonSet} The created ButtonSet.
 */
Dialog.ButtonSet.createOk = function() {
  return new Dialog.ButtonSet().addButton(
      Dialog.ButtonSet.DefaultButtons.OK, true, true);
};


/**
 * Creates a new ButtonSet with 'OK' (default) and 'Cancel' buttons.
 * @return {!Dialog.ButtonSet} The created ButtonSet.
 */
Dialog.ButtonSet.createOkCancel = function() {
  return new Dialog.ButtonSet()
      .addButton(Dialog.ButtonSet.DefaultButtons.OK, true)
      .addButton(Dialog.ButtonSet.DefaultButtons.CANCEL, false, true);
};


/**
 * Creates a new ButtonSet with 'Yes' (default) and 'No' buttons.
 * @return {!Dialog.ButtonSet} The created ButtonSet.
 */
Dialog.ButtonSet.createYesNo = function() {
  return new Dialog.ButtonSet()
      .addButton(Dialog.ButtonSet.DefaultButtons.YES, true)
      .addButton(Dialog.ButtonSet.DefaultButtons.NO, false, true);
};


/**
 * Creates a new ButtonSet with 'Yes', 'No' (default), and 'Cancel' buttons.
 * @return {!Dialog.ButtonSet} The created ButtonSet.
 */
Dialog.ButtonSet.createYesNoCancel = function() {
  return new Dialog.ButtonSet()
      .addButton(Dialog.ButtonSet.DefaultButtons.YES)
      .addButton(Dialog.ButtonSet.DefaultButtons.NO, true)
      .addButton(Dialog.ButtonSet.DefaultButtons.CANCEL, false, true);
};


/**
 * Creates a new ButtonSet with 'Continue', 'Save', and 'Cancel' (default)
 * buttons.
 * @return {!Dialog.ButtonSet} The created ButtonSet.
 */
Dialog.ButtonSet.createContinueSaveCancel = function() {
  return new Dialog.ButtonSet()
      .addButton(Dialog.ButtonSet.DefaultButtons.CONTINUE)
      .addButton(Dialog.ButtonSet.DefaultButtons.SAVE)
      .addButton(Dialog.ButtonSet.DefaultButtons.CANCEL, true, true);
};


// TODO(user): These shared instances should be phased out.
(function() {
  if (typeof document != 'undefined') {
    /** @deprecated Use Dialog.ButtonSet#createOk. */
    Dialog.ButtonSet.OK = Dialog.ButtonSet.createOk();

    /** @deprecated Use Dialog.ButtonSet#createOkCancel. */
    Dialog.ButtonSet.OK_CANCEL =
        Dialog.ButtonSet.createOkCancel();

    /** @deprecated Use Dialog.ButtonSet#createYesNo. */
    Dialog.ButtonSet.YES_NO = Dialog.ButtonSet.createYesNo();

    /** @deprecated Use Dialog.ButtonSet#createYesNoCancel. */
    Dialog.ButtonSet.YES_NO_CANCEL =
        Dialog.ButtonSet.createYesNoCancel();

    /** @deprecated Use Dialog.ButtonSet#createContinueSaveCancel. */
    Dialog.ButtonSet.CONTINUE_SAVE_CANCEL =
        Dialog.ButtonSet.createContinueSaveCancel();
  }
})();
