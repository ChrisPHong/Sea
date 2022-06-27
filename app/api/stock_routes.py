from flask import Blueprint, request, jsonify
from app.models import Company

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/<ticker>')
def get_stocks(ticker):
    stock = Company.query.filter(Company.ticker == ticker)

    return stock.to_dict()

@stock_routes.route('/')
def get__all_stocks():
    companies = Company.query.all()
    return jsonify([company.to_dict() for company in companies])
