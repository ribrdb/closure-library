/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Factories for common path types.
 */


import { Coordinate } from './coordinate.js';

import { Path } from './path.js';


/**
 * Defines a regular n-gon by specifing the center, a vertex, and the total
 * number of vertices.
 * @param {Coordinate} center The center point.
 * @param {Coordinate} vertex The vertex, which implicitly defines
 *     a radius as well.
 * @param {number} n The number of vertices.
 * @return {!Path} The path.
 */
export function createRegularNGon(center, vertex, n) {
    var path = new Path();
    path.moveTo(vertex.x, vertex.y);

    var startAngle = Math.atan2(vertex.y - center.y, vertex.x - center.x);
    var radius = Coordinate.distance(center, vertex);
    for (var i = 1; i < n; i++) {
      var angle = startAngle + 2 * Math.PI * (i / n);
      path.lineTo(
          center.x + radius * Math.cos(angle),
          center.y + radius * Math.sin(angle));
    }
    path.close();
    return path;
}


/**
 * Defines an arrow.
 * @param {Coordinate} a Point A.
 * @param {Coordinate} b Point B.
 * @param {?number} aHead The size of the arrow head at point A.
 *     0 omits the head.
 * @param {?number} bHead The size of the arrow head at point B.
 *     0 omits the head.
 * @return {!Path} The path.
 */
export function createArrow(a, b, aHead, bHead) {
    var path = new Path();
    path.moveTo(a.x, a.y);
    path.lineTo(b.x, b.y);

    var angle = Math.atan2(b.y - a.y, b.x - a.x);
    if (aHead) {
      path.appendPath(
          createRegularNGon(
              new Coordinate(
                  a.x + aHead * Math.cos(angle), a.y + aHead * Math.sin(angle)),
              a, 3));
    }
    if (bHead) {
      path.appendPath(
          createRegularNGon(
              new Coordinate(
                  b.x + bHead * Math.cos(angle + Math.PI),
                  b.y + bHead * Math.sin(angle + Math.PI)),
              b, 3));
    }
    return path;
}
