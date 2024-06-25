/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for adding, removing and setting classes.  Prefer
 * {@link goog.dom.classlist} over these utilities since goog.dom.classlist
 * conforms closer to the semantics of Element.classList, is faster (uses
 * native methods rather than parsing strings on every call) and compiles
 * to smaller code as a result.
 *
 * Note: these utilities are meant to operate on HTMLElements and
 * will not work on elements with differing interfaces (such as SVGElements).
 */


import * as array from '../array/array.js';


/**
 * Sets the entire class name of an element.
 * @param {Node} element DOM node to set class of.
 * @param {string} className Class name(s) to apply to element.
 * @deprecated Use goog.dom.classlist.set instead.
 */
export function set(element, className) {
  /** @type {!HTMLElement} */ (element).className = className;
}


/**
 * Gets an array of class names on an element
 * @param {Node} element DOM node to get class of.
 * @return {!Array<?>} Class names on `element`. Some browsers add extra
 *     properties to the array. Do not depend on any of these!
 * @deprecated Use goog.dom.classlist.get instead.
 */
export function get(element) {
  var className = /** @type {!Element} */ (element).className;
  // Some types of elements don't have a className in IE (e.g. iframes).
  // Furthermore, in Firefox, className is not a string when the element is
  // an SVG element.
  return typeof className === 'string' && className.match(/\S+/g) || [];
}


/**
 * Adds a class or classes to an element. Does not add multiples of class names.
 * @param {Node} element DOM node to add class to.
 * @param {...string} var_args Class names to add.
 * @return {boolean} Whether class was added (or all classes were added).
 * @deprecated Use goog.dom.classlist.add or goog.dom.classlist.addAll instead.
 */
function add_(element, var_args) {
  var classes = get(element);
  var args = Array.prototype.slice.call(arguments, 1);
  var expectedCount = classes.length + args.length;
  add__(classes, args);
  set(element, classes.join(' '));
  return classes.length == expectedCount;
}


export { add_ as add };


/**
 * Removes a class or classes from an element.
 * @param {Node} element DOM node to remove class from.
 * @param {...string} var_args Class name(s) to remove.
 * @return {boolean} Whether all classes in `var_args` were found and
 *     removed.
 * @deprecated Use goog.dom.classlist.remove or goog.dom.classlist.removeAll
 *     instead.
 */
export function remove(element, var_args) {
  var classes = get(element);
  var args = Array.prototype.slice.call(arguments, 1);
  var newClasses = getDifference_(classes, args);
  set(element, newClasses.join(' '));
  return newClasses.length == classes.length - args.length;
}


/**
 * Helper method for {@link add} and
 * {@link addRemove}. Adds one or more classes to the supplied
 * classes array.
 * @param {Array<string>} classes All class names for the element, will be
 *     updated to have the classes supplied in `args` added.
 * @param {Array<string>} args Class names to add.
 * @private
 */
function add__(classes, args) {
  for (var i = 0; i < args.length; i++) {
    if (!array.contains(classes, args[i])) {
      classes.push(args[i]);
    }
  }
}


/**
 * Helper method for {@link remove} and
 * {@link addRemove}. Calculates the difference of two arrays.
 * @param {!Array<string>} arr1 First array.
 * @param {!Array<string>} arr2 Second array.
 * @return {!Array<string>} The first array without the elements of the second
 *     array.
 * @private
 */
function getDifference_(arr1, arr2) {
  return arr1.filter(function(item) {
    return !array.contains(arr2, item);
  });
}


/**
 * Switches a class on an element from one to another without disturbing other
 * classes. If the fromClass isn't removed, the toClass won't be added.
 * @param {Node} element DOM node to swap classes on.
 * @param {string} fromClass Class to remove.
 * @param {string} toClass Class to add.
 * @return {boolean} Whether classes were switched.
 * @deprecated Use goog.dom.classlist.swap instead.
 */
export function swap(element, fromClass, toClass) {
  var classes = get(element);

  var removed = false;
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == fromClass) {
      classes.splice(i--, 1);
      removed = true;
    }
  }

  if (removed) {
    classes.push(toClass);
    set(element, classes.join(' '));
  }

  return removed;
}


/**
 * Adds zero or more classes to an element and removes zero or more as a single
 * operation. Unlike calling {@link add} and
 * {@link remove} separately, this is more efficient as it only
 * parses the class property once.
 *
 * If a class is in both the remove and add lists, it will be added. Thus,
 * you can use this instead of {@link swap} when you have
 * more than two class names that you want to swap.
 *
 * @param {Node} element DOM node to swap classes on.
 * @param {?(string|Array<string>)} classesToRemove Class or classes to
 *     remove, if null no classes are removed.
 * @param {?(string|Array<string>)} classesToAdd Class or classes to add, if
 *     null no classes are added.
 * @deprecated Use goog.dom.classlist.addRemove instead.
 */
export function addRemove(element, classesToRemove, classesToAdd) {
  var classes = get(element);
  if (typeof classesToRemove === 'string') {
    array.remove(classes, classesToRemove);
  } else if (Array.isArray(classesToRemove)) {
    classes = getDifference_(classes, classesToRemove);
  }

  if (typeof classesToAdd === 'string' &&
      !array.contains(classes, classesToAdd)) {
    classes.push(classesToAdd);
  } else if (Array.isArray(classesToAdd)) {
    add__(classes, classesToAdd);
  }

  set(element, classes.join(' '));
}


/**
 * Returns true if an element has a class.
 * @param {Node} element DOM node to test.
 * @param {string} className Class name to test for.
 * @return {boolean} Whether element has the class.
 * @deprecated Use goog.dom.classlist.contains instead.
 */
export function has(element, className) {
  return array.contains(get(element), className);
}


/**
 * Adds or removes a class depending on the enabled argument.
 * @param {Node} element DOM node to add or remove the class on.
 * @param {string} className Class name to add or remove.
 * @param {boolean} enabled Whether to add or remove the class (true adds,
 *     false removes).
 * @deprecated Use goog.dom.classlist.enable or goog.dom.classlist.enableAll
 *     instead.
 */
export function enable(element, className, enabled) {
  if (enabled) {
    add_(element, className);
  } else {
    remove(element, className);
  }
}


/**
 * Removes a class if an element has it, and adds it the element doesn't have
 * it.  Won't affect other classes on the node.
 * @param {Node} element DOM node to toggle class on.
 * @param {string} className Class to toggle.
 * @return {boolean} True if class was added, false if it was removed
 *     (in other words, whether element has the class after this function has
 *     been called).
 * @deprecated Use goog.dom.classlist.toggle instead.
 */
export function toggle(element, className) {
  var add = !has(element, className);
  enable(element, className, add);
  return add;
}
