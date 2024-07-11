/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Global renderer and decorator registry.
 */

import * as asserts from '../asserts/asserts.js';

import * as classlist from '../dom/classlist.js';
import object from '../object/object.js';
const {Component} = goog.requireType('goog.ui.component');
const {ControlRenderer} = goog.requireType('goog.ui.controlrenderer');


/**
 * Given a {@link Component} constructor, returns an instance of its
 * default renderer.  If the default renderer is a singleton, returns the
 * singleton instance; otherwise returns a new instance of the renderer class.
 * @param {!Function} componentCtor Component constructor function (for example
 *     `goog.ui.Button`).
 * @return {?ControlRenderer} Renderer instance (for example the
 *     singleton instance of `goog.ui.ButtonRenderer`), or null if
 *     no default renderer was found.
 */
export function getDefaultRenderer(componentCtor) {
  // TODO(user): This should probably be implemented with a `WeakMap`.
  // Locate the default renderer based on the constructor's unique ID.  If no
  // renderer is registered for this class, walk up the superClass_ chain.
  var key;
  var /** ?Function|undefined */ ctor = componentCtor;
  var /** ?Function|undefined */ rendererCtor;
  while (ctor) {
    key = goog.getUid(ctor);
    if ((rendererCtor = defaultRenderers_[key])) break;
    ctor = /** @type {?Function|undefined} */ (object.getSuperClass(ctor));
  }

  // If the renderer has a static getInstance method, return the singleton
  // instance; otherwise create and return a new instance.
  if (rendererCtor) {
    return typeof rendererCtor.getInstance === 'function' ?
        rendererCtor.getInstance() :
        new rendererCtor();
  }

  return null;
}


/**
 * Sets the default renderer for the given {@link Component}
 * constructor.
 * @param {Function} componentCtor Component constructor function (for example
 *     `goog.ui.Button`).
 * @param {Function} rendererCtor Renderer constructor function (for example
 *     `goog.ui.ButtonRenderer`).
 * @throws {Error} If the arguments aren't functions.
 */
export function setDefaultRenderer(componentCtor, rendererCtor) {
  // In this case, explicit validation has negligible overhead (since each
  // renderer is only registered once), and helps catch subtle bugs.
  if (typeof componentCtor !== 'function') {
    throw new Error('Invalid component class ' + componentCtor);
  }
  if (typeof rendererCtor !== 'function') {
    throw new Error('Invalid renderer class ' + rendererCtor);
  }

  // Map the component constructor's unique ID to the renderer constructor.
  var key = goog.getUid(componentCtor);
  defaultRenderers_[key] = rendererCtor;
}


/**
 * Returns the {@link Component} instance created by the decorator
 * factory function registered for the given CSS class name, or null if no
 * decorator factory function was found.
 * @param {string} className CSS class name.
 * @return {Component?} Component instance.
 */
export function getDecoratorByClassName(className) {
  return className in decoratorFunctions_ ?
      decoratorFunctions_[className]() :
      null;
}


/**
 * Maps a CSS class name to a function that returns a new instance of
 * {@link Component} or a subclass, suitable to decorate an element
 * that has the specified CSS class.
 * @param {string} className CSS class name.
 * @param {Function} decoratorFn No-argument function that returns a new
 *     instance of a {@link Component} to decorate an element.
 * @throws {Error} If the class name or the decorator function is invalid.
 */
export function setDecoratorByClassName(className, decoratorFn) {
  // In this case, explicit validation has negligible overhead (since each
  // decorator  is only registered once), and helps catch subtle bugs.
  if (!className) {
    throw new Error('Invalid class name ' + className);
  }
  if (typeof decoratorFn !== 'function') {
    throw new Error('Invalid decorator function ' + decoratorFn);
  }

  decoratorFunctions_[className] = decoratorFn;
}


/**
 * Returns an instance of {@link Component} or a subclass suitable to
 * decorate the given element, based on its CSS class.
 *
 * TODO(nnaze): Type of element should be {!Element}.
 *
 * @param {Element} element Element to decorate.
 * @return {Component?} Component to decorate the element (null if
 *     none).
 */
export function getDecorator(element) {
  var decorator;
  asserts.assert(element);
  var classNames = classlist.get(element);
  for (var i = 0, len = classNames.length; i < len; i++) {
    if ((decorator = getDecoratorByClassName(classNames[i]))) {
      return decorator;
    }
  }
  return null;
}


/**
 * Resets the global renderer and decorator registry.
 */
export function reset() {
  object.clear(defaultRenderers_);
  object.clear(decoratorFunctions_);
};


/**
 * Map of {@link Component} constructor unique IDs to the constructors
 * of their default {@link goog.ui.Renderer}s.
 * @type {Object}
 * @private
 */
export var defaultRenderers_ = {};


/**
 * Map of CSS class names to registry factory functions.  The keys are
 * class names.  The values are function objects that return new instances
 * of {@link goog.ui.registry} or one of its subclasses, suitable to
 * decorate elements marked with the corresponding CSS class.  Used by
 * containers while decorating their children.
 * @type {Object}
 * @private
 */
export var decoratorFunctions_ = {};
