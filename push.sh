#!/usr/bin/env bash
set -e

git add .

# Provide a message for the commit

read -p "What is your commit message ? "
if [[ $REPLY ]]
then
git commit -m " $REPLY "
git push 
else

echo "No commit message provided, action aborted"

fi

# Just run : bash DockerDeploy.sh