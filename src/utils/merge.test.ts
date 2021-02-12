import merge from './merge';

describe('utils/merge()', () => {
  it('should match snapshot', () => {
    expect(merge).toMatchSnapshot();
  });

  describe('exceptions', () => {
    it('should merge uneven objects', () => {
      const lhs = {
        hobbies: ['barbecue'],
      };

      const rhs = {
        hobbies: ['movie', 'coding'],
      };

      const expects = {
        hobbies: ['movie', 'coding'],
      };

      expect(merge(lhs, rhs)).toStrictEqual(expects);
    });
  });

  describe('object', () => {
    it('should return merge objects accordingly', () => {
      const lhs = { name: 'John' };
      const rhs = { lastName: 'Doe' };

      const expects = { ...lhs, ...rhs };

      expect(merge(lhs, rhs)).toStrictEqual(expects);
    });

    it('should merge deep object', () => {
      const lhs = { earth: { human: { person: { name: 'John' } } } };
      const rhs = { earth: { human: { person: { lastName: 'Doe' } } } };

      const expects = { earth: { human: { person: { name: 'John', lastName: 'Doe' } } } };

      expect(merge(lhs, rhs)).toStrictEqual(expects);
    });
  });

  describe('array', () => {
    describe('pure array data type', () => {
      it('should always replace from the right side value', () => {
        const lhs = [1, 2, 3];
        const rhs = [4, 5, 6];

        expect(merge(lhs, rhs)).toStrictEqual(rhs);
      });
    });

    describe('nested data type', () => {
      it('should always replace from the right side value', () => {
        const lhs = {
          collection: ['books'],
          hobbies: ['barbecue'],
        };

        const rhs = {
          preferences: ['email'],
          hobbies: { favourite: 'coding' },
        };

        const expects = {
          collection: ['books'],
          preferences: ['email'],
          hobbies: { favourite: 'coding' },
        };

        expect(merge(lhs, rhs)).toStrictEqual(expects);
      });
    });
  });

  describe('nested', () => {
    it('should merge simple nested object array', () => {
      interface NestedSource {
        name: string;
        lastName: string;
        hobbies: string[];
      }

      const lhs: Partial<NestedSource> = { name: 'John', hobbies: ['barbecue'] };
      const rhs: Partial<NestedSource> = { lastName: 'Doe', hobbies: ['movie'] };

      const expects: NestedSource = { name: 'John', lastName: 'Doe', hobbies: ['movie'] };

      expect(merge<NestedSource>(lhs, rhs)).toStrictEqual(expects);
    });

    it('should merge complex nested object array', () => {
      const lhs = {
        person: { name: 'John', random: ['bacon', 1, { language: 'javascript' }, true] },
      };

      const rhs = {
        person: { lastName: 'Doe', random: ['cheeseburger', 2, { ide: 'webstorm' }, false] },
      };

      const expects = {
        person: {
          name: 'John',
          lastName: 'Doe',
          random: ['cheeseburger', 2, { ide: 'webstorm' }, false],
        },
      };

      expect(merge(lhs, rhs)).toStrictEqual(expects);
    });
  });
});
