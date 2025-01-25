import type { SpinCounterInterval } from '../types/SpinCounterInterval';

/**
 * The spin counter intervals
 */
export const spinCounterIntervals: Record<SpinCounterInterval, number> = {
  coarse: 24,
  fine: 16,
};
