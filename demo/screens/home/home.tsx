import React from 'react';
import { useLocation } from '@cookbook/navigator';

import Formatter from '../../components/formatter';

const Home: React.FunctionComponent<Record<string, unknown>> = () => {
  const location = useLocation();

  return (
    <div
      style={{
        background: '#FF3CAC',
        background: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
        color: '#fff',
        height: '100%',
        padding: 22,
      }}
      className="bg-pan-left"
    >
      <h2>Home</h2>
      <Formatter title="Current location:" source={location} />
    </div>
  );
};

export default Home;
