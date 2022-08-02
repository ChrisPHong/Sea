from app.models import Transaction, Company
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


@portfolio_routes.route('/', methods=['POST'])
def make_portfolio():
    # timeframe = request.json['timeframe']
    # user_id = request.json['userId']
    current_balance = request.json['current_balance']

    # Get all companies that the user has bought
    owned_companies = Company.query.filter(Company.id == Transaction.company_id, Transaction.user_id == current_user.get_id(), Transaction.type == "buy").all()

    previous_dates = datetime.today() - timedelta(days=365)

    # Create asset prices
    owned_company_prices = make_stock_price(round(current_balance, 2), 365, choice([ASCENDING, DESCENDING]))
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
