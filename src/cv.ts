/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { defaultVersion } from './constants/defaults';
import { seed } from './internal/seed';
import { extend } from './operations/extend';
import { type Version } from './types/Version';

/**
 * Generates a string based on the provided version.
 *
 * @param {Version} [version=defaultVersion] - The version to use for generating the string.
 * @returns {string} The generated string.
 *
 * @example
 * // Using the default version
 * const result = cv();
 * console.log(result); // Output will depend on the implementation of `extend` and `seed`
 *
 * @example
 * // Using a custom version
 * const customVersion = { major: 1, minor: 0, patch: 0 };
 * const result = cv(customVersion);
 * console.log(result); // Output will depend on the implementation of `extend` and `seed`
 */
export const cv = (version: Version = defaultVersion): string => {
  return extend(seed(version));
};
