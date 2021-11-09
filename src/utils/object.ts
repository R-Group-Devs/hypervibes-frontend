// These types can be improved. For now, we can copy what `_.get` has.
export const getDeep = (object: any, path: string) => {
  let value = object;

  for (const key of path.split('.')) {
    try {
      value = value[key];
    } catch (e) {
      return;
    }
  }

  return value;
};
