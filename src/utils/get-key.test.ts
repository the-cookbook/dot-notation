import getKey from './get-key';

describe('utils/getKey()', () => {
  it('should match snapshot', () => {
    expect(getKey).toMatchSnapshot();
  });

  describe('exceptions', () => {
    it(`should parse empty path as undefined`, () => {
      expect(getKey('')).toStrictEqual([undefined, undefined]);
    });
  });

  describe('object path', () => {
    const expectations: Record<string, [string, string | undefined]> = {
      'person.name.firstName': ['person', 'name.firstName'],
      'name.firstName': ['name', 'firstName'],
      firstName: ['firstName', undefined],
    };

    Object.keys(expectations).forEach((path) => {
      it(`should parse "${path} accordingly`, () => {
        expect(getKey(path)).toStrictEqual(expectations[path]);
      });
    });
  });

  describe('array path', () => {
    const expectations: Record<string, [string, string | undefined]> = {
      '[]': ['[]', undefined],
      '[][][][]': ['[]', '[].[].[]'],
      '[0][1][2][3]': ['[0]', '[1].[2].[3]'],
      '[a][b][c][d]': ['[a]', '[b].[c].[d]'],
      '[*][/][&][@]': ['[*]', '[/].[&].[@]'],
    };

    Object.keys(expectations).forEach((path) => {
      it(`should parse "${path} accordingly`, () => {
        expect(getKey(path)).toStrictEqual(expectations[path]);
      });
    });
  });

  describe('nested path', () => {
    const expectations: Record<string, [string, string | undefined]> = {
      'person[].name.firstName': ['person', '[].name.firstName'],
      'name[].firstName[]': ['name', '[].firstName.[]'],
      'firstName[]': ['firstName', '[]'],
      '[]': ['[]', undefined],
      '[][][][]': ['[]', '[].[].[]'],
      '[0][1][2][3]': ['[0]', '[1].[2].[3]'],
      '[a][b][c][d]': ['[a]', '[b].[c].[d]'],
      '[*][/][&][@]': ['[*]', '[/].[&].[@]'],
    };

    Object.keys(expectations).forEach((path) => {
      it(`should parse "${path} accordingly`, () => {
        expect(getKey(path)).toStrictEqual(expectations[path]);
      });
    });
  });
});
