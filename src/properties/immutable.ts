/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { terminator } from "../constants/characters";

export const immutable = (cv: string): boolean => {
  return cv !== undefined && cv.endsWith(terminator);
};
