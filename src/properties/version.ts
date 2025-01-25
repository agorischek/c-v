/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { separator } from '../constants/characters';
import { baseLengthV1, baseLengthV2 } from '../constants/lengths';
import { Version } from '../types/Version';

export const version = (cv: string): Version => {
  const index: number = cv == null ? -1 : cv.indexOf(separator);

  if (baseLengthV1 === index) {
    return Version.V1;
  } else if (baseLengthV2 === index) {
    return Version.V2;
  } else {
    return Version.V1;
  }
};
