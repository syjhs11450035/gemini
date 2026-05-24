/**
 * 全局常量定義
 */

// ============= API 端點 =============
export const API_ROUTES = {
  // AI 相關
  AI_CHAT: '/api/ai/chat',
  AI_VISION: '/api/ai/vision',
  AI_MATH: '/api/ai/math',
  AI_SEARCH: '/api/ai/search',

  // Google Drive
  DRIVE_EXECUTE: '/api/drive/execute',
  DRIVE_LIST: '/api/drive/list',
  DRIVE_UPLOAD: '/api/drive/upload',

  // 外掛
  PLUGINS: '/api/plugins',
  PLUGIN_CONFIG: '/api/plugins/:id/config',

  // 認證
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_REFRESH: '/api/auth/refresh',

  // 健康檢查
  HEALTH: '/api/health',
};

// ============= 外掛配置 =============
export const PLUGINS_CONFIG = {
  audio_spark: {
    name: '文字轉語音',
    icon: '🔊',
    description: '將文字結果即時轉換為自然語音輸出',
  },
  music_note: {
    name: '音樂生成',
    icon: '🎵',
    description: '串接 Suno/Udio API 生成音樂',
  },
  database_auth: {
    name: '數據庫認證',
    icon: '🔐',
    description: '整合 Supabase/Firebase 提供帳號驗證',
  },
  image_edit_auto: {
    name: '圖像編輯',
    icon: '🖼️',
    description: '支援 Text-to-Image 與局部修改、重繪',
  },
  movie: {
    name: '動畫生成',
    icon: '🎬',
    description: '將靜態圖片動態化，生成短影片',
  },
  google: {
    name: 'Google 搜尋',
    icon: '🔍',
    description: '調用 Google Search API 獲取即時資料',
  },
  google_pin: {
    name: 'Google 地圖',
    icon: '📍',
    description: '調用 Google 地圖資料進行位置解析',
  },
  image: {
    name: '高質圖像生成',
    icon: '✨',
    description: '調用 Imagen/Midjourney/FLUX 生成高質圖像',
  },
  spark: {
    name: 'Gemini 智慧',
    icon: '⚡',
    description: '一鍵切換回 Gemini 原生智慧大腦核心',
  },
  voice_chat: {
    name: '聲音對話',
    icon: '🎤',
    description: '低延遲的雙向語音即時聊天',
  },
  video_spark: {
    name: '視頻生成',
    icon: '🎥',
    description: '輸入提示詞直接生成全新短片',
  },
  aspect_ratio: {
    name: '縱橫比控制',
    icon: '📐',
    description: '精準控制生成圖像的比例（16:9, 1:1, 4:5）',
  },
  document_scanner: {
    name: '文檔掃描',
    icon: '📄',
    description: '深度分析圖片中的表格、發票、手寫字',
  },
};

// ============= AI 提供商配置 =============
export const AI_PROVIDERS = {
  'gemini-1.5-pro': {
    name: 'Gemini 1.5 Pro',
    models: ['gemini-1.5-pro'],
    maxTokens: 1000000,
    features: ['vision', 'text', 'multimodal'],
  },
  'gemini-2.0-flash': {
    name: 'Gemini 2.0 Flash',
    models: ['gemini-2.0-flash'],
    maxTokens: 1000000,
    features: ['vision', 'text', 'multimodal', 'reasoning'],
  },
  'groq-llama3': {
    name: 'Groq Llama 3',
    models: ['llama3-70b'],
    maxTokens: 8192,
    features: ['text', 'fast-inference'],
  },
  'google-search-enhanced': {
    name: 'Google Search Enhanced',
    models: ['search-api'],
    maxTokens: 5000,
    features: ['web-search', 'realtime'],
  },
};

// ============= 日誌級別 =============
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export enum LogStage {
  SERVER = '[SERVER]',
  API = '[API]',
  AI = '[AI]',
  DRIVE = '[DRIVE]',
  PLUGIN = '[PLUGIN]',
  AUTH = '[AUTH]',
  ERROR = '[ERROR]',
  DB = '[DB]',
}

// ============= 環境變數 =============
export const ENV_VARS = {
  GEMINI_API_KEY: 'GEMINI_API_KEY',
  GOOGLE_DRIVE_API_KEY: 'GOOGLE_DRIVE_API_KEY',
  GROQ_API_KEY: 'GROQ_API_KEY',
  GOOGLE_SEARCH_API_KEY: 'GOOGLE_SEARCH_API_KEY',
  GOOGLE_SEARCH_ENGINE_ID: 'GOOGLE_SEARCH_ENGINE_ID',
  SUPABASE_URL: 'SUPABASE_URL',
  SUPABASE_KEY: 'SUPABASE_KEY',
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  API_PORT: 'API_PORT',
};

// ============= 默認配置 =============
export const DEFAULT_CONFIG = {
  PORT: 3000,
  API_PORT: 3001,
  NODE_ENV: 'development',
  DEFAULT_PROVIDER: 'gemini-1.5-pro' as const,
  TIMEOUT_MS: 30000,
  MAX_RETRIES: 3,
};

// ============= 文件類型 =============
export const ALLOWED_MIME_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  VIDEO: ['video/mp4', 'video/webm', 'video/mpeg'],
  AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  DOCUMENT: ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};
