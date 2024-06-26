/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Button } from '../../button.js';
import { Component } from '../../component.js';
import { PrimaryActionButtonRenderer } from './primaryactionbuttonrenderer.js';
import * as dom from '../../../dom/dom.js';
import style from '../../../testing/ui/style.js';
import { testSuite } from '../../../testing/testsuite.js';

const renderer = PrimaryActionButtonRenderer.getInstance();
let button;

// Write iFrame tag to load reference FastUI markup. Then, our tests will
// compare the generated markup to the reference markup.
const refPath = '../../../../../../' +
    'webutil/css/legacy/fastui/app/primaryactionbutton_spec.html';
style.writeReferenceFrame(refPath);

function shouldRunTests() {
  // Disable tests when being run as a part of open-source repo as the button
  // specs are not included in closure-library.
  return !(/closure\/goog\/ui/.test(location.pathname));
}

testSuite({
  setUp() {
    button = new Button('Hello Generated', renderer);
  },

  tearDown() {
    if (button) {
      button.dispose();
    }
    dom.removeChildren(dom.getElement('sandbox'));
  },

  shouldRunTests,

  testGeneratedButton() {
    button.render(dom.getElement('sandbox'));
    style.assertStructureMatchesReference(
        button.getElement(), 'normal-resting');
  },

  testButtonStates() {
    button.render(dom.getElement('sandbox'));
    style.assertStructureMatchesReference(
        button.getElement(), 'normal-resting');
    button.setState(Component.State.HOVER, true);
    style.assertStructureMatchesReference(button.getElement(), 'normal-hover');
    button.setState(Component.State.HOVER, false);
    button.setState(Component.State.FOCUSED, true);
    style.assertStructureMatchesReference(
        button.getElement(), 'normal-focused');
    button.setState(Component.State.FOCUSED, false);
    button.setState(Component.State.ACTIVE, true);
    style.assertStructureMatchesReference(button.getElement(), 'normal-active');
    button.setState(Component.State.ACTIVE, false);
    button.setState(Component.State.DISABLED, true);
    style.assertStructureMatchesReference(
        button.getElement(), 'normal-disabled');
  },
});
