import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, MicIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ChatBubble from './ChatBubble';
import LanguageSelector from './LanguageSelector';
import { detectEmotion, Emotion } from '@/utils/emotionDetection';
import { 
  SupportedLanguage, 
  detectLanguage, 
  getResponse,
  getGreeting,
  languageNames
} from '@/utils/languageUtils';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  emotion?: Emotion;
  language: SupportedLanguage;
  timestamp: Date;
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(true);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: getGreeting(selectedLanguage),
      isUser: false,
      emotion: 'neutral',
      language: selectedLanguage,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);
  
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    
    const systemMessage: Message = {
      id: Date.now().toString(),
      text: getGreeting(language),
      isUser: false,
      emotion: 'neutral',
      language,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const detectedLanguage = autoDetectLanguage
      ? detectLanguage(input)
      : selectedLanguage;
    
    if (autoDetectLanguage && detectedLanguage !== selectedLanguage) {
      setSelectedLanguage(detectedLanguage);
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      language: detectedLanguage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    const emotion = detectEmotion(input, detectedLanguage);
    
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = getResponse(emotion, detectedLanguage);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        isUser: false,
        emotion,
        language: detectedLanguage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleClearChat = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: getGreeting(selectedLanguage),
      isUser: false,
      emotion: 'neutral',
      language: selectedLanguage,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto h-[600px] flex flex-col rounded-xl overflow-hidden glass">
      <motion.div 
        className="p-4 border-b flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col">
          <h2 className="font-medium">Emotion-Aware Multilingual Chatbot</h2>
          <p className="text-sm text-muted-foreground">
            Chat in English, Spanish, or Japanese
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleClearChat}
          title="Clear chat history"
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </motion.div>
      
      <ScrollArea className="flex-1 p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              emotion={message.emotion}
              language={message.language}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && (
            <motion.div
              className="flex justify-start mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="glass rounded-xl rounded-tl-none px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={endOfMessagesRef} />
      </ScrollArea>
      
      <motion.div 
        className="p-4 border-t flex flex-col gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-32">
            <LanguageSelector 
              value={selectedLanguage} 
              onChange={handleLanguageChange} 
            />
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-xs",
                autoDetectLanguage 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
              onClick={() => setAutoDetectLanguage(!autoDetectLanguage)}
            >
              Auto-detect language
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message in ${autoDetectLanguage ? 'any language' : languageNames[selectedLanguage]}...`}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
          >
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInterface;
