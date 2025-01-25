import {
  baseLengthV1,
  baseLengthV2,
  base64CharSet,
  base64LastCharSet,
  defaultVersion,
} from "../constants";
import { Version } from "../types/Version";

/**
 * Seed function to randomly generate a 16 character base64 encoded string for the Correlation Vector's base value
 * @returns {string} Returns generated base value
 */
export const seed = (version: Version = defaultVersion): string => {
  let result: string = "";
  let baseLength: number = version === "v1" ? baseLengthV1 : baseLengthV2 - 1;
  for (let i: number = 0; i < baseLength; i++) {
    result += base64CharSet.charAt(
      Math.floor(Math.random() * base64CharSet.length)
    );
  }

  if (version === "v2") {
    result += base64LastCharSet.charAt(
      Math.floor(Math.random() * base64LastCharSet.length)
    );
  }

  return result;
};
