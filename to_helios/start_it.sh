httpd -f ~/web/lab1/httpd-root/conf/httpd.conf -k start

java -DFCGI_PORT=39564 -jar ~/web/lab1/httpd-root/fcgi-bin/app.jar

