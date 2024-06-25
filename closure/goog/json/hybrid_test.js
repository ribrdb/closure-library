/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Unit tests for hybrid. */

goog.setTestOnly();

import { PropertyReplacer } from '../testing/propertyreplacer.js';
import * as googJson from './json.js';
import * as hybrid from './hybrid.js';
import { recordFunction } from '../testing/recordfunction.js';
import { testSuite } from '../testing/testsuite.js';

const propertyReplacer = new PropertyReplacer();

let jsonParse;
let jsonStringify;
let googJsonParse;
let googJsonSerialize;

function parseJson() {
  const obj = hybrid.parse('{"a": 2}');
  assertObjectEquals({'a': 2}, obj);
}

function serializeJson() {
  const str = hybrid.stringify({b: 2});
  assertEquals('{"b":2}', str);
}

testSuite({
  setUp() {
    googJsonParse = recordFunction(googJson.parse);
    googJsonSerialize = recordFunction(googJson.serialize);

    propertyReplacer.set(googJson, 'parse', googJsonParse);
    propertyReplacer.set(googJson, 'serialize', googJsonSerialize);

    jsonParse = recordFunction(globalThis.JSON && globalThis.JSON.parse);
    jsonStringify =
        recordFunction(globalThis.JSON && globalThis.JSON.stringify);

    if (globalThis.JSON) {
      propertyReplacer.set(globalThis.JSON, 'parse', jsonParse);
      propertyReplacer.set(globalThis.JSON, 'stringify', jsonStringify);
    }
  },

  tearDown() {
    propertyReplacer.reset();
  },

  testParseNativeJsonPresent() {
    parseJson();
    assertEquals(1, jsonParse.getCallCount());
    assertEquals(0, googJsonParse.getCallCount());
  },

  testStringifyNativeJsonPresent() {
    serializeJson();

    assertEquals(1, jsonStringify.getCallCount());
    assertEquals(0, googJsonSerialize.getCallCount());
  },

  testParseNativeJsonAbsent() {
    propertyReplacer.set(globalThis, 'JSON', null);

    parseJson();

    assertEquals(0, jsonParse.getCallCount());
    assertEquals(0, jsonStringify.getCallCount());
    assertEquals(1, googJsonParse.getCallCount());
  },

  testStringifyNativeJsonAbsent() {
    propertyReplacer.set(globalThis, 'JSON', null);

    serializeJson();

    assertEquals(0, jsonStringify.getCallCount());
    assertEquals(1, googJsonSerialize.getCallCount());
  },

  testParseCurrentBrowserParse() {
    parseJson();
    assertEquals(1, jsonParse.getCallCount());
    assertEquals(0, googJsonParse.getCallCount());
  },

  testParseCurrentBrowserStringify() {
    serializeJson();
    assertEquals(1, jsonStringify.getCallCount());
    assertEquals(0, googJsonSerialize.getCallCount());
  },
});
