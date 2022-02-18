// @author: Thanh LE thanhlq@gmail.com
// Last update: 2022/01/17
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { IncomingHttpHeaders } from 'http';
import qs from 'qs';
import {
  HttpHandlerFn,
  HttpHandlerFnNull,
  HttpPluginOptions,
  HttpRoute,
  IHttpServer,
  IHttpServerFactory,
  IHttpRequest,
  IHttpResponse,
} from '../interfaces/http';
import pino from 'pino';
import * as constants from '../constants';
import { setupMiddlewares } from './middlewares/middlewares';
import * as httpErrors from 'http-errors'

const env = process.env;
export const environment = env.NODE_ENV;
export const isProduction = environment == constants.PRODUCTION_ENV;

export const InitLogger = () => {
  let logger;

  if (!isProduction) {
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

const CreateServerInstance = () => {
  const serverInstance = fastify({
    // Logger only for production
    logger: logger,
    querystringParser: str => qs.parse(str),
  });

  setupMiddlewares(serverInstance)
    .then()
    .catch(err => {
      logger.error('Error when setting up middlewares!', err);
    });

  if (!isProduction) {
    serverInstance.addHook('preHandler', function (req, reply, done) {
      if (req.body) {
        req.log.info({ body: req.body }, 'parsed req body');
      }
      done();
    });
  }

  return serverInstance;
};

export class FastifyHttpRequest implements IHttpRequest {
  req: FastifyRequest;
  id?: string | undefined;
  url?: string | undefined;
  origin?: string | undefined;
  href?: string | undefined;
  method: string;
  path?: string;
  params?: any;
  query?: any;
  body?: any;
  headers?: IncomingHttpHeaders | undefined;
  querystring?: string | undefined;
  search?: string | undefined;
  host?: string | undefined;
  hostname?: string | undefined;
  protocol?: string;
  ip?: string;
  charset?: string | undefined;
  type?: string | undefined;
  isProduction: boolean;

  constructor(_req: FastifyRequest) {
    this.req = _req;
    this.id = this.req.id;
    this.method = this.req.method;
    this.params = this.req.params || {};
    this.query = this.req.query || {};
    this.body = this.req.body;
    this.headers = this.req.headers;

    this.url = this.req.url;
    this.protocol = this.req.protocol;
    this.ip = this.req.ip;
    // this.log = this.req.log;

    this.isProduction = environment == 'production';
  }

  /**
   * Get header.
   *
   * @param field
   * @returns
   */
  get(field: string): string | undefined {
    const h = this.req.raw.headers[field];
    if (h === undefined) {
      return undefined;
    }
    if (Array.isArray(h)) {
      return h.toString();
    }

    return h;
  }
}

export class FastifyHttpResponse implements IHttpResponse {
  _status: number = 200;
  message?: string | undefined;
  body?: unknown;
  length?: number | undefined;
  headerSent?: boolean | undefined;
  type?: string | undefined;
  etag?: string;
  res: FastifyReply;

  constructor(_res: FastifyReply) {
    this.type = 'application/json';
    this.res = _res;
  }

  set status(val: number) {
    this._status = val
    this.res?.status(val)
  }

  notFound(message?: string): IHttpResponse {
    this.res.send(new httpErrors.NotFound(message))
    return this
  }

  badRequest(message?: string): IHttpResponse {
    this.res.send(new httpErrors.BadRequest(message))
    return this
  }

  serverError(message?: string): IHttpResponse {
    this.res.send(new httpErrors.InternalServerError(message))
    return this
  }

  notAuthorized(message?: string): IHttpResponse {
    this.res.send(new httpErrors.Unauthorized(message))
    return this
  }

  permissionDenied(message?: string): IHttpResponse {
    this.res.send(new httpErrors.Forbidden(message))
    return this
  }

  resourceExisted(message?: string): IHttpResponse {
    this.res.send(new httpErrors.Conflict(message))
    return this
  }

  send(payload?: any) {
    this.res.status(this._status)
    this.res.send(payload);
  }

  set(field: { [key: string]: string | string[] }): IHttpResponse;
  set(field: string, val: string | string[]): IHttpResponse;
  set(field: any, val?: any): IHttpResponse {
    this.res.header(field, val);
    return this;
  }
  header(field: { [key: string]: string | string[] }): IHttpResponse;
  header(field: string, val: string | string[]): IHttpResponse;
  header(field: any, val?: any): IHttpResponse {
    this.res.header(field, val);
    return this;
  }

  debugRequest(request: FastifyRequest) {
    const debug = logger.debug;
    debug(JSON.stringify(request.body));
    debug(JSON.stringify(request.query));
    debug(JSON.stringify(request.params));
    debug(JSON.stringify(request.headers));
    debug(request.raw);
    debug(request.server);
    debug(request.id);
    debug(request.ip);
    debug(request.ips);
    debug(request.hostname);
    debug(request.protocol);
    debug(request.url);
    debug(request.routerMethod);
    debug(request.routerPath);
  }
}

/**
 * Fastify implementation.
 */
export class FastifyHttpServer implements IHttpServer {
  server: FastifyInstance;
  routes: HttpRoute[] = [];

  constructor(serverInstance?: any) {
    this.server = serverInstance || CreateServerInstance();
  }

  listen(port: any): void {
    this.server.listen(port);
  }

  getInstance() {
    return this.server;
  }

  get(path: string, handler: HttpHandlerFn): IHttpServer {
    this.server.get(path, FastifyHandlerWrapper(handler));
    return this;
  }

  post(path: string, handler: HttpHandlerFn): IHttpServer {
    throw new Error('Method not implemented.');
  }

  put(path: string, handler: HttpHandlerFn): IHttpServer {
    throw new Error('Method not implemented.');
  }

  delete(path: string, handler: HttpHandlerFn): IHttpServer {
    throw new Error('Method not implemented.');
  }

  head(path: string, handler: HttpHandlerFn): IHttpServer {
    throw new Error('Method not implemented.');
  }

  option(path: string, handler: HttpHandlerFn): IHttpServer {
    throw new Error('Method not implemented.');
  }

  registerRoute(routes: HttpRoute, opts: HttpPluginOptions): void {
    // serverInstance.register(route , opts: HttpPluginOptions)
  }

  registerRoutes(routes: HttpRoute[], opts: HttpPluginOptions): void {
    // this.server.register(DoRegisterRoutes(this.server, routes, opts))
    this.server.register(RegisterApiController(routes), opts);
  }

  getServerInstance(): any {
    return this.server;
  }

  setServerInstance(server: any) {
    this.server = server;
  }
}

function FastifyHandlerWrapper(handler: HttpHandlerFn) {
  return async function FastifyHandler(req: FastifyRequest, res: FastifyReply) {
    return await handler(
      new FastifyHttpRequest(req),
      new FastifyHttpResponse(res),
    );
  };
}

function RegisterApiController(routes: HttpRoute[]) {
  return async function ApiController(router: FastifyInstance) {
    for (const r of routes) {
      if (r.method && r.handler) {
        switch (r.method) {
          case 'get':
            logger.debug(`Registered GET:${r.path}`);
            router.get(
              r.path,
              async function (req: FastifyRequest, res: FastifyReply) {
                const handler: HttpHandlerFn = r.handler || HttpHandlerFnNull;
                const hResult = await handler(
                  new FastifyHttpRequest(req),
                  new FastifyHttpResponse(res),
                );
                if (!res.sent) {
                  return hResult;
                }
              },
            );
            break;
          case 'post':
            logger.debug(`Registered  POST:${r.path}`);
            router.post(
              r.path,
              async function (req: FastifyRequest, res: FastifyReply) {
                const handler: HttpHandlerFn = r.handler || HttpHandlerFnNull;
                const hResult = await handler(
                  new FastifyHttpRequest(req),
                  new FastifyHttpResponse(res),
                );
                if (!res.sent) {
                  return hResult;
                }
              },
            );
            break;
          case 'put':
            logger.debug(`Registered  PUT:${r.path}`);
            router.put(
              r.path,
              async function (req: FastifyRequest, res: FastifyReply) {
                const handler: HttpHandlerFn = r.handler || HttpHandlerFnNull;
                const hResult = await handler(
                  new FastifyHttpRequest(req),
                  new FastifyHttpResponse(res),
                );
                if (!res.sent) {
                  return hResult;
                }
              },
            );
            break;
          case 'patch':
            logger.debug(`Registered  PATCH:${r.path}`);
            router.patch(
              r.path,
              async function (req: FastifyRequest, res: FastifyReply) {
                const handler: HttpHandlerFn = r.handler || HttpHandlerFnNull;
                const hResult = await handler(
                  new FastifyHttpRequest(req),
                  new FastifyHttpResponse(res),
                );
                if (!res.sent) {
                  return hResult;
                }
              },
            );
            break;
          case 'delete':
            logger.debug(`Registered  DELETE:${r.path}`);
            router.delete(
              r.path,
              async function (req: FastifyRequest, res: FastifyReply) {
                const handler: HttpHandlerFn = r.handler || HttpHandlerFnNull;
                const hResult = await handler(
                  new FastifyHttpRequest(req),
                  new FastifyHttpResponse(res),
                );
                if (!res.sent) {
                  return hResult;
                }
              },
            );
            break;
          case 'options':
            logger.debug(`Registered  OPTIONS:${r.path}`);
            router.options(
              r.path,
              async function (req: FastifyRequest, res: FastifyReply) {
                const handler: HttpHandlerFn = r.handler || HttpHandlerFnNull;
                const hResult = await handler(
                  new FastifyHttpRequest(req),
                  new FastifyHttpResponse(res),
                );
                if (!res.sent) {
                  return hResult;
                }
              },
            );
            break;
          case 'head':
            logger.debug(`Registered  HEAD:${r.path}`);
            router.head(
              r.path,
              async function (req: FastifyRequest, res: FastifyReply) {
                const handler: HttpHandlerFn = r.handler || HttpHandlerFnNull;
                const hResult = await handler(
                  new FastifyHttpRequest(req),
                  new FastifyHttpResponse(res),
                );
                if (!res.sent) {
                  return hResult;
                }
              },
            );
            break;
        }
      }
    }
  };
}

function DoRegisterRoutes(
  router: FastifyInstance,
  routes: HttpRoute[],
  opts: HttpPluginOptions,
) {
  // fastify.register(userController, { prefix: '/api/v1/user' });

  // async function userController(router: FastifyInstance) {
  //   // GET /api/v1/user
  //   router.get(
  //     '/',
  //     async function (req: FastifyRequest, res: FastifyReply) {
  //       res.send({
  //         balance: '$3,277.32',
  //         picture: 'http://placehold.it/32x32',
  //         age: 30,
  //         query: req.query,
  //         name: 'Leonor Cross',
  //         gender: 'female',
  //         company: 'GRONK',
  //         email: 'leonorcross@gronk.com',
  //       });
  //     }
  //   );
  // }

  return async function RouterMiddleware(router: FastifyInstance) {
    /**
     * opts: { prefix: '/api/v1/user' }
     */
    router.register(RegisterApiController(routes), opts);
  };
}

export class FastityServerFactory implements IHttpServerFactory {
  createServer(framework?: string, args?: any): IHttpServer {
    const app = new FastifyHttpServer(args);
    return app;
  }
}

const HttpServerFactory = new FastityServerFactory();
export { HttpServerFactory };
