/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A table for showing the results of performance testing.
 *
 * {@see goog.testing.benchmark} for an easy way to use this functionality.
 */

goog.setTestOnly('goog.testing.PerformanceTable');

import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as safe from '../dom/safe.js';
import { Const } from '../string/const.js';
import { PerformanceTimer } from './performancetimer.js';



/**
 * A UI widget that runs performance tests and displays the results.
 * @param {Element} root The element where the table should be attached.
 * @param {PerformanceTimer=} opt_timer A timer to use for
 *     executing functions and profiling them.
 * @param {number=} opt_precision Number of digits of precision to include in
 *     results.  Defaults to 0.
 * @param {number=} opt_numSamples The number of samples to take. Defaults to 5.
 * @constructor
 * @final
 */
export function PerformanceTable(root, opt_timer, opt_precision, opt_numSamples) {
 /**
  * Where the table should be attached.
  * @private {Element}
  */
 this.root_ = root;

 /**
  * Number of digits of precision to include in results.
  * Defaults to 0.
  * @private {number}
  */
 this.precision_ = opt_precision || 0;

 var timer = opt_timer;
 if (!timer) {
   timer = new PerformanceTimer();
   timer.setNumSamples(opt_numSamples || 5);
   timer.setDiscardOutliers(true);
 }

 /**
   * A timer for running the tests.
   * @private {PerformanceTimer}
   */
 this.timer_ = timer;

 this.initRoot_();
}


/**
 * @return {PerformanceTimer} The timer being used.
 */
PerformanceTable.prototype.getTimer = function() {
 return this.timer_;
};


/**
 * Render the initial table.
 * @private
 */
PerformanceTable.prototype.initRoot_ = function() {
 safe.setInnerHtmlFromConstant(
     asserts.assert(this.root_),
     Const.from(
         '<table class="test-results" cellspacing="1">' +
         '  <thead>' +
         '    <tr>' +
         '      <th rowspan="2">Test Description</th>' +
         '      <th rowspan="2">Runs</th>' +
         '      <th colspan="4">Results (ms)</th>' +
         '    </tr>' +
         '    <tr>' +
         '      <th>Average</th>' +
         '      <th>Median</th>' +
         '      <th>Std Dev</th>' +
         '      <th>Minimum</th>' +
         '      <th>Maximum</th>' +
         '    </tr>' +
         '  </thead>' +
         '  <tbody>' +
         '  </tbody>' +
         '</table>'));
};


/**
 * @return {!Element} The body of the table.
 * @private
 */
PerformanceTable.prototype.getTableBody_ = function() {
 return dom.getElementsByTagName(
     TagName.TBODY, asserts.assert(this.root_))[0];
};


/**
 * Round to the specified precision.
 * @param {number} num The number to round.
 * @return {string} The rounded number, as a string.
 * @private
 */
PerformanceTable.prototype.round_ = function(num) {
 var factor = Math.pow(10, this.precision_);
 return String(Math.round(num * factor) / factor);
};


/**
 * Run the given function with the performance timer, and show the results.
 * @param {Function} fn The function to run.
 * @param {string=} opt_desc A description to associate with this run.
 */
PerformanceTable.prototype.run = function(fn, opt_desc) {
 this.runTask(
     new PerformanceTimer.Task(/** @type {function()} */ (fn)),
     opt_desc);
};


/**
 * Run the given task with the performance timer, and show the results.
 * @param {PerformanceTimer.Task} task The performance timer task
 *     to run.
 * @param {string=} opt_desc A description to associate with this run.
 */
PerformanceTable.prototype.runTask = function(task, opt_desc) {
 var results = this.timer_.runTask(task);
 this.recordResults(results, opt_desc);
};


/**
 * Record a performance timer results object to the performance table. See
 * `PerformanceTimer` for details of the format of this
 * object.
 * @param {Object} results The performance timer results object.
 * @param {string=} opt_desc A description to associate with these results.
 */
PerformanceTable.prototype.recordResults = function(
    results, opt_desc) {
 var average = results['average'];
 var standardDeviation = results['standardDeviation'];
 var isSuspicious = average < 0 || standardDeviation > average * .5;
 var resultsRow = dom.createDom(
     TagName.TR, null,
     dom.createDom(
         TagName.TD, 'test-description',
         opt_desc || 'No description'),
     dom.createDom(
         TagName.TD, 'test-count', String(results['count'])),
     dom.createDom(
         TagName.TD, 'test-average', this.round_(average)),
     dom.createDom(
         TagName.TD, 'test-median', String(results['median'])),
     dom.createDom(
         TagName.TD, 'test-standard-deviation',
         this.round_(standardDeviation)),
     dom.createDom(
         TagName.TD, 'test-minimum', String(results['minimum'])),
     dom.createDom(
         TagName.TD, 'test-maximum', String(results['maximum'])));
 if (isSuspicious) {
   resultsRow.className = 'test-suspicious';
 }
 this.getTableBody_().appendChild(resultsRow);
};


/**
 * Report an error in the table.
 * @param {*} reason The reason for the error.
 */
PerformanceTable.prototype.reportError = function(reason) {
 this.getTableBody_().appendChild(dom.createDom(
     TagName.TR, null,
     dom.createDom(
         TagName.TD, {'class': 'test-error', 'colSpan': 5},
         String(reason))));
};
