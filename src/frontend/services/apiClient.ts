/**
 * 前端 API 服務
 */

import { AIRequest, AIResponse, DriveRequest, DriveResponse } from '../../shared/types';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:3000';

export class APIClient {
  private static baseURL = `${API_BASE_URL}/api`;

  /**
   * AI 聊天
   */
  static async aiChat(request: AIRequest): Promise<AIResponse> {
    return this.post('/ai/chat', request);
  }

  /**
   * 圖像分析
   */
  static async analyzeImage(imageData: string, prompt?: string): Promise<AIResponse> {
    return this.post('/ai/vision', { imageData, prompt });
  }

  /**
   * 文檔掃描
   */
  static async scanDocument(imageData: string): Promise<AIResponse> {
    return this.post('/ai/document-scan', { imageData });
  }

  /**
   * 網絡搜索
   */
  static async search(query: string): Promise<AIResponse> {
    return this.post('/ai/search', { query });
  }

  /**
   * 分析網頁
   */
  static async analyzeUrl(url: string): Promise<AIResponse> {
    return this.post('/ai/analyze-url', { url });
  }

  /**
   * 位置分析
   */
  static async getLocation(latitude: number, longitude: number): Promise<AIResponse> {
    return this.post('/ai/location', { latitude, longitude });
  }

  /**
   * 執行 Drive 命令
   */
  static async executeDriveCommand(request: DriveRequest): Promise<DriveResponse> {
    return this.post('/drive/execute', request);
  }

  /**
   * 列出 Drive 文件
   */
  static async listDriveFiles(folderId: string): Promise<DriveResponse> {
    return this.get('/drive/list', { folderId });
  }

  /**
   * 獲取所有外掛
   */
  static async getPlugins(): Promise<any> {
    return this.get('/plugins');
  }

  /**
   * 獲取單個外掛
   */
  static async getPlugin(id: string): Promise<any> {
    return this.get(`/plugins/${id}`);
  }

  /**
   * 啟用外掛
   */
  static async enablePlugin(id: string, config?: any): Promise<any> {
    return this.post(`/plugins/${id}/enable`, { config });
  }

  /**
   * 執行外掛
   */
  static async executePlugin(id: string, data: any): Promise<any> {
    return this.post(`/plugins/${id}/execute`, data);
  }

  /**
   * 健康檢查
   */
  static async healthCheck(): Promise<any> {
    return this.get('/health');
  }

  /**
   * GET 請求
   */
  private static async get(path: string, params?: any): Promise<any> {
    const url = new URL(`${this.baseURL}${path}`);
    if (params) {
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
      });
    }

    const response = await fetch(url.toString());
    return this.handleResponse(response);
  }

  /**
   * POST 請求
   */
  private static async post(path: string, data?: any): Promise<any> {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  /**
   * 處理響應
   */
  private static async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '請求失敗');
    }
    return response.json();
  }
}
