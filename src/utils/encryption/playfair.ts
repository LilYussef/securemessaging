import { validateInput } from './validation';

const generatePlayfairMatrix = (key: string): string[][] => {
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  const normalizedKey = key.toUpperCase()
    .replace(/J/g, 'I')
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter((char, index, self) => self.indexOf(char) === index)
    .join('');

  const matrix: string[][] = [];
  const usedChars = new Set(normalizedKey);

  let currentRow: string[] = [];
  [...normalizedKey, ...alphabet].forEach(char => {
    if (!usedChars.has(char)) {
      currentRow.push(char);
      usedChars.add(char);
      
      if (currentRow.length === 5) {
        matrix.push(currentRow);
        currentRow = [];
      }
    }
  });

  if (currentRow.length > 0) {
    matrix.push(currentRow);
  }

  return matrix;
};

export const playfairCipher = (text: string, key: string): string => {
  validateInput(text);
  validateInput(key);

  const matrix = generatePlayfairMatrix(key);
  const prepared = text.toUpperCase()
    .replace(/J/g, 'I')
    .replace(/[^A-Z]/g, '')
    .match(/.{1,2}/g)
    ?.map(pair => pair.length === 1 ? pair + 'X' : pair) || [];

  return prepared
    .map(pair => {
      const [char1, char2] = pair.split('');
      let pos1 = [-1, -1], pos2 = [-1, -1];
      
      matrix.forEach((row, i) => {
        row.forEach((col, j) => {
          if (col === char1) pos1 = [i, j];
          if (col === char2) pos2 = [i, j];
        });
      });

      if (pos1[0] === pos2[0]) { 
        return matrix[pos1[0]][(pos1[1] + 1) % 5] + matrix[pos2[0]][(pos2[1] + 1) % 5];
      } else if (pos1[1] === pos2[1]) { 
        return matrix[(pos1[0] + 1) % 5][pos1[1]] + matrix[(pos2[0] + 1) % 5][pos2[1]];
      } else { 
        return matrix[pos1[0]][pos2[1]] + matrix[pos2[0]][pos1[1]];
      }
    })
    .join('');
};