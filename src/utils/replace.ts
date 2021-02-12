import toArray from './to-array';

/**
 * Replace search values from string
 * @param {string} source
 * @param {string | string[]} searchValues
 * @param {string} replaceWith
 * @returns {string}
 */
const replace = (source: string, searchValues: string | string[], replaceWith: string): string =>
  toArray(searchValues).reduce((raw, value) => raw.replace(value, replaceWith), source);

export default replace;
