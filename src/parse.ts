import { terminationSign } from "./constants";
import { CorrelationVector } from "./correlationVector";
import { inferVersion } from "./inferVersion";
import { isImmutable } from "./isImmutable";

/**
 * Creates a new correlation vector by parsing its string representation
 * @param {string} correlationVector correlationVector
 * @returns {CorrelationVector} parsed correlation vector
 */
export const parse = (correlationVector: string): CorrelationVector => {
  if (correlationVector) {
    let p: number = correlationVector.lastIndexOf(".");
    let immutable: boolean = isImmutable(correlationVector);
    if (p > 0) {
      let extensionValue: string = immutable
        ? correlationVector.substr(
            p + 1,
            correlationVector.length - p - 1 - terminationSign.length
          )
        : correlationVector.substring(p + 1);
      let extension: number = parseInt(extensionValue, 10);
      if (!isNaN(extension) && extension >= 0) {
        return new CorrelationVector(
          correlationVector.substring(0, p),
          extension,
          inferVersion(correlationVector),
          immutable
        );
      }
    }
  }

  return CorrelationVector.createCorrelationVector();
};
