/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { terminator } from '../constants/characters';

export const terminate = (cv: string): string => {
  if (cv.endsWith(terminator)) {
    return cv;
  }
  return cv + terminator;
};
