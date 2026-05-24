/**
 * 主應用組件
 */

import React, { useState } from 'react';
import { AIProvider, PluginType } from '../shared/types';
import { Sidebar, ChatPanel, InputBox, Toolbar } from './components';
import { useChat, useAIProviders } from './hooks';
import { APIClient } from './services/apiClient';
import './index.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTool, setSelectedTool] = useState<PluginType | undefined>();
  const { messages, loading, error, sendMessage, clearMessages } = useChat();
  const { selectedProvider, setSelectedProvider } = useAIProviders();

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessage(content, selectedTool);
    } catch (error) {
      console.error('發送消息失敗:', error);
    }
  };

  const handleSelectTool = (tool: PluginType) => {
    setSelectedTool(tool === selectedTool ? undefined : tool);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* 邊欄 */}
      <Sidebar
        selectedProvider={selectedProvider}
        onProviderChange={setSelectedProvider}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* 主內容區域 */}
      <div className="flex flex-col flex-1">
        {/* 聊天面板 */}
        <ChatPanel messages={messages} loading={loading} />

        {/* 工具欄 */}
        <Toolbar
          onSelectTool={handleSelectTool}
          selectedTool={selectedTool}
        />

        {/* 輸入框 */}
        <InputBox
          onSubmit={handleSendMessage}
          loading={loading}
          disabled={error !== null}
        />

        {/* 錯誤提示 */}
        {error && (
          <div className="bg-red-900 bg-opacity-50 text-red-100 px-4 py-2 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* 移動設備背景遮罩 */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
