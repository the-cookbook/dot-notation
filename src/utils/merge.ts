import is from './is';

const merge = <X, Y = X>(x: Partial<X>, y: Partial<Y | X>): X | (X & Y) => {
  if (!(is.object(x) || is.object(y))) {
    return y;
  }

  const keys = Object.keys(x);

  const result: Record<string, unknown> = { ...y };

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const xValue = (x as Record<string, unknown>)[key];
    const yValue = (y as Record<string, unknown>)[key];

    if (Array.isArray(xValue) && Array.isArray(yValue)) {
      result[key] = yValue;
    } else if (is.object(xValue) && is.object(yValue)) {
      result[key] = merge<X, Y | X>({ ...(xValue as Partial<X>) }, { ...(yValue as Partial<Y | X>) });
    } else {
      result[key] = xValue as X;
    }
  }

  return result as X | (X & Y);
};

export default merge;
