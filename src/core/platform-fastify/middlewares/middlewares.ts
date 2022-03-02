import { FastifyInstance } from 'fastify';

import * as constants from '../../constants.js';
import { isProduction } from '../../constants.js';
import { logger } from '../../logger/index.js';

const config = process.env;

const middlewares = [
  {
    path: './fastify-swagger.js',
    enabled: config[constants.MIDDLEWARE_SWAGGER_DOC_CK] == constants.ON_VALUE,
  },
  {
    path: './fastify-static.js',
    enabled: !(
      config[constants.MIDDLEWARE_STATIC_FILE_CK] == constants.OFF_VALUE
    ),
  },
];

async function setupFastifyMiddlewares(fastify: FastifyInstance) {
  if (!isProduction) {
    fastify.addHook('preHandler', function (req, reply, done) {
      if (req.body) {
        req.log.debug(req.body, 'parsed req body');
      }
      done();
    });
  }

  for (let i = 0; i < middlewares.length; i++) {
    const m = middlewares[i];
    if (m.enabled) {
      try {
        const mInstance = await (await import(m.path)).default;
        await mInstance(fastify);
      } catch (e) {
        logger.error(`Error when registering middleware: [${m.path}]`);
        logger.error(e)
      }
    }
  }
}

export { setupFastifyMiddlewares };
