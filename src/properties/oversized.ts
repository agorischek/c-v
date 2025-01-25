/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { maxVectorLengthV1, maxVectorLengthV2 } from '../constants/lengths';
import { versionIsV1 } from '../internal/versionIsV1';
import { version } from './version';

export const oversized = (cv: string): boolean => {
  const v = version(cv);

  if (versionIsV1(v)) {
    return cv.length > maxVectorLengthV1;
  } else {
    return cv.length > maxVectorLengthV2;
  }
};
