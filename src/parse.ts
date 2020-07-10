import pick from './pick';
import parseKey from './parse-key';
import getArrayIndex from './utils/get-array-index';
import is from './utils/is';
import merge from './utils/merge';
import createPathBreadcrumb from './utils/create-path-breadcrumb';

const compile = (
  source: Record<string, unknown> | unknown[],
  instructions: string[],
  value: unknown,
): Record<string, unknown> | unknown[] => {
  const data = is.array(source) ? [...source] : { ...source };

  if (is.object(data)) {
    return merge(data, parseKey(instructions.join('.'), value) as Partial<Record<string, unknown>>);
  }

  const { 1: idx, index } = getArrayIndex(instructions.join('.'));

  if (+idx > data.length) {
    throw new RangeError(
      `Expected array index for path "${instructions.join('.')}" to be "${data.length}" but found instead "${idx}"`,
    );
  }

  if (is.nullOrUndefined(data[+idx])) {
    data.push(...(parseKey(instructions.splice(index).join('.'), value) as unknown[]));
  } else {
    const hasChild = instructions.length > 1;

    const result = hasChild ? compile((data as unknown[])[+idx] as unknown[], instructions.slice(1), value) : value;

    if (is.object(result)) {
      data[+idx] = { ...result };
    } else if (is.array(result)) {
      data[+idx] = [...result];
    } else {
      data[+idx] = result;
    }
  }

  return data;
};

/**
 * Parse object from dot notation
 * @template T
 * @param {object} source - Dot notation object
 * @returns {object}
 * @param source
 * @return {T|T[]}
 */
const parse = <T>(source: Record<string, unknown>): T extends [] ? T[] : T => {
  const paths = Object.keys(source);

  let result: unknown = getArrayIndex(createPathBreadcrumb(paths[0])[0]) ? [] : {};

  for (let i = 0; i < paths.length; i += 1) {
    const path = paths[i];
    const hasArrayNotation = getArrayIndex(path);
    const value = source[path];

    let parsedValue = parseKey(path, value);

    if (hasArrayNotation) {
      const commonPath = path.substr(0, hasArrayNotation.index);
      const workingPath = createPathBreadcrumb(path.replace(commonPath, ''));
      const workingNode: unknown[] = commonPath ? pick(result, commonPath) || [] : (result as unknown[]);

      parsedValue = compile(workingNode, workingPath, value);

      if (commonPath) {
        parsedValue = parseKey(commonPath, parsedValue);
      }
    }

    if (is.array(parsedValue)) {
      result = parsedValue;
    }

    result = merge<Record<string, unknown>>(
      result as Partial<Record<string, unknown>>,
      parsedValue as Partial<Record<string, unknown>>,
    );
  }

  return result as T extends [] ? T[] : T;
};

export default parse;
