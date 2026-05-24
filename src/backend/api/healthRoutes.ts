/**
 * 健康檢查和其他公共 API 路由
 */

import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger';
import { LogStage } from '../../shared/constants';

export const healthRouter = Router();

/**
 * GET /api/health - 健康檢查
 */
healthRouter.get('/', async (req: Request, res: Response) => {
  try {
    res.json({
      status: 'ok',
      message: 'Gemini Clone Agent 服務運行正常',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error: any) {
    logger.error(LogStage.ERROR, `健康檢查失敗: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * GET /api/status - 詳細狀態
 */
healthRouter.get('/status', async (req: Request, res: Response) => {
  try {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      platform: process.platform,
      nodeVersion: process.version,
      modules: {
        ai: true,
        drive: true,
        plugins: true,
        search: true,
        vision: true,
      },
    });
  } catch (error: any) {
    logger.error(LogStage.ERROR, `狀態查詢失敗: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * GET /api/version - 版本信息
 */
healthRouter.get('/version', async (req: Request, res: Response) => {
  try {
    res.json({
      name: 'Gemini Clone Agent',
      version: '1.0.0',
      buildDate: new Date().toISOString(),
      features: [
        'AI Multi-Provider Support',
        'Google Drive Integration',
        'Plugin System',
        'Vision Analysis',
        'Web Search',
        'Document Scanning',
      ],
    });
  } catch (error: any) {
    logger.error(LogStage.ERROR, `版本查詢失敗: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});
