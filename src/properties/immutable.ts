/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { terminationSign } from "../constants/defaults";

export const immutable = (cv: string): boolean => {
  return cv && cv.endsWith(terminationSign);
};
