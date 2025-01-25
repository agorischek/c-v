import { baseLengthV1, baseLengthV2 } from "../constants";
import { Version } from "../types/Version";

export const version = (correlationVector: string): Version => {
  let index: number =
    correlationVector == null ? -1 : correlationVector.indexOf(".");

  if (baseLengthV1 === index) {
    return "v1";
  } else if (baseLengthV2 === index) {
    return "v2";
  } else {
    return "v1";
  }
};
