#!/bin/zsh
set -e
# set -x
cd $(dirname $0)/../..
pwd
git checkout -- closure third_party
rm -f namespaces.txt provide.log
grep -l goog.provide closure/**/*.js third_party/**/*.js|xargs ./node_modules/.bin/jscodeshift -t scripts/codemods/closure_to_es6.2.js --fail-on-error #>provide.log
grep -l '^goog.module' closure/**/*.js third_party/**/*.js|xargs ./node_modules/.bin/jscodeshift -t scripts/codemods/googmodule_to_es6.js --fail-on-error 
grep '^export ' closure/**/*.js third_party/**/*.js >exports.grep                 
node scripts/genexports.js
grep -l 'goog.require' closure/**/*.js third_party/**/*.js|xargs ./node_modules/.bin/jscodeshift -t scripts/codemods/imports.js --fail-on-error 