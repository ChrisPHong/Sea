from app.models import Transaction, Company
from flask import Blueprint
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

# def get_purchased_shares(id):
#     bought_transactions = Transaction.query.filter(Transaction.type === 'buy', Transaction.user_id == int(user_id)).all()
#     for transaction in bought_transactions:
#         if transaction.company_id == id:
#             return transaction.shares

# def sum_owned_assets(time_period):
#     owned_companies = Company.query.filter(Company.id == Transaction.company_id, Transaction.user_id == int(user_id), Transaction.type == "buy").all()

#     for company in owned_companies:
#         owned_company_prices = make_stock_price(company.base_price, time_period, choice([ASCENDING, DESCENDING]))
#         for price in owned_company_prices:
#             price['price'] *= get_purchased_shares(company.id)
#         return owned_company_prices
#     return owned_companies


@portfolio_routes.route('/', methods=['POST'])
def make_portfolio():
    # base = request.json['base']
    # num = request.json['num']
    # progression = request.json['ASCENDING']


    # dates_and_prices = make_stock_price(base, num, progression)

    # for price_dict in dates_and_prices:
    #     price = price_dict['price']
    # print(make_stock_price(100, 10, choice[ASCENDING, DESCENDING]))
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
    print('HEEEEEEEEEEEREEEEEEEEEEEREEEEEEEEEEEREEEEEEEEEEEREEEEEEEEEEER', stocks)
