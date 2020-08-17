# FROM scratch
FROM 192.168.40.5:5000/base/nginx:1.17.7-alpine
MAINTAINER dangzihao dangzh@vodjk.com

RUN mkdir -p /storage && rm /etc/nginx/conf.d/default.conf

WORKDIR /app

ADD . .

RUN ln -s /app/static.conf /etc/nginx/conf.d/static.conf

EXPOSE 80

CMD ["./run.sh"]
