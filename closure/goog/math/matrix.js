/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class for representing matrices and static helper functions.
 */

import * as array from '../array/array.js';

import * as asserts from '../asserts/asserts.js';
import * as math from './math.js';
import { Size } from './size.js';
import * as googString from '../string/string.js';



/**
 * Class for representing and manipulating matrices.
 *
 * The entry that lies in the i-th row and the j-th column of a matrix is
 * typically referred to as the i,j entry of the matrix.
 *
 * The m-by-n matrix A would have its entries referred to as:
 *   [ a0,0   a0,1   a0,2   ...   a0,j  ...  a0,n ]
 *   [ a1,0   a1,1   a1,2   ...   a1,j  ...  a1,n ]
 *   [ a2,0   a2,1   a2,2   ...   a2,j  ...  a2,n ]
 *   [  .      .      .            .          .   ]
 *   [  .      .      .            .          .   ]
 *   [  .      .      .            .          .   ]
 *   [ ai,0   ai,1   ai,2   ...   ai,j  ...  ai,n ]
 *   [  .      .      .            .          .   ]
 *   [  .      .      .            .          .   ]
 *   [  .      .      .            .          .   ]
 *   [ am,0   am,1   am,2   ...   am,j  ...  am,n ]
 *
 * @param {!Matrix|!Array<!Array<number>>|!Size|number} m
 *     A matrix to copy, a 2D-array to take as a template, a size object for
 *     dimensions, or the number of rows.
 * @param {number=} opt_n Number of columns of the matrix (only applicable if
 *     the first argument is also numeric).
 * @struct
 * @constructor
 * @final
 */
export function Matrix(m, opt_n) {
  if (m instanceof Matrix) {
    this.array_ = m.toArray();
  } else if (
      goog.isArrayLike(m) &&
      Matrix.isValidArray(
          /** @type {!Array<!Array<number>>} */ (m))) {
    this.array_ = array.clone(/** @type {!Array<!Array<number>>} */ (m));
  } else if (m instanceof Size) {
    this.array_ = Matrix.createZeroPaddedArray_(m.height, m.width);
  } else if (
      typeof m === 'number' && typeof opt_n === 'number' && m > 0 &&
      opt_n > 0) {
    this.array_ = Matrix.createZeroPaddedArray_(
        /** @type {number} */ (m), opt_n);
  } else {
    throw new Error('Invalid argument(s) for Matrix contructor');
  }

  this.size_ = new Size(this.array_[0].length, this.array_.length);
}


/**
 * Creates a square identity matrix. i.e. for n = 3:
 * <pre>
 * [ 1 0 0 ]
 * [ 0 1 0 ]
 * [ 0 0 1 ]
 * </pre>
 * @param {number} n The size of the square identity matrix.
 * @return {!Matrix} Identity matrix of width and height `n`.
 */
Matrix.createIdentityMatrix = function(n) {
  var rv = [];
  for (var i = 0; i < n; i++) {
    rv[i] = [];
    for (var j = 0; j < n; j++) {
      rv[i][j] = i == j ? 1 : 0;
    }
  }
  return new Matrix(rv);
};


/**
 * Calls a function for each cell in a matrix.
 * @param {Matrix} matrix The matrix to iterate over.
 * @param {function(this:T, number, number, number, !Matrix)} fn
 *     The function to call for every element. This function
 *     takes 4 arguments (value, i, j, and the matrix)
 *     and the return value is irrelevant.
 * @param {T=} opt_obj The object to be used as the value of 'this'
 *     within `fn`.
 * @template T
 */
Matrix.forEach = function(matrix, fn, opt_obj) {
  for (var i = 0; i < matrix.getSize().height; i++) {
    for (var j = 0; j < matrix.getSize().width; j++) {
      fn.call(opt_obj, matrix.array_[i][j], i, j, matrix);
    }
  }
};


/**
 * Tests whether an array is a valid matrix.  A valid array is an array of
 * arrays where all arrays are of the same length and all elements are numbers.
 * @param {!Array<!Array<number>>} arr An array to test.
 * @return {boolean} Whether the array is a valid matrix.
 */
Matrix.isValidArray = function(arr) {
  var len = 0;
  for (var i = 0; i < arr.length; i++) {
    if (!goog.isArrayLike(arr[i]) || len > 0 && arr[i].length != len) {
      return false;
    }
    for (var j = 0; j < arr[i].length; j++) {
      if (typeof arr[i][j] !== 'number') {
        return false;
      }
    }
    if (len == 0) {
      len = arr[i].length;
    }
  }
  return len != 0;
};


/**
 * Calls a function for every cell in a matrix and inserts the result into a
 * new matrix of equal dimensions.
 * @param {!Matrix} matrix The matrix to iterate over.
 * @param {function(this:T, number, number, number, !Matrix): number}
 *     fn The function to call for every element. This function
 *     takes 4 arguments (value, i, j and the matrix)
 *     and should return a number, which will be inserted into a new matrix.
 * @param {T=} opt_obj The object to be used as the value of 'this'
 *     within `fn`.
 * @return {!Matrix} A new matrix with the results from `fn`.
 * @template T
 */
Matrix.map = function(matrix, fn, opt_obj) {
  var m = new Matrix(matrix.getSize());
  Matrix.forEach(matrix, function(value, i, j) {
    m.array_[i][j] = fn.call(opt_obj, value, i, j, matrix);
  });
  return m;
};


/**
 * Creates a new zero padded matix.
 * @param {number} m Height of matrix.
 * @param {number} n Width of matrix.
 * @return {!Array<!Array<number>>} The new zero padded matrix.
 * @private
 */
Matrix.createZeroPaddedArray_ = function(m, n) {
  var rv = [];
  for (var i = 0; i < m; i++) {
    rv[i] = [];
    for (var j = 0; j < n; j++) {
      rv[i][j] = 0;
    }
  }
  return rv;
};


/**
 * Internal array representing the matrix.
 * @type {!Array<!Array<number>>}
 * @private
 */
Matrix.prototype.array_;


/**
 * After construction the Matrix's size is constant and stored in this object.
 * @type {!Size}
 * @private
 */
Matrix.prototype.size_;


/**
 * Returns a new matrix that is the sum of this and the provided matrix.
 * @param {Matrix} m The matrix to add to this one.
 * @return {!Matrix} Resultant sum.
 */
Matrix.prototype.add = function(m) {
  if (!Size.equals(this.size_, m.getSize())) {
    throw new Error(
        'Matrix summation is only supported on arrays of equal size');
  }
  return Matrix.map(this, function(val, i, j) {
    return val + m.array_[i][j];
  });
};


/**
 * Appends the given matrix to the right side of this matrix.
 * @param {Matrix} m The matrix to augment this matrix with.
 * @return {!Matrix} A new matrix with additional columns on the
 *     right.
 */
Matrix.prototype.appendColumns = function(m) {
  if (this.size_.height != m.getSize().height) {
    throw new Error(
        'The given matrix has height ' + m.size_.height + ', but ' +
        ' needs to have height ' + this.size_.height + '.');
  }
  var result =
      new Matrix(this.size_.height, this.size_.width + m.size_.width);
  Matrix.forEach(this, function(value, i, j) {
    result.array_[i][j] = value;
  });
  Matrix.forEach(m, function(value, i, j) {
    result.array_[i][this.size_.width + j] = value;
  }, this);
  return result;
};


/**
 * Appends the given matrix to the bottom of this matrix.
 * @param {Matrix} m The matrix to augment this matrix with.
 * @return {!Matrix} A new matrix with added columns on the bottom.
 */
Matrix.prototype.appendRows = function(m) {
  if (this.size_.width != m.getSize().width) {
    throw new Error(
        'The given matrix has width ' + m.size_.width + ', but ' +
        ' needs to have width ' + this.size_.width + '.');
  }
  var result = new Matrix(
      this.size_.height + m.size_.height, this.size_.width);
  Matrix.forEach(this, function(value, i, j) {
    result.array_[i][j] = value;
  });
  Matrix.forEach(m, function(value, i, j) {
    result.array_[this.size_.height + i][j] = value;
  }, this);
  return result;
};


/**
 * Returns whether the given matrix equals this matrix.
 * @param {Matrix} m The matrix to compare to this one.
 * @param {number=} opt_tolerance The tolerance when comparing array entries.
 * @return {boolean} Whether the given matrix equals this matrix.
 */
Matrix.prototype.equals = function(m, opt_tolerance) {
  if (this.size_.width != m.size_.width) {
    return false;
  }
  if (this.size_.height != m.size_.height) {
    return false;
  }

  var tolerance = opt_tolerance || 0;
  for (var i = 0; i < this.size_.height; i++) {
    for (var j = 0; j < this.size_.width; j++) {
      if (!math.nearlyEquals(
              this.array_[i][j], m.array_[i][j], tolerance)) {
        return false;
      }
    }
  }

  return true;
};


/**
 * Returns the determinant of this matrix.  The determinant of a matrix A is
 * often denoted as |A| and can only be applied to a square matrix.
 * @return {number} The determinant of this matrix.
 */
Matrix.prototype.getDeterminant = function() {
  if (!this.isSquare()) {
    throw new Error('A determinant can only be take on a square matrix');
  }

  return this.getDeterminant_();
};


/**
 * Returns the inverse of this matrix if it exists or null if the matrix is
 * not invertible.
 * @return {Matrix} A new matrix which is the inverse of this matrix.
 */
Matrix.prototype.getInverse = function() {
  if (!this.isSquare()) {
    throw new Error('An inverse can only be taken on a square matrix.');
  }
  if (this.getSize().width == 1) {
    var a = this.getValueAt(0, 0);
    return a == 0 ? null : new Matrix([[1 / Number(a)]]);
  }
  var identity = Matrix.createIdentityMatrix(this.size_.height);
  var mi = this.appendColumns(identity).getReducedRowEchelonForm();
  var i = mi.getSubmatrixByCoordinates_(
      0, 0, identity.size_.width - 1, identity.size_.height - 1);
  if (!i.equals(identity)) {
    return null;  // This matrix was not invertible
  }
  return mi.getSubmatrixByCoordinates_(0, identity.size_.width);
};


/**
 * Transforms this matrix into reduced row echelon form.
 * @return {!Matrix} A new matrix reduced row echelon form.
 */
Matrix.prototype.getReducedRowEchelonForm = function() {
  var result = new Matrix(this);
  var col = 0;
  // Each iteration puts one row in reduced row echelon form
  for (var row = 0; row < result.size_.height; row++) {
    if (col >= result.size_.width) {
      return result;
    }

    // Scan each column starting from this row on down for a non-zero value
    var i = row;
    while (result.array_[i][col] == 0) {
      i++;
      if (i == result.size_.height) {
        i = row;
        col++;
        if (col == result.size_.width) {
          return result;
        }
      }
    }

    // Make the row we found the current row with a leading 1
    this.swapRows_(i, row);
    var divisor = result.array_[row][col];
    for (var j = col; j < result.size_.width; j++) {
      result.array_[row][j] = result.array_[row][j] / divisor;
    }

    // Subtract a multiple of this row from each other row
    // so that all the other entries in this column are 0
    for (i = 0; i < result.size_.height; i++) {
      if (i != row) {
        var multiple = result.array_[i][col];
        for (var j = col; j < result.size_.width; j++) {
          result.array_[i][j] -= multiple * result.array_[row][j];
        }
      }
    }

    // Move on to the next column
    col++;
  }
  return result;
};


/**
 * @return {!Size} The dimensions of the matrix.
 */
Matrix.prototype.getSize = function() {
  return this.size_;
};


/**
 * Return the transpose of this matrix.  For an m-by-n matrix, the transpose
 * is the n-by-m matrix which results from turning rows into columns and columns
 * into rows
 * @return {!Matrix} A new matrix A^T.
 */
Matrix.prototype.getTranspose = function() {
  var m = new Matrix(this.size_.width, this.size_.height);
  Matrix.forEach(this, function(value, i, j) {
    m.array_[j][i] = value;
  });
  return m;
};


/**
 * Retrieves the value of a particular coordinate in the matrix or null if the
 * requested coordinates are out of range.
 * @param {number} i The i index of the coordinate.
 * @param {number} j The j index of the coordinate.
 * @return {?number} The value at the specified coordinate.
 */
Matrix.prototype.getValueAt = function(i, j) {
  if (!this.isInBounds_(i, j)) {
    return null;
  }
  return this.array_[i][j];
};


/**
 * @return {boolean} Whether the horizontal and vertical dimensions of this
 *     matrix are the same.
 */
Matrix.prototype.isSquare = function() {
  return this.size_.width == this.size_.height;
};


/**
 * Sets the value at a particular coordinate (if the coordinate is within the
 * bounds of the matrix).
 * @param {number} i The i index of the coordinate.
 * @param {number} j The j index of the coordinate.
 * @param {number} value The new value for the coordinate.
 */
Matrix.prototype.setValueAt = function(i, j, value) {
  if (!this.isInBounds_(i, j)) {
    throw new Error(
        'Index out of bounds when setting matrix value, (' + i + ',' + j +
        ') in size (' + this.size_.height + ',' + this.size_.width + ')');
  }
  this.array_[i][j] = value;
};


/**
 * Performs matrix or scalar multiplication on a matrix and returns the
 * resultant matrix.
 *
 * Matrix multiplication is defined between two matrices only if the number of
 * columns of the first matrix is the same as the number of rows of the second
 * matrix. If A is an m-by-n matrix and B is an n-by-p matrix, then their
 * product AB is an m-by-p matrix
 *
 * Scalar multiplication returns a matrix of the same size as the original,
 * each value multiplied by the given value.
 *
 * @param {Matrix|number} m Matrix/number to multiply the matrix by.
 * @return {!Matrix} Resultant product.
 */
Matrix.prototype.multiply = function(m) {
  if (m instanceof Matrix) {
    if (this.size_.width != m.getSize().height) {
      throw new Error(
          'Invalid matrices for multiplication. Second matrix ' +
          'should have the same number of rows as the first has columns.');
    }
    return this.matrixMultiply_(/** @type {!Matrix} */ (m));
  } else if (typeof m === 'number') {
    return this.scalarMultiply_(/** @type {number} */ (m));
  } else {
    throw new Error(
        'A matrix can only be multiplied by' +
        ' a number or another matrix.');
  }
};


/**
 * Returns a new matrix that is the difference of this and the provided matrix.
 * @param {Matrix} m The matrix to subtract from this one.
 * @return {!Matrix} Resultant difference.
 */
Matrix.prototype.subtract = function(m) {
  if (!Size.equals(this.size_, m.getSize())) {
    throw new Error(
        'Matrix subtraction is only supported on arrays of equal size.');
  }
  return Matrix.map(this, function(val, i, j) {
    return val - m.array_[i][j];
  });
};


/**
 * @return {!Array<!Array<number>>} A 2D internal array representing this
 *     matrix.  Not a clone.
 */
Matrix.prototype.toArray = function() {
  return this.array_;
};


if (goog.DEBUG) {
  /**
   * Returns a string representation of the matrix.  e.g.
   * <pre>
   * [ 12  5  9  1 ]
   * [  4 16  0 17 ]
   * [ 12  5  1 23 ]
   * </pre>
   *
   * @return {string} A string representation of this matrix.
   * @override
   */
  Matrix.prototype.toString = function() {
    // Calculate correct padding for optimum display of matrix
    var maxLen = 0;
    Matrix.forEach(this, function(val) {
      var len = String(val).length;
      if (len > maxLen) {
        maxLen = len;
      }
    });

    // Build the string
    var sb = [];
    array.forEach(this.array_, function(row, x) {
      sb.push('[ ');
      row.forEach(function(val, y) {
        var strval = String(val);
        sb.push(googString.repeat(' ', maxLen - strval.length) + strval + ' ');
      });
      sb.push(']\n');
    });

    return sb.join('');
  };
}


/**
 * Returns the signed minor.
 * @param {number} i The row index.
 * @param {number} j The column index.
 * @return {number} The cofactor C[i,j] of this matrix.
 * @private
 */
Matrix.prototype.getCofactor_ = function(i, j) {
  return (i + j % 2 == 0 ? 1 : -1) * this.getMinor_(i, j);
};


/**
 * Returns the determinant of this matrix.  The determinant of a matrix A is
 * often denoted as |A| and can only be applied to a square matrix.  Same as
 * public method but without validation.  Implemented using Laplace's formula.
 * @return {number} The determinant of this matrix.
 * @private
 */
Matrix.prototype.getDeterminant_ = function() {
  if (this.getSize().area() == 1) {
    return this.array_[0][0];
  }

  // We might want to use matrix decomposition to improve running time
  // For now we'll do a Laplace expansion along the first row
  var determinant = 0;
  for (var j = 0; j < this.size_.width; j++) {
    determinant += (this.array_[0][j] * this.getCofactor_(0, j));
  }
  return determinant;
};


/**
 * Returns the determinant of the submatrix resulting from the deletion of row i
 * and column j.
 * @param {number} i The row to delete.
 * @param {number} j The column to delete.
 * @return {number} The first minor M[i,j] of this matrix.
 * @private
 */
Matrix.prototype.getMinor_ = function(i, j) {
  return this.getSubmatrixByDeletion_(i, j).getDeterminant_();
};


/**
 * Returns a submatrix contained within this matrix.
 * @param {number} i1 The upper row index.
 * @param {number} j1 The left column index.
 * @param {number=} opt_i2 The lower row index.
 * @param {number=} opt_j2 The right column index.
 * @return {!Matrix} The submatrix contained within the given bounds.
 * @private
 */
Matrix.prototype.getSubmatrixByCoordinates_ = function(
    i1, j1, opt_i2, opt_j2) {
  var i2 = opt_i2 ? opt_i2 : this.size_.height - 1;
  var j2 = opt_j2 ? opt_j2 : this.size_.width - 1;
  var result = new Matrix(i2 - i1 + 1, j2 - j1 + 1);
  Matrix.forEach(result, function(value, i, j) {
    result.array_[i][j] = this.array_[i1 + i][j1 + j];
  }, this);
  return result;
};


/**
 * Returns a new matrix equal to this one, but with row i and column j deleted.
 * @param {number} i The row index of the coordinate.
 * @param {number} j The column index of the coordinate.
 * @return {!Matrix} The value at the specified coordinate.
 * @private
 */
Matrix.prototype.getSubmatrixByDeletion_ = function(i, j) {
  var m = new Matrix(this.size_.width - 1, this.size_.height - 1);
  Matrix.forEach(m, function(value, x, y) {
    m.setValueAt(x, y, this.array_[x >= i ? x + 1 : x][y >= j ? y + 1 : y]);
  }, this);
  return m;
};


/**
 * Returns whether the given coordinates are contained within the bounds of the
 * matrix.
 * @param {number} i The i index of the coordinate.
 * @param {number} j The j index of the coordinate.
 * @return {boolean} The value at the specified coordinate.
 * @private
 */
Matrix.prototype.isInBounds_ = function(i, j) {
  return i >= 0 && i < this.size_.height && j >= 0 && j < this.size_.width;
};


/**
 * Matrix multiplication is defined between two matrices only if the number of
 * columns of the first matrix is the same as the number of rows of the second
 * matrix. If A is an m-by-n matrix and B is an n-by-p matrix, then their
 * product AB is an m-by-p matrix
 *
 * @param {Matrix} m Matrix to multiply the matrix by.
 * @return {!Matrix} Resultant product.
 * @private
 */
Matrix.prototype.matrixMultiply_ = function(m) {
  var resultMatrix = new Matrix(this.size_.height, m.getSize().width);
  Matrix.forEach(resultMatrix, function(val, x, y) {
    var newVal = 0;
    for (var i = 0; i < this.size_.width; i++) {
      newVal += asserts.assertNumber(this.getValueAt(x, i)) *
          asserts.assertNumber(m.getValueAt(i, y));
    }
    resultMatrix.setValueAt(x, y, newVal);
  }, this);
  return resultMatrix;
};


/**
 * Scalar multiplication returns a matrix of the same size as the original,
 * each value multiplied by the given value.
 *
 * @param {number} m number to multiply the matrix by.
 * @return {!Matrix} Resultant product.
 * @private
 */
Matrix.prototype.scalarMultiply_ = function(m) {
  return Matrix.map(this, function(val, x, y) {
    return val * m;
  });
};


/**
 * Swaps two rows.
 * @param {number} i1 The index of the first row to swap.
 * @param {number} i2 The index of the second row to swap.
 * @private
 */
Matrix.prototype.swapRows_ = function(i1, i2) {
  var tmp = this.array_[i1];
  this.array_[i1] = this.array_[i2];
  this.array_[i2] = tmp;
};
