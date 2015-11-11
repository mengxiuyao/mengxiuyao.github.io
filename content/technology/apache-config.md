&emsp;&emsp;&emsp;&emsp;之前要维护部门网站的首页，因为是用php写的，需要在本地配置虚拟主机才能跑起来，所以在这写一下配置过程。

##### 1.配置你本机访问的域名
    在C盘找到 Windows\System32\Drivers\etc 目录下的 hosts 文件，打开添加一行:
    127.0.0.1   example.com

##### 2.启用 Apache 的虚拟主机模块功能
    在 Apache 安装目录下，找到 httpd.conf 打开，搜索
    #Virtual hosts ，将它下面那一行代码前边的 # 去掉，结果如下：
    Include conf/extra/httpd-vhosts.conf

##### 3.配置虚拟主机根目录
    在 Apache 安装目录下，找到 httpd-vhosts.conf 这个文件，打开添加下面的代码：
    &lt;VirtualHost *:80&gt;
        ServerName example.com
        ServerAlias online.shafley.net
        DocumentRoot "E:/wamp/www/example/"
        &lt;Directory "E:/wamp/www/example/"&gt;
            Options Indexes FollowSymLinks
            Order allow,deny
            AllowOverride all
            Allow from all
        &lt;/Directory&gt;
    &lt;/VirtualHost&gt;
然后就好了，现在在浏览器地址栏输入 example.com ，就会出现你项目的主页。
