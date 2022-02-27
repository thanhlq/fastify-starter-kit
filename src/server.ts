import { appPath } from '../config.js'
import HttpServerFactory from './core/http-server-factory.js';
import DatabaseManager from './database/database-manager.js';
import RegisterRoute from './api/route-config.js';
import * as constants from './core/constants.js'
import { logger } from './core/logger/index.js';
import { IHttpServer } from './core/interfaces/http.js';

/**
 * Simple class with responsibility to start the http server.
 */
export default class ServerMain {

  static app: IHttpServer
  private static _ready: boolean;
  private static _started;

  public static async start() {
    if (!this._started) {
      this._started = true

      /* Init DB */
      DatabaseManager.init();

      /* Init Http Server */
      const FASTIFY_PORT = Number(process.env.PORT) || 3000;
      ServerMain.app = await HttpServerFactory.CreateServerInstance();
      RegisterRoute(ServerMain.app);
      if (constants.DEVELOPMENT_ENV === process.env.NODE_ENV || constants.STAGING_ENV === process.env.NODE_ENV) {
        const server = ServerMain.app;
        server.ready(err => {
          if (!err) {
            logger.info('🚀  HTTP server READY!')
            ServerMain._ready = true
          } else {
            logger.error('HTTP SERVER FAILED TO START, GOING TO EXIST!')
            logger.error(err)
            process.exit(0)
          }
        });
      }
      await ServerMain.app.listen({ port: FASTIFY_PORT });
      logger.info(`🚀  HTTP server running on port: ${FASTIFY_PORT}`)
      logger.info(`🚀  Application root path: ${appPath}`)
    } else {
      logger.warn('Server is already starting...')
    }
    return await (ServerMain.app.ready() as Promise<IHttpServer>)
  }

  public static getHttpServerReady(): Promise<IHttpServer> {
    if (ServerMain._ready) {
      return Promise.resolve(ServerMain.app)
    }

    // ready not working???
    return new Promise((resolve, reject) => {
      const listenServerReady = (app) => {
        app.ready(
          (err) => {
            if (!err) {
              resolve(ServerMain.app)
            } else {
              reject(err)
            }
          })
      }

      if (!ServerMain._started) {
        ServerMain.start()
          .then((app) => {
            listenServerReady(app)
          }).catch(reject)
      } else {
        listenServerReady(ServerMain.app)
      }
    })
  }

}
