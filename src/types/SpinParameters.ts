import {
  SpinCounterInterval,
  SpinCounterPeriodicity,
  SpinEntropy,
} from "../spinParameters";

/**
 * This interface stores parameters used by the CorrelationVector Spin operator.
 */
export type SpinParameters = {
  interval: SpinCounterInterval;
  periodicity: SpinCounterPeriodicity;
  entropy: SpinEntropy;
};
