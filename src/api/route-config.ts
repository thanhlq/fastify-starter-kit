import { promises } from 'fs';
import { resolve } from 'path';
import {
  HttpRoute,
  IHttpRequest,
  IHttpResponse,
  IHttpServer,
} from '../core/interfaces/http.js';

import { handleHealthCheck } from './controller/platform-controller.js'

import {
  CreateUser,
  GetUser,
  GetUserConfig,
  ListUsers,
  PatchUser,
} from './controller/user-controller.js';

const { readFile } = promises;

async function ServeFile(req: IHttpRequest, res: IHttpResponse) {
  const indexHtmlPath = resolve(__dirname, '../static/index.html');
  const indexHtmlContent = await readFile(indexHtmlPath);
  res.header('Content-Type', 'text/html; charset=utf-8').send(indexHtmlContent);
}

const userRoutes = [
  new HttpRoute('get', '/', ListUsers),
  new HttpRoute('get', '/:userId', GetUser),
  new HttpRoute('post', '/', CreateUser),
  new HttpRoute('patch', '/:userId', PatchUser),
  new HttpRoute('get', '/config', GetUserConfig),
];

const staticFile = [new HttpRoute('get', '/', ServeFile)];

function registerRoute(app: IHttpServer) {
  app.get('/health', handleHealthCheck)
  app.registerRoutes(userRoutes, { prefix: '/api/v1/users' });
  app.registerRoutes(staticFile, { prefix: '/' });
}

export default registerRoute;
