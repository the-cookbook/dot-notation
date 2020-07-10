import is from './is';

describe('utils/is', () => {
  describe('is.nullOrUndefined()', () => {
    it('should flag data type correctly', () => {
      expect(is.nullOrUndefined(null)).toBe(true);
      expect(is.nullOrUndefined(undefined)).toBe(true);
      expect(is.nullOrUndefined('')).toBe(false);
      expect(is.nullOrUndefined('123')).toBe(false);
    });
  });

  describe('is.externalUrl()', () => {
    let spyOnWindow: jest.SpyInstance;

    beforeEach(() => {
      spyOnWindow = jest.spyOn(global, 'window', 'get');

      spyOnWindow.mockImplementation(() => ({
        location: {
          href: 'http://localhost/',
        },
      }));
    });

    const assertion: Record<string, boolean> = {
      'www.google.com': true,
      'http://www.google.com': true,
      'https://www.google.com': true,
      '/article/lorem-ipsum-et-delores': false,
      'article/lorem-ipsum-et-delores': false,
      '/': false,
    };

    Object.keys(assertion).forEach((key) => {
      it(`should flag "${key}" string as ${assertion[key]}`, () => {
        expect(is.externalUrl(key)).toBe(assertion[key]);
      });
    });
  });

  describe('is.absoluteUrl()', () => {
    const assertion: { [key: string]: boolean } = {
      'http://www.google.com;': true,
      'https://www.google.com;': true,
      'file://localhost/etc/fstab': true,
      'mailto:email@email.com': true,
      // eslint-disable-next-line no-script-url
      'javascript: void(0);': true,
      '/article/lorem-ipsum-et-delores': false,
      'article/lorem-ipsum-et-delores': false,
      '/': false,
    };

    Object.keys(assertion).forEach((key) => {
      it(`should flag "${key}" string as ${assertion[key]}`, () => {
        expect(is.absoluteUrl(key)).toBe(assertion[key]);
      });
    });
  });
});
