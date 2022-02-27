/**
 * Currently, reuse 'pino' from fastify (if platform-fastity is not used, pino must be added as dependency)
 */

import { pino } from 'pino';
import * as constants from '../constants.js';

const env = process.env;

export const InitLogger = () => {
  let logger;

  if (!constants.isProduction) {
    const transport = pino.transport({
      target: 'pino-pretty',
      options: { colorize: true },
    });
    logger = pino(
      {
        level: env.LOG_LEVEL || 'debug',
        translateTime: 'HH:MM:ss Z',
        // ignore: 'pid,hostname'
      },
      transport,
    );
  } else {
    logger = pino({
      level: env.LOG_LEVEL || 'info',
    });
  }

  return logger;
};

const logger = InitLogger();
export { logger };

export class LoggerFactory {
  public static createLogger() {
    return logger;
  }
}
