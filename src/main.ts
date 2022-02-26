// import { appPath } from '../config'
import HttpServerFactory from './core/http-server-factory.js';
import DatabaseManager from './database/database-manager.js';
import RegisterRoute from './api/route-config.js';
import * as constants from './core/constants.js'
import { logger } from './core/logger/index.js';
import { IHttpServer } from './core/interfaces/http.js';

/**
 * Simple class with responsibility to start the http server.
 */
export default class Main {

  static app: IHttpServer
  private static _ready: boolean;
  private static _started;

  public static async start() {
    if (!this._started) {
      /* Init DB */
      DatabaseManager.init();

      /* Init Http Server */
      const FASTIFY_PORT = Number(process.env.PORT) || 3003;
      Main.app = await HttpServerFactory.CreateServerInstance();
      RegisterRoute(Main.app);

      if (constants.DEVELOPMENT_ENV === process.env.NODE_ENV || constants.STAGING_ENV === process.env.NODE_ENV) {
        const server = Main.app;

        server.ready(err => {
          if (!err) {
            logger.info(`🚀  HTTP server running on port: ${FASTIFY_PORT}`)
            Main._ready = true
          } else {
            logger.error('HTTP SERVER FAILED TO START, GOING TO EXIST!')
            logger.error(err)
            process.exit(0)
          }
        });

        console.log('ENVIRONMENT: ' + process.env.NODE_ENV)
      }

      Main.app.listen({ port: FASTIFY_PORT });
    }
  }

  public static getHttpServer(): Promise<IHttpServer> {
    if (Main._ready) {
      return Promise.resolve(Main.app)
    }
    return new Promise((resolve, reject) => {
      if (!Main._started) {
        Main.start()
      }

      Main.app.ready((err) => {
        if (!err) {
          resolve(Main.app)
        } else {
          reject(err)
        }
      })
    })

  }

}

Main.start()