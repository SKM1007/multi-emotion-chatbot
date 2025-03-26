
import React from 'react';
import { motion } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        className="w-full max-w-3xl text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Emotion-Aware Multilingual Chatbot
        </motion.h1>
        <motion.p 
          className="text-muted-foreground max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Chat naturally in English, Spanish, Japanese, or French. The AI will detect your emotions
          and respond accordingly in the same language.
        </motion.p>
      </motion.div>
      
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <ChatInterface />
      </motion.div>
      
      <motion.div 
        className="mt-8 text-sm text-muted-foreground text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p>Try typing in different languages and expressing different emotions.</p>
        <p>The chatbot will respond in the same language and adapt to your emotional state.</p>
        <p className="mt-2">Examples: "I'm feeling happy today", "Je suis triste", "Estoy enfadado", "私は驚いた"</p>
      </motion.div>
    </div>
  );
};

export default Index;
