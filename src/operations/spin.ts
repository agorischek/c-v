/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { Version } from "../types/Version";
import { extend } from "./extend";
import { version } from "../properties/version";
import { immutable } from "../properties/immutable";
import { terminate } from "./terminate";
import { SpinParameters } from "../types/SpinParameters";
import { isOversized } from "../internal/isOversized";
import { SpinCounterInterval } from "../types/SpinCounterInterval";
import { SpinCounterPeriodicity } from "../types/SpinCounterPeriodicity";
import { SpinEntropy } from "../types/SpinEntropy";

/**
 * Creates a new correlation vector by applying the Spin operator to an existing value.
 * This should be done at the entry point of an operation.
 * @param {string} cv taken from the message header indicated by {@link CorrelationVector#headerName}
 * @param {SpinParameters} parameters the parameters to use when applying the Spin operator.
 * @returns {CorrelationVector} A new correlation vector spined from the current vector.
 */
export const spin = (cv: string, parameters?: SpinParameters): string => {
  if (immutable(cv)) {
    return cv;
  }

  let v: Version = version(cv);

  parameters = parameters || {
    interval: SpinCounterInterval.Coarse,
    periodicity: SpinCounterPeriodicity.Short,
    entropy: SpinEntropy.High,
  };

  // javascript only returns ms, 1ms = 10000ticks
  let ticks: number = Date.now() * 10000;

  // javascript only supports 32-bit bitwise operation, we need to convert it to string
  let value: string = ticks.toString(2);
  value = value.substring(0, value.length - parameters.interval);

  if (parameters.entropy > 0) {
    const entropyPow: number = parameters.entropy * 8;
    let entropy: string = Math.round(
      Math.random() * Math.pow(2, entropyPow - 1)
    ).toString(2);
    while (entropy.length < entropyPow) {
      entropy = "0" + entropy;
    }
    value = value + entropy;
  }

  // the max safe number for js is 52.
  const allowedBits: number = Math.min(
    52,
    parameters.periodicity + parameters.entropy * 8
  );
  if (value.length > allowedBits) {
    value = value.substring(value.length - allowedBits);
  }

  let s: number = parseInt(value, 2);

  let base: string = `${cv}.${s}`;
  if (isOversized(base, 0, v)) {
    return terminate(base);
  }

  const vector = extend(base);
  return vector;
};
