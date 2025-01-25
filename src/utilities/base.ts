import { split } from "./split";

/**
 * Gets the base part of the correlation vector.
 * @param {string} cv The correlation vector string.
 * @returns {string} The base part of the correlation vector.
 */
export const base = (cv: string): string => {
  const [base, _] = split(cv);
  return base;
};
