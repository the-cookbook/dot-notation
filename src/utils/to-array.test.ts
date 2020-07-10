import toArray from './to-array';

describe('utils/toArray()', () => {
  it('should parse type to array', () => {
    const source = 'lorem ipsum';
    const expected = [source];

    expect(toArray(source)).toStrictEqual(expected);
  });

  it('should not parse if type is already an array', () => {
    const source = ['lorem ipsum'];
    const expected = source;

    expect(toArray(source)).toStrictEqual(expected);
  });
});
