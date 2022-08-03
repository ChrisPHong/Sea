from inspect import trace
from itsdangerous import json
from sqlalchemy import all_
from app.models import Transaction, Company, company
from flask import Blueprint, jsonify, request
from flask_login import current_user
from datetime import datetime, timedelta
from random import choice, random

portfolio_routes = Blueprint('portfolio', __name__)

# General upward trend
ASCENDING = [1, 1, -1, 1, 1, -1]

#General downward trend
DESCENDING = [-1, -1, 1, -1, -1, 1]


def make_stock_price(base, time_length, progression):
    stocks = [{'price': round(abs(base), 2)}]

    # Base price
    val = base

    for day in range(time_length - 1):

        stock_value = (val + (choice(progression))*random())

        # Add stock_value to the stocks list with a float of 2
        # Absolute value method will ensure prices will always be positive
        stocks.append({'price': round(abs(stock_value), 2)})

        # Make the value the new stock_value price
        val = stock_value
    return stocks

def get_bought_transactions(comp_id, user_id):
    bought_transactions = Transaction.query.filter(Transaction.type == 'buy', Transaction.user_id == int(user_id)).all()
    for transaction in bought_transactions:
        if transaction.company_id == comp_id:
            return transaction


@portfolio_routes.route('/')
def make_portfolio():
    balance = 0

    # Get all companies that the user has traded
    all_transactions = Transaction.query.filter(Transaction.user_id == current_user.id).all()
    for transaction in all_transactions:
        if transaction.type == 'buy':
            balance += transaction.price * transaction.shares
        else:
            balance -= transaction.price * transaction.shares

    previous_dates = datetime.today() - timedelta(days=365)
    # Create asset prices
    owned_company_prices = make_stock_price(round(balance, 2), 365, choice([ASCENDING, DESCENDING]))
    # ex: [
        # 'price': 100,
        # 'price': 99,
        # 'price': 101,
        # ]
    # Reverse list so that most recent price is at the end of the list
    owned_company_prices.reverse()

    # Adding a date to each price
    for i in range(len(owned_company_prices)):
        priceData = owned_company_prices[i]
        previous_dates += timedelta(days = 1)
        priceData['date'] = previous_dates.strftime("%b %d %Y")

    return jsonify(owned_company_prices)

# @portfolio_routes.route('/thisRoute')
# def positive_portfolio():

#     company_object = {}
#     # separate the boughts and the sells
#     bought_transactions = Transaction.query.filter(Transaction.type == 'buy', Transaction.user_id == current_user.id).all()
#     sell_transactions = Transaction.query.filter(Transaction.type == 'sell', Transaction.user_id == current_user.id).all()

#     bought_transactions_copy = [transaction.to_dict() for transaction in bought_transactions]
#     sell_transactions_copy = [transaction.to_dict() for transaction in sell_transactions]
#     # loop through

#     for transaction in bought_transactions_copy:
#         # print(transaction, '*'*50)
#         if not company_object.__contains__(transaction['companyId']):
#             # company_transactions.append(transaction)
#             company_object[transaction['companyId']] = transaction
#             # company_set.add(transaction.companyId)
#         else:
#             company_object[transaction['companyId']]['shares'] += transaction['shares']
#             avg = (company_object[transaction['companyId']]['price'] + transaction['price']) / 2
#             company_object[transaction['companyId']]['price'] = avg

#     for transaction in sell_transactions_copy:
#         if company_object[transaction['companyId']]['shares'] > transaction['shares']:
#             company_object[transaction['companyId']]['shares'] -= transaction['shares']

#         elif company_object[transaction['companyId']]['shares'] == transaction['shares']:
#             company_object[transaction['companyId']]['shares'] = 0
#             del company_object[transaction['companyId']]

#     return company_object
