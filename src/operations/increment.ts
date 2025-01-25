import { separator } from '../constants/characters';
import { split } from '../helpers/split';
import { overflow } from '../internal/overflow';
import { immutable } from '../properties/immutable';
import { version } from '../properties/version';

/**
 * Increments the current extension by one. Do this before passing the value to an
 * outbound message header.
 * @param cv - The current correlation vector string.
 * @returns the new value as a string that you can add to the outbound message header
 * indicated by {@link CorrelationVector#headerName}.
 */
export const increment = (cv: string): string => {
  const [base, ...extensions] = split(cv);
  const v = version(cv);
  if (immutable(cv)) {
    return cv;
  }
  const lastExtension =
    extensions.length > 0 ? extensions[extensions.length - 1] : 0;
  if (lastExtension === Number.MAX_SAFE_INTEGER) {
    return cv;
  }
  const next: number = lastExtension + 1;

  if (overflow(base, next, v)) {
    return cv;
  }

  const newExtensions = extensions.slice(0, -1).concat(next).join(separator);
  return base + (newExtensions ? separator + newExtensions : '');
};
