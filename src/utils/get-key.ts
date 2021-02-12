/**
 * Get initial key from dot notation path
 * @description returns first key defined in dot notation and the remaining path
 * @param {string} value
 * @returns {[string, string | undefined]} - returns key, remaining dot notation path and isArray,
 */
const getKey = (value: string): [string, string | undefined] => {
  const [current, ...remaining] = value.split(getKey.regexp).filter(Boolean);

  return [current, remaining.length ? remaining.join('.') : undefined];
};

getKey.regexp = /\.|(\[[^\]]*])|(\[-*\d*])/;

export default getKey;
