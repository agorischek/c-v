import { describe, expect, it } from 'bun:test';
import { validate } from './validate';

describe('validate', () => {
  it('should validate a correct v1 correlation vector', () => {
    const cv = 'a'.repeat(16) + '.0';
    expect(() => validate(cv, 'v1')).not.toThrow();
  });

  it('should validate a correct v2 correlation vector', () => {
    const cv = 'a'.repeat(22) + '.0';
    expect(() => validate(cv, 'v2')).not.toThrow();
  });

  it('should throw an error for a null correlation vector', () => {
    const cv = null;
    // @ts-expect-error - Testing invalid input
    expect(() => validate(cv, 'v1')).toThrow(
      'The v1 correlation vector can not be null or bigger than 63 characters'
    );
  });

  it('should throw an error for a correlation vector exceeding max length for v1', () => {
    const cv = 'a'.repeat(64);
    expect(() => validate(cv, 'v1')).toThrow(
      'The v1 correlation vector can not be null or bigger than 63 characters'
    );
  });

  it('should throw an error for a correlation vector exceeding max length for v2', () => {
    const cv = 'a'.repeat(128);
    expect(() => validate(cv, 'v2')).toThrow(
      'The v2 correlation vector can not be null or bigger than 127 characters'
    );
  });

  it('should throw an error for an invalid base length for v1', () => {
    const cv = 'a'.repeat(15) + '.0';
    expect(() => validate(cv, 'v1')).toThrow(
      `Invalid correlation vector ${cv}. Invalid base value ${'a'.repeat(15)}`
    );
  });

  it('should throw an error for an invalid base length for v2', () => {
    const cv = 'a'.repeat(21) + '.0';
    expect(() => validate(cv, 'v2')).toThrow(
      `Invalid correlation vector ${cv}. Invalid base value ${'a'.repeat(21)}`
    );
  });

  it('should throw an error for an invalid extension value', () => {
    const cv = 'a'.repeat(16) + '.a';
    expect(() => validate(cv, 'v1')).toThrow(
      `Invalid correlation vector ${cv}. Invalid extension value a`
    );
  });

  it('should throw an error for a negative extension value', () => {
    const cv = 'a'.repeat(16) + '.-1';
    expect(() => validate(cv, 'v1')).toThrow(
      `Invalid correlation vector ${cv}. Invalid extension value -1`
    );
  });

  it('should throw an error for an unsupported version', () => {
    const cv = 'a'.repeat(16) + '.0';
    // @ts-expect-error - Testing invalid input
    expect(() => validate(cv, 'v3')).toThrow(
      'Unsupported correlation vector version: v3'
    );
  });
});
