import { Version } from "../types/Version";
import { extend } from "./extend";
import { version } from "../properties/version";
import { immutable } from "../properties/immutable";
import { oversized } from "../properties/oversized";
import { terminate } from "./terminate";
import { SpinCounterInterval } from "../types/SpinCounterInterval";
import { SpinCounterPeriodicity } from "../types/SpinCounterPeriodicity";
import { SpinEntropy } from "../types/SpinEntropy";
import { SpinParameters } from "../types/SpinParameters";

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
    entropy: SpinEntropy.Two,
  };

  // javascript only returns ms, 1ms = 10000ticks
  let ticks: number = Date.now() * 10000;

  // javascript only supports 32-bit bitwise operation, we need to convert it to string
  let value: string = ticks.toString(2);
  value = value.substring(0, value.length - getTicksBitsToDrop(parameters));

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
  const allowedBits: number = Math.min(52, getTotalBits(parameters));
  if (value.length > allowedBits) {
    value = value.substring(value.length - allowedBits);
  }

  let s: number = parseInt(value, 2);

  let baseVector: string = `${cv}.${s}`;
  if (oversized(baseVector, 0, v)) {
    return terminate(baseVector);
  }

  const vector = extend(baseVector);
  return vector;
};

function getTicksBitsToDrop(params: SpinParameters): number {
  switch (params.interval) {
    case SpinCounterInterval.Coarse:
      return 24;
    case SpinCounterInterval.Fine:
      return 16;
    default:
      return 24;
  }
}

function getTotalBits(params: SpinParameters): number {
  let counterBits: number = 0;
  switch (params.periodicity) {
    case SpinCounterPeriodicity.None:
      counterBits = 0;
      break;
    case SpinCounterPeriodicity.Short:
      counterBits = 16;
      break;
    case SpinCounterPeriodicity.Medium:
      counterBits = 24;
      break;
    default:
      counterBits = 0;
      break;
  }
  return counterBits + params.entropy * 8;
}
