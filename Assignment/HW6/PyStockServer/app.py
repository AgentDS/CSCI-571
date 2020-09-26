# -*- coding: utf-8 -*-
# @Time    : 9/25/20 11:18 PM
# @Author  : Siqi Liang
# @Contact : zszxlsq@gmail.com
# @File    : app.py
# @Software: PyCharm
from flask import Flask, jsonify, abort, request

app = Flask(__name__,
            static_folder='static')


@app.route('/')
@app.route('/index')
def index():
    return app.send_static_file('hw6_StockSearch.html')


@app.route('/api/v1.0/search?symbol=<tickerName>')
def search_begin(tickerName):
    ticker_name = tickerName
    return 'The entered ticker is %s' % ticker_name



if __name__ == '__main__':
    app.run(debug=True)
