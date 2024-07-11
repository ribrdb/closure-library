/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Constants used by the WebGL rendering, including all of the
 * constants used from the WebGL context.  For example, instead of using
 * context.ARRAY_BUFFER, your code can use
 * ARRAY_BUFFER. The benefits for doing this include allowing
 * the compiler to optimize your code so that the compiled code does not have to
 * contain large strings to reference these properties, and reducing runtime
 * property access.
 *
 * Values are taken from the WebGL Spec:
 * https://www.khronos.org/registry/webgl/specs/1.0/#WEBGLRENDERINGCONTEXT
 */

/**
 * @const
 * @type {number}
 */
export var DEPTH_BUFFER_BIT = 0x00000100;


/**
 * @const
 * @type {number}
 */
export var STENCIL_BUFFER_BIT = 0x00000400;


/**
 * @const
 * @type {number}
 */
export var COLOR_BUFFER_BIT = 0x00004000;


/**
 * @const
 * @type {number}
 */
export var POINTS = 0x0000;


/**
 * @const
 * @type {number}
 */
export var LINES = 0x0001;


/**
 * @const
 * @type {number}
 */
export var LINE_LOOP = 0x0002;


/**
 * @const
 * @type {number}
 */
export var LINE_STRIP = 0x0003;


/**
 * @const
 * @type {number}
 */
export var TRIANGLES = 0x0004;


/**
 * @const
 * @type {number}
 */
export var TRIANGLE_STRIP = 0x0005;


/**
 * @const
 * @type {number}
 */
export var TRIANGLE_FAN = 0x0006;


/**
 * @const
 * @type {number}
 */
export var ZERO = 0;


/**
 * @const
 * @type {number}
 */
export var ONE = 1;


/**
 * @const
 * @type {number}
 */
export var SRC_COLOR = 0x0300;


/**
 * @const
 * @type {number}
 */
export var ONE_MINUS_SRC_COLOR = 0x0301;


/**
 * @const
 * @type {number}
 */
export var SRC_ALPHA = 0x0302;


/**
 * @const
 * @type {number}
 */
export var ONE_MINUS_SRC_ALPHA = 0x0303;


/**
 * @const
 * @type {number}
 */
export var DST_ALPHA = 0x0304;


/**
 * @const
 * @type {number}
 */
export var ONE_MINUS_DST_ALPHA = 0x0305;


/**
 * @const
 * @type {number}
 */
export var DST_COLOR = 0x0306;


/**
 * @const
 * @type {number}
 */
export var ONE_MINUS_DST_COLOR = 0x0307;


/**
 * @const
 * @type {number}
 */
export var SRC_ALPHA_SATURATE = 0x0308;


/**
 * @const
 * @type {number}
 */
export var FUNC_ADD = 0x8006;


/**
 * @const
 * @type {number}
 */
export var BLEND_EQUATION = 0x8009;


/**
 * Same as BLEND_EQUATION
 * @const
 * @type {number}
 */
export var BLEND_EQUATION_RGB = 0x8009;


/**
 * @const
 * @type {number}
 */
export var BLEND_EQUATION_ALPHA = 0x883D;


/**
 * @const
 * @type {number}
 */
export var FUNC_SUBTRACT = 0x800A;


/**
 * @const
 * @type {number}
 */
export var FUNC_REVERSE_SUBTRACT = 0x800B;


/**
 * @const
 * @type {number}
 */
export var BLEND_DST_RGB = 0x80C8;


/**
 * @const
 * @type {number}
 */
export var BLEND_SRC_RGB = 0x80C9;


/**
 * @const
 * @type {number}
 */
export var BLEND_DST_ALPHA = 0x80CA;


/**
 * @const
 * @type {number}
 */
export var BLEND_SRC_ALPHA = 0x80CB;


/**
 * @const
 * @type {number}
 */
export var CONSTANT_COLOR = 0x8001;


/**
 * @const
 * @type {number}
 */
export var ONE_MINUS_CONSTANT_COLOR = 0x8002;


/**
 * @const
 * @type {number}
 */
export var CONSTANT_ALPHA = 0x8003;


/**
 * @const
 * @type {number}
 */
export var ONE_MINUS_CONSTANT_ALPHA = 0x8004;


/**
 * @const
 * @type {number}
 */
export var BLEND_COLOR = 0x8005;


/**
 * @const
 * @type {number}
 */
export var ARRAY_BUFFER = 0x8892;


/**
 * @const
 * @type {number}
 */
export var ELEMENT_ARRAY_BUFFER = 0x8893;


/**
 * @const
 * @type {number}
 */
export var ARRAY_BUFFER_BINDING = 0x8894;


/**
 * @const
 * @type {number}
 */
export var ELEMENT_ARRAY_BUFFER_BINDING = 0x8895;


/**
 * @const
 * @type {number}
 */
export var STREAM_DRAW = 0x88E0;


/**
 * @const
 * @type {number}
 */
export var STATIC_DRAW = 0x88E4;


/**
 * @const
 * @type {number}
 */
export var DYNAMIC_DRAW = 0x88E8;


/**
 * @const
 * @type {number}
 */
export var BUFFER_SIZE = 0x8764;


/**
 * @const
 * @type {number}
 */
export var BUFFER_USAGE = 0x8765;


/**
 * @const
 * @type {number}
 */
export var CURRENT_VERTEX_ATTRIB = 0x8626;


/**
 * @const
 * @type {number}
 */
export var FRONT = 0x0404;


/**
 * @const
 * @type {number}
 */
export var BACK = 0x0405;


/**
 * @const
 * @type {number}
 */
export var FRONT_AND_BACK = 0x0408;


/**
 * @const
 * @type {number}
 */
export var CULL_FACE = 0x0B44;


/**
 * @const
 * @type {number}
 */
export var BLEND = 0x0BE2;


/**
 * @const
 * @type {number}
 */
export var DITHER = 0x0BD0;


/**
 * @const
 * @type {number}
 */
export var STENCIL_TEST = 0x0B90;


/**
 * @const
 * @type {number}
 */
export var DEPTH_TEST = 0x0B71;


/**
 * @const
 * @type {number}
 */
export var SCISSOR_TEST = 0x0C11;


/**
 * @const
 * @type {number}
 */
export var POLYGON_OFFSET_FILL = 0x8037;


/**
 * @const
 * @type {number}
 */
export var SAMPLE_ALPHA_TO_COVERAGE = 0x809E;


/**
 * @const
 * @type {number}
 */
export var SAMPLE_COVERAGE = 0x80A0;


/**
 * @const
 * @type {number}
 */
export var NO_ERROR = 0;


/**
 * @const
 * @type {number}
 */
export var INVALID_ENUM = 0x0500;


/**
 * @const
 * @type {number}
 */
export var INVALID_VALUE = 0x0501;


/**
 * @const
 * @type {number}
 */
export var INVALID_OPERATION = 0x0502;


/**
 * @const
 * @type {number}
 */
export var OUT_OF_MEMORY = 0x0505;


/**
 * @const
 * @type {number}
 */
export var CW = 0x0900;


/**
 * @const
 * @type {number}
 */
export var CCW = 0x0901;


/**
 * @const
 * @type {number}
 */
export var LINE_WIDTH = 0x0B21;


/**
 * @const
 * @type {number}
 */
export var ALIASED_POINT_SIZE_RANGE = 0x846D;


/**
 * @const
 * @type {number}
 */
export var ALIASED_LINE_WIDTH_RANGE = 0x846E;


/**
 * @const
 * @type {number}
 */
export var CULL_FACE_MODE = 0x0B45;


/**
 * @const
 * @type {number}
 */
export var FRONT_FACE = 0x0B46;


/**
 * @const
 * @type {number}
 */
export var DEPTH_RANGE = 0x0B70;


/**
 * @const
 * @type {number}
 */
export var DEPTH_WRITEMASK = 0x0B72;


/**
 * @const
 * @type {number}
 */
export var DEPTH_CLEAR_VALUE = 0x0B73;


/**
 * @const
 * @type {number}
 */
export var DEPTH_FUNC = 0x0B74;


/**
 * @const
 * @type {number}
 */
export var STENCIL_CLEAR_VALUE = 0x0B91;


/**
 * @const
 * @type {number}
 */
export var STENCIL_FUNC = 0x0B92;


/**
 * @const
 * @type {number}
 */
export var STENCIL_FAIL = 0x0B94;


/**
 * @const
 * @type {number}
 */
export var STENCIL_PASS_DEPTH_FAIL = 0x0B95;


/**
 * @const
 * @type {number}
 */
export var STENCIL_PASS_DEPTH_PASS = 0x0B96;


/**
 * @const
 * @type {number}
 */
export var STENCIL_REF = 0x0B97;


/**
 * @const
 * @type {number}
 */
export var STENCIL_VALUE_MASK = 0x0B93;


/**
 * @const
 * @type {number}
 */
export var STENCIL_WRITEMASK = 0x0B98;


/**
 * @const
 * @type {number}
 */
export var STENCIL_BACK_FUNC = 0x8800;


/**
 * @const
 * @type {number}
 */
export var STENCIL_BACK_FAIL = 0x8801;


/**
 * @const
 * @type {number}
 */
export var STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802;


/**
 * @const
 * @type {number}
 */
export var STENCIL_BACK_PASS_DEPTH_PASS = 0x8803;


/**
 * @const
 * @type {number}
 */
export var STENCIL_BACK_REF = 0x8CA3;


/**
 * @const
 * @type {number}
 */
export var STENCIL_BACK_VALUE_MASK = 0x8CA4;


/**
 * @const
 * @type {number}
 */
export var STENCIL_BACK_WRITEMASK = 0x8CA5;


/**
 * @const
 * @type {number}
 */
export var VIEWPORT = 0x0BA2;


/**
 * @const
 * @type {number}
 */
export var SCISSOR_BOX = 0x0C10;


/**
 * @const
 * @type {number}
 */
export var COLOR_CLEAR_VALUE = 0x0C22;


/**
 * @const
 * @type {number}
 */
export var COLOR_WRITEMASK = 0x0C23;


/**
 * @const
 * @type {number}
 */
export var UNPACK_ALIGNMENT = 0x0CF5;


/**
 * @const
 * @type {number}
 */
export var PACK_ALIGNMENT = 0x0D05;


/**
 * @const
 * @type {number}
 */
export var MAX_TEXTURE_SIZE = 0x0D33;


/**
 * @const
 * @type {number}
 */
export var MAX_VIEWPORT_DIMS = 0x0D3A;


/**
 * @const
 * @type {number}
 */
export var SUBPIXEL_BITS = 0x0D50;


/**
 * @const
 * @type {number}
 */
export var RED_BITS = 0x0D52;


/**
 * @const
 * @type {number}
 */
export var GREEN_BITS = 0x0D53;


/**
 * @const
 * @type {number}
 */
export var BLUE_BITS = 0x0D54;


/**
 * @const
 * @type {number}
 */
export var ALPHA_BITS = 0x0D55;


/**
 * @const
 * @type {number}
 */
export var DEPTH_BITS = 0x0D56;


/**
 * @const
 * @type {number}
 */
export var STENCIL_BITS = 0x0D57;


/**
 * @const
 * @type {number}
 */
export var POLYGON_OFFSET_UNITS = 0x2A00;


/**
 * @const
 * @type {number}
 */
export var POLYGON_OFFSET_FACTOR = 0x8038;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_BINDING_2D = 0x8069;


/**
 * @const
 * @type {number}
 */
export var SAMPLE_BUFFERS = 0x80A8;


/**
 * @const
 * @type {number}
 */
export var SAMPLES = 0x80A9;


/**
 * @const
 * @type {number}
 */
export var SAMPLE_COVERAGE_VALUE = 0x80AA;


/**
 * @const
 * @type {number}
 */
export var SAMPLE_COVERAGE_INVERT = 0x80AB;


/**
 * @const
 * @type {number}
 */
export var COMPRESSED_TEXTURE_FORMATS = 0x86A3;


/**
 * @const
 * @type {number}
 */
export var DONT_CARE = 0x1100;


/**
 * @const
 * @type {number}
 */
export var FASTEST = 0x1101;


/**
 * @const
 * @type {number}
 */
export var NICEST = 0x1102;


/**
 * @const
 * @type {number}
 */
export var GENERATE_MIPMAP_HINT = 0x8192;


/**
 * @const
 * @type {number}
 */
export var BYTE = 0x1400;


/**
 * @const
 * @type {number}
 */
export var UNSIGNED_BYTE = 0x1401;


/**
 * @const
 * @type {number}
 */
export var SHORT = 0x1402;


/**
 * @const
 * @type {number}
 */
export var UNSIGNED_SHORT = 0x1403;


/**
 * @const
 * @type {number}
 */
export var INT = 0x1404;


/**
 * @const
 * @type {number}
 */
export var UNSIGNED_INT = 0x1405;


/**
 * @const
 * @type {number}
 */
export var FLOAT = 0x1406;


/**
 * @const
 * @type {number}
 */
export var DEPTH_COMPONENT = 0x1902;


/**
 * @const
 * @type {number}
 */
export var ALPHA = 0x1906;


/**
 * @const
 * @type {number}
 */
export var RGB = 0x1907;


/**
 * @const
 * @type {number}
 */
export var RGBA = 0x1908;


/**
 * @const
 * @type {number}
 */
export var LUMINANCE = 0x1909;


/**
 * @const
 * @type {number}
 */
export var LUMINANCE_ALPHA = 0x190A;


/**
 * @const
 * @type {number}
 */
export var UNSIGNED_SHORT_4_4_4_4 = 0x8033;


/**
 * @const
 * @type {number}
 */
export var UNSIGNED_SHORT_5_5_5_1 = 0x8034;


/**
 * @const
 * @type {number}
 */
export var UNSIGNED_SHORT_5_6_5 = 0x8363;


/**
 * @const
 * @type {number}
 */
export var FRAGMENT_SHADER = 0x8B30;


/**
 * @const
 * @type {number}
 */
export var VERTEX_SHADER = 0x8B31;


/**
 * @const
 * @type {number}
 */
export var MAX_VERTEX_ATTRIBS = 0x8869;


/**
 * @const
 * @type {number}
 */
export var MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB;


/**
 * @const
 * @type {number}
 */
export var MAX_VARYING_VECTORS = 0x8DFC;


/**
 * @const
 * @type {number}
 */
export var MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D;


/**
 * @const
 * @type {number}
 */
export var MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C;


/**
 * @const
 * @type {number}
 */
export var MAX_TEXTURE_IMAGE_UNITS = 0x8872;


/**
 * @const
 * @type {number}
 */
export var MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD;


/**
 * @const
 * @type {number}
 */
export var SHADER_TYPE = 0x8B4F;


/**
 * @const
 * @type {number}
 */
export var DELETE_STATUS = 0x8B80;


/**
 * @const
 * @type {number}
 */
export var LINK_STATUS = 0x8B82;


/**
 * @const
 * @type {number}
 */
export var VALIDATE_STATUS = 0x8B83;


/**
 * @const
 * @type {number}
 */
export var ATTACHED_SHADERS = 0x8B85;


/**
 * @const
 * @type {number}
 */
export var ACTIVE_UNIFORMS = 0x8B86;


/**
 * @const
 * @type {number}
 */
export var ACTIVE_ATTRIBUTES = 0x8B89;


/**
 * @const
 * @type {number}
 */
export var SHADING_LANGUAGE_VERSION = 0x8B8C;


/**
 * @const
 * @type {number}
 */
export var CURRENT_PROGRAM = 0x8B8D;


/**
 * @const
 * @type {number}
 */
export var NEVER = 0x0200;


/**
 * @const
 * @type {number}
 */
export var LESS = 0x0201;


/**
 * @const
 * @type {number}
 */
export var EQUAL = 0x0202;


/**
 * @const
 * @type {number}
 */
export var LEQUAL = 0x0203;


/**
 * @const
 * @type {number}
 */
export var GREATER = 0x0204;


/**
 * @const
 * @type {number}
 */
export var NOTEQUAL = 0x0205;


/**
 * @const
 * @type {number}
 */
export var GEQUAL = 0x0206;


/**
 * @const
 * @type {number}
 */
export var ALWAYS = 0x0207;


/**
 * @const
 * @type {number}
 */
export var KEEP = 0x1E00;


/**
 * @const
 * @type {number}
 */
export var REPLACE = 0x1E01;


/**
 * @const
 * @type {number}
 */
export var INCR = 0x1E02;


/**
 * @const
 * @type {number}
 */
export var DECR = 0x1E03;


/**
 * @const
 * @type {number}
 */
export var INVERT = 0x150A;


/**
 * @const
 * @type {number}
 */
export var INCR_WRAP = 0x8507;


/**
 * @const
 * @type {number}
 */
export var DECR_WRAP = 0x8508;


/**
 * @const
 * @type {number}
 */
export var VENDOR = 0x1F00;


/**
 * @const
 * @type {number}
 */
export var RENDERER = 0x1F01;


/**
 * @const
 * @type {number}
 */
export var VERSION = 0x1F02;


/**
 * @const
 * @type {number}
 */
export var NEAREST = 0x2600;


/**
 * @const
 * @type {number}
 */
export var LINEAR = 0x2601;


/**
 * @const
 * @type {number}
 */
export var NEAREST_MIPMAP_NEAREST = 0x2700;


/**
 * @const
 * @type {number}
 */
export var LINEAR_MIPMAP_NEAREST = 0x2701;


/**
 * @const
 * @type {number}
 */
export var NEAREST_MIPMAP_LINEAR = 0x2702;


/**
 * @const
 * @type {number}
 */
export var LINEAR_MIPMAP_LINEAR = 0x2703;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_MAG_FILTER = 0x2800;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_MIN_FILTER = 0x2801;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_WRAP_S = 0x2802;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_WRAP_T = 0x2803;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_2D = 0x0DE1;


/**
 * @const
 * @type {number}
 */
export var TEXTURE = 0x1702;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_CUBE_MAP = 0x8513;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_BINDING_CUBE_MAP = 0x8514;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;


/**
 * @const
 * @type {number}
 */
export var TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;


/**
 * @const
 * @type {number}
 */
export var MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;


/**
 * @const
 * @type {number}
 */
export var TEXTURE0 = 0x84C0;


/**
 * @const
 * @type {number}
 */
export var TEXTURE1 = 0x84C1;


/**
 * @const
 * @type {number}
 */
export var TEXTURE2 = 0x84C2;


/**
 * @const
 * @type {number}
 */
export var TEXTURE3 = 0x84C3;


/**
 * @const
 * @type {number}
 */
export var TEXTURE4 = 0x84C4;


/**
 * @const
 * @type {number}
 */
export var TEXTURE5 = 0x84C5;


/**
 * @const
 * @type {number}
 */
export var TEXTURE6 = 0x84C6;


/**
 * @const
 * @type {number}
 */
export var TEXTURE7 = 0x84C7;


/**
 * @const
 * @type {number}
 */
export var TEXTURE8 = 0x84C8;


/**
 * @const
 * @type {number}
 */
export var TEXTURE9 = 0x84C9;


/**
 * @const
 * @type {number}
 */
export var TEXTURE10 = 0x84CA;


/**
 * @const
 * @type {number}
 */
export var TEXTURE11 = 0x84CB;


/**
 * @const
 * @type {number}
 */
export var TEXTURE12 = 0x84CC;


/**
 * @const
 * @type {number}
 */
export var TEXTURE13 = 0x84CD;


/**
 * @const
 * @type {number}
 */
export var TEXTURE14 = 0x84CE;


/**
 * @const
 * @type {number}
 */
export var TEXTURE15 = 0x84CF;


/**
 * @const
 * @type {number}
 */
export var TEXTURE16 = 0x84D0;


/**
 * @const
 * @type {number}
 */
export var TEXTURE17 = 0x84D1;


/**
 * @const
 * @type {number}
 */
export var TEXTURE18 = 0x84D2;


/**
 * @const
 * @type {number}
 */
export var TEXTURE19 = 0x84D3;


/**
 * @const
 * @type {number}
 */
export var TEXTURE20 = 0x84D4;


/**
 * @const
 * @type {number}
 */
export var TEXTURE21 = 0x84D5;


/**
 * @const
 * @type {number}
 */
export var TEXTURE22 = 0x84D6;


/**
 * @const
 * @type {number}
 */
export var TEXTURE23 = 0x84D7;


/**
 * @const
 * @type {number}
 */
export var TEXTURE24 = 0x84D8;


/**
 * @const
 * @type {number}
 */
export var TEXTURE25 = 0x84D9;


/**
 * @const
 * @type {number}
 */
export var TEXTURE26 = 0x84DA;


/**
 * @const
 * @type {number}
 */
export var TEXTURE27 = 0x84DB;


/**
 * @const
 * @type {number}
 */
export var TEXTURE28 = 0x84DC;


/**
 * @const
 * @type {number}
 */
export var TEXTURE29 = 0x84DD;


/**
 * @const
 * @type {number}
 */
export var TEXTURE30 = 0x84DE;


/**
 * @const
 * @type {number}
 */
export var TEXTURE31 = 0x84DF;


/**
 * @const
 * @type {number}
 */
export var ACTIVE_TEXTURE = 0x84E0;


/**
 * @const
 * @type {number}
 */
export var REPEAT = 0x2901;


/**
 * @const
 * @type {number}
 */
export var CLAMP_TO_EDGE = 0x812F;


/**
 * @const
 * @type {number}
 */
export var MIRRORED_REPEAT = 0x8370;


/**
 * @const
 * @type {number}
 */
export var FLOAT_VEC2 = 0x8B50;


/**
 * @const
 * @type {number}
 */
export var FLOAT_VEC3 = 0x8B51;


/**
 * @const
 * @type {number}
 */
export var FLOAT_VEC4 = 0x8B52;


/**
 * @const
 * @type {number}
 */
export var INT_VEC2 = 0x8B53;


/**
 * @const
 * @type {number}
 */
export var INT_VEC3 = 0x8B54;


/**
 * @const
 * @type {number}
 */
export var INT_VEC4 = 0x8B55;


/**
 * @const
 * @type {number}
 */
export var BOOL = 0x8B56;


/**
 * @const
 * @type {number}
 */
export var BOOL_VEC2 = 0x8B57;


/**
 * @const
 * @type {number}
 */
export var BOOL_VEC3 = 0x8B58;


/**
 * @const
 * @type {number}
 */
export var BOOL_VEC4 = 0x8B59;


/**
 * @const
 * @type {number}
 */
export var FLOAT_MAT2 = 0x8B5A;


/**
 * @const
 * @type {number}
 */
export var FLOAT_MAT3 = 0x8B5B;


/**
 * @const
 * @type {number}
 */
export var FLOAT_MAT4 = 0x8B5C;


/**
 * @const
 * @type {number}
 */
export var SAMPLER_2D = 0x8B5E;


/**
 * @const
 * @type {number}
 */
export var SAMPLER_CUBE = 0x8B60;


/**
 * @const
 * @type {number}
 */
export var VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622;


/**
 * @const
 * @type {number}
 */
export var VERTEX_ATTRIB_ARRAY_SIZE = 0x8623;


/**
 * @const
 * @type {number}
 */
export var VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624;


/**
 * @const
 * @type {number}
 */
export var VERTEX_ATTRIB_ARRAY_TYPE = 0x8625;


/**
 * @const
 * @type {number}
 */
export var VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886A;


/**
 * @const
 * @type {number}
 */
export var VERTEX_ATTRIB_ARRAY_POINTER = 0x8645;


/**
 * @const
 * @type {number}
 */
export var VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F;


/**
 * @const
 * @type {number}
 */
export var COMPILE_STATUS = 0x8B81;


/**
 * @const
 * @type {number}
 */
export var LOW_FLOAT = 0x8DF0;


/**
 * @const
 * @type {number}
 */
export var MEDIUM_FLOAT = 0x8DF1;


/**
 * @const
 * @type {number}
 */
export var HIGH_FLOAT = 0x8DF2;


/**
 * @const
 * @type {number}
 */
export var LOW_INT = 0x8DF3;


/**
 * @const
 * @type {number}
 */
export var MEDIUM_INT = 0x8DF4;


/**
 * @const
 * @type {number}
 */
export var HIGH_INT = 0x8DF5;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER = 0x8D40;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER = 0x8D41;


/**
 * @const
 * @type {number}
 */
export var RGBA4 = 0x8056;


/**
 * @const
 * @type {number}
 */
export var RGB5_A1 = 0x8057;


/**
 * @const
 * @type {number}
 */
export var RGB565 = 0x8D62;


/**
 * @const
 * @type {number}
 */
export var DEPTH_COMPONENT16 = 0x81A5;


/**
 * @const
 * @type {number}
 */
export var STENCIL_INDEX = 0x1901;


/**
 * @const
 * @type {number}
 */
export var STENCIL_INDEX8 = 0x8D48;


/**
 * @const
 * @type {number}
 */
export var DEPTH_STENCIL = 0x84F9;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER_WIDTH = 0x8D42;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER_HEIGHT = 0x8D43;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER_INTERNAL_FORMAT = 0x8D44;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER_RED_SIZE = 0x8D50;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER_GREEN_SIZE = 0x8D51;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER_BLUE_SIZE = 0x8D52;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER_ALPHA_SIZE = 0x8D53;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER_DEPTH_SIZE = 0x8D54;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER_STENCIL_SIZE = 0x8D55;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8CD0;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8CD1;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8CD2;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3;


/**
 * @const
 * @type {number}
 */
export var COLOR_ATTACHMENT0 = 0x8CE0;


/**
 * @const
 * @type {number}
 */
export var DEPTH_ATTACHMENT = 0x8D00;


/**
 * @const
 * @type {number}
 */
export var STENCIL_ATTACHMENT = 0x8D20;


/**
 * @const
 * @type {number}
 */
export var DEPTH_STENCIL_ATTACHMENT = 0x821A;


/**
 * @const
 * @type {number}
 */
export var NONE = 0;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER_COMPLETE = 0x8CD5;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8CD9;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER_UNSUPPORTED = 0x8CDD;


/**
 * @const
 * @type {number}
 */
export var FRAMEBUFFER_BINDING = 0x8CA6;


/**
 * @const
 * @type {number}
 */
export var RENDERBUFFER_BINDING = 0x8CA7;


/**
 * @const
 * @type {number}
 */
export var MAX_RENDERBUFFER_SIZE = 0x84E8;


/**
 * @const
 * @type {number}
 */
export var INVALID_FRAMEBUFFER_OPERATION = 0x0506;


/**
 * @const
 * @type {number}
 */
export var UNPACK_FLIP_Y_WEBGL = 0x9240;


/**
 * @const
 * @type {number}
 */
export var UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;


/**
 * @const
 * @type {number}
 */
export var CONTEXT_LOST_WEBGL = 0x9242;


/**
 * @const
 * @type {number}
 */
export var UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;


/**
 * @const
 * @type {number}
 */
export var BROWSER_DEFAULT_WEBGL = 0x9244;


/**
 * From the OES_texture_half_float extension.
 * http://www.khronos.org/registry/webgl/extensions/OES_texture_half_float/
 * @const
 * @type {number}
 */
export var HALF_FLOAT_OES = 0x8D61;


/**
 * From the OES_standard_derivatives extension.
 * http://www.khronos.org/registry/webgl/extensions/OES_standard_derivatives/
 * @const
 * @type {number}
 */
export var FRAGMENT_SHADER_DERIVATIVE_HINT_OES = 0x8B8B;


/**
 * From the OES_vertex_array_object extension.
 * http://www.khronos.org/registry/webgl/extensions/OES_vertex_array_object/
 * @const
 * @type {number}
 */
export var VERTEX_ARRAY_BINDING_OES = 0x85B5;


/**
 * From the WEBGL_debug_renderer_info extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_debug_renderer_info/
 * @const
 * @type {number}
 */
export var UNMASKED_VENDOR_WEBGL = 0x9245;


/**
 * From the WEBGL_debug_renderer_info extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_debug_renderer_info/
 * @const
 * @type {number}
 */
export var UNMASKED_RENDERER_WEBGL = 0x9246;


/**
 * From the WEBGL_compressed_texture_s3tc extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
 * @const
 * @type {number}
 */
export var COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;


/**
 * From the WEBGL_compressed_texture_s3tc extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
 * @const
 * @type {number}
 */
export var COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;


/**
 * From the WEBGL_compressed_texture_s3tc extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
 * @const
 * @type {number}
 */
export var COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;


/**
 * From the WEBGL_compressed_texture_s3tc extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
 * @const
 * @type {number}
 */
export var COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;


/**
 * From the EXT_texture_filter_anisotropic extension.
 * http://www.khronos.org/registry/webgl/extensions/EXT_texture_filter_anisotropic/
 * @const
 * @type {number}
 */
export var TEXTURE_MAX_ANISOTROPY_EXT = 0x84FE;


/**
 * From the EXT_texture_filter_anisotropic extension.
 * http://www.khronos.org/registry/webgl/extensions/EXT_texture_filter_anisotropic/
 * @const
 * @type {number}
 */
export var MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FF;
