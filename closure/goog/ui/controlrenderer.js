/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Base class for control renderers.
 * TODO(attila):  If the renderer framework works well, pull it into Component.
 */

goog.declareModuleId('goog.ui.controlrenderer');

import * as aria from '../a11y/aria/aria.js';
import { Role } from '../a11y/aria/roles.js';
import { State } from '../a11y/aria/attributes.js';
import * as array from '../array/array.js';
import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import object from '../object/object.js';
import * as googString from '../string/string.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
import { ControlContent } from './controlcontent.js';
import * as userAgent from '../useragent/useragent.js';  // circular
const {Control} = goog.requireType('goog.ui.control');



/**
 * Default renderer for {@link goog.ui.Control}s.  Can be used as-is, but
 * subclasses of Control will probably want to use renderers specifically
 * tailored for them by extending this class.  Controls that use renderers
 * delegate one or more of the following API methods to the renderer:
 * <ul>
 *    <li>`createDom` - renders the DOM for the component
 *    <li>`canDecorate` - determines whether an element can be decorated
 *        by the component
 *    <li>`decorate` - decorates an existing element with the component
 *    <li>`setState` - updates the appearance of the component based on
 *        its state
 *    <li>`getContent` - returns the component's content
 *    <li>`setContent` - sets the component's content
 * </ul>
 * Controls are stateful; renderers, on the other hand, should be stateless and
 * reusable.
 * @constructor
 */
export function ControlRenderer() {}
goog.addSingletonGetter(ControlRenderer);


/**
 * Constructs a new renderer and sets the CSS class that the renderer will use
 * as the base CSS class to apply to all elements rendered by that renderer.
 * An example to use this function using a color palette:
 *
 * <pre>
 * var myCustomRenderer = ControlRenderer.getCustomRenderer(
 *     goog.ui.PaletteRenderer, 'my-special-palette');
 * var newColorPalette = new goog.ui.ColorPalette(
 *     colors, myCustomRenderer, opt_domHelper);
 * </pre>
 *
 * Your CSS can look like this now:
 * <pre>
 * .my-special-palette { }
 * .my-special-palette-table { }
 * .my-special-palette-cell { }
 * etc.
 * </pre>
 *
 * <em>instead</em> of
 * <pre>
 * .CSS_MY_SPECIAL_PALETTE .goog-palette { }
 * .CSS_MY_SPECIAL_PALETTE .goog-palette-table { }
 * .CSS_MY_SPECIAL_PALETTE .goog-palette-cell { }
 * etc.
 * </pre>
 *
 * You would want to use this functionality when you want an instance of a
 * component to have specific styles different than the other components of the
 * same type in your application.  This avoids using descendant selectors to
 * apply the specific styles to this component.
 *
 * @param {Function} ctor The constructor of the renderer you are trying to
 *     create.
 * @param {string} cssClassName The name of the CSS class for this renderer.
 * @return {ControlRenderer} An instance of the desired renderer with
 *     its getCssClass() method overridden to return the supplied custom CSS
 *     class name.
 */
ControlRenderer.getCustomRenderer = function(ctor, cssClassName) {
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
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
ControlRenderer.CSS_CLASS = goog.getCssName('goog-control');


/**
 * Array of arrays of CSS classes that we want composite classes added and
 * removed for in IE6 and lower as a workaround for lack of multi-class CSS
 * selector support.
 *
 * Subclasses that have accompanying CSS requiring this workaround should define
 * their own static IE6_CLASS_COMBINATIONS constant and override
 * getIe6ClassCombinations to return it.
 *
 * For example, if your stylesheet uses the selector .button.collapse-left
 * (and is compiled to .button_collapse-left for the IE6 version of the
 * stylesheet,) you should include ['button', 'collapse-left'] in this array
 * and the class button_collapse-left will be applied to the root element
 * whenever both button and collapse-left are applied individually.
 *
 * Members of each class name combination will be joined with underscores in the
 * order that they're defined in the array. You should alphabetize them (for
 * compatibility with the CSS compiler) unless you are doing something special.
 * @type {Array<Array<string>>}
 */
ControlRenderer.IE6_CLASS_COMBINATIONS = [];


/**
 * Map of component states to corresponding ARIA attributes.  Since the mapping
 * of component states to ARIA attributes is neither component- nor
 * renderer-specific, this is a static property of the renderer class, and is
 * initialized on first use.
 * @type {Object<Component.State, State>}
 * @private
 */
ControlRenderer.ariaAttributeMap_;


/**
 * Map of certain ARIA states to ARIA roles that support them. Used for checked
 * and selected Component states because they are used on Components with ARIA
 * roles that do not support the corresponding ARIA state.
 * @private {!Object<Role, State>}
 * @const
 */
ControlRenderer.TOGGLE_ARIA_STATE_MAP_ = object.create(
    Role.BUTTON, State.PRESSED,
    Role.CHECKBOX, State.CHECKED,
    Role.MENU_ITEM, State.SELECTED,
    Role.MENU_ITEM_CHECKBOX, State.CHECKED,
    Role.MENU_ITEM_RADIO, State.CHECKED,
    Role.RADIO, State.CHECKED,
    Role.TAB, State.SELECTED,
    Role.TREEITEM, State.SELECTED);


/**
 * Returns the ARIA role to be applied to the control.
 * See http://wiki/Main/ARIA for more info.
 * @return {Role|undefined} ARIA role.
 */
ControlRenderer.prototype.getAriaRole = function() {
  // By default, the ARIA role is unspecified.
  return undefined;
};


/**
 * Returns the control's contents wrapped in a DIV, with the renderer's own
 * CSS class and additional state-specific classes applied to it.
 * @param {Control} control Control to render.
 * @return {Element} Root element for the control.
 */
ControlRenderer.prototype.createDom = function(control) {
  // Create and return DIV wrapping contents.
  var element = control.getDomHelper().createDom(
      TagName.DIV, this.getClassNames(control).join(' '),
      control.getContent());

  return element;
};


/**
 * Takes the control's root element and returns the parent element of the
 * control's contents.  Since by default controls are rendered as a single
 * DIV, the default implementation returns the element itself.  Subclasses
 * with more complex DOM structures must override this method as needed.
 * @param {Element} element Root element of the control whose content element
 *     is to be returned.
 * @return {Element} The control's content element.
 */
ControlRenderer.prototype.getContentElement = function(element) {
  return element;
};


/**
 * Updates the control's DOM by adding or removing the specified class name
 * to/from its root element. May add additional combined classes as needed in
 * IE6 and lower. Because of this, subclasses should use this method when
 * modifying class names on the control's root element.
 * @param {Control|Element} control Control instance (or root element)
 *     to be updated.
 * @param {string} className CSS class name to add or remove.
 * @param {boolean} enable Whether to add or remove the class name.
 */
ControlRenderer.prototype.enableClassName = function(
    control, className, enable) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var element = /** @type {Element} */ (
      control.getElement ? control.getElement() : control);
  if (element) {
    var classNames = [className];

    classlist.enableAll(element, classNames, enable);
  }
};


/**
 * Updates the control's DOM by adding or removing the specified extra class
 * name to/from its element.
 * @param {Control} control Control to be updated.
 * @param {string} className CSS class name to add or remove.
 * @param {boolean} enable Whether to add or remove the class name.
 */
ControlRenderer.prototype.enableExtraClassName = function(
    control, className, enable) {
  // The base class implementation is trivial; subclasses should override as
  // needed.
  this.enableClassName(control, className, enable);
};


/**
 * Returns true if this renderer can decorate the element, false otherwise.
 * The default implementation always returns true.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 */
ControlRenderer.prototype.canDecorate = function(element) {
  return true;
};


/**
 * Default implementation of `decorate` for {@link Control}s.
 * Initializes the control's ID, content, and state based on the ID of the
 * element, its child nodes, and its CSS classes, respectively.  Returns the
 * element.
 * @param {Control} control Control instance to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 */
ControlRenderer.prototype.decorate = function(control, element) {
  // Set the control's ID to the decorated element's DOM ID, if any.
  if (element.id) {
    control.setId(element.id);
  }

  // Set the control's content to the decorated element's content.
  var contentElem = this.getContentElement(element);
  if (contentElem && contentElem.firstChild) {
    control.setContentInternal(
        contentElem.firstChild.nextSibling ?
            array.clone(contentElem.childNodes) :
            contentElem.firstChild);
  } else {
    control.setContentInternal(null);
  }

  // Initialize the control's state based on the decorated element's CSS class.
  // This implementation is optimized to minimize object allocations, string
  // comparisons, and DOM access.
  var state = 0x00;
  var rendererClassName = this.getCssClass();
  var structuralClassName = this.getStructuralCssClass();
  var hasRendererClassName = false;
  var hasStructuralClassName = false;
  var hasCombinedClassName = false;
  var classNames = array.toArray(classlist.get(element));
  classNames.forEach(function(className) {
    if (!hasRendererClassName && className == rendererClassName) {
      hasRendererClassName = true;
      if (structuralClassName == rendererClassName) {
        hasStructuralClassName = true;
      }
    } else if (!hasStructuralClassName && className == structuralClassName) {
      hasStructuralClassName = true;
    } else {
      state |= this.getStateFromClass(className);
    }
    if (this.getStateFromClass(className) == Component.State.DISABLED) {
      asserts.assertElement(contentElem);
      if (dom.isFocusableTabIndex(contentElem)) {
        dom.setFocusableTabIndex(contentElem, false);
      }
    }
  }, this);
  control.setStateInternal(state);

  // Make sure the element has the renderer's CSS classes applied, as well as
  // any extra class names set on the control.
  if (!hasRendererClassName) {
    classNames.push(rendererClassName);
    if (structuralClassName == rendererClassName) {
      hasStructuralClassName = true;
    }
  }
  if (!hasStructuralClassName) {
    classNames.push(structuralClassName);
  }
  var extraClassNames = control.getExtraClassNames();
  if (extraClassNames) {
    classNames.push.apply(classNames, extraClassNames);
  }

  // Only write to the DOM if new class names had to be added to the element.
  if (!hasRendererClassName || !hasStructuralClassName || extraClassNames ||
      hasCombinedClassName) {
    classlist.set(element, classNames.join(' '));
  }

  return element;
};


/**
 * Initializes the control's DOM by configuring properties that can only be set
 * after the DOM has entered the document.  This implementation sets up BiDi
 * and keyboard focus.  Called from {@link Control#enterDocument}.
 * @param {Control} control Control whose DOM is to be initialized
 *     as it enters the document.
 */
ControlRenderer.prototype.initializeDom = function(control) {
  // Initialize render direction (BiDi).  We optimize the left-to-right render
  // direction by assuming that elements are left-to-right by default, and only
  // updating their styling if they are explicitly set to right-to-left.
  if (control.isRightToLeft()) {
    this.setRightToLeft(control.getElement(), true);
  }

  // Initialize keyboard focusability (tab index).  We assume that components
  // aren't focusable by default (i.e have no tab index), and only touch the
  // DOM if the component is focusable, enabled, and visible, and therefore
  // needs a tab index.
  if (control.isEnabled()) {
    this.setFocusable(control, control.isVisible());
  }
};


/**
 * Sets the element's ARIA role.
 * @param {Element} element Element to update.
 * @param {?Role=} opt_preferredRole The preferred ARIA role.
 */
ControlRenderer.prototype.setAriaRole = function(
    element, opt_preferredRole) {
  var ariaRole = opt_preferredRole || this.getAriaRole();
  if (ariaRole) {
    asserts.assert(
        element, 'The element passed as a first parameter cannot be null.');
    var currentRole = aria.getRole(element);
    if (ariaRole == currentRole) {
      return;
    }
    aria.setRole(element, ariaRole);
  }
};


/**
 * Sets the element's ARIA attributes, including distinguishing between
 * universally supported ARIA properties and ARIA states that are only
 * supported by certain ARIA roles. Only attributes which are initialized to be
 * true will be set.
 * @param {!Control} control Control whose ARIA state will be updated.
 * @param {!Element} element Element whose ARIA state is to be updated.
 */
ControlRenderer.prototype.setAriaStates = function(control, element) {
  asserts.assert(control);
  asserts.assert(element);

  var ariaLabel = control.getAriaLabel();
  if (ariaLabel != null) {
    this.setAriaLabel(element, ariaLabel);
  }

  if (!control.isVisible()) {
    aria.setState(
        element, State.HIDDEN, !control.isVisible());
  }
  if (!control.isEnabled()) {
    this.updateAriaState(
        element, Component.State.DISABLED, !control.isEnabled());
  }
  if (control.isSupportedState(Component.State.SELECTED)) {
    this.updateAriaState(
        element, Component.State.SELECTED, control.isSelected());
  }
  if (control.isSupportedState(Component.State.CHECKED)) {
    this.updateAriaState(
        element, Component.State.CHECKED, control.isChecked());
  }
  if (control.isSupportedState(Component.State.OPENED)) {
    this.updateAriaState(
        element, Component.State.OPENED, control.isOpen());
  }
};


/**
 * Sets the element's ARIA label. This should be overriden by subclasses that
 * don't apply the role directly on control.element_.
 * @param {!Element} element Element whose ARIA label is to be updated.
 * @param {string} ariaLabel Label to add to the element.
 */
ControlRenderer.prototype.setAriaLabel = function(element, ariaLabel) {
  aria.setLabel(element, ariaLabel);
};


/**
 * Allows or disallows text selection within the control's DOM.
 * @param {Element} element The control's root element.
 * @param {boolean} allow Whether the element should allow text selection.
 */
ControlRenderer.prototype.setAllowTextSelection = function(
    element, allow) {
  // On all browsers other than IE and Opera, it isn't necessary to recursively
  // apply unselectable styling to the element's children.
  style.setUnselectable(element, !allow, !userAgent.IE);
};


/**
 * Applies special styling to/from the control's element if it is rendered
 * right-to-left, and removes it if it is rendered left-to-right.
 * @param {Element} element The control's root element.
 * @param {boolean} rightToLeft Whether the component is rendered
 *     right-to-left.
 */
ControlRenderer.prototype.setRightToLeft = function(
    element, rightToLeft) {
  this.enableClassName(
      element, goog.getCssName(this.getStructuralCssClass(), 'rtl'),
      rightToLeft);
};


/**
 * Returns true if the control's key event target supports keyboard focus
 * (based on its `tabIndex` attribute), false otherwise.
 * @param {Control} control Control whose key event target is to be
 *     checked.
 * @return {boolean} Whether the control's key event target is focusable.
 */
ControlRenderer.prototype.isFocusable = function(control) {
  var keyTarget;
  if (control.isSupportedState(Component.State.FOCUSED) &&
      (keyTarget = control.getKeyEventTarget())) {
    return dom.isFocusableTabIndex(keyTarget);
  }
  return false;
};


/**
 * Updates the control's key event target to make it focusable or non-focusable
 * via its `tabIndex` attribute.  Does nothing if the control doesn't
 * support the `FOCUSED` state, or if it has no key event target.
 * @param {Control} control Control whose key event target is to be
 *     updated.
 * @param {boolean} focusable Whether to enable keyboard focus support on the
 *     control's key event target.
 */
ControlRenderer.prototype.setFocusable = function(control, focusable) {
  var keyTarget;
  if (control.isSupportedState(Component.State.FOCUSED) &&
      (keyTarget = control.getKeyEventTarget())) {
    if (!focusable && control.isFocused()) {
      // Blur before hiding.  Note that IE calls onblur handlers asynchronously.
      try {
        keyTarget.blur();
      } catch (e) {
        // TODO(user):  Find out why this fails on IE.
      }
      // The blur event dispatched by the key event target element when blur()
      // was called on it should have been handled by the control's handleBlur()
      // method, so at this point the control should no longer be focused.
      // However, blur events are unreliable on IE and FF3, so if at this point
      // the control is still focused, we trigger its handleBlur() method
      // programmatically.
      if (control.isFocused()) {
        control.handleBlur(null);
      }
    }
    // Don't overwrite existing tab index values unless needed.
    if (dom.isFocusableTabIndex(keyTarget) != focusable) {
      dom.setFocusableTabIndex(keyTarget, focusable);
    }
  }
};


/**
 * Shows or hides the element.
 * @param {Element} element Element to update.
 * @param {boolean} visible Whether to show the element.
 */
ControlRenderer.prototype.setVisible = function(element, visible) {
  // The base class implementation is trivial; subclasses should override as
  // needed.  It should be possible to do animated reveals, for example.
  style.setElementShown(element, visible);
  if (element) {
    aria.setState(element, State.HIDDEN, !visible);
  }
};


/**
 * Updates the appearance of the control in response to a state change.
 * @param {Control} control Control instance to update.
 * @param {Component.State} state State to enable or disable.
 * @param {boolean} enable Whether the control is entering or exiting the state.
 */
ControlRenderer.prototype.setState = function(control, state, enable) {
  var element = control.getElement();
  if (element) {
    var className = this.getClassForState(state);
    if (className) {
      this.enableClassName(control, className, enable);
    }
    this.updateAriaState(element, state, enable);
  }
};


/**
 * Updates the element's ARIA (accessibility) attributes , including
 * distinguishing between universally supported ARIA properties and ARIA states
 * that are only supported by certain ARIA roles.
 * @param {Element} element Element whose ARIA state is to be updated.
 * @param {Component.State} state Component state being enabled or
 *     disabled.
 * @param {boolean} enable Whether the state is being enabled or disabled.
 * @protected
 */
ControlRenderer.prototype.updateAriaState = function(
    element, state, enable) {
  // Ensure the ARIA attribute map exists.
  if (!ControlRenderer.ariaAttributeMap_) {
    ControlRenderer.ariaAttributeMap_ = object.create(
        Component.State.DISABLED, State.DISABLED,
        Component.State.SELECTED, State.SELECTED,
        Component.State.CHECKED, State.CHECKED,
        Component.State.OPENED, State.EXPANDED);
  }
  asserts.assert(
      element, 'The element passed as a first parameter cannot be null.');
  var ariaAttr = ControlRenderer.getAriaStateForAriaRole_(
      element, ControlRenderer.ariaAttributeMap_[state]);
  if (ariaAttr) {
    aria.setState(element, ariaAttr, enable);
  }
};


/**
 * Returns the appropriate ARIA attribute based on ARIA role if the ARIA
 * attribute is an ARIA state.
 * @param {!Element} element The element from which to get the ARIA role for
 * matching ARIA state.
 * @param {State} attr The ARIA attribute to check to see if it
 * can be applied to the given ARIA role.
 * @return {State} An ARIA attribute that can be applied to the
 * given ARIA role.
 * @private
 */
ControlRenderer.getAriaStateForAriaRole_ = function(element, attr) {
  var role = aria.getRole(element);
  if (!role) {
    return attr;
  }
  role = /** @type {Role} */ (role);
  var matchAttr = ControlRenderer.TOGGLE_ARIA_STATE_MAP_[role] || attr;
  return ControlRenderer.isAriaState_(attr) ? matchAttr : attr;
};


/**
 * Determines if the given ARIA attribute is an ARIA property or ARIA state.
 * @param {State} attr The ARIA attribute to classify.
 * @return {boolean} If the ARIA attribute is an ARIA state.
 * @private
 */
ControlRenderer.isAriaState_ = function(attr) {
  return attr == State.CHECKED ||
      attr == State.SELECTED;
};


/**
 * Takes a control's root element, and sets its content to the given text
 * caption or DOM structure.  The default implementation replaces the children
 * of the given element.  Renderers that create more complex DOM structures
 * must override this method accordingly.
 * @param {Element} element The control's root element.
 * @param {ControlContent} content Text caption or DOM structure to be
 *     set as the control's content. The DOM nodes will not be cloned, they
 *     will only moved under the content element of the control.
 */
ControlRenderer.prototype.setContent = function(element, content) {
  var contentElem = this.getContentElement(element);
  if (contentElem) {
    dom.removeChildren(contentElem);
    if (content) {
      if (typeof content === 'string') {
        dom.setTextContent(contentElem, content);
      } else {
        var childHandler = function(child) {
          if (child) {
            var doc = dom.getOwnerDocument(contentElem);
            contentElem.appendChild(
                typeof child === 'string' ? doc.createTextNode(child) : child);
          }
        };
        if (Array.isArray(content)) {
          // Array of nodes.
          content.forEach(childHandler);
        } else if (goog.isArrayLike(content) && !('nodeType' in content)) {
          // NodeList. The second condition filters out TextNode which also has
          // length attribute but is not array like. The nodes have to be cloned
          // because childHandler removes them from the list during iteration.
          array.clone(/** @type {!NodeList<?>} */ (content))
              .forEach(childHandler);
        } else {
          // Node or string.
          childHandler(content);
        }
      }
    }
  }
};


/**
 * Returns the element within the component's DOM that should receive keyboard
 * focus (null if none).  The default implementation returns the control's root
 * element.
 * @param {Control} control Control whose key event target is to be
 *     returned.
 * @return {Element} The key event target.
 */
ControlRenderer.prototype.getKeyEventTarget = function(control) {
  return control.getElement();
};


// CSS class name management.


/**
 * Returns the CSS class name to be applied to the root element of all
 * components rendered or decorated using this renderer.  The class name
 * is expected to uniquely identify the renderer class, i.e. no two
 * renderer classes are expected to share the same CSS class name.
 * @return {string} Renderer-specific CSS class name.
 */
ControlRenderer.prototype.getCssClass = function() {
  return ControlRenderer.CSS_CLASS;
};


/**
 * Returns an array of combinations of classes to apply combined class names for
 * in IE6 and below. See {@link IE6_CLASS_COMBINATIONS} for more detail. This
 * method doesn't reference {@link IE6_CLASS_COMBINATIONS} so that it can be
 * compiled out, but subclasses should return their IE6_CLASS_COMBINATIONS
 * static constant instead.
 * @return {!Array<Array<string>>} Array of class name combinations.
 */
ControlRenderer.prototype.getIe6ClassCombinations = function() {
  return [];
};


/**
 * Returns the name of a DOM structure-specific CSS class to be applied to the
 * root element of all components rendered or decorated using this renderer.
 * Unlike the class name returned by {@link #getCssClass}, the structural class
 * name may be shared among different renderers that generate similar DOM
 * structures.  The structural class name also serves as the basis of derived
 * class names used to identify and style structural elements of the control's
 * DOM, as well as the basis for state-specific class names.  The default
 * implementation returns the same class name as {@link #getCssClass}, but
 * subclasses are expected to override this method as needed.
 * @return {string} DOM structure-specific CSS class name (same as the renderer-
 *     specific CSS class name by default).
 */
ControlRenderer.prototype.getStructuralCssClass = function() {
  return this.getCssClass();
};


/**
 * Returns all CSS class names applicable to the given control, based on its
 * state.  The return value is an array of strings containing
 * <ol>
 *   <li>the renderer-specific CSS class returned by {@link #getCssClass},
 *       followed by
 *   <li>the structural CSS class returned by {@link getStructuralCssClass} (if
 *       different from the renderer-specific CSS class), followed by
 *   <li>any state-specific classes returned by {@link #getClassNamesForState},
 *       followed by
 *   <li>any extra classes returned by the control's `getExtraClassNames`
 *       method and
 *   <li>for IE6 and lower, additional combined classes from
 *       {@link getAppliedCombinedClassNames_}.
 * </ol>
 * Since all controls have at least one renderer-specific CSS class name, this
 * method is guaranteed to return an array of at least one element.
 * @param {Control} control Control whose CSS classes are to be
 *     returned.
 * @return {!Array<string>} Array of CSS class names applicable to the control.
 * @protected
 */
ControlRenderer.prototype.getClassNames = function(control) {
  var cssClass = this.getCssClass();

  // Start with the renderer-specific class name.
  var classNames = [cssClass];

  // Add structural class name, if different.
  var structuralCssClass = this.getStructuralCssClass();
  if (structuralCssClass != cssClass) {
    classNames.push(structuralCssClass);
  }

  // Add state-specific class names, if any.
  var classNamesForState = this.getClassNamesForState(control.getState());
  classNames.push.apply(classNames, classNamesForState);

  // Add extra class names, if any.
  var extraClassNames = control.getExtraClassNames();
  if (extraClassNames) {
    classNames.push.apply(classNames, extraClassNames);
  }

  return classNames;
};


/**
 * Returns an array of all the combined class names that should be applied based
 * on the given list of classes. Checks the result of
 * {@link getIe6ClassCombinations} for any combinations that have all
 * members contained in classes. If a combination matches, the members are
 * joined with an underscore (in order), and added to the return array.
 *
 * If opt_includedClass is provided, return only the combined classes that have
 * all members contained in classes AND include opt_includedClass as well.
 * opt_includedClass is added to classes as well.
 * @param {IArrayLike<string>} classes Array-like thing of classes to
 *     return matching combined classes for.
 * @param {?string=} opt_includedClass If provided, get only the combined
 *     classes that include this one.
 * @return {!Array<string>} Array of combined class names that should be
 *     applied.
 * @private
 */
ControlRenderer.prototype.getAppliedCombinedClassNames_ = function(
    classes, opt_includedClass) {
  var toAdd = [];
  if (opt_includedClass) {
    classes = [].concat(classes, [opt_includedClass]);
  }
  this.getIe6ClassCombinations().forEach(function(combo) {
    if (array.every(combo, goog.partial(array.contains, classes)) &&
        (!opt_includedClass || array.contains(combo, opt_includedClass))) {
      toAdd.push(combo.join('_'));
    }
  });
  return toAdd;
};


/**
 * Takes a bit mask of {@link Component.State}s, and returns an array
 * of the appropriate class names representing the given state, suitable to be
 * applied to the root element of a component rendered using this renderer, or
 * null if no state-specific classes need to be applied.  This default
 * implementation uses the renderer's {@link getClassForState} method to
 * generate each state-specific class.
 * @param {number} state Bit mask of component states.
 * @return {!Array<string>} Array of CSS class names representing the given
 *     state.
 * @protected
 */
ControlRenderer.prototype.getClassNamesForState = function(state) {
  var classNames = [];
  while (state) {
    // For each enabled state, push the corresponding CSS class name onto
    // the classNames array.
    var mask = state & -state;  // Least significant bit
    classNames.push(
        this.getClassForState(
            /** @type {Component.State} */ (mask)));
    state &= ~mask;
  }
  return classNames;
};


/**
 * Takes a single {@link Component.State}, and returns the
 * corresponding CSS class name (null if none).
 * @param {Component.State} state Component state.
 * @return {string|undefined} CSS class representing the given state (undefined
 *     if none).
 * @protected
 */
ControlRenderer.prototype.getClassForState = function(state) {
  if (!this.classByState_) {
    this.createClassByStateMap_();
  }
  return this.classByState_[state];
};


/**
 * Takes a single CSS class name which may represent a component state, and
 * returns the corresponding component state (0x00 if none).
 * @param {string} className CSS class name, possibly representing a component
 *     state.
 * @return {Component.State} state Component state corresponding
 *     to the given CSS class (0x00 if none).
 * @protected
 */
ControlRenderer.prototype.getStateFromClass = function(className) {
  if (!this.stateByClass_) {
    this.createStateByClassMap_();
  }
  var state = parseInt(this.stateByClass_[className], 10);
  return /** @type {Component.State} */ (isNaN(state) ? 0x00 : state);
};


/**
 * Creates the lookup table of states to classes, used during state changes.
 * @private
 */
ControlRenderer.prototype.createClassByStateMap_ = function() {
  var baseClass = this.getStructuralCssClass();

  // This ensures space-separated css classnames are not allowed, which some
  // ControlRenderers had been doing.  See http://b/13694665.
  var isValidClassName =
      !googString.contains(googString.normalizeWhitespace(baseClass), ' ');
  asserts.assert(
      isValidClassName,
      'ControlRenderer has an invalid css class: \'' + baseClass + '\'');

  /**
   * Map of component states to state-specific structural class names,
   * used when changing the DOM in response to a state change.  Precomputed
   * and cached on first use to minimize object allocations and string
   * concatenation.
   * @type {Object}
   * @private
   */
  this.classByState_ = object.create(
      Component.State.DISABLED, goog.getCssName(baseClass, 'disabled'),
      Component.State.HOVER, goog.getCssName(baseClass, 'hover'),
      Component.State.ACTIVE, goog.getCssName(baseClass, 'active'),
      Component.State.SELECTED, goog.getCssName(baseClass, 'selected'),
      Component.State.CHECKED, goog.getCssName(baseClass, 'checked'),
      Component.State.FOCUSED, goog.getCssName(baseClass, 'focused'),
      Component.State.OPENED, goog.getCssName(baseClass, 'open'));
};


/**
 * Creates the lookup table of classes to states, used during decoration.
 * @private
 */
ControlRenderer.prototype.createStateByClassMap_ = function() {
  // We need the classByState_ map so we can transpose it.
  if (!this.classByState_) {
    this.createClassByStateMap_();
  }

  /**
   * Map of state-specific structural class names to component states,
   * used during element decoration.  Precomputed and cached on first use
   * to minimize object allocations and string concatenation.
   * @type {Object}
   * @private
   */
  this.stateByClass_ = object.transpose(this.classByState_);
};
