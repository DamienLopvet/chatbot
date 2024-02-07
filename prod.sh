#!/usr/bin/env sh

# abort on errors
set -e

docker-compose stop

git pull

docker-compose -f compose.prod.yaml up
