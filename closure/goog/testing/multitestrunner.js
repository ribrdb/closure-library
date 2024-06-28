/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility for running multiple test files that utilize the same
 * interface as goog.testing.TestRunner.  Each test is run in series and their
 * results aggregated.  The main usecase for the MultiTestRunner is to allow
 * the testing of all tests in a project locally.
 */

goog.setTestOnly('goog.testing.MultiTestRunner');

import { Timer } from '../timer/timer.js';
import * as array from '../array/array.js';
import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { EventHandler } from '../events/eventhandler.js';
import * as functions from '../functions/functions.js';
import object from '../object/object.js';
import * as googString from '../string/string.js';
import { TestCase } from './testcase.js';
import { Component } from '../ui/component.js';
import { ServerChart } from '../ui/serverchart.js';
import { TableSorter } from '../ui/tablesorter.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * A component for running multiple tests within the browser.
 * @param {dom.DomHelper=} opt_domHelper A DOM helper.
 * @extends {Component}
 * @constructor
 * @final
 */
export function MultiTestRunner(opt_domHelper) {
  Component.call(this, opt_domHelper);

  /**
   * Array of tests to execute, when combined with the base path this should be
   * a relative path to the test from the page containing the multi testrunner.
   * @type {Array<string>}
   * @private
   */
  this.allTests_ = [];

  /**
   * Tests that match the filter function.
   * @type {Array<string>}
   * @private
   */
  this.activeTests_ = [];

  /**
       * An event handler for handling events.
       * @type {EventHandler<!MultiTestRunner>}
       * @private
       */
  this.eh_ = new EventHandler(this);

  /**
     * A table sorter for the stats.
     * @type {TableSorter}
     * @private
     */
  this.tableSorter_ = new TableSorter(this.dom_);

  /**
   * Array to hold individual test reports for tests that failed.
   * @type {!Array<string>}
   * @private
   */
  this.failureReports_ = [];

  /**
     * Array of test result objects returned from G_testRunner.getTestResults for
     * each individual test run.
     * @private {!Array<!Object<string,!Array<!TestCase.IResult>>>}
     */
  this.allTestResults_ = [];
}
goog.inherits(MultiTestRunner, Component);


/**
 * Default maximimum amount of time to spend at each stage of the test.
 * @type {number}
 */
MultiTestRunner.DEFAULT_TIMEOUT_MS = 45 * 1000;


/**
 * Messages corresponding to the numeric states.
 * @type {Array<string>}
 */
MultiTestRunner.STATES = [
  'waiting for test runner', 'initializing tests', 'waiting for tests to finish'
];


/**
 * Event type dispatched when tests are completed.
 * @const
 */
MultiTestRunner.TESTS_FINISHED = 'testsFinished';


/**
 * The test suite's name.
 * @type {string} name
 * @private
 */
MultiTestRunner.prototype.name_ = '';


/**
 * The base path used to resolve files within the allTests_ array.
 * @type {string}
 * @private
 */
MultiTestRunner.prototype.basePath_ = '';


/**
 * A set of tests that have finished.  All extant keys map to true.
 * @type {?Object<boolean>}
 * @private
 */
MultiTestRunner.prototype.finished_ = null;


/**
 * Whether the report should contain verbose information about the passes.
 * @type {boolean}
 * @private
 */
MultiTestRunner.prototype.verbosePasses_ = false;


/**
 * Whether to hide passing tests completely in the report, makes verbosePasses_
 * obsolete.
 * @type {boolean}
 * @private
 */
MultiTestRunner.prototype.hidePasses_ = false;


/**
 * Flag used to tell the test runner to stop after the current test.
 * @type {boolean}
 * @private
 */
MultiTestRunner.prototype.stopped_ = false;


/**
 * Flag indicating whether the test runner is active.
 * @type {boolean}
 * @private
 */
MultiTestRunner.prototype.active_ = false;


/**
 * Index of the next test to run.
 * @type {number}
 * @private
 */
MultiTestRunner.prototype.startedCount_ = 0;


/**
 * Count of the results received so far.
 * @type {number}
 * @private
 */
MultiTestRunner.prototype.resultCount_ = 0;


/**
 * Number of passes so far.
 * @type {number}
 * @private
 */
MultiTestRunner.prototype.passes_ = 0;


/**
 * Timestamp for the current start time.
 * @type {number}
 * @private
 */
MultiTestRunner.prototype.startTime_ = 0;


/**
 * Only tests whose paths patch this filter function will be
 * executed.
 * @type {function(string): boolean}
 * @private
 */
MultiTestRunner.prototype.filterFn_ = functions.TRUE;


/**
 * Number of milliseconds to wait for loading and initialization steps.
 * @type {number}
 * @private
 */
MultiTestRunner.prototype.timeoutMs_ =
    MultiTestRunner.DEFAULT_TIMEOUT_MS;


/**
 * @typedef {{
 *   testFile: string,
 *   success: ?boolean,
 *   runTime: number,
 *   totalTime: number,
 *   numFilesLoaded: number
 * }}
 * @private
 */
MultiTestRunner.StatsType_;


/**
 * An array of objects containing stats about the tests.
 * @type {?Array<!MultiTestRunner.StatsType_>}
 * @private
 */
MultiTestRunner.prototype.stats_ = null;


/**
 * Reference to the start button element.
 * @type {?HTMLButtonElement}
 * @private
 */
MultiTestRunner.prototype.startButtonEl_ = null;


/**
 * Reference to the stop button element.
 * @type {?HTMLButtonElement}
 * @private
 */
MultiTestRunner.prototype.stopButtonEl_ = null;


/**
 * Reference to the log element.
 * @type {?Element}
 * @private
 */
MultiTestRunner.prototype.logEl_ = null;


/**
 * Reference to the report element.
 * @type {?Element}
 * @private
 */
MultiTestRunner.prototype.reportEl_ = null;


/**
 * Reference to the stats element.
 * @type {?Element}
 * @private
 */
MultiTestRunner.prototype.statsEl_ = null;


/**
 * Reference to the progress bar's element.
 * @type {?Element}
 * @private
 */
MultiTestRunner.prototype.progressEl_ = null;


/**
 * Reference to the progress bar's inner row element.
 * @type {?HTMLTableRowElement}
 * @private
 */
MultiTestRunner.prototype.progressRow_ = null;


/**
 * Reference to the log tab.
 * @type {?Element}
 * @private
 */
MultiTestRunner.prototype.logTabEl_ = null;


/**
 * Reference to the report tab.
 * @type {?Element}
 * @private
 */
MultiTestRunner.prototype.reportTabEl_ = null;


/**
 * Reference to the stats tab.
 * @type {?Element}
 * @private
 */
MultiTestRunner.prototype.statsTabEl_ = null;


/**
 * The number of tests to run at a time.
 * @type {number}
 * @private
 */
MultiTestRunner.prototype.poolSize_ = 1;


/**
 * The size of the stats bucket for the number of files loaded histogram.
 * @type {number}
 * @private
 */
MultiTestRunner.prototype.numFilesStatsBucketSize_ = 20;


/**
 * The size of the stats bucket in ms for the run time histogram.
 * @type {number}
 * @private
 */
MultiTestRunner.prototype.runTimeStatsBucketSize_ = 500;


/**
 * Sets the name for the test suite.
 * @param {string} name The suite's name.
 * @return {!MultiTestRunner} Instance for chaining.
 */
MultiTestRunner.prototype.setName = function(name) {
  this.name_ = name;
  return this;
};


/**
 * Returns the name for the test suite.
 * @return {string} The name for the test suite.
 */
MultiTestRunner.prototype.getName = function() {
  return this.name_;
};


/**
 * Sets the basepath that tests added using addTests are resolved with.
 * @param {string} path The relative basepath.
 * @return {!MultiTestRunner} Instance for chaining.
 */
MultiTestRunner.prototype.setBasePath = function(path) {
  this.basePath_ = path;
  return this;
};


/**
 * Returns the basepath that tests added using addTests are resolved with.
 * @return {string} The basepath that tests added using addTests are resolved
 *     with.
 */
MultiTestRunner.prototype.getBasePath = function() {
  return this.basePath_;
};


/**
 * Sets whether the report should contain verbose information for tests that
 * pass.
 * @param {boolean} verbose Whether report should be verbose.
 * @return {!MultiTestRunner} Instance for chaining.
 */
MultiTestRunner.prototype.setVerbosePasses = function(verbose) {
  this.verbosePasses_ = verbose;
  return this;
};


/**
 * Returns whether the report should contain verbose information for tests that
 * pass.
 * @return {boolean} Whether the report should contain verbose information for
 *     tests that pass.
 */
MultiTestRunner.prototype.getVerbosePasses = function() {
  return this.verbosePasses_;
};


/**
 * Sets whether the report should contain passing tests at all, makes
 * setVerbosePasses obsolete.
 * @param {boolean} hide Whether report should not contain passing tests.
 * @return {!MultiTestRunner} Instance for chaining.
 */
MultiTestRunner.prototype.setHidePasses = function(hide) {
  this.hidePasses_ = hide;
  return this;
};


/**
 * Returns whether the report should contain passing tests at all, makes
 * setVerbosePasses obsolete.
 * @return {boolean} Whether the report should contain passing tests at all,
 *     makes setVerbosePasses obsolete.
 */
MultiTestRunner.prototype.getHidePasses = function() {
  return this.hidePasses_;
};


/**
 * Sets the bucket sizes for the histograms.
 * @param {number} f Bucket size for num files loaded histogram.
 * @param {number} t Bucket size for run time histogram.
 * @return {!MultiTestRunner} Instance for chaining.
 */
MultiTestRunner.prototype.setStatsBucketSizes = function(f, t) {
  this.numFilesStatsBucketSize_ = f;
  this.runTimeStatsBucketSize_ = t;
  return this;
};


/**
 * Sets the number of milliseconds to wait for the page to load, initialize and
 * run the tests.
 * @param {number} timeout Time in milliseconds.
 * @return {!MultiTestRunner} Instance for chaining.
 */
MultiTestRunner.prototype.setTimeout = function(timeout) {
  this.timeoutMs_ = timeout;
  return this;
};


/**
 * Returns the number of milliseconds to wait for the page to load, initialize
 * and run the tests.
 * @return {number} The number of milliseconds to wait for the page to load,
 *     initialize and run the tests.
 */
MultiTestRunner.prototype.getTimeout = function() {
  return this.timeoutMs_;
};


/**
 * Sets the number of tests that can be run at the same time. This only improves
 * performance due to the amount of time spent loading the tests.
 * @param {number} size The number of tests to run at a time.
 * @return {!MultiTestRunner} Instance for chaining.
 */
MultiTestRunner.prototype.setPoolSize = function(size) {
  this.poolSize_ = size;
  return this;
};


/**
 * Returns the number of tests that can be run at the same time. This only
 * improves performance due to the amount of time spent loading the tests.
 * @return {number} The number of tests that can be run at the same time. This
 *     only improves performance due to the amount of time spent loading the
 *     tests.
 */
MultiTestRunner.prototype.getPoolSize = function() {
  return this.poolSize_;
};


/**
 * Sets a filter function. Only test paths that match the filter function
 * will be executed.
 * @param {function(string): boolean} filterFn Filters test paths.
 * @return {!MultiTestRunner} Instance for chaining.
 */
MultiTestRunner.prototype.setFilterFunction = function(filterFn) {
  this.filterFn_ = filterFn;
  return this;
};


/**
 * Returns a filter function. Only test paths that match the filter function
 * will be executed.
 * @return {function(string): boolean} A filter function. Only test paths that
 *     match the filter function will be executed.

 */
MultiTestRunner.prototype.getFilterFunction = function() {
  return this.filterFn_;
};


/**
 * Adds an array of tests to the tests that the test runner should execute.
 * @param {Array<string>} tests Adds tests to the test runner.
 * @return {!MultiTestRunner} Instance for chaining.
 */
MultiTestRunner.prototype.addTests = function(tests) {
  array.extend(this.allTests_, tests);
  return this;
};


/**
 * Returns the list of all tests added to the runner.
 * @return {Array<string>} The list of all tests added to the runner.
 */
MultiTestRunner.prototype.getAllTests = function() {
  return this.allTests_;
};


/**
 * Returns the list of tests that will be run when start() is called.
 * @return {!Array<string>} The list of tests that will be run when start() is
 *     called.
 */
MultiTestRunner.prototype.getTestsToRun = function() {
  return this.allTests_.filter(this.filterFn_);
};


/**
 * Returns a list of tests from runner that have been marked as failed.
 * @return {!Array<string>} A list of tests from runner that have been marked
 *     as failed.
 */
MultiTestRunner.prototype.getTestsThatFailed = function() {
  var stats = this.stats_;
  var failedTests = [];
  if (stats) {
    for (var i = 0, stat; stat = stats[i]; i++) {
      if (!stat.success) {
        failedTests.push(stat.testFile);
      }
    }
  }
  return failedTests;
};


/**
 * Returns a list of reports for tests that have finished since last "start".
 * @return {!Array<string>} A list of tests reports.
 */
MultiTestRunner.prototype.getFailureReports = function() {
  return this.failureReports_;
};


/**
 * Returns list of each frame's test results.
 * @return {!Array<!Object<string,!Array<!TestCase.IResult>>>}
 */
MultiTestRunner.prototype.getAllTestResults = function() {
  return this.allTestResults_;
};


/**
 * Deletes and re-creates the progress table inside the progess element.
 * @private
 */
MultiTestRunner.prototype.resetProgressDom_ = function() {
  dom.removeChildren(this.progressEl_);
  var progressTable = this.dom_.createDom(TagName.TABLE);
  var progressTBody = this.dom_.createDom(TagName.TBODY);
  this.progressRow_ = this.dom_.createDom(TagName.TR);
  for (var i = 0; i < this.activeTests_.length; i++) {
    var progressCell = this.dom_.createDom(TagName.TD);
    this.progressRow_.appendChild(progressCell);
  }
  progressTBody.appendChild(this.progressRow_);
  progressTable.appendChild(progressTBody);
  this.progressEl_.appendChild(progressTable);
};


/** @override */
MultiTestRunner.prototype.createDom = function() {
  MultiTestRunner.superClass_.createDom.call(this);
  var el = this.getElement();
  el.className = goog.getCssName('goog-testrunner');

  this.progressEl_ = this.dom_.createDom(TagName.DIV);
  this.progressEl_.className = goog.getCssName('goog-testrunner-progress');
  el.appendChild(this.progressEl_);

  var buttons = this.dom_.createDom(TagName.DIV);
  buttons.className = goog.getCssName('goog-testrunner-buttons');
  this.startButtonEl_ =
      this.dom_.createDom(TagName.BUTTON, null, 'Start');
  this.stopButtonEl_ =
      this.dom_.createDom(TagName.BUTTON, {'disabled': true}, 'Stop');
  buttons.appendChild(this.startButtonEl_);
  buttons.appendChild(this.stopButtonEl_);
  el.appendChild(buttons);

  this.eh_.listen(this.startButtonEl_, 'click', this.onStartClicked_);
  this.eh_.listen(this.stopButtonEl_, 'click', this.onStopClicked_);

  this.logEl_ = this.dom_.createElement(TagName.DIV);
  this.logEl_.className = goog.getCssName('goog-testrunner-log');
  el.appendChild(this.logEl_);

  this.reportEl_ = this.dom_.createElement(TagName.DIV);
  this.reportEl_.className = goog.getCssName('goog-testrunner-report');
  this.reportEl_.style.display = 'none';
  el.appendChild(this.reportEl_);

  this.statsEl_ = this.dom_.createElement(TagName.DIV);
  this.statsEl_.className = goog.getCssName('goog-testrunner-stats');
  this.statsEl_.style.display = 'none';
  el.appendChild(this.statsEl_);

  this.logTabEl_ = this.dom_.createDom(TagName.DIV, null, 'Log');
  this.logTabEl_.className = goog.getCssName('goog-testrunner-logtab') + ' ' +
      goog.getCssName('goog-testrunner-activetab');
  el.appendChild(this.logTabEl_);

  this.reportTabEl_ = this.dom_.createDom(TagName.DIV, null, 'Report');
  this.reportTabEl_.className = goog.getCssName('goog-testrunner-reporttab');
  el.appendChild(this.reportTabEl_);

  this.statsTabEl_ = this.dom_.createDom(TagName.DIV, null, 'Stats');
  this.statsTabEl_.className = goog.getCssName('goog-testrunner-statstab');
  el.appendChild(this.statsTabEl_);

  this.eh_.listen(this.logTabEl_, 'click', this.onLogTabClicked_);
  this.eh_.listen(this.reportTabEl_, 'click', this.onReportTabClicked_);
  this.eh_.listen(this.statsTabEl_, 'click', this.onStatsTabClicked_);
};


/** @override */
MultiTestRunner.prototype.disposeInternal = function() {
  MultiTestRunner.superClass_.disposeInternal.call(this);
  this.tableSorter_.dispose();
  this.eh_.dispose();
  this.startButtonEl_ = null;
  this.stopButtonEl_ = null;
  this.logEl_ = null;
  this.reportEl_ = null;
  this.progressEl_ = null;
  this.logTabEl_ = null;
  this.reportTabEl_ = null;
  this.statsTabEl_ = null;
  this.statsEl_ = null;
};


/**
 * Starts executing the tests.
 */
MultiTestRunner.prototype.start = function() {
  this.startButtonEl_.disabled = true;
  this.stopButtonEl_.disabled = false;
  this.stopped_ = false;
  this.active_ = true;
  this.finished_ = {};
  this.activeTests_ = this.getTestsToRun();
  this.startedCount_ = 0;
  this.resultCount_ = 0;
  this.passes_ = 0;
  this.stats_ = [];
  this.startTime_ = goog.now();
  this.failureReports_ = [];

  this.resetProgressDom_();
  dom.removeChildren(this.logEl_);

  this.resetReport_();
  this.clearStats_();
  this.showTab_(0);

  // No tests to run, finish early and return.
  if (this.activeTests_.length == 0) {
    this.finish_();
    return;
  }

  // Ensure the pool isn't too big.
  while (this.getChildCount() > this.poolSize_) {
    this.removeChildAt(0, true).dispose();
  }

  // Start a test in each runner.
  for (var i = 0; i < this.poolSize_; i++) {
    if (i >= this.getChildCount()) {
      var testFrame = new MultiTestRunner.TestFrame(
          this.basePath_, this.timeoutMs_, this.verbosePasses_, this.dom_);
      this.addChild(testFrame, true);
    }
    this.runNextTest_(
        /** @type {MultiTestRunner.TestFrame} */
        (this.getChildAt(i)));
  }
};


/**
 * Logs a message to the log window.
 * @param {string} msg A message to log.
 */
MultiTestRunner.prototype.log = function(msg) {
  if (msg != '.') {
    msg = this.getTimeStamp_() + ' : ' + msg;
  }

  this.logEl_.appendChild(this.dom_.createDom(TagName.DIV, null, msg));

  // Autoscroll if we're near the bottom.
  var top = this.logEl_.scrollTop;
  var height = /** @type {!HTMLElement} */ (this.logEl_).scrollHeight -
      /** @type {!HTMLElement} */ (this.logEl_).offsetHeight;
  if (top == 0 || top > height - 50) {
    this.logEl_.scrollTop = height;
  }
};


/**
 * Processes a result returned from a TestFrame.  If there are tests remaining
 * it will trigger the next one to be run, otherwise if there are no tests and
 * all results have been received then it will call finish.
 * @param {MultiTestRunner.TestFrame} frame The frame that just
 *     finished.
 */
MultiTestRunner.prototype.processResult = function(frame) {
  var success = frame.isSuccess();
  var report = frame.getReport();
  var test = frame.getTestFile();
  var stats = frame.getStats();

  if (!stats.success) {
    this.failureReports_.push(report);
  }

  this.allTestResults_.push(frame.getTestResults());
  this.stats_.push(/** @type {?} */ (stats));
  this.finished_[test] = true;

  var prefix = success ? '' : '*** FAILURE *** ';
  this.log(
      prefix + this.trimFileName_(test) + ' : ' +
      (success ? 'Passed' : 'Failed'));

  this.resultCount_++;

  if (success) {
    this.passes_++;
  }

  this.drawProgressSegment_(test, success);
  this.writeCurrentSummary_();
  if (!(success && this.hidePasses_)) {
    this.drawTestResult_(test, success, report);
  }

  if (!this.stopped_ && this.startedCount_ < this.activeTests_.length) {
    this.runNextTest_(frame);
  } else if (this.resultCount_ == this.activeTests_.length) {
    this.finish_();
  }
};


/**
 * Runs the next available test, if there are any left.
 * @param {MultiTestRunner.TestFrame} frame Where to run the test.
 * @private
 */
MultiTestRunner.prototype.runNextTest_ = function(frame) {
  if (this.startedCount_ < this.activeTests_.length) {
    var nextTest = this.activeTests_[this.startedCount_++];
    this.log(this.trimFileName_(nextTest) + ' : Loading');
    frame.runTest(nextTest);
  }
};


/**
 * Handles the test finishing, processing the results and rendering the report.
 * @private
 */
MultiTestRunner.prototype.finish_ = function() {
  if (this.stopped_) {
    this.log('Stopped');
  } else {
    this.log('Finished');
  }

  this.startButtonEl_.disabled = false;
  this.stopButtonEl_.disabled = true;
  this.active_ = false;

  this.showTab_(1);
  this.drawStats_();

  // Remove all the test frames
  while (this.getChildCount() > 0) {
    this.removeChildAt(0, true).dispose();
  }

  // Compute tests that did not finish before the stop button was hit.
  var unfinished = [];
  for (var i = 0; i < this.activeTests_.length; i++) {
    var test = this.activeTests_[i];
    if (!this.finished_[test]) {
      unfinished.push(test);
    }
  }

  if (unfinished.length) {
    this.reportEl_.appendChild(
        dom.createDom(
            TagName.PRE, undefined,
            'These tests did not finish:\n' + unfinished.join('\n')));
  }

  this.dispatchEvent({
    'type': MultiTestRunner.TESTS_FINISHED,
    'allTestResults': this.getAllTestResults()
  });
};


/**
 * Resets the report, clearing out all children and drawing the initial summary.
 * @private
 */
MultiTestRunner.prototype.resetReport_ = function() {
  dom.removeChildren(this.reportEl_);
  var summary = this.dom_.createDom(TagName.DIV);
  summary.className = goog.getCssName('goog-testrunner-progress-summary');
  this.reportEl_.appendChild(summary);
  this.writeCurrentSummary_();
};


/**
 * Draws the stats for the test run.
 * @private
 */
MultiTestRunner.prototype.drawStats_ = function() {
  this.drawFilesHistogram_();

  // Only show time stats if pool size is 1, otherwise times are wrong.
  if (this.poolSize_ == 1) {
    this.drawRunTimePie_();
    this.drawTimeHistogram_();
  }

  this.drawWorstTestsTable_();
};


/**
 * Draws the histogram showing number of files loaded.
 * @private
 */
MultiTestRunner.prototype.drawFilesHistogram_ = function() {
  this.drawStatsHistogram_(
      'numFilesLoaded', this.numFilesStatsBucketSize_, functions.identity,
      500,
      'Histogram showing distribution of\nnumber of files loaded per test');
};


/**
 * Draws the histogram showing how long each test took to complete.
 * @private
 */
MultiTestRunner.prototype.drawTimeHistogram_ = function() {
  this.drawStatsHistogram_(
      'totalTime', this.runTimeStatsBucketSize_,
      function(x) {
        return x / 1000;
      },
      500, 'Histogram showing distribution of\ntime spent running tests in s');
};


/**
 * Draws a stats histogram.
 * @param {string} statsField Field of the stats object to graph.
 * @param {number} bucketSize The size for the histogram's buckets.
 * @param {function(number, ...*): *} valueTransformFn Function for
 *     transforming the x-labels value for display.
 * @param {number} width The width in pixels of the graph.
 * @param {string} title The graph's title.
 * @private
 */
MultiTestRunner.prototype.drawStatsHistogram_ = function(
    statsField, bucketSize, valueTransformFn, width, title) {
  var hist = {}, data = [], xlabels = [], ylabels = [];
  var max = 0;
  for (var i = 0; i < this.stats_.length; i++) {
    var num = this.stats_[i][statsField];
    var bucket = Math.floor(num / bucketSize) * bucketSize;
    if (bucket > max) {
      max = bucket;
    }
    if (!hist[bucket]) {
      hist[bucket] = 1;
    } else {
      hist[bucket]++;
    }
  }
  var maxBucketSize = 0;
  for (var i = 0; i <= max; i += bucketSize) {
    xlabels.push(valueTransformFn(i));
    var count = hist[i] || 0;
    if (count > maxBucketSize) {
      maxBucketSize = count;
    }
    data.push(count);
  }
  var diff = Math.max(1, Math.ceil(maxBucketSize / 10));
  for (var i = 0; i <= maxBucketSize; i += diff) {
    ylabels.push(i);
  }
  var chart = new ServerChart(
      ServerChart.ChartType.VERTICAL_STACKED_BAR, width, 250, null,
      ServerChart.CHART_SERVER_HTTPS_URI);
  chart.setTitle(title);
  chart.addDataSet(data, 'ff9900');
  chart.setLeftLabels(ylabels);
  chart.setGridY(ylabels.length - 1);
  chart.setXLabels(xlabels);
  chart.render(this.statsEl_);
};


/**
 * Draws a pie chart showing the percentage of time spent running the tests
 * compared to loading them etc.
 * @private
 */
MultiTestRunner.prototype.drawRunTimePie_ = function() {
  var totalTime = 0, runTime = 0;
  for (var i = 0; i < this.stats_.length; i++) {
    var stat = this.stats_[i];
    totalTime += stat.totalTime;
    runTime += stat.runTime;
  }
  var loadTime = totalTime - runTime;
  var pie = new ServerChart(
      ServerChart.ChartType.PIE, 500, 250, null,
      ServerChart.CHART_SERVER_HTTPS_URI);
  pie.setMinValue(0);
  pie.setMaxValue(totalTime);
  pie.addDataSet([runTime, loadTime], 'ff9900');
  pie.setXLabels(
      ['Test execution (' + runTime + 'ms)', 'Loading (' + loadTime + 'ms)']);
  pie.render(this.statsEl_);
};


/**
 * Draws a pie chart showing the percentage of time spent running the tests
 * compared to loading them etc.
 * @private
 */
MultiTestRunner.prototype.drawWorstTestsTable_ = function() {
  this.stats_.sort(function(a, b) {
    return b['numFilesLoaded'] - a['numFilesLoaded'];
  });

  var tbody = goog.bind(this.dom_.createDom, this.dom_, 'tbody');
  var thead = goog.bind(this.dom_.createDom, this.dom_, 'thead');
  var tr = goog.bind(this.dom_.createDom, this.dom_, 'tr');
  var th = goog.bind(this.dom_.createDom, this.dom_, 'th');
  var td = goog.bind(this.dom_.createDom, this.dom_, 'td');
  var a = goog.bind(this.dom_.createDom, this.dom_, 'a');

  var head = thead(
      {'style': 'cursor: pointer'},
      tr(null, th(null, ' '), th(null, 'Test file'),
         th('center', 'Num files loaded'), th('center', 'Run time (ms)'),
         th('center', 'Total time (ms)')));
  var body = tbody();
  var table = this.dom_.createDom(TagName.TABLE, null, head, body);

  for (var i = 0; i < this.stats_.length; i++) {
    var stat = this.stats_[i];
    body.appendChild(
        tr(null, td('center', String(i + 1)),
           td(null,
              a({'href': this.basePath_ + stat['testFile'], 'target': '_blank'},
                stat['testFile'])),
           td('center', String(stat['numFilesLoaded'])),
           td('center', String(stat['runTime'])),
           td('center', String(stat['totalTime']))));
  }

  this.statsEl_.appendChild(table);

  this.tableSorter_.setDefaultSortFunction(TableSorter.numericSort);
  this.tableSorter_.setSortFunction(
      1 /* test file name */, TableSorter.alphaSort);
  this.tableSorter_.decorate(table);
};


/**
 * Clears the stats page.
 * @private
 */
MultiTestRunner.prototype.clearStats_ = function() {
  dom.removeChildren(this.statsEl_);
  this.tableSorter_.exitDocument();
};


/**
 * Updates the report's summary.
 * @private
 */
MultiTestRunner.prototype.writeCurrentSummary_ = function() {
  var total = this.activeTests_.length;
  var executed = this.resultCount_;
  var passes = this.passes_;
  var duration = Math.round((goog.now() - this.startTime_) / 1000);
  var text = executed + ' of ' + total + ' tests executed.<br>' + passes +
      ' passed, ' + (executed - passes) + ' failed.<br>' +
      'Duration: ' + duration + 's.';
  dom.getFirstElementChild(this.reportEl_).innerHTML = text;
};


/**
 * Adds a segment to the progress bar.
 * @param {string} title Title for the segment.
 * @param {*} success Whether the segment should indicate a success.
 * @private
 */
MultiTestRunner.prototype.drawProgressSegment_ = function(
    title, success) {
  var part = this.progressRow_.cells[this.resultCount_ - 1];
  part.title = title + ' : ' + (success ? 'SUCCESS' : 'FAILURE');
  part.style.backgroundColor = success ? '#090' : '#900';
};


/**
 * Draws a test result in the report pane.
 * @param {string} test Test name.
 * @param {*} success Whether the test succeeded.
 * @param {string} report The report.
 * @private
 */
MultiTestRunner.prototype.drawTestResult_ = function(
    test, success, report) {
  var text = googString.isEmptyOrWhitespace(report) ?
      'No report for ' + test + '\n' :
      report;
  var el = this.dom_.createDom(TagName.DIV);
  text = googString.htmlEscape(text).replace(/\n/g, '<br>');
  if (success) {
    el.className = goog.getCssName('goog-testrunner-report-success');
  } else {
    text += '<a href="' + this.basePath_ + test +
        '">Run individually &raquo;</a><br>&nbsp;';
    el.className = goog.getCssName('goog-testrunner-report-failure');
  }
  el.innerHTML = text;
  this.reportEl_.appendChild(el);
};


/**
 * Returns the current timestamp.
 * @return {string} HH:MM:SS.
 * @private
 */
MultiTestRunner.prototype.getTimeStamp_ = function() {
  var d = new Date;
  return googString.padNumber(d.getHours(), 2) + ':' +
      googString.padNumber(d.getMinutes(), 2) + ':' +
      googString.padNumber(d.getSeconds(), 2);
};


/**
 * Trims a filename to be less than 35-characters, ensuring that we do not break
 * a path part.
 * @param {string} name The file name.
 * @return {string} The shortened name.
 * @private
 */
MultiTestRunner.prototype.trimFileName_ = function(name) {
  if (name.length < 35) {
    return name;
  }
  var parts = name.split('/');
  var result = '';
  while (result.length < 35 && parts.length > 0) {
    result = '/' + parts.pop() + result;
  }
  return '...' + result;
};


/**
 * Shows the report and hides the log if the argument is true.
 * @param {number} tab Which tab to show.
 * @private
 */
MultiTestRunner.prototype.showTab_ = function(tab) {
  var activeTabCssClass = goog.getCssName('goog-testrunner-activetab');

  var logTabElement = asserts.assert(this.logTabEl_);
  var reportTabElement = asserts.assert(this.reportTabEl_);
  var statsTabElement = asserts.assert(this.statsTabEl_);

  if (tab == 0) {
    this.logEl_.style.display = '';
    classlist.add(logTabElement, activeTabCssClass);
  } else {
    this.logEl_.style.display = 'none';
    classlist.remove(logTabElement, activeTabCssClass);
  }

  if (tab == 1) {
    this.reportEl_.style.display = '';
    classlist.add(reportTabElement, activeTabCssClass);
  } else {
    this.reportEl_.style.display = 'none';
    classlist.remove(reportTabElement, activeTabCssClass);
  }

  if (tab == 2) {
    this.statsEl_.style.display = '';
    classlist.add(statsTabElement, activeTabCssClass);
  } else {
    this.statsEl_.style.display = 'none';
    classlist.remove(statsTabElement, activeTabCssClass);
  }
};


/**
 * Handles the start button being clicked.
 * @param {BrowserEvent} e The click event.
 * @private
 */
MultiTestRunner.prototype.onStartClicked_ = function(e) {
  this.start();
};


/**
 * Handles the stop button being clicked.
 * @param {BrowserEvent} e The click event.
 * @private
 */
MultiTestRunner.prototype.onStopClicked_ = function(e) {
  this.stopped_ = true;
  this.finish_();
};


/**
 * Handles the log tab being clicked.
 * @param {BrowserEvent} e The click event.
 * @private
 */
MultiTestRunner.prototype.onLogTabClicked_ = function(e) {
  this.showTab_(0);
};


/**
 * Handles the log tab being clicked.
 * @param {BrowserEvent} e The click event.
 * @private
 */
MultiTestRunner.prototype.onReportTabClicked_ = function(e) {
  this.showTab_(1);
};


/**
 * Handles the stats tab being clicked.
 * @param {BrowserEvent} e The click event.
 * @private
 */
MultiTestRunner.prototype.onStatsTabClicked_ = function(e) {
  this.showTab_(2);
};



/**
 * Class used to manage the interaction with a single iframe.
 * @param {string} basePath The base path for tests.
 * @param {number} timeoutMs The time to wait for the test to load and run.
 * @param {boolean} verbosePasses Whether to show results for passes.
 * @param {dom.DomHelper=} opt_domHelper Optional dom helper.
 * @constructor
 * @extends {Component}
 * @final
 */
MultiTestRunner.TestFrame = function(
    basePath, timeoutMs, verbosePasses, opt_domHelper) {
  Component.call(this, opt_domHelper);

  /**
   * Base path where tests should be resolved from.
   * @type {string}
   * @private
   */
  this.basePath_ = basePath;

  /**
   * The timeout for the test.
   * @type {number}
   * @private
   */
  this.timeoutMs_ = timeoutMs;

  /**
   * Whether to show a summary for passing tests.
   * @type {boolean}
   * @private
   */
  this.verbosePasses_ = verbosePasses;

  /**
       * An event handler for handling events.
       * @type {EventHandler<!MultiTestRunner.TestFrame>}
       * @private
       */
  this.eh_ = new EventHandler(this);

  /**
     * Object to hold test results. Key is test method or file name (depending on
     * failure mode) and the value is an array of failure messages.
     * @private {!Object<string,!Array<!TestCase.IResult>>}
     */
  this.testResults_ = {};
};
goog.inherits(MultiTestRunner.TestFrame, Component);


/**
 * Reference to the iframe.
 * @type {?HTMLIFrameElement}
 * @private
 */
MultiTestRunner.TestFrame.prototype.iframeEl_ = null;


/**
 * Whether the iframe for the current test has loaded.
 * @type {boolean}
 * @private
 */
MultiTestRunner.TestFrame.prototype.iframeLoaded_ = false;


/**
 * The test file being run.
 * @type {string}
 * @private
 */
MultiTestRunner.TestFrame.prototype.testFile_ = '';


/**
 * The report returned from the test.
 * @type {string}
 * @private
 */
MultiTestRunner.TestFrame.prototype.report_ = '';


/**
 * The total time loading and running the test in milliseconds.
 * @type {number}
 * @private
 */
MultiTestRunner.TestFrame.prototype.totalTime_ = 0;


/**
 * The actual runtime of the test in milliseconds.
 * @type {number}
 * @private
 */
MultiTestRunner.TestFrame.prototype.runTime_ = 0;


/**
 * The number of files loaded by the test.
 * @type {number}
 * @private
 */
MultiTestRunner.TestFrame.prototype.numFilesLoaded_ = 0;


/**
 * Whether the test was successful, null if no result has been returned yet.
 * @type {?boolean}
 * @private
 */
MultiTestRunner.TestFrame.prototype.isSuccess_ = null;


/**
 * Timestamp for the when the test was started.
 * @type {number}
 * @private
 */
MultiTestRunner.TestFrame.prototype.startTime_ = 0;


/**
 * Timestamp for the last state, used to determine timeouts.
 * @type {number}
 * @private
 */
MultiTestRunner.TestFrame.prototype.lastStateTime_ = 0;


/**
 * The state of the active test.
 * @type {number}
 * @private
 */
MultiTestRunner.TestFrame.prototype.currentState_ = 0;


/** @override */
MultiTestRunner.TestFrame.prototype.disposeInternal = function() {
  MultiTestRunner.TestFrame.superClass_.disposeInternal.call(this);
  this.dom_.removeNode(this.iframeEl_);
  this.eh_.dispose();
  this.iframeEl_ = null;
};


/**
 * Runs a test file in this test frame.
 * @param {string} testFile The test to run.
 */
MultiTestRunner.TestFrame.prototype.runTest = function(testFile) {
  this.lastStateTime_ = this.startTime_ = goog.now();

  if (!this.iframeEl_) {
    this.createIframe_();
  }

  this.iframeLoaded_ = false;
  this.currentState_ = 0;
  this.isSuccess_ = null;
  this.report_ = '';
  this.testResults_ = {};
  this.testFile_ = testFile;

  try {
    this.iframeEl_.src = this.basePath_ + testFile;
  } catch (e) {
    // Failures will trigger a JS exception on the local file system.
    this.report_ = this.testFile_ + ' failed to load : ' + e.message;
    this.isSuccess_ = false;
    this.finish_();
    return;
  }

  this.checkForCompletion_();
};


/**
 * @return {string} The test file the TestFrame is running.
 */
MultiTestRunner.TestFrame.prototype.getTestFile = function() {
  return this.testFile_;
};


/**
 * @return {!MultiTestRunner.StatsType_} Stats about the test run.
 */
MultiTestRunner.TestFrame.prototype.getStats = function() {
  return {
    'testFile': this.testFile_,
    'success': this.isSuccess_,
    'runTime': this.runTime_,
    'totalTime': this.totalTime_,
    'numFilesLoaded': this.numFilesLoaded_
  };
};


/**
 * @return {string} The report for the test run.
 */
MultiTestRunner.TestFrame.prototype.getReport = function() {
  return this.report_;
};


/**
 * @return {!Object<string,!Array<!TestCase.IResult>>} The results
 *     per individual test in the file. Key is the test filename concatenated
 *     with the test name, and the array holds failures.
 */
MultiTestRunner.TestFrame.prototype.getTestResults = function() {
  var results = {};
  for (var testName in this.testResults_) {
    var testKey = this.testFile_.replace(/\.html$/, '');
    // Concatenate with ":<testName>" unless the testName is equivalent to
    // testFile_, which means the test timed out or had no test methods and
    // there's no way to get the test method name.
    if (testName != this.testFile_) {
      testKey += ':' + testName;
    }
    results[testKey] = this.testResults_[testName];
  }
  return results;
};


/**
 * @return {?boolean} Whether the test frame had a success.
 */
MultiTestRunner.TestFrame.prototype.isSuccess = function() {
  return this.isSuccess_;
};


/**
 * Handles the TestFrame finishing a single test.
 * @private
 */
MultiTestRunner.TestFrame.prototype.finish_ = function() {
  this.totalTime_ = goog.now() - this.startTime_;
  var parent = this.getParent();
  if (parent instanceof MultiTestRunner) {
    parent.processResult(this);
  }
};


/**
 * Creates an iframe to run the tests in.  For overriding in unit tests.
 * @private
 */
MultiTestRunner.TestFrame.prototype.createIframe_ = function() {
  this.iframeEl_ = this.dom_.createDom(TagName.IFRAME);
  this.getElement().appendChild(this.iframeEl_);
  this.eh_.listen(this.iframeEl_, 'load', this.onIframeLoaded_);
};


/**
 * Handles the iframe loading.
 * @param {BrowserEvent} e The load event.
 * @private
 */
MultiTestRunner.TestFrame.prototype.onIframeLoaded_ = function(e) {
  this.iframeLoaded_ = true;
};


/**
 * Checks the active test for completion, keeping track of the tests' various
 * execution stages.
 * @private
 */
MultiTestRunner.TestFrame.prototype.checkForCompletion_ =
    function() {
      var js = dom.getFrameContentWindow(this.iframeEl_);
      switch (this.currentState_) {
        case 0:
          if (this.iframeLoaded_ && js['G_testRunner']) {
            this.lastStateTime_ = goog.now();
            this.currentState_++;
          }
          break;
        case 1:
          if (js['G_testRunner']['isInitialized']()) {
            this.lastStateTime_ = goog.now();
            this.currentState_++;
          }
          break;
        case 2:
          if (js['G_testRunner']['isFinished']()) {
            var tr = js['G_testRunner'];
            this.isSuccess_ = tr['isSuccess']();
            this.report_ = tr['getReport'](this.verbosePasses_);
            this.testResults_ = tr['getTestResults']();
            // If there is a syntax error, or no tests, it's not possible to get the
            // individual test method results from TestCase. So just create one here
            // based on the test report and filename.
            if (object.isEmpty(this.testResults_)) {
              // Existence of a report is a signal of a test failure by the test
              // runner.
              this.testResults_[this.testFile_] = this.isSuccess_ ? [] : [{
                'message': this.report_,
                'source': this.testFile_,
                'stacktrace': ''
              }];
            }
            this.runTime_ = tr['getRunTime']();
            this.numFilesLoaded_ = tr['getNumFilesLoaded']();
            this.finish_();
            return;
          }
      }

      // Check to see if the test has timed out.
      if (goog.now() - this.lastStateTime_ > this.timeoutMs_) {
        this.report_ = this.testFile_ + ' timed out  ' +
            MultiTestRunner.STATES[this.currentState_];
        this.testResults_[this.testFile_] =
            [{'message': this.report_, 'source': this.testFile_, 'stacktrace': ''}];
        this.isSuccess_ = false;
        this.finish_();
        return;
      }

      // Check again in 100ms.
      Timer.callOnce(this.checkForCompletion_, 100, this);
    };
