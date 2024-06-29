/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Predefined DHTML animations such as slide, resize and fade.
 *
 * @see ../demos/effects.html
 */

import * as googColor from '../color/color.js';

import * as events from '../events/events.js';
import { Animation } from './animation.js';
import { Transition } from './transition.js';
import * as style from '../style/style.js';
import * as bidi from '../style/bidi.js';
const {EventHandler} = goog.requireType('goog.events.eventhandler');



/**
 * Abstract class that provides reusable functionality for predefined animations
 * that manipulate a single DOM element
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {Array<number>} start Array for start coordinates.
 * @param {Array<number>} end Array for end coordinates.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {Animation}
 * @constructor
 * @struct
 */
export function PredefinedEffect(element, start, end, time, opt_acc) {
  PredefinedEffect.base(
      this, 'constructor', start, end, time, opt_acc);

  /**
   * DOM Node that will be used in the animation
   * @type {Element}
   */
  this.element = element;

  /**
   * Whether the element is rendered right-to-left. We cache this here for
   * efficiency.
   * @private {boolean|undefined}
   */
  this.rightToLeft_;
}
goog.inherits(PredefinedEffect, Animation);


/**
 * Called to update the style of the element.
 * @protected
 */
PredefinedEffect.prototype.updateStyle = function() {};


/**
 * Whether the DOM element being manipulated is rendered right-to-left.
 * @return {boolean} True if the DOM element is rendered right-to-left, false
 *     otherwise.
 */
PredefinedEffect.prototype.isRightToLeft = function() {
  if (this.rightToLeft_ === undefined) {
    this.rightToLeft_ = style.isRightToLeft(this.element);
  }
  return this.rightToLeft_;
};


/** @override */
PredefinedEffect.prototype.onAnimate = function() {
  this.updateStyle();
  PredefinedEffect.superClass_.onAnimate.call(this);
};


/** @override */
PredefinedEffect.prototype.onEnd = function() {
  this.updateStyle();
  PredefinedEffect.superClass_.onEnd.call(this);
};


/** @override */
PredefinedEffect.prototype.onBegin = function() {
  this.updateStyle();
  PredefinedEffect.superClass_.onBegin.call(this);
};



/**
 * Creates an animation object that will slide an element from A to B.  (This
 * in effect automatically sets up the onanimate event for an Animation object)
 *
 * Start and End should be 2 dimensional arrays
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {Array<number>} start 2D array for start coordinates (X, Y).
 * @param {Array<number>} end 2D array for end coordinates (X, Y).
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {PredefinedEffect}
 * @constructor
 * @struct
 */
export function Slide(element, start, end, time, opt_acc) {
  if (start.length != 2 || end.length != 2) {
    throw new Error('Start and end points must be 2D');
  }
  Slide.base(
      this, 'constructor', element, start, end, time, opt_acc);
}
goog.inherits(Slide, PredefinedEffect);


/** @override */
Slide.prototype.updateStyle = function() {
  var pos = (this.isRightPositioningForRtlEnabled() && this.isRightToLeft()) ?
      'right' :
      'left';
  this.element.style[pos] = Math.round(this.coords[0]) + 'px';
  this.element.style.top = Math.round(this.coords[1]) + 'px';
};



/**
 * Slides an element from its current position.
 *
 * @param {Element} element DOM node to be used in the animation.
 * @param {Array<number>} end 2D array for end coordinates (X, Y).
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {Slide}
 * @constructor
 * @struct
 */
export function SlideFrom(element, end, time, opt_acc) {
  var offsetLeft = /** @type {!HTMLElement} */ (element).offsetLeft;
  var start = [offsetLeft, /** @type {!HTMLElement} */ (element).offsetTop];
  SlideFrom.base(
      this, 'constructor', element, start, end, time, opt_acc);
  /** @type {?Array<number>} */
  this.startPoint;
}
goog.inherits(SlideFrom, Slide);


/** @override */
SlideFrom.prototype.onBegin = function() {
  var offsetLeft = this.isRightPositioningForRtlEnabled() ?
      bidi.getOffsetStart(this.element) :
      /** @type {!HTMLElement} */ (this.element).offsetLeft;
  this.startPoint = [
    offsetLeft,
    /** @type {!HTMLElement} */ (this.element).offsetTop
  ];
  SlideFrom.superClass_.onBegin.call(this);
};



/**
 * Creates an animation object that will slide an element into its final size.
 * Requires that the element is absolutely positioned.
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {Array<number>} start 2D array for start size (W, H).
 * @param {Array<number>} end 2D array for end size (W, H).
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {PredefinedEffect}
 * @constructor
 * @struct
 */
export function Swipe(element, start, end, time, opt_acc) {
  if (start.length != 2 || end.length != 2) {
    throw new Error('Start and end points must be 2D');
  }
  Swipe.base(
      this, 'constructor', element, start, end, time, opt_acc);

  /**
   * Maximum width for element.
   * @type {number}
   * @private
   */
  this.maxWidth_ = Math.max(this.endPoint[0], this.startPoint[0]);

  /**
   * Maximum height for element.
   * @type {number}
   * @private
   */
  this.maxHeight_ = Math.max(this.endPoint[1], this.startPoint[1]);
}
goog.inherits(Swipe, PredefinedEffect);


/**
 * Animation event handler that will resize an element by setting its width,
 * height and clipping.
 * @protected
 * @override
 */
Swipe.prototype.updateStyle = function() {
  var x = this.coords[0];
  var y = this.coords[1];
  this.clip_(Math.round(x), Math.round(y), this.maxWidth_, this.maxHeight_);
  this.element.style.width = Math.round(x) + 'px';
  var marginX =
      (this.isRightPositioningForRtlEnabled() && this.isRightToLeft()) ?
      'marginRight' :
      'marginLeft';

  this.element.style[marginX] = Math.round(x) - this.maxWidth_ + 'px';
  this.element.style.marginTop = Math.round(y) - this.maxHeight_ + 'px';
};


/**
 * Helper function for setting element clipping.
 * @param {number} x Current element width.
 * @param {number} y Current element height.
 * @param {number} w Maximum element width.
 * @param {number} h Maximum element height.
 * @private
 */
Swipe.prototype.clip_ = function(x, y, w, h) {
  this.element.style.clip =
      'rect(' + (h - y) + 'px ' + w + 'px ' + h + 'px ' + (w - x) + 'px)';
};



/**
 * Creates an animation object that will scroll an element from A to B.
 *
 * Start and End should be 2 dimensional arrays
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {Array<number>} start 2D array for start scroll left and top.
 * @param {Array<number>} end 2D array for end scroll left and top.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {PredefinedEffect}
 * @constructor
 * @struct
 */
export function Scroll(element, start, end, time, opt_acc) {
  if (start.length != 2 || end.length != 2) {
    throw new Error('Start and end points must be 2D');
  }
  Scroll.base(
      this, 'constructor', element, start, end, time, opt_acc);
}
goog.inherits(Scroll, PredefinedEffect);


/**
 * Animation event handler that will set the scroll position of an element.
 * @protected
 * @override
 */
Scroll.prototype.updateStyle = function() {
  if (this.isRightPositioningForRtlEnabled()) {
    bidi.setScrollOffset(this.element, Math.round(this.coords[0]));
  } else {
    this.element.scrollLeft = Math.round(this.coords[0]);
  }
  this.element.scrollTop = Math.round(this.coords[1]);
};



/**
 * Creates an animation object that will resize an element between two widths
 * and heights.
 *
 * Start and End should be 2 dimensional arrays
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {Array<number>} start 2D array for start width and height.
 * @param {Array<number>} end 2D array for end width and height.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {PredefinedEffect}
 * @constructor
 * @struct
 */
export function Resize(element, start, end, time, opt_acc) {
  if (start.length != 2 || end.length != 2) {
    throw new Error('Start and end points must be 2D');
  }
  Resize.base(
      this, 'constructor', element, start, end, time, opt_acc);
}
goog.inherits(Resize, PredefinedEffect);


/**
 * Animation event handler that will resize an element by setting its width and
 * height.
 * @protected
 * @override
 */
Resize.prototype.updateStyle = function() {
  this.element.style.width = Math.round(this.coords[0]) + 'px';
  this.element.style.height = Math.round(this.coords[1]) + 'px';
};



/**
 * Creates an animation object that will resize an element between two widths
 *
 * Start and End should be numbers
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {number} start Start width.
 * @param {number} end End width.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {PredefinedEffect}
 * @constructor
 * @struct
 */
export function ResizeWidth(element, start, end, time, opt_acc) {
  ResizeWidth.base(
      this, 'constructor', element, [start], [end], time, opt_acc);
}
goog.inherits(ResizeWidth, PredefinedEffect);


/**
 * Animation event handler that will resize an element by setting its width.
 * @protected
 * @override
 */
ResizeWidth.prototype.updateStyle = function() {
  this.element.style.width = Math.round(this.coords[0]) + 'px';
};



/**
 * Creates an animation object that will resize an element between two heights
 *
 * Start and End should be numbers
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {number} start Start height.
 * @param {number} end End height.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {PredefinedEffect}
 * @constructor
 * @struct
 */
export function ResizeHeight(element, start, end, time, opt_acc) {
  ResizeHeight.base(
      this, 'constructor', element, [start], [end], time, opt_acc);
}
goog.inherits(ResizeHeight, PredefinedEffect);


/**
 * Animation event handler that will resize an element by setting its height.
 * @protected
 * @override
 */
ResizeHeight.prototype.updateStyle = function() {
  this.element.style.height = Math.round(this.coords[0]) + 'px';
};



/**
 * Creates an animation object that fades the opacity of an element between two
 * limits.
 *
 * Start and End should be floats between 0 and 1
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {Array<number>|number} start 1D Array or Number with start opacity.
 * @param {Array<number>|number} end 1D Array or Number for end opacity.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {PredefinedEffect}
 * @constructor
 * @struct
 */
export function Fade(element, start, end, time, opt_acc) {
  if (typeof start === 'number') start = [start];
  if (typeof end === 'number') end = [end];

  Fade.base(
      this, 'constructor', element, start, end, time, opt_acc);

  if (start.length != 1 || end.length != 1) {
    throw new Error('Start and end points must be 1D');
  }

  /**
   * The last opacity we set, or -1 for not set.
   * @private {number}
   */
  this.lastOpacityUpdate_ = Fade.OPACITY_UNSET_;
}
goog.inherits(Fade, PredefinedEffect);


/**
 * The quantization of opacity values to use.
 * @private {number}
 */
Fade.TOLERANCE_ = 1.0 / 0x400;  // 10-bit color


/**
 * Value indicating that the opacity must be set on next update.
 * @private {number}
 */
Fade.OPACITY_UNSET_ = -1;


/**
 * Animation event handler that will set the opacity of an element.
 * @protected
 * @override
 */
Fade.prototype.updateStyle = function() {
  var opacity = this.coords[0];
  var delta = Math.abs(opacity - this.lastOpacityUpdate_);
  // In order to keep eager browsers from over-rendering, only update
  // on a potentially visible change in opacity.
  if (delta >= Fade.TOLERANCE_) {
    style.setOpacity(this.element, opacity);
    this.lastOpacityUpdate_ = opacity;
  }
};


/** @override */
Fade.prototype.onBegin = function() {
  this.lastOpacityUpdate_ = Fade.OPACITY_UNSET_;
  Fade.base(this, 'onBegin');
};


/** @override */
Fade.prototype.onEnd = function() {
  this.lastOpacityUpdate_ = Fade.OPACITY_UNSET_;
  Fade.base(this, 'onEnd');
};


/**
 * Animation event handler that will show the element.
 */
Fade.prototype.show = function() {
  this.element.style.display = '';
};


/**
 * Animation event handler that will hide the element
 */
Fade.prototype.hide = function() {
  this.element.style.display = 'none';
};



/**
 * Fades an element out from full opacity to completely transparent.
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {Fade}
 * @constructor
 * @struct
 */
export function FadeOut(element, time, opt_acc) {
  FadeOut.base(this, 'constructor', element, 1, 0, time, opt_acc);
}
goog.inherits(FadeOut, Fade);



/**
 * Fades an element in from completely transparent to fully opacity.
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {Fade}
 * @constructor
 * @struct
 */
export function FadeIn(element, time, opt_acc) {
  FadeIn.base(this, 'constructor', element, 0, 1, time, opt_acc);
}
goog.inherits(FadeIn, Fade);



/**
 * Fades an element out from full opacity to completely transparent and then
 * sets the display to 'none'
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {Fade}
 * @constructor
 * @struct
 */
export function FadeOutAndHide(element, time, opt_acc) {
  FadeOutAndHide.base(
      this, 'constructor', element, 1, 0, time, opt_acc);
}
goog.inherits(FadeOutAndHide, Fade);


/** @override */
FadeOutAndHide.prototype.onBegin = function() {
  this.show();
  FadeOutAndHide.superClass_.onBegin.call(this);
};


/** @override */
FadeOutAndHide.prototype.onEnd = function() {
  this.hide();
  FadeOutAndHide.superClass_.onEnd.call(this);
};



/**
 * Sets an element's display to be visible and then fades an element in from
 * completely transparent to fully opaque.
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {Fade}
 * @constructor
 * @struct
 */
export function FadeInAndShow(element, time, opt_acc) {
  FadeInAndShow.base(
      this, 'constructor', element, 0, 1, time, opt_acc);
}
goog.inherits(FadeInAndShow, Fade);


/** @override */
FadeInAndShow.prototype.onBegin = function() {
  this.show();
  FadeInAndShow.superClass_.onBegin.call(this);
};



/**
 * Provides a transformation of an elements background-color.
 *
 * Start and End should be 3D arrays representing R,G,B
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {Array<number>} start 3D Array for RGB of start color.
 * @param {Array<number>} end 3D Array for RGB of end color.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {PredefinedEffect}
 * @constructor
 * @struct
 */
export function BgColorTransform(element, start, end, time, opt_acc) {
  if (start.length != 3 || end.length != 3) {
    throw new Error('Start and end points must be 3D');
  }
  BgColorTransform.base(
      this, 'constructor', element, start, end, time, opt_acc);
}
goog.inherits(BgColorTransform, PredefinedEffect);


/**
 * Animation event handler that will set the background-color of an element
 */
BgColorTransform.prototype.setColor = function() {
  var coordsAsInts = [];
  for (var i = 0; i < this.coords.length; i++) {
    coordsAsInts[i] = Math.round(this.coords[i]);
  }
  var color = 'rgb(' + coordsAsInts.join(',') + ')';
  this.element.style.backgroundColor = color;
};


/** @override */
BgColorTransform.prototype.updateStyle = function() {
  this.setColor();
};


/**
 * Fade elements background color from start color to the element's current
 * background color.
 *
 * Start should be a 3D array representing R,G,B
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {Array<number>} start 3D Array for RGB of start color.
 * @param {number} time Length of animation in milliseconds.
 * @param {EventHandler=} opt_eventHandler Optional event handler
 *     to use when listening for events.
 */
export function bgColorFadeIn(element, start, time, opt_eventHandler) {
  var initialBgColor = element.style.backgroundColor || '';
  var computedBgColor = style.getBackgroundColor(element);
  var end;

  if (computedBgColor && computedBgColor != 'transparent' &&
      computedBgColor != 'rgba(0, 0, 0, 0)') {
    end = googColor.hexToRgb(googColor.parse(computedBgColor).hex);
  } else {
    end = [255, 255, 255];
  }

  var anim = new BgColorTransform(element, start, end, time);

  function setBgColor() {
    element.style.backgroundColor = initialBgColor;
  }

  if (opt_eventHandler) {
    opt_eventHandler.listen(anim, Transition.EventType.END, setBgColor);
  } else {
    events.listen(anim, Transition.EventType.END, setBgColor);
  }

  anim.play();
}



/**
 * Provides a transformation of an elements color.
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {Array<number>} start 3D Array representing R,G,B.
 * @param {Array<number>} end 3D Array representing R,G,B.
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @constructor
 * @struct
 * @extends {PredefinedEffect}
 */
export function ColorTransform(element, start, end, time, opt_acc) {
  if (start.length != 3 || end.length != 3) {
    throw new Error('Start and end points must be 3D');
  }
  ColorTransform.base(
      this, 'constructor', element, start, end, time, opt_acc);
}
goog.inherits(ColorTransform, PredefinedEffect);


/**
 * Animation event handler that will set the color of an element.
 * @protected
 * @override
 */
ColorTransform.prototype.updateStyle = function() {
  var coordsAsInts = [];
  for (var i = 0; i < this.coords.length; i++) {
    coordsAsInts[i] = Math.round(this.coords[i]);
  }
  var color = 'rgb(' + coordsAsInts.join(',') + ')';
  this.element.style.color = color;
};
