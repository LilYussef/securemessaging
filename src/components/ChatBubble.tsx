import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isEncrypted?: boolean;
  timestamp?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isEncrypted, 
  timestamp = new Date().toLocaleTimeString() 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isEncrypted ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isEncrypted 
            ? 'bg-[#0d47a1] ml-auto rounded-br-sm' 
            : 'bg-[#1e4976] rounded-bl-sm'
        }`}
      >
        <div className="flex items-start gap-2">
          {isEncrypted ? (
            <Shield className="w-4 h-4 text-blue-300 mt-1" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-purple-300 mt-1" />
          )}
          <div>
            <p className="text-white break-words">{message}</p>
            <span className="text-xs text-gray-300 block text-right mt-1">
              {timestamp}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};