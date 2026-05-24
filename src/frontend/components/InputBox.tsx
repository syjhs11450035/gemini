/**
 * 輸入框組件
 */

import React, { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

interface InputBoxProps {
  onSubmit: (message: string) => void;
  loading?: boolean;
  disabled?: boolean;
}

export const InputBox: React.FC<InputBoxProps> = ({ onSubmit, loading, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !loading && !disabled) {
      onSubmit(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading && !disabled) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-slate-700 bg-slate-800 px-6 py-4">
      <div className="flex gap-2 items-end">
        {/* 附件按鈕 */}
        <button
          className="p-2 rounded-lg hover:bg-slate-700 transition"
          title="上傳附件"
          disabled={loading || disabled}
        >
          <Paperclip size={20} className="text-slate-400" />
        </button>

        {/* 輸入框 */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="輸入您的想法...（Shift+Enter 換行）"
          disabled={loading || disabled}
          rows={1}
          className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg resize-none border-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />

        {/* 語音按鈕 */}
        <button
          className="p-2 rounded-lg hover:bg-slate-700 transition"
          title="語音輸入"
          disabled={loading || disabled}
        >
          <Mic size={20} className="text-slate-400" />
        </button>

        {/* 發送按鈕 */}
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || loading || disabled}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          title="發送"
        >
          <Send size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};
