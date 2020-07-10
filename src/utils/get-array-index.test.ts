import getArrayIndex from './get-array-index';

describe('utils/getArrayIndex()', () => {
  it('should match snapshot', () => {
    expect(getArrayIndex).toMatchSnapshot();
  });

  describe('exceptions', () => {
    it('return undefined when array index is NaN', () => {
      const paths: Record<string, Record<string, string>> = {
        'wrongArrayIndex[a]': {
          fullMatch: '[a]',
          value: 'a',
        },
        'hello[*]': {
          fullMatch: '[*]',
          value: '*',
        },
        'foo[bar]': {
          fullMatch: '[bar]',
          value: 'bar',
        },
        'world[.]': {
          fullMatch: '[.]',
          value: '.',
        },
      };

      Object.keys(paths).forEach((path) =>
        expect(JSON.stringify(getArrayIndex(path))).toEqual(JSON.stringify([paths[path].fullMatch, paths[path].value])),
      );
    });

    it('return undefined when no array signature is present', () => {
      const paths = ['person', 'name', 'foo', 'bar'];

      paths.forEach((path) => expect(getArrayIndex(path)).toBeFalsy());
    });
  });

  describe('single arrays', () => {
    it('should return array index', () => {
      const paths: Record<string, Record<string, string>> = {
        'address[]': {
          fullMatch: '[]',
          value: '',
        },
        'address[0]': {
          fullMatch: '[0]',
          value: '0',
        },
      };

      Object.keys(paths).forEach((path) =>
        expect(JSON.stringify(getArrayIndex(path))).toEqual(JSON.stringify([paths[path].fullMatch, paths[path].value])),
      );
    });
  });

  describe('nested arrays', () => {
    it('should return nested array indexes', () => {
      const expects: Record<string, Record<string, string>> = {
        'address[][1]': {
          fullMatch: '[]',
          value: '',
        },
        'address[][]': {
          fullMatch: '[]',
          value: '',
        },
        'address[][][]': {
          fullMatch: '[]',
          value: '',
        },
        'address[][2][]': {
          fullMatch: '[]',
          value: '',
        },
        'address[1][2][8]': {
          fullMatch: '[1]',
          value: '1',
        },
        'address[6][2][8][][][]': {
          fullMatch: '[6]',
          value: '6',
        },
      };

      Object.keys(expects).forEach((path) =>
        expect(JSON.stringify(getArrayIndex(path))).toEqual(
          JSON.stringify([expects[path].fullMatch, expects[path].value]),
        ),
      );
    });
  });
});
