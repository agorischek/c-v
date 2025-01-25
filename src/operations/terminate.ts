/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { terminator } from '../constants/characters';

export const terminate = (cv: string): string => {
  return cv + terminator;
};
