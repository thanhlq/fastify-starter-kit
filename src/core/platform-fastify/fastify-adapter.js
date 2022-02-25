"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServerFactory = exports.FastityServerFactory = exports.FastifyHttpServer = exports.FastifyHttpResponse = exports.FastifyHttpRequest = exports.InitLogger = exports.isProduction = void 0;
const fastify_1 = __importDefault(require("fastify"));
const qs_1 = __importDefault(require("qs"));
const pino_1 = __importDefault(require("pino"));
const httpErrors = __importStar(require("http-errors"));
const http_js_1 = require("../interfaces/http.js");
const constants = __importStar(require("../constants.js"));
const middlewares_js_1 = require("./middlewares/middlewares.js");
const env = process.env;
exports.isProduction = env.NODE_ENV == constants.PRODUCTION_ENV;
const InitLogger = () => {
    let logger;
    if (!exports.isProduction) {
        const transport = pino_1.default.transport({
            target: 'pino-pretty',
            options: { colorize: true },
        });
        logger = (0, pino_1.default)({
            level: env.LOG_LEVEL || 'debug',
            translateTime: 'HH:MM:ss Z',
        }, transport);
    }
    else {
        logger = (0, pino_1.default)({
            level: env.LOG_LEVEL || 'info',
        });
    }
    return logger;
};
exports.InitLogger = InitLogger;
const logger = (0, exports.InitLogger)();
const CreateServerInstance = () => {
    const serverInstance = (0, fastify_1.default)({
        logger: logger,
        querystringParser: str => qs_1.default.parse(str),
    });
    (0, middlewares_js_1.setupMiddlewares)(serverInstance)
        .then()
        .catch(err => {
        logger.error('Error when setting up middlewares!', err);
    });
    if (!exports.isProduction) {
        serverInstance.addHook('preHandler', function (req, reply, done) {
            if (req.body) {
                req.log.info({ body: req.body }, 'parsed req body');
            }
            done();
        });
    }
    return serverInstance;
};
class FastifyHttpRequest {
    constructor(_req) {
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
        this.isProduction = exports.isProduction;
    }
    get(field) {
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
exports.FastifyHttpRequest = FastifyHttpRequest;
class FastifyHttpResponse {
    constructor(_res) {
        this._status = 200;
        this.type = 'application/json';
        this.res = _res;
    }
    set status(val) {
        this._status = val;
        this.res?.status(val);
    }
    notFound(message) {
        this.res.send(new httpErrors.NotFound(message));
        return this;
    }
    badRequest(message) {
        this.res.send(new httpErrors.BadRequest(message));
        return this;
    }
    serverError(message) {
        this.res.send(new httpErrors.InternalServerError(message));
        return this;
    }
    notAuthorized(message) {
        this.res.send(new httpErrors.Unauthorized(message));
        return this;
    }
    permissionDenied(message) {
        this.res.send(new httpErrors.Forbidden(message));
        return this;
    }
    resourceExisted(message) {
        this.res.send(new httpErrors.Conflict(message));
        return this;
    }
    send(payload) {
        this.res.status(this._status);
        this.res.send(payload);
    }
    set(field, val) {
        this.res.header(field, val);
        return this;
    }
    header(field, val) {
        this.res.header(field, val);
        return this;
    }
    debugRequest(request) {
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
exports.FastifyHttpResponse = FastifyHttpResponse;
class FastifyHttpServer {
    constructor(serverInstance) {
        this.routes = [];
        this.server = serverInstance || CreateServerInstance();
    }
    listen(port) {
        this.server.listen(port);
    }
    ready(listener) {
        this.server.ready(err => {
            listener(err);
        });
    }
    getInstance() {
        return this.server;
    }
    get(path, handler) {
        this.server.get(path, FastifyHandlerWrapper(handler));
        return this;
    }
    post(path, handler) {
        throw new Error('Method not implemented.');
    }
    put(path, handler) {
        throw new Error('Method not implemented.');
    }
    delete(path, handler) {
        throw new Error('Method not implemented.');
    }
    head(path, handler) {
        throw new Error('Method not implemented.');
    }
    option(path, handler) {
        throw new Error('Method not implemented.');
    }
    registerRoute(routes, opts) {
    }
    registerRoutes(routes, opts) {
        this.server.register(RegisterApiController(routes), opts);
    }
    getServerInstance() {
        return this.server;
    }
    setServerInstance(server) {
        this.server = server;
    }
}
exports.FastifyHttpServer = FastifyHttpServer;
function FastifyHandlerWrapper(handler) {
    return async function FastifyHandler(req, res) {
        return await handler(new FastifyHttpRequest(req), new FastifyHttpResponse(res));
    };
}
function RegisterApiController(routes) {
    return async function ApiController(router) {
        for (const r of routes) {
            if (r.method && r.handler) {
                switch (r.method) {
                    case 'get':
                        router.get(r.path, async function (req, res) {
                            const handler = r.handler || http_js_1.HttpHandlerFnNull;
                            const hResult = await handler(new FastifyHttpRequest(req), new FastifyHttpResponse(res));
                            if (!res.sent) {
                                return hResult;
                            }
                        });
                        break;
                    case 'post':
                        router.post(r.path, async function (req, res) {
                            const handler = r.handler || http_js_1.HttpHandlerFnNull;
                            const hResult = await handler(new FastifyHttpRequest(req), new FastifyHttpResponse(res));
                            if (!res.sent) {
                                return hResult;
                            }
                        });
                        break;
                    case 'put':
                        router.put(r.path, async function (req, res) {
                            const handler = r.handler || http_js_1.HttpHandlerFnNull;
                            const hResult = await handler(new FastifyHttpRequest(req), new FastifyHttpResponse(res));
                            if (!res.sent) {
                                return hResult;
                            }
                        });
                        break;
                    case 'patch':
                        router.patch(r.path, async function (req, res) {
                            const handler = r.handler || http_js_1.HttpHandlerFnNull;
                            const hResult = await handler(new FastifyHttpRequest(req), new FastifyHttpResponse(res));
                            if (!res.sent) {
                                return hResult;
                            }
                        });
                        break;
                    case 'delete':
                        router.delete(r.path, async function (req, res) {
                            const handler = r.handler || http_js_1.HttpHandlerFnNull;
                            const hResult = await handler(new FastifyHttpRequest(req), new FastifyHttpResponse(res));
                            if (!res.sent) {
                                return hResult;
                            }
                        });
                        break;
                    case 'options':
                        router.options(r.path, async function (req, res) {
                            const handler = r.handler || http_js_1.HttpHandlerFnNull;
                            const hResult = await handler(new FastifyHttpRequest(req), new FastifyHttpResponse(res));
                            if (!res.sent) {
                                return hResult;
                            }
                        });
                        break;
                    case 'head':
                        router.head(r.path, async function (req, res) {
                            const handler = r.handler || http_js_1.HttpHandlerFnNull;
                            const hResult = await handler(new FastifyHttpRequest(req), new FastifyHttpResponse(res));
                            if (!res.sent) {
                                return hResult;
                            }
                        });
                        break;
                }
            }
        }
    };
}
function DoRegisterRoutes(router, routes, opts) {
    return async function RouterMiddleware(router) {
        router.register(RegisterApiController(routes), opts);
    };
}
class FastityServerFactory {
    createServer(framework, args) {
        const app = new FastifyHttpServer(args);
        return app;
    }
}
exports.FastityServerFactory = FastityServerFactory;
const HttpServerFactory = new FastityServerFactory();
exports.HttpServerFactory = HttpServerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFzdGlmeS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFzdGlmeS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxzREFJaUI7QUFFakIsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4Qix3REFBeUM7QUFFekMsbURBVStCO0FBQy9CLDJEQUE2QztBQUM3QyxpRUFBZ0U7QUFFaEUsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNYLFFBQUEsWUFBWSxHQUFZLEdBQUcsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQztBQUV2RSxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUU7SUFDN0IsSUFBSSxNQUFNLENBQUM7SUFFWCxJQUFJLENBQUMsb0JBQVksRUFBRTtRQUNqQixNQUFNLFNBQVMsR0FBRyxjQUFJLENBQUMsU0FBUyxDQUFDO1lBQy9CLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7U0FDNUIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxHQUFHLElBQUEsY0FBSSxFQUNYO1lBQ0UsS0FBSyxFQUFFLEdBQUcsQ0FBQyxTQUFTLElBQUksT0FBTztZQUMvQixhQUFhLEVBQUUsWUFBWTtTQUU1QixFQUNELFNBQVMsQ0FDVixDQUFDO0tBQ0g7U0FBTTtRQUNMLE1BQU0sR0FBRyxJQUFBLGNBQUksRUFBQztZQUNaLEtBQUssRUFBRSxHQUFHLENBQUMsU0FBUyxJQUFJLE1BQU07U0FDL0IsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUF2QlcsUUFBQSxVQUFVLGNBdUJyQjtBQUVGLE1BQU0sTUFBTSxHQUFHLElBQUEsa0JBQVUsR0FBRSxDQUFDO0FBRTVCLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxFQUFFO0lBQ2hDLE1BQU0sY0FBYyxHQUFHLElB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