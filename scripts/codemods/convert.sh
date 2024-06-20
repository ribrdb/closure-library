#!/usr/bin/env bash
set -e
cd $(dirname $0)/../..
rm -f namespaces.txt
grep -l '^goog.module' closure/**/*.js third_party/**/*.js|xargs ./node_modules/.bin/jscodeshift -t scripts/codemods/googmodule_to_es6.js
grep -l goog.provide closure/**/*.js third_party/**/*.js|xargs ./node_modules/.bin/jscodeshift -t scripts/codemods/closure_to_es6.2.js
grep '^export ' closure/**/*.js closure/goog/../../third_party/**/*.js >exports.grep                 
node scripts/genexports.js
grep -l '^goog.require' closure/**/*.js third_party/**/*.js|xargs ./node_modules/.bin/jscodeshift -t scripts/codemods/imports.js