/**
 * Ger Array Index
 * @description get array index from given string
 * @param {string} str
 * @return {string[]|null}
 */
const getArrayIndex = (str: string): RegExpExecArray | null => {
  return getArrayIndex.regexNaNIndex.exec(str) || getArrayIndex.regexIntegerIndex.exec(str);
};

getArrayIndex.regexIntegerIndex = /\[([-]*\d*)\]/g;

getArrayIndex.regexNaNIndex = /\[([^\]]*)\]/;

export default getArrayIndex;
