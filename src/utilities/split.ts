/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { terminationSign } from "../constants/characters";

/**
 * Splits the correlation vector into base and extension.
 * @param {string} cv The correlation vector string.
 * @returns {[string, number]} An array containing the base and extension of the correlation vector.
 */
export const split = (cv: string): [base: string, extension: number] => {
  if (cv.endsWith(terminationSign)) {
    cv = cv.slice(0, -terminationSign.length);
  }

  const segments = cv.split(".");
  const extensionSegment = parseInt(segments.pop() || "0", 10);
  const base = segments.join(".");
  return [base, isNaN(extensionSegment) ? 0 : extensionSegment];
};
