/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Default renderer for {@link goog.ui.TabBar}s.  Based on the
 * original `TabPane` code.
 */

import { Role } from '../a11y/aria/roles.js';

import object from '../object/object.js';
import { ContainerRenderer } from './containerrenderer.js';
import { TabBar } from './tabbar.js';
const {Container} = goog.requireType('goog.ui.container');



/**
 * Default renderer for {@link goog.ui.TabBar}s, based on the `TabPane`
 * code.  The tab bar's DOM structure is determined by its orientation and
 * location relative to tab contents.  For example, a horizontal tab bar
 * located above tab contents looks like this:
 *
 *    <div class="goog-tab-bar goog-tab-bar-horizontal goog-tab-bar-top">
 *      ...(tabs here)...
 *    </div>
 *
 * @constructor
 * @extends {ContainerRenderer}
 */
export function TabBarRenderer() {
 ContainerRenderer.call(this, Role.TAB_LIST);
}
goog.inherits(TabBarRenderer, ContainerRenderer);
goog.addSingletonGetter(TabBarRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
TabBarRenderer.CSS_CLASS = goog.getCssName('goog-tab-bar');


/**
 * Returns the CSS class name to be applied to the root element of all tab bars
 * rendered or decorated using this renderer.
 * @return {string} Renderer-specific CSS class name.
 * @override
 */
TabBarRenderer.prototype.getCssClass = function() {
 return TabBarRenderer.CSS_CLASS;
};


/**
 * Sets the tab bar's state based on the given CSS class name, encountered
 * during decoration.  Overrides the superclass implementation by recognizing
 * class names representing tab bar orientation and location.
 * @param {Container} tabBar Tab bar to configure.
 * @param {string} className CSS class name.
 * @param {string} baseClass Base class name used as the root of state-specific
 *     class names (typically the renderer's own class name).
 * @protected
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
TabBarRenderer.prototype.setStateFromClassName = function(
    tabBar, className, baseClass) {
 // Create the class-to-location lookup table on first access.
 if (!this.locationByClass_) {
   this.createLocationByClassMap_();
 }

 // If the class name corresponds to a location, update the tab bar's location;
 // otherwise let the superclass handle it.
 var location = this.locationByClass_[className];
 if (location) {
   tabBar.setLocation(location);
 } else {
   TabBarRenderer.superClass_.setStateFromClassName.call(
       this, tabBar, className, baseClass);
 }
};


/**
 * Returns all CSS class names applicable to the tab bar, based on its state.
 * Overrides the superclass implementation by appending the location-specific
 * class name to the list.
 * @param {Container} tabBar Tab bar whose CSS classes are to be
 *     returned.
 * @return {!Array<string>} Array of CSS class names applicable to the tab bar.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
TabBarRenderer.prototype.getClassNames = function(tabBar) {
 var classNames =
     TabBarRenderer.superClass_.getClassNames.call(this, tabBar);

 // Create the location-to-class lookup table on first access.
 if (!this.classByLocation_) {
   this.createClassByLocationMap_();
 }

 // Apped the class name corresponding to the tab bar's location to the list.
 classNames.push(this.classByLocation_[tabBar.getLocation()]);
 return classNames;
};


/**
 * Creates the location-to-class lookup table.
 * @private
 */
TabBarRenderer.prototype.createClassByLocationMap_ = function() {
 var baseClass = this.getCssClass();

 /**
  * Map of locations to location-specific structural class names,
  * precomputed and cached on first use to minimize object allocations
  * and string concatenation.
  * @type {Object}
  * @private
  * @suppress {missingRequire} goog.ui.TabBar
  */
 this.classByLocation_ = object.create(
     TabBar.Location.TOP, goog.getCssName(baseClass, 'top'),
     TabBar.Location.BOTTOM, goog.getCssName(baseClass, 'bottom'),
     TabBar.Location.START, goog.getCssName(baseClass, 'start'),
     TabBar.Location.END, goog.getCssName(baseClass, 'end'));
};


/**
 * Creates the class-to-location lookup table, used during decoration.
 * @private
 */
TabBarRenderer.prototype.createLocationByClassMap_ = function() {
 // We need the classByLocation_ map so we can transpose it.
 if (!this.classByLocation_) {
   this.createClassByLocationMap_();
 }

 /**
  * Map of location-specific structural class names to locations, used during
  * element decoration.  Precomputed and cached on first use to minimize object
  * allocations and string concatenation.
  * @type {Object}
  * @private
  */
 this.locationByClass_ = object.transpose(this.classByLocation_);
};
