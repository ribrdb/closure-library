/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Default renderer for {@link Checkbox}s.
 * @suppress {missingRequire} Checkbox.State
 */

import * as aria from '../a11y/aria/aria.js';
import { Role } from '../a11y/aria/roles.js';
import { State } from '../a11y/aria/attributes.js';
import * as array from '../array/array.js';
import * as asserts from '../asserts/asserts.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import object from '../object/object.js';
import { ControlRenderer } from './controlrenderer.js';
import { Checkbox } from './checkbox.js';



/**
 * Default renderer for {@link Checkbox}s.  Extends the superclass
 * to support checkbox states:
 * @constructor
 * @extends {ControlRenderer}
 */
export function CheckboxRenderer() {
  CheckboxRenderer.base(this, 'constructor');
}
goog.inherits(CheckboxRenderer, ControlRenderer);
goog.addSingletonGetter(CheckboxRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
CheckboxRenderer.CSS_CLASS = goog.getCssName('goog-checkbox');


/** @override */
CheckboxRenderer.prototype.createDom = function(checkbox) {
  var element = checkbox.getDomHelper().createDom(
      TagName.SPAN, this.getClassNames(checkbox).join(' '));

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var state = checkbox.getChecked();
  this.setCheckboxState(element, state);

  return element;
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
CheckboxRenderer.prototype.decorate = function(checkbox, element) {
  // The superclass implementation takes care of common attributes; we only
  // need to set the checkbox state.
  element = CheckboxRenderer.base(this, 'decorate', checkbox, element);
  asserts.assert(element);
  var classes = classlist.get(element);
  // Update the checked state of the element based on its css classNames
  // with the following order: undetermined -> checked -> unchecked.
  var checked =
      /** @suppress {missingRequire} */ (Checkbox.State.UNCHECKED);
  if (array.contains(
          classes, this.getClassForCheckboxState(
                       /** @suppress {missingRequire} */
                       Checkbox.State.UNDETERMINED))) {
    checked =
        (/** @suppress {missingRequire} */
         (Checkbox.State.UNDETERMINED));
  } else if (
      array.contains(
          classes, this.getClassForCheckboxState(
                       /** @suppress {missingRequire} */ Checkbox.State
                           .CHECKED))) {
    checked = /** @suppress {missingRequire} */ Checkbox.State.CHECKED;
  } else if (array.contains(classes,
      this.getClassForCheckboxState(/** @suppress {missingRequire} */
          Checkbox.State.UNCHECKED))) {
    checked =
        (/** @suppress {missingRequire} */
         (Checkbox.State.UNCHECKED));
  }
  checkbox.setCheckedInternal(checked);
  asserts.assert(element, 'The element cannot be null.');
  aria.setState(
      element, State.CHECKED,
      this.ariaStateFromCheckState_(checked));

  return element;
};


/**
 * Returns the ARIA role to be applied to checkboxes.
 * @return {Role} ARIA role.
 * @override
 */
CheckboxRenderer.prototype.getAriaRole = function() {
  return Role.CHECKBOX;
};


/**
 * Updates the appearance of the control in response to a checkbox state
 * change.
 * @param {Element} element Checkbox element.
 * @param {Checkbox.State} state Updated checkbox state.
 */
CheckboxRenderer.prototype.setCheckboxState = function(element, state) {
  if (element) {
    asserts.assert(element);
    var classToAdd = this.getClassForCheckboxState(state);
    asserts.assert(classToAdd);
    asserts.assert(element);
    if (classlist.contains(element, classToAdd)) {
      return;
    }
    object.forEach(
        /** @suppress {missingRequire} */ Checkbox.State,
        function(state) {
          var className = this.getClassForCheckboxState(state);
          asserts.assert(element);
          classlist.enable(
              element, className, className == classToAdd);
        },
        this);
    aria.setState(
        element, State.CHECKED,
        this.ariaStateFromCheckState_(state));
  }
};


/**
 * Gets the checkbox's ARIA (accessibility) state from its checked state.
 * @param {Checkbox.State} state Checkbox state.
 * @return {string} The value of aria.state.CHECKED. Either 'true',
 *     'false', or 'mixed'.
 * @private
 */
CheckboxRenderer.prototype.ariaStateFromCheckState_ = function(state) {
  if (state ==
      /** @suppress {missingRequire} */ Checkbox.State.UNDETERMINED) {
    return 'mixed';
  } else if (
      state ==
      /** @suppress {missingRequire} */ Checkbox.State.CHECKED) {
    return 'true';
  } else {
    return 'false';
  }
};


/** @override */
CheckboxRenderer.prototype.getCssClass = function() {
  return CheckboxRenderer.CSS_CLASS;
};


/**
 * Takes a single {@link Checkbox.State}, and returns the
 * corresponding CSS class name.
 * @param {Checkbox.State} state Checkbox state.
 * @return {string} CSS class representing the given state.
 * @protected
 * @suppress {missingRequire} Checkbox
 */
CheckboxRenderer.prototype.getClassForCheckboxState = function(state) {
  var baseClass = this.getStructuralCssClass();
  if (state == Checkbox.State.CHECKED) {
    return goog.getCssName(baseClass, 'checked');
  } else if (state == Checkbox.State.UNCHECKED) {
    return goog.getCssName(baseClass, 'unchecked');
  } else if (state == Checkbox.State.UNDETERMINED) {
    return goog.getCssName(baseClass, 'undetermined');
  }
  throw new Error('Invalid checkbox state: ' + state);
};
