/**
 * Ger Array Index
 * @description get array index from dot notation path string
 * @param {string} str
 * @return {RegExpExecArray|null}
 */
const getArrayIndex = (str: string): RegExpExecArray | null => {
  return getArrayIndex.regexpNaNIndex.exec(str) || getArrayIndex.regexpIntIndex.exec(str);
};

getArrayIndex.regexpIntIndex = /\[(-*\d*)]/g;

getArrayIndex.regexpNaNIndex = /\[([^\]]*)]/;

export default getArrayIndex;
