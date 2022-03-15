// @author: Thanh LE
// @last update: 2022/01/17

import { FastifyInstance } from 'fastify';
import * as fastifyPolyglot from 'fastify-polyglot';
import * as path from 'path';
import { logger } from '../../logger/index.js';
import { getApplicationRootPath } from '../../utils/shared.utils.js';

const config = process.env;
const localeBaseDir = path.join(getApplicationRootPath(), 'src/locales');


const RegisterFastifySwagger = async (fastify: FastifyInstance) => {
  /* static swagger file */

  const en = (await import(path.join(localeBaseDir, 'en.js'))).default;
  const kr = (await import(path.join(localeBaseDir, 'kr.js'))).default;
  const vi = (await import(path.join(localeBaseDir, 'vi.js'))).default;
  // console.log(`en lang: ${localeBaseDir}/en.js`)
  // console.log(JSON.stringify(vi));

  await fastify.register(fastifyPolyglot, {
    defaultLocale: config.LOCALE || 'en',
    localesPath: localeBaseDir,
    locales: {
      en,
      vi,
      kr
    }
  });
  logger.info('i18n registered!');
};

export default RegisterFastifySwagger;
