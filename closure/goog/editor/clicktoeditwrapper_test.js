/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ClickToEditWrapper } from './clicktoeditwrapper.js';
import { MockClock } from '../testing/mockclock.js';
import * as Range from '../dom/range.js';
import { SeamlessField } from './seamlessfield.js';
import { TagName } from '../dom/tagname.js';
import * as events from '../testing/events/events.js';
import * as googDom from '../dom/dom.js';
import { testSuite } from '../testing/testsuite.js';

let FIELD;
let CLOCK;
let HTML;

/** @param {boolean=} isBlended */
function setUpField(isBlended = undefined) {
  FIELD = isBlended ? new SeamlessField('testField') :
                      new SeamlessField('testField');

  (new ClickToEditWrapper(FIELD));

  Range.clearSelection();
}

testSuite({
  setUp() {
    HTML = googDom.getElement('root').innerHTML;
    CLOCK = new MockClock(true);

    // The following 3 lines are to get around an IE bug where it says
    // 'Incompatible markup pointers for this operation'.
    // Must be done in the setup, not teardown, or else it won't take effect for
    // the first test that is run, or any test that runs immediately after a
    // "breaking async" message from the jsunit framework.
    Range.clearSelection();
    window.blur();
    window.focus();
  },

  tearDown() {
    if (FIELD) {
      FIELD.dispose();
    }

    CLOCK.dispose();

    googDom.getElement('root').innerHTML = HTML;
  },

  testClickToEdit(isBlended = undefined) {
    setUpField(isBlended);

    let text = googDom.getElement('testField').firstChild;
    Range.createFromNodes(text, 4, text, 8).select();

    events.fireClickSequence(text.parentNode);

    assertFalse(
        'Field should not be made editable immediately after clicking',
        FIELD.isLoaded());
    CLOCK.tick(1);
    assertTrue('Field should be editable', FIELD.isLoaded());

    const dom = FIELD.getEditableDomHelper();
    const selection = Range.createFromWindow(dom.getWindow());

    const body = FIELD.getElement();
    text = body.firstChild;

    assertEquals('Wrong start node', text, selection.getStartNode());
    assertEquals('Wrong end node', text, selection.getEndNode());
    assertEquals('Wrong start offset', 4, selection.getStartOffset());
    assertEquals('Wrong end offset', 8, selection.getEndOffset());
  },

  testBlendedClickToEdit() {
    this.testClickToEdit(true);
  },

  testClickToEditWithAnchor(isBlended = undefined) {
    setUpField(isBlended);

    googDom.getElement('testAnchor').focus();
    events.fireClickSequence(googDom.getElement('testAnchor'));

    CLOCK.tick(1);
    assertTrue('Field should be editable', FIELD.isLoaded());

    const dom = FIELD.getEditableDomHelper();
    const selection = Range.createFromWindow(dom.getWindow());

    // TODO(brndn): the location of the cursor is not yet specified by the W3C
    // Editing APIs (https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html).
    // See b/15678403.  IE and some webkit (all Safari, and up to Chrome 57)
    // return the end of the previous text node, while other browsers return
    // the start of the next node.
    const body = FIELD.getElement();
    const text = body.firstChild;
    const link =
        dom.getElementsByTagNameAndClass(TagName.A, null, body)[0].firstChild;
    if (selection.getStartNode() == text) {
      assertEquals('Wrong start node', text, selection.getStartNode());
      assertEquals('Wrong start offset', 17, selection.getStartOffset());
      assertEquals('Wrong end node', text, selection.getEndNode());
      assertEquals('Wrong end offset', 17, selection.getEndOffset());
    } else {
      assertEquals('Wrong start node', link, selection.getStartNode());
      assertEquals('Wrong start offset', 0, selection.getStartOffset());
      assertEquals('Wrong end node', link, selection.getEndNode());
      assertEquals('Wrong end offset', 0, selection.getEndOffset());
    }
  },

  testBlendedClickToEditWithAnchor() {
    this.testClickToEditWithAnchor(true);
  },
});
