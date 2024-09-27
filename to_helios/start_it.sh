httpd -f ~/httpd-root/conf/httpd.conf -k start

java -DFCGI_PORT=47085 -jar ~/httpd-root/fcgi-bin/server.jar

