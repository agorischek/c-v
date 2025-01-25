/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { split } from "./split";

/**
 * Gets the base part of the correlation vector.
 * @param {string} cv The correlation vector string.
 * @returns {string} The base part of the correlation vector.
 */
export const base = (cv: string): string => {
  const [base] = split(cv);
  return base;
};
