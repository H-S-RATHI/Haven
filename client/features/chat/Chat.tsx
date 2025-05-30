'use client';

import { ChatProvider } from './ChatContext';
import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';

export function Chat() {
  return (
    <ChatProvider>
      <div className="flex h-[calc(100vh-64px)] bg-white dark:bg-gray-900">
        <ChatList />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}
