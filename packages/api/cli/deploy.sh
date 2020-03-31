#!/bin/bash

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`

cd "${SCRIPTPATH}/../docker/prod"

heroku container:push -a=spam-app-api web --context-path="../../"
heroku container:release -a=spam-app-api web
