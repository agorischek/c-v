import { separator } from '../constants/characters';
import { maxVectorLengthV1, maxVectorLengthV2 } from '../constants/lengths';
import { type Version } from '../types/Version';
import { versionIsV1 } from './versionIsV1';
import { versionIsV2 } from './versionIsV2';

/**
 * Checks if the base vector with the given extension overflows the maximum vector length for the specified version
 * @param base - The base vector string
 * @param extension - The extension number
 * @param version - The version of the vector
 * @returns True if the vector overflows, false otherwise
 */
export const overflow = (
  base: string,
  extension: number,
  version: Version
): boolean => {
  if (base) {
    const size = base.length + separator.length + extension.toString().length;
    return (
      (versionIsV1(version) && size > maxVectorLengthV1) ||
      (versionIsV2(version) && size > maxVectorLengthV2)
    );
  }
  return false;
};
