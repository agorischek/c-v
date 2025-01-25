import type { Version } from '../types/Version';

export const versionIsV1 = (version: Version): boolean =>
  version === 'v1' || version === 1;
