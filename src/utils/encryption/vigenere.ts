import { validateInput } from './validation';

export const vigenereCipher = (text: string, key: string): string => {
  validateInput(text);
  validateInput(key);

  const normalizedKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!normalizedKey) {
    throw new Error('Invalid key: must contain at least one letter');
  }

  const repeatedKey = normalizedKey
    .repeat(Math.ceil(text.length / normalizedKey.length))
    .slice(0, text.length);

  return text
    .split('')
    .map((char, i) => {
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const shift = repeatedKey[i].charCodeAt(0) - 65;
        const code = char.charCodeAt(0);
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    })
    .join('');
};