/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Testing utilities for DOM related tests.
 */

goog.setTestOnly('goog.testing.dom');

import * as googArray from '../array/array.js';
import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { AbstractRange } from '../dom/abstractrange.js';
import { InputType } from '../dom/inputtype.js';
import { NodeIterator } from '../dom/nodeiterator.js';
import { NodeType } from '../dom/nodetype.js';
import { TagIterator } from '../dom/tagiterator.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import * as safe from '../dom/safe.js';
import * as uncheckedconversions from '../html/uncheckedconversions.js';
import * as iter from '../iter/iter.js';
import object from '../object/object.js';
import * as googString from '../string/string.js';
import { Const } from '../string/const.js';
import * as style from '../style/style.js';
import * as testingAsserts from './asserts.js';
import * as userAgent from '../useragent/useragent.js';


/**
 * @return {!Node} A DIV node with a unique ID identifying the
 *     `END_TAG_MARKER_`.
 * @private
 */
function createEndTagMarker_() {
  var marker = dom.createElement(TagName.DIV);
  marker.id = goog.getUid(marker);
  return marker;
}


/**
 * A unique object to use as an end tag marker.
 * @private {!Node}
 * @const
 */
var END_TAG_MARKER_ = createEndTagMarker_();


/**
 * Tests if the given iterator over nodes matches the given Array of node
 * descriptors.  Throws an error if any match fails.
 * @param {!iter.Iterator} it  An iterator over nodes.
 * @param {!Array<!Node|number|string>} array Array of node descriptors to match
 *     against.  Node descriptors can be any of the following:
 *         Node: Test if the two nodes are equal.
 *         number: Test node.nodeType == number.
 *         string starting with '#': Match the node's id with the text
 *             after "#".
 *         other string: Match the text node's contents.
 * @suppress {strictMissingProperties} charAt on union type
 */
export function assertNodesMatch(it, array) {
  let i = 0;
  function checkNode(node) {
    if (array.length <= i) {
      fail(
          'Got more nodes than expected: ' +
          describeNode_(node));
    }
    const expected = array[i];

    if (dom.isNodeLike(expected)) {
      assertEquals('Nodes should match at position ' + i, expected, node);
    } else if (typeof expected === 'number') {
      assertEquals(
          'Node types should match at position ' + i, expected, node.nodeType);
    } else if (expected.charAt(0) == '#') {
      assertEquals(
          'Expected element at position ' + i, NodeType.ELEMENT,
          node.nodeType);
      const expectedId = expected.slice(1);
      assertEquals('IDs should match at position ' + i, expectedId, node.id);

    } else {
      assertEquals(
          'Expected text node at position ' + i, NodeType.TEXT,
          node.nodeType);
      assertEquals(
          'Node contents should match at position ' + i, expected,
          node.nodeValue);
    }

    i++;
  }
  const iterator = iter.toIterator(it);
  const iterable = /** @type {!Iterable<?>} */ ({
    [Symbol.iterator]: () => iterator,
  });
  for (const node of iterable) {
    checkNode(node);
  }
  assertEquals('Used entire match array', array.length, i);
}


/**
 * Exposes a node as a string.
 * @param {Node} node A node.
 * @return {string} A string representation of the node.
 */
export function exposeNode(node) {
  node = /** @type {!Element} */ (node);
  var result = node.nodeName || node.nodeValue;
  if (node.id) {
    result += '#' + node.id;
  }
  result += ':"' + (node.innerHTML || '') + '"';
  return result;
}


/**
 * Exposes the nodes of a range wrapper as a string.
 * @param {AbstractRange} range A range.
 * @return {string} A string representation of the range.
 */
export function exposeRange(range) {
  // This is deliberately not implemented as
  // goog.dom.AbstractRange.prototype.toString, because it is non-authoritative.
  // Two equivalent ranges may have very different exposeRange values, and
  // two different ranges may have equal exposeRange values.
  // (The mapping of ranges to DOM nodes/offsets is a many-to-many mapping).
  if (!range) {
    return 'null';
  }
  return exposeNode(range.getStartNode()) + ':' +
      range.getStartOffset() + ' to ' +
      exposeNode(range.getEndNode()) + ':' +
      range.getEndOffset();
}


/**
 * Determines if the current user agent matches the specified string.  Returns
 * false if the string does specify at least one user agent but does not match
 * the running agent.
 * @param {string} userAgents Space delimited string of user agents.
 * @return {boolean} Whether the user agent was matched.  Also true if no user
 *     agent was listed in the expectation string.
 * @private
 */
function checkUserAgents_(userAgents) {
  if (googString.startsWith(userAgents, '!')) {
    if (googString.contains(userAgents, ' ')) {
      throw new Error('Only a single negative user agent may be specified');
    }
    return !userAgent[userAgents.slice(1)];
  }

  var agents = userAgents.split(' ');
  var hasUserAgent = false;
  for (var i = 0, len = agents.length; i < len; i++) {
    var cls = agents[i];
    if (cls in userAgent) {
      hasUserAgent = true;
      if (userAgent[cls]) {
        return true;
      }
    }
  }
  // If we got here, there was a user agent listed but we didn't match it.
  return !hasUserAgent;
}


/**
 * Map function that converts end tags to a specific object.
 * @param {Node} node The node to map.
 * @param {undefined} ignore Always undefined.
 * @param {!iter.Iterator<Node>} iterator The iterator.
 * @return {Node} The resulting iteration item.
 * @private
 */
function endTagMap_(node, ignore, iterator) {
  asserts.assertInstanceof(iterator, TagIterator);
  return iterator.isEndTag() ? END_TAG_MARKER_ : node;
}


/**
 * Check if the given node is important.
 *
 * A node is important if it is
 *   - a non-empty text node; or,
 *   - or an element annotated to match on this user agent; or,
 *   - a non-annotated element
 *
 * @param {Node} node The node to test.
 * @return {boolean} Whether this node should be included for iteration.
 * @private
 */
function nodeFilter_(node) {
  if (node.nodeType == NodeType.TEXT) {
    // If a node is part of a string of text nodes and it has spaces in it,
    // we allow it since it's going to affect the merging of nodes done below.
    if (googString.isBreakingWhitespace(node.nodeValue) &&
        (!node.previousSibling ||
         node.previousSibling.nodeType != NodeType.TEXT) &&
        (!node.nextSibling ||
         node.nextSibling.nodeType != NodeType.TEXT)) {
      return false;
    }
    // Allow optional text to be specified as [[BROWSER1 BROWSER2]]Text
    var match = node.nodeValue.match(/^\[\[(.+)\]\]/);
    if (match) {
      return checkUserAgents_(match[1]);
    }

    return true;
  }

  // This cast exists to preserve existing behaviour. It's risky, but fine as
  // long as we only access direct properties of `node`.
  var maybeElement = /** @type {!Element} */ (node);
  if (maybeElement.className && typeof maybeElement.className === 'string') {
    return checkUserAgents_(maybeElement.className);
  }

  return true;
}


/**
 * Determines the text to match from the given node, removing browser
 * specification strings.
 * @param {Node} node The node expected to match.
 * @return {string} The text, stripped of browser specification strings.
 * @private
 */
function getExpectedText_(node) {
  // Strip off the browser specifications.
  return node.nodeValue.match(/^(\[\[.+\]\])?([\s\S]*)/)[2];
}


/**
 * Describes the given node.
 * @param {Node} node The node to describe.
 * @return {string} A description of the node.
 * @private
 */
function describeNode_(node) {
  if (node.nodeType == NodeType.TEXT) {
    return '[Text: ' + node.nodeValue + ']';
  } else {
    // We can't actually be sure this is an Element, but other code depends on
    // us pretending it is.
    node = /** @type {!Element} */ (node);
    return '<' + node.tagName + (node.id ? ' #' + node.id : '') + ' .../>';
  }
}


/**
 * Assert that the html in `actual` is substantially similar to
 * htmlPattern.  This method tests for the same set of styles, for the same
 * order of nodes, and the presence of attributes.  Breaking whitespace nodes
 * are ignored.  Elements can be
 * annotated with classnames corresponding to keys in userAgent and will be
 * expected to show up in that user agent and expected not to show up in
 * others.
 * @param {string} htmlPattern The pattern to match.
 * @param {!Element} actual The element to check: its contents are matched
 *     against the HTML pattern.
 * @param {boolean=} opt_strictAttributes If false, attributes that appear in
 *     htmlPattern must be in actual, but actual can have attributes not
 *     present in htmlPattern.  If true, htmlPattern and actual must have the
 *     same set of attributes.  Default is false.
 */
export function assertHtmlContentsMatch(htmlPattern, actual, opt_strictAttributes) {
  var div = dom.createDom(TagName.DIV);

  safe.setInnerHtml(
      div,
      uncheckedconversions
          .safeHtmlFromStringKnownToSatisfyTypeContract(
              Const.from('HTML is never attached to DOM'),
              htmlPattern));

  var errorSuffix =
      '\nExpected\n' + div.innerHTML + '\nActual\n' + actual.innerHTML;

  var actualIt = iter.filter(
      iter.map(
          new TagIterator(actual), endTagMap_),
      nodeFilter_);

  var expectedIt = iter.filter(
      new NodeIterator(div), nodeFilter_);

  var actualNode;
  var preIterated = false;
  var advanceActualNode = function() {
    // If the iterator has already been advanced, don't advance it again.
    if (!preIterated) {
      actualNode = iter.nextOrValue(actualIt, null);
    }
    preIterated = false;

    // Advance the iterator so long as it is return end tags.
    while (actualNode == END_TAG_MARKER_) {
      actualNode = iter.nextOrValue(actualIt, null);
    }
  };


  var number = 0;
  iter.forEach(expectedIt, function(expectedNode) {
    advanceActualNode();
    assertNotNull(
        'Finished actual HTML before finishing expected HTML at ' +
            'node number ' + number + ': ' +
            describeNode_(expectedNode) + errorSuffix,
        actualNode);

    // Do no processing for expectedNode == div.
    if (expectedNode == div) {
      return;
    }

    assertEquals(
        'Should have the same node type, got ' +
            describeNode_(actualNode) + ' but expected ' +
            describeNode_(expectedNode) + '.' + errorSuffix,
        expectedNode.nodeType, actualNode.nodeType);

    if (expectedNode.nodeType == NodeType.ELEMENT) {
      var expectedElem = asserts.assertElement(expectedNode);
      var actualElem = asserts.assertElement(actualNode);

      assertEquals(
          'Tag names should match' + errorSuffix, expectedElem.tagName,
          actualElem.tagName);
      assertEquals(
          'Namespaces should match' + errorSuffix, expectedElem.namespaceURI,
          actualElem.namespaceURI);
      assertObjectEquals(
          'Should have same styles' + errorSuffix,
          style.parseStyleAttribute(expectedElem.style.cssText),
          style.parseStyleAttribute(actualElem.style.cssText));
      assertAttributesEqual_(
          errorSuffix, expectedElem, actualElem, !!opt_strictAttributes);

      // Contents of template tags belong to a separate document and are not
      // iterated on by the current iterator, unless the browser is too old to
      // treat template tags differently. We recursively assert equality of the
      // two template document fragments.
      if (actualElem.tagName == TagName.TEMPLATE) {
        // IE throws if HTMLTemplateElement is referenced at runtime.
        actualElem = /** @type {HTMLTemplateElement} */ (actualElem);
        if (actualElem.content) {
          assertHtmlMatches(
              expectedElem.innerHTML, actualElem.innerHTML,
              opt_strictAttributes);
        }
      }
    } else {
      // Concatenate text nodes until we reach a non text node.
      var actualText = actualNode.nodeValue;
      preIterated = true;
      while ((actualNode = iter.nextOrValue(actualIt, null)) &&
             actualNode.nodeType == NodeType.TEXT) {
        actualText += actualNode.nodeValue;
      }

      var expectedText = getExpectedText_(expectedNode);
      if ((actualText && !googString.isBreakingWhitespace(actualText)) ||
          (expectedText && !googString.isBreakingWhitespace(expectedText))) {
        var normalizedActual = actualText.replace(/\s+/g, ' ');
        var normalizedExpected = expectedText.replace(/\s+/g, ' ');

        assertEquals(
            'Text should match' + errorSuffix, normalizedExpected,
            normalizedActual);
      }
    }

    number++;
  });

  advanceActualNode();
  assertNull(
      'Finished expected HTML before finishing actual HTML' + errorSuffix,
      iter.nextOrValue(actualIt, null));
}


/**
 * Assert that the html in `actual` is substantially similar to
 * htmlPattern.  This method tests for the same set of styles, and for the same
 * order of nodes.  Breaking whitespace nodes are ignored.  Elements can be
 * annotated with classnames corresponding to keys in userAgent and will be
 * expected to show up in that user agent and expected not to show up in
 * others.
 * @param {string} htmlPattern The pattern to match.
 * @param {string} actual The html to check.
 * @param {boolean=} opt_strictAttributes If false, attributes that appear in
 *     htmlPattern must be in actual, but actual can have attributes not
 *     present in htmlPattern. If true, htmlPattern and actual must have the
 *     same set of attributes. Default is false.
 */
export function assertHtmlMatches(htmlPattern, actual, opt_strictAttributes) {
  var div = dom.createDom(TagName.DIV);

  safe.setInnerHtml(
      div,
      uncheckedconversions
          .safeHtmlFromStringKnownToSatisfyTypeContract(
              Const.from('HTML is never attached to DOM'), actual));

  assertHtmlContentsMatch(
      htmlPattern, div, opt_strictAttributes);
}


/**
 * Finds the first text node descendant of root with the given content.  Note
 * that this operates on a text node level, so if text nodes get split this
 * may not match the user visible text.  Using normalize() may help here.
 * @param {string|RegExp} textOrRegexp The text to find, or a regular
 *     expression to find a match of.
 * @param {Element} root The element to search in.
 * @return {?Node} The first text node that matches, or null if none is found.
 */
export function findTextNode(textOrRegexp, root) {
  var it = new NodeIterator(root);
  var ret = iter.nextOrValue(iter.filter(it, function(node) {
    if (node.nodeType == NodeType.TEXT) {
      if (typeof textOrRegexp === 'string') {
        return node.nodeValue == textOrRegexp;
      } else {
        return !!node.nodeValue.match(textOrRegexp);
      }
    } else {
      return false;
    }
  }), null);
  return ret;
}


/**
 * Assert the end points of a range.
 *
 * Notice that "Are two ranges visually identical?" and "Do two ranges have
 * the same endpoint?" are independent questions. Two visually identical ranges
 * may have different endpoints. And two ranges with the same endpoints may
 * be visually different.
 *
 * @param {Node} start The expected start node.
 * @param {number} startOffset The expected start offset.
 * @param {Node} end The expected end node.
 * @param {number} endOffset The expected end offset.
 * @param {AbstractRange} range The actual range.
 */
export function assertRangeEquals(start, startOffset, end, endOffset, range) {
  assertEquals('Unexpected start node', start, range.getStartNode());
  assertEquals('Unexpected end node', end, range.getEndNode());
  assertEquals('Unexpected start offset', startOffset, range.getStartOffset());
  assertEquals('Unexpected end offset', endOffset, range.getEndOffset());
}


/**
 * Gets the value of a DOM attribute in deterministic way.
 * @param {!Element} node A node.
 * @param {string} name Attribute name.
 * @return {*} Attribute value.
 * @private
 */
function getAttributeValue_(node, name) {
  // These hacks avoid nondetermistic results in the following cases:
  // WebKit: Two radio buttons with the same name can't be checked at the same
  //      time, even if only one of them is in the document.
  if (userAgent.WEBKIT && node.tagName == TagName.INPUT &&
      node['type'] == InputType.RADIO && name == 'checked') {
    return false;
  }

  // IE/Edge: cannot use node['src'] when the attribute contains HTTP
  // credentials. getAttribute works though.
  if ((userAgent.IE || userAgent.EDGE) && name == 'src') {
    return node.getAttribute(name);
  }

  // All browsers: some attributes return different values for getAttribute even
  // if the values are semantically equivalent. E.g. <div disabled=""> and
  // <div disabled="disabled"> should register as equal. We use node[name]
  // if it's available.
  return node[name] !== undefined &&
          typeof node.getAttribute(name) != typeof node[name] ?
      node[name] :
      node.getAttribute(name);
}


/**
 * Assert that the attributes of two Nodes are the same (ignoring any
 * instances of the style attribute).
 * @param {string} errorSuffix String to add to end of error messages.
 * @param {!Element} expectedElem The element whose attributes we are expecting.
 * @param {!Element} actualElem The element with the actual attributes.
 * @param {boolean} strictAttributes If false, attributes that appear in
 *     expectedNode must also be in actualNode, but actualNode can have
 *     attributes not present in expectedNode.  If true, expectedNode and
 *     actualNode must have the same set of attributes.
 * @private
 */
function assertAttributesEqual_(errorSuffix, expectedElem, actualElem, strictAttributes) {
  if (strictAttributes) {
    compareClassAttribute_(expectedElem, actualElem);
  }

  var expectedAttributes = expectedElem.attributes;
  var actualAttributes = actualElem.attributes;

  for (var i = 0, len = expectedAttributes.length; i < len; i++) {
    var expectedName = expectedAttributes[i].name;
    var expectedValue =
        getAttributeValue_(expectedElem, expectedName);

    var actualAttribute = actualAttributes[expectedName];
    var actualValue =
        getAttributeValue_(actualElem, expectedName);

    // IE enumerates attribute names in the expected node that are not present,
    // causing an undefined actualAttribute.
    if (!expectedValue && !actualValue) {
      continue;
    }

    if (expectedName == 'id' && userAgent.IE) {
      compareIdAttributeForIe_(
          /** @type {string} */ (expectedValue), actualAttribute,
          strictAttributes, errorSuffix);
      continue;
    }

    if (ignoreAttribute_(expectedName)) {
      continue;
    }

    assertNotUndefined(
        'Expected to find attribute with name ' + expectedName +
            ', in element ' + describeNode_(actualElem) +
            errorSuffix,
        actualAttribute);
    assertEquals(
        'Expected attribute ' + expectedName + ' has a different value ' +
            errorSuffix,
        String(expectedValue), String(
                                   getAttributeValue_(
                                       actualElem, actualAttribute.name)));
  }

  if (strictAttributes) {
    for (i = 0; i < actualAttributes.length; i++) {
      var actualName = actualAttributes[i].name;
      var actualAttribute = actualAttributes.getNamedItem(actualName);

      if (!actualAttribute || ignoreAttribute_(actualName)) {
        continue;
      }

      assertNotUndefined(
          'Unexpected attribute with name ' + actualName + ' in element ' +
              describeNode_(actualElem) + errorSuffix,
          expectedAttributes[actualName]);
    }
  }
}


/**
 * Assert the class attribute of actualElem is the same as the one in
 * expectedElem, ignoring classes that are useragents.
 * @param {!Element} expectedElem The DOM element whose class we expect.
 * @param {!Element} actualElem The DOM element with the actual class.
 * @private
 */
function compareClassAttribute_(expectedElem, actualElem) {
  var classes = classlist.get(expectedElem);

  var expectedClasses = [];
  for (var i = 0, len = classes.length; i < len; i++) {
    if (!(classes[i] in userAgent)) {
      expectedClasses.push(classes[i]);
    }
  }
  expectedClasses.sort();

  var actualClasses = googArray.toArray(classlist.get(actualElem));
  actualClasses.sort();

  assertArrayEquals(
      'Expected class was: ' + expectedClasses.join(' ') +
          ', but actual class was: ' + actualElem.className + ' in node ' +
          describeNode_(actualElem),
      expectedClasses, actualClasses);
}


/**
 * Set of attributes IE adds to elements randomly.
 * @type {Object}
 * @private
 */
var BAD_IE_ATTRIBUTES_ = object.createSet(
    'methods', 'CHECKED', 'dataFld', 'dataFormatAs', 'dataSrc');


/**
 * Whether to ignore the attribute.
 * @param {string} name Name of the attribute.
 * @return {boolean} True if the attribute should be ignored.
 * @private
 */
function ignoreAttribute_(name) {
  if (name == 'style' || name == 'class' || name == 'xmlns') {
    return true;
  }
  return userAgent.IE && BAD_IE_ATTRIBUTES_[name];
}


/**
 * Compare id attributes for IE.  In IE, if an element lacks an id attribute
 * in the original HTML, the element object will still have such an attribute,
 * but its value will be the empty string.
 * @param {string} expectedValue The expected value of the id attribute.
 * @param {Attr} actualAttribute The actual id attribute.
 * @param {boolean} strictAttributes Whether strict attribute checking should be
 *     done.
 * @param {string} errorSuffix String to append to error messages.
 * @private
 */
function compareIdAttributeForIe_(expectedValue, actualAttribute, strictAttributes, errorSuffix) {
  if (expectedValue === '') {
    if (strictAttributes) {
      assertTrue(
          'Unexpected attribute with name id in element ' + errorSuffix,
          actualAttribute.value == '');
    }
  } else {
    assertNotUndefined(
        'Expected to find attribute with name id, in element ' + errorSuffix,
        actualAttribute);
    assertNotEquals(
        'Expected to find attribute with name id, in element ' + errorSuffix,
        '', actualAttribute.value);
    assertEquals(
        'Expected attribute has a different value ' + errorSuffix,
        expectedValue, actualAttribute.value);
  }
}
