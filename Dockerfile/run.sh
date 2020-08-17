#!/bin/sh
PRJ_ROOT=$(cd `dirname $0`; pwd)

mkdir -p /var/log/nginx
chmod 777 /var/log/nginx
ver=`cat ${PRJ_ROOT}/version.txt`
echo $ver
echo $ver > /var/log/announce.log
nginx -g "daemon off;"
