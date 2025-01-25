/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import {
  baseLengthV1,
  baseLengthV2,
  maxVectorLengthV1,
  maxVectorLengthV2,
} from '../constants/lengths';
import { versionIsV1 } from '../internal/versionIsV1';
import { versionIsV2 } from '../internal/versionIsV2';
import { type Version } from '../types/Version';

export const validate = (cv: string, version: Version): void => {
  let maxVectorLength: number;
  let baseLength: number;

  if (versionIsV1(version)) {
    maxVectorLength = maxVectorLengthV1;
    baseLength = baseLengthV1;
  } else if (versionIsV2(version)) {
    maxVectorLength = maxVectorLengthV2;
    baseLength = baseLengthV2;
  } else {
    throw new Error(`Unsupported correlation vector version: ${version}`);
  }

  if (!cv || cv.length > maxVectorLength) {
    throw new Error(
      `The ${version} correlation vector can not be null or bigger than ${maxVectorLength} characters`
    );
  }

  const parts: string[] = cv.split('.');

  if (parts.length < 2 || parts[0].length !== baseLength) {
    throw new Error(
      `Invalid correlation vector ${cv}. Invalid base value ${parts[0]}`
    );
  }

  for (let i: number = 1; i < parts.length; i++) {
    const result: number = parseInt(parts[i], 10);
    if (isNaN(result) || result < 0) {
      throw new Error(
        `Invalid correlation vector ${cv}. Invalid extension value ${parts[i]}`
      );
    }
  }
};
