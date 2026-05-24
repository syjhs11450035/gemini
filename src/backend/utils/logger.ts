/**
 * Logger 工具 - 統一日誌管理
 */

import { LogLevel, LogStage } from '../../shared/constants';

export class Logger {
  private stage: string = '';

  constructor(stage?: string) {
    this.stage = stage || '';
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${level} ${this.stage} ${message}`;
  }

  info(stage: string, message: string): void {
    console.log(this.formatMessage(LogLevel.INFO, `${stage} ${message}`));
  }

  warn(stage: string, message: string): void {
    console.warn(this.formatMessage(LogLevel.WARN, `${stage} ${message}`));
  }

  error(stage: string, message: string): void {
    console.error(this.formatMessage(LogLevel.ERROR, `${stage} ${message}`));
  }

  debug(stage: string, message: string): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage(LogLevel.DEBUG, `${stage} ${message}`));
    }
  }

  fatal(stage: string, message: string): void {
    console.error(this.formatMessage(LogLevel.FATAL, `${stage} ${message}`));
  }
}

export const logger = new Logger();
