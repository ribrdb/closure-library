/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Button } from './button.js';
import { ButtonRenderer } from './buttonrenderer.js';
import { ButtonSide } from './buttonside.js';
import { Component } from './component.js';
import { ControlRenderer } from './controlrenderer.js';
import { ExpectedFailures } from '../testing/expectedfailures.js';
import { Role } from '../a11y/aria/roles.js';
import { State } from '../a11y/aria/attributes.js';
import { TagName } from '../dom/tagname.js';
import * as aria from '../a11y/aria/aria.js';
import * as classlist from '../dom/classlist.js';
import * as dom from '../dom/dom.js';
import rendererasserts from '../testing/ui/rendererasserts.js';
import { testSuite } from '../testing/testsuite.js';

let button;
let buttonRenderer;
let testRenderer;
let sandbox;
let expectedFailures;

/**
 * A subclass of ButtonRenderer that overrides
 * `getStructuralCssClass` for testing purposes.
 */
class TestRenderer extends ButtonRenderer {
  constructor() {
    super();
    ButtonRenderer.call(this);
  }

  /** @override */
  getStructuralCssClass() {
    return 'goog-base';
  }
}

goog.addSingletonGetter(TestRenderer);

testSuite({
  setUpPage() {
    sandbox = dom.getElement('sandbox');
    expectedFailures = new ExpectedFailures();
  },

  setUp() {
    buttonRenderer = ButtonRenderer.getInstance();
    button = new Button('Hello', buttonRenderer);
    testRenderer = TestRenderer.getInstance();
  },

  tearDown() {
    button.dispose();
    dom.removeChildren(sandbox);
    expectedFailures.handleTearDown();
  },

  testConstructor() {
    assertNotNull(
        'ButtonRenderer singleton instance must not be null', buttonRenderer);
  },

  testGetAriaRole() {
    assertEquals(
        'ButtonRenderer\'s ARIA role must have expected value', Role.BUTTON,
        buttonRenderer.getAriaRole());
  },

  testCreateDom() {
    let element = buttonRenderer.createDom(button);
    assertNotNull('Element must not be null', element);
    assertEquals('Element must be a DIV', String(TagName.DIV), element.tagName);
    assertHTMLEquals(
        'Element must have expected structure',
        '<div class="goog-button">Hello</div>', dom.getOuterHtml(element));

    button.setTooltip('Hello, world!');
    button.setValue('foo');
    element = buttonRenderer.createDom(button);
    assertNotNull('Element must not be null', element);
    assertEquals('Element must be a DIV', 'DIV', element.tagName);
    assertSameElements(
        'Element must have expected class name', ['goog-button'],
        classlist.get(element));
    assertEquals(
        'Element must have expected title', 'Hello, world!', element.title);
    assertUndefined('Element must have no value', element.value);
    assertEquals(
        'Element must have expected contents', 'Hello', element.innerHTML);

    button.setSupportedState(Component.State.CHECKED, true);
    element = buttonRenderer.createDom(button);
    assertEquals(
        'button\'s aria-pressed attribute must be false', 'false',
        aria.getState(element, State.PRESSED));
  },

  testSetTooltip() {
    button.createDom();
    button.setTooltip('tooltip');
    assertEquals('tooltip', button.getElement().title);
    button.setTooltip('');
    assertEquals('', button.getElement().title);
    // IE7 doesn't support hasAttribute.
    if (button.getElement().hasAttribute) {
      assertFalse(button.getElement().hasAttribute('title'));
    }
  },

  testCreateDomAriaState() {
    button.setSupportedState(Component.State.CHECKED, true);
    button.setChecked(true);
    const element = buttonRenderer.createDom(button);

    assertEquals(
        'button\'s aria-pressed attribute must be true', 'true',
        aria.getState(element, State.PRESSED));
  },

  testUseAriaPressedForSelected() {
    button.setSupportedState(Component.State.SELECTED, true);
    button.setSelected(true);
    button.setRenderer(buttonRenderer);
    button.render();
    const element = button.getElement();

    assertEquals(
        'button\'s aria-pressed attribute must be true', 'true',
        aria.getState(element, State.PRESSED));
    assertEquals(
        'button\'s aria-selected attribute must be empty', '',
        aria.getState(element, State.SELECTED));
  },

  testAriaDisabled() {
    button.setEnabled(false);
    button.setRenderer(buttonRenderer);
    button.render();
    const element = button.getElement();

    assertEquals(
        'button\'s aria-disabled attribute must be true', 'true',
        aria.getState(element, State.DISABLED));
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testDecorate() {
    sandbox.innerHTML = '<div id="foo">Foo</div>\n' +
        '<div id="bar" title="Hello, world!">Bar</div>\n' +
        '<div id="toggle">Toggle</div>';

    const foo = new Button(null, buttonRenderer);
    foo.decorate(dom.getElement('foo'));
    assertEquals(
        'foo\'s tooltip must be the empty string', '', foo.getTooltip());
    foo.dispose();

    const bar = new Button(null, buttonRenderer);
    bar.decorate(dom.getElement('bar'));
    assertEquals(
        'bar\'s tooltip must be initialized', 'Hello, world!',
        bar.getTooltip());
    bar.dispose();

    const toggle = new Button(null, buttonRenderer);
    toggle.setSupportedState(Component.State.CHECKED, true);
    const element = dom.getElement('toggle');
    assertNotNull(element);
    toggle.decorate(element);
    assertEquals(
        'toggle\'s aria-pressed attribute must be false', 'false',
        aria.getState(element, State.PRESSED));
    toggle.dispose();
  },

  /** @suppress {visibility} suppression added to enable type checking */
  testCollapse() {
    buttonRenderer.setCollapsed(button, ButtonSide.START);
    assertSameElements(
        'Button should have class to collapse start',
        ['goog-button-collapse-left'], button.getExtraClassNames());
    buttonRenderer.setCollapsed(button, ButtonSide.END);
    assertSameElements(
        'Button should have class to collapse end',
        ['goog-button-collapse-right'], button.getExtraClassNames());
    buttonRenderer.setCollapsed(button, ButtonSide.BOTH);
    assertSameElements(
        'Button should have classes to collapse both',
        ['goog-button-collapse-left', 'goog-button-collapse-right'],
        button.getExtraClassNames());
  },

  /** @suppress {visibility} suppression added to enable type checking */
  testCollapseRtl() {
    button.setRightToLeft(true);
    buttonRenderer.setCollapsed(button, ButtonSide.START);
    assertSameElements(
        'Button should have class to collapse start',
        ['goog-button-collapse-right'], button.getExtraClassNames());
    buttonRenderer.setCollapsed(button, ButtonSide.END);
    assertSameElements(
        'Button should have class to collapse end',
        ['goog-button-collapse-left'], button.getExtraClassNames());
    buttonRenderer.setCollapsed(button, ButtonSide.BOTH);
    assertSameElements(
        'Button should have classes to collapse both',
        ['goog-button-collapse-left', 'goog-button-collapse-right'],
        button.getExtraClassNames());
  },

  /** @suppress {visibility} suppression added to enable type checking */
  testCollapseWithStructuralClass() {
    testRenderer.setCollapsed(button, ButtonSide.BOTH);
    assertSameElements(
        'Should use structural class for collapse classes',
        ['goog-base-collapse-left', 'goog-base-collapse-right'],
        button.getExtraClassNames());
  },

  /** @suppress {visibility} suppression added to enable type checking */
  testUpdateAriaState() {
    const element = buttonRenderer.createDom(button);
    buttonRenderer.updateAriaState(element, Component.State.CHECKED, true);
    assertEquals(
        'Button must have pressed ARIA state', 'true',
        aria.getState(element, State.PRESSED));

    // Test for updating a state other than CHECKED
    buttonRenderer.updateAriaState(element, Component.State.DISABLED, true);
    assertEquals(
        'Button must have disabled ARIA state', 'true',
        aria.getState(element, State.DISABLED));

    buttonRenderer.updateAriaState(element, Component.State.CHECKED, false);
    assertEquals(
        'Control must no longer have pressed ARIA state', 'false',
        aria.getState(element, State.PRESSED));
    buttonRenderer.updateAriaState(element, Component.State.SELECTED, true);
    assertEquals(
        'Button must have pressed ARIA state', 'true',
        aria.getState(element, State.PRESSED));
  },

  testDoesntCallGetCssClassInConstructor() {
    rendererasserts.assertNoGetCssClassCallsInConstructor(ButtonRenderer);
  },
});
