import { describe, expect, it } from 'bun:test';
import { extender, separator } from '../constants/characters';
import { extend } from './extend';

describe('extend', () => {
  it('should extend a correlation vector by appending ".0"', () => {
    const cv = 'abc123';
    const result = extend(cv);
    expect(result).toBe(cv + separator + extender);
  });

  it('should extend an empty correlation vector', () => {
    const cv = '';
    const result = extend(cv);
    expect(result).toBe(separator + extender);
  });

  it('should extend a correlation vector with existing extension', () => {
    const cv = 'abc123.1';
    const result = extend(cv);
    expect(result).toBe(cv + separator + extender);
  });

  it('should extend a correlation vector with multiple existing extensions', () => {
    const cv = 'abc123.1.2';
    const result = extend(cv);
    expect(result).toBe(cv + separator + extender);
  });
});
