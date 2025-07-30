import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center mt-8"
    >
      <p className="text-gray-400">
        Developed by Yussef Ahmed at Borg Al Arab Technological University
      </p>
    </motion.div>
  );
};
