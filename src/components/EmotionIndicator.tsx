
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Emotion } from '@/utils/emotionDetection';

interface EmotionIndicatorProps {
  emotion: Emotion;
  className?: string;
}

const emotionIcons: Record<Emotion, string> = {
  happy: '😊',
  sad: '😔',
  angry: '😡',
  neutral: '😐',
  surprised: '😮'
};

const EmotionIndicator: React.FC<EmotionIndicatorProps> = ({ emotion, className }) => {
  return (
    <motion.div 
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        emotion === 'happy' && "bg-emotion-happy/10 text-emotion-happy",
        emotion === 'sad' && "bg-emotion-sad/10 text-emotion-sad",
        emotion === 'angry' && "bg-emotion-angry/10 text-emotion-angry",
        emotion === 'neutral' && "bg-emotion-neutral/10 text-emotion-neutral",
        emotion === 'surprised' && "bg-emotion-surprised/10 text-emotion-surprised",
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className="mr-1">{emotionIcons[emotion]}</span>
      <span className="capitalize">{emotion}</span>
    </motion.div>
  );
};

export default EmotionIndicator;
