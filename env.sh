#!/bin/bash

get_baseurl () {
  local proto=$(echo ${1} | sed -e's,^\(.*://\).*,\1,g')
  local baseUrl=$(echo ${1} | awk -F/ '{print $3}')
  echo "${proto}${baseUrl}"
}

HMDA_API_SERVER=$(get_baseurl ${HMDA_API})

sed -i.bak \
  -e "s@##HOMEPAGE_URL##@${HOMEPAGE_URL:-https://192.168.99.100}@"\
  -e "s@##HMDA_API##@${HMDA_API:-https://192.168.99.100:4443/hmda}@"\
  ./dist/js/*.js &&\
rm ./dist/js/*.bak

if [ -f /etc/nginx/nginx.tmpl ]; then
  sed \
  -e "s@##APP_SERVER##@${HOMEPAGE_URL:-https://192.168.99.100}@g"\
  -e "s@##HMDA_API_SERVER##@${HMDA_API_SERVER:-https://192.168.99.100:4443}@g"\
  /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf
fi
