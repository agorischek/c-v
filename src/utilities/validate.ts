import { maxVectorLengthV2, baseLengthV2 } from "../constants";
import { Version } from "../types/Version";

export const validate = (correlationVector: string, version: Version): void => {
  let maxVectorLength: number;
  let baseLength: number;

  if ("v1" === version) {
    maxVectorLength = maxVectorLength;
    baseLength = baseLength;
  } else if ("v2" === version) {
    maxVectorLength = maxVectorLengthV2;
    baseLength = baseLengthV2;
  } else {
    throw new Error(`Unsupported correlation vector version: ${version}`);
  }

  if (!correlationVector || correlationVector.length > maxVectorLength) {
    throw new Error(
      `The ${version} correlation vector can not be null or bigger than ${maxVectorLength} characters`
    );
  }

  let parts: string[] = correlationVector.split(".");

  if (parts.length < 2 || parts[0].length !== baseLength) {
    throw new Error(
      `Invalid correlation vector ${correlationVector}. Invalid base value ${parts[0]}`
    );
  }

  for (let i: number = 1; i < parts.length; i++) {
    let result: number = parseInt(parts[i], 10);
    if (isNaN(result) || result < 0) {
      throw new Error(
        `Invalid correlation vector ${correlationVector}. Invalid extension value ${parts[i]}`
      );
    }
  }
};
