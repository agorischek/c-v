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
 * @param version The version to use for generating the string. Defaults to `'v2'`.
 * @returns The generated vector.
 *
 * @example
 * const vector = cv(); // defaults to 'v2'
 * // rnpW+xz0i3qLVgbTnj3Cpw.0
 *
 * @example
 * const vector = cv('v1');
 * // d3gwzrwhMeb4rilO.0
 */
export const cv = (version: Version = defaultVersion): string => {
  return extend(seed(version));
};
