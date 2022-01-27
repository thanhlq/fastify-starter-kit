// @author: Thanh LE
// @last update: 2022/01/17

import { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';

/**
 * @see https://github.com/fastify/fastify-cors
 * @param fastify
 */
const FastifyCors = (fastify: FastifyInstance) => {
  fastify.register(fastifyCors, () => {
    return (req, cb) => {
      let corsOptions;
      const origin = req.headers.origin || ''
      // do not include CORS headers for requests from localhost
      if (/localhost/.test(origin)) {
        corsOptions = { origin: false }
      } else {
        corsOptions = { origin: true }
      }
      cb(null, corsOptions)
    }
  })
}

export default FastifyCors
