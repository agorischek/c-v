/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

export const enum SpinCounterInterval {
  /**
   * The coarse interval drops the 24 least significant bits in DateTime.Ticks
   * resulting in a counter that increments every 1.67 seconds.
   */
  Coarse,

  /**
   * The fine interval drops the 16 least significant bits in DateTime.Ticks
   * resulting in a counter that increments every 6.5 milliseconds.
   */
  Fine,
}
