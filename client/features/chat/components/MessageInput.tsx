'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '../ChatContext';
import { Button } from '@/components/ui/button';
import { Paperclip, Smile, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { sendMessage, currentConversation, setTyping } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Debounce typing indicator
  const [debouncedTyping] = useDebounce(isTyping, 1000);
  
  // Update typing status when debouncedTyping changes
  useEffect(() => {
    setTyping(debouncedTyping);
    
    // Auto-reset typing status after delay
    if (debouncedTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [debouncedTyping, setTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentConversation) return;
    
    sendMessage(message);
    setMessage('');
    setIsTyping(false);
    inputRef.current?.focus();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Button type="button" variant="ghost" size="icon">
        <Paperclip className="h-5 w-5" />
        <span className="sr-only">Attach file</span>
      </Button>
      <div className="relative flex-1">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Type a message"
          className="pr-10"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
        >
          <Smile className="h-5 w-5" />
          <span className="sr-only">Add emoji</span>
        </Button>
      </div>
      <Button type="submit" size="icon" disabled={!message.trim()}>
        <Send className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
