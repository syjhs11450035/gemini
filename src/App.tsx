import React, { useState, useEffect } from "react";
import { 
  Sparkles, Trash2, Save, FileCode, CheckCircle2, Clock, 
  Mic2, Music, Database, Image as ImageIcon, Video, 
  Search, MapPin, ScanText, BrainCircuit, Maximize,
  Menu, Settings, Eye, Layout, LogOut, PlayCircle, Layers
} from "lucide-react";
import { motion } from "motion/react";
import { ChatPanel } from "./frontend/components/ChatPanel";

export default function App() {
  const [activeTab, setActiveTab] = useState<"ai" | "view" | "settings">("ai");
  const [draft, setDraft] = useState<string>(() => {
    return localStorage.getItem("workspace_draft") || "/* 歡迎來到您的全新空白工作區。\n您可以在此直接記錄點詞、想法或規劃您的下一個精彩專案！ */\n\n";
  });
  const [activeTool, setActiveTool] = useState<string>("spark");
  const [status, setStatus] = useState({
    apiStatus: "Checking...",
    filesCount: 0,
    currentTime: ""
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load status and set periodic clock updates
  useEffect(() => {
    // 1. Fetch server API health
    const checkHealth = async () => {
      try {
        const res = await fetch("/api/health");
        const data = await res.json();
        if (data.status === "ok") {
          setStatus(prev => ({ ...prev, apiStatus: "連線正常 (Active)" }));
        }
      } catch (err) {
        const port = window.location.port || "3000";
        setStatus(prev => ({ ...prev, apiStatus: `訪問 Port ${port} 失敗 (CORS/離線)` }));
      }
    };
    checkHealth();

    // 2. Local system clock
    const updateTime = () => {
      const now = new Date();
      setStatus(prev => ({
        ...prev,
        currentTime: now.toLocaleTimeString("zh-TW", { hour12: false })
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Save draft to localStorage
  const handleSaveDraft = () => {
    localStorage.setItem("workspace_draft", draft);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Clear draft text
  const handleClearDraft = () => {
    if (confirm("確認清除草稿內容嗎？")) {
      setDraft("");
      localStorage.setItem("workspace_draft", "");
    }
  };

  // Call AI API based on active tool and draft content
  const handleExecuteAI = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: draft,
          provider: activeTool === "spark" ? "gemini-1.5-pro" : "groq-llama3",
          context: { tool: activeTool }
        })
      });
      const data = await res.json();
      if (data.success) {
        setDraft(prev => prev + `\n\n/* AI 回應 (${activeTool}): */\n${data.data}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Premium subtle background gradient layout */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.04),transparent_40%)] pointer-events-none" />

      {/* Top Navigation bar */}
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white">Gemini 虛擬工作區</h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Clean Canvas Environment</p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{status.currentTime || "00:00:00"}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-8 relative z-10">
        
        {/* Aesthetic Welcome Banner Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-2xl">
            <span className="text-xs bg-indigo-500/10 text-indigo-300 font-bold px-3 py-1 rounded-full border border-indigo-505/10">
              專案已完全清除
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white mt-4 mb-2">
              簡潔、純粹的開發起點
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              先前的舊檔案、快取與多餘的頁籤配置已成功清空。這是為您準備的空白草稿桌，所有後台 AI 偵測與 API 路由皆保持乾淨最簡，等待您的新指令。
            </p>
          </div>
        </motion.div>

        {/* AI Agent Plugin Toolbox */}
        <div className="flex flex-wrap gap-3 mb-2">
          <ToolIcon icon={<Sparkles className="w-4 h-4" />} label="spark" active={activeTool === 'spark'} onClick={() => setActiveTool('spark')} />
          <ToolIcon icon={<Mic2 className="w-4 h-4" />} label="audio_spark" active={activeTool === 'audio_spark'} onClick={() => setActiveTool('audio_spark')} />
          <ToolIcon icon={<Search className="w-4 h-4" />} label="google" active={activeTool === 'google'} onClick={() => setActiveTool('google')} />
          <ToolIcon icon={<MapPin className="w-4 h-4" />} label="google_pin" active={activeTool === 'google_pin'} onClick={() => setActiveTool('google_pin')} />
          <ToolIcon icon={<ScanText className="w-4 h-4" />} label="document_scanner" active={activeTool === 'document_scanner'} onClick={() => setActiveTool('document_scanner')} />
          <ToolIcon icon={<BrainCircuit className="w-4 h-4" />} label="advanced_math" active={activeTool === 'advanced_math'} onClick={() => setActiveTool('advanced_math')} />
          <ToolIcon icon={<ImageIcon className="w-4 h-4" />} label="image" active={activeTool === 'image'} onClick={() => setActiveTool('image')} />
          <ToolIcon icon={<Music className="w-4 h-4" />} label="music_note" active={activeTool === 'music_note'} onClick={() => setActiveTool('music_note')} />
          <ToolIcon icon={<Video className="w-4 h-4" />} label="movie" active={activeTool === 'movie'} onClick={() => setActiveTool('movie')} />
          <ToolIcon icon={<Maximize className="w-4 h-4" />} label="aspect_ratio" active={activeTool === 'aspect_ratio'} onClick={() => setActiveTool('aspect_ratio')} />
        </div>

        {/* Dynamic Bento Panel Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Side status and diagnostics card */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900/30 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                工作目錄狀態
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-white/5">
                  <span className="text-xs text-slate-400">當前伺服器：</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    容器連線正常
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-white/5">
                  <span className="text-xs text-slate-400">API 回傳：</span>
                  <span className="text-xs font-semibold font-mono text-indigo-300">
                    {status.apiStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-white/5">
                  <span className="text-xs text-slate-400">檔案狀態：</span>
                  <span className="text-xs font-semibold text-slate-300">
                    專案目錄完全清空
                  </span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 text-[11px] text-slate-500 leading-normal">
                本機端服務正運行於標準安全通道。您可以任一時間開始添加新的 UI 頁籤、自訂後台 API 或串接數據。
              </div>
            </div>

            {/* Micro Quick-Action Guide Card */}
            <div className="bg-gradient-to-br from-indigo-950/15 to-slate-950 border border-white/10 p-6 rounded-2xl">
              <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-300 block mb-2 font-mono">
                開發者指引 Tips
              </span>
              <ul className="text-xs text-slate-400 space-y-2.5 list-disc pl-4 leading-relaxed">
                <li>本專案已重設為標準 <b>ESM + Vite</b> 極簡範例。</li>
                <li>您可以在這塊空白草稿中寫下接下來想進行的設計主題。</li>
                <li>系統隨時等待您的發問，讓我們一步步構建最美的應用。</li>
              </ul>
            </div>
          </div>

          {/* Majestic Interactive Draftpad Component */}
          <div className="lg:col-span-2 bg-slate-900/30 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4.5 h-4.5 text-indigo-400" />
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  互動草稿記事板 (Draft Area)
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleClearDraft}
                  className="text-slate-500 hover:text-rose-400 p-1.5 rounded-xl hover:bg-rose-500/10 transition cursor-pointer"
                  title="清空內容"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleExecuteAI}
                  disabled={isProcessing}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow"
                >
                  {isProcessing ? "處理中..." : <><Sparkles className="w-3.5 h-3.5" /> 執行 Agent</>}
                </button>
                <button
                  onClick={handleSaveDraft}
                  className="bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 border border-white/5"
                >
                  <Save className="w-3.5 h-3.5" /> 儲存草稿
                </button>
              </div>
            </div>

            <div className="relative flex-1 min-h-[300px] flex flex-col">
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="在此空白處記錄您當前的靈感或開發計畫..."
                className="flex-1 w-full bg-slate-950/90 border border-white/5 p-4 rounded-xl text-xs font-mono text-slate-300 focus:text-indigo-200 outline-none focus:border-indigo-500/50 resize-y min-h-[280px] leading-relaxed shadow-inner"
              />

              {saveSuccess && (
                <div className="absolute bottom-4 right-4 bg-emerald-500 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 已安全與本機快取同步
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>長度: {draft.length} 個字元</span>
              <span>狀態: 隨時可儲存</span>
            </div>
          </div>

        </div>
      </main>
    );
  }

  // 檢視視圖 (匹配 檢視.svg)
  function renderViewWorkspace() {
    return (
      <div className="flex-1 p-10 flex flex-col gap-6">
        <div className="flex gap-4">
          <button className="bg-indigo-600 px-4 py-2 rounded flex items-center gap-2"><PlayCircle size={16}/> 開始暫停</button>
          <button className="bg-indigo-900 px-4 py-2 rounded">類型</button>
          <button className="bg-indigo-900 px-4 py-2 rounded">選擇</button>
        </div>
        <div className="flex-1 bg-indigo-500/10 rounded-2xl border-2 border-dashed border-indigo-500/20 flex items-center justify-center">
          <h1 className="text-6xl font-black text-indigo-500/30">VIEW</h1>
        </div>
      </div>
    );
  }

  // 設定視圖 (匹配 設定.svg)
  function renderSettingsWorkspace() {
    return (
      <div className="flex-1 p-10 grid grid-cols-3 gap-8">
        <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-6 h-64 flex items-end">
          <span className="font-bold">雲端硬碟狀態</span>
        </div>
        <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-xl p-6 h-48 flex items-end">
          <span className="font-bold">API 金鑰管理</span>
        </div>
        <div className="flex flex-col gap-4">
          <button className="bg-rose-600 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
            <LogOut size={18}/> 登出
          </button>
          <div className="text-indigo-400 space-y-2 mt-4">
            <p>• google drive 登出</p>
            <p>• 最佳化空間</p>
          </div>
        </div>
      </div>
    );
  }
}

function NavItem({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`text-sm font-bold transition-colors ${active ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}>
      {label}
    </button>
  )
}

function ToolIcon({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`
      flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer
      ${active ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-200' : 'bg-slate-900/50 border-white/5 text-slate-500 hover:border-white/20'}
    `}>
      {icon}
      <span className="text-[10px] font-mono font-bold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
