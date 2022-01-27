import * as dotenv from 'dotenv';
import { FastifyInstance } from 'fastify';
import { HttpServerFactory } from './core';
import RegisterRoute from './route-config';

dotenv.config();

console.log('App starting with env: ' + process.env.NODE_ENV)

const init = async () => {

  const app = await HttpServerFactory.CreateServerInstance()
  RegisterRoute(app)
  //enable swagger docs
  if ('development' === process.env.NODE_ENV) {
    const server = app.server as FastifyInstance;

    server.ready(err => {
      if (!err) {
        // https://github.com/fastify/fastify-swagger
        // fastify.swagger()
      }
    })
  }

  const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

  app.listen({port: FASTIFY_PORT});

  console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
  console.log(`Route index: /`);
  console.log(`Route user: /api/v1/user`);
}

init().then()



