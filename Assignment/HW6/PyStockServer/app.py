# -*- coding: utf-8 -*-
# @Time    : 9/25/20 11:18 PM
# @Author  : Siqi Liang
# @Contact : zszxlsq@gmail.com
# @File    : app.py
# @Software: PyCharm
from flask import Flask, jsonify, render_template, abort, request

app = Flask(__name__)


@app.route('/')
@app.route('/search/', methods=['POST'])
def index():
    ticker_name = request.form['ticker_name']
    return ('The entered ticker is %s' % ticker_name)


if __name__ == '__main__':
    app.run(debug=True)
