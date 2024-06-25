/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly('goog.testing.benchmark');

import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import { PerformanceTable } from './performancetable.js';
import { PerformanceTimer } from './performancetimer.js';
import { TestCase } from './testcase.js';


/**
 * Run the benchmarks.
 * @private
 */
function run_() {
  // Parse the 'times' query parameter if it's set.
  var times = 200;
  var search = window.location.search;
  var timesMatch = search.match(/(?:\?|&)times=([^?&]+)/i);
  if (timesMatch) {
    times = Number(timesMatch[1]);
  }

  var prefix = 'benchmark';

  // First, get the functions.
  var testSources = TestCase.getGlobals();

  var benchmarks = {};
  var names = [];

  for (var i = 0; i < testSources.length; i++) {
    var testSource = testSources[i];
    for (var name in testSource) {
      if ((new RegExp('^' + prefix)).test(name)) {
        var ref;
        try {
          ref = testSource[name];
        } catch (ex) {
          // NOTE(brenneman): When running tests from a file:// URL on Firefox
          // 3.5 for Windows, any reference to window.sessionStorage raises
          // an "Operation is not supported" exception. Ignore any exceptions
          // raised by simply accessing global properties.
          ref = undefined;
        }

        if (typeof ref === 'function') {
          benchmarks[name] = ref;
          names.push(name);
        }
      }
    }
  }

  document.body.appendChild(
      dom.createTextNode(
          'Running ' + names.length + ' benchmarks ' + times + ' times each.'));
  document.body.appendChild(dom.createElement(TagName.BR));

  names.sort();

  // Build a table and timer.
  var performanceTimer = new PerformanceTimer(times);
  performanceTimer.setDiscardOutliers(true);

  var performanceTable =
      new PerformanceTable(document.body, performanceTimer, 2);

  // Next, run the benchmarks.
  for (var i = 0; i < names.length; i++) {
    performanceTable.run(benchmarks[names[i]], names[i]);
  }
}


/**
 * Onload handler that runs the benchmarks.
 * @param {Event} e The event object.
 */
window.onload = function(e) {
  run_();
};
