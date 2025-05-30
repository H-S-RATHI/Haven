'use client';

import { Chat } from '@/features/chat/Chat';

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <Chat />
      </main>
    </div>
  );
}
