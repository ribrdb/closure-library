/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Emoji } from '../../ui/emoji/emoji.js';
import { Emoticons } from './emoticons.js';
import { Field } from '../field.js';
import { TagName } from '../../dom/tagname.js';
import { Uri } from '../../uri/uri.js';
import * as dom from '../../dom/dom.js';
import { testSuite } from '../../testing/testsuite.js';
import * as userAgent from '../../useragent/useragent.js';

let HTML;

function assertUriEquals(expected, actual) {
  const winUri = new Uri(window.location);
  assertEquals(
      winUri.resolve(new Uri(expected)).toString(),
      winUri.resolve(new Uri(actual)).toString());
}
testSuite({
  setUp() {
    HTML = dom.getElement('parent').innerHTML;
  },

  tearDown() {
    dom.getElement('parent').innerHTML = HTML;
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testEmojiWithEmoticonsPlugin() {
    const plugin = new Emoticons();
    const field = new Field('testField');
    field.registerPlugin(plugin);
    field.makeEditable();
    field.focusAndPlaceCursorAtStart();

    const src = 'testdata/emoji/4F4.gif';
    const id = '4F4';
    const emoji = new Emoji(src, id);
    field.execCommand(Emoticons.COMMAND, emoji);

    // The url may be relative or absolute.
    const imgs =
        field.getEditableDomHelper().getElementsByTagNameAndClass(TagName.IMG);
    assertEquals(1, imgs.length);

    const img = imgs[0];
    assertUriEquals(src, img.getAttribute('src'));
    assertEquals(id, img.getAttribute(Emoji.ATTRIBUTE));
    assertEquals(id, img.getAttribute(Emoji.DATA_ATTRIBUTE));

    const range = field.getRange();
    assertNotNull('must have a selection', range);
    assertTrue('range must be a cursor', range.isCollapsed());

    if (!userAgent.IE) {
      const webkitValid = (2 == range.getStartOffset());
      const otherValid =
          (2 ==
           Array.prototype.indexOf.call(
               range.getContainerElement().childNodes, range.getStartNode()));

      assertTrue('range starts after image', webkitValid || otherValid);
    }

    assertEquals(
        'range must be around image', img.parentElement,
        range.getContainerElement());
  },
});
