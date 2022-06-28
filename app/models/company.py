from .db import db
from .watchlist import watchlist_company_join
from random import choice, random

# General upward trend
ASCENDING = [1, 1, -1, 1, 1, -1]

# General downward trend
DESCENDING = [-1, -1, 1, -1, -1, 1]

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

class Company(db.Model):
    __tablename__ = "companies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    ticker = db.Column(db.String(10), nullable=False)
    description = db.Column(db.Text, nullable=False)
    ceo = db.Column(db.String(50), nullable=False)
    employees = db.Column(db.Integer, nullable=False)
    headquarters = db.Column(db.String(100), nullable=False)
    founded = db.Column(db.Integer, nullable=False)
    base_price = db.Column(db.Float, nullable=False)

    # One-to-Many relationship with Transactions
    transactions = db.relationship('Transaction', back_populates='companies')

    # Many-to-Many relationship with Watchlists
    comp_wl = db.relationship('Watchlist', secondary=watchlist_company_join, back_populates='watch_comps', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ticker': self.ticker,
            'description': self.description,
            'ceo': self.ceo,
            'employees': self.employees,
            'headquarters': self.headquarters,
            'founded': self.founded,
            'basePrice': self.base_price
        }

    def to_dict_with_prices(self):
        return {
            'id': self.id,
            'name': self.name,
            'ticker': self.ticker,
            'description': self.description,
            'ceo': self.ceo,
            'employees': self.employees,
            'headquarters': self.headquarters,
            'founded': self.founded,
            'basePrice': self.base_price,
            'prices': make_stock_price(self.base_price, 60, choice([ASCENDING, DESCENDING]))
        }
