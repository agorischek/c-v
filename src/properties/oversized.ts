/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { isOversized } from "../internal/isOversized";
import { split } from "../utilities/split";
import { version } from "./version";

export const oversized = (cv: string): boolean => {
  const [base, extension] = split(cv);
  const v = version(cv);
  return isOversized(base, extension, v);
};
