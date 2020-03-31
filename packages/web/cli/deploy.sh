#!/bin/bash

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`

cd "${SCRIPTPATH}/../docker/prod"

heroku container:push -a=spam-app-web web --context-path="../../"
heroku container:release -a=spam-app-web web
