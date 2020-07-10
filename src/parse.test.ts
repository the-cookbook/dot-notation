import parse from './parse';

describe('parse()', () => {
  it('should match snapshot', () => {
    expect(parse).toMatchSnapshot();
  });

  describe('exceptions', () => {
    it('should throw an error when array index is inconsistent', () => {
      const source = {
        'person.name.firstName': 'John',
        'person.name.lastName': 'Doe',
        'person.address[0].street': 'Infinite Loop',
        'person.address[1].city': 'Cupertino',
        'person.address[4].postalCode': 95014,
      };

      expect(() => parse(source)).toThrow(RangeError);
    });

    it('should parse overwrite array path', () => {
      const source = {
        '[0]': 'loren',
        '[1][0]': 'hello',
        '[1][1]': 'world',
        '[1]': 'ipsum', // expects to overwrite the array created above
        '[2]': 'amet',
        '[3]': 'safir',
        '[4]': 'asinha',
      };

      const expectation = ['loren', 'ipsum', 'amet', 'safir', 'asinha'];

      expect(parse(source)).toStrictEqual(expectation);
    });
  });

  describe('object path', () => {
    it('should parse simple object path accordingly', () => {
      const source = {
        'person.name': 'John',
        'person.lastName': 'Doe',
      };

      expect(parse(source)).toStrictEqual({
        person: {
          name: 'John',
          lastName: 'Doe',
        },
      });
    });

    it('should parse complex object path accordingly', () => {
      const source = {
        'person.name.firstName': 'John',
        'person.name.lastName': 'Doe',
        'person.address.street': 'Infinite Loop',
        'person.address.city': 'Cupertino',
        'person.address.postalCode': 95014,
      };

      expect(parse(source)).toStrictEqual({
        person: {
          name: {
            firstName: 'John',
            lastName: 'Doe',
          },
          address: {
            street: 'Infinite Loop',
            city: 'Cupertino',
            postalCode: 95014,
          },
        },
      });
    });
  });

  describe('array path', () => {
    it('should parse array path accordingly', () => {
      const source = {
        '[0]': 'Bacon',
        '[1][0]': 'ipsum',
        '[1][1][0]': 'dolor',
        '[1][1][1][0]': 'amet',
      };

      const expectation = ['Bacon', ['ipsum', ['dolor', ['amet']]]];

      expect(parse(source)).toStrictEqual(expectation);
    });
  });

  describe('nested path', () => {
    it('should parse object path accordingly', () => {
      const source = {
        'person.addresses[0].street': 'Infinite Loop',
        'person.addresses[].city': 'Cupertino',
        'person.addresses[0].postalCode': 95014,
        'person.name.firstName': 'John',
        'person.name.lastName': 'Doe',
      };

      expect(parse(source)).toStrictEqual({
        person: {
          name: {
            firstName: 'John',
            lastName: 'Doe',
          },
          addresses: [
            {
              street: 'Infinite Loop',
              city: 'Cupertino',
              postalCode: 95014,
            },
          ],
        },
      });
    });

    it('should parse object with array indexes', () => {
      const source = {
        'person.name.firstName': 'John',
        'person.name.lastName': 'Doe',
        'person.addresses[0].street': 'Infinite Loop',
        'person.addresses[0].city': 'Cupertino',
        'person.addresses[0].postalCode': 95014,
        'person.addresses[1].street': '1600 Amphitheatre',
        'person.addresses[1].city': 'Mountain View',
        'person.addresses[1].postalCode': 94043,
      };

      expect(parse(source)).toStrictEqual({
        person: {
          name: {
            firstName: 'John',
            lastName: 'Doe',
          },
          addresses: [
            {
              street: 'Infinite Loop',
              city: 'Cupertino',
              postalCode: 95014,
            },
            {
              street: '1600 Amphitheatre',
              city: 'Mountain View',
              postalCode: 94043,
            },
          ],
        },
      });
    });

    it('should parse object with deep arrays', () => {
      const source = {
        'person.name.firstName': 'John',
        'person.name.lastName': 'Doe',
        'person.addresses[0].street': 'Infinite Loop',
        'person.addresses[0].city': 'Cupertino',
        'person.addresses[0].postalCode': 95014,
        'person.addresses[1][0].street': '1600 Amphitheatre',
        'person.addresses[1][1].city': 'Mountain View',
        'person.addresses[1][2].postalCode': 94043,
      };

      expect(parse(source)).toStrictEqual({
        person: {
          name: {
            firstName: 'John',
            lastName: 'Doe',
          },
          addresses: [
            {
              street: 'Infinite Loop',
              city: 'Cupertino',
              postalCode: 95014,
            },
            [
              {
                street: '1600 Amphitheatre',
              },
              {
                city: 'Mountain View',
              },
              {
                postalCode: 94043,
              },
            ],
          ],
        },
      });
    });
  });
});
