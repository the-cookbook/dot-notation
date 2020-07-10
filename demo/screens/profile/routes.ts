import React from 'react';
import type { Route } from '@cookbook/navigator';

const ProfileAsync = React.lazy(() => import(/* webpackChunkName: "profile" */ './profile'));

const Routes: Route[] = [
  {
    name: 'profile',
    path: '/profile/:id?',
    queryStrings: [':page'],
    exact: true,
    component: ProfileAsync,
  },
];

export default Routes;
