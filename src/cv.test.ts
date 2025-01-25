import { describe, expect, it } from 'bun:test';
import { cv } from './cv';
import { split } from './helpers/split';

describe('cv', () => {
  it('should seed a v1 vector', () => {
    const vector = cv('v1');
    const [base, extension] = split(vector);
    expect(base).toHaveLength(16);
    expect(extension).toBe(0);
  });

  it('should seed a v2 vector', () => {
    const vector = cv('v2');
    const [base, extension] = split(vector);
    expect(base).toHaveLength(22);
    expect(extension).toBe(0);
  });
});
