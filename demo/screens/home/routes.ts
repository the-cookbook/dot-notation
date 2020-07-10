import React from 'react';
import type { Route } from '@cookbook/navigator';

const HomeAsync = React.lazy(() => import(/* webpackChunkName: "home" */ './home'));

const Routes: Route[] = [
  {
    name: 'home',
    path: '/',
    queryStrings: [':page'],
    exact: true,
    component: HomeAsync,
  },
];

export default Routes;
