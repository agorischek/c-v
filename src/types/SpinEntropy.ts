/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

export const enum SpinEntropy {
  /**
   * Do not generate entropy as part of the spin value.
   */
  None = 0,

  /**
   * Generate entropy using 8 bits.
   */
  Low = 8,

  /**
   * Generate entropy using 16 bits.
   */
  High = 16,
}
