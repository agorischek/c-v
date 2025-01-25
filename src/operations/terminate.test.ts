import { describe, expect, it } from 'bun:test';
import { terminator } from '../constants/characters';
import { terminate } from './terminate';

describe('terminate', () => {
  it('should append the terminator to the correlation vector', () => {
    const cv = 'abc123.1';
    const result = terminate(cv);
    expect(result).toBe(cv + terminator);
  });

  it('should return the correlation vector as is if it already ends with the terminator', () => {
    const cv = 'abc123.1' + terminator;
    const result = terminate(cv);
    expect(result).toBe(cv);
  });

  it('should handle an empty correlation vector', () => {
    const cv = '';
    const result = terminate(cv);
    expect(result).toBe(terminator);
  });

  it('should handle a correlation vector with special characters', () => {
    const cv = 'abc123.1!@#';
    const result = terminate(cv);
    expect(result).toBe(cv + terminator);
  });
});
