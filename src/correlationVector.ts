/**
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

import {
  base64CharSet,
  baseLengthV1,
  baseLengthV2,
  maxVectorLengthV1,
  maxVectorLengthV2,
  terminationSign,
} from "./constants";
import { CvVersion } from "./CvVersion";
import { inferVersion } from "./inferVersion";
import { isImmutable } from "./isImmutable";
import { parse } from "./parse";
// import { CorrelationVectorVersion } from "./correlationVectorVersion";
import {
  SpinCounterInterval,
  SpinCounterPeriodicity,
  SpinEntropy,
  SpinParameters,
} from "./spinParameters";

/**
 * This class represents a lightweight vector for identifying and measuring
 * causality.
 */
export class CorrelationVector {
  // In order to reliably convert a V2 vector base to a guid, the four least significant bits of the last base64
  // content-bearing 6-bit block must be zeros.
  //
  // Base64 characters with four least significant bits of zero are:
  // A - 00 0000
  // Q - 01 0000
  // g - 10 0000
  // w - 11 0000
  private static readonly base64LastCharSet = "AQgw";

  private baseVector: string = null;

  private extension: number = 0;

  private immutable: boolean = false;

  /**
   * Gets or sets a value indicating whether or not to validate the correlation
   * vector on creation.
   */
  public static validateCorrelationVectorDuringCreation: boolean;

  /**
   * Creates a new correlation vector by extending an existing value. This should be
   * done at the entry point of an operation.
   * @param {string} correlationVector taken from the message header indicated by {@link CorrelationVector#headerName}
   * @returns {CorrelationVector} A new correlation vector extended from the current vector.
   */
  public static extend(correlationVector: string): CorrelationVector {
    if (isImmutable(correlationVector)) {
      return parse(correlationVector);
    }

    let version: CvVersion = inferVersion(correlationVector);

    if (CorrelationVector.isOversized(correlationVector, 0, version)) {
      return parse(correlationVector + terminationSign);
    }

    return new CorrelationVector(correlationVector, 0, version, false);
  }

  /**
   * Creates a new correlation vector by applying the Spin operator to an existing value.
   * this should be done at the entry point of an operation.
   * @param {string} correlationVector taken from the message header indicated by {@link CorrelationVector#headerName}
   * @param {SpinParameters} parameters the parameters to use when applying the Spin operator.
   * @returns {CorrelationVector} A new correlation vector spined from the current vector.
   */
  public static spin(
    correlationVector: string,
    parameters?: SpinParameters
  ): CorrelationVector {
    if (isImmutable(correlationVector)) {
      return parse(correlationVector);
    }

    let version: CvVersion = inferVersion(correlationVector);

    if (CorrelationVector.validateCorrelationVectorDuringCreation) {
      CorrelationVector.validate(correlationVector, version);
    }

    parameters =
      parameters ||
      new SpinParameters(
        SpinCounterInterval.Coarse,
        SpinCounterPeriodicity.Short,
        SpinEntropy.Two
      );

    // javascript only returns ms, 1ms = 10000ticks
    let ticks: number = Date.now() * 10000;

    // javascript only supports 32-bit bitwise operation, we need to convert it to string
    let value: string = ticks.toString(2);
    value = value.substring(0, value.length - parameters.ticksBitsToDrop);

    if (parameters.entropy > 0) {
      const entropypow: number = parameters.entropy * 8;
      let entropy: string = Math.round(
        Math.random() * Math.pow(2, entropypow - 1)
      ).toString(2);
      while (entropy.length < entropypow) {
        entropy = "0" + entropy;
      }
      value = value + entropy;
    }

    // the max safe number for js is 52.
    const allowedBits: number = Math.min(52, parameters.totalBits);
    if (value.length > allowedBits) {
      value = value.substr(value.length - allowedBits);
    }

    let s: number = parseInt(value, 2);

    let baseVector: string = `${correlationVector}.${s}`;
    if (CorrelationVector.isOversized(baseVector, 0, version)) {
      return parse(correlationVector + terminationSign);
    }

    return new CorrelationVector(baseVector, 0, version, false);
  }

  /**
   * Initializes a new instance of the {@link CorrelationVector} class of the
   * given implemenation version. This should only be called when no correlation
   * vector was found in the message header.
   * @param {CorrelationVectorVersion} version The correlation vector implemenation version.
   * @returns {CorrelationVector} created correlation vector
   */
  public static createCorrelationVector(
    version?: CvVersion
  ): CorrelationVector {
    version = version || "v1";
    return new CorrelationVector(
      CorrelationVector.seedCorrelationVector(version),
      0,
      version,
      false
    );
  }

  /**
   * Gets the value of the correlation vector as a string.
   */
  public get value(): string {
    return `${this.baseVector}.${this.extension}${
      this.immutable ? terminationSign : ""
    }`;
  }

  /**
   * Increments the current extension by one. Do this before passing the value to an
   * outbound message header.
   * @returns {string} the new value as a string that you can add to the outbound message header
   * indicated by {@link CorrelationVector#headerName}.
   */
  public increment(): string {
    if (this.immutable) {
      return this.value;
    }
    if (this.extension === Number.MAX_SAFE_INTEGER) {
      return this.value;
    }
    let next: number = this.extension + 1;
    if (CorrelationVector.isOversized(this.baseVector, next, this.version)) {
      this.immutable = true;
      return this.value;
    }
    this.extension = next;

    return `${this.baseVector}.${next}`;
  }

  /**
   * Gets the version of the correlation vector implementation.
   */
  public version: CvVersion;

  /**
   * Returns a string that represents the current object.
   * @returns {string} A string that represents the current object.
   */
  public toString(): string {
    return this.value;
  }

  public constructor(
    baseVector: string,
    extension: number,
    version: CvVersion,
    immutable: boolean
  ) {
    this.baseVector = baseVector;
    this.extension = extension;
    this.version = version;
    this.immutable =
      immutable ||
      CorrelationVector.isOversized(baseVector, extension, version);
  }

  /**
   * Seed function to randomly generate a 16 character base64 encoded string for the Correlation Vector's base value
   * @returns {string} Returns generated base value
   */
  private static seedCorrelationVector(version: CvVersion): string {
    let result: string = "";
    let baseLength: number = version === "v1" ? baseLengthV1 : baseLengthV2 - 1;
    for (let i: number = 0; i < baseLength; i++) {
      result += base64CharSet.charAt(
        Math.floor(Math.random() * base64CharSet.length)
      );
    }

    if (version === "v2") {
      result += CorrelationVector.base64LastCharSet.charAt(
        Math.floor(Math.random() * CorrelationVector.base64LastCharSet.length)
      );
    }

    return result;
  }

  private static isOversized(
    baseVector: string,
    extension: number,
    version: CvVersion
  ): boolean {
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
  }

  private static validate(correlationVector: string, version: CvVersion): void {
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
  }
}
