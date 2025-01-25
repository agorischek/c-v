import { maxVectorLengthV1, maxVectorLengthV2 } from "../constants";
import { Version } from "../types/Version";

export const oversized = (
  baseVector: string,
  extension: number,
  version: Version
): boolean => {
  if (baseVector) {
    let size: number =
      baseVector.length +
      1 +
      (extension > 0 ? Math.floor(Math.log10(extension)) : 0) +
      1;
    return (
      (version === "v1" && size > maxVectorLengthV1) ||
      (version === "v2" && size > maxVectorLengthV2)
    );
  }
  return false;
};
