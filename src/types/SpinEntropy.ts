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
  One = 1,

  /**
   * Generate entropy using 16 bits.
   */
  Two = 2,
}
