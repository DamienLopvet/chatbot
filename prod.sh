#!/usr/bin/env sh

# abort on errors
set -e

docker-compose stop

echo "----------------------------Pulling latest changes from git---------------------------"

git pull

echo "----------------------------Building and starting the app---------------------------"

docker-compose -f compose.prod.yaml up
