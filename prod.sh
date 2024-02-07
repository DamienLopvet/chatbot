#!/usr/bin/env sh

# abort on errors
set -e

sudo docker-compose stop

echo "----------------------------Pulling latest changes from git1---------------------------"

git pull

echo "----------------------------Building and starting the app---------------------------"

sudo docker-compose -f compose.prod.yaml up -d
