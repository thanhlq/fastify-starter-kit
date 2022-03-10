import {
  HttpRoute, IHttpServer
} from '../core/interfaces/http.js';
import {
  handle_CreateOrganization,
  handle_GetOrganization,
  handle_GetOrganizationConfig,
  handle_ListOrganizations,
  handle_PatchOrganization
} from './controller/organization-controller.js';

const organizationRoutes = [
  new HttpRoute('get', '/', handle_ListOrganizations),
  new HttpRoute('get', '/:orgId', handle_GetOrganization),
  new HttpRoute('post', '/', handle_CreateOrganization),
  new HttpRoute('patch', '/:orgId', handle_PatchOrganization),
  new HttpRoute('get', '/config', handle_GetOrganizationConfig),
];

function OrgRouteRegister(app: IHttpServer) {
  app.registerRoutes(organizationRoutes, { prefix: '/api/v1/organizations' });
}

export default OrgRouteRegister;
