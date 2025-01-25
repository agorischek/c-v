import { describe, expect, it } from 'bun:test';
import { base } from './base';

describe('base', () => {
  it('should return the base part of the correlation vector', () => {
    const cv = 'abc123.1.2';
    const result = base(cv);
    expect(result).toBe('abc123');
  });

  it('should return the base part when there is no extension', () => {
    const cv = 'abc123';
    const result = base(cv);
    expect(result).toBe('abc123');
  });

  it('should return the base part when there is a single extension', () => {
    const cv = 'abc123.1';
    const result = base(cv);
    expect(result).toBe('abc123');
  });

  it('should return the base part when there are multiple extensions', () => {
    const cv = 'abc123.1.2.3';
    const result = base(cv);
    expect(result).toBe('abc123');
  });

  it('should return the base part when the correlation vector ends with a terminator', () => {
    const cv = 'abc123.1!';
    const result = base(cv);
    expect(result).toBe('abc123');
  });
});
