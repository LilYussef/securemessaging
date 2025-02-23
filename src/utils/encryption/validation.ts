export const validateInput = (input: string | number): void => {
    if (typeof input === 'string') {
      if (!input || input.trim().length === 0) {
        throw new Error('Input cannot be empty');
      }
    } else if (typeof input === 'number') {
      if (isNaN(input)) {
        throw new Error('Invalid numeric input');
      }
    }
  };