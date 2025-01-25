import { describe, expect, it } from 'bun:test';
import { split } from './split';

describe('split', () => {
  it('should split a correlation vector into base and extensions', () => {
    const cv = 'abc123.1.2';
    const result = split(cv);
    expect(result).toEqual(['abc123', 1, 2]);
  });

  it('should handle a correlation vector with a single extension', () => {
    const cv = 'abc123.1';
    const result = split(cv);
    expect(result).toEqual(['abc123', 1]);
  });

  it('should handle a correlation vector with no extensions', () => {
    const cv = 'abc123';
    const result = split(cv);
    expect(result).toEqual(['abc123']);
  });

  it('should handle a correlation vector ending with a terminator', () => {
    const cv = 'abc123.1!';
    const result = split(cv);
    expect(result).toEqual(['abc123', 1]);
  });

  it('should throw an error if the base is missing', () => {
    const cv = '.1.2';
    expect(() => split(cv)).toThrow('Invalid correlation vector: missing base');
  });

  it('should throw an error if an extension is non-numeric', () => {
    const cv = 'abc123.1.a';
    expect(() => split(cv)).toThrow(
      'Invalid correlation vector: non-numeric extension'
    );
  });

  it('should handle an empty correlation vector', () => {
    const cv = '';
    expect(() => split(cv)).toThrow('Invalid correlation vector: missing base');
  });
});
