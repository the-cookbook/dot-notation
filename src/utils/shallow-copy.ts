import is from './is';
import typeOf from './type-of';

/**
 * Shallow copy
 * @description Create a copy of a original collection with same structure.
 * @param value
 */
const shallowCopy = <T>(value: T): T extends [] ? T[] : T => {
  let copy: unknown;

  if (is.array(value)) {
    copy = [...value];
  } else if (is.object(value)) {
    copy = { ...value };
  } else if (typeOf(value) === 'date') {
    copy = new Date((value as unknown) as Date);
  } else {
    copy = value;
  }

  return copy as T extends [] ? T[] : T;
};

export default shallowCopy;
