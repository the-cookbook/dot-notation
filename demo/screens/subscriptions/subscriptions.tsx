import React from 'react';
import { useParams, useLocation } from '@cookbook/navigator';

import history from '../../services/history';
import Formatter from '../../components/formatter';

const Subscriptions: React.FunctionComponent<Record<string, unknown>> = () => {
  const params = useParams();
  const location = useLocation();

  const handleOnClick = (): void => {
    history.go(-1);
  };

  return (
    <div
      style={{
        background: '#EECAC',
        background: 'linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%)',
        color: '#fff',
        height: '100%',
        padding: 22,
      }}
      className="bg-pan-left"
    >
      <h2>Subscriptions</h2>
      <ul style={{ marginBottom: 80 }}>
        <li style={{ marginBottom: '10px' }}>
          <button onClick={() => handleOnClick()} className="btn">
            Go back
          </button>
        </li>
      </ul>

      <Formatter title="Received parameters:" source={params} />

      <Formatter title="Current location:" source={location} />
    </div>
  );
};

export default Subscriptions;
