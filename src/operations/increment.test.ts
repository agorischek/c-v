import { describe, expect, it } from 'bun:test';
import { maxVectorLengthV1, maxVectorLengthV2 } from '../constants/lengths';
import { increment } from '../operations/increment';

describe('increment', () => {
  it('should increment the extension by one', () => {
    const cv = 'abc123.1';
    const result = increment(cv);
    expect(result).toBe('abc123.2');
  });

  it('should handle incrementing an extension of 0', () => {
    const cv = 'abc123.0';
    const result = increment(cv);
    expect(result).toBe('abc123.1');
  });

  it('should return the same vector if it is immutable', () => {
    const cv = 'abc123.1!';
    const result = increment(cv);
    expect(result).toBe(cv);
  });

  it('should return the same vector if the extension is MAX_SAFE_INTEGER', () => {
    const cv = `abc123.${Number.MAX_SAFE_INTEGER}`;
    const result = increment(cv);
    expect(result).toBe(cv);
  });

  it('should return the same vector if incrementing exceeds max length for v1', () => {
    const base = 'a'.repeat(maxVectorLengthV1 - 2);
    const cv = `${base}.9`;
    const result = increment(cv);
    expect(result).toBe(cv);
  });

  it('should return the same vector if incrementing exceeds max length for v2', () => {
    const base = 'a'.repeat(maxVectorLengthV2 - 2);
    const cv = `${base}.9`;
    const result = increment(cv);
    expect(result).toBe(cv);
  });

  it('should increment the extension for v1 without exceeding max length', () => {
    const base = 'a'.repeat(maxVectorLengthV1 - 4);
    const cv = `${base}.9`;
    const result = increment(cv);
    expect(result).toBe(`${base}.10`);
  });
});
