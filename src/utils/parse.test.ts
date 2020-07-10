import parse from './parse';

describe('utils/parse', () => {
  describe('parse.toKebabCase()', () => {
    const defaultExpectations: { [key: string]: string } = {
      camelCase: 'camel-case',
      'Bacon ipsum dolor amet': 'bacon-ipsum-dolor-amet',
      'some-mixed_string With spaces_underscores-and-hyphens': 'some-mixed-string-with-spaces-underscores-and-hyphens',
      'AllThe-small Things': 'all-the-small-things',
      IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML:
        'i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html',
      '@@my custom key': 'my-custom-key',
    };

    const customExpectations: { [key: string]: string } = {
      camelCase: 'camel.case',
      'Bacon ipsum dolor amet': 'bacon.ipsum.dolor.amet',
      'some-mixed_string With spaces_underscores-and-hyphens': 'some.mixed.string.with.spaces.underscores.and.hyphens',
      'AllThe-small Things': 'all.the.small.things',
      IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML:
        'i.am.listening.to.fm.while.loading.different.url.on.my.browser.and.also.editing.some.xml.and.html',
      '@@my custom key': 'my.custom.key',
    };

    Object.keys(defaultExpectations).forEach((source) => {
      const expected = defaultExpectations[source];

      it(`should parse "${source}" to ${expected}`, () => {
        expect(parse.toKebabCase(source)).toEqual(expected);
      });
    });

    Object.keys(customExpectations).forEach((source) => {
      const expected = customExpectations[source];

      it(`should parse "${source}" with custom delimiter`, () => {
        expect(parse.toKebabCase(source, '.')).toEqual(expected);
      });
    });
  });

  describe('parse.toCamelCase()', () => {
    const defaultExpectations: { [key: string]: string } = {
      camelCase: 'camelCase',
      'Bacon ipsum dolor amet': 'baconIpsumDolorAmet',
      'some-mixed_string With spaces_underscores-and-hyphens': 'someMixedStringWithSpacesUnderscoresAndHyphens',
      'AllThe-small Things': 'allTheSmallThings',
      IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML:
        'iAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML',
      '@@my custom key': 'myCustomKey',
    };

    const customExpectations: { [key: string]: string } = {
      camelCase: 'CamelCase',
      'Bacon ipsum dolor amet': 'BaconIpsumDolorAmet',
      'some-mixed_string With spaces_underscores-and-hyphens': 'SomeMixedStringWithSpacesUnderscoresAndHyphens',
      'AllThe-small Things': 'AllTheSmallThings',
      IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML:
        'IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML',
      '@@my custom key': 'MyCustomKey',
    };

    Object.keys(defaultExpectations).forEach((source) => {
      const expected = defaultExpectations[source];

      it(`should parse "${source}" to ${expected}`, () => {
        expect(parse.toCamelCase(source)).toEqual(expected);
      });
    });

    Object.keys(customExpectations).forEach((source) => {
      const expected = customExpectations[source];

      it(`should parse "${source}" without lowerCamelCase option`, () => {
        expect(parse.toCamelCase(source, false)).toEqual(expected);
      });
    });
  });

  describe('parse.objectKeysCase()', () => {
    it(`should parse object keys case with default modifier: camelCase()`, () => {
      const source = {
        id: '123',
        'next-page': 'payment',
      };

      const expected = {
        id: '123',
        nextPage: 'payment',
      };

      expect(parse.objectKeysCase(source)).toEqual(expected);
    });

    it(`should parse object keys case with custom modifier: kebab-case()`, () => {
      const source = {
        id: '123',
        'next-page': 'payment',
        shoppingCardId: '3453',
      };

      const expected = {
        id: '123',
        'next-page': 'payment',
        'shopping-card-id': '3453',
      };

      expect(parse.objectKeysCase(source, parse.toKebabCase)).toEqual(expected);
    });

    it(`should parse object keys case with custom modifier: toLowerCase()`, () => {
      const source = {
        id: '123',
        nextPage: 'payment',
        shoppingCardId: '3453',
      };

      const expected = {
        id: '123',
        nextpage: 'payment',
        shoppingcardid: '3453',
      };

      const customModifier = (value: string): string => value.toLowerCase();

      expect(parse.objectKeysCase(source, customModifier)).toEqual(expected);
    });
  });
});
