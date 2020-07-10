import parseKey from './parse-key';

describe('parseKey()', () => {
  it('should match snapshot', () => {
    expect(parseKey).toMatchSnapshot();
  });

  describe('exceptions', () => {
    it('should parse path even with unusual key char', () => {
      const path = 'person.address/[].street';
      const value = '1600 Amphitheatre';
      const expects = { person: { 'address/': [{ street: value }] } };

      expect(parseKey(path, value)).toStrictEqual(expects);
    });

    const expects: Record<string, Record<string, unknown>> = {
      '[a][*]': {
        value: 'bar',
        toBe: [['bar']],
      },
      '//[a][*]': {
        value: 'bar',
        toBe: { '//': [['bar']] },
      },
      '[0].name': {
        value: 'Jane Doe',
        toBe: [{ name: 'Jane Doe' }],
      },
      'person[0].name': {
        value: 'John Doe',
        toBe: { person: [{ name: 'John Doe' }] },
      },
      'person.[0].name': {
        value: 'John Doe',
        toBe: { person: [{ name: 'John Doe' }] },
      },
      '[0][2]': {
        value: 'foo',
        toBe: [['foo']],
      },
    };

    Object.keys(expects).forEach((path) => {
      it(`should parse "${path}" and ignore array indexes `, () => {
        const { value, toBe } = expects[path];

        expect(parseKey(path, value)).toStrictEqual(toBe);
      });
    });
  });

  describe('object paths', () => {
    const expects: Record<string, Record<string, unknown>> = {
      person: {
        value: 'n/a',
        toBe: { person: 'n/a' },
      },
      'person.name': {
        value: 'John Doe',
        toBe: { person: { name: 'John Doe' } },
      },
      'person.name.firstName': {
        value: 'John',
        toBe: { person: { name: { firstName: 'John' } } },
      },
    };

    Object.keys(expects).forEach((path) => {
      const { value, toBe } = expects[path];

      it(`should parse "${path}" accordingly`, () => {
        expect(parseKey(path, value)).toStrictEqual(toBe);
      });
    });
  });

  describe('array paths', () => {
    const expects: Record<string, Record<string, unknown>> = {
      '[]': {
        value: ['John Doe', 'Jane Doe'],
        toBe: [['John Doe', 'Jane Doe']],
      },
      '[][][]': {
        value: 'deep',
        toBe: [[['deep']]],
      },
      '[][][][][][]': {
        value: 'even deeper',
        toBe: [[[[[['even deeper']]]]]],
      },
    };

    Object.keys(expects).forEach((path) => {
      const { value, toBe } = expects[path];

      it(`should parse "${path}" accordingly`, () => {
        expect(parseKey(path, value)).toStrictEqual(toBe);
      });
    });
  });

  describe('nested paths', () => {
    const expects: Record<string, Record<string, unknown>> = {
      'persons[0]': {
        value: 'John Doe',
        toBe: { persons: ['John Doe'] },
      },
      'persons.list[0].individual': {
        value: 'John Doe',
        toBe: { persons: { list: [{ individual: 'John Doe' }] } },
      },
      'person.addresses[].street': {
        value: '1600 Amphitheatre',
        toBe: { person: { addresses: [{ street: '1600 Amphitheatre' }] } },
      },
      'person.addresses[].street[]': {
        value: '1600 Amphitheatre',
        toBe: { person: { addresses: [{ street: ['1600 Amphitheatre'] }] } },
      },
      'persons.addresses[][]': {
        value: '1600 Amphitheatre',
        toBe: { persons: { addresses: [['1600 Amphitheatre']] } },
      },
      'foo[][][][][]': {
        value: 'bar',
        toBe: { foo: [[[[['bar']]]]] },
      },
    };

    Object.keys(expects).forEach((path) => {
      const { value, toBe } = expects[path];

      it(`should parse "${path}" accordingly`, () => {
        expect(parseKey(path, value)).toStrictEqual(toBe);
      });
    });
  });
});
