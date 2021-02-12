import getKey from './get-key';

/**
 * Create path breadcrumb
 * @desc parse dot notation syntax into path breadcrumbs
 * @param {string} path - dot notation path
 * @return {string[]}
 */
const createPathBreadcrumb = (path: string): string[] => {
  return (
    path
      .split(getKey.regexp)
      .filter(Boolean)
      // add default index for empty array notation
      .map((p) => (p === '[]' ? '[0]' : p))
  );
};

export default createPathBreadcrumb;
