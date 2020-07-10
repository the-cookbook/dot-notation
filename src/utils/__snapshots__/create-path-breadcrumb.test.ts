import createPathBreadcrumb from '../create-path-breadcrumb';

describe('utils/createPathBreadcrumb()', () => {
  it('should match snapshot', () => {
    expect(createPathBreadcrumb).toMatchSnapshot();
  });

  describe('exceptions', () => {
    it('should parse empty "[]" with default array index "[0]"', () => {
      const expectations: Record<string, string[]> = {
        '[][][]': ['[0]', '[0]', '[0]'],
        'person.secret[][][].key': ['person', 'secret', '[0]', '[0]', '[0]', 'key'],
        'person.addresses[].street': ['person', 'addresses', '[0]', 'street'],
        'person.addresses[].number': ['person', 'addresses', '[0]', 'number'],
        'person.addresses[].postalCode': ['person', 'addresses', '[0]', 'postalCode'],
      };

      Object.keys(expectations).forEach((path) => {
        expect(createPathBreadcrumb(path)).toStrictEqual(expectations[path]);
      });
    });
  });

  describe('object', () => {
    const expectations: Record<string, string[]> = {
      person: ['person'],
      'person.name': ['person', 'name'],
      'person.name.firstName': ['person', 'name', 'firstName'],
      'person.address': ['person', 'address'],
    };

    Object.keys(expectations).forEach((path) => {
      it(`should parse "${path} accordingly`, () => {
        expect(createPathBreadcrumb(path)).toStrictEqual(expectations[path]);
      });
    });
  });

  describe('array', () => {
    const expectations: Record<string, string[]> = {
      '[0]': ['[0]'],
      '[0][0]': ['[0]', '[0]'],
      '[1][0][0]': ['[1]', '[0]', '[0]'],
      '[1][1][0][0]': ['[1]', '[1]', '[0]', '[0]'],
    };

    Object.keys(expectations).forEach((path) => {
      it(`should parse "${path} accordingly`, () => {
        expect(createPathBreadcrumb(path)).toStrictEqual(expectations[path]);
      });
    });
  });

  describe('nested', () => {
    const expectations: Record<string, string[]> = {
      person: ['person'],
      'person.name': ['person', 'name'],
      'person.name.firstName': ['person', 'name', 'firstName'],
      'person.addresses[].street': ['person', 'addresses', '[0]', 'street'],
      'person.addresses[].number': ['person', 'addresses', '[0]', 'number'],
      'person.addresses[].postalCode': ['person', 'addresses', '[0]', 'postalCode'],
    };

    Object.keys(expectations).forEach((path) => {
      it(`should parse "${path} accordingly`, () => {
        expect(createPathBreadcrumb(path)).toStrictEqual(expectations[path]);
      });
    });
  });
});
