/**
 * Google Drive API 路由
 */

import { Router, Request, Response } from 'express';
import { DriveService } from '../services/driveService';
import { DriveRequest } from '../../shared/types';
import { logger } from '../utils/logger';
import { LogStage } from '../../shared/constants';

export const driveRouter = Router();

/**
 * POST /api/drive/execute - 執行 Drive 命令
 */
driveRouter.post('/execute', async (req: Request, res: Response) => {
  try {
    const driveRequest: DriveRequest = req.body;

    if (!driveRequest.command) {
      return res.status(400).json({
        success: false,
        error: '缺少命令參數',
      });
    }

    const result = await DriveService.executeCommand(driveRequest);

    res.json(result);
  } catch (error: any) {
    logger.error(LogStage.DRIVE, `Drive 命令執行出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/drive/list - 列出文件夾
 */
driveRouter.get('/list', async (req: Request, res: Response) => {
  try {
    const { folderId } = req.query;

    if (!folderId) {
      return res.status(400).json({
        success: false,
        error: '缺少 folderId 參數',
      });
    }

    const result = await DriveService.executeCommand({
      command: 'LIST_FILES',
      params: { folderId },
    });

    res.json(result);
  } catch (error: any) {
    logger.error(LogStage.DRIVE, `文件列表出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/drive/upload - 上傳文件
 */
driveRouter.post('/upload', async (req: Request, res: Response) => {
  try {
    const { name, content, folderId } = req.body;

    if (!name || !content) {
      return res.status(400).json({
        success: false,
        error: '缺少必要參數: name, content',
      });
    }

    const result = await DriveService.executeCommand({
      command: 'CREATE_SCRATCH',
      params: { name, content, folderId },
    });

    res.json(result);
  } catch (error: any) {
    logger.error(LogStage.DRIVE, `文件上傳出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * DELETE /api/drive/:fileId - 刪除文件
 */
driveRouter.delete('/:fileId', async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;

    const result = await DriveService.executeCommand({
      command: 'DELETE_FILE',
      params: { fileId },
    });

    res.json(result);
  } catch (error: any) {
    logger.error(LogStage.DRIVE, `文件刪除出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/drive/share - 分享文件
 */
driveRouter.post('/share', async (req: Request, res: Response) => {
  try {
    const { fileId, email, role } = req.body;

    if (!fileId || !email) {
      return res.status(400).json({
        success: false,
        error: '缺少必要參數: fileId, email',
      });
    }

    const result = await DriveService.executeCommand({
      command: 'SHARE_FILE',
      params: { fileId, email, role: role || 'reader' },
    });

    res.json(result);
  } catch (error: any) {
    logger.error(LogStage.DRIVE, `文件分享出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
