import { useState } from 'react';
import { Message } from '../types';

let messageCounter = 0;

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (text: string, isEncrypted: boolean = false) => {
    const newMessage: Message = {
      id: `${Date.now()}-${messageCounter++}`,
      text,
      timestamp: new Date().toLocaleTimeString(),
      isEncrypted,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return { messages, addMessage };
};