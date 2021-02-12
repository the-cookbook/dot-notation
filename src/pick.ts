import getArrayIndex from './utils/get-array-index';
import getKey from './utils/get-key';
import is from './utils/is';
import shallowCopy from './utils/shallow-copy';

/**
 * Pick value at a given dot notation path
 * @template T
 * @param {Object.<string, unknown> | Object.<string, unknown[]} source
 * @param {string} path
 * @returns {T} value
 */
const pick = <T>(source: Record<string, unknown> | Array<Record<string, unknown>>, path: string): T => {
  if (is.nullOrUndefined(path) || !path.trim()) {
    throw new SyntaxError(`A dot notation path was expected, but instead got "${path}"`);
  }

  const content = shallowCopy(source) as Record<string, unknown>;

  // eslint-disable-next-line prefer-const
  let [key, remainingPath]: [string | number, string | undefined] = getKey(path);

  const hasArrayNotation = getArrayIndex(key.toString());

  if (hasArrayNotation) {
    const { 1: idx } = hasArrayNotation;

    if (!idx) {
      throw new SyntaxError(`An array index was expected but nothing was found at "${path}"`);
    }

    if (Number.isNaN(+idx)) {
      throw new TypeError(`Array index must a positive integer "${idx}"`);
    }

    if (+idx < 0) {
      throw new RangeError(`Array index must be equal or greater than 0, but instead got "${idx}"`);
    }

    // replace key with array index value
    key = +idx;
  }

  if (!remainingPath || is.nullOrUndefined(content[key])) {
    return content[key] as T;
  }

  return pick<T>(content[key] as Record<string, unknown>, remainingPath);
};

export default pick;
