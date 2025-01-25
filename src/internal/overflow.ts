/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { maxVectorLengthV1 } from '../constants/lengths';
import { Version } from '../types/Version';

export const overflow = (
  baseVector: string,
  extension: number,
  version: Version
): boolean => {
  if (baseVector) {
    const size: number =
      baseVector.length +
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
