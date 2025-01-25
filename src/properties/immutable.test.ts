import { describe, expect, it } from 'bun:test';
import { terminator } from '../constants/characters';
import { immutable } from './immutable';

describe('immutable', () => {
  it('should return true if the correlation vector ends with the terminator', () => {
    const cv = `abc123${terminator}`;
    const result = immutable(cv);
    expect(result).toBe(true);
  });

  it('should return false if the correlation vector does not end with the terminator', () => {
    const cv = 'abc123';
    const result = immutable(cv);
    expect(result).toBe(false);
  });

  it('should return false if the correlation vector is empty', () => {
    const cv = '';
    const result = immutable(cv);
    expect(result).toBe(false);
  });

  it('should return false if the correlation vector is undefined', () => {
    const cv = undefined;
    // @ts-expect-error - Testing invalid input
    const result = immutable(cv);
    expect(result).toBe(false);
  });

  it('should return false if the correlation vector is null', () => {
    const cv = null;
    // @ts-expect-error - Testing invalid input
    const result = immutable(cv);
    expect(result).toBe(false);
  });
});
