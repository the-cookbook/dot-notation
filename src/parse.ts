import pick from './pick';
import parseKey from './parse-key';
import getArrayIndex from './utils/get-array-index';
import is from './utils/is';
import merge from './utils/merge';
import createPathBreadcrumb from './utils/create-path-breadcrumb';
import shallowCopy from './utils/shallow-copy';

const compileEntry = (
  source: object | Array<unknown>,
  instructions: string[],
  value: unknown,
): Record<string, unknown> | Array<unknown> => {
  const data = shallowCopy(source);

  if (!is.array(data)) {
    return merge(data, parseKey<object>(instructions.join('.'), value)) as Record<string, unknown>;
  }

  const { 1: idx, index } = getArrayIndex(instructions.join('.'));

  if (+idx > data.length) {
    throw new RangeError(
      `Expected array index for path "${instructions.join('.')}" to be "${data.length}" but found instead "${idx}"`,
    );
  }

  if (is.nullish(data[+idx])) {
    data.push(...parseKey<unknown[]>(instructions.splice(index).join('.'), value));
  } else {
    const hasChild = instructions.length > 1;

    const result: unknown = hasChild ? compileEntry(data[+idx] as Array<unknown>, instructions.slice(1), value) : value;

    if (is.object(result)) {
      data[+idx] = { ...result };
    } else if (is.array(result)) {
      data[+idx] = [...(result as Array<unknown>)];
    } else {
      data[+idx] = result;
    }
  }

  return data;
};

/**
 * Parse object from dot notation
 * @template T
 * @param {Object.<string, unknown>} source
 * @return {T|T[]}
 */
const parse = <T extends object>(source: object): T extends [] ? T[] : T => {
  const content = shallowCopy(source) as Record<string, unknown>;

  const paths = Object.keys(content);

  let result = getArrayIndex(createPathBreadcrumb(paths[0])[0]) ? [] : {};

  for (let i = 0; i < paths.length; i += 1) {
    const path = paths[i];
    const hasArrayNotation = getArrayIndex(path);
    const value = shallowCopy(content[path]);

    let parsedValue = parseKey(path, value);

    if (hasArrayNotation) {
      const commonPath = path.substring(0, hasArrayNotation.index);
      const workingPath = createPathBreadcrumb(path.replace(commonPath, ''));
      const workingNode = commonPath ? pick(result, commonPath) || [] : result;

      parsedValue = compileEntry(workingNode, workingPath, value);

      if (commonPath) {
        parsedValue = parseKey(commonPath, parsedValue);
      }
    }

    if (is.array(parsedValue)) {
      result = parsedValue;
    }

    result = merge(result, parsedValue);
  }

  return result as T extends [] ? T[] : T;
};

export default parse;
