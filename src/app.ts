// Thanh LE
// Description: A application instance builder applicable for testing also.

import HttpServerFactory from './core/http-server-factory.js';
import CommonRouteRegister from './api/route-config.js';
import OrgRouteRegister from './api/route-config-organization.js';

async function buildApp(opts = {}) {
  const app = await HttpServerFactory.CreateServerInstance(opts);
  CommonRouteRegister(app);
  OrgRouteRegister(app);
  return app;
}

export default buildApp
export { buildApp }
