export const renameObjectKey = (input: Record<string, unknown>, oldKey: string, newKey: string): object => {
  return Object.keys(input).reduce<Record<string, unknown>>((result, key) => {
    if (key === oldKey) {
      result[newKey] = input[oldKey];
    } else {
      result[key] = input[key];
    }

    return result;
  }, {});
};

export const renameInArray = (input: string[], oldValue: string, newValue: string): string[] => {
  return input.map((value) => {
    if (value === oldValue) {
      return newValue;
    }

    return value;
  });
};