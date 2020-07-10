import getArrayIndex from './utils/get-array-index';
import getKey from './utils/get-key';
import is from './utils/is';

/**
 * Pick
 * @template T, S
 * @description Reads value from object using dot notation path as key
 * @param {string} path
 * @param {T} source
 * @returns {T} value
 */
export const pick = <T = unknown, S = Record<string, unknown | unknown[]> | unknown[]>(source: S, path: string): T => {
  if (is.nullOrUndefined(path) || !path.trim()) {
    throw new SyntaxError(`A dot notation path was expected, but instead got "${path}"`);
  }

  // eslint-disable-next-line prefer-const
  let [current, remaining] = getKey(path) as [string | number, string | undefined];

  const match = getArrayIndex(current.toString());

  if (match) {
    const { 1: index } = match;

    if (!index) {
      throw new SyntaxError(`An array index was expected but nothing was found at "${path}"`);
    }

    if (Number.isNaN(+index)) {
      throw new TypeError(`Array index must a positive integer "${index}"`);
    }

    if (+index < 0) {
      throw new RangeError(`Array index must be equal or greater than 0, but instead got "${index}"`);
    }

    current = +index;
  }

  if (!remaining || !(source as Record<string, T | unknown>)[current]) {
    return (source as Record<string, T | unknown>)[current] as T;
  }

  return pick<T, S>((source as Record<string, T | unknown>)[current] as S, remaining);
};

export default pick;
