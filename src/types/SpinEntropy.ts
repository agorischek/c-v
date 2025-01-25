/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 */

/**
 * The entropy level for the spin value.
 *
 * - "none": Do not generate entropy as part of the spin value.
 * - "low": Generate entropy using 8 bits.
 * - "high": Generate entropy using 16 bits.
 */
export type SpinEntropy = 'none' | 'low' | 'high';
