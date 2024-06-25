/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Component } from './component.js';
import { MenuItem } from './menuitem.js';
import { MenuItemRenderer } from './menuitemrenderer.js';
import { Role } from '../a11y/aria/roles.js';
import { State } from '../a11y/aria/attributes.js';
import * as aria from '../a11y/aria/aria.js';
import * as classlist from '../dom/classlist.js';
import * as dom from '../dom/dom.js';
import rendererasserts from '../testing/ui/rendererasserts.js';
import { testSuite } from '../testing/testsuite.js';

let sandbox;
let item;
let renderer;

testSuite({
  setUp() {
    sandbox = dom.getElement('sandbox');
    item = new MenuItem('Hello');
    renderer = MenuItemRenderer.getInstance();
  },

  tearDown() {
    item.dispose();
    dom.removeChildren(sandbox);
  },

  testMenuItemRenderer() {
    assertNotNull('Instance must not be null', renderer);
    assertEquals(
        'Singleton getter must always return same instance', renderer,
        MenuItemRenderer.getInstance());
  },

  testCreateDom() {
    const element = renderer.createDom(item);
    assertNotNull('Element must not be null', element);
    assertSameElements(
        'Element must have the expected class names', ['goog-menuitem'],
        classlist.get(element));
    assertEquals(
        'Element must have exactly one child element', 1,
        element.childNodes.length);
    assertHTMLEquals(
        'Child element must have the expected structure',
        '<div class="goog-menuitem-content">Hello</div>', element.innerHTML);
  },

  testCreateDomWithHoverState() {
    item.setHighlighted(true);
    const element = renderer.createDom(item);
    assertSameElements(
        'Element must have the expected class names',
        ['goog-menuitem', 'goog-menuitem-highlight'], classlist.get(element));
  },

  testCreateDomForCheckableItem() {
    item.setSupportedState(Component.State.CHECKED, true);
    item.render();
    const element = item.getElement();
    assertNotNull(element);
    assertSameElements(
        'Element must have the expected class names',
        ['goog-menuitem', 'goog-option'], classlist.get(element));
    assertEquals(
        'Element must have ARIA role menuitemcheckbox', Role.MENU_ITEM_CHECKBOX,
        aria.getRole(element));

    item.setChecked(true);
    assertTrue('Item must be checked', item.isChecked());
    assertSameElements(
        'Checked item must have the expected class names',
        ['goog-menuitem', 'goog-option', 'goog-option-selected'],
        classlist.get(element));
    assertEquals(
        'Item must have checked ARIA state', 'true',
        aria.getState(element, State.CHECKED));
  },

  testCreateUpdateDomForCheckableItem() {
    // Render the item first, then update its supported states to include
    // CHECKED.
    item.render();
    const element = item.getElement();
    item.setSupportedState(Component.State.CHECKED, true);
    assertNotNull(element);
    assertSameElements(
        'Element must have the expected class names',
        ['goog-menuitem', 'goog-option'], classlist.get(element));
    assertEquals(
        'Element must have ARIA role menuitemcheckbox', Role.MENU_ITEM_CHECKBOX,
        aria.getRole(element));

    // Now actually check the item.
    item.setChecked(true);
    assertTrue('Item must be checked', item.isChecked());
    assertSameElements(
        'Checked item must have the expected class names',
        ['goog-menuitem', 'goog-option', 'goog-option-selected'],
        classlist.get(element));
    assertEquals(
        'Item must have checked ARIA state', 'true',
        aria.getState(element, State.CHECKED));
  },

  testCreateDomForSelectableItem() {
    item.setSupportedState(Component.State.SELECTED, true);
    item.render();
    const element = item.getElement();
    assertNotNull(element);
    assertSameElements(
        'Element must have the expected class names',
        ['goog-menuitem', 'goog-option'], classlist.get(element));
    assertEquals(
        'Element must have ARIA role menuitemradio', Role.MENU_ITEM_RADIO,
        aria.getRole(element));

    item.setSelected(true);
    assertTrue('Item must be selected', item.isSelected());
    assertSameElements(
        'Selected item must have the expected class names',
        ['goog-menuitem', 'goog-option', 'goog-option-selected'],
        classlist.get(element));
    assertEquals(
        'Item must have selected ARIA state', 'true',
        aria.getState(element, State.CHECKED));
  },

  testCreateUpdateDomForSelectableItem() {
    // Render the item first, then update its supported states to include
    // SELECTED.
    item.render();
    const element = item.getElement();
    item.setSupportedState(Component.State.SELECTED, true);
    assertNotNull(element);
    assertSameElements(
        'Element must have the expected class names',
        ['goog-menuitem', 'goog-option'], classlist.get(element));
    assertEquals(
        'Element must have ARIA role menuitemradio', Role.MENU_ITEM_RADIO,
        aria.getRole(element));

    // Now actually select the item.
    item.setSelected(true);
    assertTrue('Item must be selected', item.isSelected());
    assertSameElements(
        'Selected item must have the expected class names',
        ['goog-menuitem', 'goog-option', 'goog-option-selected'],
        classlist.get(element));
    assertEquals(
        'Item must have selected ARIA state', 'true',
        aria.getState(element, State.CHECKED));
  },

  testGetContentElement() {
    assertNull(
        'Content element must be the null initially', item.getContentElement());
    item.createDom();
    assertEquals(
        'Content element must be the element\'s first child',
        item.getElement().firstChild, item.getContentElement());
  },

  testDecorate() {
    sandbox.innerHTML = '<div id="foo">Hello</div>';
    const foo = dom.getElement('foo');

    const element = renderer.decorate(item, foo);
    assertSameElements(
        'Element must have the expected class names', ['goog-menuitem'],
        classlist.get(element));
    assertEquals(
        'Element must have exactly one child element', 1,
        element.childNodes.length);
    assertHTMLEquals(
        'Child element must have the expected structure',
        '<div class="goog-menuitem-content">Hello</div>', element.innerHTML);
  },

  testDecorateWithContentStructure() {
    sandbox.innerHTML =
        '<div id="foo"><div class="goog-menuitem-content">Hello</div></div>';
    const foo = dom.getElement('foo');

    const element = renderer.decorate(item, foo);
    assertSameElements(
        'Element must have the expected class names', ['goog-menuitem'],
        classlist.get(element));
    assertEquals(
        'Element must have exactly one child element', 1,
        element.childNodes.length);
    assertHTMLEquals(
        'Child element must have the expected structure',
        '<div class="goog-menuitem-content">Hello</div>', element.innerHTML);
  },

  testDecorateWithHoverState() {
    sandbox.innerHTML =
        '<div id="foo" class="goog-menuitem-highlight">Hello</div>';
    const foo = dom.getElement('foo');

    assertFalse('Item must not be highlighted', item.isHighlighted());
    const element = renderer.decorate(item, foo);
    assertSameElements(
        'Element must have the expected class names',
        ['goog-menuitem', 'goog-menuitem-highlight'], classlist.get(element));
    assertTrue('Item must be highlighted', item.isHighlighted());
  },

  testDecorateCheckableItem() {
    sandbox.innerHTML = '<div id="foo" class="goog-option">Hello</div>';
    const foo = dom.getElement('foo');

    assertFalse(
        'Item must not be checkable',
        item.isSupportedState(Component.State.CHECKED));
    const element = renderer.decorate(item, foo);
    assertSameElements(
        'Element must have the expected class names',
        ['goog-menuitem', 'goog-option'], classlist.get(element));
    assertTrue(
        'Item must be checkable',
        item.isSupportedState(Component.State.CHECKED));
    assertHTMLEquals(
        'Child element must have the expected structure',
        '<div class="goog-menuitem-content">' +
            '<div class="goog-menuitem-checkbox"></div>Hello</div>',
        element.innerHTML);
  },

  testSetContent() {
    item.setSupportedState(Component.State.CHECKED, true);
    const element = renderer.createDom(item);
    assertHTMLEquals(
        'Child element must have the expected structure',
        '<div class="goog-menuitem-content">' +
            '<div class="goog-menuitem-checkbox"></div>Hello</div>',
        element.innerHTML);

    renderer.setContent(element, 'Goodbye');
    assertHTMLEquals(
        'Child element must have the expected structure',
        '<div class="goog-menuitem-content">' +
            '<div class="goog-menuitem-checkbox"></div>Goodbye</div>',
        element.innerHTML);
  },

  testDoesntCallGetCssClassInConstructor() {
    rendererasserts.assertNoGetCssClassCallsInConstructor(MenuItemRenderer);
  },
});
