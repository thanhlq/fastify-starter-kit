# Fastify & Typescript App

## FEATURES

* Fastify as core (Can be customized / replaced by expressjs,...)
* Modern typescript / ESM
* Typescript documentation with typedoc
* DB schema migration (by versions)
* Lightweigh ORM with objection / knex
* Common securities (xss, rate limit, csrf, csp, header protection)
* OpenAPI 3.0 documentation in a modular way
* DB unit test with Jest / Typescript / ESM
* Restful API testing with supertest

## Installation

```bash
$ git clone xxx
$ cd project
$ yarn install
```

## Usage

### Development

```bash
# Required: development server with hot reload (nodemon)
$ yarn dev

# Format with prettier
$ yarn format

$ yarn lint
```

### Test

```bash
yarn test
```

### Production

```bash
# build for production
$ yarn build

# start production app
$ yarn start
```

### OPENAPI Document

To generate latest openapi (swagger) docs:

```bash
cd src/documents
./generate-openapi.json.sh
```

go to http://localhost:3000/documentation/
