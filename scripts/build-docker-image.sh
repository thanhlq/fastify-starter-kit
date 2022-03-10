#!/usr/bin/env bash

cd ../

yarn install
yarn build
docker build -t $USER/fastify-starter-kit .
