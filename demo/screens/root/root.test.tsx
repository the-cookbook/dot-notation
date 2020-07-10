import * as React from 'react';
import renderer from 'react-test-renderer';

import Root from './root';

describe('screens/<Root />', () => {
  it('should match snapshot', () => {
    const wrapper = renderer.create(<Root />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
