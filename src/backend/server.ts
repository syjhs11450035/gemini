/**
 * 後端服務器主文件
 */

console.log('[INIT] 伺服器正在初始化...');

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// 導入路由
import { aiRouter } from './api/aiRoutes';
import { driveRouter } from './api/driveRoutes';
import { pluginRouter } from './api/pluginRoutes';
import { healthRouter } from './api/healthRoutes';

// 導入工具
import { logger } from './utils/logger';
import { LogStage } from '../shared/constants';
import { configManager } from './config/env';

dotenv.config();

const app: Express = express();
const PORT = configManager.get().PORT;
const API_PORT = configManager.get().API_PORT;

// ============= 中間件 =============

// CORS 配置
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:*', 'http://127.0.0.1:*'],
  credentials: true,
}));

// 解析 JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 請求日誌中間件
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.debug(LogStage.API, `${req.method} ${req.path}`);
  next();
});

// ============= API 路由 =============

// 健康檢查
app.use('/api/health', healthRouter);

// AI 路由
app.use('/api/ai', aiRouter);

// Google Drive 路由
app.use('/api/drive', driveRouter);

// 外掛路由
app.use('/api/plugins', pluginRouter);

// ============= 靜態文件和 Vite 集成 =============

async function startServer() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      // 開發環境：使用 Vite 中間件
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      
      app.use(vite.middlewares);
      
      // 任何未匹配的路由都返回 index.html
      app.get('*', (req, res) => {
        const indexPath = path.join(__dirname, '../frontend/index.html');
        res.sendFile(indexPath);
      });

      logger.info(LogStage.SERVER, `Vite 開發服務器已配置`);
    } else {
      // 生產環境：使用預構建的靜態文件
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });

      logger.info(LogStage.SERVER, `生產環境靜態文件已配置`);
    }

    // ============= 錯誤處理 =============

    // 404 處理
    app.use((req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: '請求的資源不存在',
        path: req.path,
      });
    });

    // 全局錯誤處理
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      logger.error(LogStage.ERROR, `${err.message}`);
      res.status(err.status || 500).json({
        success: false,
        error: err.message || '內部服務器錯誤',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      });
    });

    // ============= 啟動服務器 =============

    const server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(
        LogStage.SERVER,
        `✓ 服務器已啟動於 http://localhost:${PORT}`
      );
      logger.info(LogStage.SERVER, `環境: ${process.env.NODE_ENV}`);
      logger.info(LogStage.SERVER, `API 前綴: /api/*`);
    });

    // 錯誤處理
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        logger.error(
          LogStage.ERROR,
          `Port ${PORT} 已被佔用，請使用其他端口`
        );
        process.exit(1);
      }
      throw err;
    });

    // 優雅關閉
    process.on('SIGTERM', () => {
      logger.info(LogStage.SERVER, '正在優雅關閉服務器...');
      server.close(() => {
        logger.info(LogStage.SERVER, '服務器已關閉');
        process.exit(0);
      });
    });

  } catch (error: any) {
    logger.error(LogStage.ERROR, `伺服器啟動失敗: ${error.message}`);
    process.exit(1);
  }
}

// 驗證環境變數
if (!configManager.get().GEMINI_API_KEY) {
  logger.error(LogStage.ERROR, '[GEMINI_API_KEY] 環境變數未設定');
  process.exit(1);
}

// 啟動服務器
startServer();
