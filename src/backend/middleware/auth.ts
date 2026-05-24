/**
 * CORS 和認證中間件
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { LogStage } from '../../shared/constants';

/**
 * 檢查 API 金鑰
 */
export const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    logger.warn(LogStage.AUTH, '缺少 API 金鑰');
    return res.status(401).json({
      success: false,
      error: '缺少 API 金鑰',
    });
  }

  // 這裡應該驗證 API 金鑰
  next();
};

/**
 * 檢查 Auth Token
 */
export const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    logger.warn(LogStage.AUTH, '缺少認證 Token');
    return res.status(401).json({
      success: false,
      error: '缺少認證 Token',
    });
  }

  // 這裡應該驗證 Token
  next();
};

/**
 * 速率限制
 */
export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  // 實現速率限制邏輯
  next();
};

/**
 * 錯誤捕獲中間件
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(LogStage.ERROR, `[${req.method} ${req.path}] ${err.message}`);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || '內部服務器錯誤',
  });
};
