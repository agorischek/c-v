/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { separator, terminator } from '../constants/characters';

/**
 * Splits the correlation vector into base and extensions.
 * @param {string} cv The correlation vector string.
 * @returns {[string, ...number[]]} An array containing the base and extensions of the correlation vector.
 * @throws {Error} If any extension is missing or not a number.
 */
export const split = (cv: string): [string, ...number[]] => {
  if (cv.endsWith(terminator)) {
    cv = cv.slice(0, -terminator.length);
  }

  const segments = cv.split(separator);
  const base = segments.shift();

  if (base === undefined || base === '') {
    throw new Error('Invalid correlation vector: missing base');
  }

  const extensions = segments.map((segment) => {
    const extension = parseInt(segment, 10);
    if (isNaN(extension)) {
      throw new Error('Invalid correlation vector: non-numeric extension');
    }
    return extension;
  });

  return [base, ...extensions];
};
