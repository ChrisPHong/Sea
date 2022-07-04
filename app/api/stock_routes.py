from flask import Blueprint, request, jsonify
from app.models import Company, Transaction
from random import choice, random
from datetime import datetime, timedelta
from .portfolio_routes import make_stock_price, ASCENDING, DESCENDING

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/<ticker>')
def get_stocks(ticker):
    stock = Company.query.filter(Company.ticker == ticker.upper()).first()
    print(stock, '<<<<<<<<<<<<<<<<< STOCK >>>>>>>>>>>>')
    return jsonify(stock.to_dict())

@stock_routes.route('/')
def get_all_stocks():
    companies = Company.query.all()
    # print(companies, '<<<<<<<<<<<<<<<<< COMPANIES >>>>>>>>>>>>')
    return jsonify([company.to_dict() for company in companies])

@stock_routes.route('/<company_id>/prices', methods=['POST'])
def get_stock_prices(company_id):
    print("IS THIS BACKEND ROUTE EVEN HITTING???????")
    # Create date from a year ago
    one_year_data = datetime.today() - timedelta(days=365)
    # Find specific stock
    stock = Company.query.filter(Company.id == company_id).first()
    # Create fake prices for specified stock
    stock_prices = make_stock_price(stock.base_price, 365, choice([ASCENDING, DESCENDING]))

    # For each price in stock_prices
    for i in range(len(stock_prices)):
        price = stock_prices[i]
        # Create new date
        new_date = one_year_data + timedelta(days = 1)
        one_year_data = new_date
        # create date key/value pair in each stock price
        price['date'] = one_year_data.strftime("%b %d %Y")

    return {company_id: stock_prices}
    # return {company_id: stock_prices}

# # Weekly prices for OWNED companies
# @stock_routes.route('/weekly', methods=['POST'])
# def get_owned_weekly_prices():
#     user_id = request.json['userId']
#     ownedCompanies = Company.query.filter(Company.id == Transaction.company_id, Transaction.user_id == int(user_id), Transaction.type == "buy").all()
#     return jsonify([comp.to_dict_with_prices() for comp in ownedCompanies])

# # Weekly prices for ONE company
# @stock_routes.route('/<ticker>/weekly')
# def get_weekly_prices(ticker):
#     company = Company.query.filter(Company.ticker == ticker).first()
#     return jsonify(make_stock_price(company.base_price, choice([ASCENDING, DESCENDING])))
