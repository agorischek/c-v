/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { overflow } from '../internal/overflow';
import { split } from '../utilities/split';
import { version } from './version';

export const oversized = (cv: string): boolean => {
  const [base, extension] = split(cv);
  const v = version(cv);
  return overflow(base, extension, v);
};
