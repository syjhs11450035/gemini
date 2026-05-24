/**
 * 聊天記錄管理 Hook
 */

import { useState, useCallback } from 'react';
import { ChatMessage, AITool, PluginType } from '../../shared/types';

export interface UseChatReturn {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string, tool?: AITool | PluginType) => Promise<void>;
  clearMessages: () => void;
  addMessage: (role: 'user' | 'assistant', content: string) => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const message: ChatMessage = {
      id: `msg_${Date.now()}`,
      role,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  }, []);

  const sendMessage = useCallback(async (content: string, tool?: AITool | PluginType) => {
    setLoading(true);
    setError(null);

    try {
      // 添加用戶消息
      addMessage('user', content);

      // 模擬 AI 響應
      setTimeout(() => {
        addMessage('assistant', `[${tool || '一般對話'}] 已處理您的請求: ${content}`);
        setLoading(false);
      }, 500);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
    addMessage,
  };
}
