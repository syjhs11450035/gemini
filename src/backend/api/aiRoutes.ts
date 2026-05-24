/**
 * AI API 路由
 */

import { Router, Request, Response } from 'express';
import { AIService } from '../services/aiService';
import { VisionService } from '../services/visionService';
import { SearchService } from '../services/searchService';
import { AIRequest, AIResponse } from '../../shared/types';
import { logger } from '../utils/logger';
import { LogStage } from '../../shared/constants';

export const aiRouter = Router();

/**
 * POST /api/ai/chat - 一般對話
 */
aiRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const { prompt, provider, tool, context, temperature, maxTokens }: AIRequest = req.body;

    if (!prompt || !provider) {
      return res.status(400).json({
        success: false,
        error: '缺少必要參數: prompt, provider',
      });
    }

    const request: AIRequest = {
      prompt,
      provider,
      tool,
      context,
      temperature,
      maxTokens,
    };

    const response = await AIService.generateResponse(request);

    res.json(response);
  } catch (error: any) {
    logger.error(LogStage.API, `AI 聊天出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/ai/vision - 圖像分析
 */
aiRouter.post('/vision', async (req: Request, res: Response) => {
  try {
    const { imageData, prompt } = req.body;

    if (!imageData) {
      return res.status(400).json({
        success: false,
        error: '缺少圖像數據',
      });
    }

    const result = await VisionService.analyzeImage(imageData, prompt || '分析這張圖像');

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    logger.error(LogStage.API, `視覺分析出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/ai/document-scan - 文檔掃描
 */
aiRouter.post('/document-scan', async (req: Request, res: Response) => {
  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({
        success: false,
        error: '缺少圖像數據',
      });
    }

    const result = await VisionService.scanDocument(imageData);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    logger.error(LogStage.API, `文檔掃描出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/ai/search - 智能網絡搜索
 */
aiRouter.post('/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: '缺少搜索查詢',
      });
    }

    const result = await SearchService.intelligentSearch(query);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    logger.error(LogStage.API, `搜索出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/ai/analyze-url - 分析網頁
 */
aiRouter.post('/analyze-url', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: '缺少 URL',
      });
    }

    const result = await SearchService.guessAndAnalyze(url);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    logger.error(LogStage.API, `URL 分析出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/ai/location - 位置分析
 */
aiRouter.post('/location', async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        error: '缺少位置信息',
      });
    }

    const result = await VisionService.getLocationInfo(latitude, longitude);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    logger.error(LogStage.API, `位置分析出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
