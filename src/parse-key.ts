import getArrayIndex from './utils/get-array-index';
import getKey from './utils/get-key';
import shallowCopy from './utils/shallow-copy';

/**
 * Parse an object key from dot notation
 * @example
 * parseKey('person.name', 'John Doe');
 * // output { person: { name: 'John Doe' } }
 * parseKey('person.alias[]', 'John Doe');
 * // output { person: { alias: ['John Doe'] } }
 * @param {string} path - Dot notation path
 * @param {unknown} value
 * @returns {object}
 */
const parseKey = <T>(path: string, value: unknown): T extends [] ? Array<T> : T => {
  const [key, remainingPath] = getKey(path);
  const hasArrayNotation = getArrayIndex(key);

  const compiledValue = (remainingPath ? parseKey<T>(remainingPath, value) : shallowCopy(value)) as T;

  return (hasArrayNotation ? [compiledValue] : { [key]: compiledValue }) as T extends [] ? Array<T> : T;
};

export default parseKey;
