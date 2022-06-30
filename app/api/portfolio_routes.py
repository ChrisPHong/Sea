from app.models import Transaction, Company
from flask import Blueprint, jsonify
from datetime import datetime, timedelta

portfolio_routes = Blueprint('portfolio', __name__)

# General upward trend
ASCENDING = [1, 1, -1, 1, 1, -1]

#General downward trend
DESCENDING = [-1, -1, 1, -1, -1, 1]


def make_stock_price(base, num, progression):
    stocks = []
    today_date = datetime.today()

    # Base price
    val = base

    for day in range(num):

        stock_value = (val + (choice(progression))*random())
        new_date = today_date - timedelta(days = 1)
        today_date = new_date

        # Add stock_value to the stocks list with a float of 2
        stocks.append({'date': today_date.strftime("%b %d %Y %H:%M:%S"), 'price': round(stock_value, 2)})
        # Make the value the new stock_value price

        val = stock_value
    return stocks

def get_purchased_shares(id):
    bought_transactions = Transaction.query.filter(Transaction.type === 'buy', Transaction.user_id == int(user_id)).all()
    for transaction in bought_transactions:
        if transaction.company_id == id:
            return transaction.shares

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
    timeframe = request.json['timeframe']
    user_id = request.json['userId']

    # Get all companies that the user has bought
    owned_companies = Company.query.filter(Company.id == Transaction.company_id, Transaction.user_id == int(user_id), Transaction.type == "buy").all()

    summed_prices_data = []

    # For every company that the user owns,
    for company in owned_companies:
        # Prices will be generated based on owned company's base price
        owned_company_prices = make_stock_price(company.base_price, timeframe, choice([ASCENDING, DESCENDING]))
        # ex: {
            # 'date': Jun 30 2022 05:30:00, 'price': 100,
            # 'date': Jun 29 2022 05:30:00, 'price': 99,
            # 'date': Jun 28 2022 05:30:00, 'price': 101,
            # }
        summed_price = [0] * timeframe

        # For every datePrice dictionary in owned_company_prices
        for i in range(len(owned_company_prices)):
            priceData = owned_company_prices[i]
            # Multiply the price by the amount of shares bought
            # ex: { 300, 99, 202 }
            priceData['price'] *= get_purchased_shares(company.id)

            summed_price[i] += round(priceData['price'], 2)
            summed_prices_data.append({'date': priceData['date'], 'price': summed_price[i]})
    return jsonify(summed_prices_data)
