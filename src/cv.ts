/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { defaultVersion } from './constants/defaults';
import { extend } from './operations/extend';
import { Version } from './types/Version';
import { seed } from './utilities/seed';

export const cv = (version: Version = defaultVersion): string => {
  return extend(seed(version));
};
