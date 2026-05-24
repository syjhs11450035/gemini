/**
 * 共享類型定義 - Gemini Clone Agent 全棧應用
 */

// ============= AI 提供商類型 =============
export type AIProvider = 'gemini-1.5-pro' | 'gemini-2.0-flash' | 'groq-llama3' | 'google-search-enhanced';

export type AITool = 
  | 'general_chat'
  | 'advanced_math'
  | 'document_scanner'
  | 'vision_analysis'
  | 'web_search'
  | 'location_analysis'
  | 'image_generation'
  | 'music_generation'
  | 'video_generation'
  | 'voice_chat';

export interface AIRequest {
  prompt: string;
  provider: AIProvider;
  tool?: AITool;
  context?: Record<string, any>;
  imageData?: string;
  webUrl?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
  timestamp?: Date;
}

// ============= Google Drive 類型 =============
export type DriveCommand = 
  | 'ZIP_AND_SEND'
  | 'SEARCH_CONTACT'
  | 'CREATE_SCRATCH'
  | 'FIND_AND_COMPRESS'
  | 'LIST_FILES'
  | 'DELETE_FILE'
  | 'SHARE_FILE';

export interface DriveRequest {
  command: DriveCommand;
  params: Record<string, any>;
  auth?: {
    token: string;
    refreshToken?: string;
  };
}

export interface DriveResponse {
  success: boolean;
  result?: any;
  message?: string;
  error?: string;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  createdTime: string;
  modifiedTime: string;
  webViewLink: string;
}

// ============= 外掛組件類型 =============
export type PluginType = 
  | 'audio_spark'
  | 'music_note'
  | 'database_auth'
  | 'image_edit_auto'
  | 'movie'
  | 'google'
  | 'google_pin'
  | 'image'
  | 'spark'
  | 'voice_chat'
  | 'video_spark'
  | 'aspect_ratio'
  | 'document_scanner';

export interface Plugin {
  id: PluginType;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  config?: Record<string, any>;
}

export interface PluginResponse {
  pluginId: PluginType;
  success: boolean;
  data?: any;
  error?: string;
}

// ============= 視覺識別類型 =============
export interface VisionResult {
  text?: string;
  objects?: ObjectDetection[];
  location?: LocationData;
  analysis?: string;
  confidence?: number;
}

export interface ObjectDetection {
  label: string;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  landmarks?: string[];
  weather?: string;
}

// ============= 搜尋結果類型 =============
export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  imageUrl?: string;
  category?: string;
}

export interface StructuredSearchResult {
  query: string;
  summary: string;
  results: SearchResult[];
  categories?: Map<string, SearchResult[]>;
}

// ============= 圖像生成類型 =============
export interface ImageGenRequest {
  prompt: string;
  aspectRatio?: string;
  style?: string;
  quality?: 'draft' | 'standard' | 'high';
  provider?: string;
}

export interface ImageGenResponse {
  success: boolean;
  imageUrl?: string;
  seed?: number;
  error?: string;
}

// ============= 音視頻類型 =============
export interface AudioRequest {
  text: string;
  voice?: string;
  speed?: number;
  language?: string;
}

export interface AudioResponse {
  success: boolean;
  audioUrl?: string;
  duration?: number;
  error?: string;
}

export interface VideoGenRequest {
  prompt: string;
  duration?: number;
  format?: string;
}

export interface VideoGenResponse {
  success: boolean;
  videoUrl?: string;
  duration?: number;
  error?: string;
}

// ============= 數據庫和認證類型 =============
export interface AuthConfig {
  provider: 'supabase' | 'firebase' | 'custom';
  projectId?: string;
  apiKey?: string;
  authDomain?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  preferences?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

// ============= API 結果類型 =============
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: Date;
  statusCode?: number;
}

// ============= 配置類型 =============
export interface AppConfig {
  apiEndpoint: string;
  driveEndpoint: string;
  plugins: Plugin[];
  providers: Record<AIProvider, {
    apiKey: string;
    enabled: boolean;
  }>;
  defaultProvider?: AIProvider;
}

// ============= WebSocket 消息類型 =============
export interface WSMessage {
  type: 'chat' | 'status' | 'error' | 'progress';
  data: any;
  timestamp?: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  tool?: AITool;
  timestamp: Date;
  metadata?: Record<string, any>;
}
