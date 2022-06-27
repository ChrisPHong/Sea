from flask import Blueprint, request, jsonify
from app.models import Company, Transaction
from random import choice, random

stock_routes = Blueprint('stocks', __name__)

# # General upward trend
# ASCENDING = [25, 25, -25, 25, 25, -25]

# # General downward trend
# DESCENDING = [-25, -25, 25, -25, -25, 25]

# # Base price, number of days, ascending/descending
# def make_stock_price(base, num, progression):
#     stocks = []

#     # Base price
#     val = base

#     # For each stock in the number of days
#     for stock in range(num):
#         # Pick a positive/negative number in the ascending/descending list and multiply it by a number from 0 to 1 (random())
#         # Then add to base price
#         stock_value = val + (choice(progression))*random()
#         # Add stock_value to the stocks list with a float of 2
#         stocks.append(round(stock_value, 2))
#         # Make the value the new stock_value price
#         val = stock_value
#     return stocks

@stock_routes.route('/<ticker>')
def get_stocks(ticker):
    stock = Company.query.filter(Company.ticker == ticker)

    return stock.to_dict()

@stock_routes.route('/')
def get_all_stocks():
    companies = Company.query.all()
    print('we hit backend???')
    return jsonify([company.to_dict() for company in companies])

# Weekly prices for OWNED companies
@stock_routes.route('/weekly', methods=['POST'])
def get_owned_weekly_prices():
    user_id = request.json['userId']
    ownedCompanies = Company.query.filter(Company.id == Transaction.company_id, Transaction.user_id == int(user_id), Transaction.type == "buy").all()
    # boughtTransactions = Transaction.query.filter(Transaction.user_id == int(user_id) and Transaction.type == "buy" and Company.id == Transaction.company_id).all()
    # print('THESE ARE BOUGHT TRANSACTIONS', boughtTransactions)
    # ownedCompanies = [Company.query.filter(Company.id == boughtTransaction.company_id for boughtTransaction in boughtTransactions).all()]
    print('THESE ARE OWNED COMPANIES', ownedCompanies)
    # weekly_prices_list = [make_stock_price(company.base_price, choice([ASCENDING, DESCENDING])) for company in ownedCompanies]
    # print('THESE ARE THE FINAL WEEKLY PRICES', weekly_prices_list)
    return jsonify([comp.to_dict_with_prices() for comp in ownedCompanies])

# # Weekly prices for ONE company
# @stock_routes.route('/<ticker>/weekly')
# def get_weekly_prices(ticker):
#     company = Company.query.filter(Company.ticker == ticker).first()
#     return jsonify(make_stock_price(company.base_price, choice([ASCENDING, DESCENDING])))
