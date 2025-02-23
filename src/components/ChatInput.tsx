import React, { KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  value, 
  onChange, 
  onSend, 
  placeholder 
}) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-end gap-3 rounded-lg">
      <textarea
        className="flex-1 bg-[#0a1929] rounded-xl px-4 py-3 resize-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[45px] max-h-[120px]"
        placeholder={placeholder || "Type a message..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        rows={1}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 p-3 rounded-xl hover:bg-blue-700 transition-colors"
        onClick={onSend}
        disabled={!value.trim()}
      >
        <Send className="w-5 h-5 text-white" />
      </motion.button>
    </div>
  );
};