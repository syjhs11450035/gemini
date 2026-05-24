/**
 * 聊天界面組件
 */

import React from 'react';
import { ChatMessage } from '../../shared/types';
import { MessageBubble } from './MessageBubble';

interface ChatPanelProps {
  messages: ChatMessage[];
  loading?: boolean;
  onScroll?: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ messages, loading, onScroll }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      {/* 頭部 */}
      <div className="border-b border-slate-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Gemini Clone Agent</h2>
        <p className="text-sm text-slate-400 mt-1">全能型 AI 代理人</p>
      </div>

      {/* 消息區域 */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-slate-400 text-lg mb-2">👋 歡迎使用 Gemini Clone Agent</p>
              <p className="text-slate-500 text-sm">開始對話或選擇一個工具</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}

        {loading && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-slate-400 text-sm">正在處理...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
