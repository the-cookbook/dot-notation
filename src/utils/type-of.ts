/**
 * Returns a string with the data type from given value.
 * @example
 * typeOf('hello');       // output: string
 * typeOf(function() {}); // output: function
 * typeOf(new Date());    // output: date
 * @param value
 * @return {string}
 */
const typeOf = (value: unknown | unknown[]): string =>
  ({}.toString
    .call(value)
    .match(/\s([A-Za-z]+)/)[1]
    .toLowerCase());

export default typeOf;
