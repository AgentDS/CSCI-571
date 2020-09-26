# -*- coding: utf-8 -*-
# @Time    : 9/26/20 10:28 PM
# @Author  : Siqi Liang
# @Contact : zszxlsq@gmail.com
# @File    : stockAPI.py
# @Software: PyCharm
from newsapi import NewsApiClient
from newsapi.newsapi_exception import NewsAPIException
import re


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
    :return:
    """
    APIkey = '83d88b3f4f9d44ccad89772a6ef0e218'  # zsxx56.12@163.com
    # APIkey = '166945ff132b43c2a1a395898628ab48'  # liangsiq@usc.edu
    newsapi = NewsApiClient(api_key=APIkey)
    null = None
    candidate_articles = []
    try:
        all_articles = newsapi.get_everything(q=keyword)
        totalResults = all_articles['totalResults']
        for i in range(totalResults):
            article = extract_keys(all_articles['articles'][i])
            if len(article) == 4:
                candidate_articles.append(article)
                if len(candidate_articles) == 5:
                    break
            else:
                continue
    except NewsAPIException:
        print("No News Available")
        
    return candidate_articles


def tingoAPI():
    pass
