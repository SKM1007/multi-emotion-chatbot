
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Emotion } from '@/utils/emotionDetection';
import EmotionIndicator from './EmotionIndicator';
import { SupportedLanguage } from '@/utils/languageUtils';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  emotion?: Emotion;
  language: SupportedLanguage;
  timestamp: Date;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  emotion = 'neutral',
  language,
  timestamp
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Delayed appearance for a typing effect
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <motion.div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.175, 0.885, 0.32, 1.275] 
      }}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-4 py-3 flex flex-col",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "glass rounded-tl-none"
        )}
      >
        {!isUser && emotion && (
          <EmotionIndicator 
            emotion={emotion} 
            className="self-start mb-2" 
          />
        )}
        
        <p className={cn(
          "text-sm font-medium",
          isVisible ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300"
        )}>
          {message}
        </p>
        
        <span className={cn(
          "text-xs opacity-70 self-end mt-1",
          isUser ? "text-primary-foreground/70" : "text-foreground/70"
        )}>
          {formatTime(timestamp)}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
