/**
 * 工具欄組件
 */

import React from 'react';
import { PluginType, Plugin } from '../../shared/types';
import { PLUGINS_CONFIG } from '../../shared/constants';

interface ToolbarProps {
  onSelectTool: (tool: PluginType) => void;
  selectedTool?: PluginType;
  plugins?: Plugin[];
}

export const Toolbar: React.FC<ToolbarProps> = ({ onSelectTool, selectedTool, plugins }) => {
  const pluginEntries = Object.entries(PLUGINS_CONFIG);

  return (
    <div className="border-t border-slate-700 bg-slate-800 px-6 py-4">
      <p className="text-sm text-slate-400 mb-3">工具和功能</p>
      <div className="grid grid-cols-4 gap-2 overflow-x-auto pb-2">
        {pluginEntries.map(([key, config]: any) => (
          <button
            key={key}
            onClick={() => onSelectTool(key as PluginType)}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg transition ${
              selectedTool === key
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            title={config.description}
          >
            <span className="text-xl">{config.icon}</span>
            <span className="text-xs text-center truncate">{config.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
