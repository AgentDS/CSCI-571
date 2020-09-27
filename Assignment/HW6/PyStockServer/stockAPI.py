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

tiingoAPIkey = 'be37d86b75ad931e483aaab61f620653921a7517'  # liangsiq@usc.edu

# newsAPIkey = '83d88b3f4f9d44ccad89772a6ef0e218'  # zsxx56.12@163.com
newsAPIkey = '166945ff132b43c2a1a395898628ab48'  # liangsiq@usc.edu


def extract_keys(article):
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
            article = extract_keys(all_articles['articles'][i])
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
    :return:
    """
    outlook_url = "https://api.tiingo.com/tiingo/daily/%s?token=%s" % (keyword, tiingoAPIkey)
    headers = {'Content-Type': 'application/json'}
    request_Response = requests.get(outlook_url, headers=headers)
    info_json = request_Response.json()
    outlook_info = {"name": info_json["name"],
                    "ticker": info_json["ticker"],
                    "exchangeCode": info_json["exchangeCode"],
                    "startDate": info_json["startDate"],
                    "description": info_json["description"]}
    return outlook_info


def tiingoAPI():
    pass
