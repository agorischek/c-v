/**
 * Extends the correlation vector by appending ".0".
 * @param {string} cv The current correlation vector string.
 * @returns {string} The extended correlation vector string.
 */
export const extend = (cv: string): string => {
  return `${cv}.0`;
};
