import replace from './replace';

const source = 'Spicy jalapeno bacon ipsum dolor amet spare ribs ham doner venison ground round strip steak';

describe('utils/replace()', () => {
  it('should match snapshot', () => {
    expect(replace).toMatchSnapshot();
  });

  it('should work with all search value types', () => {
    const search = ['oh-snap', null, undefined];

    expect(replace(source, search, '')).toBe(source);
  });

  it('should return original source value when there is no match', () => {
    const search = ['oh-snap'];

    expect(replace(source, search, '')).toBe(source);
  });

  it('should replace search values with replace value', () => {
    const search = ['ipsum dolor amet'];
    const expects = 'Spicy jalapeno bacon cheese burger spare ribs ham doner venison ground round strip steak';

    expect(replace(source, search, 'cheese burger')).toBe(expects);
  });
});
