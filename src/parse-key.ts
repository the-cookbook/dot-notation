import getArrayIndex from './utils/get-array-index';
import getKey from './utils/get-key';

/**
 * Parse object key from dot notation
 * @example
 * parseKey('person.name', 'John Doe');
 * // outputs { person: { name: 'John Doe' } }
 * parseKey('person.alias[]', 'John Doe');
 * // outputs { person: { alias: ['John Doe] } }
 * @param {string} path - Dot notation object path
 * @param {any} value - Dot notation path value
 * @returns {object}
 */
const parseKey = <T>(path: string, value: unknown): T extends [] ? T[] : T => {
  const [current, remaining] = getKey(path);
  const match = getArrayIndex(current);

  const mount = (): T => (remaining ? parseKey<T>(remaining, value) : value) as T;

  return (match ? [mount()] : { [current]: mount() }) as T extends [] ? T[] : T;
};

export default parseKey;
