/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Component } from './component.js';
import { INLINE_BLOCK_CLASSNAME } from './cssnames.js';
import { TagName } from '../dom/tagname.js';
import { ToolbarSeparator } from './toolbarseparator.js';
import { ToolbarSeparatorRenderer } from './toolbarseparatorrenderer.js';
import * as classlist from '../dom/classlist.js';
import * as dom from '../dom/dom.js';
import { testSuite } from '../testing/testsuite.js';

let parent;
let renderer;
let separator;

testSuite({
  setUp() {
    parent = dom.getElement('parent');
    renderer = ToolbarSeparatorRenderer.getInstance();
    separator = new ToolbarSeparator(renderer);
  },

  tearDown() {
    separator.dispose();
    dom.removeChildren(parent);
  },

  testConstructor() {
    assertNotNull('Renderer must not be null', renderer);
  },

  testGetCssClass() {
    assertEquals(
        'getCssClass() must return expected value',
        ToolbarSeparatorRenderer.CSS_CLASS, renderer.getCssClass());
  },

  /** @suppress {visibility} suppression added to enable type checking */
  testCreateDom() {
    const element = renderer.createDom(separator);
    assertNotNull('Created element must not be null', element);
    assertEquals(
        'Created element must be a DIV', String(TagName.DIV), element.tagName);
    assertSameElements(
        'Created element must have expected class names',
        [
          ToolbarSeparatorRenderer.CSS_CLASS,
          // Separators are always in a disabled state.
          renderer.getClassForState(Component.State.DISABLED),
          INLINE_BLOCK_CLASSNAME,
        ],
        classlist.get(element));
  },

  testCreateDomWithExtraCssClass() {
    separator.addClassName('another-class');
    const element = renderer.createDom(separator);
    assertContains(
        'Created element must contain extra CSS classes', 'another-class',
        classlist.get(element));
  },
});
