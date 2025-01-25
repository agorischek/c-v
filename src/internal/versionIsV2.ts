import type { Version } from '../types/Version';

export const versionIsV2 = (version: Version): boolean =>
  version === 'v2' || version === 2;
