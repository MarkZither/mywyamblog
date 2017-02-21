Title: Setting up a Raspberry Pi NGINX PHP MySQL LEMP Stack
Published: 2017-02-21
Tags: 
  - Raspberry Pi
  - NGINX
  - PHP
  - MySQL
  - LEMP
---

---

# Setting up a Raspberry Pi NGINX PHP MySQL LEMP Stack

Ste Wright has already written up how to install PHP 7 on a RPi3 the same works for RPi2 so i will not rewrite it here.

[Ste Wright - Turn your Raspberry Pi 3 into a PHP 7 powered web server](https://www.stewright.me/2016/03/turn-raspberry-pi-3-php-7-powered-web-server/)

Follow the blog except at step 2 run
```PERL
sudo apt-get install php-fpm
```
Then check the version 
```PERL
$ php -v
```
You should see something like this
```PERL
PHP 7.0.16-1~bpo8+1 (cli) (built: Feb 18 2017 02:34:09) ( NTS )
Copyright (c) 1997-2017 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2017 Zend Technologies
    with Zend OPcache v7.0.16-1~bpo8+1, Copyright (c) 1999-2017, by Zend Technologies
```

Then use these instructions to [setup PHP with Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-in-ubuntu-16-04)

Make sure to enable PHP in the Nginx config file, and ensure it is pointing to the correct location, for me that was
```PERL
        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
        #
        #       # With php5-cgi alone:
        #       fastcgi_pass 127.0.0.1:9000;
        #       # With php5-fpm:
                fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
        }
```

restart Nginx to pick up the new configuration
```
sudo nginx -s reload
```
Test it with a simple php page using `<?php phpinfo(); ?>` 

In order to serve extensionless html pages, update the try_files in the location block when setting up the sites-available server blocks config  
```PERL
location / {
        try_files $uri $uri.html $uri/ =404;
    }
```

Install MySQL by following this tutorial again by 
[Ste Wright - Install MySQL Server on you Respberry Pi](https://www.stewright.me/2016/04/install-mysql-server-raspberry-pi/)
You should now have a working nginx server running PHP scripts, next time I will setup piwik so you can monitor the traffic to your website.

