// @author: Thanh LE thanhlq@gmail.com
// Last update: 2022/01/17
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { IncomingHttpHeaders } from 'http';
import qs from 'qs';
import pino from 'pino';
import * as httpErrors from 'http-errors';
import * as _ from 'lodash'

import {
  HttpHandlerFn,
  HttpHandlerFnNull,
  HttpPluginOptions,
  HttpRoute,
  IHttpServer,
  IHttpServerFactory,
  IHttpRequest,
  IHttpResponse,
  HttpServerListener,
} from '../interfaces/http.js';
import { setupFastifyMiddlewares } from './middlewares/middlewares.js';
import { isProduction } from '../constants.js';

const env = process.env;

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

const newServerInstance = (opts?: any) => {
  opts = opts || {}
  return fastify({
    // Logger only for production
    logger: logger,
    querystringParser: str => qs.parse(str),
    ...opts
  });
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

    this.isProduction = isProduction;
  }

  get server() {
    return this.req.server;
  }

  /** fastify-polyglot middleware must be registered */
  get i18n() {
    return this.req.server['i18n'];
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

  toJson = () => {
    return _.omit(this, [ 'server' ]);
  }
}

export class FastifyHttpResponse implements IHttpResponse {
  _status: number;
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
    this._status = 200;
  }

  set status(val: number) {
    this._status = val;
    this.res?.status(val);
  }

  notFound(message?: string): IHttpResponse {
    this.res.send(new httpErrors.NotFound(message));
    return this;
  }

  badRequest(message?: string): IHttpResponse {
    this.res.send(new httpErrors.BadRequest(message));
    return this;
  }

  serverError(message?: string): IHttpResponse {
    this.res.send(new httpErrors.InternalServerError(message));
    return this;
  }

  notAuthorized(message?: string): IHttpResponse {
    this.res.send(new httpErrors.Unauthorized(message));
    return this;
  }

  permissionDenied(message?: string): IHttpResponse {
    this.res.send(new httpErrors.Forbidden(message));
    return this;
  }

  resourceExisted(message?: string): IHttpResponse {
    this.res.send(new httpErrors.Conflict(message));
    return this;
  }

  send(payload?: any) {
    this.res.status(this._status);
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
  public server;
  routes: HttpRoute[] = [];

  constructor(opts = {}) {
    this.server = newServerInstance(opts);
  }

  public async run() {
    await setupFastifyMiddlewares(this.server);
  }

  listen(port: any): void {
    this.server.listen(port);
  }

  /**
   * Listen the server ready event. No arguments it will return a Promise.
   */
  ready(listener?: HttpServerListener) {
    if (listener) {
      this.server.ready(err => {
        listener(err);
      });
    } else {
      /* return promise */
      return this.server.ready();
    }
  }

  getInstance() {
    return this.server;
  }

  async close() {
    return await this.server.close();
  }

  get(path: string, handler: HttpHandlerFn): IHttpServer {
    this.server.get(path, FastifyHandlerWrapper(handler));
    return this;
  }

  post(path: string, handler: HttpHandlerFn): IHttpServer {
    this.server.post(path, FastifyHandlerWrapper(handler));
    return this;
  }

  put(path: string, handler: HttpHandlerFn): IHttpServer {
    this.server.post(path, FastifyHandlerWrapper(handler));
    return this;
  }

  patch(path: string, handler: HttpHandlerFn): IHttpServer {
    this.server.patch(path, FastifyHandlerWrapper(handler));
    return this;
  }

  delete(path: string, handler: HttpHandlerFn): IHttpServer {
    this.server.delete(path, FastifyHandlerWrapper(handler));
    return this;
  }

  head(path: string, handler: HttpHandlerFn): IHttpServer {
    this.server.head(path, FastifyHandlerWrapper(handler));
    return this;
  }

  options(path: string, handler: HttpHandlerFn): IHttpServer {
    this.server.options(path, FastifyHandlerWrapper(handler));
    return this;
  }

  registerRoute(route: HttpRoute, opts: HttpPluginOptions): void {
    this.registerRoutes([route], opts)
  }

  registerRoutes(routes: HttpRoute[], opts: HttpPluginOptions): void {
    this.server.register(RegisterApiController(routes), opts);
  }

  getServerInstance(): any {
    return this.server;
  }

  setServerInstance(server: any) {
    this.server = server;
  }

  get i18n() {
    return this.server.i18n;
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

export class FastityServerFactory implements IHttpServerFactory {
  createHttpServer(args?: any): IHttpServer {
    const app = new FastifyHttpServer(args);
    return app;
  }
}

const HttpServerFactory = new FastityServerFactory();
export { HttpServerFactory };
