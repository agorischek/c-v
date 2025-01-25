/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

/**
 * The interval at which the spin counter increments.
 *
 * - "coarse": The coarse interval drops the 24 least significant bits in DateTime.Ticks
 *   resulting in a counter that increments every 1.67 seconds.
 * - "fine": The fine interval drops the 16 least significant bits in DateTime.Ticks
 *   resulting in a counter that increments every 6.5 milliseconds.
 */
export type SpinCounterInterval = 'coarse' | 'fine';
