from flask import Blueprint, request, jsonify
from datetime import date, timedelta
import json
import finnhub
import os

FINNHUB_API_KEY = os.environ.get('FINNHUB_API_KEY')

news_routes = Blueprint('news', __name__)

@news_routes.route('/', methods=['POST'])
def get_news():
    finnhub_client = finnhub.Client(FINNHUB_API_KEY)
    ticker = request.json['ticker'].upper()
    # print("THIS IS THE TICKERRRRR",ticker)
    today = date.today()
    yesterday = today - timedelta(days=1)
    # print("THIS IS WHAT TODAYS DATE SHOULD BE JUNE 29, 2022", today)
    # print("THIS IS WHAT YESTERDAYS DATE SHOULD BE JUNE 28, 2022", yesterday)
    return jsonify((finnhub_client.company_news(ticker, _from=yesterday, to=today)))
