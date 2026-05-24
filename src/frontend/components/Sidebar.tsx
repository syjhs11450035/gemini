/**
 * 邊欄組件 - 設置和配置
 */

import React, { useState } from 'react';
import { Settings, Plus, Trash2 } from 'lucide-react';
import { AIProvider } from '../../shared/types';
import { AI_PROVIDERS } from '../../shared/constants';

interface SidebarProps {
  selectedProvider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedProvider,
  onProviderChange,
  isOpen,
  onToggle,
}) => {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});

  return (
    <>
      {/* 左側邊欄 */}
      <div
        className={`fixed lg:relative lg:w-64 w-64 h-screen bg-slate-900 border-r border-slate-700 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* 邊欄頭部 */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <h1 className="text-lg font-bold text-white">Gemini Clone</h1>
          </div>
          <p className="text-xs text-slate-400">AI 代理人工作區</p>
        </div>

        {/* AI 提供商選擇 */}
        <div className="p-6 border-b border-slate-700">
          <p className="text-sm font-semibold text-white mb-3">AI 提供商</p>
          <div className="space-y-2">
            {Object.entries(AI_PROVIDERS).map(([key, config]: any) => (
              <button
                key={key}
                onClick={() => onProviderChange(key as AIProvider)}
                className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                  selectedProvider === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <p className="font-medium">{config.name}</p>
                <p className="text-xs opacity-75">{config.models.join(', ')}</p>
              </button>
            ))}
          </div>
        </div>

        {/* API 密鑰設置 */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-white">API 密鑰</p>
            <button className="p-1 rounded hover:bg-slate-800 transition">
              <Plus size={16} className="text-slate-400" />
            </button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-2">Gemini API Key</p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="輸入 API 密鑰"
                  className="flex-1 bg-slate-700 text-white text-xs px-2 py-1 rounded border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="p-1 hover:bg-slate-700 rounded transition">
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 底部菜單 */}
        <div className="absolute bottom-0 w-full p-6 border-t border-slate-700 space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-sm text-slate-300">
            <Settings size={16} />
            設置
          </button>
        </div>
      </div>

      {/* 移動設備切換按鈕 */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="lg:hidden fixed top-4 left-4 p-2 bg-blue-600 rounded-lg text-white z-40"
        >
          ☰
        </button>
      )}
    </>
  );
};
