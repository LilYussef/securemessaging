import { validateInput } from './validation';

export const caesarCipher = (text: string, shift: number): string => {
  validateInput(text);
  
  const normalizedShift = ((shift % 26) + 26) % 26;

  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(((code - base + normalizedShift) % 26) + base);
      }
      return char;
    })
    .join('');
};