# -*- coding: utf-8 -*-
# @Time    : 9/25/20 11:18 PM
# @Author  : Siqi Liang
# @Contact : zszxlsq@gmail.com
# @File    : app.py
# @Software: PyCharm
from flask import Flask, jsonify, abort, request, Response
import json
from stockAPI import *

app = Flask(__name__,
            static_folder='static')


@app.route('/')
@app.route('/index')
def index():
    return app.send_static_file('hw6_StockSearch.html')


@app.route("/api/v1.0/news/<string:ticker_name>", methods=['GET'])
def send_news(ticker_name):
    latest_news = newsAPI(ticker_name)
    return jsonify({'latest_news': latest_news})  # jsonify the list of dict


@app.route("/api/v1.0/outlook/<string:ticker_name>", methods=['GET'])
def send_outlook(ticker_name):
    company_outlook = company_outlookAPI(ticker_name)
    return jsonify(company_outlook)  # jsonify the dict


@app.route("/api/v1.0/summary/<string:ticker_name>", methods=['GET'])
def send_stock_summary(ticker_name):
    stock_summary = stock_summaryAPI(ticker_name)
    return jsonify(stock_summary)  # jsonify the dict


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
