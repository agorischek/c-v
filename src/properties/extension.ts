import { split } from "../utilities/split";

/**
 * Gets the extension from a correlation vector string.
 * @param {string} correlationVector The correlation vector string.
 * @returns {number} The extension of the correlation vector.
 */
export const extension = (correlationVector: string): number => {
  const [_, extension] = split(correlationVector);
  return extension;
};
