/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Role } from '../a11y/aria/roles.js';
import { TabRenderer } from './tabrenderer.js';
import { Tab as UiTab } from './tab.js';
import * as classlist from '../dom/classlist.js';
import * as dom from '../dom/dom.js';
import rendererasserts from '../testing/ui/rendererasserts.js';
import { testSuite } from '../testing/testsuite.js';
import * as testingDom from '../testing/dom.js';

let sandbox;
let renderer;
let tab;

testSuite({
  setUp() {
    sandbox = dom.getElement('sandbox');
    renderer = TabRenderer.getInstance();
    tab = new UiTab('Hello');
  },

  tearDown() {
    tab.dispose();
    dom.removeChildren(sandbox);
  },

  testConstructor() {
    assertNotNull('Renderer must not be null', renderer);
  },

  testGetCssClass() {
    assertEquals(
        'CSS class must have expected value', TabRenderer.CSS_CLASS,
        renderer.getCssClass());
  },

  testGetAriaRole() {
    assertEquals(
        'ARIA role must have expected value', Role.TAB, renderer.getAriaRole());
  },

  testCreateDom() {
    const element = renderer.createDom(tab);
    assertNotNull('Element must not be null', element);
    testingDom.assertHtmlMatches(
        '<div class="goog-tab">Hello</div>', dom.getOuterHtml(element));
  },

  testCreateDomWithTooltip() {
    tab.setTooltip('Hello, world!');
    const element = renderer.createDom(tab);
    assertNotNull('Element must not be null', element);
    assertEquals(
        'Element must have expected tooltip', 'Hello, world!',
        renderer.getTooltip(element));
  },

  testRender() {
    tab.setRenderer(renderer);
    tab.render();
    const element = tab.getElementStrict();
    assertNotNull('Element must not be null', element);
    assertEquals(
        'aria-selected should be false', 'false',
        element.getAttribute('aria-selected'));
  },

  testDecorate() {
    sandbox.innerHTML = '<div id="foo">Foo</div>\n' +
        '<div id="bar" title="Yes">Bar</div>';

    const foo = renderer.decorate(tab, dom.getElement('foo'));
    assertNotNull('Decorated element must not be null', foo);
    assertSameElements(
        'Decorated element must have expected class', ['goog-tab'],
        classlist.get(foo));
    assertEquals(
        'Decorated tab must have expected content', 'Foo',
        tab.getContent().nodeValue);
    assertUndefined('Decorated tab must not have tooltip', tab.getTooltip());
    assertEquals(
        'Decorated element must not have title', '', renderer.getTooltip(foo));

    const bar = renderer.decorate(tab, dom.getElement('bar'));
    assertNotNull('Decorated element must not be null', bar);
    assertSameElements(
        'Decorated element must have expected class', ['goog-tab'],
        classlist.get(bar));
    assertEquals(
        'Decorated tab must have expected content', 'Bar',
        tab.getContent().nodeValue);
    assertEquals(
        'Decorated tab must have expected tooltip', 'Yes', tab.getTooltip());
    assertEquals(
        'Decorated element must have expected title', 'Yes',
        renderer.getTooltip(bar));
  },

  testGetTooltip() {
    sandbox.innerHTML = '<div id="foo">Foo</div>\n' +
        '<div id="bar" title="">Bar</div>\n' +
        '<div id="baz" title="BazTitle">Baz</div>';
    assertEquals(
        'getTooltip() must return empty string for no title', '',
        renderer.getTooltip(dom.getElement('foo')));
    assertEquals(
        'getTooltip() must return empty string for empty title', '',
        renderer.getTooltip(dom.getElement('bar')));
    assertEquals(
        'Tooltip must have expected value', 'BazTitle',
        renderer.getTooltip(dom.getElement('baz')));
  },

  /**
     @suppress {strictMissingProperties} suppression added to enable type
     checking
   */
  testSetTooltip() {
    sandbox.innerHTML = '<div id="foo">Foo</div>';
    const element = dom.getElement('foo');

    renderer.setTooltip(null, null);  // Must not error.

    renderer.setTooltip(element, null);
    assertEquals('Tooltip must be the empty string', '', element.title);

    renderer.setTooltip(element, '');
    assertEquals('Tooltip must be the empty string', '', element.title);

    renderer.setTooltip(element, 'Foo');
    assertEquals('Tooltip must have expected value', 'Foo', element.title);
  },

  testDoesntCallGetCssClassInConstructor() {
    rendererasserts.assertNoGetCssClassCallsInConstructor(TabRenderer);
  },
});
