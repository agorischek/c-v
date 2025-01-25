/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import {
  defaultSpinEntropy,
  defaultSpinInterval,
  defaultSpinPeriodicity,
} from '../constants/defaults';
import { spinCounterIntervals } from '../constants/spinCounterIntervals';
import { spinCounterPeriodicities } from '../constants/spinCounterPeriodicities';
import { spinEntropies } from '../constants/spinEntropies';
import { overflow } from '../internal/overflow';
import { immutable } from '../properties/immutable';
import { version } from '../properties/version';
import type { SpinOptions } from '../types/SpinParameters';
import type { Version } from '../types/Version';
import { extend } from './extend';
import { terminate } from './terminate';

export const spin = (
  correlationVector: string,
  options?: SpinOptions
): string => {
  if (immutable(correlationVector)) {
    return correlationVector;
  }
  const params: SpinOptions = {
    interval: defaultSpinInterval,
    periodicity: defaultSpinPeriodicity,
    entropy: defaultSpinEntropy,
    ...options,
  };

  const v: Version = version(correlationVector);

  // JavaScript only returns ms, 1ms = 10000ticks
  const ticks: number = Date.now() * 10000;

  // JavaScript only supports 32-bit bitwise operation, we need to convert it to string
  let value: string = ticks.toString(2);
  value = value.substring(
    0,
    value.length - spinCounterIntervals[params.interval]
  );

  if (spinEntropies[params.entropy] > 0) {
    let entropy: string = Math.round(
      Math.random() * Math.pow(2, spinEntropies[params.entropy] - 1)
    ).toString(2);
    while (entropy.length < spinEntropies[params.entropy]) {
      entropy = '0' + entropy;
    }
    value = value + entropy;
  }

  // The max safe number for JavaScript is 52.
  const allowedBits: number = Math.min(
    52,
    spinCounterPeriodicities[params.periodicity] + spinEntropies[params.entropy]
  );
  if (value.length > allowedBits) {
    value = value.substring(value.length - allowedBits);
  }

  const s: number = parseInt(value, 2);

  const baseVector: string = `${correlationVector}.${s}`;
  if (overflow(baseVector, 0, v)) {
    return terminate(correlationVector);
  }

  return extend(baseVector);
};
