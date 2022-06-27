from flask import Blueprint, request, jsonify
from app.models import Company
from random import choice, random

stock_routes = Blueprint('stocks', __name__)

# General upward trend
ASCENDING = [25, 25, -25, 25, 25, -25]

# General downward trend
DESCENDING = [-25, -25, 25, -25, -25, 25]

# Base price, number of days, ascending/descending
def make_stock_price(base, num, progression):
    stocks = []

    # Base price
    val = base

    # For each stock in the number of days
    for stock in range(num):
        # Pick a positive/negative number in the ascending/descending list and multiply it by a number from 0 to 1 (random())
        # Then add to base price
        stock_value = val + (choice(progression))*random()
        # Add stock_value to the stocks list with a float of 2
        stocks.append(round(stock_value, 2))
        # Make the value the new stock_value price
        val = stock_value
    return stocks

@stock_routes.route('/<ticker>')
def get_stocks(ticker):
    stock = Company.query.filter(Company.ticker == ticker)

    return stock.to_dict()

@stock_routes.route('/')
def get__all_stocks():
    companies = Company.query.all()
    return jsonify([company.to_dict() for company in companies])

@stock_routes.route('/')
def get_weekly_prices():
    companies = Company.query.all()
    return jsonify(make_stock_price(company.base_price, choice([ASCENDING, DESCENDING])) for company in companies)
