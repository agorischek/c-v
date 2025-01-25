import { immutable } from "../properties/immutable";
import { SpinCounterInterval } from "../types/SpinCounterInterval";
import { SpinCounterPeriodicity } from "../types/SpinCounterPeriodicity";
import { SpinEntropy } from "../types/SpinEntropy";
import type { SpinParameters } from "../types/SpinParameters";
import type { Version } from "../types/Version";
import { version } from "../properties/version";
import { overflow } from "../internal/overflow";
import { terminate } from "./terminate";

export const spin2 = (
  correlationVector: string,
  parameters?: SpinParameters
): string => {
  if (immutable(correlationVector)) {
    return correlationVector;
  }

  let v: Version = version(correlationVector);

  const defaultParameters: SpinParameters = {
    interval: SpinCounterInterval.Coarse,
    periodicity: SpinCounterPeriodicity.Short,
    entropy: SpinEntropy.Two, // Match the original default
  };

  parameters = { ...defaultParameters, ...parameters };

  let ticks: number = Date.now() * 10000;

  let value: string = ticks.toString(2);
  value = value.substring(0, value.length - parameters.interval);

  if (parameters.entropy > 0) {
    const entropypow: number = parameters.entropy * 8;
    let entropy: string = Math.round(
      Math.random() * Math.pow(2, entropypow - 1)
    ).toString(2);
    while (entropy.length < entropypow) {
      entropy = "0" + entropy;
    }
    value = value + entropy;
  }

  const totalBits: number = parameters.periodicity + parameters.entropy * 8;

  const allowedBits: number = Math.min(52, totalBits);
  if (value.length > allowedBits) {
    value = value.substring(value.length - allowedBits);
  }

  let s: number = parseInt(value, 2);

  let baseVector: string = `${correlationVector}.${s}`;
  if (overflow(baseVector, 0, v)) {
    return terminate(correlationVector);
  }

  return baseVector;
};
