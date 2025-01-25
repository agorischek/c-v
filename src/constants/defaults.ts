import type { SpinCounterPeriodicity, SpinEntropy } from "..";
import type { SpinCounterInterval } from "../types/SpinCounterInterval";
import { Version } from "../types/Version";

export const defaultVersion: Version = Version.V2;

export const defaultSpinInterval: SpinCounterInterval = "coarse";

export const defaultSpinPeriodicity: SpinCounterPeriodicity = "short";

export const defaultSpinEntropy: SpinEntropy = "high";
