/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { AbstractRange } from './abstractrange.js';
import { Const } from '../string/const.js';
import * as Range from './range.js';
import { TagName } from './tagname.js';
import { TrustedResourceUrl } from '../html/trustedresourceurl.js';
import * as dom from './dom.js';
import * as safe from './safe.js';
import { testSuite } from '../testing/testsuite.js';


testSuite({

  testCorrectDocument() {
    const aFrame = createTestFrame();
    document.body.appendChild(aFrame);
    const bFrame = createTestFrame();
    document.body.appendChild(bFrame);
    try {
      const a = aFrame.contentWindow;
      const b = bFrame.contentWindow;
      a.document.body.setAttribute('contenteditable', true);
      a.document.body.textContent = 'asdf';
      b.document.body.setAttribute('contenteditable', true);
      b.document.body.textContent = 'asdf';

      a.document.body.focus();
      let selection = AbstractRange.getBrowserSelectionForWindow(a);
      assertNotNull('Selection must not be null', selection);
      /** @suppress {checkTypes} suppression added to enable type checking */
      let range = Range.createFromBrowserSelection(selection);
      assertEquals(
          'getBrowserSelectionForWindow must return selection in the ' +
              'correct document',
          a.document, range.getDocument());

      // This is intended to trip up Internet Explorer --
      // see http://b/2048934
      b.document.body.focus();
      selection = /** @type {?{rangeCount: number}} */ (
          AbstractRange.getBrowserSelectionForWindow(a));
      // Some (non-IE) browsers keep a separate selection state for each
      // document in the same browser window. That's fine, as long as the
      // selection object requested from the window object is correctly
      // associated with that window's document.
      if (selection != null && selection.rangeCount != 0) {
        range = Range.createFromBrowserSelection(selection);
        assertEquals(
            'getBrowserSelectionForWindow must return selection in ' +
                'the correct document',
            a.document, range.getDocument());
      } else {
        assertTrue(selection == null || selection.rangeCount == 0);
      }
    } finally {
      dom.removeNode(aFrame);
      dom.removeNode(bFrame);
    }
  },

  testSelectionIsControlRange() {
    const frame = createTestFrame();
    document.body.appendChild(frame);
    try {
      const c = frame.contentWindow;
      c.document.body.setAttribute('contenteditable', true);
      c.document.body.appendChild(c.document.createElement('img'));

      // Only IE supports control ranges
      if (c.document.body.createControlRange) {
        const controlRange = c.document.body.createControlRange();
        controlRange.add(dom.getElementsByTagName(TagName.IMG, c.document)[0]);
        controlRange.select();
        const selection = AbstractRange.getBrowserSelectionForWindow(c);
        assertNotNull('Selection must not be null', selection);
      }
    } finally {
      dom.removeNode(frame);
    }
  },
});

/**
 * @return {!HTMLIFrameElement}
 */
function createTestFrame() {
  const frame = dom.createDom(TagName.IFRAME);
  safe.setIframeSrc(
      frame, TrustedResourceUrl.fromConstant(Const.from('about:blank')));
  return frame;
}