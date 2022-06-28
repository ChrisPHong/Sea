from flask import Blueprint
from app.models import Company

search_routes = Blueprint('search', __name__)

@search_routes.route('/', methods=['GET'])
def get_stocks():
    stocks_arr = []
    stocks = Company.query.all()
    print(stocks)

    for i in range(0, len(stocks)):
        stocks_arr.append(
            {"ticker": stocks[i].ticker, "company": stocks[i].name}
        )
    return {"stock_names": stocks_arr}
    # return jsonify([company.to_dict() for company in companies])
