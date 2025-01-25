/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { separator, terminator } from "../constants/characters";

/**
 * Splits the correlation vector into base and extension.
 * @param {string} cv The correlation vector string.
 * @returns {[string, number]} An array containing the base and extension of the correlation vector.
 */
export const split = (cv: string): [string, number] => {
  if (cv.endsWith(terminator)) {
    cv = cv.slice(0, -terminator.length);
  }

  const segments = cv.split(separator);
  const extensionSegment = parseInt(segments.pop() || "0", 10);
  const base = segments.join(separator);
  return [base, isNaN(extensionSegment) ? 0 : extensionSegment];
};
