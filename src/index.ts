import * as config from './config'

import { FastifyInstance } from 'fastify';
import { HttpServerFactory } from './core';
import DatabaseManager from './database/database';
import RegisterRoute from './api/route-config';
import * as constants from './core/constants'

const init = async () => {
  /* Init DB */
  DatabaseManager.init();

  const app = await HttpServerFactory.CreateServerInstance();
  RegisterRoute(app);

  //enable swagger docs
  if (constants.DEVELOPMENT_ENV === process.env.NODE_ENV || constants.STAGING_ENV === process.env.NODE_ENV) {
    const server = app.server as FastifyInstance;

    // server.ready(err => {
    //   if (!err) {
        // https://github.com/fastify/fastify-swagger
        // fastify.swagger()
    //   }
    // });

    // const prettyLog = await (await import('./core/utils/pretty-console')).default
    // const log = prettyLog.CreatePrettyConsoleLog
    console.log('ENVIRONMENT: ' + process.env.NODE_ENV)
    console.log('ROOT PATH: ' + config.appPath)
  }

  const FASTIFY_PORT = Number(process.env.PORT) || 3003;
  app.listen({ port: FASTIFY_PORT });
  console.log(`🚀  HTTP server running on port ${FASTIFY_PORT}`);
};

init().then();
