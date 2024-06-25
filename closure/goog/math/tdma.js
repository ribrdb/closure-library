/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The Tridiagonal matrix algorithm solver solves a special
 * version of a sparse linear system Ax = b where A is tridiagonal.
 *
 * See http://en.wikipedia.org/wiki/Tridiagonal_matrix_algorithm
 */

solve = function(
    subDiag, mainDiag, supDiag, vecRight, opt_result) {
 // Make a local copy of the main diagonal and the right vector.
 mainDiag = mainDiag.slice();
 vecRight = vecRight.slice();

 // The dimension of the matrix.
 const nDim = mainDiag.length;

 // Construct a modified linear system of equations with the same solution
 // as the input one.
 let i;
 for (i = 1; i < nDim; ++i) {
   const m = subDiag[i - 1] / mainDiag[i - 1];
   mainDiag[i] = mainDiag[i] - m * supDiag[i - 1];
   vecRight[i] = vecRight[i] - m * vecRight[i - 1];
 }

 // Solve the new system of equations by simple back-substitution.
 const result = opt_result || new Array(vecRight.length);
 result[nDim - 1] = vecRight[nDim - 1] / mainDiag[nDim - 1];
 for (i = nDim - 2; i >= 0; --i) {
   result[i] = (vecRight[i] - supDiag[i] * result[i + 1]) / mainDiag[i];
 }
 return result;
};
export var solve;
