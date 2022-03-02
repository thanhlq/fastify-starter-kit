/* Thanh LE */
/* Entry point for starting the server */
import { appPath } from '../config.js';
import DatabaseManager from './database/database-manager.js';
import buildApp from './app.js';
import { IHttpServer } from './core/interfaces/http.js';
import { logger } from './core/logger/index.js';

/* Init Http Server */
const port = Number(process.env.PORT) || 3000;

DatabaseManager.init()

buildApp()
  .then((app: IHttpServer) => {
    app.listen({ port })
    logger.info(`🚀  HTTP server running on port: ${port}`);
    logger.info(`🚀  Application root path: ${appPath}`);
  })
  .catch(e => {
    logger.error(e, 'Error when starting the app');
  });
