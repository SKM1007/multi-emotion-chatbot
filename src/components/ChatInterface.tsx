
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
  getGreeting
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
  
  // Initialize chat with greeting
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
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Handle language change
  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    
    // Add a system message about language change
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
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Detect language if auto-detection is enabled
    const detectedLanguage = autoDetectLanguage
      ? detectLanguage(input)
      : selectedLanguage;
    
    // If language changes, update the selected language
    if (autoDetectLanguage && detectedLanguage !== selectedLanguage) {
      setSelectedLanguage(detectedLanguage);
    }
    
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      language: detectedLanguage,
      timestamp: new Date()
    };
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Detect emotion from user input
    const emotion = detectEmotion(input, detectedLanguage);
    
    // Simulate typing
    setIsTyping(true);
    
    // Simulate bot response with a delay
    setTimeout(() => {
      // Generate response based on emotion and language
      const botResponse = getResponse(emotion, detectedLanguage);
      
      // Create bot message
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        isUser: false,
        emotion,
        language: detectedLanguage,
        timestamp: new Date()
      };
      
      // Add bot message to chat
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500); // Random delay between 1-1.5s
  };
  
  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Clear chat history
  const handleClearChat = () => {
    // Reset to just the welcome message
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
      {/* Header */}
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
      
      {/* Messages area */}
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
          
          {/* Typing indicator */}
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
        
        {/* Empty div for auto-scrolling */}
        <div ref={endOfMessagesRef} />
      </ScrollArea>
      
      {/* Input area */}
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
