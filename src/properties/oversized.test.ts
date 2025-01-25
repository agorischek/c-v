import { describe, expect, it } from 'bun:test';
import { maxVectorLengthV1, maxVectorLengthV2 } from '../constants/lengths';
import { oversized } from './oversized';

describe('oversized', () => {
  it('should return false for a vector within max length for v1', () => {
    const cv = 'a'.repeat(maxVectorLengthV1 - 3) + '.0';
    const result = oversized(cv);
    expect(result).toBe(false);
  });

  it('should return true for a vector exceeding max length for v2', () => {
    const cv = 'a'.repeat(maxVectorLengthV2 - 2) + '.0';
    const result = oversized(cv);
    expect(result).toBe(true);
  });

  it('should return false for a vector with mixed characters within max length for v1', () => {
    const cv = 'abc123'.repeat((maxVectorLengthV1 - 4) / 6) + '.0';
    const result = oversized(cv);
    expect(result).toBe(false);
  });

  it('should return true for a vector with mixed characters exceeding max length for v2', () => {
    const cv = 'abc123'.repeat((maxVectorLengthV2 - 3) / 6) + '.0';
    const result = oversized(cv);
    expect(result).toBe(true);
  });
});
