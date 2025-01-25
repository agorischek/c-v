import { describe, expect, it } from 'bun:test';
import { versionIsV1 } from './versionIsV1';

describe('versionIsV1', () => {
  it('should return true for string "v1"', () => {
    const result = versionIsV1('v1');
    expect(result).toBe(true);
  });

  it('should return true for number 1', () => {
    const result = versionIsV1(1);
    expect(result).toBe(true);
  });

  it('should return false for string "v2"', () => {
    const result = versionIsV1('v2');
    expect(result).toBe(false);
  });

  it('should return false for number 2', () => {
    const result = versionIsV1(2);
    expect(result).toBe(false);
  });

  it('should return false for other strings', () => {
    // @ts-expect-error - Testing invalid input
    const result = versionIsV1('other');
    expect(result).toBe(false);
  });

  it('should return false for other numbers', () => {
    // @ts-expect-error - Testing invalid input
    const result = versionIsV1(3);
    expect(result).toBe(false);
  });

  it('should return false for undefined', () => {
    // @ts-expect-error - Testing invalid input
    const result = versionIsV1(undefined);
    expect(result).toBe(false);
  });

  it('should return false for null', () => {
    // @ts-expect-error - Testing invalid input
    const result = versionIsV1(null);
    expect(result).toBe(false);
  });
});
