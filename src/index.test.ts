import * as dot from './';

describe('dot', () => {
  it('should match snapshot', () => {
    expect(dot).toMatchSnapshot();
  });
});
