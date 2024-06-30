/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides functions to parse and manipulate internationalized
 * email addresses. This is useful in the context of Email Address
 * Internationalization (EAI) as defined by RFC6530.
 */

import { EmailAddress } from './emailaddress.js';

import * as googString from '../string/string.js';



/**
 * Formats an email address string for display, and allows for extraction of
 * the individual components of the address.
 * @param {string=} opt_address The email address.
 * @param {string=} opt_name The name associated with the email address.
 * @constructor
 * @extends {EmailAddress}
 */
export function InternationalizedEmailAddress(opt_address, opt_name) {
 InternationalizedEmailAddress.base(
     this, 'constructor', opt_address, opt_name);
}
goog.inherits(
    InternationalizedEmailAddress, EmailAddress);


/**
 * A string representing the RegExp for the local part of an EAI email address.
 * @private
 */
const EAI_LOCAL_PART_REGEXP_STR_ =
    '((?!\\s)[+a-zA-Z0-9_.!#$%&\'*\\/=?^`{|}~\u0080-\uFFFFFF-])+';


/**
 * A string representing the RegExp for a label in the domain part of an EAI
 * email address.
 * @private
 */
const EAI_LABEL_CHAR_REGEXP_STR_ =
    '(?!\\s)[a-zA-Z0-9\u0080-\u3001\u3003-\uFF0D\uFF0F-\uFF60\uFF62-\uFFFFFF-]';


/**
 * A string representing the RegExp for the domain part of an EAI email address.
 * @private
 */
const EAI_DOMAIN_PART_REGEXP_STR_ =
    // A unicode character (ASCII or Unicode excluding periods)
    '(' + EAI_LABEL_CHAR_REGEXP_STR_ +
    // Such character 1+ times, followed by a Unicode period. All 1+ times.
    '+[\\.\\uFF0E\\u3002\\uFF61])+' +
    // And same thing but without a period in the end
    EAI_LABEL_CHAR_REGEXP_STR_ +
    '{2,63}';


/**
 * Match string for address separators. This list is the result of the
 * discussion in b/16241003.
 * @type {string}
 * @private
 */
InternationalizedEmailAddress.ADDRESS_SEPARATORS_ =
    ',' +       // U+002C ( , ) COMMA
    ';' +       // U+003B ( ; ) SEMICOLON
    '\u055D' +  // ( ՝ ) ARMENIAN COMMA
    '\u060C' +  // ( ، ) ARABIC COMMA
    '\u1363' +  // ( ፣ ) ETHIOPIC COMMA
    '\u1802' +  // ( ᠂ ) MONGOLIAN COMMA
    '\u1808' +  // ( ᠈ ) MONGOLIAN MANCHU COMMA
    '\u2E41' +  // ( ⹁ ) REVERSED COMMA
    '\u3001' +  // ( 、 ) IDEOGRAPHIC COMMA
    '\uFF0C' +  // ( ， ) FULLWIDTH COMMA
    '\u061B' +  // ( ‎؛‎ ) ARABIC SEMICOLON
    '\u1364' +  // ( ፤ ) ETHIOPIC SEMICOLON
    '\uFF1B' +  // ( ； ) FULLWIDTH SEMICOLON
    '\uFF64' +  // ( ､ ) HALFWIDTH IDEOGRAPHIC COMMA
    '\u104A';   // ( ၊ ) MYANMAR SIGN LITTLE SECTION


/**
 * Match string for characters that, when in a display name, require it to be
 * quoted.
 * @type {string}
 * @private
 */
InternationalizedEmailAddress.CHARS_REQUIRE_QUOTES_ =
    EmailAddress.SPECIAL_CHARS +
    InternationalizedEmailAddress.ADDRESS_SEPARATORS_;


/**
 * A RegExp to match the local part of an EAI email address.
 * @private {!RegExp}
 */
InternationalizedEmailAddress.EAI_LOCAL_PART_ = new RegExp(
    '^' + EAI_LOCAL_PART_REGEXP_STR_ +
    '$');


/**
 * A RegExp to match the domain part of an EAI email address.
 * @private {!RegExp}
 */
InternationalizedEmailAddress.EAI_DOMAIN_PART_ = new RegExp(
    '^' +
    EAI_DOMAIN_PART_REGEXP_STR_ +
    '$');


/**
 * A RegExp to match an EAI email address.
 * @private {!RegExp}
 */
InternationalizedEmailAddress.EAI_EMAIL_ADDRESS_ = new RegExp(
    '^' + EAI_LOCAL_PART_REGEXP_STR_ +
    '@' +
    EAI_DOMAIN_PART_REGEXP_STR_ +
    '$');


/**
 * Checks if the provided string is a valid local part (part before the '@') of
 * an EAI email address.
 * @param {string} str The local part to check.
 * @return {boolean} Whether the provided string is a valid local part.
 */
InternationalizedEmailAddress.isValidLocalPartSpec = function(str) {
 if (str == null) {
   return false;
 }
 return InternationalizedEmailAddress.EAI_LOCAL_PART_.test(str);
};


/**
 * Checks if the provided string is a valid domain part (part after the '@') of
 * an EAI email address.
 * @param {string} str The domain part to check.
 * @return {boolean} Whether the provided string is a valid domain part.
 */
InternationalizedEmailAddress.isValidDomainPartSpec = function(
    str) {
 if (str == null) {
   return false;
 }
 return InternationalizedEmailAddress.EAI_DOMAIN_PART_.test(str);
};


/** @override */
InternationalizedEmailAddress.prototype.isValid = function() {
 return InternationalizedEmailAddress.isValidAddrSpec(
     this.address);
};


/**
 * Checks if the provided string is a valid email address. Supports both
 * simple email addresses (address specs) and addresses that contain display
 * names.
 * @param {string} str The email address to check.
 * @return {boolean} Whether the provided string is a valid address.
 */
InternationalizedEmailAddress.isValidAddress = function(str) {
 if (str == null) {
   return false;
 }
 return InternationalizedEmailAddress.parse(str).isValid();
};


/**
 * Checks if the provided string is a valid address spec (local@domain.com).
 * @param {string} str The email address to check.
 * @return {boolean} Whether the provided string is a valid address spec.
 */
InternationalizedEmailAddress.isValidAddrSpec = function(str) {
 if (str == null) {
   return false;
 }

 // This is a fairly naive implementation, but it covers 99% of use cases.
 // For more details, see http://en.wikipedia.org/wiki/Email_address#Syntax
 return InternationalizedEmailAddress.EAI_EMAIL_ADDRESS_.test(str);
};


/**
 * Parses a string containing email addresses of the form
 * "name" &lt;address&gt; into an array of email addresses.
 * @param {string} str The address list.
 * @return {!Array<!EmailAddress>} The parsed emails.
 */
InternationalizedEmailAddress.parseList = function(str) {
 return EmailAddress.parseListInternal(
     str, InternationalizedEmailAddress.parse,
     InternationalizedEmailAddress.isAddressSeparator);
};


/**
 * Parses an email address of the form "name" &lt;address&gt; into
 * an email address.
 * @param {string} addr The address string.
 * @return {!EmailAddress} The parsed address.
 */
InternationalizedEmailAddress.parse = function(addr) {
 return EmailAddress.parseInternal(
     addr, InternationalizedEmailAddress);
};


/**
 * @param {string} ch The character to test.
 * @return {boolean} Whether the provided character is an address separator.
 */
InternationalizedEmailAddress.isAddressSeparator = function(ch) {
 return googString.contains(
     InternationalizedEmailAddress.ADDRESS_SEPARATORS_, ch);
};


/**
 * Return the address in a standard format:
 *  - remove extra spaces.
 *  - Surround name with quotes if it contains special characters.
 * @return {string} The cleaned address.
 * @override
 */
InternationalizedEmailAddress.prototype.toString = function() {
 return this.toStringInternal(
     InternationalizedEmailAddress.CHARS_REQUIRE_QUOTES_);
};
