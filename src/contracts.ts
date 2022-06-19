/* eslint-disable @typescript-eslint/indent */
type ArrayDotNotation<T> = T extends Array<infer U>
  ? `[${number}]${ArrayDotNotation<U>}`
  : T extends Record<string, unknown>
  ? `.${DotNotationPathOf<T>}`
  : never;

type DotNotationPathOf<T extends object> = {
  [K in keyof T & string]: T[K] extends Array<infer U>
    ? K | `${K}[${number}]` | `${K}[${number}]${ArrayDotNotation<U>}`
    : T[K] extends Record<string, unknown>
    ? // @ts-ignore
      `${K}` | `${K}.${DotNotationPathOf<T[K]>}`
    : K;
}[keyof T & string];

type DotNotationDataTypeOf<
  T extends object,
  P extends DotNotationPathOf<T> | string,
> = P extends `${infer K}.${infer R}`
  ? // @ts-ignore
    DotNotationDataTypeOf<T[K], R>
  : P extends `${infer K}`
  ? // @ts-ignore
    T[K]
  : never;
/* eslint-enable @typescript-eslint/indent */

export type { DotNotationPathOf, DotNotationDataTypeOf };
