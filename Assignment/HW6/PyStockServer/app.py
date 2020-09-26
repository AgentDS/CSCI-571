# -*- coding: utf-8 -*-
# @Time    : 9/25/20 11:18 PM
# @Author  : Siqi Liang
# @Contact : zszxlsq@gmail.com
# @File    : app.py
# @Software: PyCharm
from flask import Flask, jsonify, render_template, abort, request
import os

app = Flask(__name__,
            static_folder='static')


@app.route('/')
@app.route('/index')
def index():
    return app.send_static_file('hw6_StockSearch.html')

@app.route('/api/v1.0/search')
def search_begin():
    return 'The entered ticker is %s' % 'dgafdg'  # ticker_name

# ticker_name = request.form["ticker_name"]


if __name__ == '__main__':
    app.run(debug=True)
