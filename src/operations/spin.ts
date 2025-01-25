import { Version } from "../types/Version";
import { extend } from "./extend";
import { version } from "../properties/version";
import { immutable } from "../properties/immutable";
import { terminate } from "./terminate";
import { type SpinParameters } from "../types/SpinParameters";
import { overflow } from "../internal/overflow";
import { SpinCounterInterval } from "../types/SpinCounterInterval";
import { SpinCounterPeriodicity } from "../types/SpinCounterPeriodicity";
import { SpinEntropy } from "../types/SpinEntropy";

export const spin = (cv: string, parameters?: SpinParameters): string => {
  if (immutable(cv)) {
    return cv;
  }

  let v: Version = version(cv);

  parameters = parameters || {
    interval: SpinCounterInterval.Coarse,
    periodicity: SpinCounterPeriodicity.Short,
    entropy: SpinEntropy.Low,
  };

  let ticks: number = Date.now() * 10000;
  let value: string = ticks.toString(2);
  value = value.substring(0, value.length - parameters.interval);

  if (parameters.entropy > 0) {
    const entropyPow: number = parameters.entropy;
    let entropy: string = Math.round(
      Math.random() * Math.pow(2, entropyPow) - 1
    ).toString(2);
    while (entropy.length < entropyPow) {
      entropy = "0" + entropy;
    }
    value = value + entropy;
  }

  const allowedBits: number = Math.min(
    52,
    parameters.periodicity + parameters.entropy
  );
  if (value.length > allowedBits) {
    value = value.substring(value.length - allowedBits);
  }

  let s: number = parseInt(value, 2);
  let base: string = `${cv}.${s}`;
  if (overflow(base, 0, v)) {
    return terminate(base);
  }

  return extend(base);
};
