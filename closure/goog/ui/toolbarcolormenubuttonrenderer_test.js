/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { RendererHarness } from '../testing/ui/rendererharness.js';
import { ToolbarColorMenuButton } from './toolbarcolormenubutton.js';
import { ToolbarColorMenuButtonRenderer } from './toolbarcolormenubuttonrenderer.js';
import * as dom from '../dom/dom.js';
import rendererasserts from '../testing/ui/rendererasserts.js';
import { testSuite } from '../testing/testsuite.js';

let harness;

testSuite({
  setUp() {
    harness = new RendererHarness(
        ToolbarColorMenuButtonRenderer.getInstance(), dom.getElement('parent'),
        dom.getElement('decoratedButton'));
  },

  tearDown() {
    harness.dispose();
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testEquality() {
    harness.attachControlAndRender(new ToolbarColorMenuButton('Foo'));
    harness.attachControlAndDecorate(new ToolbarColorMenuButton());
    harness.assertDomMatches();
  },

  testDoesntCallGetCssClassInConstructor() {
    rendererasserts.assertNoGetCssClassCallsInConstructor(
        ToolbarColorMenuButtonRenderer);
  },
});
