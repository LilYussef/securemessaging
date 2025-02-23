import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center mb-4">
        <MessageSquare className="w-12 h-12 text-blue-400 mr-3" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Secure Messaging
        </h1>
      </div>
      <h2 className="text-xl text-gray-300">
        Borg Al Arab Technological University
      </h2>
    </motion.div>
  );
};