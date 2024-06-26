/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { BasicTextFormatter } from './basictextformatter.js';
import { Field } from '../field.js';
import { KeyCodes } from '../../events/keycodes.js';
import { LinkBubble } from './linkbubble.js';
import { LinkShortcutPlugin } from './linkshortcutplugin.js';
import { PropertyReplacer } from '../../testing/propertyreplacer.js';
import { TagName } from '../../dom/tagname.js';
import * as dom from '../../dom/dom.js';
import * as events from '../../testing/events/events.js';
import * as product from '../../useragent/product.js';
import { testSuite } from '../../testing/testsuite.js';
import * as testingDom from '../../testing/dom.js';

let propertyReplacer;

testSuite({
  setUp() {
    propertyReplacer = new PropertyReplacer();
  },

  tearDown() {
    propertyReplacer.reset();
    const field = document.getElementById('cleanup');
    dom.removeChildren(field);
    field.innerHTML = '<div id="field">http://www.google.com/</div>';
  },

  testShortcutCreatesALink() {
    if (product.SAFARI) {
      // TODO(user): Disabled so we can get the rest of the Closure test
      // suite running in a continuous build. Will investigate later.
      return;
    }

    propertyReplacer.set(window, 'prompt', () => 'http://www.google.com/');
    const linkBubble = new LinkBubble();
    const formatter = new BasicTextFormatter();
    const plugin = new LinkShortcutPlugin();
    const fieldEl = document.getElementById('field');
    const field = new Field('field');
    field.registerPlugin(formatter);
    field.registerPlugin(linkBubble);
    field.registerPlugin(plugin);
    field.makeEditable();
    field.focusAndPlaceCursorAtStart();
    const textNode = testingDom.findTextNode('http://www.google.com/', fieldEl);
    events.fireKeySequence(field.getElement(), KeyCodes.K, {ctrlKey: true, metaKey: true});

    /** @suppress {checkTypes} suppression added to enable type checking */
    const href = dom.getElementsByTagName(TagName.A, field.getElement())[0];
    assertEquals('http://www.google.com/', href.href);
    /** @suppress {visibility} suppression added to enable type checking */
    const bubbleLink = document.getElementById(LinkBubble.TEST_LINK_ID_);
    assertEquals('http://www.google.com/', bubbleLink.innerHTML);
  },
});
