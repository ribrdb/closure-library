/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Base class for container renderers.
 */

goog.declareModuleId('goog.ui.containerrenderer');

import * as aria from '../a11y/aria/aria.js';
import * as asserts from '../asserts/asserts.js';
import { NodeType } from '../dom/nodetype.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import * as googString from '../string/string.js';
import * as style from '../style/style.js';
import * as registry from './registry.js';
import * as userAgent from '../useragent/useragent.js';
import { Container } from './container.js';
const { Control } = goog.requireType('goog.ui.control');



/**
 * Default renderer for {@link Container}.  Can be used as-is, but
 * subclasses of Container will probably want to use renderers specifically
 * tailored for them by extending this class.
 * @param {string=} opt_ariaRole Optional ARIA role used for the element.
 * @constructor
 */
export function ContainerRenderer(opt_ariaRole) {
  // By default, the ARIA role is unspecified.
  /** @private {string|undefined} */
  this.ariaRole_ = opt_ariaRole;
}
goog.addSingletonGetter(ContainerRenderer);


/**
 * Constructs a new renderer and sets the CSS class that the renderer will use
 * as the base CSS class to apply to all elements rendered by that renderer.
 * An example to use this function using a menu is:
 *
 * <pre>
 * var myCustomRenderer = ContainerRenderer.getCustomRenderer(
 *     goog.ui.MenuRenderer, 'my-special-menu');
 * var newMenu = new goog.ui.Menu(opt_domHelper, myCustomRenderer);
 * </pre>
 *
 * Your styles for the menu can now be:
 * <pre>
 * .my-special-menu { }
 * </pre>
 *
 * <em>instead</em> of
 * <pre>
 * .CSS_MY_SPECIAL_MENU .goog-menu { }
 * </pre>
 *
 * You would want to use this functionality when you want an instance of a
 * component to have specific styles different than the other components of the
 * same type in your application.  This avoids using descendant selectors to
 * apply the specific styles to this component.
 *
 * @param {Function} ctor The constructor of the renderer you want to create.
 * @param {string} cssClassName The name of the CSS class for this renderer.
 * @return {ContainerRenderer} An instance of the desired renderer with
 *     its getCssClass() method overridden to return the supplied custom CSS
 *     class name.
 */
ContainerRenderer.getCustomRenderer = function(ctor, cssClassName) {
  var renderer = new ctor();

  /**
   * Returns the CSS class to be applied to the root element of components
   * rendered using this renderer.
   * @return {string} Renderer-specific CSS class.
   */
  renderer.getCssClass = function() {
    return cssClassName;
  };

  return renderer;
};


/**
 * Default CSS class to be applied to the root element of containers rendered
 * by this renderer.
 * @type {string}
 */
ContainerRenderer.CSS_CLASS = goog.getCssName('goog-container');


/**
 * Returns the ARIA role to be applied to the container.
 * See http://wiki/Main/ARIA for more info.
 * @return {undefined|string} ARIA role.
 */
ContainerRenderer.prototype.getAriaRole = function() {
  return this.ariaRole_;
};


/**
 * Enables or disables the tab index of the element.  Only elements with a
 * valid tab index can receive focus.
 * @param {Element} element Element whose tab index is to be changed.
 * @param {boolean} enable Whether to add or remove the element's tab index.
 * @suppress {strictMissingProperties}
 */
ContainerRenderer.prototype.enableTabIndex = function(element, enable) {
  if (element) {
    element.tabIndex = enable ? 0 : -1;
  }
};


/**
 * Creates and returns the container's root element.  The default
 * simply creates a DIV and applies the renderer's own CSS class name to it.
 * To be overridden in subclasses.
 * @param {Container} container Container to render.
 * @return {Element} Root element for the container.
 */
ContainerRenderer.prototype.createDom = function(container) {
  return container.getDomHelper().createDom(
      TagName.DIV, this.getClassNames(container).join(' '));
};


/**
 * Returns the DOM element into which child components are to be rendered,
 * or null if the container hasn't been rendered yet.
 * @param {Element} element Root element of the container whose content element
 *     is to be returned.
 * @return {Element} Element to contain child elements (null if none).
 */
ContainerRenderer.prototype.getContentElement = function(element) {
  return element;
};


/**
 * Default implementation of `canDecorate`; returns true if the element
 * is a DIV, false otherwise.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 */
ContainerRenderer.prototype.canDecorate = function(element) {
  return element.tagName == 'DIV';
};


/**
 * Default implementation of `decorate` for {@link Container}s.
 * Decorates the element with the container, and attempts to decorate its child
 * elements.  Returns the decorated element.
 * @param {Container} container Container to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {!Element} Decorated element.
 */
ContainerRenderer.prototype.decorate = function(container, element) {
  // Set the container's ID to the decorated element's DOM ID, if any.
  if (element.id) {
    container.setId(element.id);
  }

  // Configure the container's state based on the CSS class names it has.
  var baseClass = this.getCssClass();
  var hasBaseClass = false;
  var classNames = classlist.get(element);
  if (classNames) {
    Array.prototype.forEach.call(classNames, function(className) {
      if (className == baseClass) {
        hasBaseClass = true;
      } else {
        if (className) {
          this.setStateFromClassName(container, className, baseClass);
        }
      }
    }, this);
  }

  if (!hasBaseClass) {
    // Make sure the container's root element has the renderer's own CSS class.
    classlist.add(element, baseClass);
  }

  // Decorate the element's children, if applicable.  This should happen after
  // the container's own state has been initialized, since how children are
  // decorated may depend on the state of the container.
  this.decorateChildren(container, this.getContentElement(element));

  return element;
};


/**
 * Sets the container's state based on the given CSS class name, encountered
 * during decoration.  CSS class names that don't represent container states
 * are ignored.  Considered protected; subclasses should override this method
 * to support more states and CSS class names.
 * @param {Container} container Container to update.
 * @param {string} className CSS class name.
 * @param {string} baseClass Base class name used as the root of state-specific
 *     class names (typically the renderer's own class name).
 * @protected
 * @suppress {missingRequire} Container
 */
ContainerRenderer.prototype.setStateFromClassName = function(
    container, className, baseClass) {
  if (className == goog.getCssName(baseClass, 'disabled')) {
    container.setEnabled(false);
  } else if (className == goog.getCssName(baseClass, 'horizontal')) {
    container.setOrientation(Container.Orientation.HORIZONTAL);
  } else if (className == goog.getCssName(baseClass, 'vertical')) {
    container.setOrientation(Container.Orientation.VERTICAL);
  }
};


/**
 * Takes a container and an element that may contain child elements, decorates
 * the child elements, and adds the corresponding components to the container
 * as child components.  Any non-element child nodes (e.g. empty text nodes
 * introduced by line breaks in the HTML source) are removed from the element.
 * @param {Container} container Container whose children are to be
 *     discovered.
 * @param {Element} element Element whose children are to be decorated.
 * @param {Element=} opt_firstChild the first child to be decorated.
 */
ContainerRenderer.prototype.decorateChildren = function(
    container, element, opt_firstChild) {
  if (element) {
    var node = opt_firstChild || element.firstChild, next;
    // Tag soup HTML may result in a DOM where siblings have different parents.
    while (node && node.parentNode == element) {
      // Get the next sibling here, since the node may be replaced or removed.
      next = node.nextSibling;
      if (node.nodeType == NodeType.ELEMENT) {
        // Decorate element node.
        var child = this.getDecoratorForChild(/** @type {!Element} */ (node));
        if (child) {
          // addChild() may need to look at the element.
          child.setElementInternal(/** @type {!Element} */ (node));
          // If the container is disabled, mark the child disabled too.  See
          // bug 1263729.  Note that this must precede the call to addChild().
          if (!container.isEnabled()) {
            child.setEnabled(false);
          }
          container.addChild(child);
          child.decorate(/** @type {!Element} */ (node));
        }
      } else if (!node.nodeValue || googString.trim(node.nodeValue) == '') {
        // Remove empty text node, otherwise madness ensues (e.g. controls that
        // use goog-inline-block will flicker and shift on hover on Gecko).
        element.removeChild(node);
      }
      node = next;
    }
  }
};


/**
 * Inspects the element, and creates an instance of {@link goog.ui.Control} or
 * an appropriate subclass best suited to decorate it.  Returns the control (or
 * null if no suitable class was found).  This default implementation uses the
 * element's CSS class to find the appropriate control class to instantiate.
 * May be overridden in subclasses.
 * @param {Element} element Element to decorate.
 * @return {Control?} A new control suitable to decorate the element
 *     (null if none).
 */
ContainerRenderer.prototype.getDecoratorForChild = function(element) {
  return /** @type {Control} */ (registry.getDecorator(element));
};


/**
 * Initializes the container's DOM when the container enters the document.
 * Called from {@link Container#enterDocument}.
 * @param {Container} container Container whose DOM is to be initialized
 *     as it enters the document.
 */
ContainerRenderer.prototype.initializeDom = function(container) {
  var elem = container.getElement();
  asserts.assert(elem, 'The container DOM element cannot be null.');
  // Make sure the container's element isn't selectable.  On Gecko, recursively
  // marking each child element unselectable is expensive and unnecessary, so
  // only mark the root element unselectable.
  style.setUnselectable(elem, true, userAgent.GECKO);

  // IE doesn't support outline:none, so we have to use the hideFocus property.
  if (userAgent.IE) {
    elem.hideFocus = true;
  }

  // Set the ARIA role.
  var ariaRole = this.getAriaRole();
  if (ariaRole) {
    aria.setRole(elem, ariaRole);
  }
};


/**
 * Returns the element within the container's DOM that should receive keyboard
 * focus (null if none).  The default implementation returns the container's
 * root element.
 * @param {Container} container Container whose key event target is
 *     to be returned.
 * @return {Element} Key event target (null if none).
 */
ContainerRenderer.prototype.getKeyEventTarget = function(container) {
  return container.getElement();
};


/**
 * Returns the CSS class to be applied to the root element of containers
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 */
ContainerRenderer.prototype.getCssClass = function() {
  return ContainerRenderer.CSS_CLASS;
};


/**
 * Returns all CSS class names applicable to the given container, based on its
 * state.  The array of class names returned includes the renderer's own CSS
 * class, followed by a CSS class indicating the container's orientation,
 * followed by any state-specific CSS classes.
 * @param {Container} container Container whose CSS classes are to be
 *     returned.
 * @return {!Array<string>} Array of CSS class names applicable to the
 *     container.
 * @suppress {missingRequire} TODO(user): fix this
 */
ContainerRenderer.prototype.getClassNames = function(container) {
  var baseClass = this.getCssClass();
  var isHorizontal =
      container.getOrientation() == Container.Orientation.HORIZONTAL;
  var classNames = [
    baseClass, (isHorizontal ? goog.getCssName(baseClass, 'horizontal') :
                               goog.getCssName(baseClass, 'vertical'))
  ];
  if (!container.isEnabled()) {
    classNames.push(goog.getCssName(baseClass, 'disabled'));
  }
  return classNames;
};


/**
 * Returns the default orientation of containers rendered or decorated by this
 * renderer.  The base class implementation returns `VERTICAL`.
 * @return {Container.Orientation} Default orientation for containers
 *     created or decorated by this renderer.
 * @suppress {missingRequire} Container
 */
ContainerRenderer.prototype.getDefaultOrientation = function() {
  return Container.Orientation.VERTICAL;
};
