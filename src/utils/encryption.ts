const validateKey = (key: string | number, type: 'string' | 'number'): void => {
  if (type === 'number') {
    const numKey = Number(key);
    if (isNaN(numKey)) {
      throw new Error('Invalid numeric key');
    }
  } else if (type === 'string') {
    if (!key || typeof key !== 'string' || !key.trim()) {
      throw new Error('Invalid string key');
    }
  }
};


export const caesarCipher = (text: string, key: string): string => {
  validateKey(key, 'number');
  const shift = parseInt(key) || 3;
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


export const playfairCipher = (text: string, key: string): string => {
  validateKey(key, 'string');
  const normalizedKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  

  const matrix = Array(5).fill(0).map(() => Array(5).fill(''));
  const used = new Set();
  let row = 0, col = 0;
  

  (normalizedKey + 'ABCDEFGHIKLMNOPQRSTUVWXYZ').split('').forEach(char => {
    if (!used.has(char)) {
      matrix[row][col] = char;
      used.add(char);
      col++;
      if (col === 5) {
        col = 0;
        row++;
      }
    }
  });


  const pairs = text.toUpperCase()
    .replace(/J/g, 'I')
    .replace(/[^A-Z]/g, '')
    .match(/.{1,2}/g)
    ?.map(pair => pair.length === 1 ? pair + 'X' : pair) || [];

  return pairs.map(pair => {
    const [a, b] = pair.split('');
    const pos1 = findPosition(matrix, a);
    const pos2 = findPosition(matrix, b);

    if (pos1.row === pos2.row) {
      return matrix[pos1.row][(pos1.col + 1) % 5] + matrix[pos2.row][(pos2.col + 1) % 5];
    } else if (pos1.col === pos2.col) {
      return matrix[(pos1.row + 1) % 5][pos1.col] + matrix[(pos2.row + 1) % 5][pos2.col];
    } else {
      return matrix[pos1.row][pos2.col] + matrix[pos2.row][pos1.col];
    }
  }).join('');
};


export const vigenereCipher = (text: string, key: string): string => {
  validateKey(key, 'string');
  const normalizedKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  return text
    .split('')
    .map((char, i) => {
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const shift = normalizedKey[i % normalizedKey.length].charCodeAt(0) - 65;
        return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
      }
      return char;
    })
    .join('');
};


export const transpositionMatrix = (text: string, key: string): string => {
  validateKey(key, 'number');
  const cols = parseInt(key) || 4;
  if (cols < 2) throw new Error('Key must be greater than 1');

  const rows = Math.ceil(text.length / cols);
  const matrix = Array(rows).fill('').map(() => Array(cols).fill(''));
  

  for (let i = 0; i < text.length; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    matrix[row][col] = text[i];
  }


  let result = '';
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      if (matrix[row][col]) {
        result += matrix[row][col];
      }
    }
  }

  return result;
};


const findPosition = (matrix: string[][], char: string) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return { row: i, col: j };
      }
    }
  }
  return { row: 0, col: 0 };
};