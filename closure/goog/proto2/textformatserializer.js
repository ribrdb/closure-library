/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Protocol Buffer 2 Serializer which serializes messages
 *  into a user-friendly text format. Note that this code can run a bit
 *  slowly (especially for parsing) and should therefore not be used for
 *  time or space-critical applications.
 *
 * @see http://goo.gl/QDmDr
 */

import * as asserts from '../asserts/asserts.js';

import * as math from '../math/math.js';
import { Long } from '../math/long.js';
import object from '../object/object.js';
import { FieldDescriptor } from './fielddescriptor.js';
import { Message } from './message.js';
import { Serializer } from './serializer.js';
import * as googString from '../string/string.js';



/**
 * TextFormatSerializer, a serializer which turns Messages into the human
 * readable text format.
 * @param {boolean=} opt_ignoreMissingFields If true, then fields that cannot be
 *     found on the proto when parsing the text format will be ignored.
 * @param {boolean=} opt_useEnumValues If true, serialization code for enums
 *     will use enum integer values instead of human-readable symbolic names.
 * @constructor
 * @extends {Serializer}
 * @final
 */
export function TextFormatSerializer(opt_ignoreMissingFields, opt_useEnumValues) {
  /**
   * Whether to ignore fields not defined on the proto when parsing the text
   * format.
   * @type {boolean}
   * @private
   */
  this.ignoreMissingFields_ = !!opt_ignoreMissingFields;

  /**
   * Whether to use integer enum values during enum serialization.
   * If false, symbolic names will be used.
   * @type {boolean}
   * @private
   */
  this.useEnumValues_ = !!opt_useEnumValues;
}
goog.inherits(TextFormatSerializer, Serializer);


/**
 * Deserializes a message from text format and places the data in the message.
 * @param {Message} message The message in which to
 *     place the information.
 * @param {*} data The text format data.
 * @return {?string} The parse error or null on success.
 * @override
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
TextFormatSerializer.prototype.deserializeTo = function(
    message, data) {
  var textData = data.toString();
  var parser = new TextFormatSerializer.Parser();
  if (!parser.parse(message, textData, this.ignoreMissingFields_)) {
    return parser.getError();
  }

  return null;
};


/**
 * Serializes a message to a string.
 * @param {Message} message The message to be serialized.
 * @return {string} The serialized form of the message.
 * @override
 */
TextFormatSerializer.prototype.serialize = function(message) {
  var printer = new TextFormatSerializer.Printer_();
  this.serializeMessage_(message, printer);
  return printer.toString();
};


/**
 * Serializes the message and prints the text form into the given printer.
 * @param {Message} message The message to serialize.
 * @param {TextFormatSerializer.Printer_} printer The printer to
 *    which the text format will be printed.
 * @private
 */
TextFormatSerializer.prototype.serializeMessage_ = function(
    message, printer) {
  var descriptor = message.getDescriptor();
  var fields = descriptor.getFields();

  // Add the defined fields, recursively.
  fields.forEach(function(field) {
    this.printField_(message, field, printer);
  }, this);

  // Add the unknown fields, if any.
  message.forEachUnknown(function(tag, value) {
    this.serializeUnknown_(tag, value, asserts.assert(printer));
  }, this);
};


/**
 * Serializes an unknown field. When parsed from the JsPb object format, this
 * manifests as either a primitive type, an array, or a raw object with integer
 * keys. There is no descriptor available to interpret the types of nested
 * messages.
 * @param {number} tag The tag for the field. Since it's unknown, this is a
 *     number rather than a string.
 * @param {*} value The value of the field.
 * @param {!TextFormatSerializer.Printer_} printer The printer to
 *     which the text format will be serialized.
 * @private
 */
TextFormatSerializer.prototype.serializeUnknown_ = function(
    tag, value, printer) {
  if (value == null) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach(function(val) {
      this.serializeUnknown_(tag, val, printer);
    }, this);
    return;
  }

  if (goog.isObject(value)) {
    printer.append(tag);
    printer.append(' {');
    printer.appendLine();
    printer.indent();
    if (value instanceof Message) {
      // Note(user): This conditional is here to make the
      // testSerializationOfUnknown unit test pass, but in practice we should
      // never have a Message for an "unknown" field.
      this.serializeMessage_(value, printer);
    } else {
      // For an unknown message, fields are keyed by positive integers. We
      // don't have a 'length' property to use for enumeration, so go through
      // all properties and ignore the ones that aren't legal keys.
      for (var key in value) {
        var keyAsNumber = googString.parseInt(key);
        asserts.assert(math.isInt(keyAsNumber));
        this.serializeUnknown_(keyAsNumber, value[key], printer);
      }
    }
    printer.dedent();
    printer.append('}');
    printer.appendLine();
    return;
  }

  if (typeof value === 'string') {
    value = googString.quote(value);
  }
  printer.append(tag);
  printer.append(': ');
  printer.append(value);
  printer.appendLine();
};


/**
 * Prints the serialized value for the given field to the printer.
 * @param {*} value The field's value.
 * @param {FieldDescriptor} field The field whose value is being
 *    printed.
 * @param {TextFormatSerializer.Printer_} printer The printer to
 *    which the value will be printed.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
TextFormatSerializer.prototype.printFieldValue_ = function(
    value, field, printer) {
  switch (field.getFieldType()) {
    case FieldDescriptor.FieldType.DOUBLE:
    case FieldDescriptor.FieldType.FLOAT:
    case FieldDescriptor.FieldType.INT64:
    case FieldDescriptor.FieldType.UINT64:
    case FieldDescriptor.FieldType.INT32:
    case FieldDescriptor.FieldType.UINT32:
    case FieldDescriptor.FieldType.FIXED64:
    case FieldDescriptor.FieldType.FIXED32:
    case FieldDescriptor.FieldType.BOOL:
    case FieldDescriptor.FieldType.SFIXED32:
    case FieldDescriptor.FieldType.SFIXED64:
    case FieldDescriptor.FieldType.SINT32:
    case FieldDescriptor.FieldType.SINT64:
      printer.append(value);
      break;

    case FieldDescriptor.FieldType.BYTES:
    case FieldDescriptor.FieldType.STRING:
      value = googString.quote(value.toString());
      printer.append(value);
      break;

    case FieldDescriptor.FieldType.ENUM:
      if (!this.useEnumValues_) {
        // Search the enum type for a matching key.
        var found = false;
        object.forEach(field.getNativeType(), function(eValue, key) {
          if (!found && eValue == value) {
            printer.append(key);
            found = true;
          }
        });
      }

      if (!found || this.useEnumValues_) {
        // Otherwise, just print the numeric value.
        printer.append(value.toString());
      }
      break;

    case FieldDescriptor.FieldType.GROUP:
    case FieldDescriptor.FieldType.MESSAGE:
      this.serializeMessage_(
          /** @type {Message} */ (value), printer);
      break;
  }
};


/**
 * Prints the serialized field to the printer.
 * @param {Message} message The parent message.
 * @param {FieldDescriptor} field The field to print.
 * @param {TextFormatSerializer.Printer_} printer The printer to
 *    which the field will be printed.
 * @private
 */
TextFormatSerializer.prototype.printField_ = function(
    message, field, printer) {
  // Skip fields not present.
  if (!message.has(field)) {
    return;
  }

  var count = message.countOf(field);
  for (var i = 0; i < count; ++i) {
    // Field name.
    printer.append(field.getName());

    // Field delimiter.
    if (field.getFieldType() == FieldDescriptor.FieldType.MESSAGE ||
        field.getFieldType() == FieldDescriptor.FieldType.GROUP) {
      printer.append(' {');
      printer.appendLine();
      printer.indent();
    } else {
      printer.append(': ');
    }

    // Write the field value.
    this.printFieldValue_(message.get(field, i), field, printer);

    // Close the field.
    if (field.getFieldType() == FieldDescriptor.FieldType.MESSAGE ||
        field.getFieldType() == FieldDescriptor.FieldType.GROUP) {
      printer.dedent();
      printer.append('}');
      printer.appendLine();
    } else {
      printer.appendLine();
    }
  }
};


////////////////////////////////////////////////////////////////////////////////



/**
 * Helper class used by the text format serializer for pretty-printing text.
 * @constructor
 * @private
 */
TextFormatSerializer.Printer_ = function() {
  /**
   * The current indentation count.
   * @type {number}
   * @private
   */
  this.indentation_ = 0;

  /**
   * The buffer of string pieces.
   * @type {Array<string>}
   * @private
   */
  this.buffer_ = [];

  /**
   * Whether indentation is required before the next append of characters.
   * @type {boolean}
   * @private
   */
  this.requiresIndentation_ = true;
};


/**
 * @return {string} The contents of the printer.
 * @override
 */
TextFormatSerializer.Printer_.prototype.toString = function() {
  return this.buffer_.join('');
};


/**
 * Increases the indentation in the printer.
 */
TextFormatSerializer.Printer_.prototype.indent = function() {
  this.indentation_ += 2;
};


/**
 * Decreases the indentation in the printer.
 */
TextFormatSerializer.Printer_.prototype.dedent = function() {
  this.indentation_ -= 2;
  asserts.assert(this.indentation_ >= 0);
};


/**
 * Appends the given value to the printer.
 * @param {*} value The value to append.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
TextFormatSerializer.Printer_.prototype.append = function(value) {
  if (this.requiresIndentation_) {
    for (var i = 0; i < this.indentation_; ++i) {
      this.buffer_.push(' ');
    }
    this.requiresIndentation_ = false;
  }

  this.buffer_.push(String(value));
};


/**
 * Appends a newline to the printer.
 */
TextFormatSerializer.Printer_.prototype.appendLine = function() {
  this.buffer_.push('\n');
  this.requiresIndentation_ = true;
};


////////////////////////////////////////////////////////////////////////////////



/**
 * Helper class for tokenizing the text format.
 * @param {string} data The string data to tokenize.
 * @param {boolean=} opt_ignoreWhitespace If true, whitespace tokens will not
 *    be reported by the tokenizer.
 * @param {boolean=} opt_ignoreComments If true, comment tokens will not be
 *    reported by the tokenizer.
 * @constructor
 * @private
 */
TextFormatSerializer.Tokenizer_ = function(
    data, opt_ignoreWhitespace, opt_ignoreComments) {
  /**
   * Whether to skip whitespace tokens on output.
   * @private {boolean}
   */
  this.ignoreWhitespace_ = !!opt_ignoreWhitespace;

  /**
   * Whether to skip comment tokens on output.
   * @private {boolean}
   */
  this.ignoreComments_ = !!opt_ignoreComments;

  /**
   * The data being tokenized.
   * @private {string}
   */
  this.data_ = data;

  /**
   * The current index in the data.
   * @private {number}
   */
  this.index_ = 0;

  /**
   * The data string starting at the current index.
   * @private {string}
   */
  this.currentData_ = data;

  /**
     * The current token type.
     * @private {TextFormatSerializer.Tokenizer_.Token}
     */
  this.current_ = {
    type: TextFormatSerializer.Tokenizer_.TokenTypes.END,
    value: null
  };
};


/**
 * @typedef {{type: TextFormatSerializer.Tokenizer_.TokenTypes,
 *            value: ?string}}
 */
TextFormatSerializer.Tokenizer_.Token;


/**
 * @return {TextFormatSerializer.Tokenizer_.Token} The current
 *     token.
 */
TextFormatSerializer.Tokenizer_.prototype.getCurrent = function() {
  return this.current_;
};


/**
 * An enumeration of all the token types.
 * @enum {!RegExp}
 */
TextFormatSerializer.Tokenizer_.TokenTypes = {
  // Terminal tokens: END if the input data has been exhausted; BAD if not.
  // Their regexes don't match any string.
  END: /$ end $/,
  BAD: /$ bad $/,
  // Leading "-" to identify "-infinity"."
  IDENTIFIER: /^-?[a-zA-Z][a-zA-Z0-9_]*/,
  // NOTE: the textproto grammar treats negation as a separate token, so this
  // serializer accepts a subset language.
  // From the grammar, a number is -?(FLOAT|DEC_INT|OCT_INT|HEX_INT)
  // FLOAT | DEC_INT = ( float_lit | dec_lit ), [ "F" | "f" ]
  // float_lit | dec_lit
  //  = ".", dec, { dec }, [ exp ]
  //   | dec_lit, ".", { dec }, [ exp ]
  //   | dec_lit, exp | dec_lit
  //  = ( ".", dec, {dec} | dec_lit, [ ".", {dec} ] ) [exp]
  NUMBER:
      /^-?(0[0-7]+|0x[0-9a-f]+|([.][0-9]+|(0|[1-9][0-9]*)([.][0-9]*)?)(e[+-]?[0-9]+)?f?)/i,
  COMMENT: /^#.*/,
  OPEN_BRACE: /^{/,
  CLOSE_BRACE: /^}/,
  OPEN_TAG: /^</,
  CLOSE_TAG: /^>/,
  OPEN_LIST: /^\[/,
  CLOSE_LIST: /^\]/,
  STRING: new RegExp('^"([^"\\\\]|\\\\.)*"'),
  COLON: /^:/,
  COMMA: /^,/,
  SEMI: /^;/,
  WHITESPACE: /^\s/
};


/**
 * Advances to the next token.
 * @return {boolean} True if a valid token was found, false if the end was
 *    reached or no valid token was found.
 */
TextFormatSerializer.Tokenizer_.prototype.next = function() {
  var types = TextFormatSerializer.Tokenizer_.TokenTypes;

  // Skip any whitespace if requested.
  while (this.nextInternal_()) {
    var type = this.getCurrent().type;
    if ((type != types.WHITESPACE && type != types.COMMENT) ||
        (type == types.WHITESPACE && !this.ignoreWhitespace_) ||
        (type == types.COMMENT && !this.ignoreComments_)) {
      return true;
    }
  }

  // If we reach this point, set the current token to END.
  this.current_ = {
    type: this.currentData_.length == 0 ? types.END : types.BAD,
    value: null
  };

  return false;
};


/**
 * Internal method for determining the next token.
 * @return {boolean} True if a next token was found, false otherwise.
 * @private
 */
TextFormatSerializer.Tokenizer_.prototype.nextInternal_ =
    function() {
      if (this.index_ >= this.data_.length) {
        return false;
      }

      var data = this.currentData_;
      var types = TextFormatSerializer.Tokenizer_.TokenTypes;
      var next = null;

      // Loop through each token type and try to match the beginning of the string
      // with the token's regular expression.
      object.some(types, function(type, id) {
        if (next || type == types.END) {
          return false;
        }

        // Note: This regular expression check is at, minimum, O(n).
        var info = type.exec(data);
        if (info && info.index == 0) {
          next = {type: type, value: info[0]};
        }

        return !!next;
      });

      // Advance the index by the length of the token.
      if (next) {
        // From the textformat spec: There is one edge case that requires special
        // attention: a number token (FLOAT, DEC_INT, OCT_INT, or HEX_INT) may not
        // be immediately followed by an IDENT token.
        if (this.current_.type == types.NUMBER && next.type == types.IDENTIFIER) {
          return false;
        }
        this.current_ =
            /** @type {TextFormatSerializer.Tokenizer_.Token} */ (next);
        this.index_ += next.value.length;
        this.currentData_ = this.currentData_.substring(next.value.length);
      }

      return !!next;
    };


////////////////////////////////////////////////////////////////////////////////



/**
 * Helper class for parsing the text format.
 * @constructor
 * @final
 */
TextFormatSerializer.Parser = function() {
  /**
   * The error during parsing, if any.
   * @type {?string}
   * @private
   */
  this.error_ = null;

  /**
     * The current tokenizer.
     * @type {?TextFormatSerializer.Tokenizer_}
     * @private
     */
  this.tokenizer_ = null;

  /**
   * Whether to ignore missing fields in the proto when parsing.
   * @type {boolean}
   * @private
   */
  this.ignoreMissingFields_ = false;
};


/**
 * Parses the given data, filling the message as it goes.
 * @param {Message} message The message to fill.
 * @param {string} data The text format data.
 * @param {boolean=} opt_ignoreMissingFields If true, fields missing in the
 *     proto will be ignored.
 * @return {boolean} True on success, false on failure. On failure, the
 *     getError method can be called to get the reason for failure.
 */
TextFormatSerializer.Parser.prototype.parse = function(
    message, data, opt_ignoreMissingFields) {
  this.error_ = null;
  this.ignoreMissingFields_ = !!opt_ignoreMissingFields;
  this.tokenizer_ =
      new TextFormatSerializer.Tokenizer_(data, true, true);
  this.tokenizer_.next();
  return this.consumeMessage_(message, '');
};


/**
 * @return {?string} The parse error, if any.
 */
TextFormatSerializer.Parser.prototype.getError = function() {
  return this.error_;
};


/**
 * Reports a parse error.
 * @param {string} msg The error message.
 * @private
 */
TextFormatSerializer.Parser.prototype.reportError_ = function(msg) {
  this.error_ = msg;
};


/**
 * Attempts to consume the given message.
 * @param {Message} message The message to consume and fill. If
 *    null, then the message contents will be consumed without ever being set
 *    to anything.
 * @param {string} delimiter The delimiter expected at the end of the message.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
TextFormatSerializer.Parser.prototype.consumeMessage_ = function(
    message, delimiter) {
  var types = TextFormatSerializer.Tokenizer_.TokenTypes;
  while (!this.lookingAt_('>') && !this.lookingAt_('}') &&
         !this.lookingAtType_(types.END)) {
    if (!this.consumeField_(message)) {
      return false;
    }
  }

  if (delimiter) {
    if (!this.consume_(delimiter)) {
      return false;
    }
  } else {
    if (!this.lookingAtType_(types.END)) {
      this.reportError_('Expected END token');
    }
  }

  return true;
};


/**
 * Attempts to consume the value of the given field.
 * @param {Message} message The parent message.
 * @param {FieldDescriptor} field The field.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
TextFormatSerializer.Parser.prototype.consumeFieldValue_ = function(
    message, field) {
  var value = this.getFieldValue_(field);
  if (value === null) {
    return false;
  }

  if (field.isRepeated()) {
    message.add(field, value);
  } else {
    message.set(field, value);
  }

  return true;
};

/**
 * Detects the radix of a number.
 * @param {string} num a number.
 * @return {number} The radix of `num`, or 0 if the number is a float.
 * @private
 */
TextFormatSerializer.Parser.getRadix_ = function(num) {
  return /^-?0x/i.test(num) ?
      16 :
      /^-?0[0-7]/.test(num) ?
      8 :
      // NOTE: hexadecimal literals are already excluded here, so a decimal
      // point, an "e" (as in 1e3), or an "f" suffix (as in 1f) all indicate
      // floating point.
      /[.ef]/i.test(num) ? 0 :
                           10;
};

/**
 * Attempts to convert a string to a number.
 * @param {string} num in hexadecimal or float format.
 * @return {number} The converted number or null on error.
 * @private
 */
TextFormatSerializer.Parser.getNumberFromString_ = function(num) {
  const radix = TextFormatSerializer.Parser.getRadix_(num);
  const returnValue = radix == 0 ? parseFloat(num) : parseInt(num, radix);

  asserts.assert(!isNaN(returnValue));
  asserts.assert(isFinite(returnValue));

  return returnValue;
};


/**
 * Parse NaN, positive infinity, or negative infinity from a string.
 * @param {string} identifier An identifier string to check.
 * @return {?number} Infinity, negative infinity, NaN, or null if none
 *     of the constants could be parsed.
 * @private
 */
TextFormatSerializer.Parser.parseNumericalConstant_ = function(
    identifier) {
  if (/^-?inf(?:inity)?f?$/i.test(identifier)) {
    return Infinity * (googString.startsWith(identifier, '-') ? -1 : 1);
  }

  if (/^nanf?$/i.test(identifier)) {
    return NaN;
  }

  return null;
};


/**
 * Attempts to parse the given field's value from the stream.
 * @param {FieldDescriptor} field The field.
 * @return {*} The field's value or null if none.
 * @private
 */
TextFormatSerializer.Parser.prototype.getFieldValue_ = function(
    field) {
  var types = TextFormatSerializer.Tokenizer_.TokenTypes;
  switch (field.getFieldType()) {
    case FieldDescriptor.FieldType.DOUBLE:
    case FieldDescriptor.FieldType.FLOAT:

      var identifier = this.consumeIdentifier_();
      if (identifier) {
        var numericalIdentifier =
            TextFormatSerializer.Parser.parseNumericalConstant_(
                identifier);
        // Use isDefAndNotNull since !!NaN is false.
        if (numericalIdentifier != null) {
          return numericalIdentifier;
        }
      }

    case FieldDescriptor.FieldType.INT32:
    case FieldDescriptor.FieldType.UINT32:
    case FieldDescriptor.FieldType.FIXED32:
    case FieldDescriptor.FieldType.SFIXED32:
    case FieldDescriptor.FieldType.SINT32:
      var num = this.consumeNumber_();
      if (!num) {
        return null;
      }

      return TextFormatSerializer.Parser.getNumberFromString_(num);

    case FieldDescriptor.FieldType.INT64:
    case FieldDescriptor.FieldType.UINT64:
    case FieldDescriptor.FieldType.FIXED64:
    case FieldDescriptor.FieldType.SFIXED64:
    case FieldDescriptor.FieldType.SINT64:
      var num = this.consumeNumber_();
      if (!num) {
        return null;
      }

      if (field.getNativeType() == Number) {
        // 64-bit number stored as a number.
        return TextFormatSerializer.Parser.getNumberFromString_(
            num);
      }
      // Normalize numeric literals to decimal.
      const radix = TextFormatSerializer.Parser.getRadix_(num);
      if (radix != 10) {
        num = Long.fromString(num, radix).toString(10);
      }
      return num;  // 64-bit numbers are by default stored as strings.

    case FieldDescriptor.FieldType.BOOL:
      var ident = this.consumeIdentifier_();
      if (!ident) {
        return null;
      }

      switch (ident) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          this.reportError_('Unknown type for bool: ' + ident);
          return null;
      }

    case FieldDescriptor.FieldType.ENUM:
      if (this.lookingAtType_(types.NUMBER)) {
        var num = this.consumeNumber_();
        if (!num) {
          return null;
        }

        return TextFormatSerializer.Parser.getNumberFromString_(
            num);
      } else {
        // Search the enum type for a matching key.
        var name = this.consumeIdentifier_();
        if (!name) {
          return null;
        }

        var enumValue = field.getNativeType()[name];
        if (enumValue == null) {
          this.reportError_('Unknown enum value: ' + name);
          return null;
        }

        return enumValue;
      }

    case FieldDescriptor.FieldType.BYTES:
    case FieldDescriptor.FieldType.STRING:
      return this.consumeString_();
  }
};


/**
 * Attempts to consume a nested message.
 * @param {Message} message The parent message.
 * @param {FieldDescriptor} field The field.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
TextFormatSerializer.Parser.prototype.consumeNestedMessage_ =
    function(message, field) {
      var delimiter = '';

      // Messages support both < > and { } as delimiters for legacy reasons.
      if (this.tryConsume_('<')) {
        delimiter = '>';
      } else {
        if (!this.consume_('{')) {
          return false;
        }
        delimiter = '}';
      }

      var msg = field.getFieldMessageType().createMessageInstance();
      var result = this.consumeMessage_(msg, delimiter);
      if (!result) {
        return false;
      }

      // Add the message to the parent message.
      if (field.isRepeated()) {
        message.add(field, msg);
      } else {
        message.set(field, msg);
      }

      return true;
    };


/**
 * Attempts to consume the value of an unknown field. This method uses
 * heuristics to try to consume just the right tokens.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
TextFormatSerializer.Parser.prototype.consumeUnknownFieldValue_ =
    function() {
      // : is optional.
      this.tryConsume_(':');

      // Handle form: [.. , ... , ..]
      if (this.tryConsume_('[')) {
        while (true) {
          this.tokenizer_.next();
          if (this.tryConsume_(']')) {
            break;
          }
          if (!this.consume_(',')) {
            return false;
          }
        }

        return true;
      }

      // Handle nested messages/groups.
      if (this.tryConsume_('<')) {
        return this.consumeMessage_(null /* unknown */, '>');
      } else if (this.tryConsume_('{')) {
        return this.consumeMessage_(null /* unknown */, '}');
      } else {
        // Otherwise, consume a single token for the field value.
        this.tokenizer_.next();
      }

      return true;
    };


/**
 * Attempts to consume a field under a message.
 * @param {Message} message The parent message. If null, then the
 *     field value will be consumed without being assigned to anything.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
TextFormatSerializer.Parser.prototype.consumeField_ = function(
    message) {
  var fieldName = this.consumeIdentifier_();
  if (!fieldName) {
    this.reportError_('Missing field name');
    return false;
  }

  var field = null;
  if (message) {
    field = message.getDescriptor().findFieldByName(fieldName.toString());
  }

  if (field == null) {
    if (this.ignoreMissingFields_) {
      return this.consumeUnknownFieldValue_();
    } else {
      this.reportError_('Unknown field: ' + fieldName);
      return false;
    }
  }

  if (field.getFieldType() == FieldDescriptor.FieldType.MESSAGE ||
      field.getFieldType() == FieldDescriptor.FieldType.GROUP) {
    // : is optional here.
    this.tryConsume_(':');
    if (!this.consumeNestedMessage_(message, field)) {
      return false;
    }
  } else {
    // Long Format: "someField: 123"
    // Short Format: "someField: [123, 456, 789]"
    if (!this.consume_(':')) {
      return false;
    }

    if (field.isRepeated() && this.tryConsume_('[')) {
      // Short repeated format, e.g.  "foo: [1, 2, 3]"
      while (true) {
        if (!this.consumeFieldValue_(message, field)) {
          return false;
        }
        if (this.tryConsume_(']')) {
          break;
        }
        if (!this.consume_(',')) {
          return false;
        }
      }
    } else {
      // Normal field format.
      if (!this.consumeFieldValue_(message, field)) {
        return false;
      }
    }
  }

  // For historical reasons, fields may optionally be separated by commas or
  // semicolons.
  this.tryConsume_(',') || this.tryConsume_(';');
  return true;
};


/**
 * Attempts to consume a token with the given string value.
 * @param {string} value The string value for the token.
 * @return {boolean} True if the token matches and was consumed, false
 *    otherwise.
 * @private
 */
TextFormatSerializer.Parser.prototype.tryConsume_ = function(
    value) {
  if (this.lookingAt_(value)) {
    this.tokenizer_.next();
    return true;
  }
  return false;
};


/**
 * Consumes a token of the given type.
 * @param {TextFormatSerializer.Tokenizer_.TokenTypes} type The type
 *     of the token to consume.
 * @return {?string} The string value of the token or null on error.
 * @private
 */
TextFormatSerializer.Parser.prototype.consumeToken_ = function(
    type) {
  if (!this.lookingAtType_(type)) {
    this.reportError_('Expected token type: ' + type);
    return null;
  }

  var value = this.tokenizer_.getCurrent().value;
  this.tokenizer_.next();
  return value;
};


/**
 * Consumes an IDENTIFIER token.
 * @return {?string} The string value or null on error.
 * @private
 */
TextFormatSerializer.Parser.prototype.consumeIdentifier_ =
    function() {
      var types = TextFormatSerializer.Tokenizer_.TokenTypes;
      return this.consumeToken_(types.IDENTIFIER);
    };


/**
 * Consumes a NUMBER token.
 * @return {?string} The string value or null on error.
 * @private
 */
TextFormatSerializer.Parser.prototype.consumeNumber_ = function() {
  var types = TextFormatSerializer.Tokenizer_.TokenTypes;
  return this.consumeToken_(types.NUMBER);
};


/**
 * Consumes a STRING token. Strings may come in multiple adjacent tokens which
 * are automatically concatenated, like in C or Python.
 * @return {?string} The *deescaped* string value or null on error.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
TextFormatSerializer.Parser.prototype.consumeString_ = function() {
  var types = TextFormatSerializer.Tokenizer_.TokenTypes;
  var value = this.consumeToken_(types.STRING);
  if (!value) {
    return null;
  }

  var stringValue = JSON.parse(/** @type {string} */ (value)).toString();
  while (this.lookingAtType_(types.STRING)) {
    value = this.consumeToken_(types.STRING);
    stringValue += JSON.parse(/** @type {string} */ (value)).toString();
  }

  return stringValue;
};


/**
 * Consumes a token with the given value. If not found, reports an error.
 * @param {string} value The string value expected for the token.
 * @return {boolean} True on success, false otherwise.
 * @private
 */
TextFormatSerializer.Parser.prototype.consume_ = function(value) {
  if (!this.tryConsume_(value)) {
    this.reportError_('Expected token "' + value + '"');
    return false;
  }

  return true;
};


/**
 * @param {string} value The value to check against.
 * @return {boolean} True if the current token has the given string value.
 * @private
 */
TextFormatSerializer.Parser.prototype.lookingAt_ = function(value) {
  return this.tokenizer_.getCurrent().value == value;
};


/**
 * @param {TextFormatSerializer.Tokenizer_.TokenTypes} type The
 *     token type.
 * @return {boolean} True if the current token has the given type.
 * @private
 */
TextFormatSerializer.Parser.prototype.lookingAtType_ = function(
    type) {
  return this.tokenizer_.getCurrent().type == type;
};
