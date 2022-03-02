// Thanh LE
// Description: A application instance builder applicable for testing also.

import HttpServerFactory from './core/http-server-factory.js';
import registerRoute from './api/route-config.js';

async function buildApp(opts = {}) {
  const app = await HttpServerFactory.CreateServerInstance(opts);
  registerRoute(app);
  return app;
}

export default buildApp
export { buildApp }
