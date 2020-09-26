# -*- coding: utf-8 -*-
# @Time    : 9/25/20 11:22 PM
# @Author  : Siqi Liang
# @Contact : zszxlsq@gmail.com
# @File    : cgiserver.py
# @Software: PyCharm

import cgi

form = cgi.FieldStorage()
ticker_name = form['ticker_name'].value

reshtml = '''Content-Type: text/html\n
<html>
<head>
<title>CGI demo(dynamic screen)</title>
</head>

<body>
<h1>Stock Search</h1>
Your enter is %s
</body>
</html>
'''
print(reshtml % ticker_name)