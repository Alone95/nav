FROM nginx
MAINTAINER alone

COPY dist/ /usr/share/nginx/html/

#ADD html.tar.gz /usr/share/nginx/html
#ADD conf.tar.gz /etc/nginx
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
