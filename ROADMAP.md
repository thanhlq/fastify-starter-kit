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
* [ ] Inbound schema validator / based on openapi 3.x or json schema

## V0.4

* [ ] XSS
* [ ] CSRF protection
* [ ] Header protection / security practices / Helmet
* [ ] Rate limit

## V0.3.2

* [ ] API performance test

## V0.3.1

* [ ] i18n
* [ ] Cors setup / preflight request
* [ ] Multipart
* [ ] Conten security policy
* [ ] Real work testing (deploying / hosting)

## V0.3

* [X] Health check API (make sure server works OK)
* [X] Integration of rest API unit test with [supertest](https://github.com/visionmedia/supertest)
* [X] Implement sample user api(s) tests
* [ ] Dockerization

## V0.2

* [X] Fastity basic middlewares as error handling, standard url params encoding/decoding,...
* [X] Static file serving
* [X] DB unit test with jest / typescript / ESM (Ecmascript module)
* [X] Convert commonjs type to the ESM (es-module) (for future compatiblity, since es-module can import commonjs but commonjs cannot import es module)
* [X] Static source code analysis and checks with eslint
* [X] Ecmascript version (2021) as target

## V0.1

* [x] Abstraction HTTP layer (core Node.js http) & Core definitions (for easier later platform-replacement)
* [X] Fastify adapter as default
* [X] logger (k8s compatible) (pino)
* [X] Environment setup (dev, watch, build,...)
* [X] DB Integration with Knex / objection
* [X] Sample db CRUD
* [X] OpenAPI 3.0 documentation
* [X] DB schema generation / migration
* [X] Static source code analysis and checks with eslint
* [X] Source code auto format with prettier
* [X] Typescript api documentation / generating
