/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This file contains classes to handle IPv4 and IPv6 addresses.
 * This implementation is mostly based on Google's project:
 * http://code.google.com/p/ipaddr-py/.
 */


// TODO(user): We're trying to migrate all ES5 subclasses of Closure
// Library to ES6. In ES6 this cannot be referenced before super is called. This
// file has at least one this before a super call (in ES5) and cannot be
// automatically upgraded to ES6 as a result. Please fix this if you have a
// chance. Note: This can sometimes be caused by not calling the super
// constructor at all. You can run the conversion tool yourself to see what it
// does on this file: blaze run //javascript/refactoring/es6_classes:convert.

import * as array from '../array/array.js';

import { Integer } from '../math/integer.js';
import object from '../object/object.js';
import * as googString from '../string/string.js';


/**
 * Abstract class defining an IP Address.
 *
 * Please use IpAddress static methods or
 * Ipv4Address/Ipv6Address classes.
 *
 * @param {!Integer} address The Ip Address.
 * @param {number} version The version number (4, 6).
 * @constructor
 */
export function IpAddress(address, version) {
  /**
     * The IP Address.
     * @type {!Integer}
     * @private
     */
  this.ip_ = address;

  /**
   * The IP Address version.
   * @type {number}
   * @private
   */
  this.version_ = version;
}


/**
 * @return {number} The IP Address version.
 */
IpAddress.prototype.getVersion = function() {
  return this.version_;
};


/**
 * @param {!IpAddress} other The other IP Address.
 * @return {boolean} true if the IP Addresses are equal.
 */
IpAddress.prototype.equals = function(other) {
  return (
      this.version_ == other.getVersion() &&
      this.ip_.equals(other.toInteger()));
};


/**
 * @return {!Integer} The IP Address, as an Integer.
 */
IpAddress.prototype.toInteger = function() {
  return /** @type {!Integer} */ (object.clone(this.ip_));
};


/**
 * @return {string} The IP Address, as an URI string following RFC 3986.
 */
IpAddress.prototype.toUriString = goog.abstractMethod;


/**
 * @return {string} The IP Address, as a string.
 * @override
 */
IpAddress.prototype.toString = goog.abstractMethod;


/**
 * @return {boolean} Whether or not the address is site-local.
 */
IpAddress.prototype.isSiteLocal = goog.abstractMethod;


/**
 * @return {boolean} Whether or not the address is link-local.
 */
IpAddress.prototype.isLinkLocal = goog.abstractMethod;


/**
 * Parses an IP Address in a string.
 * If the string is malformed, the function will simply return null
 * instead of raising an exception.
 *
 * @param {string} address The IP Address.
 * @see {Ipv4Address}
 * @see {Ipv6Address}
 * @return {IpAddress} The IP Address or null.
 */
IpAddress.fromString = function(address) {
  try {
    if (address.indexOf(':') != -1) {
      return new Ipv6Address(address);
    }

    return new Ipv4Address(address);
  } catch (e) {
    // Both constructors raise exception if the address is malformed (ie.
    // invalid). The user of this function should not care about catching
    // the exception, espcially if it's used to validate an user input.
    return null;
  }
};


/**
 * Tries to parse a string represented as a host portion of an URI.
 * See RFC 3986 for more details on IPv6 addresses inside URI.
 * If the string is malformed, the function will simply return null
 * instead of raising an exception.
 *
 * @param {string} address A RFC 3986 encoded IP address.
 * @see {Ipv4Address}
 * @see {Ipv6Address}
 * @return {IpAddress} The IP Address.
 */
IpAddress.fromUriString = function(address) {
  try {
    if (googString.startsWith(address, '[') &&
        googString.endsWith(address, ']')) {
      return new Ipv6Address(
          address.substring(1, address.length - 1));
    }

    return new Ipv4Address(address);
  } catch (e) {
    // Both constructors raise exception if the address is malformed (ie.
    // invalid). The user of this function should not care about catching
    // the exception, espcially if it's used to validate an user input.
    return null;
  }
};



/**
 * Takes a string or a number and returns a IPv4 Address.
 *
 * This constructor accepts strings and instance of Integer.
 * If you pass a Integer, make sure that its sign is set to positive.
 * @param {(string|!Integer)} address The address to store.
 * @extends {IpAddress}
 * @constructor
 * @final
 */
export function Ipv4Address(address) {
  /**
   * The cached string representation of the IP Address.
   * @type {?string}
   * @private
   */
  this.ipStr_ = null;

  let ip = Integer.ZERO;
  if (address instanceof Integer) {
    if (address.getSign() != 0 || address.lessThan(Integer.ZERO) ||
        address.greaterThan(Ipv4Address.MAX_ADDRESS_)) {
      throw new Error('The address does not look like an IPv4.');
    } else {
      ip = object.clone(address);
    }
  } else {
    if (!Ipv4Address.REGEX_.test(address)) {
      throw new Error(address + ' does not look like an IPv4 address.');
    }

    const octets = address.split('.');
    if (octets.length != 4) {
      throw new Error(address + ' does not look like an IPv4 address.');
    }

    for (let i = 0; i < octets.length; i++) {
      const parsedOctet = googString.toNumber(octets[i]);
      if (isNaN(parsedOctet) || parsedOctet < 0 || parsedOctet > 255 ||
          (octets[i].length != 1 && googString.startsWith(octets[i], '0'))) {
        throw new Error('In ' + address + ', octet ' + i + ' is not valid');
      }
      const intOctet = Integer.fromNumber(parsedOctet);
      ip = ip.shiftLeft(8).or(intOctet);
    }
  }
  Ipv4Address.base(
      this, 'constructor', /** @type {!Integer} */ (ip), 4);
}
goog.inherits(Ipv4Address, IpAddress);


/**
 * Regular expression matching all the allowed chars for IPv4.
 * @type {RegExp}
 * @private
 * @const
 */
Ipv4Address.REGEX_ = /^[0-9.]*$/;


/**
 * The Maximum length for a netmask (aka, the number of bits for IPv4).
 * @type {number}
 * @const
 */
Ipv4Address.MAX_NETMASK_LENGTH = 32;


/**
 * The Maximum address possible for IPv4.
 * @type {Integer}
 * @private
 * @const
 */
Ipv4Address.MAX_ADDRESS_ =
    Integer.ONE
        .shiftLeft(Ipv4Address.MAX_NETMASK_LENGTH)
        .subtract(Integer.ONE);


/**
 * @override
 */
Ipv4Address.prototype.toString = function() {
  if (this.ipStr_) {
    return this.ipStr_;
  }

  let ip = this.ip_.getBitsUnsigned(0);
  const octets = [];
  for (let i = 3; i >= 0; i--) {
    octets[i] = String((ip & 0xff));
    ip = ip >>> 8;
  }

  this.ipStr_ = octets.join('.');

  return this.ipStr_;
};


/**
 * @override
 */
Ipv4Address.prototype.toUriString = function() {
  return this.toString();
};


/**
 * @override
 */
Ipv4Address.prototype.isSiteLocal = function() {
  // Check for prefix 10/8, 172.16/12, or 192.168/16.
  const ipInt = this.ip_.toInt();
  return (((ipInt >>> 24) & 0xff) == 10) ||
      ((((ipInt >>> 24) & 0xff) == 172) && (((ipInt >>> 16) & 0xf0) == 16)) ||
      ((((ipInt >>> 24) & 0xff) == 192) && (((ipInt >>> 16) & 0xff) == 168));
};


/**
 * @override
 */
Ipv4Address.prototype.isLinkLocal = function() {
  // Check for prefix 169.254/16.
  const ipInt = this.ip_.toInt();
  return (((ipInt >>> 24) & 0xff) == 169) && (((ipInt >>> 16) & 0xff) == 254);
};


/**
 * Takes a string or a number and returns an IPv6 Address.
 *
 * This constructor accepts strings and instance of Integer.
 * If you pass a Integer, make sure that its sign is set to positive.
 * @param {(string|!Integer)} address The address to store.
 * @constructor
 * @extends {IpAddress}
 * @final
 */
export function Ipv6Address(address) {
  /**
   * The cached string representation of the IP Address.
   * @type {?string}
   * @private
   */
  this.ipStr_ = null;

  let ip = Integer.ZERO;
  if (address instanceof Integer) {
    if (address.getSign() != 0 || address.lessThan(Integer.ZERO) ||
        address.greaterThan(Ipv6Address.MAX_ADDRESS_)) {
      throw new Error('The address does not look like a valid IPv6.');
    } else {
      ip = object.clone(address);
    }
  } else {
    if (!Ipv6Address.REGEX_.test(address)) {
      throw new Error(address + ' is not a valid IPv6 address.');
    }

    const splitColon = address.split(':');
    if (splitColon[splitColon.length - 1].indexOf('.') != -1) {
      const newHextets = Ipv6Address.dottedQuadtoHextets_(
          splitColon[splitColon.length - 1]);
      array.removeAt(splitColon, splitColon.length - 1);
      array.extend(splitColon, newHextets);
      address = splitColon.join(':');
    }

    const splitDoubleColon = address.split('::');
    if (splitDoubleColon.length > 2 ||
        (splitDoubleColon.length == 1 && splitColon.length != 8)) {
      throw new Error(address + ' is not a valid IPv6 address.');
    }

    let ipArr;
    if (splitDoubleColon.length > 1) {
      ipArr = Ipv6Address.explode_(splitDoubleColon);
    } else {
      ipArr = splitColon;
    }

    if (ipArr.length != 8) {
      throw new Error(address + ' is not a valid IPv6 address');
    }

    for (let i = 0; i < ipArr.length; i++) {
      const parsedHextet = Integer.fromString(ipArr[i], 16);
      if (parsedHextet.lessThan(Integer.ZERO) ||
          parsedHextet.greaterThan(
              Ipv6Address.MAX_HEXTET_VALUE_)) {
        throw new Error(
            ipArr[i] + ' in ' + address + ' is not a valid hextet.');
      }
      ip = ip.shiftLeft(16).or(parsedHextet);
    }
  }
  Ipv6Address.base(
      this, 'constructor', /** @type {!Integer} */ (ip), 6);
}
goog.inherits(Ipv6Address, IpAddress);


/**
 * Regular expression matching all allowed chars for an IPv6.
 * @type {RegExp}
 * @private
 * @const
 */
Ipv6Address.REGEX_ = /^([a-fA-F0-9]*:){2}[a-fA-F0-9:.]*$/;


/**
 * The Maximum length for a netmask (aka, the number of bits for IPv6).
 * @type {number}
 * @const
 */
Ipv6Address.MAX_NETMASK_LENGTH = 128;


/**
 * The maximum value of a hextet.
 * @type {Integer}
 * @private
 * @const
 */
Ipv6Address.MAX_HEXTET_VALUE_ =
    Integer.fromInt(65535);


/**
 * The Maximum address possible for IPv6.
 * @type {Integer}
 * @private
 * @const
 */
Ipv6Address.MAX_ADDRESS_ =
    Integer.ONE
        .shiftLeft(Ipv6Address.MAX_NETMASK_LENGTH)
        .subtract(Integer.ONE);


/**
 * @override
 */
Ipv6Address.prototype.toString = function() {
  if (this.ipStr_) {
    return this.ipStr_;
  }

  let outputArr = [];
  for (let i = 3; i >= 0; i--) {
    const bits = this.ip_.getBitsUnsigned(i);
    const firstHextet = bits >>> 16;
    const secondHextet = bits & 0xffff;
    outputArr.push(firstHextet.toString(16));
    outputArr.push(secondHextet.toString(16));
  }

  outputArr = Ipv6Address.compress_(outputArr);
  this.ipStr_ = outputArr.join(':');
  return this.ipStr_;
};


/**
 * @override
 */
Ipv6Address.prototype.toUriString = function() {
  return '[' + this.toString() + ']';
};


/**
 * @override
 */
Ipv6Address.prototype.isSiteLocal = function() {
  // Check for prefix fd00::/8.
  const firstDWord = this.ip_.getBitsUnsigned(3);
  const firstHextet = firstDWord >>> 16;
  return (firstHextet & 0xff00) == 0xfd00;
};


/**
 * @override
 */
Ipv6Address.prototype.isLinkLocal = function() {
  // Check for prefix fe80::/10.
  const firstDWord = this.ip_.getBitsUnsigned(3);
  const firstHextet = firstDWord >>> 16;
  return (firstHextet & 0xffc0) == 0xfe80;
};


/**
 * This method is in charge of expanding/exploding an IPv6 string from its
 * compressed form.
 * @private
 * @param {!Array<string>} address An IPv6 address split around '::'.
 * @return {!Array<string>} The expanded version of the IPv6.
 */
Ipv6Address.explode_ = function(address) {
  let basePart = address[0].split(':');
  let secondPart = address[1].split(':');

  if (basePart.length == 1 && basePart[0] == '') {
    basePart = [];
  }
  if (secondPart.length == 1 && secondPart[0] == '') {
    secondPart = [];
  }

  // Now we fill the gap with 0.
  const gap = 8 - (basePart.length + secondPart.length);

  if (gap < 1) {
    return [];
  }

  return array.join(basePart, (new Array(gap)).fill('0'), secondPart);
};


/**
 * This method is in charge of compressing an expanded IPv6 array of hextets.
 * @private
 * @param {!Array<string>} hextets The array of hextet.
 * @return {!Array<string>} The compressed version of this array.
 */
Ipv6Address.compress_ = function(hextets) {
  let bestStart = -1;
  let start = -1;
  let bestSize = 0;
  let size = 0;
  for (let i = 0; i < hextets.length; i++) {
    if (hextets[i] == '0') {
      size++;
      if (start == -1) {
        start = i;
      }
      if (size > bestSize) {
        bestSize = size;
        bestStart = start;
      }
    } else {
      start = -1;
      size = 0;
    }
  }

  if (bestSize > 0) {
    if ((bestStart + bestSize) == hextets.length) {
      hextets.push('');
    }
    hextets.splice(bestStart, bestSize, '');

    if (bestStart == 0) {
      hextets = [''].concat(hextets);
    }
  }
  return hextets;
};


/**
 * This method will convert an IPv4 to a list of 2 hextets.
 *
 * For instance, 1.2.3.4 will be converted to ['0102', '0304'].
 * @private
 * @param {string} quads An IPv4 as a string.
 * @return {!Array<string>} A list of 2 hextets.
 */
Ipv6Address.dottedQuadtoHextets_ = function(quads) {
  const ip4 = new Ipv4Address(quads).toInteger();
  const bits = ip4.getBitsUnsigned(0);
  const hextets = [];

  hextets.push(((bits >>> 16) & 0xffff).toString(16));
  hextets.push((bits & 0xffff).toString(16));

  return hextets;
};


/**
 * @return {boolean} true if the IPv6 contains a mapped IPv4.
 */
Ipv6Address.prototype.isMappedIpv4Address = function() {
  return (
      this.ip_.getBitsUnsigned(3) == 0 && this.ip_.getBitsUnsigned(2) == 0 &&
      this.ip_.getBitsUnsigned(1) == 0xffff);
};


/**
 * Will return the mapped IPv4 address in this IPv6 address.
 * @return {Ipv4Address} an IPv4 or null.
 */
Ipv6Address.prototype.getMappedIpv4Address = function() {
  if (!this.isMappedIpv4Address()) {
    return null;
  }

  const newIpv4 = new Integer([this.ip_.getBitsUnsigned(0)], 0);
  return new Ipv4Address(newIpv4);
};
