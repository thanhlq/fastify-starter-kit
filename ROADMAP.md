# ROADMAP

## V0.10

* [ ] File upload/download service

## V0.9

* [ ] Background task / cronjob

## V0.8

* [ ] K8s deployment

## V0.7

* [ ] Docker deployment
* [ ] serverless deployment

## V0.6

* [ ] RBAC / policy -> Sang IS6 integration or ?

## V0.5

* [ ] Auth -> Sang / IS6
* [ ] Session
* [ ] Pubsub / cache

## V0.4

* [ ] XSS
* [ ] CSRF protection
* [ ] Header protection / security practices / Helmet
* [ ] Rate limit
* [ ] Conten security policy

## V0.3

* [ ] Rest API unit test with [supertest](https://github.com/visionmedia/supertest)
* [ ] Static file serving
* [ ] i18n
* [ ] Dockerization
* [ ] Inbound schema validator / based on openapi 3.x or json schema

## V0.2

* [ ] Fastity basic middlewares as error handling, params encoding/decoding,...
* [ ] DB unit test with mocha/chai

## V0.1

* [x] Abstraction HTTP layer (core Node.js http) & Core definitions (for easier later platform-replacement)
* [X] Fastify adapter as default
* [X] logger (k8s compatible) (pino)
* [X] Environment setup
* [X] DB Integration with Knex / objection
* [X] Sample db CRUD
* [X] OpenAPI 3.0 documentation
* [X] DB schema generation / migration
