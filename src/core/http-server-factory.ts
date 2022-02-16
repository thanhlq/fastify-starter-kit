import { IHttpServer, IHttpServerFactory } from './interfaces/http';

/**
 * fastify | expressjs | ...
 */
const httpCoreFramework = process.env.CORE_FRAMEWORK || 'fastify';

export class HttpServerFactory {
  static async CreateServerInstance(opts?: {}): Promise<IHttpServer> {
    try {
      const frameworkImplImportPath = `./platform-${httpCoreFramework}/index`;
      const adapterImport = await import(frameworkImplImportPath);
      const appFactory: IHttpServerFactory = adapterImport.HttpServerFactory;
      const app: IHttpServer = appFactory.createServer(opts);
      return app;
    } catch (e) {
      console.error('Error when creating server instance by factory!', e);
      throw e;
    }
  }
}
