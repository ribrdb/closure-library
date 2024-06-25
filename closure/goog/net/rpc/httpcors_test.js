/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly('goog.net.rpc.HttpCorsTest');

import { Uri as GoogUri } from '../../uri/uri.js';
import * as HttpCors from './httpcors.js';
import { testSuite } from '../../testing/testsuite.js';


testSuite({
  testSingleHeader: function() {
    const headers = {'foo': 'bar'};
    const value = HttpCors.generateHttpHeadersOverwriteParam(headers);
    assertEquals('foo:bar\r\n', value);
    const encoded_value =
        HttpCors.generateEncodedHttpHeadersOverwriteParam(headers);
    assertEquals('foo%3Abar%0D%0A', encoded_value);
  },

  testMultipleHeaders: function() {
    const headers = {'foo1': 'bar1', 'foo2': 'bar2'};
    const value = HttpCors.generateHttpHeadersOverwriteParam(headers);
    assertEquals('foo1:bar1\r\nfoo2:bar2\r\n', value);
    const encoded_value =
        HttpCors.generateEncodedHttpHeadersOverwriteParam(headers);
    assertEquals('foo1%3Abar1%0D%0Afoo2%3Abar2%0D%0A', encoded_value);
  },

  testSetUrl: function() {
    const headers = {'foo': 'bar'};
    const urlString = '/example.com/';
    const newUrlString = HttpCors.setHttpHeadersWithOverwriteParam(
        urlString, '$httpHeaders', headers);
    assertEquals('/example.com/?%24httpHeaders=foo%3Abar%0D%0A', newUrlString);

    const url = new GoogUri(urlString);
    const newUrl =
        HttpCors.setHttpHeadersWithOverwriteParam(url, '$httpHeaders', headers);
    assertEquals(
        '/example.com/?%24httpHeaders=foo%3Abar%0D%0A', newUrl.toString());
  },

  testSetUrlAppend: function() {
    const headers = {'foo': 'bar'};
    const urlString = '/example.com/?abc=12';
    const newUrlString = HttpCors.setHttpHeadersWithOverwriteParam(
        urlString, '$httpHeaders', headers);
    assertEquals(
        '/example.com/?abc=12&%24httpHeaders=foo%3Abar%0D%0A', newUrlString);

    const url = new GoogUri(urlString);
    const newUrl =
        HttpCors.setHttpHeadersWithOverwriteParam(url, '$httpHeaders', headers);
    assertEquals(
        '/example.com/?abc=12&%24httpHeaders=foo%3Abar%0D%0A',
        newUrl.toString());
  },

  testSetUrlMultiHeaders: function() {
    const headers = {'foo1': 'bar1', 'foo2': 'bar2'};
    const urlString = '/example.com/';
    const newUrlString = HttpCors.setHttpHeadersWithOverwriteParam(
        urlString, '$httpHeaders', headers);
    assertEquals(
        '/example.com/?%24httpHeaders=foo1%3Abar1%0D%0Afoo2%3Abar2%0D%0A',
        newUrlString);

    const url = new GoogUri(urlString);
    const newUrl =
        HttpCors.setHttpHeadersWithOverwriteParam(url, '$httpHeaders', headers);
    assertEquals(
        '/example.com/?%24httpHeaders=foo1%3Abar1%0D%0Afoo2%3Abar2%0D%0A',
        newUrl.toString());
  },

  testSetUrlEmptyHeaders: function() {
    const headers = {};
    const urlString = '/example.com/';
    const newUrlString = HttpCors.setHttpHeadersWithOverwriteParam(
        urlString, '$httpHeaders', headers);
    assertEquals('/example.com/', newUrlString);

    const url = new GoogUri(urlString);
    const newUrl =
        HttpCors.setHttpHeadersWithOverwriteParam(url, '$httpHeaders', headers);
    assertEquals('/example.com/', newUrl.toString());
  },
});
