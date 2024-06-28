/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Detects images dragged and dropped on to the window.
 */

import * as dom from '../dom/dom.js';

import { InputType } from '../dom/inputtype.js';
import { TagName } from '../dom/tagname.js';
import { Event } from '../events/event.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
import { Coordinate } from '../math/coordinate.js';
import * as googString from '../string/string.js';
import * as style from '../style/style.js';
import * as userAgent from '../useragent/useragent.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * Creates a new drag and drop detector.
 * @param {string=} opt_filePath The URL of the page to use for the detector.
 *     It should contain the same contents as dragdropdetector_target.html in
 *     the demos directory.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function DragDropDetector(opt_filePath) {
  DragDropDetector.base(this, 'constructor');

  var iframe = dom.createDom(TagName.IFRAME, {'frameborder': 0});
  // In Firefox, we do all drop detection with an IFRAME.  In IE, we only use
  // the IFRAME to capture copied, non-linked images.  (When we don't need it,
  // we put a text INPUT before it and push it off screen.)
  iframe.className = userAgent.IE ?
      goog.getCssName(
          DragDropDetector.BASE_CSS_NAME_, 'ie-editable-iframe') :
      goog.getCssName(
          DragDropDetector.BASE_CSS_NAME_, 'w3c-editable-iframe');
  iframe.src = opt_filePath || DragDropDetector.DEFAULT_FILE_PATH_;

  this.element_ = /** @type {!HTMLIFrameElement} */ (iframe);

  this.handler_ = new EventHandler(this);
  this.handler_.listen(iframe, EventType.LOAD, this.initIframe_);

  if (userAgent.IE) {
    // In IE, we have to bounce between an INPUT for catching links and an
    // IFRAME for catching images.
    this.textInput_ = dom.createDom(TagName.INPUT, {
      'type': InputType.TEXT,
      'className':
          goog.getCssName(DragDropDetector.BASE_CSS_NAME_, 'ie-input')
    });

    this.root_ = dom.createDom(
        TagName.DIV,
        goog.getCssName(DragDropDetector.BASE_CSS_NAME_, 'ie-div'),
        this.textInput_, iframe);
  } else {
    this.root_ = iframe;
  }

  this.mutationObserver_ =
      new MutationObserver(() => this.handleNodeInserted_());

  document.body.appendChild(this.root_);
}
goog.inherits(DragDropDetector, EventTarget);


/**
 * Drag and drop event types.
 * @enum {string}
 */
DragDropDetector.EventType = {
  IMAGE_DROPPED: 'onimagedrop',
  LINK_DROPPED: 'onlinkdrop'
};


/**
 * Browser specific drop event type.
 * @type {string}
 * @private
 */
DragDropDetector.DROP_EVENT_TYPE_ =
    userAgent.IE ? EventType.DROP : 'dragdrop';


/**
 * Initial value for clientX and clientY indicating that the location has
 * never been updated.
 */
DragDropDetector.INIT_POSITION = -10000;


/**
 * Prefix for all CSS names.
 * @type {string}
 * @private
 */
DragDropDetector.BASE_CSS_NAME_ = goog.getCssName('goog-dragdrop');


/**
 * @desc Message shown to users to inform them that they can't drag and drop
 *     local files.
 */
DragDropDetector.MSG_DRAG_DROP_LOCAL_FILE_ERROR = goog.getMsg(
    'It is not possible to drag ' +
    'and drop image files at this time.\nPlease drag an image from your web ' +
    'browser.');


/**
 * @desc Message shown to users trying to drag and drop protected images from
 *     Flickr, etc.
 */
DragDropDetector.MSG_DRAG_DROP_PROTECTED_FILE_ERROR = goog.getMsg(
    'The image you are ' +
    'trying to drag has been blocked by the hosting site.');


/**
 * A map of special case information for URLs that cannot be dropped.  Each
 * entry is of the form:
 *     regex: url regex
 *     message: user visible message about this special case
 * @type {Array<{regex: RegExp, message: string}>}
 * @private
 */
DragDropDetector.SPECIAL_CASE_URLS_ = [
  {
    regex: /^file:\/\/\//,
    message: DragDropDetector.MSG_DRAG_DROP_LOCAL_FILE_ERROR
  },
  {
    regex: /flickr(.*)spaceball.gif$/,
    message: DragDropDetector.MSG_DRAG_DROP_PROTECTED_FILE_ERROR
  }
];


/**
 * Regex that matches anything that looks kind of like a URL.  It matches
 * nonspacechars://nonspacechars
 * @type {RegExp}
 * @private
 */
DragDropDetector.URL_LIKE_REGEX_ = /^\S+:\/\/\S*$/;


/**
 * Path to the dragdrop.html file.
 * @type {string}
 * @private
 */
DragDropDetector.DEFAULT_FILE_PATH_ = 'dragdropdetector_target.html';


/**
 * Our event handler object.
 * @type {EventHandler<!DragDropDetector>}
 * @private
 */
DragDropDetector.prototype.handler_;


/**
 * The root element (the IFRAME on most browsers, the DIV on IE).
 * @type {Element}
 * @private
 */
DragDropDetector.prototype.root_;


/**
 * The text INPUT element used to detect link drops on IE.  null on Firefox.
 * @type {Element}
 * @private
 */
DragDropDetector.prototype.textInput_;


/**
 * The iframe element.
 * @type {HTMLIFrameElement}
 * @private
 */
DragDropDetector.prototype.element_;


/**
 * The iframe's window, null if the iframe hasn't loaded yet.
 * @type {?Window}
 * @private
 */
DragDropDetector.prototype.window_ = null;


/**
 * The iframe's document, null if the iframe hasn't loaded yet.
 * @type {?Document}
 * @private
 */
DragDropDetector.prototype.document_ = null;


/**
 * The iframe's body, null if the iframe hasn't loaded yet.
 * @type {?HTMLBodyElement}
 * @private
 */
DragDropDetector.prototype.body_ = null;


/**
 * Whether we are in "screen cover" mode in which the iframe or div is
 * covering the entire screen.
 * @type {boolean}
 * @private
 */
DragDropDetector.prototype.isCoveringScreen_ = false;


/**
 * The last position of the mouse while dragging.
 * @type {?Coordinate}
 * @private
 */
DragDropDetector.prototype.mousePosition_ = null;

/**
 * Observer for the iframe body to detect node insertions.
 * @type {!MutationObserver}
 * @private
 * @const
 */
DragDropDetector.prototype.mutationObserver_;

/**
 * Initialize the iframe after it has loaded.
 * @private
 */
DragDropDetector.prototype.initIframe_ = function() {
  // Set up a holder for position data.
  this.mousePosition_ = new Coordinate(
      DragDropDetector.INIT_POSITION,
      DragDropDetector.INIT_POSITION);

  // Set up pointers to the important parts of the IFrame.
  this.window_ = this.element_.contentWindow;
  this.document_ = this.window_.document;
  this.body_ = this.document_.body;

  if (userAgent.GECKO) {
    this.document_.designMode = 'on';
  } else if (!userAgent.IE) {
    // Bug 1667110
    // In IE, we only set the IFrame body as content-editable when we bring it
    // into view at the top of the page.  Otherwise it may take focus when the
    // page is loaded, scrolling the user far offscreen.
    // Note that this isn't easily unit-testable, since it depends on a
    // browser-specific behavior with content-editable areas.
    this.body_.contentEditable = true;
  }

  this.handler_.listen(
      document.body, EventType.DRAGENTER, this.coverScreen_);

  if (userAgent.IE) {
    // IE only events.
    // Set up events on the IFrame.
    this.handler_
        .listen(
            this.body_,
            [EventType.DRAGENTER, EventType.DRAGOVER],
            DragDropDetector.enforceCopyEffect_)
        .listen(this.body_, EventType.MOUSEOUT, this.switchToInput_)
        .listen(
            this.body_, EventType.DRAGLEAVE, this.uncoverScreen_)
        .listen(
            this.body_, DragDropDetector.DROP_EVENT_TYPE_,
            function(e) {
              this.trackMouse_(e);

              // The drop event occurs before the content is added to the
              // iframe.  We setTimeout so that handleNodeInserted_ is called
              //  after the content is in the document.
              goog.global.setTimeout(
                  goog.bind(this.handleNodeInserted_, this), 0);
              return true;
            })
        .

        // Set up events on the DIV.
        listen(
            this.root_,
            [EventType.DRAGENTER, EventType.DRAGOVER],
            this.handleNewDrag_)
        .listen(
            this.root_,
            [EventType.MOUSEMOVE, EventType.KEYPRESS],
            this.uncoverScreen_)
        .

        // Set up events on the text INPUT.
        listen(
            this.textInput_, EventType.DRAGOVER,
            Event.preventDefault)
        .listen(
            this.textInput_, DragDropDetector.DROP_EVENT_TYPE_,
            this.handleInputDrop_);
  } else {
    // W3C events.
    this.handler_
        .listen(
            this.body_, DragDropDetector.DROP_EVENT_TYPE_,
            function(e) {
              this.trackMouse_(e);
              this.uncoverScreen_();
            })
        .listen(
            this.body_,
            [EventType.MOUSEMOVE, EventType.KEYPRESS],
            this.uncoverScreen_);
    // Detect content insertion into the iframe body.
    this.mutationObserver_.observe(this.body_, {childList: true});
  }
};


/**
 * Enforce that anything dragged over the IFRAME is copied in to it, rather
 * than making it navigate to a different URL.
 * @param {BrowserEvent} e The event to enforce copying on.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DragDropDetector.enforceCopyEffect_ = function(e) {
  var event = e.getBrowserEvent();
  // This function is only called on IE.
  if (event.dataTransfer.dropEffect.toLowerCase() != 'copy') {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    event.dataTransfer.dropEffect = 'copy';
  }
};


/**
 * Cover the screen with the iframe.
 * @param {BrowserEvent} e The event that caused this function call.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DragDropDetector.prototype.coverScreen_ = function(e) {
  // Don't do anything if the drop effect is 'none' and we are in IE.
  // It is set to 'none' in cases like dragging text inside a text area.
  if (userAgent.IE &&
      e.getBrowserEvent().dataTransfer.dropEffect == 'none') {
    return;
  }

  if (!this.isCoveringScreen_) {
    this.isCoveringScreen_ = true;
    if (userAgent.IE) {
      style.setStyle(this.root_, 'top', '0');
      this.body_.contentEditable = true;
      this.switchToInput_(e);
    } else {
      style.setStyle(this.root_, 'height', '5000px');
    }
  }
};


/**
 * Uncover the screen.
 * @private
 */
DragDropDetector.prototype.uncoverScreen_ = function() {
  if (this.isCoveringScreen_) {
    this.isCoveringScreen_ = false;
    if (userAgent.IE) {
      this.body_.contentEditable = false;
      style.setStyle(this.root_, 'top', '-5000px');
    } else {
      style.setStyle(this.root_, 'height', '10px');
    }
  }
};


/**
 * Re-insert the INPUT into the DIV.  Does nothing when the DIV is off screen.
 * @param {BrowserEvent} e The event that caused this function call.
 * @private
 */
DragDropDetector.prototype.switchToInput_ = function(e) {
  // This is only called on IE.
  if (this.isCoveringScreen_) {
    style.setElementShown(this.textInput_, true);
  }
};


/**
 * Remove the text INPUT so the IFRAME is showing.  Does nothing when the DIV is
 * off screen.
 * @param {BrowserEvent} e The event that caused this function call.
 * @private
 */
DragDropDetector.prototype.switchToIframe_ = function(e) {
  // This is only called on IE.
  if (this.isCoveringScreen_) {
    style.setElementShown(this.textInput_, false);
  }
};


/**
 * Handle a new drag event.
 * @param {BrowserEvent} e The event object.
 * @return {boolean|undefined} Returns false in IE to cancel the event.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DragDropDetector.prototype.handleNewDrag_ = function(e) {
  var event = e.getBrowserEvent();

  // This is only called on IE.
  if (event.dataTransfer.dropEffect == 'link') {
    this.switchToInput_(e);
    e.preventDefault();
    return false;
  }

  // Things that aren't links can be placed in the contentEditable iframe.
  this.switchToIframe_(e);

  // No need to return true since for events return true is the same as no
  // return.
};


/**
 * Handle mouse tracking.
 * @param {BrowserEvent} e The event object.
 * @private
 */
DragDropDetector.prototype.trackMouse_ = function(e) {
  this.mousePosition_.x = e.clientX;
  this.mousePosition_.y = e.clientY;

  // Check if the event is coming from within the iframe.
  if (dom.getOwnerDocument(/** @type {Node} */ (e.target)) != document) {
    var iframePosition = style.getClientPosition(this.element_);
    this.mousePosition_.x += iframePosition.x;
    this.mousePosition_.y += iframePosition.y;
  }
};


/**
 * Handle a drop on the IE text INPUT.
 * @param {BrowserEvent} e The event object.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DragDropDetector.prototype.handleInputDrop_ = function(e) {
  this.dispatchEvent(new DragDropDetector.LinkDropEvent(
      e.getBrowserEvent().dataTransfer.getData('Text')));
  this.uncoverScreen_();
  e.preventDefault();
};


/**
 * Clear the contents of the iframe.
 * @private
 */
DragDropDetector.prototype.clearContents_ = function() {
  if (userAgent.WEBKIT) {
    // Since this is called on a mutation event for the nodes we are going to
    // clear, calling this right away crashes some versions of WebKit.  Wait
    // until the events are finished.
    goog.global.setTimeout(goog.bind(function() {
      dom.setTextContent(this, '');
    }, this.body_), 0);
  } else {
    this.document_.execCommand('selectAll', false, null);
    this.document_.execCommand('delete', false, null);
    this.document_.execCommand('selectAll', false, null);
  }
};


/**
 * Event handler called when the content of the iframe changes.
 * @private
 */
DragDropDetector.prototype.handleNodeInserted_ = function() {
  var uri;

  if (this.body_.innerHTML.indexOf('<') == -1) {
    // If the document contains no tags (i.e. is just text), try it out.
    uri = googString.trim(dom.getTextContent(this.body_));

    // See if it looks kind of like a url.
    if (!uri.match(DragDropDetector.URL_LIKE_REGEX_)) {
      uri = null;
    }
  }

  if (!uri) {
    var imgs = dom.getElementsByTagName(TagName.IMG, this.body_);
    if (imgs && imgs.length) {
      // TODO(robbyw): Grab all the images, instead of just the first.
      var img = imgs[0];
      uri = img.src;
    }
  }

  if (uri) {
    var specialCases = DragDropDetector.SPECIAL_CASE_URLS_;
    var len = specialCases.length;
    for (var i = 0; i < len; i++) {
      var specialCase = specialCases[i];
      if (uri.match(specialCase.regex)) {
        alert(specialCase.message);
        break;
      }
    }

    // If no special cases matched, add the image.
    if (i == len) {
      this.dispatchEvent(
          new DragDropDetector.ImageDropEvent(
              uri, this.mousePosition_));
      return;
    }
  }

  var links = dom.getElementsByTagName(TagName.A, this.body_);
  if (links) {
    for (i = 0, len = links.length; i < len; i++) {
      this.dispatchEvent(
          new DragDropDetector.LinkDropEvent(links[i].href));
    }
  }

  this.clearContents_();
  this.uncoverScreen_();
};


/** @override */
DragDropDetector.prototype.disposeInternal = function() {
  DragDropDetector.base(this, 'disposeInternal');
  this.handler_.dispose();
  this.handler_ = null;
  this.mutationObserver_.disconnect();
};



/**
 * Creates a new image drop event object.
 * @param {string} url The url of the dropped image.
 * @param {Coordinate} position The screen position where the drop
 *     occurred.
 * @constructor
 * @extends {Event}
 * @final
 */
DragDropDetector.ImageDropEvent = function(url, position) {
  DragDropDetector.ImageDropEvent.base(
      this, 'constructor', DragDropDetector.EventType.IMAGE_DROPPED);

  /**
   * The url of the image that was dropped.
   * @type {string}
   * @private
   */
  this.url_ = url;

  /**
     * The screen position where the drop occurred.
     * @type {Coordinate}
     * @private
     */
  this.position_ = position;
};
goog.inherits(DragDropDetector.ImageDropEvent, Event);


/**
 * @return {string} The url of the image that was dropped.
 */
DragDropDetector.ImageDropEvent.prototype.getUrl = function() {
  return this.url_;
};


/**
 * @return {Coordinate} The screen position where the drop occurred.
 *     This may be have x and y of DragDropDetector.INIT_POSITION,
 *     indicating the drop position is unknown.
 */
DragDropDetector.ImageDropEvent.prototype.getPosition = function() {
  return this.position_;
};



/**
 * Creates a new link drop event object.
 * @param {string} url The url of the dropped link.
 * @constructor
 * @extends {Event}
 * @final
 */
DragDropDetector.LinkDropEvent = function(url) {
  DragDropDetector.LinkDropEvent.base(
      this, 'constructor', DragDropDetector.EventType.LINK_DROPPED);

  /**
   * The url of the link that was dropped.
   * @type {string}
   * @private
   */
  this.url_ = url;
};
goog.inherits(DragDropDetector.LinkDropEvent, Event);


/**
 * @return {string} The url of the link that was dropped.
 */
DragDropDetector.LinkDropEvent.prototype.getUrl = function() {
  return this.url_;
};
