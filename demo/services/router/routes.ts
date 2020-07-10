import merge from 'deepmerge';
import type { Route } from '@cookbook/navigator';

type Module = {
  default: string;
};

const routes: Route[] = [];

if (process.env.NODE_ENV === 'test') {
  require('require-all')({
    dirname: `${process.cwd()}/src/screens`,
    recursive: true,
    filter: /routes\.(js|ts)$/u,
    resolve: (module: Module) => {
      routes.push(module.default as Route);
    },
  });
} else {
  const context = require.context('../../screens', true, /routes\.(js|ts)$/u);

  context
    .keys()
    .map(context)
    .forEach((module: Module) => routes.push(module.default as Route));
}

export default merge.all<Route[]>(routes);
