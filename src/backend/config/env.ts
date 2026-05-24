/**
 * 環境配置管理
 */

import dotenv from 'dotenv';
import path from 'path';
import { ENV_VARS, DEFAULT_CONFIG } from '../../shared/constants';

dotenv.config();

export interface EnvConfig {
  // 服務端口
  PORT: number;
  API_PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';

  // AI 提供商 API 密鑰
  GEMINI_API_KEY: string;
  GROQ_API_KEY?: string;
  GOOGLE_SEARCH_API_KEY?: string;
  GOOGLE_SEARCH_ENGINE_ID?: string;

  // Google Drive
  GOOGLE_DRIVE_API_KEY?: string;
  GOOGLE_DRIVE_OAUTH_CLIENT_ID?: string;
  GOOGLE_DRIVE_OAUTH_CLIENT_SECRET?: string;

  // 數據庫
  SUPABASE_URL?: string;
  SUPABASE_KEY?: string;
  DATABASE_URL?: string;

  // 其他服務
  SUNO_API_KEY?: string;
  GOOGLE_MAPS_API_KEY?: string;
}

class ConfigManager {
  private config: EnvConfig;

  constructor() {
    this.config = this.loadConfig();
    this.validateRequiredEnvVars();
  }

  private loadConfig(): EnvConfig {
    return {
      PORT: parseInt(process.env.PORT || String(DEFAULT_CONFIG.PORT)),
      API_PORT: parseInt(process.env.API_PORT || String(DEFAULT_CONFIG.API_PORT)),
      NODE_ENV: (process.env.NODE_ENV as any) || DEFAULT_CONFIG.NODE_ENV,
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
      GROQ_API_KEY: process.env.GROQ_API_KEY,
      GOOGLE_SEARCH_API_KEY: process.env.GOOGLE_SEARCH_API_KEY,
      GOOGLE_SEARCH_ENGINE_ID: process.env.GOOGLE_SEARCH_ENGINE_ID,
      GOOGLE_DRIVE_API_KEY: process.env.GOOGLE_DRIVE_API_KEY,
      GOOGLE_DRIVE_OAUTH_CLIENT_ID: process.env.GOOGLE_DRIVE_OAUTH_CLIENT_ID,
      GOOGLE_DRIVE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_DRIVE_OAUTH_CLIENT_SECRET,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      DATABASE_URL: process.env.DATABASE_URL,
      SUNO_API_KEY: process.env.SUNO_API_KEY,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    };
  }

  private validateRequiredEnvVars(): void {
    // 在開發模式下，允許使用預設密鑰
    if (!this.config.GEMINI_API_KEY && this.config.NODE_ENV === 'production') {
      throw new Error(`缺少必要的環境變數: ${ENV_VARS.GEMINI_API_KEY}`);
    }
    // 開發模式下如果沒有 API 密鑰，使用預設值
    if (!this.config.GEMINI_API_KEY) {
      this.config.GEMINI_API_KEY = 'demo-key-for-development';
      console.warn('⚠️ 使用開發模式預設密鑰，請在 .env 中配置真實的 GEMINI_API_KEY');
    }
  }

  get(): EnvConfig {
    return this.config;
  }

  getApiKey(provider: string): string {
    switch (provider) {
      case 'gemini':
        return this.config.GEMINI_API_KEY;
      case 'groq':
        return this.config.GROQ_API_KEY || '';
      case 'google-search':
        return this.config.GOOGLE_SEARCH_API_KEY || '';
      default:
        throw new Error(`未知的 AI 提供商: ${provider}`);
    }
  }

  isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }
}

export const configManager = new ConfigManager();
