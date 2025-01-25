/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { maxVectorLengthV1 } from '../constants/lengths';
import { type Version } from '../types/Version';

/**
 * Checks if the base vector with the given extension overflows the maximum vector length for the specified version
 * @param base - The base vector string
 * @param extension - The extension number
 * @param version - The version of the vector
 * @returns True if the vector overflows, false otherwise
 */
export const overflow = (
  base: string,
  extension: number,
  version: Version
): boolean => {
  if (base) {
    const size: number =
      base.length +
      1 +
      (extension > 0 ? Math.floor(Math.log10(extension)) : 0) +
      1;
    return (
      (version === 'v1' && size > maxVectorLengthV1) ||
      (version === 'v2' && size > maxVectorLengthV1)
    );
  }
  return false;
};
