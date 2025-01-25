/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { Version } from "./types/Version";
import { extend } from "./operations/extend";
import { seed } from "./utilities/seed";
import { defaultVersion } from "./constants/defaults";

export const cv = (version: Version = defaultVersion): string => {
  return extend(seed(version));
};
