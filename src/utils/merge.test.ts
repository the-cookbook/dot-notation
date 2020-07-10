import merge from './merge';

describe('utils/merge()', () => {
  it('should match snapshot', () => {
    expect(merge).toMatchSnapshot();
  });

  describe('exceptions', () => {
    it('should merge uneven objects', () => {
      const leftSide = {
        hobbies: ['barbecue'],
      };

      const rightSide = {
        hobbies: ['movie', 'coding'],
      };

      const expects = {
        hobbies: ['movie', 'coding'],
      };

      expect(merge<Record<string, unknown>>(leftSide, rightSide)).toStrictEqual(expects);
    });
  });

  describe('object', () => {
    it('should return merge objects accordingly', () => {
      const leftSide = { name: 'John' };
      const rightSide = { lastName: 'Doe' };

      const expects = { ...leftSide, ...rightSide };

      expect(merge<Record<string, unknown>>(leftSide, rightSide)).toStrictEqual(expects);
    });

    it('should merge deep object', () => {
      const leftSide = { earth: { human: { person: { name: 'John' } } } };
      const rightSide = { earth: { human: { person: { lastName: 'Doe' } } } };

      const expects = { earth: { human: { person: { name: 'John', lastName: 'Doe' } } } };

      expect(merge<Record<string, unknown>>(leftSide, rightSide)).toStrictEqual(expects);
    });
  });

  describe('array', () => {
    describe('pure array data type', () => {
      it('should always replace from the right side value', () => {
        const leftSide = [1, 2, 3];
        const rightSide = [4, 5, 6];

        expect(merge(leftSide, rightSide)).toStrictEqual(rightSide);
      });
    });
    describe('nested data type', () => {
      it('should always replace from the right side value', () => {
        const leftSide = {
          collection: ['books'],
          hobbies: ['barbecue'],
        };

        const rightSide = {
          preferences: ['email'],
          hobbies: ['movie', 'coding'],
        };

        const expects = {
          collection: ['books'],
          preferences: ['email'],
          hobbies: ['movie', 'coding'],
        };

        expect(merge<Record<string, unknown>>(leftSide, rightSide)).toStrictEqual(expects);
      });
    });
  });

  describe('nested', () => {
    it('should merge simple nested object array', () => {
      const leftSide = { name: 'John', hobbies: ['barbecue'] };
      const rightSide = { lastName: 'Doe', hobbies: ['movie'] };

      const expects = { name: 'John', lastName: 'Doe', hobbies: ['movie'] };

      expect(merge(leftSide, rightSide)).toStrictEqual(expects);
    });

    it('should merge complex nested object array', () => {
      const leftSide = {
        person: { name: 'John', random: ['bacon', 1, { language: 'javascript' }, true] },
      };

      const rightSide = {
        person: { lastName: 'Doe', random: ['cheeseburger', 2, { ide: 'webstorm' }, false] },
      };

      const expects = {
        person: {
          name: 'John',
          lastName: 'Doe',
          random: ['cheeseburger', 2, { ide: 'webstorm' }, false],
        },
      };

      expect(merge<Record<string, unknown>>(leftSide, rightSide)).toStrictEqual(expects);
    });
  });
});
