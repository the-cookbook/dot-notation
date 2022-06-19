import typeOf from './type-of';

type Nullish = null | undefined;

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
const is = {
  // @ts-ignore
  nullish<T>(value: T): value is Nullish {
    return value === null || value === undefined;
  },
  // @ts-ignore
  string<T>(value: T): value is string {
    return typeOf(value) === 'string';
  },
  // @ts-ignore
  number<T>(value: T): value is number {
    return typeOf(value) === 'number';
  },
  // @ts-ignore
  object<T>(value: T): value is object {
    return typeOf(value) === 'object';
  },
  // @ts-ignore
  array<T>(value: T): value is Array<any> {
    return Array.isArray(value);
  },
};
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

export default is;
