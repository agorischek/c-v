import type { SpinCounterPeriodicity, SpinEntropy } from '..';
import type { SpinCounterInterval } from '../types/SpinCounterInterval';
import type { Version } from '../types/Version';

/**
 * The default version used in the application.
 */
export const defaultVersion: Version = 'v2';

/**
 * The default interval for the spin counter.
 */
export const defaultSpinInterval: SpinCounterInterval = 'coarse';

/**
 * The default periodicity for the spin counter.
 */
export const defaultSpinPeriodicity: SpinCounterPeriodicity = 'short';

/**
 * The default entropy level for the spin counter.
 */
export const defaultSpinEntropy: SpinEntropy = 'high';
