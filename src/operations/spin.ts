/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { overflow } from "../internal/overflow";
import { extend } from "./extend";
import { terminate } from "./terminate";
import { immutable } from "../properties/immutable";
import { version } from "../properties/version";
import type { SpinCounterInterval } from "../types/SpinCounterInterval";
import type { SpinCounterPeriodicity } from "../types/SpinCounterPeriodicity";
import type { SpinEntropy } from "../types/SpinEntropy";
import type { Version } from "../types/Version";
import type { SpinParameters } from "../types/SpinParameters";

const SpinCounterIntervalValues: Record<SpinCounterInterval, number> = {
  coarse: 24,
  fine: 16,
};

const SpinCounterPeriodicityValues: Record<SpinCounterPeriodicity, number> = {
  none: 0,
  short: 16,
  medium: 24,
};

const SpinEntropyValues: Record<SpinEntropy, number> = {
  none: 0,
  low: 8,
  high: 16,
};

const defaultParameters: SpinParameters = {
  interval: "coarse",
  periodicity: "short",
  entropy: "high",
};

export const spin = (
  correlationVector: string,
  parameters?: SpinParameters
): string => {
  if (immutable(correlationVector)) {
    return correlationVector;
  }
  const resolvedParameters: SpinParameters = {
    ...defaultParameters,
    ...parameters,
  };

  let v: Version = version(correlationVector);

  // JavaScript only returns ms, 1ms = 10000ticks
  let ticks: number = Date.now() * 10000;

  // JavaScript only supports 32-bit bitwise operation, we need to convert it to string
  let value: string = ticks.toString(2);
  value = value.substring(
    0,
    value.length - SpinCounterIntervalValues[resolvedParameters.interval]
  );

  if (SpinEntropyValues[resolvedParameters.entropy] > 0) {
    let entropy: string = Math.round(
      Math.random() *
        Math.pow(2, SpinEntropyValues[resolvedParameters.entropy] - 1)
    ).toString(2);
    while (entropy.length < SpinEntropyValues[resolvedParameters.entropy]) {
      entropy = "0" + entropy;
    }
    value = value + entropy;
  }

  // the max safe number for js is 52.
  const allowedBits: number = Math.min(
    52,
    SpinCounterPeriodicityValues[resolvedParameters.periodicity] +
      SpinEntropyValues[resolvedParameters.entropy]
  );
  if (value.length > allowedBits) {
    value = value.substring(value.length - allowedBits);
  }

  let s: number = parseInt(value, 2);

  let baseVector: string = `${correlationVector}.${s}`;
  if (overflow(baseVector, 0, v)) {
    return terminate(correlationVector);
  }

  return extend(baseVector);
};
