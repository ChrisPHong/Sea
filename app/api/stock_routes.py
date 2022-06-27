from flask import Blueprint, request, jsonify
from app.models import Company, Transaction
from random import choice, random

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/<ticker>')
def get_stocks(ticker):
    stock = Company.query.filter(Company.ticker == ticker)

    return stock.to_dict()

@stock_routes.route('/')
def get_all_stocks():
    companies = Company.query.all()
    return jsonify([company.to_dict() for company in companies])

# Weekly prices for OWNED companies
@stock_routes.route('/weekly', methods=['POST'])
def get_owned_weekly_prices():
    user_id = request.json['userId']
    ownedCompanies = Company.query.filter(Company.id == Transaction.company_id, Transaction.user_id == int(user_id), Transaction.type == "buy").all()
    return jsonify([comp.to_dict_with_prices() for comp in ownedCompanies])

# # Weekly prices for ONE company
# @stock_routes.route('/<ticker>/weekly')
# def get_weekly_prices(ticker):
#     company = Company.query.filter(Company.ticker == ticker).first()
#     return jsonify(make_stock_price(company.base_price, choice([ASCENDING, DESCENDING])))
