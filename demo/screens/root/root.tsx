import React from 'react';

import Router from '../../services/router';
import Menu from '../shared/menu';

const Root: React.FunctionComponent<Record<string, unknown>> = () => {
  return (
    <React.Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <Menu />
        <Router />
      </React.Suspense>
    </React.Fragment>
  );
};

export default Root;
