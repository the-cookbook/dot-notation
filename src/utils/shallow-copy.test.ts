import shallowCopy from './shallow-copy';
import typeOf from './type-of';

describe('utils/shallowCopy()', () => {
  it('should do shallow copy from an Object', () => {
    const source = { name: 'John Doe', age: '30' };
    const copy = shallowCopy(source);

    copy.name = 'John Cena';

    expect(source.name).not.toEqual(copy.name);
    expect(source.age).toEqual(copy.age);
  });

  it('should do shallow copy from an Array', () => {
    const source = ['hello', 'world'];
    const copy = shallowCopy(source);

    copy[1] = 'you!';

    expect(source[0]).toEqual(copy[0]);
    expect(source[1]).not.toEqual(copy[1]);
  });

  it('should do shallow copy from a Date object', () => {
    const source = new Date('1900-12-01 13:00:00');
    const copy = shallowCopy(source);

    copy.setFullYear(2000);

    expect(source.getHours()).toEqual(copy.getHours());
    expect(source.toUTCString()).not.toEqual(copy.toUTCString());
  });

  const dataTypes = ['string', 1, true, undefined, null];

  dataTypes.forEach((dataType) => {
    it(`should do shallow copy ${typeOf(dataType)}`, () => {
      const source = dataType;
      const copy = shallowCopy(source);

      expect(source).toEqual(copy);
    });
  });
});
