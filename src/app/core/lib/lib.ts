export const getObjValueFromPath = (obj: any, dotNotationString: any) => {
  const keys = dotNotationString.split('.');
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    if (current?.[keys?.[i]] === undefined) {
      return undefined; // or return a default value
    }
    current = current[keys[i]];
  }

  return current;
}
