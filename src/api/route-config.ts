import {
  HttpRoute, IHttpServer
} from '../core/interfaces/http.js';
import { handleHealthCheck } from './controller/platform-controller.js';
import {
  CreateUser,
  GetUser,
  GetUserConfig,
  ListUsers,
  PatchUser
} from './controller/user-controller.js';

const userRoutes = [
  new HttpRoute('get', '/', ListUsers),
  new HttpRoute('get', '/:userId', GetUser),
  new HttpRoute('post', '/', CreateUser),
  new HttpRoute('patch', '/:userId', PatchUser),
  new HttpRoute('get', '/config', GetUserConfig),
];

export default function CommonRouteRegister(app: IHttpServer) {
  app.get('/health', handleHealthCheck)
  app.registerRoutes(userRoutes, { prefix: '/api/v1/users' });
}
