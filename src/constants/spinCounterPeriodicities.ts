import type { SpinCounterPeriodicity } from '../types/SpinCounterPeriodicity';

/**
 * The spin counter periodicities
 */
export const spinCounterPeriodicities: Record<SpinCounterPeriodicity, number> =
  {
    none: 0,
    short: 16,
    medium: 24,
  };
