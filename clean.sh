#!/usr/bin/env bash

rm -rf ./dist
rm -rf ./node_modules
rm -rf ./package-lock.json
rm -rf ./yarn.lock

# find ./ -type f -name '*.js' -exec rm {} +