import { curry, toPairs, pipe, map, adjust, fromPairs } from "ramda";
export const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const renameKeysWith = curry((fn: (s: string) => string, obj: any) =>
  //@ts-ignore
  pipe(toPairs, map(adjust(0, fn)), fromPairs)(obj)
);

export const jsToDb = (obj: Object) => {
  return renameKeysWith(camelToSnakeCase, obj);
};

export const generateRandomLetter = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
};
