import HelloWorld from './hello-world';

describe('HelloWorld', () => {
  it('should output expected result', () => {
    expect(HelloWorld).toStrictEqual({
      hello: 'world',
    });
  });
});
