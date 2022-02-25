// @author: Thanh LE
// @last update: 2022/01/17

import { FastifyInstance } from 'fastify';
import { fastifySwagger } from 'fastify-swagger';
import * as path from 'path'

import { logger } from '../../logger/index.js';

const config = process.env;
const docPath = path.join(global.appRoot, 'documents/openapi-full.yaml')
const docBaseDir = path.join(global.appRoot, 'documents')
logger.debug('Document path: ' + docPath)
logger.debug('Document base dir: ' + docBaseDir)

const FastifySwagger = (fastify: FastifyInstance) => {
  /* static swagger file */
  fastify.register(fastifySwagger, {
    mode: 'static',
    routePrefix: '/documentation',
    specification: {
      path: docPath,
      postProcessor: function (swaggerObject) {
        return swaggerObject
      },
      baseDir: docBaseDir
    },
    exposeRoute: true,
  })

  logger.info('Openapi documents registered!')

};

export default FastifySwagger;
