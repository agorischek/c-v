import { describe, expect, it } from 'bun:test';
import { spin } from './spin';

describe('spin', () => {
  it('should return the same vector if it is immutable', () => {
    const cv = 'abc123.1!';
    const result = spin(cv);
    expect(result).toBe(cv);
  });

  it('should extend the correlation vector with a spin value', () => {
    const cv = 'abc123.1';
    const result = spin(cv);
    expect(result).toMatch(/^abc123\.1\.\d+(\.\d+)?$/);
  });

  it('should terminate the correlation vector if it overflows', () => {
    const cv = 'a'.repeat(63);
    const result = spin(cv);
    expect(result).toBe(`${cv}!`);
  });

  it('should use default spin options if none are provided', () => {
    const cv = 'abc123.1';
    const result = spin(cv);
    expect(result).toMatch(/^abc123\.1\.\d+(\.\d+)?$/);
  });

  it('should use provided spin options', () => {
    const cv = 'abc123.1';
    const result = spin(cv, {
      interval: 'coarse',
      periodicity: 'medium',
      entropy: 'low',
    });
    expect(result).toMatch(/^abc123\.1\.\d+(\.\d+)?$/);
  });

  it('should handle spin entropy correctly', () => {
    const cv = 'abc123.1';
    const result = spin(cv, { entropy: 'high' });
    expect(result).toMatch(/^abc123\.1\.\d+(\.\d+)?$/);
  });
});
