from flask import Blueprint
from app.models import Company

search_routes = Blueprint('search', __name__)

@search_routes.route('/')
def get__all_stocks():
    stock_data = []
    stocks = Company.query.all()

    for i in range(0, len(stocks)):
        stock_data.append(
            {"ticker": stocks[i].ticker, "company": stocks[i].name}
        )
    return {"stock_names": stock_data}
    # return jsonify([company.to_dict() for company in companies])
