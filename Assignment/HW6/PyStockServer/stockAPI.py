# -*- coding: utf-8 -*-
# @Time    : 9/26/20 10:28 PM
# @Author  : Siqi Liang
# @Contact : zszxlsq@gmail.com
# @File    : stockAPI.py
# @Software: PyCharm
from newsapi import NewsApiClient
from newsapi.newsapi_exception import NewsAPIException
import requests
import re
from datetime import datetime
import dateutil
from dateutil.relativedelta import relativedelta
import pytz

tiingoAPIkey = 'be37d86b75ad931e483aaab61f620653921a7517'  # liangsiq@usc.edu

# newsAPIkey = '83d88b3f4f9d44ccad89772a6ef0e218'  # zsxx56.12@163.com
newsAPIkey = '166945ff132b43c2a1a395898628ab48'  # liangsiq@usc.edu


def extract_date(timestamp):
    return timestamp[:10]


def extract_article(article):
    if article.get('title', None) is not None:
        if article.get('url', None) is not None:
            if article.get('urlToImage', None) is not None:
                if article.get('publishedAt', None) is not None:
                    res = re.search(r'(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})',
                                    article['publishedAt']).groupdict()
                    formed_date = res['month'] + '/' + res['day'] + '/' + res['year']
                    return {'title': article['title'],
                            'url': article['url'],
                            'urlToImage': article['urlToImage'],
                            'publishedAt': formed_date}
    return {}


def extract_summary(ori_sum):
    res = re.search(r'(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})',
                    ori_sum['timestamp']).groupdict()
    formed_date = res['year'] + '-' + res['month'] + '-' + res['day']
    return {"ticker": ori_sum["ticker"],
            "timestamp": formed_date,
            "prevClose": "%.2f" % ori_sum["prevClose"],
            "open": "%.2f" % ori_sum["open"],
            "high": "%.2f" % ori_sum["high"],
            "low": "%.2f" % ori_sum["low"],
            "last": "%.2f" % ori_sum["last"],
            "change": "%.2f" % (ori_sum["last"] - ori_sum["prevClose"]),
            "changePercent": "%.2f%%" % (100.0 * (ori_sum["last"] - ori_sum["prevClose"]) / ori_sum["prevClose"]),
            "volume": "%d" % ori_sum["volume"]}


def extract_outlook(ori_outlook):
    return {"name": ori_outlook["name"],
            "ticker": ori_outlook["ticker"],
            "exchangeCode": ori_outlook["exchangeCode"],
            "startDate": ori_outlook["startDate"],
            "description": ori_outlook["description"]}


def newsAPI(keyword):
    """
    API Sample: https://newsapi.org/v2/everything?apiKey=API_KEY&q=keyword

    :param keyword: also called q, is the stock ticker
    :return: list of article in dict form
            {'title': article['title'],
             'url': article['url'],
             'urlToImage': article['urlToImage'],
             'publishedAt': formed_date}
    """
    newsapi = NewsApiClient(api_key=newsAPIkey)
    null = None
    candidate_articles = []
    try:
        all_articles = newsapi.get_everything(q=keyword, page=1, page_size=15)
        totalResults = all_articles['totalResults']
        for i in range(totalResults):
            article = extract_article(all_articles['articles'][i])
            if len(article) > 0:
                candidate_articles.append(article)
                if len(candidate_articles) == 5:
                    break
            else:
                continue
    except NewsAPIException:
        print("No News Available")

    return candidate_articles


def company_outlookAPI(keyword):
    """
    tiingo API Sample: https://api.tiingo.com/tiingo/daily/keyword?token=API_KEY

    :param keyword: the stock ticker
    :return: outlook dict
    """
    outlook_url = "https://api.tiingo.com/tiingo/daily/%s?token=%s" % (keyword, tiingoAPIkey)
    headers = {'Content-Type': 'application/json'}
    ori_outlook = requests.get(outlook_url, headers=headers).json()
    try:
        company_outlook = extract_outlook(ori_outlook)
        return company_outlook
    except KeyError:
        # if {"detail":"Not found."} is return, then return empty
        return {}


def stock_summaryAPI(keyword):
    """
    API Sample: https://api.tiingo.com/iex/keyword?token=API_KEY

    :param keyword: the stock ticker
    :return:
    """
    headers = {'Content-Type': 'application/json'}
    stock_summary_url = "https://api.tiingo.com/iex/%s?token=%s" % (keyword, tiingoAPIkey)
    try:
        ori_summary = requests.get(stock_summary_url, headers=headers).json()[0]
        stock_summary = extract_summary(ori_summary)
        return stock_summary
    except IndexError:
        return {}


def stock_chartsAPI(keyword):
    """
    API Sample:
    https://api.tiingo.com/iex/keyword/prices?startDate=prior_date&resampleFreq=12hour&columns=open,high,low,close,volume&token=API_KEY

    :param keyword:
    :return:
    """
    la_tz = pytz.timezone('America/Los_Angeles')
    la_current_time = datetime.now(tz=la_tz)
    la_prior_time = la_current_time - relativedelta(months=6)
    formed_la_current_time = la_current_time.strftime("%Y-%m-%d")  # '2020-09-30'
    la_prior_date = la_prior_time.strftime("%Y-%m-%d")  # TODO: 6 month before current date
    freq = "12hour"  #
    headers = {'Content-Type': 'application/json'}
    charts_url = "https://api.tiingo.com/iex/%s/prices?startDate=%s&resampleFreq=%s&columns=open,high,low,close,volume&token=%s" % (
        keyword, la_prior_date, freq, tiingoAPIkey)
    response = requests.get(charts_url, headers=headers).json()

    # if no such stock, the response is {"detail":"Not found."}
    if isinstance(response, dict):
        return {}
    histdata = []
    for record in response:
        tz_offset = 16 * 60 * 60 * 1000  # server time zone?
        date = int(
            datetime.strptime(record['date'],
                              '%Y-%m-%dT%H:%M:%S.%fZ').timestamp()) * 1000 - tz_offset  # ms rather than second
        histdata.append([date, record['close'], int(record['volume'])])
    return {'hist_data': histdata, 'ticker_name': keyword.upper(), 'current_date': formed_la_current_time}
