/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { split } from "../utilities/split";

/**
 * Gets the extension from a correlation vector string.
 * @param {string} cv The correlation vector string.
 * @returns {number} The extension of the correlation vector.
 */
export const extension = (cv: string): number => {
  const [_, extension] = split(cv);
  return extension;
};
