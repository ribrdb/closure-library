/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Tree-like drilldown components for HTML tables.
 *
 * This component supports expanding and collapsing groups of rows in
 * HTML tables.  The behavior is like typical Tree widgets, but tables
 * need special support to enable the tree behaviors.
 *
 * Any row or rows in an HTML table can be DrilldownRows.  The root
 * DrilldownRow nodes are always visible in the table, but the rest show
 * or hide as input events expand and collapse their ancestors.
 *
 * Programming them:  Top-level DrilldownRows are made by decorating
 * a TR element.  Children are made with addChild or addChildAt, and
 * are entered into the document by the render() method.
 *
 * A DrilldownRow can have any number of children.  If it has no children
 * it can be loaded, not loaded, or with a load in progress.
 * Top-level DrilldownRows are always displayed (though setting
 * style.display on a containing DOM node could make one be not
 * visible to the user).  A DrilldownRow can be expanded, or not.  A
 * DrilldownRow displays if all of its ancestors are expanded.
 *
 * Set up event handlers and style each row for the application in an
 * enterDocument method.
 *
 * Children normally render into the document lazily, at the first
 * moment when all ancestors are expanded.
 *
 * @see ../demos/drilldownrow.html
 */

// TODO(user): Build support for dynamically loading DrilldownRows,
// probably using automplete as an example to follow.

// TODO(user): Make DrilldownRows accessible through the keyboard.

// The render method is redefined in this class because when addChildAt renders
// the new child it assumes that the child's DOM node will be a child
// of the parent component's DOM node, but all DOM nodes of DrilldownRows
// in the same tree of DrilldownRows are siblings to each other.
//
// Arguments (or lack of arguments) to the render methods in Component
// all determine the place of the new DOM node in the DOM tree, but
// the place of a new DrilldownRow in the DOM needs to be determined by
// its position in the tree of DrilldownRows.

import * as asserts from '../asserts/asserts.js';

import * as googDom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import * as safe from '../dom/safe.js';
import { SafeHtml } from '../html/safehtml.js';
import { Unicode } from '../string/string.js';
import { Component } from './component.js';



/**
 * Builds a DrilldownRow component, which can overlay a tree
 * structure onto sections of an HTML table.
 *
 * @param {!DrilldownRow.DrilldownRowProperties=} opt_properties
 *   Optional properties.
 * @param {googDom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {Component}
 * @final
 */
export function DrilldownRow(opt_properties, opt_domHelper) {
  Component.call(this, opt_domHelper);
  var properties = opt_properties ||
      /** @type {!DrilldownRow.DrilldownRowProperties} */ ({});

  // Initialize instance variables.

  var html;
  if (properties.html == null) {
    html = SafeHtml.EMPTY;
  } else {
    asserts.assert(properties.html instanceof SafeHtml);
    html = properties.html;
  }

  /**
     * String of HTML to initialize the DOM structure for the table row.
     * Should have the form '<tr attr="etc">Row contents here</tr>'.
     * @type {!SafeHtml}
     * @private
     */
  this.html_ = html;

  /**
   * Controls whether this component's children will show when it shows.
   * @type {boolean}
   * @private
   */
  this.expanded_ =
      typeof properties.expanded != 'undefined' ? properties.expanded : true;

  /**
   * If this component's DOM element is created from a string of
   * HTML, this is the function to call when it is entered into the DOM tree.
   * @type {Function} args are DrilldownRow and goog.events.EventHandler
   *   of the DrilldownRow.
   * @private
   */
  this.decoratorFn_ = properties.decorator || DrilldownRow.decorate;

  /**
   * Is the DrilldownRow to be displayed?  If it is rendered, this mirrors
   * the style.display of the DrilldownRow's row.
   * @type {boolean}
   * @private
   */
  this.displayed_ = true;
}
goog.inherits(DrilldownRow, Component);


/**
 * Used to define properties for a new DrilldownRow. Properties can contain:
 *   loaded: initializes the isLoaded property, defaults to true.
 *   expanded: DrilldownRow expanded or not, default is true.
 *   html: Relevant and required for DrilldownRows to be added as
 *     children.  Ignored when decorating an existing table row.
 *   decorator: Function that accepts one DrilldownRow argument, and
 *     should customize and style the row.  The default is to call
 *     DrilldownRow.decorator.
 * @typedef {{
 *   loaded: (boolean|undefined),
 *   expanded: (boolean|undefined),
 *   html: (!SafeHtml|undefined),
 *   decorator: (Function|undefined)
 * }}
 */
DrilldownRow.DrilldownRowProperties;


/**
 * Example object with properties of the form accepted by the class
 * constructor.  These are educational and show the compiler that
 * these properties can be set so it doesn't emit warnings.
 */
DrilldownRow.sampleProperties = {
  html: SafeHtml.create(
      TagName.TR, {},
      SafeHtml.concat(
          SafeHtml.create(TagName.TD, {}, 'Sample'),
          SafeHtml.create(TagName.TD, {}, 'Sample'))),
  loaded: true,
  decorator: function(selfObj, handler) {
    // When the mouse is hovering, add CSS class goog-drilldown-hover.
    DrilldownRow.decorate(selfObj);
    var row = selfObj.getElement();
    handler.listen(row, 'mouseover', function() {
      classlist.add(row, goog.getCssName('goog-drilldown-hover'));
    });
    handler.listen(row, 'mouseout', function() {
      classlist.remove(row, goog.getCssName('goog-drilldown-hover'));
    });
  }
};


//
// Implementations of Component methods.
//


/**
 * The base class method calls its superclass method and this
 * drilldown's 'decorator' method as defined in the constructor.
 * @override
 */
DrilldownRow.prototype.enterDocument = function() {
  DrilldownRow.superClass_.enterDocument.call(this);
  this.decoratorFn_(this, this.getHandler());
};


/** @override */
DrilldownRow.prototype.createDom = function() {
  this.setElementInternal(
      DrilldownRow.createRowNode_(this.html_, this.getDomHelper()));
};


/**
 * A top-level DrilldownRow decorates a TR element.
 *
 * @param {Element} node The element to test for decorability.
 * @return {boolean} true iff the node is a TR.
 * @override
 */
DrilldownRow.prototype.canDecorate = function(node) {
  return node.tagName == TagName.TR;
};


/**
 * Child drilldowns are rendered when needed.
 *
 * @param {Component} child New DrilldownRow child to be added.
 * @param {number} index position to be occupied by the child.
 * @param {boolean=} opt_render true to force immediate rendering.
 * @override
 */
DrilldownRow.prototype.addChildAt = function(child, index, opt_render) {
  asserts.assertInstanceof(child, DrilldownRow);
  DrilldownRow.superClass_.addChildAt.call(this, child, index, false);
  child.setDisplayable_(this.isVisible_() && this.isExpanded());
  if (opt_render && !child.isInDocument()) {
    child.render();
  }
};


/** @override */
DrilldownRow.prototype.removeChild = function(child) {
  googDom.removeNode(/** @type {!Component} */ (child).getElement());
  return DrilldownRow.superClass_.removeChild.call(this, child);
};


/**
 * Rendering of DrilldownRow's is on need, do not call this directly
 * from application code.
 *
 * Rendering a DrilldownRow places it according to its position in its
 * tree of DrilldownRows.  DrilldownRows cannot be placed any other
 * way so this method does not use any arguments.  This does not call
 * the base class method and does not modify any of this
 * DrilldownRow's children.
 * @override
 */
DrilldownRow.prototype.render = function() {
  if (arguments.length) {
    throw new Error('A DrilldownRow cannot be placed under a specific parent.');
  } else {
    var parent = this.getParent();
    if (!parent.isInDocument()) {
      throw new Error('Cannot render child of un-rendered parent');
    }
    // The new child's TR node needs to go just after the last TR
    // of the part of the parent's subtree that is to the left
    // of this.  The subtree includes the parent.
    asserts.assertInstanceof(parent, DrilldownRow);
    var previous = parent.previousRenderedChild_(this);
    var row;
    if (previous) {
      asserts.assertInstanceof(previous, DrilldownRow);
      row = previous.lastRenderedLeaf_().getElement();
    } else {
      row = parent.getElement();
    }
    row = /** @type {Element} */ (row.nextSibling);
    // Render the child row component into the document.
    if (row) {
      this.renderBefore(row);
    } else {
      // Render at the end of the parent of this DrilldownRow's
      // DOM element.
      var tbody = /** @type {Element} */ (parent.getElement().parentNode);
      DrilldownRow.superClass_.render.call(this, tbody);
    }
  }
};


/**
 * Finds the numeric index of this child within its parent Component.
 * Throws an exception if it has no parent.
 *
 * @return {number} index of this within the children of the parent Component.
 */
DrilldownRow.prototype.findIndex = function() {
  var parent = this.getParent();
  if (!parent) {
    throw new Error('Component has no parent');
  }
  return parent.indexOfChild(this);
};


//
// Type-specific operations
//


/**
 * Returns the expanded state of the DrilldownRow.
 *
 * @return {boolean} true iff this is expanded.
 */
DrilldownRow.prototype.isExpanded = function() {
  return this.expanded_;
};


/**
 * Sets the expanded state of this DrilldownRow: makes all children
 * displayable or not displayable corresponding to the expanded state.
 *
 * @param {boolean} expanded whether this should be expanded or not.
 */
DrilldownRow.prototype.setExpanded = function(expanded) {
  if (expanded != this.expanded_) {
    this.expanded_ = expanded;
    var elem = this.getElement();
    asserts.assert(elem);
    classlist.toggle(elem, goog.getCssName('goog-drilldown-expanded'));
    classlist.toggle(
        elem, goog.getCssName('goog-drilldown-collapsed'));
    if (this.isVisible_()) {
      this.forEachChild(function(child) {
        child.setDisplayable_(expanded);
      });
    }
  }
};


/**
 * Returns this DrilldownRow's level in the tree.  Top level is 1.
 *
 * @return {number} depth of this DrilldownRow in its tree of drilldowns.
 */
DrilldownRow.prototype.getDepth = function() {
  for (var component = this, depth = 0;
       component instanceof DrilldownRow;
       component = component.getParent(), depth++) {
  }
  return depth;
};


/**
 * This static function is a default decorator that adds HTML at the
 * beginning of the first cell to display indentation and an expander
 * image; sets up a click handler on the toggler; initializes a class
 * for the row: either goog-drilldown-expanded or
 * goog-drilldown-collapsed, depending on the initial state of the
 * DrilldownRow; and sets up a click event handler on the toggler
 * element.
 *
 * This creates a DIV with class=toggle.  Your application can set up
 * CSS style rules something like this:
 *
 * tr.goog-drilldown-expanded .toggle {
 *   background-image: url('minus.png');
 * }
 *
 * tr.goog-drilldown-collapsed .toggle {
 *   background-image: url('plus.png');
 * }
 *
 * These background images show whether the DrilldownRow is expanded.
 * @param {DrilldownRow} selfObj DrilldownRow to be decorated.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
DrilldownRow.decorate = function(selfObj) {
  var depth = selfObj.getDepth();
  var row = selfObj.getElement();
  asserts.assert(row);
  if (!row.cells) {
    throw new Error('No cells');
  }
  var cell = row.cells[0];
  var dom = selfObj.getDomHelper();
  var fragment = dom.createDom(
      TagName.DIV, {'style': 'float: left; width: ' + depth + 'em;'},
      dom.createDom(
          TagName.DIV,
          {'class': 'toggle', 'style': 'width: 1em; float: right;'},
          // NOTE: NBSP is probably only needed by IE6. This div can probably be
          // made contentless.
          Unicode.NBSP));
  cell.insertBefore(fragment, cell.firstChild);
  classlist.add(
      row, selfObj.isExpanded() ? goog.getCssName('goog-drilldown-expanded') :
                                  goog.getCssName('goog-drilldown-collapsed'));
  // Default mouse event handling:
  var toggler =
      googDom.getElementsByTagName(TagName.DIV, fragment)[0];
  selfObj.getHandler().listen(toggler, 'click', function(event) {
    selfObj.setExpanded(!selfObj.isExpanded());
  });
};


//
// Private methods
//


/**
 * Turn display of a DrilldownRow on or off.  If the DrilldownRow has not
 * yet been rendered, this renders it.  This propagates the effect
 * of the change recursively as needed -- children displaying iff the
 * parent is displayed and expanded.
 *
 * @param {boolean} display state, true iff display is desired.
 * @private
 */
DrilldownRow.prototype.setDisplayable_ = function(display) {
  if (display && !this.isInDocument()) {
    this.render();
  }
  if (this.displayed_ == display) {
    return;
  }
  this.displayed_ = display;
  if (this.isInDocument()) {
    this.getElement().style.display = display ? '' : 'none';
  }
  var selfObj = this;
  this.forEachChild(function(child) {
    child.setDisplayable_(display && selfObj.expanded_);
  });
};


/**
 * True iff this and all its DrilldownRow parents are displayable.  The
 * value is an approximation to actual visibility, since it does not
 * look at whether DOM nodes containing the top-level component have
 * display: none, visibility: hidden or are otherwise not displayable.
 * So this visibility is relative to the top-level component.
 *
 * @return {boolean} visibility of this relative to its top-level drilldown.
 * @private
 */
DrilldownRow.prototype.isVisible_ = function() {
  for (var component = this; component instanceof DrilldownRow;
       component = component.getParent()) {
    if (!component.displayed_) return false;
  }
  return true;
};


/**
 * Create and return a TR element from HTML that looks like
 * "<tr> ... </tr>".
 * @param {!SafeHtml} html for one row.
 * @param {!googDom.DomHelper} dom DOM to hold the Element.
 * @return {Element} table row node created from the HTML.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
DrilldownRow.createRowNode_ = function(html, dom) {
  // Note: this may be slow.
  var tableHtml = SafeHtml.create(TagName.TABLE, {}, html);
  var div = dom.createElement(TagName.DIV);
  safe.setInnerHtml(div, tableHtml);
  return div.firstChild.rows[0];
};


/**
 * Get the recursively rightmost child that is in the document.
 *
 * @return {DrilldownRow} rightmost child currently entered in
 *     the document, potentially this DrilldownRow.  If this is in the
 *     document, result is non-null.
 * @private
 */
DrilldownRow.prototype.lastRenderedLeaf_ = function() {
  var leaf = null;
  for (var node = this; node && node.isInDocument();
       // Node will become undefined if parent has no children.
       node = node.getChildAt(node.getChildCount() - 1)) {
    leaf = node;
  }
  return /** @type {DrilldownRow} */ (leaf);
};


/**
 * Search this node's direct children for the last one that is in the
 * document and is before the given child.
 * @param {DrilldownRow} child The child to stop the search at.
 * @return {Component?} The last child component before the given child
 *     that is in the document.
 * @private
 */
DrilldownRow.prototype.previousRenderedChild_ = function(child) {
  for (var i = this.getChildCount() - 1; i >= 0; i--) {
    if (this.getChildAt(i) == child) {
      for (var j = i - 1; j >= 0; j--) {
        var prev = this.getChildAt(j);
        if (prev.isInDocument()) {
          return prev;
        }
      }
    }
  }
  return null;
};
