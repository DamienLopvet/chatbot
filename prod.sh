#!/usr/bin/env sh

# abort on errors
set -e

docker-compose stop

git pull

docker compose up
