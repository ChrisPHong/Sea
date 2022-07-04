from app.models import Transaction, Company
from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from random import choice, random

portfolio_routes = Blueprint('portfolio', __name__)

# General upward trend
ASCENDING = [1, 1, -1, 1, 1, -1]

#General downward trend
DESCENDING = [-1, -1, 1, -1, -1, 1]


def make_stock_price(base, time_length, progression):
    stocks = []

    # Base price
    val = base

    for day in range(time_length):

        stock_value = (val + (choice(progression))*random())

        # Add stock_value to the stocks list with a float of 2
        # Absolute value method will ensure prices will always be positive
        stocks.append({'price': round(abs(stock_value), 2)})

        # Make the value the new stock_value price
        val = stock_value
    return stocks

# def get_purchased_shares(id, user_id):
#     bought_transactions = Transaction.query.filter(Transaction.type == 'buy', Transaction.user_id == int(user_id)).all()
#     for transaction in bought_transactions:
#         if transaction.company_id == id:
            # return transaction.shares
def get_bought_transactions(comp_id, user_id):
    bought_transactions = Transaction.query.filter(Transaction.type == 'buy', Transaction.user_id == int(user_id)).all()
    for transaction in bought_transactions:
        if transaction.company_id == comp_id:
            return transaction

# def sum_owned_assets(time_period):
#     owned_companies = Company.query.filter(Company.id == Transaction.company_id, Transaction.user_id == int(user_id), Transaction.type == "buy").all()
#     summed_prices_data = []
#     for company in owned_companies:
#         owned_company_prices = make_stock_price(company.base_price, time_period, choice([ASCENDING, DESCENDING]))
#         for price in owned_company_prices:
#             price['price'] *= get_purchased_shares(company.id)
#         summed_prices_data.append(owned_company_prices)
#     return summed_prices_data


@portfolio_routes.route('/', methods=['POST'])
def make_portfolio():
    # timeframe = request.json['timeframe']
    user_id = request.json['userId']
    current_balance = request.json['currentBalance']

    print('----------------------------------THIS IS WHAT WERE RECEIVING FROM FRONTEND----------------------------------', current_balance)

    # Get all companies that the user has bought
    owned_companies = Company.query.filter(Company.id == Transaction.company_id, Transaction.user_id == int(user_id), Transaction.type == "buy").all()

    # summed_prices_data = []
    # summed_price = [0] * 365 # [0 , 0 ,,0 , 0 ,0 ,0 ,0 ]
    portfolio_base_price = 0

    second_half = datetime.today() - timedelta(days=182)
    print('--------------------------------- first_half day ---------------------------------', second_half)
    first_half = second_half - timedelta(days=182)
    print('--------------------------------- first_half day ---------------------------------', first_half)


    # owned_company_prices = make_stock_price(current_balance, choice([ASCENDING, DESCENDING]))



    # For every company that the user owns,
    for idx in range(len(owned_companies)):
        company = owned_companies[idx]
        # Take company base price, multiply it
        portfolio_base_price += get_bought_transactions(company.id, user_id).price * get_bought_transactions(company.id, user_id).shares
        # owned_company_prices = make_stock_price(company.base_price, choice([ASCENDING, DESCENDING]))
        # ex: [
            # 'date': Jun 30 2022 05:30:00, 'price': 100,
            # 'date': Jun 29 2022 05:30:00, 'price': 99,
            # 'date': Jun 28 2022 05:30:00, 'price': 101,
            # ]
    # print('--------------------------------- here is the base price for all assets added up ---------------------------------', portfolio_base_price) # 6518.43
    first_half_prices = make_stock_price(portfolio_base_price, 182, choice([ASCENDING, DESCENDING]))
    second_half_prices = make_stock_price(current_balance, 182, choice([ASCENDING, DESCENDING]))

    # For every datePrice dictionary in owned_company_prices
    # for i in range(len(owned_company_prices)):
    #     priceData = owned_company_prices[i]
    #     # Multiply the price by the amount of shares bought
    #     # ex: { 300, 99, 202 }
    #     priceData['price'] *= get_purchased_shares(company.id, user_id)
    #     # Add price to corresponding index in summed_price list
    #     summed_price[i] += round(priceData['price'], 2)
    # 0 to 364
    for i in range(len(first_half_prices)):
        priceData = first_half_prices[i]
        new_date = first_half + timedelta(days = 1)
        first_half = new_date
        priceData['date'] = first_half.strftime("%b %d %Y")

    for i in range(len(second_half_prices)):
        priceData = second_half_prices[i]
        new_date = second_half + timedelta(days = 1)
        second_half = new_date
        priceData['date'] = second_half.strftime("%b %d %Y")

    owned_company_prices = first_half_prices + second_half_prices
    print('--------------------------------- what is this printing out.... ---------------------------------', owned_company_prices)

    return jsonify(owned_company_prices)
