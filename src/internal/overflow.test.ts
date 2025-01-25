import { describe, expect, it } from 'bun:test';
import { maxVectorLengthV1, maxVectorLengthV2 } from '../constants/lengths';
import { overflow } from './overflow';

describe('overflow', () => {
  it('should return false for empty base string', () => {
    const result = overflow('', 0, 'v1');
    expect(result).toBeFalse();
  });

  it('should return false for base string within max length for v1', () => {
    const base = 'a'.repeat(maxVectorLengthV1 - 2);
    const result = overflow(base, 0, 'v1');
    expect(result).toBeFalse();
  });

  it('should return true for base string exceeding max length for v1', () => {
    const base = 'a'.repeat(maxVectorLengthV1 - 1);
    const result = overflow(base, 0, 'v1');
    expect(result).toBeTrue();
  });

  it('should return false for base string within max length for v2', () => {
    const base = 'a'.repeat(maxVectorLengthV1 - 2);
    const result = overflow(base, 0, 'v2');
    expect(result).toBeFalse();
  });

  it('should return true for base string exceeding max length for v2', () => {
    const base = 'a'.repeat(maxVectorLengthV2 - 1);
    const result = overflow(base, 0, 'v2');
    expect(result).toBeTrue();
  });

  it('should return false for base string with extension within max length for v1', () => {
    const base = 'a'.repeat(maxVectorLengthV1 - 4);
    const extension = 99;
    const result = overflow(base, extension, 'v1');
    expect(result).toBeFalse();
  });

  it('should return true for base string with extension exceeding max length for v1', () => {
    const base = 'a'.repeat(maxVectorLengthV1 - 2);
    const extension = 99;
    const result = overflow(base, extension, 'v1');
    expect(result).toBeTrue();
  });

  it('should return false for base string with extension within max length for v2', () => {
    const base = 'a'.repeat(maxVectorLengthV2 - 4);
    const extension = 99;
    const result = overflow(base, extension, 'v2');
    expect(result).toBeFalse();
  });

  it('should return true for base string with extension exceeding max length for v2', () => {
    const base = 'a'.repeat(maxVectorLengthV2 - 2);

    const extension = 99;
    const result = overflow(base, extension, 'v2');
    expect(result).toBeTrue();
  });
});
