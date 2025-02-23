export type EncryptionType = 'caesar' | 'playfair' | 'vigenere' | 'transposition';

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isEncrypted: boolean;
}