import React from 'react';
import { Lock, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import { EncryptionType } from '../types';

interface EncryptionControlsProps {
  encryptionType: EncryptionType;
  onTypeChange: (type: EncryptionType) => void;
  encryptionKey: string;
  onKeyChange: (key: string) => void;
}

export const EncryptionControls: React.FC<EncryptionControlsProps> = ({
  encryptionType,
  onTypeChange,
  encryptionKey,
  onKeyChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#132f4c] rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center mb-6">
        <Lock className="w-6 h-6 mr-2 text-blue-400" />
        <h3 className="text-xl font-semibold">Encryption Box</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Encryption Key</label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              className="w-full bg-[#0a1929] rounded-xl p-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter key..."
              value={encryptionKey}
              onChange={(e) => onKeyChange(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Encryption Method</label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            className="w-full bg-[#0a1929] rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
            value={encryptionType}
            onChange={(e) => onTypeChange(e.target.value as EncryptionType)}
          >
            <option value="caesar">Caesar Cipher</option>
            <option value="playfair">Playfair Cipher</option>
            <option value="vigenere">Vigenere Cipher</option>
            <option value="transposition">Transposition Matrix</option>
          </motion.select>
        </div>
      </div>
    </motion.div>
  );
};