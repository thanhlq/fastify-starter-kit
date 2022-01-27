// @author: Thanh LE
// @last update: 2022/01/17

import { FastifyInstance } from 'fastify';
import { fastifySwagger } from 'fastify-swagger';

const config = process.env
const { HOST = 'localhost', PORT = 3006 } = config

// openapi 3.0.3 options
// https://github.com/fastify/fastify-swagger/blob/master/examples/dynamic-openapi.js
const FastifySwagger = (fastify: FastifyInstance) => {
  fastify.register(fastifySwagger, {
    routePrefix: '/api-docs',
    openapi: {
      info: {
        title: 'Test swagger',
        description: 'testing the fastify swagger api',
        version: '0.1.0'
      },
      servers: [
        { url: 'http://localhost:3006' },
        { url: PORT == '80' ? HOST : `${HOST}:${PORT}` }
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header'
          }
        }
      }
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    hideUntagged: true,
    exposeRoute: true
  });

  fastify.ready((err) => {
    if (err) {
      throw err;
    } else {
      // console.log(JSON.stringify(fastify.swagger()))
    }
  });
};

export default FastifySwagger;
