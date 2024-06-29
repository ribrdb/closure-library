/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A UI for editing tweak settings / clicking tweak actions.
 */

import * as array from '../array/array.js';

import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as safe from '../dom/safe.js';
import { SafeHtml } from '../html/safehtml.js';
import { SafeStyleSheet } from '../html/safestylesheet.js';
import object from '../object/object.js';
import { Const } from '../string/const.js';
import * as style from '../style/style.js';
import * as googTweak from './tweak.js';

import {
  BaseEntry,
  BooleanGroup,
  BooleanInGroupSetting,
  BooleanSetting,
  ButtonAction,
  NumericSetting,
  StringSetting,
} from './entries.js';

import { Zippy } from '../ui/zippy.js';
import * as userAgent from '../useragent/useragent.js';
const { Registry } = goog.requireType('goog.tweak.registry');



/**
 * A UI for editing tweak settings / clicking tweak actions.
 * @param {!Registry} registry The registry to render.
 * @param {dom.DomHelper=} opt_domHelper The DomHelper to render with.
 * @constructor
 * @final
 */
export function TweakUi(registry, opt_domHelper) {
  /**
     * The registry to create a UI from.
     * @type {!Registry}
     * @private
     */
  this.registry_ = registry;

  /**
     * The element to display when the UI is visible.
     * @type {EntriesPanel|undefined}
     * @private
     */
  this.entriesPanel_;

  /**
     * The DomHelper to render with.
     * @type {!dom.DomHelper}
     * @private
     */
  this.domHelper_ = opt_domHelper || dom.getDomHelper();

  // Listen for newly registered entries (happens with lazy-loaded modules).
  registry.addOnRegisterListener(goog.bind(this.onNewRegisteredEntry_, this));
}


/**
 * The CSS class name unique to the root tweak panel div.
 * @type {string}
 * @private
 */
TweakUi.ROOT_PANEL_CLASS_ = goog.getCssName('goog-tweak-root');


/**
 * The CSS class name unique to the tweak entry div.
 * @type {string}
 * @private
 */
TweakUi.ENTRY_CSS_CLASS_ = goog.getCssName('goog-tweak-entry');


/**
 * The CSS classes for each tweak entry div.
 * @type {string}
 * @private
 */
TweakUi.ENTRY_CSS_CLASSES_ = TweakUi.ENTRY_CSS_CLASS_ +
    ' ' + goog.getCssName('goog-inline-block');


/**
 * The CSS classes for each namespace tweak entry div.
 * @type {string}
 * @private
 */
TweakUi.ENTRY_GROUP_CSS_CLASSES_ =
    TweakUi.ENTRY_CSS_CLASS_;


/**
 * Marker that the style sheet has already been installed.
 * @type {string}
 * @private
 */
TweakUi.STYLE_SHEET_INSTALLED_MARKER_ = '__closure_tweak_installed_';


/**
 * CSS used by TweakUI.
 * @type {!SafeStyleSheet}
 * @private
 */
TweakUi.CSS_STYLES_ = (function() {
  var MOBILE = userAgent.MOBILE;
  var IE = userAgent.IE;
  var ROOT_PANEL_CLASS = '.' + TweakUi.ROOT_PANEL_CLASS_;
  var GOOG_INLINE_BLOCK_CLASS = '.' + goog.getCssName('goog-inline-block');
  var ret = [SafeStyleSheet.createRule(
      ROOT_PANEL_CLASS, {'background': '#ffc', 'padding': '0 4px'})];
  // Make this work even if the user hasn't included common.css.
  if (!IE) {
    ret.push(SafeStyleSheet.createRule(
        GOOG_INLINE_BLOCK_CLASS, {'display': 'inline-block'}));
  }
  // Space things out vertically for touch UIs.
  if (MOBILE) {
    ret.push(SafeStyleSheet.createRule(
        ROOT_PANEL_CLASS + ',' + ROOT_PANEL_CLASS + ' fieldset',
        {'line-height': '2em'}));
  }
  return SafeStyleSheet.concat(ret);
})();


/**
 * Creates a TweakUi if tweaks are enabled.
 * @param {dom.DomHelper=} opt_domHelper The DomHelper to render with.
 * @return {!Element|undefined} The root UI element or undefined if tweaks are
 *     not enabled.
 */
TweakUi.create = function(opt_domHelper) {
  var registry = googTweak.getRegistry();
  if (registry) {
    var ui = new TweakUi(registry, opt_domHelper);
    ui.render();
    return ui.getRootElement();
  }
};


/**
 * Creates a TweakUi inside of a show/hide link.
 * @param {dom.DomHelper=} opt_domHelper The DomHelper to render with.
 * @return {!Element|undefined} The root UI element or undefined if tweaks are
 *     not enabled.
 */
TweakUi.createCollapsible = function(opt_domHelper) {
  var registry = googTweak.getRegistry();
  if (registry) {
    var dh = opt_domHelper || dom.getDomHelper();

    // The following strings are for internal debugging only.  No translation
    // necessary.  Do NOT wrap goog.getMsg() around these strings.
    var showLink = dh.createDom(TagName.A, {href: '#'}, 'Show Tweaks');
    var hideLink = dh.createDom(TagName.A, {href: '#'}, 'Hide Tweaks');
    var ret = dh.createDom(TagName.DIV, null, showLink);

    var lazyCreate = function() {
      // Lazily render the UI.
      var ui = new TweakUi( (registry), dh);
      ui.render();
      // Put the hide link on the same line as the "Show Descriptions" link.
      // Set the style lazily because we can.
      hideLink.style.marginRight = '10px';
      var tweakElem = ui.getRootElement();
      tweakElem.insertBefore(hideLink, tweakElem.firstChild);
      ret.appendChild(tweakElem);
      return tweakElem;
    };
    new Zippy(showLink, lazyCreate, false /* expanded */, hideLink);
    return ret;
  }
};


/**
 * Compares the given entries. Orders alphabetically and groups buttons and
 * expandable groups.
 * @param {!BaseEntry} a The first entry to compare.
 * @param {!BaseEntry} b The second entry to compare.
 * @return {number} Refer to array.defaultCompare.
 * @private
 */
TweakUi.entryCompare_ = function(a, b) {
  return (array.defaultCompare(
      a instanceof NamespaceEntry_,
      b instanceof NamespaceEntry_) ||
  array.defaultCompare(
      a instanceof BooleanGroup,
      b instanceof BooleanGroup) ||
  array.defaultCompare(
      a instanceof ButtonAction,
      b instanceof ButtonAction) ||
  array.defaultCompare(a.label, b.label) || array.defaultCompare(a.getId(), b.getId()));
};


/**
 * @param {!BaseEntry} entry The entry.
 * @return {boolean} Returns whether the given entry contains sub-entries.
 * @private
 */
TweakUi.isGroupEntry_ = function(entry) {
  return entry instanceof NamespaceEntry_ ||
      entry instanceof BooleanGroup;
};


/**
 * Returns the list of entries from the given boolean group.
 * @param {!BooleanGroup} group The group to get the entries from.
 * @return {!Array<!BaseEntry>} The sorted entries.
 * @private
 */
TweakUi.extractBooleanGroupEntries_ = function(group) {
  var ret = object.getValues(group.getChildEntries());
  ret.sort(TweakUi.entryCompare_);
  return ret;
};


/**
 * @param {!BaseEntry} entry The entry.
 * @return {string} Returns the namespace for the entry, or '' if it is not
 *     namespaced.
 * @private
 */
TweakUi.extractNamespace_ = function(entry) {
  var namespaceMatch = /.+(?=\.)/.exec(entry.getId());
  return namespaceMatch ? namespaceMatch[0] : '';
};


/**
 * @param {!BaseEntry} entry The entry.
 * @return {string} Returns the part of the label after the last period, unless
 *     the label has been explicly set (it is different from the ID).
 * @private
 */
TweakUi.getNamespacedLabel_ = function(entry) {
  var label = entry.label;
  if (label == entry.getId()) {
    label = label.slice(label.lastIndexOf('.') + 1);
  }
  return label;
};


/**
 * @return {!Element} The root element. Must not be called before render().
 */
TweakUi.prototype.getRootElement = function() {
  asserts.assert(
      this.entriesPanel_, 'TweakUi.getRootElement called before render().');
  return this.entriesPanel_.getRootElement();
};


/**
 * Reloads the page with query parameters set by the UI.
 * @private
 */
TweakUi.prototype.restartWithAppliedTweaks_ = function() {
  var queryString = this.registry_.makeUrlQuery();
  var wnd = this.domHelper_.getWindow();
  if (queryString != wnd.location.search) {
    wnd.location.search = queryString;
  } else {
    wnd.location.reload();
  }
};


/**
 * Installs the required CSS styles.
 * @private
 */
TweakUi.prototype.installStyles_ = function() {
  // Use an marker to install the styles only once per document.
  // Styles are injected via JS instead of in a separate style sheet so that
  // they are automatically excluded when tweaks are stripped out.
  var doc = this.domHelper_.getDocument();
  if (!(TweakUi.STYLE_SHEET_INSTALLED_MARKER_ in doc)) {
    style.installSafeStyleSheet(TweakUi.CSS_STYLES_, doc);
    doc[TweakUi.STYLE_SHEET_INSTALLED_MARKER_] = true;
  }
};


/**
 * Creates the element to display when the UI is visible.
 * @return {!Element} The root element.
 */
TweakUi.prototype.render = function() {
  this.installStyles_();
  var dh = this.domHelper_;
  // The submit button
  var submitButton = dh.createDom(
      TagName.BUTTON, {style: 'font-weight:bold'}, 'Apply Tweaks');
  submitButton.onclick = goog.bind(this.restartWithAppliedTweaks_, this);

  var rootPanel = new EntriesPanel([], dh);
  var rootPanelDiv = rootPanel.render(submitButton);
  rootPanelDiv.className += ' ' + TweakUi.ROOT_PANEL_CLASS_;
  this.entriesPanel_ = rootPanel;

  var entries = this.registry_.extractEntries(
      true /* excludeChildEntries */, false /* excludeNonSettings */);
  for (var i = 0, entry; entry = entries[i]; i++) {
    this.insertEntry_(entry);
  }

  return rootPanelDiv;
};


/**
 * Updates the UI with the given entry.
 * @param {!BaseEntry} entry The newly registered entry.
 * @private
 */
TweakUi.prototype.onNewRegisteredEntry_ = function(entry) {
  if (this.entriesPanel_) {
    this.insertEntry_(entry);
  }
};


/**
 * Updates the UI with the given entry.
 * @param {!BaseEntry} entry The newly registered entry.
 * @private
 */
TweakUi.prototype.insertEntry_ = function(entry) {
  var panel = this.entriesPanel_;
  var namespace = TweakUi.extractNamespace_(entry);

  if (namespace) {
    // Find the NamespaceEntry that the entry belongs to.
    var namespaceEntryId = NamespaceEntry_.ID_PREFIX + namespace;
    var nsPanel = panel.childPanels[namespaceEntryId];
    if (nsPanel) {
      panel = nsPanel;
    } else {
      entry = new NamespaceEntry_(namespace, [entry]);
    }
  }
  if (entry instanceof BooleanInGroupSetting) {
    var group = entry.getGroup();
    // BooleanGroup entries are always registered before their
    // BooleanInGroupSettings.
    panel = panel.childPanels[group.getId()];
  }
  asserts.assert(panel, 'Missing panel for entry %s', entry.getId());
  panel.insertEntry(entry);
};



/**
 * The body of the tweaks UI and also used for BooleanGroup.
 * @param {!Array<!BaseEntry>} entries The entries to show in the
 *     panel.
 * @param {dom.DomHelper=} opt_domHelper The DomHelper to render with.
 * @constructor
 * @final
 */
export function EntriesPanel(entries, opt_domHelper) {
  /**
     * The entries to show in the panel.
     * @type {!Array<!BaseEntry>} entries
     * @private
     */
  this.entries_ = entries;

  var self = this;
  /**
   * The bound onclick handler for the help question marks.
   * @this {Element}
   * @private
   */
  this.boundHelpOnClickHandler_ = function() {
    self.onHelpClick_(this.parentNode);
  };

  /**
   * The element that contains the UI.
   * @type {Element}
   * @private
   */
  this.rootElem_;

  /**
   * The element that contains all of the settings and the endElement.
   * @type {Element}
   * @private
   */
  this.mainPanel_;

  /**
   * Flips between true/false each time the "Toggle Descriptions" link is
   * clicked.
   * @type {boolean}
   * @private
   */
  this.showAllDescriptionsState_;

  /**
     * The DomHelper to render with.
     * @type {!dom.DomHelper}
     * @private
     */
  this.domHelper_ = opt_domHelper || dom.getDomHelper();

  /**
     * Map of tweak ID -> EntriesPanel for child panels (BooleanGroups).
     * @type {!Object<!EntriesPanel>}
     */
  this.childPanels = {};
}


/**
 * @return {!Element} Returns the expanded element. Must not be called before
 *     render().
 */
EntriesPanel.prototype.getRootElement = function() {
  asserts.assert(
      this.rootElem_, 'EntriesPanel.getRootElement called before render().');
  return /** @type {!Element} */ (this.rootElem_);
};


/**
 * Creates and returns the expanded element.
 * The markup looks like:
 *
 *    <div>
 *      <a>Show Descriptions</a>
 *      <div>
 *         ...
 *         {endElement}
 *      </div>
 *    </div>
 *
 * @param {Element|DocumentFragment=} opt_endElement Element to insert after all
 *     tweak entries.
 * @return {!Element} The root element for the panel.
 */
EntriesPanel.prototype.render = function(opt_endElement) {
  var dh = this.domHelper_;
  var entries = this.entries_;
  var ret = dh.createDom(TagName.DIV);

  var showAllDescriptionsLink = dh.createDom(
      TagName.A,
      {href: '#', onclick: goog.bind(this.toggleAllDescriptions, this)},
      'Toggle all Descriptions');
  ret.appendChild(showAllDescriptionsLink);

  // Add all of the entries.
  var mainPanel = dh.createElement(TagName.DIV);
  this.mainPanel_ = mainPanel;
  for (var i = 0, entry; entry = entries[i]; i++) {
    mainPanel.appendChild(this.createEntryElem_(entry));
  }

  if (opt_endElement) {
    mainPanel.appendChild(opt_endElement);
  }
  ret.appendChild(mainPanel);
  this.rootElem_ = ret;
  return /** @type {!Element} */ (ret);
};


/**
 * Inserts the given entry into the panel.
 * @param {!BaseEntry} entry The entry to insert.
 */
EntriesPanel.prototype.insertEntry = function(entry) {
  var insertIndex =
      -array.binarySearch(
          this.entries_, entry, TweakUi.entryCompare_) -
      1;
  asserts.assert(
      insertIndex >= 0, 'insertEntry failed for %s', entry.getId());
  array.insertAt(this.entries_, entry, insertIndex);
  this.mainPanel_.insertBefore(
      this.createEntryElem_(entry),
      // IE doesn't like 'undefined' here.
      this.mainPanel_.childNodes[insertIndex] || null);
};


/**
 * Creates and returns a form element for the given entry.
 * @param {!BaseEntry} entry The entry.
 * @return {!Element} The root DOM element for the entry.
 * @private
 */
EntriesPanel.prototype.createEntryElem_ = function(entry) {
  var dh = this.domHelper_;
  var isGroupEntry = TweakUi.isGroupEntry_(entry);
  var classes = isGroupEntry ? TweakUi.ENTRY_GROUP_CSS_CLASSES_ :
                               TweakUi.ENTRY_CSS_CLASSES_;
  // Containers should not use label tags or else all descendent inputs will be
  // connected on desktop browsers.
  var containerNodeName =
      isGroupEntry ? TagName.SPAN : TagName.LABEL;
  var ret = dh.createDom(
      TagName.DIV, classes,
      dh.createDom(
          containerNodeName, {
            // Make the hover text the description.
            title: entry.description,
            style: 'color:' + (entry.isRestartRequired() ? '' : 'blue')
          },
          this.createTweakEntryDom_(entry)),
      // Add the expandable help question mark.
      this.createHelpElem_(entry));
  return ret;
};


/**
 * Click handler for the help link.
 * @param {Node} entryDiv The div that contains the tweak.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
EntriesPanel.prototype.onHelpClick_ = function(entryDiv) {
  this.showDescription_(entryDiv, !entryDiv.style.display);
};


/**
 * Twiddle the DOM so that the entry within the given span is shown/hidden.
 * @param {Node} entryDiv The div that contains the tweak.
 * @param {boolean} show True to show, false to hide.
 * @private
 */
EntriesPanel.prototype.showDescription_ = function(entryDiv, show) {
  var descriptionElem = entryDiv.lastChild.lastChild;
  style.setElementShown(/** @type {Element} */ (descriptionElem), show);
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  entryDiv.style.display = show ? 'block' : '';
};


/**
 * Creates and returns a help element for the given entry.
 * @param {BaseEntry} entry The entry.
 * @return {!Element} The root element of the created DOM.
 * @private
 */
EntriesPanel.prototype.createHelpElem_ = function(entry) {
  // The markup looks like:
  // <span onclick=...><b>?</b><span>{description}</span></span>
  var ret = this.domHelper_.createElement(TagName.SPAN);
  safe.setInnerHtml(
      ret,
      SafeHtml.concat(
          SafeHtml.create(
              'b', {'style': Const.from('padding:0 1em 0 .5em')},
              '?'),
          SafeHtml.create(
              'span',
              {'style': Const.from('display:none;color:#666')})));
  ret.onclick = this.boundHelpOnClickHandler_;
  // IE<9 doesn't support lastElementChild.
  var descriptionElem = /** @type {!Element} */ (ret.lastChild);
  if (entry.isRestartRequired()) {
    dom.setTextContent(descriptionElem, entry.description);
  } else {
    safe.setInnerHtml(
        descriptionElem,
        SafeHtml.concat(
            SafeHtml.htmlEscape(entry.description),
            SafeHtml.create(
                'span', {'style': Const.from('color: blue')},
                '(no restart required)')));
  }
  return ret;
};


/**
 * Show all entry descriptions (has the same effect as clicking on all ?'s).
 */
EntriesPanel.prototype.toggleAllDescriptions = function() {
  var show = !this.showAllDescriptionsState_;
  this.showAllDescriptionsState_ = show;
  var entryDivs = this.domHelper_.getElementsByTagNameAndClass(
      TagName.DIV, TweakUi.ENTRY_CSS_CLASS_,
      this.rootElem_);
  for (var i = 0, div; div = entryDivs[i]; i++) {
    this.showDescription_(div, show);
  }
};


/**
 * Creates the DOM element to control the given enum setting.
 * @param {!StringSetting|!NumericSetting} tweak The
 *     setting.
 * @param {string} label The label for the entry.
 * @param {!Function} onchangeFunc onchange event handler.
 * @return {!DocumentFragment} The DOM element.
 * @private
 */
EntriesPanel.prototype.createComboBoxDom_ = function(
    tweak, label, onchangeFunc) {
  // The markup looks like:
  // Label: <select><option></option></select>
  var dh = this.domHelper_;
  var ret = dh.getDocument().createDocumentFragment();
  ret.appendChild(dh.createTextNode(label + ': '));
  var selectElem = dh.createElement(TagName.SELECT);
  var values = tweak.getValidValues();
  for (var i = 0, il = values.length; i < il; ++i) {
    var optionElem = dh.createElement(TagName.OPTION);
    optionElem.text = String(values[i]);
    // Setting the option tag's value is required for selectElem.value to work
    // properly.
    optionElem.value = String(values[i]);
    selectElem.appendChild(optionElem);
  }
  ret.appendChild(selectElem);

  // Set the value and add a callback.
  selectElem.value = String(tweak.getNewValue());
  selectElem.onchange = onchangeFunc;
  tweak.addCallback(function() {
    selectElem.value = String(tweak.getNewValue());
  });
  return ret;
};


/**
 * Creates the DOM element to control the given boolean setting.
 * @param {!BooleanSetting} tweak The setting.
 * @param {string} label The label for the entry.
 * @return {!DocumentFragment} The DOM elements.
 * @private
 */
EntriesPanel.prototype.createBooleanSettingDom_ = function(
    tweak, label) {
  var dh = this.domHelper_;
  var ret = dh.getDocument().createDocumentFragment();
  var checkbox = dh.createDom(TagName.INPUT, {type: 'checkbox'});
  ret.appendChild(checkbox);
  ret.appendChild(dh.createTextNode(label));

  // Needed on IE6 to ensure the textbox doesn't get cleared
  // when added to the DOM.
  checkbox.defaultChecked = tweak.getNewValue();

  checkbox.checked = tweak.getNewValue();
  checkbox.onchange = function() {
    tweak.setValue(checkbox.checked);
  };
  tweak.addCallback(function() {
    checkbox.checked = tweak.getNewValue();
  });
  return ret;
};


/**
 * Creates the DOM for a BooleanGroup or NamespaceEntry.
 * @param {!BooleanGroup|!NamespaceEntry_} entry The
 *     entry.
 * @param {string} label The label for the entry.
 * @param {!Array<BaseEntry>} childEntries The child entries.
 * @return {!DocumentFragment} The DOM element.
 * @private
 */
EntriesPanel.prototype.createSubPanelDom_ = function(
    entry, label, childEntries) {
  var dh = this.domHelper_;
  var toggleLink =
      dh.createDom(TagName.A, {href: '#'}, label + ' \xBB');
  var toggleLink2 =
      dh.createDom(TagName.A, {href: '#'}, '\xAB ' + label);
  toggleLink2.style.marginRight = '10px';

  var innerUi = new EntriesPanel(childEntries, dh);
  this.childPanels[entry.getId()] = innerUi;

  var elem = innerUi.render();
  // Move the toggle descriptions link into the legend.
  var descriptionsLink = elem.firstChild;
  var childrenElem = dh.createDom(
      TagName.FIELDSET, goog.getCssName('goog-inline-block'),
      dh.createDom(
          TagName.LEGEND, null, toggleLink2, descriptionsLink),
      elem);

  new Zippy(
      toggleLink, childrenElem, false /* expanded */, toggleLink2);

  var ret = dh.getDocument().createDocumentFragment();
  ret.appendChild(toggleLink);
  ret.appendChild(childrenElem);
  return ret;
};


/**
 * Creates the DOM element to control the given string setting.
 * @param {!StringSetting|!NumericSetting} tweak The
 *     setting.
 * @param {string} label The label for the entry.
 * @param {!Function} onchangeFunc onchange event handler.
 * @return {!DocumentFragment} The DOM element.
 * @private
 */
EntriesPanel.prototype.createTextBoxDom_ = function(
    tweak, label, onchangeFunc) {
  var dh = this.domHelper_;
  var ret = dh.getDocument().createDocumentFragment();
  ret.appendChild(dh.createTextNode(label + ': '));
  var textBox = dh.createDom(TagName.INPUT, {
    value: String(tweak.getNewValue()),
    // TODO(agrieve): Make size configurable or autogrow.
    size: 5,
    onblur: onchangeFunc
  });
  ret.appendChild(textBox);
  tweak.addCallback(function() {
    textBox.value = String(tweak.getNewValue());
  });
  return ret;
};


/**
 * Creates the DOM element to control the given button action.
 * @param {!ButtonAction} tweak The action.
 * @param {string} label The label for the entry.
 * @return {!Element} The DOM element.
 * @private
 */
EntriesPanel.prototype.createButtonActionDom_ = function(
    tweak, label) {
  return this.domHelper_.createDom(
      TagName.BUTTON, {onclick: goog.bind(tweak.fireCallbacks, tweak)},
      label);
};


/**
 * Creates the DOM element to control the given entry.
 * @param {!BaseEntry} entry The entry.
 * @return {!Element|!DocumentFragment} The DOM element.
 * @private
 */
EntriesPanel.prototype.createTweakEntryDom_ = function(entry) {
  var label = TweakUi.getNamespacedLabel_(entry);
  if (entry instanceof BooleanSetting) {
    return this.createBooleanSettingDom_(entry, label);
  } else if (entry instanceof BooleanGroup) {
    var childEntries = TweakUi.extractBooleanGroupEntries_(entry);
    return this.createSubPanelDom_(entry, label, childEntries);
  } else if (entry instanceof StringSetting) {
    /**
     * @this {Element}
     * @suppress {strictMissingProperties} Added to tighten compiler checks
     */
    var setValueFunc = function() {
      entry.setValue(this.value);
    };
    return entry.getValidValues() ?
        this.createComboBoxDom_(entry, label, setValueFunc) :
        this.createTextBoxDom_(entry, label, setValueFunc);
  } else if (entry instanceof NumericSetting) {
    /**
     * @this {Element}
     * @suppress {strictMissingProperties} Added to tighten compiler checks
     */
    setValueFunc = function() {
      // Reset the value if it's not a number.
      if (isNaN(this.value)) {
        /**
         * @suppress {strictMissingProperties} Added to tighten compiler checks
         */
        this.value = entry.getNewValue();
      } else {
        entry.setValue(+this.value);
      }
    };
    return entry.getValidValues() ?
        this.createComboBoxDom_(entry, label, setValueFunc) :
        this.createTextBoxDom_(entry, label, setValueFunc);
  } else if (entry instanceof NamespaceEntry_) {
    return this.createSubPanelDom_(entry, entry.label, entry.entries);
  }
  asserts.assertInstanceof(
      entry, ButtonAction, 'invalid entry: %s', entry);
  return this.createButtonActionDom_(
      /** @type {!ButtonAction} */ (entry), label);
};



/**
 * Entries used to represent the collapsible namespace links. These entries are
 * never registered with the TweakRegistry, but are contained within the
 * collection of entries within TweakPanels.
 * @param {string} namespace The namespace for the entry.
 * @param {!Array<!BaseEntry>} entries Entries within the namespace.
 * @constructor
 * @extends {BaseEntry}
 * @private
 */
function NamespaceEntry_(namespace, entries) {
  BaseEntry.call(
      this, NamespaceEntry_.ID_PREFIX + namespace,
      'Tweaks within the ' + namespace + ' namespace.');

  /**
     * Entries within this namespace.
     * @type {!Array<!BaseEntry>}
     */
  this.entries = entries;

  this.label = namespace;
}
goog.inherits(NamespaceEntry_, BaseEntry);


/**
 * Prefix for the IDs of namespace entries used to ensure that they do not
 * conflict with regular entries.
 * @type {string}
 */
NamespaceEntry_.ID_PREFIX = '!';
