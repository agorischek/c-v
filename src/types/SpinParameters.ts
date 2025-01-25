/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import { SpinCounterInterval } from "./SpinCounterInterval";
import { SpinCounterPeriodicity } from "./SpinCounterPeriodicity";
import { SpinEntropy } from "./SpinEntropy";

/**
 * This interface stores parameters used by the CorrelationVector Spin operator.
 */
export type SpinParameters = {
  interval: SpinCounterInterval;
  periodicity: SpinCounterPeriodicity;
  entropy: SpinEntropy;
};
