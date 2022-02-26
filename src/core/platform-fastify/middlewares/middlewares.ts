import { FastifyInstance } from 'fastify';

import * as constants from '../../constants';

const config = process.env;

async function setupMiddlewares(fastify: FastifyInstance) {
  const enableSwaggerDocs =
    config[constants.MIDDLEWARE_SWAGGER_DOC_CK] ==
    constants.MIDDLEWARE_SWAGGER_DOC_ON;

  if (enableSwaggerDocs) {
    const mSwagger = await (await import('./fastify-swagger')).default;
    mSwagger(fastify);
  }
}

export { setupMiddlewares };
