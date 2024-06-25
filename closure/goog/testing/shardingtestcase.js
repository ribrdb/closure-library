/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility for sharding tests.
 *
 * Usage instructions:
 * <ol>
 *   <li>Instead of writing your large test in foo_test.html, write it in
 * foo_test_template.html</li>
 *   <li>Add a call to `ShardingTestCase.shardByFileName()`
 * near the top of your test, before any test cases or setup methods.</li>
 *   <li>Symlink foo_test_template.html into different sharded test files
 * named foo_1of4_test.html, foo_2of4_test.html, etc, using `ln -s`.</li>
 *   <li>Add the symlinks as foo_1of4_test.html.
 *       In perforce, run the command `g4 add foo_1of4_test.html` followed
 * by `g4 reopen -t symlink foo_1of4_test.html` so that perforce treats the file
 * as a symlink
 *   </li>
 * </ol>
 */

goog.setTestOnly('goog.testing.ShardingTestCase');

import * as asserts from '../asserts/asserts.js';
import { TestCase } from './testcase.js';



/**
 * A test case that runs tests in per-file shards.
 * @param {number} shardIndex Shard index for this page,
 *     <strong>1-indexed</strong>.
 * @param {number} numShards Number of shards to split up test cases into.
 * @param {string=} opt_name The name of the test case.
 * @extends {TestCase}
 * @constructor
 * @final
 */
export function ShardingTestCase(shardIndex, numShards, opt_name) {
 ShardingTestCase.base(this, 'constructor', opt_name);

 asserts.assert(shardIndex > 0, 'Shard index should be positive');
 asserts.assert(numShards > 0, 'Number of shards should be positive');
 asserts.assert(shardIndex <= numShards, 'Shard index out of bounds');

 /**
  * @type {number}
  * @private
  */
 this.shardIndex_ = shardIndex;

 /**
  * @type {number}
  * @private
  */
 this.numShards_ = numShards;
}
goog.inherits(ShardingTestCase, TestCase);


/**
 * Whether we've actually partitioned the tests yet. We may execute twice
 * ('Run again without reloading') without failing.
 * @type {boolean}
 * @private
 */
ShardingTestCase.prototype.sharded_ = false;


/**
 * Installs a runTests global function that goog.testing.JsUnit will use to
 * run tests, which will run a single shard of the tests present on the page.
 * @override
 */
ShardingTestCase.prototype.runTests = function() {
 if (!this.sharded_) {
   var numTests = this.getCount();
   asserts.assert(
       numTests >= this.numShards_,
       'Must have at least as many tests as shards!');
   var shardSize = Math.ceil(numTests / this.numShards_);
   var startIndex = (this.shardIndex_ - 1) * shardSize;
   var endIndex = startIndex + shardSize;
   asserts.assert(
       this.order == TestCase.Order.SORTED,
       'Only SORTED order is allowed for sharded tests');
   this.setTests(this.getTests().slice(startIndex, endIndex));
   this.sharded_ = true;
 }

 // Call original runTests method to execute the tests.
 ShardingTestCase.base(this, 'runTests');
};


/**
 * Shards tests based on the test filename. Assumes that the filename is
 * formatted like 'foo_1of5_test.html'.
 * @param {string=} opt_name A descriptive name for the test case.
 */
ShardingTestCase.shardByFileName = function(opt_name) {
 var path = window.location.pathname;
 var shardMatch = path.match(/_(\d+)of(\d+)_test\.(js|html)/);
 asserts.assert(
     shardMatch, 'Filename must be of the form "foo_1of5_test.{js,html}"');
 var shardIndex = parseInt(shardMatch[1], 10);
 var numShards = parseInt(shardMatch[2], 10);

 var testCase =
     new ShardingTestCase(shardIndex, numShards, opt_name);
 TestCase.initializeTestRunner(testCase);
};
