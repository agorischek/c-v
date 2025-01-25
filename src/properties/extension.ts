/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { split } from '../helpers/split';

/**
 * Gets the last extension from a correlation vector string.
 * @param {string} cv The correlation vector string.
 * @returns {number} The last extension of the correlation vector.
 * @throws {Error} If the last extension is not a number.
 */
export const extension = (cv: string): number => {
  const segments = split(cv);
  const last = segments[segments.length - 1];

  if (typeof last !== 'number') {
    throw new Error('Invalid correlation vector: last segment is not a number');
  }

  return last;
};
