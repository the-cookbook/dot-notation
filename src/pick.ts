import getArrayIndex from './utils/get-array-index';
import getKey from './utils/get-key';
import is from './utils/is';
import shallowCopy from './utils/shallow-copy';
import type { DotNotationPathOf, DotNotationDataTypeOf } from './contracts';

/**
 * Pick value at a given dot notation path
 * @template T
 * @param {Object.<string, unknown> | Object.<string, unknown[]} source
 * @param {string} path
 * @returns {T} value
 */
const pick = <T extends object | Array<object>, K extends DotNotationPathOf<T> | string>(
  source: T,
  path: K,
): DotNotationDataTypeOf<T, K> => {
  if (is.nullish(path) || !path.toString().trim()) {
    throw new SyntaxError(`A dot notation path was expected, but instead got "${path}"`);
  }

  const content = shallowCopy(source) as T;

  // eslint-disable-next-line prefer-const
  let [key, remainingPath] = getKey(path) as [string | number, K];

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

  // @ts-ignore
  if (!remainingPath || is.nullish(content[key])) {
    // @ts-ignore
    return content[key] as T;
  }

  return pick(content[key], remainingPath) as DotNotationDataTypeOf<T, K>;
};

export default pick;
