import { Version } from "./types/Version";
import { extend } from "./operations/extend";
import { seed } from "./utilities/seed";
import { defaultVersion } from "./defaults";

export const cv = (version: Version = defaultVersion): string => {
  return extend(seed(version));
};
