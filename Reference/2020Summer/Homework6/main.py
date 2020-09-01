import copy

import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

HEADERS = 'https://svcs.ebay.com/services/search/FindingService/v1?'
URL_ARGS = 'OPERATION-NAME=findItemsAdvanced&' \
           'SERVICE-VERSION=1.0.0&' \
           'SECURITY-APPNAME=zhiyuhar-homework-PRD-12eb6beb6-eb0c3bf5&' \
           'RESPONSE-DATA-FORMAT=JSON&' \
           'REST-PAYLOAD'
SEARCH_URL = HEADERS + URL_ARGS


@app.route('/index', methods=['GET'])
def index():
    return app.send_static_file("index.html")


@app.route('/', methods=['GET'])
def ebaySearch():
    url = SEARCH_URL
    args = request.args
    for key, value in args.items():
        url += "&" + key + "=" + value

    # convert Response to json data in python(dict)
    searchData = requests.get(url).json()
    searchData = filterData(searchData)
    responseJson = jsonify(searchData)
    responseJson.headers['Access-Control-Allow-Origin'] = '*'
    return responseJson


def filterData(jsonData):
    # jsonData is dict type
    copyData = copy.deepcopy(jsonData)
    count = 0
    data = copyData["findItemsAdvancedResponse"][0]
    dataDic = {"totalEntries": data["paginationOutput"][0]["totalEntries"]}
    if int(data["paginationOutput"][0]["totalEntries"][0]) == 0:
        dataDic["count"] = count
        return dataDic
    itemsList = data["searchResult"][0]["item"]
    filterResultList = list()
    for i in range(len(itemsList)):
        oneItem = itemsList[i]

        if not missingField(oneItem):
            filterResultList.append(oneItem)
            count += 1
    dataDic["searchResult"] = filterResultList
    dataDic["count"] = count

    return dataDic


def missingField(itemDic):
    if itemDic.get("galleryURL") is None:
        return True

    if itemDic["galleryURL"][0] == "https://thumbs1.ebaystatic.com/pict/04040_0.jpg":
        itemDic["galleryURL"][0] = "./static/img/ebay_default.jpg"

    if itemDic.get("title") is None:
        return True

    if "primaryCategory" not in itemDic or itemDic["primaryCategory"][0].get("categoryName") is None:
        return True

    if itemDic.get("viewItemURL") is None:
        return True

    if "condition" not in itemDic or itemDic["condition"][0].get("conditionDisplayName") is None:
        return True

    if itemDic.get("topRatedListing") is None:
        return True

    if itemDic.get("returnsAccepted") is None:
        return True

    if "shippingInfo" not in itemDic or itemDic["shippingInfo"][0].get("shippingServiceCost") is None:
        return True

    if "shippingInfo" not in itemDic or itemDic["shippingInfo"][0].get("expeditedShipping") is None:
        return True

    if "sellingStatus" not in itemDic or itemDic["sellingStatus"][0].get("convertedCurrentPrice") is None:
        return True

    if itemDic.get("location") is None:
        return True

    return False


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)