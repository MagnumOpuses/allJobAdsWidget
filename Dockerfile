FROM bitnami/nginx
COPY  ./public /opt/bitnami/nginx/html/alljobads
COPY ./vhosts/allJobAds-vhost.conf /opt/bitnami/nginx/conf/vhosts/allJobAds-vhost.conf
USER 1001
ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "/run.sh" ]