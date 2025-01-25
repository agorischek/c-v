/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { base64CharSet, base64LastCharSet } from '../constants/characters';
import { defaultVersion } from '../constants/defaults';
import { baseLengthV1, baseLengthV2 } from '../constants/lengths';
import { type Version } from '../types/Version';

/**
 * Seed function to randomly generate a 16 character base64 encoded string for the Correlation Vector's base value
 * @returns {string} Returns generated base value
 */
export const seed = (version: Version = defaultVersion): string => {
  let result: string = '';
  const baseLength: number = version === 'v1' ? baseLengthV1 : baseLengthV2 - 1;
  for (let i: number = 0; i < baseLength; i++) {
    result += base64CharSet.charAt(
      Math.floor(Math.random() * base64CharSet.length)
    );
  }

  if (version === 'v2') {
    result += base64LastCharSet.charAt(
      Math.floor(Math.random() * base64LastCharSet.length)
    );
  }

  return result;
};
