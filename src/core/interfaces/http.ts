// @author: Thanh LE
// Last update: 2022/01/17
// Description: Core-types defition

import { IncomingHttpHeaders } from 'http';
// import { ParsedUrlQuery } from 'querystring';

export type HTTPMethods =
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'OPTIONS';

export type ErrorHandler<TRequest = any, TResponse = any> = (
  error: any,
  req: TRequest,
  res: TResponse,
  next?: Function,
) => any;

export type RequestHandler<TRequest = any, TResponse = any> = (
  req: TRequest,
  res: TResponse,
  next?: Function,
) => any;

export interface IHttpRequest {
  /**
   * id - the request ID
   */
  id?: string;

  /**
   * Get/Set request URL.
   */
  url?: string;

  /**
   * Get origin of URL. I.e. http://example.com
   */
  origin?: string;

  /**
   * Get full request URL. I.e. http://example.com/foo/bar?q=1
   */
  href?: string;

  /**
   * Get/Set request method.
   */
  method: string;

  /**
   * Get request pathname.
   * Set pathname, retaining the query-string when present.
   */
  path?: string;

  params?: any;

  /**
   * Get parsed query-string.
   * Set query-string as an object.
   * For example "color=blue&size=small":
   * {
   *  color: 'blue',
   *  size: 'small'
   * }
   *
   */
  query?: any;

  /**
   * body - the request payload, see Content-Type Parser for details on what request payloads Fastify natively parses and how to support other content types
   */
  body?: any;

  /**
   * Prints something like:
   *
   * { 'user-agent': 'curl/7.22.0',
   *  host: '127.0.0.1:8000',
   *  accept: '*' }
   */
  headers?: IncomingHttpHeaders;

  /**
   * Get/Set query string.
   */
  querystring?: string;

  /**
   * Get the search string. Same as the querystring
   * except it includes the leading ?.
   *
   * Set the search string. Same as
   * response.querystring= but included for ubiquity.
   */
  search?: string;

  /**
   * Parse the "Host" header field host
   * and support X-Forwarded-Host when a
   * proxy is enabled.
   */
  host?: string;

  /**
   * ip - the IP address of the incoming request
   */
  ip?: string;

  /**
   * ips - an array of the IP addresses, ordered from closest to furthest, in the X-Forwarded-For header of the incoming request (only
   */
  ips?: string[];

  /**
   * protocol - the protocol of the incoming request (https or http)
   */
  protocol?: string;

  /**
   * Parse the "Host" header field hostname
   * and support X-Forwarded-Host when a
   * proxy is enabled.
   */
  hostname?: string;

  /**
   * Get request charset when present, or undefined:
   * // => "utf-8"
   */
  charset?: string;

  //
  /**
   * Get request Content-Type void of parameters such as "charset".
   * => "image/png"
   */
  type?: string;

  /**
   * Return request header. If the header is not set, will return an empty
   * string.
   *
   * The `Referrer` header field is special-cased, both `Referrer` and
   * `Referer` are interchangeable.
   *
   * Examples:
   *
   *     this.get('Content-Type');
   *     // => "text/plain"
   *
   *     this.get('content-type');
   *     // => "text/plain"
   *
   *     this.get('Something');
   *     // => ''
   */
  get(field: string): string | undefined;
}

export interface IHttpResponse {
  /**
   * Get/Set response status code.
   */
  status?: number;

  /**
   * Get response status message
   */
  message?: string;

  /**
   * Get/Set response body.
   */
  body?: unknown;

  /**
   * Return parsed response Content-Length when present.
   * Set Content-Length field to `n`.
   */
  length?: number;

  /**
   * Check if a header has been written to the socket.
   */
  headerSent?: boolean;

  /**
   * Return the response mime type void of
   * parameters such as "charset".
   *
   * Set Content-Type response header with `type` through `mime.lookup()`
   * when it does not contain a charset.
   *
   * Examples:
   *
   *     this.type = '.html';
   *     this.type = 'html';
   *     this.type = 'json';
   *     this.type = 'application/json';
   *     this.type = 'png';
   */
  type?: string;

  /**
   * Get/Set the ETag of a response.
   * This will normalize the quotes if necessary.
   *
   *     this.response.etag = 'md5hashsum';
   *     this.response.etag = '"md5hashsum"';
   *     this.response.etag = 'W/"123456789"';
   *
   * @param {String} etag
   * @api public
   */
  etag?: string;

  /**
   * Set header `field` to `val`, or pass
   * an object of header fields.
   *
   * Examples:
   *
   *    this.set('Foo', ['bar', 'baz']);
   *    this.set('Accept', 'application/json');
   *    this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
   */
  set(field: { [key: string]: string | string[] }): IHttpResponse;
  set(field: string, val: string | string[]): IHttpResponse;
  header(field: { [key: string]: string | string[] }): IHttpResponse;
  header(field: string, val: string | string[]): IHttpResponse;
  /* Send a not found reply */
  notFound(message?: string): IHttpResponse
  badRequest(message?: string): IHttpResponse
  serverError(message?: string): IHttpResponse
  notAuthorized(message?: string): IHttpResponse
  permissionDenied(message?: string): IHttpResponse
  resourceExisted(message?: string): IHttpResponse
  send(payload?: any): any;
}

export interface IHttpContext {
  req: IHttpRequest;
  res: IHttpRequest;
  send(field: any): void;
}

export type HttpHandlerFn = (
  req: IHttpRequest,
  res: IHttpResponse,
) => Promise<any>;

export type HttpServerListener = (
  err: Error,
) => void;

export async function HttpHandlerFnNull(
  req: IHttpRequest,
  res: IHttpResponse,
): Promise<any> {
  return Promise.resolve(true);
}

export interface RegisterRouteOption {
  prefix?: string;
}

export type HttpPluginOptions = Record<string, any>;

export interface IHttpRoute {
  method?: string;
  handle?: HttpHandlerFn;
}

export class HttpRoute implements IHttpRoute {
  method: string;
  path: string;
  handler?: HttpHandlerFn;
  opts?: any;

  constructor(
    method?: string,
    path?: string,
    handler?: HttpHandlerFn,
    opts?: any,
  ) {
    this.method = method || 'all';
    this.path = path || '/';
    this.handler = handler;
    this.opts = opts;
  }
}

export interface HttpServerOptions {
  port?: number;
  host?: string;
  exclusive?: boolean;
  readableAll?: boolean;
  writableAll?: boolean;
  ipv6Only?: boolean;
}

export interface IHttpServer {
  /**
   * fastify instance
   */
  server: any;
  get(path: string, handler: HttpHandlerFn): IHttpServer;
  post(path: string, handler: HttpHandlerFn): IHttpServer;
  put(path: string, handler: HttpHandlerFn): IHttpServer;
  delete(path: string, handler: HttpHandlerFn): IHttpServer;
  head(path: string, handler: HttpHandlerFn): IHttpServer;
  option(path: string, handler: HttpHandlerFn): IHttpServer;
  registerRoute(route: HttpRoute, opts: HttpPluginOptions): void;
  registerRoutes(routes: HttpRoute[], opts: HttpPluginOptions): void;
  listen<T extends HttpServerOptions>(opts: T): void;
  ready(listener: HttpServerListener);
  close();
  getInstance(): any;
}

export interface IHttpServerFactory {
  createServer(opts?: any): IHttpServer;
}
