/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { AnchoredPosition } from './anchoredposition.js';
import { Corner, Overflow } from './positioning.js';
import * as googDom from '../dom/dom.js';
import * as style from '../style/style.js';
import { testSuite } from '../testing/testsuite.js';

let anchor;
let doc;
let dom;
let frame;
let popup;
let viewportSize;

const popupLength = 20;
const anchorLength = 100;

// No enough space at the bottom and no overflow adjustment.

// No enough space at the bottom and ADJUST_Y overflow adjustment.

testSuite({
  setUp() {
    frame = document.getElementById('frame1');
    doc = googDom.getFrameContentDocument(frame);
    dom = googDom.getDomHelper(doc);
    viewportSize = dom.getViewportSize();
    anchor = dom.getElement('anchor');
    popup = dom.getElement('popup');
    style.setSize(popup, popupLength, popupLength);
    style.setPosition(popup, popupLength, popupLength);
    style.setSize(anchor, anchorLength, anchorLength);
  },

  testRepositionWithDefaultOverflow() {
    const avp = new AnchoredPosition(anchor, Corner.BOTTOM_LEFT);
    const newTop = viewportSize.height - anchorLength;
    style.setPosition(anchor, 50, newTop);
    const anchorRect = style.getBounds(anchor);

    avp.reposition(popup, Corner.TOP_LEFT);
    const popupRect = style.getBounds(popup);
    assertEquals(anchorRect.top + anchorRect.height, popupRect.top);
  },

  testRepositionWithOverflow() {
    const avp =
        new AnchoredPosition(anchor, Corner.BOTTOM_LEFT, Overflow.ADJUST_Y);
    const newTop = viewportSize.height - anchorLength;
    style.setPosition(anchor, 50, newTop);
    const anchorRect = style.getBounds(anchor);

    avp.reposition(popup, Corner.TOP_LEFT);
    const popupRect = style.getBounds(popup);
    assertEquals(
        anchorRect.top + anchorRect.height, popupRect.top + popupRect.height);
  },
});
