// @author: Thanh LE
// @last update: 2022/01/17

import fastifySwagger from 'fastify-swagger';
import { FastifyInstance } from 'fastify';
import * as path from 'path';

import { logger } from '../../logger/index.js';
import { getApplicationRootPath } from '../../utils/shared.utils.js';

const config = process.env;
const docPath = path.join(
  getApplicationRootPath(),
  'src/documents/openapi-full.yaml',
);
const docBaseDir = path.join(getApplicationRootPath(), 'src/documents');

const RegisterFastifySwagger = async (fastify: FastifyInstance) => {
  /* static swagger file */
  await fastify.register(fastifySwagger, {
    mode: 'static',
    routePrefix: config.API_DOCS_PREFIX || '/documentation',
    specification: {
      path: docPath,
      postProcessor: function (swaggerObject) {
        return swaggerObject;
      },
      baseDir: docBaseDir,
    },
    exposeRoute: true,
  });
  logger.info('Openapi documents registered!');
};

export default RegisterFastifySwagger;
