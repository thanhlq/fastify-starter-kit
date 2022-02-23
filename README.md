# Fastify & Typescript App

## FEATURES

* Fastify as core (Can be customized / replaced by expressjs,...)
* Typescript
* DB schema migration (by versions)
* Sql builder with objection / knex
* Common security
* OpenAPI 3.0 documentation in a modular way
* DB unit test
* Restful API testing

## Installation

```bash
$ git clone xxx
$ cd project
$ yarn install
```

## Usage

### Development

```bash
# Required: typescript watch compilation
$ yarn watch

# Required: development server with hot reload (nodemon)
$ yarn dev

# Format with prettier
$ yarn format
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

go to http://localhost:3003/documentation/
