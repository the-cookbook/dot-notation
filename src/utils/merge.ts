import is from './is';
import shallowCopy from './shallow-copy';

/**
 * Merge property from two objects
 * @param x
 * @param y
 */
const merge = <X, Y = X>(x: Partial<X>, y: Partial<Y>): X & Y => {
  if (!(is.object(x) || is.object(y))) {
    return y;
  }

  const lhs = shallowCopy<Record<string, unknown>>(x);
  const rhs = shallowCopy<Record<string, unknown>>(y);
  const keys = Object.keys(lhs);

  const content = shallowCopy<Record<string, unknown>>(y);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const lhsValue = shallowCopy(lhs[key]);
    const rhsValue = shallowCopy(rhs[key]);

    if (is.array(lhsValue) && is.array(rhsValue)) {
      content[key] = rhsValue;
    } else if (is.object(lhsValue) && is.object(rhsValue)) {
      content[key] = merge(lhsValue, rhsValue);
    } else {
      content[key] = rhsValue || lhsValue;
    }
  }

  return content as X & Y;
};

export default merge;
