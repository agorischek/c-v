/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { defaultVersion } from '../constants/defaults';
import { cv } from '../cv';
import { type Version } from '../types/Version';

/**
 * Generates a string based on the provided version.
 * @remarks Alias of `cv`.
 *
 * @param - The version to use for generating the string. Defaults to V2.
 * @returns The generated vector.
 *
 * @example
 * const vector = cv(); // defaults to V2
 * // rnpW+xz0i3qLVgbTnj3Cpw.0
 *
 * @example
 * const vector = cv('v1');
 * // d3gwzrwhMeb4rilO.0
 */
export const create = (version: Version = defaultVersion): string => {
  return cv(version);
};
