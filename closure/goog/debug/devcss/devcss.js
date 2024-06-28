/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Runtime development CSS Compiler emulation, via javascript.
 * This class provides an approximation to CSSCompiler's functionality by
 * hacking the live CSSOM.
 * This code is designed  to be inserted in the DOM immediately after the last
 * style block in HEAD when in development mode, i.e. you are not using a
 * running instance of a CSS Compiler to pass your CSS through.
 */

import * as asserts from '../../asserts/asserts.js';

import * as cssom from '../../cssom/cssom.js';
import * as classlist from '../../dom/classlist.js';
import * as events from '../../events/events.js';
import { EventType } from '../../events/eventtype.js';
import * as googString from '../../string/string.js';
import * as userAgent from '../../useragent/useragent.js';



/**
 * A class for solving development CSS issues/emulating the CSS Compiler.
 * @param {DevCss.UserAgent=} opt_userAgent The user agent, if not
 *     passed in, will be determined using userAgent.
 * @param {number|string=} opt_userAgentVersion The user agent's version.
 *     If not passed in, will be determined using userAgent.
 * @throws {Error} When userAgent detection fails.
 * @constructor
 * @final
 */
export function DevCss(opt_userAgent, opt_userAgentVersion) {
  if (!opt_userAgent) {
    // Walks through the known goog.userAgents.
    if (userAgent.IE) {
      opt_userAgent = DevCss.UserAgent.IE;
    } else if (userAgent.GECKO) {
      opt_userAgent = DevCss.UserAgent.GECKO;
    } else if (userAgent.WEBKIT) {
      opt_userAgent = DevCss.UserAgent.WEBKIT;
    } else if (userAgent.MOBILE) {
      opt_userAgent = DevCss.UserAgent.MOBILE;
    } else if (userAgent.EDGE) {
      opt_userAgent = DevCss.UserAgent.EDGE;
    }
  }
  switch (opt_userAgent) {
    case DevCss.UserAgent.IE:
    case DevCss.UserAgent.GECKO:
    case DevCss.UserAgent.FIREFOX:
    case DevCss.UserAgent.WEBKIT:
    case DevCss.UserAgent.SAFARI:
    case DevCss.UserAgent.MOBILE:
    case DevCss.UserAgent.EDGE:
      break;
    default:
      throw new Error(
          'Could not determine the user agent from known UserAgents');
  }

  /**
     * One of DevCss.UserAgent.
     * @type {string}
     * @private
     */
  this.userAgent_ = opt_userAgent;

  /**
   * @const @private
   */
  this.userAgentTokens_ = {};

  /**
   * @type {number|string}
   * @private
   */
  this.userAgentVersion_ = opt_userAgentVersion || userAgent.VERSION;
  this.generateUserAgentTokens_();

  /**
   * @type {boolean}
   * @private
   */
  this.isIe6OrLess_ = this.userAgent_ == DevCss.UserAgent.IE &&
      googString.compareVersions('7', this.userAgentVersion_) > 0;

  if (this.isIe6OrLess_) {
    /**
     * @type {Array<{classNames,combinedClassName,els}>}
     * @private
     */
    this.ie6CombinedMatches_ = [];
  }
}


/**
 * Rewrites the CSSOM as needed to activate any useragent-specific selectors.
 * @param {boolean=} opt_enableIe6ReadyHandler If true(the default), and the
 *     userAgent is ie6, we set a document "ready" event handler to walk the DOM
 *     and make combined selector className changes. Having this parameter also
 *     aids unit testing.
 */
DevCss.prototype.activateBrowserSpecificCssRules = function(
    opt_enableIe6ReadyHandler) {
  const enableIe6EventHandler = (opt_enableIe6ReadyHandler !== undefined) ?
      opt_enableIe6ReadyHandler :
      true;
  let cssRules = cssom.getAllCssStyleRules();

  for (let i = 0, cssRule; cssRule = cssRules[i]; i++) {
    this.replaceBrowserSpecificClassNames_(cssRule);
  }

  // Since we may have manipulated the rules above, we'll have to do a
  // complete sweep again if we're in IE6. Luckily performance doesn't
  // matter for this tool.
  if (this.isIe6OrLess_) {
    cssRules = cssom.getAllCssStyleRules();
    for (let i = 0, cssRule; cssRule = cssRules[i]; i++) {
      this.replaceIe6CombinedSelectors_(cssRule);
    }
  }

  // Add an event listener for document ready to rewrite any necessary
  // combined classnames in IE6.
  if (this.isIe6OrLess_ && enableIe6EventHandler) {
    events.listen(
        document, EventType.LOAD,
        goog.bind(this.addIe6CombinedClassNames_, this));
  }
};


/**
 * A list of possible user agent strings.
 * @enum {string}
 */
DevCss.UserAgent = {
  OPERA: 'OPERA',
  IE: 'IE',
  GECKO: 'GECKO',
  FIREFOX: 'GECKO',
  WEBKIT: 'WEBKIT',
  SAFARI: 'WEBKIT',
  MOBILE: 'MOBILE',
  EDGE: 'EDGE'
};


/**
 * A list of strings that may be used for matching in CSS files/development.
 * @enum {string}
 * @private
 */
DevCss.CssToken_ = {
  USERAGENT: 'USERAGENT',
  SEPARATOR: '-',
  LESS_THAN: 'LT',
  GREATER_THAN: 'GT',
  LESS_THAN_OR_EQUAL: 'LTE',
  GREATER_THAN_OR_EQUAL: 'GTE',
  IE6_SELECTOR_TEXT: 'goog-ie6-selector',
  IE6_COMBINED_GLUE: '_'
};


/**
 * Generates user agent token match strings with comparison and version bits.
 * For example:
 *   userAgentTokens_.ANY will be like 'GECKO'
 *   userAgentTokens_.LESS_THAN will be like 'GECKO-LT3' etc...
 * @private
 */
DevCss.prototype.generateUserAgentTokens_ = function() {
  this.userAgentTokens_.ANY = DevCss.CssToken_.USERAGENT +
      DevCss.CssToken_.SEPARATOR + this.userAgent_;
  this.userAgentTokens_.EQUALS =
      this.userAgentTokens_.ANY + DevCss.CssToken_.SEPARATOR;
  this.userAgentTokens_.LESS_THAN = this.userAgentTokens_.ANY +
      DevCss.CssToken_.SEPARATOR +
      DevCss.CssToken_.LESS_THAN;
  this.userAgentTokens_.LESS_THAN_OR_EQUAL = this.userAgentTokens_.ANY +
      DevCss.CssToken_.SEPARATOR +
      DevCss.CssToken_.LESS_THAN_OR_EQUAL;
  this.userAgentTokens_.GREATER_THAN = this.userAgentTokens_.ANY +
      DevCss.CssToken_.SEPARATOR +
      DevCss.CssToken_.GREATER_THAN;
  this.userAgentTokens_.GREATER_THAN_OR_EQUAL = this.userAgentTokens_.ANY +
      DevCss.CssToken_.SEPARATOR +
      DevCss.CssToken_.GREATER_THAN_OR_EQUAL;
};


/**
 * Gets the version number bit from a selector matching userAgentToken.
 * @param {string} selectorText The selector text of a CSS rule.
 * @param {string} userAgentToken Includes the LTE/GTE bit to see if it matches.
 * @return {string|undefined} The version number.
 * @private
 */
DevCss.prototype.getVersionNumberFromSelectorText_ = function(
    selectorText, userAgentToken) {
  const regex = new RegExp(userAgentToken + '([\\d\\.]+)');
  const matches = regex.exec(selectorText);
  if (matches && matches.length == 2) {
    return matches[1];
  }
};


/**
 * Extracts a rule version from the selector text, and if it finds one, calls
 * compareVersions against it and the passed in token string to provide the
 * value needed to determine if we have a match or not.
 * @param {CSSRule} cssRule The rule to test against.
 * @param {string} token The match token to test against the rule.
 * @return {!Array|undefined} A tuple with the result of the compareVersions
 *     call and the matched ruleVersion.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DevCss.prototype.getRuleVersionAndCompare_ = function(
    cssRule, token) {
  if (!cssRule.selectorText || !cssRule.selectorText.match(token)) {
    return;
  }
  const ruleVersion =
      this.getVersionNumberFromSelectorText_(cssRule.selectorText, token);
  if (!ruleVersion) {
    return;
  }

  const comparison =
      googString.compareVersions(this.userAgentVersion_, ruleVersion);
  return [comparison, ruleVersion];
};


/**
 * Replaces a CSS selector if we have matches based on our useragent/version.
 * Example: With a selector like ".USERAGENT-IE-LTE6 .class { prop: value }" if
 * we are running IE6 we'll end up with ".class { prop: value }", thereby
 * "activating" the selector.
 * @param {CSSRule} cssRule The cssRule to potentially replace.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
DevCss.prototype.replaceBrowserSpecificClassNames_ = function(
    cssRule) {
  // If we don't match the browser token, we can stop now.
  if (!cssRule.selectorText ||
      !cssRule.selectorText.match(this.userAgentTokens_.ANY)) {
    return;
  }

  // We know it will begin as a classname.
  let additionalRegexString;

  // Tests "Less than or equals".
  let compared = this.getRuleVersionAndCompare_(
      cssRule, this.userAgentTokens_.LESS_THAN_OR_EQUAL);
  if (compared && compared.length) {
    if (compared[0] > 0) {
      return;
    }
    additionalRegexString =
        this.userAgentTokens_.LESS_THAN_OR_EQUAL + compared[1];
  }

  // Tests "Less than".
  compared =
      this.getRuleVersionAndCompare_(cssRule, this.userAgentTokens_.LESS_THAN);
  if (compared && compared.length) {
    if (compared[0] > -1) {
      return;
    }
    additionalRegexString = this.userAgentTokens_.LESS_THAN + compared[1];
  }

  // Tests "Greater than or equals".
  compared = this.getRuleVersionAndCompare_(
      cssRule, this.userAgentTokens_.GREATER_THAN_OR_EQUAL);
  if (compared && compared.length) {
    if (compared[0] < 0) {
      return;
    }
    additionalRegexString =
        this.userAgentTokens_.GREATER_THAN_OR_EQUAL + compared[1];
  }

  // Tests "Greater than".
  compared = this.getRuleVersionAndCompare_(
      cssRule, this.userAgentTokens_.GREATER_THAN);
  if (compared && compared.length) {
    if (compared[0] < 1) {
      return;
    }
    additionalRegexString = this.userAgentTokens_.GREATER_THAN + compared[1];
  }

  // Tests "Equals".
  compared =
      this.getRuleVersionAndCompare_(cssRule, this.userAgentTokens_.EQUALS);
  if (compared && compared.length) {
    if (compared[0] != 0) {
      return;
    }
    additionalRegexString = this.userAgentTokens_.EQUALS + compared[1];
  }

  // If we got to here without generating the additionalRegexString, then
  // we did not match any of our comparison token strings, and we want a
  // general browser token replacement.
  if (!additionalRegexString) {
    additionalRegexString = this.userAgentTokens_.ANY;
  }

  // We need to match at least a single whitespace character to know that
  // we are matching the entire useragent string token.
  const regexString = '\\.' + additionalRegexString + '\\s+';
  const re = new RegExp(regexString, 'g');

  const currentCssText = cssom.getCssTextFromCssRule(cssRule);

  // Replacing the token with '' activates the selector for this useragent.
  const newCssText = currentCssText.replace(re, '');

  if (newCssText != currentCssText) {
    cssom.replaceCssRule(cssRule, newCssText);
  }
};


/**
 * Replaces IE6 combined selector rules with a workable development alternative.
 * IE6 actually parses .class1.class2 {} to simply .class2 {} which is nasty.
 * To fully support combined selectors in IE6 this function needs to be paired
 * with a call to replace the relevant DOM elements classNames as well.
 * @see {this.addIe6CombinedClassNames_}
 * @param {CSSRule} cssRule The rule to potentially fix.
 * @private
 */
DevCss.prototype.replaceIe6CombinedSelectors_ = function(cssRule) {
  // This match only ever works in IE because other UA's won't have our
  // IE6_SELECTOR_TEXT in the cssText property.
  if (cssRule.style && cssRule.style.cssText &&
      cssRule.style.cssText.match(
          DevCss.CssToken_.IE6_SELECTOR_TEXT)) {
    const cssText = cssom.getCssTextFromCssRule(cssRule);
    const combinedSelectorText = this.getIe6CombinedSelectorText_(cssText);
    if (combinedSelectorText) {
      const newCssText =
          combinedSelectorText + '{' + cssRule.style.cssText + '}';
      cssom.replaceCssRule(cssRule, newCssText);
    }
  }
};


/**
 * Gets the appropriate new combined selector text for IE6.
 * Also adds an entry onto ie6CombinedMatches_ with relevant info for the
 * likely following call to walk the DOM and rewrite the class attribute.
 * Example: With a selector like
 *     ".class2 { -goog-ie6-selector: .class1.class2; prop: value }".
 * this function will return:
 *     ".class1_class2 { prop: value }".
 * @param {string} cssText The CSS selector text and css rule text combined.
 * @return {?string} The rewritten css rule text.
 * @private
 */
DevCss.prototype.getIe6CombinedSelectorText_ = function(cssText) {
  const regex = new RegExp(
      DevCss.CssToken_.IE6_SELECTOR_TEXT +
          '\\s*:\\s*\\"([^\\"]+)\\"',
      'gi');
  const matches = regex.exec(cssText);
  if (matches) {
    const combinedSelectorText = matches[1];
    // To aid in later fixing the DOM, we need to split up the possible
    // selector groups by commas.
    const groupedSelectors = combinedSelectorText.split(/\s*\,\s*/);
    for (let i = 0, selector; selector = groupedSelectors[i]; i++) {
      // Strips off the leading ".".
      const combinedClassName = selector.slice(1);
      const classNames = combinedClassName.split(
          DevCss.CssToken_.IE6_COMBINED_GLUE);
      const entry = {
        classNames: classNames,
        combinedClassName: combinedClassName,
        els: []
      };
      this.ie6CombinedMatches_.push(entry);
    }
    return combinedSelectorText;
  }
  return null;
};


/**
 * Adds combined selectors with underscores to make them "work" in IE6.
 * @see {this.replaceIe6CombinedSelectors_}
 * @private
 */
DevCss.prototype.addIe6CombinedClassNames_ = function() {
  if (!this.ie6CombinedMatches_.length) {
    return;
  }
  const allEls = document.getElementsByTagName('*');
  // Match nodes for all classNames.
  for (let i = 0, classNameEntry; classNameEntry = this.ie6CombinedMatches_[i];
       i++) {
    for (let j = 0, el; el = allEls[j]; j++) {
      const classNamesLength = classNameEntry.classNames.length;
      for (let k = 0, className; className = classNameEntry.classNames[k];
           k++) {
        if (!classlist.contains(el, className)) {
          break;
        }
        if (k == classNamesLength - 1) {
          classNameEntry.els.push(el);
        }
      }
    }
    // Walks over our matching nodes and fixes them.
    if (classNameEntry.els.length) {
      for (let j = 0, el; el = classNameEntry.els[j]; j++) {
        asserts.assert(el);
        if (!classlist.contains(
                el, classNameEntry.combinedClassName)) {
          classlist.add(el, classNameEntry.combinedClassName);
        }
      }
    }
  }
};
