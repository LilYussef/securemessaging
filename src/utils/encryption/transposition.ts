import { validateInput } from './validation';

export const transpositionMatrix = (text: string, key: number): string => {
  validateInput(text);
  
  if (key < 2) {
    throw new Error('Key must be greater than 1');
  }

  const normalizedKey = Math.min(key, text.length);
  const matrix: string[][] = [];
  

  for (let i = 0; i < text.length; i += normalizedKey) {
    const row = text.slice(i, i + normalizedKey).split('');
    while (row.length < normalizedKey) {
      row.push(' ');
    }
    matrix.push(row);
  }


  let result = '';
  for (let col = 0; col < normalizedKey; col++) {
    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row][col] !== ' ') {
        result += matrix[row][col];
      }
    }
  }

  return result;
};