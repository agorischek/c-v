import type { SpinCounterInterval } from './SpinCounterInterval';
import type { SpinCounterPeriodicity } from './SpinCounterPeriodicity';
import type { SpinEntropy } from './SpinEntropy';

export type SpinOptions = {
  interval: SpinCounterInterval;
  periodicity: SpinCounterPeriodicity;
  entropy: SpinEntropy;
};
