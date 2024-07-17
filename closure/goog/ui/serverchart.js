/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Component for generating chart PNGs using Google Chart Server.
 *
 * @deprecated Google Chart Images service (the server-side component of this
 *     class) has been deprecated. See
 *     https://developers.google.com/chart/ for alternatives.
 *
 * @see ../demos/serverchart.html
 */


/**
 * Namespace for chart functions
 */
import { Uri } from '../uri/uri.js';

import * as asserts from '../asserts/asserts.js';
import dom from '../asserts/dom.js';
import { TagName } from '../dom/tagname.js';
import { Event } from '../events/event.js';
import { Component } from './component.js';
const { DomHelper } = goog.requireType('goog.dom.dom');



/**
 * Will construct a chart using Google's chartserver.
 *
 * @param {ServerChart.ChartType} type The chart type.
 * @param {number=} opt_width The width of the chart.
 * @param {number=} opt_height The height of the chart.
 * @param {DomHelper=} opt_domHelper Optional DOM Helper.
 * @param {string=} opt_uri Optional uri used to connect to the chart server, if
 *     different than ServerChart.CHART_SERVER_SCHEME_INDEPENDENT_URI.
 * @constructor
 * @extends {Component}
 *
 * @deprecated Google Chart Server has been deprecated. See
 *     https://developers.google.com/chart/image/ for details.
 * @final
 */
export function ServerChart(type, opt_width, opt_height, opt_domHelper, opt_uri) {
 Component.call(this, opt_domHelper);

 /**
   * Image URI.
   * @type {Uri}
   * @private
   */
 this.uri_ = new Uri(
     opt_uri || ServerChart.CHART_SERVER_SCHEME_INDEPENDENT_URI);

 /**
    * Encoding method for the URI data format.
    * @type {ServerChart.EncodingType}
    * @private
    */
 this.encodingType_ = ServerChart.EncodingType.AUTOMATIC;

 /**
  * Two-dimensional array of the data sets on the chart.
  * @type {Array<Array<number>>}
  * @private
  */
 this.dataSets_ = [];

 /**
  * Colors for each data set.
  * @type {Array<string>}
  * @private
  */
 this.setColors_ = [];

 /**
  * Legend texts for each data set.
  * @type {Array<string>}
  * @private
  */
 this.setLegendTexts_ = [];

 /**
  * Labels on the X-axis.
  * @type {Array<string>}
  * @private
  */
 this.xLabels_ = [];

 /**
  * Labels on the left along the Y-axis.
  * @type {Array<string>}
  * @private
  */
 this.leftLabels_ = [];

 /**
  * Labels on the right along the Y-axis.
  * @type {Array<string>}
  * @private
  */
 this.rightLabels_ = [];

 /**
    * Axis type for each multi-axis in the chart. The indices into this array
    * also work as the reference index for all other multi-axis properties.
    * @type {Array<ServerChart.MultiAxisType>}
    * @private
    */
 this.multiAxisType_ = [];

 /**
  * Axis text for each multi-axis in the chart, indexed by the indices from
  * multiAxisType_ in a sparse array.
  * @type {Object}
  * @private
  */
 this.multiAxisLabelText_ = {};


 /**
  * Axis position for each multi-axis in the chart, indexed by the indices
  * from multiAxisType_ in a sparse array.
  * @type {Object}
  * @private
  */
 this.multiAxisLabelPosition_ = {};

 /**
  * Axis range for each multi-axis in the chart, indexed by the indices from
  * multiAxisType_ in a sparse array.
  * @type {Object}
  * @private
  */
 this.multiAxisRange_ = {};

 /**
  * Axis style for each multi-axis in the chart, indexed by the indices from
  * multiAxisType_ in a sparse array.
  * @type {Object}
  * @private
  */
 this.multiAxisLabelStyle_ = {};

 this.setType(type);
 this.setSize(opt_width, opt_height);

 /**
  * Minimum value for the chart (used for normalization). By default,
  * this is set to infinity, and is eventually updated to the lowest given
  * value in the data. The minimum value is then subtracted from all other
  * values. For a pie chart, subtracting the minimum value does not make
  * sense, so minValue_ is set to zero because 0 is the additive identity.
  * @type {number}
  * @private
  */
 this.minValue_ = this.isPieChart() ? 0 : Infinity;
}
goog.inherits(ServerChart, Component);


/**
 * Base scheme-independent URI for the chart renderer.
 * @type {string}
 */
ServerChart.CHART_SERVER_SCHEME_INDEPENDENT_URI =
    '//chart.googleapis.com/chart';


/**
 * Base HTTP URI for the chart renderer.
 * @type {string}
 */
ServerChart.CHART_SERVER_HTTP_URI = 'http://chart.googleapis.com/chart';


/**
 * Base HTTPS URI for the chart renderer.
 * @type {string}
 */
ServerChart.CHART_SERVER_HTTPS_URI =
    'https://chart.googleapis.com/chart';


/**
 * Base URI for the chart renderer.
 * @type {string}
 * @deprecated Use
 *     {@link ServerChart.CHART_SERVER_SCHEME_INDEPENDENT_URI},
 *     {@link ServerChart.CHART_SERVER_HTTP_URI} or
 *     {@link ServerChart.CHART_SERVER_HTTPS_URI} instead.
 */
ServerChart.CHART_SERVER_URI =
    ServerChart.CHART_SERVER_HTTP_URI;


/**
 * The 0 - 1.0 ("fraction of the range") value to use when getMinValue() ==
 * getMaxValue(). This determines, for example, the vertical position
 * of the line in a flat line-chart.
 * @type {number}
 */
ServerChart.DEFAULT_NORMALIZATION = 0.5;


/**
 * The upper limit on the length of the chart image URI, after encoding.
 * If the URI's length equals or exceeds it, ServerChart.UriTooLongEvent
 * is dispatched on the ServerChart object.
 * @type {number}
 * @private
 */
ServerChart.prototype.uriLengthLimit_ = 2048;


/**
 * Number of gridlines along the X-axis.
 * @type {number}
 * @private
 */
ServerChart.prototype.gridX_ = 0;


/**
 * Number of gridlines along the Y-axis.
 * @type {number}
 * @private
 */
ServerChart.prototype.gridY_ = 0;


/**
 * Maximum value for the chart (used for normalization). The minimum is
 * declared in the constructor.
 * @type {number}
 * @private
 */
ServerChart.prototype.maxValue_ = -Infinity;


/**
 * Chart title.
 * @type {?string}
 * @private
 */
ServerChart.prototype.title_ = null;


/**
 * Chart title size.
 * @type {number}
 * @private
 */
ServerChart.prototype.titleSize_ = 13.5;


/**
 * Chart title color.
 * @type {string}
 * @private
 */
ServerChart.prototype.titleColor_ = '333333';


/**
 * Chart legend.
 * @type {Array<string>?}
 * @private
 */
ServerChart.prototype.legend_ = null;


/**
 * ChartServer supports using data sets to position markers. A data set
 * that is being used for positioning only can be made "invisible", in other
 * words, the caller can indicate to ChartServer that ordinary chart elements
 * (e.g. bars in a bar chart) should not be drawn on the data points of the
 * invisible data set. Such data sets must be provided at the end of the
 * chd parameter, and if invisible data sets are being used, the chd
 * parameter must indicate the number of visible data sets.
 * @type {?number}
 * @private
 */
ServerChart.prototype.numVisibleDataSets_ = null;


/**
 * Creates the DOM node (image) needed for the Chart
 * @override
 */
ServerChart.prototype.createDom = function() {
 var size = this.getSize();
 this.setElementInternal(this.getDomHelper().createDom(TagName.IMG, {
   'src': this.getUri(),
   'class': goog.getCssName('goog-serverchart-image'),
   'width': size[0],
   'height': size[1]
 }));
};


/**
 * Decorate an image already in the DOM.
 * Expects the following structure:
 * <pre>
 *   - img
 * </pre>
 *
 * @param {Element} img Image to decorate.
 * @override
 */
ServerChart.prototype.decorateInternal = function(img) {
 dom.assertIsHtmlImageElement(img).src = this.getUri().toString();
 this.setElementInternal(img);
};


/**
 * Updates the image if any of the data or settings have changed.
 */
ServerChart.prototype.updateChart = function() {
 if (this.getElement()) {
   dom.assertIsHtmlImageElement(this.getElement()).src =
       this.getUri().toString();
 }
};


/**
 * Sets the URI of the chart.
 *
 * @param {Uri} uri The chart URI.
 */
ServerChart.prototype.setUri = function(uri) {
 this.uri_ = uri;
};


/**
 * Returns the URI of the chart.
 *
 * @return {Uri} The chart URI.
 */
ServerChart.prototype.getUri = function() {
 this.computeDataString_();
 return this.uri_;
};


/**
 * Returns the upper limit on the length of the chart image URI, after encoding.
 * If the URI's length equals or exceeds it, ServerChart.UriTooLongEvent
 * is dispatched on the ServerChart object.
 *
 * @return {number} The chart URI length limit.
 */
ServerChart.prototype.getUriLengthLimit = function() {
 return this.uriLengthLimit_;
};


/**
 * Sets the upper limit on the length of the chart image URI, after encoding.
 * If the URI's length equals or exceeds it, ServerChart.UriTooLongEvent
 * is dispatched on the ServerChart object.
 *
 * @param {number} uriLengthLimit The chart URI length limit.
 */
ServerChart.prototype.setUriLengthLimit = function(uriLengthLimit) {
 this.uriLengthLimit_ = uriLengthLimit;
};


/**
 * Sets the 'chg' parameter of the chart Uri.
 * This is used by various types of charts to specify Grids.
 *
 * @param {string} value Value for the 'chg' parameter in the chart Uri.
 */
ServerChart.prototype.setGridParameter = function(value) {
 this.uri_.setParameterValue(ServerChart.UriParam.GRID, value);
};


/**
 * Returns the 'chg' parameter of the chart Uri.
 * This is used by various types of charts to specify Grids.
 *
 * @return {string|undefined} The 'chg' parameter of the chart Uri.
 */
ServerChart.prototype.getGridParameter = function() {
 return /** @type {string} */ (this.uri_.getParameterValue(ServerChart.UriParam.GRID));
};


/**
 * Sets the 'chm' parameter of the chart Uri.
 * This is used by various types of charts to specify Markers.
 *
 * @param {string} value Value for the 'chm' parameter in the chart Uri.
 */
ServerChart.prototype.setMarkerParameter = function(value) {
 this.uri_.setParameterValue(ServerChart.UriParam.MARKERS, value);
};


/**
 * Returns the 'chm' parameter of the chart Uri.
 * This is used by various types of charts to specify Markers.
 *
 * @return {string|undefined} The 'chm' parameter of the chart Uri.
 */
ServerChart.prototype.getMarkerParameter = function() {
 return /** @type {string} */ (this.uri_.getParameterValue(ServerChart.UriParam.MARKERS));
};


/**
 * Sets the 'chp' parameter of the chart Uri.
 * This is used by various types of charts to specify certain options.
 * e.g., finance charts use this to designate which line is the 0 axis.
 *
 * @param {string|number} value Value for the 'chp' parameter in the chart Uri.
 */
ServerChart.prototype.setMiscParameter = function(value) {
 this.uri_.setParameterValue(
     ServerChart.UriParam.MISC_PARAMS, String(value));
};


/**
 * Returns the 'chp' parameter of the chart Uri.
 * This is used by various types of charts to specify certain options.
 * e.g., finance charts use this to designate which line is the 0 axis.
 *
 * @return {string|undefined} The 'chp' parameter of the chart Uri.
 */
ServerChart.prototype.getMiscParameter = function() {
 return /** @type {string} */ (this.uri_.getParameterValue(ServerChart.UriParam.MISC_PARAMS));
};


/**
 * Enum of chart data encoding types
 *
 * @enum {string}
 */
ServerChart.EncodingType = {
  AUTOMATIC: '',
  EXTENDED: 'e',
  SIMPLE: 's',
  TEXT: 't'
};


/**
 * Enum of chart types with their short names used by the chartserver.
 *
 * @enum {string}
 */
ServerChart.ChartType = {
  BAR: 'br',
  CLOCK: 'cf',
  CONCENTRIC_PIE: 'pc',
  FILLEDLINE: 'lr',
  FINANCE: 'lfi',
  GOOGLEOMETER: 'gom',
  HORIZONTAL_GROUPED_BAR: 'bhg',
  HORIZONTAL_STACKED_BAR: 'bhs',
  LINE: 'lc',
  MAP: 't',
  MAPUSA: 'tuss',
  MAPWORLD: 'twoc',
  PIE: 'p',
  PIE3D: 'p3',
  RADAR: 'rs',
  SCATTER: 's',
  SPARKLINE: 'ls',
  VENN: 'v',
  VERTICAL_GROUPED_BAR: 'bvg',
  VERTICAL_STACKED_BAR: 'bvs',
  XYLINE: 'lxy'
};


/**
 * Enum of multi-axis types.
 *
 * @enum {string}
 */
ServerChart.MultiAxisType = {
  X_AXIS: 'x',
  LEFT_Y_AXIS: 'y',
  RIGHT_Y_AXIS: 'r',
  TOP_AXIS: 't'
};


/**
 * Enum of multi-axis alignments.
 *
 * @enum {number}
 */
ServerChart.MultiAxisAlignment = {
  ALIGN_LEFT: -1,
  ALIGN_CENTER: 0,
  ALIGN_RIGHT: 1
};


/**
 * Enum of legend positions.
 *
 * @enum {string}
 */
ServerChart.LegendPosition = {
  TOP: 't',
  BOTTOM: 'b',
  LEFT: 'l',
  RIGHT: 'r'
};


/**
 * Enum of line and tick options for an axis.
 *
 * @enum {string}
 */
ServerChart.AxisDisplayType = {
  LINE_AND_TICKS: 'lt',
  LINE: 'l',
  TICKS: 't'
};


/**
 * Enum of chart maximum values in pixels, as listed at:
 * http://code.google.com/apis/chart/basics.html
 *
 * @enum {number}
 */
ServerChart.MaximumValue = {
  WIDTH: 1000,
  HEIGHT: 1000,
  MAP_WIDTH: 440,
  MAP_HEIGHT: 220,
  TOTAL_AREA: 300000
};


/**
 * Enum of ChartServer URI parameters.
 *
 * @enum {string}
 */
ServerChart.UriParam = {
  BACKGROUND_FILL: 'chf',
  BAR_HEIGHT: 'chbh',
  DATA: 'chd',
  DATA_COLORS: 'chco',
  DATA_LABELS: 'chld',
  DATA_SCALING: 'chds',
  DIGITAL_SIGNATURE: 'sig',
  GEOGRAPHICAL_REGION: 'chtm',
  GRID: 'chg',
  LABEL_COLORS: 'chlc',
  LEFT_Y_LABELS: 'chly',
  LEGEND: 'chdl',
  LEGEND_POSITION: 'chdlp',
  LEGEND_TEXTS: 'chdl',
  LINE_STYLES: 'chls',
  MARGINS: 'chma',
  MARKERS: 'chm',
  MISC_PARAMS: 'chp',
  MULTI_AXIS_LABEL_POSITION: 'chxp',
  MULTI_AXIS_LABEL_TEXT: 'chxl',
  MULTI_AXIS_RANGE: 'chxr',
  MULTI_AXIS_STYLE: 'chxs',
  MULTI_AXIS_TYPES: 'chxt',
  RIGHT_LABELS: 'chlr',
  RIGHT_LABEL_POSITIONS: 'chlrp',
  SIZE: 'chs',
  TITLE: 'chtt',
  TITLE_FORMAT: 'chts',
  TYPE: 'cht',
  X_AXIS_STYLE: 'chx',
  X_LABELS: 'chl'
};


/**
 * Sets the background fill.
 *
 * @param {Array<Object>} fill An array of background fill specification
 *     objects. Each object may have the following properties:
 *     {string} area The area to fill, either 'bg' for background or 'c' for
 *         chart area.  The default is 'bg'.
 *     {string} color (required) The color of the background fill.
 *     // TODO(user): Add support for gradient/stripes, which requires
 *     // a different object structure.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ServerChart.prototype.setBackgroundFill = function(fill) {
 var value = [];
 fill.forEach(function(spec) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  spec.area = spec.area || 'bg';
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  spec.effect = spec.effect || 's';
  value.push([spec.area, spec.effect, spec.color].join(','));
 });
 value = value.join('|');
 this.setParameterValue(ServerChart.UriParam.BACKGROUND_FILL, value);
};


/**
 * Returns the background fill.
 *
 * @return {!Array<Object>} An array of background fill specifications.
 *     If the fill specification string is in an unsupported format, the method
 *    returns an empty array.
 */
ServerChart.prototype.getBackgroundFill = function() {
 var value =
     this.uri_.getParameterValue(ServerChart.UriParam.BACKGROUND_FILL);
 var result = [];
 if (value != null) {
   var fillSpecifications = value.split('|');
   var valid = true;
   fillSpecifications.forEach(function(spec) {
    var parts = spec.split(',');
    if (valid && parts[1] == 's') {
      result.push({area: parts[0], effect: parts[1], color: parts[2]});
    } else {
      // If the format is unsupported, return an empty array.
      result = [];
      valid = false;
    }
   });
 }
 return result;
};


/**
 * Sets the encoding type.
 *
 * @param {ServerChart.EncodingType} type Desired data encoding type.
 */
ServerChart.prototype.setEncodingType = function(type) {
 this.encodingType_ = type;
};


/**
 * Gets the encoding type.
 *
 * @return {ServerChart.EncodingType} The encoding type.
 */
ServerChart.prototype.getEncodingType = function() {
 return this.encodingType_;
};


/**
 * Sets the chart type.
 *
 * @param {ServerChart.ChartType} type The desired chart type.
 */
ServerChart.prototype.setType = function(type) {
 this.uri_.setParameterValue(ServerChart.UriParam.TYPE, type);
};


/**
 * Returns the chart type.
 *
 * @return {ServerChart.ChartType} The chart type.
 */
ServerChart.prototype.getType = function() {
 return /** @type {ServerChart.ChartType} */ (this.uri_.getParameterValue(ServerChart.UriParam.TYPE));
};


/**
 * Sets the chart size.
 *
 * @param {number=} opt_width Optional chart width, defaults to 300.
 * @param {number=} opt_height Optional chart height, defaults to 150.
 */
ServerChart.prototype.setSize = function(opt_width, opt_height) {
 var sizeString = [opt_width || 300, opt_height || 150].join('x');
 this.uri_.setParameterValue(ServerChart.UriParam.SIZE, sizeString);
};


/**
 * Returns the chart size.
 *
 * @return {!Array<string>} [Width, Height].
 */
ServerChart.prototype.getSize = function() {
 var sizeStr = this.uri_.getParameterValue(ServerChart.UriParam.SIZE);
 return sizeStr.split('x');
};


/**
 * Sets the minimum value of the chart.
 *
 * @param {number} minValue The minimum value of the chart.
 */
ServerChart.prototype.setMinValue = function(minValue) {
 this.minValue_ = minValue;
};


/**
 * @return {number} The minimum value of the chart.
 */
ServerChart.prototype.getMinValue = function() {
 return this.minValue_;
};


/**
 * Sets the maximum value of the chart.
 *
 * @param {number} maxValue The maximum value of the chart.
 */
ServerChart.prototype.setMaxValue = function(maxValue) {
 this.maxValue_ = maxValue;
};


/**
 * @return {number} The maximum value of the chart.
 */
ServerChart.prototype.getMaxValue = function() {
 return this.maxValue_;
};


/**
 * Sets the chart margins.
 *
 * @param {number} leftMargin The size in pixels of the left margin.
 * @param {number} rightMargin The size in pixels of the right margin.
 * @param {number} topMargin The size in pixels of the top margin.
 * @param {number} bottomMargin The size in pixels of the bottom margin.
 */
ServerChart.prototype.setMargins = function(
    leftMargin, rightMargin, topMargin, bottomMargin) {
 var margins = [leftMargin, rightMargin, topMargin, bottomMargin].join(',');
 var UriParam = ServerChart.UriParam;
 this.uri_.setParameterValue(UriParam.MARGINS, margins);
};


/**
 * Sets the number of grid lines along the X-axis.
 *
 * @param {number} gridlines The number of X-axis grid lines.
 */
ServerChart.prototype.setGridX = function(gridlines) {
 // Need data for this to work.
 this.gridX_ = gridlines;
 this.setGrids_(this.gridX_, this.gridY_);
};


/**
 * @return {number} The number of gridlines along the X-axis.
 */
ServerChart.prototype.getGridX = function() {
 return this.gridX_;
};


/**
 * Sets the number of grid lines along the Y-axis.
 *
 * @param {number} gridlines The number of Y-axis grid lines.
 */
ServerChart.prototype.setGridY = function(gridlines) {
 // Need data for this to work.
 this.gridY_ = gridlines;
 this.setGrids_(this.gridX_, this.gridY_);
};


/**
 * @return {number} The number of gridlines along the Y-axis.
 */
ServerChart.prototype.getGridY = function() {
 return this.gridY_;
};


/**
 * Sets the grids for the chart
 *
 * @private
 * @param {number} x The number of grid lines along the x-axis.
 * @param {number} y The number of grid lines along the y-axis.
 */
ServerChart.prototype.setGrids_ = function(x, y) {
 var gridArray = [x == 0 ? 0 : 100 / x, y == 0 ? 0 : 100 / y];
 this.uri_.setParameterValue(
     ServerChart.UriParam.GRID, gridArray.join(','));
};


/**
 * Sets the X Labels for the chart.
 *
 * @param {Array<string>} labels The X Labels for the chart.
 */
ServerChart.prototype.setXLabels = function(labels) {
 this.xLabels_ = labels;
 this.uri_.setParameterValue(
     ServerChart.UriParam.X_LABELS, this.xLabels_.join('|'));
};


/**
 * @return {Array<string>} The X Labels for the chart.
 */
ServerChart.prototype.getXLabels = function() {
 return this.xLabels_;
};


/**
 * @return {boolean} Whether the chart is a bar chart.
 */
ServerChart.prototype.isBarChart = function() {
 var type = this.getType();
 return type == ServerChart.ChartType.BAR ||
     type == ServerChart.ChartType.HORIZONTAL_GROUPED_BAR ||
     type == ServerChart.ChartType.HORIZONTAL_STACKED_BAR ||
     type == ServerChart.ChartType.VERTICAL_GROUPED_BAR ||
     type == ServerChart.ChartType.VERTICAL_STACKED_BAR;
};


/**
 * @return {boolean} Whether the chart is a pie chart.
 */
ServerChart.prototype.isPieChart = function() {
 var type = this.getType();
 return type == ServerChart.ChartType.PIE ||
     type == ServerChart.ChartType.PIE3D ||
     type == ServerChart.ChartType.CONCENTRIC_PIE;
};


/**
 * @return {boolean} Whether the chart is a grouped bar chart.
 */
ServerChart.prototype.isGroupedBarChart = function() {
 var type = this.getType();
 return type == ServerChart.ChartType.HORIZONTAL_GROUPED_BAR ||
     type == ServerChart.ChartType.VERTICAL_GROUPED_BAR;
};


/**
 * @return {boolean} Whether the chart is a horizontal bar chart.
 */
ServerChart.prototype.isHorizontalBarChart = function() {
 var type = this.getType();
 return type == ServerChart.ChartType.BAR ||
     type == ServerChart.ChartType.HORIZONTAL_GROUPED_BAR ||
     type == ServerChart.ChartType.HORIZONTAL_STACKED_BAR;
};


/**
 * @return {boolean} Whether the chart is a line chart.
 */
ServerChart.prototype.isLineChart = function() {
 var type = this.getType();
 return type == ServerChart.ChartType.FILLEDLINE ||
     type == ServerChart.ChartType.LINE ||
     type == ServerChart.ChartType.SPARKLINE ||
     type == ServerChart.ChartType.XYLINE;
};


/**
 * @return {boolean} Whether the chart is a map.
 */
ServerChart.prototype.isMap = function() {
 var type = this.getType();
 return type == ServerChart.ChartType.MAP ||
     type == ServerChart.ChartType.MAPUSA ||
     type == ServerChart.ChartType.MAPWORLD;
};


/**
 * @return {boolean} Whether the chart is a stacked bar chart.
 */
ServerChart.prototype.isStackedBarChart = function() {
 var type = this.getType();
 return type == ServerChart.ChartType.BAR ||
     type == ServerChart.ChartType.HORIZONTAL_STACKED_BAR ||
     type == ServerChart.ChartType.VERTICAL_STACKED_BAR;
};


/**
 * @return {boolean} Whether the chart is a vertical bar chart.
 */
ServerChart.prototype.isVerticalBarChart = function() {
 var type = this.getType();
 return type == ServerChart.ChartType.VERTICAL_GROUPED_BAR ||
     type == ServerChart.ChartType.VERTICAL_STACKED_BAR;
};


/**
 * Sets the Left Labels for the chart.
 * NOTE: The array should start with the lowest value, and then
 *       move progessively up the axis. So if you want labels
 *       from 0 to 100 with 0 at bottom of the graph, then you would
 *       want to pass something like [0,25,50,75,100].
 *
 * @param {Array<string>} labels The Left Labels for the chart.
 */
ServerChart.prototype.setLeftLabels = function(labels) {
 this.leftLabels_ = labels;
 this.uri_.setParameterValue(
     ServerChart.UriParam.LEFT_Y_LABELS,
     this.leftLabels_.reverse().join('|'));
};


/**
 * @return {Array<string>} The Left Labels for the chart.
 */
ServerChart.prototype.getLeftLabels = function() {
 return this.leftLabels_;
};


/**
 * Sets the given ChartServer parameter.
 *
 * @param {ServerChart.UriParam} key The ChartServer parameter to set.
 * @param {string} value The value to set for the ChartServer parameter.
 */
ServerChart.prototype.setParameterValue = function(key, value) {
 this.uri_.setParameterValue(key, value);
};


/**
 * Removes the given ChartServer parameter.
 *
 * @param {ServerChart.UriParam} key The ChartServer parameter to
 *     remove.
 */
ServerChart.prototype.removeParameter = function(key) {
 this.uri_.removeParameter(key);
};


/**
 * Sets the Right Labels for the chart.
 * NOTE: The array should start with the lowest value, and then
 *       move progessively up the axis. So if you want labels
 *       from 0 to 100 with 0 at bottom of the graph, then you would
 *       want to pass something like [0,25,50,75,100].
 *
 * @param {Array<string>} labels The Right Labels for the chart.
 */
ServerChart.prototype.setRightLabels = function(labels) {
 this.rightLabels_ = labels;
 this.uri_.setParameterValue(
     ServerChart.UriParam.RIGHT_LABELS,
     this.rightLabels_.reverse().join('|'));
};


/**
 * @return {Array<string>} The Right Labels for the chart.
 */
ServerChart.prototype.getRightLabels = function() {
 return this.rightLabels_;
};


/**
 * Sets the position relative to the chart where the legend is to be displayed.
 *
 * @param {ServerChart.LegendPosition} value Legend position.
 */
ServerChart.prototype.setLegendPosition = function(value) {
 this.uri_.setParameterValue(
     ServerChart.UriParam.LEGEND_POSITION, value);
};


/**
 * Returns the position relative to the chart where the legend is to be
 * displayed.
 *
 * @return {ServerChart.LegendPosition} Legend position.
 */
ServerChart.prototype.getLegendPosition = function() {
 return /** @type {ServerChart.LegendPosition} */ (this.uri_.getParameterValue(ServerChart.UriParam.LEGEND_POSITION));
};


/**
 * Sets the number of "visible" data sets. All data sets that come after
 * the visible data set are not drawn as part of the chart. Instead, they
 * are available for positioning markers.

 * @param {?number} n The number of visible data sets, or null if all data
 * sets are to be visible.
 */
ServerChart.prototype.setNumVisibleDataSets = function(n) {
 this.numVisibleDataSets_ = n;
};


/**
 * Returns the number of "visible" data sets. All data sets that come after
 * the visible data set are not drawn as part of the chart. Instead, they
 * are available for positioning markers.
 *
 * @return {?number} The number of visible data sets, or null if all data
 * sets are visible.
 */
ServerChart.prototype.getNumVisibleDataSets = function() {
 return this.numVisibleDataSets_;
};


/**
 * Sets the weight function for a Venn Diagram along with the associated
 *     colors and legend text. Weights are assigned as follows:
 *     weights[0] is relative area of circle A.
 *     weights[1] is relative area of circle B.
 *     weights[2] is relative area of circle C.
 *     weights[3] is relative area of overlap of circles A and B.
 *     weights[4] is relative area of overlap of circles A and C.
 *     weights[5] is relative area of overlap of circles B and C.
 *     weights[6] is relative area of overlap of circles A, B and C.
 * For a two circle Venn Diagram the weights are assigned as follows:
 *     weights[0] is relative area of circle A.
 *     weights[1] is relative area of circle B.
 *     weights[2] is relative area of overlap of circles A and B.
 *
 * @param {Array<number>} weights The relative weights of the circles.
 * @param {Array<string>=} opt_legendText The legend labels for the circles.
 * @param {Array<string>=} opt_colors The colors for the circles.
 */
ServerChart.prototype.setVennSeries = function(
    weights, opt_legendText, opt_colors) {
 if (this.getType() != ServerChart.ChartType.VENN) {
   throw new Error('Can only set a weight function for a Venn diagram.');
 }
 var dataMin = this.arrayMin_(weights);
 if (dataMin < this.minValue_) {
   this.minValue_ = dataMin;
 }
 var dataMax = this.arrayMax_(weights);
 if (dataMax > this.maxValue_) {
   this.maxValue_ = dataMax;
 }
 if (opt_legendText !== undefined) {
   opt_legendText.forEach(goog.bind(function(legend) {
    this.setLegendTexts_.push(legend);
   }, this));
   this.uri_.setParameterValue(
       ServerChart.UriParam.LEGEND_TEXTS,
       this.setLegendTexts_.join('|'));
 }
 // If the caller only gave three weights, then they wanted a two circle
 // Venn Diagram. Create a 3 circle weight function where circle C has
 // area zero.
 if (weights.length == 3) {
   weights[3] = weights[2];
   weights[2] = 0.0;
 }
 this.dataSets_.push(weights);
 if (opt_colors !== undefined) {
   opt_colors.forEach(goog.bind(function(color) {
    this.setColors_.push(color);
   }, this));
   this.uri_.setParameterValue(
       ServerChart.UriParam.DATA_COLORS, this.setColors_.join(','));
 }
};


/**
 * Sets the title of the chart.
 *
 * @param {string} title The chart title.
 */
ServerChart.prototype.setTitle = function(title) {
 this.title_ = title;
 this.uri_.setParameterValue(
     ServerChart.UriParam.TITLE, this.title_.replace(/\n/g, '|'));
};


/**
 * Sets the size of the chart title.
 *
 * @param {number} size The title size, in points.
 */
ServerChart.prototype.setTitleSize = function(size) {
 this.titleSize_ = size;
 this.uri_.setParameterValue(
     ServerChart.UriParam.TITLE_FORMAT,
     this.titleColor_ + ',' + this.titleSize_);
};


/**
 * @return {number} size The title size, in points.
 */
ServerChart.prototype.getTitleSize = function() {
 return this.titleSize_;
};


/**
 * Sets the color of the chart title.
 *
 * NOTE: The color string should NOT have a '#' at the beginning of it.
 *
 * @param {string} color The hex value for the title color.
 */
ServerChart.prototype.setTitleColor = function(color) {
 this.titleColor_ = color;
 this.uri_.setParameterValue(
     ServerChart.UriParam.TITLE_FORMAT,
     this.titleColor_ + ',' + this.titleSize_);
};


/**
 * @return {string} color The hex value for the title color.
 */
ServerChart.prototype.getTitleColor = function() {
 return this.titleColor_;
};


/**
 * Adds a legend to the chart.
 *
 * @param {Array<string>} legend The legend to add.
 */
ServerChart.prototype.setLegend = function(legend) {
 this.legend_ = legend;
 this.uri_.setParameterValue(
     ServerChart.UriParam.LEGEND, this.legend_.join('|'));
};


/**
 * Sets the data scaling.
 * NOTE: This also changes the encoding type because data scaling will
 *     only work with `ServerChart.EncodingType.TEXT`
 *     encoding.
 * @param {number} minimum The lowest number to apply to the data.
 * @param {number} maximum The highest number to apply to the data.
 */
ServerChart.prototype.setDataScaling = function(minimum, maximum) {
 this.encodingType_ = ServerChart.EncodingType.TEXT;
 this.uri_.setParameterValue(
     ServerChart.UriParam.DATA_SCALING, minimum + ',' + maximum);
};


/**
 * Sets the widths of the bars and the spaces between the bars in a bar
 * chart.
 * NOTE: If the space between groups is specified but the space between
 *     bars is left undefined, the space between groups will be interpreted
 *     as the space between bars because this is the behavior exposed
 *     in the external developers guide.
 * @param {number} barWidth The width of a bar in pixels.
 * @param {number=} opt_spaceBars The width of the space between
 *     bars in a group in pixels.
 * @param {number=} opt_spaceGroups The width of the space between
 *     groups.
 */
ServerChart.prototype.setBarSpaceWidths = function(
    barWidth, opt_spaceBars, opt_spaceGroups) {
 var widths = [barWidth];
 if (opt_spaceBars !== undefined) {
   widths.push(opt_spaceBars);
 }
 if (opt_spaceGroups !== undefined) {
   widths.push(opt_spaceGroups);
 }
 this.uri_.setParameterValue(
     ServerChart.UriParam.BAR_HEIGHT, widths.join(','));
};


/**
 * Specifies that the bar width in a bar chart should be calculated
 * automatically given the space available in the chart, while optionally
 * setting the spaces between the bars.
 * NOTE: If the space between groups is specified but the space between
 *     bars is left undefined, the space between groups will be interpreted
 *     as the space between bars because this is the behavior exposed
 *     in the external developers guide.
 * @param {number=} opt_spaceBars The width of the space between
 *     bars in a group in pixels.
 * @param {number=} opt_spaceGroups The width of the space between
 *     groups.
 */
ServerChart.prototype.setAutomaticBarWidth = function(
    opt_spaceBars, opt_spaceGroups) {
 var widths = ['a'];
 if (opt_spaceBars !== undefined) {
   widths.push(opt_spaceBars);
 }
 if (opt_spaceGroups !== undefined) {
   widths.push(opt_spaceGroups);
 }
 this.uri_.setParameterValue(
     ServerChart.UriParam.BAR_HEIGHT, widths.join(','));
};


/**
 * Adds a multi-axis to the chart, and sets its type. Multiple axes of the same
 * type can be added.
 *
 * @param {ServerChart.MultiAxisType} axisType The desired axis type.
 * @return {number} The index of the newly inserted axis, suitable for feeding
 *     to the setMultiAxis*() functions.
 */
ServerChart.prototype.addMultiAxis = function(axisType) {
 this.multiAxisType_.push(axisType);
 this.uri_.setParameterValue(
     ServerChart.UriParam.MULTI_AXIS_TYPES,
     this.multiAxisType_.join(','));
 return this.multiAxisType_.length - 1;
};


/**
 * Returns the axis type for the given axis, or all of them in an array if the
 * axis number is not given.
 *
 * @param {number=} opt_axisNumber The axis index, as returned by addMultiAxis.
 * @return {ServerChart.MultiAxisType|
 *     Array<ServerChart.MultiAxisType>}
 *     The axis type for the given axis, or all of them in an array if the
 *     axis number is not given.
 */
ServerChart.prototype.getMultiAxisType = function(opt_axisNumber) {
 if (opt_axisNumber !== undefined) {
   return this.multiAxisType_[opt_axisNumber];
 }
 return this.multiAxisType_;
};


/**
 * Sets the label text (usually multiple values) for a given axis, overwriting
 * any existing values.
 *
 * @param {number} axisNumber The axis index, as returned by addMultiAxis.
 * @param {Array<string>} labelText The actual label text to be added.
 */
ServerChart.prototype.setMultiAxisLabelText = function(
    axisNumber, labelText) {
 this.multiAxisLabelText_[axisNumber] = labelText;

 var axisString = this.computeMultiAxisDataString_(
     this.multiAxisLabelText_, ':|', '|', '|');
 this.uri_.setParameterValue(
     ServerChart.UriParam.MULTI_AXIS_LABEL_TEXT, axisString);
};


/**
 * Returns the label text, or all of them in a two-dimensional array if the
 * axis number is not given.
 *
 * @param {number=} opt_axisNumber The axis index, as returned by addMultiAxis.
 * @return {Object|Array<string>} The label text, or all of them in a
 *     two-dimensional array if the axis number is not given.
 */
ServerChart.prototype.getMultiAxisLabelText = function(opt_axisNumber) {
 if (opt_axisNumber !== undefined) {
   return this.multiAxisLabelText_[opt_axisNumber];
 }
 return this.multiAxisLabelText_;
};


/**
 * Sets the label positions for a given axis, overwriting any existing values.
 * The label positions are assumed to be floating-point numbers within the
 * range of the axis.
 *
 * @param {number} axisNumber The axis index, as returned by addMultiAxis.
 * @param {Array<number>} labelPosition The actual label positions to be added.
 */
ServerChart.prototype.setMultiAxisLabelPosition = function(
    axisNumber, labelPosition) {
 this.multiAxisLabelPosition_[axisNumber] = labelPosition;

 var positionString = this.computeMultiAxisDataString_(
     this.multiAxisLabelPosition_, ',', ',', '|');
 this.uri_.setParameterValue(
     ServerChart.UriParam.MULTI_AXIS_LABEL_POSITION, positionString);
};


/**
 * Returns the label positions for a given axis number, or all of them in a
 * two-dimensional array if the axis number is not given.
 *
 * @param {number=} opt_axisNumber The axis index, as returned by addMultiAxis.
 * @return {Object|Array<number>} The label positions for a given axis number,
 *     or all of them in a two-dimensional array if the axis number is not
 *     given.
 */
ServerChart.prototype.getMultiAxisLabelPosition = function(
    opt_axisNumber) {
 if (opt_axisNumber !== undefined) {
   return this.multiAxisLabelPosition_[opt_axisNumber];
 }
 return this.multiAxisLabelPosition_;
};


/**
 * Sets the label range for a given axis, overwriting any existing range.
 * The default range is from 0 to 100. If the start value is larger than the
 * end value, the axis direction is reversed.  rangeStart and rangeEnd must
 * be two different finite numbers.
 *
 * @param {number} axisNumber The axis index, as returned by addMultiAxis.
 * @param {number} rangeStart The new start of the range.
 * @param {number} rangeEnd The new end of the range.
 * @param {number=} opt_interval The interval between axis labels.
 */
ServerChart.prototype.setMultiAxisRange = function(
    axisNumber, rangeStart, rangeEnd, opt_interval) {
 asserts.assert(
     rangeStart != rangeEnd, 'Range start and end cannot be the same value.');
 asserts.assert(
     isFinite(rangeStart) && isFinite(rangeEnd),
     'Range start and end must be finite numbers.');
 this.multiAxisRange_[axisNumber] = [rangeStart, rangeEnd];
 if (opt_interval !== undefined) {
   this.multiAxisRange_[axisNumber].push(opt_interval);
 }
 var rangeString =
     this.computeMultiAxisDataString_(this.multiAxisRange_, ',', ',', '|');
 this.uri_.setParameterValue(
     ServerChart.UriParam.MULTI_AXIS_RANGE, rangeString);
};


/**
 * Returns the label range for a given axis number as a two-element array of
 * (range start, range end), or all of them in a two-dimensional array if the
 * axis number is not given.
 *
 * @param {number=} opt_axisNumber The axis index, as returned by addMultiAxis.
 * @return {Object|Array<number>} The label range for a given axis number as a
 *     two-element array of (range start, range end), or all of them in a
 *     two-dimensional array if the axis number is not given.
 */
ServerChart.prototype.getMultiAxisRange = function(opt_axisNumber) {
 if (opt_axisNumber !== undefined) {
   return this.multiAxisRange_[opt_axisNumber];
 }
 return this.multiAxisRange_;
};


/**
 * Sets the label style for a given axis, overwriting any existing style.
 * The default style is as follows: Default is x-axis labels are centered, left
 * hand y-axis labels are right aligned, right hand y-axis labels are left
 * aligned. The font size and alignment are optional parameters.
 *
 * NOTE: The color string should NOT have a '#' at the beginning of it.
 *
 * @param {number} axisNumber The axis index, as returned by addMultiAxis.
 * @param {string} color The hex value for this label's color.
 * @param {number=} opt_fontSize The label font size, in pixels.
 * @param {ServerChart.MultiAxisAlignment=} opt_alignment The label
 *     alignment.
 * @param {ServerChart.AxisDisplayType=} opt_axisDisplay The axis
 *     line and ticks.
 */
ServerChart.prototype.setMultiAxisLabelStyle = function(
    axisNumber, color, opt_fontSize, opt_alignment, opt_axisDisplay) {
 var style = [color];
 if (opt_fontSize !== undefined || opt_alignment !== undefined) {
   style.push(opt_fontSize || '');
 }
 if (opt_alignment !== undefined) {
   style.push(opt_alignment);
 }
 if (opt_axisDisplay) {
   style.push(opt_axisDisplay);
 }
 this.multiAxisLabelStyle_[axisNumber] = style;
 var styleString = this.computeMultiAxisDataString_(
     this.multiAxisLabelStyle_, ',', ',', '|');
 this.uri_.setParameterValue(
     ServerChart.UriParam.MULTI_AXIS_STYLE, styleString);
};


/**
 * Returns the label style for a given axis number as a one- to three-element
 * array, or all of them in a two-dimensional array if the axis number is not
 * given.
 *
 * @param {number=} opt_axisNumber The axis index, as returned by addMultiAxis.
 * @return {Object|Array<number>} The label style for a given axis number as a
 *     one- to three-element array, or all of them in a two-dimensional array if
 *     the axis number is not given.
 */
ServerChart.prototype.getMultiAxisLabelStyle = function(
    opt_axisNumber) {
 if (opt_axisNumber !== undefined) {
   return this.multiAxisLabelStyle_[opt_axisNumber];
 }
 return this.multiAxisLabelStyle_;
};


/**
 * Adds a data set.
 * NOTE: The color string should NOT have a '#' at the beginning of it.
 *
 * @param {Array<?number>} data An array of numbers (values can be
 *     NaN or null).
 * @param {string} color The hex value for this data set's color.
 * @param {string=} opt_legendText The legend text, if any, for this data
 *     series. NOTE: If specified, all previously added data sets must also
 *     have a legend text.
 */
ServerChart.prototype.addDataSet = function(
    data, color, opt_legendText) {
 var dataMin = this.arrayMin_(data);
 if (dataMin < this.minValue_) {
   this.minValue_ = dataMin;
 }

 var dataMax = this.arrayMax_(data);
 if (dataMax > this.maxValue_) {
   this.maxValue_ = dataMax;
 }

 if (opt_legendText !== undefined) {
   if (this.setLegendTexts_.length < this.dataSets_.length) {
     throw new Error('Cannot start adding legends text after first element.');
   }
   this.setLegendTexts_.push(opt_legendText);
   this.uri_.setParameterValue(
       ServerChart.UriParam.LEGEND_TEXTS,
       this.setLegendTexts_.join('|'));
 }

 this.dataSets_.push(data);
 this.setColors_.push(color);

 this.uri_.setParameterValue(
     ServerChart.UriParam.DATA_COLORS, this.setColors_.join(','));
};


/**
 * Clears the data sets from the graph. All data, including the colors and
 * legend text, is cleared.
 */
ServerChart.prototype.clearDataSets = function() {
 var queryData = this.uri_.getQueryData();
 queryData.remove(ServerChart.UriParam.LEGEND_TEXTS);
 queryData.remove(ServerChart.UriParam.DATA_COLORS);
 queryData.remove(ServerChart.UriParam.DATA);
 this.setLegendTexts_.length = 0;
 this.setColors_.length = 0;
 this.dataSets_.length = 0;
};


/**
 * Returns the given data set or all of them in a two-dimensional array if
 * the set number is not given.
 *
 * @param {number=} opt_setNumber Optional data set number to get.
 * @return {Array<?>} The given data set or all of them in a two-dimensional
 *     array if the set number is not given.
 */
ServerChart.prototype.getData = function(opt_setNumber) {
 if (opt_setNumber !== undefined) {
   return this.dataSets_[opt_setNumber];
 }
 return this.dataSets_;
};


/**
 * Computes the data string using the data in this.dataSets_ and sets
 * the object's URI accordingly. If the URI's length equals or exceeds the
 * limit, ServerChart.UriTooLongEvent is dispatched on the
 * ServerChart object.
 * @private
 */
ServerChart.prototype.computeDataString_ = function() {
 var ok;
 if (this.encodingType_ != ServerChart.EncodingType.AUTOMATIC) {
   ok = this.computeDataStringForEncoding_(this.encodingType_);
 } else {
   ok = this.computeDataStringForEncoding_(
       ServerChart.EncodingType.EXTENDED);
   if (!ok) {
     ok = this.computeDataStringForEncoding_(
         ServerChart.EncodingType.SIMPLE);
   }
 }
 if (!ok) {
   this.dispatchEvent(
       new ServerChart.UriTooLongEvent(this.uri_.toString()));
 }
};


/**
 * Computes the data string using the data in this.dataSets_ and the encoding
 * specified by the encoding parameter, which must not be AUTOMATIC, and sets
 * the object's URI accordingly.
 * @param {ServerChart.EncodingType} encoding The data encoding to use;
 *     must not be AUTOMATIC.
 * @return {boolean} False if the resulting URI is too long.
 * @private
 */
ServerChart.prototype.computeDataStringForEncoding_ = function(
    encoding) {
 var dataStrings = [];
 for (var i = 0, setLen = this.dataSets_.length; i < setLen; ++i) {
   dataStrings[i] = this.getChartServerValues_(
       this.dataSets_[i], this.minValue_, this.maxValue_, encoding);
 }
 var delimiter = encoding == ServerChart.EncodingType.TEXT ? '|' : ',';
 dataStrings = dataStrings.join(delimiter);
 var data;
 if (this.numVisibleDataSets_ == null) {
   data = encoding + ':' + dataStrings;
 } else {
   data = encoding + this.numVisibleDataSets_ + ':' + dataStrings;
 }
 this.uri_.setParameterValue(ServerChart.UriParam.DATA, data);
 return this.uri_.toString().length < this.uriLengthLimit_;
};


/**
 * Computes a multi-axis data string from the given data and separators. The
 * general data format for each index/element in the array will be
 * "<arrayIndex><indexSeparator><arrayElement.join(elementSeparator)>", with
 * axisSeparator used between multiple elements.
 * @param {Object} data The data to compute the data string for, as a
 *     sparse array of arrays. NOTE: The function uses the length of
 *     multiAxisType_ to determine the upper bound for the outer array.
 * @param {string} indexSeparator The separator string inserted between each
 *     index and the data itself, commonly a comma (,).
 * @param {string} elementSeparator The separator string inserted between each
 *     element inside each sub-array in the data, if there are more than one;
 *     commonly a comma (,).
 * @param {string} axisSeparator The separator string inserted between each
 *     axis specification, if there are more than one; usually a pipe sign (|).
 * @return {string} The multi-axis data string.
 * @private
 */
ServerChart.prototype.computeMultiAxisDataString_ = function(
    data, indexSeparator, elementSeparator, axisSeparator) {
 var elementStrings = [];
 for (var i = 0, setLen = this.multiAxisType_.length; i < setLen; ++i) {
   if (data[i]) {
     elementStrings.push(i + indexSeparator + data[i].join(elementSeparator));
   }
 }
 return elementStrings.join(axisSeparator);
};


/**
 * Array of possible ChartServer data values
 * @type {string}
 */
ServerChart.CHART_VALUES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz' +
    '0123456789';


/**
 * Array of extended ChartServer data values
 * @type {string}
 */
ServerChart.CHART_VALUES_EXTENDED =
    ServerChart.CHART_VALUES + '-.';


/**
 * Upper bound for extended values
 */
ServerChart.EXTENDED_UPPER_BOUND =
    Math.pow(ServerChart.CHART_VALUES_EXTENDED.length, 2) - 1;


/**
 * Converts a single number to an encoded data value suitable for ChartServer.
 * The TEXT encoding is the number in decimal; the SIMPLE encoding is a single
 * character, and the EXTENDED encoding is two characters.  See
 * https://developers.google.com/chart/image/docs/data_formats for the detailed
 * specification of these encoding formats.
 *
 * @private
 * @param {?number} value The value to convert (null for a missing data point).
 * @param {number} minValue The minimum value (used for normalization).
 * @param {number} maxValue The maximum value (used for normalization).
 * @param {ServerChart.EncodingType} encoding The data encoding to use;
 *     must not be AUTOMATIC.
 * @return {string} The encoded data value.
 */
ServerChart.prototype.getConvertedValue_ = function(
    value, minValue, maxValue, encoding) {
 asserts.assert(
     minValue <= maxValue,
     'minValue should be less than or equal to maxValue');
 var isExtended = (encoding == ServerChart.EncodingType.EXTENDED);

 if (value === null || value === undefined || isNaN(value) ||
     value < minValue || value > maxValue) {
   return isExtended ? '__' : '_';
 }

 if (encoding == ServerChart.EncodingType.TEXT) {
   return String(value);
 }

 var frac = ServerChart.DEFAULT_NORMALIZATION;
 if (maxValue > minValue) {
   frac = (value - minValue) / (maxValue - minValue);
   // Previous checks of value ensure that 0 <= frac <= 1 at this point.
 }

 if (isExtended) {
   var maxIndex = ServerChart.CHART_VALUES_EXTENDED.length;
   var upperBound = ServerChart.EXTENDED_UPPER_BOUND;
   var index1 = Math.floor(frac * upperBound / maxIndex);
   var index2 = Math.floor((frac * upperBound) % maxIndex);
   var extendedVals = ServerChart.CHART_VALUES_EXTENDED;
   return extendedVals.charAt(index1) + extendedVals.charAt(index2);
 }

 var index = Math.round(frac * (ServerChart.CHART_VALUES.length - 1));
 return ServerChart.CHART_VALUES.charAt(index);
};


/**
 * Creates the chd string for chartserver.
 *
 * @private
 * @param {Array<number>} values An array of numbers to graph.
 * @param {number} minValue The minimum value (used for normalization).
 * @param {number} maxValue The maximum value (used for normalization).
 * @param {ServerChart.EncodingType} encoding The data encoding to use;
 *     must not be AUTOMATIC.
 * @return {string} The chd string for chartserver.
 */
ServerChart.prototype.getChartServerValues_ = function(
    values, minValue, maxValue, encoding) {
 var s = [];
 for (var i = 0, valuesLen = values.length; i < valuesLen; ++i) {
   s.push(this.getConvertedValue_(values[i], minValue, maxValue, encoding));
 }
 return s.join(
     this.encodingType_ == ServerChart.EncodingType.TEXT ? ',' : '');
};


/**
 * Finds the minimum value in an array and returns it.
 * Needed because Math.min does not handle sparse arrays the way we want.
 *
 * @param {Array<number?>} ary An array of values.
 * @return {number} The minimum value.
 * @private
 */
ServerChart.prototype.arrayMin_ = function(ary) {
 var min = Infinity;
 for (var i = 0, aryLen = ary.length; i < aryLen; ++i) {
   var value = ary[i];
   if (value != null && value < min) {
     min = value;
   }
 }
 return min;
};


/**
 * Finds the maximum value in an array and returns it.
 * Needed because Math.max does not handle sparse arrays the way we want.
 *
 * @param {Array<number?>} ary An array of values.
 * @return {number} The maximum value.
 * @private
 */
ServerChart.prototype.arrayMax_ = function(ary) {
 var max = -Infinity;
 for (var i = 0, aryLen = ary.length; i < aryLen; ++i) {
   var value = ary[i];
   if (value != null && value > max) {
     max = value;
   }
 }
 return max;
};


/** @override */
ServerChart.prototype.disposeInternal = function() {
 ServerChart.superClass_.disposeInternal.call(this);
 delete this.xLabels_;
 delete this.leftLabels_;
 delete this.rightLabels_;
 delete this.gridX_;
 delete this.gridY_;
 delete this.setColors_;
 delete this.setLegendTexts_;
 delete this.dataSets_;
 this.uri_ = null;
 delete this.minValue_;
 delete this.maxValue_;
 this.title_ = null;
 delete this.multiAxisType_;
 delete this.multiAxisLabelText_;
 delete this.multiAxisLabelPosition_;
 delete this.multiAxisRange_;
 delete this.multiAxisLabelStyle_;
 this.legend_ = null;
};


/**
 * Event types dispatched by the ServerChart object
 * @enum {string}
 */
ServerChart.Event = {
  /**
   * Dispatched when the resulting URI reaches or exceeds the URI length limit.
   */
  URI_TOO_LONG: 'uritoolong'
};



/**
 * Class for the event dispatched on the ServerChart when the resulting URI
 * exceeds the URI length limit.
 * @constructor
 * @param {string} uri The overly-long URI string.
 * @extends {Event}
 * @final
 */
ServerChart.UriTooLongEvent = function(uri) {
 Event.call(this, ServerChart.Event.URI_TOO_LONG);

 /**
  * The overly-long URI string.
  * @type {string}
  */
 this.uri = uri;
};
goog.inherits(ServerChart.UriTooLongEvent, Event);
