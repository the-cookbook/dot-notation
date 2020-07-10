import pick from './pick';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecursiveObject = any;

const array: RecursiveObject = [
  [[['foo']]],
  [
    {
      hello: 'world',
    },
    true,
    1000,
  ],
];

const source: RecursiveObject = {
  person: {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: [
      {
        street: 'Infinite Loop',
        city: 'Cupertino',
        state: 'CA',
        postalCode: 95014,
        country: 'United States',
      },
      {
        street: '1600 Amphitheatre',
        city: 'Mountain View',
        state: 'CA',
        postalCode: 94043,
        country: 'United States',
      },
    ],
    nested: [
      [
        {
          foo: 'bar',
        },
        'secret',
      ],
    ],
  },
  array: [...array],
};

describe('pick()', () => {
  it('should match snapshot', () => {
    expect(pick).toMatchSnapshot();
  });

  describe('exceptions', () => {
    it('throw an error when path is null, undefined or empty', () => {
      expect(() => pick(source, undefined)).toThrow(SyntaxError);
      expect(() => pick(source, '')).toThrow(SyntaxError);
    });

    it('throw an error when no array index is present', () => {
      const path = 'person.address[].street';

      expect(() => pick(source, path)).toThrow(SyntaxError);
    });

    it('throw an error array index is negative', () => {
      const path = 'person.address[-1].street';

      expect(() => pick<string>(source, path)).toThrow(RangeError);
    });

    it('throw an error array index is NaN', () => {
      const paths = ['person.address[a].street', 'person.address[true]', 'person.address[*]'];

      paths.forEach((path) => {
        expect(() => pick(source, path)).toThrow(TypeError);
      });
    });

    it("should return undefined when path don't exists", () => {
      const pathDontExists = 'person.hobbies';
      const pathHasATypo = 'person.adddress';

      expect(pick(source, pathDontExists)).toBe(undefined);
      expect(pick(source, pathHasATypo)).toBe(undefined);
    });

    const expects: Record<string, unknown> = {
      array: source.array,
      'array.[0]': source.array[0],
      'array.[0].[0]': source.array[0][0],
      'array.[0].[0].[0]': source.array[0][0][0],
      'array.[0].[0].[0].[0]': source.array[0][0][0][0],
      'array.[1]': source.array[1],
      'array.[1].[0]': source.array[1][0],
      'array.[1].[0].hello': source.array[1][0].hello,
      'array.[1].[2]': source.array[1][2],
    };

    Object.keys(expects).forEach((path) => {
      it(`should pick path "${path}" even with array notation preceded by dot notation `, () => {
        expect(pick(source, path)).toStrictEqual(expects[path]);
      });
    });
  });

  describe('object path', () => {
    const expects: Record<string, unknown> = {
      person: source.person,
      'person.name': source.person.name,
      'person.name.firstName': source.person.name.firstName,
      'person.nested': source.person.nested,
      'person.nested[0]': source.person.nested[0],
      'person.nested[0][0]': source.person.nested[0][0],
      'person.nested[0][1]': source.person.nested[0][1],
      'person.nested[0][0].foo': source.person.nested[0][0].foo,
    };

    Object.keys(expects).forEach((path) => {
      it(`should pick "${path}" accordingly `, () => {
        expect(pick(source, path)).toStrictEqual(expects[path]);
      });
    });
  });

  describe('array path', () => {
    const expects: Record<string, unknown> = {
      array: source.array,
      'array[0]': source.array[0],
      'array[0][0]': source.array[0][0],
      'array[0][0][0]': source.array[0][0][0],
      'array[0][0][0][0]': source.array[0][0][0][0],
      'array[1]': source.array[1],
      'array[1][0]': source.array[1][0],
      'array[1][0].hello': source.array[1][0].hello,
      'array[1][2]': source.array[1][2],
    };

    Object.keys(expects).forEach((path) => {
      it(`should pick "${path}" accordingly `, () => {
        expect(pick(source, path)).toStrictEqual(expects[path]);
      });
    });

    const expectsArray: Record<string, unknown> = {
      '[0]': array[0],
      '[0][0]': array[0][0],
      '[0][0][0]': array[0][0][0],
      '[0][0][0][0]': array[0][0][0][0],
      '[1]': array[1],
      '[1][0]': array[1][0],
      '[1][0].hello': array[1][0].hello,
      '[1][2]': array[1][2],
    };

    Object.keys(expectsArray).forEach((path) => {
      it(`should pick "${path}" as pure array notation `, () => {
        expect(pick(array, path)).toStrictEqual(expectsArray[path]);
      });
    });
  });

  describe('nested path', () => {
    const paths: Record<string, unknown> = {
      'person.address[0]': source.person.address[0],
      'person.address[0].postalCode': source.person.address[0].postalCode,
      'person.address[1]': source.person.address[1],
      'person.address[1].postalCode': source.person.address[1].postalCode,
    };

    Object.keys(paths).forEach((path) => {
      it(`should pick "${path}" accordingly `, () => {
        expect(pick(source, path)).toStrictEqual(paths[path]);
      });
    });
  });
});
