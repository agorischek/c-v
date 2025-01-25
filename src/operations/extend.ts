/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { extender, separator } from '../constants/characters';

/**
 * Extends the correlation vector by appending ".0".
 * @param {string} cv The current correlation vector string.
 * @returns {string} The extended correlation vector string.
 */
export const extend = (cv: string): string => {
  return `${cv}${separator}${extender}`;
};
