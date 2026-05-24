/**
 * 前端類型定義
 */

export interface ChatState {
  messages: any[];
  loading: boolean;
  error: string | null;
}

export interface AIState {
  provider: string;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  chat: ChatState;
  ai: AIState;
  plugins: any[];
}
