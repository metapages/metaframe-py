#!/usr/bin/env bash
set -eo pipefail
# 👆 it's ok to fail on unbound variables

# nginx doesn't so env vars so we use some basic templating from env vars
TEMPLATE=default.template.ssl.conf
echo "APP_FQDN     : ${APP_FQDN}"
echo "APP_PORT     : ${APP_PORT}"
echo "PORT         : ${PORT}"
echo "TEMPLATE     : ${TEMPLATE}"
envsubst '$APP_FQDN $APP_PORT $PORT' < /app/https/${TEMPLATE} > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
