import { IHttpServer, IHttpServerFactory } from './interfaces/http.js';

/**
 * fastify | expressjs | ...
 */
const httpCoreFramework = process.env.CORE_FRAMEWORK || 'fastify';

export default class HttpServerFactory {
  static async CreateServerInstance(opts?: {}): Promise<IHttpServer> {
    try {
      const frameworkImplImportPath = `./platform-${httpCoreFramework}/index.js`;
      const adapterImport = await import(frameworkImplImportPath);
      const appFactory: IHttpServerFactory = adapterImport.HttpServerFactory;
      const app: IHttpServer = appFactory.createHttpServer(opts);
      await app.run();
      return app;
    } catch (e) {
      console.error(e, 'Error when creating server instance by factory!');
      throw e;
    }
  }
}
