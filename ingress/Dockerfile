# See docker-compose.yml for env vars docs
# Main stage image
# nginx:1.21.3 FAILS on mac:
#     https://github.com/Lax/traffic-accounting-nginx-module/issues/51
#     https://github.com/Lax/traffic-accounting-nginx-module/issues/39
FROM nginx:1.20.2

# https://github.com/ledgetech/lua-resty-http/issues/42
RUN cp /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.pem

# This needs overriding to get the env vars in:
COPY conf/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
# The main app code
# Remove existing, the templated config is copied on start.sh
RUN rm -rf /etc/nginx/conf.d && mkdir -p /etc/nginx/conf.d
COPY conf.d/healthcheck.conf /etc/nginx/conf.d
COPY default.template.ssl.conf /app/https/default.template.ssl.conf

# defaults
# ENV APP_FQDN=app1.dev
# ENV APP_PORT=443
# ENV PORT=8800
# 👆 APP_PORT and PORT look related:
#   - PORT: the actual port the service will listen to
#   - APP_PORT: used to map the vouch OAuth callback (external public port)

COPY start.sh /start.sh
CMD /start.sh
