# ROADMAP

## V0.14

* [ ] gRPC

## V0.13

* [ ] WebSocket
* [ ] WebSocket authentication

## V0.12

* [ ] Multipart
* [ ] File upload/download service

## V0.11

* [ ] Background task / cronjob / scheiduling

## V0.10

* [ ] K8s deployment

## V0.9

* [ ] Notifications (firebase?)
* [ ] serverless deployment

## V0.8

* [ ] RBAC / policy -> Sang IS6 integration or ?

## V0.7

* [ ] Auth -> Sang / IS6
* [ ] Inbound schema validator / based on openapi 3.x or json schema

## V0.6

* [ ] Pubsub / cache
* [ ] Session

## V0.5

* [ ] XSS
* [ ] CSRF protection

## V0.4

* [ ] Header protection / security practices / Helmet
* [ ] Rate limit

## V0.3.3

* [ ] Real-world deployments (serverless?, dapr/k8s)

## V0.3.2

* [ ] API performance test (time, system usage)

## V0.3.1

* [X] Model mapping field name vs db field name
* [X] i18n
* [ ] Cors setup / preflight request
* [ ] Conten security policy

## V0.3

* [X] Health check API (make sure server works OK)
* [X] Integration of rest API unit test with [supertest](https://github.com/visionmedia/supertest)
* [X] Implement sample user api(s) tests
* [X] Dockerization

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
