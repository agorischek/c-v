import type { SpinCounterInterval } from "./SpinCounterInterval";
import type { SpinCounterPeriodicity } from "./SpinCounterPeriodicity";
import type { SpinEntropy } from "./SpinEntropy";

export type SpinParameters = {
  interval: SpinCounterInterval;
  periodicity: SpinCounterPeriodicity;
  entropy: SpinEntropy;
};
