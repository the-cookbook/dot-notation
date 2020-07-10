import React from 'react';
import { Router as BrowserRouter, Switch, Route as PublicRoute, RouteComponentProps } from 'react-router';
import type { Route } from '@cookbook/navigator';
import history from '../history';

import routes from './routes';

const Router: React.FunctionComponent<{}> = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        {routes.map((route: Route) => {
          const { roles, path, exact, strict, render, component: Component } = route;

          return (
            <PublicRoute
              key={Array.isArray(path) ? path.join('') : path}
              path={path}
              exact={exact}
              strict={strict}
              roles={roles}
              render={React.useCallback(
                (props: RouteComponentProps<any>) => (render ? render({ ...props }) : <Component {...props} />),
                [],
              )}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
