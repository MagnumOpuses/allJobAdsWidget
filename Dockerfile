FROM bitnami/nginx
USER root
ARG STAGE_BUILD=false
ARG USER=jobtech
ARG PASSWD=jobtech1
ENV BUILD_STAGE=$STAGE_BUILD
ENV USER=$USER
ENV PASSWD=$PASSWD

COPY  ./public /opt/bitnami/nginx/html/alljobads
#COPY  ./src /opt/bitnami/nginx/html/
COPY  ./vhosts /tmp/conf/vhosts

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && apt-get -yq install apache2-utils && htpasswd -dbc /opt/bitnami/nginx/.htpasswd $USER $PASSWD
RUN if [ "$BUILD_STAGE" = true ];\
 then echo "Stage build" ;\
   rm -f /tmp/conf/vhosts/prod-vhost.conf;\
   mkdir /opt/bitnami/nginx/conf/vhosts ;\
   cp /tmp/conf/vhosts/stage-vhosts.conf /opt/bitnami/nginx/conf/server_blocks/ ;\
   mv /tmp/conf/vhosts/stage-vhost.conf /opt/bitnami/nginx/conf/vhosts/ ;\
 else echo "Productionn build";\
   rm -f /tmp/conf/vhosts/stage-vhost.conf;\
   mkdir /opt/bitnami/nginx/conf/vhosts ;\
   cp /tmp/conf/vhosts/stage-vhosts.conf /opt/bitnami/nginx/conf/server_blocks/ ;\
   mv /tmp/conf/vhosts/prod-vhost.conf /opt/bitnami/nginx/conf/vhosts/ ;\
 fi

USER 1001
ENTRYPOINT [ "/opt/bitnami/scripts/nginx/entrypoint.sh" ]
CMD [ "/opt/bitnami/scripts/nginx/run.sh" ]