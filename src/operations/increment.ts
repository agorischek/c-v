import { extension } from "../properties/extension";
import { version } from "../properties/version";
import { immutable } from "../properties/immutable";
import { oversized } from "../properties/oversized"; // Assuming this function is defined elsewhere

/**
 * Increments the current extension by one. Do this before passing the value to an
 * outbound message header.
 * @param {string} cv The current correlation vector string.
 * @param {string} baseVector The base vector of the correlation vector.
 * @returns {string} the new value as a string that you can add to the outbound message header
 * indicated by {@link CorrelationVector#headerName}.
 */
export const increment = (cv: string, baseVector: string): string => {
  const v = version(cv);
  if (immutable(cv)) {
    return cv;
  }
  if (extension(cv) === Number.MAX_SAFE_INTEGER) {
    return cv;
  }
  let next: number = extension(cv) + 1;
  if (oversized(baseVector, next, v)) {
    return cv;
  }

  return `${baseVector}.${next}`;
};
