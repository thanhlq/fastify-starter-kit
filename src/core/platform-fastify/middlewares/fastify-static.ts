import fastifyStatic from 'fastify-static';
import { FastifyInstance } from 'fastify';
import { join } from 'path';

import { logger } from '../../logger/index.js';
import { getApplicationRootPath } from '../../utils/index.js';

const config = process.env;

const RegisterFastifySwagger = async (fastify: FastifyInstance) => {
  let wwwPublicPath;
  if (config.WWW_PUBLIC_PATH) {
    wwwPublicPath = config.WWW_PUBLIC_PATH;
  } else {
    const publicFolder = config.PUBLIC_DIR || 'public';
    wwwPublicPath = join(getApplicationRootPath(), publicFolder);
  }

  /* static swagger file */
  await fastify.register(fastifyStatic, {
    root: wwwPublicPath,
    prefix: '/',
  });

  logger.info(
    `[OK] [Middleware] Static file serving registered, under WWW-public directory: ${wwwPublicPath}`,
  );
};

export default RegisterFastifySwagger;
