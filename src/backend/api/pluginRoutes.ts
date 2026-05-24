/**
 * 外掛 API 路由
 */

import { Router, Request, Response } from 'express';
import { pluginManager } from '../services/pluginManager';
import { PluginType } from '../../shared/types';
import { logger } from '../utils/logger';
import { LogStage } from '../../shared/constants';

export const pluginRouter = Router();

/**
 * GET /api/plugins - 獲取所有外掛
 */
pluginRouter.get('/', async (req: Request, res: Response) => {
  try {
    const plugins = pluginManager.getAll();
    res.json({
      success: true,
      data: plugins,
    });
  } catch (error: any) {
    logger.error(LogStage.PLUGIN, `獲取外掛列表出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/plugins/:id - 獲取單個外掛信息
 */
pluginRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plugin = pluginManager.get(id as PluginType);

    if (!plugin) {
      return res.status(404).json({
        success: false,
        error: `外掛 ${id} 不存在`,
      });
    }

    res.json({
      success: true,
      data: plugin,
    });
  } catch (error: any) {
    logger.error(LogStage.PLUGIN, `獲取外掛信息出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/plugins/:id/enable - 啟用外掛
 */
pluginRouter.post('/:id/enable', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { config } = req.body;

    const enabled = pluginManager.enable(id as PluginType, config);

    if (!enabled) {
      return res.status(404).json({
        success: false,
        error: `外掛 ${id} 不存在`,
      });
    }

    res.json({
      success: true,
      message: `已啟用外掛 ${id}`,
    });
  } catch (error: any) {
    logger.error(LogStage.PLUGIN, `啟用外掛出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/plugins/:id/disable - 禁用外掛
 */
pluginRouter.post('/:id/disable', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const disabled = pluginManager.disable(id as PluginType);

    if (!disabled) {
      return res.status(404).json({
        success: false,
        error: `外掛 ${id} 不存在`,
      });
    }

    res.json({
      success: true,
      message: `已禁用外掛 ${id}`,
    });
  } catch (error: any) {
    logger.error(LogStage.PLUGIN, `禁用外掛出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/plugins/:id/execute - 執行外掛
 */
pluginRouter.post('/:id/execute', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await pluginManager.execute(id as PluginType, data);

    res.json(result);
  } catch (error: any) {
    logger.error(LogStage.PLUGIN, `執行外掛出錯: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
