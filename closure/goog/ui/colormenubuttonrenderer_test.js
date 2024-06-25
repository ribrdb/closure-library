/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ColorMenuButton } from './colormenubutton.js';
import { ColorMenuButtonRenderer } from './colormenubuttonrenderer.js';
import { RendererHarness } from '../testing/ui/rendererharness.js';
import { TagName } from '../dom/tagname.js';
import * as dom from '../dom/dom.js';
import rendererasserts from '../testing/ui/rendererasserts.js';
import { testSuite } from '../testing/testsuite.js';
import * as userAgent from '../useragent/useragent.js';

let harness;

testSuite({
  setUp() {
    harness = new RendererHarness(
        ColorMenuButtonRenderer.getInstance(), dom.getElement('parent'),
        dom.getElement('decoratedButton'));
  },

  tearDown() {
    harness.dispose();
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testEquality() {
    harness.attachControlAndRender(new ColorMenuButton('Foo'));
    harness.attachControlAndDecorate(new ColorMenuButton());
    harness.assertDomMatches();
  },

  testWrapCaption() {
    const caption = dom.createDom(TagName.DIV, null, 'Foo');
    const wrappedCaption =
        ColorMenuButtonRenderer.wrapCaption(caption, dom.getDomHelper());
    assertNotEquals(
        'Caption should have been wrapped', caption, wrappedCaption);
    assertEquals(
        'Wrapped caption should have indicator css class',
        'goog-color-menu-button-indicator', wrappedCaption.className);
  },

  testSetCaptionValue() {
    const caption = dom.createDom(TagName.DIV, null, 'Foo');
    const wrappedCaption =
        ColorMenuButtonRenderer.wrapCaption(caption, dom.getDomHelper());
    ColorMenuButtonRenderer.setCaptionValue(wrappedCaption, 'red');

    const expectedColor = userAgent.IE && !userAgent.isDocumentModeOrHigher(9) ?
        '#ff0000' :
        'rgb(255, 0, 0)';
    assertEquals(expectedColor, caption.style.borderBottomColor);
  },

  testDoesntCallGetCssClassInConstructor() {
    rendererasserts.assertNoGetCssClassCallsInConstructor(
        ColorMenuButtonRenderer);
  },
});
