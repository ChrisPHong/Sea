from flask import Blueprint
from app.models import Company

search_routes = Blueprint('search', __name__)

@search_routes.route('/', methods=['GET'])
def get_stocks():
    stocks_list = []
    stocks = Company.query.all()
    # print('STOCKS LIST', stocks)
    # prints list of objects

    for i in range(0, len(stocks)):
        stocks_list.append(
            {"ticker": stocks[i].ticker, "company": stocks[i].name}
        )
        # print('new stocks list', stocks_list)
        # new stocks list [{'ticker': 'AAPL', 'company': 'Apple Inc'}]
        # list of an object
    # print ({"stock_names": stocks_list})
    #  list of company objects
    return {"stock_names": stocks_list} # {stock_names: Array(40)}
    # [{"ticker": stocks[i].ticker, "company": stocks[i].name}]
