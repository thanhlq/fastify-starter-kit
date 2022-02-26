// import { appPath } from '../config'
import HttpServerFactory from './core/http-server-factory.js';
import DatabaseManager from './database/database-manager.js';
import RegisterRoute from './api/route-config.js';
import * as constants from './core/constants.js'
import { logger } from './core/logger/index.js';

const init = async () => {

  /* Init DB */
  DatabaseManager.init();

  /* Init Http Server */
  const FASTIFY_PORT = Number(process.env.PORT) || 3003;
  const app = await HttpServerFactory.CreateServerInstance();
  RegisterRoute(app);

  if (constants.DEVELOPMENT_ENV === process.env.NODE_ENV || constants.STAGING_ENV === process.env.NODE_ENV) {
    const server = app.server;

    server.ready(err => {
      if (!err) {
        logger.info(`🚀  HTTP server running on port: ${FASTIFY_PORT}`)
      } else {
        logger.error(err)
      }
    });

    // const prettyLog = await (await import('./core/utils/pretty-console')).default
    // const log = prettyLog.CreatePrettyConsoleLog
    console.log('ENVIRONMENT: ' + process.env.NODE_ENV)
    // console.log('ROOT PATH: ' + appPath)
  }

  app.listen({ port: FASTIFY_PORT });
  return app;
};

init().then();

export default {StartApp: init}