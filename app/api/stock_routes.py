from flask import Blueprint
from app.models import Company

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/<ticker>')
def get_stocks(ticker):
    stock = Company.query.filter(Company.ticker == ticker)

    return stock.to_dict()
