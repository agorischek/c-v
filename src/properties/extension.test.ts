import { describe, expect, it } from 'bun:test';
import { extension } from './extension';

describe('extension', () => {
  it('should return the last extension of the correlation vector', () => {
    const cv = 'abc123.1.2';
    const result = extension(cv);
    expect(result).toBe(2);
  });

  it('should return the last extension when there is a single extension', () => {
    const cv = 'abc123.1';
    const result = extension(cv);
    expect(result).toBe(1);
  });

  it('should handle a correlation vector ending with a terminator', () => {
    const cv = 'abc123.1!';
    const result = extension(cv);
    expect(result).toBe(1);
  });

  it('should throw an error if the last segment is not a number', () => {
    const cv = 'abc123.1.a';
    expect(() => extension(cv)).toThrow('Invalid correlation vector:');
  });

  it('should throw an error if the correlation vector is empty', () => {
    const cv = '';
    expect(() => extension(cv)).toThrow(
      'Invalid correlation vector: missing base'
    );
  });
});
