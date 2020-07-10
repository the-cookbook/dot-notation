/**
 * Replace
 * @description replaces string search values
 * @param {string} source
 * @param {string[]} searchValues
 * @param {string} replaceWith
 * @returns {string}
 */
const replace = (source: string, searchValues: string[], replaceWith: string): string =>
  searchValues.reduce((raw, value) => raw.replace(value, replaceWith), source);

export default replace;
