# Fastify & Typescript App

## 1. FEATURES

* [X] Fastify as core (Can be customized / replaced by expressjs,...)
* [X] Modern typescript / ESM
* [X] Typescript documentation with typedoc
* [X] DB schema migration (by versions)
* [X] Lightweigh ORM with objection / knex
* [ ] Common securities (xss, rate limit, csrf, csp, header protection)
* [X] OpenAPI 3.0 documentation in a modular way
* [X] DB unit test with Jest / Typescript / ESM
* [ ] Restful API testing with supertest
* [X] Static file serving.
* [X] Static source code analysis and checks with eslint
* [X] Source code auto format with prettier
* [X] Tested with Node.js 14+

## 2. Installation

```bash
$ git clone xxx
$ cd project
$ yarn install
# For development
./scripts/install-dev-dependencies.sh
./scripts/install-build-dependencies.sh
```

## 3. Usage

At first time, you need to run Database schema generation. Configure your database information at <code><rootDir>/knexfile.js</code>, then run: yarn migrate-env accorndingly, for example:

```bash
# Generate db schemas for development
yarn migrate-dev
# Generate db schemas for testing
yarn migrate-test
# Generate db schemas for production
yarn migrate-prod
```

### 3.1 Development

```bash
# Start development server with hot reload (nodemon)
$ yarn dev

# Start development server with buit and NOT hot-reload
$ yarn start-dev

# Format with prettier
$ yarn format

# Check code lint (eslint)
$ yarn lint

# Generate class documentation (typescript docs) (docs folder by default) : currently NOK with ESM
$ yarn docs
```

### 3.2 Test

```bash
# Start test server (dont need, integrated with concurrently)
# yarn start-test

# Start to execute the tests
yarn test
```

### 3.3 Production

```bash
# build for production
$ yarn build

# start production app
$ yarn start
```

### 3.4 OPENAPI Document

To generate latest openapi (swagger) docs:

```bash
yarn build-api-docs
```

### 4 Links

* http://localhost:3000/index.html -> static file serving
* http://localhost:3000/documentation/ -> api documenation
* * http://localhost:3000/api/v1/users/ -> sample
