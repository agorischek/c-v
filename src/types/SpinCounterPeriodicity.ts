/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

/**
 * The periodicity of the spin counter.
 *
 * - "none": Do not store a counter as part of the spin value.
 * - "short": The short periodicity stores the counter using 16 bits.
 * - "medium": The medium periodicity stores the counter using 24 bits.
 */
export type SpinCounterPeriodicity = 'none' | 'short' | 'medium';
