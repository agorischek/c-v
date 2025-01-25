import { describe, expect, it } from 'bun:test';
import { base64CharSet, base64LastCharSet } from '../constants/characters';
import { baseLengthV1, baseLengthV2 } from '../constants/lengths';
import { seed } from './seed';

describe('seed', () => {
  it('should generate a base64 encoded string of length 16 for version v1', () => {
    const result = seed('v1');
    expect(result).toHaveLength(baseLengthV1);
    for (const char of result) {
      expect(base64CharSet).toContain(char);
    }
  });

  it('should generate a base64 encoded string of length 22 for version v2', () => {
    const result = seed('v2');
    expect(result).toHaveLength(baseLengthV2);
    for (let i = 0; i < baseLengthV2 - 1; i++) {
      expect(base64CharSet).toContain(result.charAt(i));
    }
    expect(base64LastCharSet).toContain(result.charAt(baseLengthV2 - 1));
  });

  it('should generate a base64 encoded string of length 16 for default version', () => {
    const result = seed();
    expect(result).toHaveLength(baseLengthV2);
    for (const char of result) {
      expect(base64CharSet).toContain(char);
    }
  });

  it('should generate different strings on consecutive calls', () => {
    const result1 = seed('v1');
    const result2 = seed('v1');
    expect(result1).not.toBe(result2);
  });

  it('should generate different strings on consecutive calls for v2', () => {
    const result1 = seed('v2');
    const result2 = seed('v2');
    expect(result1).not.toBe(result2);
  });
});
