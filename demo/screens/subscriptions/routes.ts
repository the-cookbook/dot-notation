import React from 'react';
import type { Route } from '@cookbook/navigator';

const SubscriptionsAsync = React.lazy(() => import(/* webpackChunkName: "subscriptions" */ './subscriptions'));

const Routes: Route[] = [
  {
    name: 'subscriptions',
    path: '/subscriptions/:type(active|deactivated)/:id?',
    queryStrings: [':page'],
    exact: true,
    component: SubscriptionsAsync,
  },
];

export default Routes;
